'use strict';

var glob = require('./lib/globPromise');
var func = require('./func');
var filesToStream = require('./lib/filesToStream');
var streamToString = require('./lib/streamToString');

var _defaults = {
  glob: {},
  stream: false
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
module.exports = function (patterns, options, callback) {
  if (func.typeOf(options) === 'function') {
    callback = options;
    options = {};
  }

  var settings = func.defaults(_defaults, options);
  var promise = glob(patterns, settings.glob).then(filesToStream).then(function (stream) {
    if (settings.stream) {
      return stream;
    }

    return streamToString(stream);
  }).then(function (result) {
    if (callback) {
      callback(null, result);
    } else {
      return result;
    }
  }).catch(function (err) {
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