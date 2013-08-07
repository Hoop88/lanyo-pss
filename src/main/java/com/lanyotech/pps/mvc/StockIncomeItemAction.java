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
import com.lanyotech.pps.domain.StockIncomeItem;
import com.lanyotech.pps.service.IStockIncomeItemService;

/**
 * StockIncomeItemAction
 * 
 * @author EasyJWeb 1.0-m2 $Id: StockIncomeItemAction.java,v 0.0.1 2010-11-30 20:29:06 EasyJWeb 1.0-m3 with ExtJS Exp $
 */
@Action
public class StockIncomeItemAction extends AbstractPageCmdAction {

	@Inject
	private IStockIncomeItemService service;

	/*
	 * set the current service return service
	 */
	public void setService(IStockIncomeItemService service) {
		this.service = service;
	}

	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		QueryObject qo = form.toPo(QueryObject.class);
		IPageList pageList = service.getStockIncomeItemBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = (Long) BeanUtils.convertType(form.get("id"), Long.class);
		service.delStockIncomeItem(id);
		return pageForExtForm(form);
	}

	public Page doSave(WebForm form) {
		StockIncomeItem object = form.toPo(StockIncomeItem.class);
		if (!hasErrors())
			service.addStockIncomeItem(object);
		return pageForExtForm(form);
	}

	public Page doUpdate(WebForm form) {
		Long id = (Long) BeanUtils.convertType(form.get("id"), Long.class);
		StockIncomeItem object = service.getStockIncomeItem(id);
		form.toPo(object, true);
		if (!hasErrors())
			service.updateStockIncomeItem(id, object);
		return pageForExtForm(form);
	}
}