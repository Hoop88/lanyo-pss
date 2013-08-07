package com.lanyotech.pps.service.impl;

import java.io.Serializable;
import java.util.List;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.util.MD5;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.dao.IEmployeeDAO;
import com.lanyotech.pps.domain.Employee;
import com.lanyotech.pps.service.IEmployeeService;
import com.lanyotech.security.domain.Role;
import com.lanyotech.security.domain.User;
import com.lanyotech.security.service.impl.UserServiceImpl;
/**
 * EmployeeServiceImpl
 * 
 * @author EasyJWeb 1.0-m2 $Id: EmployeeServiceImpl.java,v 0.0.1 2007-12-11
 *         15:19:26 EasyJWeb 1.0-m2 Exp $
 */
public class EmployeeServiceImpl extends UserServiceImpl implements IEmployeeService{

	protected IEmployeeDAO employeeDao;

	public void setEmployeeDao(IEmployeeDAO employeeDao) {
		this.employeeDao = employeeDao;
	}

	public Long addEmployee(Employee employee) {
		employee.setLoginTimes(0);
		if (employee.getPassword().length() < 30) {
			String psd = MD5.encode(employee.getPassword());
			employee.setPassword(psd);
		}
		Role r = securityService.getRoleByName("Employee");
		if (r != null)employee.addRole(r);
		QueryObject qo = new QueryObject();
		qo.setPageSize(1);
		int rows = this.getUserBy(qo).getRowCount();
		if (rows <= 0) {//第一个用户，添加平台管理员权限
			r = securityService.getRoleByName("SYSTEMADMIN");
			if (r != null)employee.addRole(r);
		}
		if (employee.getTrueName() == null)
			employee.setTrueName(employee.getName());
		this.employeeDao.save(employee);
		if (employee != null && employee.getId() != null) {
			return employee.getId();
		}
		return null;
	}

	public Employee getEmployee(Long id) {
		Employee employee = this.employeeDao.get(id);
		return employee;
	}

	public boolean delEmployee(Long id) {
		Employee employee = this.getEmployee(id);
		if (employee != null) {
			this.updateEmployee(id, employee);
			return true;
		}
		return false;
	}

	public boolean batchDelEmployees(List<Serializable> employeeIds) {
		for (Serializable id : employeeIds) {
			delEmployee((Long) id);
		}
		return true;
	}

	public IPageList getEmployeeBy(IQueryObject queryObject) {
		return QueryUtil.query(queryObject, Employee.class, this.employeeDao);
	}

	public IPageList getAllEmployeeBy(IQueryObject queryObject) {
		return QueryUtil.query(queryObject, Employee.class, this.employeeDao);
	}

	public boolean updateEmployee(Long id, Employee employee) {
		if (id != null) {
			employee.setId(id);
		} else {
			return false;
		}
		this.employeeDao.update(employee);
		return true;
	}
	
	public IPageList getUserBy(QueryObject qo) {
		return QueryUtil.query(qo, User.class, this.userDao);
	}

	public IPageList getAllEmployeeBy(QueryObject qo) {
		IPageList pageList = QueryUtil.query(qo, Employee.class, this.employeeDao);
		return pageList;
	}
}
