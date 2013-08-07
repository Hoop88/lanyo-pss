package com.lanyotech.pps.service.impl;
import java.io.Serializable;
import java.util.List;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.domain.Cat;
import com.lanyotech.pps.service.ICatService;
import com.lanyotech.pps.dao.ICatDAO;


/**
 * CatServiceImpl
 * @author EasyJWeb 1.0-m2
 * $Id: CatServiceImpl.java,v 0.0.1 2010-12-21 15:55:36 EasyJWeb 1.0-m2 Exp $
 */
public class CatServiceImpl implements ICatService{
	
	private ICatDAO catDao;
	
	public void setCatDao(ICatDAO catDao){
		this.catDao=catDao;
	}
	
	public Long addCat(Cat cat) {	
		this.catDao.save(cat);
		if (cat != null && cat.getId() != null) {
			return cat.getId();
		}
		return null;
	}
	
	public Cat getCat(Long id) {
		Cat cat = this.catDao.get(id);
		return cat;
		}
	
	public boolean delCat(Long id) {	
			Cat cat = this.getCat(id);
			if (cat != null) {
				this.catDao.remove(id);
				return true;
			}			
			return false;	
	}
	
	public boolean batchDelCats(List<Serializable> catIds) {
		
		for (Serializable id : catIds) {
			delCat((Long) id);
		}
		return true;
	}
	
	public IPageList getCatBy(IQueryObject queryObject) {	
		return QueryUtil.query(queryObject, Cat.class,this.catDao);		
	}
	
	public boolean updateCat(Long id, Cat cat) {
		if (id != null) {
			cat.setId(id);
		} else {
			return false;
		}
		this.catDao.update(cat);
		return true;
	}	
	
}
