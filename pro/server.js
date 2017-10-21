var express = require('express');
var http = require('http');
var path = require('path');

var WebpackDevMiddleWare = require('webpack-dev-middleware');
var WebpackHotMiddleWare = require('webpack-hot-middleware');
var webpackConfig = require('./webpack.config');
var webpack = require('webpack');
//使用当前config
var compiler = webpack(webpackConfig);

//服务日志
var morgan = require('morgan')('short');


var app = express();

app.use(morgan);

//It's a simple wrapper middleware for webpack. 
//It serves the files emitted from webpack over a connect server. This should be used for development only.
app.use(WebpackDevMiddleWare(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true
    }
}))

//Webpack hot reloading using only webpack-dev-middleware.
// This allows you to add hot reloading into an existing server without webpack-dev-server.
app.use(WebpackHotMiddleWare(compiler))

//获取静态文件地址 
app.use(express.static(path.resolve(__dirname, '/')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

//天气 api 未试用 http://www.sojson.com/open/api/weather/json.shtml?city=%E5%B9%BF%E5%B7%9E%E5%B8%82


var server = http.createServer(app);

server.listen(3000, function() {
    console.log('server start port %j, address %j', server.address(), __dirname);
})


// 连接后端路由
//var router = require('./erp/router')(app);