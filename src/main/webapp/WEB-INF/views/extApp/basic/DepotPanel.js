DepotPanel = Ext.extend(EasyJF.Ext.CrudPanel, {
			id : "depotPanel",
			baseUrl : "depot.ejf",
			entityIdName : "id",
			viewWin : {
				width : 488,
				height : 180
			},
			createForm : function() {
				var formPanel = new Ext.form.FormPanel({
							frame : true,
							labelWidth : 70,
							labelAlign : 'right',
							defaultType : 'textfield',
							bodyStyle : 'padding:10px;',
							defaults : {
								anchor : "-20"
							},
							items : [
									{
										xtype : "hidden",
										name : this.entityIdName
									},
									EasyJF.Ext.Util.buildColumnForm(2, {
												fieldLabel : '名称',
												name : 'name',
												allowBlank : false
											}, ConfigConst.BASE
													.getDictionaryCombo(
															"types", "仓库类型",
															"depot_types",
															false), {
												xtype : "numberfield",
												fieldLabel : '最大容量',
												name : 'maxCapacity',
												allowBlank : false
											}, {
												xtype : "numberfield",
												fieldLabel : '总容量',
												name : 'amount',
												allowBlank : false
											}, {
												xtype : "numberfield",
												fieldLabel : '序列',
												name : 'sequence'
											})]
						});

				return formPanel;
			},
			createViewPanel : function() {
				var formPanel = new Ext.form.FormPanel({
							frame : true,
							labelWidth : 70,
							labelAlign : 'right',
							defaults : {
								anchor : "-20"
							},
							items : [
									{
										xtype : "hidden",
										name : this.entityIdName
									},
									EasyJF.Ext.Util.buildColumnForm(2,
											"labelfield", {
												fieldLabel : '名称',
												name : 'name'
											}, {
												fieldLabel : '类型',
												name : 'types',
												renderer : EasyJF.Ext.Util
														.objectRender("title")
											}, {
												fieldLabel : '最大容量',
												name : 'maxCapacity'
											}, {
												fieldLabel : '总容量',
												name : 'amount'
											}, {
												fieldLabel : '序列',
												name : 'sequence'
											})]
						});

				return formPanel;
			},
			createWin : function() {
				return this.initWin(488, 180, "仓库管理");
			},
			storeMapping : ["id", "name", "types", "maxCapacity", "capcity",
					"amount", "sequence"],
			initComponent : function() {
				this.cm = new Ext.grid.ColumnModel([{
							header : "名称",
							sortable : true,
							width : 300,
							dataIndex : "name"
						}, {
							xtype : 'objectcolumn',
							field : 'title',
							header : "类型",
							sortable : true,
							width : 300,
							dataIndex : "types"
						}, {
							header : "最大容量",
							sortable : true,
							width : 300,
							dataIndex : "maxCapacity"
						}, {
							header : "总容量",
							sortable : true,
							width : 300,
							dataIndex : "amount"
						}, {
							header : "序列",
							sortable : true,
							width : 300,
							dataIndex : "sequence"
						}]);
				DepotPanel.superclass.initComponent.call(this);
			}
		});