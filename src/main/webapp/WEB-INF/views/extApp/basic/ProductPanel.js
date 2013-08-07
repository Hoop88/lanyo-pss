/**
 * author ssvfhppl
 * 
 * @class ProductListPanel
 * @extends EasyJF.Ext.CrudPanel
 * @产品管理
 */
ProductListPanel = Ext.extend(EasyJF.Ext.CrudPanel, {
	id : "productLiastPanel",
	baseUrl : "product.ejf",
	autoScroll : true,
	pageSize : 18,
	dir : new EasyJF.Ext.TreeComboField({
		fieldLabel : '所属类型',
		name : 'parent',
		hiddenName : 'parent',
		allowBlank : false,
		blankText : '产品类型不能为空!!',
		minListWidth : 180,
		tree : new Ext.tree.TreePanel({
					border : false,
					autoScroll : true,
					rootVisible : false,
					loader : new Ext.tree.TreeLoader({
								nodeParameter : 'id',
								url : Ext.urlAppend("productDir.ejf", Ext
												.urlEncode({
															cmd : "getProductDirTree"
														}))
							}),
					root : new Ext.tree.AsyncTreeNode({
								id : "root",
								text : '产品类型'
							})
				})
	}),
	viewWin : function() {
		var viewSize = Ext.getBody().getViewSize();
		return {
			title : '详细信息',
			width : 880,
			height : 490
		};
	},
	createViewPanel : function() {
		var formPanel = new Ext.form.FormPanel({
					labelWidth : 70,
					labelAlign : 'right',
					fileUpload : true,
					frame : true,
					items : [{
								xtype : "hidden",
								name : "id"
							}, {
								xtype : 'fieldset',
								title : '基本信息',
								layout : 'form',

								height : 180,
								items : [EasyJF.Ext.Util.buildColumnForm(3, {
											fieldLabel : '产品名称',
											xtype : 'labelfield',
											name : 'name'
										}, {
											xtype : 'labelfield',
											fieldLabel : '产品编号',
											name : 'sn'
										}, {
											xtype : 'labelfield',
											fieldLabel : '产品规格',
											name : 'spec'
										}, {
											xtype : 'labelfield',
											fieldLabel : '产品型号',
											name : 'model'
										}, {
											xtype : 'labelfield',
											fieldLabel : '产品颜色',
											name : 'color'
										}, {
											xtype : 'labelfield',
											fieldLabel : '销售价',
											name : 'salePrice'
										}, {
											xtype : 'labelfield',
											fieldLabel : '成本价',
											name : 'costPrice'
										}, {
											xtype : 'labelfield',
											fieldLabel : '品牌',
											name : 'brand',
											renderer : EasyJF.Ext.Util
													.objectRender('title')
										}, {
											xtype : 'labelfield',
											fieldLabel : '单位',
											name : 'unit',
											renderer : EasyJF.Ext.Util
													.objectRender('title')
										}, {
											xtype : 'labelfield',
											fieldLabel : '类型',
											name : 'dir',
											renderer : EasyJF.Ext.Util
													.objectRender('name')
										}, {
											xtype : 'labelfield',
											fieldLabel : '其他属性1',
											name : 'other3'
										}, {
											xtype : 'labelfield',
											fieldLabel : '其他属性2',
											name : 'other4'
										}, {
											xtype : 'labelfield',
											fieldLabel : '其他属性3',
											name : 'other2'
										}, {
											xtype : 'labelfield',
											fieldLabel : '其他属性4',
											name : 'other1'
										})]
							}, {
								xtype : 'fieldset',
								title : '备注信息',
								layout : 'form',
								height : 210,
								items : [{
											xtype : 'labelfield',
											fieldLabel : '产品简介',

											name : 'intro'
										}, {
											xtype : 'labelfield',
											fieldLabel : '产品详情',
											name : 'content'
										}]
							}]
				});

		return formPanel;
	},
	createForm : function() {

		this.brand = Ext.apply({}, {
					xtype : "smartcombo",
					disableChoice : true,
					editable : true,
					typeAhead : true,
					enableKeyEvents : true,
					width : 160,
					listWidth : 200,
					minChars : 2,
					pageSize : 20,
					queryParam : "searchKey"

				}, EasyJF.Ext.Util.buildRemoteCombox("brand", "品牌",
						"systemDictionaryDetail.ejf?cmd=list&parentId=2", [
								"id", "title"], "title", "id", true));
		this.unit = Ext.apply({}, {
					xtype : "smartcombo",
					disableChoice : true,
					editable : true,
					typeAhead : true,
					enableKeyEvents : true,
					width : 160,
					listWidth : 200,
					minChars : 2,
					pageSize : 20,
					queryParam : "searchKey"

				}, EasyJF.Ext.Util.buildRemoteCombox("unit", "单位",
						"systemDictionaryDetail.ejf?cmd=list&parentId=32769", [
								"id", "title"], "title", "id", true));
		var viewSize = Ext.getBody().getViewSize();
		var kearwidth = viewSize.width - 420;
		var kearheight = (viewSize.height - 200) * 0.2;

		this.formPanel = new Ext.form.FormPanel({
			labelWidth : 70,
			labelAlign : 'right',
			defaultType : 'textfield',
			fileUpload : true,
			frame : true,
			items : [{
						xtype : "hidden",
						name : "id"
					}, {
						xtype : 'fieldset',
						title : '基本信息',
						layout : 'form',
						height : 180,
						items : [EasyJF.Ext.Util.buildColumnForm(3, {
									fieldLabel : '产品名称',
									allowBlank : false,
									blankText : '产品名称不能为空!!',
									name : 'name'
								}, {
									fieldLabel : '产品编号',
									blankText : '产品编码不能为空!!',
									xtype : 'textfield',
									allowBlank : false,
									name : 'sn'
								}, {
									fieldLabel : '产品规格',

									blankText : '产品规格不能为空!!',
									name : 'spec'
								}, {
									fieldLabel : '产品型号',

									blankText : '产品型号不能为空!!',
									name : 'model'
								}, {
									fieldLabel : '产品颜色',
									blankText : '产品颜色不能为空!!',
									name : 'color'
								}, {
									fieldLabel : '销售价',
									xtype : 'numberfield',
									blankText : '产品销售价不能为空!!',
									allowBlank : false,
									name : 'salePrice'
								}, {
									fieldLabel : '成本价',
									xtype : 'numberfield',
									allowBlank : false,
									blankText : '产品成本价不能为空!!',

									name : 'costPrice'
								}, this.brand, this.unit,
								new EasyJF.Ext.TreeComboField({
									fieldLabel : '所属类型',
									name : 'dir',
									hiddenName : 'dir',
									blankText : '产品类型不能为空!!',
									minListWidth : 180,
									tree : new Ext.tree.TreePanel({
										border : false,
										autoScroll : true,
										rootVisible : false,
										loader : new Ext.tree.TreeLoader({
											nodeParameter : 'id',
											url : Ext.urlAppend(
													"productDir.ejf", Ext
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
									xtype : 'fileuploadfield',
									emptyText : '商品图片.....',
									width : 100,
									fieldLabel : '图片',
									buttonText : '',
									style : 'padding-lefg:0px;',
									listeners : {
										fileselected : function(field, v) {
										},
										scope : this
									},
									buttonCfg : {
										iconCls : 'upload-icon'
									},
									name : 'pic'
								}, {
									fieldLabel : '其他属性1',
									name : 'other3'
								}, {
									fieldLabel : '其他属性2',
									name : 'other4'
								}, {
									fieldLabel : '其他属性3',
									name : 'other2'
								}, {
									fieldLabel : '其他属性4',
									name : 'other1'
								})]
					}, {
						xtype : 'fieldset',
						title : '备注信息',
						layout : 'form',
						height : 210,
						items : [{
									xtype : 'textarea',
									fieldLabel : '产品简介',
									width : 740,
									height : 40,
									name : 'intro'
								}, {
									fieldLabel : '产品详情',
									name : 'content',
									xtype : 'textarea',
									width : 740,
									height : 130,
									id : 'f_content',
									listeners : {
										afterrender : function(f) {
											/*
											 * var size = f .getSize();
											 */
											this.FCK.ReplaceTextarea();
										},
										show : function() {

										},
										scope : this
									}
								}]
					}]
		});

		return this.formPanel;
	},
	onCreate : function() {
	},
	createWin : function(callback, autoClose) {
		return this.initWin(880, 490, "产品管理", callback, autoClose);
	},

	searchWin : {
		title : "高级查询",
		width : 480,
		height : 220
	},
	searchFormPanel : function() {
		return new Ext.form.FormPanel({
			frame : true,
			bodyStyle : 'margin-left:10px;margin-right:10px;',
			labelWidth : 70,
			items : [EasyJF.Ext.Util.buildColumnForm(
					2,
					{
						xtype : 'textfield',
						name : 'name',
						fieldLabel : '商品名称'
					},
					{
						xtype : 'textfield',
						name : 'sn',
						fieldLabel : '商品编号'
					},
					new EasyJF.Ext.TreeComboField({
						fieldLabel : '所属类型',
						name : 'parent',
						hiddenName : 'parent',
						allowBlank : false,
						blankText : '产品类型不能为空!!',
						minListWidth : 180,
						tree : new Ext.tree.TreePanel({
							border : false,
							autoScroll : true,
							rootVisible : false,
							loader : new Ext.tree.TreeLoader({
								nodeParameter : 'id',
								url : Ext.urlAppend("productDir.ejf", Ext
												.urlEncode({
															cmd : "getProductDirTree"
														}))
							}),
							root : new Ext.tree.AsyncTreeNode({
										id : "root",
										text : '产品类型'
									})
						})
					}),
					Ext
							.apply(
									{},
									{
										xtype : "smartcombo",
										disableChoice : true,
										editable : true,
										typeAhead : true,
										enableKeyEvents : true,
										width : 160,
										listWidth : 400,
										minChars : 2,
										pageSize : 20,
										queryParam : "searchKey",
										listeners : {
											select : function(combo, record,
													index) {
												this.supplierselected = record;
											},
											scope : this
										}

									},
									EasyJF.Ext.Util
											.buildRemoteCombox(
													"brand",
													"品牌",
													"systemDictionaryDetail.ejf?cmd=list&parentId=2",
													["id", "title"], "title",
													"id", true)), {
						xtype : 'textfield',
						fieldLabel : '产品型号',
						name : 'model'
					}, {
						xtype : 'textfield',
						fieldLabel : '产品规格',
						name : 'spec'
					}, {
						xtype : 'textfield',
						fieldLabel : '产品颜色',
						name : 'color'
					}, {
						xtype : 'numberfield',
						fieldLabel : '成本价',
						name : 'costPrice'
					}, {
						xtype : 'numberfield',
						fieldLabel : '成本价',
						name : 'salePrice'
					}, {
						xtype : 'textfield',
						fieldLabel : '基本信息',
						name : 'intro'
					})]
		});
	},
	onCreate : function() {

		var fckInstance = EasyJF.Ext.Util.getFckById('f_content')
		if (fckInstance)
			EasyJF.Ext.Util.setFCKEditorContent('f_content', '');
	},
	onEdit : function(id, data) {

		var fckInstance = EasyJF.Ext.Util.getFckById('f_content')
		if (fckInstance) {
			if (data)
				EasyJF.Ext.Util.setFCKEditorContent('f_content', data.content);
		}

	},
	onView : function(win, r) {

		var fckInstance = EasyJF.Ext.Util.getFckById('f_content')
		if (fckInstance) {
			if (r)
				EasyJF.Ext.Util.setFCKEditorContent('f_content', r.content);
		}

	},
	storeMapping : ["id", "name", "sn", "spec", "model", "color", "pic",
			"intro", "content", "other1", "other2", "other3", "other4",
			"costPrice", "salePrice", "brand", "unit", 'dir'],
	initRowTip : function(grid) {
		this.gridTip = new Ext.ToolTip({
			width : 200,
			height : 150,
			autoHeight : false,
			target : grid.getView().mainBody,
			delegate : 'div.icon-img',
			tipAnchor : 'r',
			anchor : 'left',
			mouseOffset : [5, 0],
			onTargetOver : function(e) {
				this.constructor.prototype.onTargetOver.call(this, e);
				var t = e.getTarget(this.delegate, null, true);
				if (t) {
					var row = t.parent('div.x-grid3-row', true);
					this.targetRow = row.rowIndex;
				}
			},
			listeners : {
				scope : this,
				beforeshow : function(tip) {
					if (Ext.isDefined(tip.targetRow)) {
						var record = this.grid.getStore().getAt(tip.targetRow);
						var imgPath = record.get('pic');

						var t = String
								.format(
										'<img style="width:100%;height:100%" src="upload/product/{0}" />',
										imgPath);

						if (tip.rendered) {
							tip.update(t);
						} else {
							tip.html = t;
						}
					}
				}
			}
		});
	},
	initComponent : function() {
		this.FCK = new FCKeditor("f_content", 740, 120, "Basic");
		this.FCK.BasePath = "plugins/fckeditor/";
		this.FCK.Config['CustomConfigurationsPath'] = "plugins/fckeditor/fckconfig.js"

		this.cm = new Ext.grid.ColumnModel([{
			header : "图片",
			sortable : true,
			width : 200,
			align : 'left',
			renderer : function(v) {
				return '<div style="width:12px;height:12px;" class="icon-img"></div>'
			}
		}, {
			header : "产品名称",
			sortable : true,
			width : 400,
			dataIndex : "name"
		}, {
			header : "产品编号",
			sortable : true,
			width : 500,
			dataIndex : "sn"
		}, {
			header : "产品规格",
			sortable : true,
			width : 300,
			dataIndex : "spec"
		}, {
			header : "产品型号",
			sortable : true,
			width : 300,
			dataIndex : "model"
		}, {
			dataIndex : "dir",
			xtype : 'objectcolumn',
			field : 'name',
			header : "产品种类",
			sortable : true,
			width : 300

		}, {
			header : "产品颜色",
			sortable : true,
			width : 300,
			dataIndex : "color"
		}, {
			header : "产品单位",
			sortable : true,
			width : 300,
			dataIndex : "unit",
			renderer : EasyJF.Ext.Util.objectRender('title')
		}, {
			header : "产品品牌",
			sortable : true,
			width : 300,
			dataIndex : "brand",
			renderer : EasyJF.Ext.Util.objectRender('title')
		}, {
			header : "销售价",
			sortable : true,
			width : 300,
			dataIndex : "salePrice"
		}, {
			header : "成本价",
			sortable : true,
			width : 300,
			dataIndex : "costPrice"
		}, {
			header : "产品介绍",
			sortable : true,
			width : 900,
			dataIndex : "intro"
		}]);
		ProductListPanel.superclass.initComponent.call(this);
		this.grid.on('render', this.initRowTip, this);
	}
});

ProductPanel = Ext.extend(EasyJF.Ext.TreeCascadePanel, {
			id : "productPanel",
			treeCfg : {
				queryParam : 'parentId',
				title : "分类树",
				rootText : '所有分类',
				expanded : true,
				rootIconCls : 'treeroot-icon',
				loader : new Ext.tree.TreeLoader({
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
					title : node.text
				};
				this.panel.store.removeAll();
				this.panel.store.baseParams.parent = id;
				ProductPanel.superclass.onTreeClick.apply(this, arguments);
			},
			getPanel : function() {
				if (!this.panel) {
					this.panel = new ProductListPanel();
					this.panel.tree = this.tree;
				}
				return this.panel;
			}
		});