package com.lanyotech.chat.domain;

import com.easyjf.container.annonation.Field;
import com.easyjf.container.annonation.FormPO;
import com.easyjf.container.annonation.Validator;
import com.lanyotech.chat.service.ChatService;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="chatroom")
@FormPO(disInject="id,status,inputTime,owner")
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;//主键
    @Field(name="聊天室主题",validator=@Validator(name="string",required=true))
    private String title;//聊天室主题
    @Field(name="聊天室简介")
    private String intro;//聊天室简介
    @Field(name="聊天室公告")
    private String announce;//聊天室公告
    @Field(name="聊天室创建人")
    private String owner;//聊天室创建人
    @Field(name="最大在线人数")
    private Integer maxUser;//最大在线人数
    @Field(name="最大刷新时间间隔",validator=@Validator(name="range",value="min:60;min_msg:{0}不能小于60;max:500;max_msg:{0}不能大到500"))
    private Integer intervals;//最大刷新时间间隔
    @Field(name="访问权限")
    private String vrtype;//访问权限
    @Field(name="访问值")
    private String vrvalue;//访问值
    private String teacher;//主讲
    private Date beginTime;//开始时间 
    private Date endTime;//结束时间
    private Boolean talkMode;//发言模式，是否需要申请
    private Integer status = 0;//聊天室状态
    private Date inputTime;    

    public String showStatus() {
        if (ChatService.get(this.id.toString()) == null) {
            return "未启动";
        } else {
            return "已启动";
        }
    }
    public String getStatusInfo(){
    	return showStatus();
    }
    public boolean isRunning() {
        if (ChatService.get(this.id.toString()) == null) {
            return true;
        } else {
            return false;
        }
    }

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getVrtype() {
        return vrtype;
    }

    public void setVrtype(String vrtype) {
        this.vrtype = vrtype;
    }

    public String getVrvalue() {
        return vrvalue;
    }

    public void setVrvalue(String vrvalue) {
        this.vrvalue = vrvalue;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getInputTime() {
        return inputTime;
    }

    public void setInputTime(Date inputTime) {
        this.inputTime = inputTime;
    }

    public Integer getIntervals() {
        return intervals;
    }

    public void setIntervals(Integer intervals) {
        this.intervals = intervals;
    }

    public Integer getMaxUser() {
        return maxUser;
    }

    public void setMaxUser(Integer maxUser) {
        this.maxUser = maxUser;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getAnnounce() {
        return announce;
    }

    public void setAnnounce(String announce) {
        this.announce = announce;
    }

	public Date getBeginTime() {
		return beginTime;
	}

	public void setBeginTime(Date beginTime) {
		this.beginTime = beginTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public String getTeacher() {
		return teacher;
	}
	public void setTeacher(String teacher) {
		this.teacher = teacher;
	}
	public Boolean getTalkMode() {
		return talkMode;
	}
	public void setTalkMode(Boolean talkMode) {
		this.talkMode = talkMode;
	}
    
}
