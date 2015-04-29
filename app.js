var config = require('./config/config'),
  http = require('http');
  folder = require('./folder');

http.createServer(function(request, response) {
  folder(request, response);
}).listen(config.port);
console.log("server started at http://127.0.0.1:" + config.port + "/");
