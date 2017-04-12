var mongoose = require('mongoose');


var commentSchema = mongoose.Schema({
	_activity_id : {type: mongoose.Schema.Types.ObjectId, ref: 'activity'},
	_moment_id : {type: mongoose.Schema.Types.ObjectId, ref: 'moment'},
	_user_id : {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
	// type : acitivity - 1; moment - 2
	content: String,
	post_time: Date,
	useful_num: Number,
	nonuseful_num: Number
});

module.exports = mongoose.model('comment', commentSchema);
