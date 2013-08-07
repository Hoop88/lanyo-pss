package com.lanyotech.chat.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.easyjf.container.annonation.FormPO;
import com.easyjf.container.annonation.POLoad;
import com.easyjf.web.ajax.IJsonObject;
import com.lanyotech.security.domain.User;
@FormPO(inject="reciver,content")
@Entity
@Table(name="onlinemessage")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OnlineMessage implements IJsonObject {
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)	
	private Long id;
	@POLoad
	@ManyToOne
	private User reciver;
	private String reciveName;//接收人,主要是游客
	@ManyToOne
	private User sender;
	private Integer status=0;
	private Date inputTime=new Date();
	private Date readTime;
	private Boolean announce;///是否公告信息
	@Lob
	private String content;
	@Column(length=50)
	private String ip;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getReciver() {
		return reciver;
	}

	public void setReciver(User reciver) {
		this.reciver = reciver;
	}

	public User getSender() {
		return sender;
	}

	public void setSender(User sender) {
		this.sender = sender;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Date getInputTime() {
		return inputTime;
	}

	public void setInputTime(Date inputTime) {
		this.inputTime = inputTime;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public Date getReadTime() {
		return readTime;
	}

	public void setReadTime(Date readTime) {
		this.readTime = readTime;
	}

	public Boolean getAnnounce() {
		return announce;
	}

	public void setAnnounce(Boolean announce) {
		this.announce = announce;
	}

	public String getReciveName() {
		return reciveName;
	}

	public void setReciveName(String reciveName) {
		this.reciveName = reciveName;
	}

	public Object toJSonObject() {
		OnlineMessage obj=new OnlineMessage();
		obj.setId(this.getId());
		obj.setContent(this.content);
		obj.setInputTime(this.inputTime);
		obj.setStatus(this.status);
		obj.setReadTime(this.readTime);
		obj.setAnnounce(this.announce);
		if(this.sender!=null){
			User u=new User();
			u.setId(this.sender.getId());
			u.setName(this.sender.getName());
			u.setEmail(this.sender.getEmail());
			obj.setSender(u);
		}
		if(this.reciver!=null)
		{
			User u=new User();
			u.setId(this.reciver.getId());
			u.setName(this.reciver.getName());
			u.setEmail(this.reciver.getEmail());
			obj.setReciver(u);
		}
		return obj;
	}
	
}
