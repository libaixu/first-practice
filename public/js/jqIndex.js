/*
  Date:20170518
  website:网站首页
  author:li
*/


// 图片轮播区 弃用
function sliderFn(){
	// 左边按钮
	var _toLeftBtn = $('#toLeftBtn');

	// 图片ul容器
	var _imgDivId = $('#imgDivId');
	
	// 右边按钮
	var _toRightBtn = $('#toRightBtn');

	// 图片移动次数
	var _tempI = 0;

	// ul中的图片集合
	var _imgGroup = _imgDivId.find('img');

	// 图片的数字最大值
	var imgMax = _imgGroup.length-1;
    
    // 获取图片宽度
	var _imgW = _imgGroup.eq(0).width();

	// 生成滚动图下方小圆点
	createRedLi( _imgGroup.length );

    // 小圆点点击事件
    var _listClick= $('#iconListId').children();
    _listClick.on('click',function(){
    	var _this = $(this);
    	_this.attr('class','sel').siblings().removeAttr('class');
    	_tempI = _this.index();
    	ulLftStyle( _imgDivId, _tempI, _imgW )
    });

	// 右边按钮
	_toRightBtn.on('click',function(){
		if( _tempI < imgMax ){
			_tempI++;
		} else {
			_tempI = 0;
		}
		// 调用改变ul容器left函数
		ulLftStyle( _imgDivId, _tempI, _imgW );
		// 调用轮播图片小红点的函数
		sliderChildren( _tempI );
	});

	// 左边按钮
	_toLeftBtn.on('click',function(){
		if( _tempI > 0 ){
			_tempI--;
		} else {
			_tempI = imgMax;
		}
		// 调用改变ul容器left函数
		ulLftStyle( _imgDivId, _tempI, _imgW );
		// 调用轮播图片小红点的函数
		sliderChildren( _tempI );
	});
}

// 生成滚动图下方的小圆点 弃用
function createRedLi( _length ){
	var _iconListId = $('#iconListId');
	for( var i=0; i< _length ; i++ ){
		$('<li/>',{})
		    .appendTo( _iconListId );
	}

	// 左起第一个小圆点为红色
    _iconListId.children().eq(0).attr( 'class','sel' );

	// 每个小圆点的宽度
	var _iconW = _iconListId.children().width();

    // 小圆点容器宽度
	var _listWidth =(_iconW + 15) * _length;
    
    _iconListId.css({
    	'width' : _listWidth,
    	'margin-left' : '-' + _listWidth/2 + 'px'
    });

    $('#olbgId').css({
    	'width' : _listWidth,
    	'margin-left' : '-' + _listWidth/2 + 'px'
    });
	// _iconListId.css( 'width',_listWidth );
	// _iconListId.css( 'margin-left','-' + _listWidth/2 + 'px' );
	// $('#olbgId').css( 'width',_listWidth );
	// $('#olbgId').css( 'margin-left','-' + _listWidth/2 + 'px' );
}

// 改变ul容器left函数 弃用
function ulLftStyle( _imgDivId, _tempI, _imgW ){
	// _imgDivId.css('left','-' + (_tempI * _imgW) +'px');
	_imgDivId.stop().animate({
		left : '-' + (_tempI * _imgW)
	},500);
}

// 首页处理轮播图小红点函数 弃用
function sliderChildren( m ){
	// var _n = getId( 'iconListId' ).children;
	// console.log(_n);
	var _n = $('#iconListId').children();
	var _length = _n.length
    for(var i=0; i< _length; i++){
    	_n.eq(i).removeAttr( 'class' );
    }
    _n.eq(m).attr( 'class', 'sel' );
}

// 首页轮播图片生成 弃用
function createSliderImg(){
	$.ajax({
		url:APILIST.imgJson,
		type:'get',
		dataType:'json',
		success:function(d){
			// console.log(d);
			var _length = d.imgs.length;
			var _imgDivId = $('#imgDivId');

			for( var i=0; i< _length ; i++){
				$('<li/>',{}).html(function(){
		    		$('<img/>',{})
		    		    .attr('src', d.imgs[i].url )
		    		    .appendTo( $(this) )
		    	}).appendTo( _imgDivId );
			}
			// 首页轮播广告函数调用
			sliderFn();
		}
	});
}

// topNav首页head导航条
getAjax( APILIST.topNavColumn,function(d){
	var _length = d.topNavs.length;
	var _topNavId = $('#topNavId');
    for( var i=0; i< _length ; i++ ){
	    // console.log( d.topNavs[i].strick );
		if( d.topNavs[i].strick == 1 ){
			$('<li/>',{})
			    .html( d.topNavs[i].column + '<i></i>')
				.appendTo( _topNavId );
		} else if( d.topNavs[i].strick == 0 ){
			$('<li/>',{})
			    .html(d.topNavs[i].column + '<span class="strick"></span>')
			    .appendTo( _topNavId );
		} else {
			$('<li/>',{})
			    .html(d.topNavs[i].column )
			    .appendTo( _topNavId );
		}
	}
});


// subNav边部导航
function createSubNav(){
	getAjaxJsonp( APILIST.subNavApi,function(d){
        var _d = d.productList;
        var _length = _d.length;
        var _subNavId = $('#subNavId');
        // console.log(d);

        for( var i=0; i< _length ; i++ ){
        	$('<li/>',{}).html(function(){
        		var _self = $(this);
	    		$('<p/>',{})
	    		    .html( _d[i].type )
	    		    .appendTo( _self );

	    		$('<div/>',{'class' : 'popMenu'})
	    		    .html(function(){
	    		    	var _products = _d[i].products;
	    		    	for( var j=0; j< _products.length; j++ ){
	    		    		$('<p/>',{})
	    		    		    .html(_products[j].name)
	    		    		    .appendTo( $(this) );
	    		    	}
	    		    }).appendTo( _self );
        	}).appendTo( _subNavId );
        }
	});
}

//  已弃用 2017.5.24
// function topNavColumn(){
// 	$.ajax({
// 		url:'../data/topNavColumn.js',
// 		type:'get',
// 		dataType:'json',
// 		success:function(d){
// 			var _length = d.topNavs.length;
// 			var _topNavId = $('#topNavId');

// 			for( var i=0; i< _length ; i++){
// 			    // console.log( d.topNavs[i].column );
// 				$('<li/>',{})
// 				    .html( d.topNavs[i].column )
// 				    .appendTo( _topNavId );
// 			}
// 		}
// 	});
// }

// 创建享生活广告位
function getproductBlock(){
	getAjaxJsonp(APILIST.productBlock,function(d){
		var _d = d.pb;
		var _length = _d.length;
		var _self = $('#productBlock');
		for( var i=0; i<_length; i++ ){
			$('<a/>',{})
				.attr({
					'data-oldprice' : _d[i].oldprice,
					// 'data-pid' : _d[i].pid,
					'data-price' : _d[i].price,
					'target':'_blank',
					'href':'../productDetail.html?pid=' + _d[i].pid ,
				})
				.html(function(){
					var _self = $(this)
					$('<li/>',{'class':'bg' + (i+1)}).html(function(){
						var _self = $(this);
						$('<img/>',{})
							.attr( 'src',_d[i].productImg )
							.appendTo( _self );
						$('<dl/>',{'class':'bg' + (i+1)})
							.html(function(){
								var _self = $(this);
								$('<dt/>',{})
									.html( _d[i].name )
									.appendTo( _self );
								$('<dd/>',{})
									.html( _d[i].describe )
									.appendTo( _self );
							})
							.appendTo( _self );
					}).appendTo( _self );
			}).appendTo( _self );
		}
	});
}