/**
 * @author ssvfhppl采购订单
 * @class PurchaseBillPanel
 * @extends BasePurchaseAndSalePanel
 */

PurchaseBillPanel = Ext.extend(BasePurchaseAndSalePanel, {
	id : "purchasebillPanel",
	baseUrl : "purchaseBill.ejf",
	checkBox : true,
	panelType : true,
	winTitle : '采购订单管理',
	additionalInformation : true,
	allowSearchByFree : true,
	printData : true,
	loadItemUrl : 'purchaseBillItem.ejf?cmd=list',
	itemTpl : new Ext.XTemplate(
			'<tpl><table width="1100"><div><tr><th><b>采购产品</b></th><th><b>采购数量</b></th><th><b>采购单价</b></th><th><b>采购总价</b></th><th><b>备注</b></th></tr></div><tpl for=".">',
			'<div><tr style="text-align:left;"><td><tpl if="values.product">{[values.product.name]}</tpl></td><td><tpl if="values.num">{num}</tpl></td><td><tpl if="values.price">{price}</tpl></td><td><tpl if="values.amount">{amount}</tpl></td><td><tpl if="values.remark">{remark}</tpl></td></tr><div>',
			'</tpl></table></tpl>'),
	getFormItemForView : function() {
		return [{
					xtype : "hidden",
					name : "id"
				}, {
					xtype : 'labelfield',
					fieldLabel : '订单编号',
					name : 'sn'
				}, {
					fieldLabel : '单据类型',
					xtype : 'labelfield',
					value : '采购订单'
				}, {
					fieldLabel : '交易时间',
					name : 'vdate',
					xtype : 'labelfield',
					renderer : EasyJF.Ext.Util.dateRender('Y-m-d')
				}, {
					xtype : "labelfield",
					name : 'supplier',
					fieldLabel : '供应商',
					renderer : EasyJF.Ext.Util.objectRender('name')
				}];
	},
	getFormItem : function() {
		this.supplier = Ext.apply({}, {
					xtype : "smartcombo",
					disableChoice : true,
					editable : true,
					typeAhead : true,
					enableKeyEvents : true,
					width : 160,
					listWidth : 200,
					minChars : 0,
					pageSize : 20,
					queryParam : "searchKey"
				}, EasyJF.Ext.Util.buildRemoteCombox("supplier", "供应商",
						"supplier.ejf?cmd=list", ["id", "name"], "name", "id",
						false));
		return [{
					xtype : "hidden",
					name : "id"
				}, {
					fieldLabel : '订单编号',
					name : 'sn',
					value : new Date().getTime() + Ext.id()
				}, {
					fieldLabel : '单据类型',
					xtype : 'labelfield',
					value : '采购订单'
				}, {
					xtype : 'datefield',
					fieldLabel : '交易时间',
					format : "Y-m-d",
					name : 'vdate',
					value : new Date()
				}, this.supplier];
	},
	getSouthItem : function() {
		return [
				Ext.apply({}, {
							xtype : "employeecombo",
							editable : true
						}, EasyJF.Ext.Util.buildRemoteCombox("buyer", "业务员",
								"employee.ejf?cmd=getDepartmentBySn", ["id",
										"name", "trueName", "duty", "tel",
										"dept", "sex", "email"], "trueName",
								"id", false)), {
					xtype : "labelfield",
					fieldLabel : '制单',
					name : "inputUser",
					renderer : EasyJF.Ext.Util.objectRender('trueName')
				}, {
					xtype : "labelfield",
					fieldLabel : '审核',
					name : "auditor",
					renderer : EasyJF.Ext.Util.objectRender('trueName')
				}]
	},
	getSouthItemForView : function() {
		return [{
					xtype : "labelfield",
					name : 'buyer',
					fieldLabel : '业务员',
					renderer : EasyJF.Ext.Util.objectRender('trueName')
				}, {
					xtype : "labelfield",
					fieldLabel : '制单',
					name : "inputUser",
					renderer : EasyJF.Ext.Util.objectRender('trueName')
				}, {
					xtype : "labelfield",
					fieldLabel : '审核',
					name : "auditor",
					renderer : EasyJF.Ext.Util.objectRender('trueName')
				}]
	},
	statuses : [["<font color='blue'>已审核<font>", 1], ['已提交', 0], ['已作废', -1]],
	editStoreMapping : ["id", "bill", "product", "price", "num", "amount",
			"remark", 'color', 'spec'],
	columnModel : function() {
		return [{
					header : "订单编号",
					sortable : true,
					width : 300,

					dataIndex : "sn"
				}, {
					header : "订单发生时间",
					sortable : true,
					width : 300,

					dataIndex : "vdate",
					renderer : EasyJF.Ext.Util.dateRender('Y-m-d G:i:s')
				}, {
					header : "录入时间",
					sortable : true,
					width : 300,

					dataIndex : "inputTime",
					renderer : EasyJF.Ext.Util.dateRender('Y-m-d G:i:s')
				}, {
					header : "录入人",
					sortable : true,
					xtype : 'objectcolumn',
					field : 'trueName',
					width : 300,
					dataIndex : "inputUser"
				}, {
					header : "业务员",
					sortable : true,
					xtype : 'objectcolumn',
					field : 'trueName',
					width : 300,
					dataIndex : "buyer"
				}, {
					header : "状态",
					sortable : true,

					width : 300,
					dataIndex : "status",
					renderer : EasyJF.Ext.Util.typesRender(this.statuses)
				}, {
					header : "金额",
					sortable : true,

					width : 300,
					dataIndex : "amount"
				}, {
					header : "审核时间",
					sortable : true,
					width : 300,

					dataIndex : "auditTime",
					renderer : EasyJF.Ext.Util.dateRender('Y-m-d G:i:s')
				}, {
					header : "操作",
					sortable : true,
					width : 300,
					dataIndex : "status",
					renderer : this.operateRender
				}];
	},
	editStoreMapping : ["id", "bill", "product", {
				name : 'productSn',
				mapping : 'product.sn'
			}, "price", "num", "amount", "remark", 'color', 'spec', {
				name : 'productTitle',
				mapping : 'product.name'
			}],
	storeMapping : ["id", "sn", "types", "vdate", "inputTime", "remark",
			"auditing", "auditTime", "inputUser", "status", "auditor",
			"amount", "supplier", "buyer"],
	initComponent : function() {
		PurchaseBillPanel.superclass.initComponent.call(this);
	}
});