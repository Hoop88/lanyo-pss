package com.lanyotech.pps.mvc;

import com.easyjf.container.annonation.Action;
import com.easyjf.container.annonation.Inject;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.core.AbstractPageCmdAction;
import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.query.ERPBaseChartQuery;
import com.lanyotech.pps.query.ERPJournalLedgerChartQuery;
import com.lanyotech.pps.query.ERPSummarySheetChartQuery;
import com.lanyotech.pps.query.MarketReportQuery;
import com.lanyotech.pps.query.PurchaseItemQuery;
import com.lanyotech.pps.service.IChartCenterService;

@Action
public class ChartCenterAction extends AbstractPageCmdAction {

	@Inject
	private IChartCenterService chartService;

	public void setChartService(IChartCenterService chartService) {
		this.chartService = chartService;
	}

	public Page doPurchaseReport(WebForm form) throws Exception {
		PurchaseItemQuery query = form.toPo(PurchaseItemQuery.class);
		IPageList pageList = this.chartService.purchaseReport(query);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doMarketReport(WebForm form) throws Exception {
		MarketReportQuery query = form.toPo(MarketReportQuery.class);
		IPageList pageList = this.chartService.marketReport(query);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doSummarySheet(WebForm form) {
		ERPSummarySheetChartQuery query = form
				.toPo(ERPSummarySheetChartQuery.class);
		IPageList pageList = this.chartService.summarySheet(query);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doAccountDetail(WebForm form) {
		ERPBaseChartQuery query = form.toPo(ERPBaseChartQuery.class);
		IPageList pageList = this.chartService.accountDetail(query);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doJournalLedger(WebForm form) {
		ERPJournalLedgerChartQuery query = form
				.toPo(ERPJournalLedgerChartQuery.class);
		IPageList pageList = this.chartService.journalLedger(query);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
}
