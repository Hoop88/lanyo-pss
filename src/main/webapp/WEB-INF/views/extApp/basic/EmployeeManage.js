if (typeof Global === "undefined") {
	Global = {};
}

if (!Global.departmentLoader) {
	Global.departmentLoader = new EasyJF.Ext.MemoryTreeLoader({
				iconCls : 'lanyo-tree-node-icon',
				varName : "Global.DEPARTMENT_NODES",
				url : "department.ejf?cmd=getTree&pageSize=-1&treeData=true&all=true",
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
if (typeof RoleList === "undefined") {
	RoleList = Ext.extend(BaseGridList, {
				url : "role.ejf?cmd=list",
				loadData : true,
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
if (typeof PermissionList === "undefined") {
	PermissionList = Ext.extend(BaseGridList, {
				pageSize : 20,
				loadData : true,
				url : "permission.ejf?cmd=list",
				storeMapping : ["id", "name", "description"],
				quickSearch : function() {
					this.grid.store.removeAll();
					this.grid.store.reload({
								params : {
									searchKey : this.btn_search.getValue(),
									start : 0
								}
							});
				},
				initComponent : function() {
					var chkM = new Ext.grid.CheckboxSelectionModel();
					this.gridConfig = {
						sm : chkM
					}, this.cm = new Ext.grid.ColumnModel([chkM, {
								header : "权限名",
								sortable : true,
								width : 60,
								dataIndex : "name"
							}, {
								header : "简介",
								sortable : true,
								width : 100,
								dataIndex : "description"
							}]);
					this.btn_search = new Ext.form.TextField({
								width : 100
							});
					this.tbar = ["关键字:", this.btn_search, {
								text : "查询",
								handler : this.quickSearch,
								scope : this,
								cls : "x-btn-text-icon",
								icon : "images/icon-png/search.png"
							}];
					PermissionList.superclass.initComponent.call(this);
				}
			});
}
if (typeof DeptList === "undefined") {
	DeptList = Ext.extend(BaseGridList, {
				url : "department.ejf?cmd=listAll",
				loadData : true,
				storeMapping : ["id", "title", "sn", "admin", "parent"],
				initComponent : function() {
					var chkM = new Ext.grid.CheckboxSelectionModel();
					this.gridConfig = {
						sm : chkM
					}, this.cm = new Ext.grid.ColumnModel([chkM, {
								header : "名称",
								sortable : true,
								width : 60,
								dataIndex : "title"
							}, {
								header : "编号",
								sortable : true,
								width : 120,
								dataIndex : "sn"
							}, {
								header : "所属部门",
								sortable : true,
								width : 60,
								dataIndex : "parent",
								renderer : EasyJF.Ext.Util
										.objectRender("title")
							}, {
								header : "管理员",
								sortable : true,
								width : 100,
								dataIndex : "admin",
								renderer : EasyJF.Ext.Util
										.objectRender("trueName")
							}])
					DeptList.superclass.initComponent.call(this);
				}
			});
}

/**
 * 员工信息管理
 * 
 * @class EmployeePanel
 * @extends EasyJF.Ext.CrudPanel
 */
EmployeePanel = Ext.extend(EasyJF.Ext.CrudPanel, {
	pageSize : 20,
	baseUrl : "employee.ejf",
	initQueryParameter : {
		status : 1
	},
	// 用户类别数据，主要用来控制数据权限
	typesData : [["普通员工", 0], ["行政专员", 1], ["行政经理", 2], ["市场专员", 4],
			["市场部经理", 5], ["设计助理", 6], ["设计师", 7], ["设计部经理", 8], ["项目经理", 10],
			["项目总监", 11], ["材料专员", 15], ["材料总监", 16], ["客服专员", 20],
			["客服经理", 21], ["预算经理", 25], ["财务人员", 26], ["副总", 30], ["总经理", 31]],
	searchWin : {
		width : 550,
		height : 225,
		title : "高级查询"
	},
	viewWin : {
		width : 800,
		height : 465,
		title : "员工信息"
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
	selectOtherDepts : function() {
		var record = this.grid.getSelectionModel().getSelected();
		if (!this.otherDepts) {
			var treeLoader = new EasyJF.Ext.MemoryTreeLoader({
				preloadChildren : true,
				baseAttrs : {
					checked : false
				},
				iconCls : 'lanyo-tree-node-icon',
				varName : "Global.DEPARTMENT_NODES2",
				url : "department.ejf?cmd=getTree&treeData=true&all=true&checked=true",
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
			var deptGrid = this.deptGrid;
			treeLoader.remoteObject.on("load", function(cd, datas) {
				if (datas) {
					deptGrid.getStore().each(function(record) {
								datas.getNodeById(record.get('id')).checked = true;
							});
				}
			});
			this.otherDepts = new Ext.tree.TreePanel({
						rootVisible : false,
						autoScroll : true,
						listeners : {
							scope : this,
							checkchange : function(node, checked) {
								var fn = function(n) {
									if (n.getUI() && n.getUI().checkbox) {
										n.getUI().checkbox.checked = checked;
										n.attributes.checked = checked;
									}
								};
								node.cascade(fn);
							}
						},
						loader : treeLoader,
						root : new Ext.tree.AsyncTreeNode({
									id : 'root',
									text : '根节点',
									expanded : true
								})
					});
		} else {
			this.otherDepts.getRootNode().cascade(function(node) {
						var ui = node.getUI();
						if (ui && ui.checkbox) {
							var checked = false;
							ui.checkbox.defaultChecked = checked;
							ui.checkbox.checked = checked;
							ui.node.attributes.checked = checked;
						}
					}, this);
		}
		EasyJF.Ext.Window.show({
					width : 400,
					height : 400,
					title : '部门树',
					border : false,
					items : this.otherDepts,
					single : false,
					scope : this,
					buttons : ['yes', 'no'],
					handler : function(btn, win, tree) {
						var t = tree;
						if (btn == 'yes') {
							var arr = t.getChecked('id');
							var nodes = [];
							Ext.each(arr, function(key) {
										var node = this.otherDepts
												.getNodeById(key);
										var attr = node.attributes;
										nodes.push({
													id : attr.id,
													title : attr.text
												});
									}, this);
							this.deptGrid.store.loadData(nodes);
						}
						win.hide();
					}
				});
		this.otherDepts.expandAll();

		this.deptGrid.getStore().each(function(record) {
					var id = record.get('id');
					var node = this.otherDepts.getNodeById(id);
					if (node) {
						var checked = true;
						var ui = node.getUI();
						ui.checkbox.defaultChecked = checked;
						ui.checkbox.checked = checked;
						ui.node.attributes.checked = checked;
					}
				}, this);

	},
	createPermissionPanel : function(loader, checkBox, gridListeners,
			treeBaseConfig, gridName, treeName) {
		var cm = [new Ext.grid.RowNumberer({
							header : "序号",
							width : 40
						}), {
					header : "ID",
					dataIndex : "id",
					hideable : true,
					hidden : true
				}, {
					header : "权限名称",
					dataIndex : "name",
					width : 100
				}];
		if (checkBox)
			cm.unshift(checkBox);
		var gridpanel = new Ext.grid.GridPanel(Ext.apply({
					region : 'center',
					viewConfig : {
						forceFit : true
					},
					sm : checkBox || new Ext.grid.RowSelectionModel(),
					border : false,
					cm : new Ext.grid.ColumnModel(cm),
					store : new Ext.data.JsonStore({
								id : 'id',
								root : "result",
								totalProperty : "rowCount",
								url : 'systemMenu.ejf?cmd=loadPermissions',
								fields : ['id', 'name', 'description']
							})
				}, gridListeners || {}));
		if (gridName)
			this[gridName] = gridpanel;

		var tree = new Ext.tree.TreePanel(Ext.apply({
					region : "west",
					autoScroll : true,
					border : false,
					width : 200,
					margins : '0 2 0 0',
					tools : [{
								id : "refresh",
								handler : function() {
									this[treeName].root.reload();
								},
								scope : this
							}],
					root : new Ext.tree.AsyncTreeNode({
								id : "root",
								text : "所有菜单",
								expanded : true,
								iconCls : 'treeroot-icon',
								loader : loader || Global.platformMenuLoader
							})
				}, treeBaseConfig || {}));
		if (treeName)
			this[treeName] = tree;
		var panel = new Ext.Panel({
					layout : 'border',
					region : 'center',
					border : false,
					hideBorders : true,
					items : [gridpanel, tree]
				});
		panel.grid = gridpanel;
		panel.tree = tree;
		return panel;
	},
	createRolePanel : function() {
		var sm = new Ext.grid.CheckboxSelectionModel();
		this.roleGrid = new Ext.grid.GridPanel({
					sm : sm,
					region : "west",
					width : 350,
					bodyStyle : 'border:none;border-right:2px;',
					viewConfig : {
						forceFit : true
					},
					cm : new Ext.grid.ColumnModel([sm,
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
							})
				});
		this.roleGrid.on('rowclick', function(g, r) {
			var record = g.getStore().getAt(r);
			var grid = this.rolePanel.getComponent(1).getComponent(0);
			var tree = this.rolePanel.getComponent(1).getComponent(1);
			tree.getSelectionModel().select(tree.getRootNode());
			grid.getStore().removeAll();
			Ext.Ajax.request({
						url : 'role.ejf?cmd=loadPermission&other=loadSystemMenuTree',
						params : {
							id : record.get('id')
						},
						success : function(res) {
							var data = Ext.decode(res.responseText);
							if (data) {
								grid.getStore().loadData(data);
								tree.getRootNode().reload();
							}
						},
						scope : this
					});
		}, this);
		var treeBaseConfig = {
			listeners : {
				click : function(node) {
					var grid = this['rolePermissionGrid'];
					if (node.attributes.id == 'root') {
						grid.getStore().clearFilter();
						return;
					}
					Ext.Ajax.request({
						url : 'systemMenu.ejf?cmd=loadPermissions',
						params : {
							systemMenuId : node.attributes.id
						},
						success : function(res) {
							var data = Ext.decode(res.responseText);
							if (data) {
								var datas = data.result;
								grid.getStore().filterBy(function(r) {
											var isexist = false;
											Ext.each(datas, function(o) {
														if (r.get('id') == o.id) {
															isexist = true;
															return false;
														}
													})
											if (isexist) {
												return r;
											}
										});
							} else {
								grid.getStore().filterBy(function() {
										}, this);
							}
						},
						scope : this
					})
				},
				scope : this
			}
		};
		var loader = new Ext.tree.TreeLoader({
					iconCls : 'lanyo-tree-node-icon',
					url : 'role.ejf?cmd=getSystemMenuTree',
					listeners : {
						beforeload : function(treeLoader, node) {
							treeLoader.baseParams = {};
							var o = this.roleGrid.selModel.getSelected();
							if (o) {
								treeLoader.baseParams.roleId = o.get('id');
							} else {
								return false;
							}
							if (node.attributes.id != 'root') {
								treeLoader.baseParams.id = node.attributes.id;
							}
						},
						scope : this
					}
				});
		this.rolePanel = new Ext.Panel({
			layout : 'border',
			title : "用户角色",
			border : false,
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
			}],
			items : [
					this.roleGrid,
					this.createPermissionPanel(loader, null, null,
							treeBaseConfig, "rolePermissionGrid", 'systemMenu')]
		});
		return this.rolePanel;
	},
	createunEditPanel : function() {
		var treeBaseConfig = {
			listeners : {
				click : function(node) {
					var grid = this['disablePermissionsGrid'];
					if (node.attributes.id == 'root') {
						grid.getStore().removeAll();
						grid.getStore().loadData({
							rowCount : this['disablePermissionsGrid'].tempCheck
									.getCount(),
							result : this['disablePermissionsGrid'].tempCheck.items
						});
					} else {
						grid.getStore().removeAll();
						grid.getStore().baseParams = {
							systemMenuId : node.attributes.id
						}
						grid.getStore().load();
					}
				},
				scope : this
			}
		}
		var sm = new Ext.grid.CheckboxSelectionModel({
					listeners : {
						selectionchange : function(sm) {
							var grid = this['disablePermissionsGrid'];
							grid.store.each(function(r) {
										if (sm.isSelected(r)) {
											this['disablePermissionsGrid'].tempCheck
													.add(r.data);
										} else {
											this['disablePermissionsGrid'].tempCheck
													.removeKey(r.get('id'));
										}
									}, this);
						},
						scope : this
					}
				});
		this.disablePanel = new Ext.Panel({
					layout : 'border',
					title : "禁用权限",
					border : false,
					items : [this.createPermissionPanel(
							Global.platformMenuLoader, sm, null,
							treeBaseConfig, "disablePermissionsGrid",
							"disableSystemMenu")]
				});
		this['disablePermissionsGrid'].tempCheck = new Ext.util.MixedCollection();

		this['disablePermissionsGrid'].store.on('datachanged', function() {
					var arr = [];
					var grid = this['disablePermissionsGrid'];
					this['disablePermissionsGrid'].tempCheck.each(function(o) {
								if (grid.getStore().getById(o.id)) {
									arr.push(grid.getStore().getById(o.id));
								}
							}, this);
		(function	() {
						grid.getSelectionModel().selectRecords(arr, true);
					}).defer(1, this)
				}, this);
		return this.disablePanel;
	},
	createEditPanel : function() {
		var treeBaseConfig = {
			listeners : {
				click : function(node) {
					var grid = this.editPanel.getComponent(0).grid;
					if (node.attributes.id == 'root') {
						grid.getStore().removeAll();
						grid.getStore().loadData({
							rowCount : this['extraPermissionGrid'].tempCheck
									.getCount(),
							result : this['extraPermissionGrid'].tempCheck.items
						});
					} else {
						grid.getStore().removeAll();
						grid.getStore().baseParams = {
							systemMenuId : node.attributes.id
						}
						grid.getStore().load();
					}
				},
				scope : this
			}
		}
		var sm = new Ext.grid.CheckboxSelectionModel({
					listeners : {
						selectionchange : function(sm) {
							var grid = this.editPanel.getComponent(0).grid;
							grid.store.each(function(r) {
										if (sm.isSelected(r)) {
											this['extraPermissionGrid'].tempCheck
													.add(r.data);
										} else {
											this['extraPermissionGrid'].tempCheck
													.removeKey(r.get('id'));
										}
									}, this);
						},
						scope : this
					}
				});
		this.editPanel = new Ext.Panel({
					layout : 'border',
					title : "额外权限",
					border : false,
					items : [this.createPermissionPanel(
							Global.platformMenuLoader, sm, null,
							treeBaseConfig, 'extraPermissionGrid',
							'extraSystemMenu')]
				});
		this['extraPermissionGrid'].tempCheck = new Ext.util.MixedCollection();

		this['extraPermissionGrid'].store.on('datachanged', function() {
					var arr = [];
					var grid = this['extraPermissionGrid'];
					this['extraPermissionGrid'].tempCheck.each(function(o) {
								if (grid.getStore().getById(o.id)) {
									arr.push(grid.getStore().getById(o.id));
								}
							}, this);
		(function	() {
						grid.getSelectionModel().selectRecords(arr, true);
					}).defer(1, this)
				}, this);
		return this.editPanel;
	},
	createForm : function() {
		var sm = new Ext.grid.CheckboxSelectionModel();
		this.deptGrid = new Ext.grid.GridPanel({
					title : '额外部门',
					sm : sm,
					region : "west",
					width : 250,
					viewConfig : {
						forceFit : true
					},
					cm : new Ext.grid.ColumnModel([sm,
							new Ext.grid.RowNumberer({
										header : "序号",
										width : 40
									}), {
								header : "ID",
								dataIndex : "id",
								hideable : true,
								hidden : true
							}, {
								header : "部门名称",
								sortable : true,
								width : 70,
								dataIndex : "title"
							}, {
								header : "所属部门",
								sortable : true,
								width : 70,
								dataIndex : "parent",
								renderer : this.objectRender("title")
							}, {
								header : "部门管理员",
								sortable : true,
								width : 100,
								dataIndex : "admin",
								renderer : this.objectRender("trueName")
							}]),
					store : new Ext.data.JsonStore({
								fields : ["id", "sn", "title", "admin", "path"]
							}),
					bbar : [{
								text : "添加部门",
								cls : "x-btn-text-icon",
								icon : "images/icons/application_form_add.png",
								handler : this.selectOtherDepts,
								scope : this
							}, {
								text : "删除部门",
								cls : "x-btn-text-icon",
								icon : "images/icons/application_form_delete.png",
								handler : function() {
									EasyJF.Ext.Util
											.removeGridRows(this.deptGrid);
								},
								scope : this
							}]
				});
		var formPanel = new Ext.form.FormPanel({
			labelWidth : 80,
			labelAlign : 'right',
			border : false,
			items : [{
						xtype : "hidden",
						name : "id"
					}, {
						height : 168,
						labelWidth : 70,
						frame : true,
						border : false,
						items : {
							title : "基本信息",
							xtype : 'fieldset',
							items : EasyJF.Ext.Util.buildColumnForm({
										fieldLabel : "用户名称",
										name : "name",
										allowBlank : false
									}, {
										fieldLabel : "密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码",
										name : "password",
										inputType : "password",
										allowBlank : false
									}, {
										fieldLabel : "真实姓名",
										name : "trueName",
										allowBlank : false
									}, Ext.apply({
												allowBlank : false
											}, ConfigConst.BASE.sex), {
										fieldLabel : "联系电话",
										name : "tel",
										allowBlank : false
									}, {
										fieldLabel : "电子邮件",
										name : "email",
										allowBlank : false
									}, {
										xtype : "treecombo",
										fieldLabel : "部&#8195;&#8195;门",
										displayField : "name",
										name : "dept",
										allowBlank : false,
										hiddenName : "dept",
										tree : new Ext.tree.TreePanel({
											border : false,
											rootVisible : false,
											root : new Ext.tree.AsyncTreeNode({
												id : "root",
												text : "选择部门",
												expanded : true,
												loader : Global.departmentLoader
											})
										})
									}, EasyJF.Ext.Util.buildCombox(
											"workerOnly", "系统用户", [
													["是", false], ["否", true]],
											false))
						}
					}, {
						xtype : "panel",
						// title : "权限资源",
						anchor : "100%",
						height : 236,
						border : false,
						layout : "fit",
						cls : 'x-plain',
						items : {
							xtype : "tabpanel",
							deferredRender : false,
							hideBorders : true,
							activeTab : 0,
							border : false,
							items : [this.createRolePanel(), this.deptGrid,
									this.createEditPanel(),
									this.createunEditPanel()]
						}
					}]
		});
		return formPanel;
	},
	searchFormPanel : function() {
		var formPanel = new Ext.form.FormPanel({
			frame : true,
			labelWidth : 80,
			labelAlign : "right",
			items : [{
				xtype : "fieldset",
				title : "查询条件",
				height : 140,
				layout : 'column',
				items : [{
							columnWidth : .50,
							layout : 'form',
							defaultType : 'textfield',
							defaults : {
								anchor : '-20'
							},
							items : [{
										fieldLabel : "用户名称",
										name : "name"

									}, {
										fieldLabel : "真实姓名",
										name : "trueName"
									}, {
										fieldLabel : "联系电话",
										name : "tel"
									}, {
										fieldLabel : "输入日期(始)",
										name : "inputStartTime",
										xtype : 'datefield',
										format : 'Y-m-d'
									}]
						}, {
							columnWidth : .50,
							layout : 'form',
							defaultType : 'textfield',
							defaults : {
								width : 130
							},
							items : [{
										fieldLabel : "电子邮件",
										name : "email",
										anchor : '90%'
									}, {
										fieldLabel : "合同编码",
										name : "contractNo",
										anchor : '90%'
									}, {
										xtype : "treecombo",
										fieldLabel : "部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门",
										displayField : "title",
										name : "deptId",
										hiddenName : "deptId",
										anchor : '90%',
										tree : new Ext.tree.TreePanel({
											root : new Ext.tree.AsyncTreeNode({
												id : "root",
												text : "选择部门",
												expanded : true,
												loader : Global.departmentLoader
											})
										})
									}, {
										fieldLabel : "输入日期(末)",
										name : "inputEndTime",
										anchor : '90%',
										xtype : 'datefield',
										format : 'Y-m-d'
									}]
						}]
			}]
		});
		return formPanel;
	},
	gridStoreRemoveAll : function() {
		var gs = Array.prototype.slice.call(arguments, 0);
		Ext.each(gs, function(g) {
					if (Ext.type('string') && this[g])
						this[g].store.removeAll();
					else if (Ext.type('object')) {
						g.store.removeAll();
					}
				}, this)
	},
	onView : function() {
		this.fp.findByType('tabpanel')[0].setActiveTab(0);
	},
	onCreate : function() {
		this.fp.findByType('tabpanel')[0].setActiveTab(0);
		this['extraPermissionGrid'].tempCheck.clear();
		this['disablePermissionsGrid'].tempCheck.clear();
		this.gridStoreRemoveAll('extraPermissionGrid',
				'disablePermissionsGrid', 'rolePermissionGrid', this.roleGrid,
				this.deptGrid);
		this.fp.form.findField("password").el.dom.readOnly = false;
	},
	onEdit : function(ret) {
		this.fp.findByType('tabpanel')[0].setActiveTab(0);
		this['extraPermissionGrid'].tempCheck.clear();
		this['disablePermissionsGrid'].tempCheck.clear();
		var record = this.grid.getSelectionModel().getSelected();
		if (ret) {
			this.gridStoreRemoveAll('extraPermissionGrid',
					'disablePermissionsGrid', 'rolePermissionGrid',
					this.roleGrid, this.deptGrid);
			if (record && record.get('permissions')) {
				this['extraPermissionGrid'].tempCheck.addAll(record
						.get('permissions'));
				this['extraPermissionGrid'].store.loadData({
							rowCount : record.get('permissions').length,
							result : record.get('permissions')
						});
			}
			if (record && record.get('disablePermissions')) {
				this['disablePermissionsGrid'].tempCheck.addAll(record
						.get('disablePermissions'));
				this['disablePermissionsGrid'].store.loadData({
							rowCount : record.get('disablePermissions').length,
							result : record.get('disablePermissions')
						});
			}
			this.roleGrid.store.loadData(this.grid.getSelectionModel()
					.getSelected().get("roles")
					|| {});
			this.deptGrid.store.loadData(this.grid.getSelectionModel()
					.getSelected().get("otherDepts")
					|| {});
			this.fp.form.findField("password").el.dom.readOnly = true;
		}
		return ret;
	},
	getGridValue : function(grid) {
		var s = "";
		for (var i = 0; i < grid.store.getCount(); i++) {
			var r = grid.store.getAt(i);
			s += r.get("id") + ",";
		}
		return s;
	},
	save : function() {
		var arr = [];
		this.deptGrid.getStore().each(function(record) {
					arr = arr.concat(record.get('path'));
				}, this);
		this.fp.form.baseParams = {
			permissions : this['extraPermissionGrid'].tempCheck.keys.join(','),
			disablePermissions : this['disablePermissionsGrid'].tempCheck.keys
					.join(','),
			roles : this.getGridValue(this.roleGrid),
			otherDepts : this.getGridValue(this.deptGrid),
			otherDeptPath : arr.distinct(true).join(',')
		};
		EmployeePanel.superclass.save.call(this);
	},
	createWin : function(callback, autoClose) {
		return this.initWin(800, 465, "员工信息", callback, autoClose);
	},
	deptRender : function(v) {
		return v ? v.name : "$!{lang.get('Unknown')}";
	},
	statusRender : function(v) {
		if (v == -1)
			return "<font color='red'>禁用</font>";
		else
			return "正常";
	},
	doLoadAll : function() {
		this.store.load({});
	},
	filterData : function(item, e) {
		var name = item.parentMenu.name;
		var fv = item.filterValue;
		this.store.baseParams = {};
		this.store.baseParams[name] = fv;
		this.refresh(false);
	},
	storeMapping : ["id", "name", "trueName", "otherDepts", "email", "dept",
			"contractNo", "duty", "password", "tel", "registerTime", "sn", {
				name : "deptId",
				mapping : "dept"
			}, "status", "sex", "workerOnly", "roles", "permissions",
			"disablePermissions"],
	initComponent : function() {
		this.cm = new Ext.grid.ColumnModel([{
					header : "用户名",
					sortable : true,
					width : 100,
					dataIndex : "name"
				}, {
					header : "姓名",
					sortable : true,
					width : 100,
					dataIndex : "trueName"
				}, {
					header : "部门",
					sortable : true,
					width : 100,
					dataIndex : "dept",
					renderer : this.deptRender
				}, {
					header : "编码(系统生成)",
					sortable : true,
					hidden : true,
					width : 100,
					dataIndex : "sn"
				}, {
					header : "电子邮件",
					sortable : true,
					width : 100,
					dataIndex : "email"
				}, {
					header : "电话",
					sortable : true,
					width : 100,
					dataIndex : "tel"
				}, {
					header : "注册时间",
					sortable : true,
					width : 100,
					dataIndex : "registerTime",
					renderer : this.dateRender()
				}, {
					header : "状态",
					sortable : true,
					width : 50,
					dataIndex : "status",
					align : 'center',
					renderer : this.statusRender
				}]);
		var filterGroup = Ext.id(null, 'filterGroup');
		this.gridButtons = ["-", {
					text : "禁用/启用",
					cls : "x-btn-text-icon",
					icon : "images/core/up.gif",
					handler : this.executeCmd("changeStatus"),
					scope : this
				}, {
					text : "数据过滤",
					cls : "x-btn-text-icon",
					icon : "images/core/21.gif",
					// 已启用，显示全部。 默认显示已启用
					menu : {
						name : 'status',
						listeners : {
							scope : this,
							itemclick : this.filterData
						},
						toggleGroup : true,
						items : [{
									text : '已启用',
									filterValue : 1,
									checked : true,
									group : filterGroup
								}, {
									text : '显示全部',
									filterValue : null,
									checked : false,
									group : filterGroup
								}]
					},
					scope : this
				}, {
					text : "重置密码",
					cls : "x-btn-text-icon",
					icon : "images/core/23.gif",
					handler : this.executeCmd("initializePassword"),
					scope : this
				}];
		EmployeePanel.superclass.initComponent.call(this);
	},
	openAdvSetting : function() {
		var record = this.grid.getSelectionModel().getSelected();
		if (!this.employeeAdvSettingPanel) {
			this.employeeAdvSettingPanel = new EmployeeAdvSettingPanel({
						employee : record.get("id")
					});
			this.employeeAdvSettingWin = new Ext.Window({
						width : 550,
						height : 380,
						modal : true,
						layout : 'fit',
						constrain : true,
						buttonAlign : 'center',
						closeAction : 'hide'
					});
			this.employeeAdvSettingWin.add(this.employeeAdvSettingPanel);
		}
		this.employeeAdvSettingWin.setTitle("高级设置-" + record.get("trueName"));
		this.employeeAdvSettingPanel.employeeId = record.get("id");
		this.employeeAdvSettingWin.show();
		this.employeeAdvSettingPanel.load();
	}
});
EmployeeManagePanel = Ext.extend(Ext.Panel, {
			layout : 'border',
			border : false,
			hideBorders : true,
			clickDeptNode : function(node) {
				var id = node.attributes.id == 'root' ? '' : node.attributes.id;
				var grid = this.crudListPanel.grid;
				grid.getStore().baseParams = {
					deptId : id
				};
				this.crudListPanel.refresh(false);
			},
			createDeptTree : function() {
				return new Ext.tree.TreePanel({
							title : '部门',
							region : 'west',
							border : false,
							width : 200,
							// rootVisible:false,
							autoScroll : true,
							tools : [{
								id : "refresh",
								handler : function() {
									Global.departmentLoader.remoteObject
											.clearData();
									this.deptTree.root.reload();
								},
								scope : this
							}],
							root : new Ext.tree.AsyncTreeNode({
										id : "root",
										text : "所有部门",
										expanded : true,
										iconCls : 'treeroot-icon',
										loader : Global.departmentLoader
									}),
							listeners : {
								scope : this,
								click : this.clickDeptNode
							}
						});
			},
			initComponent : function() {
				this.deptTree = this.createDeptTree();
				this.crudListPanel = new EmployeePanel({
							margins : '0 0 0 5',
							region : 'center'
						});
				this.items = [this.deptTree, this.crudListPanel];
				EmployeeManagePanel.superclass.initComponent.call(this);
			}
		});