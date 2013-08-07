package com.lanyotech.chat.service;

import java.io.Serializable;
import java.util.List;
import com.easyjf.web.tools.IPageList;
import com.easyjf.core.support.query.IQueryObject;
import com.lanyotech.chat.domain.ChatRoom;
/**
 * ChatRoomService
 * @author EasyJWeb 1.0-m2
 * $Id: ChatRoomService.java,v 0.0.1 2007-12-24 16:44:34 EasyJWeb 1.0-m2 Exp $
 */
public interface IChatRoomService {
	/**
	 * 保存一个ChatRoom，如果保存成功返回该对象的id，否则返回null
	 * 
	 * @param instance
	 * @return 保存成功的对象的Id
	 */
	Long addChatRoom(ChatRoom instance);
	
	/**
	 * 根据一个ID得到ChatRoom
	 * 
	 * @param id
	 * @return
	 */
	ChatRoom getChatRoom(Long id);
	
	/**
	 * 删除一个ChatRoom
	 * @param id
	 * @return
	 */
	boolean delChatRoom(Long id);
	
	/**
	 * 批量删除ChatRoom
	 * @param ids
	 * @return
	 */
	boolean batchDelChatRooms(List<Serializable> ids);
	
	/**
	 * 通过一个查询对象得到ChatRoom
	 * 
	 * @param properties
	 * @return
	 */
	IPageList getChatRoomBy(IQueryObject queryObject);
	
	/**
	  * 更新一个ChatRoom
	  * @param id 需要更新的ChatRoom的id
	  * @param dir 需要更新的ChatRoom
	  */
	boolean updateChatRoom(Long id,ChatRoom instance);

	
}
