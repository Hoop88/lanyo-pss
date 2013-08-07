作者：Kend　　<kendling@sina.com.cn>
**********************************************
使用方法：
1、在您的FCKeditor的配置文件中（一般为fckconfig.js或custom.config.js）
配置其中的FCKConfig.ToolbarSets，添加HighLighter。
如：
	FCKConfig.ToolbarSets["review"] = [
		['HighLighter','Bold','Italic','Underline','StrikeThrough','Link','Unlink','Image','Rule','Smiley','TextColor','BGColor']
	];
当然，你可以放到别的工具栏，不过记得注意大小写。
 
2、根据你指定的plugin目录，注册plugin
如：
	// 代码语法高亮插件
	FCKConfig.Plugins.Add( 'highlighter', 'zh-cn,en' ) ;

3、OK,你会发现你的FCK工具栏的图片多了一个带有"ab"字母，黄底的图标。你就可以使用语法高亮显示功能了。
**********************************************
修改历史：
哈哈，我都忘了，上我的Blog看吧：http://MyvNet.com 