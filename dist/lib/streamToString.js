'use strict';

function _makeStreamToStringCallback(stream) {
  return function (resolve, reject) {
    var str = '';

    stream.on('data', function (buffer) {
      str += buffer;
    });

    stream.on('error', function (err) {
      reject(err);
    });

    stream.on('end', function () {
      resolve(str);
    });
  };
}

/**
 * Takes a stream and returns a promise that resolves to a string with the stream content.
 * @param {Stream} stream - A readable stream.
 * @return {Promise} A promise that resolves to a string.
 */
module.exports = function (stream) {
  return new Promise(_makeStreamToStringCallback(stream));
};