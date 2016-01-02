var bodyParser = require('body-parser');
var middleware = require('app/middleware');
var router = module.exports = require('express').Router();
var responseTime = require('response-time');

router.use(
  responseTime(),
  middleware.vanity
);

router.use('/api', bodyParser.json({ limit: '1mb' }), require('./api'));

router.use(bodyParser.urlencoded({ extended: false }));
