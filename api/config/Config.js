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


/*
    200	OK	                    GET	
    201	Created	                POST	
    202	Accepted	            PUT	
    204	No Content	            HEAD/DELETE	
    400	Bad Request	            All JSON Syntax is invalid.
    401	Unauthorized	        All	User failed authentication.
    403	Forbidden	            All	Identity is not authorized to invoke specified method.
    404	Not Found	            GET	Resource does not exist or user does not have access.
    405	Method Not Allowed	    All	Specified HTTP method not supported.
    422	Unprocessable Entity	PUT/POST/DELETE	Request failed business logic rules.
    500	Internal Server Error	All	Contact mParticle support to resolve this error.
*/