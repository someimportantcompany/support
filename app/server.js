var support = require('./index');

support.config({
  api: {
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
  }
});

support.listen();
