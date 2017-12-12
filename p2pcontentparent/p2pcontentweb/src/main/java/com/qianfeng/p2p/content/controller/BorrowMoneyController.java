package com.qianfeng.p2p.content.controller;

import java.util.Date;

import javax.annotation.Resource;
import javax.management.RuntimeErrorException;

import org.apache.shiro.SecurityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.qianfeng.p2p.commons.bean.BaseJson;
import com.qianfeng.p2p.commons.bean.PageBean;
import com.qianfeng.p2p.commons.jedis.Jedisinterface;
import com.qianfeng.p2p.commons.utils.JsonUtils;
import com.qianfeng.p2p.content.service.BorrowMoneyService;
import com.qianfeng.p2p.pojo.BorrowMoneyTicket;
import com.qianfeng.p2p.pojo.User;

import redis.clients.jedis.Jedis;

@Controller
@RequestMapping("/borrowmoney")
public class BorrowMoneyController {
	@Resource
	private BorrowMoneyService borrowMoneyService;
	@Resource
	private Jedisinterface jedisinterface;

	@ResponseBody
	@RequestMapping(value = "/addBorrowMoneyTicket", produces = { "text/plain;charset=utf-8" })
	public String addBorrowMoneyTicket(BorrowMoneyTicket borrowMoneyTicket) {
		BaseJson baseJson;
		try {
			baseJson = null;
			// 设置属于哪个用户的贷款
			// 我们可以从redis中获取登陆用户数据,key在什么地方
			String uuid = (String) SecurityUtils.getSubject().getSession().getAttribute("useruuid");
			if (uuid != null) {// 如果用户已经登陆
				Jedis jedis = jedisinterface.getJedis();
				String userid = jedisinterface.hget(uuid, "id", jedis);
				jedisinterface.close(jedis);
				borrowMoneyTicket.setUserid(Integer.parseInt(userid));
				borrowMoneyTicket.setCommitdate(new Date());
				borrowMoneyService.addBorrowMoneyTicket(borrowMoneyTicket);
				baseJson = BaseJson.setSuccess("成功");
			} else {
				baseJson = BaseJson.setError(11);
			}
		} catch (Exception e) {
			baseJson = BaseJson.setError(103);
			e.printStackTrace();
		}
		return JsonUtils.objectToJson(baseJson);
	}

	/**
	 * 获取可以购买的借款
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/getBorrowMoenyData", produces = { "text/plain;charset=utf-8" })
	public String getBorrowMoenyData(int pageNumber, int pageSize) {

		BaseJson baseJson = null;
		// 这里获取数据
		try {
			PageBean pageBean = borrowMoneyService.findBorrowMoneyDataByPage(pageNumber, pageSize);
			baseJson = BaseJson.setSuccess(pageBean);
		} catch (Exception e) {
			baseJson = BaseJson.setError(11);
			e.printStackTrace();
		}

		return JsonUtils.objectToJson(baseJson);
	}

	/**
	 * 根据id查询借款信息
	 * 
	 * @param id
	 * @param callback
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/getBorrowMoneyDataById", produces = { "text/plain;charset=utf-8" })
	public String getBorrowMoneyDataById(int id, String callback) {
		BaseJson baseJson = null;
		try {
			BorrowMoneyTicket moneyTicket = borrowMoneyService.findBorrowMoneyById(id);
			baseJson = BaseJson.setSuccess(moneyTicket);
		} catch (Exception e) {
			baseJson = BaseJson.setError(11, "请检查网络");
			e.printStackTrace();
		}
		return callback + "(" + JsonUtils.objectToJson(baseJson) + ")";
	}

	/**
	 * 购买产品,注意此地址需要登陆权限
	 * 
	 * @param bid
	 *            产品id
	 * @param money
	 *            钱数
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/maimaimai", produces = { "text/plain;charset=utf-8" })
	public String buybuybuy(int bid, int money, String callback) {
		BaseJson baseJson = null;
		try {
			// 获取当前登陆的用户
			String uuid = (String) SecurityUtils.getSubject().getSession().getAttribute("useruuid");
			
			if (uuid == null) {
				// 尚未登陆
				baseJson = BaseJson.setError(11);
			} else {
				Jedis jedis = jedisinterface.getJedis();
				String userid=jedisinterface.hget(uuid, "id", jedis);
				/// 获取登陆用户的可用余额
				// 如果可用余额足够,则继续购买,否则告诉用户 你的帐户余额不足
				Double moneyByUserId = borrowMoneyService.findAccountMoneyByUserId(Integer.parseInt(userid));
				int availableMoney = borrowMoneyService.findAvailableMoneyById(bid);
				if (moneyByUserId<Math.abs(money)) {//用户钱不够
					baseJson=BaseJson.setError(14);
				}
				//获取产品最大的可买年金额
				else if (availableMoney <= 0) {
					// 已经卖完或者是已经失效,返回提示,已经不可购买
					baseJson = BaseJson.setError(13);
				} else if (money > availableMoney) {// 购买的钱数大于可购买
					baseJson = BaseJson.setError(14);
				} else if (money <= 0 || money % 100 != 0) {// 填写的钱数不符合要求
					baseJson = BaseJson.setError(15);
				} else {// 可以购买

					// 查询当前产品的状态,有可能已经到期,有可能已经售完,有可能你的钱数大于可购买钱数
					// 我的查询条件会发生变化,查询id为bid,同时状态为1的产品
					int count = 0;
					if (money == availableMoney) {// 可能会刚好买完

						count = borrowMoneyService.updateSellMoneyById(bid, money, 1);
					} else {
						count = borrowMoneyService.updateSellMoneyById(bid, money, 0);
					}

					if (count == 0) {
						baseJson = BaseJson.setError(14);
					} else {
						baseJson = BaseJson.setSuccess("成功");
						// 更新用户可用金额
						int row = borrowMoneyService.updateUserAvailableMoney(money, 0, Integer.parseInt(userid));
						if (row <= 0) {// 扣钱失败
							throw new RuntimeException("余额不足");
						}
					}
				}
			}

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return callback + "(" + JsonUtils.objectToJson(baseJson) + ")";

	}
}
