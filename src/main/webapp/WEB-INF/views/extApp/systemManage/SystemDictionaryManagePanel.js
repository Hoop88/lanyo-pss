// 系统数据字典
SystemDictionaryPanel = Ext.extend(EasyJF.Ext.CrudListPanel, {
			id : "systemDictionaryPanel",
			title : "字典分类管理",
			baseUrl : "systemDictionary.ejf",
			viewWin : {
				width : 438,
				height : 200
			},
			showView : false,
			createForm : function() {
				var formPanel = new Ext.form.FormPanel({
							frame : true,
							labelWidth : 60,
							labelAlign : 'right',
							defaults : {
								anchor : "-40",
								xtype : "textfield"
							},
							items : [{
										xtype : "hidden",
										name : "id"
									}, {
										fieldLabel : "编码",
										name : 'sn',
										allowBlank : false,
										width : 300,
										helpText : '字典分类的唯一标识，程序中通过编号来选择字典值!'
									}, {
										fieldLabel : "名称",
										name : 'title',
										allowBlank : false
									}, {
										xtype : "textarea",
										fieldLabel : "简介",
										name : 'intro'
									}]
						});
				return formPanel;
			},
			createWin : function(callback, autoClose) {
				return this.initWin(438, 200, "字典分类管理", callback, autoClose);
			},
			storeMapping : ["id", "sn", "title", "intro", "children"],
			initComponent : function() {
				this.cm = new Ext.grid.ColumnModel([{
							header : "编码",
							sortable : true,
							width : 50,
							dataIndex : "sn"
						}, {
							header : "名称",
							sortable : true,
							width : 50,
							dataIndex : "title"
						}, {
							header : "简介",
							sortable : true,
							dataIndex : "intro"
						}])
				SystemDictionaryPanel.superclass.initComponent.call(this);

			},
			afterList : function() {
				this.searchField.hide();
			}
		});
// 系统数据字典值
SystemDictionaryDetailPanel = Ext.extend(EasyJF.Ext.CrudListPanel, {
			id : "systemDictionaryDetailPanel",
			title : "字典值管理",
			baseUrl : "systemDictionaryDetail.ejf",
			pageSize : 20,
			viewWin : {
				width : 438,
				height : 200
			},
			showView : false,
			createForm : function() {
				var formPanel = new Ext.form.FormPanel({
							frame : true,
							labelWidth : 80,
							labelAlign : 'right',
							defaults : {
								anchor : "-20",
								xtype : "textfield"
							},
							items : [{
										xtype : "hidden",
										name : "id"
									}, {
										xtype : "hidden",
										name : "parentSn"
									}, {
										fieldLabel : "名称",
										name : 'title',
										allowBlank : false
									}, {
										fieldLabel : "值",
										name : 'tvalue',
										allowBlank : false
									}, {
										fieldLabel : "显示顺序",
										name : 'sequence'
									}]
						});
				return formPanel;
			},
			save : function(callback, autoClose, ignoreBeforeSave) {
				this.fp.form.baseParams = {
					parentId : this.parentId
				};
				SystemDictionaryDetailPanel.superclass.save.call(this,
						callback, autoClose, ignoreBeforeSave);
			},
			createWin : function(callback, autoClose) {
				return this.initWin(338, 156, "字典值管理", callback, autoClose);
			},
			storeMapping : ["id", "title", "tvalue", "sequence", "parent"],
			initComponent : function() {
				this.cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
									header : "序号",
									width : 40
								}), {
							header : "名称",
							sortable : true,
							width : 300,
							dataIndex : "title"
						}, {
							header : "值",
							sortable : true,
							width : 300,
							dataIndex : "tvalue"
						}, {
							header : "显示顺序",
							sortable : true,
							width : 300,
							dataIndex : "sequence"
						}])
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
						}, "-"];
				SystemDictionaryDetailPanel.superclass.initComponent.call(this);
			},
			afterList : function() {
				this.searchField.setWidth(100);
				this.grid.on("render", function() {
							this.disableOperaterItem("btn_add");
						}, this);
				this.store.on("load", function() {
							this.enableOperaterItem("btn_add");
						}, this);
			}
		});
// 数据字典管理
SystemDictionaryManagePanel = Ext.extend(Ext.Panel, {
			id : "systemDictionaryManagePanel",
			// title : "数据字典管理",
			closable : true,
			autoScroll : true,
			border : false,
			// hideBorders:true,
			layout : "border",
			defaults : {
				bodyStyle : 'border-top:none;'
			},
			initComponent : function() {
				SystemDictionaryManagePanel.superclass.initComponent.call(this);
				this.dictionaryPanel = new SystemDictionaryPanel({
							title : "字典分类"
						});
				this.detailPanel = new SystemDictionaryDetailPanel({
							title : "字典详情"
						});
				this.add({
							layout : "fit",
							region : "west",
							width : "45%",
							items : [this.dictionaryPanel.list()]
						}, {
							layout : "fit",
							region : "center",
							items : [this.detailPanel.list()]
						});
				this.dictionaryPanel.grid.on("rowclick", function(grid, index) {
							var r = this.dictionaryPanel.store.getAt(index);
							if (this.detailPanel.parentId != r.get("id")) {
								this.detailPanel.store.removeAll();
								this.detailPanel.store.reload({
											params : {
												parentId : r.get("id"),
												start : 0
											}
										});
							}
							this.detailPanel.parentId = r.get("id");
						}, this, {
							buffer : 200
						});
			}
		})