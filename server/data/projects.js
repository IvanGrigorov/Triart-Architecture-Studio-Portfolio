var Project = require('mongoose').model('Project');

module.exports = {
    create: function(user, callback) {
        Project.create(user, callback);
    }
};