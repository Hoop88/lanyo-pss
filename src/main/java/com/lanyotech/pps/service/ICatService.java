package com.lanyotech.pps.service;

import java.io.Serializable;
import java.util.List;
import com.easyjf.web.tools.IPageList;
import com.easyjf.core.support.query.IQueryObject;
import com.lanyotech.pps.domain.Cat;
/**
 * CatService
 * @author EasyJWeb 1.0-m2
 * $Id: CatService.java,v 0.0.1 2010-12-21 15:55:36 EasyJWeb 1.0-m2 Exp $
 */
public interface ICatService {
	/**
	 * 保存一个Cat，如果保存成功返回该对象的id，否则返回null
	 * 
	 * @param instance
	 * @return 保存成功的对象的Id
	 */
	Long addCat(Cat instance);
	
	/**
	 * 根据一个ID得到Cat
	 * 
	 * @param id
	 * @return
	 */
	Cat getCat(Long id);
	
	/**
	 * 删除一个Cat
	 * @param id
	 * @return
	 */
	boolean delCat(Long id);
	
	/**
	 * 批量删除Cat
	 * @param ids
	 * @return
	 */
	boolean batchDelCats(List<Serializable> ids);
	
	/**
	 * 通过一个查询对象得到Cat
	 * 
	 * @param properties
	 * @return
	 */
	IPageList getCatBy(IQueryObject queryObject);
	
	/**
	  * 更新一个Cat
	  * @param id 需要更新的Cat的id
	  * @param dir 需要更新的Cat
	  */
	boolean updateCat(Long id,Cat instance);
}
