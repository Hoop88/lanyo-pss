package com.lanyotech.pps.query;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;

import com.easyjf.container.annonation.POLoad;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.util.StringUtils;
import com.lanyotech.pps.domain.Depot;
import com.lanyotech.pps.domain.Supplier;

public class StockIncomeQuery extends QueryObject {
	private String searchKey ;
	private String searchType ;
	private Boolean auditing;
	private BigDecimal beginAmount;
	private BigDecimal endAmount;
	@POLoad
	private Depot depot;
	private String sn;
	private Date startDate;
	private Date endDate;
	@POLoad
	private Supplier supplier;
	private Integer types ;
	
	public Boolean getAuditing() {
		return auditing;
	}

	public void setAuditing(Boolean auditing) {
		this.auditing = auditing;
	}

	public BigDecimal getBeginAmount() {
		return beginAmount;
	}

	public void setBeginAmount(BigDecimal beginAmount) {
		this.beginAmount = beginAmount;
	}

	public BigDecimal getEndAmount() {
		return endAmount;
	}

	public void setEndAmount(BigDecimal endAmount) {
		this.endAmount = endAmount;
	}

	public Depot getDepot() {
		return depot;
	}

	public void setDepot(Depot depot) {
		this.depot = depot;
	}

	public String getSn() {
		return sn;
	}

	public void setSn(String sn) {
		this.sn = sn;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Supplier getSupplier() {
		return supplier;
	}

	public void setSupplier(Supplier supplier) {
		this.supplier = supplier;
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
		
		if("advancedSearch".equals(this.searchType)){
			if(this.auditing!=null){
				this.addQuery("obj.auditing = ? ", new Object[]{this.auditing});
			}
			if(this.beginAmount!=null){
				this.addQuery("obj.amount >= ? ", new Object[]{this.beginAmount});
			}
			if(this.endAmount!=null){
				this.addQuery("obj.amount <= ? ", new Object[]{this.endAmount});
			}
			if(this.startDate!=null){
				this.addQuery("obj.inputTime >= ? ", new Object[]{this.startDate});
			}
			if(this.endDate!=null){
				Calendar c = Calendar.getInstance();
				c.setTime(this.endDate);
				c.add(Calendar.DATE, 1);
				this.addQuery("obj.inputTime < ? ", new Object[]{c});
			}
			if(this.depot!=null){
				this.addQuery("obj.depot = ?", new Object[]{this.depot});
			}
			if(this.supplier!=null){
				this.addQuery("obj.supplier", new Object[]{this.supplier});
			}
		}
		this.addQuery("obj.types",this.types,"=");
		this.setOrderBy("vdate");
		this.setOrderType("ASC");
		super.customizeQuery();
	}
	
}
