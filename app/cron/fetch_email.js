var async = require('async');
var config = require('app/config');
var debug = require('debug')('Support:Cron:IMAP');
var inbox = require('inbox');
var MailParser = require('mailparser').MailParser;

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

module.exports = function (callback) {
  var client = inbox.createConnection(false, config.imap.host, {
    secureConnection: true,
    auth: {
      user: config.imap.username,
      pass: config.imap.password
    }
  });

  client.on('error', function (e) {
    client.close();
    callback && callback(e);
  });

  client.on('connect', function () {
    debug('IMAP connected');

    // client.listMailboxes(function (err, mailboxes) {
    //   if (err) {
    //     client.close();
    //     return callback && callback(err);
    //   }
    //
    //   debug(mailboxes);
    //   callback();
    // });

    client.openMailbox('INBOX', function (err, mailbox) {
      if (err) {
        client.close();
        return callback && callback(err);
      }

      debug(mailbox);

      // client.listMessages(0, 10, function (err, messages) {
      //   if (err) {
      //     client.close();
      //     return callback && callback(err);
      //   }
      //
      //   console.log(JSON.stringify(messages, null, 2));
      //
      //   var parser = new MailParser(PARSER_OPTS);
      //   parser.on('end', function (email) {
      //     console.log(JSON.stringify(email, null, 2));
      //   });
      //   client.createMessageStream(1).pipe(parser).on('end', function () {
      //     //client.close();
      //     //callback && callback();
      //   });
      // });

      client.search(SEARCH_QUERY, true, function (err, uids) {
        if (err) {
          client.close();
          return callback && callback(err);
        }

        debug(uids);

        async.each(uids, function (uid, next) {
          var parser = new MailParser(PARSER_OPTS);
          parser.on('end', function (email) {
            console.log(JSON.stringify(email, null, 2));
          });

          client.createMessageStream(uid).pipe(parser).on('end', next);
        }, function () {
          // client.close();
          // callback && callback(err);
        });
      });
    });
  });

  client.on('close', function () {
    debug('IMAP disconnected');
  });

  client.on("new", function (message) {
    console.log('NEW EMAIL!');

    var parser = new MailParser(PARSER_OPTS);
    parser.on('end', function (email) {
      console.log(JSON.stringify(email, null, 2));
    });

    client.createMessageStream(message.UID).pipe(parser).on('end', function () {
      client.close();
      callback && callback();
    });
  });

  client.connect();
};
