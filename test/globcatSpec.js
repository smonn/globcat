'use strict'

const test = require('tape')
const globcat = require('../globcat')
const path = require('path')
const isStream = require('is-stream')

test('globcat includes each file only once', (assert) => {
  const cwd = process.cwd()
  const pattern = path.join(cwd, 'test/**/*.txt')
  const duplicate = path.join(cwd, 'test/sample/foo.txt')

  return globcat([ pattern, duplicate ])
    .then((content) => {
      assert.equal(content, 'bar\nbaz\nfoo\n', 'should equal file contents')
      assert.end()
    })
    .catch((err) => {
      assert.error(err, 'no errors')
      assert.end()
    })
})

test('globcat streams file content', (assert) => {
  const cwd = process.cwd()
  const pattern = path.join(cwd, 'test/**/*.txt')

  return globcat(pattern, { stream: true })
    .then((stream) => {
      assert.equal(isStream.readable(stream), true, 'should be a readable stream')
      assert.end()
    })
    .catch((err) => {
      assert.error(err, 'no errors')
      assert.end()
    })
})

test('globcat fails when matching directory', (assert) => {
  const directory = path.join(__dirname, 'sample')
  return globcat(directory)
    .then(() => {
      assert.fail('should not be successful')
      assert.end()
    })
    .catch((err) => {
      assert.equal(err.message, `Not a file: ${directory}`, 'should be a useful error message')
      assert.end()
    })
})

test('globcat allows callback', (assert) => {
  const cwd = process.cwd()
  const pattern = path.join(cwd, 'test/**/*.txt')

  globcat(pattern, {}, (err, content) => {
    assert.error(err, 'no errors')
    assert.equal(content, 'bar\nbaz\nfoo\n', 'should equal file contents')
    assert.end()
  })
})
