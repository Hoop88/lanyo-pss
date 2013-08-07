/**
 * 
 * 
 * 蓝源进销存迷你开源版 Lanyo PSS(Mini)
 * 
 * Copyright 2010-2110 成都蓝源信息技术有限公司 .
 *
 *  http://www.lanyotech.com
 *
 */
package com.lanyotech.pps.domain;

import java.util.List;
import java.util.Map;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.easyjf.container.annonation.POLoad;
import com.easyjf.util.CommUtil;
import com.easyjf.web.ajax.IJsonObject;

/**
 * 部门
 * 
 * @author 小星星
 * 
 */
@Entity
@Table(name = "department")
public class Department implements IJsonObject {
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	private Long id;
	private String name;
	private String sn;
	private String tel;
	private String intro;
	private Integer sequence;
	private String fax;

	@ManyToOne(fetch = FetchType.LAZY)
	@POLoad
	private Department parent;

	@OneToMany(mappedBy = "parent")
	private List<Department> children = new java.util.ArrayList<Department>();

	public List<Department> getChildren() {
		return children;
	}

	public String getFax() {
		return fax;
	}

	public Long getId() {
		return id;
	}

	public String getIntro() {
		return intro;
	}

	public String getName() {
		return name;
	}

	public Department getParent() {
		return parent;
	}

	public Integer getSequence() {
		return sequence;
	}

	public String getSn() {
		return sn;
	}

	public String getTel() {
		return tel;
	}

	public void setChildren(List<Department> children) {
		this.children = children;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setIntro(String intro) {
		this.intro = intro;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setParent(Department parent) {
		this.parent = parent;
	}

	public void setSequence(Integer sequence) {
		this.sequence = sequence;
	}

	public void setSn(String sn) {
		this.sn = sn;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Object toJSonObject() {
		Map map = CommUtil.obj2mapExcept(this, new String[] { "children", "parent" });
		if (parent != null) {
			map.put("parent", CommUtil.obj2map(parent, new String[] { "id", "name", "sn" }));
		}
		return map;
	}
}
