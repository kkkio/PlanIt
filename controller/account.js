var User = require('../models/user');
try{
	var moment = require('./moment');
	moment.test;
} catch(ex){
	if (ex instanceof Error && ex.code === "MODULE_NOT_FOUND"){
		console.log("can't load foo");
	}
}

	exports = module.exports = {};

// get account homepage
exports.gethome = function getacchome (req, res, next) {
	moment.test;
	var data=moment.mymoment(req, res, next);
	console.log(data);
	//console.log(data);
  	console.log(req.user._id);
	res.render('account', {
    	user : req.user,
		data : data
  	});
};

// get profile page
exports.getprofile = function getaccprofile (req, res, next) {
	var updateError = req.flash('updateError');
	console.log('updateError',updateError);
	var errors = new Array();;
	if(updateError.length){
		errors.push({
			param: "updateError",
			msg: updateError[0],
			value: "N/A"
		});
	}
	var formErrors = req.flash('passwordFormerrors');
	console.log('formErrors', formErrors);
	if(formErrors.length){
		for (var i =0;i<formErrors.length;i++)
		errors.push(formErrors[i]);
	}
  //console.log(req.user);
  //console.log(req.user.birth);
	console.log(errors);
  res.render('edit_profile', {
    user : req.user,
		errors: errors
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

exports.validatePasswordForm = function validatePasswordForm(req,res,next){
	var old_password = req.body.old_password;
	var new_password = req.body.new_password;
	var new_password_confirmation = req.body.new_password_confirmation;

	req.checkBody('new_password','Passwords do not match').equals(req.body.new_password_confirmation);
	req.getValidationResult().then(function(result){
    var errors = result.array();
    console.log('in validtion', errors);
    if(errors.length){
      console.log('errors is ');
			req.flash('passwordFormerrors',errors);
			res.redirect('/users/account/profile');
    } else {
      console.log('PASSED');
      return next();
    }

  });
}

exports.updatePassword = function updatePassword(req, res, next){
	User.findById(req.user._id, function(err, doc){
		if(err){
			res.flash(
				'updateError', 'user found error'
			);
			console.log('user found error');
			res.redirect('/users/account/profile');
		}
		if(!doc){
			res.flash(
				'updateError', 'No user found '
			);
			res.redirect('/users/account/profile');
			console.log('No user found');
		}
		if(doc.checkVaildPassword(req.body.old_password)){
			doc.updatePassword(req.body.new_password);
			res.redirect('/users/account/profile');
		}
		else{
			req.flash('updateError', 'Old Password is Incorrect');
			res.redirect('/users/account/profile#passwordModal');
		}
	});
};
