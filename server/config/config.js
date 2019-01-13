var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

var connectionString = "###############################";
if (process.env.NODE_ENV !== "production") {
    connectionString = '###############################';
}


module.exports = {
    development: {
        rootPath: rootPath,
        // change the path of database
        db: connectionString,
        port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath,
        // change the path of database
        db: connectionString,
        port: process.env.PORT || 3000
    }
};
