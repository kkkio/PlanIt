var express = require('express');
var moment = require('../models/moment');
exports = module.exports = {};

exports.mymoment=function mymoment(req,res,next){
	var data=[];
	data=moment.showMyMoment(req.user._id);
    return data;
};
//add moment
exports.amoment = function addmoment(req,res,next){
	var insert_data={
    	title :  	req.body.title,
      	user_id :	req.user._id,
    	date :	   	req.body.date,
    	post_time :	req.body.post_time,
    	location : 	req.body.location,
    	pic : 		req.body.pic,
      	text : 		req.body.text,
    	privacy : 	req.body.privacy
    };
    var data=new Schedule(insert_data);
    data.save();
};

exports.dmoment = function deletemoment(req,res,next){
	var id=req.user.id;
    Schedule.findByIdAndRemove(id).exec();
};

exports.umoment = function updatemoment(req,res,next){
	var id = req.user._id;
  	moment.findById(id, function(err, doc) {
    if (err) {
      	console.error('error, no entry found');
    }
	else{
		doc.title  = req.body.title;
		doc.text=req.body.text;
		doc.save();
	}
  })
};

exports.fmoment = function friendmoment(req,res,next){
	var friend_id=req.params.id;
	var data=moment.showFriendMoment(friend_id);
    res.render('othersmoment',data);
};
