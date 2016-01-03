var fields = require('app/lib/fields');
var rethinkmodel = require('app/lib/rethinkmodel');

module.exports = rethinkmodel({
  name: 'Users',
  fields: {
    name: fields.string(),
    email: fields.email()
  }
});
