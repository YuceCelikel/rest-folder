var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';
    folder = process.env.FOLDER || '/Users/yucecelikel/Documents/sharedfolder';
    port = process.env.PORT || 3001;

var config = {
  development: {
    root: rootPath,
    port: port,
    folder: folder
  }
};

module.exports = config[env];
