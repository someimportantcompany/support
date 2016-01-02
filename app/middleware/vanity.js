var HEADERS = {
  'X-Powered-By': 'Support',
  'X-Version': '0.0.1'
};

module.exports = function (req, res, next) {
  res.set(HEADERS);
  next();
};
