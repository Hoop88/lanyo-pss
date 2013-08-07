package com.lanyotech.chat.mvc;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.easyjf.container.annonation.Action;
import com.easyjf.container.annonation.InjectDisable;
import com.easyjf.util.CommUtil;
import com.easyjf.web.ActionContext;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.core.AbstractPageCmdAction;
import com.easyjf.web.tools.IActiveUser;
import com.lanyotech.chat.service.Chat;
import com.lanyotech.chat.service.ChatService;
import com.lanyotech.chat.service.ChatUser;
import com.lanyotech.security.UserContext;
import com.lanyotech.security.domain.User;

@Action(path = "chat")
public class ChatAction extends AbstractPageCmdAction {
	@InjectDisable
	private ChatService chatService;

	public Object doBefore(WebForm form, Module module) {		
		if (chatService == null)
			chatService = ChatService.get((String) form.get("id"));
		return super.doBefore(form, module);
	}

	public Page doInit(WebForm form, Module module) {
		return doMain(form, module);
	}

	// 用户登录进入会议室
	public Page doMain(WebForm form, Module module) {
		if (chatService != null) {
			ChatUser user = getChatUser();
			if (!chatService.join(user))
				this.addError("msg", "不能加入该课堂，可能是权限不够！");
			form.addResult("chatRoom", chatService);
			form.addResult("user", user);
			Map map=new HashMap();
			map.put("id", chatService.getCid());
			map.put("title", chatService.getTitle());
			map.put("announce", chatService.getAnnounce());
			form.jsonResult(map);
		} else {
			this.addError("msg", "课堂未启动或者该课堂不存在！");
		}
		return this.pageForExtForm(form);
	}

	// 处理用户发言信息
	public Page doSend(WebForm form, Module module) {		
		if (chatService == null)
			throw new RuntimeException("课堂不存在！");// 返回会议室不存在的错误
		Chat chat = (Chat) form.toPo(Chat.class);
		chat.setId(chatService.geneId());
		chat.setSender(getChatUser().getUserName());
		chat.setRoomId(chatService.getCid());
		chatService.talk(chat);
		return doRecive(form, module);
	}

	// 用户接收发言信息
	public Page doRecive(WebForm form, Module module) {
		if (chatService == null)
			throw new RuntimeException("课堂不存在！");// 返回会议室不存在的错误
		String lastReadId = CommUtil.null2String(form.get("lastReadId"));
		List list= chatService.getNewestMsg(getChatUser(),lastReadId);
		Map map=new HashMap();
		map.put("msgList", list);
		map.put("userList", chatService.getUsers());
		form.jsonResult(map);		
		//return page("msgList.json");
		return Page.JSONPage;
	}

	// 用户刷新会议状态信息
	public Page doLoadConfig(WebForm form, Module module) {
		if (chatService == null)
			return new Page("err", "/err.html", "thml");// 返回会议室不存在的错误
		form.addResult("userList", chatService.getUsers());
		form.addResult("talkerList", chatService.getTalkers());
		return page("configMsg.json");
	}

	// 用户退出
	public Page doExit(WebForm form, Module module) {
		if (chatService == null)
			return new Page("err", "/err.html", "thml");// 返回会议室不存在的错误
		chatService.exit(getChatUser());
		form.addResult("msg", "退出成功");
		form.jsonResult(true);
		ActionContext.getContext().getSession().removeAttribute("chatUser");
		return Page.JSONPage;
	}

	private ChatUser doLogin() {
		User u=UserContext.getUser();
		//String userName = != null ? UserContext.getCurrentUser().getName(): chatService.geneGuest();
		ChatUser user = new ChatUser();
		user.setUserName(u.getName());
		user.setUserId(u.getId());
		user.setLastAccessTime(new Date());
		user.setIp(ActionContext.getContext().getRequest().getRemoteAddr());
		user.setPort(""
				+ ActionContext.getContext().getRequest().getRemotePort());
		ActionContext.getContext().getSession().setAttribute("chatUser", user);
		return user;
	}

	protected IActiveUser getCurrentUser() {
		IActiveUser user = (IActiveUser) ActionContext.getContext()
				.getSession().getAttribute("bbsuser");
		return user;
	}

	private ChatUser getChatUser() {
		ChatUser user = null;
		user = (ChatUser) ActionContext.getContext().getSession().getAttribute(
				"chatUser");
		if (user == null)
			user = doLogin();
		return user;
	}
}
