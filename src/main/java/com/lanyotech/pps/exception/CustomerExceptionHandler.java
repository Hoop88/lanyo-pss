package com.lanyotech.pps.exception;

import java.io.PrintWriter;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.easyjf.web.ActionContext;
import com.easyjf.web.ajax.AjaxUtil;
import com.easyjf.web.interceptor.ExceptionInterceptor;

public class CustomerExceptionHandler implements ExceptionInterceptor{

	public boolean handle(Throwable exception, Object arg1, Method arg2,
			Object[] arg3) throws Exception {
		if(exception instanceof CustomerException){
			HttpServletResponse response = ActionContext.getContext().getResponse();
			HttpServletRequest request = ActionContext.getContext().getRequest();
			String contentType = "application/x-json;charset=UTF-8";
			if(request.getContentType().indexOf("multipart/form-data")==0){
				contentType = "text/html";
			}
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			response.setContentType(contentType);
			PrintWriter out = response.getWriter();
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("err",exception.getMessage());
			map.put("success",false);
			out.print(AjaxUtil.getJSON(map, true));
			out.close();
		}
		return true;
	}
	public void blank(){}
}

