package com.lanyotech.pps.service.impl;
import java.io.Serializable;
import java.util.List;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.domain.SupplierProduct;
import com.lanyotech.pps.service.ISupplierProductService;
import com.lanyotech.pps.dao.ISupplierProductDAO;


/**
 * SupplierProductServiceImpl
 * @author EasyJWeb 1.0-m2
 * $Id: SupplierProductServiceImpl.java,v 0.0.1 2010-11-30 10:07:31 EasyJWeb 1.0-m2 Exp $
 */
public class SupplierProductServiceImpl implements ISupplierProductService{
	
	private ISupplierProductDAO supplierProductDao;
	
	public void setSupplierProductDao(ISupplierProductDAO supplierProductDao){
		this.supplierProductDao=supplierProductDao;
	}
	
	public Long addSupplierProduct(SupplierProduct supplierProduct) {	
		this.supplierProductDao.save(supplierProduct);
		if (supplierProduct != null && supplierProduct.getId() != null) {
			return supplierProduct.getId();
		}
		return null;
	}
	
	public SupplierProduct getSupplierProduct(Long id) {
		SupplierProduct supplierProduct = this.supplierProductDao.get(id);
		return supplierProduct;
		}
	
	public boolean delSupplierProduct(Long id) {	
			SupplierProduct supplierProduct = this.getSupplierProduct(id);
			if (supplierProduct != null) {
				this.supplierProductDao.remove(id);
				return true;
			}			
			return false;	
	}
	
	public boolean batchDelSupplierProducts(List<Serializable> supplierProductIds) {
		
		for (Serializable id : supplierProductIds) {
			delSupplierProduct((Long) id);
		}
		return true;
	}
	
	public IPageList getSupplierProductBy(IQueryObject queryObject) {	
		return QueryUtil.query(queryObject, SupplierProduct.class,this.supplierProductDao);		
	}
	
	public boolean updateSupplierProduct(Long id, SupplierProduct supplierProduct) {
		if (id != null) {
			supplierProduct.setId(id);
		} else {
			return false;
		}
		this.supplierProductDao.update(supplierProduct);
		return true;
	}	
	
}
