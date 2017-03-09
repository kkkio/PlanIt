// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var db = require('./database');
var passport = require('passport');
var connection = mysql.createConnection(db.connection);

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

    // register
    passport.use(
            'local-signup',
            new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true
            }, function(req, username, password, done){
                console.log('Starting point: before any query');
                connection.query('SELECT * from user WHERE username = ?',[username],function(err,rows){
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

// login
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

};
