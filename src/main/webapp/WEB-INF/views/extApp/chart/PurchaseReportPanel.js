/**
 * 采购报表
 * 
 * @author ssvfhppl
 * @class PurchasePanel
 * @extends EasyJF.Ext.CrudListPanel
 */
PurchaseReportPanel = Ext.extend(BasePurchaseAndSaleReportPanel, {
			id : "chartBalanceListPanel",
			showChart : true,
			charTitle : '采购',
			url : 'purchaseBillItem.ejf',
			storeMapping : ['id', 'sn', "productName", 'category', 'amount',
					'num', 'price', 'vdate', 'buyer', 'supplier', 'auditor',
					'month', 'brand', "types"],
			getMenu : function() {
				return {
					listeners : {
						scope : this,
						itemclick : this.groupSearch
					},
					items : [{
								text : '按供应商分组',
								name : 'obj.bill.supplier',
								iconCls : 'chartPic'
							}, {
								text : '按采购员分组',
								iconCls : 'chartPic',
								name : 'obj.bill.buyer'
							}, {
								text : '按商品分组',
								name : 'obj.product',
								iconCls : 'chartPic'
							}, {
								text : '按商品类别分组',
								name : 'obj.product.dir',
								iconCls : 'chartPic'
							}, {
								text : '按月份分组',
								name : 'month(obj.bill.vdate)',
								iconCls : 'chartPic'
							}, {
								text : '按天分组',
								name : 'day(obj.bill.vdate)',
								iconCls : 'chartPic'
							}]
				};
			},
			getColumnModel : function() {
				return [{
							header : "采购单编号",
							sortable : true,
							width : 95,
							dataIndex : "sn",
							field : 'sn',
							renderer : function(v) {
								if (v == '合计:')
									return "<font color='red'>" + v + "</font>";
								else
									return v;
							}
						}, {
							header : "类别",
							dataIndex : "types",
							width : 100,
							hidden : true,
							groupRenderer : function(v) {
								return v;
							}
						}, {
							header : "供应商",
							sortable : true,
							width : 95,
							dataIndex : "supplier"
						}, {
							header : "采购员",
							sortable : true,
							width : 95,
							dataIndex : "buyer"
						}, {

							header : "商品名称",
							sortable : true,
							width : 95,
							dataIndex : "productName"
						}, {
							header : "交易时间",
							sortable : true,
							width : 95,
							dataIndex : "vdate",
							renderer : EasyJF.Ext.Util
									.dateRender('Y-m-d G:i:s')
						}, {
							header : "数量 ",
							sortable : true,
							width : 95,
							dataIndex : "num",
							renderer : function(v, m, r) {
								if (r.get('sn') == '合计:')
									return "<font color='red'>" + v + "</font>";
								else
									return v;
							}
						}, {
							header : "采购单价 ",
							sortable : true,
							width : 95,
							dataIndex : "price"
						}, {
							header : "总金额 ",
							sortable : true,
							width : 95,
							dataIndex : "amount",
							renderer : function(v, m, r) {
								if (r.get('sn') == '合计:')
									return "<font color='red'>" + v + "</font>";
								else
									return v;
							}
						}, {
							xtype : 'objectcolumn',
							field : 'trueName',
							header : "审计 ",
							sortable : true,
							width : 95,
							dataIndex : "auditor"
						}, {
							header : "月份 ",
							sortable : true,
							width : 95,
							hidden : true,
							dataIndex : "month"
						}, {
							header : "类别 ",
							sortable : true,
							width : 95,
							dataIndex : "category"
						}, {
							header : "品牌",
							sortable : true,
							width : 95,
							hidden : true,
							dataIndex : "brand"
						}];
			},
			initComponent : function() {
				PurchaseReportPanel.superclass.initComponent.call(this);
			}
		});