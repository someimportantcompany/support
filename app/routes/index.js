var auth = require('app/routes/auth');
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

router.use('/login', auth.login);
router.use(middleware.auth.requireAuth);
router.use('/logout', auth.logout);
