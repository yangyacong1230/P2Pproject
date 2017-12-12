package com.qianfeng.p2p.test;

import java.io.IOException;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageConsumer;
import javax.jms.MessageListener;
import javax.jms.MessageProducer;
import javax.jms.Queue;
import javax.jms.Session;
import javax.jms.TextMessage;
import javax.jms.Topic;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.command.ActiveMQQueue;
import org.apache.activemq.command.ActiveMQTextMessage;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;

public class TestMQ {

	/**
	 * 测试点对点,得有发送方,还得有接收方
	 * Connection 连接,用于在程序和服务器之间建立连接通信用
	 * Destination目标,包含消息发布和目标
	 * MessageConsumer 消费者
	 * MessageProducer 生产者
	 * Message 消息对象
	 * Session 会话接口,用于发送和接收消息
	 * 
	 */
	@Test
	public void test1() throws Exception {
		//当前是发送方
		//先获取连接
		ConnectionFactory connectionFactory=new ActiveMQConnectionFactory("tcp://10.0.135.131:61616");
		Connection connection = connectionFactory.createConnection();
		//开启连接
		connection.start();
		Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);//创建一个会话
		//activemq怎样保证消息不丢失
		///先创建一个点对点的消息
		Queue queue = session.createQueue("woyaofageishui");
		MessageProducer producer = session.createProducer(queue);//创建一个生产者
		//设置具体发送的内容
		TextMessage textMessage=new ActiveMQTextMessage();
		textMessage.setText("基于Tcp的问候,你在吗,我想要和你建立连接rewrwwrwedadasdas23");
		producer.send(textMessage);
		producer.close();
		session.close();
		connection.close();
	}
	/**
	 * 创建接收者
	 */
	@Test
	public void test2() throws Exception{
		//创建连接
		ConnectionFactory connectionFactory=new ActiveMQConnectionFactory("tcp://10.0.135.131:61616");
		Connection connection = connectionFactory.createConnection();
		//打开连接
		connection.start();
		//创建会话
		Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
		//创建一个搬运工,接收消息的搬运工
		Queue queue=session.createQueue("woyaofageishui");
		MessageConsumer consumer = session.createConsumer(queue);
		//设置监听器,监听消息
		consumer.setMessageListener(new MessageListener() {
			
			@Override
			public void onMessage(Message message) {
				//当收到消息的时候
				try {
					TextMessage textMessage=(TextMessage) message;
					System.err.println(textMessage.getText());
				} catch (JMSException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		});
		//
		System.in.read();
	}
	/**
	 * 测试广播方式,先写发送方
	 */
	@Test
	public void test3() throws Exception {
		//创建连接
		ConnectionFactory connectionFactory=new ActiveMQConnectionFactory("tcp://10.0.135.131:61616");
		Connection connection = connectionFactory.createConnection();
		//打开连接
		connection.start();
		
		//创建会话
		Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
		//创建搬运工.广播模式  发布者/订阅者模式
		Topic topic=session.createTopic("fm99.9");
		MessageProducer producer = session.createProducer(topic);
		TextMessage textMessage=new ActiveMQTextMessage();
		textMessage.setText("fdsfsdfsd");
		producer.send(textMessage);
		
		producer.close();
		session.close();
		connection.close();
	}
	/**
	 * 广播模式的接收者
	 * 
	 */
	@Test
	public  void test4() throws Exception {
		ConnectionFactory connectionFactory=new ActiveMQConnectionFactory("tcp://10.0.135.131:61616");
		Connection connection = connectionFactory.createConnection();
		//打开连接
		connection.start();
		
		//创建会话
		Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
		//创建搬运工.广播模式  发布者/订阅者模式
		Topic topic=session.createTopic("fm99.9");
		MessageConsumer consumer = session.createConsumer(topic);
		consumer.setMessageListener(new MessageListener() {
			
			@Override
			public void onMessage(Message message) {
				try {
					TextMessage textMessage=(TextMessage) message;
					System.err.println(Thread.currentThread().hashCode()+textMessage.getText());
				} catch (JMSException e) {
					
					e.printStackTrace();
				}
			}
		});
		System.in.read();
	}
	
	@Test
	public void testspring() {
		//ClassPath
		ApplicationContext context=new FileSystemXmlApplicationContext("D:\\eclipseWorkspace\\javaee1708\\p2pmanagerparent\\p2pmanagerweb\\src\\main\\resources\\spring\\applicationcontext-mq.xml");
		JmsTemplate jmsTemplate = (JmsTemplate) context.getBean("jmsTemplate");
		ActiveMQQueue queue=(ActiveMQQueue) context.getBean("activeMQQueue");
		jmsTemplate.send(queue, new MessageCreator() {
			
			@Override
			public Message createMessage(Session session) throws JMSException {
				TextMessage message = session.createTextMessage("这是spring创建的消息11111");
				return message;
			}
		});
	}
	/*
	 * 接收方
	 */
	@Test
	public void testspringcons() {
		
		ApplicationContext context=new FileSystemXmlApplicationContext("D:\\eclipseWorkspace\\javaee1708\\p2pmanagerparent\\p2pmanagerweb\\src\\main\\resources\\spring\\applicationcontext-mq.xml");
		try {
			System.in.read();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
	}
}
