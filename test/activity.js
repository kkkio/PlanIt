// For creating fake activity
var config = require('../config/config');
var Activity = require('../models/activity');
var User = require('../models/user');
var mComment = require('../models/comment');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var faker = require('faker');

mongoose.connect(config.db);

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
  console.log('connected');
});

uu =["58e764b429c4280f4d7a0960"]
uu.push("58e8e6448e4be202e990cba6");
uu.push("58e7714b1745530f94fd7a59");
uu.push("58eefe35eff1a240adb33db8");
uu.push("58eefe35eff1a240adb33db9");
uu.push("58eefe35eff1a240adb33dba");
uu.push("58eefe35eff1a240adb33dbb");
uu.push("58ef02137d41db41797e3f48");
uu.push("58ef02137d41db41797e3f47");
uu.push("58ef015b87706f4162922b07");
uu.push("58ef015b87706f4162922b06");


for(var i = 0; i<10000; i++){
  var paragraph = faker.commerce.department()+' ' +faker.commerce.productName();
  for(var j = 0 ; j < faker.random.number()%10+5; j++){
    paragraph += faker.commerce.department()+' ' +faker.commerce.productName();
  }
  //var tmp = [faker.lorem.paragraph()];
  var tmp = [paragraph]
  var brief = paragraph;
  for(var j = 0; j < faker.random.number()%5 + 1; j++){
    paragraph = '';
    for(var k = 0 ; k < faker.random.number()%10+5; k++){
      paragraph += faker.commerce.department()+' ' +faker.commerce.productName();
    }
    tmp.push(paragraph);
  }
  var fake_activity = {
    title: faker.commerce.productName(),
    start_time : faker.date.recent(),
    end_time : faker.date.future(),
    venue: {
      country : faker.address.country(),
      city : faker.address.state()
    },
    briefIntro : brief,//faker.lorem.paragraph(),
    detailIntro : tmp,
    rate: faker.random.number()%500/100,
    rate_num: faker.random.number()%1000,
    category : faker.random.number()%6 + 1,
    pic : faker.image.image(),
    url : faker.internet.url()
  };
  var data = new Activity(fake_activity);
  data.save();
    // add comment
  for(var k = 0; k< faker.random.number()%16 + 1; k++){
    var fake_comment = {
      _activity_id : data._id,
      _user_id : uu[faker.random.number()%11],
      // type : acitivity - 1; moment - 2
      content: faker.company.catchPhrase(),
      post_time: faker.date.recent(),
      useful_num: faker.random.number()%150,
      nonuseful_num: faker.random.number()%100
    };
    var com = new mComment(fake_comment);
    com.save();
    data.commentList.push(com._id);
    data.comment_num += 1;
    data.save();
  }
}

db.close();
