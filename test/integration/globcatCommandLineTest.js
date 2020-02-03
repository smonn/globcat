const t = require('tap')
const path = require('path')
const exec = require('child_process').exec

t.test('command line', (assert) => {
  const cwd = process.cwd()
  const file = path.join(cwd, '/dist/bin/globcat.js')
  const glob = `${cwd}/test/**/*.txt`
  const command = `node ${file} ${glob}`
  exec(command, (err, stdout, stderr) => {
    assert.error(err, 'no errors')
    assert.equal(stderr, '', 'should not have error output')
    assert.ok(/bar\s+baz\s+foo\s+/.test(stdout), 'should equal file contents')
    assert.end()
  })
})
