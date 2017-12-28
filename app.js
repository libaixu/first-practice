var express = require('express');
var app = express();

// 设置静态目录
app.use( express.static('public') );


app.listen(6666,function(){
	console.log( 'run 127.0.0.1:6666' );
});