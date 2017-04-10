var mongoose = require('mongoose');
var user=require('./user');


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
  likeList: [{type:mongoose.Schema.Types.ObjectId, ref: 'user'}],
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


moment.statics.showFriendMoment=function(ny_id,friend_id,callback){
	var m_moment=[];
  	user.getOnebyId({_user_id:friend_id},function(err,obj){
		if(obj.isFollowerOfId(my_id)){
			for (var i=0;i<obj.momentlist.length;i++){
				if(obj.momentlist[i].privacy<4){
					m_moment.push({
						m_id :			obj.momentlist[i]._id,
						m_title :		obj.momentlist[i].title,
						m_date :		obj.momentlist[i].date,
						m_posttime :	obj.momentlist[i].post_time,
						m_location :	obj.momentlist[i].location,
						m_moment_pic :  obj.momentlist[i].pic,
						m_text:			obj.momentlist[i].text
					});
				}
			}
		}
		else{
			for (var i=0;i<obj.momentlist.length;i++){
				if(obj.momentlist[i].privacy<3){
					m_moment.push({
						m_id :			obj.momentlist[i]._id,
						m_title :		obj.momentlist[i].title,
						m_date :		obj.momentlist[i].date,
						m_posttime :	obj.momentlist[i].post_time,
						m_location :	obj.momentlist[i].location,
						m_moment_pic :  obj.momentlist[i].pic,
						m_text:			obj.momentlist[i].text
					});
				}
			}	
		}
		return callback(m_moment);	
	});
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
	.populate('commentList', '_user_id','likeList')
	.exec(callback);
};
/*INSTANCE METHODS*/
moment.methods.isLikeBy = function isLikeBy(userid){
  var i;
  for(i = 0; i<this.likeList.length;i++){
    if(this.likeList[i] == id){
      return true;
    }
  }
  return false;
};
//module.exports
module.exports=mongoose.model('moment',momentSchema);

