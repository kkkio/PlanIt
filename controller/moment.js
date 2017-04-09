var express = require('express');
var moment = require('../models/moment');
var User = require('../models/user');
exports = module.exports = {};

exports.mymoment=function mymoment(req,res,next){
	console.log("in my moment");

	moment.showMyMoment(req.user._id,function(doc){
		//console.log("in callback of mymoment");
		console.log("doc==");
		console.log(doc);
		var test={
			user : req.user,
			moment : doc,
			isLogin: req.isAuthenticated()
		};
		console.log(test);
		res.render('account', test);
		console.log("finish rendering data");
	});


};
//add moment
exports.addMoment = function addMoment(req,res,next){
	var date= new Date();

	var insert_data={
    	title :  	req.body.title,
      	_user_id :	req.user._id,
    	date :	   	date,
    	location : 	req.body.location,
    	pic : 		req.body.pic,
     	text : 		req.body.text,
    	privacy : 	req.body.privacy
    };
    var data=new moment(insert_data);
		data.save();
		User.findById(req.user._id,function(err, user){
			user.postMoment(data._id);
		});
		res.redirect('/users/account');
};

exports.deleteMoment = function deletemoment(req,res,next){
	console.log("in delete Moment");
	var id=req.query.momentid; // TODO: can be change
	console.log(id);
    moment.findByIdAndRemove(id).exec();
		User.findById(req.user._id,function(err, user){
			user.deleteMoment(data._id);
		});
};

exports.updateMoment = function updatemoment(req,res,next){
	console.log("in updateMoment");
	var id = req.body.momentId;
  	moment.findById(id, function(err, doc) {
    if (err) {
      	console.error('error, no entry found');
    }
		if (!doc){
			console.error('error, no entry found');
		}
	else{
		doc.title  = req.body.title;
		doc.text = req.body.text;
		doc.save();
	}
	res.redirect('/users/account');
});
};

exports.friendMoment = function friendmoment(req,res,next){
	var friend_id=req.params.id;
	var data=moment.showFriendMoment(friend_id);
};
