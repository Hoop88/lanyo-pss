package com.lanyotech.pps.mvc;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang.time.DateFormatUtils;

import com.easyjf.beans.BeanUtils;
import com.easyjf.container.annonation.Action;
import com.easyjf.container.annonation.Inject;
import com.easyjf.core.support.ActionUtil;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.core.AbstractPageCmdAction;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.domain.Employee;
import com.lanyotech.pps.domain.StockIncomeItem;
import com.lanyotech.pps.domain.StockOutcome;
import com.lanyotech.pps.domain.StockOutcomeItem;
import com.lanyotech.pps.exception.CustomerException;
import com.lanyotech.pps.query.StockOutcomeQuery;
import com.lanyotech.pps.service.IProductStockService;
import com.lanyotech.pps.service.IStockDetailAccountService;
import com.lanyotech.pps.service.IStockOutcomeItemService;
import com.lanyotech.pps.service.IStockOutcomeService;
import com.lanyotech.security.UserContext;
import com.lanyotech.security.domain.User;

/**
 * StockOutcomeAction
 * 
 * @author EasyJWeb 1.0-m2 $Id: StockOutcomeAction.java,v 0.0.1 2010-12-3 17:26:39 EasyJWeb 1.0-m3 with ExtJS Exp $
 */
@Action
public class StockOutcomeAction extends AbstractPageCmdAction {

	@Inject
	private IStockOutcomeService service;

	@Inject
	private IProductStockService iProductStockService;

	@Inject
	private IStockDetailAccountService accountService;

	public void setAccountService(IStockDetailAccountService accountService) {
		this.accountService = accountService;
	}

	@Inject
	private IStockOutcomeItemService itemService;

	public void setiProductStockService(IProductStockService iProductStockService) {
		this.iProductStockService = iProductStockService;
	}

	public void setItemService(IStockOutcomeItemService itemService) {
		this.itemService = itemService;
	}

	public void setService(IStockOutcomeService service) {
		this.service = service;
	}

	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		QueryObject qo = form.toPo(StockOutcomeQuery.class);
		IPageList pageList = service.getStockOutcomeBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = (Long) BeanUtils.convertType(form.get("id"), Long.class);
		service.delStockOutcome(id);
		return pageForExtForm(form);
	}

	@SuppressWarnings("unchecked")
	public Page doSave(WebForm form) {
		StockOutcome object = form.toPo(StockOutcome.class);
		List<StockOutcomeItem> items = ActionUtil.parseMulitItems(form, StockOutcomeItem.class, "item_");
		for (StockOutcomeItem stockOutcomeItem : items) {
			object.addItem(stockOutcomeItem);
		}
		if (!hasErrors()) {
			object.setInputTime(new Date());
			User user = UserContext.getUser();
			if (user != null) {
				object.setInputUser((Employee) user);
			}
			object.countAmount();
			service.addStockOutcome(object);
		}
		return pageForExtForm(form);
	}

	@SuppressWarnings("unchecked")
	public Page doUpdate(WebForm form) {
		Long id = (Long) BeanUtils.convertType(form.get("id"), Long.class);
		StockOutcome object = service.getStockOutcome(id);
		form.toPo(object, true);
		if (!hasErrors()) {
			List<StockOutcomeItem> items = ActionUtil.parseMulitItems(form, StockOutcomeItem.class, "item_");
			object.updateItems(items);
			object.countAmount();
			service.updateStockOutcome(id, object);
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
		try {
			service.auditing(id);
			StockOutcome stockOutcome = service.getStockOutcome(id);
			this.iProductStockService.outProductStock(stockOutcome);
			this.accountService.createStockDetailAccount(stockOutcome);
		} catch (Exception e) {
			// this.addError("msg",e.getMessage());
			throw new CustomerException(e.getMessage());
		}
		return pageForExtForm(form);
	}

	public Page doPrint(WebForm form) {
		Long id = MapUtils.getLong(form.getTextElement(), "id", null);
		StockOutcome stockOutcome = service.getStockOutcome(id);
		String title = "";
		switch (stockOutcome.getTypes()) {
		case IStockOutcomeService.TYPES_SALE:
			title = "销售出库单";
			break;
		case IStockOutcomeService.TYPES_PRODUCTION:
			title = "生产领料单";
			break;
		default:
			title = "其他领料单";
			break;
		}
		form.addResult("title", title);
		form.addResult("stockOutcome", stockOutcome);
		return new Page(null, "extApp/print/stockOutcome.html");
	}

	public Page doGetBillSn(WebForm form) {
		String sn = DateFormatUtils.format(java.util.Calendar.getInstance().getTime(), "yyyyMMdd") + "-stockout-" + UUID.randomUUID();
		form.jsonResult(sn);
		return Page.JSONPage;
	}
}