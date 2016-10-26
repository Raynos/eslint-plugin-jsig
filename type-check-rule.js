'use strict';

var TypeCheckBinary = null;

var maybeTypeCheckBinary = tryCatch(function tryIt() {
    return require('jsig/bin/jsig.js');
});

if (maybeTypeCheckBinary.error) {
    console.error('Could not require jsig.');
    console.error('Expected copy of jsig to be installed');
    throw err;
} else {
    TypeCheckBinary = maybeTypeCheckBinary.value;
}

var LAST_CHECKER = null;

module.exports = typeCheck;

function typeCheck(context) {
    return {
        'Program': function runTypeCheck(node) {
            var fileName = context.getFilename();
            // console.log('?', fileName);

            var bin = new TypeCheckBinary({
                _: [fileName]
            });
            bin.previousChecker = LAST_CHECKER;

            bin.log = function noop() {};
            bin.warnError = console.error;

            bin.run();
            LAST_CHECKER = bin.checker;

            // console.log('?', bin.checker.errors.length);
            // if (bin.checker.errors.length > 0) {
            //     console.log('?', bin.checker.errors.length);
            // }

            for (var i = 0; i < bin.checker.errors.length; i++) {
                var error = bin.checker.errors[i];

                var loc = error.loc || {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 1
                    }
                };

                context.report({
                    loc: loc
                }, error.message);
            }

            // console.log('node?', Object.keys(node));
            // console.log('context?', Object.keys(context));
        }
    };
}

module.exports.schema = [];

function tryCatch(expr) {
    var value;
    var error = null;

    try {
        value = expr()
    } catch (err) {
        error = err;
    }

    return {
        error: error,
        value: value
    };
}
