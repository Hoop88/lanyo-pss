/**
 * 进销存序时帐 针对每一个货品的序时帐
 */
ERPJournalLedgerPanel = Ext.extendX(BaseChartPanel, function(superclass) {
	return {
		pageSize : 100,
		chartFields : ["debitorcredit", "types", "beginningNum",
				"beginningAmount", "inNum", "inAmount", "outAmount", "outNum",
				"balanceNum", "balanceAmount", "productSn", "productName",
				"dirName", "depotName"],
		chartUrl : 'chartCenter.ejf?cmd=journalLedger',
		buildTbar : function() {
			var productCombo = new ProductComboBox(Ext.apply({}, {
						itemId : 'product',
						displayField : "name",
						valueField : "id",
						width : 100,
						listWidth : 250,
						allowBlank : false,
						enableKeyEvents : true,
						listeners : {
							scope : this,
							keydown : function(field, e) {
								if (e.getKey() != Ext.EventObject.ENTER) {
									this.value = field.hiddenField.value = null;
								}
							}
						}
					}, ConfigConst.CRM.product));

			return {
				defaults : {
					msgTarget : 'qtip'
				},
				items : [{
							itemId : 'startDate',
							format : 'Y-m-d',
							xtype : 'datefield',
							emptyText : '开始时间'
						}, "到", {
							itemId : 'endDate',
							format : 'Y-m-d',
							xtype : 'datefield',
							emptyText : '结束时间'
						}, "产品", productCombo, "仓库",
						ConfigConst.STOCK.getDepotCombo({
									allowBlank : false,
									disableChoice : false,
									width : 100
								}), {
							text : '查询',
							iconCls : 'search',
							msgTarget : 'qtip',
							handler : this.searchChart,
							scope : this
						}, {
							text : '重置',
							iconCls : 'f5',
							msgTarget : 'qtip',
							handler : function(btn) {
								this.grid.getStore().removeAll();
								var tb = btn.ownerCt;

								for (var i = 0; i < tb.items.length; i++) {
									var field = tb.items.itemAt(i);
									if (field.isFormField) {
										field.reset();
									}

								}

							},
							scope : this
						}]
			};
		},
		buildGridCm : function() {
			var typeMap = {
				'-2' : "期初",
				'-1' : "出库单据",
				'1' : "入库单据"
			}
			return [new Ext.grid.RowNumberer({
								width : 36,
								header : '序号'
							}), {
						header : '类型',
						dataIndex : 'debitorcredit',
						renderer : function(v) {
							return typeMap[v];
						}
					}, {
						header : '单号',
						dataIndex : 'depotName'
					}, {
						header : '金额',
						dataIndex : 'inAmount'
					}, {
						header : '数量',
						dataIndex : 'inNum'
					}, {
						header : '金额',
						dataIndex : 'outAmount'
					}, {
						header : '数量',
						dataIndex : 'outNum'
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
		searchChart : function(btn) {
			var product = this.getTopToolbar().items.get('product');
			if (product.getValue()) {
				superclass.searchChart.call(this);
			} else {
				Ext.Msg.alert('提示', "请你选着需要统计的商品");
			}
		},
		initComponent : function() {
			var group = new Ext.ux.grid.ColumnHeaderGroup({
						rows : [[{
									align : 'center',
									colspan : 3
								}, {
									align : 'center',
									colspan : 2,
									header : '入库'
								}, {
									align : 'center',
									colspan : 2,
									header : '出库'
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