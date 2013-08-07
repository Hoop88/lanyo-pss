package com.lanyotech.pps.mvc;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang.time.DateFormatUtils;

import com.easyjf.beans.BeanUtils;
import com.easyjf.container.annonation.Action;
import com.easyjf.container.annonation.Inject;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.core.AbstractPageCmdAction;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.domain.Employee;
import com.lanyotech.pps.domain.StockIncome;
import com.lanyotech.pps.domain.StockIncomeItem;
import com.lanyotech.pps.query.StockIncomeQuery;
import com.lanyotech.pps.service.IProductStockService;
import com.lanyotech.pps.service.IStockDetailAccountService;
import com.lanyotech.pps.service.IStockIncomeItemService;
import com.lanyotech.pps.service.IStockIncomeService;
import com.lanyotech.security.UserContext;
import com.lanyotech.security.domain.User;
import com.lanyotech.util.ActionUtil;

/**
 * StockIncomeAction
 * 
 * @author EasyJWeb 1.0-m2 $Id: StockIncomeAction.java,v 0.0.1 2010-11-30 20:29:02 EasyJWeb 1.0-m3 with ExtJS Exp $
 */
@Action
public class StockIncomeAction extends AbstractPageCmdAction {

	@Inject
	private IStockIncomeService service;

	@Inject
	private IStockIncomeItemService itemService;
	@Inject
	private IProductStockService iProductStockService;
	@Inject
	private IStockDetailAccountService accountService;

	public void setAccountService(IStockDetailAccountService accountService) {
		this.accountService = accountService;
	}

	public void setiProductStockService(IProductStockService iProductStockService) {
		this.iProductStockService = iProductStockService;
	}

	public void setItemService(IStockIncomeItemService itemService) {
		this.itemService = itemService;
	}

	/*
	 * set the current service return service
	 */
	public void setService(IStockIncomeService service) {
		this.service = service;
	}

	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		QueryObject qo = form.toPo(StockIncomeQuery.class);
		IPageList pageList = service.getStockIncomeBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = (Long) BeanUtils.convertType(form.get("id"), Long.class);
		service.delStockIncome(id);
		return pageForExtForm(form);
	}

	@SuppressWarnings("unchecked")
	public Page doSave(WebForm form) {
		StockIncome object = form.toPo(StockIncome.class);
		List<StockIncomeItem> items = ActionUtil.parseMulitItems(form, StockIncomeItem.class, "item_");
		if (!hasErrors()) {
			object.updateItems(items);
			object.countAmount();
			User user = UserContext.getUser();
			if (user != null) {
				object.setInputUser((Employee) user);
			}
			object.setInputTime(new Date());
			service.addStockIncome(object);
		}
		return pageForExtForm(form);
	}

	@SuppressWarnings("unchecked")
	public Page doUpdate(WebForm form) {
		Long id = (Long) BeanUtils.convertType(form.get("id"), Long.class);
		StockIncome object = service.getStockIncome(id);
		List<StockIncomeItem> items = ActionUtil.parseMulitItems(form, StockIncomeItem.class, "item_");
		form.toPo(object, true);
		if (!hasErrors()) {
			object.updateItems(items);
			object.countAmount();
			service.updateStockIncome(id, object);
		}
		return pageForExtForm(form);
	}

	public Page doLoadItemById(WebForm form) {
		Long id = MapUtils.getLong(form.getTextElement(), "id", null);
		if (id != null) {
			List<StockIncomeItem> items = itemService.loadItemById(id);
			form.jsonResult(items);
		}
		return Page.JSONPage;
	}

	public Page doAuditing(WebForm form) {
		Long id = MapUtils.getLong(form.getTextElement(), "id", null);
		if (id != null) {
			try {
				this.service.auditing(id);
				StockIncome stockIncome = this.service.getStockIncome(id);
				this.iProductStockService.inProductStock(stockIncome);
				this.accountService.createStockDetailAccount(stockIncome);
			} catch (Exception e) {
				this.addError("msg", "操作失败!");
			}
		} else {
			this.addError("msg", "无效的订单!");
		}
		return pageForExtForm(form);
	}

	public Page doGetBillSn(WebForm form) {
		String sn = DateFormatUtils.format(java.util.Calendar.getInstance().getTime(), "yyyyMMdd") + "-stockin-" + UUID.randomUUID();
		form.jsonResult(sn);
		return Page.JSONPage;
	}
}