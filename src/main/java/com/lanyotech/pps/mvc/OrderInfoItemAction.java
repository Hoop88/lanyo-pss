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
import com.lanyotech.pps.domain.OrderInfoItem;
import com.lanyotech.pps.query.OrderInfoItemQuery;
import com.lanyotech.pps.service.IOrderInfoItemService;

/**
 * OrderInfoItemAction
 * 
 * @author EasyJWeb 1.0-m2 $Id: OrderInfoItemAction.java,v 0.0.1 2010-11-30 9:48:36 EasyJWeb 1.0-m3 with ExtJS Exp $
 */
@Action
public class OrderInfoItemAction extends AbstractPageCmdAction {

	@Inject
	private IOrderInfoItemService service;

	/*
	 * set the current service return service
	 */
	public void setService(IOrderInfoItemService service) {
		this.service = service;
	}

	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		OrderInfoItemQuery qo = form.toPo(OrderInfoItemQuery.class);
		IPageList pageList = service.getOrderInfoItemBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	/**
	 * 分组查询
	 * 
	 * @param form
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public Page doGroupBy(WebForm form) {
		OrderInfoItemQuery qo = form.toPo(OrderInfoItemQuery.class);
		String field = CommUtil.null2String(form.get("field"));
		Map map1 = service.getGroupBy(qo, field);
		form.jsonResult(map1);
		return Page.JSONPage;
	}

	@SuppressWarnings("rawtypes")
	public Page doChart(WebForm form) {
		OrderInfoItemQuery qo = form.toPo(OrderInfoItemQuery.class);
		qo.setPageSize(-1);
		String typeString = CommUtil.null2String("type");
		Map map1 = service.getChart(qo, typeString);
		form.jsonResult(map1);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		service.delOrderInfoItem(id);
		return pageForExtForm(form);
	}

	public Page doSave(WebForm form) {
		OrderInfoItem object = form.toPo(OrderInfoItem.class);
		if (!hasErrors())
			service.addOrderInfoItem(object);
		return pageForExtForm(form);
	}

	public Page doUpdate(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		OrderInfoItem object = service.getOrderInfoItem(id);
		form.toPo(object, true);
		if (!hasErrors())
			service.updateOrderInfoItem(id, object);
		return pageForExtForm(form);
	}
}