var express = require('express');

var fs = require('fs');

var app = express();
app.use(express.static('public'));


app.listen(3000);
console.log('服务器启动成功...  http://localhost:3000');