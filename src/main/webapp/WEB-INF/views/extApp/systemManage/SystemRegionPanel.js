if (typeof Global === "undefined") {
	Global = {};
}
if (!Global.systemRegionLoader) {
	Global.systemRegionLoader = new Ext.tree.TreeLoader({
				url : "systemRegion.ejf?cmd=getSystemRegion&pageSize=-1&treeData=true",
				listeners : {
					'beforeload' : function(treeLoader, node) {
						treeLoader.baseParams.id = (node.id.indexOf('root') < 0
								? node.id
								: "");
					}
				}
			})
}

// 组织机构管理
SystemRegionListPanel = Ext.extend(EasyJF.Ext.CrudPanel, {
	// title:"菜单详情",
	baseUrl : "systemRegion.ejf",
	theStatus : [["启用", 0], ["停用", -1]],
	showView : false,
	pageSize : 20,
	importData : true,
	exportData : true,
	createForm : function() {
		var formPanel = new Ext.form.FormPanel({
			frame : true,
			labelWidth : 60,
			labelAlign : 'right',
			items : [{
						xtype : "hidden",
						name : "id"
					}, EasyJF.Ext.Util.twoColumnPanelBuild({
								xtype : "textfield",
								fieldLabel : '名称',
								name : 'title',
								allowBlank : false
							}, {
								xtype : "textfield",
								fieldLabel : '编码',
								name : 'sn',
								allowBlank : false
							}, {
								xtype : "textfield",
								fieldLabel : '拼音',
								name : 'spell'
							}, {
								xtype : "textfield",
								fieldLabel : '拼音简写',
								name : 'shortSpell'
							}, {
								xtype : "textfield",
								fieldLabel : '英文名',
								name : 'englishName'
							}, {
								xtype : "treecombo",
								fieldLabel : "父级",
								name : "parentId",
								hiddenName : "parentId",
								displayField : "title",
								valueField : "id",
								width : 110,
								listWidth : 150,
								tree : new Ext.tree.TreePanel({
									autoScroll : true,
									root : new Ext.tree.AsyncTreeNode({
												id : "root",
												text : "所有菜单",
												icon : "images/system/root.gif",
												expanded : true,
												loader : Global.systemRegionLoader
											})
								})
							}, {
								xtype : "combo",
								name : "status",
								hiddenName : "status",
								fieldLabel : "状态",
								displayField : "title",
								valueField : "value",
								width : 80,
								value : 0,
								allowBlank : false,
								store : new Ext.data.SimpleStore({
											fields : ['title', 'value'],
											data : this.theStatus
										}),
								editable : false,
								mode : 'local',
								triggerAction : 'all',
								emptyText : '请选择...'
							}, {
								xtype : "textfield",
								width : 100,
								fieldLabel : "显示顺序",
								name : "sequence"
							}), {
						xtype : "textarea",
						name : "intro",
						fieldLabel : "简介",
						anchor : "100%"
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
	create : function() {
		SystemRegionListPanel.superclass.create.call(this);
		this.fp.form.findField("parentId").setValue(this.parent);
	},
	save : function() {
		SystemRegionListPanel.superclass.save.call(this);
		if (this.tree)
			this.tree.root.reload.defer(1000, this.tree.root);// 刷新左边的树
	},
	createWin : function() {
		return this.initWin(438, 250, "地区信息管理");
	},
	storeMapping : ["id", "sn", "title", "englishName", "spell", "shortSpell",
			"parent", {
				name : "parentId",
				mapping : "parent"
			}, "lev", "sequence", "inputTime", "inputUser", "status"],
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
					header : "父级",
					sortable : true,
					width : 120,
					dataIndex : "parent",
					renderer : this.objectRender("title")
				}, {
					header : "拼音",
					sortable : true,
					width : 120,
					dataIndex : "spell"
				}, {
					header : "拼音简写",
					sortable : true,
					width : 120,
					dataIndex : "shortSpell",
					hidden : true
				}, {
					header : "级别",
					sortable : true,
					width : 120,
					dataIndex : "lev",
					hidden : true
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
				}, new Ext.Toolbar.Separator()];
		SystemRegionListPanel.superclass.initComponent.call(this);
	}
});

// 系统菜单管理
SystemRegionPanel = function() {
	this.list = new SystemRegionListPanel({
				region : "center"
			});
	this.tree = new Ext.tree.TreePanel({
				title : "地区树",
				region : "west",
				autoScroll : true,
				width : 200,
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
							text : "所有地区",
							icon : "images/system/root.gif",
							expanded : true,
							loader : Global.systemRegionLoader
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
	SystemRegionPanel.superclass.constructor.call(this, {
				id : "systemRegionPanel",
				// title : "信息栏目分类管理",
				closable : true,
				border : false,
				autoScroll : true,
				layout : "border",
				items : [this.tree, this.list]
			});

};
Ext.extend(SystemRegionPanel, Ext.Panel, {});