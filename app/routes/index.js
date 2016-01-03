var auth = require('app/routes/auth');
var bodyParser = require('body-parser');
var middleware = require('app/middleware');
var path = require('path');
var router = module.exports = require('express').Router();
var responseTime = require('response-time');
var sass = require('node-sass-middleware');

router.use(
  responseTime(),
  middleware.vanity,
  sass({
    debug: true,
    src: path.join(__dirname, '..', 'styles'),
    dest: path.join(__dirname, '..', 'public', 'css'),
    outputStyle: 'compressed',
    prefix:  '/css'
  })
);

router.use('/api', bodyParser.json({ limit: '1mb' }), require('./api'));
router.use(bodyParser.urlencoded({ extended: false }));

router.use('/login', auth.login);
router.use(middleware.auth.requireAuth);
router.use('/logout', auth.logout);

router.get('/', function (req, res) {
  res.status(200).set('Content-Type', 'text/plain').send('Oh lol');
});

router.use(middleware.errors);
