var express = require('express');
var router = express.Router();
var passport = require('passport');

var Schedule = require('../models/schedule');
var moment = require('../models/moment');
var multer = require('multer');
var upload = multer({dest : 'public/upload/'});

/* CONTROLLER */
var register = require('../controller/register');
var account = require('../controller/account');
var login=require('../controller/login');
var moment=require('../controller/moment');
var schedule=require('../controller/schedule');
var explore = require('../controller/explore');
//build the connection to the database



/* GET users listing. */
/* GET users page. */
router.get('/', isLoggedIn,function(req, res, next){
  res.send('/');
});

/* GET user login page. */
router.get('/login', login.logget);

/* POST user login page. */
router.post('/login', login.logpost);

/* GET user register page. */
router.get('/register', register.getregpage);

/* POST user register page. */
router.post('/register',register.isCompleted,register.redirect);

/* GET account home page. */
router.get('/account',isLoggedIn, function(req,res,next){
  res.redirect('/users/'+req.user._id);
});

/* GET account management page. */
router.get('/account/profile',isLoggedIn, function(req,res,next){
  res.redirect('/users/'+req.user._id+'/profile');
});



/*Add moment,delete moment and update moment*/
router.post('/account/addMoment',isLoggedIn,upload.single('momentImage'),moment.addMoment);
router.post('/account/deleteMoment', isLoggedIn,function(req,res,next){
  console.log('FUCK YOU');
  next();
}, moment.deleteMoment);

/*
router.post('/account/deleteMoment', isLoggedIn, function(req,res,next){
	console.log("in the delete");
});
*/
router.post('/account/updateMoment', isLoggedIn, moment.updateMoment);
/*router for moment*/
// easy version for lilili test
router.get('/moment',isLoggedIn,isLoggedIn,moment.recommendMoment);

/* for lilili test*/
router.get('/account/past',isLoggedIn,function(req,res,next){
	console.log("come here");
	res.render('past_activity',{
    isLogin : req.isAuthenticated()
  });
});
router.get('/activity',isLoggedIn,function(req,res,next){
  res.render('single_activity');
});


/* GET account management page. */
router.post('/account/profile',isLoggedIn, account.updateInfo);

/* GET account management page. */
router.post('/account/editPassword',isLoggedIn, account.validatePasswordForm, account.updatePassword);

router.get('/login/facebook',
  passport.authenticate('facebook',{ scope: ['email'] }));

router.get('/login/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/login',
    failureFlash : true
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

/* SCHEDULE*/
//view my schedule
router.get('/account/myschedule',schedule.myschedule);

//insert1 add activities from our website
router.post('/account/myschedule/insert',schedule.addMySchedule);
// delete one event of schedule
router.post('/account/myschedule/delete',schedule.deleteSchedule);

//change one event of schedule
router.post('/account/myschedule/update', schedule.updateSchedule);

//view others schedules
router.get('/schedule/:id', function(req, res, next) {
  	var friend_id=req.params.id;
  //data[] data is the array of objects
	var data=Schedule.showFriendSchedule(friend_id);
    res.render('otherschedule',data);
});
/*SCHEDULE FINISHED*/

/*MOMENT*/
//view my moment
router.get('/mymoment',function(req,res,next){
  //TODO the u_id has not been set
    var data=moment.showMyMoment(req.cookies.u_id);
    res.render('myschedule',data);
});

//add moment
router.post('/mymoment/insert',function(req,res,next){
  var insert_data={
    	title: req.body.title,
      user_id :req.cookie.u_id,
    	date:	   req.body.date,
    	post_time: req.body.post_time,
    	location: req.body.location,
    	pic: req.body.pic,
      text: req.body.text,
    	privacy: req.body.privacy
    };
    var data=new Schedule(insert_data);
    data.save();
	res.redirect('/mymoment');
  });

//delete moment
router.post('/mymoment/delete',function(req,res,next){
    var id=req.body.id;
    Schedule.findByIdAndRemove(id).exec();
    res.redirect('/mymoment');
});

//update moment
router.post('/mymoment/update', function(req, res, next) {
  var id = req.body.id;
  moment.findById(id, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
    doc.title  = req.body.title;
    doc.date = req.body.date;
    doc.post_time = req.body.post_time;
    doc.location = req.body.location;
    doc.pic=req.body.pic;
    doc.text=req.body.text;
    doc.privacy=req.body.privacy;
    doc.save();
  })
  res.redirect('/mymoment');
});

//view friend's moment
router.get('/moment/:id', function(req, res, next) {
  	//TODO discuss with front-end, how to send the data
	var friend_id=req.params.id;
	var data=moment.showFriendMoment(friend_id);
    res.render('othersmoment',data);
});
/*MOMENT FINISHED*/



router.get('/logout',isLoggedIn,function(req, res){
  console.log('LOGING OUT');
  req.logout();
  res.redirect('/');
});

/* GET account home page. */
router.get('/:id',isLoggedIn, account.gethome);

/* GET account management page. */
router.get('/:id/profile',isLoggedIn, account.getprofile);


// route middleware to make sure
function isLoggedIn(req, res, next) {
  console.log('Checking Login');
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/users/login');
}

module.exports = router;
