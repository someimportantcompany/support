var debug = require('debug')('Support:Nunjucks');
var fs = require('fs');
var nunjucks = require('nunjucks');
var path = require('path');

module.exports = function setNunjucks(app, opts) {
  if (!app) throw new SyntaxError('Missing app property for this view engine');
  if (!opts) throw new SyntaxError('Missing opts property for this view engine');
  if (!opts.views) throw new SyntaxError('Missing views property for this view engine');

  opts.extensions = opts.extensions || [];
  if (!Array.isArray(opts.extensions)) throw new SyntaxError('opts.extensions property should be an array');
  opts.extensions.unshift(path.join(__dirname, 'extensions'));

  opts.filters = opts.filters || [];
  if (!Array.isArray(opts.filters)) throw new SyntaxError('opts.filters property should be an array');
  opts.filters.unshift(path.join(__dirname, 'filters'));

  opts.views = opts.views || [];
  if (!Array.isArray(opts.views)) throw new SyntaxError('opts.views property should be an array');

  var env = nunjucks.configure(opts.views, {
    autoescape: true,
    express: app
  });

  [ 'extensions', 'filters' ].forEach(function (type) {
    (opts[type] || []).forEach(function (folder) {
      var count = 0;
      fs.readdirSync(path.join(folder)).sort().forEach(function (file) {
        if (path.extname(file) !== '.js') return;

        var moduleFn = require(path.join(folder.concat([ file ])));

        switch (type) {
          case 'extensions':
            env.addExtension(path.basename(file, path.extname(file)), moduleFn);
            count++;
            break;

          case 'filters':
            env.addFilter(path.basename(file, path.extname(file)), moduleFn, moduleFn.isAsync || false);
            count++;
            break;

          default:
            throw new Error('Unknown type "' + type + '"');
        }
      });
      debug('Loaded ' + count + ' ' + type);
    });
  });

  app.set('view engine', 'nunjucks');
  return env;
};
