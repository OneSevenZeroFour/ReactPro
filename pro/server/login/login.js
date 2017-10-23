var connection = require('../sql/sqlConnect')();
var Aresult = require('../base/base');

module.exports = function(app) {
    app.post('/login', function(req, res) {
        //console.log(req.body)
        var data = req.body.data;
        var sql = `select * from customer where `
        for (var item in data) {
            sql += `${item}='${data[item]}' and `
        }
        sql = sql.slice(0, sql.length - 5);
        sql += `;`;
        //res.send(Aresult(sql))
        connection.query(sql, function(err, result, feild) {
            if (err) {
                res.send(Aresult(err));
            }
            if (result.length >= 1) {
                res.send(Aresult('success', true, result));
            } else {
                res.send(Aresult('用户名或密码错误'))
            }

        })
    })
}