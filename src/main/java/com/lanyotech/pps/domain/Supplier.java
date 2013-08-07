/**
 * 供应商
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
import javax.persistence.Entity;
import javax.persistence.Table;
/**
 * 供应商
 * @author 小星星
 *
 */
@Entity
@Table(name = "supplier")
public class Supplier extends Client {
	private BigDecimal assureAmount;
	
	public BigDecimal getAssureAmount() {
		return assureAmount;
	}

	public void setAssureAmount(BigDecimal assureAmount) {
		this.assureAmount = assureAmount;
	}
}
