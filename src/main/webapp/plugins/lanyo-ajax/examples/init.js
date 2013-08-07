Ext.ns('Ext.samples');

(function() {
	SamplePanel = Ext.extend(Ext.DataView, {
				autoHeight : true,
				frame : true,
				cls : 'demos',
				itemSelector : 'dd',
				overClass : 'over',
				tpl : new Ext.XTemplate(
						'<div id="sample-ct">',
						'<tpl for=".">',
						'<div><a name="{id}"></a><h2><div>{title}</div></h2>',
						'<dl>',
						'<tpl for="samples">',
						'<dd ext:url="{url}"><img src="shared/screens/{icon}"/>',
						'<div><h4>{text}',
						'<tpl if="this.isNew(values.status)">',
						'<span class="new-sample"> (New)</span>', '</tpl>',
						'<tpl if="this.isUpdated(values.status)">',
						'<span class="updated-sample"> (Updated)</span>',
						'</tpl>',
						'<tpl if="this.isExperimental(values.status)">',
						'<span class="new-sample"> (Experimental)</span>',
						'</tpl>', '</h4><p>{desc}</p></div>', '</dd>',
						'</tpl>', '<div style="clear:left"></div></dl></div>',
						'</tpl>', '</div>', {
							isExperimental : function(status) {
								return status == 'experimental';
							},
							isNew : function(status) {
								return status == 'new';
							},
							isUpdated : function(status) {
								return status == 'updated';
							}
						}),
	
				onClick : function(e) {
					var group = e.getTarget('h2', 3, true);
					if (group) {
						group.up('div').toggleClass('collapsed');
					} else {
						var t = e.getTarget('dd', 5, true);
						if (t && !e.getTarget('a', 2)) {
							var url = t.getAttributeNS('ext', 'url');
							window.open(url);
						}
					}
					return SamplePanel.superclass.onClick
							.apply(this, arguments);
				}
			});
	Ext.samples.SamplePanel = SamplePanel;
	Ext.reg('samplespanel', Ext.samples.SamplePanel);
})();

Ext.onReady(function() {
	
	EasyJF.Ext.Util.asLoadScript('data.js',false);
	
	var catalog = Ext.samples.samplesCatalog;

	for (var i = 0, c; c = catalog[i]; i++) {
		c.id = 'sample-' + i;
	}

	var store = new Ext.data.JsonStore({
		idProperty : 'id',
		fields : ['id', 'title', 'samples'],
		data : catalog
	});

	var panel = new Ext.Panel({
		frame : true,
		height : 300,
		autoScroll : true,
		items : new SamplePanel({store : store})
	});
});