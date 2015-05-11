var config = require('./config/config'),
  fs = require('fs'),
  url = require('url'),
  mkdirp = require('mkdirp'),
  path = require('path'),
  glob = require('glob');

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

      writer.on('finish', function() {
        response.writeHead(201, { "Content-Type": "text/plain" });
        response.end("created");
      });

      request.pipe(writer);
    }
  });
};

var getFile = function(request, response) {
  var pathname = url.parse(request.url).pathname;
  var fullPath = config.folder + pathname;
  var filename = path.basename(fullPath);

  response.setHeader('Content-disposition', 'attachment; filename=' + filename);
  //res.setHeader('Content-type', mimetype);

  var reader = fs.createReadStream(fullPath);
  reader.on('error', function(error) {
    if(error.code == "ENOENT") {
      response.writeHead(404);
      response.end();
    }
    else {
      response.writeHead(500);
      response.end(error.message);
    }
  });
  reader.pipe(response);
};

var fileExists = function(request, response) {
  var pathname = url.parse(request.url).pathname;
  var fullPath = config.folder + pathname;

  fs.exists(fullPath, function(exists) {
    response.writeHead(exists? 200 : 404);
    response.end();
  });
};

var deleteFile = function(request, response) {
  var pathname = url.parse(request.url).pathname;
  var fullPath = config.folder + pathname;

  glob(fullPath + '*', null, function(err, files) {
    var fileCount = files.length, processedCount = 0, totalDeletedCount = 0;

    if(fileCount == 0) {
      response.writeHead(400);
      response.end();
    }

    for(var i=0;i<files.length;i++) {
      var file = files[i];

      fs.unlink(file, function(err) {
        processedCount = processedCount + 1;

        if(!err)
          totalDeletedCount = totalDeletedCount + 1;

        if(fileCount == processedCount) {
          response.writeHead(fileCount == totalDeletedCount? 200 : 500);
          response.end();
        }
      });
    };
  });
};

module.exports = function(request, response) {
  if(request.method == "POST") {
    saveFile(request, response);
  }
  else if(request.method == "GET") {
    getFile(request, response);
  }
  else if(request.method == "HEAD") {
    fileExists(request, response);
  }
  else if(request.method == "DELETE") {
    deleteFile(request, response);
  }
}
