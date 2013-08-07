Ext.ns('Ext.ux');
Ext.ux.BaseGridChartPanel=Ext.extend(BaseGridList,{
	autoLoadGridData : false,
	pagingToolbar : false,
	gridBorder:false,
	showMenu : false,
	ableDbclick:false,
	showPrint:true,
	showRefreshCache:true,
	localStoreVar:'REPORT:'+this.id,
	pageSize:20,
	url:'',
	createQuery:function(){},
	//子类需要实现,有什么查询条件,  返回一个包含查询条件的数组
    createButtonToolBar : function(){return []},
    createStore:function(){
    	var storeConfig = {
            id : this.storeId?this.storeId:"id",
            url : this.url,
            pageSize:this.pageSize,
            root : "result",
            totalProperty : "rowCount",
            remoteSort : true,
            fields : this.storeMapping
        };
        if(Ext.isEmpty(this.localStoreVar,false)){
            this.store = new Ext.data.JsonStore(storeConfig);
        }else{
            this.store = new EasyJF.Ext.CachedRemoteStore(Ext.apply( 
            	{
					varName : this.localStoreVar,
					disableClientFilter:true,
					pageSize : Ext.num(this.pageSize, 20),
					remoteSort : false,
				}, storeConfig));
        }
        this.store.paramNames.sort = "orderBy";
		this.store.paramNames.dir = "orderType";
    },
	createToolbar : function(){
		this.createQuery();
		var top_btn = this.createButtonToolBar();
		var fixBtn= ["-",
			{text:"查询",iconCls : 'advance-search-icon',handler : this.quickSearch,scope:this},
			{id:"btn_refresh",text : "重置",iconCls : 'f5',handler : this.resetSearch,scope : this}
		];
		if(this.showPrint)fixBtn.push({id:'btn_print',text : "打印",iconCls:"print-icon",handler :this.printList,scope:this});
		if(this.showRefreshCache)fixBtn.push({id:'btn_refreshCache',xtype : 'button',text : '更新缓存',handler:this.refreshCache,scope : this})
		Ext.each(fixBtn,function(o){
			top_btn.push(o);
			},this);
		if(this.createCustomerButton){
			Ext.each(this.createCustomerButton(),function(o){
				top_btn.push(o);
			})
		}
		this.gridTbar = new Ext.Toolbar(top_btn);
	},
	resetSearch : function(){
		this.gridTbar.items.each(function(o){
			if(o.isFormField){
				o.reset();
			}
		},this);
	},
	quickSearch:function(){
		var parsep = this.parseParams();
		var tag = parsep === undefined||parsep === true;
		this.store.proxy.getData().clear();
		if(this.forceReload===true){
			this.store.baseParams.forceReload = true;
			this.forceReload = false;
		}
		if(!tag){
			return false;
		}
		this.refresh();
	},
	refresh : function() {
		this.store.removeAll();
		this.store.load({
			callback : function(rs) {
				if (rs && rs.length < 1) {
					Ext.Msg.alert("提示", "没有符合条件的数据！");
					EasyJF.Ext.Util.autoCloseMsg.defer(2000);
				}
			}
		});
	},
	refreshCache:function(){
		this.forceReload = true;
		this.quickSearch();
	},
	printList:function(){
		var parsep = this.parseParams();
		var tag = parsep === undefined||parsep === true;
		if(!tag){
			return false;
		}
		var s = Ext.urlEncode(this.store.baseParams);
		var win=new Ext.Window({title:"打印窗口",html:"<iframe width='100%' frameborder='no' style='background:#FFF' border=0 height='100%' src ='"+this.url+"&print=true&"+s+"' >"});
		win.show();
		win.fitContainer();
		win.center();
	},
	initComponent:function(){
		this.cm = this.getColumnModel();
		this.createToolbar();
		this.createStore();
		this.gridConfig=Ext.apply(this.gridConfig||{},{
			enableHdMenu:false,
			plugins:this.plugins?this.plugins:[new Ext.ux.grid.GridSummary()],
			bbar:this.pagingToolbar ? new  Ext.ux.PagingComBo({rowComboSelect:true,pageSize : this.pageSize,store : this.store,displayInfo :true}) : null
		});
		Ext.ux.BaseGridChartPanel.superclass.initComponent.call(this);
		if(this.ableDbclick){
			this.grid.on("rowdblclick",this.dbclickHandler,this);
		}
	}
});


Ext.onReady(function(){
	var report=new Ext.ux.BaseGridChartPanel({
		id:"employeeGridChart",
		pagingToolbar:true,
		pageSize:10,
		width:700,
		forceReload:true,
		showPrint:false,
		height:400,
		ableDbclick:true,
		localStoreVar:'REPORT:EmployeeGridChart',
		url:'/listData.ejf?cmd=listEmployee',
		renderTo:'example',
		storeMapping:['id' , 'name' , 'sex' , 'age' ,'dept'],
		createButtonToolBar:function(){
			this.search_name=new Ext.form.TextField({name:"name",width:80});
			this.search_sex=new Ext.form.ComboBox(Ext.apply({},{width:80},EasyJF.Ext.Util.buildCombox("sex", "sex", [["男", "1"],["女", "0"]], "1", true)));
			this.search_compare=new Ext.form.ComboBox(Ext.apply({},{width:80},EasyJF.Ext.Util.buildCombox("compare", "compare", [[">=", "1"],["<=", "0"]], "1", true)));
			this.search_age=new Ext.form.NumberField({name:"age",width:80});
			return [
				"姓名:",this.search_name,"性别:",this.search_sex,"年龄:",this.search_compare,this.search_age
			];
		},
		parseParams:function(){
			this.store.baseParams = Ext.apply({},{
				name:this.search_name.getValue(),
				sex:this.search_sex.getValue(),
				compare:this.search_compare.getValue(),
				age:this.search_age.getValue()
			});
			return true;
		},
		dbclickHandler:function(g){
			var data=g.getSelectionModel().getSelected().data;
			Ext.Msg.alert("提示信息","你双击了"+data.name+"，可以覆盖该双击方法来做报表的二级穿透");
		},
		getColumnModel:function(){
			var chkMa=new Ext.grid.CheckboxSelectionModel();
			this.gridConfig={sm:chkMa};
			var cm=[
				chkMa,
				{dataIndex:'id',header:'编号',hidden:true,hideable:false},
				{dataIndex:'name',header:'姓名',editor:new Ext.form.TextField()},
				{
					dataIndex:'sex',header:'性别',
					renderer:function(v){
						if(v=="1")
							return "男";
						else if(v=="0")
							return "女";
						else if(v=="3")
							return "未知";
							
					}
				},
				{dataIndex:'age',header:'年龄'},
				{dataIndex:'dept',header:'部门'},
			]
			return new Ext.grid.ColumnModel(cm);
		}
	});
},this);
