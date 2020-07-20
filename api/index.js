'use strict'

const config = require('./config/Config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const app = require('./app');
app.set('port', process.env.PORT || 3800);

mongoose.connect(config.database, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(()=>{
        console.log('DataBase connected succesfuly');
        app.listen(app.get('port'), () => {
            console.log('MEAN project server listening on port ' + app.get('port'));
        });        
    })
    .catch((err)=>{
        console.log(err);
    }); 