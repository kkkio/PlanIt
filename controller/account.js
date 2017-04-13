var User = require('../models/user');
var moment = require('./moment');
var fs = require('fs');


exports = module.exports = {};

// get account homepage
exports.gethome = function getacchome (req, res, next) {
	// always check params
	if(req.params.id != req.user._id){
		var err = new Error('Not Found');
		err.status = 404;
		throw(err);
	}
	//res.mydata={};
	//res.mydata.moment=[];
	moment.mymoment(req, res, next);
};

// get profile page
exports.getprofile = function getaccprofile (req, res, next) {
	if(req.params.id != req.user._id){
		var err = new Error('Not Found');
		err.status = 404;
		throw(err);
	}
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
		errors: errors,
		isLogin: req.isAuthenticated()
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
		doc.phone_number = req.body.telephone;
    var tmpdate = new Date();
    tmpdate.setFullYear(req.body.year);
    tmpdate.setMonth(req.body.month);
    tmpdate.setDate(req.body.date);
    doc.birth = tmpdate;
		console.log('before save file', doc.propic);
		if(req.file){
			if(doc.propic && doc.propic != '/images/acc_mgnt/not_upload.png'){
				var path = 'public'+doc.propic;
				console.log('path :', path);
				if(fs.existsSync(path)){
					fs.stat(path,function(err, stats){
						if(err) return;
						fs.unlink(path,function(err){
							if(err) throw(err);
							console.log('file deleted successfully');
						})
					});
				}
			}
			doc.propic = '/upload/'+req.file.filename;
			console.log('true path', req.file.path);
			console.log('doc.pic', doc.propic);
		}
    doc.save();
    //console.log(tmpdate);
    //console.log(doc);
    console.log('success');
    res.redirect('/users/account/profile');
  });
};

// check validate password form
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

// update password
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
