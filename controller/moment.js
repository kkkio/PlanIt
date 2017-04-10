var express = require('express');
var moment = require('../models/moment');
var User = require('../models/user');
var mComment = require('../models/comment');
exports = module.exports = {};

exports.mymoment=function mymoment(req,res,next){
	console.log("in my moment");

	moment.showMyMoment(req.user._id,function(doc){
		//console.log("in callback of mymoment");

		console.log("doc==");

		//console.log(doc);
		var test={
			user : req.user,
			moment : doc,
			isLogin: req.isAuthenticated()
		};
		//console.log(test);
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
     	text : 		req.body.momentText,
    	privacy : 	req.body.privacy
    };
    var data=new moment(insert_data);
		var newPath = __dirname + "/upload/images/" + req.user._id+"/moment"+data._id;
		console.log(req.files.momentImage);
		if(req.files.momentImage){
			fs.readFile(req.files.momentImage.path, function(err,data){
				fs.writeFile(newPath,data,function(err){
					if(err) throw(err);
				})
			});
		}
		data.pic = newPath;
		data.save();
		User.findById(req.user._id,function(err, user){
			user.postMoment(data._id);
		});
		res.redirect('/users/account');
};

exports.deleteMoment = function deletemoment(req,res,next){
	console.log("in delete Moment");
	var id=req.body.momentId; // TODO: can be change
	console.log("momentId", id);
	moment.findById(id, function(err,doc){
		var path = doc.pic;
		if(path){
			fs.stat(path,function(err, stats){
				if(err) throw(err);
				fs.unlink(path,function(err){
					if(err) throw(err);
					console.log('file deleted successfully');
				})
			});

		}
		moment.findByIdAndRemove(id).exec();
	});
	User.findById(req.user._id,function(err, user){
		user.deleteMoment(req.body.momentId);
		console.log('delete moment from user done.');
	});
	res.redirect('/users/account');
};

exports.updateMoment = function updatemoment(req,res,next){
	console.log("in updateMoment");
	var id = req.body.momentId;
  	moment.findById(req.body.momentId, function(err, doc) {
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

exports.likeMoment = function likeMoment(req,res,next){
	moment.findById(req.body.momentId, function(err, doc){
		if(err){
			throw(err);
		}
		if(!doc){
			console.error('error, no entry found');
		}
		if(doc.isLikeBy(req.user._id)){
			doc.update({
				$inc : {"like": 1}
			}).exec();
		}else{
			doc.update({
				$inc : {"like": -1}
			}).exec();
		}
	});
}
exports.postComment = function postComment(req,res,next){
  // add one comment & update comment list in activity & user
  moment.findById(req.body.momentId, function(err, doc){
      // store an comment
      var data = {
        _moment_id : doc._id,
        _user_id : doc._user_id,
        // type : acitivity - 1; moment - 2
        content: comment,
        post_time: Date.now,
        num_of_useful: 0,
        num_of_nonuseful: 0
      };
      var com = new mComment(data);
      com.save();
      // update commentList of moment
			doc.postComment(id);
      User.findById(doc._user_id, function(err, user){
        user
        .update({
          $push: {"commentList": com._id},
          $inc: {"comment_num": 1}
        }).exec();
      });

			res.redirect('/users/account');
    });
};

exports.deleteComment = function deleteComment(req, res, next){
  var id = req.body.commentId;
  mComment.findByIdAndRemove(id).exec();
	moment.findById(req.body.momentId,function(err, doc){
		doc.deleteComment(id);
	});
};



exports.friendMoment = function friendmoment(req,res,next){
	var friend_id=req.params.id;
	var data=moment.showFriendMoment(friend_id);
};
