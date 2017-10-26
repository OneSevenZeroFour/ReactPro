var connection = require('../sql/sqlConnect')();
var Aresult = require('../base/base');
var insert = require('../sql/insertSql');

module.exports = function(app) {
    app.post('/register', function(req, res) {
        var data = req.body;
        //console.log(data)
        var sql = `select * from customer where `;
        sql += `elephone=${data.elephone};`;
        connection.query(sql, function(err, result, feild) {
            if (err) {
                res.send(Aresult(err));
            }
            if (result.length >= 1) {
                res.send(Aresult('该手机号已被注册'));
            } else {
                //设置userId
                var date = new Date();
                var userId = date.getTime().toString(16);
                data.userId = userId;
                insert({
                    sqlname: 'customer',
                    data,
                    callback: function(result) {
                        result.data.userId = userId;
                        res.send(result);
                    }
                })
            }
        })
    })
}