package com.lanyotech.pps.query;

import com.easyjf.container.annonation.POLoad;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.util.StringUtils;
import com.lanyotech.pps.domain.Department;

public class EmployeeQuery extends QueryObject {
	private Long id; 
	private String searchKey ;
	private String searchType ;
	
	@POLoad(name="deptId")
	private Department dept;

	public Department getDept() {
		return dept;
	}

	public void setDept(Department dept) {
		this.dept = dept;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSearchKey() {
		return searchKey;
	}

	public void setSearchKey(String searchKey) {
		this.searchKey = searchKey;
	}

	public String getSearchType() {
		return searchType;
	}

	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}

	public void customizeQuery() {
		if(this.getSearchKey()!=null && StringUtils.hasLength(this.getSearchKey())){
			this.addQuery("(obj.name like ?)",new Object[]{"%"+this.getSearchKey()+"%"}
			);
		}
		if(this.dept!=null){
			this.addQuery("obj.dept = ? ",new Object[]{this.dept});
		}
	this.setOrderBy("id");
		this.setOrderType("ASC");
		super.customizeQuery();
	}
	
}
