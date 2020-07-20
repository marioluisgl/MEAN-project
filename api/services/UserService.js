'use strict'

const User = require('../models/User');
const _ = require('lodash');
const config = require('../config/Config');

exports.save = function(data, files, res){

    data['created'] = new Date();
    data['role'] = config.roleEnum.USER;
    const user = new User(data);
    
    user.save((err, user) => {
        !err ? res.status(200).send({success: true, data: user}):        
            res.status(500).send({success: false, message: err.message});
    });
};

exports.findById = function (query, res) {
    User.findById(query, (err, user) => {
        err ? res.status(500).send({success: false, message: err.message}) :
            !user ? res.status(404).send({success: false, message: 'The User do not exist on DB'}):
                res.status(200).send({success: true, data: user});
            
    });
};


