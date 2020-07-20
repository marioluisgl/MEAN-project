'use strict'

require('mongoose-type-email');
require('./User');

const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginator = require('mongoose-paginate-v2');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: mongoose.SchemaTypes.Email, required: true, unique: true},   
    password: {type: String, required: true},
    role: {type: String, required: true},
    created: {type: Date, default: Date.now()},
    //photo: {type: Schema.ObjectId, ref: "Attachment"},
    valid_token: {type: String},
});

userSchema.pre('save', function (next) {
    this.password = this.encryptPassword(this.password);
    this.valid_token = crypto.randomBytes(50).toString('hex');
    next();
});

userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password);
};

userSchema.plugin(uniqueValidator);
userSchema.plugin(mongoosePaginator);

module.exports = mongoose.model('User', userSchema);