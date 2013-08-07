if (typeof Global === "undefined") {
	Global = {
		departmentLoader : new Ext.tree.TreeLoader({
					url : "department.ejf?cmd=getDepartment&pageSize=-1&treeData=true",
					listeners : {
						'beforeload' : function(treeLoader, node) {
							treeLoader.baseParams.id = (node.id.indexOf('root') < 0
									? node.id
									: "");
						}
					}
				})
	}
}
if (typeof RoleList === "undefined") {
	RoleList = Ext.extend(BaseGridList, {
				pagingToolbar : false,
				storeMapping : ["id", "name", "title", "description"],
				initComponent : function() {
					this.cm = new Ext.grid.ColumnModel([{
								header : "编码",
								sortable : true,
								width : 60,
								dataIndex : "name"
							}, {
								header : "名称",
								sortable : true,
								width : 100,
								dataIndex : "title"
							}])
					RoleList.superclass.initComponent.call(this);
				}
			});
}
// 权限列表
PermissionList = Ext.extend(BaseGridList, {
			pagingToolbar : false,
			storeMapping : ["id", "name", "description"],
			initComponent : function() {
				this.cm = new Ext.grid.ColumnModel([{
							header : "权限名",
							sortable : true,
							width : 60,
							dataIndex : "name"
						}, {
							header : "简介",
							sortable : true,
							width : 100,
							dataIndex : "description"
						}])
				PermissionList.superclass.initComponent.call(this);
			}
		});

/**
 * 员工信息管理
 * 
 * @class SystemUserPanel
 * @extends EasyJF.Ext.CrudPanel
 */
SystemUserPanel = Ext.extend(EasyJF.Ext.CrudPanel, {
	pageSize : 17,
	baseUrl : "systemUser.ejf",
	createForm : function() {
		if (!this.resourceGrid) {
			this.resourceGrid = new PermissionList({
						title : "可选权限",
						columnWidth : .5,
						height : 150,
						border : false,
						url : "permission.ejf?cmd=list&pageSize=-1"
					});
		}
		if (!this.selectGrid) {
			this.selectGrid = new PermissionList({
						title : "已选权限",
						columnWidth : .5,
						height : 150,
						border : false,
						url : "employee.ejf?cmd=loadPermission"
					});
			this.resourceGrid.grid.on("rowdblclick", this.choiceItem
							.createDelegate(this, [this.resourceGrid,
											this.selectGrid]), this);
			this.selectGrid.grid.on("rowdblclick", this.choiceItem
							.createDelegate(this, [this.selectGrid,
											this.resourceGrid]), this);
		}
		if (!this.resourceRoleGrid) {
			this.resourceRoleGrid = new RoleList({
						title : "可选角色",
						columnWidth : .5,
						height : 180,
						border : false,
						url : "role.ejf?cmd=list&pageSize=-1"
					});
		}
		if (!this.selectRoleGrid) {
			this.selectRoleGrid = new RoleList({
						title : "已选角色",
						columnWidth : .5,
						height : 180,
						border : false,
						url : "employee.ejf?cmd=loadRole"
					});
			this.resourceRoleGrid.grid.on("rowdblclick", this.choiceItem
							.createDelegate(this, [this.resourceRoleGrid,
											this.selectRoleGrid]), this);
			this.selectRoleGrid.grid.on("rowdblclick", this.choiceItem
							.createDelegate(this, [this.selectRoleGrid,
											this.resourceRoleGrid]), this);
		}
		var formPanel = new Ext.form.FormPanel({
			frame : true,
			labelWidth : 80,
			labelAlign : 'right',
			defaults : {
				width : 320,
				xtype : "textfield"
			},
			items : [{
						xtype : "hidden",
						name : "id"
					}, {
						xtype : "hidden",
						name : "roles"
					}, {
						xtype : "hidden",
						name : "permissions"
					}, {
						xtype : "fieldset",
						title : "基本信息",
						labelWidth : 70,
						autoWidth : true,
						height : 150,
						items : [EasyJF.Ext.Util.twoColumnPanelBuild({
									fieldLabel : "用户名称",
									name : "name"
								}, {
									fieldLabel : "密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码",
									name : "password",
									inputType : "password"
								}, {
									fieldLabel : "真实姓名",
									name : "trueName"
								}, {
									fieldLabel : "联系电话",
									name : "tel"
								},

								{
									fieldLabel : "电子邮件",
									name : "email"
								}, {
									fieldLabel : "IM",
									name : "im"
								}), {
							xtype : "textarea",
							anchor : "99%",
							fieldLabel : "备注",
							name : "remark"
						}]
					}, {
						xtype : "fieldset",
						title : "用户角色/权限",
						width : 576,
						height : 250,
						layout : "fit",
						items : {
							xtype : "tabpanel",
							activeTab : 0,
							deferredRender : false,
							listeners : {
								"tabchange" : function(p, tab) {
									tab.doLayout();
								}
							},
							items : [{
								title : "角色",
								layout : "fit",
								items : {
									layout : "column",
									items : [this.resourceRoleGrid, {
										width : 60,
										height : 200,
										frame : true,
										items : [{
													height : 35
												}, {
													xtype : "button",
													text : "添加",

													handler : this.choiceItem
															.createDelegate(
																	this,
																	[
																			this.resourceRoleGrid,
																			this.selectRoleGrid]),
													scope : this
												}, {
													height : 15
												}, {
													xtype : "button",
													text : "删除",
													handler : this.choiceItem
															.createDelegate(
																	this,
																	[
																			this.selectRoleGrid,
																			this.resourceRoleGrid]),
													scope : this
												}]
									}, this.selectRoleGrid]
								}
							}, {
								title : "额外权限",
								layout : "fit",
								items : {
									layout : "column",
									items : [this.resourceGrid, {
										width : 60,
										height : 180,
										frame : true,
										bodyStyle : 'padding-left:2px',
										items : [{
													height : 35
												}, {
													xtype : "button",
													text : "添加",
													handler : this.choiceItem
															.createDelegate(
																	this,
																	[
																			this.resourceGrid,
																			this.selectGrid]),
													scope : this
												}, {
													height : 15
												}, {
													xtype : "button",
													text : "删除",
													handler : this.choiceItem
															.createDelegate(
																	this,
																	[
																			this.selectGrid,
																			this.resourceGrid]),
													scope : this
												}]
									}, this.selectGrid]
								}
							}]
						}
					}]
		});
		return formPanel;
	},
	choiceItem : function(source, target) {
		var records = source.grid.getSelectionModel().getSelections();
		if (!records || records.length < 1) {
			Ext.Msg.alert("$!{lang.get('Prompt')}",
					"$!{lang.get('Select first')}");
			return false;
		}
		for (var i = 0; i < records.length; i++) {
			source.store.remove(records[i]);
		}
		try {
			target.store.add(records);
		} catch (e) {
		}
	},
	create : function() {
		SystemUserPanel.superclass.create.call(this);
		this.resourceGrid.store.load();
		this.resourceRoleGrid.store.load();
		if (this.selectGrid.store.getCount() > 0)
			this.selectGrid.store.removeAll();
		if (this.selectRoleGrid.store.getCount() > 0)
			this.selectRoleGrid.store.removeAll();
		this.fp.form.findField("password").el.dom.readOnly = false;
	},
	loadGrid : function(source, target) {
		source.store.load();
		target.store.load({
					params : "id="
							+ this.grid.getSelectionModel().getSelected()
									.get("id"),
					callback : function() {
						try {
							for (var i = 0; i < target.store.getCount(); i++) {
								var r = target.store.getAt(i);
								source.store.remove(source.store.getById(r
										.get("id")));
							}
						} catch (e) {
						}// 有可能回调会出错
					},
					scope : this
				});
	},
	edit : function() {
		var ret = SystemUserPanel.superclass.edit.call(this);
		if (ret) {
			if (this.selectGrid.store.getCount() > 0)
				this.selectGrid.store.removeAll();
			if (this.selectRoleGrid.store.getCount() > 0)
				this.selectRoleGrid.store.removeAll();
			this.loadGrid(this.resourceGrid, this.selectGrid);
			this.loadGrid(this.resourceRoleGrid, this.selectRoleGrid);
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
		this.fp.form.findField("permissions").setValue(this
				.getGridValue(this.selectGrid));
		this.fp.form.findField("roles").setValue(this
				.getGridValue(this.selectRoleGrid));
		SystemUserPanel.superclass.save.call(this);
	},
	createWin : function() {
		return this.initWin(600, 480, "员工信息管理");
	},
	deptRender : function(v) {
		return v ? v.title : "$!{lang.get('Unknown')}";
	},
	storeMapping : ["id", "name", "trueName", "tel", "email", "lastLoginTime",
			"lastLoginIP", "loginTimes", "remark", "password", "tel",
			"registerTime", "remark", "status"],
	initComponent : function() {
		this.cm = new Ext.grid.ColumnModel([{
					header : "用户名",
					sortable : true,
					width : 60,
					dataIndex : "name"
				}, {
					header : "姓名",
					sortable : true,
					width : 60,
					dataIndex : "trueName"
				}, {
					header : "电子邮件",
					sortable : true,
					width : 80,
					dataIndex : "email"
				}, {
					header : "电话",
					sortable : true,
					width : 60,
					dataIndex : "tel"
				}, {
					header : "上次登录",
					sortable : true,
					width : 80,
					dataIndex : "lastLoginTime",
					renderer : this.dateRender()
				}, {
					header : "登录IP",
					sortable : true,
					width : 100,
					dataIndex : "lastLoginIP"
				}, {
					header : "登录次数",
					sortable : true,
					width : 60,
					dataIndex : "loginTimes"
				}, {
					header : "状态",
					sortable : true,
					width : 40,
					dataIndex : "status",
					renderer : this.dateRender()
				}, {
					header : "备注",
					sortable : true,
					width : 60,
					dataIndex : "remark"
				}]);
		this.gridButtons = [{
					text : "初始化密码",
					cls : "x-btn-text-icon",
					icon : "images/core/intro.png",
					handler : this.executeCmd("initializePassword"),
					scope : this
				}];
		SystemUserPanel.superclass.initComponent.call(this);
	}
});