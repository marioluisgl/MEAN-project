'use strict'

const User = require('../models/User');
const _ = require('lodash');
const config = require('../config/Config');
const jwtService = require('./jwt-service/jwt');
const passport = require('passport');
const passportLocal = require('passport-local');
const { use } = require('passport');


exports.login = function(data, res){

    User.findOne({username: data.username}, (err, user) =>{
        
        if(err) return res.status(500).send({success: false, message: err});

        if(!user) return res.status(404).send({success: false, message: 'The user do not exist on DB'});

        const samePassword = user.verifyPassword(data.password);

        if(!samePassword) return res.status(201).send({success: false, message: 'Wrong password'});
       
        const token = jwtService.getToken(user);
        user.password = undefined;
        return res.status(200).send({success: true, data: {token: token, user: user}});        
    });
};





