var _ = require('lodash');
var auth = module.exports = {};
var config = require('app/config');

var API_CLIENTS = _.get(config, 'api.clients') || [];
if (API_CLIENTS.length === 0) {
  console.warn('No API clients provided in the logs, so your API is unauthenticated');
}

var API_KEYS = _.get(config, 'api.keys') || [];
if (API_KEYS.length === 0) {
  console.warn('No API keys provided in the logs, so your API is unauthenticated');
}

auth.verifyClient = function (req, res, next) {
  if (API_KEYS.length === 0) return next();
};

auth.verifyKey = function (req, res, next) {
  if (API_KEYS.length === 0) return next();
};
