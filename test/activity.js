// For creating fake activity
var config = require('../config/config');
var Activity = require('../models/activity');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var faker = require('faker');

mongoose.connect(config.db);

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
  console.log('connected');
});

for(var i = 0; i<100; i++){
  var fake_activity = {
    title: faker.lorem.words(),
    start_time : faker.date.recent(),
    end_time : faker.date.future(),
    intro : faker.lorem.paragraphs(),
    category : faker.random.number()%4 + 1,
    pic : faker.image.image()
  };
  var data = new Activity(fake_activity);
  data.save();
}

db.close();
