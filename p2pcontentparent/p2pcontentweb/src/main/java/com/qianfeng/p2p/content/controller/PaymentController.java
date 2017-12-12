package com.qianfeng.p2p.content.controller;

import java.util.Date;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.qianfeng.p2p.commons.jedis.Jedisinterface;
import com.qianfeng.p2p.commons.utils.JsonUtils;
import com.qianfeng.p2p.commons.utils.PaymentUtil;
import com.qianfeng.p2p.commons.utils.Stringutils;
import com.qianfeng.p2p.payment.service.PaymentService;
import com.qianfeng.p2p.pojo.Payment;

import redis.clients.jedis.Jedis;

@Controller
@RequestMapping("/payment")
public class PaymentController {
	@Resource
	private Jedisinterface jedisinterface;
	@Resource
	private PaymentService paymentService;
	
	@RequestMapping("/createorders")
	public String createOrder(double money,int type) {
		try {
			Session session = SecurityUtils.getSubject().getSession();
			//创建payment对象
			String uuid = (String) session.getAttribute("useruuid");
			Jedis jedis = jedisinterface.getJedis();
			String useridString = jedisinterface.hget(uuid, "id", jedis);
			Payment payment=new Payment();
			//生成id
			payment.setId(Stringutils.createOrderId(Integer.parseInt(""+jedisinterface.incr("moneyorderid", jedis))));
			jedisinterface.close(jedis);
			payment.setCreatetime(new Date());
			payment.setMoney(money);
			payment.setType(type);
			payment.setUserid(Long.parseLong(useridString));
			paymentService.createOrder(payment);
			String reulst=null;//返回的页面
			if (type==1) {
				//重定向到第三支付页面
				//校验码,用于校验数据是否被篡改
				String hmac = PaymentUtil.buildHmac("Buy", "10001126856", payment.getId()+"", "0.01", "CNY", "productname", "guobinfen", "liulianjiucai", "http://47.95.244.39:8080/payment/result.action", "0", "shanghuinfo", "ICBC-NET-B2C", "1", "69cl522AV6q613Ii4W6u8K6XuW8vM1N6bFgyv769220IuYe9u37N4y7rI4Pl");
				//请求地址
				StringBuffer stringBuffer=new StringBuffer("redirect:https://www.yeepay.com/app-merchant-proxy/node?");
				stringBuffer.append("p0_Cmd=").append("Buy").append("&p1_MerId=").append("10001126856")//
				.append("&p2_Order=").append(payment.getId()).append("&p3_Amt=0.01&").append("p4_Cur=CNY&")//
				.append("p5_Pid=productname&").append("p6_Pcat=guobinfen&").append("p7_Pdesc=liulianjiucai&").append("p8_Url=").append("http://47.95.244.39:8080/payment/result.action")//
				.append("&p9_SAF=0").append("&pa_MP=shanghuinfo").append("&pd_FrpId=").append("ICBC-NET-B2C").append("&pr_NeedResponse=1").append("&hmac=").append(hmac);
				
				reulst=stringBuffer.toString();
				System.err.println(reulst);
				return reulst;
			}
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * 
	 * @return
	 */
	@RequestMapping("/result")
	@ResponseBody
	public String result(HttpServletRequest request) {
		Map parameterMap = request.getParameterMap();
		System.err.println(parameterMap);
		return JsonUtils.objectToJson(parameterMap);
	}
}
