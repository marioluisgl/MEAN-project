'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name: {type: String, enum: ['ROLE_USER', 'ROLE_PREMIUM', 'ROLE_ADMIN'], required: true},
    description: String
});

module.exports = mongoose.model('Role', roleSchema);