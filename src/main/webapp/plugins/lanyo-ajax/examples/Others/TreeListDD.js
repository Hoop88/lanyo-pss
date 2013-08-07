Ext.ns("Global");
if(!Global.requirementLoader){
	Global.requirementLoader =new Ext.tree.TreeLoader({
		iconCls : 'lanyo-tree-node-icon',
		url : "/treeListDD.ejf?cmd=getRequirementTree&pageSize=-1&treeData=true",
		listeners : {
			'beforeload' : function(treeLoader, node) {
				treeLoader.baseParams.id = (node.id.indexOf('root')<0 ? node.id : "");
				if(typeof node.attributes.checked!=="undefined"){
					treeLoader.baseParams.checked=false;
				}
			}
		}
	});
}

Ext.onReady(function() {
	var requirementTree = new Ext.ux.tree.TreeGrid({
		region : "north",
		width : 500,
		height : 200,
		frame:false,
		enableDD : true,
		rootVisible : false,
		title:"需求树",
		broder:1,
		listeners:{
			scope:this,
			beforenodedrop:function(de){
				var node=de.dropNode.attributes;
				var target=de.target.attributes;
				EasyJF.Ext.Util.ajaxRequest("/treeListDD.ejf",{cmd:"swapRequirement",nodeId:node.id,targetId:target.id},this);
			}
		},
		columns : [
			{
				header : '需求名称',
				dataIndex : 'title',
				width : 150
			},{
				header : '需求负责人',
				dataIndex : 'master',
				width : 100
			},{
				header : '创建时间',
				dataIndex : 'setupDate',
				xtype:'tgdatecolumn',
				width : 100
			},{
				header : '状态',
				dataIndex : 'finished',
				width : 100,
				tpl:new Ext.XTemplate('{finished:this.formatFinished}', {
	                formatFinished: function(v) {
	                    if(!v && v == 1) {
	                        return '已结束';
	                    }else return '';
	                }
	            })
			}],
		root: new Ext.tree.AsyncTreeNode({
			id : "root",
			text : "所有目录",
			expanded : true,
			iconCls : "treeroot-icon",
			loader : Global.requirementLoader
		})
	});
	
	
	var stepWorkGroupList=new Ext.grid.GridPanel({
		region:"center",
		frame:false,
        width: 400,
        height: 200,
        border:1,
        ddGroup: 'relatedObjectDDGroup2',
        enableDragDrop : true,
        listeners:{
        	scope:this,
        	render:function(gv){
        		var owner=stepWorkGroupList;
				gv.dropTarget = new Ext.dd.DropTarget(gv.getView().scroller.dom,{
					ddGroup : 'relatedObjectDDGroup',
					notifyDrop : function(ddSource, e, data){
						data=data.selections[0].data;
						var p = e.getTarget('div.x-grid-group'), lastIndex = 0,record=null;
						var params = {};
						Ext.copyTo(params,data,'id');
						if(p){
							var row = Ext.fly(p).child('.x-grid3-row:last',true);
							var lastIndex = Ext.getObjVal(row,'rowIndex');
							var record = owner.store.getAt(lastIndex);
							if(record){
								params['mark'] = record.get('mark');
							}else{
								params['mark'] = 2;
							}
						}
						if(!owner.reqId)
							return false;
						owner.dropRelatedObjectHanlder(params);
                        return true;
	                }
				});
			}
        },
		store: new Ext.data.GroupingStore({
			groupField:'mark',
			groupDir:'ASC',
			reader : new Ext.data.JsonReader({
				root : "result",
	            totalProperty : "rowCount",
				fields:['id','mark','detail','sequence','addDate','requirement']
			}),
			url:'/treeListDD.ejf'
		}),
        columns: [
            {header: "步骤名称", width: 60, sortable: true, dataIndex: 'detail'},
            {header: "加入时间", width: 80, sortable: true, dataIndex: 'addDate',renderer:EasyJF.Ext.Util.dateRender("Y-m-d G:i")},
            {header: "步骤", width: 20, sortable: true, dataIndex: 'mark'},
            {header: "顺序", width: 20, sortable: true, dataIndex: 'sequence'}
        ],
        view: new Ext.grid.GroupingView({
            forceFit:true,
            enableNoGroups:false,
            hideGroupedColumn:true,
	        enableGroupingMenu:false,
            groupTextTpl: '{[values.gvalue == 1?"前置步骤":"后置步骤"]}'
        }),
        dropRelatedObjectHanlder:function(params){
        	EasyJF.Ext.Util.ajaxRequest(
        		'/treeListDD.ejf',
        		{cmd:'addStep',requirementId:this.reqId,stepId:params.id,mark:params.mark},
        		this,
        		function(resp){
        			var ret=Ext.decode(resp.responseText);
        			this.store.removeAll();
        			this.store.loadData(ret);
        		}
        	);
        },
        updateContent:function(id){
        	if(id){
        		this.store.removeAll();
        		this.store.reload({params:{cmd:'loadStepWorkGroupList',requirementId:id}});
        		this.reqId=id;
        	}
        }
	});
	
	var stepWorkList=new Ext.grid.GridPanel({
		region:"east",
		width:100,
		height:200,
		border:1,
		enableDragDrop:true,
		ddGroup: 'relatedObjectDDGroup',
		viewConfig:{
			forceFit:true
		},
		listeners:{
        	scope:this,
        	render:function(gv){
        		var owner=stepWorkList;
				gv.dropTarget = new Ext.dd.DropTarget(gv.getView().scroller.dom,{
					ddGroup : 'relatedObjectDDGroup2',
					notifyDrop : function(ddSource, e, data){
						data=data.selections[0].data;
						owner.dropRelatedObjectHanlder(data);
                        return true;
	                }
				});
			}
        },
        dropRelatedObjectHanlder:function(params){
        	EasyJF.Ext.Util.ajaxRequest(
        		'/treeListDD.ejf',
        		{cmd:'dropStep',requirementId:params.requirement,stepId:params.id},
        		this,
        		function(resp){
        			var ret=Ext.decode(resp.responseText);
        			stepWorkGroupList.store.removeAll();
        			stepWorkGroupList.store.loadData(ret);
        		}
        	);
        },
		store : new Ext.data.JsonStore({
			url : "/systemDictionary.ejf?cmd=getDictionaryBySn&sn=StepWork",
			root : "result",
			totalProperty : "rowCount",
			autoLoad:true,
			remoteSort : true,
			baseParams : {
				pageSize : "-1"
			},
			fields : ["id", "title", "tvalue"]
		}),
		columns: [
            {header: "步骤名称", width: 60, sortable: true, dataIndex: 'title'}
        ]
	});
	
	var mainPanel=new Ext.Panel({
		renderTo:"examples",
		layout:"border",
		width:600,
		height:400,
		frame:false,
		listeners:{
			scope:this,
			render:function(){
				requirementTree.on("click",function(n,e){
					stepWorkGroupList.updateContent.call(stepWorkGroupList,n.id);
				},this);	
			}
		},
		items:[requirementTree,stepWorkGroupList,stepWorkList]
	});
	
}, this);
