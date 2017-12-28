/*
  Date:20170518
  website:网站首页
  author:li
  info:公共方法
*/

// 已弃用 2017.5.24
function getId(n){
	return document.getElementById(n);
}

// ajax公共方法
function getAjax( _url,callback ){
	$.ajax({
		url:_url,
		type:'get',
		dataType:'json',
		success:function(d){
			callback(d);
		}
	});
}

// getpid
function getParam( _url,_pid,callback ){
	$.ajax({
		url:_url,
		type:'get',
		data:'cc=' + _pid,
		dataType:'jsonp',
		jsonp:'jsoncallback',
		success:function(d){
			callback(d);
		}
	});
}
// 跨域jsonp
function getAjaxJsonp( _url,callback ){
	$.ajax({
		url:_url,
		type:'get',
		dataType:'jsonp',
        jsonp:'callback',
		success:function(d){
			callback(d);
		}
	});
}

// 获取全站公共头部 /component/component.html
function getHeader(){
	$.ajax({
		url:'../component/header.html',
		type:'get',
		dataType:'html',
		success:function(d){
			$('body').prepend( d );
			// 首页header搜索框函数调用
			searchFn();
		}
	});
}
getHeader();
// 公共头部searchFn
function searchFn(){
	// head搜索框
	// 获取焦点
    var _textId = $('#textId');
	_textId.on('focus',function(){
		$(this).attr( 'value','' );
	});

	// 失去焦点
	_textId.on('blur',function(){
		$(this).attr( 'value','默认的文字' );
	});

	// 头部搜索按钮
	$('#searchId').on('click',function(){
		console.log('搜索按钮点击事件');
	});
}
/*
  Date:20170518
  website:计算某项商品的合计总价
  author:li
  info:公共方法
*/
function cartFnJsonp( _url, _d, callback ){
	$.ajax({
		url:_url,
		type:'get',
		data:'cart=' + _d,
		dataType:'jsonp',
		jsonp:'jsoncallback',
		success:function(d){
			callback(d);
		}
	});
}
/*
  Date:20170518
  website:计算所有商品中被选中的数量及总价
  author:li
  info:公共方法
*/
function goodsCheckedJsonp( _url, _d, callback ){
	$.ajax({
		url:_url,
		type:'get',
		data:'goods=' + _d,
		dataType:'jsonp',
		jsonp:'jsoncallback',
		success:function(d){
			callback(d);
		}
	});
}

// 修改input样式 作废 ！！！！
// function checkboxSkin(){
// 	var isCheck = 0;
// 	$('.skinBtn').on('click',function(){
// 		var _self = $(this);
// 		if( isCheck == 0 ){
// 			_self.css('background-position','-48px top');
// 			isCheck = 1;
// 		} else {
// 			_self.css('background-position','-24px top');
// 			isCheck = 0;
// 		}
// 	});
// }
// checkboxSkin();

// 选择按钮换肤函数
/*function checkboxSkin( el, clsObj ){
	var _el = el;
	return $('<'+ _el +'>', clsObj);
}*/

// 选择按钮换肤函数
$.fn.extend({
	checkboxSkin:function( el, clsObj ){
		var _el = el;
		console.log( this );
		return $('<'+ _el +'>', clsObj).appendTo( this );
	}
});
