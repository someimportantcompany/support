var fields = module.exports = {};

fields.email = function emailField(field) {
  field = field || {};
  field.type = 'email';
  return field;
};

fields.string = function stringField(field) {
  field = field || {};
  field.type = 'textarea';
  return field;
};
