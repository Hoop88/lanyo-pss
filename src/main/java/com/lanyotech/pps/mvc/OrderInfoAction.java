package com.lanyotech.pps.mvc;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.lang.time.DateFormatUtils;

import com.easyjf.beans.BeanUtils;
import com.easyjf.container.annonation.Action;
import com.easyjf.container.annonation.Inject;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.util.CommUtil;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.core.AbstractPageCmdAction;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.domain.Employee;
import com.lanyotech.pps.domain.OrderInfo;
import com.lanyotech.pps.domain.OrderInfoItem;
import com.lanyotech.pps.query.OrderInfQuery;
import com.lanyotech.pps.service.IOrderInfoService;
import com.lanyotech.pps.util.AudingException;
import com.lanyotech.security.UserContext;
import com.lanyotech.security.domain.User;
import com.lanyotech.util.ActionUtil;

/**
 * OrderInfoAction
 * 
 * @author EasyJWeb 1.0-m2 $Id: OrderInfoAction.java,v 0.0.1 2010-11-30 9:48:24 EasyJWeb 1.0-m3 with ExtJS Exp $
 */
@Action
public class OrderInfoAction extends AbstractPageCmdAction {

	@Inject
	private IOrderInfoService service;

	/*
	 * set the current service return service
	 */
	public void setService(IOrderInfoService service) {
		this.service = service;
	}

	public IOrderInfoService getService() {
		return service;
	}

	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		OrderInfQuery qo = form.toPo(OrderInfQuery.class);
		IPageList pageList = service.getOrderInfoBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		service.delOrderInfo(id);
		return pageForExtForm(form);
	}

	/**
	 * 审核
	 * 
	 * @param form
	 * @param m
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unused", "unchecked" })
	public Page doAuditing(WebForm form, Module m) {

		QueryObject qo = form.toPo(QueryObject.class);
		String id = CommUtil.null2String(form.get("id"));
		Map map = new HashMap();
		if (!id.equals("")) {
			try {
				OrderInfo bill = service.getOrderInfo(Long.parseLong(id));
				service.saveOutcomeStatement(bill);
				map.put("success", true);
				bill.setStatus(1);
				bill.setAuditTime(new Date());
				User user = UserContext.getUser();
				if (user != null) {
					bill.setAuditor((Employee) user);
				}
				service.updateOrderInfo(bill.getId(), bill);
			} catch (AudingException e) {
				// e.printStackTrace();
				map.put("success", false);
				Map msg = new HashMap();
				msg.put("msg", e.getMessage());
				map.put("errors", msg);
				// this.addError("error", e.getMessage());
			}

		}
		form.jsonResult(map);
		return Page.JSONPage;
	}

	/**
	 * 作废处理
	 * 
	 * @param form
	 * @param m
	 * @return
	 */
	@SuppressWarnings("unused")
	public Page doBlankOut(WebForm form, Module m) {

		QueryObject qo = form.toPo(QueryObject.class);
		String id = CommUtil.null2String(form.get("id"));
		if (!id.equals("")) {
			OrderInfo bill = service.getOrderInfo(new Long(Long.parseLong(id)));
			bill.setStatus(-1);
			bill.setAuditTime(new Date());
			service.updateOrderInfo(bill.getId(), bill);
		}

		return pageForExtForm(form);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page doSave(WebForm form) {
		OrderInfo object = form.toPo(OrderInfo.class);
		object.setStatus(0);
		List list = ActionUtil.parseMulitItems(form, OrderInfoItem.class, new String[] { "id", "price", "product", "num", "remark", "amount", "spec",
				"color" }, "items_");
		double total = 0;
		for (int i = 0; i < list.size(); i++) {
			OrderInfoItem item = (OrderInfoItem) list.get(i);
			item.getProduct().setIsUsed(true);
			total += item.getAmount().doubleValue();
			object.addItem(item);
		}
		object.setAmount(new BigDecimal(total));
		User user = UserContext.getUser();
		if (user != null) {
			object.setInputTime(new Date());
			object.setInputUser((Employee) user);
		}
		object.setItems(list);

		if (!hasErrors())
			service.addOrderInfo(object);
		return pageForExtForm(form);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page doUpdate(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		List list = ActionUtil.parseMulitItems(form, OrderInfoItem.class, new String[] { "id", "price", "product", "num", "remark", "amount", "spec",
				"color" }, "items_");
		OrderInfo object = service.getOrderInfo(id);
		form.toPo(object, true);
		if (!hasErrors()) {
			List<OrderInfoItem> le = object.getItems();
			for (int i = 0; i < le.size(); i++) {
				OrderInfoItem orderInfoItem = le.get(i);
				object.removeItem(orderInfoItem.getId());
				orderInfoItem.getProduct().setIsUsed(true);
			}
			double total = 0;
			for (int i = 0; i < list.size(); i++) {
				OrderInfoItem item = (OrderInfoItem) list.get(i);
				total += item.getAmount().doubleValue();
				object.addItem(item);
			}
			object.setAmount(new BigDecimal(total));
			object.setItems(list);
			service.updateOrderInfo(id, object);
		}
		return pageForExtForm(form);
	}

	public Page doBatchDel(WebForm form) {
		String[] ids = (String[]) form.get("ids");
		for (int i = 0; i < ids.length - 1; i++) {
			String id = ids[i].toString().trim();
			if (!id.equals("")) {
				OrderInfo object = service.getOrderInfo(Long.parseLong(id));
				try {
					service.saveOutcomeStatement(object);
					object.setStatus(1);
					object.setAuditTime(new Date());
					object.setAuditing(true);
					User user = UserContext.getUser();
					if (user != null) {
						object.setAuditor((Employee) user);
					}
					service.updateOrderInfo(Long.parseLong(id), object);
				} catch (Exception e) {
					this.addError("error", e.getMessage());
				}

			}

		}
		return this.pageForExtForm(form);

	}

	public Page doPrint(WebForm form) {
		Long id = (Long) BeanUtils.convertType(form.get("id"), Long.class);
		OrderInfo object = service.getOrderInfo(id);
		form.addResult("title", "销售单");
		form.addResult("bill", object);
		return new Page(null, "extApp/print/saleBill.html");
	}

	@SuppressWarnings("rawtypes")
	public Page doChart(WebForm form) {
		OrderInfQuery qo = form.toPo(OrderInfQuery.class);
		qo.setPageSize(-1);
		String typeString = CommUtil.null2String("type");
		Map map1 = service.getChart(qo, typeString);
		form.jsonResult(map1);
		return Page.JSONPage;
	}

	public Page doGetBillSn(WebForm form) {
		String sn = DateFormatUtils.format(java.util.Calendar.getInstance().getTime(), "yyyyMMdd") + "-stockout-" + UUID.randomUUID();
		form.jsonResult(sn);
		return Page.JSONPage;
	}
}