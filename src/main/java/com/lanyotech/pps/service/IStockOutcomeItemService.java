package com.lanyotech.pps.service;

import java.io.Serializable;
import java.util.List;
import com.easyjf.web.tools.IPageList;
import com.easyjf.core.support.query.IQueryObject;
import com.lanyotech.pps.domain.StockIncomeItem;
import com.lanyotech.pps.domain.StockOutcomeItem;
/**
 * StockOutcomeItemService
 * @author EasyJWeb 1.0-m2
 * $Id: StockOutcomeItemService.java,v 0.0.1 2010-11-30 20:28:45 EasyJWeb 1.0-m2 Exp $
 */
public interface IStockOutcomeItemService {
	/**
	 * 保存一个StockOutcomeItem，如果保存成功返回该对象的id，否则返回null
	 * 
	 * @param instance
	 * @return 保存成功的对象的Id
	 */
	Long addStockOutcomeItem(StockOutcomeItem instance);
	
	/**
	 * 根据一个ID得到StockOutcomeItem
	 * 
	 * @param id
	 * @return
	 */
	StockOutcomeItem getStockOutcomeItem(Long id);
	
	/**
	 * 删除一个StockOutcomeItem
	 * @param id
	 * @return
	 */
	boolean delStockOutcomeItem(Long id);
	
	/**
	 * 批量删除StockOutcomeItem
	 * @param ids
	 * @return
	 */
	boolean batchDelStockOutcomeItems(List<Serializable> ids);
	
	/**
	 * 通过一个查询对象得到StockOutcomeItem
	 * 
	 * @param properties
	 * @return
	 */
	IPageList getStockOutcomeItemBy(IQueryObject queryObject);
	
	/**
	  * 更新一个StockOutcomeItem
	  * @param id 需要更新的StockOutcomeItem的id
	  * @param dir 需要更新的StockOutcomeItem
	  */
	boolean updateStockOutcomeItem(Long id,StockOutcomeItem instance);

	/**
	 * 根据出库单获取所有明细项
	 * @param id
	 * @return
	 */
	List<StockIncomeItem> loadItemById(Long id);
}
