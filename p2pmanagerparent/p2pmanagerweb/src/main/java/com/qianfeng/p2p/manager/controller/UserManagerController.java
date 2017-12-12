package com.qianfeng.p2p.manager.controller;

import java.util.Date;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.qianfeng.p2p.commons.bean.BaseJson;
import com.qianfeng.p2p.commons.bean.PageBean;
import com.qianfeng.p2p.commons.utils.JsonUtils;
import com.qianfeng.p2p.manager.service.BorrowInfoService;
import com.qianfeng.p2p.pojo.BorrowInfo;
import com.qianfeng.p2p.pojo.User;
import com.qianfeng.p2p.sso.service.AccountServcie;

@Controller
@RequestMapping("/usermanager")
public class UserManagerController {
	@Resource
	private AccountServcie accountServcie;
	@Resource
	private BorrowInfoService borrowInfoService;
	/**
	 * 分页获取用户的认证状态
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getUserstatusByPage",produces= {"text/plain;charset=utf-8"})
	public String getUserstatusByPage(int currentPage,int pageSize) {
		BaseJson baseJson=null;
		try {
			PageBean pageBean=accountServcie.findUserstatusByPage(currentPage,pageSize);
			baseJson=BaseJson.setSuccess(pageBean);
		} catch (Exception e) {
			baseJson=BaseJson.setError(102);
			e.printStackTrace();
		};
		return JsonUtils.objectToJson(baseJson);
	}
	/**
	 * 根据用户名获取用户的认证信息
	 * @param username
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getUserstatusInfoByName",produces= {"text/plain;charset=utf-8"})
	public String getUserstatusInfoByName(String username) {
		BaseJson baseJson=null;
		try {
			User user = accountServcie.findUserByName(username);
			user.setPassword(null);//清除密码
			baseJson=BaseJson.setSuccess(user);
		} catch (Exception e) {
			baseJson=BaseJson.setError(9);
			e.printStackTrace();
		}
		
		return JsonUtils.objectToJson(baseJson);
	}
	@ResponseBody
	@RequestMapping(value="/updateUserstatus",produces= {"text/plain;charset=utf-8"})
	public String updateUserstatus(User user) {
		BaseJson baseJson=null;
		try {
			accountServcie.updateUserByUserName(user);
			//TODO 应该发送消息更新缓存中的用户数据
			baseJson=BaseJson.setSuccess("成功");
		} catch (Exception e) {
			baseJson=BaseJson.setError(103);
			e.printStackTrace();
		}
		return JsonUtils.objectToJson(baseJson);
	}
	
	
	/**
	 * 给用户添加审核资料
	 */
	@RequestMapping(value="/addUserInfo",produces= {"text/plain;charset=utf-8"})
	@ResponseBody
	public  String addUserInfo(BorrowInfo borrowInfo) {
		BaseJson baseJson=null;
		//进行数据校验
		try {
			borrowInfo.setCommitdate(new Date());
			borrowInfoService.addBorrowInfo(borrowInfo);
			baseJson=BaseJson.setSuccess("添加成功");
		} catch (Exception e) {
			baseJson=BaseJson.setError(11);
			e.printStackTrace();
		}
		return JsonUtils.objectToJson(baseJson);
		
	}
}
