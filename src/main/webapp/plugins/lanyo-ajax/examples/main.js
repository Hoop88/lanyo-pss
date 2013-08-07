﻿var main;

Ext.QuickTips.init();
Ext.ns('App');

window.Global = window.Global || {};

Global=Ext.apply(Global, {
	iframe:false,
	openExtAppNode:function(node,e){
		App.main.openExtAppNode.call(this,node,e);		
	}
});

function menuClick(node, e) {
	if (node.attributes.appClass) {
		var script = node.attributes.script||("crm/" + node.attributes.appClass + ".js");
		if(node.attributes.addObject){
			EasyJF.Ext.Util.addObject(node.attributes.appClass,null,node.attributes.script,node.attributes.otherScripts);
		}else{
			node.attributes.script=script;	
			Global.openExtAppNode(node, e);
		}
	}
}
Global.SystemMenus = [
	{
		title : '蓝源RIA平台ExtJs示例'
	}
];
MenuPanel = function() {
		var MenuTreePanel = Ext.extend(Ext.tree.TreePanel,{
			border : false,
			lines : false,
			children : [],
			rootVisible : false,
			style:"margin-bottom:5px;margin-top:5px",
			listeners:{click:this.openNodeApp},
			initComponent:function(){
				this.root =new Ext.tree.AsyncTreeNode({
					loader : new Ext.tree.TreeLoader({preloadChildren:true}),
					children:this.children
				});
				MenuTreePanel.superclass.initComponent.call(this);
			}
		});
		var menus = [],menuChildren = [],titleTpl = "<span style='margin-left:10px;font-weight: bold;'>{0}</span>";
		Ext.each(Ext.samples.samplesCatalog,function(item,i){
			menuChildren.push({
				href : "#sample-"+i,
				text : item.title,
				hrefTarget : '_parent',
				leaf : true
			});
		});
		menus.push({
			title : String.format(titleTpl,"蓝源RIA平台ExtJs示例"),
			iconCls:"icon-join",
			items: new MenuTreePanel({children:menuChildren})
		});
		MenuPanel.superclass.constructor.call(this, {
			id : 'menu',
			region : 'west',
			title : '功能选项',
			split : true,
			items:menus,
			border:false,
			width : 250,
			collapsible : true,
			minSize : 200,maxSize : 250,
			hideCollapseTool:true,
			layout : "accordion",
			defaults:{autoScroll:true,border: false}
		});
};
Ext.extend(MenuPanel, Ext.Panel,{
    openNodeApp:function(n,e){
        if(n.isLeaf() && n.attributes.appClass){
             menuClick(n,e);
        }
    }
});

Ext.ns('Ext.samples');
SamplePanel = Ext.extend(Ext.DataView, {
		autoHeight : true,
		frame : true,
		cls : 'demos',
		itemSelector : 'dd',
		overClass : 'over',
		tpl : new Ext.XTemplate(
			'<div id="sample-ct">',
			'<tpl for=".">',
			'<div><a name="{id}"></a><h2><div>{title}</div></h2>',
			'<dl>',
			'<tpl for="samples">',
			'<dd ext:url="{url}"><img src="shared/screens/{icon}"/>',
			'<div><h4>{text}',
			'<tpl if="this.isNew(values.status)">',
			'<span class="new-sample"> (New)</span>', '</tpl>',
			'<tpl if="this.isUpdated(values.status)">',
			'<span class="updated-sample"> (Updated)</span>',
			'</tpl>',
			'<tpl if="this.isExperimental(values.status)">',
			'<span class="new-sample"> (Experimental)</span>',
			'</tpl>', '</h4><p>{desc}</p></div>', '</dd>',
			'</tpl>', '<div style="clear:left"></div></dl></div>',
			'</tpl>', '</div>', {
				isExperimental : function(status) {
					return status == 'experimental';
				},
				isNew : function(status) {
					return status == 'new';
				},
				isUpdated : function(status) {
					return status == 'updated';
				}
		}),
		onClick : function(e) {
			var group = e.getTarget('h2', 3, true);
			if (group) {
				group.up('div').toggleClass('collapsed');
			} else {
				var t = e.getTarget('dd', 5, true);
				if (t && !e.getTarget('a', 2)) {
				var url = t.getAttributeNS('ext', 'url');
					window.open(url);
				}
			}
			return SamplePanel.superclass.onClick.apply(this, arguments);
		}
});
Ext.samples.SamplePanel = SamplePanel;
Ext.reg('samplespanel', Ext.samples.SamplePanel);

MainPanel = function() {
	//Ejf.Ext.Util.asLoadScript('',false);
	var catalog = Ext.samples.samplesCatalog;
	for (var i = 0, c; c = catalog[i]; i++) {
		c.id = 'sample-' + i;
	}
	var store = new Ext.data.JsonStore({
		idProperty : 'id',
		fields : ['id', 'title', 'samples'],
		data : catalog
	});
	MainPanel.superclass.constructor.call(this, {
		id : 'main',
		region : 'center',
		margins : '0 2 0 0',			
		layoutOnTabChange:true,
        plugins:[new EasyJF.Ext.TabPanelPlugin],
		border:false,
		items : {
			border : false,
			id : 'all-demos',
			title : '首 页',
			closable : false,
            xtype:'panel',
            border:false,
            allowDrag:false,
            tabFixed:true,
            frame : true,
			autoScroll : true,
			items : new SamplePanel({store : store})
		}
	});	
	this.on("render",this.loadPersonality,this);
};
Ext.extend(MainPanel, EasyJF.Ext["MainTabPanel"]);

Ext.apply(MainPanel.prototype,{activeTab:0},Ext.ux.panel.DDTabPanel.prototype);

Ext.onReady(function() {
		Ext.BLANK_IMAGE_URL='../../extjs/ext-3.2/resources/images/default/s.gif';
		App.header = new Ext.Panel({
			border : false,
			region : 'north',
			layout:'anchor',
			height : 73,
            split : true,
            collapseMode:'mini',
			items :{
				 xtype:"box",
				 border : true,
				 el:"header",
				 autoShow : true,
                 anchor: '100% -23'
			}
		});
		App.menu = new MenuPanel();
		main = App.main = new MainPanel();		
		var clock = new Ext.Toolbar.TextItem('');
		var pr=new Ext.Toolbar.TextItem("版权所有及技术支持　<a href='http://www.lanyotech.com' target='_blank'><font color=blue>成都蓝源信息技术有限公司</font></a>");
		
		App.bottom=	new Ext.Toolbar({cls:"x-statusbar",id:"bottom",frame:true,region:"south",height:25,items:["->",pr,clock],listeners:{
			render:{fn:function(){
	            Ext.TaskMgr.start({
			        run: function(){
			            Ext.fly(clock.getEl()).update(new Date().format('g:i:s A'));
			        },
			        interval: 1000
			    });
			},delay:500}
		}});
		
		var viewport = new Ext.Viewport({
			hideBorders: true,
			layout : 'fit',
			items : [{id:"desktop",layout:"border",items:[App.header, App.menu, App.main,App.bottom]}]
		});	
		
		setTimeout(function() {
			Ext.get('loading').remove();
			Ext.get('loading-mask').fadeOut({
				remove : true
			});				
		}, 300);
})
