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
router.get('/explore/sports',isLoggedIn,function(req,res,next){
	res.render('explore_sports');
});
router.get('/explore/tech',isLoggedIn,function(req,res,next){
	res.render('explore_tech');
});
router.get('/explore/movies',isLoggedIn,function(req,res,next){
	res.render('explore_movies');
});
router.get('/explore/other',isLoggedIn,function(req,res,next){
	res.render('explore_other');
});
router.get('/explore/Culture',isLoggedIn,function(req,res,next){
	res.render('explore_Culture');
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
