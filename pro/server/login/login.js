var bodyParser = require('body-parser');
var multer = require('multer');

module.exports = function(app) {

    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    //app.use(multer()); // for parsing multipart/form-data
    app.post('/login', function(req, res) {
        console.log(req.body)
        res.send({ data: '123' })
    })
}