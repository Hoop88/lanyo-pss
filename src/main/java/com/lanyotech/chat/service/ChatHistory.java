package com.lanyotech.chat.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.easyjf.web.Globals;
import com.lanyotech.chat.domain.ChatRoom;

/**
 * 会议历史记录
 * 
 * @author 大峡
 * 
 */
public class ChatHistory {
	private ChatRoom room;

	public ChatHistory() {

	}

	public ChatHistory(ChatRoom room) {
		this.room = room;
	}

	public List listHistory() {
		String fileDir = Globals.APP_BASE_DIR + "/WEB-INF/chat-history";
		File f = new File(fileDir+"/"+room.getTitle());		
		File[] files = f.listFiles();
		List ret = new ArrayList();
		if (files != null) {
			for (int i = files.length-1; i >=0; i--) {
				Map map = new HashMap();
				map.put("text", files[i].getName());
				map.put("vdate", new Date(files[i].lastModified()));
				map.put("size", new Long(files[i].length()));
				//map.put("expanded", true);
				map.put("dir", true);
				ret.add(map);
				List children=new java.util.ArrayList();
				File[] cfs=files[i].listFiles();
				for(int j=0;j<cfs.length;j++){
					Map m = new HashMap();
					m.put("text", cfs[j].getName());
					m.put("vdate", new Date(cfs[j].lastModified()));
					m.put("size", new Long(cfs[j].length()));
					m.put("leaf", true);
					children.add(m);
				}
			 map.put("children", children);
			}
		}
		return ret;
	}

	public String read(String fileName) {
		StringBuffer ret = new StringBuffer();
		String fileDir = Globals.APP_BASE_DIR + "/WEB-INF/chat-history/";		
		File f = new File(fileDir+room.getTitle()+"/"+fileName.replaceAll("\\.\\.",""));
		//File[] files = f.listFiles(new ChatHistoryFile(fileName));
		if (f.exists()) {
			try {
				BufferedReader br = new BufferedReader(new InputStreamReader(
						new FileInputStream(f), "utf-8"));
				String line;
				while ((line = br.readLine()) != null) {
					ret.append(line + "\r\n");
				}
				br.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return ret.toString();
	}

	private class ChatHistoryFile implements FileFilter {
		private String roomName;

		public ChatHistoryFile(String name) {
			this.roomName = name;
		}

		public boolean accept(File pathname) {
			return pathname.getName().indexOf(roomName) == 0;
		}
	}
}
