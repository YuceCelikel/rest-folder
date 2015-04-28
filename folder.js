var config = require('./config/config'),
  fs = require('fs');

var saveFile = function(request, response) {
  var writer = fs.createWriteStream("file.jpg");
  request.pipe(writer, { end: false });
  request.on('end', function() {
    writer.end();

    response.writeHead(201, { "Content-Type": "text/plain" });
    response.end("created");
  });
};


module.exports = function(request, response) {
  if(request.method == "POST") {
    saveFile(request, response);
  }
}
