/*globals describe, it */
'use strict';

const assert = require('chai').assert;
const path = require('path');
const globcat = require('../globcat');
const isStream = require('is-stream');

describe('globcat', function() {
  it('should include each file only once', function(done) {
    const cwd = process.cwd();
    const pattern = path.join(cwd, 'test/**/*.txt');
    const duplicate = path.join(cwd, 'test/sample/foo.txt');

    globcat([pattern, duplicate], {}, (err, results) => {
      assert.equal(results, 'bar\nbaz\nfoo\n',
        'only once of each file content');
      done();
    });
  });

  it('should stream file content', function(done) {
    const cwd = process.cwd();
    const pattern = path.join(cwd, 'test/**/*.txt');

    globcat(pattern, {stream: true}, (err, results) => {
      assert.equal(isStream.readable(results), true,
        'results should be a readable stream');
      done();
    });
  });

  it('should fail when matching directory', function(done) {
    globcat('*', {}, (err, results) => {
      assert.equal(err.code, 'EISDIR',
        'error should be thrown, cannot stream directories');
      assert.equal(results, undefined, 'should have empty results');
      done();
    });
  });
});
