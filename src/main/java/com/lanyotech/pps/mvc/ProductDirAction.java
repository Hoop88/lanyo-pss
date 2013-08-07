package com.lanyotech.pps.mvc;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
import com.lanyotech.pps.domain.ProductDir;
import com.lanyotech.pps.query.ProductDirQuery;
import com.lanyotech.pps.service.IProductDirService;
import com.lanyotech.pps.util.AjaxTreeUtil;

/**
 * ProductDirAction
 * 
 * @author EasyJWeb 1.0-m2 $Id: ProductDirAction.java,v 0.0.1 2010-11-29 22:47:17 EasyJWeb 1.0-m3 with ExtJS Exp $
 */
@Action
public class ProductDirAction extends AbstractPageCmdAction {

	@Inject
	private IProductDirService service;

	/*
	 * set the current service return service
	 */
	public void setService(IProductDirService service) {
		this.service = service;
	}

	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		QueryObject qo = form.toPo(ProductDirQuery.class);
		String node = CommUtil.null2String(form.get("dir"));
		String searchKey = CommUtil.null2String(form.get("searchKey"));
		if (node != null) {
		}
		if (!searchKey.equals("")) {
			qo.addQuery("obj.name", "%" + searchKey + "%", "like");
		}
		IPageList pageList = service.getProductDirBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		service.delProductDir(id);
		return pageForExtForm(form);
	}

	public Page doSave(WebForm form) {
		ProductDir object = form.toPo(ProductDir.class);
		if (!hasErrors())
			service.addProductDir(object);
		return pageForExtForm(form);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Page doGetTree(WebForm form) {

		QueryObject qo = form.toPo(QueryObject.class);
		String node = CommUtil.null2String(form.get("parentid"));
		if (node != null) {
			if (CommUtil.null2String(node).equals("root")) {
				// qo.addQuery("obj.parent","EMPTY"," is ");
			} else {
				qo.addQuery("obj.parent.id", new Long(Integer.parseInt(node)), "=");
			}
		}
		qo.setPageSize(-1);
		IPageList pageList = service.getProductDirBy(qo);
		List list = pageList.getResult();
		for (int i = 0; i < list.size(); i++) {
			ProductDir ot = (ProductDir) list.get(i);
			Map map = new HashMap();
			map.put("id", ot.getId());
			map.put("text", ot.getName());
			if (ot.getChildren().size() < 1) {
				map.put("leaf", true);
			}
			list.set(i, map);
		}
		form.jsonResult(list);
		return Page.JSONPage;
	}

	public Page doUpdate(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		ProductDir object = service.getProductDir(id);
		form.toPo(object, true);
		if (!hasErrors())
			service.updateProductDir(id, object);
		return pageForExtForm(form);
	}

	/**
	 * 获取类型树
	 * 
	 * @param form
	 * @return
	 */
	public Page doGetProductDirTree(WebForm form) {
		Long id = null;
		try {
			id = (Long) form.get("id");
		} catch (Exception e) {
		}
		List<ProductDir> child = this.service.getProductDirTree(id);
		if (child != null && child.size() > 0) {
			List<Map<Object, Object>> list = new ArrayList<Map<Object, Object>>();
			for (ProductDir productDir : child) {
				list.add(AjaxTreeUtil.obj2nodeMap(productDir));
			}
			form.jsonResult(list);
		}
		return Page.JSONPage;
	}
}