var express = require('express');
var router = express.Router();

/* CONTROLLER */
var register = require('../controller/register');
var account = require('../controller/account');
var login=require('../controller/login');
var moment=require('../controller/moment');
var schedule=require('../controller/schedule');
var explore = require('../controller/explore');

/* GET login-homepage. */
router.get('/', isLoggedIn,function(req, res, next) {
  res.render('explore', {
    isLogin: req.isAuthenticated(),
    user : req.user
   });
});

router.get('/search', isLoggedIn,explore.getSearchResults);
//for lilili test easy router search navBar
router.get('/sports',isLoggedIn,function(req,res,next){
	res.render('explore_sports',{
		user : req.user,
      	activity : null,
      	isLogin: req.isAuthenticated()
	});
});
router.get('/tech',isLoggedIn,function(req,res,next){
	res.render('explore_tech',{
		user : req.user,
      	activity : null,
      	isLogin: req.isAuthenticated()
	});
});
router.get('/movies',isLoggedIn,function(req,res,next){
	res.render('explore_movies',{
		user : req.user,
      	activity : null,
      	isLogin: req.isAuthenticated()
	});
});
router.get('/other',isLoggedIn,function(req,res,next){
	res.render('explore_others',{
		user : req.user,
      	activity : null,
      	isLogin: req.isAuthenticated()
	});
});
router.get('/Culture',isLoggedIn,function(req,res,next){
	res.render('explore_culture',{
		user : req.user,
      	activity : null,
      	isLogin: req.isAuthenticated()
	});
});
router.get('/music',isLoggedIn,function(req,res,next){
	res.render('explore_music',{
		user : req.user,
      	activity : null,
      	isLogin: req.isAuthenticated()
	});
});


// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
  return next();

}


module.exports = router;
