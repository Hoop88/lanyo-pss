if (typeof Global === "undefined") {
	Global = {};
}
if (!Global.sytemModuleLoader) {
	Global.sytemModuleLoader = new Ext.tree.TreeLoader({
				iconCls : 'lanyo-tree-node-icon',
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
// 权限列表
if (typeof PermissionList === "undefined") {
	PermissionList = Ext.extend(BaseGridList, {
				pagingToolbar : false,
				storeMapping : ["id", "name", "description"],
				initComponent : function() {
					this.cm = new Ext.grid.ColumnModel([{
								header : "权限名",
								sortable : true,
								width : 100,
								dataIndex : "name"
							}, {
								header : "简介",
								id : "description",
								sortable : true,
								width : 165,
								dataIndex : "description"
							}])
					PermissionList.superclass.initComponent.call(this);
				}
			});
}
if (typeof RoleList === "undefined") {
	RoleList = Ext.extend(BaseGridList, {
				pagingToolbar : false,
				storeMapping : ["id", "name", "title", "description"],
				initComponent : function() {
					this.cm = new Ext.grid.ColumnModel([{
								header : "编码",
								sortable : true,
								width : 80,
								dataIndex : "name"
							}, {
								header : "名称",
								sortable : true,
								width : 165,
								dataIndex : "title"
							}])
					RoleList.superclass.initComponent.call(this);
				}
			});
}
// 系统限资源管理
SystemResourceListPanel = Ext.extend(EasyJF.Ext.CrudPanel, {
	id : "systemResourceListPanel",

	// title : "系统权限资源管理",
	baseUrl : "resource.ejf",
	batchRemoveMode : true,
	pageSize : 25,
	viewWin : {
		title : "资源详情查看",
		width : 600,
		height : 480
	},
	types : [["模块限制", "MODULE"], ["URL限制", "URL"], ["方法限制", "METHOD"],
			["ACL限制", "ACL"]],
	createViewPanel : function() {
		if (!this.viewPermissionGrid) {
			this.viewPermissionGrid = new PermissionList({
						title : "拥有该资源的权限",
						columnWidth : .5,
						height : 240,
						gridForceFit : false,
						pagingToolbar : false,
						url : "resource.ejf?cmd=loadPermission"
					});
		}
		if (!this.viewRoleGrid) {
			this.viewRoleGrid = new RoleList({
						title : "拥有该资源的角色",
						columnWidth : .5,
						height : 240,
						pagingToolbar : false,
						url : "resource.ejf?cmd=loadRole"
					});
		}
		var formPanel = new Ext.form.FormPanel({
					frame : true,
					labelWidth : 80,
					labelAlign : 'right',
					items : [{
								xtype : "fieldset",
								title : "基本信息",
								height : 105,
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
											fieldLabel : "资源类型",
											renderer : EasyJF.Ext.Util.comboxRender
										}, {
											xtype : "labelfield",
											fieldLabel : "资源描述",
											name : 'resStr'
										}]
							}, {
								xtype : "fieldset",
								title : "详情",
								width : 570,
								height : 280,
								layout : "fit",
								items : {
									layout : "column",
									items : [this.viewPermissionGrid, {
												width : 5
											}, this.viewRoleGrid]
								}
							}]
				});
		return formPanel;
	},
	createForm : function() {
		var formPanel = new Ext.form.FormPanel({
					frame : true,
					labelWidth : 80,
					labelAlign : 'right',
					defaults : {
						width : 320,
						anchor : '-20',
						xtype : "textfield"
					},
					items : [{
								xtype : "hidden",
								name : "id"
							}, {
								fieldLabel : "简介",
								name : 'desciption'
							}, {
								xtype : "smartcombo",
								name : "type",
								hiddenName : "type",
								fieldLabel : "资源类型",
								displayField : "title",
								valueField : "id",
								store : new Ext.data.SimpleStore({
											fields : ['title', 'id'],
											data : this.types
										}),
								editable : false,
								mode : 'local',
								triggerAction : 'all',
								emptyText : '请选择...'
							}, {
								xtype : "textarea",
								fieldLabel : "资源描述",
								name : 'resStr'
							}]
				});
		return formPanel;
	},
	createWin : function() {
		return this.initWin(438, 200, "系统资源管理");
	},
	view : function() {
		var ret = SystemResourceListPanel.superclass.view.call(this);
		if (ret) {
			this.viewPermissionGrid.store.removeAll();
			this.viewPermissionGrid.store.load({
						params : "id="
								+ this.grid.getSelectionModel().getSelected()
										.get("id")
					});
			this.viewRoleGrid.store.removeAll();
			this.viewRoleGrid.store.load({
						params : "id="
								+ this.grid.getSelectionModel().getSelected()
										.get("id")
					});
		}
	},
	importModuleResource : function() {
		Ext.Ajax.request({
					waitMsg : "正在导入，请稍候...",
					url : this.baseUrl + "?cmd=importModuleResource",
					params : {
						pack : this.pack,
						action : this.action
					},
					success : function() {
						this.refresh();
					},
					scope : this
				});
	},
	storeMapping : ["id", "resStr", "type", "desciption"],
	initComponent : function() {
		this.cm = new Ext.grid.ColumnModel({
					defaultSortable : true,
					columns : [{
								header : "资源类型",
								width : 50,
								dataIndex : "type",
								xtype : 'objectcolumn',
								field : ['title', 'text']
							}, {
								header : "简介",
								width : 100,
								dataIndex : "desciption"
							}, {
								header : "资源描述",
								width : 300,
								dataIndex : "resStr"
							}]
				});
		this.gridButtons = [{
					text : "导入方法资源",
					cls : "x-btn-text-icon",
					icon : "images/core/up.gif",
					handler : this.importModuleResource,
					scope : this
				}, "-", {
					text : "创建权限",
					cls : "x-btn-text-icon",
					icon : "images/core/up.gif",
					handler : this.executeMulitCmd("createPermission"),
					scope : this
				}, {
					text : "加载资源角色",
					cls : "x-btn-text-icon",
					icon : "images/core/up.gif",
					name : "btn_refreshResourceRole",
					cmd : "refreshResourceRole",
					noneSelectRow : true
				}];
		SystemResourceListPanel.superclass.initComponent.call(this);
	}
});

// 信息分类栏目管理
SystemResourcePanel = function() {
	this.list = new SystemResourceListPanel({
				region : "center"
			});
	this.tree = new Ext.tree.TreePanel({
				title : "系统模块",
				region : "west",
				autoScroll : true,
				collapseFirst : false,
				collapsible : true,
				border : false,
				split : true,
				width : 250,
				border : false,
				margins : '0 2 0 0',
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
				beforeDestroy : function() {
					if (this._contextMenu) {
						Ext.destroy(this._contextMenu);
						delete this._contextMenu;
					}
					delete this.currentNode;
					this.constructor.prototype.beforeDestroy.call(this);
				},
				listeners : {
					scope : this
					/*
					 * ,contextmenu :{ scope : this , stopEvent : true, fn :
					 * function(node, e){ if(node.isLeaf()){ node.select();
					 * this.currentNode = node;
					 * this.getTreeContextMenu().showAt(e.getXY()); } } }
					 */
				},
				root : new Ext.tree.AsyncTreeNode({
							id : "root",
							text : "所有模块",
							expanded : true,
							iconCls : 'treeroot-icon',
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
	SystemResourcePanel.superclass.constructor.call(this, {
				id : "newsDirManagePanel",
				// title : "信息栏目分类管理",
				closable : true,
				autoScroll : true,
				border : false,
				layout : "border",

				items : [this.tree, this.list]
			});

};
Ext.extend(SystemResourcePanel, Ext.Panel, {
			getTreeContextMenu : function() {
				if (!this._contextMenu) {
					this._contextMenu = Ext.create({
								items : [{
											scope : this,
											text : '批量创建权限',
											handler : this.batchCreatePermission
										}]
							}, 'menu');
				}
				return this._contextMenu;
			},
			createBatchPermissionPanel : function() {

				var cm = new Ext.grid.ColumnModel({
							defaultSortable : true,
							columns : [{
										header : "资源类型",
										width : 50,
										dataIndex : "type",
										xtype : 'objectcolumn',
										field : ['title', 'text']
									}, {
										header : "简介",
										width : 100,
										dataIndex : "desciption"
									}, {
										header : "资源描述",
										width : 300,
										dataIndex : "resStr"
									}]
						});
				return new Ext.grid.GridPanel({
							cm : cm,
							border : false,
							viewConfig : {
								autoFill : true,
								forceFit : true
							},
							store : new Ext.data.JsonStore({
										data : [],
										fields : ['id', 'type', 'desciption',
												'resStr']
									})
						});
			},
			beforeDestroy : function() {
				if (this.batchPermissionPanel) {
					delete this.batchPermissionPanel;
					Ext.destroy(this.batchPermissionPanel);
				}
				SystemResourcePanel.superclass.beforeDestroy.call(this);
			},
			/**
			 * 批量创建权限
			 */
			batchCreatePermission : function() {
				if (this.currentNode) {
					this.batchPermissionPanel = this.batchPermissionPanel
							|| this.createBatchPermissionPanel();
					EasyJF.Ext.Window.show({
								single : false,
								title : '批量创建权限',
								width : 600,
								height : 450,
								items : this.batchPermissionPanel
							});
				}
			}
		});
