'use strict';

require('mocha');
const assert = require('assert');
const Lexer = require('..');
let lexer;

describe('api.match', function() {
  beforeEach(function() {
    lexer = new Lexer('foo');
  });

  it('should throw when arguments are invalid', function() {
    assert.throws(() => lexer.match(null));
    assert.throws(() => lexer.match([]));
    assert.throws(() => lexer.match({}));
  });

  it('should match with regex', function() {
    const match = lexer.match(/^\w/, 'text');
    assert(match);
    assert.equal(match[0], 'f');
    assert.equal(match.index, 0);
    assert.equal(match.input, 'foo');
  });

  it('should throw an error when regex does not have a boundary', function() {
    lexer = new Lexer();
    lexer.capture('slash', /\//);
    lexer.capture('text', /\w+/);
    assert.throws(() => lexer.tokenize('a/b/c/d/e/f/g'));
  });
});