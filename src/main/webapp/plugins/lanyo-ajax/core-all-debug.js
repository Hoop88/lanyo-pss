/*
 * Ext JS Library 3.2.1
 * http://www.lanyotech.com/
 * 对ExtJs扩展和增强
 */
/**
 * @class Ext
 * @singleton
 */
Ext.apply(Ext, {
	clone : function(obj){
		return Ext.apply({},obj);
	},
	/**
	 * 拷贝源对象中的属性到目标对象中,不会拷贝notFields中的属性
<pre>
<code>	 
//例子：
var target = {name:'张三',age:20};
var source = {name:'李四',age:22,sex:'男',remark:'我是李四里面remark属性的值'}};
Ext.copyToIf(target,source,"name,age");
console.dir(target); //out : {name:'张三',age:20,sex:'男',remark:'我是source里面remark属性的值'}}
</code>
</pre>
	 *
	 * @param {Object} target 拷贝的目标对象 
	 * @param {Object} source 拷贝的源对象
	 * @param {String/Array} notFields {String/Array} 不会拷贝的字段 
	 *  
	 */
	copyToIf : function(target, source, notFields) {
		notFields = notFields || [];
		for (var p in source) {
			if (notFields.indexOf(p) < 0) {
				target[p] = source[p];
			}
		}
		return target;
	},
	extendX : function(supr, fn , scope){
		return Ext.extend(supr,fn.call(scope||window,supr.prototype));
	},
	/**
	 * 删除对象中的某个属性
	 * <pre>
	 * <code>
	 * //例子： 
	 * var o = {name:'zhangsan',age:20,sex:'男'};
	 * Ext.del(o,'age','sex');
	 * 
	 * console.debug(o); // age和sex被删除了 
	 * //out : {name:'zhangsan'}
	 * </code>
	 * </pre>
	 *   	 
	 * @param {Object} o 目标对象
	 * @param {String/Array} args 需要删除的属性
	 * 
	 */
	del : function(o,args/*,arg,arg...*/) {
		var ps = Array.prototype.splice.call(arguments, 1);
		Ext.each(ps, function(p) {
					delete o[p];
				});
	},
	args:function(){
		var args = arguments.callee.caller.arguments;
    	if(Ext.isArray(args[0])){
    		return args[0];
    	}else{
    		return Array.prototype.slice.call(args,0)
    	}
    	return args;
	}
	,
	/**
	 * 获取Record数组中 每个Record某字段的值
	 * <pre>
	 * <code>
	 * //例子:
	 * var records=grid.getStore().getRanage();
	 * var props=Ext.pluckRecord(records,"id");
	 * console.debug(props);
	 * </pre>
	 * </code>
	 * 
	 * @param {Array} arr Ext.data.Record 数组
	 * @param {String} prop Record中的某字段
	 * 
	 * @return {Array}
	 */
	pluckRecord : function(arr, prop) {
		var ret = [], val;
		Ext.each(arr, function(v) {
			if (v.get) {
				ret.push(v.get(prop));
			} else {
				ret.push(window.undefined);
			}
		});
		return ret;
	},
	
	
	/**
	 * 获取对象中的某个属性值,  v 支持以“.”导航
	 * 
	 * <pre>
	 * <code>
	 * //例子: 
	 * var user = {name:'张三',dept:{name:'开发部'}}
	 * var name = Ext.getObjVal(user,'dept.name');
	 * alert(name); // '开发部'
	 * </code>
	 * </pre>
	 * 
	 * @param {Object} o 目标对象
	 * @param {String} v 要获取的属性名称，支持对象.导航
	 * @return {Mixed} 得到的属性值
	 * 
	 */
	getObjVal : function(o, v) {
		try {
			if(!o) return null;
			if(!v) return o;
			var ps = v.split('.'), val = o;
			for (var i = 0; i < ps.length; i++) {
				if (!val)
					return null;
				val = val[ps[i]];
			}
			return val;
		} catch (e) {
			return null
		}
	},
	
	
	/**
	 * 获取一个对象拥有属性的个数
	 * <pre>
	 * <code>
	 * //例子 : 
	 * var o = {name:'sss',age:29}
	 * alert(Ext.objPcount(o));//2
	 * </pre>
	 * </code>
	 * 
	 * @param {Object} o 待查找的对象
	 * @return {Number} 拥有属性的个数
	 * 
	 */
	objPcount : function(o) {
		var count = 0;
		if (typeof o == 'object') {
			for (var p in o) {
				if (o.hasOwnProperty(p)) {
					count++;
				}
			}
		}
		return count;
	},
	urlAppend : function(url, s){
		if(!Ext.isEmpty(s)){
			if(Ext.isObject(s))s = Ext.urlEncode(s);
            return url + (url.indexOf('?') === -1 ? '?' : '&') + s;
		}
        return url;
	},
	/**
	 * 格式化金额
	 * 
	 * @param {Number} value 要格式的数字
	 * @param {Number} num 保留几位小数
	 * @return {Number} 
	 */
	formatMoney : function(v, num) {
		if (typeof v !== 'number') {
			var v = parseFloat(v);
			if (isNaN(v))
				return 0;
		}
		num = num || 0
		return parseFloat(Math.round(v * Math.pow(10, num))
				/ Math.pow(10, num).toFixed(num));
	},
	arr2Map : function(key){
		var arr = Ext.combine.apply(Ext,Array.prototype.slice.call(arguments,1));
		var obj = {};
		if(arr.length){
			Ext.each(arr,function(o){
				if(Ext.isDefined(o[key])){
					obj[o[key]] = o ;
				}
			});	
		}
		return obj;
	},
	arr2obj : function(arr,valPrefix,fields,filterFn){
		var values = {};
		var getV = function(v){
            if(v&&v.value!==undefined)v=v.value;// 根据value属性来得到
            else if(v&& v.id!==undefined)v=v.id;// 根据id属性来得到
            if(v && typeof v=="object" && v.clearTime)v=v.format("Y-m-d");
            return v;       
        }
        
        if(Ext.isArray(valPrefix)){
        	valPrefix = '';
        	if(Ext.isFunction(fields)){
	        	filterFn = fields;
	        	fields = null;
	        }
	        fields = valPrefix;
        }
		valPrefix = valPrefix || '';
		if(Ext.isArray(arr)){
			Ext.each(arr,function(data,i){
				if(data instanceof Ext.data.Record){
					data = data.data;
				}
				if(fields && fields.length){
					if(!Ext.isFunction(filterFn) || filterFn(data)!==false){
						for (var j = 0; j < fields.length; j++) {
							var p = fields[j];
							var k = valPrefix+p;
							values[k] = values[k] || [];
							values[k][i]=getV(data[p]);
						}
					}
				}else{
					if(!Ext.isFunction(filterFn) || filterFn(data)!==false){
						for(var p in data){
								var k = valPrefix+p;
								values[k] = values[k] || [];
								values[k][i]=getV(data[p]);
							}
						}
					}
			});
		}
		return values;
	}
});

/**
 * @class Array
 */
Ext.applyIf(Array.prototype, {
	/**
	 * 拷贝数组
	 * @return {Array}
	 */
	copy : function(){
		return this.slice();
	},
	/**
	 * 判断数组是否为空
	 * 
	 * @return {Boolean}
	 */
    isEmpty : function() {
        if (this.length && this.length > 0) {
            return false;
        }
        return true;
    },
    
    /**
     * 根据数组索引删除数组中的元素
     * @param {Number} index
     */
    removeAt : function(index) {
        this.splice(index, 1);
    },
    
    /**
     * 根据数组中对象元素的某字段值删除数组中的元素
     * <pre>
     * <code>
     * //例子：
     * var arr = [{id:1,name:'zhangsan'},{id:2,name:'wangwu'},{id:3,name:'lisi'}];
     * arr.removeKey(3,'id');//现在要删除lishi 
     * </pre>
     * </code>
     * 
     * @param {String/Number} keyValue 删除对应属性的值
     * @param {String/Number} keyName 删除对应属性
     */
    removeKey : function(keyValue,keyName) {
    	keyName = keyName || 'id';
        Ext.each(this, function(o, i) {
            if (o[keyName] == keyValue) {
                this.removeAt(i);
                return;
            }
        }, this);
    },
    
    /**
     * 判断obj在数组中是否存在
     * 
     * @param {Mixed} obj 需要查找的值
     * @return {Boolean}
     */
	contains:function(obj){
	    return (this.indexOf(obj)>=0);
	},
	
	/**
	 * 过滤掉数组中重复的对象，返回过滤后的新数组
	 * <pre>
     * <code>
     * //例子：
     * var arr = ['abc','abc','123','234','',''];
	 * var newarr = arr.distinct(true);
	 * console.debug(newarr);//out:["abc", "123", "234"]
     * </pre>
     * </code>
     * 
	 * @param {Boolean} valid 是否过滤掉数组中的空对象
	 * @return {Array} 返回一个全新的数组
	 */
	distinct : function(valid) {
	    var ArrayObj = {};
	    var returnArray = [];
	    for (var i = 0; i < this.length; i++) {
	        if (ArrayObj[this[i]] || (valid && Ext.isEmpty(this[i])))
	            continue;
	        ArrayObj[this[i]] = this[i];
	        returnArray.push(this[i])
	    }
	    return returnArray
	}
});

/**
 * @class Ext.form.VTypes
 * Overridable validation definitions. The validations provided are basic and intended to be easily customizable and extended.
 * @singleton
 */
Ext.apply(Ext.form.VTypes, {
	/**
	 * 日期验证器 用于验证起始日期必须早于结束日期
	 * 
	 * <pre>
	 * <code>
	 * //例子:
items:[
	{xtype:"datefield",id:"startDate",fieldLabel:"开始时间",name:"start",vtype:"daterange",endDateField:"endDate"},
	{xtype:"datefield",id:"endDate",fieldLabel:"结束时间",name:"end",vtype:"daterange",startDateField:"startDate"},
]
    	</code>
    	</pre>
	 * @param {Date} val 日期
	 * @param {Date} field Ext.form.DateField
	 */
    daterange : function(val, field) {
        var date = field.parseDate(val);
        if (!date) {
            return;
        }
        if (field.startDateField
                && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax
                        .getTime()))) {
            var start = Ext.getCmp(field.startDateField);
            start.setMaxValue(date);
            start.validate();
            this.dateRangeMax = date;
        } else if (field.endDateField
                && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin
                        .getTime()))) {
            var end = Ext.getCmp(field.endDateField);
            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
        return true;
    }
});


Ext.override(Ext.form.CheckboxGroup,{
    onRender : function(ct, position) {
        if (!this.el) {
            var panelCfg = {
                cls : this.groupCls,
                layout : 'column',
                border : false,
                renderTo : ct
            };
            var colCfg = {
                defaultType : this.defaultType,
                layout : 'form',
                border : false,
                defaults : {
                    hideLabel : true,
                    name:this.name,
                    anchor : '100%'
                }
            }
            if (this.items[0].items) {
                // The container has standard ColumnLayout configs, so pass them
                // in directly
                Ext.apply(panelCfg, {
                            layoutConfig : {
                                columns : this.items.length
                            },
                            defaults : this.defaults,
                            items : this.items
                        })
                for (var i = 0, len = this.items.length; i < len; i++) {
                    Ext.applyIf(this.items[i], colCfg);
                };

            } else {
                var numCols, cols = [];

                if (typeof this.columns == 'string') { // 'auto' so create a
                                                        // col per item
                    this.columns = this.items.length;
                }
                if (!Ext.isArray(this.columns)) {
                    var cs = [];
                    for (var i = 0; i < this.columns; i++) {
                        cs.push((100 / this.columns) * .01); // distribute by
                                                                // even %
                    }
                    this.columns = cs;
                }

                numCols = this.columns.length;

                // Generate the column configs with the correct width setting
                for (var i = 0; i < numCols; i++) {
                    var cc = Ext.apply({
                                items : []
                            }, colCfg);
                    cc[this.columns[i] <= 1 ? 'columnWidth' : 'width'] = this.columns[i];
                    if (this.defaults) {
                        cc.defaults = Ext.apply(cc.defaults || {},
                                this.defaults)
                    }
                    cols.push(cc);
                };

                // Distribute the original items into the columns
                if (this.vertical) {
                    var rows = Math.ceil(this.items.length / numCols), ri = 0;
                    for (var i = 0, len = this.items.length; i < len; i++) {
                        if (i > 0 && i % rows == 0) {
                            ri++;
                        }
                        if (this.items[i].fieldLabel) {
                            this.items[i].hideLabel = false;
                        }
                        cols[ri].items.push(this.items[i]);
                    };
                } else {
                    for (var i = 0, len = this.items.length; i < len; i++) {
                        var ci = i % numCols;
                        if (this.items[i].fieldLabel) {
                            this.items[i].hideLabel = false;
                        }
                        cols[ci].items.push(this.items[i]);
                    };
                }

                Ext.apply(panelCfg, {
                            layoutConfig : {
                                columns : numCols
                            },
                            items : cols
                        });
            }

            this.panel = new Ext.Panel(panelCfg);
            this.el = this.panel.getEl();

            if (this.forId && this.itemCls) {
                var l = this.el.up(this.itemCls).child('label', true);
                if (l) {
                    l.setAttribute('htmlFor', this.forId);
                }
            }

            var fields = this.panel.findBy(function(c) {
                        return c.isFormField;
                    }, this);

            this.items = new Ext.util.MixedCollection(false,function(o){
                return o.inputValue || o.value;
            });
            this.items.addAll(fields);
        }
        Ext.form.CheckboxGroup.superclass.onRender.call(this, ct, position);
    },
    getValue:function(){
        var val = [];
        this.items.filter('checked',true).each(function(item){
            var v = Ext.value(item.inputValue,item.value);
            if(!Ext.isEmpty(v))val.push(v);
        },this);
        return val;
    },
    getName:function(){
        return this.name || this.id;
    },
    setValue:function(v){
        //为了方便比较统一用字符串来比较
        if(Ext.isArray(v)){
            v = v.toString().split(',');
            
        }else if(v){
            v = v.split(/[,;\s]/);
        }
        var arr = [].concat(v||[]);
        this.items.eachKey(function(key,item,i,len){
            var checked = arr.indexOf(String(key))>=0;
            item.setValue(checked);
        },this);
    },
    initValue:function(){
        if (this.value !== undefined && this.value!==null) {
            this.setValue(this.value);
        }
    }
});

Ext.override(Ext.form.RadioGroup,{
    setValue:function(v){
        this.items.each(function(item){
            if(item.inputValue==v)item.setValue(true);
        },this);
    }
});
/**
 * @class Ext.form.Field
 * 
 * 对Field及BasicForm进行了简单扩展,支持clearDirty
 */
Ext.apply(Ext.form.Field.prototype,{// msgTarget:"side",
    clearDirty:function(){
        this.originalValue=this.getValue();
    },
    clearData:function(){// 把字段设置为最原始的值,通过initialConfig的value属性得到
        var v=this.initialConfig.value;
        if(v === this.emptyText || v === undefined){
       		 v = '';
        }
        this.originalValue=v;
    },
    setOriginalValue:function(v){// 设置字段原始值
        this.setValue(v);
        this.clearDirty();
    },
    getCursorPosition:function(){
        var d = this.el.dom;
        if(d.setSelectionRange){
            return d.selectionStart||0;
        }else if(d.createTextRange){
             var   currentRange=document.selection.createRange();  
             var   workRange=currentRange.duplicate();  
                d.select();  
                var   allRange=document.selection.createRange();  
                var   len=0;
                while(workRange.compareEndPoints("StartToStart",allRange)>0){  
                  workRange.moveStart("character",-1);  
                  len++;  
                }
                currentRange.select();  
                return len;
        }
    },
    canFocus:function(){
        return !(/hidden|labelfield|checkbox|radio/.test(this.getXType())||this. disabled||this.hidden|| (this.el.dom.readOnly=== true));
    }
});
Ext.override(Ext.form.DateField,{
	clearData : function(){// 把字段设置为最原始的值,通过initialConfig的value属性得到
        var v=this.initialConfig.value;
        if(v === this.emptyText || v === undefined){
       		 v = '';
        }
        this.originalValue = this.parseDate(this.formatDate(this.parseDate(v)));
    }
});

/**
 * @class Ext.Container
 */
Ext.apply(Ext.Container.prototype,{
	/**
	 * 用来查询panel内组件id为指定id 或id/name/dataIndex为指定名称的的表单组件。
	 * 常用于查找form表单内的组件,替代formPanel.getForm().findField()方法。
	 * <pre>
	 * <code>
	 * //示例
	 * var formPanel = Ext.getCmp('LoginPanel');
	 * var name = formPanel.findSomeThing('name').getValue();
	 * </pre>
	 * </code>
	 * 
	 * @param {String} id 要查找的组件的id或者name名称
	 * @return {Component} 符合条件的第一个组件
	 */
	findSomeThing:function(id) {
	    var m, ct = this;
	    this.cascade(function(c) {
	        if (ct != c&& c.id === id || (c.isFormField && (c.dataIndex == id || c.id == id || c.getName() == id))) {
	            m = c;
	            return false;
	        }
	    });
	    return m || null;
	},
	/**
	 * getComponent 的简写
	 * @param {String/Number} id/index
	 */
	getItem : function(id){
		return this.getComponent(id);
	}
});

/**
 * @class Ext.DatePicker
 */
Ext.apply(Ext.DatePicker.prototype,{
	
	/**
	 * 修改日期选择控件，在选择了一个日期后，把当前的时间追加到选中的日期后。
	 * <pre>
	 * <code>
	 * //示例，在DatePicker上面选择了2010-8-10
{xtype:"datefield",fieldLabel:"开始时间",name:"start",listeners:{
	select:function(t,d){
		console.log(d.format('Y-m-d H:i:s')); //2010-8-10 10:34:29 而不是 2010-8-10 00:00:00
	}
}}
	 * </pre>
	 * </code>
	 * 
	 * @param {Ext.EventObject} e
	 * @param {Ext.DatePicker} t 
	 */
	handleDateClick: function(e, t) {
		e.stopEvent();
		if (t.dateValue && !Ext.fly(t.parentNode).hasClass("x-date-disabled")) {
		    var now = new Date();
		    var d = new Date(t.dateValue);
		    d.setHours(now.getHours());
		    d.setMinutes(now.getMinutes());
		    d.setSeconds(now.getSeconds());
		    this.setValue(d, true);
		    this.fireEvent("select", this, this.value);
		}
	},
	
	/**
	 * 修改日期选择控件，在选择今天后，把当前的时间追加到选中的今天的日期后。
	 * <pre>
	 * <code>
	 * //示例，在DatePicker上面选择了【今天】
{xtype:"datefield",fieldLabel:"业务时间",name:"billDate",listeners:{
	select:function(t,d){
		console.log(d.format('Y-m-d H:i:s')); //2010-8-10 10:34:29 而不是 2010-8-10 00:00:00
	}
}}
	 * </pre>
	 * </code>
	 * 
	 */
	selectToday:function() {
	    if (this.todayBtn && !this.todayBtn.disabled) {
	        this.setValue(new Date(), true);
	        this.fireEvent("select", this, this.value);
	    }
	},
	
	/**
	 * 修改日期选择控件，在setValue方法中，加入是否保持时间的选项
	 * 
	 * @param {Date} value 设置的日期值
	 * @param {Boolean} keepTime  是否在日期选择器上保留设置的时间
	 */
	setValue:function(value, keepTime) {
	    var old = this.value;
	    this.value = keepTime ? value : value.clearTime(true);
	    if (this.el) {
	        this.update(this.value);
	    }
	}
});

/**
 * @class Ext.form.ComboBox
 */
Ext.override(Ext.form.ComboBox.prototype,{
	/**
	 * 对ComboBox的onTriggerClick进行增强，支持父容器disabled值判断功能
	 */
	onTriggerClick: function() {
	    var disabled = false;
	    if (this.ownerCt)
	        this.ownerCt.bubble(function(c) {
	            if (c.disabled)
	                disabled = true;
	        });
	    if (this.disabled || disabled) {
	        return;
	    }
	    if (this.isExpanded()) {
	        this.collapse();
	        this.el.focus();
	    } else {
	        this.onFocus({});
	        if (this.triggerAction == 'all') {
	            this.doQuery(this.allQuery, true);
	        } else {
	            this.doQuery(this.getRawValue());
	        }
	        this.el.focus();
	    }
	},
	processValue:function(value) {
        if(this.comboBlank===false){
            return this.getValue();
        }else{
            return Ext.form.ComboBox.superclass.processValue.call(this,value);
        }           
    } 
});

Ext.override(Ext.form.ComboBox,{
	trigger2Class:'search',
	hideTrigger2:true,
    onRender : function(ct, position){
        if(this.hiddenName && !Ext.isDefined(this.submitValue)){
            this.submitValue = false;
        }
        this.triggerConfig = {
            tag:'span', cls:'x-form-twin-triggers', cn:[
            {tag: "img", src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger " + Ext.value(this.trigger1Class,'')},
            {tag: "img", src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger " + Ext.value(this.trigger2Class,'')}
        ]};
        Ext.form.ComboBox.superclass.onRender.call(this, ct, position);
        if(this.hiddenName){
            this.hiddenField = this.el.insertSibling({tag:'input', type:'hidden', name: this.hiddenName,
                    id: (this.hiddenId || Ext.id())}, 'before', true);

        }
        if(Ext.isGecko){
            this.el.dom.setAttribute('autocomplete', 'off');
        }

        if(!this.lazyInit){
            this.initList();
        }else{
            this.on('focus', this.initList, this, {single: true});
        }
    },
    onTrigger1Click:function(){
    	Ext.form.ComboBox.prototype.onTriggerClick.apply(this,arguments);
    },
    onTrigger2Click:function(){},
    getTriggerWidth: function(){
        var tw = 0;
        Ext.each(this.triggers, function(t, index){
            var triggerIndex = 'Trigger' + (index + 1),
                w = t.getWidth();
            if(w === 0 && !this['hidden' + triggerIndex]){
                tw += this.defaultTriggerWidth;
            }else{
                tw += w;
            }
        }, this);
        return tw;
    },
    onDestroy : function(){
        if (this.dqTask){
            this.dqTask.cancel();
            this.dqTask = null;
        }
        this.bindStore(null);
        Ext.destroy(
        	this.triggers,
            this.resizer,
            this.view,
            this.pageTb,
            this.list
        );
        Ext.destroyMembers(this, 'hiddenField');
        Ext.form.ComboBox.superclass.onDestroy.call(this);
    },
    initTrigger : function(){
        var ts = this.trigger.select('.x-form-trigger', true);
        var triggerField = this;
        ts.each(function(t, all, index){
            var triggerIndex = 'Trigger'+(index+1);
            t.hide = function(){
                var w = triggerField.wrap.getWidth();
                this.dom.style.display = 'none';
                triggerField.el.setWidth(w-triggerField.trigger.getWidth());
                this['hidden' + triggerIndex] = true;
            };
            t.show = function(){
                var w = triggerField.wrap.getWidth();
                this.dom.style.display = '';
                triggerField.el.setWidth(w-triggerField.trigger.getWidth());
                this['hidden' + triggerIndex] = false;
            };

            if(this['hide'+triggerIndex]){
                t.dom.style.display = 'none';
                this['hidden' + triggerIndex] = true;
            }
            this.mon(t, 'click', this['on'+triggerIndex+'Click'], this, {preventDefault:true});
            t.addClassOnOver('x-form-trigger-over');
            t.addClassOnClick('x-form-trigger-click');
        }, this);
        this.triggers = ts.elements;
    }
});
/**
 * @class Ext.form.ComboBox
 */
Ext.apply(Ext.form.ComboBox.prototype,{
    PleaseSelectedValue:"--PleaseSelectedValue--",
    PleaseSelectedText:"--请选择--",
    disableChoice:false,
    reload:function(){      
        this.store.reload();
    },
    bindStore:function(store, initial){
        if(this.store && !initial){
            this.store.un('beforeload', this.onBeforeLoad, this);
            this.store.un('load', this.onLoad, this);
            this.store.un('loadexception', this.collapse, this);
            if(!store){
                this.store = null;
                if(this.view){
                    this.view.setStore(null);
                }
            }
        }
        if(store){
	            this.store = Ext.StoreMgr.lookup(store);
	            if(this.view){
	                this.view.setStore(store);
	            }
	           if(this.store.data.getCount()>0 && (this.allowBlank||this.nullText) && !this.disableChoice){
	                var o={};               
	                o[this.valueField]=this.PleaseSelectedValue;
	                var nullText=this.nullText?this.nullText:this.PleaseSelectedText;
	                this.nullText=nullText;
	                o[this.displayField]=nullText;
	                this.store.insert(0,new Ext.data.Record(o));            
	           }
	           if(!this.lastOptions){
	                this.store.on('beforeload', this.onBeforeLoad, this);
	                this.store.on('loadexception', this.collapse, this);
	                if((this.allowBlank||this.nullText)&& !this.disableChoice){
	                this.store.on("load",function(A,B){
	                            var o={};
	                            o[this.valueField]=this.PleaseSelectedValue;
	                            o[this.displayField]=this.nullText?this.nullText:this.PleaseSelectedText;
	                            this.nullText=nullText;
	                            if(this.store&&this.store.insert&&this.store.find(this.valueField,o[this.valueField])<0)
	                            this.store.insert(0,new Ext.data.Record(o));
	                        },this);
	                }       
	                this.store.on('load', this.onLoad, this);
	           }
	   	}
	        
	},
	setValue : function(v){
        var text = v;
        if(this.valueField){
            var r = this.findRecord(this.valueField, v);
            if(r){
                text = r.data[this.displayField];
            }else if(this.valueNotFoundText !== undefined){
                text = this.valueNotFoundText;
            }
        }
        this.lastSelectionText = text;
        if(this.hiddenField){
            this.hiddenField.value =(v==this.PleaseSelectedValue?"":v);
        }
        Ext.form.ComboBox.superclass.setValue.call(this, text);
        this.value = v;
    },
	getValue : function(){
        if(this.value==this.PleaseSelectedValue||this.value==this.nullText){return "";}
        else if(this.valueField){
            return typeof this.value != 'undefined' ? this.value : '';
        }else{
            return Ext.form.ComboBox.superclass.getValue.call(this);
        }
    }  
});

/**
 * @class Ext.Toolbar
 */
Ext.apply(Ext.Toolbar.prototype,{
	/**
	 * 获得Toolbar中item为form元素的值,该form元素必须有itemId/name/id
	 * 
	 * <pre>
	 * <code>
	 * 
{
	xtype:"form",
	frame:true,
	width:400,
	height:300,
	region: 'center',
	id:"viewportform",
	tbar:['field1:',{xtype:'textfield',name:'field1'},'field2:',{xtype:'textfield',name:'field2'}],
	items:[
		{xtype:'button',text:'get toolbar values',scope:this,handler:function(){
			var o=Ext.getCmp('viewportform').getTopToolbar().getValues();
			console.debug(o);//在field1中填写123，在field2中添加345，得到的值：{{field1:'123'},{field2:'345'}}
		}}
	]
}
	 * </pre>
	 * </code>
	 * @return {Object} 选中的值
	 */
    getValues:function(){
        var c = this;
        var values={};
        if(!c.items || !c.items.getCount())return values;
        c.items.each(function(item){
            if(item.isFormField){
                var name = (item.itemId||item.name||item.id);
                var v = item.getValue();
                if(v instanceof Date) v = v.format('Y-m-d');
                values[name] = v;
            }
        },this);
        return values;
    },
    
    /**
     * insertButton方法的简写
     * 
     * @param {Number} index 要在工具栏中插入组件的序号
     * @param {Object/Ext.Toolbar.Item/Ext.Button/Array} item 工具栏按钮 或按钮的配置对象，或按钮/配置对象的数组
     * 
     * @return {Ext.Button/Item}
     */
    insert:Ext.Toolbar.prototype.insertButton
});

/**
 * @class Ext.Window
 * 
 * <p>
 * 增强Ext.Window的快捷键支持，包括：
 * <li>Alt+X：关闭窗口</li>
 * <li>Tab：在Window内的组件中依次获得焦点(包括Window中的按钮)</li>
 * </p>
 */
Ext.apply(Ext.Window.prototype,{
    onRender : function(ct, position){
        Ext.Window.superclass.onRender.call(this, ct, position);
        if(this.plain){
            this.el.addClass('x-window-plain');
        }
        // this element allows the Window to be focused for keyboard events
        this.focusEl = this.el.createChild({
                    tag: "a", href:"#", cls:"x-dlg-focus",
                    tabIndex:"-1", html: "&#160;"});
        this.focusEl.swallowEvent('click', true);

        this.proxy = this.el.createProxy("x-window-proxy");
        this.proxy.enableDisplayMode('block');

        if(this.modal){
            this.mask = this.container.createChild({cls:"ext-el-mask"}, this.el.dom);
            this.mask.enableDisplayMode("block");
            this.mask.hide();
        }
        this.getKeyMap().addBinding([
	        {
                key:"x",
                alt:true,
                fn: function(){this.hide();},
                scope: this
	        },{
	            key:Ext.EventObject.TAB,
	            fn:function(k,e){
	                if(this.buttons&&this.buttons.length){
	                    if(this.buttons[this.buttons.length-1].el.hasClass("x-btn-focus")){
		                    e.stopEvent();
		                    var firstField=[];
		                    // 此处有问题,影响效率
		                    this.cascade(function(c){
		                        if(c.isFormField && c.canFocus()){
		                            firstField.push(c);
		                            return false;
		                        }
		                    });
		                    if(firstField.length){
		                        firstField[0].focus();
		                    }
	                    }
	                }
	            },
	            scope:this
	        }
        ]);
    }
});

/**
 * @class Ext.form.BasicForm
 * 
 * <p>
 * 增加了在form表单中使用回车键在表单组件中按照指定的导航顺序导航的功能。
 * 并且可以使用方向键[UP][LEFT]反向导航。
 * </p>
 * 
 * <pre>
 * <code>
 * //示例:
{
	xtype:"form",
	frame:true,
	width:400,
	height:300,
	region: 'center',
	//自定义导航顺序
	navigationSequences:['name','email','password','bornDate'],
	//开启回车导航
	enterNavigationKey:true,
	items:[
		{xtype:'textfield',name:'name'},
		{xtype:'textfield',name:'password',inputType:'password'},
		{xtype:'datefield',name:'bornDate'},
		{xtype:'textfield',vtype:'email',name:'email'},
		{xtype:'textfield',name:'other'},
	]
}
 * </pre>
 * </code>
 * 
 * <p>
 * 回车导航在企业级应用中的表单中是很常用的功能。
 * </p>
 */
Ext.apply(Ext.form.BasicForm.prototype,{
		/**
		 * 定义的顺序来导航
		 * @cfg {Array} navigationSequences
		 */
	
		/**
		 * 是否开启回车导航，只有开启了该属性，才能正确回车导航
		 * @cfg {Boolean} enterNavigationKey
		 */
	
		/**
		 * 清除所有表单中所有组件的修改状态
		 * 
		 * @return BasicForm
		 */
        clearDirty:function(){
            this.items.each(function(f){
               f.clearDirty();
            });
            return this;
        },
        
        /**
         * 把表单中所有字段设置为最原始的值，即通过initialConfig的value属性设置的值
         */
        clearData:function(){
            this.items.each(function(f){
               f.clearData();
            });
        },
        
        //private
        focusFirstButton:function(fp){
            if(fp){
                var buttons=fp.buttons;
                if(!buttons){
                    fp.bubble(function(c){if(c.buttons){buttons=c.buttons;return false;}});
                }
                for(var i=0;buttons&&i<buttons.length;i++){
                if(!buttons[i].disabled){
                    buttons[i].focus();
                    break;
                }}
            }
        },
        
        //private
        focusPreviousField:function(f,e){
            var n=f.name||f.id;
            // 通过navigationSequences定义的顺序来导航
            var sequence=-1,key=null;
            if(this.navigationSequences && ((sequence=this.navigationSequences.indexOf(n))>0)){
                key=this.navigationSequences[sequence-1];
            }
            else {
                 this.items.each(function(field){// 查找当前field所在的位置
                      sequence++;
                      if(f.id==field.id || f.name==field.name){
                        return false;
                      }
                    });
                while(sequence>0){
                        if(!this.items.get(sequence-1).canFocus()){
                        sequence--;
                        }
                        else {
                            break;
                        }
                }   
                if(sequence>0){
                    key=this.items.get(sequence-1).id;
                }               
            }
            if(key){// 如果找到下一个key
                var field=this.findField(key);
                    if(!field){// 通过表单来找
                        var fp=f.findParentByType("form");
                        if(fp)field=fp.findSomeThing(key);
                    }
                    if(field){
                            if(e)e.stopEvent();
                            field.focus();
                        }
            }
        },
        
        //private
        focusNextField:function(f,e){
            var n=f.name||f.id;
            // 通过navigationSequences定义的顺序来导航
            var sequence=-1,key=null;
            if(this.navigationSequences && ((sequence=this.navigationSequences.indexOf(n))>=0)){
                if(sequence>=this.navigationSequences.length-1){
                    var fp=f.findParentByType("form");
                    this.focusFirstButton(fp);// 导航到按钮
                }
                else {
                    key=this.navigationSequences[sequence+1];
                }
            }
            else {
                 this.items.each(function(field){// 查找当前field所在的位置
                      sequence++;
                      if(f.id==field.id || f.name==field.name){
                        return false;
                      }
                    });
                while(sequence<this.items.getCount()-1){
                        if(!this.items.get(sequence+1).canFocus()){
                        sequence++;
                        }
                        else {
                            break;
                        }
                }
                if(sequence>=this.items.getCount()-1){
                    var fp=f.findParentByType("form");
                    this.focusFirstButton(fp);// 导航到按钮
                }
                else {
                    key=this.items.get(sequence+1).id;
                }
            }
            if(key){// 如果找到下一个key
                var field=this.findField(key);
                    if(!field){// 通过表单来找
                        var fp=f.findParentByType("form");
                        if(fp)field=fp.findSomeThing(key);
                    }
                    if(field){
                        try{
                            field.focus();
                        }
                        catch(e){
                            if(e)e.keyCode=9;
                        }
                }
            }
        },
        //private
        handleNavigation:function(f,e){         
            var k = e.getKey();
            if(k==e.ENTER && this.enterNavigationKey){
                if(f.getValue()||f.allowBlank!==false){
                    this.focusNextField(f,e);
                    // alert("go next");
                }
                // else return false;
            }
            else if(k==e.UP||(k==e.LEFT && f.getCursorPosition()===0)){
                this.focusPreviousField(f,e);
            }           
        },
        add : function(){
            for(var i=0;i<arguments.length;i++){    
                var f=arguments[i];
                f.on("specialkey",this.handleNavigation,this);
            }
            this.items.addAll(Array.prototype.slice.call(arguments, 0));
            return this;
        }
    });
    
    
/**
 * @class  Ext.form.FormPanel
 * 对Ext.form.FormPanel增强
 */
Ext.apply(Ext.form.FormPanel.prototype,{
	/**
	 * 通过id或者name获取表单元素的快捷方式,等同form.getForm().findField(id);
	 * 
	 * @param {String/Object/...} id
	 * @return field
	 */
    findField:function(id){
        return this.getForm().findField(id);
    }
});

/**
 * @class Ext.grid.RowSelectionModel
 * 增强Ext.grid.RowSelectionModel
 */
Ext.override(Ext.grid.RowSelectionModel,{
	 /**
	  * 如果已选择到了最后一行，则自动跳到第一行
	  * 
	  * @param {Boolean} keepExisting
	  * 
	  * @return {Boolean}
	  */
     selectNext : function(keepExisting) {
        if (this.hasNext()) {
            this.selectRow(this.last + 1, keepExisting);
            this.grid.getView().focusRow(this.last);
            return true;
        }else{
            this.selectFirstRow(keepExisting);
            this.grid.getView().focusRow(0);
            return false;
        }
    },
    
    /**
	  * 如果已选择到了一行，则自动跳到最后一行
	  * @param {Boolean} keepExisting
	  * @return {Boolean}
	  */
    selectPrevious : function(keepExisting) {
        if (this.hasPrevious()) {
            this.selectRow(this.last - 1, keepExisting);
            this.grid.getView().focusRow(this.last);
            return true;
        }else{
            this.selectLastRow(keepExisting);
            this.grid.getView().focusRow(this.grid.store.getCount()-1);
            return false;
        }
    }
});

/**
 * @class Ext.grid.CellSelectionModel
 * 对Ext.grid.CellSelectionModel的增强，增加了在EditorGridPanel中回车按照指定顺序导航的功能。
 * <pre>
 * <code>
 * //示例:
 * </pre>
 * </code>
 */
Ext.override(Ext.grid.CellSelectionModel,{
    tryEdit:function(row,col,required,step){
        this.tryDoEdit(null,row,col,step||1,this.acceptsNav,this,required!==false);
    },
    tryDoEdit:function(e,row,col,step,fn,scope,required){
        var g = this.grid;
        var newCol=step>0?col+1:col-1;      
        var cell=g.walkCells(row, newCol,step, fn, scope);
        if(cell){       
             g.startEditing(cell[0], cell[1],required);
             if(!g.editing){
                this.tryDoEdit(e,cell[0],cell[1],step,fn,scope,required);
             }
             else if(e) {
                e.stopEvent();
             }
        }else {
            g.focus();
        }
    },
    onEditorKey : function(field, e){
        var k = e.getKey(), newCell, g = this.grid,s=this.selection,sm=g.getColumnModel();
        var cell={
        	row:s.cell[0],
        	col:s.cell[1]
        };
        
        var ed = sm.getCellEditor(cell.col,cell.row);
        
        if(k == e.TAB ||(this.enterNavigation&&k==e.ENTER && (!ed.field.disableEnterNavigation||e.shiftKey))){           
            // ed.completeEdit();
            if(e.shiftKey){
                this.tryDoEdit(e,cell.row,cell.col,-1,this.acceptsNav, this,k==e.ENTER);
                // newCell = g.walkCells(ed.row, ed.col-1, -1, this.acceptsNav,
                // this);
            }else{
                this.tryDoEdit(e,cell.row,cell.col,1,this.acceptsNav, this,k==e.ENTER);
                // newCell = g.walkCells(ed.row, ed.col+1, 1, this.acceptsNav,
                // this);
            }
            // e.stopEvent();
        }
        else if(k == e.ENTER){
            e.stopEvent();
        }else if(k == e.ESC){
        	g.getView().focusCell(cell.row, cell.col);
            e.stopEvent();
        }
        else if(k==e.LEFT &&ed.field.getCursorPosition()==0){
            this.tryDoEdit(e,cell.row,cell.col,-1,this.acceptsNav, this,false);
        }
    }
});


Ext.override(Ext.grid.EditorGridPanel,{
	startEditing : function(row, col){
        this.stopEditing();
        if(this.colModel.isCellEditable(col, row)){
            this.view.ensureVisible(row, col, true);
            var r = this.store.getAt(row),
                field = this.colModel.getDataIndex(col),
                e = {
                    grid: this,
                    record: r,
                    field: field,
                    value: r.data[field],
                    row: row,
                    column: col,
                    cancel:false
                };
            if(this.fireEvent("beforeedit", e) !== false && !e.cancel){
                this.editing = true;
                var ed = this.colModel.getCellEditor(col, row);
                if(!ed){
                    return;
                }
                if(!ed.rendered){
                    ed.parentEl = this.view.getEditorParent(ed);
                    ed.on({
                        scope: this,
                        render: {
                            fn: function(c){
                                c.field.focus(false, true);
                            },
                            single: true,
                            scope: this
                        },
                        specialkey: function(field, e){
                            this.getSelectionModel().onEditorKey(field, e);
                        },
                        complete: this.onEditComplete,
                        canceledit: this.stopEditing.createDelegate(this, [true])
                    });
                }
                Ext.apply(ed, {
                    row     : row,
                    col     : col,
                    record  : r
                });
                this.lastEdit = {
                    row: row,
                    col: col
                };
                this.activeEditor = ed;
                // Set the selectSameEditor flag if we are reusing the same editor again and
                // need to prevent the editor from firing onBlur on itself.
                ed.selectSameEditor = (this.activeEditor == this.lastActiveEditor);
                var v = this.preEditValue(r, field);
                ed.startEdit(this.view.getCell(row, col).firstChild, Ext.isDefined(v) ? v : '');

                // Clear the selectSameEditor flag
                (function(){
                	if(ed.field.onTriggerClick){
	                    (function(){
	                        ed.field.onTriggerClick();
	                        if(ed.field.list&&ed.field.list.alignTo)
	                        ed.field.list.alignTo(this.view.getCell(ed.row,ed.col), 'tl-bl?');
	                    }).defer(100,this);
                    }else if(ed.field.isFormField){
                        ed.field.el.dom.select();
                    }
                    delete ed.selectSameEditor;
                }).defer(50,this);
            }
        }
    }
});

/**
 * @class Ext.grid.GridPanel
 * 
 * ExtJs3.0中Ext.grid.GridPanel没有getSelections,但是比较常用
 */
Ext.apply(Ext.grid.GridPanel.prototype,{
    getSelections:function(){
        return this.getSelectionModel().getSelections();
    }
});
/**
 * @class Ext.grid.EditorGridPanel
 * 
 * 增强Ext.grid.EditorGridPanel,让可以编辑表格可以获取修改后的数据
 */
Ext.override(Ext.grid.EditorGridPanel,{
	/**
	 * editor数据字段的前缀
	 * @cfg {String} valPrefix 
	 */
	valPrefix : 'item_',
	
	getFilterDataFn:null,
	
	/**
	 * 获取被修改后的Records数组
	 * return {Record[] recoreds} 
	 */
	getUpdateRecords:function(){
		return this.getStore().getModifiedRecords();
	},
	/**
	 * 获取editorGrid被修改过的数据
	 * return {Array}
	 */
	getUpdateRowsValues:function(){
		return Ext.arr2obj(this.getUpdateRecords(),this.valPrefix,this.getStore().fields.keys,this.getFilterDataFn);
	},
	/**
	 * 获取grid每行的数据
	 * return {Array}
	 */
	getRowsValues:function(){
		return Ext.arr2obj(this.getStore().getRange(),this.valPrefix,this.getStore().fields.keys,this.getFilterDataFn);
	},
	/**
	 * 修复如果 value 为 undefined编辑时出现 "&nbsp;"问题 
	 * @param {Ext.data.Record} r
	 * @param {Ext.form.Field} field
	 * @return {Mixed}
	 * 
	 */
	preEditValue : function(r, field){
        var value = r.data[field];
        if(!Ext.isDefined(value))value = '';
        return this.autoEncode && Ext.isString(value) ? Ext.util.Format.htmlDecode(value) : value;
    }
});



/**
 * @class Ext.grid.CheckboxSelectionModel
 * 
 * 增强Ext.grid.CheckboxSelectionModel,让选择模型智能选中或取消全选按钮的状态
 */
Ext.override(Ext.grid.CheckboxSelectionModel,{
    clearCheckerAll : function() {
        var a = this.grid.view;
        var b = Ext.fly(a.innerHd).child(".x-grid3-hd-checker");
        if (!b) {
            return
        }
        if (this.getCount() != 0 && this.getCount() == a.getRows().length) {
            b.addClass("x-grid3-hd-checker-on")
        } else {
            b.removeClass("x-grid3-hd-checker-on")
        }
    },/*,
    handleMouseDown : function(g, rowIndex, e){
        if(e.button !== 0 || this.isLocked()){
            return;
        }
        var view = this.grid.getView();
        if(e.shiftKey && !this.singleSelect && this.last !== false){
            var last = this.last;
            this.selectRange(last, rowIndex, e.ctrlKey);
            this.last = last; // reset the last
            view.focusRow(rowIndex);
        }else{
            var isSelected = this.isSelected(rowIndex);
            if(e.ctrlKey && isSelected){
                this.deselectRow(rowIndex);
            }else if(!isSelected || this.getCount() > 1){
              //  this.selectRow(rowIndex,( e.ctrlKey || e.shiftKey || this.keepExisting));
                view.focusRow(rowIndex);
            }
        }
    },*/
    init:function(grid){
        Ext.grid.CheckboxSelectionModel.superclass.init.call(this,grid);
        this.on("selectionchange", this.clearCheckerAll, this,{delay : 100});
    }
});

Ext.override(Ext.data.Store,{
	load : function(options) {
        options = Ext.apply({}, options);
        options.params = options.params || {};
        this.storeOptions(options);
        
        var pn = this.paramNames;
        if(this.sortInfo && this.remoteSort){
            options.params = Ext.apply({}, options.params);
            options.params[pn.sort] = this.sortInfo.field;
            options.params[pn.dir] = this.sortInfo.direction;
        }
        if((!options.params[pn.limit]) && this.pageSize){
        	options.params[pn.limit] =  this.pageSize;
        }
        try {
            return this.execute('read', null, options); // <-- null represents rs.  No rs for load actions.
        } catch(e) {
            this.handleException(e);
            return false;
        }
    }
}); 

/**
 * @class Ext.data.JsonReader
 * 修正在加载分页数据时,由于result为null引起的分页工具栏不正常工作的Bug
 */
Ext.apply(Ext.data.JsonReader.prototype,{
    readRecords : function(o){      
        /**
         * After any data loads, the raw JSON data is available for further
         * custom processing. If no data is loaded or there is a load exception
         * this property will be undefined.
         * 
         * @type Object
         */
        this.jsonData = o;
        if(o.metaData){
            delete this.ef;
            this.meta = o.metaData;
            this.recordType = Ext.data.Record.create(o.metaData.fields);
            this.onMetaChange(this.meta, this.recordType, o);
        }
        var s = this.meta, Record = this.recordType,
            f = Record.prototype.fields, fi = f.items, fl = f.length;
        if (!this.ef) {
            if(s.totalProperty) {
                this.getTotal = this.getJsonAccessor(s.totalProperty);
            }
            if(s.successProperty) {
                this.getSuccess = this.getJsonAccessor(s.successProperty);
            }
            this.getRoot = s.root ? this.getJsonAccessor(s.root) : function(p){return p;};
            if (s.id) {
                var g = this.getJsonAccessor(s.id);
                this.getId = function(rec) {
                    var r = g(rec);
                    return (r === undefined || r === "") ? null : r;
                };
            } else {
                this.getId = function(){return null;};
            }
            this.ef = [];
            for(var i = 0; i < fl; i++){
                f = fi[i];
                var map = (f.mapping !== undefined && f.mapping !== null) ? f.mapping : f.name;
                this.ef[i] = this.getJsonAccessor(map);
            }
        }
        var root = this.getRoot(o), c =root&&root.length?root.length:0, totalRecords = c, success = true;
        if(s.totalProperty){
            var v = parseInt(this.getTotal(o), 10);
            if(!isNaN(v)){
                totalRecords = v;
            }
        }
        if(s.successProperty){
            var v = this.getSuccess(o);
            if(v === false || v === 'false'){
                success = false;
            }
        }
        var records = [];
        for(var i = 0; i < c; i++){
            var n = root[i];
            var values = {};
            var id = this.getId(n);
            for(var j = 0; j < fl; j++){
                f = fi[j];
                var v = this.ef[j](n);
                values[f.name] = f.convert((v !== undefined) ? v : f.defaultValue, n);
            }
            var record = new Record(values, id);
            record.json = n;
            records[i] = record;
        }
        return {
            success : success,
            records : records,
            totalRecords : totalRecords
        };
    },
    getJsonAccessor: function(){
        var re = /[\[\.]/;
        return function(expr) {
            try {
                return(re.test(expr)) ? new Function("obj", "try{return obj." + expr+";}catch(e){ return ''}"):function(obj){return obj[expr];};
            } catch(e){}
            return Ext.emptyFn;
        };
    }()
});
Ext.override(Ext.tree.TreeLoader,{
	/**
	 * 配置TreeNode的图标样式
	 * @type {String}
	 * @property iconCls
	 */
	createNode : function(attr){
        if(this.baseAttrs){
            Ext.applyIf(attr, this.baseAttrs);
        }
        if(this.iconCls){
        	Ext.applyIf(attr,{iconCls:this.iconCls});	
        }
        
        if(this.applyLoader !== false && !attr.loader){
            attr.loader = this;
        }
        if(Ext.isString(attr.uiProvider)){
           attr.uiProvider = this.uiProviders[attr.uiProvider] || eval(attr.uiProvider);
        }
        if(attr.nodeType){
            return new Ext.tree.TreePanel.nodeTypes[attr.nodeType](attr);
        }else{
            return attr.leaf ?
                        new Ext.tree.TreeNode(attr) :
                        new Ext.tree.AsyncTreeNode(attr);
        }
    }
});

(function(){
	var actions = {
		_exeRegxp:/^(?:hide|show|disable|enable)$/,
	    execItemFn:function(exec,args){
	    	var arr = Array.prototype.slice.call(arguments,1);
			Ext.each(arr,function(key){
				if(Ext.isObject(key) && key[exec]){
					key[exec]();
				}else{
					var item = this.get(key);
					if(item) item[exec]();
				}
			},this);
	    },
	    getFnArguments:function(){
	    	var args = arguments.callee.caller.arguments;
	    	if(Ext.isArray(args[0])){
	    		return args[0];
	    	}else{
	    		return Array.prototype.slice.call(args,0)
	    	}
	    },
	    hides:function(args){
	    	var arr = this.getFnArguments();
	    	this.execItemFn.apply(this,['hide'].concat(arr));
	    	return this;
	    },
	    shows:function(){
	    	var arr = this.getFnArguments();
	    	this.execItemFn.apply(this,['show'].concat(arr));
	    	return this;
	    },
	    disables:function(){
	    	var arr = this.getFnArguments();
	    	this.execItemFn.apply(this,['disable'].concat(arr));
	    	return this;
	    },
	    enables:function(){
	    	var arr = this.getFnArguments();
	    	this.execItemFn.apply(this,['enable'].concat(arr));
	    	return this;
	    }
	};
	/**
	 * 对菜单进行扩展，添加insert方法，可以插入任意工具栏选项
	 */
	Ext.apply(Ext.menu.Menu.prototype,actions);
	/**
	 * 对工具栏进行扩展，添加insert方法，可以插入任意工具栏选项
	 */
	Ext.apply(Ext.Toolbar.prototype,actions);
})();
﻿/**
 * @class EasyJF.Ext.Util
 * @single
 * EasyJF实用工具 
 */
Ext.namespace('EasyJF.Ext.Util');
Ext.apply(EasyJF.Ext.Util,{
    NormalClass:{},
    /**
     * 常用作双状态下拉框的内容
     * @type Array
     */
    theStatus : [["启用", 0],["停用", -1]],
    /**
     * 在EditorGridPanel中用来渲染只读列的背景色
     * @type String
     */
    readOnlyGridCellColor:"#F2F2F2",
    /**
     * 在GridPanel中用来renderer勾选（√）
     * @type String
     */
    successTag:"<font color=green>&#8730;</font>",
    /**
     * 在GridPanel中用来renderer叉选（X）
     * @type String
     */
    failureTag:"<font color=red>X</font>",
    /**
     * 在GridPanel中用来renderer超链接。
     * <pre>
     * <code>
{
    id: 'col1',
    header: 'Column1',
    dataIndex: 'col1',
    width: 220,
    renderer:EasyJF.Ext.Util.linkRenderer
}
 	 * </code>
 	 * </pre>
 	 * @param {Object} v 要renderer的值
     */
    linkRenderer : function(v) {
        if (!v)
            return "";
        else
            return String.format("<a style=\"color:blue;font-weight:800;\" title=\"点击后将在新窗口中打开{0}\" href='{0}' target='_blank'>{0}</a>", v);
    },
    /**
     * 在GridPanel中用来renderer 布尔值（是|否）。
     * <pre>
     * <code>
{
    id: 'col1',
    header: 'Column1',
    dataIndex: 'col1',
    width: 220,
    renderer:EasyJF.Ext.Util.booleanRender
}
	 * </code>
	 * </pre>
	 * @param {Object} v 要renderer的值
     */
    booleanRender : function(value, p, record) {
       return value ? "<span style=\"color:green;\">是</span>" : "<span style=\"color:red;\">否</span>";
    },
    
    /**
     * 在GridPanel中用来renderer 日期。
     * <pre>
     * <code>
{
    id: 'col1',
    header: 'Column1',
    dataIndex: 'col1',
    width: 220,
    renderer:EasyJF.Ext.Util.dateRender('Y-m-d G:i:s')
}
	 * </code>
	 * </pre>
	 * @param {String} format renderer的日期格式
     */
    dateRender : function(format) {
        format = format || "Y-m-d G:i";
        return Ext.util.Format.dateRenderer(format);
    },
    
    imgRender : function(v){
        if(!v)
            return "";
        else
            return String.format("<a style=\"color:green;font-weight:800\" title=\"点击后将在新窗口中打开{0}\" href='{0}' target='_blank'>查看</a>",v)
    },
    
    /**
     * 在GridPanel中用来renderer 金额。
     * <pre>
     * <code>
{
    id: 'col1',
    header: 'Column1',
    dataIndex: 'col1',
    width: 220,
    renderer:EasyJF.Ext.Util.moneyRender
}
	 * </code>
	 * </pre>
	 * @param {Number} v renderer的金额
     */
    moneyRender:function(v){
        if(v){
            if(v.toFixed){
            if(v<0)return "<font color=red>"+v.toFixed(2)+"<font>";
            else return v.toFixed(2);
            }
            else return v;
        }
    },
    /**
     * 在GridPanel中用来renderer 对象中的某个属性。
     * <pre>
     * <code>
//例如：col1对应的对象是:{a:{b:1}}
{
    id: 'col1',
    header: 'Column1',
    dataIndex: 'col1',
    width: 220,
    renderer:EasyJF.Ext.Util.objectRender("a.b",EasyJF.Ext.Util.readOnlyGridCellColor)
}
	 * </code>
	 * </pre>
	 * @param {String} p renderer的对象的属性路径，支持用'.'来导航
     * @param {String} backgroundColor renderer的column的背景色
     */
    objectRender : function(p,backgroundColor) {
        return function(v, meta) {
            if(backgroundColor)meta.attr = 'style="background-color:'+backgroundColor+';"';
            var s="";
            try{
                s=v?eval("v." + p) : ""
            }
            catch(e){                
            }
            return s;
        }
    },
    
    /**
     * 在GridPanel中用来renderer 下拉列表对应的对象。Combox对应的对象一般格式：{text:'text',value:'value'}或者{title:'text',value:'value'}
     * <pre>
     * <code>
{
    id: 'col1',
    header: 'Column1',
    dataIndex: 'col1',
    width: 220,
    editor:new MyCombox(),
    renderer:EasyJF.Ext.Util.comboxRender
}
     * </code>
     * </pre>
     * @param {Object} v renderer的对象
     */
    comboxRender:function(v){
        if(v){
            return v.text || v.title || v;  
        }
    },
    
    /**
     * 在GridPanel中用来根据一个二维的字典renderer某一个column的值
     * <pre>
     * <code>
//例子，如果有一个字典对照表
var dict=[["状态1",1],["状态2",2],["状态3",3]]
{
    id: 'col1',
    header: 'Column1',
    dataIndex: 'col1',
    width: 220,
    renderer:EasyJF.Ext.Util.typesRender(dict)
}
	 * </code>
	 * </pre>
	 * @param {Object[][]} types 对应的二维字典
     */
    typesRender:function(types){
        return function(v){
            for(var i=0;i<types.length;i++){
                try{
               		if(types[i][1]===v)return types[i][0];
                }
                catch(e){alert(types)}
            }
            return "";
        }
    },
    
    /**
     * 在EditorGridPanel中用来将某一个column renderer成只读样式
     * <pre>
     * <code>
//例子，如果要将一个时间renderer成只读样式
{
    id: 'col1',
    header: 'Column1',
    dataIndex: 'col1',
    width: 220,
    renderer:EasyJF.Ext.Util.readOnlyRender(EasyJF.Ext.Util.dateRender('Y-m-d'))
}
 	 * </code>
 	 * </pre>
 	 * @param {Object} innerRender 内嵌renderer
     */
    readOnlyRender:function(innerRender){
        return function(v, meta){
        var d=v;
        if(innerRender)d=innerRender(d);
        meta.attr = 'style="background-color:'+EasyJF.Ext.Util.readOnlyGridCellColor+';"';
        return d;
        }
    },
    //private
    operaterTemplate:new Ext.Template("<a href='{2}' theid='{2}' op='{1}' onclick='return false'><font color='blue'>{0}</font></a>"),
    
    /**
     * 在EditorGridPanel中用来将某一个column renderer成可操作列
     * @param {String} cmd 点击该column响应后台的事件。该事件和CrudListPanel或者CurdPanel组合使用，相当于向后台发送了一个ajax请求：
     * {url:curdPanel.baseUrl,params:{'cmd':cmd,id:r.get("id"}}
     * 将当前列对应的id属性得到，并传到后台。
     * 
     * @param {String} title 该列中要显示的操作名称
     * <pre>
     * <code>
//例子，如果有一个data：{id:1,name:'lanyo'},该数据在grid中显示后，要求在每一个用户信息行最后有一个“查看”column，能查看到该行用户的详细信息。
{
    id: 'col1',
    header: 'Name',
    dataIndex: 'name',
    width: 220
},{
	id: 'col1',
    header: 'Operate',
    dataIndex: 'id',
    width: 220,
    renderer:EasyJF.Ext.Util.operaterRender('show',"查看详细")
}
     */
    operaterRender:function(cmd,title){
        return function(v,p,r){
            if(r.get("id"))
            return EasyJF.Ext.Util.operaterTemplate.applyTemplate([title?title:(v?v:""),cmd,r.get("id")]);
        }
    },
    /**
     *  自动关闭当前的提示框。
     *  常用情况：遇到某个状态，需要提示一下，然后可以在下一代码延迟执行该方法，就自动关闭提示。
     *  <pre>
     *  <code>
     *  //if(somestatus binggo){
     *  Ext.Msg.alert("提示信息","某种状态已经发生");
     *  EasyJF.Ext.Util.autoCloseMsg.defer(2000);
     *  }
     *  </code>
     *  </pre>
     */
    autoCloseMsg:function(){
        Ext.Msg.hide();     
    },
    
    /**
     * 简单的使用ajax调用执行一个请求的方法，常用在CURD面板中某一些简单的操作请求。
     * 比如，审核，批量审核，查看等按钮的的handler上。
     * 
     * <pre>
     * <code>
     * 	//示例：比如有个按钮，点击打印当前选中的项
     *  {
     *  	xtype:'button',
     *  	text:'打印当前选中项',
     *  	scope:this,
     *  	handler:EasyJF.Ext.Util.executeUrl(this.baseUrl,{cmd:'printSelect',id:this.getCurrentSelectId()},this.print)
     *  }
     * </code>
     * </pre>
     * 
     * @param {String} url 调用的远端url
     * @param {Object} params POST请求传入的参数
     * @param {Function} fn 
     * 
     * @return {Function} 构造好的请求方法
     * 
     */
    executeUrl : function(url, params,fn) {
            return function() {
                Ext.Ajax.request({
                    waitMsg:"正在执行操作，请稍候...",
                    url : url,
                    method : 'POST',
                    params : params,
                    success : function(response) {
                        var r = Ext.decode(response.responseText);
                        if (!r.success)
                            Ext.Msg.alert("提示",
                                    "操作失败，失败原因为：<br/>"
                                            + (r.errors.msg
                                                    ? r.errors.msg
                                                    : "未知"));
                        else {
                            Ext.Msg.alert("提示",
                                    "操作成功", fn?fn:Ext.emptyFn, this);
                        }
                    },
                    scope : this
                });
            }
    },
    
    /**
     * 使用Ajax方式提交表单的包装方法
     * 
     * <pre>
     * <code>
     * 
EasyJF.Ext.Util.submitForm(this.fp.form,url,function(form,action){
    this.fp.form.clearDirty();
    if(this.store && this.closeSaveWin!==false){
        this.store.reload();
    }
    if(callback)callback();
    this.fireEvent("saveobject",this,form,action);
    this.onSave(form,action);
},this);
     * </code>
     * </pre>
     * 
     * @param {Ext.form.BasicForm} form 要提交的表单对象
     * @param {String} url 表单要提交的url
     * @param {Function} callback 表单提交成功后的回调方法
     * @param {Object} scope callback和failure方法执行的作用域
     * @param {Function} failure 表单提交失败后的回调方法
     * 
     */
    submitForm:function(form,url,callback,scope,failure){
        form.submit({
            url:url,
            waitTitle:"请稍候",
            waitMsg:"正在保存，请稍候",
            success:function(form,action){
                if(callback)callback.call(scope||this,form,action);
        },
        failure : function(form, action) {
                if(failure){
                	failure.call(scope||this,form,action);
                }else {
	                var msg = "";
	                if (action.failureType == Ext.form.Action.SERVER_INVALID) {
	                    if(form.notAlert) return "";// 这个在form中配置的一个开关，表示这个form在服务返回有错误信息的时候不弹出信息。
	                    for (var p in action.result.errors) {
	                        msg += action.result.errors[p] + "  ";
	                    }
	                } else{
	                	msg = "数据录入不合法或不完整！";
	                }
	                Ext.MessageBox.alert("保存失败！", msg);
                }
            },
        scope:scope||this
        });
    },
    
	/**
	 * 得到EditorGridPanel中的数据，并拼成一个对象。常用于主从表单中从表单数据的获得和提交。
	 * 
	 * <pre>
	 * <code>
	 * //示例：现有表格数据为:
	 * //[
	 * //{id:1,name:'c1',key:'k1',status:'1'},
	 * //{id:2,name:'c2',key:'k2',status:'0'},
	 * //{id:3,name:'c3',key:'k3',status:'1'},
	 * //{id:4,name:'c4',key:'',status:'1'},
	 * //]
	 * //使用方法：
	 * var o=EasyJF.Ext.Util.getEditGridData(this.editGrid,'item_','key',function(r){
	 * 		return r.get("status")==='1';
	 * })
	 * console.debug(o);
	 * //返回值：
	 * //o:{item_id:[1,3],item_name:['c1','c3'],item_key:['k1','k3'],item_status:['1','1']}
	 * </code>
	 * </pre>
	 * 
	 * @param {Ext.grid.EditorGridPanel} editGrid 要得到数据的可编辑表格
	 * @param {String} prefix 得到的数据前缀
	 * @param {String} key 确定每一行数据能获得数据的必要字段名称
	 * @param {Function} filter  确定每一行数据能获得数据的过滤方法
	 * 		<ul>
	 * 		<li>传入的值: {Ext.data.Record} r 传入的每一行数据的Record。</li>
	 * 		<li>返回的值: {Boolean} ret 如果为true，则加入表格获得的数据项中，如果为false，则过滤掉。</li>
	 * 		</ul>
	 * 
	 * @return {Object} obj 获得到的表单数据
	 */	
    getEditGridData:function(editGrid,prefix,key,filter){
        function getV(v){
            if(v&&v.value!==undefined)v=v.value;// 根据value属性来得到
            else if(v&& v.id!==undefined)v=v.id;// 根据id属性来得到
            if(v && typeof v=="object" && v.clearTime)v=v.format("Y-m-d");
            return v;       
        }
        var o={};
        var mc=editGrid.getColumnModel().getColumnCount();
        for(var i=0;i<mc;i++){
            var n=editGrid.getColumnModel().getDataIndex(i);
            if(n)o[(prefix?prefix:"")+n]=[];
        }  
        var store=editGrid.store;
        var j=0;
        var numbererField=editGrid.getColumnModel().getColumnById("numberer")?editGrid.getColumnModel().getColumnById("numberer").dataIndex:"";
        for(var i=0;i<store.getCount();i++){
            if(key){// 如果指定了必填项，则要作必填项判断
                var v=store.getAt(i).get(key);
                v=getV(v);
                if(!v)continue;// 如果必填项没有值，则退出
                if(filter && !filter(store.getAt(i))) continue;
                if(typeof v=="object" && !String(v))continue;// 对Object类型进行处理
            }
            for(var n in o){                            
                var f=prefix?n.replace(prefix,""):n;
                if(f==numbererField)o[n][j]=j;// 处理自动排序字段
                else {
                    var v=store.getAt(i).get(f);                
                    v=getV(v);      
                    o[n][j]=(v!==null?v:"");
                }
            }
            j++;
        }       
        return j>0?o:{};
    },
    /**
     * 把表格数据中的某一列数据拼成字符串连接
     * <pre>
     * <code>
     * //示例：现有表格数据为:
	 * //[
	 * //{id:1,name:'c1',key:'k1',status:'1'},
	 * //{id:2,name:'c2',key:'k2',status:'0'},
	 * //{id:3,name:'c3',key:'k3',status:'1'},
	 * //{id:4,name:'c4',key:'',status:'1'},
	 * //]
	 * //使用方法：
     * var str=EasyJF.Ext.Util.getGridDataAsString(this.gridPanel,'key');
     * //str='k1,k2,k3,'
     * var str=EasyJF.Ext.Util.getGridDataAsString(this.gridPanel,'id');
     * //str='1,2,3,4'
     * </code>
     * </pre>
     * @param {Ext.grid.GridPanel} grid 需要得到数据的GridPanel或者EditorGridPanel
     * @param {String} key 需要得到的列名称
     * 
     * @return {String} ret 得到的字符串连接
     */
	getGridDataAsString:function(grid,key){
       var s = [],key=key||"id";
       grid.store.each(function(r){
           s.push(r.get(key))
       });
       return s.join(',');
	},
	/**
	 * 往GridPanel或者EditorGridPanel中添加一行或者多行数据。
	 * <pre>
	 * <code>
	 * //示例：在EditorGrid加载完成后自动往里面加载一条空数据
	 * var emptyObj={id:"",name:"",key:"",status:""},
	 * this.editGrid.on("render",function(c){
	 * 		EasyJF.Ext.Util.appendGridRows(c,this.editStoreMapping,emptyObj,Ext.emptyFn,false);
	 * },this);
	 * </code>
	 * </pre>
	 * 
	 * @param {Ext.grid.GridPanel} grid 需要添加数据的grid
	 * @param {Array} storeMapping 需要添加数据的grid对应的storemapping
	 * @param {Object/Array} rs 需要添加的数据对象或者数据对象数组
	 * @param {Function} dataHandler 在添加完成数据后，需要对这些数据做的一些处理
	 * 		<ul>
	 * 			<li>传入参数 {Object} obj 需要添加的数据</li>
	 *  	</ul>
	 * @param {Boolean} keepLastEmptyRow 
	 * <p>
	 * 是否保持最后一行不变。如果true，那么数据都插入在倒数第二行，如果为false，则插入在最后。为true的情况下使用editorGrid的时候特别有用。
	 * 因为在editorGrid下，经常需要保持最后一行是一个空行，能随时添加数据。
	 * </p>
	 */
    appendGridRows:function(grid,storeMapping,rs,dataHandler,keepLastEmptyRow){
        if(rs.length==undefined)rs=[rs];
        var selectRow=grid.getSelectionModel().getSelectedCell?grid.getSelectionModel().getSelectedCell():null;
        var lastSecondRow=grid.store.getCount()-(keepLastEmptyRow?2:1);
        var appendTo=lastSecondRow;
        if(selectRow)
        appendTo=selectRow[0];
        if(appendTo<-1)appendTo=-1;
        if(appendTo==lastSecondRow+1)appendTo=lastSecondRow;        
        for(var i=0;i<rs.length;i++){
        var r=rs[i];
        var obj=dataHandler(r)
        EasyJF.Ext.Util.addGridRow(grid,storeMapping,obj,appendTo+i);
        }
    },
    /**
	 * 往EditorGridPanel中指定行添加一行数据。
	 * <pre>
	 * <code>
	 * //示例：在当前选中行下一行加载一条空数据
	 * var emptyObj={id:"",name:"",key:"",status:""},
	 * var appendTo=this.grid.store.indexOf(this.grid.getSelectionModel().getSelected())+=1;
	 * EasyJF.Ext.Util.addEditorGridRow(this.grid,this.storeMapping,emptyObj,appendTo);
	 * </code>
	 * </pre>
	 * 
	 * @param {Ext.grid.GridPanel} grid 需要添加数据的grid
	 * @param {Array} storeMapping 需要添加数据的grid对应的storemapping
	 * @param {Object} obj 需要添加的数据对象或者数据对象数组
	 * @param {Integer} appendTo 在哪一行插入，如果没有指定，就放在当前选中行的下一行，如果没有选中任何cell，则放在最后一行，如果指定了，不在当前grid的范围里，则加入到第一行或者最后一行
	 */
    addEditorGridRow:function(grid,storeMapping,obj,appendTo){
        var row=appendTo;
        if(row==undefined){
	        var selModel=grid.getSelectionModel();
	        var record = selModel.getSelectedCell?selModel.getSelectedCell():null;   
	        row=grid.store.getCount()-1;    
	        if(record){
	            row=record[0];
	        }
        }
        var create=Ext.data.Record.create(storeMapping);
        var obj=new create(Ext.apply({},obj||{}));      
        if(grid.stopEditing)
        	grid.stopEditing();
        grid.store.insert(row+1,obj);
        grid.getView().refresh();
    },
    
    /**
     * 从EditorGridPanel中删除当前选中的cell所在的行
     * //示例：删除当前选中cell所在的行，并向后台发送删除请求
EasyJF.Ext.Util.removeEditorGridRow(this.editGrid,function(r){
	EasyJF.Ext.Util.ajaxRequest(this.baseUrl,{cmd:'removeItem',id:r.get('id')},this,function(response){
		var ret=Ext.decode(response.responseText);
		if(ret)
			Ext.Msg.alert("提示信息","删除"+r.get('name')+"成功！");
		else
			EasyJF.Ext.Util.addEditorGridRow(this,grid,this.storeMapping,r.data);
	});
});
	 * 
	 * @param {Ext.grid.EditorGridPanel} grid 要删除数据的EditorGridPanel
	 * @param {Function} callback 数据（前台）删除成功后的回调方法。
	 * 		<ul>
	 * 		<li>传入的值 {Ext.data.Record} r 当前选中的行record
	 * 		</ul>
     * 
     */
    removeEditorGridRow:function(grid,callback){   
        var record = grid.getSelectionModel().getSelectedCell();    
        if(record){
	        var store=grid.store;
	        Ext.MessageBox.confirm("请确认","确定要删除吗？",function(ret){
	            if(ret=="yes"){
	                var r=store.getAt(record[0]);
	                if(callback) callback(r);
	                store.remove(r);
	                grid.getView().refresh();
	                if(store.getCount()>0)grid.getSelectionModel().select(record[0]-1<0?0:record[0]-1,record[1]);
	            }});
        }
        else Ext.MessageBox.alert("提示","请选择要删除的记录!");
    },
    
    /**
     * 重新加载grid的数据，相当于store.removeAll->store.reload
     * 
	 * @param {Ext.grid.GridPanel} grid 要重新加载数据的GridPanel
     * 		
     */
    reloadGrid:function(grid){
        grid.getStore().removeAll();
        grid.getStore().reload();
    },
    
    /**
     * 从EditorGridPanel或GridPanel中删除所有选中数据
     * //示例：删除当前选中的所有数据，并向后台发送删除请求
EasyJF.Ext.Util.removeGridRows(this.grid,function(rs){
	EasyJF.Ext.Util.ajaxRequest(this.baseUrl,{cmd:'removeItems',ids:Ext.pluckRecord(rs,'id').join(',')},this,function(response){
		var ret=Ext.decode(response.responseText);
		if(ret)
			Ext.Msg.alert("提示信息","删除成功！");
	});
});
	 * 
	 * @param {Ext.grid.EditorGridPanel} grid 要删除数据的EditorGridPanel
	 * @param {Function} callback 数据（前台）删除成功后的回调方法。
     *      <ul>
	 * 		<li>传入的值 {Array[Ext.data.Record]} rs 当前选中的record数组
	 * 		</ul>
     */
    removeGridRows:function(grid,callback){  
        if(!grid.getSelectionModel().getSelections && grid.getSelectionModel().getSelectedCell ){//
            EasyJF.Ext.Util.removeEditorGridRow(grid,callback);
        }
        else{
	        var rs = grid.getSelectionModel().getSelections();  
	        if(rs&&rs.length>0){
		        var store=grid.store;
		        Ext.MessageBox.confirm("请确认","确定要删除吗？",function(ret){
		            if(ret=="yes"){
		                if(callback) callback(rs);
		                for(var i=0;i<rs.length;i++)
		                	store.remove(rs[i]); 
		                grid.getView().refresh();
		            }});
	        }
        }
    },
    
    /**
     * 动态的将GridPanel或者EditorGridPanel的指定列隐藏或者显示
     * 
     * <pre>
     * <code>
     * //示例:
{xtype:'button',text:'显示简单列',scope:this,handler:function(){
    var cm=this.grid.getColumnModel();
 	EasyJF.Ext.Util.setGridColumnHidden(['name','sn','status'],false,this.gridPanel);
	EasyJF.Ext.Util.setGridColumnHidden(['intro','borndate','othersProperty'],true,this.gridPanel);
}}
     * </code>
     * </pre>
     * 
     * @param {Array|String} fields 要隐藏或者显示的column对应的dataIndex 名称或者数组
     * @param {Boolean} hidden 是显示还是隐藏。true为隐藏，false为显示
     * @param {Ext.grid.GridPanel} grid 操作的grid对象
     */
    setGridColumnHidden:function(fields,hidden,grid){
        if(grid!=null && fields!=null && fields.length){
	        for(var i=0;i<fields.length;i++){
		        var index = grid.getColumnModel().findColumnIndex(fields[i]);
		        if(index>=0){
		           grid.getColumnModel().config[index].hideable=!hidden;
		           grid.getColumnModel().setHidden(index, hidden);
		        }
	        }
        }
    },
    
    /**
     * 高级的布局工具。<br/>
     * 可以用该工具方法方便的实现平均分布的表单布局。<br/>
     * 
     * <pre>
     * <code>
//示例1：在一行里面平均分布4个textfield
{
	xtype:"form",
	frame:true,
	items:[{
		xtype:"fieldset",
		autoHeight:true,
		title:'demo',
		items:
			EasyJF.Ext.Util.buildColumnForm(
				true,"textfield",
				{name:'textfield1',fieldLabel:'textfield1'},
				{name:'textfield2',fieldLabel:'textfield2'},
				{name:'textfield3',fieldLabel:'textfield3'},
				{name:'textfield4',fieldLabel:'textfield4'}
			)
	}]
}
//示例2:在formPanel中的一个fieldSet中横向平均布局六个textfield，保证每一行平均布局三个textfield，并设置textfield的labelWidth为120。
{
	xtype:"form",
	frame:true,
	items:[{
		xtype:"fieldset",
		autoHeight:true,
		title:'demo',
		fieldWidth:120,
		items:
			EasyJF.Ext.Util.buildColumnForm(
				3,"textfield",
				{name:'textfield1',fieldLabel:'textfield1'},
				{name:'textfield2',fieldLabel:'textfield2'},
				{name:'textfield3',fieldLabel:'textfield3'},
				{name:'textfield4',fieldLabel:'textfield4'},
				{name:'textfield5',fieldLabel:'textfield5'},
				{name:'textfield6',fieldLabel:'textfield6'}
			)
	}]
}
//示例3:在一行里面平均分布4个textfield，默认labelWidth为120,并设置第3个textfield的labelWidth为200。
{
	xtype:"form",
	frame:true,
	items:[{
		xtype:"fieldset",
		autoHeight:true,
		title:'demo',
		labelWidth:120,
		items:
			EasyJF.Ext.Util.buildColumnForm(
				true,"textfield",
				{name:'textfield1',fieldLabel:'textfield1'},
				{name:'textfield2',fieldLabel:'textfield2'},
				{name:'textfield3',fieldLabel:'textfield3',panelCfg:{labelWidth:200}},
				{name:'textfield4',fieldLabel:'textfield4'}
			)
	}]
}
     * </code>
     * </pre>
     * 
     * @param {Boolean|Integer} auto 
     * 			如果该参数为Boolean，则true表示自动平均将组件布局到一行。<br/>
     * 			如果该参数为Integer，如果1<auto<50，表示一行平均分布的组件个数。如果auto超过50，表示将所有组件布局到一列，并且固定每个组件的width为auto。
     * @param {Array} arg
     * 			需要进行布局的组件。<br/>
     * 			如果该参数的第一个值是一个String，则表示布局组件的默认xtype。<br/>
     * 			所有的布局组件可以设置一个panelCfg对象，该对象里面可以设置容器控制样式，比如labelWidth等。
     */
    buildColumnForm : function(auto,arg/*,arg..*/){
		var cw,defaultType='textfield',args = Array.prototype.slice.call(arguments,0);
		if(Ext.isBoolean(auto) || Ext.isNumber(auto)){
			args.shift();
			if(Ext.isBoolean(auto) && auto){
				var arr = args[0] || args[1];
				if(!Ext.isArray(arr)){
					arr = args;
				}
				cw = (1/arr.length).toFixed(5);
			}else if(Ext.isNumber(auto)){
				if(auto>1){
					if(auto<50){
						cw = (1/auto).toFixed(5);
					}else{
						cw = auto;
					}
				}else{
					cw = auto;
				}
			}else{
				cw = .5;	
			}
		}else{
			cw = .5;
		}
		if(Ext.isString(args[0])){
			defaultType = args.shift();
		}
		if(Ext.isArray(args[0])){
			args = args.shift();
		}
		
		
		var config = {
			items : [],
			anchor:"100%",
			layout : 'column',
			xtype :'container'
		};
		Ext.each(args,function(field){
			var item = {
				items : field,
				anchor:"100%",
				layout : 'form',
				border : false,
				xtype :'container',
				defaultType : defaultType,
				defaults: {anchor:'-20'}
			};
			if(cw<50){
				item.columnWidth = cw;
			}else{
				item.width = cw;
			}
			if(field.panelCfg){
				Ext.apply(item,field.panelCfg);
				delete field.panelCfg;
			}
			config.items.push(item);
		});
		return config;
	},
	oneColumnPanelBuild:function(){
		var agrugments = arguments;
    	EasyJF.Ext.Util.buildColumnForm.apply(true,agrugments);
    },
  	/**
  	 * 将一组组件横向布局在一行中,
  	 * 
  	 * <pre>
  	 * <code>
//示例:
//在formPanel中的fieldSet中的一行中横向布局三个textfield，让他们的布局比例为1:1:2，并设置textfield的labelWidth为120。
{
	xtype:"form",
	frame:true,
	items:[{
		xtype:"fieldset",
		autoHeight:true,
		title:'demo',
		items:
			EasyJF.Ext.Util.columnPanelBuild(
				{FC:{labelWidth:120}},
				{columnWidth:.25,items:{xtype:'textfield',name:'textfield1',fieldLabel:'textfield1'}},
				{columnWidth:.25,items:{xtype:'textfield',name:'textfield2',fieldLabel:'textfield2'}},
				{columnWidth:.5,items:{xtype:'textfield',name:'textfield3',fieldLabel:'textfield3'}},
			),
	}]
}
  	 * </code>
  	 * </pre>
  	 * 
  	 * @param {Array} arguments 
  	 * 		要在一行中排列的组件数组。组件必须放在一个{columnWidth:yourdefinedcolumnwidth,items:yourdefinedcomponent}的Panel构造对象中。
  	 *		该对象的columnWidth规定了该组件在该行中所占用的总体比例。
  	 *		如果需要统一设定所有排列组件的容器属性（比如textfield的labelWidth，或者anchor属性等），需要在一个参数中传入一个
  	 *		{FC:{your component prop setting}}的对象。参考上面的例子。
  	 */
    columnPanelBuild:function(){
        var args = Array.prototype.slice.call(arguments,0);
        var formConfig = {};
        if(args[0]){
            if(args[0].FC||args[0].formConfig){
                Ext.apply(formConfig,(args[0].FC||args[0].formConfig));
                args.shift();
            }
        }
        var obj={layout:'column',anchor:"100%",defaults:{border:false},items:[],xtype:"panel",border:false,bodyBorder:false};
        var defaultColumn=(1/args.length).toFixed(2);
        for(var i=0;i<args.length;i++){
            var o=args[i];
            var c={columnWidth:o.columnWidth||defaultColumn,
               layout:'form',
               defaultType:o.defaultType||"textfield",
               defaults:o.defaults||{anchor:"-20"},
               items:o.items
               };
         obj.items[i]=Ext.apply(c,formConfig);
        }
      return obj;
    },
	 /**
	 * EasyJF.Ext.Util.twoColumnPanelBuild方法的简写
	 */
    columnBuild : function(){
    	EasyJF.Ext.Util.twoColumnPanelBuild.apply(this,arguments);
    },
    /**
  	 * 将一组组件横向平均布局在一行中,
  	 * 
  	 * <pre>
  	 * <code>
  	 * //示例:
  	 * //在formPanel中的一个fieldSet中横向平均布局六个textfield，保证每一行平均布局三个textfield，并设置textfield的labelWidth为120。
{
	xtype:"form",
	frame:true,
	items:[{
		xtype:"fieldset",
		autoHeight:true,
		title:'demo',
		items:
			EasyJF.Ext.Util.columnPanelBuilde(3,
				{FC:{labelWidth:120}},
				{xtype:'textfield',name:'textfield1',fieldLabel:'textfield1'},
				{xtype:'textfield',name:'textfield2',fieldLabel:'textfield2'},
				{xtype:'textfield',name:'textfield3',fieldLabel:'textfield3'},
				{xtype:'textfield',name:'textfield4',fieldLabel:'textfield4'},
				{xtype:'textfield',name:'textfield5',fieldLabel:'textfield5'},
				{xtype:'textfield',name:'textfield6',fieldLabel:'textfield6'},
			),
	}]
}
  	 * </code>
  	 * </pre>
  	 * 
  	 * @param {Object[]} 要在一行中排列的组件数组。
  	 * <p>
  	 *		需要排列的组件只需要按照顺序加入就行，该方法能按照指定的格式平均排列，超过一行的，多余的组件能继续正确排列在下一行。
  	 *		如果需要指定一行中平均排列多少个组件，需要在一个参数中指定一行排列的数量。
  	 *		如果需要统一设定所有排列组件的容器属性（比如textfield的labelWidth，或者anchor属性等），需要在第二个参数中传入一个
  	 *		{FC:{your component prop setting}}的对象。参考上面的例子。
  	 * </p>
  	 */
    twoColumnPanelBuild:function(){
        var args = Array.prototype.slice.call(arguments,0);
        var formConfig = {};
        var obj={layout:'column',anchor:"100%",defaults:{border:false},items:[],xtype:"panel",border:false,bodyBorder:false};
        var max=2;
        if(typeof args[0]=="number"){
            max=args[0];
            args.shift();
        }
        if(args[0]){
            if(args[0].FC||args[0].formConfig){
                Ext.apply(formConfig,(args[0].FC||args[0].formConfig));
                args.shift();
            }
        }
        var cs=[];
        for(var i=0;i<max;i++)
                cs[i]=Ext.apply({
                columnWidth:1/max,
                layout:'form',
                defaultType:"textfield",
                defaults:{anchor:"-20"},
                items:[]
         },formConfig);
         for(var i=0;i<args.length;){
            for(var j=0;j<max;j++,i++){
                    cs[j].items[cs[j].items.length]=(i<args.length?args[i]:{xtype:"panel",border:false});   
            }
        }
        obj.items=cs;
        return obj;
    },

    TRANS_ID : 0,
    /**
     * 动态的给HTML加载script。
     * 相当于动态的在onReady所在的主页面中加入&lt;script&gt;标签
     * 
     * <pre>
     * <code>
//例子:
Ext.onReady(function() {
	EasyJF.Ext.Util.load("/abc/abc.js");
});
//相当于在页面中加入了&lt;script type="text/javascript" src='/abc/abc.js'&gt;&lt;/script&gt;
     * </code>
     * </pre>
     * 
     * @param {String} appName 要加载的js的名称（路径）
     */
    load : function(appName) {
        var transId = ++EasyJF.Ext.Util.TRANS_ID;
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        script.setAttribute("src", appName);
        script.setAttribute("type", "text/javascript");
        script.setAttribute("id","lanyoScript_"+EasyJF.Ext.Util.TRANS_ID);
        head.appendChild(script);
    },
    /**
     * 从指定的url加载数组或PageResult类型的JSON对象，并自动存放到本地缓存中
     * 
     * @param {String}
     *            varName 缓存明称
     * @param {String}
     *            url JSON数据url
     * @param {Function}
     *            callback 可选参数，回调函数
     * @param {Boolean}
     *            shareCache 可选参数，是否共享缓存
     * @param {Object}
     *            collectionType 可选参数，缓存类型，默认为MixedCollection
     */
    loadJSON2Collection : function(varName,url, callback,shareCache,collectionType) {
         Ext.Ajax.request({
                url : url,
                success : function(req) {
                    try{
                        var ret = Ext.decode(req.responseText);
                        var collection =shareCache||eval("new "+(collectionType||"Ext.util.MixedCollection")+"()");
                        if(Ext.type(ret)=='array'){
                            collection.addAll(ret);
                            EasyJF.Ext.CachedRemoteObject.DATAS[varName]=collection;
                        }
                        else if(Ext.type(ret)=='object' && Ext.type(ret.result)=='array'){
                            collection.addAll(ret.result);
                            EasyJF.Ext.CachedRemoteObject.DATAS[varName]=collection;
                        }
                    }catch(e){}
                    if (callback)callback();    
                },
                scope : this
            });
    },
    
    /**
     * 从script文件中加载Json对象。一般用于在演示数据或者静态js文件中加载数据。
     * <pre>
     * <code>
//例子：如果有json文件内容如下：
var myData=[{id:1,name:'lanyo',status:1}];
var myData2=[{id:2,name:'lanyo2',status:0}];
//该文件保存再/webapps/jsdata/my.js
//执行：
Ext.onReady(function() {
	EasyJF.Ext.Util.loadJSONObject('','/jsdata/my.js',function(){console.debug(myData)});
});
//结果：
//myData=[{id:1,name:'lanyo',status:1}]
     * </code>
     * </pre>
     * 
     * @param {String} varName 如果指定了varName，相当于执行了var varname=js的内容。在这种情况下，请求的js文件就只能直接返回一个对象。
     * @param {String} script 指定加载js的路径
     * @param {Function} callback 在加载完数据后的回调方法。
     * 
     */
    loadJSONObject:function(varName,script,callback){
        Ext.Ajax.request({url:script,success:function(req){
            var ret=Ext.decode(req.responseText);
            if(varName)eval("("+varName+"=ret)");
            if(callback)callback();                      
       },scope:this});         
    },
    
   	/**
   	 * 动态加载并执行js，并可以给该js文件的内容指定一个全局缓存名称（该名称必须等于js中指定的类名称），防止重复加载。用来延迟加载每一个应用模块独立的js文件。
   	 * （详细的例子可以查看RIA平台自身的在OPOA模式下加载模块的方法）
   	 * 
   	 * @param {String} className 
   	 * 						加载并执行的js中的类的名称，作为缓存名称
   	 * @param {String} script
   	 * 						加载的js的路径
   	 * @param {Function} callback
   	 * 						在加载并执行了js后，执行的回调方法
   	 * <ul>传入参数：
   	 * 		<li>{Object} obj js文件中的对象</li>
   	 * </ul>
   	 * @param  {Object} scope
   	 * 						回调方法执行的scope
   	 * @param {Boolean} async
   	 * 						在加载js的时候，是否采用同步加载。true使用同步加载，false使用异步加载。
   	 */
    loadScript:function(className,script,callback,scope,async){
        if(!window[className]){
            Ext.Ajax.request({url:script,success:function(req){
                window.eval(req.responseText);
                if(callback){
                    callback.call(scope||window,window[className]);                      
                }
           },scope:this,async:async});
       }
       else if(callback) callback.call(scope||window,window[className]);       
    },
    /**
     * 从配置的路径里面加载对应类
     * <pre>
     * <code>
//示例。
//假设自定义的用户管理模块类MyUserManagePanel定义在/webapps/scripts/MyUserManagePanel.js下（注意类名和js文件名的对应关系）
//调用方法：
EasyJF.Ext.Util.loadClass({
	script:'/scripts/MyUserManagePanel.js',
	className:'MyUserManagePanel',
	scope:this,
	callback:function(obj){
		console.debug(obj);	
	}
},async);
     * </code>
     * </pre>
     * 
     * @param {Object} cfg 可选配置对象。该对象详细配置如下：
     * 	<ul>
     * 		<li>{String} script 加载类的js文件路径。</li>
     * 		<li>{String} className 加载并执行的js中的类的名称，如果没有指定className，则直接使用js文件名称做为类的缓存名称</li>
     * 		<li>{Function} callback 在加载并执行了js后，执行的回调方法
   	 * 			<ul>传入参数：
   	 * 				<li>{Object} obj js文件中的对象</li>
   	 * 			</ul>
   	 * 		</li>
   	 * 		<li>{Object} scope 回调方法执行的scope</li>
   	 * 		<li>{Boolean} async 在加载js的时候，是否采用同步加载。true使用同步加载，false使用异步加载。</li>
     * 	</ul>
     * @param {Boolean} async 在加载js的时候，是否采用同步加载。true使用同步加载，false使用异步加载。
     * 
     */
    loadClass:function(cfg,async){
		cfg = cfg || {};
		if(!Ext.isBoolean(cfg) && Ext.isBoolean(async)){
			cfg.async=async;
		}
		if(cfg.script){
			if(Ext.isEmpty(cfg.className)){
				var scriptUrl = cfg.script;
				var ji = scriptUrl.indexOf('.js');
				if(ji>=0){
					var  scriptClassSub = scriptUrl.substring(0,ji);
					var  lastIndex = scriptClassSub.lastIndexOf('/');
					if(lastIndex>=0){
						cfg.className = scriptUrl.substring(lastIndex+1,ji);
					}
				}
			}
			Ejf.Util.loadScript(cfg.className,cfg.script,cfg.callback,cfg.scope,cfg.async);
		}
	},
	
	/**
	 * 最简单的加载并执行script
	 * 
	 * @param {String} script 要加载并执行的script路径
	 * @param {Boolean} async 在加载js的时候，是否采用同步加载。true使用同步加载，false使用异步加载。
	 */
    asLoadScript : function(script,async) {
        Ext.Ajax.request({
                url : script,
                async : async,
                success : function(req) {
                    eval(req.responseText);
                },
                scope : this
            });
    },
    
	 /**
     * 在页面打开的时候动态加载脚本程序
     * 相当于直接在页面插入&lt;script src='script'&gt;&lt;/script&gt;标签段
     * 
     * @param {String} script 脚本名称
     */
    loadJS:function(script){
        document.write("<script src='"+script+"'></script>");
    },
    
    /**
     * 
     * 在任何代码段中，调用一个CrudPanel或者CrudListPanel对应模块的添加页面。<br/>
     * 在smartCombo下面的添加按钮，或者任何需要在一个模块中及时添加另一个模块的对象时使用的方法。<br/>
     * 
     * <pre>
     * <code>
//示例，在添加员工的面板中选择部门的时候，可以点击部门后面的【添加】按钮，及时添加部门。
Lanyo_Ajax.script="/";
EasyJF.Ext.Util.columnPanelBuild(
	{columnWidth:.5,items:EasyJF.Ext.Util.buildRemoteCombox(
		"department",
		"部门",
		"department.ejf?cmd=loadDeptTree",
		["id","title"],
		"title",
		"id",
		false)},
	{columnWidth:.5,items:{xtype:"panel",items:{xtype:"button",text:"添加部门",scope:this,handler:this.addDepartment}}}
);
this.addDepartment=function(){
	EasyJF.Ext.Util.addObject(
		"DepartmentManagePanel",
		function(){
			this.fp.findSomeThing("department").reload();
		},
		"script/DepartmentManagePanel.js"
	);
}
     * </code>
     * </pre>
     * 
     * @param {String} crudClass 需要调用添加方法的CrudPanel对应的ClassName
     * @param {Function} callback 在添加指定对象成功后调用的回调方法
     * @param {String} script 需要调用添加方法的CrudPanel对应的js文件路径,该文件路径的全路径是Lanyo_Ajax.script+script
     * @param {String} otherScript 需要调用添加方法的CrudPanel对应的js文件需要关联引入的其他js。这些js文件也可以延迟加载。如果有多个js文件需要引入，在js文件路径之间用','隔开
     * @param {Function} winReadyAction 在添加窗口加载完成后，需要做的一些额外的功能 
     * 		<ul>
     * 			传入的参数:
     * 			<li>{Window} win 打开的添加窗口</li>
     * 			<li>{CrudPanel} service 需要调用添加方法的CrudPanel的实例</li>
     * 		</ul>
     * 
     */
    addObject:function(crudClass,callback,script,otherScripts,winReadyAction){
        if(this.NormalClass[crudClass]){
            var clz=this.NormalClass[crudClass];
            var o=new clz();
            o.createObject(callback,winReadyAction);
        }
        else {// 从脚本中加载
            var loadSuccess=function(req){
                eval(req.responseText);                 
                eval("this.NormalClass."+crudClass+"="+crudClass);
                var clz=this.NormalClass[crudClass];
                var o=new clz();
                o.createObject(callback,winReadyAction);                
            };
            if(otherScripts){
                var s=otherScripts.split(";");
                var total=s.length,ld=0;
                for(var i=0;i<s.length;i++){
                    Ext.Ajax.request({url:s[i],success:function(req){
                        eval(req.responseText);
                        ld++;
                        if(ld>=total){
                            Ext.Ajax.request({url:Lanyo_Ajax.script+script,success:loadSuccess,scope:this});
                        }
                    },scope:this});
                    }
            }
            else {
            Ext.Ajax.request({url:Lanyo_Ajax.script+script,success:loadSuccess,scope:this});
            }
        }
    },
    listObject:function(crudClass,callback,script,otherScripts){
        if(this.NormalClass[crudClass]){
            var clz=this.NormalClass[crudClass];
            var o=new clz();
            if(o.list && (typeof o.list=="function"))o=o.list();
            if(callback)callback(o);
        }
        else {// 从脚本中加载
            if(otherScripts){
                var s=otherScripts.split(";");
                for(var i=0;i<s.length;i++){
                    Ext.Ajax.request({url:s[i],success:function(req){
                        eval(req.responseText);     
                    }});
                    }
            }   
            Ext.Ajax.request({url:"extApp.ejf?cmd=loadScript&script="+script,success:function(req){
                eval(req.responseText);                 
                eval("this.NormalClass."+crudClass+"="+crudClass);
                var clz=this.NormalClass[crudClass];
                var o=new clz();
                if(o.list && (typeof o.list=="function"))o=o.list();
                if(callback)callback(o);
            },scope:this});     
        }
    },
    /**
     * 在任何代码段中，调用一个CrudPanel或者CrudListPanel对应模块的修改页面来修改一个对象。
     * 
     * <pre>
     * <code>
//示例，在添加员工的面板中选择部门的时候，可以点击部门后面的【修改】按钮，及时修改选中的部门。
Lanyo_Ajax.script="/";
EasyJF.Ext.Util.columnPanelBuild(
	{columnWidth:.5,items:EasyJF.Ext.Util.buildRemoteCombox(
		"department",
		"部门",
		"department.ejf?cmd=loadDeptTree",
		["id","title"],
		"title",
		"id",
		false)},
	{columnWidth:.5,items:{xtype:"panel",items:{xtype:"button",text:"修改部门",scope:this,handler:this.updateDepartment}}}
);
this.updateDepartment=function(){
	var deptId=this.fp.findSomeThing("department").getValue();
	if(!deptId)
		Ext.Msg.alert('提示信息','请先选择修改的部门');
		return;
	EasyJF.Ext.Util.updateObject(
		"DepartmentManagePanel",
		function(){
			this.fp.findSomeThing("department").reload();
		},
		"script/DepartmentManagePanel.js",
		"",
		deptId
	);
}
     * </code>
     * </pre>
     * 
     * @param {String} crudClass 需要调用修改方法的CrudPanel对应的ClassName
     * @param {Function} callback 在修改指定对象成功后调用的回调方法
     * @param {String} script 需要调用修改方法的CrudPanel对应的js文件路径,该文件路径的全路径是Lanyo_Ajax.script+script
     * @param {String} otherScript 需要调用修改方法的CrudPanel对应的js文件需要关联引入的其他js。这些js文件也可以延迟加载。如果有多个js文件需要引入，在js文件路径之间用','隔开
     * @param {Object} id 需要传入编辑的对象的id
     * @param {Function} winReadyAction 在修改窗口加载完成后，需要做的一些额外的功能 
     * 		<ul>
     * 			传入的参数:
     * 			<li>{Window} win 打开的修改窗口</li>
     * 			<li>{CrudPanel} service 需要调用修改方法的CrudPanel的实例</li>
     * 		</ul>
     * 
     */
    editObject:function(crudClass,callback,script,otherScripts,id,winReadyAction){
        if(this.NormalClass[crudClass]){
            var clz=this.NormalClass[crudClass];
            var o=new clz();
            o.editObject(id,callback,winReadyAction);
        }
        else {// 从脚本中加载
            if(otherScripts){
                var s=otherScripts.split(";");
                for(var i=0;i<s.length;i++){
                    Ext.Ajax.request({url:s[i],success:function(req){
                        eval(req.responseText);     
                    }});
                    }
            }   
            Ext.Ajax.request({url:Lanyo_Ajax.script+script,success:function(req){
                eval(req.responseText);                 
                eval("this.NormalClass."+crudClass+"="+crudClass);
                var clz=this.NormalClass[crudClass];
                var o=new clz();
                o.editObject(id,callback,winReadyAction);
            },scope:this});     
        }
    },
    
    
    /**
     * 在任何代码段中，调用一个CrudPanel或者CrudListPanel对应模块的查看页面来查看一个对象的详情。
     * 
     * <pre>
     * <code>
//示例，在添加员工的面板中选择部门的时候，可以点击部门后面的【查看】按钮，及时查看选中的部门的详细信息。
Lanyo_Ajax.script="/";
EasyJF.Ext.Util.columnPanelBuild(
	{columnWidth:.5,items:EasyJF.Ext.Util.buildRemoteCombox(
		"department",
		"部门",
		"department.ejf?cmd=loadDeptTree",
		["id","title"],
		"title",
		"id",
		false)},
	{columnWidth:.5,items:{xtype:"panel",items:{xtype:"button",text:"查看部门",scope:this,handler:this.viewDepartment}}}
);
this.viewDepartment=function(){
	var deptId=this.fp.findSomeThing("department").getValue();
	if(!deptId)
		Ext.Msg.alert('提示信息','请先选择部门');
		return;
	EasyJF.Ext.Util.viewObject(
		"DepartmentManagePanel",
		Ext.emptyFn,
		"script/DepartmentManagePanel.js",
		"",
		deptId
	);
}
     * </code>
     * </pre>
     * 
     * @param {String} crudClass 需要调用查看方法的CrudPanel对应的ClassName
     * @param {Function} callback 在查看页面点击确定的时候调用的回调方法
     * @param {String} script 需要调用查看方法的CrudPanel对应的js文件路径,该文件路径的全路径是Lanyo_Ajax.script+script
     * @param {String} otherScript 需要调用查看方法的CrudPanel对应的js文件需要关联引入的其他js。这些js文件也可以延迟加载。如果有多个js文件需要引入，在js文件路径之间用','隔开
     * @param {Object} id 需要传入查看的对象的id
     * 
     */
    viewObject:function(crudClass,callback,script,otherScripts,id){
        if(this.NormalClass[crudClass]){
            var clz=this.NormalClass[crudClass];
            var o=new clz();
            o.viewObject(id,callback);
        }
        else {// 从脚本中加载
            if(otherScripts){
                var s=otherScripts.split(";");
                for(var i=0;i<s.length;i++){
                    Ext.Ajax.request({url:s[i],success:function(req){
                        eval(req.responseText);     
                    }});
                    }
            }   
            Ext.Ajax.request({url:Lanyo_Ajax.script+script,success:function(req){
                eval(req.responseText);                 
                eval("this.NormalClass."+crudClass+"="+crudClass);
                var clz=this.NormalClass[crudClass];
                var o=new clz();
                o.viewObject(id,callback);
            },scope:this});     
        }
    },
    
    /**
     * 在任何代码段中，调用一个CrudPanel或者CrudListPanel对应模块的删除功能来删除一个指定对象。
     * 
     * <pre>
     * <code>
//示例，在添加员工的面板中选择部门的时候，可以点击部门后面的【删除】按钮，及时删除选中的部门。
Lanyo_Ajax.script="/";
EasyJF.Ext.Util.columnPanelBuild(
	{columnWidth:.5,items:EasyJF.Ext.Util.buildRemoteCombox(
		"department",
		"部门",
		"department.ejf?cmd=loadDeptTree",
		["id","title"],
		"title",
		"id",
		false)},
	{columnWidth:.5,items:{xtype:"panel",items:{xtype:"button",text:"删除部门",scope:this,handler:this.removeDepartment}}}
);
this.removeDepartment=function(){
	var deptId=this.fp.findSomeThing("department").getValue();
	if(!deptId)
		Ext.Msg.alert('提示信息','请先选择部门');
		return;
	EasyJF.Ext.Util.removeObject(
		"DepartmentManagePanel",
		function(){
			this.fp.findSomeThing("department").setValue("");
		},
		"script/DepartmentManagePanel.js",
		"",
		deptId
	);
}
     * </code>
     * </pre>
     * 
     * @param {String} crudClass 需要调用删除方法的CrudPanel对应的ClassName
     * @param {Function} callback 在删除完成的时候调用的回调方法
     * @param {String} script 需要调用删除方法的CrudPanel对应的js文件路径,该文件路径的全路径是Lanyo_Ajax.script+script
     * @param {String} otherScript 需要调用删除方法的CrudPanel对应的js文件需要关联引入的其他js。这些js文件也可以延迟加载。如果有多个js文件需要引入，在js文件路径之间用','隔开
     * @param {Object} id 需要传入删除的对象id
     * 
     */
    removeObject:function(crudClass,callback,script,otherScripts,id){
        if(this.NormalClass[crudClass]){
            var clz=this.NormalClass[crudClass];
            var o=new clz();
            o.removeObject(id,callback);
        }
        else {// 从脚本中加载
            if(otherScripts){
                var s=otherScripts.split(";");
                for(var i=0;i<s.length;i++){
                    Ext.Ajax.request({url:s[i],success:function(req){
                        eval(req.responseText);     
                    }});
                    }
            }   
            Ext.Ajax.request({url:Lanyo_Ajax.script+script,success:function(req){
                eval(req.responseText);                 
                eval("this.NormalClass."+crudClass+"="+crudClass);
                var clz=this.NormalClass[crudClass];
                var o=new clz();
                o.removeObject(id,callback);
            },scope:this});     
        }
    },
    
    /**
     * 根据一组静态的数据来创建一个下拉列表的简单方法。
     * 
     * <pre>
     * <code>
//例子，创建一个包括三个状态的下拉选择框
var statusData=[['状态1',1],['状态2',2],['状态3',3]];
//...
items:[EasyJF.Ext.Util.buildCombox('mycombo','自定义状态',statusData,1,true)]
     * </code>
     * </pre>
     * 
     * @param {String|Object} name 创建的下来列表组件名称
     * 如果第一个参数为Object {} 如 ：
     * buildCombox({
     * 		 name : "comboName",
     *       hiddenName : "comboName",
     *       fieldLabel : "comboLabel",
     *       value:"defaultValue",
     *       allowBlank:true,
     *       data:comboData
     * })
     * 也可以设置对应的属性。
     * 
     * @param {String} fieldLabel 组件表单名称
     * @param {Array} data 下拉列表的数据，是一个二维数组，其中的每一个数组格式为[String,Object]，其中String是对应的下拉列表显示名称，Object是选中的值。
     * @param {Mixed} defaultValue 默认的选中值
     * @param {Boolean} allowBlank 是否允许为空
     * 
     */
    buildCombox:function(name,fieldLabel,data,defaultValue,allowBlank){
    		var cfg = {}
			if(Ext.isObject(name)){
				cfg = name;
				data = cfg['data'];
				delete cfg['data'];
			}else if(Ext.isArray(name)){
				data = name ;
				name = null ;
			}else{
				cfg = {
					name : name,
                	hiddenName : name,
                	fieldLabel : fieldLabel,
                	value:defaultValue,
                	allowBlank:allowBlank
				}
			}
	    	var comboCfg = Ext.apply({
	            xtype : "combo",
	            displayField : "title",
	            valueField : "value",
	            store : new Ext.data.SimpleStore({
	                fields : ['title', 'value'],
	                data :  data
	            }),
	            editable : false,
	            mode : 'local',
	            triggerAction : 'all',
	            emptyText : '请选择...'
	        },cfg);
        return 	comboCfg;
    },
    
    /**
     * 根据一个url远程请求后台数据来创建一个动态的下拉列表的简单方法。
     * 
     * <pre>
     * <code>
//例子，创建一个部门的下拉选择框
items:[EasyJF.Ext.Util.buildRemoteCombox(
		"department",
		"部门",
		"department.ejf?cmd=loadDeptList",
		["id","title"],
		"title",
		"id",
		false)]
     * </code>
     * </pre>
     * 
     * @param {String|Object} n 创建的下拉列表组件名称
     * 如果第一个参数为Object {} 如 ：
     * buildCombox({
     * 		 fields : "comboName",
     *       url|dataUrl : "comboName"
     * })
     * 也可以设置对应的属性。
     * 
     * @param {String} fl 组件表单名称
     * @param {String} url 下拉列表异步请求数据的路径
     * @param {MixedCollection} fs A MixedCollection containing the defined Fields for the Records stored in this Store. Read-only.
     * @param {String} df 在下拉列表中绑定的需要显示的字段项。
     * @param {String} vf 在下拉列表中绑定的作为选择值的字段项。
     * @param {Boolean} ab 是否允许为空
     * @param {String} lsv 本地缓存的缓存名称。如果设置了该值。一旦该下拉列表加载过一次后，其值就会在前端缓存下来，第二次就不需要重新去请求数据。
     * 
     */
    buildRemoteCombox:function(name,fl,url,fs,df,vf,ab,lsv){
        var comboConfig = {
	         xtype:"smartcombo",
	         lazyRender:true,
	         triggerAction:"all",
	         typeAhead: true,
	         editable:false
       };
       if(arguments.length==1 && Ext.isObject(name)){
       		fields = name.fields;
       		url = name.url || name.dataUrl;
       		Ext.del(name,'fields','url','dataUrl');
       		Ext.apply(comboConfig,name);
       }else{
       	 	Ext.apply(comboConfig,{
       	 		 name:name,
			     hiddenName:name,
			     allowBlank:ab,
			     fieldLabel:fl,
			     displayField:df?df:"title",
			     valueField:vf?vf:"id"
       	 	});
       }
        var storeConfig = {
            id:"id",
            url:url,        
            root:"result",
            totalProperty:"rowCount",
            remoteSort:true,    
            baseParams:{pageSize:"-1"}, 
            pageSize:"-1",
            fields:fs
        }               
        if(!Ext.isString(lsv)){
            comboConfig.store=new Ext.data.JsonStore(storeConfig);
        }else{
            comboConfig.store = new EasyJF.Ext.CachedRemoteStore(Ext.apply({varName:lsv},storeConfig));
        }
        return comboConfig;
    },
    
    /**
     * 简单的打印表格的方法，该方法会开启一个新窗口，并把指定的girdPanel的dom拷贝到新窗口中，配上自定义的打印样式，实现简单的列表打印效果<br/>
     * 在新开的打印页面中引入的样式表为：/stylesheet/print.css，可以自定义该样式表。<br />
     * 
     * 该方法还可以用来打印任何东西，比如form表单等。
     * <pre>
     * <code>
//例子：点击【打印】按钮，填出一个新窗口，打印当前grid中的数据：
{xtype:'button',text:'打印列表',scope:this,handler:this.printGridData},
//...
this.printGridData=function(){
	if(this.grid.store.getCount())
		EasyJF.Ext.Util.printGrid(this.grid);
}
     * </code>
     * </pre>
     * 
     * @param {Object} grid 需要打印的组件对象。任何组件对象都可以使用统一的方式完成打印。
     * 
     */
    printGrid:function(grid){
        var win=window.open("");
        win.document.write("<link rel='stylesheet' type='text/css' href='/stylesheet/print.css' />");
        win.document.write(grid.el.dom.innerHTML);
        win.document.close();
    },
    
    
    /**
     * 得到列表选择窗口的实例的方法。该方法返回一个{@link EasyJF.Ext.GridSelectWin}实例。<br/>
     * 该方法使用缓存机制。<br/>
     * 要调用该方法必须要保证gridClz类已经加载或者定义。
     * 
     * @param {String} winName 全局的选择窗口名称。该名称即是选择窗口的缓存名称。
     * @param {String} title 选择窗口的名称。
     * @param {Integer} width 选择窗口的宽度。
     * @param {Integer} height 选择窗口的高度。
     * @param {Class} Ext.grid.Grid 选择窗口中包含的列表类型。
     * @param {Object} config 配置GridSelectWin的信息。参考{@link EasyJF.Ext.GridSelectWin}配置
     */
    getSelectWin:function(winName,title,width,height,gridClz,config){
        if(!EasyJF.Ext.SelectWin)EasyJF.Ext.SelectWin={};
        if(!EasyJF.Ext.SelectWin[winName]){
            config=config||{};
            var glist=config.grid;
            if(!glist&&gridClz)
            	glist=eval("new "+gridClz+"(config)");
            config=Ext.apply({},{title:title,width:width,height:height,grid:glist},config);
            EasyJF.Ext.SelectWin[winName]=new EasyJF.Ext.GridSelectWin(config);
        }
        return EasyJF.Ext.SelectWin[winName];
    },
    
	/**
	 * 设置FckEditor内的内容
	 * 
	 * @param {String} name 要设置Fck的名称
	 * @param {String} html 设置editor的内容
	 * 
	 */	
    setDelayEditorContent:function(name,html){
        if(typeof FCKeditorAPI=="object"){
            var editor=FCKeditorAPI.GetInstance(name)
            if(editor)editor.SetHTML(html||"");
        }
    },
    
    /**
	 * 设置FckEditor内的内容。该方法保证FckEditor加载完成后再设置内容
	 * 
	 * @param {String} name 要设置Fck的名称
	 * @param {String} html 设置editor的内容
	 * 
	 */	
    setFCKEditorContent:function(name,html){
        if(typeof FCKeditorAPI=="object"){
            var editor=FCKeditorAPI.GetInstance(name)
            if(editor)editor.SetHTML(html||"");
            else this.setDelayEditorContent.createCallback(name,html).defer(2000);
        }
        else this.setDelayEditorContent.createCallback(name,html).defer(2000);
    },
    
    /**
	 * 根据id得到FckEditor实例
	 * 
	 * @param {String} id 要得到的FckEditor的id
	 * 
	 * @return {FCKeditor} 得到的FckEditor实例。如果没有加载fckAPI，返回null。
	 * 
	 */	
    getFckById:function(id){
        var fckApi = window.FCKeditorAPI;
        if(!fckApi)return null;
        return fckApi.GetInstance(id);
    },
    
    /**
     * 得到指定FckEditor的内容。
     * 
     * @param {String} name 指定要得到内容的FckEditor的名称
     * 
     * @return {String} v 得到的FckEditor内容。
     */
    getFCKEditorContent:function(name){
        if(typeof FCKeditorAPI=="object"){
            var editor=FCKeditorAPI.GetInstance(name)
            return editor.GetHTML();
        }
        else return "";
    },
    
    /**
     * 在grid加载后自动选中第一行。<br/>
     * 该方法只需要在需要实现该功能的grid的render事件中执行一次即可。
     * 
     * @param {Ext.grid.GridPanel} grid 需要实现自动选中第一行这个功能的gird。
     */
    autoFocusFirstRow:function(grid){
        grid.store.on("load",function(){
            if(grid.rendered){
                var sel=grid.getSelectionModel();
                if(!sel.hasSelection() && grid.store.getCount()){
                grid.getView().focusRow(0);
                }else if(sel.hasSelection()) {
                    grid.getView().focusRow(grid.store.indexOf(grid.getSelectionModel().getSelected()));
                }
                else {
                    grid.focus();
                }
            }
            else {
                grid.on("render",function(g){
                	EasyJF.Ext.Util.autoFocusFirstRow(g);
                })
            }
        })
    },
    
    /**
     * 得到一个全局的导出或者下载form。 <br/>
     * 该form是一个隐藏的div+IFrame。因为在页面上直接向后台请求下载资源是不能做到的。<br/>
     * 示例中提供了一个常用的资源下载方法。<br />
     * 
     * 
     * <pre>
     * <code>
//示例：一个通用的往后台发送下载资源请求的方法。可以用在页面上导出excel，导出zip等资源。
//config定义：
// btn:点击的导出excel按钮
// disableBtn:是否在导出excel的时候disable导出按钮
// url：导出excel的url
// params：传入的参数
// scope:scope callback 执行的作用域
// callback:完成导出后需要执行的动作
//
EasyJF.Ext.Util.exportExcel=function(config){
	if(config.btn && config.disableBtn){
		config.btn.disable();
	}
	var exportForm=EasyJF.Ext.Util.getExportForm();
	exportForm.form.submit({
		url:config.url,
  		params:config.params,
  		scope:config.scope||this,
		success:function(r,a){
			if(config.btn && config.disableBtn){
				config.btn.enable();
			}
			if(config.callback) config.callback.call(config.scope||this,r,a);
			if(a.result && a.result.data && a.result.data.msg){
				Ext.Msg.alert("提示信息",a.result.data.msg);
			}
  		}
	});
}
     * </code>
     * </pre>
     * 
     * @return {Ext.form.FormPanel} exportForm 得到的全局下载表单
     */
    getExportForm:function(){
        var exportForm=Ext.getCmp("global_export_form");
        if(!exportForm){
            exportForm=new Ext.form.FormPanel({fileUpload:true,hidden:true,items:{}});
            var fe=document.createElement("div");
            document.body.appendChild(fe);
            exportForm.render(fe);
        }
        return exportForm;
    },
    
    
    /**
     * 执行Panel上的某一个按钮的handler方法。<br/>
     * 该按钮是需要通过panel的buttons属性添加的按钮<br/>
     * 
     * 
     * 
     * @param {Ext.Panel} p
     * 					需要调用的panel
     * @param {String} btn
     *            		需要调用的button的id
     * @param {Object} scope
     * 					按钮方法执行的作用域
     */
    executePanelButtons:function(p,btn,scope){
    	if(p.getFooterToolbar()){
    		var bt=p.getFooterToolbar().get(btn);
        	if(bt && !(bt.disabled||bt.hidden) && bt.handler)
        		bt.handler.call(scope||bt.scope||window);
    	}
    },  

    /**
     * 完成一个异步请求的包装方法。
     * 
     * @param {String} url 发送请求的地址
     * @param {Object} params 发送请求提交的参数信息
     * @param {Object} scope 请求响应回调方法的执行作用域
     * @param {Function} success 在请求成功后执行的回调方法
     * 		<ul>传入参数
     * 			<li>{Object} response 返回的XMLHttpRequest对象</li>
     * 			<li>{Object} options 异步请求发送的参数</li>
     * 		</ul>
     * @param {Function} failure 当调用失败后的回调方法
     * 		<ul>传入参数
     * 			<li>{Object} response 返回的XMLHttpRequest对象</li>
     * 		</ul>
     * @param {Function} successOp 当调用成功后的回调方法，该方法区别于success回调函数。该方法只会传入解析后的responseText产生的对象
     * 		<ul>传入参数
     * 			<li>{Object} data 解析后的responseText产生的对象</li>
     * 			<li>{Object} options 异步请求发送的参数</li>
     * 		</ul>
     */
    ajaxRequest:function(url, params, scope, success, failure,successOp) {
    	Ext.Ajax.request({
                url : url,
                params : params || {},
                scope : scope || this,
                success : success || function(response,options) {
                    var data = Ext.decode(response.responseText);
                    if (data.success) {
                        if (successOp)
                            successOp.call(this,data,options);
                        else if(data.msg){
                            EasyJF.Ext.Msg.alert(data.msg);
                        }
                    } else if(data.msg){
                        Ext.Msg.errorMsg(null, data.msg);
                    }
                },
            failure : failure || function(response) {
                var data = Ext.decode(response.responseText);
                Ext.Msg.errorMsg(null, data.msg? data.msg: (data.errors && data.errors.msg? data.errors.msg: "未知错误原因!"));
            }
        });
	},
	/**
     * 切换系统皮肤
     * @param {String} value
     */
    applySkin:function(value) {
        Ext.util.CSS.swapStyleSheet('extSkin',String.format('plugins/extjs/{0}/resources/css/{1}.css',Lanyo_Ajax.extVersion,value));
        if(Lanyo_Ajax.sysSkinPath)Ext.util.CSS.swapStyleSheet('sysSkin',Lanyo_Ajax.sysSkinPath+value+".css");
    }
});
EasyJF.Ext.Util.easycolumn = EasyJF.Ext.Util.buildColumnForm;
/**
 * Ext.grid.GridPanel 插件 功能 pageToolbar 支持快捷键上一页 下一页 全选 反全选
 * @class EasyJF.Ext.GridPanelPlugin
 * @extends Ext.util.Observable
 */
Ext.ns("EasyJF.Ext","EasyJF.Ext.Tree");
EasyJF.Ext.GridPanelPlugin=Ext.extend(Ext.util.Observable, {
    init : function(a) {
        this.grid = a;
        this.store = this.grid.store;
        this.grid.on("render", this.initEvents, this)
    },
    beforePage : function(c) {
        var b = this.pageToolbar.getPageData();
        var d = b.activePage;
        var a = b.pages;
        switch (c) {
            case "next" :
                if (d === a) {
                    return false
                }
                break;
            case "prev" :
                if (d == 1) {
                    return false
                }
                break
        }
    },
    initEvents : function() {
        this.keyMap = this.grid.getKeyMap();
        this.pageToolbar = this.grid.getBottomToolbar();
        if (this.pageToolbar) {
            this.keyMap.addBinding([{
                key : Ext.EventObject.RIGHT,
                fn : this.pageToolbar.onClick.createInterceptor(
                        this.beforePage, this).createDelegate(
                        this.pageToolbar, ["next"]),
                shift : true,
                scope : this
            }, {
                key : Ext.EventObject.LEFT,
                fn : this.pageToolbar.onClick.createInterceptor(
                        this.beforePage, this).createDelegate(
                        this.pageToolbar, ["prev"]),
                shift : true,
                scope : this
            }])
        };
        new Ext.KeyMap(this.grid.getGridEl(), [{
            key : Ext.EventObject.A,
            stopEvent : true,
            ctrl : true,
            fn : function(a, b) {
                this.grid.getSelectionModel().selectAll()
            },
            scope : this
        }, {
            key : Ext.EventObject.X,
            stopEvent : true,
            ctrl : true,
            fn : function() {
                this.grid.getSelectionModel().clearSelections()
            },
            scope : this
        }])
    }
});
/**
 * 表单元素帮助提示信息
 * @class EasyJF.Ext.HelpIconPlugin
 * @extends Ext.util.Observable
 */
EasyJF.Ext.HelpIconPlugin = Ext.extend(Ext.util.Observable, {
    init:function(field) {
    Ext.apply(field, {
      onRender:field.onRender.createSequence(function(ct, position) {
        // If field has the fieldLabel object, add the helpIcon
        if(this.fieldLabel && this.helpText) {
          var label = this.el.findParent('.x-form-element', 5, true) || this.el.findParent('.x-form-field-wrap', 5, true);
          
          this.helpIcon = label.createChild({
            cls:(this.helpIconCls || 'ux-helpicon-icon')
          ,    style:'width:16px; height:18px; position:absolute; left:0; top:0; display:block; background:transparent no-repeat scroll 0 2px;'
          });
          
          this.alignHelpIcon = function(){
            var el = this.wrap ? this.wrap : this.el; 
            this.helpIcon.alignTo(el, 'tl-tr', [2, 0]);
          }
          // Redefine alignErrorIcon to move the errorIcon (if it exist) to
            // the right of helpIcon
          if(this.alignErrorIcon) {
            this.alignErrorIcon = function() {
              this.errorIcon.alignTo(this.helpIcon, 'tl-tr', [2, 0]);
            }
          }
          
          this.on('resize', this.alignHelpIcon, this);
          // Register QuickTip for icon
          Ext.QuickTips.register({
            target:this.helpIcon
          , title:(this.helpTitle || '')
          , text:(this.helpText || 'No help defined yet!')
          , enabled:true
          });
        }
      }) 
    }); 
    } 
}); 

/**
 * tabpanel的按键操作 backspace ,tab
 * @class EasyJF.Ext.TabHistoryPlugin
 * @extends Object
 */
EasyJF.Ext.TabHistoryPlugin = Ext.extend(Object,{
	/**
	 * tabpanel item项改变的时候 
	 * @param {Tabpanel} tp
	 * @param {Component} tab
	 */
	onTabChange:function(tp,tab){
		tp.focus();
		this.history.push(tab.id);
	},
	/**
	 * tabpanel销毁前触发
	 * @param {Tabpanel} t
	 */
	onTabBeforedestroy:function(t){
		Ext.del(this,'history','tabpanel');
		t.un('beforedestroy',this.onTabBeforedestroy,this);
	},
	/**
	 * tabpanel render的是触发
	 */
	onTabRender:function(){
		var tp = this.tabpanel;
		var km= tp.getKeyMap();
		tp.getEl().setStyle("outline","0 none");
		tp.getEl().dom.setAttribute('tabindex',0);
		
		km.addBinding([{
			scope : this ,
			key : Ext.EventObject.BACKSPACE,
			fn : function(k,e){
				e.stopPropagation();
				this.onBack();
			}
		},{
			scope : this ,
			key : Ext.EventObject.TAB,
			fn : function(k,e){
				var at = tp.getActiveTab();
				var items = tp.items,count = items.getCount(),index=0;
				if(at){
					index=items.indexOf(at);
					if(++index==count)index = 0;
				}
				if(count)tp.setActiveTab(index);
			}
		}]);
	},
	/**
	 * 上一个tab面板
	 */
	onBack:function(){
		 var tp =this.tabpanel; 
		 var history;
		 if(this.history.length){
		 	var at = tp.getActiveTab();
		 	if(this.history.length==1){
		 		return ;
		 	}
		 	this.history.pop();
		 	while(history = this.history.pop()){
		 		var p = tp.getItem(history);
		 		if(p){
		 			tp.setActiveTab(p);
		 			break;
		 		}
		 	}
		 }
	},
	init : function(t){
		this.tabpanel = t;
		this.history = [];
		t.on('tabchange',this.onTabChange,this);
		t.on('beforedestroy',this.onTabBeforedestroy,this);
		t.on('render',this.onTabRender,this);
	}
});
Ext.preg('tabhistoryplugin',EasyJF.Ext.TabHistoryPlugin);


Ext.ns('Ext.ux.grid');
Ext.ux.grid.GridSummary = function(config) {
        Ext.apply(this, config);
};
Ext.extend(Ext.ux.grid.GridSummary, Ext.util.Observable, {
    init : function(grid) {
        this.grid = grid;
        this.cm = grid.getColumnModel();
        this.view = grid.getView();

        var v = this.view;

        // override GridView's onLayout() method
        v.onLayout = this.onLayout;

        v.afterMethod('render', this.refreshSummary, this);
        v.afterMethod('refresh', this.refreshSummary, this);
        v.afterMethod('syncScroll', this.syncSummaryScroll, this);
        v.afterMethod('onColumnWidthUpdated', this.doWidth, this);
        v.afterMethod('onAllColumnWidthsUpdated', this.doAllWidths, this);
        v.afterMethod('onColumnHiddenUpdated', this.doHidden, this);

        // update summary row on store's add/remove/clear/update events
        grid.store.on({
            add: this.refreshSummary,
            remove: this.refreshSummary,
            clear: this.refreshSummary,
            update: this.refreshSummary,
            scope: this
        });

        if (!this.rowTpl) {
            this.rowTpl = new Ext.Template(
                '<div class="x-grid3-summary-row x-grid3-gridsummary-row-offset">',
                    '<table class="x-grid3-summary-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
                        '<tbody><tr>{cells}</tr><tr style="display:{totalDisplay}">{tcells}</tr></tbody>',
                    '</table>',
                '</div>'
            );
            this.rowTpl.disableFormats = true;
        }
        this.rowTpl.compile();

        if (!this.cellTpl) {
            this.cellTpl = new Ext.Template(
                '<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css}" style="{style}">',
                    '<div class="x-grid3-cell-inner x-grid3-col-{id}" unselectable="on" {attr}>{value}</div>',
                "</td>"
            );
            this.cellTpl.disableFormats = true;
        }
        this.cellTpl.compile();
    },

    calculate : function(rs, cm,isTotal) {
        var data = {}, cfg = cm.config;
        for (var i = 0, len = cfg.length; i < len; i++) { // loop through all
                                                            // columns in
                                                            // ColumnModel
            var cf = cfg[i], // get column's configuration
                cname = cf.dataIndex; // get column dataIndex

            // initialise grid summary row data for
            // the current column being worked on
            data[cname+(isTotal?"_total":"")] = 0;

            if (cf.summaryType) {
                for (var j = 0, jlen = rs.length; j < jlen; j++) {
                    var r = rs[j]; // get a single Record
                    if(isTotal){
                        data[cname+"_total"] = Ext.ux.grid.GridSummary.Calculations[cf.summaryType](r[cname], r, cname+"_total", data, j);
                    }
                    else {
                        data[cname] = Ext.ux.grid.GridSummary.Calculations[cf.summaryType](r.get(cname), r, cname, data, j);
                    }
                }
            }
        }

        return data;
    },

    onLayout : function(vw, vh) {
        if (Ext.type(vh) != 'number') { // handles grid's height:'auto' config
            return;
        }
        // note: this method is scoped to the GridView
        if (!this.grid.getGridEl().hasClass('x-grid-hide-gridsummary')) {
            // readjust gridview's height only if grid summary row is visible
            this.scroller.setHeight(vh - this.summary.getHeight());
        }
    },

    syncSummaryScroll : function() {
        var mb = this.view.scroller.dom;

        this.view.summaryWrap.dom.scrollLeft = mb.scrollLeft;
        this.view.summaryWrap.dom.scrollLeft = mb.scrollLeft; // second time
                                                                // for IE (1/2
                                                                // time first
                                                                // fails, other
                                                                // browsers
                                                                // ignore)
    },

    doWidth : function(col, w, tw) {
        var s = this.view.summary.dom;

        s.firstChild.style.width = tw;
        s.firstChild.rows[0].childNodes[col].style.width = w;
    },

    doAllWidths : function(ws, tw) {
        var s = this.view.summary.dom, wlen = ws.length;

        s.firstChild.style.width = tw;

        var cells = s.firstChild.rows[0].childNodes;

        for (var j = 0; j < wlen; j++) {
            cells[j].style.width = ws[j];
        }
    },

    doHidden : function(col, hidden, tw) {
        var s = this.view.summary.dom,
            display = hidden ? 'none' : '';

        s.firstChild.style.width = tw;
        s.firstChild.rows[0].childNodes[col].style.display = display;
    },

    renderSummary : function(o, cs, cm) {
        cs = cs || this.view.getColumnData();
        var cfg = cm.config, buf = [],tbuf=[], last = cs.length - 1;
        for (var i = 0, len = cs.length; i < len; i++) {
            var c = cs[i], cf = cfg[i], p = {};

            p.id = c.id;
            p.style = c.style;
            p.css = i == 0 ? 'x-grid3-cell-first ' : (i == last ? 'x-grid3-cell-last ' : '');
            var tp=Ext.apply({},p);
          
            if (cf.summaryType || cf.summaryRenderer) {             
                p.value = (cf.summaryRenderer || c.renderer)(o.data[c.name], p, o);
                tp.value=(cf.summaryTotalRenderer||cf.summaryRenderer || c.renderer)(o.data[c.name+"_total"], p, o);
            } else {
                p.value = '';
                tp.value='';
            }
              
            if (p.value == undefined || p.value === "") p.value = "&#160;";
            if (tp.value == undefined || tp.value === "") tp.value = "&#160;";
            buf[buf.length] = this.cellTpl.apply(p);
            tbuf[tbuf.length]=this.cellTpl.apply(tp);
            
        }

        return this.rowTpl.apply({
            tstyle: 'width:' + this.view.getTotalWidth() + ';',
            cells: buf.join(''),
            tcells:tbuf.join(''),
            totalDisplay:this.grid.store.refreshCache?"display":"none"
        });
    },

    refreshSummary : function() {
        var g = this.grid, ds = g.store,
            cs = this.view.getColumnData(),
            cm = this.cm,
            rs = ds.getRange();
            var data = this.calculate(rs, cm);
            if(ds.refreshCache){
                var total=this.calculate(ds.proxy.getData().getRange(), cm,true);
                Ext.apply(data,total);
            }       
            var buf = this.renderSummary({data: data}, cs, cm);
            
        if (!this.view.summaryWrap) {        
            this.view.summaryWrap = Ext.DomHelper.insertAfter(this.view.scroller, {
                tag: 'div',
                cls: 'x-grid3-gridsummary-row-inner'
            }, true);           
        }
        this.view.summary = this.view.summaryWrap.update(buf).first();
        // alert(this.view.summary.dom.innerHTML);
       /*
         * Ext.DomHelper.insertAfter(this.view.summary.parent(),'<div
         * class="x-grid3-summary-row x-grid3-gridsummary-row-offset"><table
         * class="x-grid3-summary-table" border="0" cellspacing="0"
         * cellpadding="0" style="width:210px;"><tbody><tr><td class="x-grid3-col x-grid3-cell x-grid3-td-0 x-grid3-cell-first " style="width:98px;display:none;"><div
         * class="x-grid3-cell-inner x-grid3-col-0" unselectable="on" >&#160;</div></td><td class="x-grid3-col x-grid3-cell x-grid3-td-1 " style="width:18px;"><div
         * class="x-grid3-cell-inner x-grid3-col-1" unselectable="on" >&#160;</div></td><td class="x-grid3-col x-grid3-cell x-grid3-td-2 " style="width:18px;"><div
         * class="x-grid3-cell-inner x-grid3-col-2" unselectable="on" >&#160;</div></td><td class="x-grid3-col x-grid3-cell x-grid3-td-3 " style="width:18px;text-align:right;"><div
         * class="x-grid3-cell-inner x-grid3-col-3" unselectable="on" >0</div></td><td class="x-grid3-col x-grid3-cell x-grid3-td-4 " style="width:18px;text-align:right;"><div
         * class="x-grid3-cell-inner x-grid3-col-4" unselectable="on" >0</div></td><td class="x-grid3-col x-grid3-cell x-grid3-td-5 " style="width:18px;text-align:right;"><div
         * class="x-grid3-cell-inner x-grid3-col-5" unselectable="on" >0</div></td><td class="x-grid3-col x-grid3-cell x-grid3-td-6 " style="width:18px;text-align:right;"><div
         * class="x-grid3-cell-inner x-grid3-col-6" unselectable="on" >0</div></td><td class="x-grid3-col x-grid3-cell x-grid3-td-7 " style="width:18px;text-align:right;"><div
         * class="x-grid3-cell-inner x-grid3-col-7" unselectable="on" >0</div></td><td class="x-grid3-col x-grid3-cell x-grid3-td-8 " style="width:18px;text-align:right;"><div
         * class="x-grid3-cell-inner x-grid3-col-8" unselectable="on" >0</div></td><td class="x-grid3-col x-grid3-cell x-grid3-td-9 " style="width:13px;text-align:right;"><div
         * class="x-grid3-cell-inner x-grid3-col-9" unselectable="on" >&#160;</div></td><td class="x-grid3-col x-grid3-cell x-grid3-td-10 " style="width:13px;text-align:right;"><div
         * class="x-grid3-cell-inner x-grid3-col-10" unselectable="on" >&#160;</div></td><td class="x-grid3-col x-grid3-cell x-grid3-td-11 x-grid3-cell-last " style="width:18px;"><div
         * class="x-grid3-cell-inner x-grid3-col-11" unselectable="on" >&#160;</div></td></tr></tbody></table></div>');
         * alert(111);
         */
    },

    toggleSummary : function(visible) { // true to display summary row
        var el = this.grid.getGridEl();

        if (el) {
            if (visible === undefined) {
                visible = el.hasClass('x-grid-hide-gridsummary');
            }
            el[visible ? 'removeClass' : 'addClass']('x-grid-hide-gridsummary');

            this.view.layout(); // readjust gridview height
        }
    },

    getSummaryNode : function() {
        return this.view.summary
    }
});
Ext.reg('gridsummary', Ext.ux.grid.GridSummary);

/*
 * all Calculation methods are called on each Record in the Store with the
 * following 5 parameters:
 * 
 * v - cell value record - reference to the current Record colName - column name
 * (i.e. the ColumnModel's dataIndex) data - the cumulative data for the current
 * column + summaryType up to the current Record rowIdx - current row index
 */
Ext.ux.grid.GridSummary.Calculations = {
    sum : function(v, record, colName, data, rowIdx) {
        return data[colName] + Ext.num(v, 0);
    },

    count : function(v, record, colName, data, rowIdx) {
        return rowIdx + 1;
    },

    max : function(v, record, colName, data, rowIdx) {
        return Math.max(Ext.num(v, 0), data[colName]);
    },

    min : function(v, record, colName, data, rowIdx) {
        return Math.min(Ext.num(v, 0), data[colName]);
    },

    average : function(v, record, colName, data, rowIdx) {
        var t = data[colName] + Ext.num(v, 0), count = record.store.getCount();
        try{
        var result= rowIdx == count - 1 ? (t / count) : t;
         return result;
        }
        catch(e){
            alert(e);
        }
       
        
    },
    last:function(v, record, colName, data, rowIdx) {
        return v;
    }
}


/*
 * Ext JS Library 2.2 Copyright(c) 2006-2008, Ext JS, LLC. licensing@extjs.com
 * http://extjs.com/license
 */
Ext.grid.GroupSummary = function(config){
    Ext.apply(this, config);
};

Ext.extend(Ext.grid.GroupSummary, Ext.util.Observable, {
    init : function(grid){
        this.grid = grid;
        this.cm = grid.getColumnModel();
        this.view = grid.getView();

        var v = this.view;
        v.doGroupEnd = this.doGroupEnd.createDelegate(this);

        v.afterMethod('onColumnWidthUpdated', this.doWidth, this);
        v.afterMethod('onAllColumnWidthsUpdated', this.doAllWidths, this);
        v.afterMethod('onColumnHiddenUpdated', this.doHidden, this);
        v.afterMethod('onUpdate', this.doUpdate, this);
        v.afterMethod('onRemove', this.doRemove, this);

        if(!this.rowTpl){
            this.rowTpl = new Ext.Template(
                '<div class="x-grid3-summary-row" style="{tstyle}">',
                '<table class="x-grid3-summary-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
                    '<tbody><tr>{cells}</tr></tbody>',
                '</table></div>'
            );
            this.rowTpl.disableFormats = true;
        }
        this.rowTpl.compile();

        if(!this.cellTpl){
            this.cellTpl = new Ext.Template(
                '<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css}" style="{style}">',
                '<div class="x-grid3-cell-inner x-grid3-col-{id}" unselectable="on">{value}</div>',
                "</td>"
            );
            this.cellTpl.disableFormats = true;
        }
        this.cellTpl.compile();
    },

    toggleSummaries : function(visible){
        var el = this.grid.getGridEl();
        if(el){
            if(visible === undefined){
                visible = el.hasClass('x-grid-hide-summary');
            }
            el[visible ? 'removeClass' : 'addClass']('x-grid-hide-summary');
        }
    },

    renderSummary : function(o, cs){
        cs = cs || this.view.getColumnData();
        var cfg = this.cm.config;

        var buf = [], c, p = {}, cf, last = cs.length-1;
        for(var i = 0, len = cs.length; i < len; i++){
            c = cs[i];
            cf = cfg[i];
            p.id = c.id;
            p.style = c.style;
            p.css = i == 0 ? 'x-grid3-cell-first ' : (i == last ? 'x-grid3-cell-last ' : '');
            if(cf.summaryType || cf.summaryRenderer){
                p.value = (cf.summaryRenderer || c.renderer)(o.data[c.name], p, o);
            }else{
                p.value = '';
            }
            if(p.value == undefined || p.value === "") p.value = "&#160;";
            buf[buf.length] = this.cellTpl.apply(p);
        }

        return this.rowTpl.apply({
            tstyle: 'width:'+this.view.getTotalWidth()+';',
            cells: buf.join('')
        });
    },

    calculate : function(rs, cs){
        var data = {}, r, c, cfg = this.cm.config, cf;
        for(var j = 0, jlen = rs.length; j < jlen; j++){
            r = rs[j];
            for(var i = 0, len = cs.length; i < len; i++){
                c = cs[i];
                cf = cfg[i];
                if(cf.summaryType){
                    data[c.name] = Ext.grid.GroupSummary.Calculations[cf.summaryType](data[c.name] || 0, r, c.name, data);
                }
            }
        }
        return data;
    },

    doGroupEnd : function(buf, g, cs, ds, colCount){
        var data = this.calculate(g.rs, cs);
        buf.push('</div>', this.renderSummary({data: data}, cs), '</div>');
    },

    doWidth : function(col, w, tw){
        var gs = this.view.getGroups(), s;
        for(var i = 0, len = gs.length; i < len; i++){
            s = gs[i].childNodes[2];
            s.style.width = tw;
            s.firstChild.style.width = tw;
            s.firstChild.rows[0].childNodes[col].style.width = w;
        }
    },

    doAllWidths : function(ws, tw){
        var gs = this.view.getGroups(), s, cells, wlen = ws.length;
        for(var i = 0, len = gs.length; i < len; i++){
            s = gs[i].childNodes[2];
            s.style.width = tw;
            s.firstChild.style.width = tw;
            cells = s.firstChild.rows[0].childNodes;
            for(var j = 0; j < wlen; j++){
                cells[j].style.width = ws[j];
            }
        }
    },

    doHidden : function(col, hidden, tw){
        var gs = this.view.getGroups(), s, display = hidden ? 'none' : '';
        for(var i = 0, len = gs.length; i < len; i++){
            s = gs[i].childNodes[2];
            s.style.width = tw;
            s.firstChild.style.width = tw;
            s.firstChild.rows[0].childNodes[col].style.display = display;
        }
    },

    // Note: requires that all (or the first) record in the
    // group share the same group value. Returns false if the group
    // could not be found.
    refreshSummary : function(groupValue){
        return this.refreshSummaryById(this.view.getGroupId(groupValue));
    },

    getSummaryNode : function(gid){
        var g = Ext.fly(gid, '_gsummary');
        if(g){
            return g.down('.x-grid3-summary-row', true);
        }
        return null;
    },

    refreshSummaryById : function(gid){
        var g = document.getElementById(gid);
        if(!g){
            return false;
        }
        var rs = [];
        this.grid.store.each(function(r){
            if(r._groupId == gid){
                rs[rs.length] = r;
            }
        });
        var cs = this.view.getColumnData();
        var data = this.calculate(rs, cs);
        var markup = this.renderSummary({data: data}, cs);

        var existing = this.getSummaryNode(gid);
        if(existing){
            g.removeChild(existing);
        }
        Ext.DomHelper.append(g, markup);
        return true;
    },

    doUpdate : function(ds, record){
        this.refreshSummaryById(record._groupId);
    },

    doRemove : function(ds, record, index, isUpdate){
        if(!isUpdate){
            this.refreshSummaryById(record._groupId);
        }
    },

    showSummaryMsg : function(groupValue, msg){
        var gid = this.view.getGroupId(groupValue);
        var node = this.getSummaryNode(gid);
        if(node){
            node.innerHTML = '<div class="x-grid3-summary-msg">' + msg + '</div>';
        }
    }
});

Ext.grid.GroupSummary.Calculations = {
    'sum' : function(v, record, field){
        return v + (record.data[field]||0);
    },

    'count' : function(v, record, field, data){
        return data[field+'count'] ? ++data[field+'count'] : (data[field+'count'] = 1);
    },

    'max' : function(v, record, field, data){
        var v = record.data[field];
        var max = data[field+'max'] === undefined ? (data[field+'max'] = v) : data[field+'max'];
        return v > max ? (data[field+'max'] = v) : max;
    },

    'min' : function(v, record, field, data){
        var v = record.data[field];
        var min = data[field+'min'] === undefined ? (data[field+'min'] = v) : data[field+'min'];
        return v < min ? (data[field+'min'] = v) : min;
    },

    'average' : function(v, record, field, data){
        var c = data[field+'count'] ? ++data[field+'count'] : (data[field+'count'] = 1);
        var t = (data[field+'total'] = ((data[field+'total']||0) + (record.data[field]||0)));
        return t === 0 ? 0 : t / c;
    },
    'last':function(v, record, field, data) {
        return v;
    }
}

Ext.grid.HybridSummary = Ext.extend(Ext.grid.GroupSummary, {
    calculate : function(rs, cs){
        var gcol = this.view.getGroupField();
        var gvalue = rs[0].data[gcol];
        var gdata = this.getSummaryData(gvalue);
        return gdata || Ext.grid.HybridSummary.superclass.calculate.call(this, rs, cs);
    },

    updateSummaryData : function(groupValue, data, skipRefresh){
        var json = this.grid.store.reader.jsonData;
        if(!json.summaryData){
            json.summaryData = {};
        }
        json.summaryData[groupValue] = data;
        if(!skipRefresh){
            this.refreshSummary(groupValue);
        }
    },
    getSummaryData : function(groupValue){
        var json = this.grid.store.reader.jsonData;
        if(json && json.summaryData){
            return json.summaryData[groupValue];
        }
        return null;
    }
});

/**
 * 邮件菜单树插件，支持数据同步更新
 * 
 * @param {} config
 */
Ext.ns("EasyJF.Ext.Tree");
EasyJF.Ext.Tree.LocalPlugin = function(config) {
	Ext.apply(this, config);
	EasyJF.Ext.Tree.LocalPlugin.superclass.constructor.call(this, config);
}
Ext.extend(EasyJF.Ext.Tree.LocalPlugin, Ext.util.Observable, {
	init : function(tree) {
		this.tree = tree;
		this.loader = this.tree.loader;
		this.tree.on('render', this.initEvents, this);
		this.tree.on('beforedestroy', this.destroyCmp, this);
	},
	destroyCmp : function() {
		delete this.tree;
		delete this.loader;
		var shareCache = this.loader.shareCache;
		shareCache.un("addnode", this.addUINode, this);// 数据变化,则创建新的节点
		shareCache.un("updatenode", this.updateUINode, this);// 更新节点内容
		shareCache.un("removenode", this.removeUINode, this);// 删除节点内容
	},
	initEvents : function() {
		var shareCache = this.loader.shareCache;
		shareCache.on("addnode", this.addUINode, this);// 数据变化,则创建新的节点
		shareCache.on("updatenode", this.updateUINode, this);// 更新节点内容
		shareCache.on("removenode", this.removeUINode, this);// 删除节点内容
	},
	addUINode : function(node, parentNode) {
		var parent = this.getNodeById(parentNode.id);
		if (parent) {
			parent.leaf = false;
			parent.appendChild(node);
		}
	},
	updateUINode : function(upateNode) {
		var node = this.getNodeById(upateNode.id);
		if (node) {
			if (Ext.type(this.loader.transferNode) == 'function') {
				upateNode = Ext.apply( {}, upateNode);
				this.loader.transferNode(upateNode);
			}
			node.setText(upateNode.text);
			Ext.copyToIf(node.attributes, upateNode, ["children", "cls",
					"loader", "parentNode"]);
			if (node.getUI() instanceof Ext.ux.tree.ColumnNodeUI) {
				node.getUI().updateNode(upateNode);
			}
			if (!Ext.isEmpty(upateNode.qtip)) {
				if (node.getUI().getTextEl().setAttributeNS) {
					node.getUI().getTextEl().setAttributeNS("ext", "qtip",
							upateNode.qtip);
				} else {
					node.getUI().getTextEl().setAttribute("ext:qtip",
							upateNode.qtip);
				}
			}
		}
	},
	removeUINode : function(node) {
		var parentNode = node.parentNode;
		if (parentNode && parentNode.children.length == 0) {
			var parentNode = this.getNodeById(parentNode.id);
			if (parentNode) {
				parentNode.leaf = true;
				parentNode.getUI().updateExpandIcon();
			}
		}
		var node = this.getNodeById(node.id);
		if (node) {
			node.remove();
		}
	},
	getNodeById : function(id) {
		return this.tree.getNodeById(id);
	}
});

Ext.ns("EasyJF.Ext");
EasyJF.Ext.TabPanelPlugin = function(b) {
	Ext.apply(this, b);
	EasyJF.Ext.TabPanelPlugin.superclass.constructor.call(this)
};
Ext.extend(
EasyJF.Ext.TabPanelPlugin,
Ext.util.Observable,
{
	init : function(b) {
		this.tabPanel = b;
		this.initEvents()
	},
	initEvents : function() {
		this.tabPanel.on("contextmenu", this.showContextMenu,
				this);
		if (typeof(this.tabPanel.tabSize) == "number") {
			this.tabPanel
					.on("beforeadd", this.maxTabSize, this)
		}
	},
	maxTabSize : function(f, d, e) {
		if (f.items.getCount() > this.tabPanel.tabSize) {
			Ext.Msg
					.show( {
						title : "\u6e29\u99a8\u63d0\u793a",
						msg : "\u9762\u677f\u8d85\u8fc7\u6700\u5927\u6570\uff0c\u8bf7\u5148\u5173\u95ed\uff01",
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.INFO
					});
			return false
		}
	},
	createTabMenu : function() {
		return new Ext.menu.Menu( {
			items : [ {
				text : "\u5173\u95ed\u5f53\u524d\u9762\u677f",
				id : "closaCurrentTab",
				handler : this.closeTab,
				scope : this
			}, {
				text : "\u5173\u95ed\u6240\u6709\u9762\u677f",
				handler : this.closeAllTab,
				id : "closaAllTab",
				scope : this
			}, {
				text : "关闭其它页签",
				id : "closeOtherTab",
				handler : this.closeElsetTab,
				scope : this
			}, {
				text : "\u5173\u95ed\u53f3\u8fb9\u9762\u677f",
				id : "closaRightTab",
				handler : this.closeRightTab,
				scope : this
			}, {
				text : "\u5173\u95ed\u5de6\u8fb9\u9762\u677f",
				id : "closaLeftTab",
				handler : this.closeLeftTab,
				scope : this
			}]
		})
	},
	showContextMenu : function(f, e, d) {
		if (!this.theMenu) {
			this.theMenu = this.createTabMenu()
		}
		this.doAction(f, e, d);
		this.theMenu.currentTab = e;
		this.theMenu.showAt(d.getXY())
	},
	doAction : function(tabPanel, tab, e) {
		!tab.closable
				? this.theMenu.items.get('closaCurrentTab')
						.disable()
				: this.theMenu.items.get('closaCurrentTab')
						.enable();
		var isDisableAll = true;
		var isDisableRight = true;
		var isDisableLeft = true;
		tabPanel.items.each(function(tab) {
			if (tab.closable)
				isDisableAll = false
		}, this);
		var closableTabs = tabPanel.items.filter('closable',
				true);
		if (isDisableAll) {
			this.theMenu.items.get('closeOtherTab')
					.setDisabled(true)
		} else {
			this.theMenu.items
					.get('closeOtherTab')
					.setDisabled((closableTabs.getCount() == 1 && closableTabs
							.itemAt(0) == tab))
		}
		isDisableAll ? this.theMenu.items.get('closaAllTab')
				.disable() : this.theMenu.items
				.get('closaAllTab').enable();
		!tab.closable
				? this.theMenu.items.get('closaCurrentTab')
						.disable()
				: this.theMenu.items.get('closaCurrentTab')
						.enable();
		var currentIndex = tabPanel.items.indexOf(tab);
		if (currentIndex == this.tabPanel.items.getCount() - 1) {
			this.theMenu.items.get('closaRightTab').disable()
		} else {
			this.theMenu.items.get('closaRightTab').enable()
		}
		for (var i = currentIndex;i < tabPanel.items.getCount()
				- 1; i++) {
			if (tabPanel.items.itemAt(i).closable) {
				isDisableRight = false
			}
		}
		isDisableRight
				? this.theMenu.items.get('closaRightTab')
						.disable()
				: this.theMenu.items.get('closaRightTab')
						.enable();
		for (var i = currentIndex - 1;i > 0; i--) {
			if (tabPanel.items.itemAt(i).closable) {
				isDisableLeft = false
			}
		}
		isDisableLeft ? this.theMenu.items.get('closaLeftTab')
				.disable() : this.theMenu.items
				.get('closaLeftTab').enable()
	},
	closeAllTab : function(d, f) {
		var e = d.parentMenu.currentTab;
		this.tabPanel.items.each(function(a) {
			if (a.closable && a != f) {
				this.tabPanel.remove(a)
			}
		}, this)
	},
	closeTab : function(c) {
		var d = c.parentMenu.currentTab;
		if (d.closable) {
			this.tabPanel.remove(d)
		}
	},
	closeElsetTab : function(c) {
		var d = c.parentMenu.currentTab;
		this.closeAllTab(c, d)
	},
	closeLeftTab : function(g) {
		var h = g.parentMenu.currentTab;
		var f = this.tabPanel.items.indexOf(h) - 1;
		if (f <= 0) {
			return
		}
		var e = this.tabPanel.items.getRange(1, f);
		Ext.each(e, function(a) {
			if (a && a.closable) {
				this.tabPanel.remove(a)
			}
		}, this)
	},
	closeRightTab : function(f) {
		var d = f.parentMenu.currentTab;
		var e = this.tabPanel.items.getRange(
				this.tabPanel.items.indexOf(d) + 1,
				this.tabPanel.items.getCount());
		Ext.each(e, function(a) {
			if (!a || a == d || !a.closable) {
				return
			}
			this.tabPanel.remove(a)
		}, this)
	}
});﻿/**
 * @class Lanyo_Ajax
 * @singleton
 */
Lanyo_Ajax = {
	/**
	 * 蓝源RIA平台的版本号
	 * 
	 * @type String
	 */
	version : "1.0",
	/**
	 * 蓝源RIA平台的名称
	 * 
	 * @type String
	 */
	title : "蓝源Ajax快速开发框架",
	/**
	 * 蓝源RIA平台是否开启权限检查。如果开启了权限检查，在使用CrudPanel或者CrudListPanel的时候，会向后台请求权限的判断
	 * 
	 * @type Boolean
	 */
	permissionCheck : true,
	/**
	 * 如果开启了权限检查，这个参数用来指定请求权限判断的后台地址
	 * 
	 * @type String
	 */
	permissionCheckAction : "permissionCheck.ejf",
	/**
	 * 指定RIA平台使用的EXTJS的代码版本。可选值目前有'ext-2.2'和'ext-3.2'
	 * 
	 * @type String
	 */
	extVersion : 'ext-3.2',
	/**
	 * <p>
	 * 指定RIA平台延迟加载js的请求地址。如果是使用后台加载的话，该参数指定后台返回JS的地址，如果是前台加载js，则可以直接指定为js的地址
	 * 例如：如果项目所有的js都放在/demo-script下 那么这里就指定为script:'/demo-script',
	 * </p>
	 * 
	 * @type String
	 */
	script : 'extApp.ejf?cmd=loadScript&script=',
	/**
	 * RIA平台集成了个性化定制（包括皮肤，前台portal等）的前后台集成，如果要使用该个性化功能，该参数指定了个性化请求和保存地址
	 * 
	 * @type String
	 */
	PersonalityUrl : "manage.ejf",
	/**
	 * 系统自己的css样式目录，比如说头部的图片,背景颜色等等
	 * 
	 * @type String
	 */
	sysSkinPath : null,
	/**
	 * RIA平台针对CRUD集成到CrudPanel和CrudListPanel中和后台请求关联的URL样式。 for
	 * struts2的动态方法调用，使用：return baseUrl+"!"+cmd+".action" 也可以定制自己的请求样式。参考Demo
	 * 
	 * @type String
	 */
	getCfg : function(cfg) {
		return Ext.getObjVal(window.Global.Config, cfg);
	},
	setCfg : function(key, value) {
		var cfg = Lanyo_Ajax.getCfg();
		if (cfg) {
			cfg[key] = value;
		}
	},
	/**
	 * 格式化系统中出现的url。<br/>
	 * 该方法默认使用baseUrl?cmd=cmd来匹配，如果使用struts等，可以自己覆盖该方法，实现自定义的匹配模式
	 * 
	 * @param {String}
	 *            baseUrl 基础url
	 * @param {String}
	 *            cmd 命令名称
	 */
	formatUrl : function(baseUrl, cmd) {
		return Ext.urlAppend(baseUrl, Ext.urlEncode({
							cmd : cmd
						}));
	}
};

Ext.form.Field.prototype.msgTarget = 'side';
// Ext.BLANK_IMAGE_URL =
// String.format('plugins/extjs/{0}/resources/images/default/s.gif',Lanyo_Ajax.extVersion);
Ext.chart.Chart.CHART_URL = String.format(
		'plugins/extjs/{0}/resources/charts.swf', Lanyo_Ajax.extVersion);
Ext.QuickTips.init();

/**
 * lanyo框架,基本包
 */
Ext.namespace("EasyJF.Ext", "Ejf.Ext", "EasyJF.Ext.Msg");

EasyJF.Ext = EasyJF.Ext;
EasyJF.Ext.Msg = EasyJF.Ext.Msg;
/**
 * @class EasyJF.Ext.Msg 对Ext.Msg的包装，加入了一些缺省的设置。
 */
Ext.apply(EasyJF.Ext.Msg, {
			/**
			 * <p>
			 * 对Ext.Msg.alert的包装，加入了一些缺省设置
			 * <li>title默认为'操作提示'</li>
			 * <li>type默认为Ext.Msg.INFO</li>
			 * <li>宽度默认为240</li>
			 * </p>
			 * 
			 * @param {Object/String}
			 *            msg 提示的消息,如果是Object，则认为是自定义的设置对象
			 * @param {String}
			 *            title 提示窗口的标题
			 * @param {String}
			 *            fn callback方法
			 * @param {Object}
			 *            scope callback方法执行的域
			 * @param {Object}
			 *            type 提示的图片，为以下可选值： Ext.MessageBox.INFO
			 *            Ext.MessageBox.WARNING Ext.MessageBox.QUESTION
			 *            Ext.MessageBox.ERROR
			 * 
			 */
			alert : function(msg, title, fn, scope, type) {
				var obj = {
					title : title || '操作提示',
					msg : msg,
					scope : scope || window,
					fn : fn,
					icon : type || Ext.Msg.INFO,
					buttons : Ext.Msg.OK
				};
				if (typeof msg == 'object')
					Ext.apply(obj, msg);
				Ext.Msg.show(obj);
			},

			/**
			 * <p>
			 * 扩展的一个专门用于RIA平台中错误提示的方法，扩展自EasyJF.Ext.Msg.alert方法
			 * <li>type默认为Ext.Msg.ERROR</li>
			 * </p>
			 * 
			 * @param {Object/String}
			 *            msg 提示的消息,如果是Object，则认为是自定义的设置对象
			 * @param {String}
			 *            title 提示窗口的标题
			 * @param {String}
			 *            fn callback方法
			 * @param {Object}
			 *            scope callback方法执行的域
			 */
			error : function(msg, title, fn, scope) {
				var expargs = EasyJF.Ext.Msg.error.length;
				var args = Array.prototype.slice.call(arguments, 0, expargs);
				if (expargs != args.length) {
					if (args.length < expargs) {
						var i = args.length;
						for (i; i < expargs; i++) {
							args.push(null);
						}
						args.push(Ext.Msg.ERROR);
					}
				} else {
					args.push(Ext.Msg.ERROR);
				}
				EasyJF.Ext.Msg.alert.apply(this, args);
			}
		});

/**
 * @class EasyJF.Ext.Window
 * 
 * 显示单例模式的Window,可将自己的面板放入到EasyJF.Ext.Window中。
 * 
 * <pre>
 * <code>
 * //示例：
 * //创建需要在窗口中显示的panel
 * var myshowpanel = new MyShowPanel();
 * //调用工厂方法show来显示窗口
 * EasyJF.Ext.Window.show({
 * 			single : false,
 * 			width : 400,
 * 			height : 160,
 * 			scope : this,
 * 			title : &quot;确认信息&quot;,
 * 			buttons : ['yes', 'no'],
 * 			items : myshowpanel,
 * 			handler : function(btn, win, fp) {
 * 				if (btn == 'yes') {
 * 					//my customer handler
 * 				} else {
 * 					win.hide();
 * 				}
 * 			}
 * 		});
 * </code>
 * </pre>
 * 
 * @singleton
 */
EasyJF.Ext.Window = function() {
	var components = new Ext.util.MixedCollection();
	components.on('add', function(length, o, key) {
				if (length > 50) {
					components.removeAt(0);
				}
			}, this)
	var all = new Ext.util.MixedCollection();
	var buttonText = {
		ok : "确定",
		cancel : "重置",
		yes : "确定",
		no : "取消"
	};
	var buttonHandler = function(button, btn) {
		var win = button.ownerCt.ownerCt;
		Ext.callback(win.handler, win.scope || win, [btn, win,
						win.getComponent(0)]);
		if (win.autoHide)
			win.hide();
	}
	return {
		defaultConfig : {
			maxWin : 5,
			width : 500,
			height : 300,
			modal : true,
			layout : 'fit',
			single : true,
			constrain : true,
			resizable : false,
			buttonAlign : 'center',
			closeAction : 'hide'
		},
		components : components,
		autoDestroyWin : function(win) {
			if (this.all.getCount() > this.defaultConfig.maxWin) {
				win.destroy();
				this.autoRemoveProperty.call(win);
				this.all.remove(win);
			}
		},
		autoRemoveProperty : function() {
			delete this.handler;
			delete this.scope;
			delete this.autoHide;
		},
		destroyComp : function() {
			var args = Array.prototype.slice.call(arguments, 0);
			Ext.each(args, function(c) {
						if (Ext.type(c.destroy) == 'function') {
							c.destroy();
						}
						components.remove(c);
					}, this)
		},

		/**
		 * 调用该方法来显示一个窗口。
		 * 
		 * @param {Object}
		 *            config 配置显示窗口的对象，包括以下配置项：
		 *            <ul>
		 *            <li>single {Boolean} :
		 *            设置是否是单例显示，如果是true，在关闭窗口后会删除窗口中的panel。如果要多次使用该窗口显示同一个panel，single要设置为true。</li>
		 *            <li>width {Integer} : 设置窗口的宽度</li>
		 *            <li>height {Integer} : 设置窗口高度</li>
		 *            <li>scope {Object} : 方法中按钮响应方法的执行域</li>
		 *            <li>title {String} : 窗口的显示名称</li>
		 *            <li>buttons {Array} :
		 *            自定义窗口下显示的按钮，可选值有：'ok','cancel','yes','no'</li>
		 *            <li>items {Object} ： 窗口内要显示的面板panel</li>
		 *            <li>handler {Function} : 窗口下按钮的响应事件,其中传入的参数有：
		 *            <ul>
		 *            <li>btn :点击的btn代码</li>
		 *            <li>win :当前window</li>
		 *            <li>fp ：窗口中的panel</li>
		 *            </ul>
		 *            </li>
		 *            <li>layout {String} : 窗口的布局，默认为fit</li>
		 *            <li>buttonAlign {String} : 窗口下按钮的对齐方式，默认为'center'</li>
		 *            <li>closeAction {String} : 窗口关闭事件，默认为'hide'</li>
		 *            </ul>
		 */
		show : function(obj) {
			var config = Ext.apply({}, obj, this.defaultConfig);
			var win = this.getFreeWin(config);
			win.on('beforehide', this.autoDestroyWin, this, {
						single : true
					});

			win.on('hide', function(win) {
						if (config.single) {
							win.remove(0, true);
							components.remove(win.getComponent(0));
							this.autoRemoveProperty.call(win);
						} else {
							var cmp = win.remove(0, false);
							cmp.hide();
							cmp.getEl().appendTo(Ext.getBody());
						}
					}, this, {
						single : true
					});

			win.show();
			win.setTitle(config.title);
			win.setWidth(config.width);
			if (config.height == 'auto') {
				win.autoHeight = true;
				win.syncSize.defer(1000, win);
			} else {
				win.autoHeight = false;
				win.setHeight(config.height);
			}
			win.center();
		},
		buildComponent : function(cmp, compId) {
			if (components.get(compId)) {
				return components.get(compId);
			} else if (Ext.type(cmp) == 'object') {
				var component = null;
				if (cmp.constructor.prototype.ctype == 'Ext.Component') {
					component = cmp;
				} else if (cmp.constructor == Object) {
					component = Ext.ComponentMgr.create(cmp, 'panel');
				} else {
					component = cmp;
				}
				if (compId) {
					components.add(compId, component);
				}
				return component;
			}
		},
		updateButtons : function(win, buttons) {
			if (Ext.isArray(buttons) && buttons.length) {
				Ext.each(win.buttons, function(btn) {
							if (buttons.indexOf(btn.id) >= 0) {
								btn.show();
							} else {
								btn.hide();
							}
						}, win);
			} else {
				Ext.each(win.buttons, function(btn) {
							btn.hide();
						}, win);
			}
		},
		getFreeWin : function(config) {
			var win = null;
			all.each(function(o) {
						if (o.hidden) {
							win = o;
							return false;
						}
					}, this);
			var cmp = config.items;
			var buttons = config.buttons;
			var handler = config.handler;
			var scope = config.scope;
			var autoHide = config.autoHide;
			Ext.del(config, 'buttons', 'items', 'handler', 'autoHide', 'scope');
			cmp = this.buildComponent(cmp, config.compId);
			var win = win || this.getWin(Ext.apply(config, {
						buttons : this.getButtons.call(this)
					}));

			win.autoHide = autoHide;
			win.handler = handler;
			win.scope = scope;

			this.updateButtons(win, buttons);
			if (win.items && win.items.getCount() > 0)
				win.remove(0, false);
			if (cmp.hidden)
				cmp.show();
			win.add(cmp);
			return win;
		},
		all : all,
		getWin : function(config) {
			var win = new Ext.Window(Ext.apply(config, {
						manager : this.group
					}));
			all.add(win);
			return win;
		},
		YESNO : ['yes', 'no'],
		YESNOCANCEL : ['yes', 'cancel', 'no'],
		YES : ['yes'],
		getButtons : (function() {
			return [{
						text : buttonText['yes'],
						id : 'yes',
						handler : buttonHandler
								.createDelegate(this, ['yes'], 1),
						scope : this
					}, {
						text : buttonText['cancel'],
						id : 'cancel',
						handler : buttonHandler.createDelegate(this,
								['cancel'], 1),
						scope : this
					}, {
						text : buttonText['no'],
						id : 'no',
						handler : buttonHandler.createDelegate(this, ['no'], 1),
						scope : this
					}]
		})
	}
}();

/**
 * @class Ext.form.LabelField
 * @extends Ext.form.Field
 * 
 * 用于在FORM表单用div显示数据,类似于Ext的Label。但在使用方法上还是有一些区别。
 * 
 * <pre>
 * <code>
 *  //例子：
 *  {xtype:&quot;labelfield&quot;,value:&quot;标签名称&quot; /&gt;
 * </pre>
 * </code>
 * 
 */
Ext.form.LabelField = Ext.extend(Ext.form.Field, {
			// private
			defaultAutoCreate : {
				tag : 'div'
			},
			/**
			 * @cfg {String} fieldClass 默认的字css
			 */
			fieldClass : "x-form-item-label",
			// 对齐
			style : "padding-top:3px",
			onRender : function(ct, position) {
				Ext.form.LabelField.superclass.onRender.call(this, ct, position);
				this.el.dom.name = this.initialConfig.name;
				this.el.dom.value = '';
			},
			/**
			 * 对value的显示进行渲染
			 * @cfg {function} renderer
			 */
			/**
			 * 设置LabelField的显示值 如果有renderer,则会先调用renderer,然后在显示
			 * @param {Object} v
			 */
			setValue : function(v) {
				Ext.form.LabelField.superclass.setValue.call(this, v);
				var t = v;
				if (this.renderer)
					t = this.renderer(v);
				if (typeof t == window.undefined)
					t = '';
				if(this.el)this.el.update(t);	
			},
			/**
			 * @cfg function markInvalid 覆盖父类Ext.emptyFn
			 */
			markInvalid : Ext.emptyFn,
			/**
			 * @cfg function clearInvalid 覆盖父类Ext.emptyFn
			 */
			clearInvalid : Ext.emptyFn
		});
Ext.reg('labelfield', Ext.form.LabelField);

/**
 * @class Ext.form.LabelFieldReadonly
 * @extends Ext.form.LabelField
 * 
 * 只读的LabelField,Ext.form.LabelField中的getValue,是可以通过getValue来获取设置的值，而LabelFieldReadonly无法获得去值的!
 */
Ext.form.LabelFieldReadonly = Ext.extend(Ext.form.LabelField, {
			getValue : Ext.emptyFn
		});
Ext.reg('labelfieldreadonly', Ext.form.LabelField);

/**
 * @class Ext.form.SearchField
 * @extends Ext.form.TwinTriggerField
 * 
 * 三态的通用查询控件
 * 
 * <pre>
 * <code>
 * Ext.onReady(function() {
 * 			var field = new Ext.form.SearchField();
 * 			new Ext.Viewport({
 * 						layout : 'border',
 * 						items : [{
 * 									xtype : &quot;panel&quot;,
 * 									region : &quot;center&quot;,
 * 									items : [field]
 * 								}]
 * 					});
 * 			field.on(&quot;search&quot;, function(c, v, e) {
 * 						alert(&quot;do my search:&quot; + v)
 * 					}, this);
 * 			field.on(&quot;clear&quot;, function(c, v, e) {
 * 						alert(&quot;do my clear:&quot; + v)
 * 					}, this);
 * 		});
 * </code>
 * </pre>
 */
Ext.form.SearchField = Ext.extend(Ext.form.TwinTriggerField, {
	// private
	onSearch : function() {
		this.hasSearch = true;
	},
	// private
	onClear : function() {
		if (this.hasSearch) {
			this.hasSearch = false;
			this.el.dom.value = '';
			this.triggers[0].hide();
			this.focus();
		}
	},
	initComponent : function() {
		Ext.form.SearchField.superclass.initComponent.call(this);
		this.addEvents(
				/**
				 * @event clear 当点击查询图标时触发，在该事件中自定义查询的方法。
				 * @param {Ext.form.SearchField}
				 *            三态查询控件自己
				 * @param {String}
				 *            value 在查询控件中输入的查询条件
				 * @param {Ext.EventObject}
				 *            e 事件对象
				 */
				'search',
				/**
				 * @event clear 当点击清空查询条件图标时触发，在该事件中自定义清除查询的方法。
				 * @param {Ext.form.SearchField}
				 *            三态查询控件自己
				 * @param {String}
				 *            value 在查询控件中清除的查询条件
				 * @param {Ext.EventObject}
				 *            e 事件对象
				 */
				'clear');
		this.on('specialkey', function(f, e) {
			if (e.getKey() == e.ENTER && !(e.shiftKey || e.ctrlKey || e.altKey)) {
				this.onSearch(this, this.getValue(), e);
			}
		}, this);
		this.on({
					scope : this,
					clear : this.onClear,
					search : this.onSearch
				});
	},
	validationEvent : false,
	validateOnBlur : false,
	hideTrigger1 : true,
	trigger1Class : 'x-form-clear-trigger',
	trigger2Class : 'x-form-search-trigger',
	width : 180,
	hasSearch : false,
	paramName : 'query',
	onTrigger1Click : function(e) {
		this.fireEvent("clear", this, this.getValue(), e);
	},
	onTrigger2Click : function(e) {
		this.fireEvent("search", this, this.getValue(), e);
	}
});

/**
 * 搜索框<br/> 该搜索框可以绑定在一个Store上，并通过search和clear方法，来控制store的刷新和查询等。<br/>
 * 
 * @class SearchField
 * @extends Ext.form.TwinTriggerField
 * @xtype searchfield
 */
EasyJF.Ext.SearchField = Ext.extend(Ext.form.SearchField, {
			/**
			 * @cfg {String} paramName 搜索框在查询时，把需要搜索的数据绑定到store的查询名称
			 */
			/**
			 * @cfg {Ext.data.Store} store 搜索框绑定的store对象。
			 */
			validationEvent : false,
			validateOnBlur : false,
			/**
			 * @cfg {String} emptyText 搜索框默认显示
			 */
			emptyText : '内容关键字......',
			onClear : function() {
				if (this.hasSearch) {
					EasyJF.Ext.SearchField.superclass.onClear.call(this);
					var s = this.store;
					delete s.baseParams[this.paramName];
					s.load();
				}
			},
			onSearch : function() {
				var v = this.getRawValue();
				if (v.length < 1)
					return this.onTrigger1Click();
				// this.store.removeAll();
				this.store.baseParams = {};
				this.store.baseParams[this.paramName] = v;
				var o = {
					start : 0,
					searchType : 'simple'
				};
				this.store.reload({
							params : o,
							callback : function(rs) {
								if (!rs || rs.length < 1) {
									Ext.Msg.alert("提示", "没有找到符合条件的记录！");
								}
							}
						});
				this.hasSearch = true;
				this.triggers[0].show();
				this.focus();
			},
			initComponent : function() {
				if (!this.store.baseParams) {
					this.store.baseParams = {};
				}
				EasyJF.Ext.SearchField.superclass.initComponent.call(this);
			}
		});
Ext.reg("searchfield", EasyJF.Ext.SearchField);

/**
 * CkEditor编辑器Ext集成
 * @class EasyJF.Ext.CkEditor
 * @extends Ext.form.TextArea
 */
EasyJF.Ext.CkEditor = Ext.extend(Ext.form.TextArea,{
	editorCfg:{},
	onResize : function(t,w,h){
		var ed ;
		if(ed = this.getEditor()){
			ed.resize('100%',h-5);
		}
	},
	editDataReadyHanlder:function(){
		this.fireEvent('editdataready',this,this.getEditor(),this.getEditor().getData());
	},
	setValue:function(v,callback){
		EasyJF.Ext.CkEditor.superclass.setValue.call(this,v);
		var ed;
		if(ed = this.getEditor()){
			var fn = this.editDataReadyHanlder;
			if(Ext.isFunction(callback)){
				callback.createSequence(fn,this);
			}else{
				callback = fn.createDelegate(this);
			}
			ed.setData.defer(1,ed,[v,callback]);
		}else{
			
		}
	},
	getValue:function(){
		var ed;
		if(ed = this.getEditor()){
			return ed.getData();
		}else{
			return EasyJF.Ext.CkEditor.superclass.getValue.call(this);
		}
	},
	getEditor:function(){
		if(this.el){
			var id = this.el.id , ed = null;
			if(window.CKEDITOR && CKEDITOR.instances &&
				(ed = CKEDITOR.instances[id])) 
					return ed;
		}
	},
	createEditor:function(){
		var id = this.el.id;
		var size = this.el.getSize();
		var h = Math.max(size.height,this.height);
		var editor = CKEDITOR.replace(id,Ext.apply({
			height:h
		},this.editorCfg));
		var em = this;
		editor.on('instanceReady',function(){
			em.fireEvent.call(em,'instanceReady');
			editor.resize('100%',h-5);
		});
	},
	afterRender:function(){
		this.addEvents('editdataready','instanceReady');
		EasyJF.Ext.CkEditor.superclass.afterRender.call(this);
		this.on('resize',this.onResize,this);
		this.createEditor.defer(1,this);
	}
});
Ext.reg('ckeditor',EasyJF.Ext.CkEditor); 
/**
 * @class EasyJF.Ext.FormWindow
 * @extends Ext.Window
 * 
 * 扩展的包含表单的窗口组件。<br/> 主要的扩展是在窗口关闭的时候，去检查表单是否已经做了修改，如果修改了，可以提示是否保存表单内容。<br/>
 * 要使用该组件，必须保证该窗口内的第一个组件就是form表单。及window.getComponent(0)就是formPanel.<br/>
 * 
 */
EasyJF.Ext.FormWindow = Ext.extend(Ext.Window, {
	/**
	 * @cfg {EasyJF.Ext.CrudPanel} service [option]
	 *      如果该FormWindow是CRUDpanel的一部分，则需要把该CrudPanel传入，在调用保存方法的时候，使用CrudFunction的save方法。
	 */
	/**
	 * @cfg {Function} saveFunction [option]
	 *      可以配置一个保存方法，在调用保存方法的时候，使用该放来来处理保存表单的动作。
	 *      <ul>
	 *      传入参数
	 *      <li>FormPanel 保存的表单</li>
	 *      </ul>
	 */
	/**
	 * @cfg {Boolean} confirmSave 在关闭的时候是否需要提示保存表单内容。默认为false。
	 */
	confirmSave : false,
	checkFormDirty : function() {
		var fp = this.getComponent(0);
		if (fp && fp.form)
			return fp.form.isDirty();
		else
			return false;
	},
	hide : function(animateTarget, cb, scope) {
		if (this.hidden || this.fireEvent("beforehide", this) === false)
			return;
		if (this.confirmSave && this.checkFormDirty()) {
			Ext.MessageBox.show({
						title : '是否要保存录入的数据?',
						msg : '您所编辑的表单中含有末保存的数据,是否要保存修改后的内容?',
						buttons : Ext.Msg.YESNOCANCEL,
						fn : function(btn) {
							if (btn == "no") {
								EasyJF.Ext.FormWindow.superclass.hide.call(
										this, animateTarget, cb, scope);
							} else if (btn == "yes") {
								if (this.crudService) {
									this.crudService.save(
													EasyJF.Ext.FormWindow.superclass.hide
															.createDelegate(
																	this,
																	[
																			animateTarget,
																			cb,
																			scope]),
													this.autoClose);
								} else if (Ext.isFunction(this.saveFunction)) {
									this.saveFunction(this.getComponent(0));
								}
							} else if (btn == "cancel") {
							}
						},
						icon : Ext.MessageBox.QUESTION,
						scope : this
					});
		} else {
			EasyJF.Ext.FormWindow.superclass.hide.call(this, animateTarget, cb,
					scope);
		}
	}
});

/**
 * @class EasyJF.Ext.CascadeForm
 * @extends Ext.FormPanel
 * 
 * 主从表单，主要用于Form+EditorGridPanel[+]的情况。<br/>
 * 比如销售出库单就是一个典型的主从表单。包括出库单的相关信息表单和出库商品明细可编辑列表。<br/>
 * 
 * <pre>
 * <code>
 * var formPanel = new EasyJF.Ext.CascadeForm({
 * 	//支持回车键导航
 * 	enterNavigationKey : true,
 * 	//组件导航顺序
 * 	navigationSequences : ['client', 'deliveryTime', this.editGrid.id],
 * 	//创建工具栏
 * 	tbar : this.createFormToolBar(),
 * 	//创建北部表单（即主表单信息）
 * 	buildNorthForm : function() {
 * 		var Uitl = EasyJF.Ext.Util;
 * 		return {
 * 			height : 70,
 * 			frame : true,
 * 			border : false,
 * 			layout : 'form',
 * 			style : 'padding:2px;',
 * 			bodyStyle : 'padding:5px;',
 * 			defaults : {
 * 				anchor : '-20'
 * 			},
 * 			items : [{
 * 						xtype : &quot;hidden&quot;,
 * 						name : &quot;id&quot;
 * 					}, Uitl.buildColumnForm(4, {
 * 								fieldLabel : '编号',
 * 								name : 'sn',
 * 								allowBlank : false,
 * 								readOnly : true
 * 							}, Ext.apply({}, {
 * 										allowBlank : false,
 * 										choiceValue : function(o) {
 * 											var fp = formPanel.form;
 * 											if (!fp
 * 													.findField(&quot;consigneeAddress&quot;)
 * 													.getValue()) {
 * 												fp
 * 														.findField(&quot;consigneeAddress&quot;)
 * 														.setValue(o.address
 * 																|| &quot;&quot;);
 * 											}
 * 											if (!fp.findField(&quot;consigneePhone&quot;)
 * 													.getValue()) {
 * 												fp.findField(&quot;consigneePhone&quot;)
 * 														.setValue(o.tel || &quot;&quot;);
 * 											}
 * 										}.createDelegate(this)
 * 									}, ConfigConst.CRM.client), {
 * 								xtype : &quot;datefield&quot;,
 * 								fieldLabel : '下单时间',
 * 								name : 'buyTime',
 * 								format : &quot;Y-m-d&quot;,
 * 								allowBlank : false,
 * 								value : new Date()
 * 							}, {
 * 								xtype : &quot;datefield&quot;,
 * 								fieldLabel : '交货时间',
 * 								name : 'deliveryTime',
 * 								format : &quot;Y-m-d&quot;,
 * 								allowBlank : false
 * 							}), Uitl.buildColumnForm(3, {
 * 								panelCfg : {
 * 									columnWidth : .25
 * 								},
 * 								fieldLabel : '联系电话',
 * 								name : 'consigneePhone',
 * 								allowBlank : false
 * 							}, {
 * 								panelCfg : {
 * 									columnWidth : .25
 * 								},
 * 								fieldLabel : '联系地址',
 * 								name : 'consigneeAddress',
 * 								allowBlank : false
 * 							}, {
 * 								panelCfg : {
 * 									columnWidth : .5
 * 								},
 * 								fieldLabel : '备注',
 * 								name : 'remark',
 * 								allowBlank : false
 * 							})]
 * 		}
 * 	},
 * 	//创建南部表单，即主表单附属信息
 * 	buildSouthForm : function() {
 * 		return {
 * 			height : 45,
 * 			border : false,
 * 			frame : true,
 * 			region : &quot;south&quot;,
 * 			style : 'padding:1px;',
 * 			items : [EasyJF.Ext.Util.twoColumnPanelBuild(3, Ext.apply({}, {
 * 								fieldLabel : '业务员'
 * 							}, ConfigConst.CRM.seller), {
 * 						xtype : &quot;labelfield&quot;,
 * 						fieldLabel : '制单',
 * 						name : &quot;inputUser&quot;,
 * 						value : {
 * 							trueName : &quot;$!{session.EASYJF_SECURITY_USER.trueName}&quot;
 * 						},
 * 						renderer : objectRender
 * 					}, {
 * 						xtype : &quot;labelfield&quot;,
 * 						fieldLabel : '审核',
 * 						name : &quot;auditor&quot;,
 * 						renderer : objectRender
 * 					})]
 * 		}
 * 	},
 * 	//创建从表单，即可编辑表格
 * 	buildContentForm : function() {
 * 		return editGrid;
 * 	}
 * });
 * </code>
 * </pre>
 */
EasyJF.Ext.CascadeForm = Ext.extend(Ext.FormPanel, {
			/**
			 * @cfg {String} layout Form表单内的布局
			 */
			layout : 'border',
			/**
			 * @cfg {Array} formElements 如果是在border布局下，指定需要哪些region组件。<br/>
			 *      在这里设置了region，才会去调用对应的buildXXXForm方法。
			 */
			formElements : ['west', 'north', 'east', 'south'],
			/**
			 * 构建西部表单面板
			 */
			buildWestForm : function() {
			},
			/**
			 * 构建北部表单面板
			 */
			buildNorthForm : function() {
			},
			/**
			 * 构建东部表单面板
			 */
			buildEastForm : function() {
			},
			/**
			 * 构建南部表单面板
			 */
			buildSouthForm : function() {
			},
			/**
			 * 构建中心表单面板
			 */
			buildContentForm : function() {
			},
			/**
			 * 获取面板中可以编辑的组件
			 * 
			 * @return {Array} cmps 得到表单中可编辑组件的数组。
			 */
			getEditCmps : function() {
				return this.editCmps = this.editCmps || [];
			},

			/**
			 * 添加可以编辑的组件<br/> 在主从表单中，可能存在一个主表单+多个可编辑列表的情况。<br/>
			 * 如果是存在多个可编辑列表的情况，可以使用该方法把所有可编辑列表添加进去。<br/>
			 * 只有添加为可编辑组件的组件，在主表单提交的时候，才会从这些可编辑列表中取得表单值。<br/>
			 * 
			 * @param {Component/Array[]
			 *            Component} cmp 可编辑组件实例。
			 */
			addEditCmps : function(cmp) {
				Ext.each(arguments, function(cmp) {
							if (Ext.isArray(cmp)) {
								this.addEditCmps(cmp);
								return true;
							}
							if (!this.containsEditCmp(cmp)) {
								this.getEditCmps().push(cmp);
							}
						}, this);
			},
			// private
			containsEditCmp : function(cmp) {
				return this.getEditCmps().indexOf(cmp) >= 0;
			},
			/**
			 * 获取可编辑组件的值<br/>
			 * EditorGridPanel，EditorTreeGridPanel都已经实现了getRowsValues方法。<br/>
			 * 如果是要实现自己的可编辑组件，要在表单提交的时候能够得到其中的值，也需要实现一个getRowsValues()的方法。<br/>
			 * 
			 * @return {Object} v 得到的所有可编辑组件的值的对象。
			 */
			getEditorCmpValues : function() {
				var values = {};
				Ext.each(this.getEditCmps(), function(cmp) {
							var rvs = cmp.getRowsValues();
							if (rvs) {
								Ext.apply(values, rvs);
							}
						}, this);
				return values;
			},
			/**
			 * 获取整个表单的数据，包括表单中所有可编辑组件的值。
			 * 
			 * @return {Object} o 得到的主表单的值对象。
			 */
			getValues : function() {
				var values = this.getForm().getValues();
				var cmpValues = this.getEditorCmpValues();
				Ext.apply(values, cmpValues);
				return values;
			},
			/**
			 * 设置表单数据
			 * 
			 * @param {Object}
			 *            values
			 */
			setValues : function(values) {
				this.getForm().setValues(values);
			},

			// private
			onBeforeSubmit : function() {
				var values = this.getEditorCmpValues();
				this.getForm().baseParams = values;
			},
			/**
			 * 提交表单数据
			 * 
			 * @param {Object}
			 *            options
			 */
			submit : function(options) {
				if (this.onBeforeSubmit() !== false) {
					this.getForm().submit(options);
				}
			},
			// private
			beforeDestroy : function() {
				this.editCmps = null;
				EasyJF.Ext.CascadeForm.superclass.beforeDestroy.call(this);
			},
			/**
			 * @cfg {Function} buildContentForm 创建可编辑组件的方法。
			 */
			/**
			 * 创建Form主体部分
			 * 
			 * 可以在该方法中创建所有主从表单中所需要的可编辑组件。
			 * 
			 * @return {Component} cf 创建的可编辑的组件。
			 */
			createContent : function() {
				var cf = this.buildContentForm();
				this.addEditCmps(cf);
				return cf;
			},
			initComponent : function() {
				this.items = [{
							layout : 'fit',
							region : 'center',
							border : false,
							items : this.createContent()
						}]
				for (var i = 0; i < this.formElements.length; i++) {
					var en = this.formElements[i], cmp;
					var eName = en.substring(0, 1).toUpperCase()
							+ en.substring(1);
					if (cmp = this[String.format('build{0}Form', eName)]()) {
						cmp.region = en;
						this.items.push(cmp);
					}
				}
				EasyJF.Ext.CascadeForm.superclass.initComponent.call(this);
			}
		});
/**
 * @class EasyJF.Ext.TreeCascadePanel
 * @extends Ext.Panel
 * 
 * 左右关联的一种组件包装。该组件在CRUDPanel的基础上，在主列表页面中，左边加入了一个树面板。<br/>
 * 在点击左边树中节点后，会把选中的树节点传入到右边列表中，并完成相应动作。<br/>
 * 
 * 该组件常用在呈树状结构的业务组件上，比如部门、产品分类、角色等。<br/>
 * 该组件也不仅限制于部门这种对象，也可用在任何树面板+任何面板，且点击树节点有联动效果的组件组件上。
 * 
 * <pre>
 * <code>
 * DepartmentPanel = Ext.extendX(EasyJF.Ext.TreeCascadePanel,
 * 		function(superclass) {
 * 			return {
 * 				queryParam : 'parentId',
 * 				treeCfg : {
 * 					title : &quot;部门树&quot;,
 * 					rootText : '所有部门',
 * 					rootIconCls : 'treeroot-icon',
 * 					loader : Global.departmentLoader
 * 				},
 * 				onTreeClick : function(node) {
 * 					var id = (node.id != 'root' ? node.id : &quot;&quot;);
 * 					this.list.parent = {
 * 						id : id,
 * 						title : node.text
 * 					};
 * 					this.list.store.baseParams.parent = id;
 * 					superclass.onTreeClick.apply(this, arguments);
 * 				},
 * 				getPanel : function() {
 * 					if (!this.panel) {
 * 						this.panel = new DepartmentListPanel();
 * 						this.panel.tree = this.tree;
 * 						this.list = this.panel.grid;
 * 					}
 * 					return this.panel;
 * 				}
 * 			}
 * 		});
 * </code>
 * </pre>
 */
EasyJF.Ext.TreeCascadePanel = Ext.extend(Ext.Panel, {
	/**
	 * @cfg {Object} treeCfg 定义列表左边树的结构
	 */
	treeCfg : {},
	/**
	 * @cfg {String} layout 定义主页面布局。默认为hbox
	 */
	layout : 'hbox',
	/**
	 * @cfg {Boolean} border 定义主页面边框。默认为false
	 */
	border : false,
	/**
	 * @cfg {Object} layoutConfig 定义布局属性。默认为align:'stretch'
	 */
	layoutConfig : {
		align : 'stretch'
	},
	/**
	 * @cfg {String} queryParam 定义当点击树节点后，传入到list中作为查询条件的参数的传入名称。默认为'type'<br/>
	 *      例如，如果点击某一个treeNode，该节点id为123，相当于在列表store.baseParams中加入了{type:123}的查询参数。
	 */
	queryParam : 'type',
	/**
	 * @cfg {Object} defaultstreeCfg 默认的树配置参数
	 */
	defaultstreeCfg : {
		width : 200,
		dataUrl : '',
		rootText : 'root',
		rootId : 'root',
		loader : null,
		rootVisible : true
	},
	/**
	 * 得到主面板，即左边列表面板，常用CrudPanel。
	 * 
	 * @return {Object} panel 左边面板对象
	 */
	getPanel : function() {
		return this.panel;
	},
	/**
	 * 得到树面板
	 * 
	 * @return {Object} tree 树面板对象
	 */
	getTree : function() {
		return this.tree;
	},
	/**
	 * 得到列表对象。如果主面板单纯的是一个GridPanel，则直接返回该面板，如果主面板是一个EasJF.Ext.CrudPanel，则返回其中的grid。如果主面板不是gridPanel，但是其grid属性对应了一个grid，则返回该grid。
	 * 
	 * @return {Object} grid 返回主面板中能访问到的grid对象。用于传入节点参数
	 */
	getGrid : function() {
		if (this.panel instanceof Ext.grid.GridPanel)
			return this.panel;
		else if (this.panel instanceof EasyJF.Ext.CrudPanel) {
			return this.panel.grid;
		} else if (this.panel && this.panel.grid) {
			return this.panel.grid;
		}
	},
	/**
	 * 创建树面板对象。
	 * 
	 * @return {Object} 返回创建好的树面板对象。
	 */
	createTree : function() {
		var cfg = Ext.apply({}, this.treeCfg, this.defaultstreeCfg);
		var rootId = cfg.rootId;
		var rootText = cfg.rootText;
		var dataUrl = cfg.dataUrl;
		var treeLoader = cfg.loader;
		var iconCls = cfg.rootIconCls;

		delete cfg['rootId'], delete cfg['rootText'], delete cfg['dataUrl'], delete cfg['loader'], cfg['rootIconCls'];

		var tree = new Ext.tree.TreePanel(Ext.apply({
					tools : [{
								id : "refresh",
								handler : function() {
									this.tree.root.reload();
								},
								scope : this
							}],
					style : 'padding-right:1px;padding-top:1px;',
					root : new Ext.tree.AsyncTreeNode({
								id : rootId,
								iconCls : iconCls,
								text : rootText
							}),
					loader : treeLoader || new Ext.tree.TreeLoader({
								dataUrl : dataUrl
							})
				}, cfg));
		tree.on({
					scope : this,
					click : this.onTreeClick
				});
		return tree;
	},
	/**
	 * 当点击了树节点后，重新加载主面板中列表数据
	 * 
	 * @param {Object}
	 *            id 传入节点id
	 * @param {Object}
	 *            node 选中的节点数据。
	 */
	reloadGrid : function(id, node) {
		var g = this.getGrid();
		if (g) {
			g.getStore().baseParams[this.queryParam] = (id == 'root')
					? null
					: id;
			g.getStore().load();
		}
	},
	/**
	 * 当点击了树节点后的响应事件<br/> 默认为调用reloadGrid方法来刷新主面板中列表的数据。<br/>
	 * 子类可以通过重写该方法来提供自己的响应事件。
	 * 
	 * @param {Object}
	 *            node 点击的节点对象
	 * @param {Ext.EventObject}
	 *            eventObject 点击事件。
	 */
	onTreeClick : function(node, eventObject) {
		this.reloadGrid(node.id, node);
	},
	// private
	beforeDestroy : function() {
		Ext.destroy(this.panel, this.tree);
		delete this.panel;
		delete this.tree;
		EasyJF.Ext.TreeCascadePanel.superclass.beforeDestroy.call(this);
	},
	initComponent : function() {
		this.tree = this.createTree();
		this.items = [this.tree, Ext.apply(this.getPanel(), {
							flex : 1
						})];
		EasyJF.Ext.TreeCascadePanel.superclass.initComponent.call(this);
	}
});

/**
 * @class EasyJF.Ext.CrudFunction
 * 
 * 基础的添删改查业务支持类。<br/> 该类支持CrudPanel和CrudListPanel后端业务实现。
 */
EasyJF.Ext.CrudFunction = {
	/**
	 * @cfg {Boolean} exportData 业务是否支持导出Excel功能（是否显示导出excel按钮）。默认不显示。
	 */
	exportData : false,
	/**
	 * @cfg {Boolean} importData 业务是否支持导入excel数据功能（是否显示导入excel按钮）。默认不显示。
	 */
	importData : false,
	/**
	 * @cfg {Boolean} printData 业务是否支持列表打印功能（是否显示打印列表按钮）。默认不显示。
	 */
	printData : false,
	/**
	 * @cfg {Boolean} clearData 业务是否支持清除上次查询功能（是否显示清除查询按钮）。默认不显示。
	 */
	clearData : false,
	/**
	 * @cfg {Boolean} allowSearch 业务是否支持查询功能（是否显示查询按钮）。默认支持。
	 */
	allowSearch : true,
	/**
	 * @cfg {Boolean} showMenu 业务是否支持在列表页中支持右键功能菜单。默认支持。
	 */
	showMenu : true,
	/**
	 * @cfg {Boolean} showAdd 业务是否支持添加功能（是否显示添加按钮）。默认支持。
	 */
	showAdd : true,
	/**
	 * @cfg {Boolean} showAdd 业务是否支持编辑功能（是否显示编辑按钮）。默认支持。
	 */
	showEdit : true,
	/**
	 * @cfg {Boolean} showRemove 业务是否支持删除功能（是否显示删除按钮）。默认支持。
	 */
	showRemove : true,
	/**
	 * @cfg {Boolean} showView 业务是否支持查看明细功能（是否显示查看按钮）。默认支持。
	 */
	showView : true,
	/**
	 * @cfg {Boolean} showRefresh 业务是否支持页面列表刷新功能（是否显示刷新按钮）。默认支持。
	 */
	showRefresh : true,
	/**
	 * @cfg {Boolean} showSearchField 业务是否支持内容查询功能（是否显示内容查询组件）。默认支持。
	 */
	showSearchField : true,
	/**
	 * @cfg {Boolean} batchRemoveMode 业务是否支持批量删除模式。默认支持。
	 */
	batchRemoveMode : false,
	/**
	 * @cfg {Boolean} autoLoadGridData 是否在列表加载后自动加载表格数据。默认支持。
	 */
	autoLoadGridData : true,
	/**
	 * @cfg {Boolean} columnLock 是否支持表格列锁定。默认不支持。
	 */
	columnLock : false,
	/**
	 * @cfg {Boolean} summaryGrid 是否开启列表统计功能。默认不支持。
	 */
	summaryGrid : false,
	/**
	 * @cfg {Boolean} dirtyFormCheck 是否自动检查编辑表单中的数据项已经修改。默认支持。
	 */
	dirtyFormCheck : true,
	/**
	 * @cfg {Integer} operatorButtonStyle 添删改查页面功能按钮的显示样式。有以下可选项：
	 *      <ul>
	 *      <li>1:为图文混合</li>
	 *      <li>2:为只显示文字</li>
	 *      <li>3:为只显示图标</li>
	 *      </ul>
	 */
	operatorButtonStyle : 1,
	/**
	 * @cfg {Boolean} customizeQueryObject 业务是否支持自定义查询，默认不支持。
	 */
	customizeQueryObject : false,
	/**
	 * @cfg {String} queryObjectName 如果开启了支持自定义条件查询，设置自定义查询对象的名称。
	 */
	queryObjectName : null,
	/**
	 * @cfg {Integer} winWidth 默认的【添加/修改/查看】窗口的宽度
	 */
	winWidth : 500,
	/**
	 * @cfg {Integer} winHeight 默认的【添加/修改/查看】窗口的高度
	 */
	winHeight : 400,
	/**
	 * @cfg {Integer} winHeight 默认的【添加/修改/查看】窗口的名称
	 */
	winTitle : "数据管理",
	/**
	 * @cfg {Integer} pageSize 业务列表中默认的分页页数。
	 */
	pageSize : 10,
	/**
	 * @cfg {Boolean} pagingToolbar 在业务列表中是否显示分页工具栏。
	 */
	pagingToolbar : true,
	/**
	 * @cfg {Boolean} defaultCmd
	 *      是否使用默认的list命令。如果是true，列表的命令是this.baseUrl+'cmd=list'，如果是false，列表直接使用baseUrl。
	 */
	defaultCmd : true,
	/**
	 * @cfg {Function} viewSave 用来处理视图查看时，保存按钮的回调函数。
	 */
	viewSave : Ext.emptyFn,
	initComponent : Ext.emptyFn,
	/**
	 * @cfg {linkRender} linkRender
	 *      默认的linkRender，方便在grid中直接使用renderer:this.linkRender。
	 */
	linkRender : EasyJF.Ext.Util.linkRenderer,
	/**
	 * @cfg {imgRender} imgRender
	 *      默认的imgRender，方便在grid中直接使用renderer:this.imgRender。
	 */
	imgRender : EasyJF.Ext.Util.imgRender,
	/**
	 * @cfg {booleanRender} booleanRender
	 *      默认的booleanRender，方便在grid中直接使用renderer:this.booleanRender。
	 */
	booleanRender : EasyJF.Ext.Util.booleanRender,
	/**
	 * @cfg {dateRender} dateRender
	 *      默认的dateRender，方便在grid中直接使用renderer:this.dateRender。
	 */
	dateRender : EasyJF.Ext.Util.dateRender,
	/**
	 * @cfg {objectRender} objectRender
	 *      默认的objectRender，方便在grid中直接使用renderer:this.objectRender。
	 */
	objectRender : EasyJF.Ext.Util.objectRender,
	/**
	 * @cfg {typesRender} typesRender
	 *      默认的typesRender，方便在grid中直接使用renderer:this.typesRender。
	 */
	typesRender : EasyJF.Ext.Util.typesRender,
	/**
	 * @cfg {readOnlyRender} readOnlyRender
	 *      默认的readOnlyRender，方便在grid中直接使用renderer:this.readOnlyRender。
	 */
	readOnlyRender : EasyJF.Ext.Util.readOnlyRender,
	/**
	 * @cfg {operaterRender} operaterRender
	 *      默认的operaterRender，方便在grid中直接使用renderer:this.operaterRender。
	 */
	operaterRender : EasyJF.Ext.Util.operaterRender,
	/**
	 * @cfg {Boolean} singleWindowMode 是否使用单例窗口模式。<br/>
	 *      在CrudPanel或者CrudListPanel中，点击【添加/修改/查看】按钮时弹出的窗口使用的都是GlobalWindow。<br/>
	 *      如果在一个添加窗口中要使用EasyJF.Ext.Util.addObject/EasyJF.Ext.Util.editObject/EasyJF.Ext.Util.viewObject来打开<br/>
	 *      其他的模块的【添加/修改/查看】窗口，就会使用对应模块的panel来覆盖GlobalWindow的内容。<br/>
	 *      所以，如果在两个互相调用的模块，必须设置某一方的singleWindowMode为true。
	 */
	singleWindowMode : false,
	/**
	 * @type {String}  gridSelModel grid的选择模式(checkbox/row)<br/>
	 * checkbox使用Ext.grid.CheckBoxSelectionModel<br/>
	 * row使用Ext.grid.RowSelectionModel<br/>
	 */
	gridSelModel : 'row',
	/**
	 * @type Boolean gridRowNumberer grid是否是否显示序号列<br/>
	 */
	gridRowNumberer : false,
	booleans : [["是", true], ["否", false]],
	// private
	crud_operators : [{
				name : "btn_add",
				text : "添加(<u>A</u>)",
				iconCls : 'add',
				method : "create",
				cmd : "save",
				noneSelectRow : true,
				hidden : true
			}, {
				name : "btn_edit",
				text : "编辑(<u>E</u>)",
				iconCls : "edit",
				disabled : true,
				method : "edit",
				cmd : "update",
				hidden : true
			}, {
				name : "btn_view",
				text : "查看(<u>V</u>)",
				iconCls : "view",
				method : "view",
				disabled : true,
				hidden : true
			}, {
				name : "btn_remove",
				text : "删除(<u>D</u>)",
				iconCls : "delete",
				disabled : false,
				method : "removeData",
				cmd : "remove",
				hidden : true
			}, {
				name : "btn_refresh",
				itemId : "btn_refresh",
				text : "刷新",
				iconCls : "refresh",
				method : "refresh",
				noneSelectRow : true
			}, {
				name : "btn_advancedSearch",
				text : "高级查询(<u>S</u>)",
				iconCls : "srsearch",
				method : "advancedSearch",
				cmd : "list",
				hidden : true,
				noneSelectRow : true,
				clientOperator : true
			}, {
				name : "btn_clearSearch",
				text : "显示全部",
				cls : "x-btn-text-icon",
				iconCls : "search",
				noneSelectRow : true,
				method : "clearSearch",
				hidden : true
			}, {
				name : "btn_print",
				text : "打印(<u>P</u>)",
				iconCls : "print-icon",
				disabled : true,
				method : "printRecord",
				hidden : true
			}, {
				name : "btn_export",
				text : "导出Excel(<u>O</u>)",
				iconCls : 'export-icon',
				method : "exportExcel",
				noneSelectRow : true,
				hidden : true
			}, {
				name : "btn_import",
				text : "导入数据(<u>I</u>)",
				iconCls : 'import-icon',
				method : "importExcel",
				noneSelectRow : true,
				hidden : true
			}, '->', {
				type : "searchfield",
				name : "searchField",
				width : 100,
				noneSelectRow : true,
				paramName : 'searchKey',
				clientOperator : true
			}],
	// private
	objectAutoRender : function(v) {
		if (v && v.id) {
			for (var d in v) {
				if (d != "id" && v[d])
					return v[d];
			}
			return v.id;
		} else
			return v;
	},
	// private
	search : function() {
		Ext.apply(this.store.baseParams, {
					searchKey : this.searchField
							? this.searchField.getValue()
							: ""
				});
		if (this.store.lastOptions && this.store.lastOptions.params) {
			this.store.lastOptions.params.start = 0;
			this.store.lastOptions.params.pageSize = this.store.baseParams.pageSize
					|| this.pageSize;
		}
		this.refresh(false);
	},
	formatUrl : function(cmd) {
		return Lanyo_Ajax.formatUrl(this.baseUrl, cmd);
	},
	importExcel : function() {
		if (!EasyJF.Ext.ImportPanel) {
			EasyJF.Ext.ImportPanel = new Ext.form.FormPanel({
				id : "crudExportPanel",
				fileUpload : true,
				items : [{
					xtype : "fieldset",
					title : "选择数据文件",
					autoHeight : true,
					items : {
						xtype : "textfield",
						hideLabel : true,
						inputType : "file",
						name : "file",
						anchor : "100%"
					}
				}, {
					xtype : "fieldset",
					title : "导入说明",
					html : this.importExplain||"",
					height : 60
				}]
			});
		}

		var win = this.createGlobalWin("CrudExportWindow", 300, 210, "导入数据",
				EasyJF.Ext.ImportPanel, function() {
					var form = EasyJF.Ext.ImportPanel.form;
					if (form.findField("file").getValue().length < 2) {
						Ext.Msg.alert("提示", "你没有选择要导入的文件！");
						return;
					}
					EasyJF.Ext.ImportPanel.form.submit({
								url : this.baseUrl,
								params : {cmd : "import"},
								waitMsg : "请稍候，正在导入数据",
								success : function() {
									Ext.Msg.alert("提示", "数据导入成功!", function() {
												form.findField("file").reset();
												win.hide();
												this.store.reload();
											}, this)
								},
								failure : function(form,action) {
									this.alert((action.result.errors.msg || "数据导入出错，请检测所选择的文件格式是否正确?"),"提示信息");
								},
								scope : this
							})
				});
	},
	getExportForm : EasyJF.Ext.Util.getExportForm,
	/**
	 * 导出数据为Excel格式
	 */
	exportExcel : function() {
		var params = this.store.baseParams;
		Ext.apply(params, {
					searchKey : this.searchField
							? this.searchField.getValue()
							: ""
				});
		/*
		 * var s = Ext.urlEncode(params); window.open(this.baseUrl +
		 * '?cmd=export&' + s);
		 */
		var exportForm = this.getExportForm();
		exportForm.form.submit({
					url : this.baseUrl,
					params : Ext.apply({
								cmd : "export"
							}, this.store.baseParams)
				});
	},
	printList : function(cmd) {
		return function() {
			var params = Ext.apply(this.store.baseParams, {
						cmd : (cmd ? cmd : "printList")
					});
			var s = Ext.urlEncode(params);
			window.open(this.baseUrl + "?" + s);
		}
	},
	printRecord : function() {
		var record = this.grid.getSelectionModel().getSelected();
		if (!record) {
			this.alert("请先选择要操作的数据！", "提示信息");
			return false;
		}
		window.open(this.baseUrl + "?cmd=print&id=" + record.get("id"));
	},
	clearSearch : function() {
		this.store.baseParams = {};
		this.store.removeAll();
		this.store.load({
					params : {
						start : 0,
						pageSize : this.pageSize
					}
				});
		// this.refresh();
	},
	/**
	 * 重新加载列表中的数据。<br/> 可以重写该方法，在refresh方法调用之前向store添加查询条件。<br/>
	 * 如果有自定义的列表上按钮，在refresh方法后，还需要调用disableOperaterItem方法来禁用或启用按钮。<br/>
	 */
	refresh : function(reload) {
		this.store.removeAll();
		var callback = function(rs) {
			if (rs && rs.length < 1) {
				this.alert("没有符合条件的数据！", "提示信息");
				EasyJF.Ext.Util.autoCloseMsg.defer(2000);
			}
		};

		var cfg = {
			callback : callback,
			scope : this
		};
		this.store[reload !== false ? "reload" : "load"](cfg);
		this.disableOperaterItem("btn_remove", "btn_edit", "btn_view",
				"btn_print");
		this.focus();
	},
	// private
	initWin : function(width, height, title, callback, autoClose, resizable,
			maximizable) {
		this.winWidth = width;
		this.winHeight = height;
		this.winTitle = title;
		var winName = autoClose ? "CrudEditNewWindow" : "CrudEditWindow";
		if (this.singleWindowMode)
			winName = winName + this.id;
		var win = this.createGlobalWin(winName, width, height, title, this.fp,
				null, "fp", [{
					itemId : "btnSave",
					text : "保存(<u>K</u>)",
					handler : function() {
						EasyJF.Ext[winName].crudService.save(callback,
								autoClose);
					},
					iconCls : 'save',
					scope : this
				}, {
					itemId : "btnReset",
					text : "重置(<u>R</u>)",
					iconCls : 'clean',
					handler : function() {
						EasyJF.Ext[winName].crudService.reset()
					},
					scope : this
				}, {
					itemId : "btnClose",
					text : "取消(<u>X</u>)",
					iconCls : 'delete',
					handler : function() {
						EasyJF.Ext[winName].crudService.closeWin(autoClose)
					},
					scope : this
				}], autoClose, resizable ? true : false, maximizable
						? true
						: false);
		win.confirmSave = this.dirtyFormCheck;
		return win;
	},
	// private
	getViewWin : function(autoClose) {
		var viewWin = Ext.isFunction(this.viewWin)
				? this.viewWin()
				: this.viewWin;
		var width = viewWin.width;
		var height = viewWin.height;
		var title = viewWin.title;
		return this.createGlobalWin("CrudViewWindow", width, height, title,
				this.viewPanel, function() {
					var w = EasyJF.Ext.CrudViewWindow;
					if (w.crudService)
						w.crudService.viewSave(this.viewPanel);
					w.hide();
				}, "viewPanel", null, autoClose);
	},
	/**
	 * 封装的可以对某一条业务数据完成一组方法的方法。<br/> 包装的方法流程：<br/>
	 * <ul>
	 * <li>1，必须选中一条业务数据</li>
	 * <li>2，打开一个窗口，把业务数据传入窗口的表单中</li>
	 * <li>3，提交窗口后关闭窗口，并刷新列表</li>
	 * </ul>
	 * 
	 * <pre>
	 * <code>
	 * 	//需求：在产品列表中选中某一个产品，点击【添加完整备注】按钮，弹出窗口，包含CkEditor用于添加大量的备注信息。
	 * 	//设计思路：在企业级产品应用中，处于后台数据库性能设计和前台页面render性能设计，大文本属性都会独立于业务对象，在前台也往往采用分离的独立窗口添加。
	 * 	//实现，首先在toolbar中加入按钮
	 * 	{xtype:'button',text:'添加完整备注',scope:this,handler:this.addBigInfo},
	 * 	//addBigInfo方法:
	 * 	addBigInfo:function(){
	 * 	EasyJF.Ext.Util.doSomeWork(500,400,
	 * 			'添加大备注',
	 * 			'bigIntroAddPanel',
	 * 			'createBigIntroAddPanel',
	 * 			'addBigIntro',
	 * 			'GlobalBigIntroAddWin');
	 * 	}
	 * 	//创建大备注panel方法：
	 * 	createBigIntroAddPanel:function(){
	 * 	var fp=//...;
	 * 	return fp;
	 * 	}
	 * </code>
	 * </pre>
	 * 
	 * @param {Integer}
	 *            width 弹出窗口的宽度
	 * @param {Integer}
	 *            height 弹出窗口的高度
	 * @param {String}
	 *            title 弹出窗口的标题
	 * @param {String}
	 *            panel
	 *            在本CrudFunction实例中缓存的弹出窗体中表单的名称。CrudFunction使用this[panel]来查找相同的panel实例。
	 * @param {String}
	 *            createPanel
	 *            在this作用域中定义的用来创建弹出窗口中表单的方法名称。所以在示例中，如果第一次调用该方法，就会使用createBigIntroAddPanel方法来创建表单。
	 * @param {String}
	 *            cmd 弹出窗口中表单提交到后台的cmd命令名称。
	 * @param {String}
	 *            workWinName 全局缓存的窗口名称
	 * @param {String}
	 *            url 弹出窗口中表单提交到后台的url路径。默认使用this.baseUrl。
	 * @parma {Boolean} autoClose 在完成窗口中表单提交后，是否自动关闭弹出窗口。
	 * 
	 */
	doSomeWork : function(width, height, title, panel, createPanel, cmd,
			workWinName, url, autoClose) {
		var record = this.grid.getSelectionModel().getSelected();
		if (!record) {
			this.alert("请先选择要操作的数据！", "提示信息");
			return false;
		}
		if (!this[panel])
			this[panel] = this[createPanel]();
		var win = this.getWorkWin(width, height, title, this[panel],
				function() {
					if (!this[panel].form.isValid())
						return false;
					this[panel].form.submit({
						url : url ? url : this.baseUrl,
						waitMsg : "正在执行操作，请稍候",
						params : {
							cmd : cmd
						},
						success : function() {
							win.hide();
							this.refresh()
						},
						failure : function(form, action) {
							var msg = "";
							if (action.failureType == Ext.form.Action.SERVER_INVALID) {
								for (var p in action.result.errors) {
									msg += action.result.errors[p] + "&nbsp;";
								}
							} else
								msg = "数据录入不合法或不完整！";
							EasyJF.Ext.Msg.alert(msg, "保存失败!");
						},
						scope : this
					});
				}, panel, workWinName, autoClose);
		return win;

	},
	/**
	 * 根据参数，创建一个工作窗口。<br/> 该窗口使用缓存机制。<br/> 使用示例请参考doSomeWork方法的实现方式。
	 * 
	 * @param {Integer}
	 *            width 创建窗口的宽度
	 * @param {Integer}
	 *            height 创建窗口的高度
	 * @param {String}
	 *            title 创建窗口的标题
	 * @param {Object}
	 *            workPanel 在创建的窗口中使用的panel实例。
	 * @param {Function}
	 *            save 点击窗口上【保存】按钮，调用的回调方法。
	 * @param {String}
	 *            pname 在this域中保存的该panel示例缓存名称。
	 * @param {String}
	 *            workWinName 全局缓存的窗口名称
	 * @parma {Boolean} autoClose 在完成窗口中表单提交后，是否自动关闭弹出窗口。
	 */
	getWorkWin : function(width, height, title, workPanel, save, pname,
			winName, autoClose) {
		var record = this.grid.getSelectionModel().getSelected();
		if (!record) {
			this.alert("请先选择要操作的数据！", "提示信息");
			return false;
		}
		var id = record.get("id");
		var win = this.createGlobalWin(winName ? winName : "CrudWorkWindow",
				width, height, title, workPanel, save, pname, null, autoClose);
		// 显示数据
		for (var n in record.data) {
			var c = win.getComponent(0).findSomeThing(n);
			// if(!c &&
			// win.getComponent(0).getXType()=="form")c=win.getComponent(0).form.findField(n);
			if (c) {
				var v = record.get(n);
				if (c.isFormField) {
					c.setValue(v);
					c.clearDirty();
				} else {
					if (c.renderer)
						v = c.renderer(v);
					if (c.setText)
						c.setText(v);
					else if (c.getXType && c.getXType() == "panel")
						c.body.update(v);
				}
			}
		}
		return win;
	},
	/**
	 * 简单的alert方法封装。
	 * 
	 * @param {String}
	 *            msg 提示的内容。
	 * @param {String}
	 *            title 提示的标题。可选，默认为'提示'。
	 */
	alert : function(msg, title) {
		EasyJF.Ext.Msg.alert(msg, title || "提示", function() {
					this.focus();
				}, this)
	},
	/**
	 * 简单的confirm方法封装。
	 * 
	 * @param {String}
	 *            title 确认的标题
	 * @param {String}
	 *            msg 确认的内容
	 * @param {Function}
	 *            callback 点击确认提示窗口中yes按钮后的回调方法。
	 */
	confirm : function(title, msg, callback) {
		Ext.Msg.confirm(title, msg, function(btn) {
					if (btn == "yes") {
						callback();
					} else {
						this.focus();
					}
				}, this);
	},
	// private
	focusFirstField : function(fp, win) {
		fp = fp || this.fp;
		win = win || this.win;
		fp = win.findBy(function(cmp) {
					if (cmp instanceof Ext.FormPanel) {
						return true;
					}
				}, this);
		win.currentFocus = false;
		if (fp && fp[0].form.items) {
			fp[0].form.items.each(function(o) {
						if (o.canFocus()) {
							o.focus("", 10);
							win.currentFocus = o;
							return false;
						}
					});
		}
		if (!win.currentFocus) {
			if (win.buttons && win.buttons.length) {
				win.buttons[0].focus("", 10);
				win.currentFocus = win.buttons[0];
			}
		}
	},
	// private
	// 得到一个全局的操作窗口，参数width表示窗口宽度，height表示窗口高度，title表示窗口标题，workPanel表示窗口名称，save表示回调函数，作用域为this,pname表示属性名称，比如viewPanel
	createGlobalWin : function(winName, width, height, title, workPanel, save,
			pname, buttons, autoClose, resizable, maximizable) {
		var win = EasyJF.Ext[winName];
		if (!win) {
			this[pname ? pname : workPanel.id] = workPanel;
			var tools = [];
			tools.push({
						id : "help",
						handler : this.help
					});
			EasyJF.Ext[winName] = new EasyJF.Ext.FormWindow({
				width : width,
				layout : 'fit',
				border : false,
				resizable : resizable,
				height : height,
				buttonAlign : "center",
				title : title,
				modal : true,
				defaultButton : 0,
				shadow : true,
				maximized : false,
				maximizable : maximizable,// this.enableMaxime,
				// constrain:true,
				tools : tools,
				closeAction : autoClose || this.singleWindowMode
						? "close"
						: "hide",
				autoClose : autoClose || this.singleWindowMode,
				listeners : {
					close : function(win) {
						if (win.crudService.store
								&& win.crudService.closeSaveWin === false
								&& winName != "CrudSearchWindow") {
							win.crudService.store.reload();
						}
						win.crudService.focusCrudGrid();
						delete EasyJF.Ext[winName];
					},
					maximize : function(win) {
						if (win.maximizable) {
							win.doLayout();
							win.maximized = true
						}
					},// 如果需要实现可最大化和最小化，就要重写maximize和restore事件
					restore : function(win) {
						if (win.maximizable) {
							win.doLayout();
							win.maximized = false
						}
					},
					show : function(win) {
						if (win.maximizable)
							win.tools[win.maximized ? "maximize" : "restore"]
									.setVisible(win.crudService.maximizable === true);
						win.tools.help
								.setVisible(win.crudService.showHelp != undefined);
						var fp = win.findByType(Ext.FormPanel);
						win.crudService.focusFirstField(fp, win);
					},
					hide : function(win) {
						if (win.crudService.store
								&& win.crudService.closeSaveWin === false
								&& winName != "CrudSearchWindow") {
							win.crudService.store.reload();
						}
						win.crudService.focus();
					}
				},
				items : [workPanel],
				buttons : buttons ? buttons : [{
							itemId : "btnSave",
							text : "确定(<u>K</u>)",
							handler : function() {
								var w = EasyJF.Ext[winName];
								var h = true;
								if (save)
									h = save.call(w.crudService, autoClose);
								if (h) {
									if (autoClose)
										w.close();
									else
										w.hide();
								}
							},
							iconCls : 'save',
							scope : this
						}, {
							itemId : "btnClose",
							text : "退出(<u>X</u>)",
							iconCls : 'delete',
							handler : function() {
								if (autoClose || this.singleWindowMode)
									EasyJF.Ext[winName].close();
								else
									EasyJF.Ext[winName].hide();
							},
							scope : this
						}],
				keys : [{
							key : "k",
							alt : true,
							stopEvent : true,
							fn : function() {
								EasyJF.Ext.Util.executePanelButtons(win,
										"btnSave");
							}
						}, {
							key : "x",
							stopEvent : true,
							alt : true,
							fn : function() {
								EasyJF.Ext.Util.executePanelButtons(win,
										"btnClose");
							}
						}, {
							key : "r",
							stopEvent : true,
							alt : true,
							fn : function() {
								EasyJF.Ext.Util.executePanelButtons(win,
										"btnReset");
							}
						}]
			});
			win = EasyJF.Ext[winName];
		} else if (workPanel) {// 更改窗口中的内容，包括全局的事件响应函数等
			if (win.crudService != this) {
				// win.resizable = resizable;
				// win.maximizable=maximizable;
				// if(win.maximizable&&win.tools["restore"])win.tools["restore"].setVisible(false);
			}

			win.setTitle(title);
			win.setWidth(width);
			win.setHeight(height);
			if (win.getComponent(0) != workPanel) {
				var p = win.remove(0);
				delete win.crudService[pname ? pname : p.id];// 删除上一个
				win.add(workPanel);
				this[pname ? pname : workPanel.id] = workPanel;
				win.doLayout();
			}
		}
		win.crudService = this; // crudService用来定义全局的添删改查服务
		this[winName] = win;
		win.show((typeof main != "undefined")
						&& Lanyo_Ajax.getCfg('enableAnimate')
						? Ext.getBody()
						: false, function() {
					win.center();
				}, this);
		if (height == 'auto') {
			win.autoHeight = true;
			win.syncSize.defer(1000, win);
		} else {
			win.autoHeight = false;
		}
		return win;
	},
	/**
	 * @cfg {Function} createViewPanel
	 *      在执行查看业务的时候，如果配置了createViewPanel方法，则会调用该方法返回的面板作为弹出的查看窗口中的查看面板。<br/>
	 *      如果没有配置createViewPanel方法，则使用编辑窗口来作为查看窗口面板。
	 * 
	 * @return {Ext.Panel} fp 返回创建的查看面板。
	 */
	/**
	 * @cfg {Function} createForm
	 *      在执行添加和编辑业务的时候，必须要配置createForm方法，CrudFunction服务会调用该方法返回的面板作为弹出的添加和编辑窗口中的表单。<br/>
	 * 
	 * @return {Ext.Panel} fp 返回创建的添加/编辑表单面板。
	 */
	// private
	showWin : function() {
		if (!this.fp) {
			if (!this.createViewPanel && this.viewPanel) {
				this.fp = this.viewPanel;
			} else {
				this.fp = this.createForm();
			}
		}
		this.win = this.createWin();
		this.win.on("close", function() {
					delete this.win;
					delete this.fp;
				}, this);
		this.win.show((typeof main != "undefined")
						&& window.Global.Config.enableAnimate
						? Ext.getBody()
						: false, function() {
					this.win.center();
				}, this);
	},
	/**
	 * @cfg {Function} onCreate 该方法在添加窗口及表单创建完成后调用的钩子方法。<br/>
	 *      一般子类可以覆盖该方法并在里面执行添加业务对象的初始化设置工作。<br/> 比如常见的设置默认值，加载单据编号等。
	 */
	onCreate : function() {
		
	},
	// private
	create : function() {
		this.showWin();
		this.fp.form.clearData();
		this.reset();
		this.fp.form.isValid();
		this.onCreate();
		this.beingCreate=true;
		this.formFocus.defer(500, this);
	},
	// private
	createObject : function(callback, winReadyAction) {
		this.fp = this.createForm();
		this.win = this.createWin(callback, true);
		this.win.on("close", function() {
					delete this.win;
					delete this.fp;
				}, this);
		this.win.show((typeof main != "undefined")
						&& Lanyo_Ajax.getCfg('enableAnimate')
						? Ext.getBody()
						: false, function() {
					this.win.center();
				}, this);
		this.reset();
		if (winReadyAction) {
			winReadyAction(this.win, this);
		}
		this.fp.form.isValid();
		this.onCreate();
		this.beingCreate=true;
		this.formFocus.defer(500, this);
	},
	/**
	 * @cfg {Function} onEdit 该方法在编辑窗口及编辑表单创建，并设置完初始值完成后调用的钩子方法。<br/>
	 *      一般子类可以覆盖该方法并在里面执行自定的编辑对象参数设置工作。<br/>
	 *      比如常见的复杂组件值设置，不可编辑组件disabled等动作。
	 * 
	 * @param {Boolean}
	 *            ret 如果当前选中的业务对象record是否有id值。
	 * @param {Object}
	 *            data 当前选中的业务对象record的data值。
	 */
	onEdit : function(ret, data) {

	},
	// private
	editObject : function(id, callback, winReadyAction) {
		this.fp = this.createForm();
		this.beingCreate=true;
		this.win = this.createWin(callback, true);
		this.win.on("close", function() {
					delete this.win;
					delete this.fp;
				}, this);
		this.win.show((typeof main != "undefined")
						&& Lanyo_Ajax.getCfg('enableAnimate')
						? Ext.getBody()
						: false, function() {
					this.win.center();
				}, this);
		var viewCmd = this.viewCmd || "view";
		Ext.Ajax.request({
					url : this.baseUrl + "?cmd=" + viewCmd,
					params : {
						id : id
					},
					waitMsg : "正在加载数据,请稍侯...",
					callback : function(options, success, response) {
						var r = Ext.decode(response.responseText);
						this.fp.form.setValues(r);
						if (winReadyAction) {
							winReadyAction(this.win, r, this);
						}
						this.onEdit(true, r);
						this.fp.form.isValid();
						this.formFocus.defer(500, this);
						this.fp.form.clearDirty();
					},
					scope : this
				});
	},
	/**
	 * 编辑业务对象方法。<br/>
	 * <ul>
	 * 该方法的执行流程为：
	 * <li>1，如果设置showEdit为false或者编辑按钮当前状态为disable，直接调用查看逻辑。</li>
	 * <li>2，得到当前业务对象列表中选定的record。</li>
	 * <li>3，调用showWin方法，创建编辑窗口及表单</li>
	 * <li>4，把record的值设置到编辑表单中</li>
	 * <li>5，调用onEdit方法。</li>
	 * <li>6，调用formFocus方法。</li>
	 * </ul>
	 */
	edit : function(e) {
		if(e && e.getTarget && e.getTarget('div.x-grid3-row-checker')){return false;};
		
		if (this.btn_edit && this.btn_edit.disabled) {
			this.view();
			return false;
		}
		var record = this.grid.getSelectionModel().getSelected();
		if (!record) {
			this.alert("请先选择要操作的数据！", "提示信息");
			return false;
		}
		var id = record.get("id");
		this.beingCreate=false;
		this.showWin();
		this.fp.form.reset();
		this.fp.form.loadRecord(record);
		this.onEdit(id, record.data);
		this.fp.form.clearDirty();
		this.formFocus.defer(500, this);
		return true;
	},
	// private
	removeObject : function(id, callback) {
		this.confirm("删除确认", "确定要删除吗？", function(ret) {
					Ext.Ajax.request({
								url : this.baseUrl + '?cmd=remove',
								params : {
									'id' : id
								},
								method : 'POST',
								success : function(response) {
									var r = Ext.decode(response.responseText);
									if (!r.success) {
										this
												.alert(
														"操作失败，失败原因为：<br/>"
																+ (r.errors.msg
																		? r.errors.msg
																		: "未知"),
														"提示信息");
									} else {
										this.alert("删除成功", "提示信息");
										if (callback)
											callback();
									}
								},
								scope : this
							});
				}.createDelegate(this), this);
	},
	/**
	 * 在添加或者编辑窗口中，让表单的第一个组件获得焦点。<br/> 默认情况下从第一个元素开始得到焦点。<br/>
	 * 子类可以覆盖该方法让焦点定在某一个指定组件上。<br/>
	 * 比如在添加/修改单据的表单中，第一个组件往往是系统自动生成的编号组件，一般不允许修改，就需要覆盖该方法，让焦点定在第二个组件上。
	 */
	formFocus : function() {
		var field = this.fp.form.items.get(1);
		if (!field || field.disabled)
			this.items.each(function(f) {
						if (!f.disabled) {
							field = f;
							return false;
						}
					});
		if (field && !field.disabled)
			field.focus("", 100);
	},
	// private
	validateForm : function(form) {
		if (!form.isValid()) {
			this.alert("表单数据不合法,请注意必填项及录入的数据格式!", "提示", function() {
						this.formFocus();
					}, this);
			// Ext.Msg.hide.defer(3000,Ext.Msg);
			return false;
		}
		return true;
	},
	/**
	 * @cfg {function} beforeSave 在点击添加/修改表单保存按钮后，到提交表单数据之前调用的钩子方法。<br/>
	 *      一般在该方法中完成获得复杂组件的值，或者拼凑指定提交值的动作。也常用于检查表单中复杂数据合法性或逻辑性的功能。<br/>
	 *      比如在主从表单中，需要覆盖该方法，取得列表中的值，并组装成后台可识别的数据。<br/>
	 *      在主从表单中，如果从列表中没有添加任何数据，则单据可以不用保存，类似的业务逻辑一般也在该方法中实现。<br/>
	 * 
	 * @return {Boolean} ret 如果ret为true，则执行表单提交，为false，则放弃表单提交。
	 */
	beforeSave : function() {
		return true;
	},
	/**
	 * @cfg {function} onSave 在提交完成添加/修改表单数据后，在得到成功的返回之后调用的钩子方法。
	 * 
	 * @param {BasicForm}
	 *            提交的表单
	 * @param {Ext.form.Action}
	 */
	onSave : function(form, action) {

	},
	/**
	 * 添加/编辑 表单的保存动作。<br/> private方法，一般子类不需要覆盖该方法。<br/> 在特殊情况下子类可能会定义自己的保存流程。<br/>
	 * 具体流程请参考实现代码。
	 * 
	 * @param {function}
	 *            callback 在完成表单提交成功后调用的回调方法。
	 * @param {Boolean}
	 *            autoClose 在完成表单提交成功后是否自动关闭添加/编辑窗口。
	 * @param {Boolean}
	 *            ignoreBeforeSave
	 *            是否在表单提交流程中，忽略beforeSave方法。true为不执行beforeSave方法。默认执行该方法。<br/>
	 *            子类有时会在一定的情况下忽略beforeSave方法中的某些业务逻辑检查，就可以设置为false。
	 */
	save : function(callback, autoClose, ignoreBeforeSave) {
		if (!this.validateForm(this.fp.form))
			return false;
		if (ignoreBeforeSave !== true) {
			if (this.beforeSave && this.beforeSave() === false)
				return false;
		}
		var id = this.fp.form.findField("id").getValue();
		var url = this.baseUrl;
		if (this.fp.form.fileUpload) {
			var cmd = this.fp.form.findField("cmd");
			if (cmd == null) {
				cmd = new Ext.form.Hidden({name : "cmd"});
				this.fp.add(cmd);
				this.fp.doLayout();
			}
			//cmd.setValue((id ? "update" : "save"));
			cmd.setvalue((this.beingCreate?"save":(id?"update":"save")));
		} else {
			//url = this.formatUrl((id ? "update" : "save"));
			url = this.formatUrl((this.beingCreate? "save" : (id?"update":"save")));
		}
		EasyJF.Ext.Util.submitForm(this.fp.form, url, function(form, action) {
			this.fp.form.clearDirty();
			if (this.closeSaveWin !== false)
				this.closeWin(autoClose);
			if (this.store && this.closeSaveWin !== false) {
				this.store.reload();
			}
			if (callback)
				callback();
			this.fireEvent("saveobject", this, form, action);
			this.onSave(form, action);
				/*
				 * if(this.win && this.closeSaveWin===false){ this.formFocus(); }
				 */
			}, this);
	},
	/**
	 * 打印预览
	 * 
	 * @param {}
	 *            callback
	 * @param {}
	 *            autoClose
	 * @return {Boolean}
	 */
	preview : function(callback, autoClose) {
		if (!this.validateForm(this.fp.form))
			return false;
		var id = this.fp.form.findField("id").getValue();
		var url = this.baseUrl;
		if (this.fp.form.fileUpload) {
			var cmd = this.fp.form.findField("cmd");
			if (cmd == null) {
				cmd = new Ext.form.Hidden({
							name : "cmd"
						});
				this.fp.add(cmd);
				this.fp.doLayout();
			}
			cmd.setValue("preview");
		} else {
			url += "?cmd=preview";
		}
		var tempHiddens = [];
		var ps = this.fp.form.baseParams;
		if (ps && typeof ps == 'string')
			ps = Ext.urlDecode(bp);
		var form = this.fp.form.el.dom;
		function addHiddenKey(key, value) {
			var hd = document.createElement('input');
			hd.type = 'hidden';
			hd.name = key;
			hd.value = value;
			form.appendChild(hd);
			tempHiddens.push(hd);
		}
		for (var k in ps) {
			if (Ext.isArray(ps[k])) {
				for (var i = 0; i < ps[k].length; i++) {
					addHiddenKey(k, ps[k][i] ? ps[k][i] : "");

				}
			} else if (ps.hasOwnProperty(k)) {
				addHiddenKey(k, ps[k] ? ps[k] : "");
			}
		}
		this.fp.form.el.dom.action = url;
		this.fp.form.el.dom.target = "_blank";
		this.fp.form.el.dom.submit();
		if (tempHiddens) { // 删除动态的参数
			for (var i = 0, len = tempHiddens.length; i < len; i++) {
				Ext.removeNode(tempHiddens[i]);
			}
		}
	},
	/**
	 * 重置表单中的数据方法。默认情况下直接调用form.reset方法。<br/>
	 * 子类可以覆盖该方法来完成自定义的表单重置功能。比如主从表单中从单据的内容清空等动作。
	 * 
	 */
	reset : function() {
		if (this.win && this.fp) {
			this.fp.form.reset();
		}
	},
	// private
	closeWin : function(autoClose) {
		if (this.beforeClose) {
			this.beforeClose(function() {
				if (this.win) {
					if (autoClose)
						this.win.close();
					else
						this.win.hide();
				}
				if (this.store && this.closeSaveWin === false) {
					// this.store.reload();
				}
			});
		} else {
			if (this.win) {
				if (autoClose)
					this.win.close();
				else
					this.win.hide();
			}
			if (this.store && this.closeSaveWin === false) {
				// this.store.reload();
			}
		}
	},
	// private
	removeData : function() {
		if (this.btn_remove.disabled)
			return false;
		var record = this.grid.getSelectionModel().getSelected();
		if (!record) {
			this.alert("请先选择要操作的数据！", "提示信息");
			return false;
		}
		var mulitId = "";
		if (this.batchRemoveMode) {
			var rs = this.grid.getSelectionModel().getSelections();
			for (var i = 0; i < rs.length; i++)
				mulitId += rs[i].get("id") + ",";
		}
		var m = this.confirm("删除确认", "确定要删除吗？", function(ret) {
			Ext.Ajax.request({
						url : this.formatUrl('remove'),
						params : {
							'id' : record.get("id"),
							'mulitId' : mulitId
						},
						method : 'POST',
						success : function(response, options) {
							var r = Ext.decode(response.responseText);
							if (r && !r.success)
								EasyJF.Ext.Msg.error("失败原因为：<br/>"
										+ (r.errors.msg ? r.errors.msg : "未知"));
							else {
								Ext.Msg.alert("提示", "删除成功", function() {
											this.store.removeAll();
											this.store.reload();
											this.focus();
										}, this);
							}
							this.fireEvent("removeobject", this, r, options);
						},
						scope : this
					});

		}.createDelegate(this), this);
		return true;
	},
	/**
	 * 异步请求的方法包装。
	 */
	executeUrl : EasyJF.Ext.Util.executeUrl,
	/**
	 * 对列表中的一行数据进行执行。<br/>
	 * <ul>
	 * 执行流程：
	 * <li>1，选中列表中的一行。</li>
	 * <li>2，执行url，this.formatUrl(cmd);提交的参数还包括选中的id:{id:id}</li>
	 * </ul>
	 * 
	 * @param {String}
	 *            cmd 请求后台的cmd名称
	 * @param {Boolean}
	 *            allowBlank 是否必须选中列表中的一行数据。true为可以不用选择数据。false为必须选中一行数据。
	 * 
	 */
	executeCmd : function(cmd, allowBlank) {
		return function(c) {
			var sel = this.grid.getSelectionModel();
			var record = sel.getSelectedCell ? (sel.getSelectedCell()
					? this.grid.store.getAt(sel.getSelectedCell()[0])
					: null) : sel.getSelected();
			if (!c.noneSelectRow) {
				if (!record && !allowBlank) {
					this.alert("请先选择要操作的数据！");
					return;
				}
			}
			var id = record ? record.get("id") : "";

			Ext.Ajax.request({
						waitMsg : "正在执行操作，请稍候...",
						url : this.formatUrl(cmd),
						params : {
							'id' : id
						},
						method : 'POST',
						success : function(response) {
							var r = Ext.decode(response.responseText);
							if (!r.success)
								this.alert("操作失败，失败原因为：<br/>"
										+ (r.errors.msg ? r.errors.msg : "未知"));
							else {
								Ext.Msg.alert("提示", r.data ? r.data : "操作成功",
										function() {
											this.store.reload();
											this.focus();
										}, this);
							}
						},
						scope : this
					});
		}
	},
	/**
	 * 对多条选中的数据执行命令
	 * <ul>
	 * 执行流程：
	 * <li>1，得到列表中所有选中行。</li>
	 * <li>2，执行url，this.formatUrl(cmd);提交的参数还包括选中的mulitId:{mulitId:mulitId}</li>
	 * </ul>
	 * 
	 * @param {String}
	 *            cmd 请求后台的cmd名称
	 */
	executeMulitCmd : function(cmd) {
		return function() {
			var record = this.grid.getSelectionModel().getSelections();
			if (!record || record.length < 1) {
				this.alert("请先选择要操作的数据！");
				return;
			}
			var mulitId = "";
			for (var i = 0; i < record.length; i++) {
				if (record[i].get("id"))
					mulitId += record[i].get("id") + ",";
			}
			Ext.Ajax.request({
						waitMsg : "正在执行操作，请稍候...",
						url : this.formatUrl(cmd),
						params : {
							'mulitId' : mulitId
						},
						method : 'POST',
						success : function(response) {
							var r = Ext.decode(response.responseText);
							if (!r.success)
								this.alert("操作失败，失败原因为：<br/>"
										+ (r.errors.msg ? r.errors.msg : "未知"));
							else {
								Ext.Msg.alert("提示", r.data ? r.data : "操作成功",
										function() {
											this.store.reload();
											this.focus();
										}, this);
							}
						},
						scope : this
					});
		}
	},

	/**
	 * @cfg {Function} onView 该方法在查看窗口表单创建，并设置完初始值完成后调用的钩子方法。<br/>
	 *      一般子类可以覆盖该方法并在里面执行设置自定的查看对象属性的设置工作。<br/> 比如常见的复杂组件值查看。
	 * 
	 * @param {Window}
	 *            win 查看窗口实例。
	 * @param {Object}
	 *            data 当前选中的业务对象record的data值。
	 */
	onView : function() {
	},
	/**
	 * @cfg {Function} readInfo 自定义的查看业务对象的方法。 可以自定义该方法来完全覆盖默认的view方法。
	 */
	view : function() {// 通用的查看数据窗口
		if (this.readInfo)
			return this.readInfo();
		var record = this.grid.getSelectionModel().getSelected();
		if (!record) {
			this.alert("请先选择要操作的数据！");
			return false;
		}
		var id = record.get("id");
		var win = this.showViewWin();
		for (var n in record.data) {
			var c = win.getComponent(0).findSomeThing(n);
			// if(!c &&
			// win.getComponent(0).getXType()=="form")c=win.getComponent(0).form.findField(n);
			if (c) {
				var v = record.get(n);
				// alert(n+":"+v);
				if (c.isFormField) {
					c.setValue(v);
					c.clearDirty();
				} else {
					if (c.renderer)
						v = c.renderer(v);
					if (c.setText)
						c.setText(v);
					else if (c.getXType && c.getXType() == "panel")
						c.body.update(v);
				}
				// alert(c.ownerCt.el.dom.innerHTML);
			}
		}
		this.onView(win, record.data);
		// this.fp.form.loadRecord(record);
		return win;
	},
	viewObject : function(id, callback) {
		var win = this.showViewWin(true);
		var viewCmd = this.viewCmd || "view";
		Ext.Ajax.request({
					url : this.formatUrl(viewCmd),
					params : {
						id : id
					},
					waitMsg : "正在加载数据,请稍侯...",
					callback : function(options, success, response) {
						var r = Ext.decode(response.responseText);
						for (var n in r) {
							var c = win.getComponent(0).findSomeThing(n);

							if (c) {
								var v = r[n];
								if (c.isFormField) {
									c.setValue(v);
									c.clearDirty();
								} else {
									if (c.renderer)
										v = c.renderer(v);
									if (c.setText)
										c.setText(v);
									else if (c.getXType
											&& c.getXType() == "panel")
										c.body.update(v);
								}
							}
						}
						if (callback)
							callback(win, r);
						this.onView(win, r);
					},
					scope : this
				});
	},
	// private
	showViewWin : function(autoClose) {
		if (!this.viewPanel) {
			if (this.createViewPanel) {
				this.viewPanel = this.createViewPanel();
			} else {
				if (this.fp) {
					this.viewPanel = this.fp;
				} else {
					this.viewPanel = this.createForm();
				}
			}
		}
		var win = this.getViewWin(autoClose);
		return win;
	},
	/**
	 * 业务对象列表中的查询方法。
	 */
	doSearch : function() {
		var win = EasyJF.Ext.CrudSearchWindow;
		var o = win.getComponent(0).form.getValues(false);
		var service = win.crudService;
		service.store.baseParams = Ext.apply(o, {
					searchType : 'advancedSearch',
					pageSize : service.store.baseParams.pageSize
							|| service.pageSize
				});
		win.hide();
		if (service.searchField && service.cleanQuickSearch) {
			service.searchField.reset();
		}
		service.search();
	},
	/**
	 * 如果开启了高级查询，点击高级查询按钮弹出高级查询窗口。
	 */
	advancedSearch : function() {
		return this.superSearchWin(this.searchWin.width, this.searchWin.height,
				this.searchWin.title);
	},
	/**
	 * @cfg {Ext.form.FormPane||Ext.Panel} searchFP
	 *      如果指定了该属性对应的Panel或者FormPanel实例，则在点击高级查询按钮后，会使用该面板作为高级查询面板。<br/>
	 *      同时，如果开启了自定义查询条件的功能，该面板也会作为自定义条件的保存表单。
	 */
	/**
	 * @cfg {Function} searchFormPanel 如果配置了该方法，则在点击高级查询按钮后，会使用该方法创建的面板作为高级查询面板。<br/>
	 *      同时，如果开启了自定义查询条件的功能，该面板也会作为自定义条件的保存表单。
	 */
	/**
	 * @cfg {Function} searchFP 如果配置了该方法，则在点击高级查询按钮后，会使用该方法创建的面板作为高级查询面板。<br/>
	 *      同时，如果开启了自定义查询条件的功能，该面板也会作为自定义条件的保存表单。
	 */
	/**
	 * 创建高级查询窗口
	 */
	superSearchWin : function(width, height, title) {
		var isNew = !EasyJF.Ext.CrudSearchWindow;
		if (!this.searchPanel) {
			if (this.searchFP || this.searchFormPanel) {
				this.searchPanel = this.searchFP ? this.searchFP() : this
						.searchFormPanel();
			}
		}
		if (!this.searchPanel)
			return null;// 如果没有定义searchFP或searchFormPanel，则返回
		var win = this.createGlobalWin("CrudSearchWindow", width, height,
				title, this.searchPanel, null, "searchPanel", [{
							id : "tb_search",
							text : "查询",
							handler : this.doSearch,
							iconCls : 'search',
							scope : this
						}, {
							text : "重置",
							iconCls : 'clean',
							handler : function() {
								EasyJF.Ext.CrudSearchWindow.getComponent(0).form
										.reset();
							}
						}, {
							text : "关闭",
							iconCls : 'delete',
							handler : function() {
								EasyJF.Ext.CrudSearchWindow.hide()
							}
						}]);
		if (isNew) {
			/*
			 * var map = new Ext.KeyMap(win.el,{ key: 13, fn: this.doSearch });
			 */
		}
		return win;
	},
	/**
	 * 改变grid视图的显示方式，实现预览效果和正常效果的切换
	 */
	toggleDetails : function(obj) {
		var view = this.grid.getView();
		if (view.showPreview)
			view.showPreview = false;
		else
			view.showPreview = true;
		view.refresh();
	},
	/**
	 * 提供的一个企业业务中常见的调整顺序的功能方法包装。<br/>
	 * 可以使用该方法来讲当前业务对象列表中选中的对象和其上一个业务对象或者下一个业务对象的位置进行交换。<br/>
	 * 该方法在交换前台显示顺序后，还会向后台发送一个Ajax请求，在后台也完成顺序交换逻辑。<br/>
	 * 
	 * 例如，如果当前选中对象的id为2，调用方法：<br/> swapSequence(true,true)<br/> 会向后台发送请求：<br/>
	 * <ul>
	 * <li>url: format('swapSequence')</li>
	 * <li>params:{down: true,id:2}</li>
	 * </ul>
	 * 
	 * @param {Boolean}
	 *            down 是将选中的业务对象下移还是上移。true是下移，false是上移。
	 * @param {Boolean}
	 *            inform 移动成功后是否提示。true为提示，提示内容为：操作成功。false不提示。
	 */
	swapSequence : function(down, inform) {
		return function() {
			var record = this.grid.getSelectionModel().getSelected();
			if (!record) {
				this.alert("请先选择要操作的数据！", "提示");
				return;
			}
			var id = record.get("id");
			Ext.Ajax.request({
						url : this.formatUrl("swapSequence"),
						params : {
							'id' : record.get("id"),
							down : down ? down : "",
							parentId : this.parentId,
							sq : this.grid.store.find("id", id) + 1
						},
						method : 'POST',
						success : function(response) {
							var r = Ext.decode(response.responseText);
							if (!r.success)
								this.alert("操作失败，失败原因：<br/>"
												+ (r.errors.msg
														? r.errors.msg
														: "未知"), "提示信息");
							else {
								if (inform) {
									Ext.Msg.alert("提示", "操作成功", function() {
												this.store.reload();
												this.focus();
											}, this);
								} else {
									this.store.reload();
								}
							}
						},
						scope : this
					});
		}
	},
	/**
	 * 向业务对象列表面板的工具栏中插入按钮。
	 * 
	 * @param {Array}
	 *            args 要插入的toolbaritem。
	 */
	insertGridButton : function() {
		this.gridButtons.splice(10, 0, arguments);
	},
	/**
	 * @cfg {Ext.Menu} menu 在列表中显示的右键菜单。
	 */
	// private
	showContextMenu : function(g, i, e) {
		if (this.menu) {
			var evn = e ? e : g;
			evn.preventDefault();
			if (i >= 0) {
				this.grid.getSelectionModel().selectRow(i, false);
			}
			this.menu.showAt(evn.getPoint());
		}
	},
	/**
	 * 在列表中完成EasyJF.Ext.Util.operaterRender渲染的可操作column动作。
	 */
	doOperate : function(grid, rowIndex, columnIndex, e) {
		var tag = e.getTarget("A", 3);
		if (tag) {
			var id = tag.getAttribute("theid");
			var cmd = tag.getAttribute("op");
			var cf = tag.getAttribute("cf");
			if (id && cmd)
				this.operate(cmd, id, cf, grid, rowIndex, columnIndex, e);
		}
	},
	// private
	operate : function(cmd, id, cf, grid, rowIndex, columnIndex, e) {
		if (cmd == "edit")
			this.edit();
		else if (cmd == "view")
			this.view();
		else if (cmd == "remove")
			this.removeData();
		else {
			if (!cf)
				this.executeUrl(this.baseUrl, {
							cmd : cmd,
							id : id
						}, this.refresh.createDelegate(this))();
			else
				Ext.Msg.confirm("提示", "确认要执行该操作吗?", function(btn) {
							if (btn == "yes")
								this.executeUrl(this.baseUrl, {
											cmd : cmd,
											id : id
										}, this.refresh.createDelegate(this))();
							else
								this.focus();
						}, this);
		}
	},
	/**
	 * 根据一个查询方法来找到在业务列表面板工具栏（toptoolbar)中的符合条件的工具栏组件。
	 * 
	 * @param {Function}
	 *            callback 传入的查询方法。
	 *            <ul>
	 *            该方法传入的参数：
	 *            <li>{Component} 业务列表面板工具栏（toptoolbar)中的每一个按钮组件</li>
	 *            </ul>
	 * 
	 * @return {Array} finds 找到的符合条件的工具栏组件
	 */
	findOperatorBy : function(callback) {
		var objs = [];
		this.operators.each(function(o) {
					if (typeof o != "string") {
						if (callback && callback(o))
							objs.push(o);
					}
				});
		return objs;
	},
	/**
	 * 根据工具栏组件的属性找到业务列表面板工具栏（toptoolbar)中的符合条件的工具栏组件。
	 * 
	 * @param {String}
	 *            name 要匹配的属性名称。
	 * @parma {Object} value 要匹配的属性的值。
	 * 
	 * @return {Array} finds 找到的符合条件的工具栏组件
	 */
	findOperatorByProperty : function(name, value) {
		return this.findOperatorBy(function(o) {
					if (o[name] == value)
						return true;
				});
	},

	// private
	toggleSingleRowOperator : function(enable) {
		var ids = this.findOperatorByProperty("singleRow", true);
		var args = [];
		if (ids && ids.length) {
			for (var i = 0; i < ids.length; i++)
				args.push(ids[i].name || ids[i].id);
		}
		if (enable)
			this.enableOperaterItem(args);
		else
			this.disableOperaterItem(args);
	},
	/**
	 * 改变业务列表面板工具栏（toptoolbar)所有工具栏组件的状态
	 * 
	 * @param {Boolean}
	 *            enable 改变的状态。如果为true，启用所有组件。如果为false，禁用所有组件。
	 */
	toggleAllOperator : function(enable) {
		var args = [];
		this.operators.each(function(o) {
					if (typeof o != "string") {
						args.push(o.name || o.id);
					}
				});
		if (enable) {
			this.enableOperaterItem(args);
		} else {
			this.disableOperaterItem(args);
		}
	},
	/**
	 * 当业务对象列表中的一行或者某行选中时，控制业务列表面板工具栏（toptoolbar)按钮的统一方法。<br/>
	 * 子类如果在工具栏中加入了自定义的方法，可以复写该方法来控制自定义按钮的可用性。<br/>
	 * 
	 * 自定义的工具栏按钮也可以通过加入batch或者singleRow属性来标示按钮是否需要受到统一控制。<br/>
	 * 
	 * @param {Ext.data.Record}
	 *            record 选中的行对应的record
	 * @param {Integer}
	 *            index 选中的行数
	 * @param {Ext.grid.SelectionModel}
	 *            sel grid的selectionModel。
	 */
	onRowSelection : function(record, index, sel) {		var sel = this.grid.getSelections();
		var ids = this.findOperatorByProperty("batch", true);// 打开支持批量操作的按钮
		var selected = true;
		if(sel.length==1){
			this.toggleSingleRowOperator(true);
		}else if(sel.length > 1){
			this.toggleSingleRowOperator(false);
		}else{
			selected = false;
			this.toggleSingleRowOperator(false);
		}
		var args = [];
		
		if (ids && ids.length) {
			Ext.each(ids,function(obj){
				args.push(obj.name || obj.id)
			});
		}
		this[(selected ? 'enable' : 'disable')+'OperaterItem'](args);
	},
	// private
	changeOperaterItem : function(args, callback) {
		if (args.length == 1 && Ext.isArray(args[0]))
			args = args[0];
		if (this.grid.getTopToolbar() && this.grid.getTopToolbar().items) {// 已经渲染
			for (var i = 0; i < args.length; i++) {
				if (this.menu && this.menu.items) {
					var o = this.menu.items.find(function(c) {
								var n1 = c.name || c.id;
								if (n1 == args[i])
									return true;
							});
					if (o)
						callback(o);
				}
				o = this.grid.getTopToolbar().items.find(function(c) {
							var n1 = c.name || c.id;
							if (n1 == args[i])
								return true;
						});
				if (o)
					callback(o);
			}
		} else {
			this.grid.on("render", function() {
						for (var i = 0; i < args.length; i++) {
							var o = this.grid.getTopToolbar().items.find(
									function(c) {
										var n1 = c.name || c.id;
										if (n1 == args[i])
											return true;
									});;
							if (o)
								callback(o);
						}
					}, this);
		}
	},
	/**
	 * 让一系列的右键菜单项变成可用状态
	 * 
	 * @param {Array}
	 *            args 要设置为可用状态的右键菜单项的名称或者id。
	 */
	enableOperaterItem : function() {
		var args = arguments;
		this.changeOperaterItem(args, function(o) {
					if (o.enable)
						o.enable();
				});
	},
	/**
	 * 让一系列的右键菜单项变成禁用状态
	 * 
	 * @param {Array}
	 *            args 要设置为禁用状态的右键菜单项的名称或者id。
	 */
	disableOperaterItem : function() {
		var args = arguments;
		this.changeOperaterItem(args, function(o) {
					if (o.disable)
						o.disable();
				});
	},
	/**
	 * 让一系列的右键菜单项变成可见状态
	 * 
	 * @param {Array}
	 *            args 要设置为可见状态的右键菜单项的名称或者id。
	 */
	showOperaterItem : function() {
		var args = arguments;
		this.changeOperaterItem(args, function(o) {
					if (o.show)
						o.show();
				});
	},
	/**
	 * 让一系列的右键菜单项变成隐藏状态
	 * 
	 * @param {Array}
	 *            args 要设置为隐藏状态的右键菜单项的名称或者id。
	 */
	hideOperaterItem : function() {
		var args = arguments;
		this.changeOperaterItem(args, function(o) {
					if (o.hide) {
						o.hide();
					}
				});
	},
	// private
	operatorConfig2Component : function(o, isMenu) {
		var co = Ext.apply({}, o);
		if (!co.handler) {
			if (co.method && this[co.method]) {
				co.handler = this[co.method];
			} else if (co.cmd)
				co.handler = co.batch ? this.executeMulitCmd(co.cmd) : this
						.executeCmd(co.cmd);
		}
		if (co.handler && !co.scope)
			co.scope = this;
		if (!isMenu) {// 对按钮的样式作处理
			if (this.operatorButtonStyle == 2) {
				if (co.icon) {
					co.cls = "x-btn-icon";
					co.text = "";
				}
			} else if (this.operatorButtonStyle == 3) {
				co.icon = "";
				co.cls = "";
			}
		}
		var key = co.name || co.id;
		if (key == "searchField")
			co.store = this.store;
		else if (key == "btn_advancedSearch") {
			co.hidden = !((this.searchFormPanel || this.searchFP) && this.allowSearch);
		}else if(key=="btn_remove"){
			o.batch = this.batchRemoveMode; 
		}
		return co;
	},
	// private
	buildCrudOperator : function() {
		if (!this.operators)
			this.initOperator();
		var bs = [];
		this.operators.each(function(c) {
					if (typeof c == "string") {
						bs.push(c);
					} else {
						if (!c.showInMenuOnly) {
							var co = this.operatorConfig2Component(c);
							var key = co.name || co.id;
							try {
								if (Ext.isString(co.type)) {
									// if(Ext.ComponentMgr.isRegistered(co.type));
									this[key] = Ext.create(co, co.type);
								} else {
									this[key] = new Ext.Toolbar.Button(co);
								}
								bs.push(this[key]);
							} catch (e) {
								alert(key + ":" + e);
							}
						}
					}
				}, this);

		// 创建菜单
		if (!this.menu) {
			var ms = [];
			this.operators.each(function(c) {
						if (typeof c == "string") {
							if (c == "-")
								ms.push(c);
						} else {
							if (!c.showInToolbarOnly) {
								var co = this.operatorConfig2Component(c, true);
								if (!co.type) {
									ms.push(co);
								}
							}
						}
					}, this);
			ms.push({
						name : "btn_help",
						text : "帮助",
						handler : this.help,
						scope : this
					});
			this.menu = new Ext.menu.Menu({
						items : ms
					});
		}
		return bs;
	},
	// private
	initOperator : function() {
		this.initDisableOperators();
		this.operators = new Ext.util.MixedCollection();
		for (var i = 0; i < this.crud_operators.length; i++) {
			var co = this.crud_operators[i];
			if (typeof co == "object") {
				co = Ext.apply({}, co);
				if (!co.batch && !co.noneSelectRow)
					co.singleRow = true;// noneSelectRow表示不需要进行行选择
			}
			var key = co.name || co.id;
			if (key && this.disable_operators.indexOf(key) >= 0)
				continue;// 如果被禁用,则不用加入到operators中
			this.operators.add(co);
		}
		if (this.customizeQueryObject) {
			this.operators.add({
						showInToolbarOnly : true,
						name : "btn_customizeQuery",
						cls : "x-btn-icon",
						icon : "images/icon-png/srsearch.gif",
						tooltip : "自定义查询",
						text : "",
						menu : ["-", {
									text : "保存当前查询条件",
									handler : this.createQueryObject,
									scope : this
								}, {
									text : "管理自定义查询",
									handler : this.manageQueryObject,
									scope : this
								}]
					})
		}
		if (this.gridButtons) {
			var bi = (this.disable_operators.indexOf("searchField") >= 0
					? this.operators.getCount() - 1
					: this.operators.getCount() - 2);
			this.insertOperator(bi, this.gridButtons);
		}
	},
	/**
	 * 向业务对象列表工具栏(toptoolbar)指定位置插入一个或一组工具栏组件。<br/>
	 * 
	 * @param {Integer}
	 *            index 要插入工具栏的位置
	 * @param {Objec|Array}
	 *            items 要插入的工具栏组件<br/> 要插入的工具栏组件式一个或者一组配置对象。有几种类型，
	 *            <ul>
	 *            <li>文字或者按钮，直接使用{text:'',scope:this,handler:function}样式即可。</li>
	 *            <li>标准分隔符，支持'-','->'标准工具栏分隔符。</li>
	 *            <li>其他自定义组件。如果是要插入文本框，下拉列表框，或其他自定义组件，只需要加上xtype即可。比如{xtype:'textfield',name:'',id:''}。</li>
	 *            </ul>
	 * 
	 * 在CrudFunction中，还提供了很多可选的，系统支持的配置选项，用来直接定义工具栏组件。<br/>
	 * <ul>
	 * <li>{Boolean} batch:设置为batch属性的组件，在列表选中一个或者多个的时候自动启用，没有选中数据时禁用。</li>
	 * <li>{Boolean} noneSelectRow:设置为noneSelectRow属性的组件，在列表非选中的状态下可用，选中数据禁用。</li>
	 * <li>{Boolean}
	 * singleRow:设置为singleRow属性的组件，在列表选中一个的时候自动启用，没有选中数据货选中多个数据时禁用。</li>
	 * <li>{Boolean} showInMenuOnly:该组件只在右键菜单项中显示，不在列表的工具栏中显示。</li>
	 * <li>{Boolean} showInToolbarOnly:该类组件只在列表的工具栏中显示，不在列表的右键菜单显示。</li>
	 * <li>{String} method：如果菜单项是个按钮，并且设置了method属性，则直接匹配this.method作为其handler</li>
	 * <li>{String}
	 * cmd:如果菜单项是个按钮，并且设置了cmd属性，则直接匹配this.executeMulitCmd(cmd)或者this.executeCmd(cmd)作为其handler</li>
	 * </ul>
	 */
	insertOperator : function(index, items) {
		if (!this.operators) {
			this.initOperator();
		}

		if (!Ext.isArray(items))
			items = [items];
		if (this.operators.getCount() < index)
			index = this.operators.getCount();

		var haveRender = this.grid && this.grid.getTopToolbar
				&& this.grid.getTopToolbar() && this.grid.getTopToolbar().items;

		for (var i = 0; i < items.length; i++) {
			var co = items[i];
			if (typeof co == "object") {
				co = Ext.apply({}, co);
				if (!co.batch && !co.noneSelectRow)
					co.singleRow = true;// noneSelectRow表示不需要进行行选择
			}
			this.operators.insert(index + i, co);
			if (haveRender) {
				if (!co.showInMenuOnly) {
					var bo = this.operatorConfig2Component(Ext.apply({}, co));
					this.grid.getTopToolbar().insert(index + i, bo);
				}
				if (!co.showInToolbarOnly) {
					var mo = this.operatorConfig2Component(co, true);
					if (this.menu)
						this.menu.insert(index + i, new Ext.menu.Item(mo));
				}
			}
		}
	},
	// private
	initDisableOperators : function() {
		if (!this.disable_operators)
			this.disable_operators = [];
		if (!this.exportData)
			this.disable_operators.push("btn_export");
		if (!this.importData)
			this.disable_operators.push("btn_import");
		if (!this.printData)
			this.disable_operators.push("btn_print");
		if (!this.clearData)
			this.disable_operators.push("btn_clearSearch");
		if (!this.allowSearch)
			this.disable_operators.push("btn_advancedSearch");
		if (!this.showAdd)
			this.disable_operators.push("btn_add");
		if (!this.showEdit)
			this.disable_operators.push("btn_edit");
		if (!this.showRemove)
			this.disable_operators.push("btn_remove");
		if (!this.showView)
			this.disable_operators.push("btn_view");
		if (!this.showRefresh)
			this.disable_operators.push("btn_refresh");
		if (!this.showSearchField)
			this.disable_operators.push("searchField");
	},
	// private
	manageQueryObject : function() {
		var win = new UserQueryObjectWin({
					crudService : this,
					objName : this.queryObjectName
				});
		win.show();
	},
	// private
	createQueryObject : function() {
		if (!this.searchQueryObjectPanel) {
			if (this.searchFP || this.searchFormPanel) {
				this.searchQueryObjectPanel = this.searchFP
						? this.searchFP()
						: this.searchFormPanel();
				this.searchQueryObjectPanel.insert(0, {
							fieldLabel : '查询器名称',
							xtype : "textfield",
							name : "queryObjectName",
							anchor : "-20",
							allowBlank : false
						});
				this.searchQueryObjectPanel.insert(1, {
							fieldLabel : '关键字',
							xtype : "textfield",
							name : "searchKey",
							anchor : "-20"
						});
			}
		}
		if (!this.searchQueryObjectPanel)
			return null;// 如果没有定义searchFP或searchFormPanel，则返回
		var win = this.createGlobalWin("CrudQueryObjectWindow",
				this.searchWin.width, this.searchWin.height + 60, "保存查询条件",
				this.searchQueryObjectPanel, null, "searchQueryObjectPanel", [{
							id : "tb_search",
							text : "保存",
							handler : this.saveQueryObject,
							iconCls : 'search'
						}, {
							text : "取消",
							iconCls : 'delete',
							handler : function() {
								EasyJF.Ext.CrudQueryObjectWindow.hide()
							}
						}]);
		win.getComponent(0).form.setValues(this.store.baseParams || {});
		win.getComponent(0).form.findField("queryObjectName").setValue("");
	},
	/**
	 * 保存用户自定义查询条件方法。<br/>
	 * 如果开启了业务支持用户自定义查询方法，该方法在用户自定义了查询条件后，会向后台发送一个保存查询条件的请求:<br/>
	 * {url:serQueryObject.ejf?cmd=save}，同时提交的还有高级查询面板中定义的各个查询项所设置的值。
	 * 
	 */
	saveQueryObject : function() {
		var win = EasyJF.Ext.CrudQueryObjectWindow;
		if (!win.getComponent(0).form.isValid()) {
			Ext.Msg.alert("提示", "必填项必须填写!");
			return;
		}
		var o = win.getComponent(0).form.getValues(false);
		var title = o.queryObjectName;
		delete o.queryObjectName;
		var service = win.crudService;

		var params = {
			title : title,
			content : Ext.urlEncode(o),
			objName : service.queryObjectName
		};
		Ext.Ajax.request({
			url : "userQueryObject.ejf?cmd=save",
			params : params,
			success : function(response) {
				var ret = Ext.decode(response.responseText);
				if (ret.success) {
					this.addQueryObjectOperator([params]);
					Ext.Msg.alert("提示", "操作成功!", this.focus, this);
					win.hide();
				} else {
					Ext.Msg.alert("无法保存", ret.errors.msg, function() {
						win.getComponent(0).form.findField("searchKey").focus();
					});
				}
			},
			scope : service
		});
	},
	/**
	 * 按照自定义查询条件查询业务对象列表。
	 * 
	 * @param {Component}
	 *            c 创建的自定义查询条件所对应的查询条件。
	 *            也可以构造一个对象，该对象包含了一个content{String}属性，该属性中定义了要提交的请求参数。
	 */
	searchByQueryObject : function(c) {
		if (c.content) {
			var params = Ext.urlDecode(c.content);
			if (this.searchField)
				this.searchField.setValue(params.searchField || "");
			this.store.baseParams = params;
			if (this.store.lastOptions && this.store.lastOptions.params)
				this.store.lastOptions.params.start = 0;
		}
		this.refresh();
	},
	// private
	addQueryObjectOperator : function(objs) {
		if (objs && objs.length) {
			var o = this.operators.find(function(c) {
						var n1 = c.name || c.id;
						if (n1 == "btn_customizeQuery")
							return true;
					});
			if (!o)
				return;
			var haveRender = this.grid && this.grid.getTopToolbar
					&& this.grid.getTopToolbar()
					&& this.grid.getTopToolbar().items;
			var btn_customizeQuery = this["btn_customizeQuery"];
			for (var i = 0; i < objs.length; i++) {
				var co = objs[i];
				co.scope = this;
				co.text = co.title;
				co.name = "query_menu" + co.title;
				co.handler = this.searchByQueryObject;
				o.menu.splice(0, 0, co);
				if (btn_customizeQuery) {
					btn_customizeQuery.menu.insert(0, new Ext.menu.Item(co));
				}
			}

		}
	},
	// private
	removeQueryObjectOperator : function(name) {
		var btn_customizeQuery = this["btn_customizeQuery"];
		if (btn_customizeQuery) {
			var item = btn_customizeQuery.menu.items.find(function(c) {
						var n1 = c.name || c.id;
						if (n1 == "query_menu" + name)
							return true;
					});
			if (item)
				btn_customizeQuery.menu.remove(item);
		}
	},
	// private
	useOperatorsPermission : function(args) {
		var ret = args || this.permissions;
		var args = [];
		for (var i = 0; i < ret.length; i++) {
			args.push(ret[i]);
			var o = this.operators.find(function(c) {
						var n1 = c.name || c.id;
						if (n1 == args[i])
							return true;
					});
			if (o)
				o.hidden = false;
		}
		this.showOperaterItem(args);
		this.fireEvent("usepermission", this);
	},
	// private
	loadOperatorsPermission : function() {
		var args = {}, names = [], actions = [], cmds = [];
		var baseUrl = this.baseUrl;
		this.operators.each(function(o) {
					if (typeof o != "string") {
						if (!o.clientOperator && (o.cmd || o.method)) {
							actions.push(o.action || baseUrl);
							cmds.push(o.cmd || o.method || "");
							names.push(o.name || o.id || "");
						}
					}
				});
		if (!this.permissions) {
			var objs = {
				names : names,
				actions : actions,
				cmds : cmds
			};
			if (this.customizeQueryObject && this.queryObjectName) {
				objs.queryObjectName = this.queryObjectName;
			}
			if (Lanyo_Ajax.permissionCheck) {
				Ext.Ajax.request({
					url : (Lanyo_Ajax.permissionCheckAction || "permissionCheck.ejf"),
					params : objs,
					callback : function(options, success, response) {
						var ret = Ext.decode(response.responseText);
						if (ret && ret.permissions && ret.permissions.length) {// 处理权限
							this.permissions = ret.permissions;
							this.useOperatorsPermission();
						}
						if (ret && ret.queryObjects) {
							this.addQueryObjectOperator(ret.queryObjects);
						}
					},
					scope : this
				});
			} else {
				this.permissions = ["btn_add", "btn_edit", "btn_view",
						"btn_remove", "btn_refresh"];
				this.useOperatorsPermission();
			}
		} else {
			this.useOperatorsPermission();
		}
	},
	// private
	checkAdnLoadColumnField : function() {
		if (!this.storeMapping) {
			var url = this.baseUrl + "?cmd=loadColumnField";
			if (this.entityClzName) {
				url = "extApp.ejf?cmd=loadColumnField&entityClzName="
						+ this.entityClzName;
			}
			var ajax = Ext.lib.Ajax.syncRequest("POST", url, "");
			var ret = Ext.decode(ajax.conn.responseText);
			if (ret && ret.fields) {
				this.storeMapping = ret.fields;
				if (ret.columnMap && !this.columns && !this.cm) {
					this.columns = [];
					for (var index in ret.columnMap) {
						var c = ret.columnMap[index];
						c.dataIndex = c.name;
						if (!c.header)
							c.header = c.name;
						var d = [];
						if (this.autoDisplayFields
								&& this.autoDisplayFields.indexOf(c.name) < 0) {
							c.hidden = true;
						}
						if (this.autoHideFields
								&& this.autoHideFields.indexOf(c.name) >= 0) {
							c.hidden = true;
						}
						if (this.disableHideableFields
								&& this.disableHideableFields.indexOf(c.name) >= 0) {
							c.hideable = false;
						}
						if (c.sortable === undefined) {
							if (c.type != "object") {
								c.sortable = true;
							}
						}
						if (!c.renderer) {// 自动处理Renderer
							if (c.type == "date") {
								c.renderer = this.dateRender("Y-m-d");
							} else if (c.type == "object" || c.type == "map") {
								c.renderer = this.objectAutoRender;
							}
						} else {// 把renderer转换成javascript对象
							try {
								c.renderer = Ext.decode(c.renderer);
							} catch (e) {
							}
						}
						this.columns.push(c);
					}
				}
			}
		}
	},
	// private
	haveOperatorRights : function(btn) {
		return this[btn] && (!(this[btn].disabled || this[btn].hidden));
	},
	// private
	handleCrudKey : function(e) {
		if (!(e.isSpecialKey() || e.altKey || e.getKey() == e.DELETE))
			return;
		if (e.getKey() == Ext.EventObject.ENTER && !e.ctrlKey) {
			e.stopEvent();
			this.edit();
		} else if (e.altKey && e.getKey() == 'c'.charCodeAt(0)
				&& this.haveOperatorRights("btn_edit") && this.copy) {
			e.stopEvent();
			this.copy();
		} else if (e.altKey && e.getKey() == 'a'.charCodeAt(0)
				&& this.haveOperatorRights("btn_add")) {
			e.stopEvent();
			this.create();
		} else if (e.altKey && e.getKey() == 'e'.charCodeAt(0)
				&& this.haveOperatorRights("btn_edit")) {
			e.stopEvent();
			this.edit();
		} else if (e.altKey && e.getKey() == 'v'.charCodeAt(0)
				&& this.haveOperatorRights("btn_view")) {
			e.stopEvent();
			this.view();
		} else if ((e.getKey() == e.DELETE || (e.altKey && e.getKey() == 'd'
				.charCodeAt(0)))
				&& this.haveOperatorRights("btn_remove")) {
			e.stopEvent();
			this.removeData();
		} else if (e.altKey && e.getKey() == 's'.charCodeAt(0)) {
			e.stopEvent();
			this.advancedSearch();

		} else if ((e.getKey() == e.PRINT_SCREEN || (e.altKey && e.getKey() == 'p'
				.charCodeAt(0)))
				&& this.haveOperatorRights("btn_print")) {
			e.stopEvent();
			this.printRecord();
		} else if (e.altKey && e.getKey() == 'o'.charCodeAt(0)
				&& this.haveOperatorRights("btn_export")) {
			e.stopEvent();
			this.exportExcel();

		} else if (e.altKey && e.getKey() == 'i'.charCodeAt(0)
				&& this.haveOperatorRights("btn_import")) {
			e.stopEvent();
			this.importExcel();

		}

	},
	/**
	 * 定义的CrudFunction的响应事件。 系统级的事件定义：
	 * <ul>
	 * <li>celldblclick:this.edit 双击列表项进入编辑模式</li>
	 * <li>cellclick:this.doOperate 点击列表项可能触发operaterRender的响应事件</li>
	 * <li>keypress:this.handleCrudKey 系统的快捷键响应</li>
	 * </ul>
	 */
	initCrudEventHandler : function() {		// 双击表格行进入编辑状态
		this.grid.on("celldblclick", this.edit, this);
		this.grid.on("cellclick", this.doOperate, this);
		this.grid.on("keypress", this.handleCrudKey, this);
		
		var rowSelFn = function(g, index, r) {
			this.onRowSelection(r, index, g);
		};
		
		this.grid.getSelectionModel().on({
			scope : this,
			rowselect : rowSelFn,
			rowdeselect : rowSelFn
		});
		if (this.showMenu) {
			this.grid.on("rowcontextmenu", this.showContextMenu, this);
		}
		EasyJF.Ext.Util.autoFocusFirstRow(this.grid);
	},
	focus : function() {
		this.focusCrudGrid();
	},
	/**
	 * 让业务对象列表获得焦点<br/> 默认选中第一行。
	 * 
	 * @param {Ext.grid.GridPanel}
	 *            grid 要获得焦点的列表（一般是this.grid）
	 */
	focusCrudGrid : function(grid) {
		var g = grid || this.grid;
		if (g && g.rendered) {
			var sel = g.getSelectionModel();
			if (sel && sel.hasSelection()) {
				g.getView().focusRow(g.store.indexOf(g.getSelectionModel()
						.getSelected()));
			} else if (g.store.getCount()) {
				g.getView().focusRow(0);
			} else {
				g.focus();
			}
		}
	},
	/**
	 * 帮助。 子类覆盖该方法实现自定义的模块帮助。
	 */
	help : function() {
		Ext.Msg.show({
					title : "系统帮助",
					buttons : Ext.Msg.OK,
					icon : Ext.Msg.INFO,
					msg : "欢迎使用本系统!"
				});
	}
}
/**
 * 增、删、改、查面板基类 该类是配合CrudFunction，用作页面的样式渲染。<br/>
 * 所有的拥有添删改查的业务对象管理页面都可以通过继承该类完成快速页面开发<br/>
 * 
 * @class EasyJF.Ext.CrudPanel
 * @extends Ext.Panel
 */
EasyJF.Ext.CrudPanel = Ext.extend(Ext.Panel, {
	// private
	border : false,
	// private
	layout : 'fit',
	// private
	closable : true,
	// private
	autoScroll : true,
	/**
	 * @cfg {Boolean} gridForceFit 业务对象列表页面列表是否支持宽度自适应。
	 */
	gridForceFit : true,
	/**
	 * 导入说明
	 * @type String
	 */
	importExplain : "",
	/**
	 * @cfg {Object} viewWin 如果开启了查看业务流程，则该对象定义了查看窗口的样式。
	 *      <ul>
	 *      <li>{Integer} width 窗口宽度</li>
	 *      <li>{Integer} height 窗口高度</li>
	 *      <li>{String} title 窗口标题</li>
	 *      </ul>
	 */
	viewWin : {
		width : 650,
		height : 410,
		title : "详情查看"
	},
	/**
	 * @cfg {Object} searchWin 如果开启了高级查询业务流程，则该对象定义了高级查询窗口的样式。
	 *      <ul>
	 *      <li>{Integer} width 窗口宽度</li>
	 *      <li>{Integer} height 窗口高度</li>
	 *      <li>{String} title 窗口标题</li>
	 *      </ul>
	 */
	searchWin : {
		width : 630,
		height : 300,
		title : "高级查询"
	},
	/**
	 * @cfg {Object} gridViewConfig 自定义的业务对象列表表格的视图样式配置。
	 *      比如经常会自定义表格视图的getRowClass属性来在列表中控制不同状态的业务对象的显示方式。
	 */
	gridViewConfig : {},
	/**
	 * @cfg {Object} gridConfig 自定义的业务对象列表表格的配置。
	 */
	gridConfig : {},
	/**
	 * @cfg {Object} baseQueryParameter 定义的查询初始化参数
	 *      该参数会一直绑定在业务对象列表的store上。在实际的开发中，一般用来区分类似于销售出库单，报损单等相同模型，近似逻辑的单据。
	 */
	baseQueryParameter : {},
	/**
	 * @cfg {String} localStoreVar 是否开启客户端cache。如果设置了该属性名称，则会用该名称来标示全局缓存store。
	 *      一旦设置了该属性，列表会使用EasyJF.Ext.CachedRemoteStore作为业务对象列表的store。
	 */
	localStoreVar : window.undefined,// 客户端cache的名称
	// private
	bulidGridStore : function() {
		var storeConfig = {
			id : this.storeId ? this.storeId : "id",
			url : this.defaultCmd ? (this.formatUrl('list')) : this.baseUrl,
			root : "result",
			autoDestroy : true,
			totalProperty : "rowCount",
			pageSize : this.pageSize,
			remoteSort : true,
			fields : this.storeMapping
		};
		if (Ext.isEmpty(this.localStoreVar, false)) {
			this.store = new Ext.data.JsonStore(storeConfig);
		} else {
			this.store = new EasyJF.Ext.CachedRemoteStore(Ext.apply({
						varName : this.localStoreVar,
						pageSize : Ext.num(this.pageSize, 20)
					}, storeConfig));
		}

		this.store.baseParams = Ext.apply({}, {
					limit : this.pageSize || ""
				}, this.initQueryParameter || {});
		if (Ext.objPcount(this.baseQueryParameter)) {
			this.store.on('beforeload', function(store, options) {
						Ext.apply(store.baseParams, this.baseQueryParameter);
					}, this);
		}
		this.store.paramNames.sort = "orderBy";
		this.store.paramNames.dir = "orderType";
		return this.store;
	},
	/**
	 * @event saveobject 当保存或者修改业务对象成功后抛出的事件
	 * 
	 * @param {EasyJF.Ext.Util.CrudPanel}
	 *            this CrudPanel自身
	 * @param {Ext.form.BasicForm}
	 *            form 提交的表单
	 * @param {Ext.form.Action}
	 *            action 提交表单绑定的acion对象。
	 */
	/**
	 * @event removeobject 当删除业务对象成功后抛出的事件
	 * 
	 * @param {EasyJF.Ext.Util.CrudPanel}
	 *            this CrudPanel自身
	 * @param {Ext.data.Record}
	 *            r 删除的对象在列表中对应的record对象。
	 * @param {Object}
	 *            option 提交请求绑定的option对象。
	 */
	// private
	initComponent : function() {
		this.checkAdnLoadColumnField();
		this.store = this.bulidGridStore();

		this.addEvents("saveobject", "removeobject");// 增加saveobject及removeobject事件
		EasyJF.Ext.CrudPanel.superclass.initComponent.call(this);

		var buttons = this.buildCrudOperator();
		
		var viewConfig = Ext.apply( {
			forceFit : this.gridForceFit
		}, this.gridViewConfig);
		var gridConfig = Ext.apply(this.gridConfig, {
			store : this.store,
			stripeRows : true,
			trackMouseOver : false,
			loadMask : true,
			viewConfig : viewConfig,
			tbar : buttons,
			border : false,
			bbar : this.gridBbar
					|| (this.pagingToolbar
							? new Ext.ux.PagingComBo( {
								rowComboSelect : true,
								pageSize : this.pageSize,
								store : this.store,
								displayInfo : true
							})
							: null)
		});
		
		if (this.summaryGrid) {
			if (gridConfig.plugins) {
				if (typeof gridConfig.plugins == "object")
					gridConfig.plugins = [gridConfig.plugins];
			} else
				gridConfig.plugins = [];
			gridConfig.plugins[gridConfig.plugins.length] = new Ext.ux.grid.GridSummary();
		}
		var columns = this.columns , cfg = {};
		columns = columns || this.cm.config;
		delete gridConfig.cm;
		
		columns = [].concat(columns); 
		if(this.gridRowNumberer){
			columns.unshift(new Ext.grid.RowNumberer({header:'序号',width:36}));
		}
		
		if((!gridConfig.sm && !gridConfig.selModel) && this.gridSelModel=='checkbox'){
			cfg.sm = new Ext.grid.CheckboxSelectionModel();
			if(columns[0] instanceof Ext.grid.RowNumberer){
				columns.splice(1,0,cfg.sm);	
			}else{
				columns.unshift(cfg.sm);
			}
		}
		cfg.columns = columns;
		
		gridConfig = Ext.applyIf(cfg,gridConfig);
		
		if (this.columnLock && Ext.grid.LockingGridPanel) {
			this.grid = new Ext.grid.LockingGridPanel(gridConfig);
		} else
			this.grid = new Ext.grid.GridPanel(gridConfig);
		
		// this.grid.colModel.defaultSortable = true;// 设置表格默认排序
		this.loadOperatorsPermission();
		// 双击表格行进入编辑状态
		this.initCrudEventHandler();
		this.add(this.grid);
		if (this.autoLoadGridData)
			this.store.load();
	}
});
Ext.applyIf(EasyJF.Ext.CrudPanel.prototype, EasyJF.Ext.CrudFunction);

/**
 * @class ExtAppBasePanel
 * @extend Ext.Panel
 * 
 * ExtApp的基类，用于实现通过iframe的方式把指定script文件中的指定appClass加载到iframe中显示
 */
ExtAppBasePanel = Ext.extend(Ext.Panel, {
	appClass : "",
	script : "",
	otherScripts : "",
	border : false,
	layout : "fit",
	closable : true,
	initComponent : function() {
		// this.html="<iframe frameborder='0' scrolling='auto'
		// src='extApp.ejf?appClass=BBSDirManagePanel&script=bbs.js'></iframe>";
		ExtAppBasePanel.superclass.initComponent.call(this);
		this.on("resize", function(c) {
			if (!c.framePanel) {
				var h = "<iframe width='100%' height='"
						+ c.body.getHeight(true)
						+ "px' frameborder='0' scrolling='auto' src='extApp.ejf?appClass="
						+ this.appClass + "&script=" + this.script
						+ "&otherScripts=" + this.otherScripts + "&params="
						+ this.params + "'></iframe>";
				c.body.update(h);
				c.framePanel = c.body.dom.firstChild;
			} else {
				c.framePanel.height = c.body.getHeight(true);
			}
		}, this)
	}
});

/**
 * @class EasyJF.Ext.TreeComboField
 * @extends Ext.form.TriggerField
 * 
 * 树状下拉框,基于TriggerFiel可以下拉出一个TreePanel供用户选择
 * 
 * <pre>
 * <code>
 *  //示例：
 *  //一般的应用来说，树状菜单的Loader使用Cache。
 *  //定制一个货品分类的树cache加载器。
 *  if (!Global.productDirLoader) {
 *  Global.productDirLoader = new EasyJF.Ext.MemoryTreeLoader({
 *  varName : &quot;Global.PRODUCT_DIR_NODES&quot;,
 *  url : &quot;productDir.ejf?cmd=getProductDirTree&amp;pageSize=-1&amp;treeData=true&amp;all=true&quot;,
 *  listeners : {
 *  'beforeload' : function(treeLoader, node) {
 *  treeLoader.baseParams.id = (node.id.indexOf('root') &lt; 0? node.id: &quot;&quot;);
 *  if (typeof node.attributes.checked !== &quot;undefined&quot;) {
 *  treeLoader.baseParams.checked = false;
 *  }
 *  }
 *  }
 *  });
 *  } 
 * 
 *  //创建一个树状下拉框
 *  this.productDir = new EasyJF.Ext.TreeComboField({
 *  xtype : &quot;treecombo&quot;,
 *  fieldLabel : &quot;所属分类&quot;,
 *  emptyText : &quot;分类&quot;,
 *  name : &quot;dirId&quot;,
 *  leafOnly : true,
 *  width:60,
 *  listWidth:120,
 *  hiddenName : &quot;dirId&quot;,
 *  displayField : &quot;title&quot;,
 *  allowBlank : false,
 *  tree : new Ext.tree.TreePanel({
 *  autoScroll:true,
 *  root : new Ext.tree.AsyncTreeNode(
 *  {
 *  id : &quot;root&quot;,
 *  text : &quot;产品分类&quot;,
 *  expanded : true,
 *  loader : Global.productDirLoader
 *  })
 *  }),
 *  listeners:{
 *  beforeSetValue:function(combo,val){
 *  if(val==0){
 *  combo.clearValue();
 *  return false;
 *  }
 *  },
 *  scope:this
 *  }		
 *  });
 * 
 *  //后台代码需要解析业务对象的树结构。
 *  public Page doGetProductDirTree(WebForm form) {
 *  String id = CommUtil.null2String(form.get(&quot;id&quot;));
 *  String prefix = CommUtil.null2String(form.get(&quot;prefix&quot;));
 *  if (!&quot;&quot;.equals(prefix)) {
 *  id = id.replaceAll(prefix, &quot;&quot;);
 *  }
 *  QueryObject query = new QueryObject();
 *  query.setPageSize(-1);
 *  if (!&quot;&quot;.equals(id)) {
 *  ProductDir parent = this.service.getProductDir(new Long(id));
 *  query.addQuery(&quot;obj.parent&quot;, parent, &quot;=&quot;);
 *  } else {
 *  query.addQuery(&quot;obj.parent is EMPTY&quot;, null);
 *  }
 *  query.setOrderBy(&quot;sequence&quot;);
 *  CompanyUtil.addAdvDistributorQueryStr(query);
 *  IPageList pageList = this.service.getProductDirs(query);
 *  String checked = CommUtil.null2String(form.get(&quot;checked&quot;));
 *  String all = CommUtil.null2String(form.get(&quot;all&quot;));
 *  List&lt;Map&gt; nodes = new java.util.ArrayList&lt;Map&gt;();
 *  if (pageList.getRowCount() &gt; 0) {
 *  for (int i = 0; i &lt; pageList.getResult().size(); i++) {
 *  ProductDir category = (ProductDir) pageList.getResult().get(i);
 *  Map map = obj2treemap(category, !&quot;&quot;.equals(checked), &quot;true&quot;.equals(all), prefix);
 *  nodes.add(map);
 *  }
 *  } else {
 *  Map map = new HashMap();
 *  map.put(&quot;text&quot;, &quot;无分类&quot;);
 *  map.put(&quot;id&quot;, &quot;0&quot;);
 *  map.put(&quot;leaf&quot;, true);
 *  map.put(&quot;icon&quot;, &quot;images/menuPanel/tag_blue3.gif&quot;);
 *  nodes.add(map);
 *  }
 *  form.jsonResult(nodes);
 *  return Page.JSONPage;
 *  }
 * </code>
 * </pre>
 * 
 * @xtype treecombo
 */
EasyJF.Ext.TreeComboField = Ext.extend(Ext.form.TriggerField, {
	/**
	 * @cfg {String} valueField 取值绑定的字段名，默认为'id'
	 */
	valueField : "id",
	/**
	 * @cfg {String} displayField 下拉树种显示名称绑定的字段名，默认为'name'
	 */
	displayField : "name",
	/**
	 * @cfg {Integer} minListWidth 最小的列表显示宽度
	 */
	minListWidth : 70,
	haveShow : false,
	/**
	 * @cfg {Boolean} editable 是否默认可编辑 默认为false
	 */
	editable : false,
	/**
	 * @cfg {Boolean} returnObject 返回值是否作为对象返回
	 */
	returnObject : false,
	/**
	 * @cfg {Boolean} leafOnly 是否只能选择叶子节点，默认可以选择任何节点。
	 */
	leafOnly : false,
	/**
	 * @cfg {Integer} clicksFinishEdit 在节点上点击作为选择的次数
	 */
	clicksFinishEdit : 1,
	/**
	 * @cfg {Boolean} readOnly 是否只读
	 */
	readOnly : false,
	hiddenNodes : [],
	// private
	initEvents : function() {
		EasyJF.Ext.TreeComboField.superclass.initEvents.call(this);
		this.keyNav = new Ext.KeyNav(this.el, {
					"up" : function(e) {
						this.inKeyMode = true;
						this.selectPrevious();
					},

					"down" : function(e) {
						if (!this.isExpanded()) {
							this.onTriggerClick();
						} else {
							this.inKeyMode = true;
							this.selectNext();
						}
					},
					"enter" : function(e) {
						var sm = this.tree.getSelectionModel();
						if (sm.getSelectedNode()) {
							var node = sm.getSelectedNode();
							this.choice(node);
							sm.clearSelections();
							return;
						}
					},
					"esc" : function(e) {
						this.collapse();
					},
					scope : this
				});
		this.queryDelay = Math.max(this.queryDelay || 10, this.mode == 'local'
						? 10
						: 250);
		this.dqTask = new Ext.util.DelayedTask(this.initQuery, this);
		if (this.typeAhead) {
			this.taTask = new Ext.util.DelayedTask(this.onTypeAhead, this);
		}
		if (this.editable !== false) {
			this.el.on("keyup", this.onKeyUp, this);
		}
		if (this.forceSelection) {
			this.on('blur', this.doForce, this);
		}
	},
	// private
	selectPrevious : function() {
		var sm = this.tree.getSelectionModel();
		if (!sm.selectPrevious()) {
			var root = this.tree.getRootNode();
			sm.select(root);
			this.el.focus();
		} else {
			this.el.focus();
		}
	},
	// private
	selectNext : function() {
		var sm = this.tree.getSelectionModel();
		if (!sm.selectNext()) {
			var root = this.tree.getRootNode();
			sm.select(root);
			this.el.focus();
		} else {
			this.el.focus();
		}
	},
	// private
	onTriggerClick : function() {
		if (this.readOnly || this.disabled) {
			return false;
		} else if (!this.tree.rendered || !this.list) {
			this.treeId = Ext.id();
			this.list = new Ext.Layer({
						id : this.treeId,
						cls : "x-combo-list",
						constrain : false
					});
			if (!this.innerDom)
				this.innerDom = Ext.getBody().dom;
			if (this.tree.rendered) {
				this.list.appendChild(this.tree.el);
			} else {
				this.tree.render(this.treeId);
				var lw = this.listWidth
						|| Math.max(this.wrap.getWidth(), this.minListWidth);
				this.tree.setWidth(lw);
				this.tree.on("expandnode", this.restrictHeight, this);
				this.tree.on("collapsenode", this.restrictHeight, this);
			}
		} else
			this.restrictHeight();
		this.expand();
	},
	// private
	restrictHeight : function() {
		// this.list.dom.style.height = '';
		if (!this.list)
			return;
		var inner = this.innerDom;
		var h = inner.clientHeight - this.wrap.getBottom();
		if (this.tree.el.dom.offsetHeight >= h) {
			this.tree.setHeight(h);
		} else {
			this.tree.setHeight("auto");
		}
		// this.list.alignTo(this.getEl(), "tl-bl?");
	},
	// private
	filterTree : function(e) {
		if (!this.isExpanded())
			this.expand();
		var text = e.target.value;
		Ext.each(this.hiddenNodes, function(n) {
					n.ui.show();
				});
		if (!text) {
			this.filter.clear();
			return;
		}
		this.tree.expandAll();
		this.restrictHeight();
		this.filter.filterBy(function(n) {
					return (!n.attributes.leaf || n.text.indexOf(text) >= 0);
				});

		// hide empty packages that weren't filtered
		this.hiddenNodes = [];
		this.tree.root.cascade(function(n) {
					if (!n.attributes.leaf && n.ui.ctNode.offsetHeight < 3) {
						n.ui.hide();
						this.hiddenNodes.push(n);
					}
				}, this);
	},
	// private
	expand : function() {
		if (this.list) {
			Ext.getDoc().on('mousedown', this.hideIf, this);
			/*
			 * if(!this.tree.body.isScrollable()){ this.tree.setHeight('auto'); }
			 */
			this.list.show();
			this.list.alignTo(this.getEl(), "tl-bl?");
		} else {
			this.onTriggerClick();
		}
	},
	// private
	collapse : function() {
		if (this.list) {
			this.list.hide();
			Ext.getDoc().un('mousedown', this.hideIf, this);
		}
	},
	// private
	onEnable : function() {
		EasyJF.Ext.TreeComboField.superclass.onEnable.apply(this, arguments);
		if (this.hiddenField) {
			this.hiddenField.disabled = false;
		}
	},
	// private
	onDisable : function() {
		EasyJF.Ext.TreeComboField.superclass.onDisable.apply(this, arguments);
		if (this.hiddenField) {
			this.hiddenField.disabled = true;
		}
		Ext.getDoc().un('mousedown', this.hideIf, this);
	},
	// private
	hideIf : function(e) {
		if (!e.within(this.wrap) && !e.within(this.list)) {
			this.collapse();
		}
	},
	// private
	initComponent : function() {
		EasyJF.Ext.TreeComboField.superclass.initComponent.call(this);
		this.addEvents('beforeSetValue');
		this.filter = new Ext.tree.TreeFilter(this.tree, {
					clearBlank : true,
					autoClear : true
				});
	},
	// private
	onRender : function(ct, position) {
		EasyJF.Ext.TreeComboField.superclass.onRender.call(this, ct, position);
		if (this.clicksFinishEdit > 1)
			this.tree.on("dblclick", this.choice, this);
		else
			this.tree.on("click", this.choice, this);
		if (this.hiddenName) {
			this.hiddenField = this.el.insertSibling({
						tag : 'input',
						type : 'hidden',
						name : this.hiddenName,
						id : (this.hiddenId || this.hiddenName)
					}, 'before', true);
			this.hiddenField.value = this.hiddenValue !== undefined
					? this.hiddenValue
					: this.value !== undefined ? this.value : '';
			this.el.dom.removeAttribute('name');
		}
		if (!this.editable) {
			this.editable = true;
			this.setEditable(false);
		} else {
			this.el.on('keydown', this.filterTree, this, {
						buffer : 350
					});
		}
	},
	/**
	 * 返回选中的树节点
	 * 
	 * @return {Object} ret 选中的节点值。
	 */
	getValue : function(returnObject) {
		if ((returnObject === true) || this.returnObject)
			return typeof this.value != 'undefined' ? {
				value : this.value,
				text : this.text,
				toString : function() {
					return this.text;
				}
			} : "";
		return typeof this.value != 'undefined' ? this.value : '';
	},
	/**
	 * 清除选择的值。
	 */
	clearValue : function() {
		if (this.hiddenField) {
			this.hiddenField.value = '';
		}
		this.setRawValue('');
		this.lastSelectionText = '';
		this.applyEmptyText();
		this.value = "";
	},
	/**
	 * 验证选择的值
	 * 
	 * @return {Boolean} ret 如果选择的值合法，返回true。
	 */
	validate : function() {
		if (this.disabled
				|| this.validateValue(this.processValue(this.getValue()))) {
			this.clearInvalid();
			return true;
		}
		return false;
	},
	/**
	 * Returns whether or not the field value is currently valid by validating
	 * the processed value of the field. Note: disabled fields are ignored.
	 * 
	 * @param {Boolean}
	 *            preventMark True to disable marking the field invalid
	 * @return {Boolean} True if the value is valid, else false
	 */
	isValid : function(preventMark) {
		if (this.disabled) {
			return true;
		}
		var restore = this.preventMark;
		this.preventMark = preventMark === true;
		var v = this.validateValue(this.processValue(this.getValue()));
		this.preventMark = restore;
		return v;
	},
	/**
	 * Validates a value according to the field's validation rules and marks the
	 * field as invalid if the validation fails
	 * 
	 * @param {Mixed}
	 *            value The value to validate
	 * @return {Boolean} True if the value is valid, else false
	 */
	validateValue : function(value) {
		if (value.length < 1 || value === null) { // if it's
			// blank
			if (this.allowBlank) {
				this.clearInvalid();
				return true;
			} else {
				this.markInvalid(this.blankText);
				return false;
			}
		}
		if (value.length < this.minLength) {
			this.markInvalid(String.format(this.minLengthText, this.minLength));
			return false;
		}
		if (value.length > this.maxLength) {
			this.markInvalid(String.format(this.maxLengthText, this.maxLength));
			return false;
		}
		if (this.vtype) {
			var vt = Ext.form.VTypes;
			if (!vt[this.vtype](value, this)) {
				this.markInvalid(this.vtypeText || vt[this.vtype + 'Text']);
				return false;
			}
		}
		if (typeof this.validator == "function") {
			var msg = this.validator(value);
			if (msg !== true) {
				this.markInvalid(msg);
				return false;
			}
		}
		if (this.regex && !this.regex.test(value)) {
			this.markInvalid(this.regexText);
			return false;
		}
		return true;
	},
	readPropertyValue : function(obj, p) {
		var v = null;
		for (var o in obj) {
			if (o == p)
				return true;
			// v = obj[o];
		}
		return v;
	},
	/**
	 * 给该属性设值。设定的值符合树形列表中的某一个值，就会自动选中那个值。如果没有找到，则通过配置的valueNotFoundText显示指定的值。
	 * 
	 * @param {Object}
	 *            obj 设定的值
	 */
	setValue : function(obj) {
		if (!obj) {
			this.clearValue();
			return;
		}
		if (this.fireEvent('beforeSetValue', this, obj) === false) {
			return;
		}
		var v = obj;
		var text = v;
		var value = this.valueField || this.displayField;
		if (typeof v == "object" && this.readPropertyValue(obj, value)) {
			text = obj[this.displayField || this.valueField];
			v = obj[value];
		}

		var node = this.tree.getNodeById(v);
		if (node) {
			text = node.text;
		} else if (this.valueNotFoundText !== undefined) {
			text = this.valueNotFoundText;
		}
		this.lastSelectionText = text;
		if (this.hiddenField) {
			this.hiddenField.value = v;
		}
		EasyJF.Ext.TreeComboField.superclass.setValue.call(this, text);
		this.value = v;
		this.text = text;
	},
	/**
	 * 设置是否可编辑状态。
	 * 
	 * @param {Boolean}
	 *            value 设置的可编辑状态。
	 */
	setEditable : function(value) {
		if (value == this.editable) {
			return;
		}
		this.editable = value;
		if (!value) {
			this.el.dom.setAttribute('readOnly', true);
			this.el.on('mousedown', this.onTriggerClick, this);
			this.el.addClass('x-combo-noedit');
		} else {
			this.el.dom.setAttribute('readOnly', false);
			this.el.un('mousedown', this.onTriggerClick, this);
			this.el.removeClass('x-combo-noedit');
		}
	},
	// private
	choice : function(node, eventObject) {
		if ((!this.leafOnly || node.isLeaf())) {
			if (node.id != "root") {
				this.setValue(node.id);
			} else {
				this.clearValue();
				this.el.dom.value = node.text;
			}
			this.fireEvent('select', this, node);
			this.collapse();
			this.fireEvent('collapse', this);
		} else {
			if (node.id == "root") {
				this.clearValue();
				this.el.dom.value = node.text;
				this.fireEvent('select', this, node);
				this.collapse();
				this.fireEvent('collapse', this);
			}
		}
	},
	// private
	validateBlur : function() {
		return !this.list || !this.list.isVisible();
	},
	/**
	 * 判断列表是否处于展开状态
	 * 
	 * @return {Boolean} 是否处于展开状态
	 */
	isExpanded : function() {
		return this.list && this.list.isVisible();
	},
	canFocus : function() {
		return !this.disabled;
	},
	onDestroy : function() {
		if (this.tree.rendered && this.list) {
			this.list.hide();
			this.list.destroy();
			delete this.list;
		}
		EasyJF.Ext.TreeComboField.superclass.onDestroy.call(this);
	}
});
Ext.reg('treecombo', EasyJF.Ext.TreeComboField);

/**
 * @class EasyJF.Ext.CheckTreeComboField
 * @extends EasyJF.Ext.TreeComboField
 * 
 * 树状下拉框,可以下拉出一个TreePanel并且支持check选择<br/> 该组件的使用方式和TreeComboField基本相同。<br/>
 * 该组件的一些特性：1，在选中了子节点后，父节点也能跟着选定，但不放入选中列表。2，选中了父节点，该父节点下的子节点自动全部选中。
 * 
 * <pre>
 * <code>
 * new EasyJF.Ext.CheckTreeComboField({
 * 			fieldLabel : '部门',
 * 			name : 'dept',
 * 			tree : new Ext.tree.TreePanel({
 * 						border : false,
 * 						autoScroll : true,
 * 						rootVisible : false,
 * 						loader : new Ext.tree.TreeLoader({
 * 									url : 'data/tree.json',
 * 									baseAttrs : {
 * 										checked : false
 * 									}
 * 								}),
 * 						root : new Ext.tree.AsyncTreeNode({
 * 									id : 'id',
 * 									text : '部门'
 * 								})
 * 					})
 * 		})
 * </code>
 * </pre>
 * 
 * @xtype checktreecombo
 */
EasyJF.Ext.CheckTreeComboField = Ext.extend(EasyJF.Ext.TreeComboField, {
	leafOnly : false,// 只允许选择子节点
	editable : true,
	// private
	onTriggerClick : function() {
		if (this.disabled)
			return;
		if (!this.listPanel.rendered || !this.list) {
			this.treeId = Ext.id();
			this.list = new Ext.Layer({
						id : this.treeId,
						cls : "x-combo-list",
						constrain : false
					});
			if (!this.innerDom)
				this.innerDom = Ext.getBody().dom;
			if (this.listPanel.rendered) {
				this.list.appendChild(this.listPanel.el);
			} else {
				this.listPanel.render(this.treeId);
				var lw = this.listWidth
						|| Math.max(this.wrap.getWidth(), this.minListWidth);
				this.listPanel.setWidth(lw);
				this.tree.on("expandnode", this.restrictHeight, this);
				this.tree.on("collapsenode", this.restrictHeight, this);
			}
			if (this.value)
				this.setCheckdNode(this.value);
		} else
			this.restrictHeight();
		this.expand();
	},
	// private
	restrictHeight : function() {
		// this.list.dom.style.height = '';
		if (!this.list)
			return;
		var inner = this.innerDom;
		var h = inner.clientHeight - this.wrap.getBottom();
		if (this.listPanel.el.dom.offsetHeight >= h) {
			this.listPanel.setHeight(h);
		} else {
			this.listPanel.setHeight("auto");
			this.tree.setHeight("auto");
		}
	},
	// private
	initComponent : function() {
		EasyJF.Ext.CheckTreeComboField.superclass.initComponent.call(this);
		this.listPanel = new Ext.Panel({
					border : false,
					bodyBorder : false,
					buttonAlign : "center",
					layout : "fit",
					items : this.tree,
					bbar : [{
								text : "确定选择",
								handler : this.choice,
								scope : this
							}, {
								text : "清空",
								handler : this.cleanChoice,
								scope : this
							}, {
								text : "取消",
								handler : this.cancelChoice,
								scope : this
							}]
				});

	},
	// private
	onRender : function(ct, position) {
		EasyJF.Ext.CheckTreeComboField.superclass.onRender.call(this, ct,
				position);
		this.tree.on("checkchange", this.checkNode, this);

	},
	/**
	 * 设置节点的选中状态 将传入值字符串中所有匹配值的节点都设置为选中状态
	 * 
	 * @param {String}
	 *            v 需要选中的节点的值组成的字符串。各值之间使用','连接
	 */
	setCheckdNode : function(v) {
		this.cleanCheckNode(this.tree.root);
		var vs = v.split(",");
		for (var i = 0; i < vs.length; i++) {
			var node = null;
			var valueField = this.valueField;
			this.tree.root.cascade(function(n) {
						if (n.attributes[valueField] == vs[i]) {
							node = n;
							return false;
						}
					});
			if (node)
				this.checkNode(node, true);
		}
	},
	/**
	 * 清除指定节点及其子节点的选中状态
	 * 
	 * @param {Ext.data.Node}
	 *            要清除选中状态的节点。
	 */
	cleanCheckNode : function(node) {
		var checked = false;
		node.cascade(function(n) {
					if (n.ui.checkbox) {
						n.attributes.checked = n.ui.checkbox.checked = checked;
						n.attributes.selectAll = checked;
						if (checked)
							n.ui.addClass("x-tree-selected");
						else
							n.ui.removeClass("x-tree-selected");
					}
				}, this);
	},
	/**
	 * 改变指定节点的子节点和父节点的选中状态。<br/>
	 * 
	 * @param {Ext.data.Node}
	 *            node 要改变状态的节点
	 * @param {Boolean}
	 *            checked 改变的状态。true为选中状态，false为取消选中状态。
	 *            如果是将指定节点设置为选中状态，该方法会将该节点的直接/间接父节点设置为选中状态，该节点的直接/间接子节点设置为选中状态<br/>
	 *            如果是将指定节点设置为取消选中状态，该方法会将该节点的直接/间接父节点按逻辑设置为取消选中状态，该节点的直接/间接子节点设置为取消选中状态<br/>
	 * 
	 */
	checkNode : function(node, checked) {
		node.cascade(function(n) {
					if (n.ui.checkbox) {
						n.attributes.checked = n.ui.checkbox.checked = checked;
						n.attributes.selectAll = checked;
						if (checked)
							n.ui.addClass("x-tree-selected");
						else
							n.ui.removeClass("x-tree-selected");
					}
				}, this);
		node.bubble(function(n) {
					if (n != node) {
						if (!checked) {
							n.attributes.selectAll = checked;
							if (n.attributes.checked) {
								n.ui.removeClass("x-tree-selected");
							}
						} else if (!n.attributes.checked) {
							n.attributes.checked = n.ui.checkbox.checked = checked;
						}
					}
				});
	},
	/**
	 * 得到组件的值
	 * 
	 * @return {String} v 选中额值字符串。如果是选择了多个值，则是由多个值+','连接的字符串。
	 */
	getValue : function() {
		return typeof this.value != 'undefined' ? this.value : '';
	},
	// private
	clearValue : function() {
		if (this.hiddenField) {
			this.hiddenField.value = '';
		}
		this.setRawValue('');
		this.lastSelectionText = '';
		this.applyEmptyText();
		if (this.list)
			this.cleanCheckNode(this.tree.root);
	},
	// private
	getNodeValue : function(node) {
		if (node.attributes.selectAll
				&& (!this.leafOnly || node.attributes.leaf)) {
			if (this.t != "")
				this.t += ",";
			if (this.v != "")
				this.v += ",";
			var text = node.attributes[this.displayField || this.valueField];
			if (text === undefined)
				text = node.text;
			var value = node.attributes[this.valueField];
			if (value === undefined)
				value = node.id;
			this.t += text;
			this.v += value;
		} else if (node.attributes.checked)
			node.eachChild(this.getNodeValue, this)
	},
	/**
	 * 给该属性设值。设定的值符合树形列表中的某一个值，就会自动选中那个值。如果没有找到，则通过配置的valueNotFoundText显示指定的值。
	 * 
	 * @param {Object}
	 *            obj 设定的值
	 */
	setValue : function(obj) {
		if (!obj) {
			this.clearValue();
			return;
		}
		var v = obj;
		var text = v;
		var value = this.valueField || this.displayField;
		if (typeof v == "object" && this.readPropertyValue(obj, value)) {// 直接传入值

			text = obj[this.displayField || this.valueField];
			v = obj[value];
			if (this.list)
				this.setCheckdNode(v);

		} else {// 自动查找树中的选择节点，并设置值
			var root = this.tree.root;
			this.t = "";
			this.v = "";
			if (root.attributes.selectAll) {
				this.t = root.text;
			} else {
				root.eachChild(this.getNodeValue, this);
			}
			text = this.t;
			v = this.v;
		}
		this.lastSelectionText = text;
		if (this.hiddenField) {
			this.hiddenField.value = v;
		}
		EasyJF.Ext.TreeComboField.superclass.setValue.call(this, text);
		this.value = v;
		this.text = text;
	},
	/**
	 * 当选中节点后的响应方法
	 * 
	 * @param {Boolean}
	 *            notClean 是否清除之前已经选中项
	 */
	choice : function(notClean) {
		if (notClean)
			this.setValue(true);
		else
			this.clearValue();
		this.list.hide();
	},
	/**
	 * 清除当前已经选中项
	 */
	cleanChoice : function() {
		this.clearValue();
		this.list.hide();
	},
	/**
	 * 取消当前选项
	 */
	cancelChoice : function() {
		this.list.hide();
	},
	onDestroy : function() {
		if (this.listPanel.rendered && this.list) {
			this.list.hide();
			this.list.remove();
		}
		EasyJF.Ext.CheckTreeComboField.superclass.onDestroy.call(this);
	}
});
Ext.reg('checktreecombo', EasyJF.Ext.CheckTreeComboField);

/**
 * @class EasyJF.Ext.SmartCombox
 * @extends Ext.form.ComboBox 对ComboBox进行扩展,更好的支持对象的选择及其显示,并且可以在下拉列表中直接支持新建数据
 * 
 * <pre>
 * <code>
 *  //示例,ria框架提供的创建指定数据字典下拉列表的封装方法。
 *  getDictionaryCombo : function(name, fieldLabel, sn, valueField,disableBlank, editable) {
 *  return {
 *  xtype : &quot;smartcombo&quot;,
 *  name : name,
 *  hiddenName : name,
 *  displayField : &quot;title&quot;,
 *  valueField : valueField ? valueField : &quot;id&quot;,
 *  lazyRender : true,
 *  triggerAction : &quot;all&quot;,
 *  typeAhead : true,
 *  editable : editable,
 *  allowBlank : !disableBlank,
 *  sn:sn,
 *  objectCreator:{appClass:&quot;SystemDictionaryDetailPanel&quot;,script:&quot;/systemManage/SystemDictionaryManagePanel.js&quot;},
 *  createWinReady:function(win){
 *  if(this.fieldLabel)win.setTitle(&quot;新建&quot;+this.fieldLabel);
 *  if(this.sn)win.findSomeThing(&quot;parentSn&quot;).setOriginalValue(this.sn);
 *  },
 *  store : new Ext.data.JsonStore({
 *  id : &quot;id&quot;,
 *  url : &quot;systemDictionary.ejf?cmd=getDictionaryBySn&amp;sn=&quot;
 *  + sn,
 *  root : &quot;result&quot;,
 *  totalProperty : &quot;rowCount&quot;,
 *  remoteSort : true,
 *  baseParams : {
 *  pageSize : &quot;-1&quot;
 *  },
 *  fields : [&quot;id&quot;, &quot;title&quot;, &quot;tvalue&quot;]
 *  }),
 *  fieldLabel : fieldLabel
 *  }
 *  },
 * </code>
 * </pre>
 * 
 * @xtype smartcombo
 */
EasyJF.Ext.SmartCombox = Ext.extend(Ext.form.ComboBox, {
			/**
			 * @cfg {Boolean} disableCreateObject 是否禁用下拉列表下面的【新建】和【同步】按钮。
			 */
			/**
			 * 设置getValue获取的值，是基本类型，还是对象类型
			 * 
			 * @cfg {Boolean} returnObject
			 */
			returnObject : false,

			/**
			 * 用来定义新建对象的相关属性
			 * 
			 * @cfg {Object} objectCreator 该配置对象包括： <url>
			 *      <li>appClass {String} : 调用的创建业务对象的管理模块类名</li>
			 *      <li>script {String} : 调用的创建业务对象管理模块的script文件地址</li>
			 *      </ul>
			 */
			objectCreator : null,
			/**
			 * 当点击新建按钮，打开创建业务对象的窗口后的钩子方法
			 * 
			 * @param {Ext.Window}
			 *            win
			 *            创建业务对象的窗口。如果是CrudPanel，则直接调用win.getComponent(0)即是fp。
			 */
			createWinReady : function(win) {
				if (this.fieldLabel)
					win.setTitle("新建" + this.fieldLabel);
			},
			/**
			 * 创建新对象，实质是调用EasyJF.Ext.Util.addObject方法。
			 */
			newObject : function() {
				this.collapse();
				var title = this.fieldLabel;
				EasyJF.Ext.Util.addObject(this.objectCreator.appClass,
						this.reload.createDelegate(this),
						this.objectCreator.script,
						this.objectCreator.otherScripts, this.createWinReady
								.createDelegate(this));
			},
			/**
			 * 同步下拉列表中的业务对象数据。
			 */
			synchObject : function() {
				this.store.reload();
			},
			/**
			 * @cfg {Array} operatorButtons
			 *      显示在下拉列表底部的按钮数组。子类可以通过该属性覆盖并自定义自己的显示按钮。
			 */
			initComponent : function() {
				if (this.objectCreator && !this.disableCreateObject) {
					this.operatorButtons = [{
								text : "新建",
								iconCls : "add",
								handler : this.newObject,
								scope : this
							}, {
								text : "同步",
								iconCls : "f5",
								handler : this.synchObject,
								scope : this
							}];
				}
				EasyJF.Ext.SmartCombox.superclass.initComponent.call(this);
			},
			initList : function() {
				if (!this.list) {
					EasyJF.Ext.SmartCombox.superclass.initList.call(this);
					// this.operatorButtons=[{text:"ddd"}];
					if (this.operatorButtons) {// 增加对操作按钮的支持
						if (this.pageTb) {
							this.pageTb.insert(0, this.operatorButtons);
						} else {
							this.bottomBar = this.list.createChild({
										cls : 'x-combo-list-ft'
									});
							this.bottomToolbar = new Ext.Toolbar(this.operatorButtons);
							this.bottomToolbar.render(this.bottomBar);
							this.assetHeight += this.bottomBar.getHeight();
						}
					}
				}
			},
			/**
			 * 获取SmartCombox符合指定条件的record值。<br/>
			 * 实际的过程是首先得到combox的值value，然后在下拉列表绑定的store中查询field等于value的record。如果有，则返回该record。
			 * 
			 * @param {String}
			 *            field 指定的valueField属性名称。
			 * @return {Object} 符合条件的Record
			 */
			getValueObject : function(field) {
				var val = "";
				if (this.returnObject) {
					val = this.getValue().value;
				} else {
					val = this.getValue();
				}
				if (val) {
					var index = this.store.find(field || "id", val);
					if (index >= 0) {
						var record = this.store.getAt(index);
						return record;
					}
					return null;
				}
				return null;
			},

			/**
			 * 获取SmartCombox中的值
			 * 
			 * @return {Object}
			 */
			getValue : function() {
				if (this.returnObject) {
					var value = this.value;
					if (this.el.dom.value == this.PleaseSelectedValue
							|| this.el.dom.value == this.nullText)
						return null;
					if (this.selectedIndex >= 0) {
						var record = this.store.getAt(this.selectedIndex);
						if (record && record.data) {
							var t = record.data[this.displayField
									|| this.valueField];
							if (t != this.el.dom.value)
								value = null;
						}
					}
					return {
						value : value,
						text : this.el.dom.value,
						toString : function() {
							return this.text;
						}
					};
				} else
					return EasyJF.Ext.SmartCombox.superclass.getValue
							.call(this);
			},
			/**
			 * 设置SmartCombox的value
			 * 
			 * @param {String/Object/Number...}
			 *            v 要设置的值
			 */
			setValue : function(v) {
				if (v && typeof v == "object" && eval("v." + this.valueField)) {
					var value = eval("v." + this.valueField);
					var text = eval("v." + this.displayField) ? eval("v."
							+ this.displayField) : this.valueNotFoundText;
					this.lastSelectionText = text;
					if (this.hiddenField) {
						this.hiddenField.value = value;
					}
					Ext.form.ComboBox.superclass.setValue.call(this, text);
					this.value = value;
					if (this.store.find(this.valueField, value) < 0) {
						var o = {};
						o[this.valueField] = value;
						o[this.displayField] = text;
						if (this.store && this.store.insert) {
							this.store.insert(0, new Ext.data.Record(o));
							// this.select(0);
						}
					}
				} else if (v === null) {
					EasyJF.Ext.SmartCombox.superclass.setValue.call(this, "");
				} else {
					EasyJF.Ext.SmartCombox.superclass.setValue.call(this, v);
				}
			},
			onSelect : function(record, index) {
				if (this.fireEvent('beforeselect', this, record, index) !== false) {
					this.setValue(record.data[this.valueField
							|| this.displayField]);
					this.collapse();
					this.fireEvent('select', this, record, index);
				}
			}
		});
Ext.reg('smartcombo', EasyJF.Ext.SmartCombox);

/**
 * 
 * @class EasyJF.Ext.PopupWindowField
 * @extends Ext.form.TriggerField
 *          弹出窗口选择组件（类似于下拉框列表Field，只是在点击旁边下拉按钮时是通过弹出一个列表窗口，在窗口列表中进行数据选择。）
 * 
 * <pre>
 * <code>
 *  //示例，选择部门使用PopupWindowField，在列表中显示更详细的内容。
 *  //首先创建一个EasyJF.Ext.GridSelectWin
 *  if(!Global.departmentSelectWin)
 *  Global.departmentSelectWin=new EasyJF.Ext.GridSelectWin({
 *  title : &quot;选择部门&quot;,
 *  width : 540,
 *  height : 400,
 *  layout : &quot;fit&quot;,
 *  buttonAlign : &quot;center&quot;,
 *  closeAction : &quot;hide&quot;,
 *  grid : new DepartmentGrid(),
 *  modal : true,
 *  });
 * 
 *  //在form里面
 *  {xtype:'popupwinfield',win:Global.departmentSelectWin,valueField:'id',displayField:'departmentName',returnObject:true},
 * </code>
 * </pre>
 * 
 */
EasyJF.Ext.PopupWindowField = Ext.extend(Ext.form.TriggerField, {
			/**
			 * @cfg {Object} win 指定弹出的win。一般使用EasyJF.Ext.GridSelectWin<br/>
			 */
			win : null,
			/**
			 * @cfg {String} valueField 选中的列表Record中用来作为field值的属性名
			 */
			valueField : "id",
			/**
			 * @cfg {String} displayField 选中的列表Record中用来作为field显示的属性名
			 */
			displayField : "name",
			haveShow : false,
			/**
			 * @cfg {Booealn} editable 弹出窗口选择框是否能编辑。默认不能直接编辑
			 */
			editable : false,
			callback : Ext.emptyFn,
			returnObject : false,
			/**
			 * @cfg {Booealn} choiceOnly
			 *      是否只是选择值。如果为true，只返回值，如果为false，才考虑returnObject条件。
			 */
			choiceOnly : false,
			/**
			 * 得到选择的值<br/> 如果是choiceOnly为true,则直接返回this.value<br/>
			 * 如果是choiceOnly为false，并且returnObject为true，则会返回一个对象。<br/>
			 * 
			 * @return {Object} ret 得到选中的值
			 */
			getValue : function() {
				if (this.choiceOnly)
					return this.value;
				if (this.returnObject)
					return typeof this.value != 'undefined' ? {
						value : this.value,
						text : this.text,
						toString : function() {
							return this.text ? this.text : this.value;
						}
					} : "";
				return typeof this.value != 'undefined' ? this.value : '';
			},
			/**
			 * 给组件设置值。<br/> 如果是choiceOnly为true,则直接设置this.value<br/>
			 * 如果是choiceOnly为false，并且returnObject为true，则使用传入对象的o[displayField]属性值来作为显示的值，使用传入对象的o[valueField]作为值<br/>
			 * 
			 * @param {Object}
			 *            v 传入的要设置的值
			 */
			setValue : function(v) {
				if (this.choiceOnly)
					return this.value = v;
				if (v && typeof v == "object" && eval("v." + this.valueField)) {
					var value = eval("v." + this.valueField);
					var text = eval("v." + this.displayField) ? eval("v."
							+ this.displayField) : this.valueNotFoundText;
					this.lastSelectionText = text;
					if (this.hiddenField) {
						this.hiddenField.value = value;
					}
					EasyJF.Ext.PopupWindowField.superclass.setValue.call(this,
							text);
					this.value = value;
					this.text = text;
				} else if (v === null)
					EasyJF.Ext.PopupWindowField.superclass.setValue.call(this,
							"");
				else
					EasyJF.Ext.PopupWindowField.superclass.setValue.call(this,
							v);
			},
			/**
			 * 当点击后面的下拉框按钮，弹出选择窗口
			 */
			onTriggerClick : function() {
				if (this.win) {
					this.win.show();
				}
			},
			onRender : function(ct, position) {
				EasyJF.Ext.PopupWindowField.superclass.onRender.call(this, ct,
						position);
				if (this.win) {
					this.win.on("select", this.choice, this);
				}
				if (this.hiddenName) {
					this.hiddenField = this.el.insertSibling({
								tag : 'input',
								type : 'hidden',
								name : this.hiddenName,
								id : (this.hiddenId || this.hiddenName)
							}, 'before', true);
					this.hiddenField.value = this.hiddenValue !== undefined
							? this.hiddenValue
							: this.value !== undefined ? this.value : '';
					this.el.dom.removeAttribute('name');
				}
				if (!this.editable) {
					this.editable = true;
					this.setEditable(false);
				}
				if (this.choiceOnly)
					this.el.hide();
			},
			/**
			 * 在弹出列表窗口中选择了值之后执行的方法<br/> 默认是直接设置该field的值
			 * 
			 * @param {Object}
			 *            data 弹出窗口中列表选中Record对应的data值
			 * @param {Object}
			 *            win 弹出的列表窗口实例
			 */
			choice : function(data, win) {
				this.setValue(data);
				this.fireEvent('select', data, win);
			},
			/**
			 * @event select 当在弹出窗口列表中选定了某列数据，并执行完成choice方法后抛出<br/>
			 * @param {Object}
			 *            data 弹出窗口中列表选中Record对应的data值
			 * @param {Object}
			 *            win 弹出的列表窗口实例
			 */
			initComponent : function() {
				EasyJF.Ext.PopupWindowField.superclass.initComponent.call(this);
				this.addEvents("select");

			},
			validateBlur : function() {
				return !this.win || !this.win.isVisible();
			},
			onDestroy : function() {
				if (this.win && this.win.isVisible()) {
					this.win.hide();
				}
				EasyJF.Ext.PopupWindowField.superclass.onDestroy.call(this);
			},
			/**
			 * 设置为可以编辑
			 * 
			 * @param {Boolean}
			 *            value
			 */
			setEditable : function(value) {
				if (value == this.editable) {
					return;
				}
				this.editable = value;
				if (!value) {
					this.el.dom.setAttribute('readOnly', true);
					this.el.on("dblclick", this.onTriggerClick, this);
					this.el.on("click", this.onTriggerClick, this);
					this.el.addClass('x-combo-noedit');
				} else {
					this.el.dom.setAttribute('readOnly', false);
					this.el.un('mousedown', this.onTriggerClick, this);
					this.el.removeClass('x-combo-noedit');
				}
			}
		});
Ext.reg('popupwinfield', EasyJF.Ext.PopupWindowField);

/**
 * @class EasyJF.Ext.GridSelectWin
 * @extends Ext.Window
 *          弹出一个Window供用户选择grid中的数据，一般和EasyJF.Ext.PopupWindowField配合使用，作为EasyJF.Ext.PopupWindowField中的win属性。
 *          示例参考EasyJF.Ext.PopupWindowField的示例
 */
EasyJF.Ext.GridSelectWin = Ext.extend(Ext.Window, {
			/**
			 * @cfg {String} title 窗口的名称，默认为"选择数据"
			 */
			title : "选择数据",
			/**
			 * @cfg {Integer} width 窗口宽度，默认为540
			 */
			width : 540,
			/**
			 * @cfg {Integer} height 窗口高度，默认为400
			 */
			height : 400,
			/**
			 * @cfg {String} layout 窗口布局，默认为fit
			 */
			layout : "fit",
			/**
			 * @cfg {String} buttonAlign 窗口下方按钮的对其方式，默认为center
			 */
			buttonAlign : "center",
			/**
			 * @cfg {String} closeAction 窗口关闭方式，默认为hide
			 */
			closeAction : "hide",
			/**
			 * @cfg {Object} grid 窗口中显示的列表对象。必须是一个Ext.grid.GridPanel或者其继承类实例。<br/>
			 *      必须要的参数
			 */
			grid : null,// grid是必须传递的对象
			/**
			 * @cfg {Booelan} modal 是否开启模式窗口
			 */
			modal : true,
			callback : Ext.emptyFn,
			/**
			 * @event select 当在列表中选择了一行或者多行后的抛出事件
			 * @param {Array}
			 *            datas 选中的record的data数组
			 */
			/**
			 * 当在列表中选择了一行或者多行后的处理事件。<br/>
			 * 默认动作是将选中record的data放在一个数组中，关闭当前窗口，并将数组通过select事件抛出。<br/>
			 */
			choice : function() {
				var grid = this.grid.grid || this.grid;
				var records = grid.getSelectionModel().getSelections();
				if (!records || records.length < 1) {
					Ext.Msg.alert("$!{lang.get('Prompt')}",
							"$!{lang.get('Select first')}");
					return false;
				}
				var datas = [];
				for (var i = 0; i < records.length; i++) {
					datas[i] = records[i].data;
				}
				this.hide();
				this.fireEvent('select', datas, this);
			},
			initComponent : function() {
				this.buttons = [{
							text : "确定",
							handler : this.choice,
							scope : this
						}, {
							text : "取消",
							handler : function() {
								this.hide();
							},
							scope : this
						}];
				EasyJF.Ext.GridSelectWin.superclass.initComponent.call(this);
				if (this.grid) {
					var grid = this.grid.grid || this.grid;// 兼容BaseGridList对象
					grid.on("rowdblclick", this.choice, this);
					this.add(this.grid);
				}
				this.addEvents("select");
			}
		});
/**
 * 
 * @class EasyJF.Ext.TreeNodeUtil
 * @single
 */
EasyJF.Ext.TreeNodeUtil = {};
Ext.apply(EasyJF.Ext.TreeNodeUtil, {

	/**
	 * 拷贝一颗树节点及所有子节点
	 * 
	 * <pre>
	 * <code>
	 * //例子，将当前A树中选中的节点拷贝到B树root节点下。
	 * var cnode = this.atree.getSelectionModel().getSelectedNode();
	 * this.btree.getRootNode().appendChild(EasyJF.Ext.TreeNodeUtil
	 * 		.cloneTreeNode(cnode));
	 * </code>
	 * </pre>
	 * 
	 * @param {Array|Ext.data.Node}
	 *            nodes 要拷贝的树节点或者节点的数组
	 */
	cloneTreeNode : function(nodes) {
		var ns = [];
		for (var i = 0; i < nodes.length; i++) {
			var o = Ext.apply({}, nodes[i]);
			if (nodes[i].children && nodes[i].children.length) {
				o.children = this.cloneTreeNode(nodes[i].children);
			} else
				o.children = [];
			ns.push(o);
		}
		return ns;
	},

	/**
	 * 从一个树节点级联向下完成某一个funcion
	 * 
	 * @param {Ext.data.Node}
	 *            node 开始的节点
	 * @param {Function}
	 *            fn 对每一个节点要执行的方法
	 * @param {Object}
	 *            scope function执行的作用域
	 * @param {Object|Array}
	 *            args 执行function的参数
	 */
	cascadeNode : function(node, fn, scope, args) {
		if (fn.apply(scope || this, args || [node]) !== false) {
			if (node.children && node.children.length) {
				for (var i = 0, cs = node.children; i < cs.length; i++) {
					cs[i].parentNode = node;
					this.cascadeNode(cs[i], fn, scope, args);
				}
			}
		}
	},
	/**
	 * 从一个指定节点开始向下寻找匹配指定id的节点
	 * 
	 * @param {Object}
	 *            id 要匹配的id值
	 * @param {Ext.data.Node}
	 *            node 开始寻找的节点
	 * @return {Ext.data.Node} 找到的匹配节点
	 */
	deepFindNode : function(id, node) {
		var ret = null;
		this.cascadeNode(node, function(n) {
					if (n.id == id) {
						ret = n;
						return false;
					}
				});
		return ret;
	},
	/**
	 * 根据节点id查找指定节点
	 * 
	 * @param {}
	 *            id
	 * @param {}
	 *            objs
	 * @return {}
	 */
	getNodeById : function(id, objs) {
		var ret = this.deepFindNode(id, {
					id : "root",
					children : objs
				});
		return ret || null;
	},
	/**
	 * 从一组定节点中寻找匹配指定id的节点
	 * 
	 * @param {Object}
	 *            id
	 * @param {Array}
	 *            objs 指定的节点。如果是数组，则将数组中的节点作为寻找的对象。
	 * @return {Object} 找到的节点对象
	 */
	findNode : function(id, objs) {
		if (id == "root")
			return objs;
		else {
			var ret = this.deepFindNode(id, {
						id : "root",
						children : objs
					});
			return ret && ret.children ? ret.children : null;
		}
	},
	/**
	 * 从缓存（EasyJF.Cache）中删除缓存的节点信息。<br/> 该方法用于使用了本地缓存树加载器后，如果对应的对象执行了删除操作，<br/>
	 * 则可以直接通过操作缓存中树节点的删除方法，让所有引用了该树加载器的列表或者下拉列表都及时更新。<br/> 而不用再重新去请求远端数据。
	 * 
	 * @param {String|Object}
	 *            id 要删除的节点id
	 * @param {Object|String}
	 *            cache
	 *            要清除的缓存。如果是Object，则默认为该Object即为缓存实例。如果是String，则默认为在EasyJF.Cache中保存的缓存名称
	 */
	localRemove : function(id, cache) {
		var obj = Ext.type(cache) == "string" ? EasyJF.Cache.get(cache) : cache;
		if (obj) {
			var objs = obj.items;
			var node = this.getNodeById(id, objs);
			if (node) {
				if (node.parentNode && node.parentNode.children)
					node.parentNode.children.remove(node);
				else
					objs.remove(node);
				if (obj.fireEvent)
					obj.fireEvent("removenode", node, obj);
			}
		}
	},
	/**
	 * 添加节点到指定缓存中<br/> 该方法用于使用了本地缓存树加载器后，如果对应的对象执行了添加操作，<br/>
	 * 则可以直接通过操作缓存中树节点的添加方法，将新添加的对象创建为节点信息，并直接添加到缓存中，让所有引用了该树加载器的列表或者下拉列表都及时更新。<br/>
	 * 而不用再重新去请求远端数据。
	 * 
	 * @param {Ext.data.Node}
	 *            node 要添加到缓存的节点对象
	 * @param {String|Object}
	 *            parentId 如果要将节点作为缓存中某个已经存在的节点的子节点，则必须指明该父节点的id值。
	 * @param {Object|String}
	 *            cache
	 *            要添加的缓存。如果是Object，则默认为该Object即为缓存实例。如果是String，则默认为在EasyJF.Cache中保存的缓存名称
	 */
	localAdd : function(node, parentId, cache) {
		var obj = Ext.type(cache) == "string" ? EasyJF.Cache.get(cache) : cache;
		if (obj) {
			var objs = obj.items;
			if (parentId) {
				var parentNode = this.getNodeById(parentId, objs);
				if (parentNode) {
					parentNode.children = parentNode.children || [];
					if (parentNode.children && parentNode.children.length == 0) {
						parentNode.leaf = false;
						parentNode.children = [node];
					} else if (parentNode.children) {
						parentNode.children.push(node);
					}
					if (obj.fireEvent)
						obj.fireEvent("addnode", node, parentNode, obj);
				}
			} else {
				objs.push(node);
				if (obj.fireEvent)
					obj.fireEvent("addnode", node, null, obj);
			}
		}
	},
	/**
	 * 更新缓存中的节点<br/> 该方法用于使用了本地缓存树加载器后，如果对应的对象执行了修改操作，<br/>
	 * 则可以直接通过操作缓存中树节点的修改方法，将修改后的对象创建为节点信息，并直接更新到缓存中，让所有引用了该树加载器的列表或者下拉列表都及时更新。<br/>
	 * 而不用再重新去请求远端数据。
	 * 
	 * @param {Ext.data.Node}
	 *            node 更新的节点，用该节点去更新拥有相同id的节点。
	 * @param {Object|String}
	 *            cache
	 *            要更新的缓存。如果是Object，则默认为该Object即为缓存实例。如果是String，则默认为在EasyJF.Cache中保存的缓存名称
	 */
	localChange : function(node, cache) {
		var obj = Ext.type(cache) == "string" ? EasyJF.Cache.get(cache) : cache;
		if (obj) {
			var objs = obj.items;
			var no = this.getNodeById(node.id, objs);
			if (no) {
				Ext.copyToIf(no, node, ["children", "cls", "loader",
								"parentNode"]);
				if (obj.fireEvent)
					obj.fireEvent("updatenode", no, obj);
			}
		}
	},
	/**
	 * 移动缓存中的节点<br/> 该方法用于使用了本地缓存树加载器后，如果对应的对象执行了移动操作，（即改变了某一个对象的位置）<br/>
	 * 则可以直接通过操作缓存中树节点的移动方法，让所有引用了该树加载器的列表或者下拉列表都及时更新。<br/> 而不用再重新去请求远端数据。
	 * 
	 * @param {Ext.data.Node}
	 *            node 要移动的节点
	 * @param {String|Object}
	 *            parentId 要移动到的目标父节点id。
	 * @param {Object|String}
	 *            cache
	 *            要更新的缓存。如果是Object，则默认为该Object即为缓存实例。如果是String，则默认为在EasyJF.Cache中保存的缓存名称
	 */
	localMove : function(node, parentId, cache) {
		this.localRemove(node.id, cache);
		this.localAdd(node, parentId, cache);
	}
});

/**
 * @class EasyJF.Ext.TreeCollection
 * @extends Ext.util.MixedCollection
 * 
 * 树状节点数据存储器，该缓存器配合EasyJF.Ext.TreeNodeUtil，提供了快速查询树节点及内在节点内容变更事件响应等相关方法<br/>
 * 如果在应用中如果需要缓存树状结构的数据，可以使用该缓存器。<br/>
 */
EasyJF.Ext.TreeCollection = Ext.extend(Ext.util.MixedCollection, {
			/**
			 * 删除节点
			 * 
			 * @param {Object}
			 *            id 要删除的节点的id值。
			 */
			removeNode : function(id) {
				EasyJF.Ext.TreeNodeUtil.localRemove(id, this);
				this.unregisterNode(id);
			},
			/**
			 * 添加节点
			 * 
			 * @param {Ext.data.Node}
			 *            node 要添加的节点对象
			 * @param {String}
			 *            parentId 要添加到的父节点id。
			 */
			addNode : function(node, parentId) {
				var n = null;
				if (n = this.getNodeById(node.id)) {
					EasyJF.Ext.TreeNodeUtil.localChange(node, this);
					return;
				}
				EasyJF.Ext.TreeNodeUtil.localAdd(node, parentId, this);
				this.registerNode(node);
			},
			/**
			 * 更新节点
			 * 
			 * @param {Ext.data.Node}
			 *            node 要更新的节点对象
			 * @param {}
			 *            cache
			 */
			changeNode : function(node, cache) {
				EasyJF.Ext.TreeNodeUtil.localChange(node, this);
			},
			/**
			 * 移动节点
			 * 
			 * @param {Ext.data.Node}
			 *            node 需要移动的节点对象
			 * @param {String|Object}
			 *            parentId 要移动到的目标父节点id。
			 * @param {}
			 *            cache
			 */
			moveNode : function(node, parentId, cache) {
				EasyJF.Ext.TreeNodeUtil.localMove(node, parentId, this);
			},
			/**
			 * 注销nodeHash中的节点
			 * 
			 * @param {String}
			 *            id 要注销（删除）的节点id
			 */
			unregisterNode : function(id) {
				delete this.nodeHash[id];
			},
			/**
			 * 往nodeHash中注册节点及所有子节点
			 * 
			 * @param {Ext.data.Node}
			 *            node 要注册（添加）的节点
			 */
			registerNode : function(node) {
				if (node.id)
					this.nodeHash[node.id] = node;
				var children = node.children
						|| (node.attributes && node.attributes.children);
				if (children && children.length)
					Ext.each(children, this.registerNode, this);
			},
			/**
			 * 获得所有节点
			 * 
			 * @return {Node} 根节点
			 */
			getAllNode : function() {
				return this.nodeHash || {};
			},
			/**
			 * 根据ID返回节点
			 * 
			 * @param {String|Object}
			 *            id 要查询的节点id。
			 * @return {Ext.data.Node} ret 找到的匹配的节点对象。
			 */
			getNodeById : function(id) {
				return this.nodeHash[id];
			},
			/**
			 * 重写MixCollection的addAll方法，并调用registerNode来注册节点
			 * 
			 * @param {Array}
			 *            要添加的节点对象数组。
			 */
			addAll : function(objs) {
				EasyJF.Ext.TreeCollection.superclass.addAll.call(this, objs);
				this.nodeHash = {};
				if (objs) {
					var obj = {
						id : 'root',
						children : objs
					};
					this.registerNode(obj)
				}
			},
			/**
			 * 清空集合中的所有节点
			 */
			clear : function() {
				this.nodeHash = {};
				EasyJF.Ext.TreeCollection.superclass.clear.call(this);
			}
		});

EasyJF.Ext.CachedRemoteProxy = function(c, store) {
	this.enableCache = (c.enableCache == window.undefined
			? true
			: c.enableCache);
	this.store = store;
	EasyJF.Ext.CachedRemoteProxy.superclass.constructor.call(this, {
				url : c.url
			});
	Ext.apply(this, c);
};
EasyJF.Ext.CachedRemoteProxy.DATAS = {};
EasyJF.Ext.CacheFilter = new Ext.util.MixedCollection();

EasyJF.Ext.CacheFilter.firstSearch = function(val, regexp) {
	if (typeof regexp != 'regexp')
		regexp = new RegExp("^" + regexp);
	return regexp.test(val);
}
/**
 * 
 * @class EasyJF.Ext.CachedRemoteProxy
 * @extends Ext.data.HttpProxy
 * 
 * 支持先从本地缓存中查找数据，如果没有数据，再从网络加载数据的Proxy对象。该类用作EasyJF.Ext.CachedRemoteStore的Proxy。
 */
Ext.extend(EasyJF.Ext.CachedRemoteProxy, Ext.data.HttpProxy, {
	/**
	 * 根据查询条件过滤数据
	 * 
	 * @param {Object}
	 *            params 要过滤的条件
	 * @param {Array}
	 *            datas 要过滤的数据
	 * @return {Array} ret 过滤后的结果集
	 */
	quickSearch : function(params, datas) {
		if (!datas.getCount())
			return datas;
		var objs = datas;
		var o = datas.items[0];
		if (!this.disableClientFilter) {
			for (var n in params) {
				if (n && o[n] !== undefined) {
					objs = objs.filter(n, params[n]);
				}
			}
		}
		objs = this.cacheFilter(params, objs);
		return objs;
	},
	cacheFilter : function(params, objs) {
		var filter = EasyJF.Ext.CacheFilter.key(this.varName);
		if (filter && params) {
			if (typeof filter == 'function') {
				return filter.call(this, objs, params);
			}
		}
		return objs;
	},
	getData : function() {
		return EasyJF.Ext.CachedRemoteProxy.DATAS[this.varName];
	},
	/**
	 * 从Cache中加载数据
	 * 
	 * @param {Object}
	 *            params 要查询的条件
	 * @param {Ext.data.DataReader}
	 *            reader 数据读取器
	 * @param {Function}
	 *            callback 在加载完成后执行的回调方法
	 * @param {Object}
	 *            scope 回调方法执行的作用域
	 * @param {Array}
	 *            arg 回调方法执行的参数
	 */
	loadFromCache : function(params, reader, callback, scope, arg) {
		var datas = this.quickSearch(params, this.getData());
		var o = {
			rowCount : datas.getCount(),
			result : []
		};
		var start = 0, limit = -1;

		if (params.start)
			start = Ext.num(parseInt(params.start), 0);

		if (params.limit)
			limit = Ext.num(parseInt(params.limit), -1);

		var max = datas.getCount();

		if (limit > 0)
			max = start + limit;
		if (max > datas.getCount())
			max = datas.getCount();
		if (max < 0)
			max = this.pageSize;
		o.result = datas.getRange(start, max - 1);
		var result;
		try {
			result = reader.readRecords(o);
		} catch (e) {
			this.fireEvent("loadexception", this, o, response, e);
			callback.call(scope, null, params, false);
			return;
		}
		this.fireEvent("load", this, o, arg);
		callback.call(scope, result, arg, true);
	},
	/*
	 * loadFromCache:function(params, reader, callback, scope, arg){ var
	 * datas=this.quickSearch(params,this.getData()); var
	 * o={rowCount:datas.getCount(),result:[]}; var start=0,limit=-1;
	 * if(params.start)start=Ext.num(parseInt(params.start),0);
	 * if(params.limit)limit=Ext.num(parseInt(params.limit),-1); if(limit<0)limit=this.pageSize;
	 * var max=datas.getCount(); if(limit>0)max=start+limit; if(max<0)max =
	 * this.pageSize; if(max>datas.getCount())max=datas.getCount();
	 * //console.dir(params); o.result=datas.getRange(start,max-1); var result;
	 * try { result = reader.readRecords(o); }catch(e){
	 * this.fireEvent("loadexception", this, o, response, e);
	 * callback.call(scope, null, params, false); return; }
	 * this.fireEvent("load", this, o, arg); callback.call(scope, result, arg,
	 * true); },
	 */
	/**
	 * 发送请求，首先从缓存里面尝试加载数据，如果缓存中没有数据，再发送http请求从服务器端请求数据
	 * 
	 * @param {}
	 *            action
	 * @param {}
	 *            rs
	 * @param {}
	 *            params
	 * @param {}
	 *            reader
	 * @param {}
	 *            callback
	 * @param {}
	 *            scope
	 * @param {}
	 *            options
	 */
	request : function(action, rs, params, reader, callback, scope, options) {
		params = params || {};
		if (this.fireEvent("beforeload", this, params) !== false) {
			if (this.getData().getCount()) {
				this.loadFromCache(params, reader, callback, scope, options);
			} else {
				EasyJF.Ext.CachedRemoteProxy.superclass.request.apply(this,
						arguments);
			}
		}
	},
	// private 读取数据，完成本地分页。
	onRead : function(action, o, response) {
		/*
		 * if (!success) { this.fireEvent("loadexception", this, o, response);
		 * o.request.callback.call(o.request.scope, null, o.request.arg, false);
		 * return; }
		 */
		if (this.enableCache) {
			try {
				var json = response.responseText;
				var obj = eval("(" + json + ")");
				if (obj
						&& (obj.enableCache === false || obj.enableCache === true)) {
					// this.store.remoteSort=obj.enableCache;
					this.enableCache = obj.enableCache;
				}
				if (this.enableCache) {
					this.getData().clear();
					this.getData().addAll(Ext.isArray(obj) ? obj : obj.result);
					o.params.limit = this.pageSize ? this.pageSize : 10;
					this.loadFromCache(o.params, o.reader, o.request.callback,
							o.request.scope, o.request.arg);
				} else {
					var result;
					try {
						result = o.reader.read(response);
					} catch (e) {
						this.fireEvent("loadexception", this, o, response, e);
						o.request.callback.call(o.request.scope, null,
								o.request.arg, false);
						return;
					}
					this.fireEvent("load", this, o, o.request.arg);
					o.request.callback.call(o.request.scope, result,
							o.request.arg, true);
				}
			} catch (e) {
				this.fireEvent("loadexception", this, o, response, e);
				o.request.callback.call(o.request.scope, null, o.request.arg,
						false);
				return;
			}
		} else {
			var result;
			try {
				result = o.reader.read(response);
			} catch (e) {
				this.fireEvent("loadexception", this, o, response, e);
				o.request.callback.call(o.request.scope, null, o.request.arg,
						false);
				return;
			}
			this.fireEvent("load", this, o, o.request.arg);
			o.request.callback.call(o.request.scope, result, o.request.arg,
					true);
		}
	},
	/**
	 * 在本地缓存中直接添加数据。<br/>
	 * 用于如果是在CrudPanel中，如果设置CrudPanel的storeType为CacheRemoteStore，<br/>
	 * 那么在执行了添加业务对象操作后，要将新添加的业务对象直接通过该方法保存在本地缓存中。就不用去远端重新请求列表数据。<br/>
	 * 
	 * @param {Object}
	 *            key 缓存对象的标识，一般用业务对象的id。
	 * @param {Object}
	 *            obj 缓存的对象。
	 */
	add : function(key, obj) {// 增加
		this.getData().add(key, obj);
	},
	/**
	 * 在本地缓存中直接删除数据。<br/>
	 * 用于如果是在CrudPanel中，如果设置CrudPanel的storeType为CacheRemoteStore，<br/>
	 * 那么在执行了删除业务对象操作后，要将删除的业务对象直接通过该方法在本地缓存中移除。就不用去远端重新请求列表数据。<br/>
	 * 
	 * @param {Object}
	 *            obj 要删除的缓存对象。
	 */
	remove : function(obj) {// 删除
		this.getData().remove(obj);
	},
	/**
	 * 在本地缓存中直接删除数据。(使用key删除)<br/>
	 * 用于如果是在CrudPanel中，如果设置CrudPanel的storeType为CacheRemoteStore，<br/>
	 * 那么在执行了删除业务对象操作后，要将删除的业务对象直接通过该方法在本地缓存中移除。就不用去远端重新请求列表数据。<br/>
	 * 
	 * @param {Object}
	 *            key 要删除的缓存对象的标识符。
	 */
	removeKey : function(key) {// 删除
		this.getData().removeKey(key);
	},
	/**
	 * 在本地缓存中直接添加或者修改数据。<br/>
	 * 用于如果是在CrudPanel中，如果设置CrudPanel的storeType为CacheRemoteStore，<br/>
	 * 那么在执行了添加/修改业务对象操作后，要将新添加/修改的业务对象直接通过该方法保存/更新在本地缓存中。就不用去远端重新请求列表数据。<br/>
	 * 
	 * @param {Object}
	 *            key 缓存对象的标识，一般用业务对象的id。
	 * @param {Object}
	 *            obj 缓存的对象。
	 */
	addOrUpdate : function(id, obj) {
		this.getData().replace(id, obj);
	},
	/**
	 * 在本地缓存中直接修改数据。<br/>
	 * 用于如果是在CrudPanel中，如果设置CrudPanel的storeType为CacheRemoteStore，<br/>
	 * 那么在执行了修改业务对象操作后，要将修改的业务对象直接通过该方法更新在本地缓存中。就不用去远端重新请求列表数据。<br/>
	 * 
	 * @param {Object}
	 *            key 缓存对象的标识，一般用业务对象的id。
	 * @param {Object}
	 *            obj 缓存的对象。
	 */
	update : function(id, obj) {// 修改
		this.getData().replace(id, obj);
	}
});
EasyJF.Ext.CachedRemoteStore = function(c) {
	EasyJF.Ext.CachedRemoteStore.superclass.constructor.call(this, Ext.apply(c,
					{
						proxy : c.proxy
								|| (!c.data
										? new EasyJF.Ext.CachedRemoteProxy(c)
										: undefined),
						reader : new Ext.data.JsonReader(c, c.fields)
					}));
	if (!EasyJF.Ext.CachedRemoteProxy.DATAS[this.varName])
		EasyJF.Ext.CachedRemoteProxy.DATAS[this.varName] = new Ext.util.MixedCollection(true);
};
/**
 * 
 * @class EasyJF.Ext.CachedRemoteStore
 * @extends Ext.data.Store
 * 
 * 拥有本地缓存的store。<br/>
 * 该store能在第一次从服务器端获得数据后，将数据缓存在本地缓存中。之后所有的请求，如果在没有清空proxy中的数据情况下<br/>
 * 所有的查询都直接从本地缓存中查询。包括分页等操作。<br/>
 * 该store一般用于报表类查询。如果报表查询的条件没有改变的话，就可以多次的从本地缓存中列出相同的数据，减轻服务器端的报表查询压力。<br/>
 * 注意：该store后端对应的url，必须一次将所有数据都查询出来，分页的操作是在前端自动完成的。<br/>
 * 
 * <pre>
 * <code>
 *  //一个使用了CacheRemoteStore的报表的关键代码
 *  BaseAccountChartPanel=Ext.extend(BaseGridPanel,{//可以继承CrudListPanel，屏蔽所有的业务操作方法，也可以继承BaseGridPanel
 *  url:'chartHelper.ejf?cmd=stockNoOrders',//设置URL
 *  //在initComponent中，指定store为CachedRemoteStore。
 *  initComponent:function(){
 *  this.store = new EasyJF.Ext.CachedRemoteStore({
 *  id : &quot;id&quot;,
 *  url : this.url,
 *  varName:&quot;REPORT:stockNoOrder&quot;,
 *  disableClientFilter:true,
 *  pageSize:this.pageSize,
 *  root : &quot;result&quot;,
 *  remoteSort : false,
 *  totalProperty : &quot;rowCount&quot;,
 *  fields : this.storeMapping
 *  });
 *  this.store.paramNames.sort = &quot;orderBy&quot;;
 *  this.store.paramNames.dir = &quot;orderType&quot;;
 *  BaseAccountChartPanel.superclass.initComponent.call(this);
 *  }
 *  //查询方法，如果发现查询的条件没有改变，则直接从缓存中查询，如果查询条件已经修改
 *  //则调用this.store.prox.getData().clear()方法清空缓存。然后重新从服务器端请求数据。
 *  quickSearch:function(){
 *  var parsep = this.parseParams();
 *  var tag = parsep === undefined||parsep === true;
 *  this.store.proxy.getData().clear();
 *  this.store.searchKeys=Ext.urlEncode(this.store.baseParams);
 *  if(this.forceReload===true){
 *  this.store.baseParams.forceReload = true;
 *  this.forceReload = false;
 *  }
 *  if(!tag){
 *  return false;
 *  }
 *  this.refresh();
 *  },
 * </code>
 * </pre>
 */
Ext.extend(EasyJF.Ext.CachedRemoteStore, Ext.data.Store, {
			/**
			 * 对外提供的重新刷新缓存的方法<br/> 该方法会清空当前store对应缓存中的数据，并重新从服务器端加载数据
			 */
			refreshCache : function() {// 刷新缓存数据,重新从服务器端加载数据
				this.proxy.getData().clear();
				this.reload();
			},
			/**
			 * 设置是否启用缓存<br/>
			 * 如果设置为true，则默认开启缓存。也可以在运行状态中通过设置enableCache(false)来动态关闭store的缓存功能
			 * 
			 * @param {Boolean}
			 *            b 是否开启缓存
			 */
			enableCache : function(b) {
				this.proxy.enableCache = b === window.undefined ? true : !!!b;
			},
			/**
			 * 判断当前store是否开启缓存功能
			 * 
			 * @return {Boolean} ret 返回当前store是否开启了缓存功能
			 */
			isCache : function() {
				return this.proxy.enableCache;
			},
			// private
			sortFn : function(a, b) {
				if (!a || b || !a.toUpperCase || !b.toUpperCase) {
					var v1 = a, v2 = b;
					return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
				}
				var i = a.toUpperCase() == b.toUpperCase();
				if (!i)
					return a.toUpperCase() < b.toUpperCase() ? -1 : 1;
				else {
					var ret = 0;
					for (var i = 0; i < a.length; i++) {
						if (a[i] !== b[i]) {
							return a[i] < b[i] ? 1 : -1;
						}
					}
					return ret;
				}
			},
			// private
			sortData : function(f, direction) {
				direction = direction || 'ASC';
				var st = this.fields.get(f).sortType;
				var fn = this.sortFn;
				this.data.sort(direction, fn);
				if (this.snapshot && this.snapshot != this.data) {
					this.snapshot.sort(direction, fn);
				}
			},
			// private
			sort : function(fieldName, dir) {
				if (this.isCache === false) {
					EasyJF.Ext.CachedRemoteStore.superclass.sort.call(this,
							fieldName, dir);
					return;
				}
				var f = this.fields.get(fieldName);
				if (!f) {
					return false;
				}
				if (!dir) {
					if (this.sortInfo && this.sortInfo.field == f.name) { // toggle
						// sort
						// dir
						dir = (this.sortToggle[f.name] || "ASC").toggle("ASC",
								"DESC");
					} else {
						dir = f.sortDir;
					}
				}
				var st = (this.sortToggle) ? this.sortToggle[f.name] : null;
				var si = (this.sortInfo) ? this.sortInfo : null;

				this.sortToggle[f.name] = dir;
				this.sortInfo = {
					field : f.name,
					direction : dir
				};
				if (!this.remoteSort) {
					this.applySort();
					this.fireEvent("datachanged", this);
				} else {
					var direction = dir || 'ASC';
					var st2 = this.fields.get(f.name).sortType;
					var sortFn = this.sortFn;
					var fn = function(r1, r2) {
						var v1 = st2(r1[f.name]), v2 = st2(r2[f.name]);
						return sortFn(v1, v2);
					};
					this.proxy.getData().sort(direction, fn);
					if (!this.load(this.lastOptions)) {
						if (st) {
							this.sortToggle[f.name] = st;
						}
						if (si) {
							this.sortInfo = si;
						}
					}
				}
			}
		});

/**
 * @class EasyJF.Ext.CachedRemoteObject
 * @extends Ext.util.Observable
 * 
 * 本地缓存对象<br/>
 */
EasyJF.Ext.CachedRemoteObject = function(varName, url, collectionType,
		shareCache) {
	/**
	 * @cfg {Stirng} varName 缓存的名称
	 */
	this.varName = varName;
	/**
	 * @cfg {Stirng} url 获取数据的url
	 */
	this.url = url;
	/**
	 * @cfg {Stirng} collectionType 集合类型，默认为Ext.util.MixedCollection
	 */
	this.collectionType = collectionType;
	/**
	 * @cfg {Boolean} shareCache 是否共享缓存
	 *      如果是共享缓存，数据缓存在EasyJF.Ext.CachedRemoteObject.shareCaches中，如果没有使用共享缓存，数据放在EasyJF.Ext.CachedRemoteObject.DATAS
	 */

	/**
	 * @event load 在缓存store加载数据的时候(不论是从缓存中加载还是真实加载)后抛出
	 * @param {Object}
	 *            加载的数据
	 */
	this.addEvents("load");
	if (shareCache) {
		if (!EasyJF.Ext.CachedRemoteObject.shareCaches[varName])
			EasyJF.Ext.CachedRemoteObject.shareCaches[varName] = eval("new "
					+ (collectionType || "Ext.util.MixedCollection") + "()");
	}
	EasyJF.Ext.CachedRemoteObject.superclass.constructor.call(this);
}
/**
 * 全局的缓存</br> ==EasyJF.Ext.CachedRemoteObject.DATAS
 */
EasyJF.Cache = EasyJF.Ext.CachedRemoteObject.DATAS = {};
/**
 * 全局的共享缓存<br/> ==EasyJF.Ext.CachedRemoteObject.shareCaches
 */
EasyJF.shareCaches = EasyJF.Ext.CachedRemoteObject.shareCaches = {};

/**
 * @class EasyJF.Ext.CachedRemoteObject
 * @extends Ext.util.Observable
 * 
 * 本地缓存对象<br/>
 */
Ext.extend(EasyJF.Ext.CachedRemoteObject, Ext.util.Observable, {
			varName : null,
			url : null,
			/**
			 * 从缓存中得到数据
			 * 
			 * @return {Object} 得到的数据
			 */
			getData : function() {
				var obj = EasyJF.Ext.CachedRemoteObject.DATAS[this.varName];
				return obj;
			},
			// private
			onload : function(callback) {
				this.fireEvent("load", this,
						EasyJF.Ext.CachedRemoteObject.DATAS[this.varName]);
				if (callback)
					callback();
			},
			/**
			 * 刷新缓存数据,重新从服务器端加载数据
			 */
			clearData : function() {// 
				var obj = EasyJF.Ext.CachedRemoteObject.DATAS[this.varName];
				if (obj.clear)
					obj.clear();
				else
					obj = null;
			},
			load : function(callback, params) {
				if (EasyJF.Ext.CachedRemoteObject.DATAS[this.varName]) {
					this.onload.call(this, callback, params);
					return;
				}
				if (this.varName && this.url) {
					EasyJF.Ext.Util.loadJSON2Collection(
							"EasyJF.Ext.CachedRemoteObject.DATAS['"
									+ this.varName + "']", this.url,
							this.onload.createDelegate(this, [callback]),
							EasyJF.shareCaches[this.varName],
							this.collectionType);
				}
			}
		});
CachedRemoteObject = EasyJF.Ext.CachedRemoteObject;

/**
 * @class EasyJF.Ext.MemoryTreeLoader
 * @extends Ext.tree.TreeLoader
 * 
 * 支持本地缓存节点的树加载器<br/> 一般在系统中不经常变动的树状结构都使用该缓存树加载器。<br/>
 * 在不同的模块中可以使用同一个树加载器。一般设置为Global下的一个属性。
 * 
 * <pre>
 * <code>
 * if (!Global.platformMenuLoader) {
 * 	Global.platformMenuLoader = new EasyJF.Ext.MemoryTreeLoader({
 * 				iconCls : 'lanyo-tree-node-icon',
 * 				varName : &quot;Global.PLATFORM_MENU_NODES&quot;,
 * 				url : &quot;systemMenu.ejf?cmd=getTree&amp;pageSize=-1&amp;treeData=true&amp;all=true&quot;,
 * 				listeners : {
 * 					'beforeload' : function(treeLoader, node) {
 * 						treeLoader.baseParams.id = (node.id.indexOf('root') &lt; 0
 * 								? node.id
 * 								: &quot;&quot;);
 * 						if (typeof node.attributes.checked !== &quot;undefined&quot;) {
 * 							treeLoader.baseParams.checked = false;
 * 						}
 * 					}
 * 				}
 * 			});
 * }
 * </code>
 * </pre>
 * 
 */
EasyJF.Ext.MemoryTreeLoader = function(config) {
	EasyJF.Ext.MemoryTreeLoader.superclass.constructor.call(this, config);
	if (this.varName && (this.dataUrl || this.url)) {
		this.remoteObject = new EasyJF.Ext.CachedRemoteObject(this.varName,
				(this.url || this.dataUrl), "EasyJF.Ext.TreeCollection", true);
		if (!this.lazyLoad) {
			this.remoteObject.load();
		}
	}
	this.shareCache = EasyJF.Ext.CachedRemoteObject.shareCaches[this.varName];
}
/**
 * @class EasyJF.Ext.MemoryTreeLoader
 * @extends Ext.tree.TreeLoader
 * 
 * 
 */
Ext.extend(EasyJF.Ext.MemoryTreeLoader, Ext.tree.TreeLoader, {
	/**
	 * @cfg (String} varName
	 * 
	 * 配置缓存的名称
	 */
	varName : null,
	/**
	 * @cfg {Object} remoteObject
	 * 
	 * 可以自己配置缓存树加载器数据缓存对象。默认使用EasyJF.Ext.CachedRemoteObject
	 */
	remoteObject : null,
	dataProxy : false,
	autoLeaf : true,
	remoteDataProxy : null,
	/**
	 * @cfg {Function|Object} transferNode 配置创建树节点的方法或属性。<br/>
	 *      如果该属性是一个方法，则会传入从后台请求到的每一个节点对象作为该方法的参数。<br/>
	 *      如果该属性是一个对象，则会自动讲该对象中的属性加入到节点对象中。<br/>
	 */
	transferNode : window.undefined,
	/**
	 * 从一个树节点级联向下完成某一个funcion
	 * 
	 * @param {Ext.data.Node}
	 *            node 开始的节点
	 * @param {Function}
	 *            fn 对每一个节点要执行的方法
	 * @param {Object}
	 *            scope function执行的作用域
	 * @param {Object|Array}
	 *            args 执行function的参数
	 */
	cascadeNode : function(node, fn, scope, args) {
		if (fn.apply(scope || this, args || [node]) !== false) {
			if (node.children && node.children.length) {
				for (var i = 0, cs = node.children; i < cs.length; i++)
					this.cascadeNode(cs[i], fn, scope, args);
			}
		}
	},
	/**
	 * 从一个指定节点开始向下寻找匹配指定id的节点
	 * 
	 * @param {Object}
	 *            id 要匹配的id值
	 * @param {Ext.data.Node}
	 *            node 开始寻找的节点
	 * @return {Ext.data.Node} 找到的匹配节点
	 */
	deepFindNode : function(id, node) {
		var ret = null;
		this.cascadeNode(node, function(n) {
					if (n.id == id) {
						ret = n;
						return false;
					}
				});
		return ret;
	},
	/**
	 * 从一组定节点中寻找匹配指定id的节点
	 * 
	 * @param {Object}
	 *            id
	 * @param {Object|Array}
	 *            objs
	 *            指定的节点。如果是数组，则将数组中的节点作为寻找的对象。如果是一个Object，则将对象下的item属性作为寻找的对象。
	 * @return {Object} 找到的节点对象
	 */
	findNode : function(id, objs) {
		if (id == "root")
			return Ext.isArray(objs) ? objs : objs.items;
		else {
			var ret = this.deepFindNode(id, {
						id : "root",
						children : (Ext.isArray(objs) ? objs : objs.items)
					});

			return ret && ret.children ? ret.children : null;
		}
	},
	/**
	 * 加载节点下的数据
	 * 
	 * @param {Ext.data.Node}
	 *            node 要加载下级数据的节点
	 * @param {Function}
	 *            callback 在加载完成后的回调方法
	 */
	load : function(node, callback) {
		if (this.clearOnLoad) {
			while (node.firstChild) {
				node.removeChild(node.firstChild);
			}
		}
		var objs = this.remoteObject.getData();
		if (objs && objs.length)
			node.attributes.children = this.findNode(node.id, objs);
		if (this.doPreload(node)) {
			if (typeof callback == "function") {
				callback();
			}
		} else if (this.dataUrl || this.url) {
			this.requestData(node, callback);
		}
	},
	doPreload : function(node) {
		if (node.attributes.children && node.attributes.children.length) {
			if (node.childNodes.length < 1) { // preloaded?
				var cs = node.attributes.children;
				node.beginUpdate();
				for (var i = 0, len = cs.length; i < len; i++) {
					var o = Ext.apply({}, cs[i]);
					var cn = this.createNode(o);
					if (cn === false)
						continue;
					var cn = node.appendChild(this.createNode(o));
					if (this.preloadChildren) {
						this.doPreload(cn);
					}
				}
				node.endUpdate();
			}
			return true;
		} else {
			return false;
		}
	},
	/**
	 * @cfg {Object} baseAttrs 为每一个节点对象配置基础的属性。这些属性会自动加到每一个节点对象上
	 */
	// private
	createNode : function(attr) {
		attr = Ext.apply({}, attr);
		if (this.baseAttrs) {
			Ext.applyIf(attr, this.baseAttrs);
		}
		if (this.transferNode != window.undefined) {
			if (typeof this.transferNode == 'function') {
				attr = this.transferNode(attr);
			} else if (typeof this.transferNode == 'object') {
				for (var o in this.transferNode) {
					if (this.transferNode.hasOwnProperty(o)
							&& Ext.isEmpty(attr[o])) {
						attr[o] = attr[this.transferNode[o]];
					}
				}
			}
		}
		if (this.autoLeaf === true) {
			if (!attr.children || !attr.children.length) {
				attr.leaf = true;
			}
		}
		return EasyJF.Ext.MemoryTreeLoader.superclass.createNode.call(this,
				attr)
	},
	// private
	processResponse : function(response, parentNode, callback) {
		var json = response.responseText;
		try {
			var o = eval("(" + json + ")");

			var collection = EasyJF.Ext.CachedRemoteObject.shareCaches[this.varName];
			collection.clear();
			collection.addAll(o);
			EasyJF.Ext.CachedRemoteObject.DATAS[this.varName] = collection;
			o = collection.items;
			parentNode.beginUpdate();
			collection.each(function(node) {
						var n = this.createNode(node);
						if (n)
							parentNode.appendChild(n);
					}, this);
			parentNode.endUpdate();
			if (typeof callback == "function") {
				callback(this, parentNode);
			}
		} catch (e) {
			this.handleFailure(response);
		}
	}
});
Ext.ns('EasyJF.Ext.Tree');

/**
 * 
 * @class BaseGridList
 * @extends Ext.Panel
 * 
 * 一个基础的包含了grid的panel组件。该组件一般用于报表等只需要grid的情况。
 * 
 * <pre>
 * <code>
 * //一个简单的包装基础报表的基础类
 * BaseOrderChartPanel = Ext.extend(BaseGridList, {
 * 	autoLoadGridData : false,
 * 	pagingToolbar : false,
 * 	gridBorder : false,
 * 	showMenu : false,
 * 	ableShowPic : false,
 * 	readOnlyNumRender : function(v) {
 * 		if (v == 0)
 * 			return &quot;&quot;;
 * 		return v;
 * 	},
 * 	createQuery : function() {
 * 	},
 * 	createButtonToolBar : function() {
 * 	},
 * 	createToolbar : function() {
 * 		this.createQuery();
 * 		var search_btn = this.createButtonToolBar();
 * 		var fixBtn = [&quot;-&quot;, {
 * 					text : &quot;查询&quot;,
 * 					iconCls : 'advance-search-icon',
 * 					handler : this.quickSearch,
 * 					scope : this
 * 				}, {
 * 					id : &quot;btn_refresh&quot;,
 * 					text : &quot;刷新&quot;,
 * 					iconCls : 'f5',
 * 					handler : this.resetSearch,
 * 					scope : this
 * 				}, {
 * 					text : &quot;打印&quot;,
 * 					iconCls : &quot;print-icon&quot;,
 * 					handler : this.printList,
 * 					scope : this
 * 				}];
 * 		Ext.each(fixBtn, function(o) {
 * 					search_btn.push(o);
 * 				}, this);
 * 		this.gridTbar = new Ext.Toolbar(search_btn);
 * 	},
 * 	resetSearch : function() {
 * 		this.gridTbar.items.each(function(o) {
 * 					if (o.isFormField) {
 * 						o.reset();
 * 					}
 * 				}, this);
 * 	},
 * 	quickSearch : function() {
 * 		var tag = this.parseParams() === undefined
 * 				|| this.parseParams() === true;
 * 		if (!tag) {
 * 			return false;
 * 		}
 * 		this.refresh();
 * 	},
 * 	printList : function() {
 * 		var tag = this.parseParams() === undefined
 * 				|| this.parseParams() === true;
 * 		if (!tag) {
 * 			return false;
 * 		}
 * 		this.parseParams();
 * 		var s = Ext.urlEncode(this.store.baseParams);
 * 		var win = new Ext.Window({
 * 			title : &quot;打印窗口&quot;,
 * 			html : &quot;&lt;iframe width='100%' frameborder='no' style='background:#FFF' border=0 height='100%' src ='&quot;
 * 					+ this.url + &quot;&amp;print=true&amp;&quot; + s + &quot;' &gt;&quot;
 * 		});
 * 		win.show();
 * 		win.fitContainer();
 * 		win.center();
 * 	},
 * 	showPic : function(grid, rowIndex, e) {
 * 		var record = grid.getStore().getAt(rowIndex); // Get the Record
 * 		if (!record.get(&quot;productId&quot;))
 * 			return false;
 * 		if (!this.chooser) {
 * 			this.chooser = new ImageChooser({
 * 						url : 'product.ejf?cmd=loadPic',
 * 						width : 500,
 * 						height : 400
 * 					});
 * 		}
 * 		this.chooser.setParams({
 * 					id : record.get(&quot;productId&quot;)
 * 				});
 * 		this.chooser.show(Ext.fly(e.getRelatedTarget()));
 * 	},
 * 	initComponent : function() {
 * 		this.cm = this.getColumnModel();
 * 		this.createToolbar();
 * 		this.gridConfig = {
 * 			enableHdMenu : false,
 * 			plugins : [new Ext.ux.grid.GridSummary()]
 * 		};
 * 		BaseOrderChartPanel.superclass.initComponent.call(this);
 * 		if (this.ableShowPic) {
 * 			this.grid.on(&quot;rowdblclick&quot;, this.showPic, this);
 * 		}
 * 	}
 * });
 * </code>
 * </pre>
 */
BaseGridList = Ext.extend(Ext.Panel, {
			/**
			 * @cfg {String} layout 默认为fit
			 */
			layout : "fit",
			/**
			 * @cfg {Boolean} loadData 在页面加载完成后是否自动加载grid内容
			 */
			loadData : false,
			/**
			 * @cfg {Integer} pageSize 每页显示的条数
			 */
			pageSize : 10,
			/**
			 * @cfg {Boolean} closable 页面是否显示关闭按钮
			 */
			closable : true,
			autoScroll : true,
			/**
			 * @cfg {Boolean} pagingToolbar 是否显示分页组件 默认是
			 */
			pagingToolbar : true,
			/**
			 * @cfg {Boolean} gridForceFit 强制表格自动适应 默认是
			 */
			gridForceFit : true,// 
			/**
			 * @cfg {Object} gridViewConfig 自定义的表格视图配置对象。一般用于配置getRowClass等。
			 */
			gridViewConfig : {},
			/**
			 * @cfg {Object} gridConfig 自定义的表格配置对象。
			 */
			gridConfig : {},
			/**
			 * @cfg {Boolean} showMenu 在表格中是否显示右键菜单,默认显示
			 */
			showMenu : true,
			/**
			 * @cfg {Boolean} showMenu 在表格中是否显示右键菜单，默认不显示
			 */
			menu_refresh : false,
			linkRenderer : EasyJF.Ext.Util.linkRenderer,
			linkRender : EasyJF.Ext.Util.linkRenderer,
			imgRender : EasyJF.Ext.Util.imgRender,
			booleanRender : EasyJF.Ext.Util.booleanRender,
			dateRender : EasyJF.Ext.Util.dateRender,
			userRender : EasyJF.Ext.Util.userRender,
			objectRender : EasyJF.Ext.Util.objectRender,
			typesRender : EasyJF.Ext.Util.typesRender,
			operaterRender : EasyJF.Ext.Util.operaterRender,
			/**
			 * @cfg {Class} storeType
			 *      配置列表的store的类型。默认是Ext.data.JsonStore，还可以配置成CacheStore等。
			 */
			storeType : Ext.data.JsonStore,
			/**
			 * @cfg {Object} storeConfig 自定义列表store的配置对象
			 */
			storeConfig : {},
			emailRender : function(v) {
				return v ? v.email : "未知";
			},
			/**
			 * 刷新当前列表store
			 */
			refresh : function() {
				this.store.removeAll();
				this.store.reload({
							callback : function(rs) {
								if (rs && rs.length < 1) {
									Ext.Msg.alert("提示", "没有符合条件的数据！");
									EasyJF.Ext.Util.autoCloseMsg.defer(2000);
								}
							}
						});
			},
			/**
			 * 显示列表右键菜单
			 * 
			 * @param {Ext.grid.GridPanel}
			 *            g 要显示右键菜单的列表
			 * @param {Integer}
			 *            i 如果传入i，则首先选中列表第i列
			 * @param {}
			 *            e
			 */
			showContextMenu : function(g, i, e) {
				var evn = e ? e : g;
				evn.preventDefault();
				if (i) {
					this.grid.getSelectionModel().selectRow(i, false);
				}
				this.menu.showAt(evn.getPoint());
			},
			/**
			 * 在列表的点击事件中执行由operateRender创建的column
			 * 
			 * @param {}
			 *            grid
			 * @param {}
			 *            rowIndex
			 * @param {}
			 *            columnIndex
			 * @param {}
			 *            e
			 */
			doOperate : function(grid, rowIndex, columnIndex, e) {
				var tag = e.getTarget("A", 3);
				if (tag) {
					var id = tag.getAttribute("theid");
					var cmd = tag.getAttribute("op");
					var cf = tag.getAttribute("cf");
					if (id && cmd && this.operate)
						this.operate(cmd, id, cf, grid, rowIndex, columnIndex,
								e);
				}
			},
			/**
			 * @cfg {Array} menus 右键菜单项数组
			 */
			/**
			 * @cfg {Ext.data.Store} store 可以直接配置列表的store
			 */
			/**
			 * @cfg {Ext.grid.ColumnModel} cm 列表的ColumnModel
			 */
			/**
			 * @cfg {Object|Array} gridTbar 配置的列表的tbar
			 */
			/**
			 * @cfg {Boolean} gridBorder 配置列表panel的边框
			 */
			/**
			 * @cfg {Boolean} columnLock 配置列表是否开启列锁定功能，默认不开启
			 */
			initComponent : function() {
				BaseGridList.superclass.initComponent.call(this);
				if (!this.store) {
					this.store = new this.storeType(Ext.apply({
								id : "id",
								url : this.url,
								root : "result",
								totalProperty : "rowCount",
								remoteSort : true,
								fields : this.storeMapping
							}, this.storeConfig));
				}
				this.store.paramNames.sort = "orderBy";
				this.store.paramNames.dir = "orderType";
				this.cm.defaultSortable = true;
				var viewConfig = Ext.apply({
							forceFit : this.gridForceFit
						}, this.gridViewConfig);
				var gridConfig = Ext.apply({},{
							store : this.store,
							cm : this.cm,
							trackMouseOver : false,
							loadMask : true,
							viewConfig : viewConfig,
							bbar : (Ext.isFunction(this.buildGridBbar) ? this.buildGridBbar() : false ) 
								|| (this.pagingToolbar ? new Ext.ux.PagingComBo({
									pageSize : this.pageSize,
									store : this.store
								}) : null)
						});
				Ext.apply(gridConfig, this.gridConfig);
				this.menus = this.menus || [];
				if (this.menu_refresh)
					this.menus[this.menus.length] = {
						id : "menu_refresh",
						cls : "x-btn-text-icon",
						icon : "images/icons/arrow_refresh.png",
						text : "刷新",
						handler : this.refresh,
						scope : this
					};
				this.menu = new Ext.menu.Menu({
							items : this.menus
						});
				// if(this.gridConfig)gridConfig=Ext.apply(this.gridConfig,gridConfig);
				if (this.gridTbar)
					gridConfig.tbar = this.gridTbar;
				if (this.gridBorder === false || this.gridBorder)
					gridConfig.border = this.gridBorder;
				if (this.columnLock && Ext.grid.LockingGridPanel) {
					if (!gridConfig.columns && gridConfig.cm) {
						gridConfig.columns = gridConfig.cm.config;
						delete gridConfig.cm;
					}
					this.grid = new Ext.grid.LockingGridPanel(gridConfig);
				} else
					this.grid = new Ext.grid.GridPanel(gridConfig);
				this.grid.on("rowcontextmenu", function(g, n, e) {
							if (!this.showMenu)
								return false;
							if (g.getSelectionModel().selectRow)
								g.getSelectionModel().selectRow(n);
							this.menu.showAt(e.getPoint());
							e.preventDefault();
						}, this);
				this.add(this.grid);
				if (this.loadData)
					this.store.load();
			}
		});
/*
 * UserSelectCombo = Ext.extend(Ext.form.ComboBox, { editable : false,
 * searchByUser : function(text, v) { this.store.baseParams.searchKey = v;
 * this.store.reload(); }, initList : function() {
 * UserSelectCombo.superclass.initList.call(this); if (this.pageTb) {
 * this.pageTb.add("用户名"); this.pageTb.add({ xtype : "textfield", id :
 * "searchKey", width : 50, listeners : { "change" : this.searchByUser, scope :
 * this } }); this.pageTb.addButton({ text : "查询" }); } } });
 * Ext.reg('userselectcombo', UserSelectCombo);
 */
/**
 * 
 * @class HTMLEditor
 * @extends Ext.form.HtmlEditor
 * 
 * 在Ext.form.HtmlEditor上面增加了一些实用方法。
 * 
 * @xtype myhtmleditor
 */
HTMLEditor = Ext.extend(Ext.form.HtmlEditor, {
	// enableFont:false,
	/**
	 * @type String codeStyle 配置的格式化代码样式
	 */
	codeStyle : '<br/><pre style="border-right: #999999 1px dotted; padding-right: 5px; border-top: #999999 1px dotted; padding-left: 5px; font-size: 12px; padding-bottom: 5px; margin-left: 10px; border-left: #999999 1px dotted; margin-right: 10px; padding-top: 5px; border-bottom: #999999 1px dotted; background-color: #eeeeee">{0}</pre><br/>',
	/**
	 * @cfg {Array} keys 在HtmlEditor上面绑定的快捷键
	 */
	onRender : function(ct, position) {
		HTMLEditor.superclass.onRender.call(this, ct, position);
		if (this.keys) {
			if (!this.keys.length) {
				this.keyMap = new Ext.KeyMap(this.getEditorBody(), this.keys);
			} else {
				this.keyMap = new Ext.KeyMap(this.getEditorBody(), this.keys[0]);
				for (var i = 1; i < this.keys.length; i++)
					this.keyMap.addBinding(this.keys[i]);
			}
			this.keyMap.stopEvent = true;
		}
	},
	/**
	 * 选择表情图标
	 */
	showEmoteSelect : function() {
		emoteSelectWin.editor = this;
		emoteSelectWin.show();
	},
	/**
	 * 添加图片方法。点击添加图片按钮，打开图片上传窗口。并能将上传的图片插入到当前编辑行。
	 */
	addImage : function() {
		function insertImage() {
			var editor = this;
			win.upload(function(ret) {
						if (ret) {
							var s = "<br/><img src=" + ret.path;
							if (ret.width)
								s += " width=" + ret.width;
							if (ret.height)
								s += " height=" + ret.height;
							s += " /><br/>";
							editor.insertAtCursor(s);
							win.close();
						}
					});
		};
		var win = new UploadImageWindow({
					modal : true,
					iconCls : "icon-img",
					buttons : [{
								text : "确定",
								handler : insertImage,
								scope : this
							}, {
								text : "取消",
								handler : function() {
									win.close();
								}
							}]
				});
		win.show();
	},
	/**
	 * 添加代码方法。点击添加代码，打开添加代码窗口。并能将添加的代码插入到当前编辑行。
	 */
	addCode : function() {
		function insertCode() {
			var value = win.getComponent("codes").getValue();
			this.insertAtCursor(String.format(this.codeStyle, value));
			win.close();
		};
		var win = new Ext.Window({
					title : "添加代码",
					width : 500,
					height : 300,
					modal : true,
					iconCls : "icon-code",
					layout : "fit",
					items : {
						xtype : "textarea",
						id : "codes"
					},
					buttons : [{
								text : "确定",
								handler : insertCode,
								scope : this
							}, {
								text : "取消",
								handler : function() {
									win.close();
								}
							}]
				});
		win.show();
	},
	/**
	 * 给HtmlEditor添加按钮。默认添加【插入图片】，【插入代码】和【添加表情】三个按钮，顺序为16,17,18
	 * 
	 * @param {}
	 *            editor
	 */
	createToolbar : function(editor) {
		HTMLEditor.superclass.createToolbar.call(this, editor);
		this.tb.insertButton(16, {
					cls : "x-btn-icon",
					icon : "images/qq/img.gif",
					handler : this.addImage,
					scope : this
				});
		this.tb.insertButton(17, {
					cls : "x-btn-icon",
					icon : "images/qq/code.gif",
					handler : this.addCode,
					scope : this
				});
		this.tb.insertButton(18, {
					cls : "x-btn-icon",
					icon : "images/emote/main.png",
					handler : this.showEmoteSelect,
					scope : this
				});

	},
	/**
	 * @cfg {Integer} maxLength 在HtmlEditor中允许输入的最大字数
	 */
	/**
	 * 验证HtmlEditor的值。 如果配置了maxLength，则如果编辑器中的字数大于maxLength，则编辑器不可用。
	 * 
	 * @param {}
	 *            value
	 * @return {Boolean}
	 */
	validateValue : function(value) {
		if (value.length > this.maxLength) {
			var s = String.format(this.maxLengthText, this.maxLength);
			this.markInvalid(s);
			return false;
		}
		return true;
	}
});
Ext.reg('myhtmleditor', HTMLEditor);

// 用来存放IFrames中的panel引用，以id为单位
IFrames = {};
EasyJF.Ext.CrudListPanel = function(config) {
	var c = config || {};
	Ext.apply(this, c);
	this.addEvents("saveobject", "removeobject");
	EasyJF.Ext.CrudListPanel.superclass.constructor.call(this);
};

/**
 * 
 * @class EasyJF.Ext.CrudListPanel
 * @extends Ext.util.Observable
 * 
 * 和EasyJF.Ext.CrudPanel功能一样，唯一的区别在于在创建了EasyJF.Ext.CrudPanel之后，<br/>
 * 执行了initComponent方法，不会立刻的创建列表等组件，而必须要等到调用了list方法后，才会去创建这些组件。<br/>
 * 相当于完成了一个延迟创建组件的功能。
 */
Ext.extend(EasyJF.Ext.CrudListPanel, Ext.util.Observable, {
	layout : "fit",
	border : false,
	closable : true,
	autoScroll : true,
	/**
	 * 导入说明
	 * @type String
	 */
	importExplain : "",
	/**
	 * @cfg {Boolean} gridForceFit 业务对象列表页面列表是否支持宽度自适应。
	 */
	gridForceFit : true,
	/**
	 * @cfg {Object} viewWin 如果开启了查看业务流程，则该对象定义了查看窗口的样式。
	 *      <ul>
	 *      <li>{Integer} width 窗口宽度</li>
	 *      <li>{Integer} height 窗口高度</li>
	 *      <li>{String} title 窗口标题</li>
	 *      </ul>
	 */
	viewWin : {
		width : 650,
		height : 410,
		title : "详情查看"
	},
	/**
	 * @cfg {Object} searchWin 如果开启了高级查询业务流程，则该对象定义了高级查询窗口的样式。
	 *      <ul>
	 *      <li>{Integer} width 窗口宽度</li>
	 *      <li>{Integer} height 窗口高度</li>
	 *      <li>{String} title 窗口标题</li>
	 *      </ul>
	 */
	searchWin : {
		width : 630,
		height : 300,
		title : "高级查询"
	},// 查询窗口的高度、宽度及标题
	/**
	 * @cfg {Object} gridViewConfig 自定义的业务对象列表表格的视图样式配置。
	 *      比如经常会自定义表格视图的getRowClass属性来在列表中控制不同状态的业务对象的显示方式。
	 */
	gridViewConfig : {},// 表格显示视图的自定义配置
	/**
	 * @cfg {Object} gridConfig 自定义的业务对象列表表格的配置。
	 */
	gridConfig : {},// 表格的自定义配置
	/**
	 * @cfg {Object} baseQueryParameter 定义的查询初始化参数
	 *      该参数会一直绑定在业务对象列表的store上。在实际的开发中，一般用来区分类似于销售出库单，报损单等相同模型，近似逻辑的单据。
	 */
	baseQueryParameter : {}
		// 查询初始化参数
	});
Ext.apply(EasyJF.Ext.CrudListPanel.prototype, EasyJF.Ext.CrudFunction, {
	/**
	 * @cfg {Function} afterList 该方法在list方法执行最后执行。即在初始化完成了所有页面组件后执行。<br/>
	 *      可以在该方法中完成添加按钮等功能。
	 */
	afterList : Ext.emptyFn,
	/**
	 * @event saveobject 当保存或者修改业务对象成功后抛出的事件
	 * 
	 * @param {EasyJF.Ext.Util.CrudPanel}
	 *            this CrudPanel自身
	 * @param {Ext.form.BasicForm}
	 *            form 提交的表单
	 * @param {Ext.form.Action}
	 *            action 提交表单绑定的acion对象。
	 */
	/**
	 * @event removeobject 当删除业务对象成功后抛出的事件
	 * 
	 * @param {EasyJF.Ext.Util.CrudPanel}
	 *            this CrudPanel自身
	 * @param {Ext.data.Record}
	 *            r 删除的对象在列表中对应的record对象。
	 * @param {Object}
	 *            option 提交请求绑定的option对象。
	 */
	/**
	 * 该方法真正的创建了CrudListPanel中的所有业务组件，包括列表，按钮，菜单，CRUD窗口等。
	 * 
	 * @return {Ext.Panel} panel 调用这个方法后，才会返回创建的CrudPanel。<br/>
	 *         如果是需要在某些组件（比如窗口或tab）中显示一个CrudListPanel，必须要放入调用了list()方法后返回的Panel。<br/>
	 *         例如，一个CrudListPanel ：MyCrudListPanel，要放在window中，<br/> items:new
	 *         MyCrudListPanel()//是不对的，因为这样没有panel
	 * 
	 * var p=new MyCrudListPanel();<br/> items:p.list()//这样才是对的。
	 */
	list : function() {
		this.initComponent();
		this.checkAdnLoadColumnField();
		this.store = new Ext.data.JsonStore( {
			id : this.storeId ? this.storeId : "id",
			url : this.formatUrl('list'),
			root : "result",
			totalProperty : "rowCount",
			remoteSort : true,
			autoDestroy : true,
			fields : this.storeMapping
		});
		if (Ext.objPcount(this.baseQueryParameter)) {
			this.store.on('beforeload',
					function(store, options) {
						Ext.apply(store.baseParams,
								this.baseQueryParameter);
					}, this);
		}
		this.store.baseParams = Ext.apply( {}, {
			limit : this.pageSize || ""
		}, this.initQueryParameter || {});
		this.store.paramNames.sort = "orderBy";
		this.store.paramNames.dir = "orderType";

		var buttons = this.buildCrudOperator();

		var viewConfig = Ext.apply( {
			forceFit : this.gridForceFit
		}, this.gridViewConfig);

		var gridConfig = Ext.apply(this.gridConfig, {
			store : this.store,
			stripeRows : true,
			trackMouseOver : false,
			loadMask : true,
			viewConfig : viewConfig,
			tbar : buttons,
			border : false,
			bbar : this.pagingToolbar
					? new Ext.ux.PagingComBo( {
						rowComboSelect : true,
						pageSize : this.pageSize,
						store : this.store,
						displayInfo : true
					})
					: null
		});
		
		if (this.summaryGrid) {
			if (gridConfig.plugins) {
				if (typeof gridConfig.plugins == "object")
					gridConfig.plugins = [gridConfig.plugins];
			} else
				gridConfig.plugins = [];
			gridConfig.plugins[gridConfig.plugins.length] = new Ext.ux.grid.GridSummary();
		}
		
		var columns = this.columns , cfg = {};
		columns = columns || this.cm.config;
		delete gridConfig.cm;
		
		columns = columns.copy();
		if(this.gridRowNumberer){
			columns.unshift(new Ext.grid.RowNumberer({header:'序号',width:36}));
		}
		
		if((!gridConfig.sm && !gridConfig.selModel) && this.gridSelModel=='checkbox'){
			cfg.sm = new Ext.grid.CheckboxSelectionModel();
			if(columns[0] instanceof Ext.grid.RowNumberer){
				columns.splice(1,0,cfg.sm);	
			}else{
				columns.unshift(cfg.sm);
			}
		}
		cfg.columns = columns;
		
		gridConfig = Ext.applyIf(cfg,gridConfig);
		
		if (this.columnLock && Ext.grid.LockingGridPanel) {
			this.grid = new Ext.grid.LockingGridPanel(gridConfig);
		} else{
			this.grid = new Ext.grid.GridPanel(gridConfig);
		}
		this.grid.colModel.defaultSortable = true;// 设置表格默认排序
		this.panel = new Ext.Panel( {
			id : this.id,
			title : this.title,
			closable : this.closable,
			autoScroll : this.autoScroll,
			layout : this.layout,
			border : this.border,
			listeners : {
				close : function() {
					delete this.panel;
				},
				scope : this
			}
		});
		this.panel.add(this.grid);
		this.loadOperatorsPermission();
		// 双击表格行进入编辑状态
		this.initCrudEventHandler();
		// this.disableOperaterItem("btn_edit","btn_remove","btn_view");
		this.afterList();
		if (this.autoLoadGridData)
			this.store.load();
		this.panel.service = this;
		return this.panel;
	}
});

Ext.namespace("Ext.ux.panel");
/**
 * @class Ext.ux.panel.DDTabPanel
 * @extends Ext.TabPanel
 * 
 * 可拖拽的TabPanel。该tabpanel可以拖拽任何一个tab到指定的位置。
 */
Ext.ux.panel.DDTabPanel = Ext.extend(Ext.TabPanel, {
	arrowOffsetX : -9,
	arrowOffsetY : -8,
	border : false,
	enableTabScroll : true,
	layoutOnTabChange : true,
	autoScroll : true,
	resizeTabs : true,
	tabWidth : 136,
	minTabWidth : 136,
	titleLength : 100,
	initComponent : function() {
		Ext.ux.panel.DDTabPanel.superclass.initComponent.call(this);
		if (!this.ddGroupId) {
			this.ddGroupId = "dd-tabpanel-group-"
					+ Ext.ux.panel.DDTabPanel.superclass.getId.call(this)
		}
	},
	afterRender : function() {
		Ext.ux.panel.DDTabPanel.superclass.afterRender.call(this);
		this.arrow = Ext.DomHelper.append(Ext.getBody(),
				'<div class="dd-arrow-down"></div>', true);
		this.arrow.hide();
		var a = this.ddGroupId;
		this.dd = new Ext.ux.panel.DDTabPanel.DropTarget(this, {
					ddGroup : a
				});
	},
	initTab : function(b, a) {
		Ext.ux.panel.DDTabPanel.superclass.initTab.call(this, b, a);
		var c = this.id + "__" + b.id;
		var id = this.stripWrap.id;
		Ext.applyIf(b, {
					allowDrag : true
				});
		Ext.apply(b, {
			position : (a + 1) * 2,
			ds : new Ext.dd.DragSource(c, {
				ddGroup : this.ddGroupId,
				dropEl : b,
				dropElHeader : Ext.get(c, true),
				scroll : false,
				onStartDrag : function() {
					this.constrainTo(id);
					this.getProxy().ghost.dom.innerHTML = String
							.format(
									"<div style='width:100px;overflow:hidden;'>{0}</div>",
									this.dropEl.title);
					if (this.dropEl.iconCls) {
						this.getProxy().getGhost().select(".x-tab-strip-text")
								.applyStyles({
											paddingLeft : "1px"
										})
					}
				},
				onMouseDown : function(d) {
					if (!this.dropEl.isVisible()) {
						this.dropEl.show();
					}
				}
			}),
			enableDrag : function() {
				this.allowDrag = true;
				return this.ds.unlock()
			},
			disableDrag : function() {
				this.allowDrag = false;
				return this.ds.lock()
			}
		});
		if (b.allowDrag) {
			b.enableDrag()
		} else {
			b.disableDrag()
		}
	},
	/*
	 * onRemove : function(a) { Ext.destroy(a.ds.proxy, a.ds);
	 * Ext.ux.panel.DDTabPanel.superclass.onRemove.call(this, b, a) },
	 */
	onDestroy : function() {
		Ext.destroy(this.dd, this.arrow);
		Ext.ux.panel.DDTabPanel.superclass.onDestroy.call(this)
	}
});
Ext.ux.panel.DDTabPanel.DropTarget = Ext.extend(Ext.dd.DropTarget, {
			constructor : function(b, a) {
				this.tabpanel = b;
				Ext.ux.panel.DDTabPanel.DropTarget.superclass.constructor.call(
						this, b.stripWrap, a)
			},
			notifyOver : function(q, l, j) {
				var m = this.tabpanel.items;
				var p = m.length;
				if (!l.within(this.getEl())) {
					return "x-dd-drop-nodrop"
				}
				var r = this.tabpanel.arrow;
				var o = this.el.getY();
				var f;
				var k = l.getPageX();
				for (var h = 0; h < p; h++) {
					var d = m.itemAt(h);
					var c = d.ds.dropElHeader;
					var n = c.getX();
					var a = n + c.dom.clientWidth / 2;
					if (k <= a) {
						f = n;
						break
					}
				}
				if (typeof f == "undefined") {
					var b = m.itemAt(p - 1);
					if (b) {
						var g = b.ds.dropElHeader.dom;
						f = (new Ext.Element(g).getX() + g.clientWidth) + 3
					}
				}
				r.setTop(o + this.tabpanel.arrowOffsetY).setLeft(f
						+ this.tabpanel.arrowOffsetX).show();
				return this.dropAllowed;
			},
			notifyDrop : function(p, k, f) {
				this.tabpanel.arrow.hide();
				var m = this.tabpanel.items;
				var o = m.length;
				var h = k.getPageX();
				var l = o;
				p.dropEl.position = o * 2 + 1;
				var j = this.tabpanel.items.indexOf(p.dropEl);
				for (var d = 0; d < o; d++) {
					var c = m.itemAt(d);
					var b = c.ds.dropElHeader;
					var n = b.getX();
					var a = n + b.dom.clientWidth / 2;
					if (h <= a) {
						if (j < d) {
							d -= 1
						}
						break
					}
				}
				p.proxy.hide();
				var g = p.dropEl.ownerCt.remove(p.dropEl, false);
				var c = this.tabpanel.getComponent(d);
				if (c && c.tabFixed) {
					d = this.getLastTabFixed()
				}
				if (this.tabpanel.items.getCount() < d) {
					d = this.tabpanel.items.getCount()
				}
				this.tabpanel.insert(d, g);
				this.tabpanel.activate(g);
				/*
				 * var q =
				 * this.tabpanel.getTabEl(g).childNodes[1].firstChild.firstChild;
				 * if (q) { q.style.width =
				 * Ext.value(this.tabpanel.minTabWidth,120) + "px" }
				 */
				return true
			},
			getLastTabFixed : function() {
				var a = this.tabpanel.items.filter("tabFixed", true);
				return a.getCount()
			},
			notifyOut : function(a, c, b) {
				this.tabpanel.arrow.hide()
			}
		});
Ext.reg("ddtabpanel", Ext.ux.panel.DDTabPanel);

ChartTools = {
	createFusionChart : function(url, swf, chartId, width, height, options) {
		options = options || {};
		var myChart = new FusionCharts(swf, chartId, width, height, "0", "0");
		url = url || options.url;
		if (url) {
			if (url.indexOf("?") < 1)
				url += "?";
			if (options.params)
				url += Ext.urlEncode(options.params);
			myChart.setDataURL(url);
		}
		if (options.renderTo && url) {
			myChart.render(options.renderTo);
		}
		return myChart;
	},
	// "FusionCharts/chart/Column3D.swf",
	createChart : function(url, swf, config) {
		config = config || {};
		var myChart = this.createFusionChart(url, swf, config.id, config.width,
				config.height, config);
		return myChart;
	},
	createColumn2D : function(url, config) {
		return this.createChart(url, "FusionCharts/chart/Column2D.swf", config);
	},
	createColumn3D : function(url, config) {
		return this.createChart(url, "FusionCharts/chart/Column3D.swf", config);
	},
	createGroupColumn2D : function(url, config) {
		return this.createChart(url, "FusionCharts/chart/MSColumn2D.swf",
				config);
	},
	createGroupColumn3D : function(url, config) {
		return this.createChart(url, "FusionCharts/chart/MSColumn3D.swf",
				config);
	},
	createPie2D : function(url, config) {
		return this.createChart(url, "FusionCharts/chart/Pie2D.swf", config);
	},
	createPie3D : function(url, config) {
		return this.createChart(url, "FusionCharts/chart/Pie3D.swf", config);
	},
	createBar2D : function(url, config) {
		return this.createChart(url, "FusionCharts/chart/Bar2D.swf", config);
	},
	createGroupBar2D : function(url, config) {
		return this.createChart(url, "FusionCharts/chart/MSBar2D.swf", config);
	},
	createGroupBar3D : function(url, config) {
		return this.createChart(url, "FusionCharts/chart/MSBar3D.swf", config);
	},
	createLine : function(url, config) {
		return this.createChart(url, "FusionCharts/chart/Line.swf", config);
	},
	createGroupLine : function(url, config) {
		return this.createChart(url, "FusionCharts/chart/MSLine.swf", config);
	}
};

ChartWindow = Ext.extend(Ext.Window, {
	max : 20,// 显示前几条
	store : null,// 数据项
	datas : null,// 直接把datas中的数据进行展示
	columnModel : null,// 表格模型
	url : "",// 远程数据加载url
	params : null,// 查询参数
	grid : null,// 直接拿一个表格来分析
	layout : "border",
	closeAction : "hide",
	buttonAlign : "center",
	tpl : new Ext.XTemplate('<chart caption="{title}"> ', '<tpl for="list">',
			'<set label="{name}" value="{value}" />', '</tpl></chart>'),
	initParams : function() {
		if (this.grid) {
			this.store = this.grid.store;
			if (!this.columnModel)
				this.columnModel = this.grid.getColumnModel();
		}
		if (this.columnModel) {
			var fields = [];
			if (this.columnModel.getColumnCount
					&& this.columnModel.getDataIndex) {// 是表格的columnModel对象
				for (var i = 0; i < this.columnModel.getColumnCount(); i++) {
					fields.push({
								id : this.columnModel.getDataIndex(i),
								title : this.columnModel.getColumnHeader(i)
							});
				}
			} else {// 直接是描述可分析项目的数组
				fields = this.columnModel;
			}
			this.leftTree.root.attributes.children = [];
			for (var i = 0; i < fields.length; i++) {
				this.leftTree.root.attributes.children.push({
							text : fields[i].title,
							id : fields[i].id,
							leaf : true
						});
			}
			this.leftTree.root.reload();
			this.btn_field.store.loadData(fields);
			this.btn_field.setValue(this.field || "");
		}
		this.btn_max.setValue(this.max);
		this.setTitle(this.title);
	},
	loadChart : function() {
		this.initParams();
		var objs = {
			title : this.title,
			list : [],
			order : false
		};
		var orderBy = "";
		if (this.btn_orderASC.getValue())
			orderBy = "ASC";
		else if (this.btn_orderDESC.getValue())
			orderBy = "DESC";
		if (this.datas && this.datas.length) {
			objs.list = this.datas;
		} else if (this.store) {
			if (orderBy)
				this.store.sort(this.field, orderBy);
			for (var i = 0; i < this.store.getCount() && i < this.max; i++) {
				var r = this.store.getAt(i).data;
				var obj = {
					name : r[this.label || "sn"],
					value : r[this.field]
				};
				objs.list.push(obj);
			}
			objs.order = true;
		}
		var xml = "";
		if (!objs.list.length && this.url) {
			var response = Ext.lib.Ajax.syncRequest("POST", this.url, Ext
							.apply(this.params, {
										sort : orderBy
									}));
			xml = response.conn.responseText;
		} else {
			if (!objs.order && orderBy) {// 如果是直接传的数据,则需要手动
				var f = "value";
				var dsc = orderBy.toUpperCase() == "DESC" ? -1 : 1;
				objs.list.sort(function(a, b) {
							if (a[f] == b[f])
								return 0;
							else
								return a[f] > b[f] ? 1 * dsc : -1 * dsc;
						});
			}
			xml = this.tpl.applyTemplate(objs);
		}
		var createChart = ChartTools.createColumn3D;
		if (this.btn_pie.getValue())
			createChart = ChartTools.createPie3D;
		else if (this.btn_pie2d.getValue())
			createChart = ChartTools.createPie2D;
		else if (this.btn_bar2d.getValue())
			createChart = ChartTools.createColumn2D;
		var chartPanel = this.chartPanel;
		var b = chartPanel.body.getBox();
		try {
			this.chart = createChart.call(ChartTools, null, {
						width : b.width - 20,
						height : b.height - 10
					});
		} catch (e) {
			alert(e);
		}
		this.chart.setDataXML(xml);
		this.chart.render(chartPanel.body.dom);
	},
	// 根据查询条件刷新报表
	refreshChart : function() {
		this.max = this.btn_max.getValue();
		// this.field=this.btn_field.getValue();
		this.loadChart();
	},
	clickDeptNode : function(node) {
		this.params = Ext.apply({}, {
					field : node.attributes.id
				}, this.params);
		this.field = node.attributes.id;
		this.title = node.attributes.text;
		if (this.store)
			this.datas = null;
		this.refreshChart();
	},
	initComponent : function() {
		this.btn_field = new EasyJF.Ext.SmartCombox({
					name : "colorInput",
					hiddenName : "colorInput",
					fieldLabel : "colorInput",
					displayField : "title",
					valueField : "id",
					allowBlank : false,
					width : 100,
					// selectedClass:'x-combo-color-selected', //
					// icon.css
					store : new Ext.data.JsonStore({
								fields : ["id", "title"]
							}),
					editable : false,
					mode : 'local',
					triggerAction : 'all',
					emptyText : '请选择...'
				});
		this.btn_max = new Ext.form.NumberField({
					name : "max",
					xtype : "numberfield",
					width : 30
				});
		this.btn_orderType = new Ext.form.ComboBox(Ext.apply({}, {
					width : 80
				}, EasyJF.Ext.Util.buildCombox("type", "是否", [["由低到高", "ASC"],
								["由高到低", "DESC"]], "DESC", true)));
		this.btn_orderASC = new Ext.form.Radio({
					boxLabel : "由低到高",
					name : "orderTypes",
					handler : this.refreshChart,
					scope : this
				});
		this.btn_orderDESC = new Ext.form.Radio({
					boxLabel : "由高到低",
					name : "orderTypes",
					handler : this.refreshChart,
					scope : this
				});
		this.btn_bar = new Ext.form.Radio({
					boxLabel : "柱状图",
					cls : 'x-btn-text-icon',
					name : "types",
					handler : this.refreshChart,
					scope : this,
					checked : true
				});
		this.btn_pie = new Ext.form.Radio({
					boxLabel : "饼状图",
					cls : 'x-btn-text-icon',
					name : "types",
					handler : this.refreshChart,
					scope : this
				});
		this.btn_bar2d = new Ext.form.Radio({
					boxLabel : "柱状图2D",
					cls : 'x-btn-text-icon',
					name : "types",
					handler : this.refreshChart,
					scope : this
				});
		this.btn_pie2d = new Ext.form.Radio({
					boxLabel : "饼状图2D",
					cls : 'x-btn-text-icon',
					name : "types",
					handler : this.refreshChart,
					scope : this
				});
		this.btn_vdate1 = new Ext.form.DateField({
					format : "Y-m-d"
				});
		this.btn_vdate2 = new Ext.form.DateField({
					format : "Y-m-d"
				});
		Ext.apply(this, {
					width : Ext.getBody().getViewSize().width - 50,
					height : Ext.getBody().getViewSize().height - 20
				});

		ChartWindow.superclass.initComponent.call(this);
		this.leftTree = new Ext.tree.TreePanel({
					xtype : "treepanel",
					title : "分析项目",
					border : false,
					rootVisible : false,
					root : new Ext.tree.AsyncTreeNode({
								id : "root",
								text : "所有部门",
								expanded : true,
								children : [],
								loader : new Ext.tree.TreeLoader()
							}),
					listeners : {
						scope : this,
						click : this.clickDeptNode
					}
				});
		this.chartPanel = new Ext.Panel({
					html : "正在生成统计图..."
				});
		this.add({
					region : "west",
					width : 150,
					items : [this.leftTree]
				});
		this.add({
					region : "center",
					layout : "fit",
					items : this.chartPanel,
					tbar : ["最多分析数", this.btn_max, "排序方式:", this.btn_orderASC,
							this.btn_orderDESC, "-", "展示方式:", this.btn_bar,
							this.btn_pie, this.btn_bar2d, this.btn_pie2d,
							"    ", "-", {
								text : "开始分析",
								cls : 'x-btn-text-icon',
								handler : this.refreshChart,
								scope : this,
								icon : 'images/icons/application_side_expand.png'
							}]
				});
		this.on("show", this.loadChart, this);
	}
});
ChartWindow.showChart = function(config, callback) {
	if (!ChartWindow.win) {
		ChartWindow.win = new ChartWindow();
	}
	Ext.apply(ChartWindow.win, Ext.apply({
				store : null,// 数据项
				datas : null,// 直接把datas中的数据进行展示
				columnModel : null,// 表格模型
				url : "",// 远程数据加载url
				params : null,// 查询参数
				grid : null
					// 可以直接拿一个表格来进行分析
				}, config || {}));
	ChartWindow.win.show();
	if (callback)
		callback.call(ChartWindow.win);

};

/**
 * 显示查询结果预览窗口
 * 
 * @class SearchResultStatisticsWin
 * @extends Ext.Window
 */
SearchResultStatisticsWin = Ext.extend(Ext.Window, {
			title : "查询结果预览",
			width : 300,
			height : 300,
			layout : "fit",
			closeAction : "hide",
			initGrid : function() {
				var rs = [];
				if (this.data) {
					for (var name in this.data) {
						var o = {
							name : name,
							value : this.data[name]
						};
						rs.push(o);
					}
				}
				this.grid.store.removeAll();
				this.grid.store.loadData(rs);
				if (this.title)
					this.setTitle(this.title);
			},
			initComponent : function() {
				this.grid = new Ext.grid.GridPanel({
							viewConfig : {
								forceFit : true
							},
							store : new Ext.data.JsonStore({
										fields : ["name", "value"]
									}),
							cm : new Ext.grid.ColumnModel([{
										header : "项目名称",
										width : 100,
										sortable : false,
										dataIndex : 'name',
										id : 'name',
										menuDisabled : true
									}, {
										header : "值",
										width : 100,
										resizable : false,
										dataIndex : 'value',
										id : 'value',
										menuDisabled : true
									}])
						});
				SearchResultStatisticsWin.superclass.initComponent.call(this);
				this.on("show", this.initGrid, this);
				this.add(this.grid);
			}
		});

/**
 * 
 */
SearchResultStatisticsWin.showWin = function(config) {
	if (!SearchResultStatisticsWin.win) {
		SearchResultStatisticsWin.win = new SearchResultStatisticsWin();
	}
	Ext.apply(SearchResultStatisticsWin.win, config);
	SearchResultStatisticsWin.win.show();
	return SearchResultStatisticsWin.win;
};

/**
 * @class EasyJF.Ext.MainAppService
 * 
 * 主应用框架平台的支持业务类。该类提供了一个应用平台中平台层面的基本操作。<br/> 比如打开应用模块，延迟加载应用模块js，IFrame模式打开应用等。<br/>
 * 该业务类作为MainTabPanel和MainSinglePanel的业务支持类。
 */
EasyJF.Ext.MainAppService = {
	/**
	 * IFrame模式应用模块类缓存器。
	 */
	IFrameClass : {},
	/**
	 * 应用模块类缓存器。
	 */
	NormalClass : {},
	/**
	 * 得到应用平台是否是单Tab页模式。
	 * 
	 * @return {Boolean} ret是否是单Tab页模式。
	 */
	getSingleTabMode : function() {
		return window.Global.Config.singleTabMode;
	},
	/**
	 * 在Tab页中打开一个新的panel。如果该panel已经打开，则直接定位到该tab上。
	 * 
	 * @param {Object|String}
	 *            如果是object，则得到panel.id，如果是string，直接作为查询panel的id。
	 */
	openTab : function(panel, id) {
		var o = (typeof panel == "string" ? panel : id || panel.id);
		var tab = this.getComponent(o);
		if (tab) {
			this.setActiveTab(tab);
		} else if (typeof panel != "string") {
			if (!this.tabsCheck())
				return;
			panel.id = o;
			var p = this.add(panel);
			if (this.getSingleTabMode())
				this.closeAll(p);
			// if(this.items.getCount()>10)this.remove(1);
			this.setActiveTab(p);
		}
	},
	/**
	 * 检查打开的panel是否达到了设置的最大tabpanel个数。
	 * 
	 * @return {Boolean} ret 是否达到最大tabpanel个数
	 */
	tabsCheck : function() {
		if (this.items.getCount() > this.maxTabs) {
			Ext.Msg.alert("提示", "系统允许同时打开的面板数已经达到极限，请先关闭其它一打开的面板再重新进入");
			return false;
		}
		return true;
	},
	/**
	 * 在弹出窗口中打开一个panel。默认的弹出窗口大小是全屏。如果要规定弹出窗口的大小，可以在传入的panel中通过配置inWinConfig对象来设置。<br/>
	 * <ul>
	 * inWinConfig:
	 * <li>width:弹出窗口的宽度</li>
	 * <li>height:弹出窗口的高度</li>
	 * <li>modal:弹出窗口的模式</li>
	 * <li>title:弹出窗口的名称</li>
	 * </ul>
	 * 
	 * @param {Object}
	 *            panel 要在窗口中打开的panel实例
	 */
	openAppInWin : function(panel) {
		panel.elements = panel.elements.replace(",header", "");
		panel.inWinConfig = panel.inWinConfig || {};// window窗口附加配置 例如:
		// inWinConfig:{width:600,height:450}
		if (!this.appWin) {
			this.appWin = new Ext.Window(Ext.apply({
						width : Ext.getBody().dom.offsetWidth - 20,
						height : Ext.getBody().dom.offsetHeight - 20,
						closeAction : "hide",
						layout : "fit",
						modal : true,
						maximizable : true,
						title : panel.title,
						items : panel,
						listeners : {
							maximize : function(win) {
								win.doLayout();
							},
							restore : function(win) {
								win.doLayout();
							}
						}
					}, panel.inWinConfig));
			Ext.del(panel, 'inWinConfig');
		} else {
			this.appWin.remove(0);
			this.appWin.add(panel);
			this.appWin.setSize(panel.inWinConfig.width
							|| (Ext.getBody().dom.offsetWidth - 20),
					panel.inWinConfig.height
							|| (Ext.getBody().dom.offsetHeight - 20));
			this.appWin.doLayout();
			this.appWin.setTitle(panel.title);
		}
		this.appWin.show((typeof main != "undefined")
						&& Lanyo_Ajax.getCfg('enableAnimate')
						? Ext.getBody()
						: false, function(win) {
					win.center();
				});
	},
	/**
	 * 通过传入的菜单树节点，打开一个对应的模块页面。<br/> 其中包括模块js路径解析，模块js代码加载，解析，和根据应用设置打开模块界面的操作<br/>
	 * 
	 * @param {Object}
	 *            node 要打开的模块的菜单树节点，允许有多个配置参数。即在应用中可以通过构建符合样式的对象来打开指定的模块。
	 *            <ul>
	 *            可以配置的参数(都在节点的attributes属性对象中)
	 *            <li>package：模块js加载的包名</li>
	 *            <li>script：模块js的名称</li>
	 *            <li>appClass：模块js的类名</li>
	 *            <li>title：模块js加载的tabpanel名称或者窗口名称</li>
	 *            <li>node.text：模块js加载的tabpanel名称或者窗口名称</li>
	 *            <li>otherScripts：模块js加载需要的其他script</li>
	 *            <li>callback：模块js加载完成后调用的回调方法</li>
	 *            <li>inWin：是否在弹出窗口中打开模块</li>
	 *            <li>params：可以作为在加载js脚本时候的传入参数。可以用作国际化等动态脚本加载设置</li>
	 *            </ul>
	 */
	openExtAppNode : function(node, e) {
		// 使用树的package来代表所在的包,script代表公共脚本
		if ((!node.attributes.listeners || !node.attributes.listeners.click)
				&& node.attributes.appClass) {
			var pck = node.attributes['package']
					? node.attributes['package']
					: this['package'];
			if (!pck)
				pck = "";
			else
				pck.replace(".", "/");
			var script = (node.attributes.script
					? node.attributes.script
					: this.script);
			var appClass = node.attributes.appClass;
			if (!script)
				script = appClass + ".js";
			script = pck + "/" + script;
			/*
			 * var params=node.attributes.params;
			 * if(params)params=Ext.urlDecode(params);
			 */
			// alert(script);
			// alert(appClass);
			var title = node.attributes.title
					? node.attributes.title
					: node.text;
			if (Global.Config.iframe && !node.attributes.frameDisable) {
				main.openExtApp(appClass, script, title, null,
						node.attributes.otherScripts, node.attributes.callback,
						node.attributes.inWin, node.attributes.params);
			} else {
				main.openClassApp(appClass, script, title, appClass,
						node.attributes.otherScripts, node.attributes.callback,
						node.attributes.inWin, node.attributes.params);
			}
		}
	},
	/**
	 * 加载，解析，和根据应用设置打开模块界面的操作。该方法是在系统启用IFrame模式下面打开模块应用。
	 * 
	 * @param {String}
	 *            id 打开模块的id
	 * @param {String}
	 *            script 打开模块的script
	 * @param {String}
	 *            title 打开模块的弹出窗口或者tabpanel的名称
	 * @param {String}
	 *            appClass 打开模块的主类名称
	 * @param {String}
	 *            otherScripts 打开模块依赖的其他script文件路径，多个文件用逗号隔开
	 * @param {Function}
	 *            callback 打开模块之后的回调方法
	 * @param {Boolean}
	 *            inWin 是否在窗口中打开模块
	 * @param {String}
	 *            params 在加载js脚本时候的传入参数。可以用作国际化等动态脚本加载设置
	 */
	openExtApp : function(id, script, title, appClass, otherScripts, callback,
			inWin, params) {
		appClass = appClass || id;
		title = title || id;
		otherScripts = otherScripts || "";

		var tab = this.getComponent(id);
		if (tab) {
			this.setActiveTab(tab);
		} else {
			if (!this.tabsCheck())
				return;
			var theParameter = params || {};
			if (params && (typeof params == "string"))
				theParameter = Ext.urlDecode(params);
			if (!this.IFrameClass[appClass]) {
				eval("this.IFrameClass." + appClass
						+ "=Ext.extend(ExtAppBasePanel,{id:'" + id
						+ "',title:'" + title + "',appClass:'" + appClass
						+ "',script:'" + script + "',otherScripts:'"
						+ otherScripts + "',params:'"
						+ (Ext.encode(theParameter)) + "'});");
			}
			if (inWin) {// 在新窗口中打开应用
				this.openAppInWin(new this.IFrameClass[appClass]());
			} else {
				eval("var p = this.add(new this.IFrameClass." + appClass
						+ "());");
				p.on("destroy", new Function("delete IFrames." + appClass));
				if (this.getSingleTabMode())
					this.closeAll(p);
				this.setActiveTab(p);
				if (p)
					p.doLayout();
			}
		}
		if (callback)
			callback();
	},
	/**
	 * 加载，解析，和根据应用设置打开模块界面的操作。该方法是在系统启用OPOA模式下面打开模块应用。
	 * 
	 * @param {String}
	 *            id 打开模块的id
	 * @param {String}
	 *            script 打开模块的script
	 * @param {String}
	 *            title 打开模块的弹出窗口或者tabpanel的名称
	 * @param {String}
	 *            appClass 打开模块的主类名称
	 * @param {String}
	 *            otherScripts 打开模块依赖的其他script文件路径，多个文件用逗号隔开
	 * @param {Function}
	 *            callback 打开模块之后的回调方法
	 * @param {Boolean}
	 *            inWin 是否在窗口中打开模块
	 * @param {String}
	 *            params 在加载js脚本时候的传入参数。可以用作国际化等动态脚本加载设置
	 */
	openClassApp : function(id, script, title, appClass, otherScripts,
			callback, inWin, params) {
		appClass = appClass || id;
		title = title || id;
		var tab = this.getComponent(id);
		if (tab) {
			this.setActiveTab(tab);
			if (callback)
				callback();
		} else {
			if (!this.tabsCheck())
				return;
			var theParameter = params || {};
			if (params && (typeof params == "string"))
				theParameter = Ext.urlDecode(params);
			if (this.NormalClass[appClass]) {
				if (this.NormalClass[appClass].superclass.onWindowResize) {// 是窗口
					eval("var p = new this.NormalClass." + appClass
							+ "(theParameter)");
					p.show();
				} else {
					eval("var tempP = new "
							+ appClass
							+ "(theParameter);"
							+ "if(tempP.list && (typeof tempP.list=='function'))tempP=tempP.list();");
					if (inWin) {// 在窗口中打开应用
						var inWinConfig = tempP.inWinConfig || {};
						Ext.del(tempP, 'inWinConfig');
						this.openAppInWin(new this.NormalClass[appClass](Ext
								.apply({
											items : tempP
										}, {
											inWinConfig : inWinConfig
										})));
					} else {
						eval("var p = this.add(new this.NormalClass."
								+ appClass + "({items:tempP}));");
						// if(this.items.getCount()>10)this.remove(1);
						if (this.getSingleTabMode())
							this.closeAll(p);
						this.setActiveTab(p);
					}
				}
			} else {
				var successLoad = function(req) {
					eval(req.responseText);
					
					if(typeof(window[appClass])=="undefined")
					{
						//EasyJF.Ext.Msg.alert("加载["+title+"]模块失败，请与管理员联系!","错误提示");
						return;
					}
					
					if (eval(appClass + ".superclass.onWindowResize")) {
						eval("this.NormalClass." + appClass + "=" + appClass);
						eval("var p=new " + appClass + "(theParameter);");
						p.show();
					} else {
						eval("this.NormalClass."
								+ appClass
								+ "=Ext.extend(Ext.Panel,{id:'"
								+ id
								+ "',title:'"
								+ title
								+ "',border:false,layout:'fit',closable:true});");
						eval("var tempP = new "
								+ appClass
								+ "(theParameter);"
								+ "if(tempP.list && (typeof tempP.list=='function'))tempP=tempP.list();");
						if (inWin) {// 在窗口中打开应用
							var inWinConfig = tempP.inWinConfig || {};
							Ext.del(tempP, 'inWinConfig');
							this
									.openAppInWin(new this.NormalClass[appClass](Ext
											.apply({
														items : tempP
													}, {
														inWinConfig : inWinConfig
													})));
						} else {
							eval("var p = this.add(new this.NormalClass."
									+ appClass + "({items:tempP}));");
							// if(this.items.getCount()>10)this.remove(1);
							if (this.getSingleTabMode())
								this.closeAll(p);
							this.setActiveTab(p);
							if (p)
								p.doLayout();
						}
					}
				};
				if (otherScripts) {
					var s = otherScripts.split(";");
					var total = s.length, ld = 0;
					for (var i = 0; i < s.length; i++) {
						Ext.Ajax.request({
									url : s[i],
									success : function(req) {
										eval(req.responseText);
										ld++;
										if (ld >= total)
											Ext.Ajax.request({
														waitMsg : "正在加载程序，请稍候。。。",
														url : Lanyo_Ajax.script
																+ script,
														success : successLoad,
														scope : this
													});
									},
									scope : this
								});
					}
				} else {
					Ext.Ajax.request({
								waitMsg : "正在加载程序，请稍候。。。",
								url : Lanyo_Ajax.script + script,
								success : successLoad,
								scope : this
							});
				}
			}
			if (callback)
				callback();
		}
	},
	/**
	 * 关闭一个TabPanel
	 * 
	 * @param {Object}
	 *            panel 要关闭的panel
	 */
	closeTab : function(panel, id) {
		var o = (typeof panel == "string" ? panel : id || panel.id);
		var tab = this.getComponent(o);
		if (tab) {
			this.remove(tab);
		}
	},
	/**
	 * 关闭所有可以关闭的tabpanel<br/> 该方法用于完成关闭除了首页的tabpanel或者点击【关闭其他】
	 * 
	 * @param {Object}
	 *            excep 可以设置一个不关闭的panel。
	 */
	closeAll : function(excep) {
		this.items.each(function(p) {
					if (p.closable && p != excep)
						this.closeTab(p);
				}, this);
	},
	/**
	 * 保存用户个性化桌面protal设置<br/> portal中每一个portelet保存的格式为:<br/> id:每一个portal的id<br/>
	 * col:该portal所处的列<br/> row:该portal所处的行<br/>
	 * <ul>
	 * 所有用户个性化设置参数如下：
	 * <li>portalMode:portal的显示模式，调用Lanyo_Ajax.getCfg('portalMode')得到</li>
	 * <li>maxTabs:用户设置的最多开启tabpanel的个数，调用Lanyo_Ajax.getCfg('maxTabs')得到</li>
	 * <li>iframe:是否开启IFrame模式，调用Lanyo_Ajax.getCfg('iframe')得到</li>
	 * <li>singleTabMode:是否开启单Tab页显示模式，调用Lanyo_Ajax.getCfg('singleTabMode')得到</li>
	 * <li>enableAnimate:是否开启动画效果，调用Lanyo_Ajax.getCfg('enableAnimate')得到</li>
	 * <li>commonFunction:系统开启快捷菜单，调用Lanyo_Ajax.getCfg('commonFunction')得到</li>
	 * <li>style:系统皮肤，调用Lanyo_Ajax.getCfg('style')得到</li>
	 * <li>homePage:设置应用首页，调用Lanyo_Ajax.getCfg('homePage')得到</li>
	 * <li>lang:系统语言设置，调用Lanyo_Ajax.getCfg('lang')得到</li>
	 * <li>portals:portal设置，为一个字符串，每一个portal按照上面的格式拼成id:,col:,row:，如果有多个portal，则使用'@@'分隔</li>
	 * </ul>
	 * 该参数上传的地址为：Lanyo_Ajax.formatUrl（Lanyo_Ajax.PersonalityUrl,'savePersonality')
	 */
	savePersonality : function(callback, hideMsg) {
		var result = [];
		var s = "", colCfg = [];
		var portal = this.getComponent("homePage");
		if (portal && portal.items && portal.getXType() == "ux.portal") {
			var items = portal.items;
			for (var i = 0; i < items.getCount(); i++) {
				var c = items.get(i);
				var ps = "";
				for (var j = 0; j < c.items.getCount(); j++) {
					var it = c.items.get(j);
					ps = "id:" + it.getId() + ",col:" + i + ",row:" + j;
					colCfg.push({
								id : it.getId(),
								col : i,
								row : j
							});
					if (it.customizeUrl)
						ps += ",url:" + it.customizeUrl;
					if (it.customizeHtml)
						ps += ",html:" + it.customizeHtml;
					if (it.customizeUrl || it.customizeHtml) {
						ps += ",title:" + it.title;
					}
					s += ps + "@@";
				}
			}
		}
		var params = {
			portalMode : Lanyo_Ajax.getCfg('portalMode'),
			maxTabs : Lanyo_Ajax.getCfg('maxTabs'),
			iframe : Lanyo_Ajax.getCfg('iframe'),
			singleTabMode : Lanyo_Ajax.getCfg('singleTabMode'),
			enableAnimate : Lanyo_Ajax.getCfg('enableAnimate'),
			commonFunction : Lanyo_Ajax.getCfg('commonFunction'),
			style : Lanyo_Ajax.getCfg('style'),
			homePage : Lanyo_Ajax.getCfg('homePage'),
			lang : Lanyo_Ajax.getCfg('lang'),
			portals : s
		};
		if (Lanyo_Ajax.PersonalityUrl) {
			Ext.Ajax.request({
						url : Lanyo_Ajax.formatUrl(Lanyo_Ajax.PersonalityUrl,
								'savePersonality'),
						params : params,
						waitMsg : hideMsg ? "" : "正在保存数据,请稍候...",
						success : function(res) {
							Lanyo_Ajax.setCfg('portalConfig', colCfg);
							if (!hideMsg) {
								EasyJF.Ext.Msg.alert('您的个性化配置信息已经成功保存！', '提示',
										function() {
											if (callback)
												callback();
										}, this);
							} else {
								if (callback)
									callback();
							}
						}
					});
		}
		return result;
	},
	/**
	 * 清除所有portal
	 */
	cleanPortlet : function() {
		var portal = this.getComponent("homePage");
		if (portal && portal.items && portal.getXType() == "portal") {
			for (var i = 0; i < portal.items.getCount(); i++) {
				var ps = portal.items.get(i);
				ps.items.each(function(c) {
							ps.remove(c);
						});
			}
		}
	},
	/**
	 * 加载用户个性化桌面信息<br/>
	 * 加载的用户自定义信息从Lanyo_Ajax.formatUrl（Lanyo_Ajax.PersonalityUrl,'loadPersonality')得到。
	 */
	loadPersonality : function() {
		if (Lanyo_Ajax.PersonalityUrl) {
			Ext.Ajax.request({
						url : Lanyo_Ajax.formatUrl(Lanyo_Ajax.PersonalityUrl,
								'loadPersonality'),
						success : function(res) {
							this.cleanPortlet();
							var res = Ext.decode(res.responseText);
							if (res) {
								var config = {
									maxTabs : res.maxTabs,// 默认的最大Tab数
									singleTabMode : res.singleTabMode,// 单个Tab模式
									enableAnimate : res.enableAnimate,
									style : res.style,
									homeMenu : res.homePage,
									commonFunction : res.commonFunctions
								}
								res.commonFunction = res.commonFunctions;
								Ext.apply(this, config);

								for (var p in res) {
									if (Ext.isDefined(res[p])) {
										Lanyo_Ajax.setCfg(p, res[p]);
									}
								}

								if (Ext.isString(this.commonFunction)
										&& !Ext.isEmpty(this.commonFunction)) {
									this.commonFunction = this.commonFunction
											.split(/[,;\s]/);
									config.commonFunction = this.commonFunction;
								}
								this.fireEvent('loadSystemConfig', config);
							};
							var p = Ext.getCmp('homePage');

							if (p && p.getXType() == 'ux.portal') {
								p.updatePortalModeHandler();
							}
							/*
							 * var pcs = res.portalConfig; if (pcs && pcs.length >
							 * 0) { for (var i = 0;i < pcs.length; i++) { var
							 * info = pcs[i]; if (info.id) {
							 * this.addPortlet(info.col, info.row, info.id, { id :
							 * info.id, title : info.title, url : info.url, html :
							 * info.html }); } } }
							 */
						},
						scope : this
					});
		}
	},
	/**
	 * 还原个人自定义到系统默认设置。<br/> 处理还原的方法地址为：manage.ejf?cmd=resetPersonality
	 */
	resetPersonality : function() {
		Ext.Msg.confirm("提示", "是否真的要还原桌面设置?", function(btn) {
					if (btn == "yes") {
						Ext.Ajax.request({
									url : "manage.ejf?cmd=resetPersonality",
									success : function(res) {
										Ext.Msg.alert("提示", "成功还原默认桌面设置!",
												function() {
													this.loadPersonality();
												}, this);
									},
									scope : this
								});
					}
				});
	},
	/**
	 * 还原桌面设置 处理还原的方法地址为：manage.ejf?cmd=resetDesktop
	 */
	resetDesktop : function() {
		Ext.Msg.confirm("提示", "是否真的要还原桌面设置?", function(btn) {
					if (btn == "yes") {
						Ext.Ajax.request({
									url : "manage.ejf?cmd=resetDesktop",
									success : function(res) {
										Ext.Msg.alert("提示", "成功还原默认桌面设置!",
												function() {
													this.loadPersonality();
												}, this);
									},
									scope : this
								});
					}
				});
	},
	/*
	 * // private 在桌面中创建新的模块 createPortlet : function() { if (!this.portletWin) {
	 * this.portletWin = new PortletWin();
	 * this.portletWin.setHandler(this.addPortlet);
	 * this.portletWin.setScope(this); } this.portletWin.show(); },
	 */
	// private 往桌面中加入一个portlet
	addPortlet : function(col, row, id, config) {
		var portal = this.getComponent("homePage"), portlet;
		if (portal && portal.getXType() == "ux.portal") {
			var pms = Ext.getObjVal(Global, 'Portal.PanelMC');
			if (pms && pms.getCount()) {
				portlet = pms.key(id);
			}
		}

		/*
		 * if (portal && portal.getXType() == "portal") { var portlet;
		 * if(window.portlets){ for (var n in portlets) { if (n == id) portlet =
		 * portlets[n]; } } var tools = []; if (!portlet) {// 自定义portlet if
		 * (config.url && config.url.indexOf("AppClass:") == 0) { var appClass =
		 * config.url.substring("AppClass:".length); portlet = { id : id, tools :
		 * tools, title : config.title, layout : "fit", items : eval("new " +
		 * appClass), customizeUrl : config.url }; } else { portlet = { id : id,
		 * tools : tools, title : config.title, autoLoad : config.url,
		 * customizeUrl : config.url }; if (config.html) { portlet.html =
		 * config.html; portlet.customizeHtml = config.html } } portlets[n] =
		 * portlet; } portal.getComponent(col).insert(row, portlet);
		 * portal.doLayout(); if (this.portletWin) this.portletWin.hide(); }
		 */
	},
	/**
	 * 切换系统皮肤
	 * 
	 * @param {String}
	 *            value 皮肤名称
	 */
	changeSkin : function(value) {
		EasyJF.Ext.Util.applySkin(value);
	}
};

Ext.override(Ext.data.JsonWriter, {
			render : function(params, baseParams, data) {
				if (this.encode === true) {
					Ext.apply(params, baseParams);
					params[this.meta.root] = Ext.encode(data);
				} else {
					var jdata = Ext.apply({}, baseParams);
					if (Ext.isArray(data))
						data = Ext.obj2Arr(data);
					if (!Ext.isObject(data)) {
						data = {
							id : data
						};
					}
					Ext.apply(params, data, jdata);
				}
			}
		});
/*
 * Ext.Ajax.request({ url : 'test.ejf', jsonData:"{name : 'sss'}" });
 */

EasyJF.Ext.CrudRowEditorPanel = Ext.extend(Ext.Panel, {
	// private
	layout : 'fit',
	/**
	 * @cfg {String} defaultSortable grid 是否默认支持排序
	 */
	defaultSortable : true,
	/**
	 * @cfg {Array} storeMapping grid 的store对象的fields属性
	 */
	storeMapping : ['id'],
	/**
	 * grid的store配置,如果配置了gridStore直接用gridStore,如果没有配，组建通过配置来创建一个store cfg
	 * {Ext.data.Store} gridStore
	 */
	gridStore : null,
	gridStoreAutoLoad : true,
	gridStoreInitData : null,
	/**
	 * grid配置属性
	 * 
	 * @cfg {Object} gridConfig
	 */
	gridConfig : {},
	/**
	 * gridView配置属性
	 * 
	 * @cfg {Object} gridConfig
	 */
	gridViewConfig : {},
	/**
	 * grid的每页条数
	 * 
	 * @cfg {Number} gridPageSize
	 */
	gridPageSize : 20,
	/**
	 * 配置grid对应的action，本组建会通过baseUrl属性生成访问数据，删除数据，修改数据,查询数据的Url cfg {String}
	 * baseUrl
	 */
	baseUrl : '',

	cmdParamName : 'cmd',
	// private
	defaultsActions : {
		create : 'save',
		list : 'list',
		view : 'view',
		update : 'update',
		remove : 'remove'
	},
	defaultShowButtons : ['btn_add', 'btn_edit', 'btn_view', 'btn_remove',
			'btn_refresh', 'searchField'],
	/**
	 * 额外显示的按钮
	 */
	extraShowButtons : [],
	/**
	 * 禁用按钮
	 */
	disableShowButtons : ['btn_view'],
	// private
	getCmdName : function(cmd) {
		return this.defaultsActions[cmd];
	},
	/**
	 * 获取cmd的url地址 ,如要获取删除数据的url, this.getCmdUrl('remove');//
	 * this.baesUrl+'cmd=remove'; return {String}
	 */
	getCmdUrl : function(cmdName) {
		var cmd = {}, url;
		cmd[this.cmdParamName] = this.getCmdName(cmdName);
		url = Ext.urlAppend(this.baseUrl, Ext.urlEncode(cmd));
		return url;
	},
	clearSearch : function() {
		this.gridStore.baseParams = {};
		this.gridStore.load({
					params : {
						start : 0,
						pageSize : this.gridPageSize
					}
				});
	},
	crud_operators : [{
				itemId : 'btn_add',
				name : "btn_add",
				text : "添加(<u>A</u>)",
				iconCls : 'add',
				method : "create",
				cmd : "save",
				noneSelectRow : true,
				hidden : true
			}, {
				itemId : 'btn_edit',
				name : "btn_edit",
				text : "编辑(<u>E</u>)",
				iconCls : "edit",
				disabled : true,
				method : "edit",
				cmd : "update",
				hidden : true,
				singleRow : true
			}, {
				itemId : 'btn_view',
				name : "btn_view",
				text : "查看(<u>V</u>)",
				iconCls : "view",
				method : "view",
				disabled : true,
				hidden : true,
				singleRow : true
			}, {
				itemId : 'btn_remove',
				name : "btn_remove",
				text : "删除(<u>D</u>)",
				iconCls : "delete",
				disabled : false,
				method : "remove",
				cmd : "remove",
				hidden : true
			}, {
				itemId : 'btn_refresh',
				name : "btn_refresh",
				text : "刷新",
				iconCls : "refresh",
				method : "refresh",
				noneSelectRow : true
			}, {
				itemId : 'btn_advancedSearch',
				name : "btn_advancedSearch",
				text : "高级查询(<u>S</u>)",
				iconCls : "srsearch",
				method : "advancedSearch",
				cmd : "list",
				hidden : true,
				noneSelectRow : true,
				clientOperator : true
			}, {
				itemId : 'btn_clearSearch',
				name : "btn_clearSearch",
				text : "显示全部",
				cls : "x-btn-text-icon",
				iconCls : "search",
				noneSelectRow : true,
				method : "clearSearch",
				hidden : true
			}, {
				itemId : 'btn_print',
				name : "btn_print",
				text : "打印(<u>P</u>)",
				iconCls : "print-icon",
				disabled : true,
				method : "printRecord",
				hidden : true
			}, {
				itemId : 'btn_export',
				name : "btn_export",
				text : "导出Excel(<u>O</u>)",
				iconCls : 'export-icon',
				method : "exportExcel",
				noneSelectRow : true,
				hidden : true
			}, {
				itemId : 'btn_import',
				name : "btn_import",
				text : "导入数据(<u>I</u>)",
				iconCls : 'import-icon',
				method : "importExcel",
				noneSelectRow : true,
				hidden : true
			}, '->', {
				itemId : 'searchField',
				name : "searchField",
				type : "searchfield",
				width : 100,
				noneSelectRow : true,
				paramName : 'searchKey',
				clientOperator : true
			}],
	// private
	_getGridButtons : function() {
		if (!this.grid_CrudButtons) {
			this.grid_CrudButtons = this.crud_operators.concat([]);
		}
		var buttons = this.defaultShowButtons.concat(this.extraShowButtons);
		var gbuttons = [];
		Ext.each(this.grid_CrudButtons, function(gbtn) {
					var n = gbtn.name;
					if ((buttons.contains(n) && !this.disableShowButtons
							.contains(n))
							|| Ext.isString(gbtn)) {
						gbuttons.push(gbtn);
					}
				}, this);
		return gbuttons;
	},
	/*
	 * 获取权限验证信息
	 */
	// private
	_getCheckPermissionsInfo : function() {
		var args = {}, names = [], actions = [], cmds = [];
		var btns = this._getGridButtons();
		var baseUrl = this.baseUrl;
		Ext.each(btns, function(o) {
					if (typeof o != "string") {
						if (!o.clientOperator && (o.cmd || o.method)) {
							actions.push(o.action || baseUrl);
							cmds.push(o.cmd || o.method || "");
							names.push(o.name || o.id || "");
						}
					}
				});
		return {
			names : names,
			actions : actions,
			cmds : cmds
		};
	},
	useOperatorsPermission : function(args) {
		var ret = args || this.permissions;
		var args = [];
		for (var i = 0; i < ret.length; i++) {
			args.push(ret[i]);
			var o = this.operators.find(function(c) {
						var n1 = c.name || c.id;
						if (n1 == args[i])
							return true;
					});
			if (o)
				o.hidden = false;
		}
		this.showOperaterItem(args);
		this.fireEvent("usepermission", this);
	},
	buildCrudOperator : function() {
		// if (!this.operators) this.initOperator();

	},
	buildButtons : function() {
		var btns = this._getGridButtons(), buttons = [];
		var showBtns = this.defaultShowButtons;
		var bs = [];
		Ext.each(btns, function(c) {
					if (typeof c == "string") {
						bs.push(c);
					} else {
						if (!c.showInMenuOnly) {
							var co = this.operatorConfig2Component(c);
							var key = co.name || co.id;
							try {
								if (Ext.isString(co.type)) {
									this[key] = Ext.create(co, co.type);
								} else {
									this[key] = new Ext.Toolbar.Button(co);
								}
								bs.push(this[key]);
							} catch (e) {
								alert(key + ":" + e);
							}
						}
					}
				}, this);
		return bs;
	},
	buildGridStore : function() {
		var store = this.gridStore;
		if (!store) {
			store = new Ext.data.JsonStore({
						root : 'result',
						totalProperty : 'rowCount',
						pageSize : this.gridPageSize,
						url : this.getCmdUrl('list'),
						fields : this.storeMapping,
						restful : false,
						autoLoad : true,
						writer : new Ext.data.JsonWriter({
									encode : false
								}),
						proxy : new Ext.data.HttpProxy({
									api : {
										update : this.getCmdUrl('update'),
										create : this.getCmdUrl('create'),
										destroy : this.getCmdUrl('remove'),
										read : this.getCmdUrl('list')
									}
								})
					});
			if (this.gridStoreInitData) {
				store.loadData(this.gridStoreInitData);
			} else if (this.gridStoreAutoLoad) {
				store.load();
			}
		}
		return store;
	},
	buildGridCm : function() {
		var cm;
		if (Ext.isArray(this.columns)) {
			cm = new Ext.grid.ColumnModel({
						defaultSortable : this.defaultSortable,
						columns : this.columns
					});
		}
		return cm;
	},
	onBeforeRowEditor : function() {
		return this.permissions.contains('btn_edit');
	},
	buildGrid : function() {
		this.rowEditor = new Ext.ux.grid.RowEditor({
					saveText : 'Update',
					errorSummary : false,
					listeners : {
						scope : this,
						beforeedit : this.onBeforeRowEditor
					}
				});

		this.gridCm = this.buildGridCm();
		var viewConfig = {
			forceFit : true
		};

		var vcf = Ext.apply(viewConfig, this.gridViewConfig);

		var gcf = Ext.apply({
					store : this.gridStore,
					border : false,
					cm : this.gridCm,
					sm : this.gridSm,
					bbar : new EasyJF.Ext.PagingComBo({
								displayInfo : true,
								rowComboSelect : true,
								store : this.gridStore,
								pageSize : this.gridPageSize
							})
				}, this.gridConfig);

		if (!gcf.viewConfig) {
			gcf.viewConfig = {};
		}
		Ext.apply(gcf.viewConfig, vcf);
		gcf.plugins = gcf.plugins || [];
		gcf.plugins.push(this.rowEditor); // 添加grid插件
		var grid = new Ext.grid.GridPanel(gcf);
		return grid;
	},
	/**
	 * 根据一个查询方法来找到在业务列表面板工具栏（toptoolbar)中的符合条件的工具栏组件。
	 * 
	 * @param {Function}
	 *            callback 传入的查询方法。
	 *            <ul>
	 *            该方法传入的参数：
	 *            <li>{Component} 业务列表面板工具栏（toptoolbar)中的每一个按钮组件</li>
	 *            </ul>
	 * 
	 * @return {Array} finds 找到的符合条件的工具栏组件
	 */
	findOperatorBy : function(callback) {
		var objs = [];
		this.operators.each(function(o) {
					if (typeof o != "string") {
						if (callback && callback(o))
							objs.push(o);
					}
				});
		return objs;
	},
	/**
	 * 根据工具栏组件的属性找到业务列表面板工具栏（toptoolbar)中的符合条件的工具栏组件。
	 * 
	 * @param {String}
	 *            name 要匹配的属性名称。
	 * @parma {Object} value 要匹配的属性的值。
	 * @return {Array} finds 找到的符合条件的工具栏组件
	 */
	findOperatorByProperty : function(name, value) {
		return this.findOperatorBy(function(o) {
					if (o[name] == value)
						return true;
				});
	},
	// private
	toggleSingleRowOperator : function(enable) {
		var ids = this.findOperatorByProperty("singleRow", true);
		var args = [];
		if (ids && ids.length) {
			for (var i = 0; i < ids.length; i++)
				args.push(ids[i].name || ids[i].id);
		}
		this[(enable ? 'enable' : 'disable') + 'OperaterItem'](args);
	},
	/**
	 * 让一系列的右键菜单项变成可用状态
	 * 
	 * @param {Array}
	 *            args 要设置为可用状态的右键菜单项的名称或者id。
	 */
	enableOperaterItem : function() {
		var args = Ext.args();
		this.getTopToolbar().enables(args);
	},
	/**
	 * 让一系列的右键菜单项变成禁用状态
	 * 
	 * @param {Array}
	 *            args 要设置为禁用状态的右键菜单项的名称或者id。
	 */
	disableOperaterItem : function() {
		var args = Ext.args();
		this.getTopToolbar().disables(args);
	},
	/**
	 * 让一系列的右键菜单项变成可见状态
	 * 
	 * @param {Array}
	 *            args 要设置为可见状态的右键菜单项的名称或者id。
	 */
	showOperaterItem : function() {
		var args = Ext.args();
		this.getTopToolbar().shows(args);
	},
	/**
	 * 让一系列的右键菜单项变成隐藏状态
	 * 
	 * @param {Array}
	 *            args 要设置为隐藏状态的右键菜单项的名称或者id。
	 */
	hideOperaterItem : function() {
		var args = Ext.args();
		this.getTopToolbar().hides(args);
	},
	// private
	/*
	 * 处理grid行选择改变时候触发
	 */
	onGridRowSelectionChang : function(g, index, r) {
		var sel = this.grid.getSelections();
		this.toggleSingleRowOperator(!(sel && sel.length > 1));
		var ids = this.findOperatorByProperty("batch", true);// 打开支持批量操作的按钮
		var args = [];
		if (ids && ids.length) {
			for (var i = 0; i < ids.length; i++)
				args.push(ids[i].name || ids[i].id);
		}
		this.enableOperaterItem(args);
	},
	// private
	operatorConfig2Component : function(o, isMenu) {
		var co = Ext.apply({}, o);
		if (!co.handler) {
			if (co.method && this[co.method]) {
				co.handler = this[co.method];
			}
		}
		if (co.handler && !co.scope)
			co.scope = this;
		if (!isMenu) {// 对按钮的样式作处理
			if (this.operatorButtonStyle == 2) {
				if (co.icon) {
					co.cls = "x-btn-icon";
					co.text = "";
				}
			} else if (this.operatorButtonStyle == 3) {
				co.icon = "";
				co.cls = "";
			}
		}
		var key = co.name || co.id;
		if (key == "searchField") {
			co.store = this.gridStore;
		} else if (key == "btn_advancedSearch") {
			co.hidden = !((this.searchFormPanel || this.searchFP) && this.allowSearch);
		}
		return co;
	},
	loadOperatorsPermission : function() {
		if (!this.permissions) {
			var objs = this._getCheckPermissionsInfo();
			if (Lanyo_Ajax.permissionCheck) {
				Ext.Ajax.request({
					url : (Lanyo_Ajax.permissionCheckAction || "permissionCheck.ejf"),
					params : objs,
					callback : function(options, success, response) {
						var ret = Ext.decode(response.responseText);
						if (ret && ret.permissions && ret.permissions.length) {// 处理权限
							this.permissions = ret.permissions;
							this.useOperatorsPermission();
						}
						if (ret && ret.queryObjects) {
							this.addQueryObjectOperator(ret.queryObjects);
						}
					},
					scope : this
				});
			} else {
				this.permissions = ["btn_add", "btn_edit", "btn_view",
						"btn_remove", "btn_refresh"];
				this.useOperatorsPermission();
			}
		} else {
			this.useOperatorsPermission();
		}
	},
	initCrudRowEditorEvents : function() {
		var g = this.grid, sm = g.getSelectionModel();;
		sm.on('rowselect', this.onGridRowSelectionChang, this, {
					buffer : 200
				});
		/*
		 * g.on({ scope : this ,
		 * 
		 * });
		 */
	},
	// private
	create : function() {
		var data = new this.gridStore.recordType({});
		this.rowEditor.stopEditing();
		this.gridStore.insert(0, data);
		this.rowEditor.startEditing(0);
	},
	// private
	/*
	 * 编辑
	 */
	edit : function() {
		var rowIndex = this.getSingleRow();
		this.rowEditor.startEditing(rowIndex, false);
		this.rowEditor.doFocus.defer(this.rowEditor.focusDelay, this, []);
	},
	// private
	/*
	 * 查看
	 */
	view : function() {
		var rowIndex = this.getSingleRow();
	},
	// private 删除
	remove : function() {
		var rowIndex = this.getSingleRow();
		this.gridStore.remove(this.gridStore.getAt(rowIndex));
	},
	// private 刷新
	refresh : function() {
		this.grid.getStore().reload();
	},
	// private
	getSingleRow : function() {
		var g = this.grid, s = g.getStore();
		var records = g.getSelections();
		if (records && records.length) {
			var rowIndex = s.indexOf(records[0]);
		}
		return rowIndex;
	},
	beforeDestroy : function() {
		if (this.rowEditor) {
			Ext.destroy(this.rowEditor);
			delete this.rowEditor;
		}
	},
	initComponent : function() {
		this.gridStore = this.buildGridStore();
		var gridTbars = this.buildButtons();
		this.operators = new Ext.util.MixedCollection(false, function(o) {
					return o.id || o.name
				});
		this.operators.addAll(gridTbars);

		this.tbar = gridTbars;
		this.grid = this.buildGrid();
		this.items = [this.grid];
		this.initCrudRowEditorEvents();
		this.loadOperatorsPermission();
		EasyJF.Ext.CrudRowEditorPanel.superclass.initComponent.call(this);
	}
});
/**
 * @class EasyJF.Ext.MainTabPanel
 * @extend Ext.TabPanel
 * 
 * 基于TabPanel的应用程序主框架
 * 
 * <pre>
 * <code>
 * //使用示例
 * MainPanel = function() {
 * 	var homePage = Lanyo_Ajax.getCfg('homePage');
 * 	var homeCfg = {
 * 		id : 'homePage',
 * 		title : '首 页',
 * 		xtype : 'panel',
 * 		border : false,
 * 		tabFixed : true,
 * 		closable : false,
 * 		allowDrag : false
 * 	}
 * 	if (homePage == 'menu') {
 * 		Ext.apply(homeCfg, {
 * 					xtype : 'ux.portal'
 * 				});
 * 	} else {
 * 		Ext.apply(homeCfg, {
 * 					html : {
 * 						tag : 'div',
 * 						style : 'text-align:center;',
 * 						cn : [{
 * 									tag : 'h1',
 * 									html : '我是自定义首页'
 * 								}]
 * 					}
 * 				});
 * 	}
 * 	MainPanel.superclass.constructor.call(this, {
 * 				id : 'main',
 * 				region : 'center',
 * 				margins : '0 2 0 0',
 * 				layoutOnTabChange : true,
 * 				plugins : [new EasyJF.Ext.TabPanelPlugin],
 * 				border : false,
 * 				items : homeCfg
 * 			});
 * 	this.on(&quot;render&quot;, this.loadPersonality, this);
 * };
 * Ext.extend(MainPanel, EasyJF.Ext[&quot;MainTabPanel&quot;]);
 * </code>
 * </pre>
 */
EasyJF.Ext.MainTabPanel = Ext.extend(Ext.TabPanel, {
			/**
			 * @cfg {Boolean} singleTabMode 系统默认tab模式为多tab模式
			 */
			singleTabMode : false,
			/**
			 * @cfg {Boolean} iframe 系统默认IFrame模式为OPOA模式
			 */
			iframe : false,
			/**
			 * @cfg {Boolean} enableAnimate 系统默认关闭动画效果
			 */
			enableAnimate : false,
			/**
			 * @cfg {Boolean} resizeTabs 让tabpanel头的宽度自动适应模块title宽度
			 */
			resizeTabs : true,
			/**
			 * @cfg {Integer} minTabWidth 最小的tab头宽度：65
			 */
			minTabWidth : 65,
			tabWidth : 120,
			enableTabScroll : true,
			activeTab : 0,
			/**
			 * @cfg {Integer} maxTabs 最多打开tab个数：10
			 */
			maxTabs : 10,// 默认的最大Tab数
			initComponent : function() {
				EasyJF.Ext.MainTabPanel.superclass.initComponent.call(this);
			}
		});
Ext.apply(EasyJF.Ext.MainTabPanel.prototype, {}, EasyJF.Ext.MainAppService);

/**
 * 基于Panel的应用程序主框架
 * 
 * @class EasyJF.Ext.MainSinglePanel
 * @extends Ext.Panel
 */
EasyJF.Ext.MainSinglePanel = Ext.extend(Ext.Panel, {
			/**
			 * @cfg {Boolean} iframe 系统默认IFrame模式为OPOA模式
			 */
			iframe : false,
			/**
			 * @cfg {Integer} maxTabs 最多打开tab个数：10
			 */
			maxTabs : 10,// 默认的最大Tab数
			/**
			 * @cfg {Boolean} singleTabMode 系统默认tab模式为单tab模式
			 */
			singleTabMode : true,// 单个Tab模式
			/**
			 * @cfg {Boolean} enableAnimate 系统默认开启动画效果
			 */
			enableAnimate : true,
			layout : "fit",
			homeMenu : "menu",// 主页菜单
			theStyle : "ext-all",
			setActiveTab : function(p) {// 模拟TabPanel中的相应方法
				p.show();
				p.ownerCt.doLayout();
			},
			getActiveTab : function() {// 模拟TabPanel中的相应方法
				return this.getComponent(0);
			},
			getSingleTabMode : function() {
				return true;
			},
			closeAll : function(excep) {
				this.items.each(function(p) {
							if (p != excep)
								this.closeTab(p);
						}, this);
			},
			initComponent : function() {
				EasyJF.Ext.MainSinglePanel.superclass.initComponent.call(this);
			}
		});
Ext.apply(EasyJF.Ext.MainSinglePanel.prototype, {}, EasyJF.Ext.MainAppService);

Ext.namespace("Ext.ux.plugins");
/**
 * 扩展列表分页组件，支持显示条数，分页条数，总页数，选择跳转页面。
 * 
 * @class EasyJF.Ext.PagingComBo
 * @extends Ext.PagingToolbar
 */
EasyJF.Ext.PagingComBo = Ext.extend(Ext.PagingToolbar, {
	displayMsg : "第{0}-{1}条&nbsp;&nbsp;共{2}条&nbsp;&nbsp;&nbsp;&nbsp;共{3}页",
	style : 'font-weight:900',
	rowComboSelect : true,
	displayInfo : true,
	doLoad : function(start) {
		var o = {}, pn = this.getParams() || {};
		o[pn.start] = start;
		o[pn.limit] = this.pageSize;
		if (this.store.baseParams && this.store.baseParams[pn.limit])
			this.store.baseParams[pn.limit] = this.pageSize;
		if (this.fireEvent('beforechange', this, o) !== false) {
			this.store.load({
						params : o
					});
		}
	},
	onPagingSelect : function(combo, record, index) {
		var d = this.getPageData(), pageNum;
		pageNum = this.readPage(d);
		if (pageNum !== false) {
			pageNum = Math.min(Math.max(1, record.data.pageIndex), d.pages) - 1;
			this.doLoad(pageNum * this.pageSize);
		}
	},
	readPage : Ext.emptyFn,
	onLoad : function(store, r, o) {
		var d = this.getPageData(), ap = d.activePage, ps = d.pages;
		this.combo.store.removeAll();
		if (ps == 0) {
			this.combo.store.add(new Ext.data.Record({
						pageIndex : 1
					}));
			this.combo.setValue(1);
		} else {
			for (var i = 0; i < ps; i++) {
				this.combo.store.add(new Ext.data.Record({
							pageIndex : i + 1
						}));
			}
			this.combo.setValue(ap);
		}
		if (this.rowComboSelect)
			this.rowcombo.setValue(this.pageSize);
		EasyJF.Ext.PagingComBo.superclass.onLoad.apply(this, arguments);
	},
	updateInfo : function() {
		if (this.displayItem) {
			var count = this.store.getCount();
			var activePage = this.getPageData().activePage;
			var msg = count == 0 ? this.emptyMsg : String.format(
					this.displayMsg, this.cursor + 1, this.cursor + count,
					this.store.getTotalCount(), Math.ceil(this.store
							.getTotalCount()
							/ this.pageSize), activePage);
			this.displayItem.setText(msg);
		}
	},
	// 选择每页多少条数据
	onComboPageSize : function(combo, record, index) {
		var pageSize = record.get('pageSize');
		this.store.pageSize = this.pageSize = pageSize;
		var d = this.getPageData(), pageNum;
		pageNum = this.readPage(d);
		if (pageNum !== false) {
			pageNum = Math.min(Math.max(1, record.data.pageIndex), d.pages) - 1;
			this.doLoad(0);
		}
	},
	initComponent : function() {
		if (Ext.getObjVal(this.store, 'pageSize')) {
			this.pageSize = Ext.getObjVal(this.store, 'pageSize');
		}
		this.combo = Ext.ComponentMgr.create(Ext.applyIf(this.combo || {}, {
					value : 1,
					width : 50,
					store : new Ext.data.SimpleStore({
								fields : ['pageIndex'],
								data : [[1]]
							}),
					mode : 'local',
					xtype : 'combo',
					minListWidth : 50,
					allowBlank : false,
					triggerAction : 'all',
					displayField : 'pageIndex',
					allowDecimals : false,
					allowNegative : false,
					enableKeyEvents : true,
					selectOnFocus : true,
					submitValue : false
				}));
		this.combo.on("select", this.onPagingSelect, this);
		this.combo.on('specialkey', function() {
					this.combo.setValue(this.combo.getValue());
				}, this);

		var T = Ext.Toolbar;

		var pagingItems = [];

		if (this.displayInfo) {
			pagingItems.push(this.displayItem = new T.TextItem({}));
		}

		if (this.rowComboSelect) {
			var data = this.rowComboData ? this.rowComboData : [[10], [20],
					[30], [50], [80], [100], [150], [200]];
			this.rowcombo = this.rowcombo || Ext.create({
						store : new Ext.data.SimpleStore({
									fields : ['pageSize'],
									data : data
								}),
						value : this.pageSize,
						width : 50,
						mode : 'local',
						xtype : 'combo',
						allowBlank : false,
						minListWidth : 50,
						displayField : 'pageSize',
						triggerAction : 'all'
					});
			pagingItems.push(this.rowcombo, "条/页&nbsp;&nbsp;");

			this.rowcombo.on("select", this.onComboPageSize, this);
			this.rowcombo.on('specialkey', function() {
						this.combo.setValue(this.combo.getValue());
					}, this);
		}

		// this.totalPage = new T.TextItem({})
		pagingItems.push('->', this.first = new T.Button({
							tooltip : this.firstText,
							overflowText : this.firstText,
							iconCls : 'x-tbar-page-first',
							disabled : true,
							handler : this.moveFirst,
							scope : this
						}), this.prev = new T.Button({
							tooltip : this.prevText,
							overflowText : this.prevText,
							iconCls : 'x-tbar-page-prev',
							disabled : true,
							handler : this.movePrevious,
							scope : this
						}), '-', this.beforePageText,
				this.inputItem = this.combo,
				this.afterTextItem = new T.TextItem({
							text : String.format(this.afterPageText, 1)
						}), '-', this.next = new T.Button({
							tooltip : this.nextText,
							overflowText : this.nextText,
							iconCls : 'x-tbar-page-next',
							disabled : true,
							handler : this.moveNext,
							scope : this
						}), this.last = new T.Button({
							tooltip : this.lastText,
							overflowText : this.lastText,
							iconCls : 'x-tbar-page-last',
							disabled : true,
							handler : this.moveLast,
							scope : this
						}), '-', this.refresh = new T.Button({
							tooltip : this.refreshText,
							overflowText : this.refreshText,
							iconCls : 'x-tbar-loading',
							handler : this.doRefresh,
							scope : this
						}));

		var userItems = this.items || this.buttons || [];
		if (this.prependButtons===true) {
			this.items = userItems.concat(pagingItems);
		}else if(Ext.isNumber(this.prependButtons)){
			pagingItems.splice.apply(pagingItems,[this.prependButtons,0].concat(userItems));
			this.items = pagingItems;
		}else{
			this.items = pagingItems.concat(userItems);
		}
		delete this.buttons;
		Ext.PagingToolbar.superclass.initComponent.call(this);
		this.addEvents('change', 'beforechange');
		this.on('afterlayout', this.onFirstLayout, this, {
					single : true
				});
		this.cursor = 0;
		this.bindStore(this.store, true);
	}
});
Ext.ux.PagingComBo = EasyJF.Ext.PagingComBo;
Ext.reg("pagingComBo", Ext.ux.PagingComBo);

Ext.grid.ObjectColumn = Ext.extend(Ext.grid.Column, {
			field : '',
			emptyText : '',
			constructor : function(cfg) {
				Ext.grid.ObjectColumn.superclass.constructor.call(this, cfg);
				var et = this.emptyText, f = this.field;
				this.renderer = function(v) {
					if (v) {
						if (!Ext.isArray(f)) {
							return Ext.value(Ext.getObjVal(v, f), et);
						} else {
							for (var i = 0; i < f.length; i++) {
								if (v.hasOwnProperty(f[i])) {
									return Ext.value(v[f[i]], et);
								}
							}
						}
					}
					return et;
				}
			}
		});
Ext.grid.Column.types['objectcolumn'] = Ext.grid.ObjectColumn;

/**
 * 给所有的表单项默认绑定EasyJF.Ext.HelpIconPlugin
 */
Ext.apply(Ext.form.Field.prototype, {
			plugins : new EasyJF.Ext.HelpIconPlugin()
		});
/**
 * 统一配置异步请求响应。
 */
Ext.Ajax.on("beforerequest", function(conn, options) {
			if (options.waitMsg) {
				Ext.Msg.wait(options.waitMsg, options.waitTitle || '请稍候...');
			}
		})
/**
 * 如果配置了权限检查，这里统一处理权限当权限不够的情况下的响应方法。
 */
Ext.Ajax.on("requestcomplete", function(conn, response, options) {
			if (response && response.getResponseHeader
					&& response.getResponseHeader("LoginRequired")) {
				EasyJF.Ext.Msg.alert("对不起，您还没有登录或者登录超时，请重新登录！","提示",
					function(){
						if(!EasyJF.Ext.LoginWin){
							var win = window.top ? window.top : window;
							if (win.relogin && !EasyJF.Ext.isLogin){
                                EasyJF.Ext.isLogin=true;
                                win.relogin();
                            }else if(!win.relogin){
                            	win.location.href = "";
                            }
						}else if(!EasyJF.Ext.isLogin){
                            EasyJF.Ext.isLogin=true;
							var loginWin = new EasyJF.Ext.LoginWin();
							loginWin.show();
						}
				});
				return;
			}
			if (response && response.getResponseHeader
					&& response.getResponseHeader("Unauthorized")) {
				EasyJF.Ext.Msg.alert("你没有该项操作的权限，请与管理员联系！","警告");
				return;
			}
			if (options.waitMsg) {
				Ext.MessageBox.updateProgress(1);
				Ext.MessageBox.hide();
			}
		});
/**
 * 注册全局的异步请求错误提示。 默认没有实现国际化等。可以通过覆盖该方法来自定义不同的错误提示和处理方法。<br/>
 * <ul>
 * <li>0|12002|12029|12030|12031|12152|13030:提示【您的网络连接发生中断】</li>
 * <li>403:提示【您没有操作的权限，请与管理员联系】</li>
 * <li>其他:提示【发生了其它通讯异常，异常状态编码为+code】</li>
 * </ul>
 */
Ext.Ajax.on("requestexception", function(conn, response, options) {

			var code = response.status || 0;
			var Msg = EasyJF.Ext.Msg;
			switch (code) {
				case 0 :
				case 12002 :
				case 12029 :
				case 12030 :
				case 12031 :
				case 12152 :
				case 13030 :
					Msg.error("您的网络连接发生中断!", "通讯异常!", "警告");
					return false;
					break;
				case -1 :
					// Ext.Msg.alert("通讯超时!","请求已经被自动取消!");
					return false;
					break;
				case 403 :
					EasyJF.Ext.Msg.alert("您没有操作的权限，请与管理员联系!" + code, "警告!");
					return false;
					break;
				default :
					if (code < 200 || code >= 300) {
						var data = Ext.decode(response.responseText);
						var errMsg = "发生了其它通讯异常，异常状态编码为" + code + "警告!"; 
						if(Ext.getObjVal(data,'err')){
							errMsg = Ext.getObjVal(data,'err');
						}
						EasyJF.Ext.Msg.error(errMsg);
						return false;
					}
			}
			return true;
		});

/**
 * 屏蔽退格键
 */
new Ext.KeyMap(document.documentElement, [{
					key : Ext.EventObject.BACKSPACE,
					fn : function(key, e) {
						var regExp = /(?:INPUT|TEXTAREA)/;
						if (!regExp.test(e.getTarget().nodeName)) {
							e.stopEvent();
						}
					}
				}]);
// 简写
Ejf.Ext = EasyJF.Ext;