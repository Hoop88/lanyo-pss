package com.lanyotech.pps.query;

import com.easyjf.core.support.query.QueryObject;
import com.easyjf.util.StringUtils;

public class StockOutcomeQuery extends QueryObject {
	private String searchKey ;
	private String searchType ;
	private Integer types ;
	
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

	public Integer getTypes() {
		return types;
	}

	public void setTypes(Integer types) {
		this.types = types;
	}

	public void customizeQuery() {
		if(this.getSearchKey()!=null && StringUtils.hasLength(this.getSearchKey())){
			this.addQuery("(obj.sn like ?)",new Object[]{"%"+this.getSearchKey()+"%"}
			);
		}
		this.addQuery("obj.types",this.types,"=");
		this.setOrderBy("vdate");
		this.setOrderType("DESC");
		super.customizeQuery();
	}
	
}
