var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    port: 3001,
    folder: '/Users/yucecelikel/Documents/sharedfolder'
  }
};

module.exports = config[env];
