ClientPanel = Ext.extend(EasyJF.Ext.CrudListPanel, {
	id : "clientPanel",
	baseUrl : "client.ejf",
	viewWin : {
		width : 488,
		height : 350
	},
	createForm : function() {
		var formPanel = new Ext.form.FormPanel({
					frame : true,
					labelWidth : 70,
					labelAlign : 'right',
					defaultType : 'textfield',
					defaults : {
						width : 200
					},
					items : [
							{
								xtype : "hidden",
								name : "id"
							},
							EasyJF.Ext.Util.buildColumnForm({
										fieldLabel : '编号',
										name : 'sn',
										allowBlank : false
									}, {
										fieldLabel : '姓名',
										name : 'name',
										allowBlank : false
									}, {
										fieldLabel : '名字缩写',
										name : 'shortName',
										allowBlank : false
									}, {
										fieldLabel : '邮政编码',
										name : 'zip'
									}, {
										fieldLabel : '传真',
										name : 'fax'
									}, {
										fieldLabel : '电话',
										name : 'tel'
									}, ConfigConst.BASE.getDictionaryCombo(
											"types", "客户类型", "clientType",
											"id", false, false),
									ConfigConst.BASE.getDictionaryCombo(
											"source", "客户来源", "clientSource",
											"id", false, false),
									ConfigConst.BASE.getDictionaryCombo(
											"trade", "行业", "trade", "id",
											false, false), {
										fieldLabel : '地址',
										name : 'address'
									}, {
										fieldLabel : '联系人',
										name : 'linkMan'
									}, {
										fieldLabel : 'E-mail',
										vtype : 'email',
										name : 'email'
									}, {
										fieldLabel : '主页',
										name : 'homePage'
									}), {
								fieldLabel : '简介',
								xtype : 'textarea',
								anchor : '-20',
								name : 'intro'
							}]
				});

		return formPanel;
	},
	createViewPanel : function() {
		var formPanel = new Ext.form.FormPanel({
					frame : true,
					labelWidth : 70,
					labelAlign : 'right',
					defaults : {
						width : 200
					},
					items : [{
								xtype : "hidden",
								name : "id"
							},
							EasyJF.Ext.Util.buildColumnForm(2, "labelfield", {
										fieldLabel : '编号',
										name : 'sn',
										allowBlank : false
									}, {
										fieldLabel : '姓名',
										name : 'name',
										allowBlank : false
									}, {
										fieldLabel : '名字缩写',
										name : 'shortName',
										allowBlank : false
									}, {
										fieldLabel : '邮政编码',
										name : 'zip'
									}, {
										fieldLabel : '传真',
										name : 'fax'
									}, {
										fieldLabel : '电话',
										name : 'tel'
									}, {
										fieldLabel : '客户类型',
										name : 'types',
										renderer : this.objectRender('title')
									}, {
										fieldLabel : '客户来源',
										name : 'source',
										renderer : this.objectRender('title')
									}, {
										fieldLabel : '客户行业',
										name : 'trade',
										renderer : this.objectRender('title')
									}, {
										fieldLabel : '地址',
										name : 'address'
									}, {
										fieldLabel : '联系人',
										name : 'linkMan'
									}, {
										fieldLabel : 'E-mail',
										vtype : 'email',
										name : 'email'
									}, {
										fieldLabel : '主页',
										name : 'homePage'
									}, {
										fieldLabel : '简介',
										anchor : '-20',
										name : 'intro'
									})]
				});

		return formPanel;
	},
	createWin : function(callback, autoClose) {
		return this.initWin(488, 350, "客户管理", callback, autoClose);
	},
	storeMapping : ["id", "sn", "name", "shortName", "zip", "fax", "tel",
			"address", "linkMan", "email", "homePage", "inputTime", "intro",
			"types", "source", "trade"],
	initComponent : function() {
		this.cm = new Ext.grid.ColumnModel([{
					header : "编号",
					sortable : true,
					width : 300,
					dataIndex : "sn"
				}, {
					header : "姓名",
					sortable : true,
					width : 300,
					dataIndex : "name"
				}, {
					header : "名字缩写",
					sortable : true,
					width : 300,
					dataIndex : "shortName"
				}, {
					header : "邮政编码",
					sortable : true,
					width : 300,
					dataIndex : "zip"
				}, {
					header : "传真",
					sortable : true,
					width : 300,
					dataIndex : "fax"
				}, {
					header : "电话",
					sortable : true,
					width : 300,
					dataIndex : "tel"
				}, {
					header : "地址",
					sortable : true,
					width : 300,
					dataIndex : "address"
				}, {
					header : "联系人",
					sortable : true,
					width : 300,
					dataIndex : "linkMan"
				}, {
					header : "E-mail",
					sortable : true,
					width : 300,
					dataIndex : "email"
				}, {
					header : "主页",
					sortable : true,
					width : 300,
					dataIndex : "homePage"
				}, {
					xtype : 'datecolumn',
					format : 'Y-m-d H:m:s',
					header : "录入时间",
					sortable : true,
					width : 300,
					dataIndex : "inputTime"
				}, {
					header : "简介",
					sortable : true,
					width : 300,
					dataIndex : "intro"
				}]);
		this.gridConfig = {};
		var disableIndexes = ['email', 'inputTime', 'homePage', 'fax', 'intro'];
		this.gridConfig['plugins'] = new Ext.ux.grid.Search({
					searchText : '搜索',
					paramNames : {
						fields : 'fields',
						query : 'searchKey'
					},
					prependButtons : 3,
					disableIndexes : disableIndexes
				})
		ClientPanel.superclass.initComponent.call(this);
	}
});