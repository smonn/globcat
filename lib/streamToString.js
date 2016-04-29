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

module.exports = function (stream) {
  return new Promise(_makeStreamToStringCallback(stream))
}
