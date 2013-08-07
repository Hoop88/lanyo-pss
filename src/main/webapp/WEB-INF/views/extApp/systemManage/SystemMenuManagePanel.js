if (!Global.platformMenuLoader) {
	Global.platformMenuLoader = new EasyJF.Ext.MemoryTreeLoader({
				iconCls : 'lanyo-tree-node-icon',
				varName : "Global.PLATFORM_MENU_NODES",
				url : "systemMenu.ejf?cmd=getTree&pageSize=-1&treeData=true&all=true",
				listeners : {
					'beforeload' : function(treeLoader, node) {
						treeLoader.baseParams.id = (node.id.indexOf('root') < 0
								? node.id
								: "");
						if (typeof node.attributes.checked !== "undefined") {
							treeLoader.baseParams.checked = false;
						}
					}
				}
			});
}
if (!Global.systemRoleCheckLoader) {
	Global.systemRoleCheckLoader = new EasyJF.Ext.MemoryTreeLoader({
		iconCls : 'lanyo-tree-node-icon',
		varName : "Global.SYSTEM_ROLE_CHECK_NODES",
		url : "role.ejf?cmd=getTree&pageSize=-1&treeData=true&all=true&checked=false",
		listeners : {
			'beforeload' : function(treeLoader, node) {
				treeLoader.baseParams.id = (node.id.indexOf('root') < 0
						? node.id
						: "");
				if (typeof node.attributes.checked !== "undefined") {
					treeLoader.baseParams.checked = false;
				}
			}
		}
	});
}

// 系统菜单管理
SystemMenuListPanel = Ext.extend(EasyJF.Ext.CrudPanel, {
	// title:"菜单详情",
	baseUrl : "systemMenu.ejf",
	theStatus : [["启用", 0], ["停用", -1]],
	showView : false,
	pageSize : 15,
	importData : true,
	exportData : true,
	createForm : function() {
		var formPanel = new Ext.form.FormPanel({
			frame : false,
			labelWidth : 80,
			labelAlign : 'right',
			layout : "fit",
			items : [{
				xtype : 'tabpanel',
				deferredRender : false,
				monitorResize : true,
				hideBorders : true,
				border : false,
				activeTab : 0,
				items : [{
					title : '系统菜单',
					bodyStyle : 'padding:5px',
					border : false,
					layout : 'form',
					items : [{
								xtype : "hidden",
								name : "id"
							}, {
								xtype : "hidden",
								name : "roles"
							}, {
								xtype : "fieldset",
								title : "菜单基本信息",
								anchor : '-1',
								autoHeight : true,
								items : [EasyJF.Ext.Util.twoColumnPanelBuild({
											fieldLabel : '菜单名称',
											name : 'title',
											allowBlank : false
										}, {
											fieldLabel : '菜单编码',
											name : 'sn',
											allowBlank : false
										},

										{
											xtype : "treecombo",
											fieldLabel : "父菜单",
											name : "parent",
											hiddenName : "parent",
											displayField : "title",
											valueField : "id",
											width : 110,
											tree : new Ext.tree.TreePanel({
												autoScroll : true,
												root : new Ext.tree.AsyncTreeNode(
														{
															id : "root",
															text : "所有菜单",
															iconCls : 'treeroot-icon',
															expanded : true,
															loader : Global.platformMenuLoader
														})
											})
										},

										Ext.apply({}, {
													fieldLabel : "平台菜单",
													name : "system",
													hiddenName : "system",
													value : false
												}, ConfigConst.BASE.yesNo), {
											xtype : "numberfield",
											fieldLabel : "费用",
											name : "fee"
										}, EasyJF.Ext.Util.buildCombox(
												"status", "状态", this.theStatus,
												0), {
											xtype : "numberfield",
											fieldLabel : "显示顺序",
											name : "sequence"
										}), {
									anchor : '98%',
									xtype : "checktreecombo",
									fieldLabel : "访问角色",
									disabled : true,
									displayField : "title",
									valueField : "id",
									name : "theRolesId",
									hiddenName : "theRolesId",
									tree : new Ext.tree.TreePanel({
										autoScroll : true,
										root : new Ext.tree.AsyncTreeNode({
											id : "root",
											text : "所有角色",
											checked : false,
											expanded : true,
											iconCls : 'treeroot-icon',
											loader : Global.systemRoleCheckLoader
										})
									})
								}]
							}, {
								xtype : "fieldset",
								title : "程序属性",
								anchor : '-1',
								autoHeight : true,
								items : [EasyJF.Ext.Util.twoColumnPanelBuild({
													fieldLabel : "应用程序类",
													name : "appClass"
												}, {
													fieldLabel : "所在包",
													name : "pack"
												}), {
											xtype : "textfield",
											anchor : '-20',
											fieldLabel : "脚本地址",
											name : "url"
										}, {
											xtype : "textfield",
											anchor : '-20',
											fieldLabel : "依赖脚本地址",
											name : "otherScripts"
										}, {
											xtype : "textfield",
											anchor : '-20',
											fieldLabel : "图标",
											name : "icon"
										}, {
											xtype : "textarea",
											anchor : '-20',
											fieldLabel : "参数信息",
											name : "params",
											height : 40
										}]
							}]
				}, {
					title : '功能列表',
					cmd : 'permission',
					layout : 'fit',
					hideBorders : true,
					bbar : [{
								text : '添加权限',
								handler : this.addPermission,
								scope : this
							}, {
								text : '删除权限',
								handler : this.delPermission,
								scope : this
							}],
					items : this.createGridPanel()
				}]
			}]
		});
		return formPanel;
	},
	createGridPanel : function() {
		var sm = new Ext.grid.CheckboxSelectionModel()
		this.permissionGrid = new Ext.grid.GridPanel({
					cm : new Ext.grid.ColumnModel([sm, {
								header : '权限名称',
								dataIndex : 'id',
								hidden : true
							}, {
								header : '权限名称',
								dataIndex : 'name'
							}, {
								header : '简介',
								dataIndex : 'description'
							}]),
					sm : sm,
					viewConfig : {
						forceFit : true
					},
					store : new Ext.data.JsonStore({
								id : 'id',
								totalProperty : "rowCount",
								fields : ['id', 'name', 'description'],
								root : "result"
							})
				});
		return this.permissionGrid;
	},
	loadPermission : function() {
		var id = this.fp.form.findField('id').getValue();
		if (id) {
			this.permissionGrid.getGridEl().mask('加载中...', 'x-mask-loading');
			Ext.Ajax.request({
						url : 'systemMenu.ejf?cmd=loadPermissions',
						params : {
							systemMenuId : id
						},
						success : function(res) {
							var res = Ext.decode(res.responseText);
							if (res) {
								this.permissionGrid.getStore().loadData({
											result : res,
											rowCount : res.length
										});
							}
							this.permissionGrid.getGridEl().unmask();
						},
						scope : this
					})
		}
	},
	delPermission : function() {
		var records = this.permissionGrid.getSelections();
		if (records.length > 0) {
			Ext.each(records, function(r) {
						this.permissionGrid.getStore().remove(r);
					}, this)
		}
	},
	addPermission : function() {
		if (!this.selectWin) {
			EasyJF.Ext.Util.listObject('PermissionPanelManage', function(o) {
				this.selectWin = new Ext.Window({
					title : '请选择权限',
					layout : 'fit',
					modal : true,
					closeAction : 'hide',
					buttonAlign : 'center',
					width : 1000,
					height : 550,
					items : o,
					buttons : [{
						text : '保存',
						handler : function() {
							var o = this.selectWin.getComponent(0);
							var records = o.grid.getSelections();
							if (records.length > 0) {
								Ext.each(records, function(r) {
											if (this.permissionGrid.getStore()
													.indexOfId(r.get('id')) < 0)
												this.permissionGrid.getStore()
														.add(r);
										}, this)
							} else {
								Ext.Msg.show({
											width : 200,
											title : '操作提示',
											msg : '你未选中任何行!',
											buttons : Ext.Msg.OK,
											icon : Ext.Msg.INFO
										});
								return;
							}
							this.selectWin.hide();
						},
						scope : this
					}, {
						text : '取消',
						handler : function() {
							this.selectWin.hide()
						},
						scope : this
					}]
				});
				this.selectWin.show();
			}.createDelegate(this), 'systemManage/PermissionPanel.js')
		} else {
			this.selectWin.show();
		}
	},
	statusRender : function(v) {
		if (v == -1)
			return "<font color=red>停用</a>";
		else
			return "启用";
	},
	onCreate : function() {
		if (this.parent) {
			this.fp.form.findField("parent").setOriginalValue(this.parent);
		}
		this.fp.getComponent(0).setActiveTab(0);
		if (this.permissionGrid)
			this.permissionGrid.getStore().removeAll();
		this.fp.form.findField("theRolesId").clearValue();
	},
	onEdit : function(r) {
		if (r) {
			var record = this.grid.getSelectionModel().getSelected();
			var roles = {
				id : "",
				title : ""
			};
			for (var i = 0, rs = record.get("theRoles"); i < rs.length; i++) {
				roles.id += rs[i].id + (i == rs.length - 1 ? "" : ",");
				roles.title += rs[i].title + (i == rs.length - 1 ? "" : ",");
			}
			this.fp.form.findField("theRolesId").setValue(roles);
			this.permissionGrid.getStore().removeAll();
			var permissions = record.get('permissions');
			if (permissions && permissions.length > 0) {
				this.permissionGrid.getStore().loadData({
							rowCount : permissions.length,
							result : permissions
						});
			}
		}
	},
	reCalMenuAndRoles : function() {
		var record = this.grid.getSelectionModel().getSelected();
		if (!record) {
			Ext.Msg.alert("提示信息", "请选择要重新计算的菜单项！");
			return false;
		} else {
			Ext.Ajax.request({
						url : "securityHelper.ejf",
						params : {
							cmd : "reCalSystemMenu",
							id : record.get("id")
						},
						scope : this,
						success : function(req) {
							Ext.Msg.alert("提示信息", "完成重新计算！");
						}
					})
		}
	},
	reloadTree : function() {
		if (this.tree) {
			Global.platformMenuLoader.remoteObject.clearData();
			var p = this.tree.getSelectionModel().getSelectedNode();
			this.tree.root.reload();
		}
		if (this.fp) {
			var parentNode = this.fp.form.findField("parent");
			if (parentNode && parentNode.tree.rendered)
				parentNode.tree.root.reload();
		}
	},
	save : function(callback, autoClose) {
		/*
		 * var rs=this.fp.form.findField("theRolesId").getValue();
		 * this.fp.form.baseParams={theRoles:rs.split(",")};
		 */
		this.fp.form.baseParams = {};
		var permissions = EasyJF.Ext.Util
				.getGridDataAsString(this.permissionGrid);
		Ext.apply(this.fp.form.baseParams, {
					permissions : permissions
				});
		SystemMenuListPanel.superclass.save.call(this, callback, autoClose);
	},
	createWin : function(callback, autoClose) {
		return this.initWin(638, 480, "平台系统菜单", callback, autoClose);
	},
	storeMapping : ["id", "sn", "title", "url", "vrtype", "roles",
			"permissions", "types", "appClass", "sequence", "status", "parent",
			{
				name : "parentId",
				mapping : "parent"
			}, "otherScripts", "icon", "pack", "theRoles", "fee", "system",
			"params"],
	initComponent : function() {
		this.cm = new Ext.grid.ColumnModel([{
					header : "编号",
					sortable : true,
					width : 120,
					dataIndex : "sn"
				}, {
					header : "名称",
					sortable : true,
					width : 120,
					dataIndex : "title"
				}, {
					header : "应用程序类",
					sortable : true,
					width : 120,
					dataIndex : "appClass"
				}, {
					header : "连接地址",
					sortable : true,
					width : 120,
					dataIndex : "url"
				}, {
					header : "类别",
					sortable : true,
					width : 120,
					dataIndex : "types",
					hidden : true
				}, {
					header : "访问角色",
					sortable : true,
					width : 120,
					dataIndex : "roles",
					hidden : true
				}, {
					header : "父级",
					sortable : true,
					width : 120,
					dataIndex : "parent",
					renderer : this.objectRender("title")
				}, {
					header : "排序",
					sortable : true,
					width : 120,
					dataIndex : "sequence"
				}, {
					header : "状态",
					sortable : true,
					width : 60,
					dataIndex : "status",
					renderer : this.statusRender
				}, {
					header : "依赖脚本",
					sortable : true,
					width : 80,
					dataIndex : "otherScripts"
				}]);
		this.gridButtons = [{
					text : "上移",
					cls : "x-btn-text-icon",
					icon : "images/core/up.gif",
					handler : this.swapSequence(""),
					scope : this
				}, {
					text : "下移",
					cls : "x-btn-text-icon",
					icon : "images/core/down.gif",
					handler : this.swapSequence(true),
					scope : this
				}
		/*
		 * , new
		 * Ext.Toolbar.Separator(),{text:"重新计算系统菜单项",scope:this,handler:this.reCalMenuAndRoles}
		 */
		];
		SystemMenuListPanel.superclass.initComponent.call(this);
		this.on("removeobject", this.reloadTree, this);
		this.on("saveobject", this.reloadTree, this);
	}
});

// 系统菜单管理
SystemMenuManagePanel = function() {
	this.list = new SystemMenuListPanel({
				region : "center"
			});
	this.tree = new Ext.tree.TreePanel({
				title : "菜单树",
				region : "west",
				autoScroll : true,
				width : 200,
				border : false,
				margins : '0 2 0 0',
				tools : [{
							id : "refresh",
							handler : function() {
								this.tree.root.reload();
							},
							scope : this
						}],
				root : new Ext.tree.AsyncTreeNode({
							id : "root",
							text : "所有菜单",
							iconCls : 'treeroot-icon',
							expanded : true,
							loader : Global.platformMenuLoader
						})
			});
	this.list.tree = this.tree;
	this.tree.on("click", function(node, eventObject) {
				var id = (node.id != 'root' ? node.id : "");
				this.list.parentId = id;
				this.list.store.baseParams.parentId = id;
				if (id) {
					this.list.parent = {
						id : id,
						title : node.text
					};
				} else
					this.list.parent = null;
				this.list.store.removeAll();
				this.list.store.load();
			}, this);
	SystemMenuManagePanel.superclass.constructor.call(this, {
				id : "systemMenuManagePanel",
				// title : "信息栏目分类管理",
				closable : true,
				border : false,
				autoScroll : true,
				layout : "border",

				items : [this.tree, this.list]
			});

};

Ext.extend(SystemMenuManagePanel, Ext.Panel, {});
