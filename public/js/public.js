/*
  Date:20170518
  website:网站首页
  author:
  info:公共方法
*/

// 已弃用 2017.5.24
// function getId(n){
// 	return document.getElementById(n);
// }

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