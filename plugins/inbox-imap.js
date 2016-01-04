var debug = require('debug')('Support:Plugins:IMAP');
var inbox = require('inbox');
var MailParser = require('mailparser').MailParser;
var SupportPlugin = require('../plugin');

var imap = module.exports = new SupportPlugin('Inbox IMAP');

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
  var client = this.client = inbox.createConnection(false, config.imap.host, {
    secureConnection: true,
    auth: {
      user: config.imap.username,
      pass: config.imap.password
    }
  });

  client.on('connect', function () {
    debug('IMAP connected');

    client.openMailbox('INBOX', function (err, mailbox) {
      if (err) return self.emit('error', err);

      debug('mailbox', mailbox);

      client.search(SEARCH_QUERY, true, function (err, uids) {
        if (err) return self.emit('error', err);

        debug('uids', uids);
        uids.forEach(function (uid) {
          self.emit('parse-uid', uid);
        });
      });
    });
  });

  client.on('error', function (e) {
    self.emit('error', e);
  });

  client.on('new', function (message) {
    debug('new-email', message);
    self.emit('parse-uid', message.UID);
  });

  client.connect();
});

imap.on('parse-uid', function parseUid(uid) {
  if (!this.client) this.emit('error', new Error('Client has not been initialised'));

  var client = this.client;
  var parser = new MailParser(PARSER_OPTS);
  parser.on('end', function (email) {
    this.emit('new-email', email);
  }.bind(this));

  client.createMessageStream(uid).pipe(parser);
});

imap.on('new-email', function newEmail(email) {
  console.log(JSON.stringify(email, null, 2));
});
