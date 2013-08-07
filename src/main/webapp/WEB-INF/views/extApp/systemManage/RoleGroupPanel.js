RoleGroupPanel = Ext.extend(EasyJF.Ext.CrudPanel, {
	id : "rolegroupPanel",
	title : "RoleGroup管理",
	baseUrl : "rolegroup.ejf",
	createForm : function() {
		var formPanel = new Ext.form.FormPanel({
			frame : true,
			labelWidth : 70,
			labelAlign : 'right',
			items : [{
						xtype : 'fieldset',
						title : 'RoleGroup',
						autoHeight : true,
						items : [{
									layout : 'column',
									border : false,
									defaults : {
										border : false
									},
									items : [{
												columnWidth : .5,
												layout : 'form',
												defaultType : 'textfield',
												defaults : {
													width : 120
												},
												items : [{
															xtype : "hidden",
															name : "id"
														}, {
															fieldLabel : 'name',
															name : 'name'
														}, {
															fieldLabel : 'sequence',
															name : 'sequence'
														}

												]
											}]
								}]
					}]
		});

		return formPanel;
	},
	createWin : function() {
		return this.initWin(438, 300, "RoleGroup管理");
	},
	storeMapping : ["id", "name", "sequence"],
	initComponent : function() {
		this.cm = new Ext.grid.ColumnModel([{
					header : "name",
					sortable : true,
					width : 300,
					dataIndex : "name"
				}, {
					header : "sequence",
					sortable : true,
					width : 300,
					dataIndex : "sequence"
				}]);
		RoleGroupPanel.superclass.initComponent.call(this);
	}
});