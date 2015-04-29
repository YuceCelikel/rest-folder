var config = require('./config/config'),
  fs = require('fs');
  url = require('url');

var saveFile = function(request, response) {
  var writer = fs.createWriteStream("file.jpg");
  request.pipe(writer);

  writer.on('finish', function() {
    response.writeHead(201, { "Content-Type": "text/plain" });
    response.end("created");
  });
};

module.exports = function(request, response) {
  if(request.method == "POST") {
    saveFile(request, response);
  }
}
