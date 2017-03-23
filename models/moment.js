var mongoose = require('mongoose');

var momentSchema = mongoose.Schema({
  //user_id : Number,
  title : String,
  user_id : Number,
  m_date : Date,
  post_time : Date,
  location : String,
  moment_rgb: {
    moment_r : Number,
    moment_g : Number,
    moment_b : Number
  },
  m_text : String,
  // privacy 1: public, 2: private, 3: followers, 4: friends
  privacy : Number
});

// add an alias for define method
var moment = momentSchema;

module.exports = mongoose.model('Moment', momentSchema);
