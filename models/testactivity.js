var config = require('../config/config');
var Activity = require('./activity');
var mongoose = require('mongoose');
var mongodb = require('mongodb');

mongoose.connect(config.db);

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
  console.log('connected');
});

var darkReunion;

darkReunion = Activity.create({
  title : 'Tokyo Sushi Cooking Class',
	// host id
	_user_id : {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
	//a_date: Date,
	start_time: Date,
	end_time: Date,
	venue: {
		country : String,
		city : String
	},
	intro: String,
	url: String,
	//1: music concert; 2: movies; 3: art exibition; 4: others
	category: Number,
	comment_num : Number,
	// Can I save an array of rating and calculate the average rating?
	average_rating: Number,
	commentList: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}]
});

/*
User.findOne({username : 'zsb'},function(err, user){
  if(err) return console.log(err);
  if(!user) return console.log('no user');
  console.log(user.username);
  //console.log(user._id);
  user.followings_num = 1;
  user.save();
  console.log('----check zsb end----');

  //user.followId("58e789273804d31d74faa821");
  user.getFollowings(function(err, result){
    console.log(result.followingList);
  });
});

User.findOne({username : '123'},function(err, user){
  if(err) return console.log(err);
  if(!user) return console.log('no user');
  console.log(user.username);
  //console.log(user._id);
  console.log('----check 123 end----');

  //user.followedById("58e7c344934af73f430ae238")
});
*/
