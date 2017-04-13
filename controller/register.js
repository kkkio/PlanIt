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
  //req.checkBody('username', 'Username is not valid').isValidUsername();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password_confirmation', 'Passwords do not match').equals(req.body.password);


  req.getValidationResult().then(function(result){
    var errors = result.array();
    console.log(errors);
    if(errors.length){
      console.log(errors);
      res.render('register', {
        //message: req.flash('signupMessage'),
        errors: errors
      });
    } else {
      console.log('PASSED validation');
      return next();
    }

  });
};

exports.redirect = passport.authenticate('local-signup', {
  successRedirect: '/users/account',
  failureRedirect: '/users/register',
  failureFlash: true
});
/*function redirect(req, res, next){
  passport.authenticate('local-signup', function(err, user, info){
    if(err) return next(err);
    if(!user) return res.redirect('/register');
    req.logIn(user, function(err){
      if(err) return next(err);
      return res.redirect('/users/'+user._id);
    });
  }) (req, res, next);
};
*/

exports.getregpage = function getregpage (req, res, next) {
  var signupMessage = req.flash('signupMessage');
  var errors;
  if(signupMessage.length>0){
    errors = new Array();
    errors.push({
      param: "signupMessage",
      msg: signupMessage,
      value: "N/A"
    });
  }
  res.render('register', {
    //message: req.flash('signupMessage'),
    errors: errors
  });
};
