package com.lanyotech.pps.service.impl;

import java.io.Serializable;
import java.util.List;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.dao.IStockIncomeItemDAO;
import com.lanyotech.pps.domain.StockIncomeItem;
import com.lanyotech.pps.service.IStockIncomeItemService;

/**
 * StockIncomeItemServiceImpl
 * 
 * @author EasyJWeb 1.0-m2 $Id: StockIncomeItemServiceImpl.java,v 0.0.1 2010-11-30 20:29:06 EasyJWeb 1.0-m2 Exp $
 */
public class StockIncomeItemServiceImpl implements IStockIncomeItemService {

	private IStockIncomeItemDAO stockIncomeItemDao;

	public void setStockIncomeItemDao(IStockIncomeItemDAO stockIncomeItemDao) {
		this.stockIncomeItemDao = stockIncomeItemDao;
	}

	public Long addStockIncomeItem(StockIncomeItem stockIncomeItem) {
		this.stockIncomeItemDao.save(stockIncomeItem);
		if (stockIncomeItem != null && stockIncomeItem.getId() != null) {
			return stockIncomeItem.getId();
		}
		return null;
	}

	public StockIncomeItem getStockIncomeItem(Long id) {
		StockIncomeItem stockIncomeItem = this.stockIncomeItemDao.get(id);
		return stockIncomeItem;
	}

	public boolean delStockIncomeItem(Long id) {
		StockIncomeItem stockIncomeItem = this.getStockIncomeItem(id);
		if (stockIncomeItem != null) {
			this.stockIncomeItemDao.remove(id);
			return true;
		}
		return false;
	}

	public boolean batchDelStockIncomeItems(List<Serializable> stockIncomeItemIds) {

		for (Serializable id : stockIncomeItemIds) {
			delStockIncomeItem((Long) id);
		}
		return true;
	}

	public IPageList getStockIncomeItemBy(IQueryObject queryObject) {
		return QueryUtil.query(queryObject, StockIncomeItem.class, this.stockIncomeItemDao);
	}

	public boolean updateStockIncomeItem(Long id, StockIncomeItem stockIncomeItem) {
		if (id != null) {
			stockIncomeItem.setId(id);
		} else {
			return false;
		}
		this.stockIncomeItemDao.update(stockIncomeItem);
		return true;
	}

	@SuppressWarnings("unchecked")
	public List<StockIncomeItem> loadItemById(Long id) {
		String jpql = "SELECT obj FROM StockIncomeItem obj WHERE obj.bill.id = ?";
		return this.stockIncomeItemDao.query(jpql, new Object[] { id }, -1, -1);
	}
}
