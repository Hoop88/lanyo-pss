Ext.onReady(function(){
	var store =  new Ext.data.JsonStore({
		autoLoad : true,
		root : 'result',
		totalProperty : 'rowCount',
		url : '/listData.ejf?cmd=getEmployeeInfo' ,
		fields : [ 'id' , 'name' , 'sex' , 'age' ,'dept' ]
	});
	var grid = new Ext.grid.GridPanel({
		renderTo : 'examples',
		width : 600,
		height : 300,
		columns : [
			{dataIndex:'id',header:'编号'},
			{dataIndex:'name',header:'姓名'},
			{dataIndex:'sex',header:'性别'},
			{dataIndex:'age',header:'年龄'},
			{dataIndex:'dept',header:'部门'}
		],
		loadMask:{msg : '加载中...'},
		viewConfig:{forceFit:true},
		store : store,
		bbar : new EasyJF.Ext.PagingComBo({
			store : store,
			pageSize : 10 ,
			displayInfo : true,
			rowComboSelect : true
		})
	});
	store.load({
		params:{
			start : 0,
			limit : 10
		}
	});
	
},this);
