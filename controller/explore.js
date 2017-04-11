var express = require('express');
var Activity = require('../models/activity');
var User = require('../models/user');

exports = module.exports = {};

exports.getSearchResults = function getSearchResults (req, res, next){
  console.log(req.query);
  if(req.query.keyword){
    Activity.searchBy(req.query.keyword, function(err, docs){
      var results={
        user : req.user,
        activity : docs,
        isLogin: req.isAuthenticated()
      };
      res.render("explore_search",results);
    });
  }
  else{
    var results={
      user : req.user,
      activity : null,
      isLogin: req.isAuthenticated()
    };
    res.render("explore_search",results);
  }
};
