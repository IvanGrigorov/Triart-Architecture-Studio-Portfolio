var UsersController = require('./UsersController'),
   // FilesController = require('./FilesController');
   ProjectController = require('./ProjectController');

module.exports = {
    users: UsersController,
    //files: FilesController
    projects: ProjectController
};