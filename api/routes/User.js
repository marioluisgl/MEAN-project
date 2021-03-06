'use strict'

const express = require('express');
const route = express.Router();

var UserController = require('../controllers/UserController');

//Authentication middleware
var md_auth = require('./middlewares/Authorization');

//Routes
route.post('/save', UserController.save);
route.post('/login', UserController.login);
route.get('/test', md_auth.ensureAuth, UserController.test);
route.get('/user/:id', md_auth.ensureAuth, UserController.findById);
route.get('/users/:page?', md_auth.ensureAuth, UserController.findAll);


//Exports
module.exports = route;