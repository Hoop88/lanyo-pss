Ext.onReady(function(){
	/*
	 *通常来说EasyJF.Ext.CrudPanel都是通过继承方式来使用！ 
	 */
	
	Lanyo_Ajax.permissionCheck = false; //是否进行权限检查
	
	Ext.ns('Ext.example');
	Ext.example.Employee = Ext.extendX(EasyJF.Ext.CrudPanel,function(superclass){
		return {
			baseUrl : '/employee.ejf',
			width : 700,
			height : 400,
			border : true,
			pageSize : 20,
			viewWin : {
				width : 458,
				height : 230
			},
			entityIdName : 'id',//实体对象，对应的字段
			//autoLoadGridData : false,
			/**
			 * 创建新建表单
			 */
			createForm : function() {
				var Util = EasyJF.Ext.Util;
				var formPanel = new Ext.form.FormPanel({
					frame : true,
					labelWidth : 70,
					labelAlign : 'right',
					defaultType : 'textfield',
					defaults : {anchor : "-20"},
					items : [
						{xtype : "hidden",name : this.entityIdName},
						Util.twoColumnPanelBuild({
							fieldLabel : '姓名',
							name : 'name',
							allowBlank:true
						},
						{
							xtype : 'treecombo', 
							fieldLabel : '部门',
							minListWidth : 150,
							name : 'dept',
							hiddenName : 'dept',
							valueField : 'id',
							displayField : 'text', 
							tree : new Ext.tree.TreePanel({
								border : false,
								expanded : true,
								autoScroll:true,
								root : new Ext.tree.AsyncTreeNode({
									text : '所有部门'
								}),
								loader : new Ext.tree.TreeLoader({
									nodeParameter : 'id',
									url  : '/department.ejf?cmd=getDepartmentTree'
								})
							})
						},
						{
							fieldLabel : '电子邮件',
							name : 'email',
							vtype:'email',
							allowBlank:true
						}, {
							xtype : "datefield",
							fieldLabel : '出生日期',
							name : 'birthday',
							format : "Y-m-d"
						}),{
						fieldLabel : '简介',
						name : 'remark',
						xtype : "textarea"
					}]
				});
				return formPanel;
			},
			createWin : function() {
				return this.initWin(458, 230, "员工管理");
			},
			storeMapping : ["id", "name","dept","password", "email", "birthday", "remark"],
			/**
			 * 构建grid的列对象Ext.grid.ColumnModel
			 */
			buildColumns:function(){
				return [{
							header : "姓名",
							sortable : true,
							dataIndex : "name"
						}, {
							header : "部门",
							sortable : true,
							renderer : EasyJF.Ext.Util.objectRender('title'),
							dataIndex : "dept"
						},{
							header : "电子邮件",
							sortable : true,
							dataIndex : "email"
						},{
							header : "出生日期",
							sortable : true,
							dataIndex : "birthday",
							renderer:Ext.util.Format.dateRenderer('Y/m/d')
						},{
							header : "简介",
							sortable : true,
							dataIndex : "remark"
						}];
			},
			onView : function(ret,data){
				superclass.onEdit.call(this);
				this.fp.findField('dept').setValue({
					text : Ext.getObjVal(data,'dept.title'),
					id : Ext.getObjVal(data,'dept.id')
				});
			},
			onEdit : function(ret,data){
				superclass.onEdit.call(this);
				this.fp.findField('dept').setValue({
					text : Ext.getObjVal(data,'dept.title'),
					id : Ext.getObjVal(data,'dept.id')
				});
			},
			initComponent:function(){
				this.columns = this.buildColumns();
				superclass.initComponent.call(this);
			}
		}
	});
	
	var employeePanel = new Ext.example.Employee({
		renderTo : 'example'
	});
},this);
