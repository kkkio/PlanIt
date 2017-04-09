var express = require('express');
var moment = require('../models/moment');
exports = module.exports = {};

exports.mymoment=function mymoment(req,res,next){
	var data=[];
	console.log("in my moment");
	console.log(req.user._id);
	
	moment.showMyMoment(req.user._id,function(doc){
		//console.log("in callback of mymoment");
		console.log("doc==");
		console.log(doc);
		res.render('account', {
			user : req.user,
			data : doc
		});	
		console.log("finish rendering data");
	});

	
};
//add moment
exports.addMoment = function addmoment(req,res,next){
	var insert_data={
    	title :  	req.body.title,
      _user_id :	req.user._id,
    	date :	   	req.body.date,
    	post_time :	req.body.post_time,
    	location : 	req.body.location,
    	pic : 		req.body.pic,
      text : 		req.body.text,
    	privacy : 	req.body.privacy
    };
    var data=new moment(insert_data);
    data.save();
};

exports.deleteMoment = function deletemoment(req,res,next){
	var id=req.body.id;
    Schedule.findByIdAndRemove(id).exec();
};

exports.updateMoment = function updatemoment(req,res,next){
	var id = req.body.id;
  	moment.findById(id, function(err, doc) {
    if (err) {
      	console.error('error, no entry found');
    }
	else{
		doc.title  = req.body.title;
		doc.text = req.body.text;
		doc.save();
	}
});
};

exports.friendMoment = function friendmoment(req,res,next){
	var friend_id=req.params.id;
	var data=moment.showFriendMoment(friend_id);
};
