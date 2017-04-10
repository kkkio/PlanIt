var express = require('express');
var schedule = require('../models/schedule');
exports = module.exports = {};

exports.myschedule= function mymoment(req,res,next){
	var data[];
	data=Schedule.showMySchedule(req.user._id,function(doc){
		console.log("doc==");
		//console.log(doc);
		var test={
			user : req.user,
			schedule : doc,
			isLogin: req.isAuthenticated()
		};
		//console.log(test);
		// TODO: CHNAGE 	res.render('schedule',data);
		console.log("finish rendering data");
	});
};

exports.addMySchedule = function addMySchedule(req, res, next){
	var insert_data = {
		_user_id : req.user._id,
		title : req.body.title,
		venue:{
			country : req.body.country,
			city : req.body.city
		},
		content : req.body.conent,
	};
    var data=new Schedule(insert_data);
    data.save();
		User.findById(req.user._id, function(err, doc){
			doc.update(
				{
					$push: {"scheduleList": id},
					$inc: {"schedule_num": 1}
				}
			).exec();
		});
	res.redirect('/users/account/schedule');
};

exports.delete = function delete(req,res,next){
	var id=req.body.id;
    Schedule.findByIdAndRemove(id).exec();
		User.findById(req.user._id, function(err, doc){
			doc.update(
				{
					$pull: {"scheduleList": id},
					$inc: {"schedule_num": -1}
				}
			).exec();
		});
    res.redirect('/users/account/schedule');
};

exports.update_event = function update(req,res,next){
  var id = req.body.id;
  Schedule.findById(id, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
    doc.title  = req.body.title;
    doc.activity_id = req.body.activity_id;
    doc.date = req.body.date;
    doc.start_time = req.body.start_time;
    doc.end_time= req.body.end_time;
    doc.venue = req.body.venue;
    doc.privacy=req.body.privacy;
    doc.save();
  })
  res.redirect('/myschedule');
};

exports.get_friend_schedule = function get_other_sch(req,res,next){
  	var friend_id=req.params.id;
  //data[] data is the array of objects
	var data=Schedule.showFriendSchedule(friend_id);
    res.render('otherschedule',data);
};
