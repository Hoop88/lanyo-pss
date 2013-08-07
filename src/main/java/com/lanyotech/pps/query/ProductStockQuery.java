package com.lanyotech.pps.query;

import com.easyjf.container.annonation.POLoad;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.util.StringUtils;
import com.lanyotech.pps.domain.Depot;
import com.lanyotech.pps.domain.ProductDir;

public class ProductStockQuery extends QueryObject {
	private Long id; 
	private String searchKey ;
	
	@POLoad
	private ProductDir dir;
	
	@POLoad
	private Depot depot;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSearchKey() {
		return searchKey;
	}

	public void setSearchKey(String searchKey) {
		this.searchKey = searchKey;
	}

	public void setDir(ProductDir dir) {
		this.dir = dir;
	}
	
	public Depot getDepot() {
		return depot;
	}

	public void setDepot(Depot depot) {
		this.depot = depot;
	}

	public void customizeQuery() {
		if(this.getSearchKey()!=null && StringUtils.hasLength(this.getSearchKey())){
			this.addQuery("obj.product.name like ? or obj.product.sn like ?",new Object[]{"%"+this.getSearchKey()+"%","%"+this.getSearchKey()+"%"});
		}
		if(this.dir!=null){
			this.addQuery("obj.product.dir.dirPath like ?",new Object[] { "%"
					+ this.dir.getSn().trim() + "@%" });
		}
		if(this.depot!=null){
			this.addQuery("obj.depot = ?",new Object[]{this.depot});
		}
		super.customizeQuery();
	}
}
