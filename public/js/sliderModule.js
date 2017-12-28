/*
  Date:20170525
  website:网站首页轮播
  author:li
*/
// 构造器
function SliderModule( _config ){
    for( var i in _config ){
    	this[i] = _config[i]
    }
	// this.toLeftBtn = $('#toLeftBtn');
	// this.imgDivId = $('#imgDivId');
	// this.toRightBtn = $('#toRightBtn');
	// this.iconListId = $('#iconListId');
	// this.olbgId = $('#olbgId');

	this.tempI = 0;
	this.init();
}

SliderModule.prototype = {
	init:function(){
		var _self = this;
		_self.createSliderImg();
	},
	// 获取图片宽度  弃用
	/*imgW:function(){
		var _self = this;
		var _imgW = _self.imgDivId.find('img').eq(0).width();
		return _imgW;
	},*/
	// 获取图片数量  弃用
	/*imgNum:function(){
		var _self = this;
		var _imgNum = _self.imgDivId.find('img').length;
		return (_imgNum - 1);
	},*/
	// 生成首页轮播图片
	createSliderImg:function(){
		var _self = this;
		getAjax( APILIST.imgJson,function(d){
			var _length = d.imgs.length;
			var _imgDivId = $('#imgDivId');

			for( var i=0; i< _length ; i++){
					$('<li/>',{}).html(function(){
						$('<a/>')
							.html(function(){
					    		$('<img/>',{})
					    		    .attr('src', d.imgs[i].url )
					    		    .appendTo( $(this) )
								
							})
							.attr( 'href', '#' )
							.appendTo( $(this) );
			    	}).appendTo( _imgDivId );
			}
			// 获取图片宽度 数量
			_self.getImgProp();
			// 获取图片宽度
			// _self.imgW();
			// 获取图片数量
			// _self.imgNum();
			// 左边按钮
            _self.toLeftBtnEvent();
            // 右边按钮
            _self.toRightBtnEvent();
            // 创建轮播图下方小红点
            _self.createRedLi( _length );
            // 轮播图自动滚动
            // _self.autoRoll(); 
		});
	},
	// 获取图片宽度 数量
	getImgProp:function(){
		var _self = this;
		var _imgs = _self.imgDivId.find('img');

		var temObj = {}
		temObj['w'] = _imgs.eq(0).width();
		temObj['n'] = ( _imgs.length - 1 );
		return temObj;
	},
	// 右边按钮
	toRightBtnEvent:function(){
		var _self = this;
		_self.toRightBtn.on('click',function(){
			if( _self.tempI < _self.getImgProp().n ){
				_self.tempI++;
			} else {
				_self.tempI = 0;
			}
			_self.ulLftStyle( _self.imgDivId, _self.tempI, _self.getImgProp().w );
			_self.sliderChildren( _self.tempI );
		});
	},
	// 左边按钮
	toLeftBtnEvent:function(){
		var _self = this;
		_self.toLeftBtn.on('click',function(){
			if( _self.tempI > 0 ){
				_self.tempI--;
			} else {
				_self.tempI = _self.getImgProp().n;
			}
			_self.ulLftStyle( _self.imgDivId, _self.tempI, _self.getImgProp().w );
			_self.sliderChildren( _self.tempI );
		});
	},
	// 小圆点ul容器left值
	ulLftStyle:function( imgDivId, tempI, imgW ){
		var _self = this;
		imgDivId.stop().animate({
			left : '-' + ( tempI * imgW )
		},500);
	},
	// 生成轮播图下方小圆点
	createRedLi:function( _length ){
		var _self = this;
		for( var i=0; i< _length; i++ ){
			$('<li/>',{})
			    .appendTo( _self.iconListId );
		}
		// 首个小点为红色
		_self.iconListId.children().eq(0).attr( 'class','sel' );
		// 小圆点宽度
		var _iconW = _self.iconListId.children().eq(0).width();
		// 小圆点容器宽度
		var _iconWrapWidth = (_iconW + 15) * _length;
		// 居中显示
		_self.iconListId.css({
			'width' : _iconWrapWidth,
			'margin-left' : '-' + _iconWrapWidth/2 + 'px'
		});
		_self.olbgId.css({
			'width' : _iconWrapWidth,
			'margin-left' : '-' + _iconWrapWidth/2 + 'px'
		});

        // 点击轮播图小圆点
        _self.listClick();
	},
	// 点击轮播图小圆点
	listClick:function(){
		var _self = this;
		var _liseClick = _self.iconListId.children();
        _liseClick.on('click',function(){
        	var _this = $(this);
        	_this.attr( 'class','sel' ).siblings().removeAttr('class');
        	_self.tempI = _this.index();
        	_self.ulLftStyle( _self.imgDivId, _self.tempI, _self.getImgProp().w );
        });
    },
	// 决定第几个小圆点变红
	sliderChildren:function( m ){
		var _self = this;
		var _icons = _self.iconListId.children();
		_icons.eq(m).attr('class','sel').siblings().removeAttr('class');
		/*var _length = _icons.length;
		for( var i=0; i< _length; i++ ){
			_icons.eq(i).removeAttr( 'class' );
		}
		_icons.eq(m).attr( 'class','sel' );*/
	},
	// 轮播图自动滚动
	autoRoll:function(){
		var _self = this;
		function abc(){
			if( _self.tempI < _self.getImgProp().n ){
				_self.tempI++;
			} else {
				_self.tempI = 0;
			}
			_self.ulLftStyle( _self.imgDivId, _self.tempI, _self.getImgProp().w );
			_self.sliderChildren( _self.tempI );
			var _timer = setTimeout( abc, 5000 );

			_self.sliderWrapId.on('mouseover', function(){
				clearTimeout( _timer );
			});
		}
		_self.sliderWrapId.on('mouseout', function(){
			setTimeout( abc, 5000 );
		});
		setTimeout( abc,5000 );
	}
}