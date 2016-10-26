'use strict';

var test = require('tape');

var eslintPluginJsig = require('../index.js');

test('eslintPluginJsig is a function', function t(assert) {
    assert.equal(typeof eslintPluginJsig, 'function');
    assert.end();
});
