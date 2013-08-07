Ext.onReady(function(){
	
	var reader = new Ext.data.ArrayReader({
      // root: 's',
        fields:['title']
    });
    reader.getRoot = function(o){
    	var converts =[];
    	var datas = o['s'];
    	Ext.each(datas,function(data){
    		converts.push([data]);
    	});
    	return converts;
    };
	var ds = new Ext.data.Store({
        proxy: new Ext.data.ScriptTagProxy({
        	callbackParam : 'cb',
            url: 'http://suggestion.baidu.com/su?p=3&t=1287389511898'
        }),
        reader:reader
    });
    var search = new Ext.form.ComboBox({
        store: ds,
        displayField:'title',
        queryParam : 'wd',
        typeAhead: false,
        minChars:1,
        loadingText: 'Searching...',
        width: 570,
        disableChoice : true,
        applyTo: 'examples',
        hideTrigger:true,
        onSelect : function(record){
        	var v = record.data.title;
        	this.setValue(v);
        	var bdf = document.forms['baidu'];
        	bdf.wd.value = v;
        	this.collapse();
        	setTimeout(function(){bdf.submit();},300);
        }
    });
},this);
