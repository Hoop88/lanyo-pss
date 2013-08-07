/**
 *
 * 
 * 蓝源进销存迷你开源版 Lanyo PSS(Mini)
 * 
 * Copyright 2010-2110 成都蓝源信息技术有限公司 .
 * 
 * http://www.lanyotech.com
 * 
 */
package com.lanyotech.pps.mvc;

import java.io.File;
import java.util.List;

import org.apache.commons.fileupload.FileItem;

import com.easyjf.container.annonation.Action;
import com.easyjf.container.annonation.Inject;
import com.easyjf.container.annonation.InjectDisable;
import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.util.CommUtil;
import com.easyjf.web.Globals;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.core.AbstractPageCmdAction;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.domain.Product;
import com.lanyotech.pps.exception.CustomerException;
import com.lanyotech.pps.query.ProductQuery;
import com.lanyotech.pps.service.IProductService;

/**
 * 产品管理
 * 
 * @author ssvfhppl
 * 
 */
@Action
public class ProductAction extends AbstractPageCmdAction {

	@Inject
	private IProductService service;
	@InjectDisable
	private final String productImgDirectory = Globals.APP_BASE_DIR + "upload\\product\\";

	/*
	 * set the current service return service
	 */
	public void setService(IProductService service) {
		this.service = service;
	}

	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		ProductQuery qo = form.toPo(ProductQuery.class);

		IPageList pageList = service.getProductBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page doComplete(WebForm form) {
		ProductQuery qo = form.toPo(ProductQuery.class);
		IPageList pageList = service.getProductBy(qo);
		if (pageList != null) {
			List list = pageList.getResult();
			if (list != null) {
				for (int i = 0; i < list.size(); i++) {
					Product p = (Product) list.get(i);
					Product newProduct = (Product) p.clone();
					newProduct.setSnName(p.getSn() + "[" + p.getName() + "]");
					list.set(i, newProduct);
				}
			}
		}

		form.jsonResult(pageList, false);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		boolean success = false;
		success = service.delProduct(id);
		if (!success) {
			throw new CustomerException("该商品正在使用中，不能删除");
		}
		return pageForExtForm(form);
	}

	public Page doSave(WebForm form) {
		Product object = form.toPo(Product.class);
		pars(form, object, true);
		if (!hasErrors())
			service.addProduct(object);
		Page page = pageForExtForm(form);
		page.setContentType("html");
		return page;
	}

	public void pars(WebForm form, Product cc, Boolean type) {
		FileItem fitem = (FileItem) form.getFileElement().get("pic");
		String imgPath = null;
		if (fitem != null) {
			File file = null;
			if (!type) {
				String oldPath = this.productImgDirectory + cc.getPic();
				file = new File(oldPath);
				if (file.exists()) {
					file.delete();
				} else {
					imgPath = CommUtil.getRandomString(16) + "_Upload_Product_" + fitem.getName();
					String path = this.productImgDirectory + imgPath;
					file = new File(path);
					cc.setPic(imgPath);
				}

			} else {
				imgPath = CommUtil.getRandomString(16) + "_Upload_Product_" + fitem.getName();
				String path = this.productImgDirectory + imgPath;
				cc.setPic(imgPath);
				file = new File(path);
			}
			if (!file.getParentFile().exists()) {
				file.getParentFile().mkdirs();
			}
			try {
				fitem.write(file);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	public Page doUpdate(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		Product object = service.getProduct(id);
		pars(form, object, false);
		form.toPo(object, true);
		if (!hasErrors())
			service.updateProduct(id, object);

		Page page = pageForExtForm(form);
		;
		page.setContentType("html");
		return page;
	}

	public Page doAutocompleteList(WebForm form) {
		IQueryObject queryObject = form.toPo(ProductQuery.class);
		IPageList pageList = service.getProductBy(queryObject);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doLoadBySn(WebForm form) {
		ProductQuery qo = form.toPo(ProductQuery.class);
		IPageList pageList = service.getProductBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

}