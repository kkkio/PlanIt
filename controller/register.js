var express = require('express');
var passport = require('passport');
exports = module.exports = {};

// route middleware to make sure register form
exports.isCompleted = function isCompleted(req, res, next){
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password_confirmation = req.body.password_confirmation;

  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password_confirmation', 'Passwords do not match').equals(req.body.password);


  var errors = req.validationErrors();

  if(errors){
    console.log(errors);
    res.render('register', {
      message: req.flash('signupMessage'),
      errors: errors
    });
  } else {
    console.log('PASSED');
    return next();
  }
};

exports.redirect = passport.authenticate('local-signup', {
  successRedirect : '/users/profile',
  failureRedirect : '/users/register',
  failureFlash : true
});

exports.getregpage = function getregpage (req, res, next) {
  res.render('register', {
    message: req.flash('signupMessage'),
    errors: req.validationErrors()
  });
};
