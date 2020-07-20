'use strict'

const User = require('../../models/User');
const moment = require('moment');
const jwt = require('jwt-simple');
const config = require('../../config/Config');

exports.ensureAuth = function(req, res, next){   
    const token = req.headers.token || req.headers.authorization;
   
    if (token) {
        try{
            var decoded = jwt.decode(token, config.secretKey);
            if(decoded.exp <= moment().unix()){
                return res.status(401).send({success: false, message: 'The token has expired'});
            }else{
                User.findById({_id: decoded.sub}, function (err, user) {
                    if (!err && user) {
                        if (user.password === decoded.password) {
                            decoded = Object.assign(user);
                            req.decoded = decoded;
                            next();
                        } else {
                            res.status(500).send({success: false, message: 'Failed to authenticate user wrong password'});
                        }
                    }
                    else{
                        res.status(404).send({success: false, message: "Failed to authenticate user token"});
                    }                       
                }); 
            }
        }catch(ex){
            return res.status(404).send({success: false, message: 'The token is not valid'});
        }
    } else {
        req.decoded = "Anonymous";
        next();
    }
};

