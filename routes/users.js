var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* GET users listing. */
/* GET users page. */
router.get('/', function(req, res, next) {
  res.render('users', {
    title: 'PlanIt Users',
    projectname: 'PlanIt'
  });
});

/* GET user login page. */
router.get('/login', function(req, res, next) {
  res.render('login', {
    title: 'PlanIt Login',
    projectname: 'PlanIt',
    message: req.flash('loginMessage')
  });
});

/* POST user login page. */
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/users/profile',
  failureRedirect: '/users/login',
  failureFlash: true
}),function(req, res, next){
  res.redirect('/');
});

/* GET user register page. */
router.get('/register', function(req, res, next) {
  var errors;
  res.render('register', {
    title: 'PlanIt Register',
    projectname: 'PlanIt',
    message: req.flash('signupMessage'),
    errors: errors
  });
});

/* POST user register page. */
router.post('/register',isCompleted, passport.authenticate('local-signup', {
  successRedirect : '/users/profile',
  failureRedirect : '/users/register',
  failureFlash : true
}));

router.get('/profile',isLoggedIn,function(req, res, next){
  res.render('profile', {
    title: 'PlanIt Login',
    projectname: 'PlanIt',
    user: req.user
  });
});

router.get('/logout',isLoggedIn,function(req, res, next){
  req.logout();
  res.redirect('/');
});




// route middleware to make sure register form
function isCompleted(req, res, next){
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  req.checkBody('name', 'Name is requeired').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);


  var errors = req.validationErrors();

  if(errors){
    console.log(errors);
    res.render('register',{
      title: 'PlanIt Register',
      projectname: 'PlanIt',
      errors:errors
    });
  } else {
    console.log('PASSED');
    return next();
  }

}

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

module.exports = router;
