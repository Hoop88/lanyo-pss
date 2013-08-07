package com.lanyotech.pps.service.impl;

import java.io.Serializable;
import java.util.List;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.dao.IStockOutcomeItemDAO;
import com.lanyotech.pps.domain.StockIncomeItem;
import com.lanyotech.pps.domain.StockOutcomeItem;
import com.lanyotech.pps.service.IStockOutcomeItemService;

/**
 * StockOutcomeItemServiceImpl
 * 
 * @author EasyJWeb 1.0-m2 $Id: StockOutcomeItemServiceImpl.java,v 0.0.1 2010-11-30 20:28:45 EasyJWeb 1.0-m2 Exp $
 */
public class StockOutcomeItemServiceImpl implements IStockOutcomeItemService {

	private IStockOutcomeItemDAO stockOutcomeItemDao;

	public void setStockOutcomeItemDao(IStockOutcomeItemDAO stockOutcomeItemDao) {
		this.stockOutcomeItemDao = stockOutcomeItemDao;
	}

	public Long addStockOutcomeItem(StockOutcomeItem stockOutcomeItem) {
		this.stockOutcomeItemDao.save(stockOutcomeItem);
		if (stockOutcomeItem != null && stockOutcomeItem.getId() != null) {
			return stockOutcomeItem.getId();
		}
		return null;
	}

	public StockOutcomeItem getStockOutcomeItem(Long id) {
		StockOutcomeItem stockOutcomeItem = this.stockOutcomeItemDao.get(id);
		return stockOutcomeItem;
	}

	public boolean delStockOutcomeItem(Long id) {
		StockOutcomeItem stockOutcomeItem = this.getStockOutcomeItem(id);
		if (stockOutcomeItem != null) {
			this.stockOutcomeItemDao.remove(id);
			return true;
		}
		return false;
	}

	public boolean batchDelStockOutcomeItems(List<Serializable> stockOutcomeItemIds) {

		for (Serializable id : stockOutcomeItemIds) {
			delStockOutcomeItem((Long) id);
		}
		return true;
	}

	public IPageList getStockOutcomeItemBy(IQueryObject queryObject) {
		return QueryUtil.query(queryObject, StockOutcomeItem.class, this.stockOutcomeItemDao);
	}

	public boolean updateStockOutcomeItem(Long id, StockOutcomeItem stockOutcomeItem) {
		if (id != null) {
			stockOutcomeItem.setId(id);
		} else {
			return false;
		}
		this.stockOutcomeItemDao.update(stockOutcomeItem);
		return true;
	}

	@SuppressWarnings("unchecked")
	public List<StockIncomeItem> loadItemById(Long id) {
		String jpql = "SELECT obj FROM StockOutcomeItem obj WHERE obj.bill.id = ?";
		List<StockIncomeItem> list = this.stockOutcomeItemDao.query(jpql, new Object[] { id }, -1, -1);
		return list;
	}
}
