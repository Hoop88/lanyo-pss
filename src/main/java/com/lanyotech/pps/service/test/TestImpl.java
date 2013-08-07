package com.lanyotech.pps.service.test;

import com.lanyotech.pps.dao.IProductDAO;
import com.lanyotech.pps.domain.Product;

public class TestImpl implements ITest {
	private IProductDAO productDao;

	public IProductDAO getProductDao() {
		return productDao;
	}

	public void setProductDao(IProductDAO productDao) {
		this.productDao = productDao;
	}

	public Product donNewTask() {
		Product p = new Product();
		p.setIntro("四川省遂宁市");
		this.productDao.save(p);
		return p;
	}

}
