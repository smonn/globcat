import { resolve } from 'node:path'
import { exec } from 'node:child_process'
import { assert } from 'chai'

describe('globcat cli', function () {
  it('should execute without errors', function (done) {
    const cwd = process.cwd()
    const file = resolve(cwd, 'dist', 'bin', 'globcat.js')
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
