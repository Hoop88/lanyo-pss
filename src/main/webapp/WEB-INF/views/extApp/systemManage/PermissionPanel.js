Ext.ns("EasyJF.Ext");
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
if (!Global.permissionGroupLoader) {
	Global.permissionGroupLoader = new Ext.tree.TreeLoader({
		iconCls : 'lanyo-tree-node-icon',
		url : "permissionGroup.ejf?cmd=getTree",
		listeners : {
			'beforeload' : function(treeLoader, node) {
				treeLoader.baseParams.permissionId = (node.id.indexOf('root') < 0
						? node.id
						: "");
			}
		}
	})
}
if (typeof RoleList === "undefined") {
	RoleList = Ext.extend(BaseGridList, {
				url : "role.ejf?cmd=list",
				loadData : true,
				border : false,
				storeMapping : ["id", "name", "title", "description"],
				initComponent : function() {
					var chkM = new Ext.grid.CheckboxSelectionModel();
					this.gridConfig = {
						sm : chkM
					}, this.cm = new Ext.grid.ColumnModel([chkM, {
								header : "编码",
								sortable : true,
								width : 60,
								dataIndex : "name"
							}, {
								header : "名称",
								sortable : true,
								width : 120,
								dataIndex : "title"
							}, {
								header : "简介",
								sortable : true,
								width : 100,
								dataIndex : "description"
							}])
					RoleList.superclass.initComponent.call(this);
				}
			});
}
ResourceList = Ext.extend(BaseGridList, {
			types : [["模块限制", "MODULE"], ["URL限制", "URL"], ["方法限制", "METHOD"],
					["ACL限制", "ACL"]],
			storeMapping : ["id", "resStr", "type", "desciption"],
			loadData : false,
			border : false,
			url : "resource.ejf?cmd=list",
			reset : function() {
				this.moduleItem.reset();
				this.typesItem.reset();
				this.grid.store.reload();
			},
			resourceSearch : function() {
				this.grid.store.removeAll();
				this.grid.store.baseParams = {
					start : 0,
					action : this.action,
					type : this.typesItem.getValue(),
					searchKey : this.searchKey.getValue()
				};
				this.grid.store.load();
			},
			initComponent : function() {
				var chkM = new Ext.grid.CheckboxSelectionModel();
				this.gridConfig = {
					sm : chkM
				}, this.cm = new Ext.grid.ColumnModel([chkM, {
							header : "资源类型",
							sortable : true,
							width : 70,
							dataIndex : "type",
							renderer : EasyJF.Ext.Util.objectRender('title')
						}, {
							header : "资源描述",
							sortable : true,
							width : 300,
							dataIndex : "resStr"
						}, {
							header : "简介",
							sortable : true,
							width : 80,
							dataIndex : "desciption"
						}]);
				this.moduleItem = new EasyJF.Ext.TreeComboField({
							displayField : "title",
							width : 220,
							listWidth : 250,
							tree : new Ext.tree.TreePanel({
										autoScroll : true,
										root : new Ext.tree.AsyncTreeNode({
													id : "root",
													text : "所有模块",
													expanded : true,
													loader : Global.sytemModuleLoader
												})
									}),
							listeners : {
								select : function(c, node) {
									if (!node.isLeaf() && node.id != "root") {
										this.pack = node.id;
										this.action = "";
									} else {
										this.pack = "";
										this.action = node.id == "root"
												? ""
												: node.id;
									}
									this.resourceSearch();
								},
								scope : this
							}
						});
				this.typesItem = new Ext.form.ComboBox(Ext.apply({}, {
							width : 80,
							emptyText : '请选择...',
							editable : false
						}, EasyJF.Ext.Util.buildCombox("types", "types",
								this.types)));
				this.searchKey = new Ext.form.TextField({
							name : "searchKey",
							width : 80
						});
				this.tbar = ["模块：", this.moduleItem, "资源类型:", this.typesItem,
						"关键字:", this.searchKey, "->", {
							text : "查询",
							handler : this.resourceSearch,
							scope : this,
							cls : "x-btn-text-icon",
							icon : "images/icon-png/search.png"
						}, {
							text : "重置",
							handler : this.reset,
							scope : this
						}];
				ResourceList.superclass.initComponent.call(this);
			}
		});
// 系统权限
PermissionPanel = Ext.extend(EasyJF.Ext.CrudPanel, {
	id : "permissionPanel",
	pageSize : 20,
	importData : true,
	exportData : true,
	singleWindowMode : true,
	batchRemoveMode : true,
	// title : "权限维护",
	types : [["模块限制", "MODULE"], ["URL限制", "URL"], ["方法限制", "METHOD"],
			["ACL限制", "ACL"]],
	theStatus : [["启用", 0], ["停用", -1]],
	baseUrl : "permission.ejf",
	viewWin : {
		title : "权限详情查看",
		width : 600,
		height : 480
	},
	createSelPermissionGroup : function() {
		var records = this.grid.getSelectionModel().getSelections();
		if (records.length == 0) {
			Ext.Msg.alert("操作提示", '请先选择功能！');
			return;
		}
		if (!this['selPermissionGroup']) {
			this['selPermissionGroup'] = new Ext.tree.TreePanel({
				region : 'west',
				split : false,
				autoScroll : true,
				width : 250,
				bbar : ['->', {
							text : "刷新",
							handler : function(btn) {
								this['selPermissionGroup'].getRootNode()
										.reload();
							},
							scope : this
						}],
				root : new Ext.tree.AsyncTreeNode({
					id : 'root',
					text : '权限组',
					iconCls : 'treeroot-icon',
					border : false,
					rootVisible : false,
					loader : new Ext.tree.TreeLoader({
						url : 'permissionGroup.ejf?cmd=getTree',
						listeners : {
							beforeload : function(treeLoader, node) {
								treeLoader.baseParams.permissionId = (node.id != 'root'
										? node.attributes.id
										: '');
							},
							scope : this
						}
					})
				})
			});
		}
		EasyJF.Ext.Window.show({
					title : '请选择权限组',
					autoHide : true,
					// compId:'selPermissionGroup',
					border : false,
					single : false,
					items : this['selPermissionGroup'],
					width : 250,
					buttons : EasyJF.Ext.Window.YESNO,
					handler : function(btn, win, tree) {
						var node = tree.getSelectionModel().getSelectedNode();
						if (btn == 'yes') {
							if (node) {
								var records = this.grid.getSelectionModel()
										.getSelections();
								var ids = [];
								Ext.each(records, function(r) {
											ids.push(r.get('id'));
										});
								var parentId = node.attributes.id == 'root'
										? ''
										: node.attributes.id;
								this.moveToPermissionGroup({
											parentId : parentId,
											id : ids
										});
							}
						}
					},
					scope : this
				});
	},
	moveToPermissionGroup : function(params) {
		Ext.Ajax.request({
					url : 'permission.ejf?cmd=moveToPermissionGroup',
					params : params,
					success : function() {
						this.grid.getStore().removeAll();
						this.grid.getStore().reload();
					},
					scope : this
				});
	},
	choiceSelectGridData : function(grid, winName, gridList, winTitle) {
		return function() {
			var theGrid = this[grid];
			if (!this[winName]) {
				var glist = eval("new " + gridList);
				this[winName] = new EasyJF.Ext.GridSelectWin({
							border : false,
							hideBorders : true,
							title : winTitle,
							width : 650,
							grid : glist
						});
				this[winName].on("select", function(datas) {
							var ds = [];
							for (var i = 0; i < datas.length; i++) {// 过滤掉重复的内容
								if (theGrid.store.find("id", datas[i].id) < 0)
									ds[ds.length] = datas[i];
							}
							theGrid.store.loadData(ds, true);
						}, this);
			}
			this[winName].show();
		}
	},
	createViewPanel : function() {
		if (!this.viewSelectGrid) {
			this.viewSelectGrid = new ResourceList({
						title : "该权限所包含的资源",
						columnWidth : .65,
						height : 250,
						border : true,

						gridForceFit : false,
						pagingToolbar : false,
						url : "permission.ejf?cmd=loadResource"
					});
		}
		if (!this.viewRoleGrid) {
			this.viewRoleGrid = new RoleList({
						title : "具有该权限的角色",
						columnWidth : .35,
						height : 250,
						pagingToolbar : false,
						url : "permission.ejf?cmd=loadRole"
					});
		}
		var formPanel = new Ext.form.FormPanel({
					frame : true,
					labelWidth : 60,
					labelAlign : 'right',
					items : [{
								xtype : "hidden",
								name : "id"
							}, {
								xtype : "hidden",
								name : "resources"
							}, {
								xtype : "fieldset",
								title : "基本信息",
								height : 90,
								items : [EasyJF.Ext.Util.twoColumnPanelBuild({
													xtype : "labelfield",
													fieldLabel : '权限名称',
													name : 'name'
												}, {
													xtype : "labelfield",
													fieldLabel : '状态',
													name : 'status',
													renderer : this.statusRender
												}), {
											anchor : "100%",
											height : 40,
											xtype : "labelfield",
											fieldLabel : "简介",
											name : 'description'
										}]
							}, {
								xtype : "fieldset",
								title : "详情",
								anchor : "100%",
								height : 280,
								layout : "fit",
								items : {
									layout : "column",
									items : [this.viewSelectGrid, {
												width : 5
											}, this.viewRoleGrid]
								}
							}]
				});
		return formPanel;
	},
	createForm : function() {
		var chkM = new Ext.grid.CheckboxSelectionModel();
		this.editGrid = new Ext.grid.GridPanel({
					title : "权限相关资源",
					sm : chkM,
					viewConfig : {
						forceFit : true
					},
					cm : new Ext.grid.ColumnModel([chkM,
							new Ext.grid.RowNumberer({
										header : "序号",
										width : 40
									}), {
								header : "ID",
								dataIndex : "id",
								hideable : true,
								hidden : true
							}, {
								header : "资源类型",
								sortable : true,
								width : 70,
								dataIndex : "type"
							}, {
								header : "资源描述",
								sortable : true,
								width : 300,
								dataIndex : "resStr"
							}, {
								header : "简介",
								sortable : true,
								width : 80,
								dataIndex : "desciption",
								hidden : true
							}]),
					store : new Ext.data.JsonStore({
								fields : ["id", "type", "description", "resStr"]
							}),
					bbar : [{
						text : "添加资源",
						cls : "x-btn-text-icon",
						icon : "images/icons/application_form_add.png",
						handler : this.choiceSelectGridData("editGrid",
								"selectWin", "ResourceList", "选择资源"),
						scope : this
					}, {
						text : "删除资源",
						cls : "x-btn-text-icon",
						icon : "images/icons/application_form_delete.png",
						handler : function() {
							EasyJF.Ext.Util.removeGridRows(this.editGrid);
						},
						scope : this
					}]
				});
		var roleChkM = new Ext.grid.CheckboxSelectionModel();
		this.roleGrid = new Ext.grid.GridPanel({
					title : "权限相关角色",
					sm : roleChkM,
					viewConfig : {
						forceFit : true
					},
					cm : new Ext.grid.ColumnModel([chkM,
							new Ext.grid.RowNumberer({
										header : "序号",
										width : 40
									}), {
								header : "ID",
								dataIndex : "id",
								hideable : true,
								hidden : true
							}, {
								header : "角色编码",
								sortable : true,
								width : 70,
								dataIndex : "name"
							}, {
								header : "名称",
								sortable : true,
								width : 100,
								dataIndex : "title"
							}, {
								header : "简介",
								sortable : true,
								width : 80,
								dataIndex : "desciption",
								hidden : true
							}]),
					store : new Ext.data.JsonStore({
								fields : ["id", "name", "title", "description"]
							}),
					bbar : [{
						text : "添加角色",
						cls : "x-btn-text-icon",
						icon : "images/icons/application_form_add.png",
						handler : this.choiceSelectGridData("roleGrid",
								"selectRoleWin", "RoleList", "选择角色"),
						scope : this
					}, {
						text : "删除角色",
						cls : "x-btn-text-icon",
						icon : "images/icons/application_form_delete.png",
						handler : function() {
							EasyJF.Ext.Util.removeGridRows(this.roleGrid);
						},
						scope : this
					}]
				});
		var formPanel = new Ext.form.FormPanel({
			frame : true,
			labelWidth : 60,
			labelAlign : 'right',
			items : [{
						xtype : "hidden",
						name : "id"
					}, {
						xtype : "fieldset",
						title : "基本信息",
						autoHeight : true,
						items : [{
									xtype : "textfield",
									fieldLabel : '权限名称',
									name : 'name',
									anchor : "-1"
								}, EasyJF.Ext.Util.twoColumnPanelBuild({
									xtype : "treecombo",
									fieldLabel : "组",
									name : "parent",
									hiddenName : "parent",
									displayField : "name",
									valueField : "id",
									width : 150,
									tree : new Ext.tree.TreePanel({
										autoScroll : true,
										root : new Ext.tree.AsyncTreeNode({
											id : "root",
											text : "所有组",
											iconCls : 'treeroot-icon',
											expanded : true,
											loader : Global.permissionGroupLoader
										})
									})
								}, EasyJF.Ext.Util.buildCombox("status", "状态",
										this.theStatus, 0)), {
									anchor : "-1",
									height : 40,
									xtype : "textarea",
									fieldLabel : "简介",
									name : 'description'
								}]
					}, {
						xtype : "panel",
						// title : "权限资源",
						anchor : "100%",
						height : 300,
						layout : "fit",
						items : {
							xtype : "tabpanel",
							activeTab : 0,
							items : [this.editGrid, this.roleGrid]
						}
					}]
		});
		return formPanel;
	},

	statusRender : function(v) {
		if (v == -1)
			return "<font color=red>停用</a>";
		else
			return "启用";
	},
	onCreate : function() {
		if (this.editGrid.store.getCount() > 0)
			this.editGrid.store.removeAll();
		if (this.roleGrid.store.getCount() > 0)
			this.roleGrid.store.removeAll();
	},
	view : function() {
		var ret = PermissionPanel.superclass.view.call(this);
		if (ret) {
			this.viewSelectGrid.store.removeAll();
			this.viewSelectGrid.store.load({
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
	onEdit : function(ret) {
		if (ret) {
			this.editGrid.store.removeAll();
			var items = this.grid.getSelectionModel().getSelected()
					.get("resources")
			this.editGrid.store.removeAll();
			this.editGrid.store.loadData(items);
			this.roleGrid.store.removeAll();
			this.roleGrid.store.loadData(this.grid.getSelectionModel()
					.getSelected().get("roles"));
		}
	},
	getGridDataAsString : function(grid) {
		grid = grid || this.roleGrid;
		var s = "";
		for (var i = 0; i < grid.store.getCount(); i++) {
			var r = grid.store.getAt(i);
			s += r.get("id") + ",";
		}
		return s;
	},
	save : function() {
		var rs = this.getGridDataAsString(this.editGrid);
		var roles = this.getGridDataAsString(this.roleGrid);
		this.fp.form.baseParams = {
			resources : rs,
			roles : roles
		};
		PermissionPanel.superclass.save.call(this);
	},
	createWin : function(callback, autoClose) {
		return this.initWin(638, 520, "权限", callback, autoClose);
	},
	storeMapping : ["id", "name", "operation", "resources", "description",
			"status", "roles", "parent"],
	initComponent : function() {
		var sm = new Ext.grid.CheckboxSelectionModel();
		this.cm = new Ext.grid.ColumnModel([sm, {
					header : "权限名称",
					sortable : true,
					width : 200,
					dataIndex : "name"
				}, {
					header : "资源数",
					sortable : true,
					width : 50,
					hidden : true,
					dataIndex : "resources",
					renderer : this.objectRender("length")
				}, {
					header : "简介",
					sortable : true,
					width : 200,
					dataIndex : "description"
				}, {
					header : "状态",
					sortable : true,
					width : 80,
					dataIndex : "status",
					renderer : this.statusRender
				}]);
		this.gridConfig = {
			enableDragDrop : true,
			sm : sm,
			ddGroup : "gridDD"
		};
		this.gridButtons = [{
					text : '移动到权限组',
					iconCls : 'move',
					handler : this.createSelPermissionGroup,
					scope : this
				}], PermissionPanel.superclass.initComponent.call(this);
	}
});

PermissionPanelManage = Ext.extend(Ext.Panel, {
	layout : 'border',
	border : false,
	onClickNode : function(node, e) {
		this.grid.store.baseParams = {
			permissionId : node.id != 'root' ? node.attributes.id : '',
			searchKey : ""
		};
		this.grid.store.load();
	},
	showContextmenu : function(node, e) {
		var tree = node.getOwnerTree();
		node.select();// 选中当前点右键的树节点
		var menu = tree.contextmenu;
		menu.node = node;
		menu.showAt(e.getXY());
	},
	createContextmenu : function() {
		return new Ext.menu.Menu({
			shadow : true,
			defaults : {
				scope : this
			},
			items : [{
				text : '添加',
				scope : this,
				handler : function(item) {
					var node = item.parentMenu.node;
					Ext.Msg.prompt("新增权限", "请输入新增权限名称", function(btn, text) {
						if (btn == 'ok') {
							if (text.trim() == '') {
								Ext.Msg.alert('请输入权限名称！');
								return;
							}
							Ext.Ajax.request({
										scope : this,
										url : 'permissionGroup.ejf?cmd=save',
										params : {
											name : text,
											parent : node.attributes.id == "root"
													? ""
													: node.attributes.id
										},
										success : function(response) {
											this.tree.getRootNode().reload();
										}
									});
						}
					}, this)
				}
			}, {
				text : '修改',
				scope : this,
				handler : function(item) {
					var node = item.parentMenu.node;
					Ext.Msg.prompt("修改权限", "请输入修改权限名称", function(btn, text) {
								if (btn == 'ok') {
									if (text.trim() == '') {
										Ext.Msg.alert('请输入权限名称！');
										return;
									}
									Ext.Ajax.request({
												scope : this,
												url : 'permissionGroup.ejf?cmd=update',
												params : {
													name : text,
													id : node.attributes.id
												},
												success : function(response) {
													node.setText(text);
												}
											});
								}
							}, this, false, node.attributes.text)
				}
			}, {
				text : '删除',
				scope : this,
				handler : function(item) {
					var node = item.parentMenu.node;
					Ext.Msg.confirm("操作提示", "你確定要刪除該权限吗!", function(btn) {
								if (btn == 'yes') {
									Ext.Ajax.request({
												scope : this,
												url : 'permissionGroup.ejf?cmd=remove',
												params : {
													id : node.attributes.id
												},
												success : function(response) {
													this.grid.store.removeAll();
													this.grid.store.reload();
													this.tree.getRootNode()
															.reload();
												}
											});
								}
							}, this)
				}
			}]
		});
	},
	dragdrop : function(tree, node, oldParent, newParent) {
		var o = {
			moveNodeId : node.attributes.id == 'root' ? '' : node.attributes.id,
			newParentId : newParent.attributes.id == 'root'
					? ""
					: newParent.attributes.id
		};
		Ext.Ajax.request({
					url : 'permissionGroup.ejf?cmd=move',
					params : o,
					success : function(res, opt) {
						this.tree.getRootNode().reload();
					},
					scope : this
				});
	},
	createPermissionGroup : function() {
		return new Ext.tree.TreePanel({
			region : 'west',
			split : false,
			autoScroll : true,
			width : 250,
			title : '权限组',
			ddGroup : "gridDD",
			// enableDrop : true,
			enableDD : true,
			autoScroll : true,
			border : false,
			margins : '0 2 0 0',
			tools : [{
						id : "refresh",
						handler : function() {
							this.tree.root.reload();
						},
						scope : this
					}],
			contextmenu : this.createContextmenu(),
			root : new Ext.tree.AsyncTreeNode({
				id : 'root',
				text : '权限组',
				expanded : true,
				rootVisible : false,
				iconCls : 'treeroot-icon',
				loader : new Ext.tree.TreeLoader({
					iconCls : 'lanyo-tree-node-icon',
					url : 'permissionGroup.ejf?cmd=getTree',
					listeners : {
						beforeload : function(treeLoader, node) {
							treeLoader.baseParams.permissionId = (node.id != 'root'
									? node.attributes.id
									: '');
						},
						scope : this
					}
				})
			}),
			listeners : {
				contextmenu : this.showContextmenu,
				beforemovenode : this.dragdrop,
				click : this.onClickNode,
				nodedragover : function(e) {
					var n = e.target;
					var source = e.source;
					if ((n.leaf) || source.grid) {
						n.leaf = false;
					} else {
						return true;
					}
					return true;
				},
				beforenodedrop : function(e) {
					var node = e.target;
					if (e.data.grid) {
						var records = e.data.selections;
						var ids = [];
						Ext.each(records, function(r) {
									ids.push(r.get('id'));
								});
						var parentId = node.attributes.id == 'root'
								? ''
								: node.attributes.id;
						this.permission.moveToPermissionGroup({
									parentId : parentId,
									id : ids
								});
					}
				},
				scope : this
			}
		});
	},
	initComponent : function() {
		this.tree = this.createPermissionGroup();
		this.permission = new PermissionPanel({
					region : 'center',
					border : false
				});
		this.grid = this.permission.grid;
		this.items = [this.tree, this.permission];
		PermissionPanelManage.superclass.initComponent.call(this);
	}
});