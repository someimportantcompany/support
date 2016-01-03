var EventEmitter = require('events').EventEmitter;
var events = require('app/lib/events');
var util = require('util');

var SupportPlugin = module.exports = function SupportPlugin(opts) {
  EventEmitter.call(this);

  opts = opts || {};
  if (typeof opts === 'string') opts = { name: opts };

  this.events = events;
  this.name = opts.name;
};
util.inherits(SupportPlugin, EventEmitter);
