var express = require('express');
var router = express.Router();


/* GET login-homepage. */
router.get('/', isLoggedIn,function(req, res, next) {
  res.render('index', {
   });
});

router.get('/about', function(req,res,next){
  res.render('about');
});

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.render('index_before_login',{

  });
}



module.exports = router;
