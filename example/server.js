// var path = require('path');
var support = require('../support'); // IRL it'll be 'support'

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

support.plugin(require('../plugins/imap')); // IRL it'll be 'support/plugins/imap'

support.listen();
