'use strict';

const glob = require('glob');
const async = require('async');
const _ = require('ramda');
const combined = require('combined-stream2');
const fs = require('fs');

const handler = _.curry(function(options, pattern, callback) {
  glob(pattern, options.glob || {}, callback);
});

const createStream = function(path, callback) {
  callback(null, fs.createReadStream(path));
};

const combineStreams = function(callback) {
  let failed = false;

  return function(err, streams) {
    let stream;

    if (err) {
      callback(err);
    } else {
      stream = combined.create();
      _.forEach((s) => {
        if (failed) {
          return;
        }

        s.on('error', (err) => {
          failed = true;
          callback(err);
        });

        stream.append(s);
      }, streams);

      if (failed) {
        return;
      }

      callback(null, stream);
    }
  };
};

var combineToString = function(callback) {
  return combineStreams((err, stream) => {
    let str = '';

    if (err) {
      callback(err);
      return;
    }

    stream.on('data', (buffer) => {
      str += buffer.toString();
    });

    stream.on('error', (err) => {
      callback(err);
    });

    stream.on('end', () => {
      callback(null, str);
    });
  });
};

const once = function(fn) {
  return function() {
    if (fn === null) {
      return;
    }
    fn.apply(this, arguments);
    fn = null;
  };
};

const globcat = function(patterns, options, callback) {
  options = options || {glob: {}, stream: false};
  patterns = Array.isArray(patterns) ? patterns : [patterns];
  callback = once(callback);

  async.map(patterns, handler(options), (err, results) => {
    const paths = _.uniq(_.flatten(results));

    if (err) {
      callback(err);
    } else {
      async.map(paths, createStream,
        options.stream ? combineStreams(callback) : combineToString(callback));
    }
  });
};

module.exports = globcat;
