package com.lanyotech.pps.service;

import java.io.Serializable;
import java.util.List;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.domain.StockDetailAccount;
import com.lanyotech.pps.domain.StockIncome;
import com.lanyotech.pps.domain.StockOutcome;
/**
 * StockDetailAccountService
 * @author EasyJWeb 1.0-m2
 * $Id: StockDetailAccountService.java,v 0.0.1 2010-11-30 20:29:27 EasyJWeb 1.0-m2 Exp $
 */
public interface IStockDetailAccountService {
	/**
	 * 保存一个StockDetailAccount，如果保存成功返回该对象的id，否则返回null
	 * 
	 * @param instance
	 * @return 保存成功的对象的Id
	 */
	Long addStockDetailAccount(StockDetailAccount instance);
	
	/**
	 * 根据一个ID得到StockDetailAccount
	 * 
	 * @param id
	 * @return
	 */
	StockDetailAccount getStockDetailAccount(Long id);
	
	/**
	 * 删除一个StockDetailAccount
	 * @param id
	 * @return
	 */
	boolean delStockDetailAccount(Long id);
	
	/**
	 * 批量删除StockDetailAccount
	 * @param ids
	 * @return
	 */
	boolean batchDelStockDetailAccounts(List<Serializable> ids);
	
	/**
	 * 通过一个查询对象得到StockDetailAccount
	 * 
	 * @param properties
	 * @return
	 */
	IPageList getStockDetailAccountBy(IQueryObject queryObject);
	
	/**
	  * 更新一个StockDetailAccount
	  * @param id 需要更新的StockDetailAccount的id
	  * @param dir 需要更新的StockDetailAccount
	  */
	boolean updateStockDetailAccount(Long id,StockDetailAccount instance);
	
	/**
	 * 出库单入帐
	 * @param object
	 */
	void createStockDetailAccount(StockOutcome object);
	
	/**
	 * 入库单入帐
	 * @param object
	 */
	void createStockDetailAccount(StockIncome object);
}
