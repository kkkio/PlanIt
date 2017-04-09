var express = require('express');
var passport = require('passport');
exports = module.exports = {};

exports.logget=function loginget(req,res,next){
	if(req.isAuthenticated()) return res.redirect('/users/account');
	res.render('login', {
    	message: req.flash('loginMessage')
  	});
};

exports.logpost= function redirect(req, res, next){
   passport.authenticate('local-login', function(err, user, info){
		 if(err) return next(err);
		 if(!user) return res.redirect('/login');
		 req.logIn(user, function(err){
			 if(err) return next(err);
			 return res.redirect('/users/'+user._id);
		 });
	 }) (req, res, next);
};
/*
passport.authenticate('local-login', {
  successRedirect: '/users/account',
  failureRedirect: '/users/login',
  failureFlash: true
});
*/
