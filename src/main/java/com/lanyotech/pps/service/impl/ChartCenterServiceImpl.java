package com.lanyotech.pps.service.impl;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang.time.FastDateFormat;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.util.StringUtils;

import com.easyjf.web.tools.IPageList;
import com.easyjf.web.tools.ListQuery;
import com.easyjf.web.tools.PageList;
import com.lanyotech.pps.query.ERPBaseChartQuery;
import com.lanyotech.pps.query.ERPJournalLedgerChartQuery;
import com.lanyotech.pps.query.ERPSummarySheetChartQuery;
import com.lanyotech.pps.query.MarketReportQuery;
import com.lanyotech.pps.query.PurchaseItemQuery;
import com.lanyotech.pps.service.IChartCenterService;

public class ChartCenterServiceImpl extends JdbcDaoSupport implements IChartCenterService {

	private final FastDateFormat sqlDateFormat = FastDateFormat.getInstance("yyyy-MM-dd HH:mm:ss");

	public IPageList purchaseReport(PurchaseItemQuery query) {
		StringBuffer jpql = new StringBuffer();
		this.getJdbcTemplate().queryForMap(jpql.toString());
		return null;
	}

	// 结转sql
	private String getCarriedForwardQuerySql(String whereStr) {
		StringBuffer sb = new StringBuffer();
		sb.append(" select abc.*,(abc.beginningNum+abc.purchaseNum-abc.outStockNum) as balanceNum,(abc.beginningAmount+abc.purchaseAmount-abc.outStockAmount) as balanceAmount");
		sb.append(" from (select t.productId,t.depotId,t.vdate, ");
		sb.append(" sum(case t.types when '10' then sdaNum else 0 end) as 'beginningNum', ");
		sb.append(" sum(case t.types when '10' then sdaAmount else 0 end) as 'beginningAmount', ");
		sb.append(" sum(case t.types when '11' then sdaNum when '12' then sdaNum else 0 end) as 'purchaseNum', ");
		sb.append(" sum(case t.types when '11' then sdaAmount when '12' then sdaAmount else 0 end) as 'purchaseAmount', ");
		sb.append(" sum(case t.types when '00' then sdaNum when '01' then sdaNum when '02' then sdaNum else 0 end) as 'outStockNum', ");
		sb.append(" sum(case t.types when '00' then sdaAmount when '01' then sdaAmount when '02' then sdaAmount else 0 end) as 'outStockAmount' ");
		sb.append(" from (select * from (select sda.product_id as 'productId',sda.depot_id as depotId,sda.vdate as vdate,SUM(sda.num) as sdaNum,SUM(sda.amount) as sdaAmount,sda.types,sda.debitorcredit as 'debitorcredit',sda.depot_id from t_stockdetailaccount as sda JOIN t_product on t_product.id = sda.product_id WHERE 1=1 {0} GROUP BY sda.product_id,sda.types) as tablea) as t ");
		sb.append(" group by t.productId) as abc ");
		return MessageFormat.format(sb.toString(), whereStr);
	}

	@SuppressWarnings("rawtypes")
	public IPageList marketReport(MarketReportQuery query) {
		StringBuffer sbWhere = new StringBuffer();
		if (query.getStartDate() != null) {
			sbWhere.append(" and vdate >= '" + sqlDateFormat.format(query.getStartDate()) + "'");
		}
		if (query.getEndDate() != null) {
			Calendar c = Calendar.getInstance();
			c.setTime(query.getEndDate());
			c.add(Calendar.DATE, 1);
			sbWhere.append(" and vdate < '" + sqlDateFormat.format(c) + "'");
		}
		if (query.getDepot() != null) {
			sbWhere.append(" and depot_id = " + query.getDepot().getId());
		}
		if (StringUtils.hasLength(query.getProductSn())) {
			sbWhere.append(MessageFormat.format(" and t_product.sn like '%{0}%' or t_product.title like '%{0}%'", query.getProductSn()));
		}

		String sql = this.getCarriedForwardQuerySql(sbWhere.toString());
		StringBuffer jpql = new StringBuffer(
				"SELECT t.*,product.sn as productSn,product.Name as productName,dir.name as dirName,depot.name as depotName from ( ");
		jpql.append(sql);
		jpql.append(" ) as t JOIN t_product as product on t.productId = product.id");
		jpql.append(" LEFT JOIN t_productdir as dir on dir.id = product.dir_id");
		jpql.append(" JOIN t_depot as depot on t.depotId = depot.id");

		List list = this.getJdbcTemplate().queryForList(jpql.toString());
		IPageList pageList = new PageList(new ListQuery(list));
		pageList.doList(-1, -1, null, null);
		return pageList;
	}

	public IPageList summarySheet(ERPSummarySheetChartQuery query) {

		StringBuffer sbSql = new StringBuffer();
		sbSql.append(" select %s,t.*,(t.beginningNum+t.purchaseNum-t.outStockNum) as balanceNum,(t.beginningAmount+t.purchaseAmount-t.outStockAmount) as balanceAmount from ( ");
		sbSql.append(" select t.depot_id,t.vdate_year_month,t.product_id, ");
		sbSql.append(" sum(case t.types when '10' then sdaNum else 0 end) as 'beginningNum', ");
		sbSql.append(" sum(case t.types when '10' then sdaAmount else 0 end) as 'beginningAmount', ");
		sbSql.append(" sum(case t.types when '11' then sdaNum when '12' then sdaNum else 0 end) as 'purchaseNum', ");
		sbSql.append(" sum(case t.types when '11' then sdaAmount when '12' then sdaAmount else 0 end) as 'purchaseAmount', ");
		sbSql.append(" sum(case t.types when '00' then sdaNum when '01' then sdaNum when '02' then sdaNum else 0 end) as 'outStockNum', ");
		sbSql.append(" sum(case t.types when '00' then sdaAmount when '01' then sdaAmount when '02' then sdaAmount else 0 end) as 'outStockAmount' ");
		sbSql.append(" from (SELECT sda.*,EXTRACT(YEAR_MONTH FROM sda.vdate) as vdate_year_month,sum(sda.num) as sdaNum,sum(sda.amount) as sdaAmount FROM `t_stockdetailaccount` as sda JOIN t_product on t_product.id = sda.product_id");
		sbSql.append(" WHERE 1=1 %s GROUP BY sda.depot_id,sda.product_id,sda.types) as t GROUP BY %s) as t ");
		String groupBy = "depot_id";
		String fields = "";
		StringBuffer strWhere = new StringBuffer();
		if (query.getDepot() != null) {
			strWhere.append(" and sda.depot_id = " + query.getDepot().getId());
		}
		if (query.getProductSn() != null) {
			strWhere.append(" and t_product.sn like  '%" + query.getProductSn() + "%'");
		}
		if (!"month".equals(query.getType())) {
			if (query.getStartDate() != null) {
				strWhere.append(" and sda.vdate >= '" + sqlDateFormat.format(query.getStartDate()) + "'");
			}
			if (query.getEndDate() != null) {
				java.util.Calendar c = Calendar.getInstance();
				c.setTime(query.getEndDate());
				c.add(Calendar.DATE, 1);
				strWhere.append(" and sda.vdate < '" + sqlDateFormat.format(c) + "'");
			}
		}
		if ("depot".equals(query.getType())) {
			fields = "t_depot.name as productName";
			sbSql.append(" LEFT JOIN t_depot on t_depot.id = t.depot_id");
		} else if ("month".equals(query.getType())) {
			groupBy = "vdate_year_month";
			fields = "t.vdate_year_month as productName";
		}
		String sql = String.format(sbSql.toString(), fields, strWhere.toString(), groupBy);

		List<?> result = this.getJdbcTemplate().queryForList(sql);
		return new CustomerPageList(result);
	}

	public IPageList accountDetail(ERPBaseChartQuery query) {
		return null;
	}

	private String getBalanceJournalLedgerQuerySql() {
		StringBuffer sb = new StringBuffer();
		sb.append(" select (abc.beginningNum+abc.purchaseNum-abc.outStockNum) as balanceNum,(abc.beginningAmount+abc.purchaseAmount-abc.outStockAmount) as balanceAmount");
		sb.append(" from (select t.productId,t.depotId,t.vdate, ");
		sb.append(" sum(case t.types when '10' then sdaNum else 0 end) as 'beginningNum', ");
		sb.append(" sum(case t.types when '10' then sdaAmount else 0 end) as 'beginningAmount', ");
		sb.append(" sum(case t.types when '11' then sdaNum when '12' then sdaNum else 0 end) as 'purchaseNum', ");
		sb.append(" sum(case t.types when '11' then sdaAmount when '12' then sdaAmount else 0 end) as 'purchaseAmount', ");
		sb.append(" sum(case t.types when '00' then sdaNum when '01' then sdaNum when '02' then sdaNum else 0 end) as 'outStockNum', ");
		sb.append(" sum(case t.types when '00' then sdaAmount when '01' then sdaAmount when '02' then sdaAmount else 0 end) as 'outStockAmount' ");
		sb.append(" from (select * from (select sda.product_id as 'productId',sda.depot_id as depotId,sda.vdate as vdate,SUM(sda.num) as sdaNum,SUM(sda.amount) as sdaAmount,sda.types,sda.debitorcredit as 'debitorcredit',sda.depot_id from t_stockdetailaccount as sda WHERE 1=1 {0} GROUP BY sda.product_id,sda.types) as tablea) as t ");
		sb.append(" group by t.productId) as abc ");
		return sb.toString();
	}

	@SuppressWarnings("unchecked")
	public IPageList journalLedger(ERPJournalLedgerChartQuery query) {

		String baseSql = " SELECT * FROM t_stockdetailaccount as sda WHERE 1=1 ";

		List<Object> resultList = new ArrayList<Object>();
		StringBuffer sb = new StringBuffer();

		Double balanceNum = 0d, balanceAmount = 0d;

		Map<String, Object> balance = new HashMap<String, Object>();
		balance.put("debitorcredit", -2);
		resultList.add(balance);

		sb.append(baseSql);

		sb.append(" and sda.product_id = " + query.getProduct().getId());
		if (query.getDepot() != null) {
			sb.append(" and sda.depot_id = " + query.getDepot().getId());
		}

		if (query.getEndDate() != null) {
			Calendar c = Calendar.getInstance();
			c.setTime(query.getEndDate());
			c.add(Calendar.DATE, 1);
			sb.append(" and sda.vdate < '" + sqlDateFormat.format(c) + "'");
		}
		if (query.getStartDate() == null) {
			this.getJdbcTemplate().setMaxRows(1);
			try {
				String sql = sb.toString() + " and sda.types = '10' ";
				Map<?, ?> map = this.getJdbcTemplate().queryForMap(sql);
				if (map != null) {
					balanceNum = MapUtils.getDouble(map, "num", 0d);
					balanceAmount = MapUtils.getDouble(map, "amount", 0d);
					balance.put("balanceNum", balanceNum);
					balance.put("balanceAmount", balanceAmount);
					balance.put("id", map.get("id"));
				}
			} catch (Exception e) {

			}
		} else {
			String sql = this.getBalanceJournalLedgerQuerySql();

			StringBuffer sbWhere = new StringBuffer();
			sbWhere.append(" and sda.product_id = " + query.getProduct().getId());
			sbWhere.append(" and sda.depot_id = " + query.getDepot().getId());
			sbWhere.append(" and sda.vdate <'" + sqlDateFormat.format(query.getStartDate()) + "'");
			sql = MessageFormat.format(sql, sbWhere);
			try {
				Map<?, ?> map = this.getJdbcTemplate().queryForMap(sql);
				if (map != null) {
					balanceNum = MapUtils.getDouble(map, "balanceNum", 0d);
					balanceAmount = MapUtils.getDouble(map, "balanceAmount", 0d);
					balance.put("balanceNum", balanceNum);
					balance.put("balanceAmount", balanceAmount);
					balance.put("id", map.get("id"));
				}
			} catch (Exception e) {
			}
		}
		this.getJdbcTemplate().setMaxRows(0);
		if (query.getStartDate() != null) {
			sb.append(" and sda.vdate >= '" + sqlDateFormat.format(query.getStartDate()) + "'");
		}
		List<Map<String, Object>> list = this.getJdbcTemplate().queryForList(sb.toString());

		if (list != null && list.size() > 0) {
			for (Map<String, Object> map : list) {
				if (map.get("id").equals(balance.get("id")))
					continue;

				Map<String, Object> tempMap = new HashMap<String, Object>();
				tempMap.put("types", map.get("types"));
				tempMap.put("debitorcredit", map.get("debitorcredit"));
				int debitorcredit = MapUtils.getInteger(map, "debitorcredit");

				Double num = debitorcredit * MapUtils.getDouble(map, "num", 0d);
				Double amount = debitorcredit * MapUtils.getDouble(map, "amount", 0d);

				balanceNum += num;
				balanceAmount += amount;

				if (debitorcredit == 1) {
					tempMap.put("inNum", map.get("num"));
					tempMap.put("inAmount", map.get("amount"));
				} else {
					tempMap.put("outNum", map.get("num"));
					tempMap.put("outAmount", map.get("amount"));
				}

				tempMap.put("balanceNum", balanceNum);
				tempMap.put("balanceAmount", balanceAmount);

				resultList.add(tempMap);
			}
		} else {
			resultList.remove(0);
		}
		return new CustomerPageList(resultList);
	}

	static class CustomerPageList extends PageList {

		private static final long serialVersionUID = 1L;

		private final List<?> list;
		private final Integer rowCount;

		public CustomerPageList(List<?> result, Integer rowCount) {
			this.list = result;
			this.rowCount = result.size();
		}

		public CustomerPageList(List<?> result) {
			this(result, 0);
		}

		@Override
		public int getRowCount() {
			return this.rowCount;
		}

		@Override
		public List<?> getResult() {
			return this.list;
		}

	}
}
