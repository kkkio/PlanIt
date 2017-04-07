exports = module.exports = {};

exports.gethome = function getacchome (req, res, next) {
  res.render('account', {
    user : req.user
  });
};

exports.getmanange = function getaccmanange (req, res, next) {
  res.render('edit_profile', {
    user : req.user
  });
};


exports.updateInfo = function updateInfo (req, res, next){
  return;
};
