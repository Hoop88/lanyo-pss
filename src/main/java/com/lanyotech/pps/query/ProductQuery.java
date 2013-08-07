package com.lanyotech.pps.query;

import com.easyjf.container.annonation.POLoad;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.util.StringUtils;

import com.lanyotech.core.domain.SystemDictionaryDetail;
import com.lanyotech.pps.domain.ProductDir;

public class ProductQuery extends QueryObject {

	@POLoad
	private ProductDir parent;
	private String sn;
	@POLoad
	private SystemDictionaryDetail brand;
	private String spec;
	private String model;
	private String color;
	private String pic;
	private String intro;
	private String searchKey;
	private String name;

	@Override
	public void customizeQuery() {
		if (this.searchKey != null&& StringUtils.hasLength(this.getSearchKey())) {
			this.addQuery("obj.name like ? or obj.sn like ?", new Object[] {
					"%" + this.getSearchKey() + "%",
					"%" + this.getSearchKey() + "%" });
		}
		if (this.sn != null&& StringUtils.hasLength(this.sn)) {
			this.addQuery("obj.sn", "%" + this.sn.trim() + "%", "like");
		}
		if (this.parent != null) {
			this.addQuery("obj.dir.dirPath like ?", new Object[] { "%"
					+ this.parent.getSn().trim() + "@%" });
		}

		if (this.brand != null) {
			this.addQuery("obj.brand", this.brand, "=");
		}
		if (this.model != null&& StringUtils.hasLength(this.model)) {
			this.addQuery("obj.model", "%" + this.model + "%", "like");
		}
		if (this.spec != null&& StringUtils.hasLength(this.spec)) {
			this.addQuery("obj.spec", this.spec, "=");
		}
		if (this.intro != null&& StringUtils.hasLength(this.intro)) {
			this.addQuery("obj.intro", "%" + this.intro + "%", "like");
		}
		if (this.color != null&& StringUtils.hasLength(this.color)) {
			this.addQuery("obj.color", "%" + this.color + "%", "like");
		}
		if (this.name != null&& !this.name.trim().equals("")) {
			this.addQuery("obj.name like ?", new Object[] { "%" + this.name
					+ "%" });
		}
		super.customizeQuery();
	}

	public ProductDir getParent() {
		return parent;
	}

	public void setParent(ProductDir parent) {
		this.parent = parent;
	}

	public String getSn() {
		return sn;
	}

	public void setSn(String sn) {
		this.sn = sn;
	}

	public SystemDictionaryDetail getBrand() {
		return brand;
	}

	public void setBrand(SystemDictionaryDetail brand) {
		this.brand = brand;
	}

	public String getSpec() {
		return spec;
	}

	public void setSpec(String spec) {
		this.spec = spec;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getPic() {
		return pic;
	}

	public void setPic(String pic) {
		this.pic = pic;
	}

	public String getIntro() {
		return intro;
	}

	public void setIntro(String intro) {
		this.intro = intro;
	}

	public String getSearchKey() {
		return searchKey;
	}

	public void setSearchKey(String searchKey) {
		this.searchKey = searchKey;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
