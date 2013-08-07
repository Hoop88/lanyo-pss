package com.lanyotech.pps.mvc;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
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
import com.lanyotech.pps.domain.PurchaseBill;
import com.lanyotech.pps.domain.PurchaseBillItem;
import com.lanyotech.pps.query.PurchaseBillQuery;
import com.lanyotech.pps.service.IEmployeeService;
import com.lanyotech.pps.service.IProductStockService;
import com.lanyotech.pps.service.IPurchaseBillItemService;
import com.lanyotech.pps.service.IPurchaseBillService;
import com.lanyotech.pps.service.ISupplierService;
import com.lanyotech.security.UserContext;
import com.lanyotech.security.domain.User;
import com.lanyotech.util.ActionUtil;

@Action
public class PurchaseBillAction extends AbstractPageCmdAction {

	@Inject
	private IPurchaseBillService service;
	@Inject
	private IEmployeeService eservice;
	@Inject
	private ISupplierService sservice;
	@Inject
	private IPurchaseBillItemService ipservice;
	@Inject
	private IProductStockService iProductStockService;

	public IProductStockService getiProductStockService() {
		return iProductStockService;
	}

	public void setiProductStockService(IProductStockService iProductStockService) {
		this.iProductStockService = iProductStockService;
	}

	public IPurchaseBillItemService getIpservice() {
		return ipservice;
	}

	public void setIpservice(IPurchaseBillItemService ipservice) {
		this.ipservice = ipservice;
	}

	public IEmployeeService getEservice() {
		return eservice;
	}

	public void setEservice(IEmployeeService eservice) {
		this.eservice = eservice;
	}

	public ISupplierService getSservice() {
		return sservice;
	}

	public void setSservice(ISupplierService sservice) {
		this.sservice = sservice;
	}

	public IPurchaseBillService getService() {
		return service;
	}

	/*
	 * set the current service return service
	 */
	public void setService(IPurchaseBillService service) {
		this.service = service;
	}

	/**
	 * 进行采购订单装状态的信息更改的相关操作
	 * 
	 * @param form
	 * @param m
	 * @return
	 */
	@SuppressWarnings("unused")
	public Page doIndex(WebForm form, Module m) {

		QueryObject qo = form.toPo(QueryObject.class);
		String id = CommUtil.null2String(form.get("id"));
		String cmd = CommUtil.null2String(form.get("cmd"));
		if (!cmd.equals("")) {
			if (!id.equals("")) {
				PurchaseBill bill = service.getPurchaseBill(new Long(Long.parseLong(id)));
				if (cmd.equals("auditing")) {
					bill.setStatus(1);
				}
				if (cmd.equals("blankOut")) {
					bill.setStatus(-1);
				}
				if (cmd.equals("cancelBlankOut")) {
					bill.setStatus(0);
				}
				service.updatePurchaseBill(bill.getId(), bill);
			}
		}
		return pageForExtForm(form);
	}

	/**
	 * 作废
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
			PurchaseBill bill = service.getPurchaseBill(new Long(Long.parseLong(id)));
			bill.setStatus(-1);
			service.updatePurchaseBill(bill.getId(), bill);
		}

		return pageForExtForm(form);
	}

	public Page doBatchDel(WebForm form) {
		String[] ids = (String[]) form.get("ids");
		for (int i = 0; i < ids.length - 1; i++) {
			String id = ids[i].toString().trim();
			if (!id.equals("")) {
				PurchaseBill object = service.getPurchaseBill(Long.parseLong(id));
				// service.incomeStock(object);
				object.setStatus(1);
				object.setAuditTime(new Date());
				object.setAuditing(true);
				User user = UserContext.getUser();
				if (user != null) {
					object.setAuditor((Employee) user);
				}
				service.updatePurchaseBill(Long.parseLong(id), object);
			}

		}
		return pageForExtForm(form);

	}

	/**
	 * 恢复采购订单status
	 * 
	 * @param form
	 * @param m
	 * @return
	 */
	@SuppressWarnings("unused")
	public Page doCancelBlankOut(WebForm form, Module m) {

		QueryObject qo = form.toPo(QueryObject.class);
		String id = CommUtil.null2String(form.get("id"));
		if (!id.equals("")) {
			PurchaseBill bill = service.getPurchaseBill(new Long(Long.parseLong(id)));
			bill.setStatus(0);
			service.updatePurchaseBill(bill.getId(), bill);
		}

		return pageForExtForm(form);
	}

	/**
	 * 取消审核
	 * 
	 * @param form
	 * @param m
	 * @return
	 */
	@SuppressWarnings("unused")
	public Page doCancelAuditing(WebForm form, Module m) {

		QueryObject qo = form.toPo(QueryObject.class);
		String id = CommUtil.null2String(form.get("id"));
		if (!id.equals("")) {
			PurchaseBill bill = service.getPurchaseBill(new Long(Long.parseLong(id)));
			bill.setStatus(0);
			service.updatePurchaseBill(bill.getId(), bill);
		}

		return pageForExtForm(form);
	}

	/**
	 * 审核
	 * 
	 * @param form
	 * @param m
	 * @return
	 */
	@SuppressWarnings("unused")
	public Page doAuditing(WebForm form, Module m) {

		QueryObject qo = form.toPo(QueryObject.class);
		String id = CommUtil.null2String(form.get("id"));
		if (!id.equals("")) {
			PurchaseBill bill = service.getPurchaseBill(Long.parseLong(id));
			// service.incomeStock(bill);
			bill.setStatus(1);
			bill.setAuditTime(new Date());
			User user = UserContext.getUser();
			if (user != null) {
				bill.setAuditor((Employee) user);
			}
			service.updatePurchaseBill(bill.getId(), bill);
		}

		return pageForExtForm(form);
	}

	public Page doList(WebForm form) {
		PurchaseBillQuery qo = form.toPo(PurchaseBillQuery.class);
		IPageList pageList = service.getPurchaseBillBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = (Long) BeanUtils.convertType(form.get("id"), Long.class);
		service.delPurchaseBill(id);
		return pageForExtForm(form);
	}

	@SuppressWarnings("rawtypes")
	public Page doSave(WebForm form) {
		PurchaseBill object = form.toPo(PurchaseBill.class);
		object.setStatus(0);
		List list = ActionUtil.parseMulitItems(form, PurchaseBillItem.class, new String[] { "id", "price", "product", "num", "remark", "amount",
				"color", "spec" }, "items_");
		PurchaseBill object1 = addItems(list, object);
		User user = UserContext.getUser();
		if (user != null) {
			object1.setInputTime(new Date());
			object1.setInputUser((Employee) user);
		}
		if (!hasErrors())
			service.addPurchaseBill(object1);
		return pageForExtForm(form);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public PurchaseBill addItems(List list, PurchaseBill object) {

		double total = 0;
		for (int i = 0; i < list.size(); i++) {
			PurchaseBillItem item = (PurchaseBillItem) list.get(i);
			item.getProduct().setIsUsed(true);
			if (item.getAmount() != null) {
				total += item.getAmount().doubleValue();
			}
			if (item.getProduct() != null) {
				object.addItem(item);
			}
		}
		object.setAmount(new BigDecimal(total));
		object.setItems(list);
		return object;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page doUpdate(WebForm form) {
		Long id = (Long) BeanUtils.convertType(form.get("id"), Long.class);
		PurchaseBill object = service.getPurchaseBill(id);

		List list = ActionUtil.parseMulitItems(form, PurchaseBillItem.class, new String[] { "id", "price", "product", "num", "remark", "color",
				"spec", "amount" }, "items_");

		form.toPo(object, true);
		if (!hasErrors()) {
			List<PurchaseBillItem> le = object.getItems();
			for (int i = 0; i < le.size(); i++) {
				PurchaseBillItem purchaseBillItem = le.get(i);
				object.removeItem(purchaseBillItem.getId());

			}

			double total = 0;
			for (int i = 0; i < list.size(); i++) {
				PurchaseBillItem item = (PurchaseBillItem) list.get(i);
				item.getProduct().setIsUsed(true);
				total += item.getAmount().doubleValue();
				object.addItem(item);
			}
			object.setAmount(new BigDecimal(total));
			object.setItems(list);
			service.updatePurchaseBill(object.getId(), object);
		}
		return pageForExtForm(form);
	}

	public Page doPrint(WebForm form) {
		Long id = (Long) BeanUtils.convertType(form.get("id"), Long.class);
		PurchaseBill object = service.getPurchaseBill(id);
		form.addResult("title", "采购单");
		form.addResult("bill", object);
		return new Page(null, "extApp/print/purchaseBill.html");
	}

	public void doRemoveItem(PurchaseBill object) {
		List<PurchaseBillItem> eBillItems = object.getItems();
		for (int i = 0; i < eBillItems.size(); i++) {
			PurchaseBillItem item = eBillItems.get(i);
			object.removeItem(item.getId());
		}
		service.updatePurchaseBill(object.getId(), object);
	}

	public Page doGetBillSn(WebForm form) {
		String sn = DateFormatUtils.format(java.util.Calendar.getInstance().getTime(), "yyyyMMdd") + "-stockout-" + UUID.randomUUID();
		form.jsonResult(sn);
		return Page.JSONPage;
	}
}