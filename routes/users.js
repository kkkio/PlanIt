var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* GET users listing. */
/* GET users page. */
router.get('/', function(req, res, next) {
  res.render('users', {
    title: 'UsersApp',
    projectname: 'PlanIt'
  });
});

/* GET user login page. */
router.get('/login', function(req, res, next) {
  res.render('login', {
    title: 'UsersApp',
    projectname: 'PlanIt'
  });
});

/* GET user register page. */
router.get('/register', function(req, res, next) {
  var errors;
  res.render('register', {
    title: 'UsersApp',
    projectname: 'PlanIt',
    errors:errors
  });
});

/* POST user register page. */
router.post('/register', function(req, res, next) {
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
      title: 'UsersApp',
      projectname: 'PlanIt',
      errors:errors
    });
  } else {
    console.log('PASSED');

    var newUser = new User({
      name: name,
      email:email,
      username: username,
      password: password
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
      console.log(user);
    });

    req.flash('success_msg', 'You are registered and can now login');

    res.redirect('/users/login');
  }
});

module.exports = router;
