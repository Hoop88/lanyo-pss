ERPSummarySheetPanel = Ext.extendX(BaseChartPanel, function(superclass) {
			return {
				pageSize : 100,
				chartFields : ["productName", "depotId", "beginningNum",
						"beginningAmount", "purchaseNum", "purchaseAmount",
						"outStockNum", "outStockAmount", "balanceNum",
						"balanceAmount", "productSn", "productName", "dirName",
						"depotName"],
				chartUrl : 'chartCenter.ejf?cmd=summarySheet',
				buildTbar : function() {
					return [{
								itemId : 'startDate',
								msgTarget : 'qtip',
								format : 'Y-m-d',
								xtype : 'datefield',
								emptyText : '开始时间'
							}, "到", {
								itemId : 'endDate',
								msgTarget : 'qtip',
								format : 'Y-m-d',
								xtype : 'datefield',
								emptyText : '结束时间'
							}, "货号", {
								xtype : 'textfield',
								width : 100,
								emptyText : '货号',
								itemId : 'productSn'
							}, "仓库", ConfigConst.STOCK.getDepotCombo({
										disableChoice : false,
										allowBlank : true,
										width : 100
									}), "供应商",
							ConfigConst.STOCK.getSupplierCombo({
										disableChoice : false,
										allowBlank : true,
										width : 100
									}), "&#8195;", {
								text : '开始统计',
								iconCls : 'chart',
								msgTarget : 'qtip',
								scope : this,
								ref : 'chart',
								menu : {
									listeners : {
										scope : this,
										itemclick : function(item) {
											var v = item.itemValue;
											var btn = item.parentMenu.ownerCt;
											btn._groupValue = v;
											btn.setText(item.text);
											this.getGridStore().baseParams['type'] = v;
											this.searchChart();
										}
									},
									items : [{
												text : '月份统计',
												itemValue : 'month'
											},
											// {text:'年份统计',itemValue:'year'},
											{
												text : '仓库统计',
												itemValue : 'depot'
											}]
								}
							}/*
								 * ,{ text : "图表分析", iconCls : 'chartPic', scope :
								 * this, handler : this.chartPic }
								 */, {
								text : '重置',
								iconCls : 'f5',
								scope : this,
								handler : function(btn) {
									var tb = btn.ownerCt;
									this.grid.getStore().removeAll();
									if (tb.chart._groupValue) {
										for (var i = 0; i < tb.items.length; i++) {
											var field = tb.items.itemAt(i);
											if (field.isFormField) {
												field.reset();
											}
										}
									}
								}
							}];
				},
				buildGridCm : function() {
					return [new Ext.grid.RowNumberer({
										width : 36,
										header : '序号'
									}), {
								header : '项目名称',
								dataIndex : 'productName'
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
				/*
				 * initChartPicWin : function(){ if(!this.chartPicWin){
				 * this.chartPicWin = new Ext.Window({ modal:true, width : 800,
				 * height : 480, title : '图表分析', resizable:true, layout : 'fit',
				 * iconCls : 'chartPic-icon' }); } }, chartPic : function(){
				 * this.initChartPicWin(); this.chartPicWin.show(); },
				 */
				initComponent : function() {
					var group = new Ext.ux.grid.ColumnHeaderGroup({
								rows : [[{
											align : 'center',
											colspan : 2
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