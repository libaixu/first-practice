/*
 describe 购物车模块
 author:li
 date:2017.6.6
 info:商品列表
*/
function createCartList( _cartList ){
	var _html = '';
	for( var i=0; i<_cartList.length; i++ ){
		_html += '<div class="lineDiv"></div>';
		_html += '<div class="itemWrap">';
			_html += '<div class="item">';
				// _html += '<input type="checkbox" data-total="'
				// 					+ _cartList[i].total +'" data-num="'
				// 					+ _cartList[i].num +'" checked class="select cbBox"/>'

				// 插入换肤函数的钩子
				_html += '<div class="changeSkin"></div>';

				// 单选按钮的skin
				/*_html += '<div class="checkboxStyle skinCheckBtn" data-total="'
								+ _cartList[i].total +'" data-num="'
								+ _cartList[i].num +'"></div>';*/
				_html += '<label>';
					_html += '<img src="'+ _cartList[i].goodsimg +'" />';
				_html += '</label>';
			_html += '</div>';
			_html += '<div class="goodsNema">';
			    _html += '<p>'+ _cartList[i].name +'</p>';
			_html += '</div>';
			_html += '<div class="goodsInfo">';
			    _html += '<p>'+ _cartList[i].introduce +'</p>';
			_html += '</div>';
			_html += '<p class="priceUnit">￥'+ _cartList[i].unit +'</p>';
			_html += '<div class="goodsNumWrap">';
				_html += '<input data-unit="'
									+ _cartList[i].unit 
									+'" type="button" value="-" class="reduceBtn fl" />';
				_html += '<input type="text" value="'
									+ _cartList[i].num 
									+'" data-unit="' 
									+ _cartList[i].unit 
									+ '" class="goodsNum fl" />';
				_html += '<input data-unit="'
									+ _cartList[i].unit 
									+'" type="button" value="+" class="addBtn fl" />';
			_html += '</div>';
			_html += '<p class="priceSum">￥'+ _cartList[i].total +'</p>';
			_html += '<p class="delete delBtn">删除</p>';
		_html += '</div>';
		}

	return _html;
}