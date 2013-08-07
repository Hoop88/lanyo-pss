package com.lanyotech.pps.query;

import java.math.BigDecimal;
import java.util.Date;

import com.easyjf.container.annonation.POLoad;
import com.easyjf.core.support.query.QueryObject;
import com.lanyotech.pps.domain.Client;
import com.lanyotech.pps.domain.Employee;

public class OrderInfQuery extends QueryObject {

	private String sn;
	private Integer status;
	private Date startTime;
	private Date endTime;
	@POLoad
	private Client client;
	@POLoad
	private Employee seller;
	@POLoad
	private Employee inputUser;
	private BigDecimal amount;

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	@Override
	public void customizeQuery() {

		if (this.sn != null) {
			this.addQuery("obj.sn", "%" + this.sn + "%", "like");
		}
		if (this.status != null) {
			this.addQuery("obj.status", this.status, "=");
		}
		if (this.startTime != null) {
			this.addQuery("obj.vdate", this.startTime, ">=");
		}
		if (this.endTime != null) {
			this.addQuery("obj.vdate", this.endTime, "<");
		}
		if (this.seller != null) {
			this.addQuery("obj.seller", this.seller, "=");
		}
		if (this.inputUser != null) {
			this.addQuery("obj.inputUser", this.inputUser, "=");
		}
		if (this.client != null) {
			this.addQuery("obj.client", this.client, "=");
		}
		if (this.amount != null) {
			this.addQuery("obj.amount", this.amount, ">=");
		}

		super.customizeQuery();
	}

	public String getSn() {
		return sn;
	}

	public void setSn(String sn) {
		this.sn = sn;
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

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	public Employee getSeller() {
		return seller;
	}

	public void setSeller(Employee seller) {
		this.seller = seller;
	}

	public Employee getInputUser() {
		return inputUser;
	}

	public void setInputUser(Employee inputUser) {
		this.inputUser = inputUser;
	}

}
