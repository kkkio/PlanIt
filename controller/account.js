var User = require('../models/user');

exports = module.exports = {};


exports.gethome = function getacchome (req, res, next) {
  res.render('account', {
    user : req.user
  });
};

exports.getprofile = function getaccprofile (req, res, next) {
  console.log(req.user.birth);
  console.log(req.user.birth.year);
  res.render('edit_profile', {
    user : req.user
  });
};

exports.updateInfo = function updateInfo (req, res, next){

};
