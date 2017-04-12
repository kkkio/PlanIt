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

router.post('/rateComment/',activity.rateComment);

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
