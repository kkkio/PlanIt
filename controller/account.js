exports = module.exports = {};

exports.getaccpage = function getaccpage (req, res, next) {
  res.render('account', {
    user : req.user
  });
};


exports.updateInfo = function updateInfo (req, res, next){
  return;
};
