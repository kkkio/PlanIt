var mongoose = require('mongoose');

var activitySchema = mongoose.Schema({
	title : String,
	// host id
	_user_id : {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
	//a_date: Date,
	start_time: Date,
	end_time: Date,

	venue:{
		country : String,
		city : String
	},
	address: String,

	briefIntro: String,
	detailIntro: [String],
	url: String,
	pic: String,

	// rating
	rate: {type: Number, default: 0},
	rate_num : {type: Number, default: 0},
	// 0: all; 1: music  & art ; 2: Sports; 3: Tech; 4: Culture 5: Movies 6:Others
	category: Number,
	comment_num : Number,

	commentList: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}]
});

var activity = activitySchema;

// create indice for search
activity.index({
	title: 'text',
	briefIntro: 'text',
	detailIntro: 'text'
});
activity.index({
	'venue.country': 1,
	'venue.city': 1
});
// TODO: check index

//STATIC METHOD

// 1. take query 2.keywords are a list of keywords
activity.statics.searchBy = function searchBy (keywords, cat, callback){
	console.log(cat);
	if(cat == 0){
		this
		.find({$text: {$search: keywords}}, {score: {$meta: 'textScore'}})
		.sort({score:{$meta: "textScore"}})
		.populate('commentList')
		.exec(callback);
	}else{
		this
		.find({$text: {$search: keywords}}, {score: {$meta: 'textScore'}})
		.sort({score:{$meta: "textScore"}})
		.select({category : cat})
		.populate('commentList')
		.exec(callback);
	}

};

// NOT USED NOW
activity.statics.exactSearchBy = function exactSearchBy (keywords, callback){

	this
	.find({$text: {$search: keywords}})
	.exec(callback);
};
/*
activity.statics.searchByLocation = function searchBy (keywords, callback){
	this
	.find({$1 : {$search : keywords}})
	.exec(callback);
};
*/
activity.statics.viewByCat = function viewByCat(cat, callback){
	this
	.find({category: cat})
	.sort({rate : 1})
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

activity.methods.postComment = function postComment(id){
	return this.update(
    {
      $push: {"commentList": id},
      $inc: {"comment_num": 1}
    }
  ).exec();
};

activity.methods.deleteComment = function deleteComment(id){
  return this.update(
    {
      $pull: {"commentList": id},
      $inc: {"comment_num": -1}
    }
  ).exec();
};

module.exports = mongoose.model('activity', activitySchema);
