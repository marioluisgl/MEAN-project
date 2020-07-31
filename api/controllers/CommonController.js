'use strict'

const User = require('../models/User');
const userService = require('../services/UserService');
const authLocal = require('../auth/auth-local');
//const formidable = require('formidable');
const _ = require('lodash');
const getFunctionUtil = require('../utils/GetFunctionUtil');


// Metodo de prueba
exports.test = function(req, res){
    req.decoded == 'Anonymous' ?
        res.status(401).send({
            success: false,
            message: "Bad Request: Bad Request: Not Authorization"
        }):   
        res.status(200).send({
            success: true,
            user: req.decoded.name
        });    
};

exports.findAll = function (req, res, Schema, populate, filters) {
    const count = req.query.count !== undefined ? req.query.count : 5;
    const page = req.params.page !== undefined ? req.params.page : 1;
    delete(req.query.count);
    delete(req.params.page);
    const query = req.query;
    const options = {
        page: page,
        limit: count,
        sort: {'_id': -1 || req.query.sort},
        populate: populate
    };

    Schema.paginate(query, options, (err, result) => {
            !err ? res.status(200).send({success: true, data: result}):
                res.status(401).send({success: false, message: err.message});    
        });
};


