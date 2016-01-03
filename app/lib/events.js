/**
 * This is literally a single event emitter for our application
 * Needs to be an independent module since it needs to be shared throughout the application
 */
var EventEmitter = require('events').EventEmitter;
module.exports = new EventEmitter();
