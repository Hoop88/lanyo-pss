Ext.QuickTips.init();

Ext.onReady(function() {
	this.tree = new Ext.tree.TreePanel({
		id : "myt",
		useArrows : true,
		region : 'west',
		width : 200,
		autoScroll : true,
		animate : true,
		ddGroup : 'mgrid',
		enableDD : true,
		containerScroll : true,
		border : false,
		listeners : {
			beforenodedrop : function(dropEvent) {
				var node = dropEvent.target;
				var data = dropEvent.data;
				var point = dropEvent.point;
				var r = this.existingGrid.getSelectionModel()
						.getSelected();
				var rs = this.existingGrid.getSelectionModel()
						.getSelections();

				if (node.isLeaf()) {
					node.leaf = false;
				}
				for (var i = 0; i < rs.length; i++) {
					var r = rs[i];
					var treeNode = new Ext.tree.TreeNode({
								id : r.get('id'),
								text : r.get('text'),
								name : r.get('name')
							});
					node.appendChild(treeNode);
				}
				node.expand();
			},
			scope : this
		},
		root : new Ext.tree.AsyncTreeNode({
			text : 'root',
			expanded : true,
			children : [{
						id : '5',
						text : 'Menu Option 1',
						leaf : true
					}, {
						id : '6',
						text : 'Menu Option 2',
						leaf : true
					}, {
						id : '8',
						text : 'Menu Option 3',
						leaf : true
					}]
		})
	});

	existingStore = new Ext.data.JsonStore({
		data : [{
					id : '1',
					text : 'ssvfhppl',
					name : 'linjianjun'
				}, {
					id : '2',
					text : 'ssvfhppl',
					name : 'linjianjun'
				}, {
					id : '3',
					text : 'ssvfhppl',
					name : 'linjianjun'
				}],
		fields : [{
					name : "id"
				}, {
					name : "text"
				}, {
					name : "name"
				}, {
					name : "leaf"
				}]
	});

	var myCm = new Ext.grid.ColumnModel([{
			header : "id",
			sortable : true,
			width : 100,
			dataIndex : "id"
		}, {
			header : "text",
			sortable : true,
			width : 100,
			dataIndex : "text"
		}, {
			header : "用户名称",
			sortable : true,
			width : 100,
			dataIndex : "name"
		}]
	);
	this.existingGrid = new Ext.grid.GridPanel({
		id : 'my',
		region : 'center',
		cm : myCm,
		ddGroup : 'mgrid',
		stripeRows : true,
		loadMask : true,
		trackMouseOver : true,
		entityIdName : "id",
		enableDragDrop : true,
		store : existingStore
	});

	this.existingGrid.on('afterrender', function() {
		var secondGridDropTargetEl = this.existingGrid.getView().scroller.dom;
		var secondStore = this.existingGrid.store;
		var secondGridDropTarget = new Ext.dd.DropTarget(
				secondGridDropTargetEl, {
					ddGroup : 'mgrid',
					notifyDrop : function(ddSource, e, data) {
						if(data.node){
							var node = data.node;
							var r = new Ext.data.Record({
										id : node.id,
										text : node.text,
										name : node.attributes.name
									});
							secondStore.insert(0, r);
							existingGrid.getView().refresh();
						}
						return true;
					}
				}, this);
	}, this);

	this.panel = new Ext.Panel({
		title : '<center>树和表格直接的拖拽</center>',
		renderTo : 'examples',
		width : 600,
		height : 300,
		layout : 'border',
		items : [this.tree, this.existingGrid],
		scope : this
	
	});
});