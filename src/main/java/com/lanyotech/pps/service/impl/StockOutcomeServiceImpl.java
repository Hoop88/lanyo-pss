package com.lanyotech.pps.service.impl;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.dao.IStockOutcomeDAO;
import com.lanyotech.pps.domain.Employee;
import com.lanyotech.pps.domain.StockOutcome;
import com.lanyotech.pps.service.IProductStockService;
import com.lanyotech.pps.service.IStockOutcomeService;
import com.lanyotech.security.UserContext;

/**
 * StockOutcomeServiceImpl
 * 
 * @author EasyJWeb 1.0-m2 $Id: StockOutcomeServiceImpl.java,v 0.0.1 2010-12-3 17:26:40 EasyJWeb 1.0-m2 Exp $
 */
public class StockOutcomeServiceImpl implements IStockOutcomeService {

	private IStockOutcomeDAO stockOutcomeDao;

	private IProductStockService productStockService;

	public void setProductStockService(IProductStockService productStockService) {
		this.productStockService = productStockService;
	}

	public void setStockOutcomeDao(IStockOutcomeDAO stockOutcomeDao) {
		this.stockOutcomeDao = stockOutcomeDao;
	}

	public Long addStockOutcome(StockOutcome stockOutcome) {
		this.stockOutcomeDao.save(stockOutcome);
		if (stockOutcome != null && stockOutcome.getId() != null) {
			return stockOutcome.getId();
		}
		return null;
	}

	public StockOutcome getStockOutcome(Long id) {
		StockOutcome stockOutcome = this.stockOutcomeDao.get(id);
		return stockOutcome;
	}

	public boolean delStockOutcome(Long id) {
		StockOutcome stockOutcome = this.getStockOutcome(id);
		if (stockOutcome != null) {
			this.stockOutcomeDao.remove(id);
			return true;
		}
		return false;
	}

	public boolean batchDelStockOutcomes(List<Serializable> stockOutcomeIds) {

		for (Serializable id : stockOutcomeIds) {
			delStockOutcome((Long) id);
		}
		return true;
	}

	public IPageList getStockOutcomeBy(IQueryObject queryObject) {
		return QueryUtil.query(queryObject, StockOutcome.class, this.stockOutcomeDao);
	}

	public boolean updateStockOutcome(Long id, StockOutcome stockOutcome) {
		if (id != null) {
			stockOutcome.setId(id);
		} else {
			return false;
		}
		this.stockOutcomeDao.update(stockOutcome);
		return true;
	}

	public void auditing(Long id) throws java.lang.Exception {
		StockOutcome soc = this.stockOutcomeDao.get(id);
		if (soc != null) {
			soc.setAuditing(true);
			soc.setAuditTime(new Date());
			this.productStockService.outProductStock(soc);
			soc.setAuditor((Employee) UserContext.getUser());
		} else {
			throw new java.lang.NullPointerException();
		}
	}
}
