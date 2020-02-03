'use strict'

const glob = require('./lib/globPromise')
const func = require('./func')
const filesToStream = require('./lib/filesToStream')
const streamToString = require('./lib/streamToString')

const _defaults = {
  glob: {},
  stream: false
}

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
  let settings = func.defaults(_defaults, options)
  let promise = glob(patterns, settings.glob)
    .then(filesToStream)
    .then((stream) => {
      if (settings.stream) {
        return stream
      }

      return streamToString(stream)
    })
    .then((result) => {
      if (callback) {
        callback(null, result)
      } else {
        return result
      }
    })
    .catch((err) => {
      if (callback) {
        callback(err)
      } else {
        throw err
      }
    })

  if (!callback) {
    return promise
  }
}
