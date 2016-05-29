var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CounterSchema = Schema({
	_id: {type: String, require: true},
	seq: {type: Number, default: 0}
});

//将CounterSchema模型化
var counter = mongoose.model('counter',CounterSchema);

var urlSchema = new Schema({
	_id: {type: Number, index: true},
	long_url: String,
	created_at: Date
});

//使用pre('save', callback)中间件
//中间件的理解？
urlSchema.pre('save', function(next) {
	var doc = this;

	counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1}}, function(error, counter) {
		if (error) {
			return next(error);
		}
		doc._id = counter.seq;
		doc.created_at = new Date();
		next();
	});
});

//将urlSchema模型化
var Url = mongoose.model('Url', urlSchema);

module.exports = Url;