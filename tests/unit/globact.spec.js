const { assert } = require('chai')
const globcat = require('../../src/globcat')
const path = require('path')
const isStream = require('is-stream')

describe('globcat', function () {
  it('should include each file only once', function () {
    const cwd = process.cwd()
    const pattern = path.join(cwd, 'tests/**/*.txt')
    const duplicate = path.join(cwd, 'tests/sample/foo.txt')

    return globcat([pattern, duplicate]).then((content) => {
      assert.match(content, /bar\s+baz\s+foo\s+/, 'should equal file contents')
    })
  })

  it('should stream file content', function () {
    const cwd = process.cwd()
    const pattern = path.join(cwd, 'tests/**/*.txt')

    return globcat(pattern, { stream: true }).then((stream) => {
      assert.equal(
        isStream.readable(stream),
        true,
        'should be a readable stream'
      )
    })
  })

  it('should fail when matching directory', function () {
    const cwd = process.cwd()
    const directory = path.join(cwd, 'tests/sample')
    return globcat(directory)
      .then(() => {
        assert.fail('should not be successful')
      })
      .catch((err) => {
        assert.match(
          err.message,
          /^Not a file:/,
          'should be a useful error message'
        )
      })
  })

  it('should support callback function', function (done) {
    const cwd = process.cwd()
    const pattern = path.join(cwd, 'tests/**/*.txt')

    globcat(pattern, {}, (err, content) => {
      assert.notExists(err, 'no errors')
      assert.match(content, /bar\s+baz\s+foo\s+/, 'should equal file contents')
      done()
    })
  })

  it('should allow second argument to be callback', function (done) {
    const cwd = process.cwd()
    const pattern = path.join(cwd, 'tests/**/*.txt')

    globcat(pattern, (err, content) => {
      assert.notExists(err, 'no errors')
      assert.match(content, /bar\s+baz\s+foo\s+/, 'should equal file contents')
      done()
    })
  })

  it('should yield error when using callback', function (done) {
    const cwd = process.cwd()
    const directory = path.join(cwd, 'tests/sample')
    globcat(directory, (err) => {
      assert.match(
        err.message,
        /^Not a file:/,
        'should be a useful error message'
      )
      done()
    })
  })
})
