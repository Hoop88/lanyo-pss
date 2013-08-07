if (typeof Global === "undefined") {
	Global = {};
}
if (!Global.sytemModuleLoader) {
	Global.sytemModuleLoader = new Ext.tree.TreeLoader({
				url : "resource.ejf?cmd=getModules",
				listeners : {
					'beforeload' : function(treeLoader, node) {
						treeLoader.baseParams.id = (node.id.indexOf('root') < 0
								? node.id
								: "");
					}
				}
			})
}

// 系统限资源管理
SystemLogListPanel = Ext.extend(EasyJF.Ext.CrudPanel, {
			id : "systemLogListPanel",
			// title : "系统权限资源管理",
			baseUrl : "systemLog.ejf",
			batchRemoveMode : true,
			exportData : true,
			pageSize : 20,
			viewWin : {
				title : "日志详情查看",
				width : 600,
				height : 480
			},
			edit : function() {
				this.view();
			},
			createViewPanel : function() {
				var formPanel = new Ext.form.FormPanel({
							frame : true,
							labelWidth : 80,
							labelAlign : 'right',
							items : [{
										xtype : "fieldset",
										title : "基本信息",
										autoHeight : true,
										items : [{
													xtype : "hidden",
													name : "id"
												}, {
													xtype : "labelfield",
													fieldLabel : "简介",
													name : 'desciption'
												}, {
													xtype : "labelfield",
													name : "type",
													hiddenName : "type",
													fieldLabel : "资源类型"
												}, {
													xtype : "labelfield",
													fieldLabel : "资源描述",
													name : 'resStr'
												}, {
													xtype : "labelfield",
													fieldLabel : "资源描述",
													name : 'resStr'
												}]
									}]
						});
				return formPanel;
			},
			createWin : function() {
				return this.initWin(438, 200, "系统资源管理");
			},
			storeMapping : ["id", "user", "vdate", "ip", "action", "cmd",
					"types", "params"],
			initComponent : function() {
				this.cm = new Ext.grid.ColumnModel([{
							header : "时间",
							sortable : true,
							width : 100,
							dataIndex : "vdate",
							renderer : this.dateRender()
						}, {
							header : "ip",
							sortable : true,
							width : 80,
							dataIndex : "ip"
						}, {
							header : "操作人",
							sortable : true,
							width : 60,
							dataIndex : "user",
							renderer : this.objectRender("name")
						}, {
							header : "模块",
							sortable : true,
							width : 150,
							dataIndex : "action"
						}, {
							header : "命令",
							sortable : true,
							width : 80,
							dataIndex : "cmd"
						}, {
							header : "类别",
							sortable : true,
							width : 40,
							dataIndex : "types"
						}]);
				SystemLogListPanel.superclass.initComponent.call(this);
				this.hideOperaterItem("btn_add", "btn_edit");
			}
		});

// 信息分类栏目管理
SystemLogPanel = function() {
	this.list = new SystemLogListPanel({
				region : "center"
			});
	this.tree = new Ext.tree.TreePanel({
				title : "系统模块",
				region : "west",
				autoScroll : true,
				collapseFirst : false,
				collapsible : true,
				split : true,
				width : 250,
				tools : [{
							id : "refresh",
							handler : function() {
								this.tree.root.reload();
							},
							scope : this
						}],
				tools : [{
							id : "refresh",
							handler : function() {
								this.tree.root.reload();
							},
							scope : this
						}],
				root : new Ext.tree.AsyncTreeNode({
							id : "root",
							text : "所有模块",
							icon : "images/system/root.gif",
							expanded : true,
							loader : Global.sytemModuleLoader
						})
			});
	this.tree.on("click", function(node, eventObject) {
				var id = (node.id != 'root' ? node.id : "");
				if (!node.isLeaf() && node.id != "root") {
					this.list.pack = node.id;
					this.list.action = "";
				} else {
					this.list.pack = "";
					this.list.action = node.id == "root" ? "" : node.id;
				}
				Ext.apply(this.list.store.baseParams, {
							action : this.list.action,
							pack : this.list.pack
						});
				this.list.store.removeAll();
				this.list.store.load();
			}, this);
	SystemLogPanel.superclass.constructor.call(this, {
				id : "systemLogPanel",
				// title : "信息栏目分类管理",
				closable : true,
				autoScroll : true,
				border : false,
				layout : "border",
				items : [this.tree, this.list]
			});

};
Ext.extend(SystemLogPanel, Ext.Panel, {});