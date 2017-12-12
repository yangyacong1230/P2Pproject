package com.qianfeng.p2p.content.serviceimpl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.qianfeng.p2p.commons.bean.PageBean;
import com.qianfeng.p2p.content.service.BorrowMoneyService;
import com.qianfeng.p2p.mapper.AccountMoneyMapper;
import com.qianfeng.p2p.mapper.BorrowMoneyTicketMapper;
import com.qianfeng.p2p.pojo.BorrowMoneyTicket;

@Service("borrowMoneyServiceImpl")
public class BorrowMoneyServiceImpl implements BorrowMoneyService {
	@Resource
	private BorrowMoneyTicketMapper borrowMoneyTicketMapper;
	@Resource
	private AccountMoneyMapper accountMoneyMapper;
	@Override
	public void addBorrowMoneyTicket(BorrowMoneyTicket borrowMoneyTicket) throws Exception {
	//插入数据
		borrowMoneyTicketMapper.addBorrowMoneyTicket(borrowMoneyTicket);
	}
	
	
	@Override
	public PageBean getAllUnchekedBorrow(int currentPage,int pageSize) throws Exception {
		//开启分页
		PageHelper.startPage(currentPage, pageSize);
		List<BorrowMoneyTicket> borrows = borrowMoneyTicketMapper.getAllUnchekedBorrow();
		PageInfo<BorrowMoneyTicket> pageInfo=new PageInfo<>(borrows);
		Long total = pageInfo.getTotal();
		PageBean pageBean=new PageBean();
		pageBean.setCurrentPage(currentPage);
		pageBean.setPageSize(pageSize);
		pageBean.setTotalNumber(total.intValue());
		pageBean.setData(borrows);
		return pageBean;
	}


	@Override
	public int updateBorrow(BorrowMoneyTicket borrowMoneyTicket) throws Exception {
		 return borrowMoneyTicketMapper.updateBorrowMoney(borrowMoneyTicket);
		
	}


	@Override
	public PageBean findBorrowMoneyDataByPage(int pageNumer, int pageSize) throws Exception {
		PageHelper.startPage(pageNumer,pageSize);
		List<BorrowMoneyTicket> result= borrowMoneyTicketMapper.findBorrowMoneyDataByPage();
		PageInfo<BorrowMoneyTicket> pageInfo=new PageInfo<>(result);
		PageBean pageBean=new PageBean();
		pageBean.setCurrentPage(pageNumer);
		pageBean.setPageSize(pageSize);
		Long total = pageInfo.getTotal();
		pageBean.setTotalNumber(total.intValue());
		pageBean.setData(result);
		return pageBean;
	}


	@Override
	public BorrowMoneyTicket findBorrowMoneyById(Integer id) throws Exception {
		
		return borrowMoneyTicketMapper.findBorrowMoneyById(id);
	}


	@Override
	public int findAvailableMoneyById(int bid) throws Exception {
		System.err.println(borrowMoneyTicketMapper);
		return borrowMoneyTicketMapper.findAvailableMoneyById(bid);
	}


	@Override
	public int updateSellMoneyById(int bid, int money,int status) throws Exception {
		
		return borrowMoneyTicketMapper.updateSellMoneyById(bid,money,status);
	}


	@Override
	public Double findAccountMoneyByUserId(int userid) throws Exception {
		return accountMoneyMapper.findAvailableMoneyByUserId(userid);
	}


	@Override
	public int updateUserAvailableMoney(double money, int type,int userid) throws Exception {
		
		return accountMoneyMapper.updateUserAvailableMoney(money,type,userid);
	}

/*
	@Override
	public void buy(int bid, int money) {
		//一个业务
		//查询用户是否有钱
		
	
		
	}*/

	
}
