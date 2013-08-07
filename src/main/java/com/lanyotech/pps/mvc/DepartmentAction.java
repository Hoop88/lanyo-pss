package com.lanyotech.pps.mvc;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;

import com.easyjf.container.annonation.Action;
import com.easyjf.container.annonation.Inject;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.util.CommUtil;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.core.AbstractPageCmdAction;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.domain.Department;
import com.lanyotech.pps.query.DepartmentQuery;
import com.lanyotech.pps.service.IDepartmentService;
import com.lanyotech.pps.util.AjaxTreeUtil;


/**
 * DepartmentAction
 * @author EasyJWeb 1.0-m2
 * $Id: DepartmentAction.java,v 0.0.1 2010-11-29 22:46:20 EasyJWeb 1.0-m3 with ExtJS Exp $
 */
@Action
public class DepartmentAction extends AbstractPageCmdAction {
	
	@Inject
	private IDepartmentService service;
	
	public void setService(IDepartmentService service) {
		this.service = service;
	}
	
	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		QueryObject qo = form.toPo(DepartmentQuery.class);
		IPageList pageList = service.getDepartmentBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		service.delDepartment(id);
		return pageForExtForm(form);
	}

	public Page doSave(WebForm form) {
		Department object = form.toPo(Department.class);
		if (!hasErrors())
			service.addDepartment(object);
		return pageForExtForm(form);
	}
	
	public Page doUpdate(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		Department object = service.getDepartment(id);
		form.toPo(object, true);
		if (!hasErrors()){
			service.updateDepartment(id, object);
		}
		return pageForExtForm(form);
	}
	public Page doGetTree(WebForm form) {
		Map<?,?> map = form.getTextElement();
		Long id = null;
		if(!MapUtils.getString(map, "id").equals("")){
			id = MapUtils.getLong(map, "id",null);
		}
		Boolean all = MapUtils.getBoolean(map,"all",true);
		List<Department> child = this.service.getDepartmentTree(id );
		if(child!=null && child.size()>0){
			List<Map<Object,Object>> list = new ArrayList<Map<Object,Object>>();
			for (Department productDir : child) {
				list.add(AjaxTreeUtil.obj2nodeMap(productDir,all));
			}
			form.jsonResult(list, true);
		}
		return Page.JSONPage;
	}
}