package com.lanyotech.pps.service;

import java.io.Serializable;
import java.util.List;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.domain.Product;

/**
 * ProductService
 * 
 * @author EasyJWeb 1.0-m2 $Id: ProductService.java,v 0.0.1 2010-11-29 22:47:11 EasyJWeb 1.0-m2 Exp $
 */
public interface IProductService {
	/**
	 * 保存一个Product，如果保存成功返回该对象的id，否则返回
	 * 
	 * @param instance
	 * @return 保存成功的对象的Id
	 */
	Long addProduct(Product instance);

	/**
	 * 根据一个ID得到Product
	 * 
	 * @param id
	 * @return
	 */
	Product getProduct(Long id);

	/**
	 * 删除一个Product
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	boolean delProduct(Long id);

	/**
	 * 批量删除Product
	 * 
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	boolean batchDelProducts(List<Serializable> ids);

	/**
	 * 通过一个查询对象得到Product
	 * 
	 * @param properties
	 * @return
	 */
	IPageList getProductBy(IQueryObject queryObject);

	/**
	 * 更新一个Product
	 * 
	 * @param id
	 *            需要更新的Product的id
	 * @param dir
	 *            需要更新的Product
	 */
	boolean updateProduct(Long id, Product instance);

	/**
	 * 导出Excel
	 * 
	 * @param outputStream
	 *            void exportProduct(OutputStream outputStream) throws Exception;
	 */
}
