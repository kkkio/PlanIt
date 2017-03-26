var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
/*
String
Number
Date
Buffer
Boolean
Mixed
ObjectId -- auto created
Array
*/
var individualSchema = mongoose.Schema({
  local            : {
      email        : String,
      password     : String,
  },
  facebook         : {
      id           : String,
      token        : String,
      email        : String,
      name         : String
  },
  twitter          : {
      id           : String,
      token        : String,
      displayName  : String,
      username     : String
  },
  google           : {
      id           : String,
      token        : String,
      email        : String,
      name         : String
  },

  // basic info
  username : String,
  phone_number : String,
  self_intro : String,
  age : Number,
  birth: Date,
  num_of_followers : Number,
  num_of_followers : Number,


  // for login safety
  propic: {
    propic_r : Number,
    propic_g : Number,
    propic_b : Number
  }
  user_ip : {
    user_ip1 : Number,
    user_ip2 : Number,
    user_ip3 : Number
  },

  // check admin
  admin : Boolean
  pastActivityList : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }]
});

// add an alias for define method
var user = individualSchema;


// -- LOGIN --

// STATICS METHODS
// find by name
user.statics.findByName = function findByName(name, callback){
  return this.find({username: name}),callback);
};

// find by email
user.statics.findByEmail = function findByEmail(email, callback){
  return this.find({email: email}),callback);
};

user.statics.findByNameOrEmail = function findByNameOrEmail(input, callback){
  this.findByEmail(input, function(err, result){
    // if find not found by email
    if(err){
      return this.findByName(input, callback);
    }
    else{
      return callback(err, result);
    }
  });
};

// INSTANCE METHODS
// find frequent ip of user
user.methods.findIP = function getIP(callback){
  return this.userip;
};

// hash user password
user.methods.generateHash = function generateHash(password) {
  return bcrypt.hashSync(password, salt);
};

// compare password
user.methods.checkVaildPassword = function checkVaildPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

// for user to update something
user.methods.updatePassword = function updatePassword(password){
  this.password = this.generateHash(password);
};

user.methods.updateIntro = function updateIntro(intro){
  this.self_intro = intro;
};

user.methods.updatePhone = function updatePhone(phone){
  this.phone_number = phone;
};

user.methods.updateBirth = function updateBirth(year,month,day){
  this.birth.year = year;
  this.birth.month = month;
  this.birth.day = day;
  this.age = Date.now().year - year;
};

// TODO : FOR ZZC
user.methods.updateIP = function updateIP(userip){

};

module.exports = mongoose.model('Individual', individualSchema);
