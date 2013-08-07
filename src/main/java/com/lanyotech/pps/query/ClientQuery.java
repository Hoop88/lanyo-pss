package com.lanyotech.pps.query;

import java.util.ArrayList;
import java.util.List;

import com.easyjf.core.support.query.QueryObject;
import com.easyjf.util.StringUtils;

public class ClientQuery extends QueryObject {
	private Long id; 
	private String searchKey ;
	private String searchType ;
	private String fields[];
	
	public String[] getFields() {
		return fields;
	}

	public void setFields(String[] fields) {
		this.fields = fields;
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
		if(StringUtils.hasLength(this.getSearchKey()) && this.fields!=null && this.fields.length>0){
			List<String> fieldFilters = new ArrayList<String>();
			for (String field : this.fields) {
				if(org.springframework.util.StringUtils.hasLength(field)){
					fieldFilters.add(" obj."+field+" like '%"+this.getSearchKey()+"%'");
				}
			}
			this.addQuery("( "+org.apache.commons.lang.StringUtils.join(fieldFilters.toArray()," or ")+")", null);
		}else if(StringUtils.hasLength(this.getSearchKey())){
			this.addQuery("(obj.name like ? or obj.shortName like ? or obj.address like ? or obj.linkMan like ? or obj.email like ? )",
					new Object[]{
						"%"+this.getSearchKey()+"%",
						"%"+this.getSearchKey()+"%",
						"%"+this.getSearchKey()+"%",
						"%"+this.getSearchKey()+"%",
						"%"+this.getSearchKey()+"%"
					}
			);
		}
		super.customizeQuery();
	}
	
}
