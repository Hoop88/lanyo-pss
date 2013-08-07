package com.lanyotech.chat.service;

import java.io.Serializable;
import java.util.List;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.chat.domain.OnlineMessage;
import com.lanyotech.security.domain.User;
/**
 * OnlineMessageService
 * @author EasyJWeb 1.0-m2
 * $Id: OnlineMessageService.java,v 0.0.1 2008-3-5 17:37:25 EasyJWeb 1.0-m2 Exp $
 */
public interface IOnlineMessageService {
	/**
	 * 保存一个OnlineMessage，如果保存成功返回该对象的id，否则返回null
	 * 
	 * @param instance
	 * @return 保存成功的对象的Id
	 */
	Long addOnlineMessage(OnlineMessage instance);
	
	/**
	 * 根据一个ID得到OnlineMessage
	 * 
	 * @param id
	 * @return
	 */
	OnlineMessage getOnlineMessage(Long id);
	
	/**
	 * 删除一个OnlineMessage
	 * @param id
	 * @return
	 */
	boolean delOnlineMessage(Long id);
	
	/**
	 * 批量删除OnlineMessage
	 * @param ids
	 * @return
	 */
	boolean batchDelOnlineMessages(List<Serializable> ids);
	
	/**
	 * 通过一个查询对象得到OnlineMessage
	 * 
	 * @param properties
	 * @return
	 */
	IPageList getOnlineMessageBy(IQueryObject queryObject);
	
	/**
	  * 更新一个OnlineMessage
	  * @param id 需要更新的OnlineMessage的id
	  * @param dir 需要更新的OnlineMessage
	  */
	boolean updateOnlineMessage(Long id,OnlineMessage instance);
	IPageList readMessage(User user);
	void batchRead(User user,List<java.io.Serializable> ids);
	List<User> getRecentChatUser(User user);
	void addSystemMessage(User user,String content);
}
