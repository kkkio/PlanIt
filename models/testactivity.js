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
var today=new Date();
var yestoday=new Date(today);
yestoday.setDate(today.getDate()-1);
var longago=new Date(yestoday);
longago.setDate(yestoday.getDate()-1);
console.log(longago);
var insert_data0={
	title : 'Tokyo Sushi Cooking Class',
	// host id
	//a_date: Date,
	start_time: today,
	end_time: today,
	venue: {
		country : "Japan",
		city : "TOKYO"
	},
	intro: "lilili is so happy in TOKYO with her boyfriend",
	url: "sorry no url",
	//1: music concert; 2: movies; 3: art exibition; 4: others
	category: 1,
	comment_num : 2,
	// Can I save an array of rating and calculate the average rating?
	average_rating: 3,
}
var insert_data1={
	title : 'shinjuku is fucking cold',
	// host id
	//a_date: Date,
	start_time: yestoday,
	end_time: today,
	venue: {
		country : "Japan",
		city : "shinjuku"
	},
	intro: "baoge is so happy in shinjuku with his boyfriend",
	url: "sorry no url,lalala",
	//1: music concert; 2: movies; 3: art exibition; 4: others
	category: 2,
	comment_num : 3,
	// Can I save an array of rating and calculate the average rating?
	average_rating: 4,
}
var insert_data2={
	title : 'the snow view in fujiyama',
	// host id
	//a_date: Date,
	start_time: today,
	end_time: today,
	venue: {
		country : "Japan",
		city : "fujiyama"
	},
	intro: "zzc is such a poor guy who travel along....what a pity ",
	url: "sorry also no url, why you ask",
	//1: music concert; 2: movies; 3: art exibition; 4: others
	category: 10,
	comment_num : 5000,
	// Can I save an array of rating and calculate the average rating?
	average_rating: 3,
}
var data=new Activity(insert_data0);
data.save();
 data=new Activity(insert_data1);
data.save();
data=new Activity(insert_data2);
data.save();
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
console.log("finish");