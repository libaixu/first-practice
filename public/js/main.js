/*
  Date:20170518
  website:网站首页
  author:
  info:js文件入口
*/
$(function(){

	// 首页轮播图片
	// createSliderImg()
	 var sliderConfig = {
	 	toLeftBtn    : $('#toLeftBtn'),
    sliderWrapId : $('#sliderWrapId'),
		imgDivId     : $('#imgDivId'),
		toRightBtn   : $('#toRightBtn'),
		iconListId   : $('#iconListId'),
		olbgId       : $('#olbgId')
	 };
	new SliderModule( sliderConfig );


    // subNav边部导航
    // createSubNav();
    var subNavConfig = {
    	subNavId : $('#subNavId')
    }
    new SubNavModule( subNavConfig );

    // 创建享生活广告位
    getproductBlock();

    // 测试接口，第一个api
    // getAjaxJsonp( APILIST.oneapi,function(d){
     	// console.log(d);
    // });
	
	// // 测试远程接口
	// getAjaxJsonp( APILIST.titleNavData,function(d){
 //    	console.log(d);
 //    });
});