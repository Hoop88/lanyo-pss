package com.lanyotech.pps.service;

import com.easyjf.web.tools.IPageList;
import com.lanyotech.pps.query.ERPBaseChartQuery;
import com.lanyotech.pps.query.ERPJournalLedgerChartQuery;
import com.lanyotech.pps.query.ERPSummarySheetChartQuery;
import com.lanyotech.pps.query.MarketReportQuery;
import com.lanyotech.pps.query.PurchaseItemQuery;

public interface IChartCenterService {
	
	/**
	 * 采购报表
	 * @param query
	 * @return IPageList
	 */
	IPageList purchaseReport(PurchaseItemQuery query);
	/**
	 * 销售报表
	 * @param query
	 * @return
	 */
	IPageList marketReport(MarketReportQuery query);
	/**
	 * 进销存汇总报表
	 * @param query
	 * @return
	 */
	IPageList summarySheet(ERPSummarySheetChartQuery query);
	/**
	 * 进销存明细帐
	 * @param query
	 * @return
	 */
	IPageList accountDetail(ERPBaseChartQuery query);
	/**
	 * 进销存序时帐
	 * @param query
	 * @return IPageList
	 */
	IPageList journalLedger(ERPJournalLedgerChartQuery query);
}
