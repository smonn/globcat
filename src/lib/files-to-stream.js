import { map } from 'async'
import { create } from 'combined-stream2'
import { createReadStream, stat } from 'node:fs'
import * as func from '../func/index.js'

function _makeStatsCallback(done, file) {
  const callback = func.once(done)
  return (err, stats) => {
    if (err) {
      callback(err)
      return
    }

    if (stats.isFile()) {
      const stream = createReadStream(file)

      stream.on('open', () => {
        callback(null, stream)
      })

      stream.on('error', (err) => {
        callback(err)
      })
    } else {
      callback(new Error('Not a file: ' + file))
    }
  }
}

/**
 * Takes a list of paths to files and returns a promise that resolves to a stream with the combined
 * contents. Will fail if one of the paths point to a non-file (e.g. a directory).
 * @param {String[]} files - An array of paths.
 * @return {Promise} A promise which resolves to a stream.
 */
export default function (files) {
  return new Promise((resolve, reject) => {
    map(
      files,
      (file, done) => {
        stat(file, _makeStatsCallback(done, file))
      },
      (err, streams) => {
        if (err) {
          reject(err)
          return
        }

        let stream = streams.reduce((combinedStream, fileStream) => {
          combinedStream.append(fileStream)
          return combinedStream
        }, create())

        resolve(stream)
      }
    )
  })
}
