// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;


// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var db = require('./database');
var passport = require('passport');
var connection = mysql.createConnection(db.connection);
//var user = require('./user')

// connect database
connection.query('USE '+db.database);

module.exports = function(passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    connection.query("SELECT * FROM user WHERE id = ? ",[id], function(err, rows){
      done(err, rows[0]);
    });
  });

  // local register
  passport.use(
    'local-signup',
    new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    }, function(req, username, password, done){
      console.log('Starting point: before any query');
      connection.query('SELECT * from user WHERE username = ?',[username],function(err,rows){
      //user.findUserbyuserrname([username],function(err, rows){
        console.log('query done.');
        if(err){
          return done(err);
        }
        if(rows.length){
          return done(null,false,req.flash('signupMessage','The username has already been taken.'));
        }else{
          connection.query('SELECT * from user WHERE email = ?',[req.body.email],function(err,rows){
            if(err){
              return done(err);
            }
            if(rows.length){
              return done(null,false,req.flash('signupMessage','The email has already been taken.'));
            }else{
              // create a new user and insert into database
              var newUser = {
                username: username,
                password: bcrypt.hashSync(password,10)
              };

              var insertQuery='INSERT INTO user ( username , password, email ) values (?,?,?)';

              connection.query(insertQuery,[newUser.username, newUser.password,req.body.email],function(err,rows){
                if(err){
                  throw(err);
                }
                newUser.id = rows.insertId;

                return done(null, newUser);
              });
              console.log('Create User done.');
            }
          });
        }
      });
    })
  );

  // local login
  passport.use(
    'local-login',
    new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    }, function(req, username, password, done) {
      console.log('devDependencies');
      function loginhelp (err, rows){
        if (err)
        return done(err);
        if (!rows.length) {
          return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
        }

        // if the user is found but the password is wrong
        if (!bcrypt.compareSync(password, rows[0].password))
        return done(null, false, req.flash('loginMessage', 'Invalid password.')); // create the loginMessage and save it to session as flashdata

        // return successful user
        return done(null, rows[0]);
      }
      // callback with email and password from our form
      req.checkBody('username').isEmail();
      var error = req.validationErrors();
      console.log('good job here');
      console.log(error);
      if(!error){
        connection.query("SELECT * FROM user WHERE email = ?",[username],loginhelp);
      }else{
        connection.query("SELECT * FROM user WHERE username = ?",[username],loginhelp);
      }

    })
  );

  // facebook login
  passport.use(new FacebookStrategy({
      clientID: "1821748868073740",
      clientSecret: "ccf602c7713c5f1c0b2e511750f4f36f",
      callbackURL: "http://localhost:3000/users/login/facebook/callback",
      profileFields: ['id', 'displayName', 'email']
    },
    function(accessToken, refreshToken, profile, done) {
      // user find or create
      console.log('hello facebook');
      connection.query("SELECT * FROM user WHERE email = ?",[profile._json.email], function(err, rows) {
        if (err) {
          done(err);
        }
        console.log(profile);
        console.log('-----------------');
        console.log(profile._json.email);
        console.log('-----------------');
        // if not find user then create one
        if(!rows.length){
          var newUser ={
            username: profile._json.id,
            password: bcrypt.hashSync(profile._json.id,10),
            email: profile._json.email
          };
          var insertQuery='INSERT INTO user ( username , password, email ) values (?,?,?)';

          connection.query(insertQuery,[newUser.username, newUser.password,newUser.email],function(err,rows){
            if(err){
              done(err);
            }

            newUser.id = rows.insertId;

            done(null,newUser);
          });
        }
        else{// find users
          done(null, rows[0]);
      }
      });

    })
  );


};
