package com.lanyotech.pps.service;

import java.io.Serializable;
import java.util.List;
import com.easyjf.web.tools.IPageList;
import com.easyjf.core.support.query.IQueryObject;
import com.lanyotech.pps.domain.BaseCount;
/**
 * BaseCountService
 * @author EasyJWeb 1.0-m2
 * $Id: BaseCountService.java,v 0.0.1 2010-11-30 10:08:52 EasyJWeb 1.0-m2 Exp $
 */
public interface IBaseCountService {
	/**
	 * 保存一个BaseCount，如果保存成功返回该对象的id，否则返回null
	 * 
	 * @param instance
	 * @return 保存成功的对象的Id
	 */
	Long addBaseCount(BaseCount instance);
	
	/**
	 * 根据一个ID得到BaseCount
	 * 
	 * @param id
	 * @return
	 */
	BaseCount getBaseCount(Long id);
	
	/**
	 * 删除一个BaseCount
	 * @param id
	 * @return
	 */
	boolean delBaseCount(Long id);
	
	/**
	 * 批量删除BaseCount
	 * @param ids
	 * @return
	 */
	boolean batchDelBaseCounts(List<Serializable> ids);
	
	/**
	 * 通过一个查询对象得到BaseCount
	 * 
	 * @param properties
	 * @return
	 */
	IPageList getBaseCountBy(IQueryObject queryObject);
	
	/**
	  * 更新一个BaseCount
	  * @param id 需要更新的BaseCount的id
	  * @param dir 需要更新的BaseCount
	  */
	boolean updateBaseCount(Long id,BaseCount instance);
}
