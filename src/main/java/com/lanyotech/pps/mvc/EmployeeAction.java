package com.lanyotech.pps.mvc;

import java.io.Serializable;
import java.util.List;

import com.easyjf.container.annonation.Action;
import com.easyjf.container.annonation.Inject;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.util.CommUtil;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.domain.Employee;
import com.lanyotech.pps.query.EmployeeQuery;
import com.lanyotech.pps.service.IEmployeeService;
import com.lanyotech.security.mvc.ajax.UserManageAction;
import com.lanyotech.security.service.IUserService;
import com.lanyotech.util.ActionUtil;

/**
 * EmployeeAction
 * 
 * @author EasyJWeb 1.0-m2 $Id: EmployeeAction.java,v 0.0.1 2010-11-29 22:46:28 EasyJWeb 1.0-m3 with ExtJS Exp $
 */
@Action
public class EmployeeAction extends UserManageAction {

	@Inject
	private IEmployeeService service;

	/*
	 * set the current service return service
	 */
	public void setService(IEmployeeService service) {
		this.service = service;
	}

	@Override
	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		QueryObject qo = form.toPo(EmployeeQuery.class);
		IPageList pageList = service.getEmployeeBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		service.delEmployee(id);
		return pageForExtForm(form);
	}

	public Page doSave(WebForm form) {
		Employee obj = form.toPo(Employee.class);
		if (!hasErrors()) {
			List<Serializable> permissions = ActionUtil.processIds(form, "permissions");
			List<Serializable> roles = ActionUtil.processIds(form, "roles");
			this.getUserService().updateUserPermissions(obj, permissions);
			this.getUserService().updateUserRoles(obj, roles);
			this.service.addEmployee(obj);
		}
		return pageForExtForm(form);
	}

	public Page doUpdate(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		Employee obj = this.service.getEmployee(id);
		form.toPo(obj, true);
		List<Serializable> permissions = ActionUtil.processIds(form, "permissions");
		List<Serializable> roles = ActionUtil.processIds(form, "roles");
		this.getUserService().updateUserPermissions(obj, permissions);
		this.getUserService().updateUserRoles(obj, roles);
		if (!hasErrors()) {
			this.service.updateEmployee(id, obj);
			obj.initUserCache(true);
		}
		return pageForExtForm(form);
	}

	public Page doGetDepartmentBySn(WebForm form) {
		return doList(form);
	}

	@Override
	protected IUserService getUserService() {
		return (IUserService) service;
	}
}