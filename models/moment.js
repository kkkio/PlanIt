var mongoose = require('mongoose');


var momentSchema = mongoose.Schema({
  //user_id : Number,
  title : String,
  _user_id : {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  date : Date,
  location : String,
  pic : String,
  text : String,
  like : Number,
  comment_num : Number,
  commentList :[{type:mongoose.Schema.Types.ObjectId, ref: 'comment'}],
  // privacy 1: public, 2:followers, 3: friends, 4: private
  privacy : Number
});

// add an alias for define method
var moment = momentSchema;

/*STATIC METHODS*/
moment.statics.showMyMoment=function(userID,callback){
  	this.find({_user_id: userID}).populate('commentList').sort({date: -1}).exec(function(err,doc){
		if (err){
			console.err("error");
		}
		else{
			console.log("finish in find");
			return callback(doc);
		}
	});
};

moment.statics.showFriendMoment=function(friend_id){
	var m_moment=[];
  	var query=this.find({_user_id:friend_id});
	// if friend else not friend(relationship)
		if (true){
			for (var i=0;i<query.length;i++){
				if(query[i].privacy<4){
					m_moment.push({
						m_id :			query[i]._id,
						m_title :		query[i].title,
						m_date :		query[i].date,
						m_posttime :	query[i].post_time,
						m_location :	query[i].location,
						m_moment_pic :  query[i].pic,
						m_text:			query[i].text
    				});
				}
			}
		}
		else{
			for (var i=0;i<query.length;i++){
				if(query[i].privacy<3){
				  	m_moment.push({
      					m_id :			query[i]._id,
                		m_title :		query[i].title,
                		m_date :		query[i].date,
                		m_posttime :	query[i].post_time,
                		m_location :	query[i].location,
                		m_moment_pic : 	query[i].pic,
                		m_text :		query[i].text
    				});
				}
			}
		}
	return m_moment;
};

moment.statics.getOneById = function getOneById(id, callback){
	this
	.findById(id)
	.populate('commentList')
	.exec(callback);
};
/*INSTANCE METHODS*/

//module.exports
module.exports=mongoose.model('moment',momentSchema);
/*
var moment= mongoose.model('moment', momentSchema);
var data={
	title : "aaaaaaaaa",
  	_user_id : "58e764b429c4280f4d7a0960",
  date : Date.now(),
  post_time : Date.now(),
  text: "22222222",
  privacy : 1
}

var test= new moment(data);
test.save();
*/
/*
var moment= mongoose.model('moment', momentSchema);
var data={
	title : "May Day 2017",
  	_user_id : "58e764b429c4280f4d7a0960",
  date : Date.now(),
  post_time : Date.now(),
  text: "happy birthday :P",
  privacy : 1
}

var test= new moment(data);
test.save();
*/
