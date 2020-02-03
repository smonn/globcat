'use strict'

const test = require('tape')
const path = require('path')
const exec = require('child_process').exec

test('command line', (assert) => {
  const cwd = process.cwd()
  const file = path.join(cwd, '/dist/bin/globcat.js')
  const glob = `${cwd}/test/**/*.txt`
  const command = `node ${file} ${glob}`
  exec(command, (err, stdout, stderr) => {
    assert.error(err, 'no errors')
    assert.equal(stderr, '', 'should not have error output')
    assert.equal(stdout, 'bar\nbaz\nfoo\n', 'should equal file contents')
    assert.end()
  })
})
