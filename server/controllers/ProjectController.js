var projects = require('../data/projects'),
    Project = require('mongoose').model('Project'),
    fs = require('fs'),
    validation = require("../utilities/validation"),
    rimraf = require("rimraf");


var CONTROLLER_NAME = 'users';

module.exports = {
    getAllProjectsForCategory: function(type, req, res, next) {
        // Get information for projects for category // TODO:
        // Render the category template with the information
        //res.render('register')
        var allProjects = {};
        Project.find({
            category: type
        }, function(err, projects) {
            projects.forEach(function(project) {
                allProjects[project._id] = project;

                // Add names of all images for the project in an array
                var directoryCategoryFiles = __dirname + "/../../public/uploadedImages/categories/" + type + "/" + project.title;
                if (validation.checkIfPathExists(directoryCategoryFiles)) {
                    var files = fs.readdirSync(directoryCategoryFiles);
                    allProjects[project._id].files = files[0];
                }
            })
            console.log(allProjects);
            res.render("categories", {
                projects: allProjects,
                category: type
            });
        });
    },
    getProject: function(project, req, res, next) {
        // Get info for project
        // Render the project temlate with the info
        Project.findOne({
            title: project
        }).exec(function(err, project) {
            if (err) {
                console.log("There has been an error when loading the project: " + err);
            } else {
                console.log(project);
                var directoryProjectsFiles = __dirname + "/../../public/uploadedImages/projects/" + project.category + "/" + project.title;
                if (validation.checkIfPathExists(directoryProjectsFiles)) {
                    var files = fs.readdirSync(directoryProjectsFiles);
                    project.files = [];
                    files.forEach(function(file) {
                        project.files.push(file);
                    });
                }
                res.render("project", {
                    project: project
                });
            }
        })

    },
    postUploadProject: function(locals, req, res, next) {

        var fstream;
        req.pipe(req.busboy);
        var directoryCategoryFiles;
        var directoryProjectsFiles;

        // Var to save how much of the fields are filled
        var numberOfCheckedAndRightFields = 0;

        // Handle the post uploaded project

        var newProject = {};
        req.busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {

            // When field is empty 
            if (validation.checkIfValueIsUndefinedOrEmpty(val)) {

                // Check if error is already set
                if (validation.checkIfValueIsUndefinedOrEmpty(req.session.error)) {
                    req.session.error = locals.constantsSet.errors.emptyFieldsError;
                }
                return false;

                // If everithing is ok 
                // Save the value and iterate the number of checked fields
            } else {
                newProject[fieldname] = val;
                numberOfCheckedAndRightFields++;
            }

            // If title is set and all of the fields (5) are filled
            // Create folders to store the pictures for the project
            if ((newProject.title !== undefined) && (newProject.category !== undefined) && (numberOfCheckedAndRightFields === 5)) {
                directoryCategoryFiles = __dirname + "/../../public/uploadedImages/categories/" + newProject.category + "/" + newProject.title;
                directoryProjectsFiles = __dirname + "/../../public/uploadedImages/projects/" + newProject.category + "/" + newProject.title;
                fs.mkdir(directoryCategoryFiles, 0777);
                fs.mkdir(directoryProjectsFiles, 0777);
            }
            console.log(newProject);
        });

        // Handle the uploaded pictures for the project 

        req.busboy.on('file', function(fieldName, file, fileName) {
            if ((directoryCategoryFiles !== undefined) && (directoryProjectsFiles !== undefined)) {
                var directoryPath;
                if (fieldName === "categoryFile") {
                    directoryPath = directoryCategoryFiles;
                } else {

                    directoryPath = directoryProjectsFiles;
                }
                if ((fileName !== null) && (fileName !== undefined) && (fileName !== "")) {
                    console.log("checks go here")
                    var filePath = directoryPath + "/" + fileName;
                    //Write object on file system
                    fstream = fs.createWriteStream(filePath);
                    file.pipe(fstream);
                } else {
                    file.resume();
                }
            } else {
                file.resume();
            }
        });

        req.busboy.on('finish', function() {
            // If there is an error refresh page and show the error
            if (!validation.checkIfValueIsUndefinedOrEmpty(req.session.error)) {
                res.redirect("uploadProject");

                // Else save the new project and reirect to index
            } else {
                projects.create(newProject, function(err, user) {
                    if (err) {
                        console.log('Failed to create new project: ' + err);
                        return;
                    } else {
                        res.render("index");
                    }
                });
            }
        });


    },
    getUploadProject: function(req, res, next) {
        res.render('uploadProject');
    },

    getEditProject: function(projectName, req, res, next, app) {
        Project.findOne({
            title: projectName
        }).exec(function(err, project) {
            if (err) {
                res.send({
                    err: err
                });
            } else {
                res.render("editProject", {
                    project: project
                });
            }
        })
    },

    postEditProject: function(projectName, locals, req, res, next) {
        var fstream;
        req.pipe(req.busboy);

        var updatedProject = {};
        req.busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {

            // When field is empty 
            if (validation.checkIfValueIsUndefinedOrEmpty(val)) {

                // Check if error is already set
                if (validation.checkIfValueIsUndefinedOrEmpty(req.session.error)) {
                    req.session.error = locals.constantsSet.emptyFieldsError;
                }
                return false;
            } else {
                updatedProject[fieldname] = val;
            }
        });


        req.busboy.on('finish', function() {
            if (!validation.checkIfValueIsUndefinedOrEmpty(req.session.error)) {
                res.redirect("editProject");
            } else {
                // Delete project from database
                // Delete the image folders for the project
                var oldProject;
                Project.findOne({
                    title: projectName
                }).exec(function(err, project) {
                    oldProject = project;
                    var oldProjectsFilePath = __dirname + "/../../public/uploadedImages/projects/" + oldProject.category + "/" + oldProject.title;
                    var newProjectsFilePath = __dirname + "/../../public/uploadedImages/projects/" + updatedProject.category + "/" + updatedProject.title;
                    var oldCategoriessFilePath = __dirname + "/../../public/uploadedImages/categories/" + oldProject.category + "/" + oldProject.title;
                    var newCategoriesFilePath = __dirname + "/../../public/uploadedImages/categories/" + updatedProject.category + "/" + updatedProject.title;
                    fs.renameSync(oldProjectsFilePath, newProjectsFilePath);
                    fs.renameSync(oldCategoriessFilePath, newCategoriesFilePath);
                    Project.update(oldProject, updatedProject, function() {
                        res.render("index");
                    });
                })
            }

        });

    },

    deleteProject: function(req, res, next) {
        var projectInfo = {
            title: req.body.title,
            category: req.body.category
        }
        var projectToDelete;
        Project.findOne({
            title: projectInfo.title
        }).exec(function(err, project) {
            projectToDelete = project;
            console.log("tuk");
            Project.remove({
                title: projectInfo.title
                    //category: projectInfo.category
            }, function() {
                console.log("eeeee");
                var directoryProjectsFiles = __dirname + "/../../public/uploadedImages/projects/" + projectToDelete.category + "/" + projectInfo.title;
                var directoryCategoriesFiles = __dirname + "/../../public/uploadedImages/categories/" + projectToDelete.category + "/" + projectInfo.title;
                if (validation.checkIfPathExists(directoryCategoriesFiles) && validation.checkIfPathExists(directoryProjectsFiles)) {
                    rimraf(directoryCategoriesFiles, function(err) {
                        console.log(err);
                    });
                    rimraf(directoryProjectsFiles, function(err) {});
                }
                res.send({
                    redirect: "/index"
                });
            })
        })
    }
};