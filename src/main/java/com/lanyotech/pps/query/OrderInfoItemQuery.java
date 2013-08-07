package com.lanyotech.pps.query;

import java.util.Date;

import com.easyjf.container.annonation.POLoad;
import com.easyjf.core.support.query.QueryObject;
import com.lanyotech.pps.domain.OrderInfo;

public class OrderInfoItemQuery extends QueryObject {
	private Boolean isGroup = false;
	@POLoad
	private OrderInfo parent;
	private Integer status;
	private Date startTime;
	private Date endTime;

	public Boolean getIsGroup() {
		return isGroup;
	}

	public void setIsGroup(Boolean isGroup) {
		this.isGroup = isGroup;
	}

	@Override
	public void customizeQuery() {

		if (this.status != null) {
			this.addQuery("obj.orderInfo.status", this.status, "=");
		}
		if (this.startTime != null) {
			this.addQuery("obj.orderInfo.vdate", this.startTime, ">=");
		}
		if (this.endTime != null) {
			this.addQuery("obj.orderInfo.vdate", this.endTime, "<");
		}
		if (this.parent != null) {
			this.addQuery("obj.orderInfo", this.parent, "=");
		}

		super.customizeQuery();
	}

	public OrderInfo getParent() {
		return parent;
	}

	public void setParent(OrderInfo parent) {
		this.parent = parent;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
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

}
