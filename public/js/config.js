/*
 describe 整站配置信息
 author:li
 date:2017.5.24
*/

// 站点根链接
var SITEURL = 'http://www.webfeel.org/';

// api接口列表
var APILIST = {
	// 本地假数据，测试用
	imgJson : '../data/imgJson.js',
	topNavColumn : '../data/topNavColumn.js',

	// 远程接口
	oneapi : SITEURL + 'zuoye/php/oneapi.php',
	titleNavData : SITEURL + 'zuoye/php/titleNavData.php',
	subNavApi : SITEURL + 'zuoye/php/subNavApi.php',
	productBlock : SITEURL + 'zuoye/php/productBlock.php',
	smallImgData : SITEURL +'zuoye/php/smallImgData.php',

	// 根据不同产品Id,获得不同产品信息
	param : SITEURL +'zuoye/php/param.php',

	// 省市县选择模块
	// 省
	province : SITEURL + 'zuoye/php/province.php',
	// 市
	city : SITEURL + 'zuoye/php/city.php',
	// 区
	area : SITEURL + 'zuoye/php/area.php',
	// 购物车的产品列表
	cartUlLi : SITEURL + 'zuoye/php/cartUlLi.php',
	// 计算某项商品的合计总价 单价*数量
	cart : SITEURL + 'zuoye/php/cart.php',
	// 所有商品当中，check被选中的商品的总数和总价
	goodsCheck : SITEURL + 'zuoye/php/goodsCheck.php'
}
