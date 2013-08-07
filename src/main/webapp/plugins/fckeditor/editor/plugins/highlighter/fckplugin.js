/*
 * ��HighLighter��ΪFCKeditor���﷨��ʾ���
 * Author : Garfeild < garfield0601@gmail.com >
 * since  : 2007-10-19
 */

// Register the related commands.
//FCKCommands.RegisterCommand( 'HighLighter', new FCKDialogCommand("HighLighter",FCKLang.DlgHighLighterTitle,FCKConfig.Plugins.Items['highlighter'].Path + 'highlighter.html', 540, 540 ) ) ;
FCKCommands.RegisterCommand( 'HighLighter', new FCKDialogCommand("HighLighter",FCKLang['DlgSyntaxHighLighterTitle'],FCKConfig.PluginsPath + 'highlighter/highlighter.html', 600, 540 ) ) ;

// Create the "highlighter" toolbar button.
var oHighLighterItem		= new FCKToolbarButton( 'HighLighter', FCKLang['DlgSyntaxHighLighterTitle'] ) ;
oHighLighterItem.IconPath	= FCKConfig.PluginsPath + 'highlighter/highlighter.gif' ;

FCKToolbarItems.RegisterItem( 'HighLighter', oHighLighterItem );// 'HighLighter' is the name used in the Toolbar config.

var FCKHighLighter = new Object();
var CSS_PATH 	  = FCKConfig.PluginsPath + "highlighter/dp.SyntaxHighlighter/Styles/";

var usingTag = "DIV";
var usingFlag = "HighLighter";

FCKHighLighter.Add = function( value ){
	FCKSelection.Delete();
	var oDiv  = FCK.CreateElement(usingTag);
	oDiv.className = usingFlag;
	oDiv.contentEditable = false;
	oDiv.innerHTML = value;
	oDiv.innerHTML += "<" + usingTag + " contentEditable='false'><link href='" + CSS_PATH + "SyntaxHighlighter.css'" + 
					"type='text/css' rel='stylesheet'></link></" + usingTag + ">";
}

// ˫���¼��������
FCKHighLighter.OnDoubleClick = function( div ){
	var oDiv = div;

	// ѭ�������ÿ�һ�´����֪���ˣ���Ϊ��ѡ�������������Ԫ��
	while (oDiv.parentNode){
		if (oDiv.tagName == usingTag && oDiv.className == usingFlag)
			break;
		oDiv = oDiv.parentNode;
	}

	if(oDiv.tagName == usingTag && oDiv.className == usingFlag) {
		FCKSelection.SelectNode( oDiv ) ;
		FCKCommands.GetCommand( 'HighLighter' ).Execute() ;
	}
}

// ���˫���¼�
FCK.RegisterDoubleClickHandler( FCKHighLighter.OnDoubleClick, usingTag ) ;		// ˫����ɫ��
FCK.RegisterDoubleClickHandler( FCKHighLighter.OnDoubleClick, 'SPAN' ) ;		// ˫������
FCK.RegisterDoubleClickHandler( FCKHighLighter.OnDoubleClick, 'LI' ) ;			// ˫���������հ�

// �����¼��������
FCKHighLighter._ClickListener = function( e )
{
	var oDiv = e.target;

	// ѭ�������ÿ�һ�´����֪���ˣ���Ϊ��ѡ�������������Ԫ��
	while (oDiv.parentNode){
		if (oDiv.tagName == usingTag && oDiv.className == usingFlag)
			break;
		oDiv = oDiv.parentNode;
	}

	if ( oDiv.tagName == usingTag && oDiv.className == usingFlag )
		FCKSelection.SelectNode( oDiv ) ;
}

FCKHighLighter._SetupClickListener = function (){
	if (FCKBrowserInfo.IsGecko)
		FCK.EditorDocument.addEventListener( 'click', FCKHighLighter._ClickListener, true ) ;
}

// ��ӵ����¼�
FCK.Events.AttachEvent( 'OnAfterSetHTML', FCKHighLighter._SetupClickListener ) ;

// ����Ҽ��˵�
FCK.ContextMenu.RegisterListener( {
	AddItems : function( menu, tag, tagName )
	{
		if (!tag)
			return;

		var oDiv = tag;

		// ѭ�������ÿ�һ�´����֪���ˣ���Ϊ��ѡ�������������Ԫ��
		while (oDiv.parentNode){
			if (oDiv.tagName == usingTag && oDiv.className == usingFlag)
				break;
			oDiv = oDiv.parentNode;
		}

		// under what circumstances do we display this option
		if ( oDiv.tagName == usingTag && oDiv.className == usingFlag )//&& (tag._FCKHighLighter || tag.parentElement._FCKHighLighter) ) 
		{
			FCKSelection.SelectNode( oDiv ) ;
			// when the option is displayed, show a separator  the command
			menu.AddSeparator() ;
			// the command needs the registered command name, the title for the context menu, and the icon path
			menu.AddItem( 'HighLighter', FCKLang['DlgSyntaxHighLighterProperty'], oHighLighterItem.IconPath ) ;
		}
	}}
);
