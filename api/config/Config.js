'use strict'
const path = require("path");

module.exports = {
    database: 'mongodb://localhost:27017/mean-db',
    secretKey: 'vbcnxmzgfhdjskaltyrueiwoqalskdjfhg',
    roleEnum: {
        USER: 'ROLE_USER',
        ADMIN: 'ROLE_ADMIN',
        PREMIUM: 'ROLE_PREMIUM'
    },
};