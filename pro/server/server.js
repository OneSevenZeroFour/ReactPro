var express = require('express');
var http = require('http');
var Aresult = require('./base/base');

app = express();
http.createServer(app);

app.listen(8000, function() {
    console.log('server start, port %j', 8000);
})


//服务器代理请求数据
app.get('/sendProxy', function(req, res) {

    res.append('Access-Control-Allow-Origin', "*");

    var proxy = req.query.proxy;

    http.get('http://120.76.205.241:8000/product/yunhou?pageToken=1&kw=YSL&apikey=ZIZJCfxUFdV2NBW4EKeHhLzOewKuJM2w8cyYSSz3cUgYhAQwkprkubdVgRcFKsH5', function(result) {
        let data = '';

        const { statusCode } = result;

        const contentType = result.headers['content-type'];

        //失败的时候
        let error;
        //状态码
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
            error = new Error('Invalid content-type.\n' +
                `Expected application/json but received ${contentType}`);
        }

        if (error) {
            console.error(error.message);
            // consume response data to free up memory
            //res.resume();
            return;
        }
        //编码格式
        result.setEncoding('utf8');

        result.on('data', function(chunk) {
            data += chunk;
        })

        result.on('end', function() {
            try {
                data = JSON.parse(data);
                //返回请求前端
                res.send(Aresult('succsee', true, data))
            } catch (error) {
                console.error(e.message);
            }

        })

    }).on('error', function(e) {
        console.error(`Got error: ${e.message}`);
    })
})

//连接后台
var router = require('./router')(app);