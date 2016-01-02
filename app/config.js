var path = require('path');
var yaml = require('node-yaml-config');

var config = module.exports = yaml.load(path.join(__dirname, 'config.yml'));
config.environment = process.env.NODE_ENV || 'development';
config.isDevelopment = config.environment === 'development';
config.isProduction = config.environment === 'production';
