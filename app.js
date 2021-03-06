var config = require('./config/config'),
  http = require('http');
  folder = require('./folder');

process.on('uncaughtException', function (err) {
  console.log(err);
})

http.createServer(function(request, response) {
  folder(request, response);
}).listen(config.port, "0.0.0.0");
console.log("server started at http://0.0.0.0:" + config.port + "/");
