'use strict';

var async = require('async');
var fs = require('fs');
var combined = require('combined-stream2');
var func = require('../func');

function _makeStatsCallback(done, file) {
  var callback = func.once(done);
  return function (err, stats) {
    if (err) {
      callback(err);
      return;
    }

    if (stats.isFile()) {
      (function () {
        var stream = fs.createReadStream(file);

        stream.on('open', function () {
          callback(null, stream);
        });

        stream.on('error', function (err) {
          callback(err);
        });
      })();
    } else {
      callback(new Error('Not a file: ' + file));
    }
  };
}

/**
 * Takes a list of paths to files and returns a promise that resolves to a stream with the combined
 * contents. Will fail if one of the paths point to a non-file (e.g. a directory).
 * @param {String[]} files - An array of paths.
 * @return {Promise} A promise which resolves to a stream.
 */
module.exports = function (files) {
  return new Promise(function (resolve, reject) {
    async.map(files, function (file, done) {
      fs.stat(file, _makeStatsCallback(done, file));
    }, function (err, streams) {
      if (err) {
        reject(err);
        return;
      }

      var stream = streams.reduce(function (combinedStream, fileStream) {
        combinedStream.append(fileStream);
        return combinedStream;
      }, combined.create());

      resolve(stream);
    });
  });
};