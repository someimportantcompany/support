var config = require('app/config');
var debug = require('debug')('Support:Server');
var events = require('app/lib/events');
var express = require('express');
var extend = require('deep-extend');
var http = require('http');
var nunjucks = require('app/nunjucks');
var path = require('path');

var Support = function () {
  config.nunjucks = config.nunjucks || {};
};

Support.prototype.config = function (conf) {
  extend(config, conf);
  return this;
};

/**
 * Map the events "on" function so developers can attach applications to our events!
 */
Support.prototype.on = function () {
  return events.on.apply(events, arguments);
};

var IS_RUNNING = false;
Support.prototype.listen = function (callback) {
  if (IS_RUNNING) return callback && callback(new Error('You cannot start listening twice'));
  IS_RUNNING = true;

  // if (this.listenerCount('error') === 0) this.on('error', function defaultErrorHandler(e) {
  //   throw e;
  // });s

  debug(config);

  var app = express();
  var server = http.createServer(app);

  nunjucks(app, {
    extensions: config.nunjucks.extensions,
    filters: config.nunjucks.filters,
    views: [ path.join(__dirname, 'templates') ].concat(config.nunjucks.views || [])
  });

  server.on('error', function (e) {
    events.emit('error', e);
  });

  server.on('listening', function () {
    events.emit('listening');
  });

  app.disable('x-powered-by');
  app.request.support = app.response.support = this;
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(require('app/routes'));

  server.listen(config.http.port, config.http.host, function () {
    console.log('Support listening on %s:%d', config.http.host, config.http.port);
    events.emit('init', config);
    callback && callback();
  });
};

Support.prototype.plugin = function (plugin) {
  if (plugin.listeners('init').length) {
    events.on('init', function () {
      plugin.emit.apply(plugin, [ 'init' ].concat(Array.prototype.slice.call(arguments)));
    });
  }
};

module.exports = new Support();
module.exports.SupportClass = Support;
