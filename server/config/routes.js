var auth = require('./auth'),
    controllers = require('../controllers'),
    constants = require("../utilities/constants");

module.exports = function(app) {
    app.get('/register', controllers.users.getRegister);
    app.post('/register', function(req, res, next) {
        controllers.users.postRegister(req, res, next, app.locals);
    });

    app.get('/login', controllers.users.getLogin);
    app.post('/login', function(req, res, next) {
        auth.login(req, res, next, app.locals);
    });
    app.get('/logout', auth.isAuthenticated, auth.logout);

    // Render all projects from certain category
    app.get('/categories/:type', function(req, res, next) {
        var categoryType = req.params.type;
        controllers.projects.getAllProjectsForCategory(categoryType, req, res, next);
    });

    app.get("/editProject/:name", function(req, res, next) {
        var projectName = req.params.name;
        controllers.projects.getEditProject(projectName, req, res, next);
    });

    app.post("/editProject/:name", function(req, res, next) {
        var projectName = req.params.name;
        controllers.projects.postEditProject(projectName, app.locals, req, res, next);
    });

    app.post('/categories/:type', function(req, res, next) {
        //var categoryType = req.params.type;
        controllers.projects.deleteProject(req, res, next);
        //res.render("index");
    });
    //    res.render()
    //});

    //app.get('project/:id', function(req, res) {
    //    res.render()
    //});

    app.get("/index/:language", function(req, res) {
        var languageMode = req.params.language;
        app.locals.language = languageMode;
        if (app.locals.language === "BG") {
            app.locals.constantsSet = constants.constantsBG;
        } else {
            app.locals.constantsSet = constants.constantsEG;
        }
        res.render("index");
    })
    app.get("/references", function(req, res) {
        currentDevice = req.device.type;
        res.render("references", {
            currentevice: currentDevice
        });
    });

    app.get("/company", function(req, res) {
        res.render("company");
    });

    app.get("/contacts", function(req, res) {
        res.render("contacts");
    });

    app.get('/project/:name', function(req, res, next) {
        var projectName = req.params.name;
        controllers.projects.getProject(projectName, req, res, next);
    });

    app.get('/uploadProject', controllers.projects.getUploadProject);
    app.post('/uploadProject', function(req, res, next) {
        controllers.projects.postUploadProject(app.locals, req, res, next);
    });
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('*', function(req, res) {
        res.render('index');
    });
};