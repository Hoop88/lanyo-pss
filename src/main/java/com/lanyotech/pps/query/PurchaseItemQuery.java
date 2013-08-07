package com.lanyotech.pps.query;

import java.util.Date;

import com.easyjf.container.annonation.POLoad;
import com.easyjf.core.support.query.QueryObject;
import com.lanyotech.pps.domain.PurchaseBill;

public class PurchaseItemQuery extends QueryObject {

	@POLoad
	private PurchaseBill parent;
	private Date startTime;
	private Date endTime;
	private Integer status;

	private Date vdate;

	@Override
	public void customizeQuery() {

		if (this.parent != null) {
			this.addQuery("obj.bill", this.parent, "=");
		}
		if (this.status != null) {
			this.addQuery("obj.bill.status", this.status, "=");
		}
		if (this.startTime != null) {
			this.addQuery("obj.bill.vdate", this.startTime, ">=");
		}
		if (this.endTime != null) {
			this.addQuery("obj.bill.vdate", this.endTime, "<");
		}
		super.customizeQuery();
	}

	public PurchaseBill getParent() {
		return parent;
	}

	public void setParent(PurchaseBill parent) {
		this.parent = parent;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Date getVdate() {
		return vdate;
	}

	public void setVdate(Date vdate) {
		this.vdate = vdate;
	}

}
