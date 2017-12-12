package com.qianfeng.p2p.content.service;

import com.qianfeng.p2p.commons.bean.PageBean;
import com.qianfeng.p2p.pojo.BorrowMoneyTicket;

public interface BorrowMoneyService {
	
	//添加申请
	/**
	 * 添加借款申请
	 * @param borrowMoneyTicket
	 * @throws Exception
	 */
	void addBorrowMoneyTicket(BorrowMoneyTicket borrowMoneyTicket) throws Exception;
/**
 * 查询所有未审核的贷款
 * @return
 * @throws Exception
 */

PageBean getAllUnchekedBorrow(int currentPage, int pageSize) throws Exception;
/**
 * 更新借款信息,比如实际批复的金额等
 * @param borrowMoneyTicket
 * @return
 * @throws Exception
 */
int updateBorrow(BorrowMoneyTicket borrowMoneyTicket)throws Exception;
/**
 * 获取可以购买的贷款
 * @param pageNumer
 * @param pageSize
 * @return
 * @throws Exception
 */
PageBean findBorrowMoneyDataByPage(int pageNumer, int pageSize)throws Exception;
/**
 * 根据id查询借款信息
 * @param id
 * @return
 */
BorrowMoneyTicket findBorrowMoneyById(Integer id)throws Exception;
/**
 * 查询可购买的金额
 * @param bid
 * @return
 * @throws Exception
 */
int findAvailableMoneyById(int bid) throws Exception;
/**
 * 购买
 * @param bid
 * @param money 购买金额
 * @param status 更新状态,如果是0代表只更新钱数,如果是1代表顺便更新状态
 * @return
 * @throws Exception
 */
int updateSellMoneyById(int bid, int money,int status) throws Exception;

/*void buy(int bid, int money);*/
/**
 * 根据用户id查询用户的可用金额
 * @param userid
 * @return
 * @throws Exception
 */
Double findAccountMoneyByUserId(int userid) throws Exception;
/**
 * 更新用户的可用金额
 * @param money
 * @return
 * @throws Exception
 */
int updateUserAvailableMoney(double money,int type,int userid) throws Exception;

}
