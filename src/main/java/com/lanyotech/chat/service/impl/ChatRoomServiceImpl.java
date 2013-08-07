package com.lanyotech.chat.service.impl;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.lanyotech.chat.dao.IChatRoomDAO;
import com.lanyotech.chat.domain.ChatRoom;
import com.lanyotech.chat.service.IChatRoomService;


/**
 * ChatRoomServiceImpl
 * @author EasyJWeb 1.0-m2
 * $Id: ChatRoomServiceImpl.java,v 0.0.1 2007-12-24 16:44:35 EasyJWeb 1.0-m2 Exp $
 */
public class ChatRoomServiceImpl implements IChatRoomService{
	
	private IChatRoomDAO chatRoomDao;
	
	public void setChatRoomDao(IChatRoomDAO chatRoomDao){
		this.chatRoomDao=chatRoomDao;
	}
	
	public Long addChatRoom(ChatRoom chatRoom) {	
		chatRoom.setInputTime(new Date());
		this.chatRoomDao.save(chatRoom);
		if (chatRoom != null && chatRoom.getId() != null) {
			return chatRoom.getId();
		}
		return null;
	}
	
	public ChatRoom getChatRoom(Long id) {
		ChatRoom chatRoom = this.chatRoomDao.get(id);
		return chatRoom;
	}
	
	public boolean delChatRoom(Long id) {	
			ChatRoom chatRoom = this.getChatRoom(id);
			if (chatRoom != null) {
				this.chatRoomDao.remove(id);
				return true;
			}			
			return false;	
	}
	
	public boolean batchDelChatRooms(List<Serializable> chatRoomIds) {
		
		for (Serializable id : chatRoomIds) {
			delChatRoom((Long) id);
		}
		return true;
	}
	
	public com.easyjf.web.tools.IPageList getChatRoomBy(IQueryObject queryObject) {	
		return QueryUtil.query(queryObject, ChatRoom.class,this.chatRoomDao);		
	}
	
	public boolean updateChatRoom(Long id, ChatRoom chatRoom) {
		if (id != null) {
			chatRoom.setId(id);
		} else {
			return false;
		}
		this.chatRoomDao.update(chatRoom);
		return true;
	}	
	
}
