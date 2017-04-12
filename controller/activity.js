var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var Moment = require('../models/moment');
var Activity = require('../models/activity');
var mComment = require('../models/comment');
var Schedule = require('../models/schedule');
exports = module.exports = {};

// get searchby category
/*
exports.getSearchResults = function getSearchResults (req, res, next){
  console.log(req.query.cat);
  //var cat = Number(req.query.cat);
  Activity.searchBy(req.query.keyword,cat, function(err, docs){
    var results={
      user : req.user,
      activity : docs,
      isLogin: req.isAuthenticated()
    };
    res.render("explore_results",results);
  });
};
*/
// to display an activity
exports.getActivity =function getActivity(req, res, next){
  console.log(req.params.id);
  Activity.getOneById(req.params.id, function(err, doc){
    if(err) {
      res.status(404);
      res.end();
    }
    if(!doc){
      res.status(404);
      res.end();
    }
    var results={
      user : req.user,
      activity : doc,
      isLogin: req.isAuthenticated()
    };
    res.render("single_activity",results);
  });
};


exports.postComment = function postComment(req,res,next){
  if(!req.body.content) return res.render("single_activity",results);
  // add one comment & update comment list in activity & user
  console.log('GOOD IS NOT ', req.body.content);
  Activity.getOneById(req.body.activityId, function(err, doc){
    var date= new Date();
    if(err) throw(err);
    if(!doc){
      console.log('bad activityId');
      res.status(505).end();
    }
      // store an comment
      var data = {
        _activity_id : doc._id,
        _user_id : req.user._id,
        // type : acitivity - 1; moment - 2
        content: req.body.content,
        post_time: date,
        num_of_useful: 0,
        num_of_nonuseful: 0
      };
      var com = new mComment(data);
      com.save();
      console.log('com is',com);
      // update commentList
      doc.update({
        $push: {"commentList": com._id},
        $inc: {"comment_num": 1}
      }).exec();
      User.findById(req.user._id, function(err, user){
        user
        .update({
          $push: {"commentList": com._id},
          $inc: {"comment_num": 1}
        }).exec();
      });

      var results={
        user : req.user,
        activity : doc,
        isLogin: req.isAuthenticated()
      };
      // use send for ajax
      //res.render("single_activity",results);
      res.redirect('/activity/'+req.body.activityId);
    });
};

exports.deleteComment = function deleteComment(req, res, next){
  var id = req.body.commentId;
  mComment.findByIdAndRemove(id).exec();
};

// to rate an activity
exports.rateActivity =function rateActivity(req, res, next){
  console.log("in rateActivity: checking activityId "+ req.body.activityId);
  if(req.isAuthenticated()){
    Activity.getOneById(req.body.activityId, function(err, doc){
      if(!doc) return next();
      var tmprate = (doc.rate*doc.rate_num + req.body.rate)/(1+doc.rate_num);
      doc.rate = tmprate;
      doc.rate_num += 1;
      doc.save();
    });
    next();
  }
};

// next - get activity
exports.rateComment =function rateComment(req, res, next){
  if(req.isAuthenticated()){
    mComment.findById(req.body.commentId,function(err,doc){
      if(!doc) return res.redirect('/activity'+req.params.activityId);
      if(req.body.isUseful){
        doc.useful_num += 1;
      }else{
        doc.nonuseful_num += 1;
      }
      doc.save();
      return next();
    });
  }
};

// add to user's schedule
exports.addToSchedule = function addToSchedule(req,res,next){
  // new a schedule and the add to user
  Activity.getOneById(req.body.activityId,function(err, doc){
    var data = {
      _user_id : req.user._id,
      _activity_id : doc._id,
      title : doc.title,
      start_time : doc.start_time,
      end_time : doc.end_time,
      venue:{
        country : doc.venue.country,
        city : doc.venue.city
      },
      content : doc.intro,
      url : doc.url
    };
    var nSchedule = new Schedule(data);
    nSchedule.save();

    User.findById(req.user._id, function(err, doc){
      doc.update(
        {
          $push: {"scheduleList": id},
          $inc: {"schedule_num": 1}
        }
      ).exec();
    });

  });
};
