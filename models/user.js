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
  intro : {type: String, default: 'Hello World:)'},

  // for login safety
  propic: {type: String, default: '/images/acc_mgnt/not_upload.png'},
  user_ip : [Number],

  // check admin
  //admin : Boolean

  // check user type:
  // 1 - individual
  // 2 - host
  user_type: {type: Number, default: 1},

  // only for individual
  //age : {type: Number, default: 0},
  birth: {type: Date, default: Date.now},

  followers_num : {type: Number, default: 0},
  followings_num :{type: Number, default: 0},
  followerList : [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  followingList : [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],

  activity_num: {type: Number, default: 0},
  moment_num: {type: Number, default: 0},
  schedule_num: {type: Number, default: 0},
  // end individual


  pastActivityList : [{ type: mongoose.Schema.Types.ObjectId, ref: 'activity'}],
  momentList : [{ type: mongoose.Schema.Types.ObjectId, ref: 'moment'}],
  scheduleList : [{ type: mongoose.Schema.Types.ObjectId, ref: 'schedule'}]
});

var user = userSchema;
// add an alias for define method
//var user = individualSchema;


// -- LOGIN --

// STATICS METHODS
// find by name
user.statics.findByName = function findByName(name, callback){
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

// follow someone by id, update followingList
user.methods.followId = function followId(id){
  if(this.isFolowingId(id)) return;
  console.log(this.username);
   return this.update(
     {
       $push: {"followingList": id},
       $inc: {"followings_num": 1}
     }
   ).exec();
};

// followed by someone by id, update followerList
user.methods.followedById = function followededById(id){
  if(this.isFollowedById(id)) return;
  return this.update(
    {
      $push: {"followerList": id},
      $inc: {"followers_num": 1}
    }
  ).exec();
};

user.methods.unfollowId = function unfollowId(id){
  // not following, then cannot unfollow
  if(!this.isFolowingId(id)) return;
   return this.update(
     {
       $pull: {"followingList": id},
       $inc: {"followings_num": -1}
     }
   ).exec();
};

// followed by someone by id, update followerList
user.methods.unfollowedById = function unfollowedById(id){
  if(!this.isFollowedById(id)) return;
  return this.update(
    {
      $pull: {"followerList": id},
      $inc: {"followers_num": -1}
    }
  ).exec();
};

// get all followers
user.methods.getFollowers = function getFollowers(callback){
  return this
  .populate('followerList')
  .exec(callback);
  /* exec(function (err, user){
  if(err) return handleError;
  console.log(person);
  })*/
};

// get all followings
user.methods.getFollowings = function getFollowings(callback){
  return this
  .populate('followingList')
  .exec(callback);
  /* exec(function (err, user){
  if(err) return handleError;
  console.log(person);
  })*/
};

// A is following id? / A is a follower of id
user.methods.isFollowerOfId = function isFollowerOfId(id){
  var i;
  for(i =0; i<this.followingList.length;i++){
    if(this.followingList[i] == id){
      console.log('true');
      return true;
    }
  }
  return false;
};
user.methods.isFolowingId = user.methods.isFollowerOfId;

// A is followed by id?
user.methods.isFollowedById = function isFollowedById(id){
  var i;
  for(i = 0; i<this.followerList.length;i++){
    if(this.followerList[i] == id){
      return true;
    }
  }
  return false;
};

// post a moment
user.methods.postMoment = function postMoment(callback){
  return this.update(
    {
      $push: {"momentList": id},
      $inc: {"moment_num": 1}
    },
    callback);
}

// get all moments
user.methods.getMoments = function getMoments(callback){
  return this
  .populate('momentList')
  .exec(callback);
  /* exec(function (err, user){
  if(err) return handleError;
  console.log(person);
  })*/
};

// post a activity - host
user.methods.postorgetActivity = function postorgetActivity(callback){
  return this.update(
    {
      $push: {"activityList": id},
      $inc: {"activity_num": 1}
    },
    callback);
}

// get all activities
user.methods.getActivities = function getActivities(callback){
  return this
  .populate('activityList')
  .exec(callback);
  /* exec(function (err, user){
  if(err) return handleError;
  console.log(person);
  })*/
};

// compare password
user.methods.checkVaildPassword = function checkVaildPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

// for user to update something
user.methods.updatePassword = function updatePassword(password){
  this.password = bcrypt.hashSync(password, salt);
};

// for update
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

// defind a pre


module.exports = mongoose.model('user', userSchema);
