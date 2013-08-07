/**
 * 
 * 蓝源进销存迷你开源版 Lanyo PSS(Mini)
 * 
 * Copyright 2010-2110 成都蓝源信息技术有限公司 .
 *
 *  http://www.lanyotech.com
 *
 */
package com.lanyotech.pps.domain;

import java.math.BigDecimal;
import java.util.Map;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.easyjf.container.annonation.POLoad;
import com.easyjf.util.CommUtil;
import com.easyjf.web.ajax.IJsonObject;

/**
 * 采购单明细
 * 
 * @author ssvfhppl
 * 
 */
@Entity
@Table(name = "purchasebillitem")
public class PurchaseBillItem implements IJsonObject {
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	private Long id;
	@ManyToOne(fetch = FetchType.LAZY)
	private PurchaseBill bill;
	@ManyToOne(fetch = FetchType.LAZY)
	@POLoad
	private Product product;
	private BigDecimal price = new BigDecimal(0);

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getSpec() {
		return spec;
	}

	public void setSpec(String spec) {
		this.spec = spec;
	}

	private BigDecimal num = new BigDecimal(0);
	private BigDecimal amount = new BigDecimal(0);
	private String remark;
	private String color;
	private String spec;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Object toJSonObject() {
		Map map = CommUtil.obj2mapExcept(this, new String[] { "bill", "product" });

		if (product != null) {
			map.put("product", CommUtil.obj2map(product, new String[] { "id", "name", "sn", "salePrice", "costPrice", "model", "intro" }));
		}
		if (bill != null) {
			map.put("bill", CommUtil.obj2map(bill, new String[] { "id", "sn", "supplier" }));
		}
		return map;
	}

	public Long getId() {
		return id;
	}

	public PurchaseBill getBill() {
		return bill;
	}

	public Product getProduct() {
		return product;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public BigDecimal getNum() {
		return num;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public String getRemark() {
		return remark;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setBill(PurchaseBill bill) {
		this.bill = bill;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public void setNum(BigDecimal num) {
		this.num = num;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}
