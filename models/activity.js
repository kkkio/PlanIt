var mongoose = require('mongoose');

var activitySchema = mongoose.Schema({
	activity_name : String,
	_user_id : mongoose.Schema.Types.ObjectId,
	//a_date: Date,
	start_time: Date,
	end_time: Date,
	venue: Date,
	intro: String,
	url: String,
	//1: music concert; 2: movies; 3: art exibition; 4: others
	category: Number,
	comment_num : Number,
	// Can I save an array of rating and calculate the average rating?
	average_rating: Number,
	commentsList: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}]
});

var acitivity = activitySchema;
//STATIC METHOD
activity.statics.search = function search (keyword){
	
	/*
	var query=this.find({"activity_name":{$regex: keyword, $options: 'i'}});
	var activity[];
	for (var i=0;i<query.length;i++){
			activity.push({
      			a_name : query[i].activity_name,
      			a_host_id : query[i]._user_id,
				a_data : query[i].a_data,
      			a_start_time : query[i].start_time,
      			a_end_time : query[i].end_time,
				a_venue : query[i].venue,
				a_intro : query[i].intro,
				a_url : query[i].url,
				a_average_rating : query[i].average_rating,
				a_comments[] : query[i].comments
    		});
	return activity;
	*/
};


// get an activity by id
activity.statics.getOneById = function getOneById(id, callback){
	this
	.findById(id)
	.populate('commentList')
	.exec(callback);
};

//INSTANCED METHOD
activity.methods.

module.exports = mongoose.model('activity', activitySchema);
