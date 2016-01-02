var express = require('express');
var page = require('app/middleware/page');

module.exports.login = (function () {
  var router = express.Router();
  var pg = page(function (page) {
    page.template = 'login';
  });

  router.get('/', pg);
  router.post('/', function (req, res, next) {
    next(new Error('Boop!'));
  });

  return router;
})();

module.exports.logout = (function () {
  var router = express.Router();
  var pg = page(function (page) {
    page.template = 'logout';
  });

  router.get('/', pg);
  router.post('/', function (req, res, next) {
    next(new Error('Boop!'));
  });

  return router;
})();
