package com.qianfeng.p2p.payment.serviceimpl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.qianfeng.p2p.mapper.PaymentMapper;
import com.qianfeng.p2p.payment.service.PaymentService;
import com.qianfeng.p2p.pojo.Payment;
@Service("paymentservice")
public class PaymentServiceImpl implements PaymentService{
	@Resource
	private  PaymentMapper paymentMapper;
	@Override
	public void createOrder(Payment payment) throws Exception {
		//根据用户id和金额给交易流水表创建一行数据,状态是未支付,然后返回,要求用户重定向到支付页面,应该携带参数过去
		//1插入数据
		try {
			paymentMapper.createOrder(payment);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

}
