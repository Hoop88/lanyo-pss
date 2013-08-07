var main, menu, header, bottom, onlineWindow, loginWin, messageWindow;
Ext.QuickTips.init();
if (typeof Global === "undefined") {
	Global = {};
}
Global = Ext.apply(Global, {
			iframe : false,
			openExtAppNode : function(node, e) {
				main.openExtAppNode.call(this, node, e);
			}
		});

Global.SystemMenus = [{
			title : '采购管理',
			children : [{
						text : "采购单管理",
						leaf : true,
						appClass : "PurchaseBillPanel",
						script : "basic/PurchaseBillPanel.js"
					}]
		}, {
			title : '销售管理',
			children : [{
						text : "销售管理",
						leaf : true,
						appClass : "OrderInfoPanel",
						script : "basic/OrderInfoPanel.js"
					}, {
						text : "库存查询",
						leaf : true,
						appClass : "ProductStockPanel",
						script : "stock/ProductStockPanel.js"
					}]
		}, {
			title : '库存管理',
			children : [{
						text : "即使库存",
						leaf : true,
						appClass : "ProductStockPanel",
						script : "stock/ProductStockPanel.js"
					}, {
						text : "出库",
						children : [{
									text : '销售出库',
									leaf : true,
									appClass : "SellStockOutcomePanel",
									script : "stock/SellStockOutcomePanel.js"
								}, {
									text : '生产领料',
									leaf : true,
									appClass : "MaterialStockOutcomePanel",
									script : "stock/MaterialStockOutcomePanel.js"

								}, {
									text : '其他出库',
									leaf : true,
									appClass : "OtherStockOutcomePanel",
									script : "stock/OtherStockOutcomePanel.js"

								}]
					}, {
						text : "入库",
						children : [{
									text : '期初入库',
									leaf : true,
									appClass : "BeginningStockIncomePanel",
									script : "stock/BeginningStockIncomePanel.js"
								}, {
									text : '采购入库',
									leaf : true,
									appClass : "StockIncomePanel",
									script : "stock/StockIncomePanel.js"
								}, {
									text : '其他入库',
									leaf : true,
									appClass : "OtherStockIncomePanel",
									script : "stock/OtherStockIncomePanel.js"
								}]
					}]
		}, {
			title : "报表中心",
			children : [{
						text : "采购报表",
						leaf : true,
						appClass : "PurchaseReportPanel",
						script : "chart/PurchaseReportPanel.js"
					}, {
						text : "销售报表",
						leaf : true,
						appClass : "SaleReportPanel",
						script : "chart/SaleReportPanel.js"
					}, {
						text : "进销存明细账",
						leaf : true,
						appClass : "ERPAccountDetailPanel",
						script : "chart/ERPAccountDetailPanel.js"
					}, {
						text : "进销存序时帐",
						leaf : true,
						appClass : "ERPJournalLedgerPanel",
						script : "chart/ERPJournalLedgerPanel.js"
					}, {
						text : "进销存汇总表",
						leaf : true,
						appClass : "ERPSummarySheetPanel",
						script : "chart/ERPSummarySheetPanel.js"
					}]
		}, {
			title : "基础数据维护",
			children : [{
						text : "货品管理",
						leaf : true,
						appClass : "ProductPanel",
						script : "basic/ProductPanel.js"
					}, {
						text : "货品类别管理",
						leaf : true,
						appClass : "ProductDirManagePanel",
						script : "basic/ProductDirManagePanel.js"
					},/*
						 * { text : "货品分类设置", leaf : true, appClass :
						 * "ProductPanel", script : "ProductPanel.js" },
						 */{
						text : "仓库设置",
						leaf : true,
						appClass : "DepotPanel",
						script : "basic/DepotPanel.js"
					}, {
						text : "客户管理",
						leaf : true,
						appClass : "ClientPanel",
						script : "basic/ClientPanel.js"
					}, {
						text : "供应商管理",
						leaf : true,
						appClass : "SupplierPanel",
						script : "basic/SupplierPanel.js"
					}]
		}, {
			title : "系 统 管 理",
			children : [{
						text : "数据字典",
						leaf : true,
						appClass : "SystemDictionaryManagePanel",
						script : "systemManage/SystemDictionaryManagePanel.js"
					}, {
						text : "修改密码",
						leaf : true,
						appClass : "ChangePasswordWindow",
						script : "ChangePasswordWindow.js"
					}, {
						text : "部门管理",
						leaf : true,
						appClass : "DepartmentPanel",
						script : "basic/DepartmentPanel.js"
					}, {
						text : "员工管理",
						leaf : true,
						appClass : "EmployeeManagePanel",
						script : "basic/EmployeeManage.js"
					}, {
						text : "系统权限设置",
						children : [{
									text : "系统菜单",
									leaf : true,
									appClass : "SystemMenuManagePanel",
									script : "systemManage/SystemMenuManagePanel.js"
								}, {
									text : "系统角色",
									leaf : true,
									appClass : "RoleManagePanel",
									script : "systemManage/RoleManagePanel.js"
								}, {
									text : "系统权限",
									leaf : true,
									appClass : "PermissionPanelManage",
									script : "systemManage/PermissionPanel.js"
								}, {
									text : "系统资源",
									leaf : true,
									appClass : "SystemResourcePanel",
									script : "systemManage/SystemResourcePanel.js"
								}]
					}]
		}];

function menuClick(node, e) {
	if (node.attributes.appClass) {
		var script = node.attributes.script
				|| (node.attributes.appClass + ".js");
		if (script == "ChangePasswordWindow"
				|| script == "ChangePasswordPanel.js") {
			var win = new ChangePasswordWindow();
			vin.show();
			return;
		}
		if (node.attributes.addObject) {
			EasyJF.Ext.Util.addObject(node.attributes.appClass, null,
					node.attributes.script, node.attributes.otherScripts);
		} else {
			node.attributes.script = script;
			Global.openExtAppNode(node, e);
		}
	}
};
MenuPanel = function() {
	/**
	 * js内部类实现方式 lanyo增强
	 */
	var SystemMenuTreePanel = Ext.extendX(Ext.tree.TreePanel, function() {
				var openNodeApp = this.openNodeApp;
				return {
					border : false,
					lines : false,
					children : [],
					rootVisible : false,
					style : "margin-bottom:5px;margin-top:5px",
					/**
					 * 构建菜单根节点
					 */
					buildTreeRoot : function() {
						var root = new Ext.tree.AsyncTreeNode({
									loader : new Ext.tree.TreeLoader({
												preloadChildren : true,
												iconCls : 'lanyo-tree-node-icon'
											}),
									children : this.children || []
								});
						return root;
					},
					initComponent : function() {
						this.root = this.buildTreeRoot();
						this.on('click', openNodeApp, this);
						SystemMenuTreePanel.superclass.initComponent.call(this);
					}
				}
			}, this);

	var menus = [];
	var titleTpl = "<span style='margin-left:10px;font-weight: bold;'>{0}</span>";

	var isLocal = true;

	if (isLocal) {
		Ext.each(Global.SystemMenus, function(item) {
					var menu = {
						title : String.format(titleTpl, item.title),
						iconCls : "icon-join",
						items : new SystemMenuTreePanel({
									children : item.children
								})
					}
					menus.push(menu);
				}, this);
	} else {
		Ext.Ajax.request({
					async : false,
					url : 'systemMenu.ejf?cmd=getUserMenuTree&all=true',
					callback : function(respnose) {
						var res = Ext.decode(respnose.responseText);
						Ext.each(res, function(item) {
									var menu = {
										title : String.format(titleTpl,
												item.text),
										iconCls : "icon-join",
										items : new SystemMenuTreePanel({
													children : item.children
												})
									}
									menus.push(menu);
								});
					}
				});
	}
	MenuPanel.superclass.constructor.call(this, {
				id : 'menu',
				region : 'west',
				title : '功能选项',
				split : true,
				items : menus,
				border : false,
				width : 180,
				collapsible : true,
				minSize : 180,
				maxSize : 250,
				hideCollapseTool : true,
				layout : "accordion",
				defaults : {
					autoScroll : true,
					border : false
				}
			});
};
Ext.extend(MenuPanel, Ext.Panel, {
			openNodeApp : function(n, e) {
				if (n.isLeaf() && n.attributes.appClass) {
					menuClick(n, e);
				}
			}
		});

MainPanel = function() {
	var homePage = Lanyo_Ajax.getCfg('homePage');

	var homeCfg = {
		id : 'homePage',
		title : '首 页',
		xtype : 'panel',
		border : false,
		tabFixed : true,
		closable : false,
		allowDrag : false
	}
	if (homePage == 'menu') {
		Ext.apply(homeCfg, {
					xtype : 'ux.portal'
				});
	} else {
		Ext.apply(homeCfg, {
					html : {
						tag : 'div',
						style : 'text-align:center;',
						cn : [{
									tag : 'h1',
									html : '我是自定义首页'
								}]
					}
				});
	}

	MainPanel.superclass.constructor.call(this, {
				id : 'main',
				region : 'center',
				margins : '0 2 0 0',
				layoutOnTabChange : true,
				plugins : [new EasyJF.Ext.TabPanelPlugin],
				border : false,
				items : homeCfg
			});
	this.on("render", this.loadPersonality, this);
};
Ext.extend(MainPanel, EasyJF.Ext["MainTabPanel"]);

Ext.apply(MainPanel.prototype, {
			activeTab : 0
		}, Ext.ux.panel.DDTabPanel.prototype);

Ext.onReady(function() {
    EasyJF.Ext.Util.loadScript("OnlineMessageManager","extApp.ejf?cmd=loadScript&script=onlineChat.js",function(){
                onlineWindow=new OnlineUserWindow();    
                OnlineMessageManager.start();
            });
	header = new Ext.Panel({
				border : false,
				region : 'north',
				layout : 'anchor',
				height : 73,
				maxHeight : 73,
				minHeight : 73,
				split : true,
				collapseMode : 'mini',
				items : [{
					xtype : "box",
					border : true,
					el : "header",
					autoShow : true,
					anchor : '100% -23',
					listeners : {
						scope : this,
						afterrender : function(box) {
							box.getEl().on('click', function(e) {
								var t = e.getTarget('a', null, true);
								var value = Ext.fly(t).getAttribute('skin',
										'ext');
								if (value) {
									Lanyo_Ajax.setCfg('style', value);
									EasyJF.Ext.Util.applySkin(value);
								}
							}, this, {
								delegate : 'a'
							});
						}
					}
				}]
			});
    (function(){
	    var img=new Image();
	    img.src="http://www.erpwin.com:30310/visit.ejf?cmd=pic&p=lanyopss";
	}());        
	menu = new MenuPanel();
	main = new MainPanel();
	var currentUser = new Ext.Toolbar.TextItem(Ext.getObjVal(Global.User,
			'trueName'));
	var clock = new Ext.Toolbar.TextItem('');
	var pr = new Ext.Toolbar.TextItem("版权所有及技术支持　<a href='http://www.lanyotech.com' target='_blank'><font color=blue>成都蓝源信息技术有限公司</font></a>");
	bottom = new Ext.Toolbar({
				cls : "x-statusbar",
				id : "bottom",
				frame : true,
				region : "south",
				height : 25,
				items : ["当前用户：", currentUser, "->", pr, clock],
				listeners : {
					render : {
						fn : function() {
							Ext.TaskMgr.start({
										run : function() {
											Ext.fly(clock.getEl())
													.update(new Date()
															.format('g:i:s A'));
										},
										interval : 1000
									});
						},
						delay : 500
					}
				}
			});
	bottom.currentUser = currentUser;

	var viewport = new Ext.Viewport({
				hideBorders : true,
				layout : 'fit',
				items : [{
							id : "desktop",
							layout : "border",
							items : [header, menu, main, bottom]
						}]
			});

	setTimeout(function() {
				Ext.get('loading').remove();
				Ext.get('loading-mask').fadeOut({
							remove : true
						});
			}, 300);
});
