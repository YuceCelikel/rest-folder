var config = require('./config/config'),
  glob = require('glob')
  http = require('http');
  folder = require('./folder');

http.createServer(function(request, response) {
  folder(request, response);
}).listen(config.port, "127.0.0.1");
console.log("server started at http://127.0.0.1:" + config.port + "/");
