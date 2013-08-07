package com.lanyotech.pps.service.impl;
import java.io.Serializable;
import java.util.List;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.domain.BaseCount;
import com.lanyotech.pps.service.IBaseCountService;
import com.lanyotech.pps.dao.IBaseCountDAO;


/**
 * BaseCountServiceImpl
 * @author EasyJWeb 1.0-m2
 * $Id: BaseCountServiceImpl.java,v 0.0.1 2010-11-30 10:08:53 EasyJWeb 1.0-m2 Exp $
 */
public class BaseCountServiceImpl implements IBaseCountService{
	
	private IBaseCountDAO baseCountDao;
	
	public void setBaseCountDao(IBaseCountDAO baseCountDao){
		this.baseCountDao=baseCountDao;
	}
	
	public Long addBaseCount(BaseCount baseCount) {	
		this.baseCountDao.save(baseCount);
		if (baseCount != null && baseCount.getId() != null) {
			return baseCount.getId();
		}
		return null;
	}
	
	public BaseCount getBaseCount(Long id) {
		BaseCount baseCount = this.baseCountDao.get(id);
		return baseCount;
		}
	
	public boolean delBaseCount(Long id) {	
			BaseCount baseCount = this.getBaseCount(id);
			if (baseCount != null) {
				this.baseCountDao.remove(id);
				return true;
			}			
			return false;	
	}
	
	public boolean batchDelBaseCounts(List<Serializable> baseCountIds) {
		
		for (Serializable id : baseCountIds) {
			delBaseCount((Long) id);
		}
		return true;
	}
	
	public IPageList getBaseCountBy(IQueryObject queryObject) {	
		return QueryUtil.query(queryObject, BaseCount.class,this.baseCountDao);		
	}
	
	public boolean updateBaseCount(Long id, BaseCount baseCount) {
		if (id != null) {
			baseCount.setId(id);
		} else {
			return false;
		}
		this.baseCountDao.update(baseCount);
		return true;
	}	
	
}
