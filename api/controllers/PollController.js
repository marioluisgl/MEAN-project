'use strict'

const User = require('../models/User');
const userService = require('../services/UserService');
const authLocal = require('../auth/auth-local');
const formidable = require('formidable');
const _ = require('lodash');
const getFunctionUtil = require('../utils/GetFunctionUtil');
const commonController = require('./CommonController');


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