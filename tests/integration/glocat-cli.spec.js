const path = require('path')
const exec = require('child_process').exec
const { assert } = require('chai')

describe('globcat cli', function () {
  it('should execute without errors', function (done) {
    const cwd = process.cwd()
    const file = path.resolve(cwd, 'dist', 'bin', 'globcat.js')
    const glob = `${cwd}/tests/**/*.txt`
    const command = `node ${file} ${glob}`
    exec(command, (err, stdout, stderr) => {
      assert.notExists(err, 'no errors')
      assert.equal(stderr, '', 'should not have error output')
      assert.match(stdout, /bar\s+baz\s+foo\s+/, 'should equal file contents')
      done()
    })
  })
})
