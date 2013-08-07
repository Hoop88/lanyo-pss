package com.lanyotech.pps.service;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.domain.PurchaseBillItem;

/**
 * PurchaseBillItemService
 * 
 * @author EasyJWeb 1.0-m2 $Id: PurchaseBillItemService.java,v 0.0.1 2010-12-2 14:37:55 EasyJWeb 1.0-m2 Exp $
 */
public interface IPurchaseBillItemService {
	/**
	 * 保存一个PurchaseBillItem，如果保存成功返回该对象的id，否则返回null
	 * 
	 * @param instance
	 * @return 保存成功的对象的Id
	 */
	Long addPurchaseBillItem(PurchaseBillItem instance);

	/**
	 * 根据一个ID得到PurchaseBillItem
	 * 
	 * @param id
	 * @return
	 */
	PurchaseBillItem getPurchaseBillItem(Long id);

	/**
	 * 删除一个PurchaseBillItem
	 * 
	 * @param id
	 * @return
	 */
	boolean delPurchaseBillItem(Long id);

	/**
	 * 批量删除PurchaseBillItem
	 * 
	 * @param ids
	 * @return
	 */
	boolean batchDelPurchaseBillItems(List<Serializable> ids);

	/**
	 * 通过一个查询对象得到PurchaseBillItem
	 * 
	 * @param properties
	 * @return
	 */
	IPageList getPurchaseBillItemBy(IQueryObject queryObject);

	/**
	 * 更新一个PurchaseBillItem
	 * 
	 * @param id
	 *            需要更新的PurchaseBillItem的id
	 * @param dir
	 *            需要更新的PurchaseBillItem
	 */
	boolean updatePurchaseBillItem(Long id, PurchaseBillItem instance);

	/**
	 * 分组查询
	 * 
	 * @param queryObject
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	Map getGroupBy(IQueryObject queryObject, String field);
}
