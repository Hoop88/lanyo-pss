package com.lanyotech.pps.service.impl;
import java.io.Serializable;
import java.util.List;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.dao.IStockDetailAccountDAO;
import com.lanyotech.pps.domain.StockDetailAccount;
import com.lanyotech.pps.domain.StockIncome;
import com.lanyotech.pps.domain.StockIncomeItem;
import com.lanyotech.pps.domain.StockOutcome;
import com.lanyotech.pps.domain.StockOutcomeItem;
import com.lanyotech.pps.service.IStockDetailAccountService;


/**
 * StockDetailAccountServiceImpl
 * @author EasyJWeb 1.0-m2
 * $Id: StockDetailAccountServiceImpl.java,v 0.0.1 2010-11-30 20:29:27 EasyJWeb 1.0-m2 Exp $
 */
public class StockDetailAccountServiceImpl implements IStockDetailAccountService{
	
	private IStockDetailAccountDAO stockDetailAccountDao;
	
	public void setStockDetailAccountDao(IStockDetailAccountDAO stockDetailAccountDao){
		this.stockDetailAccountDao=stockDetailAccountDao;
	}
	
	public Long addStockDetailAccount(StockDetailAccount stockDetailAccount) {	
		this.stockDetailAccountDao.save(stockDetailAccount);
		if (stockDetailAccount != null && stockDetailAccount.getId() != null) {
			return stockDetailAccount.getId();
		}
		return null;
	}
	
	public StockDetailAccount getStockDetailAccount(Long id) {
		StockDetailAccount stockDetailAccount = this.stockDetailAccountDao.get(id);
		return stockDetailAccount;
		}
	
	public boolean delStockDetailAccount(Long id) {	
			StockDetailAccount stockDetailAccount = this.getStockDetailAccount(id);
			if (stockDetailAccount != null) {
				this.stockDetailAccountDao.remove(id);
				return true;
			}			
			return false;	
	}
	
	public boolean batchDelStockDetailAccounts(List<Serializable> stockDetailAccountIds) {
		for (Serializable id : stockDetailAccountIds) {
			delStockDetailAccount((Long) id);
		}
		return true;
	}
	
	public IPageList getStockDetailAccountBy(IQueryObject queryObject) {	
		return QueryUtil.query(queryObject, StockDetailAccount.class,this.stockDetailAccountDao);		
	}
	
	public boolean updateStockDetailAccount(Long id, StockDetailAccount stockDetailAccount) {
		if (id != null) {
			stockDetailAccount.setId(id);
		} else {
			return false;
		}
		this.stockDetailAccountDao.update(stockDetailAccount);
		return true;
	}	
	
	public void createStockDetailAccount(StockIncome object) {
		for(StockIncomeItem item:object.getItems()){
			StockDetailAccount sda=new StockDetailAccount();
			sda.setDebitOrCredit(1);//入库
			sda.setAmount(item.getAmount());
			sda.setNum(item.getNum());
			sda.setPrice(item.getPrice());
			sda.setProduct(item.getProduct());
			sda.setDepot(item.getBill().getDepot());
			sda.setTypes("1"+item.getBill().getTypes());
			sda.setBillId(item.getBill().getId());
			sda.setBillSn(item.getBill().getSn());
			sda.setBillItemId(item.getId());
			sda.setVdate(item.getBill().getVdate());
			this.addStockDetailAccount(sda);
		}
	}

	public void createStockDetailAccount(StockOutcome object) {
		for(StockOutcomeItem item:object.getItems()){
			StockDetailAccount sda=new StockDetailAccount();
			sda.setDebitOrCredit(-1);//入库
			sda.setAmount(item.getAmount());
			sda.setNum(item.getNum());
			sda.setPrice(item.getPrice());
			sda.setProduct(item.getProduct());
			sda.setDepot(item.getBill().getDepot());
			sda.setTypes("0"+item.getBill().getTypes());
			sda.setBillId(item.getBill().getId());
			sda.setBillSn(item.getBill().getSn());
			sda.setBillItemId(item.getId());
			sda.setVdate(item.getBill().getVdate());
			this.addStockDetailAccount(sda);
		}
	}
	
}
