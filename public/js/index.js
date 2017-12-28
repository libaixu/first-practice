/*
  Date:20170518
  website:网站首页
  author:li
*/
function searchFn(){
	// head搜索框
	var _textId = getId( 'textId' );

	// head搜索按钮
	var _searchId = getId( 'searchId' );
	// head头部的搜索框
	
	// 点击事件 获取焦点
	_textId.onclick = function(){
		// console.log( '获取焦点' );
		this.setAttribute( 'value',' ' );
	}
	// 失去焦点
	_textId.onblur = function(){
		// console.log( '失去焦点' );
		this.setAttribute( 'value','默认的字体' );
	}
	// head头部的搜索按钮
	// 搜索按钮
	
	_searchId.onclick = function(){
		// console.log( '点击按钮事件' );
	}
}

/*
  Date:20170518
  website:网站首页-轮播广告
  author:
*/
function sliderFn(){
	// 左边按钮
	var _toLeftBtn = getId( 'toLeftBtn' );
	// 图片ul容器
	var _imgDivId = getId( 'imgDivId' );
	// 右边按钮
	var _toRightBtn = getId( 'toRightBtn' );

	// 图片移动次数
	var _tempI = 0;
	var _imgW = 991;
    
	// 右边按钮
	_toRightBtn.onclick = function(){
		if ( _tempI < 3 ) {
			_tempI++;
		}else{
			_tempI = 0;
		}
		_imgDivId.style.left = '-' + (_tempI*_imgW) + 'px';
		// 调用轮播图片小红点的函数
		sliderChildren( _tempI );
	}
	// 左边按钮
	_toLeftBtn.onclick = function(){
		if ( _tempI > 0 ) {
			_tempI--;
		}else{
			_tempI = 3;
		}
		_imgDivId.style.left = '-' + (_tempI*_imgW) + 'px';
		// 调用轮播图片小红点的函数
		sliderChildren( _tempI );
	}
}

// 首页处理轮播图小红点函数
function sliderChildren( m ){
	var _n = getId( 'iconListId' ).children;

    for(var i=0; i<4; i++){
    	// console.log(_n[i]);
    	_n[i].removeAttribute( 'class' );
    }

    _n[m].setAttribute( 'class', 'sel' );
}