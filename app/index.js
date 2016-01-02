var config = require('app/config');
var EventEmitter = require('events').EventEmitter;
var express = require('express');
var extend = require('deep-extend');
var http = require('http');
var util = require('util');

var Support = function () {
  EventEmitter.call(this);
  extend(config, {
    nunjucks: {
      extensions: [],
      filters: []
    }
  });
};
util.inherits(Support, EventEmitter);

Support.prototype.config = function (conf) {
  extend(config, conf);
  return this;
};

var IS_RUNNING = false;
Support.prototype.listen = function (callback) {
  if (IS_RUNNING) return callback && callback(new Error('You cannot start listening twice'));
  IS_RUNNING = true;

  // if (this.listeners('error').length === 0) this.on('error', function defaultErrorHandler(e) {
  //   throw e;
  // });s

  var app = express();
  var server = http.createServer(app);

  server.on('error', function (e) {
    this.emit('error', e);
  }.bind(this));

  server.on('listening', function () {
    this.emit('listening');
  }.bind(this));

  app.disable('x-powered-by');
  app.request.support = app.response.support = app.support = this;
  app.use(require('app/routes'));

  server.listen(config.http.port, config.http.host, function () {
    console.log('Support listening on %s:%d', config.http.host, config.http.port);
    callback && callback();
  });
};

module.exports = new Support();
module.exports.SupportClass = Support;
