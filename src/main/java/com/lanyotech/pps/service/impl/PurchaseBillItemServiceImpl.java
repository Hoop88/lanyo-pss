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
import com.lanyotech.pps.dao.IPurchaseBillItemDAO;
import com.lanyotech.pps.domain.PurchaseBillItem;
import com.lanyotech.pps.service.IPurchaseBillItemService;

/**
 * PurchaseBillItemServiceImpl
 * 
 * @author EasyJWeb 1.0-m2
 */
public class PurchaseBillItemServiceImpl implements IPurchaseBillItemService {

	private IPurchaseBillItemDAO purchaseBillItemDao;

	public void setPurchaseBillItemDao(IPurchaseBillItemDAO purchaseBillItemDao) {
		this.purchaseBillItemDao = purchaseBillItemDao;
	}

	public Long addPurchaseBillItem(PurchaseBillItem purchaseBillItem) {
		this.purchaseBillItemDao.save(purchaseBillItem);
		if (purchaseBillItem != null && purchaseBillItem.getId() != null) {
			return purchaseBillItem.getId();
		}
		return null;
	}

	public PurchaseBillItem getPurchaseBillItem(Long id) {
		PurchaseBillItem purchaseBillItem = this.purchaseBillItemDao.get(id);
		return purchaseBillItem;
	}

	public boolean delPurchaseBillItem(Long id) {
		PurchaseBillItem purchaseBillItem = this.getPurchaseBillItem(id);
		if (purchaseBillItem != null) {
			this.purchaseBillItemDao.remove(id);
			return true;
		}
		return false;
	}

	public boolean batchDelPurchaseBillItems(List<Serializable> purchaseBillItemIds) {

		for (Serializable id : purchaseBillItemIds) {
			delPurchaseBillItem((Long) id);
		}
		return true;
	}

	public IPageList getPurchaseBillItemBy(IQueryObject queryObject) {
		return QueryUtil.query(queryObject, PurchaseBillItem.class, this.purchaseBillItemDao);
	}

	public boolean updatePurchaseBillItem(Long id, PurchaseBillItem purchaseBillItem) {
		if (id != null) {
			purchaseBillItem.setId(id);
		} else {
			return false;
		}
		this.purchaseBillItemDao.update(purchaseBillItem);
		return true;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Map getGroupBy(IQueryObject queryObject, String field) {
		StringBuffer sb = new StringBuffer("select obj,count(obj) from PurchaseBillItem obj");
		sb.append(" where 1=1  and " + queryObject.getQuery());
		sb.append(" group by ");
		sb.append(field);
		List<Object> params = new ArrayList<Object>();
		params.addAll(queryObject.getParameters());
		List l = this.purchaseBillItemDao.query(sb.toString(), params.toArray(), -1, -1);
		List result = new ArrayList();
		for (int i = 0; i < l.size(); i++) {
			Object[] os = (Object[]) l.get(i);
			PurchaseBillItem bill = (PurchaseBillItem) os[0];
			Long count = (Long) os[1];
			if (count > 1) {
				StringBuffer sbn = new StringBuffer("select obj from PurchaseBillItem obj where 1=1 ");
				if (field.equals("obj.bill.supplier")) {
					sbn.append("and obj.bill.supplier.id=" + bill.getBill().getSupplier().getId());
				}
				if (field.equals("obj.bill.buyer")) {
					sbn.append("and  obj.bill.buyer.id=" + bill.getBill().getBuyer().getId());
				}
				if (field.equals("obj.product")) {
					sbn.append("and obj.product.id=" + bill.getProduct().getId());
				}
				if (field.equals("obj.product.dir")) {
					sbn.append("and obj.product.dir.id=" + bill.getProduct().getDir().getId());
				}

				sbn.append(" and " + queryObject.getQuery());
				List<Object> par = new ArrayList<Object>();
				par.addAll(queryObject.getParameters());
				List ln = this.purchaseBillItemDao.query(sbn.toString(), par.toArray(), -1, -1);
				BigDecimal num = new BigDecimal(0);
				BigDecimal price = new BigDecimal(0);

				if (field.equals("month(obj.bill.vdate)")) {
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(bill.getBill().getVdate());

					int billMonth = calendar.get(Calendar.MONTH);

					for (int j = 0; j < ln.size(); j++) {
						PurchaseBillItem bil = (PurchaseBillItem) ln.get(j);
						calendar.setTime(bil.getBill().getVdate());
						int nMonth = calendar.get(Calendar.MONTH);
						if (nMonth == billMonth) {
							num = num.add(bill.getNum());
							price = price.add(bil.getAmount());
							Map map = new HashMap();

							map.put("vdate", bil.getBill().getVdate());
							map.put("supplier", bil.getBill().getSupplier().getName());
							map.put("buyer", bil.getBill().getBuyer().getTrueName());
							map.put("amount", bil.getBill().getAmount());
							map.put("status", bil.getBill().getStatus());
							if (bill.getBill().getAuditor() != null) {
								map.put("auditor", bil.getBill().getAuditor());
							}
							map.put("productName", bil.getProduct().getName());
							if (bill.getProduct() != null) {
								if (bill.getProduct().getDir() != null) {
									map.put("category", bil.getProduct().getDir().getName());
								}
							}
							map.put("types", billMonth + 1);
							map.put("num", bill.getNum());
							map.put("billSn", bil.getBill().getSn());
							result.add(map);
						}
					}
					Map tMap = new HashMap();

					tMap.put("sn", "合计:");
					tMap.put("types", billMonth + 1);
					tMap.put("num", num);
					tMap.put("amount", price.toString() + "");
					result.add(tMap);

				} else if (field.equals("day(obj.bill.vdate)")) {
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(bill.getBill().getVdate());

					int billDate = calendar.get(Calendar.DATE);

					for (int j = 0; j < ln.size(); j++) {
						PurchaseBillItem bil = (PurchaseBillItem) ln.get(j);
						calendar.setTime(bil.getBill().getVdate());
						int nDate = calendar.get(Calendar.DATE);
						if (nDate == billDate) {
							num = num.add(bill.getNum());
							price = price.add(bil.getAmount());
							Map map = new HashMap();

							map.put("vdate", bil.getBill().getVdate());
							map.put("supplier", bil.getBill().getSupplier().getName());
							map.put("buyer", bil.getBill().getBuyer().getTrueName());
							map.put("amount", bil.getBill().getAmount());
							map.put("status", bil.getBill().getStatus());
							if (bill.getBill().getAuditor() != null) {
								map.put("auditor", bil.getBill().getAuditor());
							}
							map.put("productName", bil.getProduct().getName());
							if (bill.getProduct() != null) {
								if (bill.getProduct().getDir() != null) {
									map.put("category", bil.getProduct().getDir().getName());
								}
							}
							map.put("types", billDate + "日");
							map.put("num", bill.getNum());
							map.put("billSn", bil.getBill().getSn());
							result.add(map);
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
						PurchaseBillItem bil = (PurchaseBillItem) ln.get(j);
						num = num.add(bill.getNum());
						price = price.add(bil.getAmount());
						Map map = new HashMap();
						if (field.equals("obj.bill.supplier")) {
							map.put("types", bill.getBill().getSupplier().getName());
						}
						if (field.equals("obj.bill.buyer")) {
							map.put("types", bill.getBill().getBuyer().getTrueName());
						}
						if (field.equals("obj.product")) {
							map.put("types", bill.getProduct().getName());
						}
						if (field.equals("obj.product.dir")) {
							map.put("types", bill.getProduct().getDir().getName());
						}
						if (field.equals("month(obj.bill.vdate)")) {
							Calendar calendar = Calendar.getInstance();
							calendar.setTime(bill.getBill().getVdate());
							map.put("types", (calendar.get(Calendar.MONTH) + 1) + "月");
						}
						map.put("vdate", bil.getBill().getVdate());
						map.put("supplier", bil.getBill().getSupplier().getName());
						map.put("buyer", bil.getBill().getBuyer().getTrueName());
						map.put("amount", bil.getBill().getAmount());
						map.put("status", bil.getBill().getStatus());
						if (bill.getBill().getAuditor() != null) {
							map.put("auditor", bil.getBill().getAuditor());
						}
						map.put("productName", bil.getProduct().getName());
						if (bill.getProduct() != null) {
							if (bill.getProduct().getDir() != null) {
								map.put("category", bil.getProduct().getDir().getName());
							}
						}
						map.put("num", bill.getNum());
						map.put("sn", bil.getBill().getSn());
						result.add(map);
					}
					Map tMap = new HashMap();

					tMap.put("sn", "合计:");
					if (field.equals("obj.bill.supplier")) {
						tMap.put("types", bill.getBill().getSupplier().getName());
					}
					if (field.equals("obj.bill.buyer")) {
						tMap.put("types", bill.getBill().getBuyer().getTrueName());
					}
					if (field.equals("obj.product")) {
						tMap.put("types", bill.getProduct().getName());
					}
					if (field.equals("obj.product.dir")) {
						tMap.put("types", bill.getProduct().getDir().getName());
					}
					if (field.equals("month(obj.bill.vdate)")) {
						Calendar calendar = Calendar.getInstance();
						calendar.setTime(bill.getBill().getVdate());
						tMap.put("types", (calendar.get(Calendar.MONTH) + 1) + "月");
					}
					tMap.put("num", num);
					tMap.put("amount", price.toString() + "");
					result.add(tMap);
				}
			} else {
				Map map = new HashMap();
				map.put("vdate", bill.getBill().getVdate());
				map.put("supplier", bill.getBill().getSupplier().getName());
				map.put("buyer", bill.getBill().getBuyer().getTrueName());
				map.put("amount", bill.getBill().getAmount());
				map.put("status", bill.getBill().getStatus());
				if (bill.getBill().getAuditor() != null) {
					map.put("auditor", bill.getBill().getAuditor());
				}
				map.put("productName", bill.getProduct().getName());
				if (bill.getProduct() != null) {
					if (bill.getProduct().getDir() != null) {
						map.put("category", bill.getProduct().getDir().getName());
					}
				}
				map.put("num", bill.getNum());
				map.put("sn", bill.getBill().getSn());
				Map tMap = new HashMap();
				tMap.put("sn", "合计:");
				tMap.put("num", bill.getNum());
				tMap.put("amount", bill.getAmount() + "");
				if (field.equals("obj.bill.supplier")) {
					map.put("types", bill.getBill().getSupplier().getName());
					tMap.put("types", bill.getBill().getSupplier().getName());
				}
				if (field.equals("obj.bill.buyer")) {
					map.put("types", bill.getBill().getBuyer().getTrueName());
					tMap.put("types", bill.getBill().getBuyer().getTrueName());
				}
				if (field.equals("obj.product")) {
					map.put("types", bill.getProduct().getName());
					tMap.put("types", bill.getProduct().getName());
				}
				if (field.equals("obj.product.dir")) {
					map.put("types", bill.getProduct().getDir().getName());
					tMap.put("types", bill.getProduct().getDir().getName());
				}
				if (field.equals("month(obj.bill.vdate)")) {
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(bill.getBill().getVdate());
					tMap.put("types", (calendar.get(Calendar.MONTH) + 1));
					map.put("types", (calendar.get(Calendar.MONTH) + 1));
				}
				if (field.equals("day(obj.bill.vdate)")) {
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(bill.getBill().getVdate());
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

}
