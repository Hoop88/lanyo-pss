package com.lanyotech.pps.mvc;

import java.util.Map;

import com.easyjf.container.annonation.Action;
import com.easyjf.container.annonation.Inject;
import com.easyjf.util.CommUtil;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.core.AbstractPageCmdAction;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.domain.PurchaseBillItem;
import com.lanyotech.pps.query.PurchaseItemQuery;
import com.lanyotech.pps.service.IPurchaseBillItemService;

/**
 * PurchaseBillItemAction
 * 
 * @author EasyJWeb 1.0-m2 $Id: PurchaseBillItemAction.java,v 0.0.1 2010-12-2 14:37:55 EasyJWeb 1.0-m3 with ExtJS Exp $
 */
@Action
public class PurchaseBillItemAction extends AbstractPageCmdAction {

	@Inject
	private IPurchaseBillItemService service;

	/*
	 * set the current service return service
	 */
	public void setService(IPurchaseBillItemService service) {
		this.service = service;
	}

	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		PurchaseItemQuery qo = form.toPo(PurchaseItemQuery.class);
		IPageList pageList = service.getPurchaseBillItemBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	@SuppressWarnings("rawtypes")
	public Page doGroupBy(WebForm form) {
		String field = CommUtil.null2String(form.get("field"));
		PurchaseItemQuery qo = form.toPo(PurchaseItemQuery.class);

		Map list = service.getGroupBy(qo, field);
		form.jsonResult(list);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		service.delPurchaseBillItem(id);
		return pageForExtForm(form);
	}

	public Page doSave(WebForm form) {
		PurchaseBillItem object = form.toPo(PurchaseBillItem.class);
		if (!hasErrors())
			service.addPurchaseBillItem(object);
		return pageForExtForm(form);
	}

	public Page doUpdate(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		PurchaseBillItem object = service.getPurchaseBillItem(id);
		form.toPo(object, true);
		if (!hasErrors())
			service.updatePurchaseBillItem(id, object);
		return pageForExtForm(form);
	}
}