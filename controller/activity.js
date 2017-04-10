var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var Moment = require('../models/moment');
var Activity = require('../models/acitivity');
var mComment = require('../models/comment');
var Schedule = require('../models/schedule');
exports = module.exports = {};

exports.getSearchResults = function getSearchResults (req, res, next){
  Activity.searchBy(req.query.text, function(err, docs){
    var results={
      user : req.user,
      activity : docs,
      isLogin: req.isAuthenticated()
    };
    res.render("explore_results",results);
  });
};

// to display an activity
exports.getActivity =function getActivity(req, res, next){
  Activity.getOneById(req.body.activityId, function(err, doc){
    var results={
      user : req.user,
      activity : doc,
      isLogin: req.isAuthenticated()
    };
    res.render("single_activity",results);
  });
};

exports.postComment = function postComment(req,res,next){
  // add one comment & update comment list in activity & user
  Activity.getOneById(req.body.activityId, function(err, doc){
      // store an comment
      var data = {
        _activity_id : doc._id,
        _user_id : doc._user_id,
        // type : acitivity - 1; moment - 2
        content: comment,
        post_time: Date.now,
        num_of_useful: 0,
        num_of_nonuseful: 0
      };
      var com = new mComment(data);
      com.save();
      // update commentList
      doc.update({
        $push: {"commentList": com._id},
        $inc: {"comment_num": 1}
      }).exec();
      User.findById(doc._user_id, function(err, user){
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
      res.render("single_activity",results);
    });
};

exports.deleteComment = function deleteComment(req, res, next){
  var id = req.body.commentId;
  mComment.findByIdAndRemove(id).exec();
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
