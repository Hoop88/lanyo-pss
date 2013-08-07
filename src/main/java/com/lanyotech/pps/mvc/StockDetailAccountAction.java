package com.lanyotech.pps.mvc;

import com.easyjf.beans.BeanUtils;
import com.easyjf.container.annonation.Action;
import com.easyjf.container.annonation.Inject;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.core.AbstractPageCmdAction;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.domain.StockDetailAccount;
import com.lanyotech.pps.service.IStockDetailAccountService;

/**
 * StockDetailAccountAction
 * 
 * @author EasyJWeb 1.0-m2 $Id: StockDetailAccountAction.java,v 0.0.1 2010-11-30 20:29:27 EasyJWeb 1.0-m3 with ExtJS Exp $
 */
@Action
public class StockDetailAccountAction extends AbstractPageCmdAction {

	@Inject
	private IStockDetailAccountService service;

	/*
	 * set the current service return service
	 */
	public void setService(IStockDetailAccountService service) {
		this.service = service;
	}

	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		QueryObject qo = form.toPo(QueryObject.class);
		IPageList pageList = service.getStockDetailAccountBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = (Long) BeanUtils.convertType(form.get("id"), Long.class);
		service.delStockDetailAccount(id);
		return pageForExtForm(form);
	}

	public Page doSave(WebForm form) {
		StockDetailAccount object = form.toPo(StockDetailAccount.class);
		if (!hasErrors())
			service.addStockDetailAccount(object);
		return pageForExtForm(form);
	}

	public Page doUpdate(WebForm form) {
		Long id = (Long) BeanUtils.convertType(form.get("id"), Long.class);
		StockDetailAccount object = service.getStockDetailAccount(id);
		form.toPo(object, true);
		if (!hasErrors())
			service.updateStockDetailAccount(id, object);
		return pageForExtForm(form);
	}
}