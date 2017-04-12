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


for(var i = 0; i<1000; i++){
  var tmp = [faker.lorem.paragraph()];
  for(var j = 0; j < faker.random.number()%5 + 1; j++){
    tmp.push(faker.lorem.paragraph());
  }
  var fake_activity = {
    title: faker.lorem.words(),
    start_time : faker.date.recent(),
    end_time : faker.date.future(),
    venue: {
      country : faker.address.country(),
      city : faker.address.state()
    },
    briefIntro : faker.lorem.paragraph(),
    detailIntro : tmp,
    category : faker.random.number()%6 + 1,
    pic : faker.image.image()
  };
  var data = new Activity(fake_activity);
  data.save();
}

db.close();
