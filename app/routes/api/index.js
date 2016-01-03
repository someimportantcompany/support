var middleware = require('app/middleware');
var router = module.exports = require('express').Router();

router.use(middleware.api.auth.verifyClient, middleware.api.auth.verifyKey);

router.use(middleware.api.errors);
