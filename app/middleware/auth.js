var auth = module.exports = {};
var config = require('app/config');

auth.requireAuth = function (req, res, next) {
  next();
};
