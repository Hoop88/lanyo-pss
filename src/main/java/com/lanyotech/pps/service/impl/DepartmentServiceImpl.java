package com.lanyotech.pps.service.impl;

import java.io.Serializable;
import java.util.List;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.dao.IDepartmentDAO;
import com.lanyotech.pps.domain.Department;
import com.lanyotech.pps.service.IDepartmentService;

/**
 * DepartmentServiceImpl
 * 
 * @author EasyJWeb 1.0-m2 $Id: DepartmentServiceImpl.java,v 0.0.1 2010-11-29 22:46:20 EasyJWeb 1.0-m2 Exp $
 */
public class DepartmentServiceImpl implements IDepartmentService {

	private IDepartmentDAO departmentDao;

	public void setDepartmentDao(IDepartmentDAO departmentDao) {
		this.departmentDao = departmentDao;
	}

	public Long addDepartment(Department department) {
		this.departmentDao.save(department);
		if (department != null && department.getId() != null) {
			return department.getId();
		}
		return null;
	}

	public Department getDepartment(Long id) {
		Department department = this.departmentDao.get(id);
		return department;
	}

	public boolean delDepartment(Long id) {
		Department department = this.getDepartment(id);
		if (department != null) {
			this.departmentDao.remove(id);
			return true;
		}
		return false;
	}

	public boolean batchDelDepartments(List<Serializable> departmentIds) {

		for (Serializable id : departmentIds) {
			delDepartment((Long) id);
		}
		return true;
	}

	public IPageList getDepartmentBy(IQueryObject queryObject) {
		return QueryUtil.query(queryObject, Department.class, this.departmentDao);
	}

	public boolean updateDepartment(Long id, Department department) {
		if (id != null) {
			department.setId(id);
		} else {
			return false;
		}
		this.departmentDao.update(department);
		return true;
	}

	@SuppressWarnings("unchecked")
	public List<Department> getDepartmentTree(Long id) {
		StringBuffer jpql = new StringBuffer("SELECT obj FROM Department obj WHERE 1=1");
		Object[] params = null;
		if (id == null) {
			jpql.append(" and obj.parent is null");
		} else {
			params = new Object[] { id };
			jpql.append(" and obj.parent.id = ?");
		}
		return this.departmentDao.query(jpql.toString(), params, -1, -1);
	}
}
