var express = require('express');
var http = require('http');

app = express();
http.createServer(app);

app.listen(8000, function() {
    console.log('server start, port %j', 8000);
})


require('./router')(app);