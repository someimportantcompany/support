var errors = require('app/lib/errors');
var page = require('app/middleware/page');

module.exports = function (err, req, res, next) {
  page(function (page) {
    page.err = err;
    page.template = 'error';

    this.res.status(err.status || errors.http_status_map[err.name] || 500);
  })(req, res, next);
};
