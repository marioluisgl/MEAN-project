'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

const app = express();

//Load all routes
var user_routes = require('../api/routes/User');

//Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(fileUpload());
app.use(require('cookie-parser')());
app.use(require('express-session')({secret: 'keyboard cat', resave: true, saveUninitialized: true}));

//Cors
const cors = require('cors');
const corsOptions = {
    origin: "*",
    credentials: true
};
app.use(cors(corsOptions));


//Routes
app.use('/api', user_routes);

//Exports
module.exports = app;