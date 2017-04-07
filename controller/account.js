var User = require('../models/user');

exports = module.exports = {};


exports.gethome = function getacchome (req, res, next) {
  res.render('account', {
    user : req.user
  });
};

exports.getprofile = function getaccprofile (req, res, next) {
  console.log(req.user);
  //console.log(req.user.birth);
  res.render('edit_profile', {
    user : req.user
  });

};

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
