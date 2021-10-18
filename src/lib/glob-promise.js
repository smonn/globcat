import { map } from 'async'
import glob from 'glob'
import * as func from '../func/index.js'

function _makeGlobPromiseCallback(patterns, options) {
  patterns = Array.isArray(patterns) ? patterns : [patterns]
  return (resolve, reject) => {
    map(
      patterns,
      (pattern, done) => {
        glob(pattern, options, done)
      },
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(func.unique(func.flatten(results)))
        }
      }
    )
  }
}

/**
 * A promise wrapper around the glob library.
 * @param {String|String[]} patterns - One or more glob patterns.
 * @param {Object} options - Options object sent to glob.
 * @return {Promise} A promise that resolves to a list of paths.
 */
export default function (patterns, options) {
  return new Promise(_makeGlobPromiseCallback(patterns, options))
}
