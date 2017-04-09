var express = require('express');
var router = express.Router();

/* GET login-homepage. */
router.get('/', isLoggedIn,function(req, res, next) {
  res.render('index', {
   });
});

router.get('/about', function(req,res,next){
  res.render('about',{
    isLogin : req.isAuthenticated()
  });
});

router.get('/contactus', function(req,res,next){
  res.render('contactus',{
    isLogin : req.isAuthenticated()
  });
});

// route middleware only for homepage
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.render('index_before_login',{

  });
}



module.exports = router;
