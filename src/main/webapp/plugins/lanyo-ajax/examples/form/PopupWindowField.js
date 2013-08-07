Ext.onReady(function(){
	var store=new Ext.data.JsonStore({
		root : 'result',
		autoLoad:true,
		pageSize : 10,
		totalProperty : 'rowCount',
		varName : 'employee_remoteStore',
		url : '/listData.ejf?cmd=getAllEmployee' ,
		fields : [ 'id' , 'name' , 'sex' , 'age' ,'dept' ]
	});
	var grid=new Ext.grid.GridPanel({
		store:store,
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
			{dataIndex:'dept',header:'部门'},
		],
		bbar:new EasyJF.Ext.PagingComBo({
			rowComboSelect : true,
			displayInfo : true,
			store : store
		}),
		viewConfig:{forceFit:true}
	});
	var form = new Ext.form.FormPanel({
		title : '员工管理',
		renderTo:'example',
		width : 300, height : 300,
		labelWidth:60,
		frame:true,
		defaultType:'textfield',
		labelAlign:'right',
		defaults:{anchor:'-20'},
		bodyStyle : 'padding:5px;',
		items:[
			{fieldLabel:'姓名',name:'name',allowBlank:false},
			{
				fieldLabel:'性别',
				xtype:'radiogroup' ,
				defaults:{name : 'sex'},
				items : [
					{boxLabel:'男',inputValue:1},
					{boxLabel:'女',inputValue:0},
					{boxLabel:'保密',inputValue:1,checked:true}
				]
			},
			{name:'age',fieldLabel:'年龄',xtype:'numberfield'},
			new EasyJF.Ext.PopupWindowField({
				returnObject:true,
				valueField : "id",
				displayField : "name",
				fieldLabel:"主管",
				win:new EasyJF.Ext.GridSelectWin({
					title:'选择主管',
					grid:grid
				}),
				choice : function(data, win) {
					this.setValue(data&&data.length?data[0]:data);
					this.fireEvent('select', data, win);
				}
			}),{
				xtype:'textarea',
				fieldLabel:'备注',
				name : 'remark',
				height:120
			}
		],
		buttonAlign:'right',
		buttons:[
			{
				text:'submit',iconCls:'submt',
				handler:function(){
					if(form.getForm().isValid())
						Ext.Msg.alert('Form Valeus',Ext.encode(form.getForm().getValues()));
				}
				
			},{
				text:'reset',iconCls:'reset',
				handler:function(){
					form.getForm().reset();
				}
			}
		]
	});
},this);
