package com.lanyotech.pps.service.impl;

import java.io.Serializable;
import java.util.List;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.dao.IProductDirDAO;
import com.lanyotech.pps.domain.ProductDir;
import com.lanyotech.pps.service.IProductDirService;

/**
 * ProductDirServiceImpl
 * 
 * @author EasyJWeb 1.0-m2 $Id: ProductDirServiceImpl.java,v 0.0.1 2010-11-29 22:47:17 EasyJWeb 1.0-m2 Exp $
 */
public class ProductDirServiceImpl implements IProductDirService {

	private IProductDirDAO productDirDao;

	public void setProductDirDao(IProductDirDAO productDirDao) {
		this.productDirDao = productDirDao;
	}

	public Long addProductDir(ProductDir productDir) {
		this.productDirDao.save(productDir);
		if (productDir != null && productDir.getId() != null) {
			return productDir.getId();
		}
		return null;
	}

	public ProductDir getProductDir(Long id) {
		ProductDir productDir = this.productDirDao.get(id);
		return productDir;
	}

	public boolean delProductDir(Long id) {
		ProductDir productDir = this.getProductDir(id);
		if (productDir != null) {
			this.productDirDao.remove(id);
			return true;
		}
		return false;
	}

	public boolean batchDelProductDirs(List<Serializable> productDirIds) {

		for (Serializable id : productDirIds) {
			delProductDir((Long) id);
		}
		return true;
	}

	public IPageList getProductDirBy(IQueryObject queryObject) {
		return QueryUtil.query(queryObject, ProductDir.class, this.productDirDao);
	}

	public boolean updateProductDir(Long id, ProductDir productDir) {
		if (id != null) {
			productDir.setId(id);
		} else {
			return false;
		}
		this.productDirDao.update(productDir);
		return true;
	}

	@SuppressWarnings("unchecked")
	public List<ProductDir> getProductDirTree(Long id) {
		StringBuffer jpql = new StringBuffer("SELECT obj FROM ProductDir obj WHERE 1=1");
		Object[] params = null;
		if (id == null) {
			jpql.append(" and obj.parent is null");
		} else {
			params = new Object[] { id };
			jpql.append(" and obj.parent.id = ?");
		}

		return this.productDirDao.query(jpql.toString(), params, -1, -1);
	}
}
