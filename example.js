// var path = require('path');
var support = require('app'); // But for you, it'll be "support"

support.config({
  api: {
    clients: [
      'imap_inbox',
      'webapp'
    ],
    keys: [
      {
        key: "b9349b7e744c71e4ff1379a71552f1ac",
        name: "Example key"
      }
    ]
  },
  http: {
    host: '127.0.0.1',
    port: 3000
  },
  imap: {
    host: 'imap.gmail.com',
    username: process.env.IMAP_SUPPORT_USER,
    password: process.env.IMAP_SUPPORT_PASS
  },
  // nunjucks: {
  //   filters: [
  //     path.join(__dirname, 'filters')
  //   ]
  // }
});

if (false) support.listen();
else {
  require('app/cron/fetch_email')(function (err) {
    if (err) console.error(err.stack || err);
    else console.log('Finished!');
    process.exit(err ? 1 : 0);
  });
}
