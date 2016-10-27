'use strict';

var path = require('path');
var fs = require('fs');

var TypeCheckBinary = null;

var maybeTypeCheckBinary = tryCatch(function tryIt() {
    return require('jsig/bin/jsig.js');
});

if (maybeTypeCheckBinary.error) {
    console.error('Could not require jsig.');
    console.error('Expected copy of jsig to be installed');
    throw maybeTypeCheckBinary.error;
} else {
    TypeCheckBinary = maybeTypeCheckBinary.value;
}

var LAST_CHECKER = null;

var isTextEditorPlugin = false;
if (process.argv && process.argv[4] === '--stdin' &&
    process.argv[5] === '--stdin-filename'
) {
    isTextEditorPlugin = true;
}

var isTextR = /\<text\>$/;

module.exports = typeCheck;

function typeCheck(context) {
    return {
        'Program': function runTypeCheck(node) {
            var fileName = context.getFilename();
            var tempFileName;

            if (isTextR.test(fileName)) {
                var dirname = path.dirname(fileName);
                tempFileName = path.join(dirname, 'jsig-temp-file.js');

                fs.writeFileSync(
                    tempFileName,
                    context.getSource(),
                    'utf8'
                );
                fileName = tempFileName;
                isTextEditorPlugin = true;
            }
            // console.log('?', Object.keys(context));

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

                if (!isTextEditorPlugin ||
                    error.fileName === fileName
                ) {
                    context.report({
                        loc: loc
                    }, error.message);
                }

                var fullMessage = bin.checker.prettyPrintErrorStatement(error);

                if (isTextEditorPlugin) {
                    console.log('');
                    console.log(fullMessage);
                    console.log('');
                }
            }

            if (tempFileName) {
                fs.unlinkSync(tempFileName);
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
