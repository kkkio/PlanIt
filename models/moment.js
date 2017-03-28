var mongoose = require('mongoose');
var assert = require('mongoose-assert')('mongoose');
var autoIncrement = require('mongoose-auto-increment');
mongoose.createConnection('mongodb://localhost/3100');

var momentSchema = mongoose.Schema({
  //user_id : Number,
  title : String,
  user_id : Number,
  m_date : Date,
  post_time : Date,
  location : String,
  moment_pic : String,
  m_text : String,
  // privacy 1: public, 2: private, 3: followers, 4: friends
  privacy : Number
});

// add an alias for define method
var moment = momentSchema;

module.exports = mongoose.model('Moment', momentSchema);
