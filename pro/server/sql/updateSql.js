var connection = require('./sqlConnect')();
var Aresult = require('../base/base');
var merge = require('merge');

module.exports = function(cObj) {
    var obj = {
        sqlname: '',
        data: {},
        target: {
            type: 'default', //(between like default in) 其中一种
            tSearch: [], //and 连接 多个数组为or
        }, //依据什么查询 eg: select * from table where 'target'
        callback: function() {}
    }
    var res = merge(obj, cObj);

    var sql = `update ${res.sqlname} set`;

    if (Object.prototype.toString.call(res.data) === '[object Object]') {
        if (Object.prototype.toString.call(res.target) === '[object Object]') {
            //
            for (var item in res.data) {
                if (Object.prototype.toString.call(res.data[item]) === '[object String]') {
                    sql += ` ${item}='${res.data[item]}',`;
                } else {
                    sql += ` ${item}=${res.data[item]},`;
                }
            }
            sql = sql.slice(0, sql.length - 1);

            var target = res.target;
            if (target) {
                sql += ` where`;
                switch (target.type) {
                    case 'default':
                        //处理 default
                        sql += ` (`;
                        for (var item of target.tSearch) {
                            for (var xitem in item) {
                                sql += ` ${xitem}='${item[xitem]}' and`;
                            }
                            sql = sql.slice(0, sql.length - 4);
                            sql += `) or `;
                        }
                        sql = sql.slice(0, sql.length - 4);

                        break;
                    case 'between':
                        //处理 between
                        for (var item of target.tSearch) {
                            for (var xitem in item) {
                                sql += ` ${xitem} between`;
                                for (var xyitem of item[xitem]) {
                                    sql += ` '${xyitem}' and`;
                                }
                                sql = sql.slice(0, sql.length - 4);

                                break;
                            }
                        }
                        break;
                    case 'in':
                        //处理 in
                        for (var item of target.tSearch) {
                            for (var xitem in item) {
                                sql += ` ${xitem} in (`;
                                for (var xyitem of item[xitem]) {
                                    sql += `'${xyitem}',`;
                                }
                                sql = sql.slice(0, sql.length - 1);
                                sql += `)`;
                                break;
                            }
                        }
                        break;
                    case 'like':
                        //处理 like
                        for (var item of target.tSearch) {
                            sql += ` (`;
                            for (var xitem in item) {
                                sql += ` ${xitem} like '%${item[xitem]}%' and`;
                            }
                            sql = sql.slice(0, sql.length - 4);
                            sql += `) or `;
                        }
                        sql = sql.slice(0, sql.length - 4);
                        break;
                }
            }

            //结束 sql
            sql += `;`;
            //res.callback(Aresult(sql));
            connection.query(sql, function(err, result, fields) {
                if (err) {
                    res.callback(Aresult(err));
                    return;
                } else {
                    res.callback(Aresult('success', true, result));
                    return;
                }
            })
        } else {
            res.callback(Aresult('target不是一个对象'));
            return;
        }
    } else {
        res.callback(Aresult('data不是一个对象'));
        return;
    }
}