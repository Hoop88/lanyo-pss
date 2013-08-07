package com.lanyotech.pps.service.impl;

import java.io.Serializable;
import java.util.Iterator;
import java.util.List;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.dao.IProductStockDAO;
import com.lanyotech.pps.dao.IPurchaseBillDAO;
import com.lanyotech.pps.domain.Product;
import com.lanyotech.pps.domain.ProductStock;
import com.lanyotech.pps.domain.PurchaseBill;
import com.lanyotech.pps.domain.PurchaseBillItem;
import com.lanyotech.pps.service.IPurchaseBillService;

/**
 * PurchaseBillServiceImpl
 * 
 * @author EasyJWeb 1.0-m2 $Id: PurchaseBillServiceImpl.java,v 0.0.1 2010-11-30 20:29:46 EasyJWeb 1.0-m2 Exp $
 */
public class PurchaseBillServiceImpl implements IPurchaseBillService {

	private IPurchaseBillDAO purchaseBillDao;
	private IProductStockDAO productStockDao;

	public IProductStockDAO getProductStockDao() {
		return productStockDao;
	}

	public void setProductStockDao(IProductStockDAO productStockDao) {
		this.productStockDao = productStockDao;
	}

	public IPurchaseBillDAO getPurchaseBillDao() {
		return purchaseBillDao;
	}

	public void setPurchaseBillDao(IPurchaseBillDAO purchaseBillDao) {
		this.purchaseBillDao = purchaseBillDao;
	}

	public Long addPurchaseBill(PurchaseBill purchaseBill) {
		this.purchaseBillDao.save(purchaseBill);
		if (purchaseBill != null && purchaseBill.getId() != null) {
			return purchaseBill.getId();
		}
		return null;
	}

	public PurchaseBill getPurchaseBill(Long id) {
		PurchaseBill purchaseBill = this.purchaseBillDao.get(id);
		return purchaseBill;
	}

	public boolean delPurchaseBill(Long id) {
		PurchaseBill purchaseBill = this.getPurchaseBill(id);
		if (purchaseBill != null) {
			this.purchaseBillDao.remove(id);
			return true;
		}
		return false;
	}

	public boolean batchDelPurchaseBills(List<Serializable> purchaseBillIds) {

		for (Serializable id : purchaseBillIds) {
			delPurchaseBill((Long) id);
		}
		return true;
	}

	public IPageList getPurchaseBillBy(IQueryObject queryObject) {
		return QueryUtil.query(queryObject, PurchaseBill.class, this.purchaseBillDao);
	}

	public boolean updatePurchaseBill(Long id, PurchaseBill purchaseBill) {
		if (id != null) {
			purchaseBill.setId(id);
		} else {
			return false;
		}
		this.purchaseBillDao.update(purchaseBill);
		return true;
	}

	@SuppressWarnings("rawtypes")
	public void incomeStock(PurchaseBill bill) {
		List<PurchaseBillItem> list = bill.getItems();
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			PurchaseBillItem purchaseBillItem = (PurchaseBillItem) iterator.next();
			Product product = purchaseBillItem.getProduct();
			ProductStock stock = productStockDao.getBy("product", product);
			if (stock != null) {
				stock.setStoreNum(stock.getStoreNum().add(purchaseBillItem.getNum()));
				productStockDao.update(stock);

			} else {
				ProductStock stocks = new ProductStock();
				stocks.setProduct(product);
				stocks.setPrice(product.getSalePrice());
				stocks.setStoreNum(purchaseBillItem.getNum());
				productStockDao.save(stocks);
			}
		}

	}
	/*
	 * public void incomeStock(PurchaseBill bill) { List<PurchaseBillItem> list = bill.getItems(); for (Iterator iterator = list.iterator();
	 * iterator.hasNext();) { PurchaseBillItem purchaseBillItem = (PurchaseBillItem) iterator .next(); Product product =
	 * purchaseBillItem.getProduct(); ProductStock stock = productStockDao.getBy("product", product); if (stock != null) {
	 * stock.setStoreNum(stock.getStoreNum().add( purchaseBillItem.getNum())); productStockDao.update(stock);
	 * 
	 * } else { ProductStock stocks = new ProductStock(); stocks.setProduct(product); stocks.setPrice(product.getSalePrice());
	 * stocks.setStoreNum(purchaseBillItem.getNum()); productStockDao.save(stocks); } }
	 * 
	 * }
	 */

}
