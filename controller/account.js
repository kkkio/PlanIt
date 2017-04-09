var User = require('../models/user');
var moment = require('./moment');


exports = module.exports = {};

// get account homepage
exports.gethome = function getacchome (req, res, next) {
	res.mydata={};
	res.mydata.moment=[];
	moment.mymoment(req, res, next,function(res){
		console.log("in account controller");
		console.log(res.mydata.moment);
		//console.log(data);
		console.log(req.user._id);
		res.render('account', {
			user : req.user,
			data : res.mydata.moment
		});	
	});
	
};

// get profile page
exports.getprofile = function getaccprofile (req, res, next) {
  console.log(req.user);
  //console.log(req.user.birth);
  res.render('edit_profile', {
    user : req.user
  });

};

// update user profile
exports.updateInfo = function updateInfo (req, res, next){
  //console.log(req.body);
  User.findById(req.user._id,function(err, doc){
    if(err){
      res.flash({
        'error': 'user found error',
      });
      console.log('user found error');
      res.redirect('/users/account/profile');
    }
    if(!doc){
      res.flash({
        'error': 'No user found ',
      });
      res.redirect('/users/account/profile');
      console.log('No user found');
    }
    doc.intro = req.body.intro;
    var tmpdate = new Date();
    tmpdate.setFullYear(req.body.year);
    tmpdate.setMonth(req.body.month);
    tmpdate.setDate(req.body.date);
    doc.birth = tmpdate;
    doc.save();
    //console.log(tmpdate);
    //console.log(doc);
    console.log('success');
    res.redirect('/users/account/profile');
  });
};
