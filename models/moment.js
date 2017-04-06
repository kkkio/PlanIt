var mongoose = require('mongoose');
var assert = require('mongoose-assert')('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var momentSchema = mongoose.Schema({
  //user_id : Number,
  title : String,
  user_id : Number,
  date : Date,
  post_time : Date,
  location : String,
  pic : String,
  text : String,
  // privacy 1: public, 2:followers, 3: friends, 4: private
  privacy : Number
});

// add an alias for define method
var moment = momentSchema;
moment.static.showMyMoment=function(userID){
  var query=this.find({user_id: userID});
  var m_moment=[];
  for(var i=0;i<query.length;i++){
    m_moment.push({
      m_id=query[i].id,
      m_title:query[i].title,
      m_date:query[i].date,
      m_posttime:query[i].post_time,
      m_location:query[i].location,
      m_moment_pic: query[i].pic,
      m_text:query[i].text
    });
  }
  return m_moment;
};
moment.static.showFriendMoment=function(friend_id){
	var m_moment=[];
  	var query=this.find({user_id:friend_id});
	// if friend else not friend(relationship)
		if (true){
			for (var i=0;i<query.length;i++){
				if(query[i].privacy<4){
					m_moment.push({
      				m_id=query[i].id,
              m_title:query[i].title,
              m_date:query[i].date,
              m_posttime:query[i].post_time,
              m_location:query[i].location,
              m_moment_pic: query[i].pic,
              m_text:query[i].text
    				});
				}
			}
		}
		else{
			for (var i=0;i<query.length;i++){
				if(query[i].privacy<3){
				  m_moment.push({
      					m_id=query[i].id,
                m_title:query[i].title,
                m_date:query[i].date,
                m_posttime:query[i].post_time,
                m_location:query[i].location,
                m_moment_pic: query[i].pic,
                m_text:query[i].text
    				});
				}
			}
		}
	return m_moment;

};
module.exports = mongoose.model('moment', momentSchema);
