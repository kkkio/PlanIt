
var mongoose = require('mongoose');
var assert = require('mongoose-assert')('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var activitySchema = mongoose.Schema({
	activity_name : String,
	host_id : Number,
	a_date: Date,
	start_time: Date,
	end_time: Date,
	venue: Date,
	intro: String,
	url: String,
	//1: music concert; 2: movies; 3: art exibition; 4: others
	category: Number,
	// Can I save an array of rating and calculate the average rating?
	average_rating: Number,
	comments: {type: String, ref: 'comment'}
});
