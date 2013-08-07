package com.lanyotech.pps.mvc;

import java.util.HashMap;
import java.util.Map;

import com.easyjf.container.annonation.Action;
import com.easyjf.container.annonation.Inject;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.util.CommUtil;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.core.AbstractPageCmdAction;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.domain.Cat;
import com.lanyotech.pps.exception.CustomerException;
import com.lanyotech.pps.service.ICatService;

/**
 * CatAction
 * 
 * @author EasyJWeb 1.0-m2 $Id: CatAction.java,v 0.0.1 2010-12-21 15:55:36 EasyJWeb 1.0-m3 with ExtJS Exp $
 */
@Action
public class CatAction extends AbstractPageCmdAction {

	@Inject
	private ICatService service;

	/*
	 * set the current service return service
	 */
	public void setService(ICatService service) {
		this.service = service;
	}

	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		QueryObject qo = form.toPo(QueryObject.class);
		IPageList pageList = service.getCatBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		service.delCat(id);
		return pageForExtForm(form);
	}

	@SuppressWarnings({ "rawtypes", "unused" })
	public Page doSave(WebForm form) {
		Cat object = form.toPo(Cat.class);
		Map map = new HashMap();
		/*
		 * if (!hasErrors()) service.addCat(object); map.put("success", true); map.put("data", object); form.jsonResult(object);
		 * //this.addError("err", "ddd"); return pageForExtForm(form);
		 */
		throw new CustomerException("该商品正在使用中，不能删除");
	}

	/**
	 * 刷新
	 * 
	 * @param form
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Page doRefresh(WebForm form) {
		String id = CommUtil.null2String(form.get("id"));
		Map map = new HashMap();
		if (!"".equals(id.trim())) {
			Cat object = service.getCat(Long.parseLong(id));
			map.put("success", true);
			map.put("data", object);
		} else {
			map.put("success", false);
		}
		form.jsonResult(map);
		return pageForExtForm(form);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page doUpdate(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		Cat object = service.getCat(id);
		form.toPo(object, true);
		if (!hasErrors())
			service.updateCat(id, object);
		Map map = new HashMap();
		if (!hasErrors())
			service.addCat(object);
		map.put("success", true);
		map.put("data", object);
		form.jsonResult(object);
		// this.addError("err", "ddd");
		return pageForExtForm(form);
	}
}