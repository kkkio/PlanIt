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
  res.render('explore_search', {
    isLogin: req.isAuthenticated(),
    user : req.user
   });
});

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
  res.render('explore', {
    isLogin: req.isAuthenticated(),
    user : req.user
   });

}


module.exports = router;
