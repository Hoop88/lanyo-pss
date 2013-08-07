package com.lanyotech.chat.mvc;

import java.io.File;
import java.io.InputStream;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;

import com.easyjf.container.annonation.Action;
import com.easyjf.container.annonation.Inject;
import com.easyjf.core.support.ActionUtil;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.util.CommUtil;
import com.easyjf.util.FileUtil;
import com.easyjf.util.StringUtils;
import com.easyjf.web.ActionContext;
import com.easyjf.web.Globals;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.ajax.AjaxUtil;
import com.easyjf.web.core.AbstractPageCmdAction;
import com.easyjf.web.tools.IPageList;
import com.easyjf.web.tools.PageList;
import com.lanyotech.chat.domain.OnlineMessage;
import com.lanyotech.chat.service.IOnlineMessageService;
import com.lanyotech.pps.domain.Department;
import com.lanyotech.pps.domain.Employee;
import com.lanyotech.pps.query.EmployeeQuery;
import com.lanyotech.pps.service.IDepartmentService;
import com.lanyotech.pps.service.IEmployeeService;
import com.lanyotech.security.OnlineUserManage;
import com.lanyotech.security.UserContext;
import com.lanyotech.security.OnlineUserManage.OnlineUser;
import com.lanyotech.security.domain.User;

@Action
public class OnlineUserAction extends AbstractPageCmdAction {
	@Inject
	private IEmployeeService service;
	@Inject
	private IOnlineMessageService onlineMessageService;
	@Inject
	private IDepartmentService deptService;

	/*
	 * set the current service return service
	 */
	public void setOnlineMessageService(
			IOnlineMessageService onlineMessageService) {
		this.onlineMessageService = onlineMessageService;
	}

	public void setDeptService(IDepartmentService deptService) {
		this.deptService = deptService;
	}

	public Page doIndex(WebForm f, Module m) {
		return forward("list");
	}

	public Page doReadUser(WebForm form) {
		String id = CommUtil.null2String(form.get("id"));
		Map map = new java.util.HashMap();
		Employee user = null;
		if (!"".equals(id)) {
			user = this.service.getEmployee(new Long(id));
		} else {
			String name = CommUtil.null2String(form.get("name"));
			User temp = this.service.getUserByName(name);
			if(temp!=null)
				user=this.service.getEmployee(temp.getId());
		}
		if (user != null) {
			map.put("name", user.getName());
			map.put("email", user.getEmail());
			map.put("tel", user.getTel());
			map.put("dept", user.getDept()==null?"":user.getDept().getName());
			map.put("loginTimes", user.getLoginTimes());
		}
		form.jsonResult(map);
		return Page.JSONPage;
	}

	public Page doSendMessage(WebForm form) {
		OnlineMessage om = form.toPo(OnlineMessage.class);
		if (!this.hasErrors()) {
			om.setIp(ActionContext.getContext().getRequest().getRemoteAddr());
			om.setSender(UserContext.getUser());
			this.onlineMessageService.addOnlineMessage(om);
		}
		return pageForExtForm(form);
	}

	public Page doReadMessage(WebForm form) {
		User user = UserContext.getUser();
		if (user != null) {
			List<Serializable> ids = ActionUtil.processIds(form);
			this.onlineMessageService.batchRead(user, ids);
			form.jsonResult(true);
		}
		return Page.JSONPage;
	}

	/**
	 * 检查是否有在线消息
	 * 
	 * @param form
	 * @return
	 */
	public Page doCheckMessage(WebForm form) {
		User user = UserContext.getUser();
		if (user != null) {
			IPageList pageList = this.onlineMessageService.readMessage(user);
			if (pageList.getRowCount() > 0) {
				form.addResult("msg", pageList.getRowCount());
			}
		}
		return new Page("/news/checkMessage.js");
	}

	public Page doLoadMessage(WebForm form) {
		User user = UserContext.getUser();
		if (user != null) {
			IPageList pageList = this.onlineMessageService.readMessage(user);
			AjaxUtil.convertEntityToJson(pageList);
			form.jsonResult(pageList);
		} else
			form.jsonResult(false);
		return Page.JSONPage;
	}

	public Page doRecentChatUser(WebForm form) {
		QueryObject query = new QueryObject();
		User user = UserContext.getUser();
		List onlineList = new java.util.ArrayList();
		List list1 = new java.util.ArrayList();
		if (user != null) {
			List list = this.onlineMessageService.getRecentChatUser(user);
			for (int i = 0; i < list.size(); i++) {
				Map map = new java.util.HashMap();
				User u = (User) list.get(i);
				map.put("text", u.getName());
				map.put("leaf", true);
				map.put("id", u.getId().toString());
				map.put("login", true);// 随时可以给专家发信息
				if (OnlineUserManage.getInstance().getOnlineUser(u.getName()) != null) {
					map.put("icon", "images/qq/user.gif");
					onlineList.add(map);
				} else {
					map.put("icon", "images/qq/user1.gif");
					list1.add(map);
				}
			}
		}
		onlineList.addAll(list1);
		form.jsonResult(onlineList);
		return Page.JSONPage;
	}

	public Page doLoadUser(WebForm form) {
		QueryObject query = new QueryObject();
		query.setPageSize(-1);
		query.addQuery("obj.title", "expert", "=");
		IPageList pageList = this.service.getEmployeeBy(query);
		List onlineList = new java.util.ArrayList();
		List list1 = new java.util.ArrayList();
		if (pageList.getRowCount() > 0) {
			for (int i = 0; i < pageList.getResult().size(); i++) {
				Map map = new java.util.HashMap();
				User user = (User) pageList.getResult().get(i);
				map.put("text", user.getName());
				map.put("leaf", true);
				map.put("id", user.getId().toString());
				map.put("login", true);
				if (OnlineUserManage.getInstance()
						.getOnlineUser(user.getName()) != null) {
					map.put("icon", "images/qq/user.gif");
					onlineList.add(map);
				} else {
					map.put("icon", "images/qq/user1.gif");
					list1.add(map);
				}
			}
		}
		onlineList.addAll(list1);
		form.jsonResult(onlineList);
		return Page.JSONPage;
	}
	
	public Page doLoadOnlineUser(WebForm form) {
		List onlineList = new java.util.ArrayList();
		List list = OnlineUserManage.getInstance().getUsers();
		User u=UserContext.getUser();
		if(u!=null){
		for(int i=0;i<list.size();i++){
			OnlineUser ou=(OnlineUser)list.get(i);
			if(ou.getUser()!=null && ou.getUser() instanceof Employee){
					Map<String,Object> map = new java.util.HashMap<String,Object>();
					User user = ou.getUser();
					map.put("text", user.getName());
					map.put("leaf", true);
					map.put("id", user.getId().toString());
					map.put("login", true);
						map.put("icon", "images/user.gif");
					onlineList.add(map);
			}
		}
		}
		form.jsonResult(onlineList);
		return Page.JSONPage;
	}


	public Page doLoadHistory(WebForm form) {
		User user = UserContext.getUser();
		if (user != null) {
			Long id = new Long(CommUtil.null2String(form.get("id")));
			QueryObject query = new QueryObject();
			query.setPageSize(20);
			query
					.addQuery(
							"((obj.reciver.id=? and obj.sender.id=?) or (obj.sender.id=? and obj.reciver.id=?))",
							new Object[] { user.getId(), id, user.getId(), id });
			query.setOrderBy("inputTime");
			query.setOrderType("desc");
			IPageList pageList = this.onlineMessageService
					.getOnlineMessageBy(query);
			AjaxUtil.convertEntityToJson(pageList);
			form.jsonResult(pageList.getResult());
		}
		return Page.JSONPage;
	}

	public Page doDeptUser(WebForm form) {
		QueryObject query = new QueryObject();
		query.setPageSize(-1);
		String id = CommUtil.null2String(form.get("id"));
		List users = null;
		if (!"".equals(id)) {
			if (id.indexOf('_') > 0)
				id = id.substring(0, id.indexOf('_'));
			Department parent = this.deptService.getDepartment(new Long(id));
			query.addQuery("obj.parent", parent, "=");
			EmployeeQuery qo = new EmployeeQuery();
			qo.setDept(parent);
			qo.setPageSize(-1);
			users = this.service.getEmployeeBy(qo).getResult();
		} else {
			query.addQuery("obj.parent is EMPTY", null);
		}
		IPageList pageList = this.deptService.getDepartmentBy(query);
		String checked = CommUtil.null2String(form.get("checked"));

		List<Map> nodes = new java.util.ArrayList<Map>();
		if (pageList.getRowCount() > 0) {
			for (int i = 0; i < pageList.getResult().size(); i++) {
				Department category = (Department) pageList.getResult().get(i);
				Map<String,Object> map = new HashMap<String,Object>();
				map.put("id", category.getId() + "_dept");
				map.put("text", category.getName());
				if (!"".equals(checked))
					map.put("checked", false);
				nodes.add(map);
			}
		}
		if (users != null) {
			List<Map<String,Object>> onlineList = new java.util.ArrayList<Map<String,Object>>();
			List<Map<String,Object>> list1 = new java.util.ArrayList<Map<String,Object>>();
			for (int i = 0; i < users.size(); i++) {
				Map<String,Object> map = new HashMap<String,Object>();
				Employee em = (Employee) users.get(i);
				map.put("id", em.getId() + "");
				map.put("text", StringUtils.hasLength(em.getTrueName())?em.getTrueName():em.getName());
				map.put("leaf", true);
				if (!"".equals(checked))
					map.put("checked", false);
				if (OnlineUserManage.getInstance().getOnlineUser(em.getName()) != null) {
					map.put("icon", "images/qq/user.gif");
					map.put("login", true);
					onlineList.add(map);
				} else {
					map.put("icon", "images/qq/user1.gif");
					map.put("login", true);
					list1.add(map);
				}
			}
			if (!onlineList.isEmpty())
				nodes.addAll(onlineList);
			if (!list1.isEmpty())
				nodes.addAll(list1);
		}
		if (nodes.size() < 1) {
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("text", "无信息");
			map.put("id", 0);
			map.put("leaf", true);
			nodes.add(map);
		}
		form.jsonResult(nodes);
		return Page.JSONPage;
	}

	public Page doList(WebForm form) {
		List list = OnlineUserManage.getInstance().getUsers();
		QueryObject query = form.toPo(QueryObject.class);
		IPageList pageList = new PageList(new com.easyjf.web.tools.ListQuery(
				list));
		pageList.doList(query.getPageSize(), query.getCurrentPage(), "", "");
		String treeData = CommUtil.null2String(form.get("treeData"));
		if (!"".equals(treeData)) {
			Map login = new java.util.HashMap();
			Map anonymous = new java.util.HashMap();
			login.put("text", "登录用户");
			anonymous.put("text", "匿名用户");
			List loginList = new java.util.ArrayList();
			List anonymousList = new java.util.ArrayList();
			for (int i = 0; i < pageList.getResult().size(); i++) {
				Map map = new java.util.HashMap();
				OnlineUser ou = (OnlineUser) pageList.getResult().get(i);
				map.put("text", ou.getName());
				map.put("leaf", true);
				map.put("id", ou.getId());
				map.put("icon", "images/user.gif");
				if (ou.getGuest()) {
					anonymousList.add(map);
					map.put("login", false);
				} else {
					map.put("login", true);
					loginList.add(map);
				}
			}
			Map map = new java.util.HashMap();
			map.put("text", "无");
			map.put("leaf", true);
			map.put("login", false);
			if (loginList.isEmpty())
				loginList.add(map);
			if (anonymousList.isEmpty())
				anonymousList.add(map);
			login.put("children", loginList);
			anonymous.put("children", anonymousList);
			List result = new ArrayList();
			result.add(login);
			result.add(anonymous);
			//form.jsonResult(pageList.getResult());
			form.jsonResult(result);
		} else {
			AjaxUtil.convertEntityToJson(pageList);
			form.jsonResult(pageList);
		}
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		String id = CommUtil.null2String(form.get("id"));
		List list = OnlineUserManage.getInstance().getUsers();
		/*
		 * if (!UserContext.isSuperAdmin()) this.addError("msg", "无权限"); else
		 */
		OnlineUserManage.getInstance().removeUser(id);
		return pageForExtForm(form);
	}

	public Page doSearchUser(WebForm form) {
		QueryObject qo = form.toPo(QueryObject.class);
		if (qo.getOrderBy() == null || "".equals(qo.getOrderBy())) {
			qo.setOrderBy("registerTime");
			qo.setOrderType("desc");
		}
		IPageList pageList = service.getEmployeeBy(qo);
		AjaxUtil.convertEntityToJson(pageList);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	/**
	 * 上传文件
	 * 
	 * @param form
	 * @return
	 */
	public Page doUpload(WebForm form) {		
		String path = parseFile(form);
		if (!this.hasErrors()) {
			form.jsonResult(path);
		}
		Page page = this.pageForExtForm(form);
		page.setContentType("html");
		return page;
	}

	/**
	 * 解析文件
	 * 
	 * @param form
	 * @return
	 */
	private String parseFile(WebForm form) {
		FileItem item = (FileItem) form.getFileElement().get("pathFile");
		String ret = "";
		String to=CommUtil.null2String(form.get("to"));
		if (item != null) {
			String fileName = item.getName();
			if ("".equals(fileName)) {
				this.addError("pathFile", "请选择要上传的文件!");
			} else {
				if (FileUtil.isImgageFile(fileName)
						|| FileUtil.isAttacheFile(fileName)) {
					String ext = fileName.substring(fileName.lastIndexOf('.'));
					String myDir = UserContext.getUser() != null ? UserContext
							.getUser().getId()
							+ "_"+to : "public";
					String name= CommUtil.getRandomString(16) + ext;
					String path = "WEB-INF/upload/" + myDir + "/"
							+name;
					File f = new File(Globals.APP_BASE_DIR + path);
					if (!f.getParentFile().exists())
						f.getParentFile().mkdirs();
					try {
						item.write(f);
					} catch (Exception e) {
						this.addError("pathFile", "文件上传错误" + e.getMessage());
					}
					ret = name;
				} else {
					this.addError("pathFile", fileName + "为非法的文件格式!");
				}
			}
		}
		return ret;
	}

	/**
	 * 加载图片
	 * 
	 * @param form
	 * @return
	 */
	public Page doLoadPic(WebForm form) {
		File file=getFile(form);
		if(file!=null){
		HttpServletResponse response = ActionContext.getContext().getResponse();
		//response.setContentType("image/jpeg");
		response.setHeader("Pragma", "No-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);
		try {
			byte[] buff = new byte[1000];
			java.io.OutputStream out = response.getOutputStream();
			InputStream in = new java.io.FileInputStream(file);
			int c;
			while ((c = in.read(buff, 0, 1000)) > 0) {
				out.write(buff, 0, c);
				out.flush();
			}
			// out.flush();
			out.close();
			in.close();
			
		} catch (Exception e) {
			System.out.println("错误:" + e);
		}
		}
		return Page.nullPage;
	}

	private File getFile(WebForm form){
		String fileName=CommUtil.null2String(form.get("f"));
		if("".equals(fileName))return null;
		String to=CommUtil.null2String(form.get("to"));
		String from=CommUtil.null2String(form.get("s"));
		String myDir ="public";
		User user=UserContext.getUser();
		if( user!= null &&(to.equals(user.getId()+"")||from.equals(user.getId()+""))){
			myDir=to+"_"+form;
		}
		else return null;
		String path = "WEB-INF/upload/" + myDir + "/";
		String fullName=Globals.APP_BASE_DIR+"/"+path+fileName;
		java.io.File f=new File(fullName);
		if(!f.exists()){
			myDir=from+"_"+to;
			f=new File(Globals.APP_BASE_DIR+"/WEB-INF/upload/" + myDir + "/"+fileName);			
		}
		if(f.exists())return f;
		else return null;
	}
	/**
	 * 下载附件
	 * 
	 * @param form
	 * @return
	 */
	public Page doDownload(WebForm form) {
		File file=getFile(form);
		if(file!=null){
			ActionUtil.download(file);
		}
		return Page.nullPage;
	}

	public Page doSendSystemMessage(WebForm form){
		String allEmployee=CommUtil.null2String(form.get("allEmployee"));
		String allUser=CommUtil.null2String(form.get("allUser"));
		String onlineUser=CommUtil.null2String(form.get("onlineUser"));
		String content=CommUtil.null2String(form.get("content"));
		String[] users=CommUtil.null2String(form.get("users")).split(",");
		Employee user=(Employee)UserContext.getUser();
		if("true".equals(allEmployee)){
			QueryObject qo=new QueryObject();
			qo.setPageSize(-1);
			List list=this.service.getEmployeeBy(qo).getResult();
			if(list!=null){
				for(int i=0;i<list.size();i++){
					OnlineMessage m=new OnlineMessage();
					m.setSender(user);
					m.setAnnounce(true);
					m.setContent(content);
					m.setReciver((Employee)list.get(i));
					m.setIp(ActionContext.getContext().getRequest().getRemoteAddr());
					this.onlineMessageService.addOnlineMessage(m);
				}
			}
			
		}
		else if("true".equals(allUser)){
			QueryObject qo=new QueryObject();
			qo.setPageSize(-1);
			List list=this.service.getEmployeeBy(qo).getResult();
			if(list!=null){
				for(int i=0;i<list.size();i++){
					OnlineMessage m=new OnlineMessage();
					m.setSender(user);
					m.setAnnounce(true);
					m.setContent(content);
					m.setReciver((Employee)list.get(i));
					m.setIp(ActionContext.getContext().getRequest().getRemoteAddr());
					this.onlineMessageService.addOnlineMessage(m);
				}
			}
		}
		else if("true".equals(onlineUser)){
			List list = OnlineUserManage.getInstance().getUsers();
			for(int i=0;i<list.size();i++){
				OnlineUser ou=(OnlineUser)list.get(i);
				OnlineMessage m=new OnlineMessage();
				m.setSender(user);
				m.setAnnounce(true);
				m.setContent(content);
				m.setIp(ActionContext.getContext().getRequest().getRemoteAddr());
				User u=ou.getUser();
				if(u!=null){
					m.setReciver(u);
				}
				else {
					
				}
				this.onlineMessageService.addOnlineMessage(m);
			}			
		}
		else{
			for(int i=0;i<users.length;i++){
				Employee ee=this.service.getEmployee(new Long(users[i]));
				OnlineMessage m=new OnlineMessage();
				m.setSender(user);
				m.setAnnounce(true);
				m.setContent(content);
				m.setReciver(ee);
				m.setIp(ActionContext.getContext().getRequest().getRemoteAddr());
				this.onlineMessageService.addOnlineMessage(m);
			}
		}		
		return pageForExtForm(form);
	}
	public void setService(IEmployeeService service) {
		this.service = service;
	}
}
