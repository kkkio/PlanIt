var mongoose = require('mongoose');

var activitySchema = mongoose.Schema({
	title : String,
	// host id
	_user_id : {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
	//a_date: Date,
	start_time: Date,
	end_time: Date,
	venue: {
		country : String,
		city : String
	},
	intro: String,
	url: String,
	//1: music concert; 2: movies; 3: art exibition; 4: others
	category: Number,
	comment_num : Number,
	// Can I save an array of rating and calculate the average rating?
	average_rating: Number,
	commentList: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}]
});

var activity = activitySchema;

// create indice for search
activity.index({
	title: 'text',
	intro: 'text'
});
// TODO: check index
/*
activity.index({
	country: 'location',
	city: 'location'
});
*/
//STATIC METHOD

// 1. take query 2.keywords are a list of keywords
activity.statics.searchBy = function searchBy (keywords, callback){
	this
	.find({$text: {$search: keywords}})
	.exec(callback);
};

// NOT USED NOW
activity.statics.exactSearchBy = function exactSearchBy (keywords, callback){
	this
	.find({$text: {$search: keywords}})
	.exec(callback);
};

activity.statics.searchByLocation = function searchBy (keywords, callback){
	this
	.find({$location: {$search: keywords}})
	.exec(callback);
};

activity.statics.viewByCat = function viewByCat(cat, callback){
	this
	.find({category: cat})
	.exec(callback);
}

// get an activity by id
activity.statics.getOneById = function getOneById(id, callback){
	this
	.findById(id)
	.populate('commentList')
	.exec(callback);
};

//INSTANCED METHOD

module.exports = mongoose.model('activity', activitySchema);
