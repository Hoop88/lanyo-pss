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
import com.lanyotech.pps.domain.Depot;
import com.lanyotech.pps.query.DepotQuery;
import com.lanyotech.pps.service.IDepotService;

/**
 * DepotAction
 * 
 * @author EasyJWeb 1.0-m2 $Id: DepotAction.java,v 0.0.1 2010-11-30 15:23:38 EasyJWeb 1.0-m3 with ExtJS Exp $
 */
@Action
public class DepotAction extends AbstractPageCmdAction {

	@Inject
	private IDepotService service;

	/*
	 * set the current service return service
	 */
	public void setService(IDepotService service) {
		this.service = service;
	}

	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		QueryObject qo = form.toPo(DepotQuery.class);
		IPageList pageList = service.getDepotBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = (Long) BeanUtils.convertType(form.get("id"), Long.class);
		service.delDepot(id);
		return pageForExtForm(form);
	}

	public Page doSave(WebForm form) {
		/*
		 * Depot object = form.toPo(Depot.class); if (!hasErrors()) service.addDepot(object); return pageForExtForm(form);
		 */
		// throw new CustomerException("该商品正在使用中，不能删除");
		this.addError("err", "该商品正在使用中，不能删除");
		return pageForExtForm(form);
	}

	public Page doUpdate(WebForm form) {
		Long id = (Long) BeanUtils.convertType(form.get("id"), Long.class);
		Depot object = service.getDepot(id);
		form.toPo(object, true);
		if (!hasErrors())
			service.updateDepot(id, object);
		return pageForExtForm(form);
	}
}