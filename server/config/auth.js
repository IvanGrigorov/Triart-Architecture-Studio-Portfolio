var passport = require('passport');
var validation = require("../utilities/validation");

module.exports = {
    login: function(req, res, next, locals) {
        var auth = passport.authenticate('local', function(err, user) {
            if (err) return next(err);
            if (!user) {
                req.session.error = locals.constantsSet.errors.userNotExist;
                res.redirect("login");
                console.log(user); // TODO:
            }

            req.logIn(user, function(err) {
                if (err) return next(err);
                res.redirect('/');
            })
        });

        auth(req, res, next);
    },
    logout: function(req, res, next) {
        req.logout();
        res.redirect('/');
    },
    isAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        } else {
            next();
        }
    }
};