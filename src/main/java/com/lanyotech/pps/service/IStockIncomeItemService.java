package com.lanyotech.pps.service;

import java.io.Serializable;
import java.util.List;
import com.easyjf.web.tools.IPageList;
import com.easyjf.core.support.query.IQueryObject;
import com.lanyotech.pps.domain.StockIncomeItem;
/**
 * StockIncomeItemService
 * @author EasyJWeb 1.0-m2
 * $Id: StockIncomeItemService.java,v 0.0.1 2010-11-30 20:29:06 EasyJWeb 1.0-m2 Exp $
 */
public interface IStockIncomeItemService {
	/**
	 * 保存一个StockIncomeItem，如果保存成功返回该对象的id，否则返回null
	 * 
	 * @param instance
	 * @return 保存成功的对象的Id
	 */
	Long addStockIncomeItem(StockIncomeItem instance);
	
	/**
	 * 根据一个ID得到StockIncomeItem
	 * 
	 * @param id
	 * @return
	 */
	StockIncomeItem getStockIncomeItem(Long id);
	
	/**
	 * 删除一个StockIncomeItem
	 * @param id
	 * @return
	 */
	boolean delStockIncomeItem(Long id);
	
	/**
	 * 批量删除StockIncomeItem
	 * @param ids
	 * @return
	 */
	boolean batchDelStockIncomeItems(List<Serializable> ids);
	
	/**
	 * 通过一个查询对象得到StockIncomeItem
	 * 
	 * @param properties
	 * @return
	 */
	IPageList getStockIncomeItemBy(IQueryObject queryObject);
	
	/**
	  * 更新一个StockIncomeItem
	  * @param id 需要更新的StockIncomeItem的id
	  * @param dir 需要更新的StockIncomeItem
	  */
	boolean updateStockIncomeItem(Long id,StockIncomeItem instance);
	
	/**
	 * 通过StockIncome id获取相应的明细
	 * @param id
	 * @return
	 */
	List<StockIncomeItem> loadItemById(Long id);
}
