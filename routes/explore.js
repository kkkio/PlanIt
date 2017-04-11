var express = require('express');
var router = express.Router();

/* GET login-homepage. */
router.get('/', isLoggedIn,function(req, res, next) {
  res.render('explore', {
    isLogin: req.isAuthenticated(),
    user : req.user
   });
});

router.get('/search', isLoggedIn,function(req, res, next) {
  res.render('Explore_search', {
    isLogin: req.isAuthenticated(),
    user : req.user
   });
});
//for lilili test easy router search navBar
router.get('/sports',isLoggedIn,function(req,res,next){
	res.render('explore_sports');
});
router.get('/tech',isLoggedIn,function(req,res,next){
	res.render('explore_tech');
});
router.get('/movies',isLoggedIn,function(req,res,next){
	res.render('explore_movies');
});
router.get('/other',isLoggedIn,function(req,res,next){
	res.render('explore_other');
});
router.get('/Culture',isLoggedIn,function(req,res,next){
	res.render('explore_Culture');
});
router.get('/music',isLoggedIn,function(req,res,next){
	res.render('explore_music');
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
