Ext.ns('Ext.samples');
Ext.samples.samplesCatalog = [
{
    title: '集成应用',
    samples: [{
        text: 'Lanyo JS API 文档',
        url:  '../docs/index.html',
        icon: 'docs.gif',
        desc: 'Lanyo Api 应用'
    }]
},{
    title: '列表(Grid)',
    samples: [{
        text: 'EditorGrid',
        url:  'grid/EditorGrid.html',
        icon: 'EditorGrid.png',
        desc: '这是一个演示Ext.grid.EditorGrid,编辑时候回车,可以自动跳格,以及EditorGrid的增强.'
    }]
},{
    title: '面板(Panel)',
    samples: [{
        text: 'Panel',
        url:  'panel/EasyJF.Ext.CrudPanel.html',
        icon: 'EasyJF.Ext.CrudPanel.png',
        desc: '这是一个演示EasyJF.Ext.CrudPanel,面板融入了增删改查！'
    }]
},{
    title: '标签页(Tabs)',
    samples: [{
        text: 'TabPanel历史管理插件',
        url: 'tabs/HistoryTabPanel.html',
        icon: 'HistoryTabPanel.png',
        desc: '历史记录管理器，允许用户通过键盘BackSpace和Tab建切换Tab'
    },{
        text: 'TabPanel菜单插件',
        url: 'tabs/TabPanelMenuPlugin.html',
        icon: 'TabPanelMenuPlugin.png',
        desc: 'TabPanel右键菜单，操作关闭左边，关闭右边'
    },{
        text: 'Ext.ux.panel.DDTabPanel',
        url: 'tabs/Ext.ux.panel.DDTabPanel.html',
        icon: 'Ext.ux.panel.DDTabPanel.png',
        desc: '可拖拽的tabpanel,类似于我们使用到的浏览器,tab页拖拽!'
    }]
},{
    title: '窗体(Windows)',
    samples: [{
        text: '单例窗口',
        url: 'window/SingleWindow.html',
        icon: 'singleWindow.png',
        desc: '关于SingleWindow与以前面板配合使用的例子'
    }]
},{
    title: '树(Trees)',
    samples: [{
        text: '可编辑树列表',
        url: 'tree/Ext.ux.tree.TreeEditGrid.html',
        icon: 'Ext.ux.tree.TreeEditGrid.png',
        desc: '可编辑的TreeGrid'
    }]
},{
    title: '表单(Forms)',
    samples: [{
        text: 'TreeComboField',
        url: 'form/TreeComboField.html',
        icon: 'TreeComboField.png',
        desc: '可选择的下拉树,可用于树形结构选择数据使用'
    },{
        text: 'CheckTreeComboField',
        url: 'form/CheckTreeComboField.html',
        icon: 'CheckTreeComboField.png',
        desc: '可选择的下拉树,并且支持check选择 '
    },{
        text: 'LabelField',
        url: 'form/LabelField.html',
        icon: 'LabelField.png',
        desc: '使用Form Load在Form面板labelField显示数据!'
    },{
    	text: 'ComplexFormLayout',
        url: 'form/ComplexFormLayout.html',
        icon: 'ComplexFormLayout.png',
        desc: '复杂的Form布局,使用lanyo Util包中的方法快速布局'
    },{
        text: 'PopupWindowField',
        url: 'form/PopupWindowField.html',
        icon: 'PopupWindowField.jpg',
        desc: ' 弹出窗口选择组件（类似于下拉框列表Field，只是在点击旁边下拉按钮时是通过弹出一个列表窗口，在窗口列表中进行数据选择。）'
    }]
},{
    title: '前端缓存',
    samples: [{
    	text : 'EasyJF.Ext.CachedRemoteStore',
    	url : 'caches/EasyJF.Ext.CachedRemoteStore.html',
    	icon: 'EasyJF.Ext.CachedRemoteStore.png',
    	desc: 'RemoteStore远程缓存对象,建一些比较常用的数据放到前台cache中,优化系统性能!'
    }]
},{
    title: '其他示例',
    samples: [{
    	text : 'ScriptTagProxy',
    	url : 'Others/ScriptTagProxy.html',
    	icon: 'ScriptTagProxy.png',
    	desc: 'ScriptTagProxy的使用,访问远程对象!'
  	  },{
    	text : 'PagingComBo',
    	url : 'Others/PagingComBo.html',
    	icon: 'PagingComBo.jpg',
    	desc: '扩展PagingToolbar,让分页控件能够选择每页的条数!'
    },{
    	text : '树和列表的拖拽',
    	url : 'Others/TreeDDList.html',
    	icon: 'TreeDDList.JPG',
    	desc: '演示树和列表的拖拽'
    }]
}];
