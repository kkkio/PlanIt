var mongoose = require('mongoose');


var commentSchema = mongoose.Schema({
	_activity_id : {type: mongoose.Schema.Types.ObjectId, ref: 'activity'},
	_user_id : {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
	// type : acitivity - 1; moment - 2
	content: String,
	post_time: Date,
	num_of_useful: Number,
	num_of_nonuseful: Number
});

module.exports = mongoose.model('comment', commentSchema);
