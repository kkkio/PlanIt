var mongoose = require('mongoose');

var scheduleSchema = mongoose.Schema({
  //user_id : Number,
  title : String,
  activity_id : Number,
  s_date : Date,
  start_time : Date,
  end_time : Date,
  venue : String,
  // privacy 1: public, 2: private, 3: followers, 4: friends
  privacy : Number,
  url : String
});

// add an alias for define method
var schedule = scheduleSchema;

module.exports = mongoose.model('Schedule', scheduleSchema);
