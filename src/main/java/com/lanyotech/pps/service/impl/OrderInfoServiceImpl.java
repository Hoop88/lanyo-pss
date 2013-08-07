package com.lanyotech.pps.service.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.dao.IOrderInfoDAO;
import com.lanyotech.pps.dao.IProductStockDAO;
import com.lanyotech.pps.dao.IStockOutcomeDAO;
import com.lanyotech.pps.domain.OrderInfo;
import com.lanyotech.pps.domain.OrderInfoItem;
import com.lanyotech.pps.domain.StockOutcome;
import com.lanyotech.pps.domain.StockOutcomeItem;
import com.lanyotech.pps.service.IOrderInfoService;
import com.lanyotech.pps.util.AudingException;

/**
 * OrderInfoServiceImpl
 * 
 * @author EasyJWeb 1.0-m2 $Id: OrderInfoServiceImpl.java,v 0.0.1 2010-11-30 9:48:24 EasyJWeb 1.0-m2 Exp $
 */
public class OrderInfoServiceImpl implements IOrderInfoService {

	private IOrderInfoDAO orderInfoDao;

	public void setStockOutcomeDao(IStockOutcomeDAO stockOutcomeDao) {
		this.stockOutcomeDao = stockOutcomeDao;
	}

	private IStockOutcomeDAO stockOutcomeDao;
	@SuppressWarnings("unused")
	private IProductStockDAO productStockDao;

	public void setProductStockDao(IProductStockDAO productStockDao) {
		this.productStockDao = productStockDao;
	}

	public void setOrderInfoDao(IOrderInfoDAO orderInfoDao) {
		this.orderInfoDao = orderInfoDao;
	}

	public Long addOrderInfo(OrderInfo orderInfo) {
		this.orderInfoDao.save(orderInfo);
		if (orderInfo != null && orderInfo.getId() != null) {
			return orderInfo.getId();
		}
		return null;
	}

	public OrderInfo getOrderInfo(Long id) {
		OrderInfo orderInfo = this.orderInfoDao.get(id);
		return orderInfo;
	}

	public boolean delOrderInfo(Long id) {
		OrderInfo orderInfo = this.getOrderInfo(id);
		if (orderInfo != null) {
			this.orderInfoDao.remove(id);
			return true;
		}
		return false;
	}

	public boolean batchDelOrderInfos(List<Serializable> orderInfoIds) {

		for (Serializable id : orderInfoIds) {
			delOrderInfo((Long) id);
		}
		return true;
	}

	public IPageList getOrderInfoBy(IQueryObject queryObject) {
		return QueryUtil.query(queryObject, OrderInfo.class, this.orderInfoDao);
	}

	public boolean updateOrderInfo(Long id, OrderInfo orderInfo) {
		if (id != null) {
			orderInfo.setId(id);
		} else {
			return false;
		}
		this.orderInfoDao.update(orderInfo);
		return true;
	}

	/*
	 * public void saveOutcomeStatement(OrderInfo order) throws AudingException { if (order != null && order.getItems() != null) { List<OrderInfoItem>
	 * items = order.getItems(); StockOutcome outcome = new StockOutcome(); for (Iterator iterator = items.iterator(); iterator.hasNext();) {
	 * OrderInfoItem orderInfoItem = (OrderInfoItem) iterator.next(); Product product = orderInfoItem.getProduct(); ProductStock p =
	 * productStockDao.getBy("product", product); if (p != null) { BigDecimal storeNum = p.getStoreNum(); if
	 * (orderInfoItem.getNum().subtract(storeNum).intValue() > 0) { throw new AudingException(product.getName() +
	 * "库存不足,库存:"+storeNum+"出库:"+orderInfoItem.getNum()); } else { p.setStoreNum(storeNum.subtract(orderInfoItem.getNum())); p.setOutcomeDate(new
	 * Date()); } } else { throw new AudingException(product.getName() + "不存在,请确认?"); } StockOutcomeItem stockOutcomeItem = new StockOutcomeItem();
	 * stockOutcomeItem.setPrice(orderInfoItem.getPrice()); stockOutcomeItem.setAmount(orderInfoItem.getAmount());
	 * stockOutcomeItem.setNum(orderInfoItem.getNum()); stockOutcomeItem.setProduct(orderInfoItem.getProduct());
	 * stockOutcomeItem.setRemark(orderInfoItem.getRemark()); outcome.addItem(stockOutcomeItem); } outcome.setSn(order.getSn());
	 * outcome.setAuditing(false); outcome.setVdate(order.getVdate()); outcome.setClient(order.getClient());
	 * outcome.setInputUser(order.getInputUser()); outcome.setInputTime(order.getInputTime()); stockOutcomeDao.save(outcome);
	 * 
	 * } }
	 */

	@SuppressWarnings("rawtypes")
	public void saveOutcomeStatement(OrderInfo order) throws AudingException {
		if (order != null && order.getItems() != null) {
			List<OrderInfoItem> items = order.getItems();
			StockOutcome outcome = new StockOutcome();
			for (Iterator iterator = items.iterator(); iterator.hasNext();) {
				OrderInfoItem orderInfoItem = (OrderInfoItem) iterator.next();
				StockOutcomeItem stockOutcomeItem = new StockOutcomeItem();
				stockOutcomeItem.setPrice(orderInfoItem.getPrice());
				stockOutcomeItem.setAmount(orderInfoItem.getAmount());
				stockOutcomeItem.setNum(orderInfoItem.getNum());
				stockOutcomeItem.setProduct(orderInfoItem.getProduct());
				stockOutcomeItem.setRemark(orderInfoItem.getRemark());
				outcome.addItem(stockOutcomeItem);
			}
			outcome.setSn(order.getSn());
			outcome.setAuditing(false);
			outcome.setVdate(order.getVdate());
			outcome.setClient(order.getClient());
			outcome.setInputUser(order.getInputUser());
			outcome.setInputTime(order.getInputTime());
			stockOutcomeDao.save(outcome);

		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Map getChart(IQueryObject queryObject, String type) {
		StringBuffer sb = new StringBuffer("SELECT  obj FROM OrderInfo obj where 1=1");

		if (!queryObject.getQuery().equals("")) {
			sb.append("  and " + queryObject.getQuery());
		}
		sb.append("  GROUP BY month(obj.vdate)");
		List<Object> params = new ArrayList<Object>();
		params.addAll(queryObject.getParameters());
		List list = this.orderInfoDao.query(sb.toString(), params.toArray(), 0, -1);
		Map map = new HashMap();
		map.put("result", list);
		return map;
	}
}
