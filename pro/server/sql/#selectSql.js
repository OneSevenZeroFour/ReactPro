var connection = require('./sqlConnect')();
var Aresult = require('../base/base');
var merge = require('merge');

module.exports = function(cObj){
	var obj = {
		sqlname: '',       //表名
		data: [],          //查询的数据 eg: select 'data'
		target: {
			type: 'default', //(between like default in) 其中一种
			tSearch: [[{nnc: []}],[]],  //and 连接 多个数组为or
		},                 //依据什么查询 eg: select * from table where 'target'
		sort: 'asc',       //排序 默认升序
		order: '',         //根据什么排序 eg: select * from table order by 'order'
		distinct: false,   //当data为单值时 使用distinct 去重
		limit: [],         //查询结果返回数据段[a,b]之间 eg: select * from table where target limit a, b;
		callback: function(){}
	}

	var res = merge(obj, cObj);
	
	var sql = `select`;
	if(Array.isArray(res.data)){
		if(res.data.length > 0){
			sql += ` ${res.data.join(',')}`;
		}else{
			sql += ` *`;
		}
	}else{
		res.callback(Aresult('data 不是数组'))
	}

	sql += ` from`;

	if(res.sqlname){
		sql += ` ${res.sqlname}`;
	}else{
		res.Aresult('sqlname 不存在');
	}

	sql += ` where`;

	if(res.target){
		switch(res.target.type){
			case 'default':
				if(res.target.tSearch){
					res.target.tSearch.forEach(function(item){
						if(Array.isArray(item)){
							item.forEach(function(ele){
								sql += ` (${Object.keys(ele)[0]}=${Object.values(ele)[0]}`;
								sql += ` and`;
							})
							sql = sql.slice(0, sql.length-4);
							sql += `)`;
						}

						sql += ` or`;
					})
					sql = sql.slice(0, sql.length-3);
				}else{
					res.callback(Aresult('rSearch 没有数据'));
				}
				break;
			case 'between':
				if(res.target.tSearch){
					
				}else{
					res.callback(Aresult('rSearch 没有数据'));
				}
				
		}
	}
}