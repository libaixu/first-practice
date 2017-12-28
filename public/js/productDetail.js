/*
Date:2017.5.29
info:产品详情页
author：li
*/
;
// 产品详情页入口
$(function(){
	// 产品详情页截取pid
	productDetail();

	// 产品详情页大图和小图列表
	new createSmallImg();

	// 商品详情页-地址切换菜单
	new addressMenuFn();

	//加入购物车
	new  gotoShoppingCart();
});
// 产品详情页截取pid
function productDetail(){
	var _url = location.href;
	var _n   = _url.indexOf('?') + 5;
	// console.log( _n );
	var _pid = _url.substring( _n );
	// console.log( _pid );

	getParam( APILIST.param, _pid, function(d){
		var _d = d.productInfo;
		console.log(_d);
		$('#h1Id').html( _d[0].title )
		$('#h2Id').html( _d[1].pInfo )
		$('#h3Id').html( _d[2].info )
	});
}
// 产品详情页大图和小图列表
function createSmallImg(){
	this.bigImgId       = $('#bigImgId');
	this.zoomImgId      = $('#zoomImgId');
	this.leftBtnId      = $('#leftBtnId');
	this.smallImgListId = $('#smallImgListId');
	this.rightBtnId     = $('#rightBtnId');
	this.bigImgWrapId   = $('#bigImgWrapId');
	this.mouseMoveId    = $('#mouseMoveId');
	this.sNum = 0;
	this.init();
}
createSmallImg.prototype = {
	init:function(){
		var _self = this;
		_self.getJson();
	},
	// 获取数据
	getJson:function(){
		var _self = this;
		getAjaxJsonp( APILIST.smallImgData,function(d){
			// console.log(d);
			var _d = d.smallImg;

			// 打开页面第一张大图
			_self.modifyBigImgSrc( _d );

			// 生成小图列表
			_self.createSmall( _d );

            // 大图放大遮罩事件
			_self.mouseMoveEvent();

			// ul移动事件
			_self.ulRemoveEvent();
		});
	},
	// 打开页面第一张大图
	modifyBigImgSrc:function( _d ){
		var _self   = this;
		var _bigImg = _d[0].bigImg;
		_self.bigImgId.attr( 'src', _bigImg );
		_self.localBigImg( _bigImg );
	},
	// 生成小图列表
	createSmall:function( _d ){
		var _self   = this;
		var _length = _d.length;
		for( var i=0; i< _length; i++ ){
			$('<li>',{})
				/*.html(function(){
					$('<img>',{})
						.attr( 'src',_d[i].imgurl )
						.appendTo( $(this) );
				})*/
				.attr( 'data-bigImg', _d[i].bigImg )
				.html('<img src= "' + _d[i].imgurl + '"/>')
				.on('click',function(){
					_self.smallImgEvent( $(this).attr( 'data-bigImg' ) );
				})
				.appendTo( _self.smallImgListId );
		}
	},
	// 小图的click事件
	smallImgEvent:function( _bigImg ){
		var _self = this;
		// console.log( _bigImg );
		_self.bigImgId.attr('src', _bigImg );
		// 缩略图局部细节图
		_self.localBigImg( _bigImg );
	},
	// 大图放大遮罩事件
	mouseMoveEvent:function(){
		var _self = this;
		_self.bigImgWrapId.on('mouseover',function(){
			_self.mouseMoveId.css('display' , 'block');
		});
		_self.bigImgWrapId.on('mouseout',function(){
			_self.mouseMoveId.css('display' , 'none');
		});
		_self.bigImgWrapId.on('mousemove',function(e){
			// 获取鼠标坐标
			var _eX = e.pageX;
			var _eY = e.pageY;

			// 获取父容器相对于网页的坐标
			var _this     = $(this);
			var _bigImgLT = _this.offset();
            
            // 鼠标左右移动
            if( (_eX-112.5) < _bigImgLT.left ){
            	_eX = _bigImgLT.left +112.5;
            } else if( (_eX + 112.5) > (_bigImgLT.left + _this.width() ) ){
            	_eX = _bigImgLT.left + _this.width() -112.5;
            }

            // 鼠标上下移动
            if( (_eY - 112.5) < _bigImgLT.top ){
            	_eY = _bigImgLT.top + 112.5;
            } else if( (_eY + 112.5) > (_bigImgLT.top + _this.height() ) ){
            	_eY = _bigImgLT.top + _this.height() - 112.5;
            }

			_self.mouseMoveId.css({
				'left' : _eX - _bigImgLT.left - 112.5,
				'top' : _eY - _bigImgLT.top - 112.5
			});

			// 缩略图坐标
			var _xyImg     = {}
			_xyImg['left'] = _eX - _bigImgLT.left - 112.5;
			_xyImg['top']  = _eY - _bigImgLT.top - 112.5;

			//  放大图片移动
			_self.localBigImgRemove( _xyImg );

		});

	},
	// ul移动事件 
	ulRemoveEvent:function(){
		var _self = this;
		_self.leftBtnIdEvent();
		_self.rightBtnIdEvent();
	},
	leftBtnIdEvent:function(){
		var _self = this;
		_self.leftBtnId.on('click',function(){
			if( _self.sNum < 0 ){
				_self.sNum++;
				_self.ulAnimate( _self.sNum );
				// _self.smallImgListId.css( 'left', _self.sNum * 60 );
			}
		});
	},
	rightBtnIdEvent:function(){
		var _self = this;
		_self.rightBtnId.on('click',function(){
			if( _self.sNum > -1 ){
				_self.sNum--;
				_self.ulAnimate( _self.sNum );
				// _self.smallImgListId.css( 'left', _self.sNum * 60 );
			}
		});	
	},
	ulAnimate:function( _sNum ){
		var _self = this;
		_self.smallImgListId.stop().animate({
			'left': _sNum * 60
		},500);
	},
	// 缩略图放大
	localBigImg:function( _localBigImg ){
		var _self = this;
		_self.bigImgWrapId.on({
			mouseover:function(){
				_self.zoomImgId.css('display','block');
			},
			mouseout:function(){
				_self.zoomImgId.css('display','none');
			}
		});
		$('<img/>',{})
			.attr('src', _localBigImg )
			.appendTo( _self.zoomImgId );
	},
	// 缩略图细节图片移动
	localBigImgRemove:function( _xyImg ){
		var _self = this;
		_self.zoomImgId.children('img').css({
			'left' : -_xyImg.left * 2,
			'top' : -_xyImg.top * 2
		});
	}
}

// 加入购物车
function gotoShoppingCart(){
	this.buyNumId = $('#buyNumId');
	this.addBtnId = $('#addBtnId');
	this.reduceBtnId = $('#reduceBtnId');
	this.gotoshoppingcarBtnId = $('#gotoshoppingcarBtnId');
	this.num = 1;
	this.init();
}
gotoShoppingCart.prototype = {
	init:function(){
		var _self = this;
		_self.addBtnEvent();
		_self.reduceBtnEvent();
		_self.blurEvent();
	},
	// 输入框
	blurEvent:function(){
		var _self = this;
		_self.buyNumId.on('blur',function(){
			var _val  = $(this).val();
			if( _val > 0 ){
				_self.num = _val;
			}else{
				_self.num = 1;
				_self.buyNumId.val( _self.num );
				alert('商品数量必须大于0');
			}
		});
	},
	// 加号
	addBtnEvent:function(){
		var _self = this;
		_self.addBtnId.on('click',function(){
			_self.num++;
			_self.buyNumId.val( _self.num );
		});
	},
	// 减号
	reduceBtnEvent:function(){
		var _self = this;
		_self.reduceBtnId.on('click',function(){
			if( _self.num > 1 ){
				_self.num--;
				_self.buyNumId.val( _self.num );
			}
		});
	}
}