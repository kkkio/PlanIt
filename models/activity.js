
var mongoose = require('mongoose');

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


var activity = activitySchema;
//STATIC METHOD
activity.static.search=function(keyword){
	var query=this.find({"activity_name":{$regex: keyword, $options: 'i'}});
	var activity=[];
	for (var i=0;i<query.length;i++){
			activity.push({
      			a_name : query[i].activity_name,
      			a_host_id : query[i].host_id,
				a_data : query[i].a_data,
      			a_start_time : query[i].start_time,
      			a_end_time : query[i].end_time,
				a_venue : query[i].venue,
				a_intro : query[i].intro,
				a_url : query[i].url,
				a_average_rating : query[i].average_rating,
				a_comments : query[i].comments
    		});
	}
	return activity;

};
//INSTANCED METHOD

module.exports = mongoose.model('activity', activitySchema);



