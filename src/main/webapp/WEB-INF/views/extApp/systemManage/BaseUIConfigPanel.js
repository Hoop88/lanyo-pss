if (typeof Global === "undefined") {
	Global = {};
}
if (!Global.baseUIConfigLoader) {
	Global.baseUIConfigLoader = new EasyJF.Ext.MemoryTreeLoader({
		varName : "Global.BASEUICONFIG_NODES",
		url : "baseUIConfig.ejf?cmd=getTree&pageSize=-1&treeData=true&all=true",
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

BaseUIConfigListPanel = Ext.extend(EasyJF.Ext.CrudListPanel, {
	id : "baseUIConfigListPanel",
	// title:"Season管理",
	pageSize : 20,
	entityClzName : "com.easyjf.core.domain.BaseUIConfig",
	baseUrl : "baseUIConfig.ejf",
	showSearchField : false,
	/* listeners:{"removeobject":function(panel){panel.onSave()},scope:this}, */
	formFocus : function() {
		this.fp.form.findField("title").focus("", 100);
	},
	createForm : function() {
		var formPanel = new Ext.form.FormPanel({
			frame : true,
			labelWidth : 60,
			labelAlign : 'right',
			items : [{
				xtype : 'fieldset',
				title : '',
				autoHeight : true,
				defaults : {
					xtype : "textfield",
					anchor : "-20"
				},
				items : [{
							xtype : "hidden",
							name : "id"
						}, {
							fieldLabel : '名称',
							name : 'title',
							allowBlank : false
						}, {
							fieldLabel : '类名称',
							name : 'appClass'
						}, {
							xtype : "treecombo",
							fieldLabel : "父级",
							name : "parent",
							hiddenName : "parent",
							displayField : "title",
							valueField : "id",
							width : 110,
							tree : new Ext.tree.TreePanel({
										autoScroll : true,
										root : new Ext.tree.AsyncTreeNode({
													id : "root",
													text : "所有模块",
													icon : "images/system/root.gif",
													expanded : true,
													loader : Global.baseUIConfigLoader
												})
									})
						}, {
							xtype : "textarea",
							fieldLabel : '脚本地址',
							name : 'scripts'
						}]
			}]
		});

		return formPanel;
	},
	onCreate : function() {
		this.fp.form.findField("parent").setOriginalValue(this.parent);
	},
	checkTitle : function() {
		if (this.fp.findSomeThing("title").getValue()
				&& !this.fp.findSomeThing("id").getValue()) {
			Ext.Ajax.request({
						url : this.baseUrl + "?cmd=checkTitle",
						params : {
							title : this.fp.findSomeThing("title").getValue()
						},
						success : function(response) {
							var sn = Ext.decode(response.responseText);
							if (sn == "false") {
								Ext.Msg.alert("警告", "该季节的名字已经存在！");
								this.fp.findSomeThing("title").setValue("");
								this.fp.findSomeThing("title").focus();
							}
						},
						scope : this
					});
		}
	},
	reloadTree : function() {
		if (this.tree) {
			Global.baseUIConfigLoader.remoteObject.clearData();
			var p = this.tree.getSelectionModel().getSelectedNode();
			this.tree.root.reload();
		}
		if (this.fp) {
			var parentNode = this.fp.form.findField("parent");
			if (parentNode && parentNode.tree.rendered)
				parentNode.tree.root.reload();
		}
	},
	createWin : function(callback, autoClose) {
		return this.initWin(528, 240, "可配置模块管理", callback, autoClose);
	},
	initComponent : function() {
		this.cm = new Ext.grid.ColumnModel([{
					header : "名称",
					sortable : true,
					width : 100,
					dataIndex : "title"
				}, {
					header : "模块类",
					sortable : true,
					width : 100,
					dataIndex : "appClass"
				}, {
					header : "父级",
					sortable : true,
					width : 100,
					dataIndex : "parent",
					renderer : this.objectRender("title")
				}, {
					header : "脚本地址",
					sortable : true,
					width : 150,
					dataIndex : "scripts"
				}]);
		BaseUIConfigListPanel.superclass.initComponent.call(this);
		this.on("removeobject", this.reloadTree, this);
		this.on("saveobject", this.reloadTree, this);
	}
});

// 信息分类栏目管理
BaseUIConfigPanel = function() {
	this.list = new BaseUIConfigListPanel();
	this.tree = new Ext.tree.TreePanel({
				title : "模块树",
				region : "west",
				width : 200,
				autoScroll : true,
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
							loader : Global.baseUIConfigLoader
						})
			});
	this.list.tree = this.tree;
	this.tree.on("click", function(node, eventObject) {
				var id = (node.id != 'root' ? node.id : "");
				this.list.parent = id ? {
					id : id,
					title : node.text
				} : null;
				this.list.store.baseParams.parentId = id;
				this.list.store.removeAll();
				this.list.store.load();
			}, this);
	BaseUIConfigPanel.superclass.constructor.call(this, {
				id : "baseUIConfigPanel",
				// title :"库房管理",
				closable : true,
				autoScroll : true,
				border : false,
				layout : "border",
				items : [this.tree, {
							region : "center",
							layout : "fit",
							items : this.list.list()
						}]
			});

};
Ext.extend(BaseUIConfigPanel, Ext.Panel, {});