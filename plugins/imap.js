var async = require('async');
var debug = require('debug')('Support:Plugins:IMAP');
var inbox = require('inbox');
var MailParser = require('mailparser').MailParser;
var SupportPlugin = require('../plugin');

var imap = module.exports = new SupportPlugin();

var PARSER_OPTS = {
  streamAttachments: true,
  defaultCharset: 'utf8',
  showAttachmentLinks: true
};
var SEARCH_QUERY = {
  not: {
    seen: true
  }
};

imap.on('init', function connectImap(config) {
  if (!config.imap) this.emit('error', new Error('No IMAP in the config'));
  if (!config.imap.host || !config.imap.username || !config.imap.password) this.emit('error', new Error(
    'Missing IMAP host / username / password in the config'
  ));

  var self = this;

  self.client = inbox.createConnection(false, config.imap.host, {
    secureConnection: true,
    auth: {
      user: config.imap.username,
      pass: config.imap.password
    }
  });

  self.client.on('error', function (e) {
    self.emit('error', e);
  });

  self.client.on('connect', function () {
    debug('IMAP connected');

    self.client.openMailbox('INBOX', function (err, mailbox) {
      if (err) return self.emit('error', err);

      debug(mailbox);

      self.client.search(SEARCH_QUERY, true, function (err, uids) {
        if (err) return self.emit('error', err);

        debug(uids);

        async.each(uids, function (uid, next) {
          var parser = new MailParser(PARSER_OPTS);
          parser.on('end', function (email) {
            console.log(JSON.stringify(email, null, 2));
          });

          self.client.createMessageStream(uid).pipe(parser).on('end', next);
        });
      });
    });
  });

  self.client.connect();
});
