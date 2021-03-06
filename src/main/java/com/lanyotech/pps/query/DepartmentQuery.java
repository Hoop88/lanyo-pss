package com.lanyotech.pps.query;

import com.easyjf.container.annonation.POLoad;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.util.StringUtils;
import com.lanyotech.pps.domain.Department;

public class DepartmentQuery extends QueryObject {
	private Long id; 
	private String searchKey ;
	private String searchType ;
	
	@POLoad
	private Department parent;
	
	public Department getParent() {
		return parent;
	}

	public void setParent(Department parent) {
		this.parent = parent;
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
			this.addQuery("(obj.name like ?)",
					new Object[]{
						"%"+this.getSearchKey()+"%"
					}
			);
		}
		if(this.parent!=null){
			this.addQuery("obj.parent = ? ",new Object[]{this.parent});
		}
		this.setOrderBy("sequence");
		this.setOrderType("ASC");
		super.customizeQuery();
	}
	
}
