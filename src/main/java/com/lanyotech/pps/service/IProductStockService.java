package com.lanyotech.pps.service;

import java.io.Serializable;
import java.util.List;
import com.easyjf.web.tools.IPageList;
import com.easyjf.core.support.query.IQueryObject;
import com.lanyotech.pps.domain.Depot;
import com.lanyotech.pps.domain.Product;
import com.lanyotech.pps.domain.ProductStock;
import com.lanyotech.pps.domain.StockIncome;
import com.lanyotech.pps.domain.StockOutcome;
/**
 * ProductStockService
 * @author EasyJWeb 1.0-m2
 * $Id: ProductStockService.java,v 0.0.1 2010-11-30 21:54:39 EasyJWeb 1.0-m2 Exp $
 */
public interface IProductStockService {
	/**
	 * 保存一个ProductStock，如果保存成功返回该对象的id，否则返回null
	 * 
	 * @param instance
	 * @return 保存成功的对象的Id
	 */
	Long addProductStock(ProductStock instance);
	
	/**
	 * 根据一个ID得到ProductStock
	 * 
	 * @param id
	 * @return
	 */
	ProductStock getProductStock(Long id);
	
	/**
	 * 删除一个ProductStock
	 * @param id
	 * @return
	 */
	boolean delProductStock(Long id);
	
	/**
	 * 批量删除ProductStock
	 * @param ids
	 * @return
	 */
	boolean batchDelProductStocks(List<Serializable> ids);
	
	/**
	 * 通过一个查询对象得到ProductStock
	 * 
	 * @param properties
	 * @return
	 */
	IPageList getProductStockBy(IQueryObject queryObject);
	
	/**
	  * 更新一个ProductStock
	  * @param id 需要更新的ProductStock的id
	  * @param dir 需要更新的ProductStock
	  */
	boolean updateProductStock(Long id,ProductStock instance);
	
	/**
	 * 采购入库
	 * @param stockIncome
	 * @return boolean
	 */
	void inProductStock(StockIncome stockIncome) throws Exception;
	/**
	 * 采购出库
	 * @param stockOutcome
	 * @throws Exception
	 */
	void outProductStock(StockOutcome stockOutcome) throws Exception;

	/**
	 * 通过商品获取该商品的库存
	 * @param stockOutcome
	 */
	List<ProductStock> getProductStockByProduct(Product product)  throws Exception;
	
	/**
	 * 通过商品和仓库获取该商品的库存
	 * @param stockOutcome
	 */
	ProductStock getProductStockByProductAndDepot(Product product,Depot dept)  throws Exception;
}
