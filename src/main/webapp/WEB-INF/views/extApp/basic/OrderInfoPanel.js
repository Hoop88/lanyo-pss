/**
 * author ssvfhppl
 * 
 * @class OrderInfoPanel
 * @extends BasePurchaseAndSalePanel
 */
OrderInfoPanel = Ext.extend(BasePurchaseAndSalePanel, {
	id : "orderinfoPanel",
	baseUrl : "orderInfo.ejf",
	showSearchField : false,
	checkBox : true,
	panelType : false,
	printData : true,
	winTitle : '销售订单管理',
	additionalInformation : true,
	allowSearchByFree : true,
	loadItemUrl : 'orderInfoItem.ejf?cmd=list',
	itemTpl : new Ext.XTemplate(
			'<tpl><table width="1100"><div><tr><th><b>产品名称</b></th><th><b>产品规格</b></th><th><b>产品单价</b></th><th><b>数量</b></th><th><b>产品总价</b></th><th><b>备注</b></th></tr></div><tpl for=".">',
			'<div><tr style="text-align:left;"><td><tpl if="values.product">{[values.product.name]}</tpl></td>',
			'<td><tpl if="values.product">{[values.product.spec||""]}</tpl></td>',
			'<td><tpl if="values.price">{price}</tpl></td><td>',
			'<tpl if="values.num">{num}</tpl></td><td><tpl if="values.amount">{amount}</tpl></td><td><tpl if="values.remark">{remark}</tpl></td></tr><div>',
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
					value : '销售订单'
				}, {
					fieldLabel : '交易时间',
					name : 'vdate',
					xtype : 'labelfield',
					renderer : EasyJF.Ext.Util.dateRender('Y-m-d')
				}, {
					xtype : "labelfield",
					name : 'client',
					fieldLabel : '客户',
					renderer : EasyJF.Ext.Util.objectRender('name')
				}];
	},
	getFormItem : function() {
		this.client = Ext.apply({}, {
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
				}, EasyJF.Ext.Util.buildRemoteCombox("client", "客户",
						"client.ejf?cmd=list", ["id", "name"], "name", "id",
						true));
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
					value : '销售订单'
				}, {
					xtype : 'datefield',
					fieldLabel : '交易时间',
					format : "Y-m-d",
					name : 'vdate',
					value : new Date()
				}, this.client];
	},
	statuses : [["<font color='blue'>已审核<font>", 1], ['已提交', 0], ['已作废', -1]],
	getSouthItem : function() {
		return [
				Ext.apply({}, {
							xtype : "employeecombo",
							editable : true
						}, EasyJF.Ext.Util.buildRemoteCombox("seller", "业务员",
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

	storeMapping : ["id", "sn", "types", "vdate", "inputUser", "remark",
			"auditing", "auditTime", 'client', 'seller', 'status', 'auditor',
			"amount"],
	editStoreMapping : ["id", "orderInfo", "product", {
				name : 'productSn',
				mapping : 'product.sn'
			}, "price", "num", "amount", "remark", 'spec', 'color', {
				name : 'productTitle',
				mapping : 'product.name'
			}],
	columnModel : function() {
		return [{
					header : "id",
					sortable : true,
					hidden : true,
					width : 300,
					dataIndex : "id"
				}, {
					header : "编号",
					sortable : true,
					width : 300,
					dataIndex : "sn"
				}, {
					header : "下单时间",
					sortable : true,
					width : 300,
					dataIndex : "vdate",
					renderer : EasyJF.Ext.Util.dateRender('Y-m-d G:i:s')
				}, {
					header : "客户",
					sortable : true,
					width : 300,
					dataIndex : "client",
					renderer : EasyJF.Ext.Util.objectRender('name')
				}, {
					header : "业务员",
					sortable : true,
					width : 300,
					dataIndex : "seller",
					renderer : EasyJF.Ext.Util.objectRender('trueName')
				}, {
					header : "金额",
					sortable : true,
					width : 300,
					dataIndex : "amount"
				}, {
					header : "状态",
					sortable : true,
					width : 300,
					dataIndex : "status",
					renderer : EasyJF.Ext.Util.typesRender(this.statuses)
				}, {
					header : "审核时间",
					sortable : true,
					width : 300,
					dataIndex : "auditTime",
					renderer : EasyJF.Ext.Util.dateRender('Y-m-d G:i:s')
				}, {
					header : "审核人",
					sortable : true,
					width : 300,
					dataIndex : "auditor",
					renderer : EasyJF.Ext.Util.objectRender('trueName')
				}, {
					header : "操作",
					sortable : true,
					width : 300,
					dataIndex : "status",
					renderer : this.operateRender
				}]
	},

	initComponent : function() {
		OrderInfoPanel.superclass.initComponent.call(this);
	}
});
