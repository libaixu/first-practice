/*
 describe 购物车模块
 author:li
 date:2017.6.5
*/
;
// 购物车入口
$(function(){
	new CartModule();
});

function CartModule(){
	this.init();
	this.cartBodyId = $('#cartBodyId');
	this.goodsTotalId = $('#goodsTotalId');
	this.checkedGoodsTotalId = $('#checkedGoodsTotalId');
	this.cartTotalMoneyId = $('#cartTotalMoneyId');
	this.allSelect = $('#allSelect');
	this.allSelect_2 = $('#allSelect_2');
}
CartModule.prototype = {
	init:function(){
		var _self = this;
		_self.getGoodsList();
	},
	// 获得商品列表
	getGoodsList:function(){
		var _self = this;
		getAjaxJsonp( APILIST.cartUlLi, function(d){
			if( d.error.code == 0 ){
				// console.log(d);
				_self.createGoodsList(d);
				_self.goodsTotalId.html( d.total.num );
				_self.checkedGoodsTotalId.html( d.total.num );
				_self.cartTotalMoneyId.html( d.total.totalMoney );
			} else {
				return false;
			}
		});
	},
	// 生成商品列表
	createGoodsList:function(d){
		var _self = this;
		var _cartList = d.cartList;

		// 添加html
		_self.cartBodyId.html( createCartList( _cartList ) );
		// 按钮换肤函数
		_self.checkboxSkinChange( _cartList );
		// 增加商品数量
		_self.addBtnEvent();
		// 减少商品数量
		_self.reduceBtnEvent();
		// 改变数字框商品数量
		_self.goodsNumEvent();
		// 商品的单选按钮事件
		_self.checkedBoxEvent();
		// 全选按钮点击事件
		_self.allSelectFnEvent();
		// 删除单项商品点击事件
		_self.delBtnEvent();
	},
	// 按钮换肤函数
	checkboxSkinChange:function( _cartList ){
		var _self       = this;
		var _changeSkin = _self.cartBodyId.find('.changeSkin');

		/*for( var i=0; i<_changeSkin.length; i++ ){
			checkboxSkin('div', {
				class:'checkboxStyle skinCheckBtn',
				'data-total': _cartList[i].total,
				'data-num': _cartList[i].num
			}).appendTo( _changeSkin.eq(i) );
		}*/

		for( var i=0; i<_changeSkin.length; i++ ){
			_changeSkin.eq(i).checkboxSkin('div', {
				class:'checkboxStyle skinCheckBtn',
				'data-total': _cartList[i].total,
				'data-num': _cartList[i].num});
		}
	},
	// 改变数字框商品数量
	goodsNumEvent:function(){
		var _self     = this;
		var _itemWrap = _self.cartBodyId.find('.itemWrap');
		var _goodsNum = _itemWrap.find('.goodsNum');

		_goodsNum.on('blur',function(){
			var _this = $(this);
			var _num  = _this.val();
			var _nuit = _this.attr('data-unit');
			var _sum  = _this.parent().next();

			if( _num > 0 ){
				// 计算某项商品的合计总价 单价*数量
				_self.cartSingleTotal( _num, _nuit, _sum );
			} else {
				alert( '商品数量必须大于零' );
				var _num = 1;
				_this.val( _num );
				// 计算某项商品的合计总价 单价*数量
				_self.cartSingleTotal( _num, _nuit, _sum );
			}
		});
	},
	// 增加商品数量
	addBtnEvent:function(){
		var _self     = this;
		var _itemWrap = _self.cartBodyId.find('.itemWrap');
		var _addBtn   = _itemWrap.find('.addBtn');

		_addBtn.on('click',function(){
			var _this = $(this);
			var _val  = _this.prev().val();
			var _unit = _this.attr('data-unit');
			var _sum  = _this.parent().next();

			_val++;
			_this.prev().val( _val );

			// var _d = '[{"num":' + _val + ', "price":' + _unit + '}]';
			// 计算某项商品的合计总价 单价*数量
			_self.cartSingleTotal( _val, _unit, _sum );
		});

	},
	// 减少商品数量
	reduceBtnEvent:function(){
		var _self      = this;
		var _itemWrap  = _self.cartBodyId.find('.itemWrap');
		var _reduceBtn = _itemWrap.find('.reduceBtn');

		_reduceBtn.on('click',function(){
			var _this = $(this);
			var _val  = _this.next().val();
			var _unit = _this.attr('data-unit');
			var _sum  = _this.parent().next();

			if( _val > 1 ){
				_val--;
				_this.next().val( _val );

				// 计算某项商品的合计总价 单价*数量
				_self.cartSingleTotal( _val, _unit, _sum );
			}
		});
	},
	// 计算某项商品的合计总价 单价*数量
	cartSingleTotal:function( _v, _n, _sum ){
		var _self = this;
		var _d    = '[{"num":' + _v + ', "price":' + _n + '}]';
		cartFnJsonp( APILIST.cart, _d, function(d){
			// console.log(d);
			_sum.html( '￥' + d);

			// 点击加减号时修改每项商品的input的数量和总价信息
			var _skinCheckBtn = _sum.parents('.itemWrap').find('div.skinCheckBtn');
			_skinCheckBtn.attr({
				'data-num' : _v,
				'data-total' : d
			});
			// 计算选中商品的数量和总价
			_self.cartTotalMoneyEvent();
		});
	},
	// 返回 所有被选中商品的商品信息
	isCheckedGoodsInfo:function(){
		var _self    = this;
		// var _cbBox   = _self.cartBodyId.find('input.cbBox');
		var _tempArr = [];


		// for( var i=0; i< _cbBox.length; i++ ){
		// 	if( _cbBox.eq(i).is(":checked") == true ){
		// 		var tem = {}

		// 		tem["price"] = _cbBox.eq(i).attr('data-total');
		// 		tem["num"]   = _cbBox.eq(i).attr('data-num');

		// 		_tempArr.push( tem );
		// 	}
		var _skinCheckBtn = _self.cartBodyId.find('div.skinCheckBtn');

		for( var i=0; i< _skinCheckBtn.length; i++ ){
			if( _skinCheckBtn.eq(i).is('.skinCheckBtn') == true ){
				var tem = {}

				tem["price"] = _skinCheckBtn.eq(i).attr('data-total');
				tem["num"]   = _skinCheckBtn.eq(i).attr('data-num');

				_tempArr.push( tem );
			}
		}
		// 未选中商品
		if( _tempArr.length == 0 ){
			var tem = {}

			tem["price"] = 0;
			tem["num"]   = 0;

			_tempArr.push( tem );
		}
		// }
		// console.log( _tempArr );

		return _tempArr;
	},
	// 商品的单选按钮点击事件
	checkedBoxEvent:function(){
		var _self = this;
		// var _cbBoxBtn = _self.cartBodyId.find('input.cbBox');

		// _cbBoxBtn.on('click',function(){
			// 返回所有被选中商品的商品信息
			// _self.isCheckedGoodsInfo();
			// 计算选中商品的数量和总价
			// _self.cartTotalMoneyEvent();
			// _self.allSelectFnState();
		// });
		var _skinCheckBtn = _self.cartBodyId.find('div.skinCheckBtn');
		_skinCheckBtn.on('click',function(){
			var _this = $(this);
			if( _this.is('.skinCheckBtn') == false ){
				// 选中
				_this.addClass('skinCheckBtn');
			} else {
				// 取消选中
				_this.removeClass('skinCheckBtn');
			}
			// 计算选中商品的数量和总价
			_self.cartTotalMoneyEvent();
			_self.allSelectFnState();
		});

	},
	// 计算选中商品的数量和总价
	cartTotalMoneyEvent:function(){
		var _self = this;
		var _d    = _self.isCheckedGoodsInfo();
		goodsCheckedJsonp( APILIST.goodsCheck, JSON.stringify(_d), function(d){
			_self.checkedGoodsTotalId.html( d.num );
			_self.cartTotalMoneyId.html( d.price );
		});
	},
	// 全选按钮点击事件
	allSelectFnEvent:function(){
		var _self      = this;
		var _allSelect = $('.allSelect');
		// var _cbBox     = _self.cartBodyId.find('input.cbBox');
		// _allSelect.on('click', function(){
		// 	var _is = $(this).is(":checked");
		// 	if( _is == true ){;
		// 		_allSelect.attr('checked',true);
		// 		_cbBox.attr('checked',true);
		// 	} else {
		// 		_allSelect.removeAttr('checked');
		// 		_cbBox.removeAttr('checked');
		// 	}
		// )};
		var _skinCheckBtn = _self.cartBodyId.find('div.skinCheckBtn');
		_allSelect.on('click', function(){
			var _this = $(this);
			if( _this.is('.skinCheckBtn') == true ){
				_allSelect.removeClass('skinCheckBtn');
				_skinCheckBtn.removeClass('skinCheckBtn');
			} else {
				_allSelect.addClass('skinCheckBtn');
				_skinCheckBtn.addClass('skinCheckBtn');
			}
			// 计算选中商品的数量和总价
			_self.cartTotalMoneyEvent();
		});
	},
	// 点击单选按钮判断全选按钮状态
	allSelectFnState:function(){
		var _self      = this;
		var _allSelect = $('.allSelect');
		// var _cbBoxBtn = _self.cartBodyId.find('input.cbBox');
		var _checkboxStyle = _self.cartBodyId.find('div.checkboxStyle');
		for( var i=0; i<_checkboxStyle.length; i++ ){
			if( _checkboxStyle.eq(i).is('.skinCheckBtn') == false ){
				_allSelect.removeClass('skinCheckBtn');
				break;/*退出for循环*/
			}
			_allSelect.addClass('skinCheckBtn');
		}
		// for( var i=0; i<_cbBoxBtn.length; i++ ){
		// 	if( _cbBoxBtn.eq(i).is(":checked") == false ){
		// 		_allSelect.removeAttr('checked');
		// 		break;/*退出for循环*/
		// 	}
		// 	_allSelect.attr('checked', true);
		// }
	},
	// 删除单项商品点击事件
	delBtnEvent:function(){
		var _self = this;
		var _delBtn = _self.cartBodyId.find('.delBtn');
		// console.log(_delBtn);
		_delBtn.on('click', function(){
			var _this = $(this);
			_this.parents('.itemWrap').prev().remove();
			_this.parents('.itemWrap').remove();
			// 判断全选按钮状态
			_self.allSelectFnState();
			// 计算选中商品的数量和总价
			_self.cartTotalMoneyEvent();

		});

	}

}
