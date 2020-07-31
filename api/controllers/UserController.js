'use strict'

const User = require('../models/User');
const userService = require('../services/UserService');
const authLocal = require('../auth/auth-local');
const formidable = require('formidable');
const _ = require('lodash');
const getFunctionUtil = require('../utils/GetFunctionUtil');
const commonController = require('./CommonController');
const config = require('../config/Config');
const { options } = require('../app');



exports.save = function(req, res, next){  
    let data, file;
    const form = formidable({multiples: true});

    form.parse(req, function (err, fields, files) {
        data = fields;
        _.forEach(data, (value, key) => {
            if (getFunctionUtil.isJson(value)) {
                data[key] = JSON.parse(value);
            }
        });
        file = files;
    });

    form.on('error', function (err) {
        res.status(401).send({success: false, message: err});
    });
    
    form.on('end', function () {
        userService.save(data, file, res, (err, result) =>{
            err ? res.status(401).send({success: false, message: err}) : res.json({
                success: true,
                data: result
            });
        }); 
    });    
};

exports.login = function(req, res){  
    let data;
    _.forEach(req.body, (value, key) =>{
        if(getFunctionUtil.isJson(value)){
            req.body[key] = JSON.parse(value);
        }
    });

    data = req.body;     
    authLocal.login(data, res, (err, result) =>{
        err ? res.status(401).send({success: false, message: err}) : res.json({
            success: true,
            data: result
        });
    });    
};

exports.findById = function (req, res) {
    req.decoded != 'Anonymous' ?
        userService.findById({_id: req.params.id}, res) :
        res.status(401).send({success: false, message: 'Bad Request: Not Authorization'});
};

exports.findAll = function (req, res) {
    req.decoded != 'Anonymous' && req.decoded.role != config.roleEnum.USER ? 
        commonController.findAll(req, res, User, [], []) :
            res.status(401).send({success: false, message: 'Bad Request: Not Authorization'});
};


