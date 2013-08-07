package com.lanyotech.pps.mvc;

import com.easyjf.container.annonation.Action;
import com.easyjf.container.annonation.Inject;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.core.AbstractPageCmdAction;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.query.ProductStockQuery;
import com.lanyotech.pps.service.IProductStockService;

/**
 * ProductStockAction
 * 
 * @author EasyJWeb 1.0-m2 $Id: ProductStockAction.java,v 0.0.1 2010-11-30 21:54:39 EasyJWeb 1.0-m3 with ExtJS Exp $
 */
@Action
public class ProductStockAction extends AbstractPageCmdAction {

	@Inject
	private IProductStockService service;

	public void setService(IProductStockService service) {
		this.service = service;
	}

	public Page doIndex(WebForm f, Module m) {
		return go("list");
	}

	public Page doList(WebForm form) {
		ProductStockQuery qo = form.toPo(ProductStockQuery.class);
		IPageList pageList = service.getProductStockBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
}