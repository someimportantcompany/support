var async = require('async');
var debug = require('debug')('Support:Middleware:Page');

function Page(req, res) {
  this._rendered = false;

  this.data = {};
  this.req = req;
  this.res = res;
  this.template = null;

  this.res.locals = this.res.locals || {};
}

Page.prototype.render = function renderPage(renderFn, errorFn) {
  if (this._rendered) return;
  this._rendered = true;

  this.data.form = this.data.form || this.res.locals.form || {};
  this.data.title = this.title || this.res.locals.title || '';

  if (!this.template) return errorFn(new Error('No template specified!'));

  debug('Rendering', this.template, this.data);
  renderFn(this.template, this.data);
};

module.exports = function createPage(fns) {
  return function createPageMiddleware(req, res, next) {
    var page = new Page(req, res);
    async.eachSeries(
      Array.isArray(fns) ? fns : [ fns ],
      function runPageFunction(fn, next) {
        if (typeof fn !== 'function') {
          return next(new TypeError('Expecting function in page middleware, given ' + (typeof fn)));
        }
        else if (fn.length === 1) {
          fn.call({}, page);
          return next();
        }
        else {
          fn.call({}, page, next);
        }
      },
      function onPageFinished(error) {
        if (error) return next(error);
        page.render(res.render.bind(res), next);
      }
    );
  };
};
