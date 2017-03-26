var mongoose = require('mongoose');

var scheduleSchema = mongoose.Schema({
  //user_id : Number,
  title : String,
  s_date : Date,
  start_time : Date,
  end_time : Date,
  venue : String,
  // privacy 1: public, 2: private, 3: followers, 4: friends
  privacy : Number,
  url : String,
  activityList:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }]
});

// add an alias for define method
var schedule = scheduleSchema;

module.exports = mongoose.model('Schedule', scheduleSchema);
