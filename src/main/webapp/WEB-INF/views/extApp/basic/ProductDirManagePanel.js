ProductDirPanel = Ext.extend(EasyJF.Ext.CrudPanel, {
	id : "productdirPanel",
	baseUrl : "productDir.ejf",
	viewWin : {
		width : 388,
		height : 250
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
			items : [{
						xtype : "hidden",
						name : "id"
					}, EasyJF.Ext.Util.buildColumnForm(2, {
								fieldLabel : '编号',
								name : 'sn'
							}, {
								fieldLabel : '名称',
								name : 'name'
							}, new EasyJF.Ext.TreeComboField({
								fieldLabel : '父级类型',
								name : 'parent',
								hiddenName : 'parent',
								minListWidth : 180,
								tree : new Ext.tree.TreePanel({
									border : false,
									autoScroll : true,
									rootVisible : false,
									loader : new Ext.tree.TreeLoader({
										nodeParameter : 'id',
										url : Ext.urlAppend(this.baseUrl, Ext
												.urlEncode({
															cmd : "getProductDirTree"
														}))
									}),
									root : new Ext.tree.AsyncTreeNode({
												id : "root",
												text : '产品类型'
											})
								})
							}), {
								fieldLabel : '序列',
								name : 'sequence'
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
					defaultType : 'textfield',
					defaults : {
						width : 200
					},
					items : [{
								xtype : "hidden",
								name : "id"
							},
							EasyJF.Ext.Util.buildColumnForm(2, "labelfield", {
										fieldLabel : '编号',
										name : 'sn'
									}, {
										fieldLabel : '名称',
										name : 'name'
									}, {
										fieldLabel : '父级类型',
										name : 'parent',
										renderer : EasyJF.Ext.Util
												.objectRender('name')
									}, {
										fieldLabel : '序列',
										name : 'sequence'
									}), {
								xtype : 'labelfield',
								fieldLabel : '简介',
								anchor : '-20',
								name : 'intro'
							}]
				});

		return formPanel;
	},
	createWin : function(callback, autoClose) {
		return this.initWin(388, 250, "产品分类管理", callback, autoClose);
	},
	onSave : function() {
		this.refreshTree();
	},
	onCreate : function() {
		if (this.parent) {
			this.fp.findField('parent').setValue(this.parent);
		}
	},
	refreshTree : function() {
		this.tree.getRootNode().reload();
	},
	storeMapping : ["id", "sn", "name", "intro", "dirPath", "sequence",
			"parent"],
	initComponent : function() {
		this.cm = new Ext.grid.ColumnModel([{
					header : "编号",
					sortable : true,
					width : 300,
					dataIndex : "sn"
				}, {
					header : "名称",
					sortable : true,
					width : 300,
					dataIndex : "name"
				}, {
					header : "简介",
					sortable : true,
					width : 300,
					dataIndex : "intro"
				}, {
					header : "序列",
					sortable : true,
					width : 300,
					dataIndex : "sequence"
				}]);
		this.on({
					removeobject : this.refreshTree,
					scope : this
				});
		ProductDirPanel.superclass.initComponent.call(this);
	}
});
ProductDirManagePanel = Ext.extend(EasyJF.Ext.TreeCascadePanel, {
			id : "productdirmanagepanel",
			treeCfg : {
				queryParam : 'parentId',
				title : "分类树",
				rootText : '所有分类',
				rootIconCls : 'treeroot-icon',
				loader : new Ext.tree.TreeLoader({
							iconCls : 'lanyo-tree-node-icon',
							nodeParameter : 'id',
							url : Ext.urlAppend("productDir.ejf", Ext
											.urlEncode({
														cmd : "getProductDirTree"
													}))
						})
			},
			onTreeClick : function(node) {
				var id = (node.id != 'root' ? node.id : "");
				this.panel.parent = {
					id : id,
					name : node.text
				};
				this.panel.store.baseParams.parent = id;
				ProductDirManagePanel.superclass.onTreeClick.apply(this,
						arguments);
			},
			getPanel : function() {
				if (!this.panel) {
					this.panel = new ProductDirPanel();
					this.panel.tree = this.tree;
				}
				return this.panel;
			}
		});