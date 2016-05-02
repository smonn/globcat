'use strict';

var glob = require('glob');
var async = require('async');
var func = require('../func');

function _makeGlobPromiseCallback(patterns, options) {
  patterns = Array.isArray(patterns) ? patterns : [patterns];
  return function (resolve, reject) {
    async.map(patterns, function (pattern, done) {
      glob(pattern, options, done);
    }, function (err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(func.unique(func.flatten(results)));
      }
    });
  };
}

/**
 * A promise wrapper around the glob library.
 * @param {String|String[]} patterns - One or more glob patterns.
 * @param {Object} options - Options object sent to glob.
 * @return {Promise} A promise that resolves to a list of paths.
 */
module.exports = function (patterns, options) {
  return new Promise(_makeGlobPromiseCallback(patterns, options));
};