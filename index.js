'use strict';

var typeCheck = require('./type-check-rule.js')

module.exports = {
    rules: {
        'type-check': typeCheck
    },
    rulesConfig: {
        'type-check': 2
    }
};
