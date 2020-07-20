'use strict'

const moment = require('moment');
const jwt = require('jwt-simple');
const config = require('../../config/Config');

exports.getToken = function(user){
    const payLoad = {
        sub: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role, 
        iat: moment().unix(),
        exp: moment().add(90, 'days').unix
    };

    return jwt.encode(payLoad, config.secretKey);
};