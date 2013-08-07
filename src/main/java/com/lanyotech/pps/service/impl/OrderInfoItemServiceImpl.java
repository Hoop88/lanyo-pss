package com.lanyotech.pps.service.impl;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.dao.IOrderInfoItemDAO;
import com.lanyotech.pps.domain.OrderInfoItem;
import com.lanyotech.pps.service.IOrderInfoItemService;

/**
 * OrderInfoItemServiceImpl
 * 
 * @author EasyJWeb 1.0-m2 $Id: OrderInfoItemServiceImpl.java,v 0.0.1 2010-11-30
 *         9:48:36 EasyJWeb 1.0-m2 Exp $
 */
public class OrderInfoItemServiceImpl implements IOrderInfoItemService {

	private IOrderInfoItemDAO orderInfoItemDao;

	public void setOrderInfoItemDao(IOrderInfoItemDAO orderInfoItemDao) {
		this.orderInfoItemDao = orderInfoItemDao;
	}

	public Long addOrderInfoItem(OrderInfoItem orderInfoItem) {
		this.orderInfoItemDao.save(orderInfoItem);
		if (orderInfoItem != null && orderInfoItem.getId() != null) {
			return orderInfoItem.getId();
		}
		return null;
	}

	public OrderInfoItem getOrderInfoItem(Long id) {
		OrderInfoItem orderInfoItem = this.orderInfoItemDao.get(id);
		return orderInfoItem;
	}

	public boolean delOrderInfoItem(Long id) {
		OrderInfoItem orderInfoItem = this.getOrderInfoItem(id);
		if (orderInfoItem != null) {
			this.orderInfoItemDao.remove(id);
			return true;
		}
		return false;
	}

	public boolean batchDelOrderInfoItems(List<Serializable> orderInfoItemIds) {

		for (Serializable id : orderInfoItemIds) {
			delOrderInfoItem((Long) id);
		}
		return true;
	}

	public IPageList getOrderInfoItemBy(IQueryObject queryObject) {
		return QueryUtil.query(queryObject, OrderInfoItem.class,
				this.orderInfoItemDao);
	}

	public boolean updateOrderInfoItem(Long id, OrderInfoItem orderInfoItem) {
		if (id != null) {
			orderInfoItem.setId(id);
		} else {
			return false;
		}
		this.orderInfoItemDao.update(orderInfoItem);
		return true;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Map getGroupBy(IQueryObject queryObject, String field) {

		StringBuffer sb = new StringBuffer(
				"select obj,count(obj) from OrderInfoItem obj");
		sb.append(" where 1=1  and " + queryObject.getQuery());
		sb.append(" group by ");
		sb.append(field);
		sb.append(" order by ");
		sb.append(" obj.orderInfo.vdate");
		List<Object> params = new ArrayList<Object>();
		params.addAll(queryObject.getParameters());
		List l = this.orderInfoItemDao.query(sb.toString(), params.toArray(),
				-1, -1);
		List result = new ArrayList();
		for (int i = 0; i < l.size(); i++) {
			Object[] os = (Object[]) l.get(i);
			OrderInfoItem bill = (OrderInfoItem) os[0];
			Long count = (Long) os[1];
			if (count > 1) {
				StringBuffer sbn = new StringBuffer(
						"select obj from OrderInfoItem obj where 1=1 ");
				if (field.equals("obj.orderInfo.client")) {
					sbn.append("and obj.orderInfo.client.id="
							+ bill.getOrderInfo().getClient().getId());
				}
				if (field.equals("obj.orderInfo.seller")) {
					sbn.append("and  obj.orderInfo.seller.id="
							+ bill.getOrderInfo().getSeller().getId());
				}
				if (field.equals("obj.product")) {
					sbn.append("and obj.product.id="
							+ bill.getProduct().getId());
				}
				if (field.equals("obj.product.dir")) {
					sbn.append("and obj.product.dir.id="
							+ bill.getProduct().getDir().getId());
				}

				sbn.append(" and " + queryObject.getQuery());
				List<Object> par = new ArrayList<Object>();
				par.addAll(queryObject.getParameters());
				List ln = this.orderInfoItemDao.query(sbn.toString(),
						par.toArray(), -1, -1);
				BigDecimal num = new BigDecimal(0);
				BigDecimal price = new BigDecimal(0);

				if (field.equals("month(obj.orderInfo.vdate)")) {
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(bill.getOrderInfo().getVdate());

					int billMonth = calendar.get(Calendar.MONTH);

					for (int j = 0; j < ln.size(); j++) {
						OrderInfoItem bil = (OrderInfoItem) ln.get(j);
						if (bil.getOrderInfo() != null) {
							calendar.setTime(bil.getOrderInfo().getVdate());
							int nMonth = calendar.get(Calendar.MONTH);
							if (nMonth == billMonth) {
								num = num.add(bill.getNum());
								price = price.add(bil.getAmount());
								Map map = new HashMap();

								map.put("vdate", bil.getOrderInfo().getVdate());
								map.put("client", bil.getOrderInfo()
										.getClient().getName());
								map.put("seller", bil.getOrderInfo()
										.getSeller().getTrueName());
								map.put("amount", bil.getOrderInfo()
										.getAmount());
								map.put("status", bil.getOrderInfo()
										.getStatus());
								/*if (bill.getOrderInfo().getAuditor() != null) {
									map.put("auditor", bil.getOrderInfo()
											.getAuditor());
								}*/
								map.put("productName", bil.getProduct()
										.getName());
								if (bill.getProduct() != null) {
									if (bill.getProduct().getDir() != null) {
										map.put("category", bil.getProduct()
												.getDir().getName());
									}
								}
								map.put("types", billMonth + 1+"月");
								map.put("num", bill.getNum());
								map.put("sn", bil.getOrderInfo().getSn());
								result.add(map);
							}
						}
					}
					Map tMap = new HashMap();

					tMap.put("sn", "合计:");
					tMap.put("types", billMonth + 1+"月");
					tMap.put("num", num);
					tMap.put("amount", price.toString() + "");
					result.add(tMap);

				} else if (field.equals("day(obj.orderInfo.vdate)")) {
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(bill.getOrderInfo().getVdate());

					int billDate = calendar.get(Calendar.DATE);

					for (int j = 0; j < ln.size(); j++) {
						OrderInfoItem bil = (OrderInfoItem) ln.get(j);
						if (bil.getOrderInfo() != null) {
							calendar.setTime(bil.getOrderInfo().getVdate());
							int nDate = calendar.get(Calendar.DATE);
							if (nDate == billDate) {
								num = num.add(bill.getNum());
								price = price.add(bil.getAmount());
								Map map = new HashMap();

								map.put("vdate", bil.getOrderInfo().getVdate());
								map.put("client", bil.getOrderInfo()
										.getClient().getName());
								map.put("seller", bil.getOrderInfo()
										.getSeller().getTrueName());
								map.put("amount", bil.getOrderInfo()
										.getAmount());
								map.put("status", bil.getOrderInfo()
										.getStatus());
								/*
								 * if (bill.getOrderInfo().getAuditor() != null)
								 * { map.put("auditor", bil.getOrderInfo()
								 * .getAuditor()); }
								 */
								map.put("productName", bil.getProduct()
										.getName());
								if (bill.getProduct() != null) {
									if (bill.getProduct().getDir() != null) {
										map.put("category", bil.getProduct()
												.getDir().getName());
									}
								}
								map.put("types", billDate + "日");
								map.put("num", bill.getNum());
								map.put("sn", bil.getOrderInfo().getSn());
								result.add(map);
							}
						}
					}
					Map tMap = new HashMap();

					tMap.put("sn", "合计:");
					tMap.put("types", billDate + "日");
					tMap.put("num", num);
					tMap.put("amount", price.toString() + "");
					result.add(tMap);

				} else {
					for (int j = 0; j < ln.size(); j++) {
						OrderInfoItem bil = (OrderInfoItem) ln.get(j);
						num = num.add(bill.getNum());
						price = price.add(bil.getAmount());
						Map map = new HashMap();
						if (field.equals("obj.orderInfo.client")) {
							map.put("types", bill.getOrderInfo().getClient()
									.getName());
						}
						if (field.equals("obj.orderInfo.seller")) {
							map.put("types", bill.getOrderInfo().getSeller()
									.getTrueName());
						}
						if (field.equals("obj.product")) {
							map.put("types", bill.getProduct().getName());
						}
						if (field.equals("obj.product.dir")) {
							map.put("types", bill.getProduct().getDir()
									.getName());
						}
						if (bil.getOrderInfo() != null) {
							map.put("vdate", bil.getOrderInfo().getVdate());
							map.put("client", bil.getOrderInfo().getClient()
									.getName());
							map.put("seller", bil.getOrderInfo().getSeller()
									.getTrueName());
							map.put("amount", bil.getOrderInfo().getAmount());
							map.put("status", bil.getOrderInfo().getStatus());
							/*
							 * if (bill.getOrderInfo().getAuditor() != null) {
							 * map.put("auditor", bil.getOrderInfo()
							 * .getAuditor()); }
							 */
							map.put("productName", bil.getProduct().getName());
							if (bill.getProduct() != null) {
								if (bill.getProduct().getDir() != null) {
									map.put("category", bil.getProduct()
											.getDir().getName());
								}
							}
							map.put("num", bill.getNum());
							map.put("sn", bil.getOrderInfo().getSn());
							result.add(map);
						}
					}
					Map tMap = new HashMap();

					tMap.put("sn", "合计:");
					if (field.equals("obj.orderInfo.client")) {
						tMap.put("types", bill.getOrderInfo().getClient()
								.getName());
					}
					if (field.equals("obj.orderInfo.seller")) {
						tMap.put("types", bill.getOrderInfo().getSeller()
								.getTrueName());
					}
					if (field.equals("obj.product")) {
						tMap.put("types", bill.getProduct().getName());
					}
					if (field.equals("obj.product.dir")) {
						tMap.put("types", bill.getProduct().getDir().getName());
					}
					tMap.put("num", num);
					tMap.put("amount", price.toString() + "");
					result.add(tMap);
				}
			} else {
				Map map = new HashMap();
				map.put("vdate", bill.getOrderInfo().getVdate());
				map.put("client", bill.getOrderInfo().getClient().getName());
				map.put("seller", bill.getOrderInfo().getSeller().getTrueName());
				map.put("amount", bill.getOrderInfo().getAmount());
				map.put("status", bill.getOrderInfo().getStatus());
				/*
				 * if (bill.getOrderInfo().getAuditor() != null) {
				 * map.put("auditor", bill.getOrderInfo().getAuditor()); }
				 */
				map.put("productName", bill.getProduct().getName());
				if (bill.getProduct() != null) {
					if (bill.getProduct().getDir() != null) {
						map.put("category", bill.getProduct().getDir()
								.getName());
					}
				}
				map.put("num", bill.getNum());
				map.put("sn", bill.getOrderInfo().getSn());
				Map tMap = new HashMap();
				tMap.put("sn", "合计:");
				tMap.put("num", bill.getNum());
				tMap.put("amount", bill.getAmount() + "");
				if (field.equals("obj.orderInfo.client")) {
					map.put("types", bill.getOrderInfo().getClient().getName());
					tMap.put("types", bill.getOrderInfo().getClient().getName());
				}
				if (field.equals("obj.orderInfo.seller")) {
					map.put("types", bill.getOrderInfo().getSeller()
							.getTrueName());
					tMap.put("types", bill.getOrderInfo().getSeller()
							.getTrueName());
				}
				if (field.equals("obj.product")) {
					map.put("types", bill.getProduct().getName());
					tMap.put("types", bill.getProduct().getName());
				}
				if (field.equals("obj.product.dir")) {
					map.put("types", bill.getProduct().getDir().getName());
					tMap.put("types", bill.getProduct().getDir().getName());
				}
				if (field.equals("month(obj.orderInfo.vdate)")) {
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(bill.getOrderInfo().getVdate());
					tMap.put("types", (calendar.get(Calendar.MONTH) + 1) + "月");
					map.put("types", (calendar.get(Calendar.MONTH) + 1) + "月");
				}
				if (field.equals("day(obj.orderInfo.vdate)")) {
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(bill.getOrderInfo().getVdate());
					tMap.put("types", (calendar.get(Calendar.DATE) + 1) + "日");
					map.put("types", (calendar.get(Calendar.DATE) + 1) + "日");
				}
				result.add(map);
				result.add(tMap);
			}
		}
		Map map = new HashMap();
		map.put("result", result);
		return map;

	}

	@SuppressWarnings("rawtypes")
	public Map getChart(IQueryObject queryObject, String type) {
		/*
		 * StringBuffer sb = new StringBuffer(
		 * "SELECT  obj.orderInfo FROM OrderInfoItem obj where 1=1"); if
		 * (!queryObject.getQuery().equals("")) { sb.append("  and " +
		 * queryObject.getQuery()); } sb.append("  GROUP BY obj.product.dir)");
		 * List<Object> params = new ArrayList<Object>();
		 * params.addAll(queryObject.getParameters()); List list =
		 * this.orderInfoItemDao.query(sb.toString(), params.toArray(), 0, -1);
		 * 
		 * for (int i = 0; i < list.size(); i++) { Map map = new HashMap();
		 * OrderInfo orderInfo = (OrderInfo) list.get(i); List<OrderInfoItem>
		 * items = orderInfo.getItems(); BigDecimal num = new BigDecimal(0); for
		 * (int j = 0; j < items.size(); j++) { OrderInfoItem orderInfoItem =
		 * items.get(j); num = num.add(orderInfoItem.getNum()); } map.put("num",
		 * num); map.put("category",
		 * items.get(0).getProduct().getDir().getName()); list.set(i, map); }
		 * 
		 * Map map1 = new HashMap(); map1.put("result", list);
		 */
		return null;
	}
}
