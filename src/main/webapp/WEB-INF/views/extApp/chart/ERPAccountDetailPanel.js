/**
 * 进销存明细帐
 */
ERPAccountDetailPanel = Ext.extendX(BaseChartPanel, function(superclass) {
			return {
				pageSize : 100,
				chartFields : ["productId", "depotId", "beginningNum",
						"beginningAmount", "purchaseNum", "purchaseAmount",
						"outStockNum", "outStockAmount", "balanceNum",
						"balanceAmount", "productSn", "productName", "dirName",
						"depotName"],
				chartUrl : 'chartCenter.ejf?cmd=marketReport',
				/*
				 * buildTbar : function(){ var tbar =
				 * superclass.buildTbar.call(this); tbar.push(
				 * {xtype:'textfield',width :
				 * 100,emptyText:'货号',itemId:'productSn'},
				 * {text:'查询',iconCls:'search',handler:this.searchChart,scope:this} );
				 * return tbar; },
				 */
				buildGridCm : function() {
					return [new Ext.grid.RowNumberer({
										width : 36,
										header : '序号'
									}), {
								header : '货品编号',
								dataIndex : 'productSn'
							}, {
								header : '货品名称',
								dataIndex : 'productName'
							}, {
								header : '分类',
								dataIndex : 'dirName'
							}, {
								header : '仓库',
								dataIndex : 'depotName'
							}, {
								header : '金额',
								dataIndex : 'beginningAmount'
							}, {
								header : '数量',
								dataIndex : 'beginningNum'
							}, {
								header : '金额',
								dataIndex : 'purchaseAmount'
							}, {
								header : '数量',
								dataIndex : 'purchaseNum'
							}, {
								header : '金额',
								dataIndex : 'outStockAmount'
							}, {
								header : '数量',
								dataIndex : 'outStockNum'
							}, {
								header : '金额',
								dataIndex : 'balanceAmount',
								renderer : this.numRenderer
							}, {
								header : '数量',
								dataIndex : 'balanceNum',
								renderer : this.numRenderer
							}];
				},
				initComponent : function() {
					var group = new Ext.ux.grid.ColumnHeaderGroup({
								rows : [[{
											align : 'center',
											colspan : 5
										}, {
											align : 'center',
											colspan : 2,
											header : '期初'
										}, {
											align : 'center',
											colspan : 2,
											header : '进货'
										}, {
											align : 'center',
											colspan : 2,
											header : '销售'
										}, {
											align : 'center',
											colspan : 2,
											header : '结余'
										}]]
							});
					this.gridPlugins = [group];
					superclass.initComponent.call(this);
				}
			};
		});