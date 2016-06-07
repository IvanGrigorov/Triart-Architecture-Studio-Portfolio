var encryption = require('../utilities/encryption');
var users = require('../data/users');
var validation = require('../utilities/validation');

var CONTROLLER_NAME = 'users';

module.exports = {
    getRegister: function(req, res, next) {
        res.render('register')
    },
    postRegister: function(req, res, next, locals) {
        var newUserData = req.body;

        //if (newUserData.password != newUserData.confirmPassword) {
        //    req.session.error = 'Passwords do not match!';
        //    res.redirect('register');
        //}
        //else {
        if (validation.checkIfValueIsUndefinedOrEmpty(newUserData.username) ||
            validation.checkIfValueIsUndefinedOrEmpty(newUserData.password)) {
            req.session.error = locals.constantsSet.errors.emptyFieldsError;
            res.redirect("register");
            return;
        }
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
        users.create(newUserData, function(err, user) {
            if (err) {
                console.log('Failed to register new user: ' + err);
                return;
            }

            req.logIn(user, function(err) {
                if (err) {
                    res.status(400);
                    return res.send({
                        reason: err.toString()
                    }); // TODO:
                } else {
                    res.redirect('/');
                }
            })
        });
        //}
    },
    getLogin: function(req, res, next) {
        res.render('login');
    }
};