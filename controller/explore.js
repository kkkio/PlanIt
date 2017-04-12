var express = require('express');
var Activity = require('../models/activity');
var User = require('../models/user');

exports = module.exports = {};

exports.categor = category = ['all','music','sports','tech','culture','movies','others','recommendation'];


exports.checker = function checker(req, res, next){
  if(req.params.cat == 'search'|| req.params.cat == 'recommendation') return next();
  var cat;
  for(cat = category.length-1; cat > 0; cat--){
    if(req.params.cat == category[cat])
      return next();
  }
  res.status(404).end();
}

// get all results - recommendation and search
exports.getResults = function getResults (req, res, next){
  // if there is a query
  if(req.query){
    return getSearchResults(req,res,next);
  }else{
    var cat;
    for(cat = category.length-1; cat > 0; cat--){
      if(req.params.cat == category[cat])
        break;
    }
    // view by greatest of the cat!
    Activity.viewByCat(cat,function(err, docs){
      if(docs){
        var results={
          user : req.user,
          activity : docs,
          keyword : req.query.keyword, // can be buggy
          isLogin: req.isAuthenticated()
        };
        console.log('how many data: ' + docs.length);
        res.render("explore_search",results);
      }
    })
  }
};

// get search results by category
exports.getSearchResults = function getSearchResults(req,res,next){
  var cat;
  //if(req.params.cat == 'all') cat = 0;
  for(cat = category.length-1; cat > 0; cat--){
    if(req.params.cat == category[cat])
      break;
  }
  if(req.query.keyword){
    Activity.searchBy(req.query.keyword, cat, function(err, docs){
      if(docs){
        var results={
          user : req.user,
          activity : docs,
          keyword : req.query.keyword,
          isLogin: req.isAuthenticated()
        };
        console.log('how many data: ' + docs.length);
        res.render("explore_search",results);
      }else {
        var results={
          user : req.user,
          activity : null,
          keyword : req.query.keyword,
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
      keyword : req.query.keyword,
      isLogin: req.isAuthenticated()
    };
    res.render("explore_search",results);
  }
}
