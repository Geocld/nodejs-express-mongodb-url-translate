var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var config = require('./config');
var Url = require('./models/url')
var base58 = require('./base58.js')

var app = express();

//连接到数据库
mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);

//静态资源
app.use(express.static(path.join(__dirname, 'assets')));

//body解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
	//主页请求
	res.sendFile(path.join(__dirname, 'views/index.html'))
});

//作为ajax的POST请求,并返回响应
app.post('/api/shorten', function(req, res) {
	var longUrl = req.body.url;
	var shortUrl = '';

	Url.findOne({long_url: longUrl}, function (err, doc) {
		if (doc) {
			//链接已经被压缩
			shortUrl = config.webhost + base58.encode(doc._id);

			//send方法向浏览器返回一个对象
			res.send({'shortUrl': shortUrl});
		}
		else {
			//链接未经处理，需要在这里进行压缩并保存
			var newUrl = Url({
				long_url: longUrl
			});

			newUrl.save(function(err) {
				if (err) {
					console.log(err);
				}
				shortUrl = config.webhost + base58.encode(newUrl._id);
				res.send({'shortUrl': shortUrl});
			});
		}
	});
});

//采用express模式匹配，捕获encoded_id的值，最后作为req.params.encoded_id的值
app.get('/:encoded_id', function(req, res) {
	var base58Id = req.params.encoded_id;
	var id = base58.decode(base58Id);
	//查找id
	Url.findOne({_id: id}, function (err, doc) {
		if (doc) {
			res.redirect(doc.long_url);
		}
		else {
			res.redirect(config.webhost);
		}
	})
});

var server = app.listen(3000, function() {
	console.log('Server listen on post 3000');
});