var Model = module.exports = function Model(name, fields, opts) {
  this.name = name;
  this.fields = fields;
  opts = opts || {};
};

Model.prototype.find = function (opts, callback) {
  callback(new Error('This isn\'t finished yet!'));
};

Model.prototype.findById = function (opts, callback) {
  callback(new Error('This isn\'t finished yet!'));
};

Model.prototype.findOne = function (opts, callback) {
  callback(new Error('This isn\'t finished yet!'));
};

Model.prototype.findOneById = function (opts, callback) {
  callback(new Error('This isn\'t finished yet!'));
};
