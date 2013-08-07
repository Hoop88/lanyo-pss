/**
 * Portal，
 *  每一个Portal都继承此类，
 *  该类提供了，一些常用的toolbar,及其处理事件
 */
 Ext.ns('Global.Portal');
 /**
  * Portal 支持的模式
  */
Global.Portal.Models=[{
		id : 1 ,
		colCfg : [1],
		icon : 'images/portalStyle/style1.gif'
	},{
		id : 2 ,
		colCfg : [.5,.5],
		icon : 'images/portalStyle/style2.gif'
	},{
		id : 3 ,
		colCfg : [.3,.7],
		icon : 'images/portalStyle/style3.gif'
	},{
		id : 4 ,
		colCfg : [.7,.3],
		icon : 'images/portalStyle/style4.gif'
	},{
		id : 5 ,
		colCfg : [1/3,1/3,1/3],
		icon : 'images/portalStyle/style5.gif'
	},{
		id : 6 ,
		colCfg : [.25,.25,.5],
		icon : 'images/portalStyle/style6.gif'
	},{
		id : 7 ,
		colCfg : [.5,.25,.25],
		icon : 'images/portalStyle/style7.gif'
	},{
		id : 8 ,
		colCfg : [.25,.5,.25],
		icon : 'images/portalStyle/style8.gif'
	}
];
Ext.ux.PortletPanel = Ext.extend(Ext.ux.Portlet,{
	height:320,
	collapsible:false,
	layout:'fit',
	loadSettingUrl : '', //加载配置url
	saveSettingUrl : '',//保存配置url
	/**
	 * 创建设置form
	 * @type 
	 */
	getSettingForm:Ext.emptyFn,
	/**
	 * 展开portal面板
	 */
	onMinus:function(){
		this.tools['minus'].hide();
		this.tools['plus'].show();
		this.collapse(false);
	},
	/**
	 * 折叠portal面板
	 */
	onPlus:function(){
		this.tools['minus'].show();
		this.tools['plus'].hide();
		this.expand(false);
	},
	/**
	 * 最大化
	 */
	onMaximize:function(){
		this.exitSettingForm();
		this.viewMode = 'max';
		var tools = [];
		if(this.getSettingForm != Ext.emptyFn){
			tools.push({
				id: 'gear',
				scope : this,
				handler:function(){
					var sf = this.getSettingForm('win');
					if(sf){
						var fn = function(){
							sf.buttons[0].disable();
							sf.el.mask(Ext.LoadMask.prototype.msg,'x-mask-loading');
							sf.load({
								scope:this,
								url : this.loadSettingUrl ,
								success : function(form,action){
									sf.el.unmask();
									sf.buttons[0].enable();
									this.fireEvent('loadSetting',this,form,action);
								}
							});
						}
						if(sf.rendered){
							fn.call(this);
						}else{
							sf.on('render',fn,this);
						}
					}
					if(!this.maxWin.getItem(sf)){
						this.maxWin.add(sf);
					}
					this.maxWin.getLayout().setActiveItem(sf);
				}
			});
		}
		this.maxWin = new Ext.Window({
			modal : true,
			width : 800,
			height : 500,
			activeItem:0,
			border : false,
			layout : 'card',
			title: this.title,
			layoutOnCardChange:true,
			resizable : false,
			tools : tools,
			items:this.buildContent(),
			listeners:{
				scope:this,
				close:function(){
					this.viewMode = 'min';
					delete this.maxWin;
					var sf = null;
					if(sf = this.getSettingForm('win')){
						delete this[sf.panelName];
						sf.destroy();
					}
				}
			}
		}).show();
		/*var container = Ext.getBody();
		container.addClass('x-body-masked');
        this.mask.setSize(Ext.lib.Dom.getViewWidth(true), Ext.lib.Dom.getViewHeight(true));
        this.mask.show();
        
        this.lastOwnerct = this.ownerCt;
        this.lastOwnerctIndex = this.ownerCt.items.indexOf(this);
        this.ownerCt.remove(this,false);
        var zIndex = this.mask.getStyle('z-index');
        this.setSize(800,500);
        var xy = this.el.getAlignToXY(container, 'c-c');
        this.el.appendTo(Ext.getBody());
        var p = this.el.translatePoints(xy[0],xy[1]);
        this.el.position('position',zIndex++,p.left,p.top);*/
		//this.setVisableTools(false,'maximize','minus');
	},
	onMinimize : function(){
		this.viewMode = 'min';
		/*this.el.clearPositioning();
		this.setSize('auto',this.height);
        this.lastOwnerct.insert(this.lastOwnerctIndex,this);
        this.lastOwnerct.doLayout();
        this.mask.hide();*/
        //this.setVisableTools(true,'maximize','minus');
	},
	onClose:function(){
		if(this.viewMode=='max'){
			this.onMinimize();
		}else{
			delete this.lastOwnerct;
			if(this.ownerCt){
				this.ownerCt.remove(this);
			}else{
				this.destroy();
			}
		}
	},
	setVisableTools:function(visable){
		var args = Array.prototype.slice.call(arguments,1) ;
		Ext.each(args,function(tool){
			var t = null;
			if(t = this.tools[tool]) t[visable ? 'show' : 'hide']();
		},this);
	},
	/**
	 * 将portal进入设置模式
	 */
	onGear:function(){
		var sf = this.getSettingForm();
		if(sf){
			var fn = function(){
					sf.buttons[0].disable();
					sf.el.mask(Ext.LoadMask.prototype.msg,'x-mask-loading');
					sf.load({
						scope:this,
						url : this.loadSettingUrl ,
						success : function(form,action){
							sf.el.unmask();
							sf.buttons[0].enable();
							this.fireEvent('loadSetting',this,form,action);
						}
					});
			}
			if(sf.rendered){
				fn.call(this);
			}else{
				sf.on('render',fn,this);
			}
			if(!this.main.getItem(sf))this.main.add(sf);
			this.main.getLayout().setActiveItem(sf);
		}
	},
	onLoadSettingSuccess:function(p,form,action){},
	onSaveSettingSuccess:function(p,form,action){},
	onSaveSetting:function(btn){
		var sf = btn.refOwner;
		sf.el.mask(Ext.LoadMask.prototype.msg,'x-mask-loading');
		sf.getForm().submit({
			scope:this,
			url : this.saveSettingUrl,
			success:function(form,action){
				sf.el.unmask();
				this.fireEvent('savesetting',this,form,action);
			}
		});
	},
	exitSettingForm:function(){
		if(this.viewMode=='max'){
			this.autoHeight = false;
			this.maxWin.getLayout().setActiveItem(0);
		}else{
			this.autoHeight = false;
			this.main.autoHeight = false;
			this.main.getLayout().setActiveItem(0);
		}
	},
	createTools:function(){
		return [
			{id:'gear',handler:this.onGear,hidden:this.getSettingForm===Ext.emptyFn,scope:this},
			{id:'minus',handler:this.onMinus,scope:this},
			{id:'plus',handler:this.onPlus,hidden:true,scope:this},
			{id:'maximize',handler:this.onMaximize,scope:this},
			{id:'close',handler:this.onClose,scope:this}
		];
	},
	beforeDestroy : function(){
        Ext.destroy(this.mask);
        Ext.ux.PortletPanel.superclass.beforeDestroy.call(this);
    },
	afterRender:function(){
		Ext.ux.PortletPanel.superclass.afterRender.call(this);
		this.mask = Ext.getBody().createChild({cls:'ext-el-mask'});
        this.mask.enableDisplayMode('block');
        this.mask.hide();
	},
	buildContent:function(){
		return this.createContent();
	},
	createContent:function(){
		return {};		
	},
	initComponent:function(){
		this.addEvents(
			'loadSetting' , // 加载设置成功
			'savesetting'  // 保存设置成功
		);
		/*this.draggable={
			onBeforeDrag : function(data, e){
				var p = data.panel;
		        return (p.viewMode!=='max');
		    }
		}*/
		this.tools = this.createTools();
		this.items = {
			ref : 'main',
			layout: 'card',
			activeItem : 0,
			items : this.createContent()
		};
		this.on('loadSetting',this.onLoadSettingSuccess,this);
		this.on('savesetting',this.onSaveSettingSuccess,this);
		Ext.ux.PortletPanel.superclass.initComponent.call(this);
	}
});
Ext.reg('portletpanel',Ext.ux.PortletPanel);

Ext.ux.PortalPanelColumn = Ext.extend(Ext.ux.PortalColumn,{defaultType:'portletpanel'});
Ext.reg('portalpanelcolumn',Ext.ux.PortalPanelColumn);

/**
 * 适用于图片的portal
 * @class Ext.ux.ImgPortletPanel
 * @extends Ext.ux.PortletPanel
 */
Ext.ux.ImgPortletPanel = Ext.extend(Ext.ux.PortletPanel,{
	portletType:'img',
	bodyStyle:'text-align:center;',
	/**
	 * lastBodySize //用来记录上次图片更新的大小
	 */
	refreshImg:function(p){
		var imgCmp = p,re = imgCmp.getResizeEl();
		var size = re.getStyleSize();
		var width = size.width;
		var imgMinWidth = imgCmp.imgMinWidth;
		var imgMaxWidth = imgCmp.imgMaxWidth;
		if(width < imgMinWidth){
			width = imgMinWidth;
			re.setStyle('overflow','auto');
		}else{
			if(imgMaxWidth && width> imgMaxWidth) width = imgMaxWidth;
			re.setStyle('overflow','hidden');
		}
		if(Ext.isEmpty(imgCmp.lastBodySize)){
			imgCmp.lastBodySize = size;
			imgCmp.el.update(String.format('<img src="{0}"/>',Ext.urlAppend(this.url,Ext.urlEncode({
				width : width,
				height : size.height
			}))));
		}else{
			var isLoad = false;
			if(width && (imgCmp.lastBodySize.width != width)){
				var w =Math.abs(imgCmp.lastBodySize.width - width);
				if(w>20){
					isLoad = true;
					imgCmp.lastBodySize.width = width;
				}
			}
			if(!isLoad && size.height && (imgCmp.lastBodySize.height != size.height)){
				var h =Math.abs(imgCmp.lastBodySize.height - size.height);
				if(w>20){
					isLoad = true;
					imgCmp.lastBodySize.height = size.height;
				}
			}
			if(isLoad){
				imgCmp.el.update(String.format('<img src="{0}"/>',Ext.urlAppend(this.url,Ext.urlEncode({
					width : width,
					height : size.height
				}))));
			}
		}
	},
	onImgCmpResize:function(p,w,h){
		this.refreshImg(p,w,h);
	},
	buildContent:function(){
		return {
			xtype:'box',
			/**
			 * 定义图片最小的宽度
			 * @cfg {Number} minWidth
			 */
			imgMinWidth:null,
			/**
			 * 定义图片最大的宽度
			 * @cfg {Number} minWidth
			 */
			imgMaxWidth:null,
			listeners:{
				scope:this,
				resize:this.onImgCmpResize
			}
		};
	},
	createContent:function(){
		return {
			/**
			 * 定义图片最小的宽度
			 * @cfg {Number} minWidth
			 */
			imgMinWidth:null,
			/**
			 * 定义图片最大的宽度
			 * @cfg {Number} minWidth
			 */
			imgMaxWidth:650,
			xtype:'box',
			ref:'/imgCmp',
			listeners:{
				scope:this,
				resize:this.onImgCmpResize
			}
		};
	}
	/*onResize:function(){
		this.refreshImg();
		Ext.ux.ImgPortletPanel.superclass.onResize.apply(this,arguments);
	},*/
});
Ext.reg('imgportletpanel',Ext.ux.ImgPortletPanel);

/**
 * 适用于grid的portal
 * @class Ext.ux.GridPortletPanel
 * @extends Ext.ux.PortletPanel
 */
Ext.ux.GridPortletPanel = Ext.extend(Ext.ux.PortletPanel,{
	portletType:'grid',
	/**
	 * store url
	 * @type 
	 */
	url : null,
	/**
	 * grid columns配置 与 Ext.grid.GridPanel一样使用
	 * @type 
	 */
	columns:[],
	/**
	 * store 的 fields
	 * @type 
	 */
	storeMapping:[],
	/**
	 * grid Config配置 
	 * @type 
	 */
	gridConfg:{},
	/**
	 * gridView的配置信息
	 * @type 
	 */
	gridViewConfig:{},
	/**
	 * grid是否自动加载数据
	 * @type Boolean
	 */
	gridAutoLoad:true,
	/**
	 * grid的静态值
	 * @type 
	 */
	gridInitData:null,
	buildGrid:function(){
		this.store = this.store || new Ext.data.JsonStore({
			url:this.url,
			root:'result',
			totalProperty:'rowCount',
			fields:this.storeMapping,
			autoLoad:this.gridAutoLoad
		});
		return new Ext.grid.GridPanel(Ext.apply({
			columns : this.buildColumns(),
			//autoExpandColumn:this.columns.length-1,
			viewConfig:Ext.apply({forceFit:true},this.gridViewConfig),
			store : this.store
		},this.gridConfg));
	},
	buildContent:function(){
		var grid = this.buildGrid();
		if(grid && !this.gridAutoLoad && this.gridInitData){
			grid.getStore().loadData(this.gridInitData);
		}
		return grid ;
	},
	createContent:function(){
			this.grid = this.buildContent();
		return this.grid;
	},
	onMaximize:function(){
		Ext.ux.GridPortletPanel.superclass.onMaximize.call(this);
		var cm = this.grid.getColumnModel();
		this.maxWin.mon(cm,'hiddenchange',function(cm, colIndex, hidden){
			this.maxWin.getItem(0).getColumnModel().setHidden(colIndex, hidden);
		},this);
	},
	initComponent:function(){
		Ext.ux.GridPortletPanel.superclass.initComponent.call(this);
	}
});
//用于存储已定义好的protal
Global.Portal.PanelMC = new Ext.util.MixedCollection;



/**
 * 样式选择框
 * EasyJF.Ext.Util.SelectStyleWin  
 */
EasyJF.Ext.Util.SelectStyleWin = (function(){
	var win,dataView;
	var closeHandler = function(){
		win.hide();
	}
	var applyHandler = function(){
		if(Ext.isFunction(win.callback)){
			var record = dataView.getSelectedRecords()[0];
			win.callback.call(win.scope||this,record);
			win.hide();
		}
	}
	dataView = new Ext.DataView({
		singleSelect:true,
		itemSelector:'div.item',
		overClass:'over',
		cls:'portal-styleSetting-dataView',
		tpl : new Ext.XTemplate(
			'<tpl for=".">',
				'<div class="item"><img src="{icon}"/></div>',
			'</tpl>'
		),
		store : new Ext.data.JsonStore({
			data : Global.Portal.Models,
			fields : ['id','colCfg','icon'] 
		})
	});
	win = new Ext.Window({
		layout:'fit',
		cls:'portal-styleSetting-window',
		modal : true,
		resizable:false,
		constrain:true,
		closeAction : 'hide',
		bodyStyle:'padding:5px;',
		height : 204,width : 340,
		items:dataView,
		buttons:[
			{text:'应用',handler:applyHandler},
			{text:'取消',handler:closeHandler}
		],
		listeners:{
			hide:function(){
				Ext.del(win,'callback','scope');
			}
		}
	});
	return {
		show : function(cfg){
			win.show();
			cfg = cfg || {};
			Ext.apply(win,{
				callback : cfg.callback,
				scope : cfg.scope
			});
			if(cfg.selId){
				var dv = dataView ;
				var record = dv.getStore().getById(cfg.selId);
				if(Ext.isEmpty(record)){
					record = 0;
				}
				dataView.select(record);
			}
		}
	};
})();

/**
 * 选择portal的win
 */
EasyJF.Ext.Util.SelectPortalWin = (function(){
	var width = 773 , height = 495 ;
	var win,listDv,dv,tempPortals=new Ext.util.MixedCollection(),isLoad=false,isUpdate=false;
	var onSave = function(){
		var selNodes = tempPortals;
		if(Ext.isFunction(win.callback)){
			win.callback.call(win.scope||window,selNodes,dv.getStore());
			win.hide();
		}
	}
	var onClick = function(dv,index, item, e){
		var store = dv.getStore();
		var record = store.getAt(index);
		
		var code = record.get('id');
		
		if(tempPortals.key(code)){
			tempPortals.removeKey(code);
		}else{
			tempPortals.add(record.data);
		}
		dv.refreshNode(index);
		isUpdate  = true; //如果别点击证明被修改过了
	};
	var onCancel = function(){
		win.hide();
	}
	dv = new Ext.DataView({
		trackOver:true,
		overClass:'over',
		itemSelector:'div.item',
		//multiSelect: true,
		loadingText:Ext.LoadMask.prototype.msg,
		onDblClick:Ext.emptyFn,
		store:new Ext.data.JsonStore({
			id:'id',
			//url:'/test/Protal.json',
			data:[/*{
					type : '1',
					icon : 'images/test/20woso21.png',
					title : '需求分析图',
					id:'RiskCharts',
					text : '根据来源数据显示一个生成图表'
				},{
					type : '1',
					icon : 'images/test/20woso21.png',
					title : '工作量统计图',
					id:'WorkloadCharts',
					text : '根据来源数据显示一个生成图表'
				},*/{
					type : '1',
					icon : 'images/test/20woso21.png',
					title : '浏览器使用比例',
					id:'BrowserPic',
					text : '浏览器近期的使用情况'
				},{
					type : '1',
					icon : 'images/test/20woso21.png',
					title : '项目里程碑信息',
					id:'ProjectMilestonesGrid',
					text : '根据来源数据显示一个生成图表'
				}],
			fields:['id','icon','title','text','type'],
			filterBy : function(fn, scope){
		        this.snapshot = this.snapshot || this.data;
		        this.data = this.queryBy(fn, scope||this);
		        this.fireEvent('datachanged', this);
		    }
		}),
		listeners:{
			scope:this,
			click:onClick,
			dblclick:onSave/*,
			selectionchange:function(dv,selNodes){
				var node = selNodes[0];
				var index = dv.indexOf(node);
				if(index>=0){
					var record = dv.getStore().getAt(index);
					//listDv.getStore().reload();
				}*/
		},
		tpl:new Ext.XTemplate(
			'<div class="selectWinDataView">',
            '<tpl for=".">',
       			 '<div class="item <tpl if="this.ifExist(id)">x-view-selected</tpl>">',
                    '<img src="{icon}"/>',
                    	'<div class="right-content"><div class="title">{title}</div>',
                        '<p>{text}</p>',
                        '<p style="text-align:right;margin-top: 12px;padding-right:20px;"><tpl if="!this.ifExist(id)"><a class="operating" href="javascript:;" cmd="operating">添加</a></tpl><tpl if="this.ifExist(id)"><a class="operating" style="color:#CFCDCD;" cmd="operating">取消</a></tpl></p>',
                    '</div>',
	            '<div style="clear:left"></div></div>',
	            '</tpl>',
	        '</div>'
		,{
			ifExist:function(v){
				return !!tempPortals.key(v);
			}
		})
	});
	//dv.getStore().on('load',function(){isLoad=true},this,{single:true});
	listDv = new Ext.DataView({
		trackOver:true,
		overClass:'over',
		singleSelect:true,
		itemSelector:'div.item',
		loadingText:Ext.LoadMask.prototype.msg,
		tpl:'<div class="selectWinDataViewType"><tpl for="."><div class="item"><span>{text}</span></div></tpl></div>',
		listeners:{
			scope:this,
			afterrender:function(){
				listDv.select(0);
			},
			selectionchange:function(dataview,selNodes){
				var node = selNodes[0];
				dv.getStore().clearFilter();
				var index = dataview.indexOf(node);
				if(index>=0){
					var record = dataview.getStore().getAt(index);
					if(record.get('type')!='all'){
						dv.getStore().filter('type',record.get('id'));
					}
				}
			}
		},
		store : new Ext.data.JsonStore({
			id:'id',
			fields:['id','text','type'],
			data : [
			    {
			        text:'所有',
			        type:'all'
			    }
			]
		})
	});
	win = new Ext.Window({
		width : 773,height : 495,
		layout : 'hbox',
		constrain:true,
		resizable:false,
		layoutConfig: {
    		align : 'stretch',
    		pack  : 'start'
		},
		tbar:["->",{
				xtype:'textfield',
				emptyText:'搜索...',
				listeners:{
					scope:this,
					specialkey:function( f, e){
						if(e.getKey() == e.ENTER){
							var v = f.getValue();
							dv.getStore().clearFilter();
							dv.getStore().filterBy(function(item,key){
								var title = item.get('title');
								var text = item.get('text');
								var regexp = new RegExp(v,"i");
								if(regexp.test(title) 
									|| regexp.test(text)){
										return true;
								}else{
									return false;
								}
							},this);
						}
					}
				}
		}],
		items:[
			{width:200,items:listDv},
			{flex : 1,autoScroll:true,items:dv}
		],
		closeAction:'hide',
		modal:true,
		border:false,
		buttons:[
			{handler:onSave,text:'保存'} ,
			{handler:onCancel,text:'取消'}
		]
	});
	return {
		show : function(callback , scope ){
			isUpdate = false; // 是否修改过
			var pc = Lanyo_Ajax.getCfg('portalConfig');
			tempPortals.clear();
			if(pc){
				tempPortals.addAll(pc);
			}
			if(dv.rendered)dv.refresh();
			win.callback = callback;
			win.scope = scope;
			win.show();
		}
	}
})();


EasyJF.Ext.Portal = function(cfg){
	var pm = parseInt(cfg.portalMode);
	cfg.portalMode = isNaN(pm) ?  5 : pm;
	cfg.currentColIndex = 0;
	this.allMode = new Ext.util.MixedCollection(false);
	this.allMode.addAll(this.modeCfg);
	EasyJF.Ext.Portal.superclass.constructor.apply(this,arguments);
}
Ext.extend(EasyJF.Ext.Portal,Ext.ux.Portal,{
	autoScroll:true,
	portalIdPrefix:'',
	defaultType:'portalpanelcolumn',
	defaults:{style:'padding:10px 0 10px 17px'},
	modeCfg:Global.Portal.Models,
	selectStyleWin:EasyJF.Ext.Util.SelectStyleWin,
	selectPortalWin:EasyJF.Ext.Util.SelectPortalWin,
	/**
	 * 获得当前模式下,对应的列配置
	 * @return {}
	 */
	getPortalModeCfg:function(id){
		var pmc;id = id || this.portalMode;
		if(pmc = this.allMode.key(id)){
			return pmc.colCfg;
		}
		return [1];
	},
/*	getPortalMode:function(){
		return this.allMode.key(this.portalMode);
	},*/
	/**
	 * 获得系统配置的portals列表
	 * @return {}
	 */
	getPortals:function(){
		var arr = [],portals = window.Global.Config.portals || [];
		var sc = window.Global.Config.portalSeatCfg || {};
		for (var i = 0; i < portals.length; i++) {
			if(portals[i] && Global.Portal.PanelMC.key(portals[i])){
				var p = sc[portals[i]];
				if(p){
					arr.push(Ext.apply({
						config:true,
						item:portals[i]
					},p));
				}else{
					arr.push(portals[i]);
				}
			}
		}
		return arr;
	},
	/**
	 * 创建portal每一列的配置
	 * @return {}
	 */
	buildPortalColumCfg:function(){
		var buildColumns = [];
		var pmc = this.getPortalModeCfg();
		Ext.each(pmc,function(item){
			buildColumns.push({
				columnWidth:item
			});
		},this);
		return buildColumns;
	},
	/*
	      构建portal items对象 ,按位置显示
	  buildPortalItems:function(items){
		
		if(!Ext.isArray(items) && !items.length) return;
		
		var columns = this.items ;
		var j = 0;
		if(columns instanceof Ext.util.MixedCollection){
			var unCfgArr = [];
			Ext.each(items,function(item,i){
				if(item.config && item.item){
					var cfg = item;
					var item = item.item;
					var column;
					if(!(column=columns.itemAt(cfg.col))){
						column = columns[0];
					}
					column.insert(cfg.index,item);
				}else{
					var column = columns.itemAt(j++);
					column.add(item);
					if(j==columns.getCount())j=0;	
				}
			});
		}else{
			Ext.each(items,function(item,i){
				var column = columns[j++];
				column.items = column.items || [];
				if(item.config && item.item){
					var cls = Global.Portal.PanelMC.key(item.item);
					if(cls){
						var cfg = item;
						var item = item.item;
						item = new cls({id:this.portalIdPrefix+item});
						columns[cfg.col].items = columns[cfg.col].items || [];
						columns[cfg.col].items.splice(cfg.index,0,item);
					}else{
						j--;
						return false;
					}
				}else{
					var cls = Global.Portal.PanelMC.key(item);
					if(cls){
						item = new cls({id:this.portalIdPrefix+item});
						column.items.push(item);
					}else{
						j--;
						return false;
					}
					
				}
				if(j==columns.length)j=0;
			},this);
		}
	},*/
	/**
	 * 选择样式
	 * @param {} record
	 */
	onSelectStyleHandler:function(record){
		var id = record.get('id');
		if(this.portalMode!=id && this.allMode.key(id)){
			this.getTopToolbar().items.key('saveMode').enable();
			this.updatePortalMode(id);
		}
	},
	/**
	 * 保存portal位子
	 */
	savePortalSeat:function(){
		/*var seats = {
			code : [],
			col : [],
			index : []
		};
		this.items.each(function(item,i){
			item.items.each(function(portal,j){
				var id = portal.id.substring(this.portalIdPrefix.length);
				seats.code.push(id);
				seats.col.push(i);
				seats.index.push(j);
			},this);
		},this);*/
		/*var params = Ext.apply(seats,{portalMode:this.portalMode});
		Ext.Ajax.request({
			scope:this,
			params:params,
			url : 'manage.ejf?cmd=savePortalSeat' 
		});*/
		Ext.getCmp('main').savePersonality(function(){
			this.getTopToolbar().items.key('saveMode').disable();
		}.createDelegate(this));
	},
	/**
	 * 选择portal样式
	 */
	onPortalStyle:function(){
		var cfg = {
			selId : this.portalMode,
			callback : this.onSelectStyleHandler,
			scope : this
		}
		this.selectStyleWin.show(cfg);
	},
	/**
	 * 修改portal的显示模式
	 */
	updatePortalMode:function(id){
		Ext.Ajax.request({
			url : 'manage.ejf?cmd=changePortalMode' ,
			params:{portalMode:id},
			scope:this,
			success:function(response,options){
				Lanyo_Ajax.setCfg('portalMode',id);
				this.updatePortalModeHandler(id);
			}
		});
	},
	updatePortalModeHandler : function(id){
		 this.portalMode = id || Lanyo_Ajax.getCfg('portalMode');
		 var pcc = this.buildPortalColumCfg(),items = [],firstColumns = [];
		 var portalCfgs = Lanyo_Ajax.getCfg('portalConfig');
		 
		 var portalMap = Ext.arr2Map('id',portalCfgs);
		 
		 this.items.each(function(item){
			 	var itemsCfg = [];
		 		item.items.each(function(p){
		 			var id = p.id.substring(this.portalIdPrefix.length);
			 		if(portalMap[id]){
			 			var pCfg = portalMap[id];
			 			itemsCfg.push(Ext.apply({
			 				config:true,
			 				item:p
			 			},pCfg));
			 		}
			 		items.push.apply(items,itemsCfg);
			 	},this);
			 	firstColumns.push(this.remove(item,false));
	 	 },this);
	 	 
		 this.add(pcc);
		 
		 if(!items.length && portalCfgs.length){
		 	 Ext.each(portalCfgs,function(pcfg){
			 	this.addPortal(pcfg.id,pcfg.id,pcfg.col,pcfg.row,false);
			 },this);
		 }else{
		 	Ext.each(items,function(pcfg){
			 	this.addPortal(pcfg.item,pcfg.id,pcfg.col,pcfg.row,false);
			 },this);
		 }
		 this.doLayout();
		 Ext.destroy(firstColumns);
		 this.getTopToolbar().items.key('saveMode').enable();
	},
	refreshPortal:function(){
		var portals = Lanyo_Ajax.getCfg('portalConfig');
		
		var currentPortalMc = new Ext.util.MixedCollection();
		
		this.items.each(function(item){
			item.items.each(function(portal){
				currentPortalMc.add(portal.id.substring(this.portalIdPrefix.length),portal);
			},this);
		},this);
		
		var removePortals = [];
		currentPortalMc.eachKey(function(key){
			if(portals.indexOf(key)<0){
				removePortals.push(key);
			}
		},this)
		Ext.each(removePortals,function(k){
			var o = currentPortalMc.removeKey(k);
			if(o)o.ownerCt.remove(o);
		});
		Ext.each(portals,function(code){
			this.addPortal(code.id,code.id,code.col,code.row);
		},this);
		//this.savePortalSeat();
	},
	/**
	 * 自动获取要插入的列
	 */
	getAutoInserCol:function(){
		if(this.items.getCount()==1) return 0;
		var arrCount = [],inserCol;
		this.items.each(function(item){
			if(item.items)arrCount.push(item.items.getCount());
		},this);
		var count =	Math.min.apply(Math,arrCount);
		return arrCount.indexOf(count)==-1 ? 0 : arrCount.indexOf(count);
	},
	/**
	 * 添加portal
	 * @param {} cls
	 * @param {} code
	 * @param {} col
	 * @param {} index
	 */
	addPortal:function(cls,code,col,index,autoLayout){
		if(!Ext.isObject(cls) && !Ext.isFunction(cls)){
			cls = Global.Portal.PanelMC.key(cls);
		}
		col=parseInt(col);
		if(!Ext.isNumber(col)){
			col = this.getAutoInserCol();	
		}
		//console.debug(col);
		index = Ext.num(parseInt(index),0);
		if(col>=this.items.getCount()){
			col = this.items.getCount()-1;
		}
		var id = this.portalIdPrefix+code;
		var p = this.findById(id);
		if(!p){
			var column = this.getItem(col);
			if(!column) column = this.getItem(this.getAutoInserCol());
			if(cls){
				if(cls.events){
					column.add(cls);
				}else{
					column.add(new cls({id:id}))
				}
			}
			if(autoLayout!==false)column.doLayout();
		}
	},
	selecPortalHandler:function(portals){
		this.getTopToolbar().items.key('saveMode').enable();
		Lanyo_Ajax.setCfg('portalConfig',portals.items);
		this.refreshPortal();
		/*
		Ext.Ajax.request({
			url : 'test/success.json',
			scope : this,
			params:{portals:portals},
			success:function(){
				Ext.apply(Lanyo_Ajax.getCfg(),{portals : portals});
				this.refreshPortal();
			}
		});
		*/
	},
	/**
	 * 添加被点击的时候触发
	 */
	onPortalSettingHanlder:function(){
		this.selectPortalWin.show(this.selecPortalHandler,this);
	},
	/**
	 * 创建tbar
	 * @return {}
	 */
	buildTbar : function(){
		return {
			items:[
				{text : '设置模块',iconCls:'cog_edit',handler:this.onPortalSettingHanlder,scope:this},
				{text : '保存模块',disabled:true,itemId:'saveMode',iconCls:'script_save',handler:this.savePortalSeat,scope:this},
				{text : '模块样式',iconCls:'connect',handler:this.onPortalStyle,scope:this}
			]
		}
	},
	/**
	 * 拖拽portal拖拽时触发
	 */
	onDrop:function(){
		this.getTopToolbar().items.key('saveMode').enable();
	},
	initComponent:function(){
		this.items = this.buildPortalColumCfg();
		var items = this.getPortals();
		//this.buildPortalItems(items);
		this.tbar = this.buildTbar();
		this.on('drop',this.onDrop,this);
		EasyJF.Ext.Portal.superclass.initComponent.call(this);
	}
});
Ext.reg('ux.portal',EasyJF.Ext.Portal);

/*
 * *********************************************************************************
 * ******************************自定义portal*****************************************
 * *********************************************************************************
 */
var ProjectMilestonesGrid = Ext.extend(Ext.ux.GridPortletPanel,{
	title:'项目里程碑信息',
	url:'data/portal/portalGridDemo.json',
	loadSettingUrl:'data/portal/portalConfig.json',
	saveSettingUrl:'data/success.json',
	storeMapping:['taskId','projectName','taskName','workContext','taskType','taskPlanEndTime'],
	getSettingForm:function(name){
		var panelName = (name||'')+'settingForm';
		if(!this[panelName]){
			this[panelName] = new Ext.FormPanel({
				panelName : panelName,
				buttonAlign:'center',
				defaultType:'textfield',
				bodyStyle:'padding:20px;',
				defaults:{anchor : '-20'},
				waitMsgTarget:true,
				autoHeight:true,
				items:[
					{
						xtype : 'hidden',
						name : 'id'
					},{
						name:'title',
						fieldLabel:'Title'
					},{
						columns:1,
						name:'projectId',
						xtype:'radiogroup',
						fieldLabel:'Project',
						items:[
							{boxLabel:'Follow Global Project Setting',inputValue:'seq_001'},
							{boxLabel:'Choose Specific Project',inputValue:'seq_002'}
						]
					},{
						xtype : 'combo',
						store : [],
						anchor:null,
						displayField : '',
						width : 190,
						valueField : ''
					},{
						xtype : 'combo',
						store : [],
						anchor:null,
						displayField : '',
						width : 190,
						valueField : '',
						fieldLabel:'Object',
						name : 'object'
					},{
						valueField:'id',
						displayField:'text',
						xtype : 'lovcombo',
						mode:'local',
						width : 190,
						anchor:null,
						disableChoice : true,//禁止选择， --请选择--
						store : new Ext.data.JsonStore({data:[],fields:['id','text','checked']}),
						name : 'columns'
					},{
						fieldLabel:'Query',
						name : 'query'
					},{
						fieldLabel:'Orader',
						name : 'orader'
					},{
						width:60,
						anchor:null,
						xtype:'numberfield',
						fieldLabel:'Page Size',
						name : 'pageSize'
					}
				],
				buttons:[
					{text : 'Save',ref:'/saveBtn',handler:this.onSaveSetting,scope:this},
					{text : 'Cancel',ref:'/cancelBtn',handler:this.exitSettingForm,scope:this}
				],
				listeners:{
					show:{
						scope:this,
						delay:100,
						fn:function(p){
							//p.ownerCt.autoHeight= !(this.viewMode == 'max');
							this.autoHeight = true;
							p.ownerCt.autoHeight = true;
							p.ownerCt.syncSize();
							this.syncSize();
						}
					}
				}
			}); 
		}
		return this[panelName];
	},
	onLoadSettingSuccess : function(p,form,result){
		var g = p.grid;
		var cm = g.getColumnModel();
		var sf = form;
		var columns = sf.findField('columns');
		var store = sf.findField('columns').getStore();
		var columnsDatas = [];
		var values = [];
		Ext.each(cm.config,function(col){
			var checked = !!!col.hidden;
			if(checked){
				values.push(col.dataIndex);
			}
			columnsDatas.push({
				id : col.dataIndex,
				text:col.header
			});
		},this);
		store.loadData(columnsDatas);
		columns.setValue(values.join(','));
	},
	onSaveSettingSuccess:function(p,form,result){
		var title = form.findField('title').getValue();
		p.setTitle(title);
		var columns = form.findField('columns').getValue().split(',');
		if(!columns.length) columns =['projectName'];
		var cm = this.grid.getColumnModel();
		this.exitSettingForm();
		Ext.each(cm.config,function(col,i){
			var hidden = (columns.indexOf(col.dataIndex)<0);
			this.setHidden(i,hidden);	
		},cm);
	},
	columns :[
		{header:'项目名称',dataIndex:"projectName"},
		{header:'任务名称',dataIndex:"taskName"},
		{header:'工作内容',dataIndex:"workContext"},
		{header:'任务类型',dataIndex:"taskType"},
		{header:'计划结束时间',dataIndex:"taskPlanEndTime"}
	],
	/*
	 *创建grid的列columns 
	 */
	buildColumns:function(){
		return this.columns;
	} ,
	initComponent:function(){
		/*this.gridViewConfig = {
			
		};*/
		ProjectMilestonesGrid.superclass.initComponent.call(this);
	}
});

Global.Portal.PanelMC.add('ProjectMilestonesGrid',ProjectMilestonesGrid);

var BrowserPic = Ext.extend(Ext.ux.PortletPanel,{
	title : '浏览器使用比例',
	getStore : function(){
		if(!this._store){
			this._store = new Ext.data.JsonStore({
				autoLoad:true,
				url : 'data/chart/browser.json',
				fields : ['name','value']
			})	
		}
		return this._store;
	},
	beforedestroy:function(){
		if(this._store){
			this._store.destroy();
			delete this._store;	
		}
		BrowserPic.superclass.beforedestroy.call(this);
	},
	createContent : function(){
		return new EasyJF.Ext.chart.PicChart({
			chartTitle : '浏览器使用比例',
			store : this.getStore()
		});
	}
});
Global.Portal.PanelMC.add('BrowserPic',BrowserPic);

var RiskCharts = Ext.extend(Ext.ux.ImgPortletPanel,{title:'浏览器使用',url:'portalDemo.ejf?cmd=getPortalReport&img=browser.jpg'});
Global.Portal.PanelMC.add('RiskCharts',RiskCharts);
var WorkloadCharts = Ext.extend(Ext.ux.ImgPortletPanel,{title:'工作量统计图',url:'portalDemo.ejf?cmd=getPortalReport&img=baobiao2.jpg'});
//Global.Portal.PanelMC.add('WorkloadCharts',WorkloadCharts);

var LanyoIntro =  Ext.extendX(Ext.ux.PortletPanel,function(superclass){
	return {
		title : 'LanyoEDP2.0简介',
		buildContent : function(){
			return {
				xtype  : 'box',
				style : 'padding:5px;background:White;',
				html  :  "<p style='text-align:center;color:red;font-size:20px'>增强用户体验 提高开发效率 降低开发成本 <br/><hr/></p>"+
                   "<p style='text-indent:24px;'>  蓝源企业应用快速平台(LanyoEDP)是由成都蓝源信息技术有限公司自主研发的一款企业应用快速开发平台，平台通过整合主流的开源框架及技术，提供一套从后端数据整合到前端界面展示为一体的企业应用开发解决方案，让用户轻松实现各种企业应用的快速开发，降低开发成本及风险，提高效益。平台中提供了包括常用界面控件、基础应用软件骨架、快速代码生成工具及各种典型应用抽象等。<br/>　　蓝源企业应用快速平台(LanyoEDP)后端以EJS(EasyJWeb+JPA+Spring)构架为核心，前端以Ajax、ExtJS及LanyoRIA框架为主体。在实现企业应用快速开发的同时，强大的前端UI功能可以为应用提高用户体验。<br/>　　平台涉及到的主要技术：Spring2.5及以上、JPA1.0及以上、   Hibernate 3.2及以上、 EasyJWeb 1.2及以上、ExtJS2.2及以上、LanyoRIA 1.0及以上</p>" +
                        "<p style='text-align:right;'><a style='margin-right:5px;color:#0000ff;' target='_blank' href='http://www.lanyotech.com/lanyo-edp.html'>更多信息...</a></p>"
			}
		},
		createContent : function(){
			return {
				xtype  : 'box',
				html  : "<p style='text-align:center;color:red;font-size:20px'>增强用户体验 提高开发效率 降低开发成本 <br/><hr/></p>"+
                   "<p style='text-indent:24px;'>  蓝源企业应用快速平台(LanyoEDP)是由成都蓝源信息技术有限公司自主研发的一款企业应用快速开发平台，平台通过整合主流的开源框架及技术，提供一套从后端数据整合到前端界面展示为一体的企业应用开发解决方案，让用户轻松实现各种企业应用的快速开发，降低开发成本及风险，提高效益。平台中提供了包括常用界面控件、基础应用软件骨架、快速代码生成工具及各种典型应用抽象等。<br/>　　蓝源企业应用快速平台(LanyoEDP)后端以EJS(EasyJWeb+JPA+Spring)构架为核心，前端以Ajax、ExtJS及LanyoRIA框架为主体。在实现企业应用快速开发的同时，强大的前端UI功能可以为应用提高用户体验。<br/>　　平台涉及到的主要技术：Spring2.5及以上、JPA1.0及以上、   Hibernate 3.2及以上、 EasyJWeb 1.2及以上、ExtJS2.2及以上、LanyoRIA 1.0及以上</p>" +
						"<p style='text-align:right;'><a style='margin-right:5px;color:#0000ff;' target='_blank' href='http://www.lanyotech.com/lanyo-edp.html'>更多信息...</a></p>"
			}
		}
	}
});
Global.Portal.PanelMC.add('LanyoIntro',LanyoIntro);








