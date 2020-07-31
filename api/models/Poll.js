'use strict'

require('./User');

const mongoosePaginator = require('mongoose-paginate-v2');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
    author: {type: Schema.ObjectId, ref: "User"},
    question: {type: String, required: true},
    answers: [{
        title: {type: String},
        rat_votes: {type: Number, default: 0},
        rat_sum: {type: Number, default: 0},
        rat_result: {type: Number, default: 0},
    }],  
    users: [{type: Schema.ObjectId, ref: "User"}],
    created: {type: Date, default: Date.now()},
   
});

pollSchema.plugin(mongoosePaginator);
module.exports = mongoose.model('Poll', pollSchema);