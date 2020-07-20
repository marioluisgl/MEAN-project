'use strict'

const express = require('express');
const route = express.Router();

var PollController = require('../controllers/PollController');

//Authentication middleware
var md_auth = require('./middlewares/Authorization');

//Routes
route.get('/poll/test', md_auth.ensureAuth, PollController.test);
route.post('/poll/save', md_auth.ensureAuth, PollController.save);
route.get('/poll/:id', md_auth.ensureAuth, PollController.findById);


//Exports
module.exports = route;