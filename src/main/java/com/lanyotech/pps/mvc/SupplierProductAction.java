package com.lanyotech.pps.mvc;

import com.lanyotech.pps.domain.SupplierProduct;
import com.lanyotech.pps.service.ISupplierProductService;

import com.easyjf.container.annonation.Action;
import com.easyjf.container.annonation.Inject;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.util.CommUtil;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.core.AbstractPageCmdAction;
import com.easyjf.web.tools.IPageList;


/**
 * SupplierProductAction
 * @author EasyJWeb 1.0-m2
 * $Id: SupplierProductAction.java,v 0.0.1 2010-11-30 10:07:31 EasyJWeb 1.0-m3 with ExtJS Exp $
 */
@Action
public class SupplierProductAction extends AbstractPageCmdAction {
	
	@Inject
	private ISupplierProductService service;
	/*
	 * set the current service
	 * return service
	 */
	public void setService(ISupplierProductService service) {
		this.service = service;
	}
	
	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		QueryObject qo = form.toPo(QueryObject.class);
		IPageList pageList = service.getSupplierProductBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		service.delSupplierProduct(id);
		return pageForExtForm(form);
	}

	public Page doSave(WebForm form) {
		SupplierProduct object = form.toPo(SupplierProduct.class);
		if (!hasErrors())
			service.addSupplierProduct(object);
		return pageForExtForm(form);
	}
	
	public Page doUpdate(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		SupplierProduct object = service.getSupplierProduct(id);
		form.toPo(object, true);
		if (!hasErrors())
			service.updateSupplierProduct(id, object);
		return pageForExtForm(form);
	}
}