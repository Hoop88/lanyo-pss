package com.lanyotech.pps.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

public class AjaxTreeUtil {
	
	private static String NODEID="id";
	private static String NODETEXT="name";
	private static String NODECHILD="children";
	
	public static Map<Object,Object> obj2nodeMap(Object object){
		return obj2nodeMap(object, NODEID, NODETEXT,NODECHILD,true);
	}
	public static Map<Object,Object> obj2nodeMap(Object object,boolean includeChild){
		return obj2nodeMap(object, NODEID, NODETEXT,NODECHILD,includeChild);
	}
	public static Map<Object,Object> obj2nodeMap(Object object,String id,String text,boolean includeChild){
		return obj2nodeMap(object, id, text,NODECHILD,includeChild);
	}
	public static Map<Object,Object> obj2nodeMap(Object object,String id,String text,String child,boolean includeChild){
		BeanWrapper node = new BeanWrapperImpl(object);
		Object idValue = node.getPropertyValue(id);
		Object idText = node.getPropertyValue(text);
		List<Object> childList = new ArrayList<Object>();
		java.util.Collection<?> childNodes = (Collection<?>) node.getPropertyValue(child);
		Map<Object,Object> nodeMap = new HashMap<Object,Object>();
		nodeMap.put("id",idValue);
		nodeMap.put("text",idText);
		nodeMap.put("leaf",childNodes.size()<=0);
		
		if(includeChild && childNodes.size()>0){
			for (Object o : childNodes) {
				childList.add(obj2nodeMap(o));
			}
		}
		nodeMap.put("children",childList);
		return nodeMap;
	}
}
