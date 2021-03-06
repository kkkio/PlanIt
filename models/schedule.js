var mongoose = require('mongoose');
var user=require('./user');


var scheduleSchema = mongoose.Schema({
  _user_id : {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  _activity_id: {type: mongoose.Schema.Types.ObjectId, ref: 'activity'},
  title : String,
  //activity info
  //s_date : Date,
  start_time : Date,
  end_time : Date,
  venue: {
		country : String,
		city : String
	},
  content : String,
  // privacy 1: public, 2:followers, 3: friends, 4: private
  privacy : {type: Number, default : 1},
  url : String
  //activityList:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }]
});

var schedule = scheduleSchema;

schedule.statics.getOneById = function getOneById(id, callback){
	this
	.findById(id)
	.populate('_user_id','_activity_id')
	.exec(callback);
};

// add an alias for define method
var schedule = scheduleSchema;
schedule.statics.showMySchedule=function(userID,callback){
	console.log("what is the userID");
	console.log(userID);
  	this.find({_user_id: userID}).exec(function(err,doc){
  		if (err){
			console.err("error");
		}
		else{
			console.log("finish in find");
			return callback(doc);
		}

  });
};
/*
//TODO
schedule.statics.showFriendSchedule=function(friend_id){
	var f_schedule=[];
  //TODO test if the function is asynchronous
  	var query=this.find({user_id:friend_id});
	// if friend else not friend
		if (true){
			for (var i=0;i<query.length;i++){
				if(query[i].privacy<4){
					f_schedule.push({
      					f_id=query[i]._id,
      					f_title:query[i].title,
      					f_date:query[i].date,
      					f_start_time : query[i].start_time,
      					f_end_time : query[i].end_time
    				});
				}
			}
		}
		else{
			for (var i=0;i<query.length;i++){
				if(query[i].privacy<3){
					f_schedule.push({
      					f_id=query[i]._id,
      					f_title:query[i].title,
      					f_date:query[i].date,
      					f_start_time : query[i].start_time,
      					f_end_time : query[i].end_time
    				});
				}
			}
		}
	return f_schedule;
};
//INSTANCE METHODS
*/
module.exports = mongoose.model('schedule', scheduleSchema);
