var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');

var Aresult = require('../base/base');
var update = require('../sql/updateSql');
var insert = require('../sql/insertSql');
var remove = require('../sql/removeSql');
var select = require('../sql/selectSql');


module.exports = function(app) {

    //添加body-parser multer 插件
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    var storage = multer.diskStorage({
        //设置上传后文件路径，uploads文件夹会自动创建。
        destination: function(req, file, cb) {
            cb(null, path.resolve(__dirname, '../../src/assets/img'));
        },
        //给上传文件重命名，获取添加后缀名
        filename: function(req, file, cb) {
            var fileFormat = (file.originalname).split(".");
            //给图片加上时间戳格式防止重名名
            //比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
            cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
        }
    });
    var upload = multer({
        storage: storage
    });

    //获取图片上传
    app.post('/fileupload', upload.any(), function(req, res, next) {
        var arr = [];
        req.files.forEach(function(ele, idx) {
            arr.push(ele.filename)
        })
        var obj = Aresult('success', true, arr);

        res.send(JSON.stringify(obj));
    });

    //更新数据
    app.post('/upload', function(req, res) {

        var target = { userId: req.body.userId };
        var data = req.body.data;
        //console.log(data)
        update({
            sqlname: 'customer',
            data,
            target,
            callback: function(result) {
                res.send(result);
            }
        })
    })

    //update 
    app.post('/update', function(req, res) {
        //api
        /*
            tableName
            data
            userId
        */
        var tableName = req.body.tableName;
        var data = req.body.data;
        var target = req.body.target;

        update({
            sqlname: tableName,
            data,
            target,
            callback(result) {
                res.send(result);
            }
        })
    })

    //insert
    app.post('/insert', function(req, res) {
        //api
        /*
            tableName
            data
        */
        var tableName = req.body.tableName;
        var data = req.body.data;
        var targetId = '';
        //添加id
        switch (tableName) {
            case 'collection':
                var date = new Date();
                var collectId = 'col' + date.getTime().toString(16);
                data.collectId = collectId;
                targetId = collectId;
                break;
            case 'address':
                var date = new Date();
                var addressId = 'add' + date.getTime().toString(16);
                data.addressId = addressId;
                targetId = addressId;
                break;
            case 'order':
                var date = new Date();
                var orderId = 'ord' + date.getTime().toString(16);
                data.orderId = orderId;
                targetId = orderId;
                break;
            case 'cart':
                var date = new Date();
                var cartId = 'car' + date.getTime().toString(16);
                data.cartId = cartId;
                targetId = cartId;
                break;
        }

        insert({
            sqlname: tableName,
            data,
            callback(result) {
                console.log(result)
                result.data.targetId = targetId;
                res.send(result)
            }
        })
    })

    //delete
    app.post('/remove', function(req, res) {
        //api
        /*
            tableName
            data
        */
        var tableName = req.body.tableName;
        var target = req.body.target;
        remove({
            sqlname: tableName,
            target,
            callback(result) {
                res.send(result);
            }
        })
    })

    //简单的只带有排序 模糊查询和搜索的select 不能并表查询 简单and or 不能嵌套进行
    app.post('/select', function(req, res) {
        //api
        /*
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
    
        */
        var tableName = req.body.tableName;
        var data = req.body.data || [];
        var target = req.body.target;
        var sort = req.body.sort || 'asc';
        var order = req.body.order;
        var distinct = req.body.distinct;
        var limit = req.body.limit;

        select({
            sqlname: tableName,
            data,
            target,
            sort,
            order,
            distinct,
            limit,
            callback(result) {
                res.send(result);
            }
        })
    })

}