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

exports.save = function(req, res){  
    let data, files;
    _.forEach(req.body, (value, key) =>{
        if(getFunctionUtil.isJson(value)){
            req.body[key] = JSON.parse(value);
        }
    });

    data = req.body;     
    userService.save(data, files, res, (err, result) =>{
        err ? res.status(401).send({success: false, message: err}) : res.json({
            success: true,
            data: result
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
    req.decoded != 'Anonymous' ? 
        commonController.findAll(req, res, User, [], []) :
        res.status(401).send({success: false, message: 'Bad Request: Not Authorization'});
};


