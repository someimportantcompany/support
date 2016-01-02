var fs = require('fs');
var path = require('path');

(function collect(object, directory, recurse) {
  recurse = recurse || false;

  fs.readdirSync(path.join.apply(path, directory)).sort().forEach(function (c) {
    if (recurse && !path.extname(c)) {
      object[c] = {};
      return collect(object[c], directory.concat(c), false);
    }
    else if (path.extname(c) !== '.js') return;
    else if (recurse && path.basename(c) === 'index.js') return;

    Object.defineProperty(object, path.basename(c, path.extname(c)), {
      enumerable: true,
      value: require(path.join.apply(path, directory.concat(c)))
    });
  });
})(module.exports, [ __dirname ], true);
