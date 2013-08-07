ProductStockPanel = Ext.extend(Ext.Panel, {
	layout : 'fit',
	border : false,
	hideBorders : true,
	gridPageSize : 100,
	id : "productStockPanel",
	baseUrl : "productStock.ejf",
	storeMapping : ["id", "storeNum", "price", "amount", "incomeDate",
			"outcomeDate", "warning", "topNum", "bottomNum", "product", "depot"],
	buildGridCm : function() {
		var cm = new Ext.grid.ColumnModel([{
			header : "商品",
			sortable : true,
			width : 160,
			fixed : true,
			dataIndex : "product",
			renderer : function(v) {
				return Ext.getObjVal(v, 'name') + "[" + Ext.getObjVal(v, 'sn')
						+ "]";
			}
		}, {
			header : "仓库",
			sortable : true,
			width : 300,
			dataIndex : "depot",
			renderer : EasyJF.Ext.Util.objectRender("name")
		}, {
			header : "库存数",
			sortable : true,
			width : 300,
			dataIndex : "storeNum"
		}, {
			header : "成本平均价格",
			sortable : true,
			width : 300,
			dataIndex : "price"
		}, {
			header : "库存金额",
			sortable : true,
			width : 300,
			dataIndex : "amount"
		}, {
			xtype : 'datecolumn',
			format : 'Y-m-d H:i:s',
			header : "最近入库时间",
			sortable : true,
			width : 300,
			dataIndex : "incomeDate"
		}, {
			xtype : 'datecolumn',
			format : 'Y-m-d H:i:s',
			header : "最近出库时间",
			sortable : true,
			width : 300,
			dataIndex : "outcomeDate"
		}, {
			width : 300,
			header : "是否预警",
			sortable : true,
			renderer : this.booleanRender,
			dataIndex : "warning"
		}, {
			header : "最高库存数",
			sortable : true,
			width : 300,
			dataIndex : "topNum"
		}, {
			header : "最低库存数",
			sortable : true,
			width : 300,
			dataIndex : "bottomNum"
		}]);
		return cm;
	},
	buildGridStore : function() {
		this.gridStore = new Ext.data.JsonStore({
					root : 'result',
					autoDestroy : true,
					totalProperty : 'rowCount',
					url : Ext.urlAppend(this.baseUrl, {
								cmd : 'list'
							}),
					fields : this.storeMapping
				});
		return this.gridStore;
	},
	buildGrid : function() {
		var cm = this.buildGridCm();
		var store = this.buildGridStore();
		this.grid = new Ext.grid.GridPanel({
					cm : cm,
					store : store,
					loadMask : true,
					bbar : new Ext.ux.PagingComBo({
								displayInfo : true,
								rowComboSelect : true,
								store : store,
								rowComboData : [[50], [100], [150], [200],
										[300]],
								pageSize : this.gridPageSize
							}),
					viewConfig : {
						forceFit : true
					}
				})
		return this.grid;
	},
	buildTbar : function() {
		return [
				"仓库",
				"&nbsp;",
				Ext.apply(EasyJF.Ext.Util.buildRemoteCombox("depot", "仓库",
								"depot.ejf?cmd=list", ["id", "name"], "name",
								"id", true), {
							width : 150,
							emptyText : '请选择仓库...'
						}), "&nbsp;", "分类", "&nbsp;",
				new EasyJF.Ext.TreeComboField({
					width : 150,
					name : 'dir',
					emptyText : '请选择分类...',
					tree : new Ext.tree.TreePanel({
						border : false,
						root : new Ext.tree.AsyncTreeNode({
									text : '所有分类',
									id : 'root',
									iconCls : 'treeroot-icon'
								}),
						loader : new Ext.tree.TreeLoader({
							iconCls : 'lanyo-tree-node-icon',
							nodeParameter : 'id',
							url : Ext.urlAppend("productDir.ejf", Ext
											.urlEncode({
														cmd : "getProductDirTree"
													}))
						})
					})
				}), "&nbsp;", "编号", "&nbsp;", {
					xtype : 'textfield',
					name : 'searchKey',
					emptyText : '请输入关键字...'
				}, "&nbsp;", {
					name : "btn_search",
					text : "查询",
					iconCls : 'search',
					handler : this.doSearch,
					scope : this
				}];
	},
	doSearch : function() {
		var values = this.getTopToolbar().getValues();
		var g = this.getGrid(), s = g.getStore();
		if (values['dir'] == 'root') {
			delete values['dir'];
		}
		s.baseParams = values;
		s.load();
	},
	getGrid : function() {
		return this.grid;
	},
	initComponent : function() {
		this.grid = this.buildGrid();
		this.tbar = this.buildTbar();
		this.items = [this.grid];
		ProductStockPanel.superclass.initComponent.call(this);
	}
});