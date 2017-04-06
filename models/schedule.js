var mongoose = require('mongoose');
var user=require('./individual');
var assert = require('mongoose-assert')('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var scheduleSchema = mongoose.Schema({
  user_id : Number,
  title : String,
  //activity info
  s_date : Date,
  start_time : Date,
  end_time : Date,
  venue : String,
  // privacy 1: public, 2:followers, 3: friends, 4: private
  privacy : Number,
  url : String,
  //activityList:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }]
});

// add an alias for define method
var schedule = scheduleSchema;
schedule.static.showMySchedule=function(userID){
  var query=this.find({user_id: userID});
  var s_schedule=[];
  for(var i=0;i<query.length;i++){
    s_schedule.push({
      s_id=query[i].id,
      s_title:query[i].title,
      s_date:query[i].date,
      s_start_time : query[i].start_time,
      s_end_time : query[i].end_time
    });
  }
  return s_schedule;
};
//TODO
schedule.static.showFriendSchedule=function(friend_id){

	var f_schedule=[];
  	var query=this.find({user_id:friend_id});
	// if friend else not friend
		if (true){
			for (var i=0;i<query.length;i++){
				if(query[i].privacy<4){
					f_schedule.push({
      					f_id=query[i].id,
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
      					f_id=query[i].id,
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

module.exports = mongoose.model('schedule', scheduleSchema);
