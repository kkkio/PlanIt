// For creating fake activity
var config = require('../config/config');
var moment = require('../models/moment');
var user = require('../models/user');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var faker = require('faker');

mongoose.connect(config.db);

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
  console.log('connected');
});

for(var i = 0; i<5; i++){
	//render the userdata
	var fake_user={
		username: faker.name.findName(),
		email:	faker.internet.email(),
	};
	console.log(fake_user);
	console.log('finish user');
	var user_data=new user(fake_user);
	user_data.save();
		/*
		function(err,doc){
		var fake_moment={
			_user_id: doc._id,
			username: doc.username,
			title: faker.lorem.sentence(),
			text: faker.lorem.words(),
			 pic : faker.image.image()		
		}
		var user_moment=new moment(fake_moment);
		console.log(user_moment);
		user_moment.save();
		
	});
	*/
	
}
for(var i=0;i<5;i++){
	var rand=Math.floor(Math.random()*3)+1;
	
		var fake_moment={
			username: faker.name.findName(),
			title: faker.lorem.sentence(),
			text: faker.lorem.words(),
			 pic : faker.image.image(),
			date : faker.date.recent(),
		}
		var user_moment=new moment(fake_moment);
		console.log(user_moment);
		user_moment.save();
}

db.close();
