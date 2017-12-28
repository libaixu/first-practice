/*************
  date:2017/06/02
  author:li
  info:地址切换菜单
 */

function AddressMenuFn(){
	this.addressDivId = $('#addressDivId');
	this.addressMenuId = $('#addressMenuId');

	// 省市区的列表容器
	this.provinceId = $('#provinceId');
	this.cityId = $('#cityId');
	this.areaId = $('#areaId');

	// 三个tab菜单按钮
	this.tabA = $('#tabA');
	this.tabB = $('#tabB');
	this.tabC = $('#tabC');

	this.arr = [];

	this.isShow = 0;
	this.init()
}
AddressMenuFn.prototype = {
	init:function(){
		var _self = this;
		// 获取省市区json
		_self.getDate();

		// 菜单显示隐藏
		_self.addressDivId.on('click',function(){
			if( _self.isShow == 0 ){
				_self.addressMenuId.show();
				_self.isShow = 1;
			}else {
				_self.addressMenuId.hide();
				_self.isShow = 0;
			}
		});

		_self.eventTabA();
		_self.eventTabB();
		_self.eventTabC();
	},
	getDate:function(){
		var _self = this;
		// 获取省数据
		getAjaxJsonp( APILIST.province ,function(d){
			_self.createDom( d.province, _self.provinceId );
			_self.provinceData();
			// console.log(d);
		});

		// 获取市数据
		getAjaxJsonp( APILIST.city ,function(d){
			_self.createDom( d.city, _self.cityId );
			_self.cityData();
			// console.log(d);
		});

		// 获取区数据
		getAjaxJsonp( APILIST.area ,function(d){
			_self.createDom( d.area, _self.areaId );
			_self.areaData();
			// console.log(d);
		});
	},
	// 生成省、市、区的dom节点，公共方法
	createDom:function( _d, _wrap){
		var _self = this;

		for( var i=0; i<_d.length; i++ ){
			$('<p/>',{})
				.html( _d[i].name )
				.appendTo( _wrap );
		}
	},
	// 省的tab html
	provinceData:function(){
		var _self = this;
		_self.provinceId.find('p').on('click',function(){
			var _html = $(this).html();
			// console.log( _html );

			_self.tabA
				.removeClass('clickLi')
				.html( _html );

			_self.addressTitle( _html );

			_self.provinceId.hide();
			_self.cityId.show();

			_self.tabB
				.show()
				.addClass('clickLi')
				.html( '请选择市' );

			// 当点击省的时候，市显示，区隐藏
			// 以防止没有选择市的情况下，直接选择区。
			_self.tabC.hide();
		});
	},
	// 市的tab html
	cityData:function(){
		var _self = this;
		_self.cityId.find('p').on('click',function(){
			var _html = $(this).html();

			_self.tabB
				.removeClass('clickLi')
				.html( _html );

			_self.addressTitle( _html );

			_self.cityId.hide();
			_self.areaId.show();

			_self.tabC
				.show()
				.html('请选择区')
				.addClass('clickLi');
		});
	},
	// 区的tab html
	areaData:function(){
		var _self = this;
		_self.areaId.find('p').on('click',function(){
			var _html = $(this).html();

			_self.tabC
				// .removeClass('clickLi')
				.html( _html );

			_self.addressTitle( _html );

			_self.addressMenuId.hide();
			_self.isShow = 0;

			// 重新选择”区“的时候，把数组当中的”区“去掉。
			_self.arr.splice(2,1);
		});
	},
	// 操作省、市、区的数组
	addressTitle:function( n ){
		var _self = this;
		var _arr = _self.arr;

		if( _arr.length < 3 ){
			_arr.push(n);
		}
		// console.log(_arr);

		_self.addressDivId.html('');
		for(var i=0; i<_arr.length; i++){
			$('<p/>',{})
				.html( _arr[i] )
				.appendTo( _self.addressDivId );
		}
	},
	// 点击省的tab时，市、区的列表要隐藏
	eventTabA:function(){
		var _self = this;
		_self.tabA.on('click',function(){
			$(this).addClass('clickLi');
			_self.tabB.removeClass('clickLi');
			_self.tabC.removeClass('clickLi');

			_self.provinceId.show();
			_self.cityId.hide();
			_self.areaId.hide();

			// 修改地址，为了重新生成“省”，
			// 要清空 this.arr 数组
			_self.arr.splice(0,3);

		});
	},
	// 点击市的tab时，省、区的列表要隐藏
	eventTabB:function(){
		var _self = this;
		_self.tabB.on('click',function(){
			_self.tabA.removeClass('clickLi');
			$(this).addClass('clickLi');
			_self.tabC.removeClass('clickLi');

			_self.provinceId.hide();
			_self.cityId.show();
			_self.areaId.hide();

			_self.arr.splice(1,2);
		});
	},
	// 点击区的tab时，省、市的列表要隐藏
	eventTabC:function(){
		var _self = this;
		_self.tabC.on('click',function(){
			_self.tabA.removeClass('clickLi');
			_self.tabB.removeClass('clickLi');
			$(this).addClass('clickLi');

			_self.provinceId.hide();
			_self.cityId.hide();
			_self.areaId.show();
		});
	}
}
