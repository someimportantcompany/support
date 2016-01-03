var config = require('app/config');
var errors = require('app/lib/errors');

module.exports = function (err, req, res, next) {
  /* jshint unused: false */
  var output = {
    error: true,
    name: err.name,
    message: err.user_message || err.message,
    status: err.status || errors.http_status_map[err.name] || 500,
    status_message: err.status_message ||  errors.http_status_codes[err.status] || null
  };

  if (err.hasOwnProperty('fields')) output.fields = err.fields;

  if (!config.isProduction && err.hasOwnProperty('stack')) output.stack = err.stack.split('\n').map(function (s) {
    return s.trim();
  });

  res.status(output.status).json(output);
};
