package com.lanyotech.pps.query;

import java.util.Date;

import com.easyjf.container.annonation.POLoad;
import com.easyjf.core.support.query.QueryObject;
import com.lanyotech.pps.domain.Client;
import com.lanyotech.pps.domain.Employee;
import com.lanyotech.pps.domain.Supplier;

public class PurchaseBillQuery extends QueryObject {

	private String sn;
	private Integer status;
	private Date vdate1;
	private Date vdate2;
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

		if (this.sn != null) {
			this.addQuery("obj.sn", "%" + this.sn + "%", "like");
		}
		if (this.status != null) {
			this.addQuery("obj.status", this.status, "=");
		}
		if (this.vdate1 != null) {
			this.addQuery("obj.vdate", this.vdate1, ">=");
		}
		if (this.vdate2 != null) {
			this.addQuery("obj.vdate", this.vdate2, "<");
		}
		if (this.employee != null) {
			this.addQuery("obj.buyer", this.employee, "=");
		}
		if (this.inputUser != null) {
			this.addQuery("obj.inputUser", this.inputUser, "=");
		}
		if (this.client != null) {
			this.addQuery("obj.client", this.client, "=");
		}
		if (this.inputUser != null) {
			this.addQuery("obj.supplier", this.supplier, "=");
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

	public Date getVdate1() {
		return vdate1;
	}

	public void setVdate1(Date vdate1) {
		this.vdate1 = vdate1;
	}

	public Date getVdate2() {
		return vdate2;
	}

	public void setVdate2(Date vdate2) {
		this.vdate2 = vdate2;
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
