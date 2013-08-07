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
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.easyjf.container.annonation.POLoad;
import com.easyjf.util.CommUtil;
import com.easyjf.web.ajax.IJsonObject;
import com.lanyotech.core.domain.SystemDictionaryDetail;

/**
 * 产品
 * 
 * @author ssvfhppl
 * 
 */
@Entity
@Table(name = "product")
public class Product implements IJsonObject, Cloneable {
	@ManyToOne(fetch = FetchType.LAZY)
	@POLoad
	private SystemDictionaryDetail brand;// ProductBrand
	private String color;
	@Lob
	private String content;
	private BigDecimal costPrice;

	@ManyToOne(fetch = FetchType.LAZY)
	@POLoad
	private ProductDir dir;

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	private Long id;
	private String intro;
	private String model;

	private String name;
	private String other1;
	private String other2;

	private String other3;
	private String other4;
	private String pic;
	private BigDecimal salePrice;
	private String sn;
	@Transient
	private String snName;

	private String spec;
	private Boolean isUsed;

	public Boolean getIsUsed() {
		return isUsed;
	}

	public void setIsUsed(Boolean isUsed) {
		this.isUsed = isUsed;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@POLoad
	private SystemDictionaryDetail unit;// ProductUnit

	@Override
	public Object clone() {
		Object o = null;
		try {
			o = super.clone();
		} catch (CloneNotSupportedException e) {
		}
		return o;

	}

	public SystemDictionaryDetail getBrand() {
		return brand;
	}

	public String getColor() {
		return color;
	}

	public String getContent() {
		return content;
	}

	public BigDecimal getCostPrice() {
		return costPrice;
	}

	public ProductDir getDir() {
		return dir;
	}

	public Long getId() {
		return id;
	}

	public String getIntro() {
		return intro;
	}

	public String getModel() {
		return model;
	}

	public String getName() {
		return name;
	}

	public String getOther1() {
		return other1;
	}

	public String getOther2() {
		return other2;
	}

	public String getOther3() {
		return other3;
	}

	public String getOther4() {
		return other4;
	}

	public String getPic() {
		return pic;
	}

	public BigDecimal getSalePrice() {
		return salePrice;
	}

	public String getSn() {
		return sn;
	}

	public String getSnName() {
		return snName;
	}

	public String getSpec() {
		return spec;
	}

	public SystemDictionaryDetail getUnit() {
		return unit;
	}

	public void setBrand(SystemDictionaryDetail brand) {
		this.brand = brand;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public void setCostPrice(BigDecimal costPrice) {
		this.costPrice = costPrice;
	}

	public void setDir(ProductDir dir) {
		this.dir = dir;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setIntro(String intro) {
		this.intro = intro;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setOther1(String other1) {
		this.other1 = other1;
	}

	public void setOther2(String other2) {
		this.other2 = other2;
	}

	public void setOther3(String other3) {
		this.other3 = other3;
	}

	public void setOther4(String other4) {
		this.other4 = other4;
	}

	public void setPic(String pic) {
		this.pic = pic;
	}

	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
	}

	public void setSn(String sn) {
		this.sn = sn;
	}

	public void setSnName(String snName) {
		this.snName = snName;
	}

	public void setSpec(String spec) {
		this.spec = spec;
	}

	public void setUnit(SystemDictionaryDetail unit) {
		this.unit = unit;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Object toJSonObject() {
		Map map = CommUtil.obj2mapExcept(this, new String[] { "dir", "brand", "unit" });
		if (dir != null) {
			map.put("dir", CommUtil.obj2map(dir, new String[] { "id", "name" }));
		}
		if (brand != null) {
			map.put("brand", CommUtil.obj2map(brand, new String[] { "id", "title" }));
		}
		if (unit != null) {
			map.put("unit", CommUtil.obj2map(unit, new String[] { "id", "title" }));
		}
		return map;
	}

}
