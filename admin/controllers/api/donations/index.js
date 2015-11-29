'use strict';

var DonorModel = require('../../../models').Donor,
    DonationModel = require('../../../models').Donations,
    shortid = require('shortid');

module.exports = function(router) {
    router.get('/:donor', function(req, res) {
        DonationModel.find({
            'donorid': req.params.donor
        }, function(err, data) {
            res.json(err ? {
                'error': 'API Error',
                'message': 'Error occurred'
            } : data);
        });
    });

    router.post('/', function(req, res) {
        var response = {};
        if (typeof req.body.donorid === 'undefined' || req.body.donorid === '') {
            if (typeof req.body.name === 'undefined' || req.body.name === '') {
                response = {
                    'error': 'Incorrect params',
                    'message': 'Name cannot be empty'
                };
            }
            if (typeof req.body.email === 'undefined' || req.body.email === '') {
                response = {
                    'error': 'Incorrect params',
                    'message': 'Email cannot be empty'
                };
            }
            if (typeof req.body.phone === 'undefined' || req.body.phone === '') {
                response = {
                    'error': 'Incorrect params',
                    'message': 'Phone cannot be empty'
                };
            }
        }
        if (typeof req.body.institution === 'undefined' || req.body.institution === '') {
            response = {
                'error': 'Incorrect params',
                'message': 'Insitution cannot be empty'
            };
        }
        if (typeof req.body.date === 'undefined' || req.body.date === '') {
            response = {
                'error': 'Incorrect params',
                'message': 'Date cannot be empty'
            };
        }
        if (typeof req.body.slot === 'undefined' || req.body.slot === '') {
            response = {
                'error': 'Incorrect params',
                'message': 'Slot cannot be empty'
            };
        }
        if (typeof req.body.category === 'undefined' || req.body.category === '') {
            response = {
                'error': 'Incorrect params',
                'message': 'Category cannot be empty'
            };
        }
        if (typeof req.body.amount === 'undefined' || req.body.amount === '') {
            response = {
                'error': 'Incorrect params',
                'message': 'Amount cannot be empty'
            };
        }
        if (typeof req.body.present === 'undefined' || req.body.present === '') {
            req.body.present = false;
        }
        if (!Object.keys(response).length) {
            var model = {};
            if (req.body.donorid) {
                model = {
                    id: shortid.generate(),
                    donorid: req.body.donorid,
                    institution: req.body.institution,
                    date: req.body.date,
                    slot: req.body.slot,
                    category: req.body.category,
                    amount: req.body.amount,
                    present: req.body.present
                };
                DonationModel(model).save(function(err, data) {
                    res.json(err ? {
                        'error': 'API Error',
                        'message': 'Could not add donor'
                    } : data);
                });
            } else {
                model = {
                    id: shortid.generate(),
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone
                };

                DonorModel(model).save(function(err, data) {
                    if (err) {
                        res.json({
                            'error': 'API Error',
                            'message': 'Could not add donor'
                        });
                    } else {
                        model = {
                            id: shortid.generate(),
                            donorid: data.id,
                            institution: req.body.institution,
                            date: req.body.date,
                            slot: req.body.slot,
                            category: req.body.category,
                            amount: req.body.amount,
                            present: req.body.present
                        };
                        DonationModel(model).save(function(err, data) {
                            res.json(err ? {
                                'error': 'API Error',
                                'message': 'Could not add donor'
                            } : data);
                        });
                    }
                });
            }
        } else {
            res.json(response);
        }
    });
};
