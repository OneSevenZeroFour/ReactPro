var connection = require('./sqlConnect')();
var Aresult = require('../base/base');
var merge = require('merge');

module.exports = function (cObj) {
	var obj = {
		sqlname: '',
		data: {},
		callback: function () {}
	}
	var res = merge(obj,cObj);
	var sql = `insert into ${res.sqlname}`;

	if (Object.prototype.toString.call(res.data) === '[object Object]') {
		var key = [];
		var value = [];
		for (var item in res.data) {
			key.push(item);
			value.push(res.data[item]);
		}
		sql += `(${key.join(',')})`;
		sql += ` values (`;
		value.forEach(function(item){
			if(Object.prototype.toString.call(item) === '[object String]'){
				sql += `'${item}'`
			}else{
				sql += `${item}`
			}
			sql += `,`
		})
		sql = sql.slice(0, sql.length-1);
		sql += `);`;

		//res.callback(Aresult(sql));
		connection.query(sql, function (err, result, fields) {
			if (err) {
				res.callback(Aresult(err));
				return;
			} else {
				res.callback(Aresult('success', true, result));
				return;
			}
		})
	} else {
		res.callback(Aresult('data不是一个对象'));
		return;
	}
}