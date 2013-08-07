package com.lanyotech.pps.query;

import java.util.Date;

import com.easyjf.container.annonation.POLoad;
import com.easyjf.core.support.query.QueryObject;
import com.lanyotech.pps.domain.Client;
import com.lanyotech.pps.domain.Employee;
import com.lanyotech.pps.domain.PurchaseBill;
import com.lanyotech.pps.domain.Supplier;

public class PurchaseBillItemQuery extends QueryObject {
	@POLoad
	private PurchaseBill parent;
	private Integer status;
	private Date startTime;
	private Date endTime;
	@POLoad
	private Supplier supplier;
	@POLoad
	private Client client;
	@POLoad
	private Employee employee;
	@POLoad
	private Employee inputUser;

	@Override
	public void customizeQuery() {
		if (this.status != null) {
			this.addQuery("obj.status", this.status, "=");
		}
		if (this.startTime != null) {
			this.addQuery("obj.vdate", this.startTime, ">=");
		}
		if (this.endTime != null) {
			this.addQuery("obj.vdate", this.endTime, "<");
		}
		if (this.parent != null) {
			this.addQuery("obj.bill", this.parent, "=");
		}

		super.customizeQuery();
	}

	public PurchaseBill getParent() {
		return parent;
	}

	public void setParent(PurchaseBill parent) {
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

	public Supplier getSupplier() {
		return supplier;
	}

	public void setSupplier(Supplier supplier) {
		this.supplier = supplier;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public Employee getInputUser() {
		return inputUser;
	}

	public void setInputUser(Employee inputUser) {
		this.inputUser = inputUser;
	}

}
