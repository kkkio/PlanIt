var express = require('express');
var schedule = require('../models/schedule');
exports = module.exports = {};

exports.myschedule= function mymoment(req,res,next){
	var data[];
	data=Schedule.showMySchedule(req.cookies.u_id);
	res.render('myschedule',data);
};

exports.insert_our_activity = function insert1(req, res, next){
	  var insert_data={
    	user_id :req.cookie.u_id,
    	title: req.body.title,
    	activity_id: req.body.activity_id,
    	date:	   req.body.s_date,
    	start_time: req.body.start_time,
    	end_time: req.body.end_time ,
    	venue: req.body.venue,
    	privacy: req.body.privacy
    };
    var data=new Schedule(insert_data);
    data.save();
	res.redirect('/myschedule');
};

exports.insert_own_activity = function insert2(req, res, next){
	  var insert_data={
    //TODO the u_id is invalid now.need to set.
    	user_id :req.cookie.u_id,
    	title: req.body.title,
    	activity_id: -1,
    	date:	   req.body.s_date,
    	start_time: req.body.start_time,
    	end_time: req.body.end_time ,
    	venue: req.body.venue,
    	privacy: req.body.privacy
    };
  var data=new Schedule(insert_data);
  data.save();
  res.redirect('/myschedule');
};

exports.delete = function delete(req,res,next){
	var id=req.body.id;
    Schedule.findByIdAndRemove(id).exec();
    res.redirect('/myschedule');
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










