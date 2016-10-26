'use strict';

var TypeCheckBinary = null;
try {
    TypeCheckBinary = require('jsig/bin/jsig.js');
} catch (err) {
    console.error('Could not require jsig.');
    console.error('Expected copy of jsig to be installed');
    throw err;
}

module.exports = typeCheck;

function typeCheck(context) {
    return {
        'Program': function runTypeCheck(node) {
            console.log('node?', !!node);
        }
    };
}

module.exports.schema = [];
