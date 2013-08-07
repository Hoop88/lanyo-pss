StockOutcomePanel = Ext.extend(EasyJF.Ext.CrudPanel, {
	id : "stockOutcomePanel",
	baseUrl : "stockOutcome.ejf",
	entityIdName : "id",
	createForm : function() {
		var formPanel = new Ext.form.FormPanel({
					frame : true,
					labelWidth : 70,
					labelAlign : 'right',
					defaultType : 'textfield',
					defaults : {
						anchor : "-20"
					},
					items : [
							{
								xtype : "hidden",
								name : this.entityIdName
							},
							{
								fieldLabel : 'sn',
								name : 'sn'
							},
							{
								xtype : "numberfield",
								fieldLabel : 'types',
								name : 'types'
							},
							{
								xtype : "datefield",
								fieldLabel : 'vdate',
								name : 'vdate',
								format : "Y-m-d"
							},
							{
								xtype : "datefield",
								fieldLabel : 'inputTime',
								name : 'inputTime',
								format : "Y-m-d"
							},
							{
								fieldLabel : 'remark',
								name : 'remark'
							},
							{
								xtype : "numberfield",
								fieldLabel : 'saleAmount',
								name : 'saleAmount'
							},
							{
								xtype : "numberfield",
								fieldLabel : 'amount',
								name : 'amount'
							},
							{
								fieldLabel : 'auditing',
								name : 'auditing'
							},
							{
								xtype : "datefield",
								fieldLabel : 'auditTime',
								name : 'auditTime',
								format : "Y-m-d"
							},
							{
								xtype : "numberfield",
								fieldLabel : 'status',
								name : 'status'
							},
							EasyJF.Ext.Util.buildRemoteCombox("client",
									"client", "client.ejf?cmd=list", ["id"]),
							EasyJF.Ext.Util.buildRemoteCombox("depot", "depot",
									"depot.ejf?cmd=list", ["id"]),
							EasyJF.Ext.Util.buildRemoteCombox("keeper",
									"keeper", "employee.ejf?cmd=list", ["id"]),
							EasyJF.Ext.Util.buildRemoteCombox("inputUser",
									"inputUser", "employee.ejf?cmd=list",
									["id"]),
							EasyJF.Ext.Util.buildRemoteCombox("auditor",
									"auditor", "employee.ejf?cmd=list", ["id"])]
				});

		return formPanel;
	},
	createWin : function() {
		return this.initWin(438, 300, "StockOutcome管理");
	},
	storeMapping : ["id", "sn", "types", "vdate", "inputTime", "remark",
			"saleAmount", "amount", "auditing", "auditTime", "status",
			"client", "depot", "keeper", "inputUser", "auditor"],
	initComponent : function() {
		this.cm = new Ext.grid.ColumnModel([{
					header : "sn",
					sortable : true,
					width : 300,
					dataIndex : "sn"
				}, {
					header : "types",
					sortable : true,
					width : 300,
					dataIndex : "types"
				}, {
					header : "vdate",
					sortable : true,
					width : 300,
					dataIndex : "vdate"
				}, {
					header : "inputTime",
					sortable : true,
					width : 300,
					dataIndex : "inputTime"
				}, {
					header : "remark",
					sortable : true,
					width : 300,
					dataIndex : "remark"
				}, {
					header : "saleAmount",
					sortable : true,
					width : 300,
					dataIndex : "saleAmount"
				}, {
					header : "amount",
					sortable : true,
					width : 300,
					dataIndex : "amount"
				}, {
					header : "auditing",
					sortable : true,
					width : 300,
					dataIndex : "auditing"
				}, {
					header : "auditTime",
					sortable : true,
					width : 300,
					dataIndex : "auditTime"
				}, {
					header : "status",
					sortable : true,
					width : 300,
					dataIndex : "status"
				}, {
					header : "client",
					sortable : true,
					width : 300,
					dataIndex : "client",
					renderer : EasyJF.Ext.Util.objectRender("id")
				}, {
					header : "depot",
					sortable : true,
					width : 300,
					dataIndex : "depot",
					renderer : EasyJF.Ext.Util.objectRender("id")
				}, {
					header : "keeper",
					sortable : true,
					width : 300,
					dataIndex : "keeper",
					renderer : EasyJF.Ext.Util.objectRender("id")
				}, {
					header : "inputUser",
					sortable : true,
					width : 300,
					dataIndex : "inputUser",
					renderer : EasyJF.Ext.Util.objectRender("id")
				}, {
					header : "auditor",
					sortable : true,
					width : 300,
					dataIndex : "auditor",
					renderer : EasyJF.Ext.Util.objectRender("id")
				}]);
		StockOutcomePanel.superclass.initComponent.call(this);
	}
});