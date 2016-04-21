'use strict';

const glob = require('glob');
const async = require('async');
const fs = require('fs');
const combined = require('combined-stream2');
const _ = require('lodash/fp');

const _defaults = {
  glob: {},
  stream: false,
};

const _once = function(fn) {
  let value;
  let called = false;
  return function() {
    if (called) {
      return value;
    }

    value = fn.apply(this, arguments);
    called = true;

    return value;
  };
};

const _promiseGlob = function(patterns, options) {
  patterns = Array.isArray(patterns) ? patterns : [patterns];
  return new Promise((resolve, reject) => {
    async.map(patterns, function(pattern, done) {
      glob(pattern, options, done);
    }, function(err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(_.uniq(_.flatten(results)));
      }
    });
  });
};

const _createStream = function(files) {
  return new Promise((resolve, reject) => {
    async.map(files, (file, done) => {
      let callback = _once(done);

      fs.stat(file, (err, stats) => {
        if (err) {
          callback(err);
          return;
        }

        if (stats.isFile()) {
          let stream = fs.createReadStream(file);

          stream.on('open', () => {
            callback(null, stream);
          });

          stream.on('error', (err) => {
            callback(err);
          });
        } else {
          callback(new Error('Not a file: ' + file));
        }
      });
    }, (err, streams) => {
      if (err) {
        reject(err);
        return;
      }

      let stream = streams.reduce((combinedStream, fileStream) => {
        combinedStream.append(fileStream);
        return combinedStream;
      }, combined.create());

      resolve(stream);
    });
  });
};

const _toString = function(asStream) {
  return function(stream) {
    if (asStream) {
      return stream;
    }

    return new Promise((resolve, reject) => {
      let str = '';

      stream.on('data', (buffer) => {
        str += buffer;
      });

      stream.on('error', (err) => {
        reject(err);
      });

      stream.on('end', () => {
        resolve(str);
      });
    });
  };
};

/**
 * Find files using glob pattern(s) get a string or stream of
 * the combined files' content.
 * @param {String|String[]} patterns - One or more glob patterns.
 * @param {Object} [options] - Options object. Optional.
 * @param {Boolean} [options.stream=false] - Get results as a stream. Optional.
 * @param {Object} [options.glob={}] - Options to send to glob.
 * @param {Function} [callback]
 * @returns {Promise} Returns a promise if no callback is provided.
 * @see {@link https://www.npmjs.com/package/glob}
 */
module.exports = function(patterns, options, callback) {
  let settings = _.defaultsDeep(_defaults, options);
  let promise = _promiseGlob(patterns, settings.glob)
    .then(_createStream)
    .then(_toString(settings.stream))
    .then((result) => {
      if (callback) {
        callback(null, result);
      } else {
        return result;
      }
    })
    .catch((err) => {
      if (callback) {
        callback(err);
      } else {
        throw err;
      }
    });

  if (!callback) {
    return promise;
  }
};
