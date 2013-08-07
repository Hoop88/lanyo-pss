package com.lanyotech.pps.query;

import java.util.Date;

import com.easyjf.container.annonation.POLoad;
import com.easyjf.core.support.query.QueryObject;
import com.lanyotech.pps.domain.Depot;
import com.lanyotech.pps.domain.ProductDir;
import com.lanyotech.pps.domain.Supplier;

public class ERPBaseChartQuery extends QueryObject {
	@POLoad
	private Depot depot;
	@POLoad
	private ProductDir dir;
	@POLoad
	private Supplier supplier;
	
	private Date startDate;

	private Date endDate;

	private String productSn;

	public Depot getDepot() {
		return depot;
	}

	public void setDepot(Depot depot) {
		this.depot = depot;
	}

	public ProductDir getDir() {
		return dir;
	}

	public void setDir(ProductDir dir) {
		this.dir = dir;
	}

	public Supplier getSupplier() {
		return supplier;
	}

	public void setSupplier(Supplier supplier) {
		this.supplier = supplier;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	
	public String getProductSn() {
		return productSn;
	}

	public void setProductSn(String productSn) {
		this.productSn = productSn;
	}

	public void customizeQuery() {
		super.customizeQuery();
	}

}
