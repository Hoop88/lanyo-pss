package com.lanyotech.pps.service;

import java.io.Serializable;
import java.util.List;
import com.easyjf.web.tools.IPageList;
import com.easyjf.core.support.query.IQueryObject;
import com.lanyotech.pps.domain.SupplierProduct;
/**
 * SupplierProductService
 * @author EasyJWeb 1.0-m2
 * $Id: SupplierProductService.java,v 0.0.1 2010-11-30 10:07:31 EasyJWeb 1.0-m2 Exp $
 */
public interface ISupplierProductService {
	/**
	 * 保存一个SupplierProduct，如果保存成功返回该对象的id，否则返回null
	 * 
	 * @param instance
	 * @return 保存成功的对象的Id
	 */
	Long addSupplierProduct(SupplierProduct instance);
	
	/**
	 * 根据一个ID得到SupplierProduct
	 * 
	 * @param id
	 * @return
	 */
	SupplierProduct getSupplierProduct(Long id);
	
	/**
	 * 删除一个SupplierProduct
	 * @param id
	 * @return
	 */
	boolean delSupplierProduct(Long id);
	
	/**
	 * 批量删除SupplierProduct
	 * @param ids
	 * @return
	 */
	boolean batchDelSupplierProducts(List<Serializable> ids);
	
	/**
	 * 通过一个查询对象得到SupplierProduct
	 * 
	 * @param properties
	 * @return
	 */
	IPageList getSupplierProductBy(IQueryObject queryObject);
	
	/**
	  * 更新一个SupplierProduct
	  * @param id 需要更新的SupplierProduct的id
	  * @param dir 需要更新的SupplierProduct
	  */
	boolean updateSupplierProduct(Long id,SupplierProduct instance);
}
