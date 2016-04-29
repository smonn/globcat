'use strict'

function _makeStreamToStringCallback (stream) {
  return (resolve, reject) => {
    let str = ''

    stream.on('data', (buffer) => {
      str += buffer
    })

    stream.on('error', (err) => {
      reject(err)
    })

    stream.on('end', () => {
      resolve(str)
    })
  }
}

/**
 * Takes a stream and returns a promise that resolves to a string with the stream content.
 * @param {Stream} stream - A readable stream.
 * @return {Promise} A promise that resolves to a string.
 */
module.exports = function (stream) {
  return new Promise(_makeStreamToStringCallback(stream))
}
