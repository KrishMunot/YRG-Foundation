'use strict';

module.exports = function IndexModel() {
    return {
        title: 'YRG-Foundation',
        name: 'Admin Panel'
    };
};

module.exports.Donor = require('./mongodb/donor');
module.exports.Institutions = require('./mongodb/institutions');
module.exports.Meals = require('./mongodb/meals');
module.exports.Addons = require('./mongodb/addons');
module.exports.Donations = require('./mongodb/donation');
