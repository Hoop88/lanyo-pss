window.Global = window.Global || {};
Global.Config = Global.Config || {};
Global.Config = {
	iframe : false ,
	lang : 'zh-CN',
	style : 'default' ,
	homePage : 'menu',
	portalMode : 5 ,
	portalConfig : [{
		col : 1,
		row : 0,
		id : 'ProjectMilestonesGrid'
	},{
		col : 2,
		row : 0,
		id : 'WorkloadCharts'
	},{
		col : 0,
		row : 0,
		id : 'RiskCharts'
	},{
		col : 0,
		row :1,
		id : 'LanyoIntro'
	},{
		col : 3,
		row : 0,
		id : 'BrowserPic'
	}],
	maxTabs : 10 , //主程序tab最大个数
	enableAnimate : true ,//是否启动动画效果
	singleTabMode : false //是否是单列tab模式
};
/**
 * 配置菜单
 * @type 
 */
Global.SystemMenus = [
	{
		title : '系统管理' ,
		children : [
			{text : "数据字典",leaf:true,appClass:"SystemDictionaryManagePanel",script:"systemManage/SystemDictionaryManagePanel.js"},
			{text : "部门管理",leaf:true,appClass:"DepartmentPanel",script:"crm/DepartmentPanel.js"},
			{text : "员工管理",leaf:true,appClass:"EmployeePanelManage",script : "user/EmployeeManage.js"},
			{text : "系统权限设置",children:[
				{text : "系统菜单",leaf:true,appClass:"SystemMenuManagePanel",script:"systemManage/SystemMenuManagePanel.js"},
				{text : "系统角色",leaf:true,appClass:"RoleManagePanel",script:"systemManage/RoleManagePanel.js"},
				{text : "系统权限",leaf:true,appClass:"PermissionPanelManage",script:"systemManage/PermissionPanel.js"},
				{text : "系统资源",leaf:true,appClass:"SystemResourcePanel",script:"systemManage/SystemResourcePanel.js"}
			]}
           ,{text : "日志查看",leaf:true,appClass:"SystemLogPanel",script:"systemManage/SystemLogPanel.js"}
		]
	}
];
