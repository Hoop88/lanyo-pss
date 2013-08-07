Ext.apply(ConfigConst.STOCK, {
			getDepotCombo : function(obj) {
				var obj = obj || {};
				return Ext.apply(EasyJF.Ext.Util.buildRemoteCombox("depot",
								"仓库", "depot.ejf?cmd=list", ["id", "name"],
								"name", null, true), obj);
			},
			getSupplierCombo : function(obj) {
				var obj = obj || {};
				return Ext.apply(EasyJF.Ext.Util.buildRemoteCombox("supplier",
								"供应商", "supplier.ejf?cmd=list", ["id", "name"],
								"name", null, false), obj);
			}
		});

BaseStockComePanel = Ext.extend(EasyJF.Ext.CrudPanel, {
	printData : true,
	entityIdName : "id",
	stockComeTypeId : null,
	storeMapping : ["id", "sn", "types", "vdate", "inputTime", "remark", {
				name : "amount",
				type : 'FLOAT'
			}, "auditing", "auditTime", "status", "keeper", "supplier",
			'selle', "depot", "inputUser", "auditor"],
	editStoreMapping : ["id", "product", {
				name : 'productSn',
				mapping : 'product.sn'
			}, {
				name : 'productTitle',
				mapping : 'product.name'
			}, "price", "num", "amount", "remark"],
	viewWin : function() {
		var bSize = Ext.getBody().getViewSize();
		var sctn = this.getStockComeTypeText(this.stockComeTypeId);
		return {
			title : sctn,
			width : bSize.width - 50,
			height : bSize.height - 20
		}
	},
	/**
	 * 自动添加商品
	 */
	autoAddLastRow : function() {
		var g = this.editGrid, s = g.store;
		if (s.getCount() < 1
				|| Ext
						.getObjVal(s.getAt(s.getCount() - 1).get("product"),
								'id')) {
			var sm = g.getSelectionModel();
			var gsc = sm.getSelectedCell();
			s.add(new s.recordType({}));
			if (gsc)
				sm.select(gsc[0], gsc[1]);
		}
	},

	/*
	 * 新建商品
	 */
	createProduct : function() {
		this.autoAddLastRow();
		var row = this.editGrid.store.getCount() - 1;
		var column = this.editGrid.getColumnModel(row)
				.findColumnIndex("productSn");
		this.editGrid.startEditing(row, column);
	},
	/*
	 * 删除商品
	 */
	removeProduct : function() {
		EasyJF.Ext.Util.removeEditorGridRow(this.editGrid);
	},
	/**
	 * 创建表单菜单
	 * 
	 * @return {}
	 */
	createFormToolBar : function() {
		return [Ext.apply({}, {
							text : "新建商品",
							handler : this.createProduct,
							scope : this
						}, ConfigConst.buttons.addChild), Ext.apply({}, {
							text : "删除商品",
							handler : this.removeProduct,
							scope : this
						}, ConfigConst.buttons.removeChild)];
	},
	/**
	 * 计算当前单据项的和
	 */
	autoCountData : function(record) {
		if (record instanceof Ext.data.Record)
			record.set('amount', parseInt(record.get('price'))
							* Ext.num(record.get('num'), 0));
	},
	selectRowDataHandler : function(obj, record) {
		obj.toString = function() {
			return this.id ? this.id : this
		};
		record.set("product", obj);
		record.set("productTitle", obj.name);
		record.set("productSn", obj.sn);
		record.set("spec", obj.spec);
		record.set("brand", obj.brand);
		record.set("colorSn", obj.colorSn);
		record.set("model", obj.model);
		record.set("unit", obj.unit);
		record.set("price", obj.costPrice);
		record.set("salePrice", obj.salePrice);
		record.set("marketPrice", obj.marketPrice);
	},
	/*
	 * ProductComboBox选中数据后调用
	 */
	selectRowData : function(r) {
		var cell = this.editGrid.getSelectionModel().getSelectedCell();
		if (cell) {
			this.editGrid.stopEditing();
			var obj = Ext.apply({}, r);
			var record = this.editGrid.store.getAt(cell[0]);
			this.selectRowDataHandler(obj, record);
			this.autoCountData(record);
			this.autoAddLastRow();
		}
	},
	beforeSave : function() {
		var values = this.fp.getEditorCmpValues();
		this.fp.getForm().baseParams = values;
		this.fp.getForm().baseParams['types'] = this.stockComeTypeId;
		return true;
	},
	onAfterEdit : function(e) {
		var field = e.field;
		if (field == 'num' || field == 'price') {
			this.autoCountData(e.record);
		}
	},
	getRowContextMenu : function() {
		if (!this._gridContextMenu) {
			this._gridContextMenu = new Ext.menu.Menu([{
						text : "添加商品(<u>A</u>)",
						handler : this.autoAddLastRow,
						cls : "x-btn-text-icon",
						icon : "images/icons/application_form_add.png",
						scope : this
					}, {
						text : '删除商品',
						handler : this.removeProduct,
						scope : this,
						cls : "x-btn-text-icon",
						icon : "images/icons/application_form_delete.png"
					}]);
		};
		return this._gridContextMenu;
	},
	onRowContextMenu : function(g, r, e) {
		var menu = this.getRowContextMenu();
		menu.showAt(e.getXY());
		e.preventDefault();
	},
	buildEditorGridCm : function() {
		this.productEditor = new ProductComboBox(Ext.apply({}, {
					returnObject : true,
					displayField : "sn",
					valueField : "id",
					width : 300,
					listWidth : 250,
					// onTriggerClick : Ext.emptyFn,
					disableEnterNavigation : true,
					choiceValue : this.selectRowData.createDelegate(this)
				}, ConfigConst.CRM.product));
		var F = Ext.form;
		var columns = [{
					header : "ID",
					hidden : true,
					hideable : false,
					dataIndex : "id",
					width : 100
				}, new Ext.grid.RowNumberer({
							width : 46,
							header : '序号'
						}), {
					header : "产品",
					hidden : true,
					hideable : false,
					dataIndex : "product",
					width : 100
				}, {
					header : "产品编号",
					dataIndex : "productSn",
					width : 100,
					editor : this.productEditor
				}, {
					header : "产品名称",
					dataIndex : "productTitle",
					width : 100
				}, {
					header : "价格",
					dataIndex : "price",

					editor : new Ext.form.NumberField(),
					width : 100
				}, {
					header : "数量",
					dataIndex : "num",
					width : 100,
					summaryType : 'sum',
					editor : new F.NumberField({
								decimalPrecision : 0,
								minValue : 0
							})
				}, {
					header : "合计",
					dataIndex : "amount",
					width : 100,
					summaryType : 'sum'
				}, {
					header : "备注",
					dataIndex : "remark",
					width : 100,
					editor : new F.TextField()
				}];
		var str = "";
		Ext.each(columns, function(c) {
					str += "<th>" + c.header + "</th>"
				}, this);
		return columns;
	},
	/**
	 * 创建form表单的明细项
	 */

	createGridEditor : function() {
		var cellSel = new Ext.grid.CellSelectionModel({
					enterNavigation : true
				});
		this.editGrid = new Ext.grid.EditorGridPanel({
					getFilterDataFn : function(data) {
						return !!Ext.getObjVal(data, "product");
					},
					plugins : [new Ext.ux.grid.GridSummary()],
					columns : this.buildEditorGridCm(),
					sm : cellSel,
					loadMask : true,
					clicksToEdit : 1,
					border : false,
					keys : [{
								scope : this,
								key : Ext.EventObject.DELETE,
								fn : this.removeProduct
							}, {
								scope : this,
								key : Ext.EventObject.INSERT,
								fn : this.autoAddLastRow
							}],
					viewConfig : {
						forceFit : true
					},
					store : new Ext.data.JsonStore({
								fields : this.editStoreMapping,
								url : Ext.urlAppend(this.baseUrl, {
											cmd : "loadItemById"
										})
							})
				});
		this.editGrid.on({
					scope : this,
					afteredit : this.onAfterEdit,
					rowcontextmenu : this.onRowContextMenu
				});
		return this.editGrid;
	},
	createForm : function() {
		var util = EasyJF.Ext.Util;
		var editGrid = this.editGrid = this.createGridEditor();

		var sctn = this.getStockComeTypeText(this.stockComeTypeId);

		var formPanel = new EasyJF.Ext.CascadeForm({
			// 创建工具栏
			tbar : this.createFormToolBar(),
			// 创建北部表单（即主表单信息）
			buildNorthForm : function() {
				return {
					height : 50,
					frame : true,
					border : false,
					layout : 'form',
					style : 'padding:5px;',
					defaults : {
						anchor : '-20'
					},
					labelAlign : 'right',
					items : [
							{
								xtype : 'hidden',
								name : 'id'
							},
							util.buildColumnForm(true, {
										fieldLabel : '编号',
										allowBlank : false,
										readOnly : true,
										name : 'sn'
									}, {
										fieldLabel : '单据类型',
										xtype : 'labelfield',
										value : sctn
									}, ConfigConst.STOCK.getDepotCombo(),
									ConfigConst.STOCK.getSupplierCombo(), {
										xtype : "datefield",
										fieldLabel : '日期',
										allowBlank : false,
										value : new Date(),
										name : 'vdate',
										format : "Y-m-d"
									})]
				}
			},
			// 创建南部表单，即主表单附属信息
			buildSouthForm : function() {
				var util = EasyJF.Ext.Util;
				var objectRender = util.objectRender("name");
				return {
					height : 45,
					border : false,
					frame : true,
					region : "south",
					style : 'padding:2px;',
					items : [util
							.buildColumnForm(
									true,
									Ext
											.apply(
													{},
													{
														xtype : "employeecombo",
														editable : true,
														anchor : "-0"
													},
													EasyJF.Ext.Util
															.buildRemoteCombox(
																	"seller",
																	"业务员",
																	"employee.ejf?cmd=getDepartmentBySn",
																	[
																			"id",
																			"name",
																			"trueName",
																			"duty",
																			"tel",
																			"dept",
																			"sex",
																			"email"],
																	"trueName",
																	"id", true,
																	'cache_user_store')),
									{
										xtype : "labelfield",
										fieldLabel : '制单',
										name : "inputUser",
										// value :
										// {trueName:"$!{session.EASYJF_SECURITY_USER.trueName}"},
										renderer : objectRender
									}, {
										xtype : "labelfield",
										fieldLabel : '审核',
										name : "auditor",
										renderer : objectRender
									})]
				}
			},
			// 创建从表单，即可编辑表格
			buildContentForm : function() {
				return editGrid;
			}
		});
		return formPanel;
	},
	createWin : function() {
		var bSize = Ext.getBody().getViewSize();
		var sctn = this.getStockComeTypeText(this.stockComeTypeId);
		return this.initWin(bSize.width - 50, bSize.height - 25, sctn);
	},
	/**
	 * 审核
	 */
	onAuditing : function() {
		var record = this.grid.getSelectionModel().getSelected();
		if (record && record.get(this.entityIdName)) {
			var params = {};
			params[this.entityIdName] = record.get(this.entityIdName);
			Ext.Ajax.request({
						params : params,
						waitMsg : '审核中...',
						scope : this,
						url : Ext.urlAppend(this.baseUrl, {
									cmd : 'auditing'
								}),
						success : function(response) {
							var data = Ext.decode(response.responseText);
							if (Ext.getObjVal(data, 'success')) {
								EasyJF.Ext.Msg.alert('审核成功!', null, function() {
											this.refresh(false);
										}, this);
							} else {
								EasyJF.Ext.Msg.alert('审核失败!');
							}
						}
					});
		} else {
			EasyJF.Ext.Msg.alert('无效的订单!');
		}
	},
	autoBillSn : function() {
		Ext.Ajax.request({
					url : Lanyo_Ajax.formatUrl(this.baseUrl, 'getBillSn'),
					scope : this,
					success : function(response) {
						var sn = Ext.decode(response.responseText);
						this.fp.findField('sn').setValue(sn);
					}
				});
	},
	onCreate : function() {
		this.autoBillSn();
		this.editGrid.getStore().removeAll();
		this.autoAddLastRow();
	},
	edit : function() {
		var record = this.grid.getSelectionModel().getSelected();
		if (!record) {
			EasyJF.Ext.Msg.alert("请先选择要操作的数据！");
			return;
		} else {
			var b = record.get('auditing');
			if (b) {
				this.view();
				return;
			}
		}
		BaseStockComePanel.superclass.edit.apply(this, arguments)
	},
	loadItemsById : function(id) {
		if (id) {
			this.editGrid.getEl().mask();
			var s = this.editGrid.getStore();
			s.removeAll();
			s.baseParams[this.entityIdName] = id;
			s.load({
						scope : this,
						callback : function() {
							this.editGrid.getEl().unmask();
						}
					});
		}
	},
	loadItemsByIdForView : function(id) {
		if (id) {
			this.editGridForView.getEl().mask();
			var s = this.editGridForView.getStore();
			s.removeAll();
			s.baseParams[this.entityIdName] = id;
			s.load({
						scope : this,
						callback : function() {
							this.editGridForView.getEl().unmask();
						}
					});
		}
	},
	onView : function(win, data) {
		if (data && data[this.entityIdName]) {
			this.loadItemsByIdForView(data[this.entityIdName]);
		}
	},
	onEdit : function(id, data) {
		this.loadItemsById(id);
	},
	onAfterRender : function() {
		var tb = this.grid.getTopToolbar();
		var index = tb.items.indexOfKey('btn_refresh');
		this.insertOperator(index, {
					text : "审核",
					disabled : true,
					name : 'btn_auditing',
					itemId : 'btn_auditing',
					showInToolbarOnly : true,
					handler : this.onAuditing,
					singleRow : true,
					scope : this,
					icon : "images/icons/page_code.png"
				});
	},
	onRowSelection : function(record, index, sel) {
		BaseStockComePanel.superclass.onRowSelection.apply(this, arguments)
		var b = record.get('auditing');
		this[(b ? 'disable' : 'enable') + 'OperaterItem']('btn_auditing');
		this[(b ? 'disable' : 'enable') + 'OperaterItem']('btn_edit');
		this[(b ? 'disable' : 'enable') + 'OperaterItem']('btn_remove');
	},
	beforeDestroy : function() {
		if (this._gridContextMenu) {
			Ext.destroy(this._gridContextMenu);
			delete(this._gridContextMenu);
		}
		BaseStockComePanel.superclass.beforeDestroy.call(this);
	},
	buildGridCm : function() {
		this.cm = new Ext.grid.ColumnModel([{
					header : "编号",
					sortable : true,
					width : 300,
					dataIndex : "sn"
				}, {
					xtype : 'datecolumn',
					format : "Y-m-d",
					header : "日期",
					sortable : true,
					width : 300,
					dataIndex : "vdate"
				}, {
					xtype : 'datecolumn',
					format : "Y-m-d H:i:s",
					header : "录入时间",
					sortable : true,
					width : 300,
					dataIndex : "inputTime"
				}, {
					xtype : 'numbercolumn',
					header : "金额",
					sortable : true,
					width : 300,
					dataIndex : "amount"
				}, {
					header : "是否审核",
					sortable : true,
					width : 300,
					dataIndex : "auditing",
					renderer : this.booleanRender
				}, {
					xtype : 'datecolumn',
					format : "Y-m-d H:m:s",
					header : "审核时间",
					sortable : true,
					width : 300,
					dataIndex : "auditTime"
				}, {
					header : "库管员",
					sortable : true,
					width : 300,
					hidden : true,
					dataIndex : "keeper",
					renderer : EasyJF.Ext.Util.objectRender("name")
				}, {
					header : "供应商",
					sortable : true,
					width : 300,
					dataIndex : "supplier",
					renderer : EasyJF.Ext.Util.objectRender("name")
				}, {
					xtype : 'objectcolumn',
					field : 'name',
					header : "仓库",
					sortable : true,
					width : 300,
					dataIndex : "depot"
				}, {
					width : 300,
					header : "录入员工",
					sortable : true,
					dataIndex : "inputUser",
					renderer : EasyJF.Ext.Util.objectRender("trueName")
				}, {
					header : "审核人",
					sortable : true,
					width : 300,
					dataIndex : "auditor",
					renderer : EasyJF.Ext.Util.objectRender("trueName")
				}]);
		return this.cm;
	},
	initComponent : function() {
		this.baseQueryParameter = {};
		this.baseQueryParameter['types'] = this.stockComeTypeId;
		this.cm = this.buildGridCm();
		this.on('afterrender', this.onAfterRender);
		BaseStockComePanel.superclass.initComponent.call(this);
	}
});
/**
 * 入库类单据基类
 */
BaseStockInComePanel = Ext.extendX(BaseStockComePanel, function(superclass) {

	var stockInComeType = {
		0 : "期初入库",
		1 : "采购入库",
		2 : "其他入库"
	};
	return {
		searchWin : {
			title : "高级查询",
			width : 480,
			height : 190
		},
		createGridEditorForView : function() {

			this.editGridForView = new Ext.grid.EditorGridPanel({

						plugins : [new Ext.ux.grid.GridSummary()],
						columns : this.buildEditorGridCmForView(),
						loadMask : true,
						border : false,
						viewConfig : {
							forceFit : true
						},
						store : new Ext.data.JsonStore({
									fields : this.editStoreMapping,
									url : Ext.urlAppend(this.baseUrl, {
												cmd : "loadItemById"
											})
								})
					});
			return this.editGridForView;
		},
		createViewPanel : function() {

			var util = EasyJF.Ext.Util;
			var editGrid = this.editGridForView = this
					.createGridEditorForView();

			var sctn = this.getStockComeTypeText(this.stockComeTypeId);

			var formPanel = new EasyJF.Ext.CascadeForm({

						// 创建北部表单（即主表单信息）
						buildNorthForm : function() {
							return {
								height : 50,
								frame : true,
								border : false,
								layout : 'form',
								style : 'padding:5px;',
								defaults : {
									anchor : '-20'
								},
								labelAlign : 'right',
								labelWidth : 60,
								items : [{
											xtype : 'hidden',
											name : 'id'
										}, util.buildColumnForm(true, {
													fieldLabel : '编号',
													xtype : 'labelfield',
													name : 'sn'
												}, {
													fieldLabel : '单据类型',
													xtype : 'labelfield',
													value : sctn
												}, {
													fieldLabel : '仓库',
													xtype : 'labelfield',
													name : 'depot',
													renderer : util
															.objectRender('name')
												}, {
													fieldLabel : '供应商',
													xtype : 'labelfield',
													name : 'supplier',
													renderer : util
															.objectRender('name')
												}, {
													xtype : 'labelfield',
													fieldLabel : '日期',
													name : 'vdate',
													renderer : EasyJF.Ext.Util
															.dateRender('Y-m-d G:i:s')
												})]
							}
						},
						// 创建南部表单，即主表单附属信息
						buildSouthForm : function() {
							var util = EasyJF.Ext.Util;
							var objectRender = util.objectRender("name");
							return {
								height : 45,
								border : false,
								frame : true,
								region : "south",
								style : 'padding:2px;',
								layout : 'form',
								items : [util.buildColumnForm(true, {
											xtype : 'labelfield',
											fieldLabel : '业务员',
											name : 'seller',
											anchor : "-20"
										}, {
											xtype : "labelfield",
											fieldLabel : '制单',
											name : "inputUser",
											renderer : objectRender
										}, {
											xtype : "labelfield",
											fieldLabel : '审核',
											name : "auditor",
											renderer : objectRender
										})]
							}
						},
						// 创建从表单，即可编辑表格
						buildContentForm : function() {
							return editGrid;
						}
					});
			return formPanel;

		},
		buildEditorGridCmForView : function() {
			var F = Ext.form;
			return [{
						header : "ID",
						hidden : true,
						hideable : false,
						dataIndex : "id",
						width : 100
					}, new Ext.grid.RowNumberer({
								width : 38,
								header : '序号'
							}), {
						header : "产品",
						hidden : true,
						hideable : false,
						dataIndex : "product",
						width : 100
					}, {
						header : "产品编号",
						dataIndex : "productSn",
						width : 100
					}, {
						header : "产品名称",
						dataIndex : "productTitle",
						width : 100
					}, {
						header : "产品价格",
						dataIndex : "price",
						width : 100
					}, {
						header : "销售价格",
						dataIndex : "salePrice",

						width : 100
					}, {
						header : "数量",
						dataIndex : "num",
						width : 100,
						summaryType : 'sum',
						editor : new F.NumberField({
									decimalPrecision : 0,
									minValue : 0
								})
					}, {
						header : "合计",
						dataIndex : "amount",
						width : 100,
						summaryType : 'sum'
					}, {
						header : "销售合计",
						dataIndex : "saleAmount",
						width : 100,
						summaryType : 'sum'
					}, {
						header : "备注",
						dataIndex : "remark",
						width : 100
					}]
		},
		searchFormPanel : function() {
			var form = new Ext.FormPanel({
						frame : true,
						defaults : {
							anchor : '-20'
						},
						bodyStyle : 'padding:5px;',
						labelAlign : 'right',
						items : [
								EasyJF.Ext.Util.easycolumn({
											fieldLabel : '编号',
											name : 'sn'
										}, Ext.apply({}, {
													disableChoice : false
												}, EasyJF.Ext.Util.buildCombox(
														"auditing", "是否审核", [
																["是", true],
																["否", false]],
														null, true)),
										ConfigConst.STOCK.getDepotCombo({
													disableChoice : false,
													allowBlank : true
												}), ConfigConst.STOCK
												.getSupplierCombo({
															allowBlank : true,
															disableChoice : false
														})), {
									xtype : 'compositefield',
									fieldLabel : '单据金额',
									items : [{
												flex : 1,
												anchor : '-20',
												name : 'beginAmount',
												xtype : 'numberfield',
												format : 'Y-m-d'
											}, {
												xtype : 'displayfield',
												value : '至'
											}, {
												flex : 1,
												anchor : '-20',
												name : 'endAmount',
												xtype : 'numberfield',
												format : 'Y-m-d'
											}]
								}, {
									xtype : 'compositefield',
									fieldLabel : '录入时间',
									items : [{
												flex : 1,
												anchor : '-20',
												name : 'startDate',
												xtype : 'datefield',
												format : 'Y-m-d'
											}, {
												xtype : 'displayfield',
												value : '至'
											}, {
												flex : 1,
												anchor : '-20',
												name : 'endDate',
												xtype : 'datefield',
												format : 'Y-m-d'
											}]
								}]
					});
			return form;
		},
		baseUrl : "stockIncome.ejf",
		printData : false,
		selectRowData : function(r) {
			superclass.selectRowData.apply(this, arguments);
			var cell = this.editGrid.getSelectionModel().getSelectedCell();
(function	() {
				var cm = this.editGrid.getColumnModel();
				var row = cell[0];
				var record = this.editGrid.getStore().getAt(row);
				var price = record.get('price'), col;
				col = cm.findColumnIndex(!price ? 'price' : 'num');
				this.editGrid.startEditing(row, col);
			}).defer(200, this);
		},
		getStockComeTypeText : function(typeId) {
			return stockInComeType[typeId];
		}
	}
});
/**
 * 出库类单据基类
 */
BaseStockOutComePanel = Ext.extendX(BaseStockComePanel, function(superclass) {
	var stockOutComeType = {
		0 : "销售出库单",
		1 : "生产领料单",
		2 : "其它出库单"
	};
	var storeMapping = ["client"].concat(superclass.storeMapping)
			.remove('supplier');
	var editStoreMapping = ["client", "salePrice", "saleAmount"]
			.concat(superclass.editStoreMapping);
	return {
		baseUrl : "stockOutcome.ejf",
		storeMapping : storeMapping,
		editStoreMapping : editStoreMapping,
		searchWin : {
			title : "高级查询",
			width : 480,
			height : 190
		},
		createGridEditorForView : function() {

			this.editGridForView = new Ext.grid.EditorGridPanel({

						plugins : [new Ext.ux.grid.GridSummary()],
						columns : this.buildEditorGridCmForView(),
						loadMask : true,
						border : false,
						viewConfig : {
							forceFit : true
						},
						store : new Ext.data.JsonStore({
									fields : this.editStoreMapping,
									url : Ext.urlAppend(this.baseUrl, {
												cmd : "loadItemById"
											})
								})
					});
			return this.editGridForView;
		},
		createViewPanel : function() {

			var util = EasyJF.Ext.Util;
			var editGrid = this.editGridForView = this
					.createGridEditorForView();

			var sctn = this.getStockComeTypeText(this.stockComeTypeId);

			var formPanel = new EasyJF.Ext.CascadeForm({

						// 创建北部表单（即主表单信息）
						buildNorthForm : function() {
							return {
								height : 50,
								frame : true,
								border : false,
								layout : 'form',
								style : 'padding:5px;',
								defaults : {
									anchor : '-20'
								},
								labelAlign : 'right',
								labelWidth : 60,
								items : [{
											xtype : 'hidden',
											name : 'id'
										}, util.buildColumnForm(true, {
													fieldLabel : '编号',
													xtype : 'labelfield',
													name : 'sn'
												}, {
													fieldLabel : '单据类型',
													xtype : 'labelfield',
													value : sctn
												}, {
													fieldLabel : '仓库',
													xtype : 'labelfield',
													name : 'depot',
													renderer : util
															.objectRender('name')
												}, {
													fieldLabel : '供应商',
													xtype : 'labelfield',
													name : 'supplier',
													renderer : util
															.objectRender('name')
												}, {
													xtype : 'labelfield',
													fieldLabel : '日期',
													name : 'vdate',
													renderer : EasyJF.Ext.Util
															.dateRender('Y-m-d G:i:s')
												})]
							}
						},
						// 创建南部表单，即主表单附属信息
						buildSouthForm : function() {
							var util = EasyJF.Ext.Util;
							var objectRender = util.objectRender("name");
							return {
								height : 45,
								border : false,
								frame : true,
								region : "south",
								style : 'padding:2px;',
								layout : 'form',
								items : [util.buildColumnForm(true, {
											xtype : 'labelfield',
											fieldLabel : '业务员',
											name : 'seller',
											anchor : "-20"
										}, {
											xtype : "labelfield",
											fieldLabel : '制单',
											name : "inputUser",
											renderer : objectRender
										}, {
											xtype : "labelfield",
											fieldLabel : '审核',
											name : "auditor",
											renderer : objectRender
										})]
							}
						},
						// 创建从表单，即可编辑表格
						buildContentForm : function() {
							return editGrid;
						}
					});
			return formPanel;

		},
		createForm : function() {
			var util = EasyJF.Ext.Util;
			var editGrid = this.editGrid = this.createGridEditor();

			var sctn = this.getStockComeTypeText(this.stockComeTypeId);

			var formPanel = new EasyJF.Ext.CascadeForm({
				// 创建工具栏
				tbar : this.createFormToolBar(),
				// 创建北部表单（即主表单信息）
				buildNorthForm : function() {
					return {
						height : 50,
						frame : true,
						border : false,
						layout : 'form',
						style : 'padding:5px;',
						defaults : {
							anchor : '-20'
						},
						labelAlign : 'right',
						labelWidth : 60,
						items : [
								{
									xtype : 'hidden',
									name : 'id'
								},
								util.buildColumnForm(true, {
											fieldLabel : '编号',
											allowBlank : false,
											readOnly : true,
											name : 'sn'
										}, {
											fieldLabel : '单据类型',
											xtype : 'labelfield',
											value : sctn
										}, Ext.apply({}, {
													allowBlank : false
												}, ConfigConst.CRM.client),
										util.buildRemoteCombox("depot", "仓库",
												"depot.ejf?cmd=list", ["id",
														"name"], "name", null,
												false), util.buildRemoteCombox(
												"supplier", "供应商",
												"supplier.ejf?cmd=list", ["id",
														"name"], "name", null,
												false), {
											xtype : "datefield",
											fieldLabel : '日期',
											allowBlank : false,
											value : new Date(),
											name : 'vdate',
											format : "Y-m-d"
										})]
					}
				},
				// 创建南部表单，即主表单附属信息
				buildSouthForm : function() {
					var util = EasyJF.Ext.Util;
					var objectRender = util.objectRender("name");
					return {
						height : 45,
						border : false,
						frame : true,
						region : "south",
						style : 'padding:2px;',
						layout : 'form',
						items : [util
								.buildColumnForm(
										true,
										Ext
												.apply(
														{},
														{
															xtype : "employeecombo",
															editable : true,
															anchor : "-20"
														},
														EasyJF.Ext.Util
																.buildRemoteCombox(
																		"seller",
																		"业务员",
																		"employee.ejf?cmd=getDepartmentBySn",
																		[
																				"id",
																				"name",
																				"trueName",
																				"duty",
																				"tel",
																				"dept",
																				"sex",
																				"email"],
																		"trueName",
																		"id",
																		true,
																		'cache_user_store')),
										{
											xtype : "labelfield",
											fieldLabel : '制单',
											name : "inputUser",
											// value :
											// {trueName:"$!{session.EASYJF_SECURITY_USER.trueName}"},
											renderer : objectRender
										}, {
											xtype : "labelfield",
											fieldLabel : '审核',
											name : "auditor",
											renderer : objectRender
										})]
					}
				},
				// 创建从表单，即可编辑表格
				buildContentForm : function() {
					return editGrid;
				}
			});
			return formPanel;
		},
		searchFormPanel : function() {
			var form = new Ext.FormPanel({
						frame : true,
						defaults : {
							anchor : '-20'
						},
						bodyStyle : 'padding:5px;',
						labelAlign : 'right',
						items : [
								EasyJF.Ext.Util.easycolumn({
											fieldLabel : '编号',
											name : 'sn'
										}, Ext.apply({}, {
													disableChoice : false
												}, EasyJF.Ext.Util.buildCombox(
														"auditing", "是否审核", [
																["是", true],
																["否", false]],
														null, true)),
										ConfigConst.STOCK.getDepotCombo({
													disableChoice : false,
													allowBlank : true
												}), Ext.apply({}, {
													allowBlank : false
												}, ConfigConst.CRM.client)), {
									xtype : 'compositefield',
									fieldLabel : '单据金额',
									validateValue : function() {
										var valid = true;
										this.eachItem(function(field) {
													if (!field.isValid())
														valid = false;
												});
										if (this.beginNum.getValue()
												&& this.beginNum.getValue()
												&& valid) {
											console.debug('触发范围');
										}

										return valid;
									},
									items : [{
												flex : 1,
												anchor : '-20',
												ref : 'beginNum',
												name : 'beginAmount',
												xtype : 'numberfield',
												format : 'Y-m-d'
											}, {
												xtype : 'displayfield',
												value : '至'
											}, {
												flex : 1,
												anchor : '-20',
												ref : 'endNum',
												name : 'endAmount',
												xtype : 'numberfield',
												format : 'Y-m-d'
											}]
								}, {
									xtype : 'compositefield',
									fieldLabel : '录入时间',
									items : [{
												flex : 1,
												anchor : '-20',
												name : 'startDate',
												xtype : 'datefield',
												format : 'Y-m-d'
											}, {
												xtype : 'displayfield',
												value : '至'
											}, {
												flex : 1,
												anchor : '-20',
												name : 'endDate',
												xtype : 'datefield',
												format : 'Y-m-d'
											}]
								}]
					});
			return form;
		},
		buildGridCm : function() {
			this.cm = new Ext.grid.ColumnModel([{
						header : "编号",
						sortable : true,
						width : 300,
						dataIndex : "sn"
					}, {
						xtype : 'datecolumn',
						format : "Y-m-d",
						header : "日期",
						sortable : true,
						width : 300,
						dataIndex : "vdate"
					}, {
						xtype : 'datecolumn',
						format : "Y-m-d H:i:s",
						header : "录入时间",
						sortable : true,
						width : 300,
						dataIndex : "inputTime"
					}, {
						xtype : 'numbercolumn',
						header : "金额",
						sortable : true,
						width : 300,
						dataIndex : "amount"
					}, {
						header : "是否审核",
						sortable : true,
						width : 300,
						dataIndex : "auditing",
						renderer : this.booleanRender
					}, {
						xtype : 'datecolumn',
						format : "Y-m-d H:m:s",
						header : "审核时间",
						sortable : true,
						width : 300,
						dataIndex : "auditTime"
					}, {
						header : "客户",
						sortable : true,
						width : 300,
						dataIndex : "client",
						renderer : EasyJF.Ext.Util.objectRender("name")
					}, {
						header : "库管员",
						sortable : true,
						width : 300,
						hidden : true,
						dataIndex : "keeper",
						renderer : EasyJF.Ext.Util.objectRender("name")
					}, {
						xtype : 'objectcolumn',
						field : 'name',
						header : "仓库",
						sortable : true,
						width : 300,
						dataIndex : "depot"
					}, {
						width : 300,
						header : "录入员工",
						sortable : true,
						dataIndex : "inputUser",
						renderer : EasyJF.Ext.Util.objectRender("trueName")
					}, {
						header : "审核人",
						sortable : true,
						width : 300,
						dataIndex : "auditor",
						renderer : EasyJF.Ext.Util.objectRender("trueName")
					}]);
			return this.cm;
		},
		buildEditorGridCmForView : function() {
			var F = Ext.form;
			return [{
						header : "ID",
						hidden : true,
						hideable : false,
						dataIndex : "id",
						width : 100
					}, new Ext.grid.RowNumberer({
								width : 38,
								header : '序号'
							}), {
						header : "产品",
						hidden : true,
						hideable : false,
						dataIndex : "product",
						width : 100
					}, {
						header : "产品编号",
						dataIndex : "productSn",
						width : 100
					}, {
						header : "产品名称",
						dataIndex : "productTitle",
						width : 100
					}, {
						header : "产品价格",
						dataIndex : "price",
						width : 100
					}, {
						header : "销售价格",
						dataIndex : "salePrice",

						width : 100
					}, {
						header : "数量",
						dataIndex : "num",
						width : 100,
						summaryType : 'sum',
						editor : new F.NumberField({
									decimalPrecision : 0,
									minValue : 0
								})
					}, {
						header : "合计",
						dataIndex : "amount",
						width : 100,
						summaryType : 'sum'
					}, {
						header : "销售合计",
						dataIndex : "saleAmount",
						width : 100,
						summaryType : 'sum'
					}, {
						header : "备注",
						dataIndex : "remark",
						width : 100
					}]
		},
		buildEditorGridCm : function() {
			this.productEditor = new ProductComboBox(Ext.apply({}, {
						returnObject : true,
						displayField : "sn",
						valueField : "id",
						width : 300,
						listWidth : 250,
						// onTriggerClick : Ext.emptyFn,
						disableEnterNavigation : true,
						choiceValue : this.selectRowData.createDelegate(this)
					}, ConfigConst.CRM.product));
			var F = Ext.form;
			return [{
						header : "ID",
						hidden : true,
						hideable : false,
						dataIndex : "id",
						width : 100
					}, new Ext.grid.RowNumberer({
								width : 38,
								header : '序号'
							}), {
						header : "产品",
						hidden : true,
						hideable : false,
						dataIndex : "product",
						width : 100
					}, {
						header : "产品编号",
						dataIndex : "productSn",
						width : 100,
						editor : this.productEditor
					}, {
						header : "产品名称",
						dataIndex : "productTitle",
						width : 100
					}, {
						header : "产品价格",
						dataIndex : "price",
						width : 100,
						editor : new Ext.form.NumberField({
									decimalPrecision : 0,
									minValue : 0
								})
					}, {
						header : "销售价格",
						dataIndex : "salePrice",

						width : 100,
						editor : new Ext.form.NumberField()
					}, {
						header : "数量",
						dataIndex : "num",
						width : 100,
						summaryType : 'sum',
						editor : new F.NumberField({
									decimalPrecision : 0,
									minValue : 0
								})
					}, {
						header : "合计",
						dataIndex : "amount",
						width : 100,
						summaryType : 'sum'
					}, {
						header : "销售合计",
						dataIndex : "saleAmount",
						width : 100,
						summaryType : 'sum'
					}, {
						header : "备注",
						dataIndex : "remark",
						width : 100,
						editor : new F.TextField()
					}]
		},
		onAfterEdit : function(e) {
			var field = e.field;
			if (field == 'num' || field == 'salePrice') {
				this.autoCountData(e.record);
			}
		},
		autoCountData : function(record) {
			if (record instanceof Ext.data.Record)
				record.set('amount', parseInt(record.get('price'))
								* Ext.num(record.get('num'), 0));
			record.set('saleAmount', parseInt(record.get('salePrice'))
							* Ext.num(record.get('num'), 0));
		},
		selectRowData : function(r) {
			superclass.selectRowData.apply(this, arguments);
			var cell = this.editGrid.getSelectionModel().getSelectedCell();
(function	() {
				var cm = this.editGrid.getColumnModel();
				var row = cell[0];
				var record = this.editGrid.getStore().getAt(row);
				var price = record.get('salePrice'), col;
				col = cm.findColumnIndex(!price ? 'salePrice' : 'num');
				this.editGrid.startEditing(row, col);
			}).defer(200, this);
		},
		getStockComeTypeText : function(typeId) {
			return stockOutComeType[typeId];
		}
	}
});
/**
 * 所有报表的基类
 * 
 * @class BaseChartPanel
 * @extends Ext.Panel
 */
BaseChartPanel = Ext.extend(Ext.Panel, {
			layout : 'fit',
			border : false,
			hideBorders : true,
			chartUrl : '',
			chartFields : [],
			gridPlugins : [],
			gridConfig : {},
			gridViewConfig : {},
			pageSize : null,
			baseQueryParams : {},
			buildTbar : function() {
				return [{
							itemId : 'startDate',
							msgTarget : 'qtip',
							format : 'Y-m-d',
							xtype : 'datefield',
							emptyText : '开始时间'
						}, "到", {
							itemId : 'endDate',
							msgTarget : 'qtip',
							format : 'Y-m-d',
							xtype : 'datefield',
							emptyText : '结束时间'
						}, "货号", {
							xtype : 'textfield',
							width : 100,
							emptyText : '货号',
							itemId : 'productSn'
						}, "仓库", ConfigConst.STOCK.getDepotCombo({
									disableChoice : false,
									width : 100
								}),
						/*
						 * "供应商",
						 * ConfigConst.STOCK.getSupplierCombo({disableChoice:false,width:100}),
						 */
						{
							text : '查询',
							iconCls : 'search',
							msgTarget : 'qtip',
							handler : this.searchChart,
							scope : this
						}, {
							text : '重置',
							iconCls : 'f5',
							handler : function(btn) {
								this.grid.getStore().removeAll();
								var tb = btn.ownerCt;

								for (var i = 0; i < tb.items.length; i++) {
									var field = tb.items.itemAt(i);
									if (field.isFormField) {
										field.reset();
									}

								}
							},
							scope : this
						}];
			},
			buildGridCm : function() {
				return [];
			},
			buildGrid : function() {
				var gridCfg = Ext.clone(this.gridConfig);
				var gridView = Ext.clone(this.gridViewConfig);
				if (!gridCfg.hasOwnProperty('gridView')) {
					gridView = Ext.apply({}, gridView, {
								forceFit : true
							});
					gridCfg['viewConfig'] = gridView;
				}

				var gridCm = this.buildGridCm(), store = this.getGridStore();

				if (gridCm instanceof Ext.grid.ColumnModel) {
					gridCfg['cm'] = gridCm;
				} else {
					gridCfg['columns'] = gridCm;
				}
				if (Ext.isNumber(this.pageSize)) {
					gridCfg['bbar'] = new EasyJF.Ext.PagingComBo({
								rowComboSelect : true,
								pageSize : this.pageSize,
								store : store,
								displayInfo : true
							});
				};
				gridCfg['store'] = store;
				gridCfg['loadMask'] = true;
				gridCfg['plugins'] = this.gridPlugins;
				var grid = new Ext.grid.GridPanel(gridCfg);
				return grid;
			},
			getGridStore : function() {
				if (!this.store) {
					this.store = new Ext.data.JsonStore({
								root : 'result',
								totalProperty : 'rowCount',
								autoDestroy : true,
								url : this.chartUrl,
								pageSize : this.pageSize,
								fields : this.chartFields
							});
				}
				return this.store;
			},
			searchChart : function() {
				var s = this.getGridStore();
				var t = this.getTopToolbar(), params = t.getValues();
				Ext.apply(s.baseParams, params);
				s.removeAll();
				s.load();
			},
			// private
			storeBeforeLoad : function(store, options) {
				Ext.apply(store.baseParams, this.baseQueryParams);
			},
			numRenderer : function(v) {
				v = Ext.num(parseFloat(v), 0.0);
				if (v < 0) {
					return String.format('<font color="red">{0}</font>', v);
				}
				return v || '';
			},
			initComponent : function() {
				this.grid = this.buildGrid();
				this.tbar = this.buildTbar();
				this.items = [this.grid];
				this.grid.getStore().on('beforeload', this.storeBeforeLoad,
						this);
				BaseChartPanel.superclass.initComponent.call(this);
			}
		});
BasePurchaseAndSalePanel = Ext.extend(EasyJF.Ext.CrudListPanel, {
	url : '',
	/**
	 * 加载附加信息url
	 */
	loadItemUrl : '',
	/**
	 * 是否添加选择框
	 */
	checkBox : false,
	allowSearchByFree : false,
	showSearchField : false,
	panelType : false,
	/**
	 * 是否添加扩展列
	 */
	additionalInformation : false,
	/**
	 * 扩展列模板
	 */
	itemTpl : '',
	/**
	 * 列模型
	 */
	columnModel : function() {
	},
	/**
	 * 是否添加处理操作
	 */
	isOperateRender : false,
	/**
	 * 定义查看表单详细信息window尺寸
	 */
	viewWin : function() {
		var viewSize = Ext.getBody().getViewSize();
		return {
			title : '详细信息',
			width : viewSize.width - 20,
			height : viewSize.height - 50
		};
	},
	/**
	 * 删除一行
	 */
	deleteItem : function() {
		EasyJF.Ext.Util.removeGridRows(this.editGrid);
	},
	/**
	 * 添加一行
	 */
	autoAddLastRow : function() {
		EasyJF.Ext.Util.addEditorGridRow(this.editGrid, this.editStoreMapping,
				{});
	},
	/**
	 * 添加扩展列
	 */
	getDetailItem : function(temp) {
		return new Ext.grid.RowExpander({
					tpl : temp,
					expandOnDblClick : false
				});
	},
	getFormItemForView : function() {
	},
	getSouthItemForView : function() {
	},
	creatTbar : function() {
		this.toolbar = new Ext.Toolbar({
					items : [{
								text : "添加商品(<u>A</u>)",
								handler : this.autoAddLastRow,
								cls : "x-btn-text-icon",
								icon : "images/icons/application_form_add.png",
								scope : this
							}, {
								text : '删除商品',
								handler : this.deleteItem,
								scope : this,
								cls : "x-btn-text-icon",
								icon : "images/icons/application_form_delete.png"
							}]
				});
		return this.toolbar;

	},
	beforeDestroy : function() {
		if (this.toolbar) {
			Ext.destroy(this.toolbar);
			delete(this.toolbar);
		}
		if (this.contextMenu) {
			Ext.destroy(this.contextMenu);
			delete(this.contextMenu);
		}
		if (this.editGrid) {
			Ext.destroy(this.editGrid);
			delete(this.editGrid);
		}
		BasePurchaseAndSalePanel.superclass.beforeDestroy.call(this);
	},
	getColumnModelForView : function() {
		var viewSize = Ext.getBody().getViewSize();
		var geneWidth = (viewSize.width - 20) * 0.094
		var remarkwidth = (viewSize.width - 20) * 0.275;
		return new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
							header : "序号",
							width : 40
						}), {
					dataIndex : "id",
					hidden : true
				}, {
					header : "产品",
					dataIndex : "product",
					xtype : 'objectcolumn',
					field : 'id',
					hidden : true
				}, {
					header : "产品编号",
					dataIndex : "productSn"
				}, {
					header : "产品名称",
					dataIndex : "productTitle",
					width : geneWidth + 40
				}, {
					header : "规格",
					dataIndex : "spec",
					width : geneWidth
				}, {
					header : "单价",
					dataIndex : "price",
					width : geneWidth
				}, {
					header : "颜色",
					dataIndex : "color",
					width : geneWidth
				}, {
					header : "数量",
					dataIndex : "num",
					width : geneWidth,
					summaryType : 'sum',
					editor : new Ext.form.NumberField({
								decimalPrecision : 0,
								minValue : 0
							})
				}, {
					header : "合计",
					dataIndex : "amount",
					width : geneWidth,
					summaryType : 'sum'
				}, {
					header : "备注",
					dataIndex : "remark",
					width : remarkwidth
				}]);
	},
	selectRowData : function(data) {
		var cell = this.editGrid.getSelectionModel().getSelectedCell();
(function() {
			var cm = this.editGrid.getColumnModel();
			var row = cell[0];
			var record = this.editGrid.getStore().getAt(row);
			record.set('price', data.costPrice);
			record.set('color', data.color);
			record.set('spec', data.spec);
			record.set('productTitle', data.name);
			record.set('productSn', data.sn);
			record.set('product', data.id);
			if (row == this.editGrid.getStore().getCount() - 1) {
				this.autoAddLastRow();
			}
			this.editGrid.startEditing(row, 8);
		}).defer(200, this);
	},
	/**
	 * 获取columnModel
	 */
	getFormGridColumnModel : function() {

		this.product = new ProductComboBox(Ext.apply({}, {
					returnObject : true,
					displayField : "sn",
					valueField : "id",
					width : 300,
					listWidth : 300,
					minChars : 0,
					pageSize : 2,
					displayField : 'snName',
					queryParam : "searchKey",
					choiceValue : this.selectRowData.createDelegate(this),
					listeners : {
						select : function(combo, record, index) {
							this.productData = record;
						},
						blur : function(field) {

						},
						scope : this
					},
					disableEnterNavigation : true
				}, ConfigConst.CRM.product));

		/*
		 * this.product = Ext.applyIf({ xtype : "smartcombo", disableChoice :
		 * true, editable : true, baseUrl : "product.ejf", width : 160,
		 * listWidth : 220, forceSelection : true, enableKeyEvents : true,
		 * minChars : 0, pageSize : 2,
		 * 
		 * queryParam : "searchKey", listeners : { select : function(combo,
		 * record, index) { this.productData = record; }, blur : function(field) { },
		 * scope : this } }, EasyJF.Ext.Util.buildRemoteCombox("product", "产品",
		 * "product.ejf?cmd=complete", ["id", "name", 'sn', "costPrice",
		 * 'color', 'spec'], "name", "id", false));
		 */
		var viewSize = Ext.getBody().getViewSize();
		var geneWidth = (viewSize.width - 20) * 0.094
		var remarkwidth = (viewSize.width - 20) * 0.275;

		return [new Ext.grid.RowNumberer({
							header : "序号",
							width : 40
						}), {
					dataIndex : "id",
					hidden : true
				}, {
					header : "产品",
					dataIndex : "product",
					xtype : 'objectcolumn',
					field : 'id',
					hidden : true
				}, {
					header : "产品编号",
					dataIndex : "productSn",
					editor : this.product
				}, {
					header : "产品名称",
					dataIndex : "productTitle",
					width : geneWidth + 40
				}, {
					header : "规格",
					dataIndex : "spec",
					width : geneWidth
				}, {
					header : "单价",
					dataIndex : "price",
					width : geneWidth,
					editor : new Ext.form.NumberField({
								decimalPrecision : 0,
								minValue : 0
							})
				}, {
					header : "颜色",
					dataIndex : "color",
					width : geneWidth
				}, {
					header : "数量",
					dataIndex : "num",
					width : geneWidth,
					summaryType : 'sum',
					editor : new Ext.form.NumberField({
								decimalPrecision : 0,
								minValue : 0
							})
				}, {
					header : "合计",
					dataIndex : "amount",
					width : geneWidth,
					summaryType : 'sum'
				}, {
					header : "备注",
					dataIndex : "remark",
					width : remarkwidth,
					editor : new Ext.form.TextField()
				}];

	},
	editAbleColumn : function() {
		var ed = this.editGrid;
		ed.getColumnModel().setEditable(1, true);
		ed.getColumnModel().setEditable(5, true);
		ed.getColumnModel().setEditable(6, true);
	},
	addLastRow : function() {
		var g = this.editGrid, s = g.getStore();
		if (s.getCount() < 1
				|| Ext
						.getObjVal(s.getAt(s.getCount() - 1).get("product"),
								'id')) {
			var sm = g.getSelectionModel();
			var gsc = sm.getSelectedCell();
			s.add(new s.recordType({
						color : ''
					}));
			if (gsc)
				sm.select(gsc[0], gsc[1]);
		}
	},
	/**
	 * 创建表单表格
	 */
	createFormGrid : function() {
		var gridheight = Ext.getBody().getViewSize().height - 245;
		this.contextMenu = new Ext.menu.Menu({
					items : [{
								text : "添加商品",
								handler : this.autoAddLastRow,
								cls : "x-btn-text-icon",
								icon : "images/icons/application_form_add.png",
								scope : this
							}, {
								text : '删除商品',
								handler : this.deleteItem,
								scope : this,
								cls : "x-btn-text-icon",
								icon : "images/icons/application_form_delete.png"
							}]
				});
		var editGrid = new Ext.grid.EditorGridPanel({
			plugins : [new Ext.ux.grid.GridSummary()],
			sm : new Ext.grid.CellSelectionModel({
						enterNavigation : false
					}),
			columns : this.getFormGridColumnModel(),
			autoScroll : true,
			store : new Ext.data.JsonStore({
						autoLoad : false,
						url : this.loadItemUrl,
						root : "result",
						totalProperty : "rowCount",
						fields : this.editStoreMapping
					}),
			clicksToEdit : 2,
			height : gridheight,
			stripeRows : true,
			columnLines : true,
			keys : [{
						key : Ext.EventObject.F2,
						fn : this.deleteItem,
						scope : this
					}, {
						key : 'k',
						ctrl : true,
						fn : this.autoAddLastRow,
						scope : this
					}],

			listeners : {
				beforeedit : function(e) {
					if (e.field == "productSn")
						this.productData = '';
				},
				afteredit : function(e) {
					var ed = this.editGrid;
					ed.stopEditing();
					var record = this.productData;
					if (record) {
						if (e.field == "productSn") {
							if (!e.record.get('productSn')) {
								this.editGrid.getSelectionModel().enterNavigation = false;
								return false;
							}

							this.selectRowData(record.data);
							this.editGrid.getSelectionModel().enterNavigation = false;
						} else {
							if (e.field == 'num') {
								e.record.set('amount', e.record.get('num')
												* e.record.get('price') || 0);
								this.editGrid.getSelectionModel().enterNavigation = true;

							}
							if (e.field == 'remark') {
								this.editGrid.getSelectionModel().enterNavigation = true;
							}

						}

					} else {
						e.record.set('productSn', '');
						Ext.Msg.alert('提示', '不存在该商品');
					}
				},
				render : function() {
					this.addLastRow();
				},
				rowcontextmenu : function(g, rowIndex, e) {
					e.preventDefault();
					if (rowIndex) {
						this.editGrid.getSelectionModel().select(rowIndex, 1);
					}
					this.contextMenu.showAt(e.getPoint());
				},
				scope : this
			}

		});
		this.editGrid = editGrid;
		return editGrid;
	},
	createFormGridForView : function() {
		var colM = this.getColumnModelForView();
		var gridheight = Ext.getBody().getViewSize().height - 245;
		this.editGridForView = new Ext.grid.EditorGridPanel({
					cm : colM,
					autoScroll : true,
					store : new Ext.data.JsonStore({
								autoLoad : false,
								url : this.loadItemUrl,
								root : "result",
								totalProperty : "rowCount",
								fields : this.editStoreMapping
							}),
					clicksToEdit : 2,
					height : gridheight,
					stripeRows : true,
					columnLines : true,
					plugins : [new Ext.ux.grid.GridSummary()]
				});
		return this.editGridForView;
	},
	addLastRow : function() {
		var g = this.editGrid, s = g.getStore();
		if (s.getCount() < 1
				|| Ext
						.getObjVal(s.getAt(s.getCount() - 1).get("product"),
								'id')) {
			var sm = g.getSelectionModel();
			var gsc = sm.getSelectedCell();
			s.add(new s.recordType({
						color : ''
					}));
			if (gsc)
				sm.select(gsc[0], gsc[1]);
		}
	},
	getFormItem : function() {
	},
	getSouthItem : function() {
	},
	createForm : function() {
		var grid = this.editGrid = this.createFormGrid();
		var items = this.getFormItem();
		util = EasyJF.Ext.Util;
		var southItem = this.getSouthItem();
		var formPanel = new EasyJF.Ext.CascadeForm({
					tbar : this.creatTbar(),
					buildNorthForm : function() {
						return {
							xtype : 'panel',
							layout : 'form',
							height : 42,
							frame : true,
							border : false,
							style : 'padding:2px;',
							defaults : {
								anchor : '-20'
							},
							labelAlign : 'right',
							items : [{
								style : 'margin-left:-45px;',
								items : EasyJF.Ext.Util.buildColumnForm(
										items.length - 1, items)
							}]
						}
					},
					buildSouthForm : function() {
						var objectRender = util.objectRender("name");
						return {
							height : 45,
							border : false,
							frame : true,
							region : "south",
							style : 'padding:2px;',
							items : EasyJF.Ext.Util.buildColumnForm(true,
									southItem)
						}
					},
					buildContentForm : function() {
						return grid;
					}
				});
		return formPanel;
	},
	createViewPanel : function() {
		this.createFormGridForView();
		var grid = this.editGridForView;
		var items = this.getFormItemForView();
		util = EasyJF.Ext.Util;
		var southItem = this.getSouthItemForView();
		var formPanel = new EasyJF.Ext.CascadeForm({
					buildNorthForm : function() {
						return {
							xtype : 'panel',
							layout : 'form',
							height : 42,
							frame : true,
							border : false,
							style : 'padding:2px;',
							defaults : {
								anchor : '-20'
							},
							labelAlign : 'right',
							items : [{
								style : 'margin-left:-45px;',
								items : EasyJF.Ext.Util.buildColumnForm(
										items.length - 1, items)
							}]
						}
					},
					buildSouthForm : function() {
						var objectRender = util.objectRender("name");
						return {
							height : 45,
							border : false,
							frame : true,
							region : "south",
							style : 'padding:2px;',
							items : EasyJF.Ext.Util.buildColumnForm(true,
									southItem)
						}
					},
					buildContentForm : function() {
						return grid;
					}
				});
		return formPanel;
	},
	searchWin : {
		title : "高级查询",
		width : 480,
		height : 190
	},
	searchFormPanel : function() {
		return new Ext.form.FormPanel({
					frame : true,
					bodyStyle : 'margin-left:10px;margin-right:10px;',
					labelWidth : 70,
					items : [EasyJF.Ext.Util.buildColumnForm(2, {
								xtype : 'numberfield',
								name : 'sn',
								fieldLabel : '订单编号'
							}, Ext.applyIf({
										emptyText : '',
										fieldLabel : '订单状态',
										name : 'status',
										hiddenName : 'status'
									}, EasyJF.Ext.Util.buildCombox([["全部", ""],
													["未审核", 0], ["已经审核", 1],
													["已作废", -1]], 1, true)), {
								fieldLabel : "开始时间",
								xtype : 'datefield',
								width : 90,
								name : "startTime",
								format : "Y-m-d"
							}, {
								xtype : 'datefield',
								fieldLabel : "结束时间",
								width : 90,
								name : 'endTime',
								format : "Y-m-d"
							}, Ext.apply({}, {
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

									}, EasyJF.Ext.Util
											.buildRemoteCombox("employee",
													"业务员",
													"employee.ejf?cmd=list", [
															"id", "name"],
													"name", "id", true)),
							this.panelType ? Ext.apply({}, {
										xtype : "smartcombo",
										disableChoice : true,
										editable : true,
										typeAhead : true,
										enableKeyEvents : true,
										width : 160,
										listWidth : 200,
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

									}, EasyJF.Ext.Util
											.buildRemoteCombox("supplier",
													"供应商",
													"supplier.ejf?cmd=list", [
															"id", "name"],
													"name", "id", true)) : Ext
									.apply(
											{},
											{
												xtype : "smartcombo",
												disableChoice : true,
												editable : true,
												typeAhead : true,
												enableKeyEvents : true,
												width : 160,
												listWidth : 200,
												minChars : 2,
												pageSize : 20,
												queryParam : "searchKey",
												listeners : {
													select : function(combo,
															record, index) {
														this.clientselected = record;
													},
													scope : this
												}

											},
											EasyJF.Ext.Util.buildRemoteCombox(
													"client", "客户",
													"client.ejf?cmd=list", [
															"id", "name"],
													"name", "id", true)), Ext
									.apply({}, {
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

											},
											EasyJF.Ext.Util.buildRemoteCombox(
													"inputUser", "录入员",
													"employee.ejf?cmd=list", [
															"id", "name"],
													"name", "id", true)), {
								xtype : 'numberfield',
								name : 'amount',
								fieldLabel : '金额大于'
							})]
				});
	},
	addToolbar : function() {
		this.grid.getTopToolbar().insert(
				7,
				[
						{
							text : '批量处理',
							iconCls : "auditing",
							name : "btn_batchdell",
							handler : this.batchDeel,
							scope : this
						},
						'->',
						"订单号:",
						{
							xtype : 'numberfield',
							width : 70,
							name : 'sn'
						},
						"时间:从",
						{
							xtype : 'datefield',
							width : 90,
							name : 'startTime',
							format : "Y-m-d"
						},
						"到",
						{
							xtype : 'datefield',
							name : 'endTime',
							width : 90,
							format : "Y-m-d"
						},
						"状态",
						Ext.apply({
									width : 70,
									fieldLabel : '订单状态',
									name : 'status',
									xtype : "smartcombo",
									disableChoice : true
								}, EasyJF.Ext.Util.buildCombox([["全部", ""],
												["未审核", 0], ["已经审核", 1],
												["已作废", -1]], 1, false)), {
							text : "查询",
							iconCls : 'search',
							handler : this.quickSearch,
							scope : this
						}]);
	},
	quickSearch : function() {
		Ext.apply(this.grid.getStore().baseParams, this.grid.getTopToolbar()
						.getValues());
		this.grid.getStore().load();
	},
	onCreate : function() {
		this.editGrid.getStore().removeAll();
		this.addLastRow();
	},

	onSave : function() {
		var id = this.fp.getForm().findField('id').getValue();
		if (id) {
			this.collapseRow();
		}
	},
	save : function() {
		this.allowAction = true;
		var str = this.editGrid.getStore();
		for (var i = 0; i < str.getCount(); i++) {
			var record = str.getAt(i);
			if (record.get('product')) {
				if (!!!record.get('num') || !!!record.get('price')) {
					Ext.Msg.alert('提示', '产品数量和产品价钱不能为空');
					this.allowAction = false;
					break;
				}

			} else {
				str.removeAt(i);
			}
		}
		if (!this.allowAction) {
			return;
		}
		var o = EasyJF.Ext.Util.getEditGridData(this.editGrid, "items_");
		this.fp.form.baseParams = o;
		BasePurchaseAndSalePanel.superclass.save.call(this);
	},
	onEdit : function(id, data) {
		if (id) {
			this.loadItems(id);
		}
	},
	onRowSelection : function(record, index, sel) {
		BasePurchaseAndSalePanel.superclass.onRowSelection.call(this);
		var status = record.get('status');
		if (status == 1) {
			this.disableOperaterItem('btn_edit');
			this.disableOperaterItem('btn_remove');
		}

	},
	loadItems : function(id, formPanel) {
		this.editGrid.getStore().removeAll();
		this.editGrid.getStore().reload({
					params : {
						parent : id
					}
				});

	},
	loadItemsForView : function(id, formPanel) {
		this.editGridForView.getStore().removeAll();
		this.editGridForView.getStore().reload({
					params : {
						parent : id
					}
				});

	},
	onView : function(win, r) {
		this.loadItemsForView(r.id)
	},
	createWin : function() {
		var viewSize = Ext.getBody().getViewSize();
		return this.initWin(viewSize.width - 20, viewSize.height - 50,
				this.winTitle);
	},
	/**
	 * 加载扩展信息
	 */
	loadPersonality : function(pid, expander, body) {
		Ext.Ajax.request({
					url : this.loadItemUrl + "&parent=" + pid,
					success : function(res) {
						eval("var per=Ext.decode(res.responseText);");
						if (per) {
							this.itemTpl.overwrite(body, per.result)
						}
					},
					scope : this
				})
	},
	operateRender : function(v, p, r) {
		var t = new Ext.Template("<a href='{2}' theid='{2}' op='{1}' onclick='return false'><font color='blue'>{0}</font></a>");
		if (v === 0)
			return t.applyTemplate(["审核", "auditing", r.get("id")]) + "　"
					+ t.applyTemplate(["作废", "blankOut", r.get("id")]);
	},
	collapseRow : function() {
		var s = this.grid.getStore();
		for (var i = 0; i < s.getCount(); i++) {
			var r = s.getAt(i);
			if (this.rowExpander.state[r.id]) {
				rowIndex = this.grid.getStore().indexOf(r);
				this.rowExpander.collapseRow(rowIndex);
			}
		}

	},
	/**
	 * 批量审核
	 */
	batchDeel : function() {
		Ext.Msg.confirm("处理确认", "确定要批量吗？", function(ret) {
			if (ret == 'yes') {
				var records = this.grid.getSelectionModel().getSelections();
				if (records.length < 1) {
					Ext.Msg.alert('提示', '请选择需要处理的数据!!');
				} else {
					var ids = new Array();
					for (var i = 0; i < records.length; i++) {
						if (records[i].get('status') == 1) {
							Ext.Msg.alert('提示', '你选择的数据中有已经审核的数据!!');
							return false;
						}
						ids[i] = records[i].get('id');
					}
					ids[records.length + 1] = 2;
					var params = {
						ids : ids
					};
					Ext.Ajax.request({
								url : this.baseUrl + '?cmd=batchDel',
								method : 'POST',
								params : params,
								success : function(res) {

									eval("var per=Ext.decode(res.responseText);");
									if (per) {
										if (eval(per.success)) {
											Ext.Msg.alert('提示', '审核成功');
											this.grid.getStore().removeAll();
											this.grid.getStore().reload();
											this.grid.getSelectionModel()
													.clearSelections();
											this.collapseRow();
										} else {
											Ext.Msg.alert('提示', '审核失败，原因是:'
															+ per.errors.error);
										}
									}

								},
								scope : this
							});
				}
			}
		}, this);

	},
	initComponent : function() {
		var col = this.columnModel();
		if (this.checkBox) {
			this.chkM = new Ext.grid.CheckboxSelectionModel();
			col.unshift(this.chkM);
		}
		if (this.additionalInformation) {
			this.rowExpander = this.getDetailItem(this.itemTpl);
			expander = this.rowExpander;
			col.unshift(expander);
			expander.on('beforeexpand', function(expand, record, body, index) {
						this.loadPersonality(record.get('id'), expander, body);
					}, this);

			this.gridConfig = {
				plugins : [expander]
			};
		}

		Ext.apply(this.gridConfig, {
					sm : this.chkM,
					colModel : new Ext.grid.ColumnModel(col),
					listeners : {
						cellclick : function(g, rowIndex, columnIndex, e) {
							if (columnIndex != 1 && columnIndex != 0) {
								if (e.ctrlKey) {
									if (!this.chkM.isSelected(rowIndex)) {
										this.chkM.selectRow(rowIndex, true);
									}
								} else {
									this.chkM.clearSelections();
									this.chkM.selectRow(rowIndex, true);
								}
							}
						},
						scope : this
					}
				});

		this.cm = new Ext.grid.ColumnModel(col);
		BasePurchaseAndSalePanel.superclass.initComponent.call(this);
	},
	afterList : function() {
		if (this.allowSearchByFree) {
			this.addToolbar();
		}

		BasePurchaseAndSalePanel.superclass.afterList.call(this);
	}
});
BasePurchaseAndSaleReportPanel = Ext.extend(Ext.Panel, {
	url : '',
	getMenu : function() {
	},
	getColumnModel : function() {
	},
	autoScroll : true,
	showChart : false,
	storeMapping : [],
	groupField : 'id',
	charTitle : '',
	layout : "fit",
	chartType : '',
	charByName : '',
	border : false,
	bodyBorder : false,
	groupSearch : function(object) {
		if (this.items) {
			var s = this.items.itemAt(0).getStore();
			this.groupField = object.name;
			this.charByName = object.text;
			var tbar = this.items.itemAt(0).getTopToolbar();
			Ext.apply(s, {
						sortInfo : {
							field : "types",

							direction : "ASC"
						},
						groupField : "types"
					});
			s.baseParams = Ext.apply({}, tbar.getValues());
			s.load({
						params : {
							field : this.groupField,
							cmd : 'groupBy'
						}
					});
		}
	},
	refresh : function() {
		if (this.items)
			this.items.itemAt(0).getStore().reload();
	},
	createChartWin : function() {
		if (!this.chartWin) {
			this.chartWin = new Ext.Window({
						title : '统计图表',
						modal : true,
						border : false,
						hideBorders : true,
						width : 500,
						height : 400,
						closeAction : 'hide',
						layout : 'fit'
					});
		} else {
			this.chartWin.remove(this.chartPanel);
			this.chartPanel.destroy();
		}
		return this.chartWin;
	},
	getXmlData : function(s, title) {
		var xmlData = "<chart caption='" + title + "-" + this.charByName + "'>";
		for (var i = 0; i < s.getCount(); i++) {
			var r = s.getAt(i);
			var rp = {};
			if (i > 0) {
				var rp = s.getAt(i - 1);
				if (rp.get('types') == r.get('types')) {
					if (r.get('sn') == '合计:') {
						xmlData += r.get('num') + "' />";
					}
				} else {
					xmlData += "<set label='" + r.get('types') + "' value='";
				}
			} else {
				xmlData += "<set label='" + r.get('types') + "' value='";

			}
		}
		xmlData += "</chart>";
		return xmlData;
	},
	getPiePanel : function(s) {
		var xmlData = this.getXmlData(s, "产品" + this.charTitle + "饼状图")
		chartPanel = new EasyJF.Ext.chart.PicChart({
					store : s,
					tpl : new Ext.XTemplate(xmlData)
				});

		return chartPanel;

	},
	getColumnPanel : function(s) {
		var xmlData = this.getXmlData(s, "产品" + this.charTitle + "柱状图")
		chartPanel = new EasyJF.Ext.chart.ColumnChart({
					store : s,
					tpl : new Ext.XTemplate(xmlData)
				});
		return chartPanel;
	},
	getLinePanel : function(s) {
		var xmlData = this.getXmlData(s, "产品" + this.charTitle + "线性图")
		chartPanel = new EasyJF.Ext.chart.LineChart({
					store : s,
					tpl : new Ext.XTemplate(xmlData)
				});
		return chartPanel;
	},
	getTplData : function() {
		var objs = {
			title : this.chartTitle,
			list : [],
			order : false
		};
		return objs;
	},

	getStore : function() {
		return this.store;
	},
	beforeDestory : function() {
		if (this.store) {
			delete this.store;
			this.bindStore();
		}
	},
	createChart : function(object) {
		if (this.items) {
			this.createChartWin();
			this.chartType = object.name;
			this.chartPanel = {};
			var s = this.items.itemAt(0).getStore();
			if (this.chartType == 'pie') {
				this.chartPanel = this.getPiePanel(s);
				this.chartWin.setTitle('产品' + this.charTitle + '饼状');
			}
			if (this.chartType == 'column') {
				this.chartPanel = this.getColumnPanel(s);

				this.chartWin.setTitle('产品' + this.charTitle + '柱状图');
			}
			if (this.chartType == 'line') {
				this.chartPanel = this.getLinePanel(s);

				this.chartWin.setTitle('产品' + this.charTitle + '线性图');
			}
			if (this.chartPanel) {
				this.chartWin.add(this.chartPanel);
				this.chartWin.doLayout();
				this.chartWin.show();
			}
		}
	},
	getGrid : function() {
		var grid = new Ext.grid.GridPanel({
					columns : this.getColumnModel(),
					border : false,
					tbar : [
							'从:',
							{
								xtype : 'datefield',
								name : 'startTime',
								width : 90,
								format : "Y-m-d"
							},
							'-',
							'到:',
							{
								xtype : 'datefield',
								name : 'endTime',
								width : 90,
								format : "Y-m-d"
							},
							'-',
							'状态:',
							Ext.applyIf({
										xtype : "smartcombo",
										disableChoice : true,
										width : 70,
										hiddenName : 'status',
										name : 'status'
									}, EasyJF.Ext.Util.buildCombox([["全部", ""],
													["未审核", 0], ["已经审核", 1],
													["已作废", -1]], 1, false)),
							'-', {
								text : '分  组  查  询 ',
								iconCls : 'search',
								menu : this.getMenu(),
								scope : this
							}, {
								text : '图 标 查  询 ',
								iconCls : 'chart',
								hidden : this.showChart ? false : true,
								menu : [{
											name : 'pie',
											iconCls : 'chartPic',
											text : '饼状图',
											handler : this.createChart,
											scope : this
										}, {
											name : 'column',
											text : '直方图',
											iconCls : 'chart',
											handler : this.createChart,
											scope : this
										}, {
											name : 'line',
											text : '条形图',
											iconCls : 'chart',
											handler : this.createChart,
											scope : this
										}],
								scope : this
							}, {
								text : '重置',
								iconCls : 'f5',
								id : 'f5reload' + this.id,
								handler : function(btn) {
									this.grid.getStore().removeAll();
									var tb = btn.ownerCt;
									for (var i = 0; i < tb.items.length; i++) {
										var field = tb.items.itemAt(i);
										if (field.isFormField) {
											field.reset();
										}
									}
								},
								scope : this
							}],
					loadMask : {
						msg : '正在加载数据.....'
					},
					store : new Ext.data.GroupingStore({
								reader : new Ext.data.JsonReader({
											fields : this.storeMapping,
											root : "result",
											totalProperty : "rowCount"
										}),
								url : this.url,
								sortInfo : {
									field : "types",
									direction : "ASC"
								},
								fields : this.storeMapping,
								groupField : "types"
							}),
					bbar : new EasyJF.Ext.PagingComBo({
								displayInfo : true,
								rowComboSelect : true,
								store : this.store
							}),
					view : new Ext.grid.GroupingView({
								showGroupsText : '显示分组头部',
								groupByText : "按此字段分组",
								groupTextTpl : '{group}'
										+ '-记录数:{[values.rs.length-1]}条'
							})
				});
		return grid;
	},
	initComponent : function() {
		this.items = this.getGrid();
		BasePurchaseAndSaleReportPanel.superclass.initComponent.call(this);

	}
});

Ext.ns('EasyJF.Ext.chart');

EasyJF.Ext.chart.BaseChart = Ext.extend(Ext.Panel, {
			/**
			 * @cfg {Ext.data.Store} store The {@link Ext.data.Store} the grid
			 *      should use as its data source (required).
			 */
			emptyData : '<chart></chart>',
			tpl : new Ext.XTemplate(
					'<chart baseFontSize="11" caption="{title}"> ',
					'<tpl for="list">',
					'<set label="{name}" value="{value}" />', '</tpl></chart>'),
			afterRender : function() {
				EasyJF.Ext.chart.BaseChart.superclass.afterRender.apply(this);
				if (this.store) {
					this.bindStore(this.store, true);
				}
			},
			bindStore : function(store, init) {
				if (init) {
					store.on({
								scope : this,
								load : this.refreshData,
								clear : this.refreshData
							});
					this.refreshData();
				} else {
					store.un("clear", this.refreshData, this);
					store.un("load", this.refreshData, this);
				}
			},
			refreshData : function() {
				var datas = [];
				var objs = {
					title : this.chartTitle,
					list : [],
					order : false
				};
				this.getStore().each(function(record) {
							datas.push(record.data);
						}, this);
				objs.list = datas;
				var dataXML = this.tpl.applyTemplate(objs);
				var s = this.body.getBox();
				var charId = Ext.id('', "ext__fusionCharts__");
				this.chart = this.createChart(charId);
				this.chart.setTransparent();
				this.chart.setDataXML(dataXML);
				this.chart.render(this.body.dom);
				Ext.getDom(charId).setAttribute('width', '100%');
				Ext.getDom(charId).setAttribute('height', '100%');
			},
			createChart : function(charId) {
			},
			getStore : function() {
				return this.store;
			},
			beforeDestroy : function() {
				if (this.store) {
					this.bindStore(this.store, false);
					delete this.store;
				}
				EasyJF.Ext.chart.BaseChart.superclass.beforeDestroy.call(this);
			},
			initComponent : function() {
				EasyJF.Ext.chart.BaseChart.superclass.initComponent.call(this);
			}
		});

EasyJF.Ext.chart.PicChart = Ext.extend(EasyJF.Ext.chart.BaseChart, {
			createChart : function(charId) {
				return ChartTools.createPie3D("", {
							width : 1,
							height : 1,
							id : charId
						});
			}
		});
EasyJF.Ext.chart.ColumnChart = Ext.extend(EasyJF.Ext.chart.BaseChart, {
			createChart : function(charId) {
				return ChartTools.createColumn3D("", {
							width : 1,
							height : 1,
							id : charId
						});
			}
		});
EasyJF.Ext.chart.LineChart = Ext.extend(EasyJF.Ext.chart.BaseChart, {
			createChart : function(charId) {
				return ChartTools.createLine("", {
							width : 1,
							height : 1,
							id : charId
						});
			}
		});
