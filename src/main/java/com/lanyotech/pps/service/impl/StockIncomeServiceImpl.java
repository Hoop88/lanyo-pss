package com.lanyotech.pps.service.impl;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.dao.IStockIncomeDAO;
import com.lanyotech.pps.domain.Employee;
import com.lanyotech.pps.domain.StockIncome;
import com.lanyotech.pps.service.IStockIncomeItemService;
import com.lanyotech.pps.service.IStockIncomeService;
import com.lanyotech.security.UserContext;

/**
 * StockIncomeServiceImpl
 * 
 * @author EasyJWeb 1.0-m2 $Id: StockIncomeServiceImpl.java,v 0.0.1 2010-11-30 20:29:02 EasyJWeb 1.0-m2 Exp $
 */
public class StockIncomeServiceImpl implements IStockIncomeService {

	@SuppressWarnings("unused")
	private IStockIncomeItemService incomeItemService;

	public void setIncomeItemService(IStockIncomeItemService incomeItemService) {
		this.incomeItemService = incomeItemService;
	}

	private IStockIncomeDAO stockIncomeDao;

	public void setStockIncomeDao(IStockIncomeDAO stockIncomeDao) {
		this.stockIncomeDao = stockIncomeDao;
	}

	public Long addStockIncome(StockIncome stockIncome) {
		this.stockIncomeDao.save(stockIncome);
		if (stockIncome != null && stockIncome.getId() != null) {
			return stockIncome.getId();
		}
		return null;
	}

	public StockIncome getStockIncome(Long id) {
		StockIncome stockIncome = this.stockIncomeDao.get(id);
		return stockIncome;
	}

	public boolean delStockIncome(Long id) {
		StockIncome stockIncome = this.getStockIncome(id);
		if (stockIncome != null) {
			this.stockIncomeDao.remove(id);
			return true;
		}
		return false;
	}

	public boolean batchDelStockIncomes(List<Serializable> stockIncomeIds) {

		for (Serializable id : stockIncomeIds) {
			delStockIncome((Long) id);
		}
		return true;
	}

	public IPageList getStockIncomeBy(IQueryObject queryObject) {
		return QueryUtil.query(queryObject, StockIncome.class, this.stockIncomeDao);
	}

	public boolean updateStockIncome(Long id, StockIncome stockIncome) {
		if (id != null) {
			stockIncome.setId(id);
		} else {
			return false;
		}
		this.stockIncomeDao.update(stockIncome);
		return true;
	}

	public boolean auditing(Long id) throws Exception {
		StockIncome income = this.stockIncomeDao.get(id);
		if (income == null) {
			throw new java.lang.NullPointerException();
		}
		income.setAuditing(true);
		income.setAuditor((Employee) UserContext.getUser());
		income.setAuditTime(new Date());
		return true;
	}
}
