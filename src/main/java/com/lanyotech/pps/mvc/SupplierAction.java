/**
 * 供应商action
 * 
 * 蓝源进销存迷你开源版 Lanyo PSS(Mini)
 * 
 * Copyright 2010-2110 成都蓝源信息技术有限公司 .
 *
 *  http://www.lanyotech.com
 *
 */
package com.lanyotech.pps.mvc;

import com.easyjf.container.annonation.Action;
import com.easyjf.container.annonation.Inject;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.util.CommUtil;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.core.AbstractPageCmdAction;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.domain.Supplier;
import com.lanyotech.pps.query.SupplierQuery;
import com.lanyotech.pps.service.ISupplierService;


/**
 * 
 * @author Administrator
 *
 */
@Action
public class SupplierAction extends AbstractPageCmdAction {
	
	@Inject
	private ISupplierService service;
	/*
	 * set the current service
	 * return service
	 */
	public void setService(ISupplierService service) {
		this.service = service;
	}
	
	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		QueryObject qo = form.toPo(SupplierQuery.class);
		IPageList pageList = service.getSupplierBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		service.delSupplier(id);
		return pageForExtForm(form);
	}

	public Page doSave(WebForm form) {
		Supplier object = form.toPo(Supplier.class);
		if (!hasErrors())
			service.addSupplier(object);
		return pageForExtForm(form);
	}
	
	public Page doUpdate(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		Supplier object = service.getSupplier(id);
		form.toPo(object, true);
		if (!hasErrors())
			service.updateSupplier(id, object);
		return pageForExtForm(form);
	}
}