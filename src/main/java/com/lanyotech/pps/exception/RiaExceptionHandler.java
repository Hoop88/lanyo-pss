package com.lanyotech.pps.exception;

import java.io.PrintWriter;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.PersistenceException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.easyjf.web.ActionContext;
import com.easyjf.web.ajax.AjaxUtil;
import com.easyjf.web.interceptor.ExceptionInterceptor;

public class RiaExceptionHandler implements ExceptionInterceptor {

	public boolean handle(Throwable exception, Object arg1, Method arg2, Object[] arg3) throws Exception {
		if (exception instanceof PersistenceException) {
			throw (PersistenceException) exception;
		}
		if (exception instanceof CustomerException) {
			HttpServletResponse response = ActionContext.getContext().getResponse();
			HttpServletRequest request = ActionContext.getContext().getRequest();
			String contentType = "application/x-json;charset=UTF-8";
			if (request.getContentType().indexOf("multipart/form-data") == 0) {
				contentType = "text/html";
			}
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			response.setContentType(contentType);
			PrintWriter out = response.getWriter();
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("err", exception.getMessage());
			out.print("function(){");
			out.print(AjaxUtil.getJSON(map));
			out.print("}()");
			out.close();
			throw (Exception) exception;
		}
		return false;
	}

	public void blank() {
	}
}
