package com.lanyotech.pps.service.impl;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.dao.IProductStockDAO;
import com.lanyotech.pps.domain.Depot;
import com.lanyotech.pps.domain.Product;
import com.lanyotech.pps.domain.ProductStock;
import com.lanyotech.pps.domain.StockIncome;
import com.lanyotech.pps.domain.StockIncomeItem;
import com.lanyotech.pps.domain.StockOutcome;
import com.lanyotech.pps.domain.StockOutcomeItem;
import com.lanyotech.pps.service.IProductStockService;

/**
 * ProductStockServiceImpl
 * 
 * @author EasyJWeb 1.0-m2 $Id: ProductStockServiceImpl.java,v 0.0.1 2010-11-30 21:54:39 EasyJWeb 1.0-m2 Exp $
 */
public class ProductStockServiceImpl implements IProductStockService {

	private IProductStockDAO productStockDao;

	public void setProductStockDao(IProductStockDAO productStockDao) {
		this.productStockDao = productStockDao;
	}

	public Long addProductStock(ProductStock productStock) {
		this.productStockDao.save(productStock);
		if (productStock != null && productStock.getId() != null) {
			return productStock.getId();
		}
		return null;
	}

	public ProductStock getProductStock(Long id) {
		ProductStock productStock = this.productStockDao.get(id);
		return productStock;
	}

	public boolean delProductStock(Long id) {
		ProductStock productStock = this.getProductStock(id);
		if (productStock != null) {
			this.productStockDao.remove(id);
			return true;
		}
		return false;
	}

	public boolean batchDelProductStocks(List<Serializable> productStockIds) {
		for (Serializable id : productStockIds) {
			delProductStock((Long) id);
		}
		return true;
	}

	public IPageList getProductStockBy(IQueryObject queryObject) {
		return QueryUtil.query(queryObject, ProductStock.class, this.productStockDao);
	}

	public boolean updateProductStock(Long id, ProductStock productStock) {
		if (id != null) {
			productStock.setId(id);
		} else {
			return false;
		}
		this.productStockDao.update(productStock);
		return true;
	}

	public void inProductStock(StockIncome stockIncome) throws Exception {
		List<StockIncomeItem> items = stockIncome.getItems();
		ProductStock ps = null;
		for (StockIncomeItem stockIncomeItem : items) {
			ps = this.getProductStockByProductAndDepot(stockIncomeItem.getProduct(), stockIncome.getDepot());
			if (ps == null) {
				ps = new ProductStock();
				ps.setProduct(stockIncomeItem.getProduct());
				ps.setPrice(stockIncomeItem.getPrice());
				ps.setStoreNum(ps.getStoreNum().add(stockIncomeItem.getNum()));
				ps.setDepot(stockIncome.getDepot());
				ps.setIncomeDate(new Date());
				ps.statisticsAmount();// 计算总和
				this.addProductStock(ps);
			} else {
				ps.setPrice(stockIncomeItem.getPrice());
				ps.setStoreNum(BigDecimal.valueOf(ps.getStoreNum().intValue() + stockIncomeItem.getNum().intValue()));
				ps.setStoreNum(ps.getStoreNum().add(stockIncomeItem.getNum()));
				ps.setIncomeDate(new Date());
				this.updateProductStock(ps.getId(), ps);
			}
		}
	}

	@SuppressWarnings("null")
	public void outProductStock(StockOutcome stockOutcome) throws Exception {
		List<StockOutcomeItem> items = stockOutcome.getItems();
		List<ProductStock> ps = null;
		for (StockOutcomeItem stockOutcomeItem : items) {
			ps = this.getProductStockByProduct(stockOutcomeItem.getProduct());
			if (ps == null && ps.isEmpty()) {
				throw new java.lang.Exception(stockOutcomeItem.getProduct().getName() + "无库存！");
			}
			Integer storeNum = 0;

			Integer outNum = stockOutcomeItem.getNum().intValue();

			for (ProductStock productStock : ps) {
				storeNum = productStock.getStoreNum().intValue();
				if (outNum == 0) {
					break; // 已经出库完毕
				}
				if (storeNum < outNum) {
					outNum -= storeNum;
					productStock.setStoreNum(BigDecimal.valueOf(0));
					productStock.statisticsAmount();
				} else if (storeNum >= outNum) {
					productStock.setStoreNum(BigDecimal.valueOf(storeNum - outNum));
					productStock.setOutcomeDate(new Date());
					productStock.statisticsAmount();
					outNum = 0;
					break;
				}
			}
			if (outNum > 0) {
				throw new java.lang.Exception(stockOutcomeItem.getProduct().getName() + "库存不足或无库存！");
			}
		}
	}

	@SuppressWarnings("unchecked")
	public List<ProductStock> getProductStockByProduct(Product product) {
		String jpql = "SELECT obj FROM ProductStock obj WHERE obj.product = ?";
		List<ProductStock> ps = this.productStockDao.query(jpql, new Object[] { product }, 0, -1);
		return ps;
	}

	public ProductStock getProductStockByProductAndDepot(Product product, Depot dept) {
		String jpql = "SELECT obj FROM ProductStock obj WHERE obj.product = ? and obj.depot = ?";
		ProductStock ps = null;
		Object obj = this.productStockDao.getSingleResult(jpql, new Object[] { product, dept });
		if (obj != null) {
			ps = (ProductStock) obj;
		}
		return ps;
	}
}
