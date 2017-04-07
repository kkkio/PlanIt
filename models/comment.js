var mongoose = require('mongoose');


var commentSchema = mongoose.Schema({
	_activity_id : mongoose.Schema.Types.ObjectId,
	_user_id : mongoose.Schema.Types.ObjectId,
	content: String,
	post_date: Date,
	post_time: Date,
	num_of_useful: Number,
	num_of_nonuseful: Number
});

module.exports = mongoose.model('comment', commentSchema);
