package com.lanyotech.pps.query;

import com.easyjf.container.annonation.POLoad;
import com.lanyotech.pps.domain.Product;

public class ERPJournalLedgerChartQuery extends ERPBaseChartQuery {
	@POLoad
	private Product product;

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public void customizeQuery() {
		super.customizeQuery();
	}
}
