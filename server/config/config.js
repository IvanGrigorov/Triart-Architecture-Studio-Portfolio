var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

var connectionString = "mongodb://Ivan_Grigorov:20041894@ds023373.mlab.com:23373/triart_database";
if (process.env.NODE_ENV !== "production") {
    connectionString = 'mongodb://localhost:27017/triart_a_new_final_testing_database';
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