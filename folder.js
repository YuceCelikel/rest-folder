var config = require('./config/config'),
  fs = require('fs');
  url = require('url')
  mkdirp = require('mkdirp');

var saveFile = function(request, response) {
  var pathname = url.parse(request.url).pathname;
  var fullPath = config.folder + pathname;
  var folderName = fullPath.substring(0, fullPath.lastIndexOf("/"));

  mkdirp(folderName, function(err) {
    if(err) {
      console.log(err);

      response.writeHead(400, { "Content-Type": "text/plain" });
      response.end();
    }
    else {
      var writer = fs.createWriteStream(fullPath);
      request.pipe(writer);

      writer.on('finish', function() {
        response.writeHead(201, { "Content-Type": "text/plain" });
        response.end("created");
      });
    }
  });
};

module.exports = function(request, response) {
  if(request.method == "POST") {
    saveFile(request, response);
  }
}
