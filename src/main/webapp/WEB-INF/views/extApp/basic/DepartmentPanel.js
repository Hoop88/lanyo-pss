if (typeof Global === "undefined") {
	Global = {};
}
if (!Global.departmentLoader) {
	Global.departmentLoader = new EasyJF.Ext.MemoryTreeLoader({
				iconCls : 'lanyo-tree-node-icon',
				varName : "Global.DEPT_NODES",
				url : "department.ejf?cmd=getTree&all=true",
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

DepartmentListPanel = Ext.extend(EasyJF.Ext.CrudPanel, {
	id : "departmentListPanel",
	// title:"Department管理",
	baseUrl : "department.ejf",
	viewWin : {
		width : 430,
		height : 310,
		title : '部门信息'
	},
	onCreate : function() {
		if (this.parent) {
			this.fp.findField("parent").setValue(this.parent || null);
		}
	},
	createForm : function() {
		var formPanel = new Ext.form.FormPanel({
			frame : true,
			labelWidth : 70,
			labelAlign : 'right',
			defaultType : 'textfield',
			defaults : {
				anchor : "-20"
			},
			items : [{
						xtype : "hidden",
						name : "id"
					}, {
						fieldLabel : '编码',
						name : 'sn',
						allowBlank : false
					}, {
						fieldLabel : '名称',
						name : 'name',
						allowBlank : false
					}, {
						fieldLabel : '上级部门',
						name : 'parent',
						xtype : "treecombo",
						hiddenName : "parent",
						displayField : "title",
						valueField : "id",
						tree : new Ext.tree.TreePanel({
									autoScroll : true,
									root : new Ext.tree.AsyncTreeNode({
												id : "root",
												text : "所有部门",
												expanded : true,
												iconCls : 'treeroot-icon',
												loader : Global.departmentLoader
											})
								})
					}, {
						fieldLabel : '电话',
						name : 'tel'
					}, {
						fieldLabel : '传真',
						name : 'fax'
					}, {
						fieldLabel : '排序',
						name : 'sequence',
						xtype : "numberfield"
					}, {
						fieldLabel : '简介',
						xtype : "textarea",
						name : 'intro'
					}]
		});
		return formPanel;
	},
	reloadTree : function() {
		if (this.tree) {
			Global.departmentLoader.remoteObject.clearData();
			this.tree.root.reload();
		}
		if (this.fp) {
			var parentNode = this.fp.form.findField("parent");
			if (parentNode && parentNode.tree.rendered)
				parentNode.tree.root.reload();
		}
	},
	createWin : function(callback, autoClose) {
		return this.initWin(438, 310, "部门信息录入", callback, autoClose);
	},
	storeMapping : ["id", "sn", "name", "intro", "dirPath", "tel", "fax",
			"sequence", "parent"],
	initComponent : function() {
		this.cm = new Ext.grid.ColumnModel([{
					header : "编号",
					sortable : true,
					width : 100,
					dataIndex : "sn"
				}, {
					header : "名称",
					sortable : true,
					width : 100,
					dataIndex : "name"
				}, {
					header : "上级",
					sortable : true,
					width : 100,
					dataIndex : "parent",
					renderer : this.objectRender("title")
				}, {
					header : "电话",
					sortable : true,
					width : 100,
					dataIndex : "tel"
				}, {
					header : "传真",
					sortable : true,
					width : 100,
					dataIndex : "fax"
				}, {
					header : "排序",
					sortable : true,
					width : 100,
					dataIndex : "sequence"
				}, {
					header : "简介",
					sortable : true,
					width : 300,
					dataIndex : "intro"
				}]);
		DepartmentListPanel.superclass.initComponent.call(this);
		this.on("removeobject", this.reloadTree, this);
		this.on("saveobject", this.reloadTree, this);
	}
});
/*
 * DepartmentPanel = function() { this.list = new DepartmentListPanel({ region :
 * "center" }); this.tree = new Ext.tree.TreePanel({ title : "部门树", region :
 * "west", width : 150,
 * tools:[{id:"refresh",handler:function(){this.tree.root.reload();},scope:this}],
 * tools : [{ id : "refresh", handler : function() { this.tree.root.reload(); },
 * scope : this }], root : new Ext.tree.AsyncTreeNode({ id : "root", text :
 * "所有部门", iconCls :'treeroot-icon', expanded : true, loader :
 * Global.departmentLoader }) }); this.list.tree=this.tree;
 * this.tree.on("click", function(node, eventObject) { var id = (node.id !=
 * 'root'? node.id : ""); this.list.parent ={id:id,title:node.text};
 * this.list.store.baseParams.parent = id; this.list.store.removeAll();
 * this.list.store.load(); }, this);
 * DepartmentPanel.superclass.constructor.call(this, { id : "departmentPanel",
 * //title : "信息栏目分类管理", closable : true, border:false, autoScroll : true,
 * layout : "border", items : [this.tree, this.list] });
 *  }; Ext.extend(DepartmentPanel, Ext.Panel, {});
 */
DepartmentPanel = Ext.extendX(EasyJF.Ext.TreeCascadePanel,
		function(superclass) {
			return {
				queryParam : 'parentId',
				treeCfg : {
					title : "部门树",
					rootText : '所有部门',
					rootIconCls : 'treeroot-icon',
					loader : Global.departmentLoader
				},
				onTreeClick : function(node) {
					var id = (node.id != 'root' ? node.id : "");
					var valObj = id ? {
						id : id,
						title : node.text
					} : null;
					this.panel.parent = valObj;
					this.list.store.baseParams.parent = id;
					superclass.onTreeClick.apply(this, arguments);
				},
				getPanel : function() {
					if (!this.panel) {
						this.panel = new DepartmentListPanel();
						this.panel.tree = this.tree;
						this.list = this.panel.grid;
					}
					return this.panel;
				}
			}
		});
