'use strict'

const test = require('tape')
const exec = require('child_process').exec

test('command line', (assert) => {
  const command = 'node bin/globcat.js test/**/*.txt'
  exec(command, (err, stdout, stderr) => {
    assert.error(err, 'no errors')
    assert.equal(stderr, '', 'should not have error output')
    assert.equal(stdout, 'bar\nbaz\nfoo\n', 'should equal file contents')
    assert.end()
  })
})