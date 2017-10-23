var bodyParser = require('body-parser');
var multer = require('multer');
var Aresult = require('../base/base');
var update = require('../sql/updateSql');
var path = require('path');

module.exports = function (app) {

	//添加body-parser multer 插件
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	var storage = multer.diskStorage({
		//设置上传后文件路径，uploads文件夹会自动创建。
		destination: function (req, file, cb) {
			cb(null, path.resolve(__dirname,'../../src/assets/img'));
		},
		//给上传文件重命名，获取添加后缀名
		filename: function (req, file, cb) {
			var fileFormat = (file.originalname).split(".");
			//给图片加上时间戳格式防止重名名
			//比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
			cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
		}
	});
	var upload = multer({
		storage: storage
	});

	app.post('/fileupload', upload.any(), function (req, res, next) {
		var arr = [];
		req.files.forEach(function (ele, idx) {
			arr.push(ele.filename)
		})
		var obj = Aresult('success', true, arr);

		res.send(JSON.stringify(obj));
	});

	app.post('/upload', function (req, res) {
		
		var target = {id:req.body.data.id};
		delete req.body.data.id;
		var data = req.body.data;
		console.log(data)
		update({
			sqlname: 'customer',
			data,
			target,
			callback: function(data){
				res.send(data);
			}
		})
	})

	
}