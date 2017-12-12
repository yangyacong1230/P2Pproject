package com.qianfeng.p2p.content.shiro;

import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.LinkedHashMap;
import java.util.Map;

public class MyShiroFilterFactoryBean extends ShiroFilterFactoryBean{
	Logger log=LoggerFactory.getLogger(getClass());
	private Map<String, String> filterMap; 
	public MyShiroFilterFactoryBean() {
		this.filterMap = new LinkedHashMap<String, String>(); //order matters!
		initPerms();//初始化权限列表
	}

	/**
	 * 此处的方法应该分拆为分布式,因为前端的登录页面和管理的登录页面不一致,但是因为配置原因会导致跳转一个页面
	 */
	void initPerms(){
		log.info("初始化权限规则");
		filterMap.put("/", "anon");
		filterMap.put("/js/*", "anon");
		filterMap.put("/css/*", "anon");
		filterMap.put("/images/*", "anon");
		filterMap.put("/pic/*", "anon");
		filterMap.put("/accountsetting.html", "authc");
		filterMap.put("/myaccount.html", "authc");
		filterMap.put("/borrowmoney/addBorrowMoneyTicket.action", "authc");
		filterMap.put("/logout.action", "logout");
		setFilterChainDefinitionMap(filterMap);
	}

}
