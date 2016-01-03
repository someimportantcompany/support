var errors = module.exports = function errors(opts) {
  opts = opts || {};

  var error = new Error(opts.message || 'An error occurred along the way');
  Object.keys(opts).forEach(function (key) {
    error[key] = opts[key];
  });

  if (!opts.name) error.name = 'Error';
  else if (error.name.substr(-5) !== 'Error') error.name += 'Error';

  error.status = error.status || errors.http_status_map[error.name] || 500;
  error.status_message = errors.http_status_codes[error.status] || errors.http_status_codes[500];

  return error;
};

errors.Argument = errors.ArgumentError = function ArgumentError(message) {
  return errors({
    message: message,
    name: 'ArgumentError',
    status: 400
  });
};

errors.ExitEarly = errors.ExitEarlyError = function () {
  return errors({
    name: 'ExitEarlyError',
    message: 'Exiting the logic early',
    status: 200
  });
};

errors.HttpStatus = errors.HttpStatusError = function HttpStatusError(status, message) {
  return errors({
    message: message,
    name: 'HttpStatusError',
    status: status
  });
};

errors.NotFound = errors.NotFoundError = function NotFoundError(message) {
  return errors({
    message: message,
    name: 'NotFoundError',
    status: 404
  });
};

errors.NotImplemented = errors.NotImplementedError = function NotImplementedError(message) {
  return errors({
    message: message,
    name: 'NotImplemented',
    status: 501
  });
};

errors.Validation = errors.ValidationError = function ValidationError(message, user_message) {
  return errors({
    message: message,
    name: 'ValidationError',
    status: 400,
    user_message: user_message || null
  });
};

errors.http_status_codes = {
  // 1XX Informational
  "100": "Continue",
  "101": "Switching Protocols",

  // 2XX Success
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",

  // 3XX Redirection
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "306": "(Unused)",
  "307": "Temporary Redirect",

  // 4XX Client Error
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Request Entity Too Large",
  "414": "Request-URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Requested Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I Am A Teapot",
  "420": "Enhance Your Calm",
  "429": "Too Many Requests",

  // 5XX Server Error
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",

  // Now for some more (in)appropriate ones...

  // 70X Inexcusable
  "701": "Meh",
  "702": "Emacs",
  "703": "Explosion",

  // 71X Novelty Implementations
  "710": "PHP",
  "711": "Convenience Store",
  "712": "NoSQL",
  "719": "I am not a teapot",

  // 72X Edge Cases
  "720": "Unpossible",
  "721": "Known Unknowns",
  "722": "Unknown Unknowns",
  "723": "Tricky",
  "724": "This line should be unreachable",
  "725": "It works on my machine",
  "726": "It's a feature, not a bug",
  "727": "32 bits is plenty",

  // 73X Fucking
  "731": "Fucking Rubygems",
  "732": "Fucking Unicode",
  "733": "Fucking Deadlocks",
  "734": "Fucking Deferreds",
  "735": "Fucking IE",
  "736": "Fucking Race Conditions",
  "737": "FuckingThreadsing",
  "738": "Fucking Bundler",
  "739": "Fucking Windows",

  // 74X Meme Driven
  "740": "Computer says no",
  "741": "Compiling",
  "742": "A kitten dies",
  "743": "I thought I knew regular expressions",
  "744": "Y U NO write integration tests?",
  "745": "I don't always test me code, but when I do I do it in production",
  "746": "Missed Ballmer Peak",
  "747": "Motherfucking Snakes on the Motherfucking Plane",
  "748": "Confounded by ponies",
  "749": "Reserved for Chuck Norris"
};

errors.http_status_map = {
  'ArgumentError': 400,
  'Error': 500,
  'ValidationError': 400
};
