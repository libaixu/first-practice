/*
  Date:20170525
  website:网站首页边导航
  author:li
*/
// 构造器
function SubNavModule( config ){
	for( var i in config ){
		this[i] = config[i];
	}
	this.init();
}

// 原型
SubNavModule.prototype = {
	init:function(){
		var _self = this;
		_self.getAjax();
	},
	// 获取数据
	getAjax:function(){
		var _self = this;
		getAjaxJsonp( APILIST.subNavApi,function(d){
            var _d = d.productList;
            var _length = _d.length;
		    _self.createLi( _d, _length );
		});
	},
	// 添加dom
	createLi:function( _d, _length ){
		var _self = this;
		for( var i=0; i< _length ; i++ ){
			$('<li/>',{}).html(function(){
			    var _selfFor = $(this);
				$('<p/>',{})
				    .html( _d[i].type )
				    .appendTo( _selfFor );

				$('<div/>',{
					'class' : 'popMenu'
				}).html(function(){
					var _products = _d[i].products;
					for( var j=0; j< _products.length; j++ ){
						$('<p/>',{})
						    .html( _products[j].name )
						    .on('click',function(){
                                _self.eventFn( $(this) );
						    })
						    .appendTo( $(this) );
					}
				}).appendTo( _selfFor );
			}).appendTo( _self.subNavId );
		}
	},
	// 点击事件
	eventFn:function( _this ){
		var _self = this;
        console.log( _this.html() );
	}
}