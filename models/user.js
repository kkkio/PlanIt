var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

var userSchema = mongoose.Schema({
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
  username : {type: String, sparse: true},
  email : {type: String, sparse: true},
  password : String,
  phone_number : {type: String, sparse: true},
  intro : String,

  // check user type:
  // 1 - individual
  // 2 - host
  user_type: Number,

  // only for individual
  age : Number,
  birth: Date,
  num_of_followers : Number,
  num_of_followers : Number,

  followerList : [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  followingList : [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],,
  // end individual

  // for login safety
  propic: String,
  user_ip : [Number],

  // check admin
  //admin : Boolean
  pastActivityList : [{ type: mongoose.Schema.Types.ObjectId, ref: 'activity' }]
});

var user = userSchema;
// add an alias for define method
//var user = individualSchema;


// -- LOGIN --

// STATICS METHODS
// find by name
user.statics.findByName = function findByName(name, callback){
  console.log('try to find by name: ', name);
  return this.findOne({username: name},callback);
};

// find by email
user.statics.findByEmail = function findByEmail(email, callback){
  console.log('try to find by email: ', email);
  return this.findOne({email: email},callback);
};


// hash user password
user.statics.generateHash = function generateHash(password) {
  return bcrypt.hashSync(password, salt);
};

// INSTANCE METHODS
// find frequent ip of user
user.methods.findIP = function getIP(callback){
  return this.userip;
};

user.methods.followById = function followById(id, callback){
   this.findByIdAndUpdate(id,{
    $push: {"followerList": {this}}
  },)
}

user.methods.followedById = function followededById(id, callback){

}

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


module.exports = mongoose.model('user', userSchema);
