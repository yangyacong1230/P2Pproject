package com.qianfeng.p2p.payment.service;

import com.qianfeng.p2p.pojo.Payment;

public interface PaymentService {
	/**
	 * 用户要充值多少钱
	 
	 */
	void createOrder(Payment payment) throws Exception;
}
