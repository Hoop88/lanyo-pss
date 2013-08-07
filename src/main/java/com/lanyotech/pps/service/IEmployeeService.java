package com.lanyotech.pps.service;

import java.io.Serializable;
import java.util.List;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.domain.Employee;
import com.lanyotech.security.service.IUserService;
/**
 * EmployeeService
 * @author EasyJWeb 1.0-m2
 * $Id: EmployeeService.java,v 0.0.1 2010-11-29 22:46:28 EasyJWeb 1.0-m2 Exp $
 */
public interface IEmployeeService extends IUserService {
	/**
	 * 保存一个Employee，如果保存成功返回该对象的id，否则返回null
	 * 
	 * @param instance
	 * @return 保存成功的对象的Id
	 */
	Long addEmployee(Employee instance);
	
	/**
	 * 根据一个ID得到Employee
	 * 
	 * @param id
	 * @return
	 */
	Employee getEmployee(Long id);
	
	/**
	 * 删除一个Employee
	 * @param id
	 * @return
	 */
	boolean delEmployee(Long id);
	
	/**
	 * 批量删除Employee
	 * @param ids
	 * @return
	 */
	boolean batchDelEmployees(List<Serializable> ids);
	
	/**
	 * 通过一个查询对象得到Employee
	 * 
	 * @param properties
	 * @return
	 */
	IPageList getEmployeeBy(IQueryObject queryObject);
	
	/**
	  * 更新一个Employee
	  * @param id 需要更新的Employee的id
	  * @param dir 需要更新的Employee
	  */
	boolean updateEmployee(Long id,Employee instance);
}
