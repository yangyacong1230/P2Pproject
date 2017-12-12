package com.qianfeng.p2p.manager.controller;

import java.io.File;
import java.io.FileWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;

import org.apache.activemq.command.ActiveMQQueue;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import com.qianfeng.p2p.commons.bean.BaseJson;
import com.qianfeng.p2p.commons.bean.PageBean;
import com.qianfeng.p2p.commons.utils.JsonUtils;
import com.qianfeng.p2p.content.service.BorrowMoneyService;
import com.qianfeng.p2p.pojo.BorrowMoneyTicket;


@Controller
@RequestMapping("/borrowmoneymanager")
public class BorrowMoneyStatusController {
	@Resource
	private  BorrowMoneyService  borrowMoneyService;
	
	@Resource
	private  JmsTemplate jmsTemplate;
	@Resource
	private ActiveMQQueue activeMQQueue;
	/**
	 * 获取所有等待审核的借款
	 * 也就是状态是0的借款
	 * 
	 */
	@RequestMapping(value="/getAllUnchekedBorrow",produces= {"text/plain;charset=utf-8"})
	@ResponseBody
	public String getAllUnchekedBorrow(int currentPage,int pageSize) {
		BaseJson baseJson=null;
		try {
			PageBean pageBean= borrowMoneyService.getAllUnchekedBorrow(currentPage,pageSize);
			baseJson=BaseJson.setSuccess(pageBean);
		} catch (Exception e) {
			baseJson=BaseJson.setError(12);
			e.printStackTrace();
		}
		
		return JsonUtils.objectToJson(baseJson);
	}
	/**
	 * 更新借款
	 * @param borrowMoneyTicket
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/updateBorrow",produces= {"text/plain;charset=utf-8"})
	public String updateBorrow(BorrowMoneyTicket borrowMoneyTicket,String callback) {
		BaseJson baseJson=null;
		try {
			borrowMoneyTicket.setPassdate(new Date());
			int result=borrowMoneyService.updateBorrow(borrowMoneyTicket);
			if (result>0) {
				
				baseJson=BaseJson.setSuccess("成功");//这里不符合科学,应该需要判断返回值,也就是我们的update语句需要拿到返回值
				//生成静态化文件
				/*borrowMoneyTicket=borrowMoneyService.findBorrowMoneyById(borrowMoneyTicket.getId());
				Map<String, Object> map=new HashMap<>();
				map.put("data", borrowMoneyTicket);
				double zonggong=borrowMoneyTicket.getRealmoney()+borrowMoneyTicket.getRealmoney()*borrowMoneyTicket.getLifecycle()*borrowMoneyTicket.getMoneyrate()/100/12;
				map.put("zongji", zonggong);
				Configuration configuration = freeMarkerConfigurer.getConfiguration();
				// 3、使用Configuration对象获得Template对象。
				Template template = configuration.getTemplate("infor.ftl");
				template.process(map, new FileWriter(new File("D:\\nginx-1.8.0\\html\\"+borrowMoneyTicket.getId()+".html")));
				*/
				//只发送通知,说改生成静态化页面l
				BaseJson message=BaseJson.setSuccess(100, borrowMoneyTicket.getId());
				//从spring中获取jmstemplate和点对点对象
				//WebApplicationContext webApplicationContext=WebApplicationContextUtils.getWebApplicationContext(sc);
				jmsTemplate.send(activeMQQueue, new MessageCreator() {
					
					@Override
					public Message createMessage(Session session) throws JMSException {
						
						return session.createTextMessage(JsonUtils.objectToJson(message));
					}
				});
				
			}else {
				baseJson=BaseJson.setError(12);
			}
		} catch (Exception e) {
			baseJson=BaseJson.setError(11);
			e.printStackTrace();
		}
		return callback+"("+JsonUtils.objectToJson(baseJson)+")";
	}
	
}
