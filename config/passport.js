var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');

  module.exports = function (passport, config) {

  	passport.serializeUser(function(user, done) {
  		done(null, user.id);
  	});

  	passport.deserializeUser(function(id, done) {
  		User.findOne({ _id: id }, function (err, user) {
  			done(err, user);
  		});
  	});


    passport.use('local-signup',new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, username, password, done) {
      User.findByEmail(req.body.email, function(err,user){
        if(err) return done(err);
        // if already taken
        if(user) return done(null,false,req.flash('signupMessage','Email has been taken'));
        if(!user){
          User.findByName(req.body.username, function(err,user){
            if(err) return done(err);
            if(user) return done(null,false,req.flash('signupMessage','Username has been taken'));
            // no user found
            if(!user){
              User.create({
                email: req.body.email,
                username: req.body.username,
                password: User.generateHash(req.body.password)
              },function(err,user){
                if(err) return done(err);
                return done(null, user);
              });
            }
          });
        }
      });

    }));

    	passport.use('local-login',new LocalStrategy({
  		usernameField: 'username',
  		passwordField: 'password',
      passReqToCallback: true
      },
      function(req, username, password, done) {
        // check valid user and pwd
        // first find by name or email
        console.log('in passport local-login');
        req.checkBody('username').isEmail();
        var error = req.validationErrors();
        if(error){
          User.findByName(username,function(err,user){
            if(err) { return done(err); }
            // use req.flash to store flashdata into session for display
            // if not found by name
            if(!user) {
              return done(null,false,req.flash('loginMessage', 'User not found'));
            }
            if(!user.checkVaildPassword(password)){
              return done(null,false,req.flash('loginMessage', 'Incorrect Password'));
            }
            return done(null,user);
          });
        }
        else{
          User.findByEmail(username,function(err,user){
            if(err) { return done(err); }
            // use req.flash to store flashdata into session for display
            // if not found by name
            if(!user) {
              return done(null,false,req.flash('loginMessage', 'User not found'));
            }
            if(!user.checkVaildPassword(password)){
              return done(null,false,req.flash('loginMessage', 'Incorrect Password'));
            }
            return done(null,user);

          });
        }
      }));

  	passport.use(new FacebookStrategy({
  		clientID: config.facebook.clientID,
  		clientSecret: config.facebook.clientSecret,
  		callbackURL: config.facebook.callbackURL
      },
      function(accessToken, refreshToken, profile, done) {
      	profile.authOrigin = 'facebook';
      	User.findOrCreateOAuthUser(profile, function (err, user) {
  	      return done(err, user);
  	    });
      }));

  	passport.use(new GoogleStrategy({
  	    clientID: config.google.clientID,
  	    clientSecret: config.google.clientSecret,
  	    callbackURL: config.google.callbackURL
  	  },
  	  function(accessToken, refreshToken, profile, done) {
  	  	profile.authOrigin = 'google';
  	    User.findOrCreateOAuthUser(profile, function (err, user) {
  	      return done(err, user);
  	    });
  	  }
  	));
  }
