'use strict'

exports.isJson = function (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};


exports.areSameDates = function(date1, date2) {
    const x1 = moment(date1).format("DD-MM-YYYY");
    const x2 = moment(date2).format("DD-MM-YYYY");
    return x1 === x2;
};