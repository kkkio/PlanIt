var express = require('express');
var Activity = require('../models/activity');
var User = require('../models/user');

exports = module.exports = {};

exports.getSearchResults = function getSearchResults (req, res, next){
  console.log(req.query);
  console.log(req.query.cat);
  if(req.query.keyword){
    Activity.searchBy(req.query.keyword, Number(req.query.cat), function(err, docs){
      if(docs){
        var results={
          user : req.user,
          activity : docs,
          isLogin: req.isAuthenticated()
        };
        console.log('how many data: ' + docs.length);
        res.render("explore_search",results);
      }else {
        var results={
          user : req.user,
          activity : null,
          isLogin: req.isAuthenticated()
        };
        res.render("explore_search",results);
      }
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
