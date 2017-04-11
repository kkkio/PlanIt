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
