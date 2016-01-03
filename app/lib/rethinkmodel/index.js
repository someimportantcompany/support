var _ = require('lodash');
var Model = require('./model');

module.exports = function rethinkmodel(opts) {
  if (!_.isPlainObject(opts)) throw new Error('Opts should be a plain object');
  if (!_.isString(opts.name)) throw new Error('C\'mon at least name the model!');

  var model = new Model(opts.name, opts.fields || {}, {});

  return model;
};

module.exports.fields = require('./fields');
