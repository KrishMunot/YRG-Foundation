'use strict';

var mongoose = require('mongoose');

var donor = function() {
    var schema = mongoose.Schema({
        'id': String,
        'name': String,
        'email': String,
        'phone': String
    });
    return mongoose.model('donors', schema);
};

module.exports = donor();
