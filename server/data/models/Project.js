var mongoose = require('mongoose');

module.exports.init = function() {
    var projectSchema = mongoose.Schema({
        title: { type: String, require: '{PATH} is required', unique: true },
        area: String,
        addres: String,
        investor: String,
        category: String
    });

    var User = mongoose.model('Project', projectSchema);
};


