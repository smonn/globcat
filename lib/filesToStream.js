'use strict'

const async = require('async')
const fs = require('fs')
const combined = require('combined-stream2')
const func = require('../func')

function _makeStatsCallback (done, file) {
  let callback = func.once(done)
  return (err, stats) => {
    if (err) {
      callback(err)
      return
    }

    if (stats.isFile()) {
      let stream = fs.createReadStream(file)

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

module.exports = function (files) {
  return new Promise((resolve, reject) => {
    async.map(files, (file, done) => {
      fs.stat(file, _makeStatsCallback(done, file))
    }, (err, streams) => {
      if (err) {
        reject(err)
        return
      }

      let stream = streams.reduce((combinedStream, fileStream) => {
        combinedStream.append(fileStream)
        return combinedStream
      }, combined.create())

      resolve(stream)
    })
  })
}
