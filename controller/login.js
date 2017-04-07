var express = require('express');
var passport = require('passport');
exports = module.exports = {};

exports.logget=function loginget(req,res,next){
	res.render('login', {
    	message: req.flash('loginMessage')
  	});

};
exports.logpost=passport.authenticate('local-login', {
  successRedirect: '/users/account',
  failureRedirect: '/users/login',
  failureFlash: true
});
