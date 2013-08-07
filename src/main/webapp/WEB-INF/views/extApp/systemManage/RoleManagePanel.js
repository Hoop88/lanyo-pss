if (typeof Global === "undefined") {
	Global = {};
}
if (!Global.systemRoleLoader) {
	Global.systemRoleLoader = new Ext.tree.TreeLoader({
				// varName:"Global.SYSTEM_ROLE_NODES",
				url : "role.ejf?cmd=getTree&pageSize=-1&treeData=true&all=true",
				iconCls : 'lanyo-tree-node-icon',
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
				varName : "Global.PLATFORM_MENU_NODES",
				iconCls : 'lanyo-tree-node-icon',
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
// 权限列表
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

// 角色管理
RolePanel = Ext.extend(EasyJF.Ext.CrudPanel, {
	id : "rolePanel",
	// title : "系统角色管理",
	baseUrl : "role.ejf",
	theStatus : [["启用", 0], ["停用", -1]],
	pageSize : 15,
	importData : true,
	exportData : true,
	choicePermission : function() {
		if (!this.selectWin) {
			this.selectWin = new EasyJF.Ext.GridSelectWin({
						title : "选择权限",
						grid : new PermissionList()
					});
			this.selectWin.on("select", function(datas) {
						var ds = [];
						for (var i = 0; i < datas.length; i++) {// 过滤掉重复的内容
							if (this.editGrid.store.find("id", datas[i].id) < 0)
								ds[ds.length] = datas[i];
						}
						this.editGrid.store.loadData(ds, true);
					}, this);
		}
		this.selectWin.show();
	},
	autoCheckEditGrid : function(store) {
		var arr = [];
		this.editGrid.tempCheck.each(function(o) {
					if (this.editGrid.getStore().getById(o.id)) {
						arr.push(this.editGrid.getStore().getById(o.id));
					}
				}, this);

(function() {
			this.editGrid.getSelectionModel().selectRecords(arr, true);
		}).defer(1, this);
	},
	saveTempCheck : function() {
		var sm = this.editGrid.getSelectionModel();
		if (this.editGrid.getStore().getCount()) {
			var node = this.sysMenuTree.getSelectionModel().getSelectedNode();
			var text = node.text;
			if (node.id != 'root') {
				if (!sm.hasSelection()) {
					node.setText(text.replace('&#8730;', ''));
				} else {
					if (text.indexOf('&#8730;') < 0) {
						node.setText(text += '&#8730;');
					}
				}
			}
		}
		this.editGrid.store.each(function(r) {
					if (sm.isSelected(r)) {
						this.editGrid.tempCheck.add(r.data);
					} else {
						this.editGrid.tempCheck.removeKey(r.get('id'));
					}
				}, this);
	},
	createForm : function() {
		var chkM = new Ext.grid.CheckboxSelectionModel({
			dataIndex : 'id',
			handleMouseDown : Ext.emptyFn,
			onHdMouseDown : function(e, t) {
				if (t.className == 'x-grid3-hd-checker') {
					e.stopEvent();
					var hd = Ext.fly(t.parentNode);
					var isChecked = hd.hasClass('x-grid3-hd-checker-on');
					if (isChecked) {
						hd.removeClass('x-grid3-hd-checker-on');
						this.clearSelections();
					} else {
						hd.addClass('x-grid3-hd-checker-on');
						this.grid.store.each(function(s, i) {
									if (!s.isParent) {
										this.selectRow(i, true);
										return s;
									}
								}, this);
					}
				}
			},
			renderer : (function(v, p, record) {
				var r = this.grid.getSelectionModel().getSelected();
				if (r) {
					var allPermissions = r.get('allPermissions');
					var permissions = r.get('permissions');
					if (Ext.isArray(allPermissions) && Ext.isArray(permissions)) {
						var isExist = false;
						var isAllExist = false;
						var length = Math.min(allPermissions.length,
								permissions.length);
						if (length == 0) {
							length = Math.max(allPermissions.length,
									permissions.length);
						}
						for (var i = 0, allLen = allPermissions.length, Len = permissions.length; i < length; i++) {
							if (i < Len && permissions[i].id == v) {
								isExist = true;
							}
							if (i < allLen && allPermissions[i].id == v) {
								isAllExist = true;
							}
							if (isExist && isAllExist) {
								break;
							}
						}
						if (!isExist && isAllExist) {
							record.isParent = true;
							// 假裝選中
							return '<div class="x-grid3-row-checker x-item-disabled" style="background-position:-23px 2px;">&#160;</div>';
						}
					}
				}
				return '<div class="x-grid3-row-checker">&#160;</div>';
			}).createDelegate(this),
			listeners : {
				selectionchange : this.saveTempCheck,
				scope : this
			}
		});
		this.editGrid = new Ext.grid.GridPanel({
			// title:"客服人员",
			sm : chkM,
			region : 'center',
			viewConfig : {
				forceFit : true
			},
			cm : new Ext.grid.ColumnModel([chkM, new Ext.grid.RowNumberer({
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
						width : 100,
						renderer : (function(v, p, record) {
							var r = this.grid.getSelectionModel().getSelected();
							if (r) {
								var allPermissions = r.get('allPermissions');
								var permissions = r.get('permissions');
								if (Ext.isArray(allPermissions)
										&& Ext.isArray(permissions)) {
									var isExist = false;
									var isAllExist = false;
									var length = Math.min(
											allPermissions.length,
											permissions.length);
									if (length == 0) {
										length = Math.max(
												allPermissions.length,
												permissions.length);
									}
									for (var i = 0, allLen = allPermissions.length, Len = permissions.length; i < length; i++) {
										if (i < Len
												&& permissions[i].id == record
														.get('id')) {
											isExist = true;
										}
										if (i < allLen
												&& allPermissions[i].id == record
														.get('id')) {
											isAllExist = true;
										}
										if (isExist && isAllExist) {
											break;
										}
									}
									if (!isExist && isAllExist) {
										record.isParent = true;
										return "<div><span style='float:left'>"
												+ v
												+ "&emsp;&emsp;&emsp;</span><span style='color:#0000FF;float:right'>父级权限&emsp;&uarr;&emsp;</span></div>";
									}
								}
							}
							return v
						}).createDelegate(this)
					}
			// {header:"简介",dataIndex:"description",width:300}
			]),
			store : new Ext.data.JsonStore({
						id : 'id',
						root : "result",
						totalProperty : "rowCount",
						url : 'systemMenu.ejf?cmd=loadPermissions',
						fields : ['id', 'name', 'description'],
						listeners : {
							datachanged : this.autoCheckEditGrid,
							scope : this
						}
					})
				// bbar:[{text:"添加权限",cls : "x-btn-text-icon",
				// icon :
				// "images/icons/application_form_add.png",handler:this.choicePermission,scope:this},{text:"删除权限",cls
				// : "x-btn-text-icon",
				// icon :
				// "images/icons/application_form_delete.png",handler:function(){EasyJF.Ext.Util.removeGridRows(this.editGrid);},scope:this}]
		});
		this.editGrid.tempCheck = new Ext.util.MixedCollection();
		var formPanel = new Ext.form.FormPanel({
			// frame : true,
			labelWidth : 60,
			labelAlign : 'right',
			bodyStyle : 'padding:5px;',
			items : [{
						xtype : "hidden",
						name : "id"
					}, {
						xtype : "fieldset",
						title : "基本信息",
						anchor : "-1",
						autoHeight : true,
						items : [EasyJF.Ext.Util.twoColumnPanelBuild({
									xtype : "textfield",
									fieldLabel : '角色名称',
									name : 'title',
									width : 150
								}, {
									xtype : "textfield",
									fieldLabel : '角色编码',
									name : 'name',
									width : 150
								}, {
									xtype : "treecombo",
									fieldLabel : "父角色",
									name : "parent",
									hiddenName : "parent",
									displayField : "title",
									valueField : "id",
									width : 150,
									tree : new Ext.tree.TreePanel({
										autoScroll : true,
										root : new Ext.tree.AsyncTreeNode({
													id : "root",
													text : "所有角色",
													icon : "images/system/root.gif",
													expanded : true,
													loader : Global.systemRoleLoader
												})
									})
								}, EasyJF.Ext.Util.buildCombox("status", "状态",
										this.theStatus, 0)), {
							anchor : "-20",
							height : 50,
							xtype : "textarea",
							fieldLabel : "简介",
							allowBlank : false,
							name : 'description'
						}]
					}, {
						xtype : "fieldset",
						title : "权限",
						anchor : "-1",
						height : 275,
						layout : "border",
						items : [this.createSysMenuTree(), this.editGrid]
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
		this.sysMenuTree.getRootNode().removeAll(true);
		this.editGrid.tempCheck.clear();
		this.editGrid.store.removeAll();
		this.fp.form.findField("parent").setOriginalValue(this.parent);
	},
	onEdit : function(ret) {
		this.sysMenuTree.getRootNode().select();
		this.sysMenuTree.getRootNode().reload();
		this.editGrid.tempCheck.clear();
		if (ret) {
			var items = this.grid.getSelectionModel().getSelected()
					.get("permissions")
			this.editGrid.store.removeAll();
			if (items) {
				Ext.each(items, function(r) {
							this.editGrid.tempCheck.add(r);
						}, this);
				this.editGrid.store.loadData({
							rowCount : items.length,
							result : items
						});
			}
		}
	},
	save : function(callback, autoClose) {
		/*
		 * var s = ""; for (var i = 0; i < this.editGrid.store.getCount(); i++) {
		 * var r = this.editGrid.store.getAt(i); s += r.get("id") + ","; }
		 */
		this.fp.form.baseParams = {
			permissions : this.editGrid.tempCheck.keys.join(',')
		};
		RolePanel.superclass.save.call(this, callback, autoClose);
	},
	onSave : function() {// 保存过后
		// var parentObj=this.fp.form.findField("parent");
		this.reloadTree();
		/*
		 * var reloadTree=this.reloadTree.createDelegate(this);
		 * Global.systemRoleLoader.remoteObject.load(function(){ reloadTree();
		 * if(parentObj&&parentObj.tree.rendered)parentObj.tree.root.reload();
		 * });
		 */
	},
	loadSystemMenu : function(node, e) {
		if (node.attributes.id == 'root') {
			this.editGrid.getStore().removeAll();
			this.editGrid.getStore().loadData({
						rowCount : this.editGrid.tempCheck.getCount(),
						result : this.editGrid.tempCheck.items
					});
		} else {
			this.editGrid.getStore().removeAll();
			this.editGrid.getStore().baseParams = {
				systemMenuId : node.attributes.id
			}
			this.editGrid.getStore().load();
		}
	},
	createSysMenuTree : function() {
		this.sysMenuTree = new Ext.tree.TreePanel({
			title : "菜单树",
			region : "west",
			autoScroll : true,
			rootVisible : false,
			width : 200,
			tools : [{
						id : "refresh",
						handler : function() {
							this.sysMenuTree.root.reload();
						},
						scope : this
					}],
			root : new Ext.tree.AsyncTreeNode({
				id : "root",
				text : "所有菜单",
				icon : "images/system/root.gif",
				expanded : true,
				loader : new Ext.tree.TreeLoader({
							url : 'role.ejf?cmd=getSystemMenuTree',
							listeners : {
								beforeload : function(treeLoader, node) {
									treeLoader.baseParams = {};
									var id = this.fp.form.findField('id')
											.getValue();
									if (id) {
										treeLoader.baseParams.roleId = id;
									} else {
										return false;
									}
									if (node.attributes.id != 'root') {
										treeLoader.baseParams.id = node.attributes.id;
									}
								},
								scope : this
							}
						})
			}),
			listeners : {
				click : this.loadSystemMenu,
				scope : this
			}
		});
		return this.sysMenuTree;
	},
	reloadTree : function() {
		this.tree.getRootNode().reload();
		/*
		 * if (this.tree) { var p =
		 * this.tree.getSelectionModel().getSelectedNode(); if (p &&
		 * p.parentNode) p = p.parentNode; else p = this.tree.root; if (p &&
		 * p.reload)p.reload(); }
		 */
	},
	createWin : function(callback, autoClose) {
		return this.initWin(738, 510, "系统角色", callback, autoClose);
	},
	storeMapping : ["id", "name", "title", "description", "allPermissions",
			"permissions", "users", "status", "parent"],
	reCalSystemRole : function() {
		var record = this.grid.getSelectionModel().getSelected();
		if (!record) {
			Ext.Msg.alert("提示信息", "请选择要重新计算的角色！");
			return false;
		} else {
			Ext.Ajax.request({
						url : "securityHelper.ejf",
						params : {
							cmd : "reCalSystemRole",
							id : record.get("id")
						},
						scope : this,
						success : function(req) {
							Ext.Msg.alert("提示信息", "完成重新计算！");
						}
					})
		}
	},
	initComponent : function() {
		this.cm = new Ext.grid.ColumnModel([{
					header : "角色名称",
					sortable : true,
					width : 100,
					dataIndex : "title"
				}, {
					header : "角色编码",
					sortable : true,
					width : 120,
					dataIndex : "name"
				}, {
					header : "父角色",
					sortable : true,
					width : 100,
					dataIndex : "parent",
					renderer : this.objectRender("title")
				}, {
					header : "简介",
					sortable : true,
					width : 300,
					dataIndex : "description"
				}, {
					header : "状态",
					sortable : true,
					width : 80,
					dataIndex : "status",
					renderer : this.statusRender
				}])
		/*
		 * this.gridButtons = [new
		 * Ext.Toolbar.Separator(),{text:"重新计算角色项",scope:this,handler:this.reCalSystemRole}];
		 */
		this.on('removeobject', this.reloadTree, this);
		RolePanel.superclass.initComponent.call(this);
	}
});

// 系统角色管理
RoleManagePanel = Ext.extendX(EasyJF.Ext.TreeCascadePanel,
		function(superclass) {
			return {
				queryParam : 'parentId',
				treeCfg : {
					title : "角色树",
					rootText : '所有角色',
					rootIconCls : 'treeroot-icon',
					loader : Global.systemRoleLoader
				},
				onTreeClick : function(node) {
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
					superclass.onTreeClick.apply(this, arguments);
				},
				getPanel : function() {
					if (!this.panel) {
						this.panel = new RolePanel();
						this.list = this.panel;
						this.list.tree = this.tree;
					}
					return this.panel;
				}
			}
		});
