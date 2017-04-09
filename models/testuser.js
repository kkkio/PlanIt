var config = require('../config/config');
var User = require('./user');
var mongoose = require('mongoose');
var mongodb = require('mongodb');

mongoose.connect(config.db);

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
  console.log('connected');
});

var zsb;
/*
zsb = User.create({
  username: 'zsb',
  email: 'zsb@gmail.com',
  password: User.generateHash('123')
});
*/

User.findOne({username : 'zsb'},function(err, user){
  if(err) return console.log(err);
  if(!user) return console.log('no user');
  console.log(user.username);
  console.log(user._id);
  user.followings_num = 1;
  user.save();
  console.log('----check zsb end----');

  //user.unfollowId("58e789273804d31d74faa821");
});

User.findOne({username : '123'},function(err, user){
  if(err) return console.log(err);
  if(!user) return console.log('no user');
  console.log(user.username);
  console.log(user._id);
  console.log('----check 123 end----');

  //user.unfollowedById("58e7c344934af73f430ae238")
});
