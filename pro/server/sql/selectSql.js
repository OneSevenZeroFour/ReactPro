var connection = require('./sqlConnect')();
var Aresult = require('../base/base');
var merge = require('merge');

module.exports = function(cObj) {
    var obj = {
        sqlname: '', //表名
        data: [], //查询的数据 eg: select 'data'
        target: {
            type: 'default', //(between like default in) 其中一种
            tSearch: [], //and 连接 多个数组为or
        }, //依据什么查询 eg: select * from table where 'target'
        sort: 'asc', //排序 默认升序
        order: '', //根据什么排序 eg: select * from table order by 'order'
        distinct: '', //当data为单值时 使用distinct 去重
        limit: [], //查询结果返回数据段[a,b]之间 eg: select * from table where target limit a, b;
        callback: function() {}
    }

    var res = merge(obj, cObj);

    var sql = `select`;

    //处理 data
    if (Array.isArray(res.data) && res.data.length > 0) {
        //处理 distinct

        for (var item of res.data) {
            if (res.distinct && item == res.distinct) {
                sql += ` distinct ${item},`;
            } else {
                sql += ` ${item},`;
            }
        }
    } else if (Array.isArray(res.data) && res.data.length == 0 || res.data == '*') {
        sql += ` *,`;
    } else {
        res.callback(Aresult('data 数据错误'));
        return;
    }
    sql = sql.slice(0, sql.length - 1);
    sql += ` from`;

    //处理 sqlname
    if (res.sqlname) {
        sql += ` ${res.sqlname}`;
    } else {
        res.callback(Aresult('sqlname 不存在'));
        return;
    }

    //处理 target
    var target = res.target;
    if (target) {
        sql += ` where`;
        switch (target.type) {
            case 'default':
                //处理 default
                console.log(target.tSearch)
                for (var item of target.tSearch) {
                    sql += ` (`;
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

    //处理 order
    if (res.order) {
        sql += ` order by ${res.order}`;

        //处理 sort
        if (res.sort == 'desc') {
            sql += ` ${res.sort}`;
        }
    }

    //处理limit
    if (Array.isArray(res.limit) && res.limit.length > 0) {
        sql += ` limit`;
        for (var item of res.limit) {
            sql += ` ${item},`;
        }
        sql = sql.slice(0, sql.length - 1);
    }

    //结束
    sql += `;`;
    //res.callback(Aresult(sql))
    connection.query(sql, function(err, result, fields) {
        if (err) {
            res.callback(Aresult(err));
            return;
        } else {
            res.callback(Aresult('success', true, result));
            return;
        }
    })

}