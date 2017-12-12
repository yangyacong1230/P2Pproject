package com.qianfeng.p2p.manager.serviceimpl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.qianfeng.p2p.manager.service.BorrowInfoService;
import com.qianfeng.p2p.mapper.BorrowInfoMapper;
import com.qianfeng.p2p.pojo.BorrowInfo;
@Service("borrowServiceImpl")
public class BorrowServiceImpl implements BorrowInfoService {
	@Resource
	private BorrowInfoMapper borrowInfoMapper;
	
	@Override
	public void addBorrowInfo(BorrowInfo borrowInfo) throws Exception {
		borrowInfoMapper.addBorrowInfo(borrowInfo);
	}

	
	
}
