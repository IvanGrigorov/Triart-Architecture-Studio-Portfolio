var fs = require('fs');

// Some validation functions used in project
module.exports = {
    // Check if th path to a directory actualy exists
    checkIfPathExists: function(path) {
        try {
            return fs.statSync(path).isDirectory();
        } catch (err) {
            return false;
        }
    },

    // Checks if value is empty or undefined
    checkIfValueIsUndefinedOrEmpty: function(value) {
        if ((value === "") || (value === undefined)) {
            return true;
        } else {
            return false;
        }
    }
}