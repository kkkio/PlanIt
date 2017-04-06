var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var assert = require('mongoose-assert')('mongoose');



var hostSchema = mongoose.Schema({
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
  username : {type: String, unique: true},
  company_name : String,
  password : String,
  email : String,
  phone_number : String,
  intro : String,

  // for login safety
  propic: String,
  user_ip : [Number],


  activityList: [{type: mongoose.Schema.Types.ObjectId, ref: 'activity' }]
});

var user = hostSchema;

// add an alias for define method
//var user = hostSchema;


// -- LOGIN --

// STATICS METHODS
// find by name
user.statics.findByName = function findByName(name, callback){
  return this.find({username: name},callback);
};

// find by email
user.statics.findByEmail = function findByEmail(email, callback){
  return this.find({email: email},callback);
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


module.exports = Host = mongoose.model('host', hostSchema);
