package com.lanyotech.pps.mvc.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SessionFilter implements Filter {

	private final List<String> excludeUrls = new ArrayList<String>();

	private String loginPath = "login.html";

	public void destroy() {

	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain fc) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;

		Object user = req.getSession().getAttribute("EASYJF_SECURITY_USER");

		String path = req.getServletPath().substring(1);
		if (user == null && !excludeUrls.contains(path)) {
			res.setHeader("LoginRequired", "true");

			if ("XMLHttpRequest".equals(req.getHeader("x-requested-with"))) {
				res.getOutputStream().print("(function(){return {}})()");
			} else {
				res.sendRedirect(loginPath);
			}
			return;
		}
		fc.doFilter(req, res);

	}

	public void init(FilterConfig config) throws ServletException {
		String excludeUrls = config.getInitParameter("excludeUrls");
		String loginPath = config.getInitParameter("loginPath");

		if (excludeUrls != null && !excludeUrls.trim().isEmpty()) {
			this.excludeUrls.addAll(Arrays.asList(excludeUrls.split(",")));
		}

		if (loginPath != null && !loginPath.trim().isEmpty()) {
			this.loginPath = loginPath;
		}
	}
}
