package com.lanyotech.chat.mvc;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.List;

import com.easyjf.container.annonation.Action;
import com.easyjf.container.annonation.Inject;
import com.easyjf.core.support.query.BaseQueryObject;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.util.CommUtil;
import com.easyjf.web.Globals;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.ajax.AjaxUtil;
import com.easyjf.web.core.AbstractPageCmdAction;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.chat.domain.ChatRoom;
import com.lanyotech.chat.service.ChatHistory;
import com.lanyotech.chat.service.ChatService;
import com.lanyotech.chat.service.IChatRoomService;
import com.lanyotech.security.UserContext;

/**
 * ChatRoomAction
 * 
 * @author EasyJWeb 1.0-m2 $Id: ChatRoomAction.java,v 0.0.1 2007-12-24 16:44:35
 *         EasyJWeb 1.0-m2 Exp $
 */
@Action(path = "chatRoom")
public class ChatRoomAction extends AbstractPageCmdAction {
	@Inject
	private IChatRoomService service;

	/*
	 * set the current service return service
	 */
	public void setService(IChatRoomService service) {
		this.service = service;
	}

	/*
	 * public Object doBefore(WebForm form, Module module){ command =
	 * CommUtil.null2String(form.get("cmd")); if("".equals(command) ||
	 * command.equals("show")){ return null; }else{ ChatUser user =
	 * (ChatUser)ActionContext.getContext().getSession().getAttribute("chatUser");
	 * if(user==null||user.getIsMaster()==0){ form.getTextElement().clear();
	 * form.addResult("msg", "对不起，你没有登录，或者你没有权限访问该页面！"); return
	 * this.doShow(form); } } return null; }
	 */

	public Page doInit(WebForm form, Module module) {
		return doShow(form);
	}

	public Page doStart(WebForm form, Module module) {
		String id = CommUtil.null2String(form.get("id"));
		ChatRoom obj = this.service.getChatRoom(new Long(id));
		//if (obj != null && UserContext.isAdmin()) {
		 if(obj != null) {
			ChatService chat = ChatService.create(id);
			chat.setMaxUser(obj.getMaxUser().intValue());
			chat.setCid(obj.getId());
			chat.setIntro(obj.getIntro());
			chat.setTitle(obj.getTitle());
			if (obj.getIntervals() != null)
				chat.setInterval(obj.getIntervals().intValue());
			chat.setOwner(obj.getOwner());
			chat.setVrtype(obj.getVrtype());
			chat.setVrvalue(obj.getVrvalue());
			chat.setAnnounce(obj.getAnnounce());
			chat.setStatus(obj.getStatus().intValue());
			chat.setFilePath(Globals.APP_BASE_DIR + "/WEB-INF/chat-history");
			Thread t = new Thread(chat);
			t.start();
			form.addResult("msg", "已经成功启动会议室！");
			form.jsonResult(obj);
		} else
			form.jsonResult(false);
		return Page.JSONPage;
	}

	public Page doListHistory(WebForm form, Module module) {
		String cid = CommUtil.null2String(form.get("id"));
		int currentPage = CommUtil.null2Int(form.get("page"));
		int pageSize = CommUtil.null2Int(form.get("pageSize"));
		if (currentPage < 1)
			currentPage = 1;
		if (pageSize < 1)
			pageSize = 15;
		ChatRoom obj = service.getChatRoom(Long.parseLong(cid));
		if (obj != null) {
			ChatHistory ch = new ChatHistory(obj);
			List list=ch.listHistory();
			/*IPageList pList = new PageList(new ListQuery(ch.listHistory()));
			pList.doList(pageSize, currentPage, "", "");
			if(pList.getResult()!=null){
				for(int i=0;i<pList.getResult().size();i++){
					Map map=(Map)pList.getResult().get(i);
					Map node=new HashMap();
					node.put("text",map.get("title"));
				}
			}*/
			form.jsonResult(list);
		}
		return Page.JSONPage;
	}

	public Page doShowHistory(WebForm form, Module module) throws Exception {
		String cid = CommUtil.null2String(form.get("id"));
		String fileName = URLDecoder.decode(URLEncoder.encode((String) form
				.get("fileName"), "ISO8859_1"), "utf-8");		
		ChatRoom obj = service.getChatRoom(Long.parseLong(cid));
		if (obj != null) {
			ChatHistory ch = new ChatHistory(obj);
			form.addResult("chatMsg", ch.read(fileName));
		}
		return new Page("/controller/showHistory.html");
	}

	public Page doClose(WebForm form, Module module) {
		String id = CommUtil.null2String(form.get("id"));
		if (UserContext.getUser()!=null) {
			ChatService.close(id);
			form.jsonResult(true);
		} else
			form.jsonResult(false);
		return Page.JSONPage;
	}

	public Page doShow(WebForm form) {
		BaseQueryObject query = new BaseQueryObject();
		form.toPo(query);
		IPageList pageList = this.service.getChatRoomBy(query);
		CommUtil.saveIPageList2WebForm(pageList, form);
		return page("index");
	}

	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		QueryObject qo = form.toPo(QueryObject.class);
		IPageList pageList = service.getChatRoomBy(qo);
		AjaxUtil.convertEntityToJson(pageList);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		/*if (!UserContext.isSuperAdmin())
			this.addError("msg", "无权限");
		else*/
			service.delChatRoom(id);
		return pageForExtForm(form);
	}

	public Page doSave(WebForm form) {
		ChatRoom object = form.toPo(ChatRoom.class);
		object.setOwner(UserContext.getUser().getName());
		if (!hasErrors())
			service.addChatRoom(object);
		return pageForExtForm(form);
	}

	public Page doUpdate(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		ChatRoom object = service.getChatRoom(id);
		/*if (!UserContext.isSuperAdmin())
			this.addError("msg", "无权限");
		else*/
		form.toPo(object, true);
		System.out.println(object.getBeginTime());
		if (!hasErrors())
			service.updateChatRoom(id, object);
		return pageForExtForm(form);
	}
}