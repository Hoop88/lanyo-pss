package com.lanyotech.chat.service.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.chat.dao.IOnlineMessageDAO;
import com.lanyotech.chat.domain.OnlineMessage;
import com.lanyotech.chat.service.IOnlineMessageService;
import com.lanyotech.security.OnlineUserManage;
import com.lanyotech.security.domain.User;

/**
 * OnlineMessageServiceImpl
 * 
 * @author EasyJWeb 1.0-m2 $Id: OnlineMessageServiceImpl.java,v 0.0.1 2008-3-5
 *         17:37:25 EasyJWeb 1.0-m2 Exp $
 */
public class OnlineMessageServiceImpl implements IOnlineMessageService {

	private IOnlineMessageDAO onlineMessageDao;
	private long interval = 1000 * 60;
	private long maxOnlineUser = 100;
	private Map<Long, List<OnlineMessage>> cache = new HashMap<Long, List<OnlineMessage>>();
	private Map<Long, List<OnlineMessage>> readCache = new HashMap<Long, List<OnlineMessage>>();
	private long lastUpdate = System.currentTimeMillis();

	public void setInterval(long interval) {
		this.interval = interval;
	}

	public void setMaxOnlineUser(long maxOnlineUser) {
		this.maxOnlineUser = maxOnlineUser;
	}

	public void setOnlineMessageDao(IOnlineMessageDAO onlineMessageDao) {
		this.onlineMessageDao = onlineMessageDao;
	}


	public Long addOnlineMessage(OnlineMessage onlineMessage) {
		/*
		 * this.onlineMessageDao.save(onlineMessage); if (onlineMessage != null &&
		 * onlineMessage.getId() != null) { return onlineMessage.getId(); }
		 * return null;
		 */		
		long id = -System.currentTimeMillis();
		//if(onlineMessage.getSender()!=null){
		onlineMessage.setId(id);
		if (onlineMessage.getReciver() != null) {
			Long key = onlineMessage.getReciver().getId();
			if (cache.containsKey(key)) {
				cache.get(key).add(onlineMessage);
			} else {
				List<OnlineMessage> list = new java.util.ArrayList<OnlineMessage>();
				list.add(onlineMessage);
				cache.put(key, list);
			}

		}
		//}
		//System.out.println("cache" + cache.size());
		return id;
	}

	public OnlineMessage getOnlineMessage(Long id) {
		OnlineMessage onlineMessage = this.onlineMessageDao.get(id);
		return onlineMessage;
	}

	public boolean delOnlineMessage(Long id) {
		OnlineMessage onlineMessage = this.getOnlineMessage(id);
		if (onlineMessage != null) {
			this.onlineMessageDao.remove(id);
			return true;
		}
		return false;
	}

	public boolean batchDelOnlineMessages(List<Serializable> onlineMessageIds) {
		for (Serializable id : onlineMessageIds) {
			delOnlineMessage((Long) id);
		}
		return true;
	}

	public IPageList getOnlineMessageBy(IQueryObject queryObject) {
		return QueryUtil.query(queryObject, OnlineMessage.class,
				this.onlineMessageDao);
	}

	public boolean updateOnlineMessage(Long id, OnlineMessage onlineMessage) {
		if (id != null) {
			onlineMessage.setId(id);
		} else {
			return false;
		}
		this.onlineMessageDao.update(onlineMessage);
		return true;
	}

	private IPageList readMessageFormCache(User user) {
		List list = this.cache.get(user.getId());
		if (list == null)
			return null;
		IPageList pageList = new com.easyjf.web.tools.PageList(
				new com.easyjf.web.tools.ListQuery(list));
		pageList.doList(list.size(), 1, "", "");
		return pageList;
	}

	private void refreshCache() {
		long time = System.currentTimeMillis();
		if (time - this.lastUpdate > this.interval) {
			this.lastUpdate = time;
			//System.out.println("更新readCache" + this.readCache.size());
			//System.out.println("更新cache" + this.cache.size());
			synchronized(this.readCache){
			List<java.io.Serializable> updateList = new java.util.ArrayList<java.io.Serializable>();
			List<List<OnlineMessage>> readed = new java.util.ArrayList<List<OnlineMessage>>();
			readed.addAll(this.readCache.values());
			for (List<OnlineMessage> list : readed) {
				if (list != null) {
					for (OnlineMessage om : list) {
						if (om.getId().longValue() < 0) {
							om.setId(null);
							this.onlineMessageDao.save(om);
						} else {
							updateList.add(om.getId());
						}
					}
				}
			}
			this.readCache.values().removeAll(readed);
			
			this.batchUpdateFlash(updateList);
			}
			// 更新非在线消息的缓存
			List<Long> notOnline = new java.util.ArrayList<Long>();
			synchronized(this.readCache){
			for (Long userId : this.cache.keySet()) {
				if (!OnlineUserManage.getInstance().isOnline(userId)) {
					List<OnlineMessage> message = this.cache.get(userId);
					for (OnlineMessage om : message) {
						om.setId(null);
						this.onlineMessageDao.save(om);
					}
					notOnline.add(userId);
				}
			}			
			for(Long id:notOnline)this.cache.remove(id);
			}
			//System.out.println("更新后readCache" + this.readCache.size());
			//System.out.println("更新后cache" + this.cache.size());
		}
	}

	public IPageList readMessage(User user) {
		//System.out.println("查询数据");
		IPageList pageList = readMessageFormCache(user);// 先从缓存中读取
		if (pageList == null) {
			QueryObject qo = new QueryObject();
			qo.addQuery("obj.reciver", user, "=");
			qo.addQuery("obj.status", 1, "<");
			qo.setOrderBy("inputTime");
			qo.setOrderType("ASC");
			pageList = this.getOnlineMessageBy(qo);
			List<OnlineMessage> list = new ArrayList<OnlineMessage>();
			if (pageList.getResult() != null)
				list.addAll(pageList.getResult());

			this.cache.put(user.getId(), list);
		}
		this.refreshCache();
		return pageList;
	}

	private void batchReadCache(User user, List<Serializable> ids) {
		if (!ids.isEmpty()) {
			List<OnlineMessage> list = this.cache.get(user.getId());
			List<OnlineMessage> readList = new java.util.ArrayList<OnlineMessage>();
			for (int i = 0; i < ids.size(); i++) {
				if(list!=null){
				for (int j = 0; j < list.size(); j++) {
					OnlineMessage msg = list.get(j);
					if (msg.getId().equals(ids.get(i))){
						msg.setStatus(1);
						readList.add(msg);
					}
				}}
			}
			List<OnlineMessage> cacheList = this.readCache.get(user.getId());
			if (cacheList == null) {
				cacheList = readList;
				this.readCache.put(user.getId(), cacheList);
			} else
				cacheList.addAll(readList);
			for(OnlineMessage m:readList)list.remove(m);
//			list.removeAll(readList);
		}
	}

	private void batchUpdateFlash(List<Serializable> ids) {
		if (!ids.isEmpty()) {
			String sql = "update OnlineMessage set status=2,readTime=? where id in(";
			for (int i = 0; i < ids.size(); i++) {
				sql += ids.get(i);
				if (i < ids.size() - 1)
					sql += ",";
			}
			sql += ")";
			this.onlineMessageDao.batchUpdate(sql, new Object[] { new Date() });
		}
	}

	public void batchRead(User user, List<Serializable> ids) {
		this.batchReadCache(user, ids);
	}

	public List<User> getRecentChatUser(User user) {
		//String sql = "select distinct obj.reciver from  OnlineMessage obj where obj.sender=? and obj.status>? order by obj.inputTime desc "; oracle error
		String sql = "select distinct obj.reciver from  OnlineMessage obj where obj.sender=? and obj.status>?";
		return this.onlineMessageDao.query(sql, new Object[] { user,-1 }, 0, 10);
	}
	
	public void addSystemMessage(User user, String content) {
		OnlineMessage om=new OnlineMessage();
		om.setAnnounce(true);
		om.setContent(content);
		om.setReciver(user);
		om.setReciveName(user.getTrueName());
		this.addOnlineMessage(om);
	}
}
