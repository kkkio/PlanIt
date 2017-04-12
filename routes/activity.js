/*var express = require('express');
var router = express.Router();
var passport = require('passport');
var activity=require('../models/activity');
//Individual user view the activities
//explore
router.get('/',function(req,res,next){
	//need view file activity or explore
	res.render('activity');
});
//The search page under the explore
router.get('/search',function(req,res,next){
	//keyword is what to search

	res.render('search');
});
//The recommendation page and catagory page under the explore
router.get('/recommendation',function(req,res,next){
	//recommendation routers.
});
//The result page for paticular keyword
router.get('/result/keyword=:keyword',function(req,res,next){
	var keyword=req.params.keyword;
	var activities[]=activity.search(keyword);//activities is the array of the activities found
	res.render('result',activities);//result is view file.(name maybe change)
});
*/
var express = require('express');
var router = express.Router();
var activity = require('../controller/activity');

router.get('/',function(req, res, next){
  res.redirect('/explore');
});

router.get('/single',function(req,res,next){
  res.redirect('/activity');
});

router.post('/postComment',activity.rateActivity,activity.postComment);

router.post('/rateComment',activity.rateComment,activity.postComment);

router.get('/:id',activity.getActivity);

// route middleware only for homepage
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
  return next();
}

module.exports = router;



//Host to post the activities
