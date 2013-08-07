Ext.onReady(function(){
	var config = {
		root : 'result',
		pageSize : 10,
		totalProperty : 'rowCount',
		varName : 'employee_remoteStore',
		url : '/listData.ejf?cmd=getAllEmployee' ,
		fields : [ 'id' , 'name' , 'sex' , 'age' ,'dept' ]
	};
	var store1 =  new EasyJF.Ext.CachedRemoteStore(config);
	var grid = new Ext.grid.GridPanel({
		renderTo : 'examples',
		width : 600,
		height : 300,
		title : '员工管理',
		clicksToEdit:1,
		sm : new Ext.grid.CellSelectionModel({enterNavigation:true}),
		columns : [
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
			{dataIndex:'dept',header:'部门'}
		],
		loadMask:{msg : '加载中...'},
		viewConfig:{forceFit:true},
		bbar : new EasyJF.Ext.PagingComBo({
			rowComboSelect : true,
			displayInfo : true,
			store : store1
		}),
		store : store1
	});
	store1.load({
		params : {
			limit : 10
		}
	});
	
	var store2 =  new EasyJF.Ext.CachedRemoteStore(config);
	Ext.get('examples').createChild({
		tag : 'div',
		style : 'padding:30px;',
		html : '下面的grid获取数据直接会从本地缓存获取，不会在从服务器段获取，可以开发FireBug查看请求信息'
	});
	var grid = new Ext.grid.GridPanel({
		width : 600,
		height : 300,
		clicksToEdit:1,
		title : '员工管理(缓存)',
		renderTo : 'examples',
		sm : new Ext.grid.CellSelectionModel({enterNavigation:true}),
		columns : [
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
			{dataIndex:'dept',header:'部门'}
		],
		loadMask:{msg : '加载中...'},
		viewConfig:{forceFit:true},
		tbar : [
			{
				scope : this,
				text : '加载数据',
				handler : function(){
					store2.reload();
				}
			}
		],
		bbar : new EasyJF.Ext.PagingComBo({
			rowComboSelect : true,
			displayInfo : true,
			store : store2
		}),
		store : store2
	});
	
},this);
