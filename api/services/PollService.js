'use strict'

const Poll = require('../models/Poll');
const _ = require('lodash');
const config = require('../config/Config');

exports.save = function(data, files, res){

    data['created'] = new Date();
    const poll = new Poll(data);
    
    poll.save((err, poll) => {
        err ? res.status(500).send({success: false, message: err.message}) :
            !poll ? res.status(404).send({success: false, message: 'Error to save Poll on DB'}):
                res.status(200).send({success: true, data: poll});
    });
};

exports.findById = function (query, populate, res) {
    Poll.findById(query, (err, poll) => {
        !err ? res.status(200).send({success: true, data: poll}):
            res.status(500).send({success: false, message: err.message});
    }).populate(populate || []);
};