var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var assert = require('mongoose-assert')('mongoose');
var autoIncrement = require('mongoose-auto-increment');
mongoose.connect('mongodb://localhost/3100');

var commentSchema = mongoose.Schema({
	activity_id : Number,
	user_id : Number,
	comment_text: String,
	post_date: Date,
	post_time: Date,
	num_of_useful: Number,
	num_of_nonuseful: Number
});