'use strict'

const User = require('../models/User');
const userService = require('../services/UserService');
const pollService = require('../services/PollService');
const authLocal = require('../auth/auth-local');
const formidable = require('formidable');
const _ = require('lodash');
const getFunctionUtil = require('../utils/GetFunctionUtil');
const commonController = require('./CommonController');
const config = require('../config/Config');

// Metodo de prueba
exports.test = function(req, res){
    req.decoded == 'Anonymous' ?
        res.status(401).send({
            success: false,
            message: "Bad Request: Not Authorization for Anonymous Users"
        }):   
        res.status(200).send({
            success: true,
            user: req.decoded.name
        });    
};

exports.save = function(req, res){
    let data, files;
    if(req.decoded == 'Anonymous' || req.decoded.role == config.roleEnum.USER){
        return res.status(401).send({
            success: false,
            message: "Bad Request: Not Authorization to save Polls"
        });
    }else{
        _.forEach(req.body, (value, key) =>{
            if(getFunctionUtil.isJson(value)){
                req.body[key] = JSON.parse(value);
            }
        });
        data = req.body;     
        pollService.save(data, files, res, (err, result) =>{
            err ? res.status(401).send({success: false, message: err}) : res.json({
                success: true,
                data: result
            });
        }); 
    }            
};