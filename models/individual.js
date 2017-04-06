var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var assert = require('mongoose-assert')('mongoose');

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
  password : String,
  email : String,
  intro : String,
  // only for individual
  age : Number,
  birth: Date,
  num_of_followers : Number,
  num_of_followers : Number,

  followerList : [this],
  followingList : [this],


  // for login safety
  propic: String,
  user_ip : [Number],

  // check admin
  //admin : Boolean
  pastActivityList : [{ type: mongoose.Schema.Types.ObjectId, ref: 'activity' }]
});

var user = individualSchema;
// add an alias for define method
//var user = individualSchema;


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

// STATICS METHODS
// signup - add a user
user.statics.signup = function signup(email,password,done){

}

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

module.exports = mongoose.model('individual', individualSchema);
