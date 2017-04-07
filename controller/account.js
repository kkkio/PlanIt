exports = module.exports = {};

exports.getaccpage = function getaccpage (req, res, next) {
  res.render('account', {
    user : req.user
  });
};
