package com.lanyotech.pps.service;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.domain.OrderInfoItem;

/**
 * OrderInfoItemService
 * 
 * @author EasyJWeb 1.0-m2 $Id: OrderInfoItemService.java,v 0.0.1 2010-11-30 9:48:36 EasyJWeb 1.0-m2 Exp $
 */
public interface IOrderInfoItemService {
	/**
	 * 保存一个OrderInfoItem，如果保存成功返回该对象的id，否则返回null
	 * 
	 * @param instance
	 * @return 保存成功的对象的Id
	 */
	Long addOrderInfoItem(OrderInfoItem instance);

	/**
	 * 根据一个ID得到OrderInfoItem
	 * 
	 * @param id
	 * @return
	 */
	OrderInfoItem getOrderInfoItem(Long id);

	/**
	 * 删除一个OrderInfoItem
	 * 
	 * @param id
	 * @return
	 */
	boolean delOrderInfoItem(Long id);

	/**
	 * 批量删除OrderInfoItem
	 * 
	 * @param ids
	 * @return
	 */
	boolean batchDelOrderInfoItems(List<Serializable> ids);

	/**
	 * 通过一个查询对象得到OrderInfoItem
	 * 
	 * @param properties
	 * @return
	 */
	IPageList getOrderInfoItemBy(IQueryObject queryObject);

	/**
	 * 更新一个OrderInfoItem
	 * 
	 * @param id
	 *            需要更新的OrderInfoItem的id
	 * @param dir
	 *            需要更新的OrderInfoItem
	 */
	boolean updateOrderInfoItem(Long id, OrderInfoItem instance);

	/**
	 * 分组查询
	 * 
	 * @param queryObject
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	Map getGroupBy(IQueryObject queryObject, String field);

	@SuppressWarnings("rawtypes")
	Map getChart(IQueryObject queryObject, String type);
}
