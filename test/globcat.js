'use strict';

var assert = require('chai').assert;
var path = require('path');
var globcat = require('../globcat');
var isStream = require('is-stream');

describe('globcat', function() {
  it('should include each file only once', function(done) {
    var cwd = process.cwd();
    var pattern = path.join(cwd, 'test/**/*.txt');
    var duplicate = path.join(cwd, 'test/sample/foo.txt');

    globcat([pattern, duplicate], {}, function(err, results) {
      assert.match(results, /^bar\s+baz\s+foo\s*$/g,
        'only once of each file content');
      done();
    });
  });

  it('should stream file content', function(done) {
    var cwd = process.cwd();
    var pattern = path.join(cwd, 'test/**/*.txt');

    globcat(pattern, { stream: true }, function(err, results) {
      assert.isTrue(isStream.readable(results),
        'results should be a readable stream');
      done();
    });
  });
});
