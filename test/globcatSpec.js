/*globals describe, it */
'use strict';

const globcat = require('../globcat');
const assert = require('chai').assert;
const path = require('path');
const isStream = require('is-stream');

describe('globcat', function() {
  it('includes each file only once', function(done) {
    const cwd = process.cwd();
    const pattern = path.join(cwd, 'test/**/*.txt');
    const duplicate = path.join(cwd, 'test/sample/foo.txt');

    return globcat([pattern, duplicate])
      .then((content) => {
        assert.equal(content, 'bar\nbaz\nfoo\n');
        done();
      });
  });

  it('streams file content', function(done) {
    const cwd = process.cwd();
    const pattern = path.join(cwd, 'test/**/*.txt');

    return globcat(pattern, {stream: true})
      .then((stream) => {
        assert.equal(isStream.readable(stream), true);
        done();
      });
  });

  it('fails when matching directory', function(done) {
    return globcat('*')
      .catch((err) => {
        assert.match(err.message, /^not a file/i);
        done();
      });
  });

  it('allows callback', function(done) {
    const cwd = process.cwd();
    const pattern = path.join(cwd, 'test/**/*.txt');

    globcat(pattern, {}, (err, content) => {
      assert.equal(content, 'bar\nbaz\nfoo\n');
      done();
    });
  });
});


