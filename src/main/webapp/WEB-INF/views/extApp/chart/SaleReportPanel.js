/**
 * 采购报表
 * 
 * @author ssvfhppl
 * @class PurchasePanel
 * @extends EasyJF.Ext.CrudListPanel
 */
SaleReportPanel = Ext.extend(BasePurchaseAndSaleReportPanel, {
	id : "saleReportPanel",
	url : 'orderInfoItem.ejf',
	charTitle : '销售',
	showChart : true,
	storeMapping : ['id', 'sn', "productName", 'amount', 'num', 'price',
			'vdate', 'seller', 'client', 'month', 'category', "brand", "types"],
	getMenu : function() {
		return {
			listeners : {
				scope : this,
				itemclick : this.groupSearch
			},
			items : [{
						text : '按客户分组',
						name : 'obj.orderInfo.client',
						iconCls : 'chartPic'
					}, {
						text : '按业务员分组',
						iconCls : 'chartPic',
						name : 'obj.orderInfo.seller'
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
						name : 'month(obj.orderInfo.vdate)',
						iconCls : 'chartPic'
					}, {
						text : '按天分组',
						name : 'day(obj.orderInfo.vdate)',
						iconCls : 'chartPic',
						handler : this.groupSearch
					}]
		};
	},
	getColumnModel : function() {
		return [{
					header : "编号",
					sortable : true,
					width : 120,
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
					header : "客户",
					sortable : true,
					width : 120,
					dataIndex : "client"
				}, {
					header : "销售员",
					sortable : true,
					width : 120,
					dataIndex : "seller"
				}, {

					header : "商品名称",
					sortable : true,
					width : 120,
					dataIndex : "productName"
				}, {
					header : "交易时间",
					sortable : true,
					width : 120,
					dataIndex : "vdate",
					renderer : EasyJF.Ext.Util.dateRender('Y-m-d G:i:s')
				}, {
					header : "数量 ",
					sortable : true,
					width : 120,
					dataIndex : "num",
					renderer : function(v, m, r) {
						if (r.get('sn') == '合计:')
							return "<font color='red'>" + v + "</font>";
						else
							return v;
					}
				}, {
					header : "总金额 ",
					sortable : true,
					width : 120,
					dataIndex : "amount",
					renderer : function(v, m, r) {
						if (r.get('sn') == '合计:')
							return "<font color='red'>" + v + "</font>";
						else
							return v;
					}
				}, {
					header : "类别 ",
					sortable : true,
					width : 120,
					dataIndex : "category"
				}, {
					header : "品牌",
					sortable : true,
					width : 120,
					hidden : true,
					dataIndex : "brand"
				}];
	},
	initComponent : function() {
		SaleReportPanel.superclass.initComponent.call(this);
	}
});