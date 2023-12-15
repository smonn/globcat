import { isReadableStream } from 'is-stream'
import { join } from 'node:path'
import { assert, expect, test } from 'vitest'
import { globcat } from './globcat.js'

test('should include each file only once', async () => {
  const cwd = process.cwd()
  const pattern = join(cwd, 'test-files/small/**/*.txt')
  const other = join(cwd, 'test-files/small/foo.txt')

  const content = await globcat([pattern, other])

  assert.match(content, /bar\nbaz\nfoo\n/, 'should equal file contents')
})

test('should return empty string if nothing matches', async () => {
  const cwd = process.cwd()
  const pattern = join(cwd, 'does-not-exist/small/**/*.txt')

  const content = await globcat(pattern)

  assert.equal(content, '', 'should equal empty string')
})

test('should stream file content', async () => {
  const cwd = process.cwd()
  const pattern = join(cwd, 'test-files/small**/*.txt')

  const stream = await globcat(pattern, { stream: true })
  assert.equal(isReadableStream(stream), true, 'should be a readable stream')
})

test('should fail when matching directory', async () => {
  const cwd = process.cwd()
  const directory = join(cwd, 'test-files', 'small')
  await expect(
    globcat(directory),
    'should be a useful error message'
  ).rejects.toThrowError(/^Not a file:/)
})

test('should support callback function', () => {
  const cwd = process.cwd()
  const pattern = join(cwd, 'test-files/small/**/*.txt')

  return new Promise<void>((done) => {
    globcat(pattern, { stream: false }, (err, content) => {
      assert.notExists(err, 'no errors')
      assert.match(
        content ?? 'no content',
        /bar\s+baz\s+foo\s+/,
        'should equal file contents'
      )
      done()
    })
  })
})

test('should allow second argument to be callback', () => {
  const cwd = process.cwd()
  const pattern = join(cwd, 'test-files/small/**/*.txt')

  return new Promise<void>((done) => {
    globcat(pattern, (err, content) => {
      assert.notExists(err, 'no errors')
      assert.match(
        content ?? 'no content',
        /bar\s+baz\s+foo\s+/,
        'should equal file contents'
      )
      done()
    })
  })
})

test('should yield error when using callback', () => {
  const cwd = process.cwd()
  const directory = join(cwd, 'test-files', 'small')
  return new Promise<void>((done) => {
    globcat(directory, (err) => {
      assert.match(
        err?.message ?? 'no error',
        /^Not a file:/,
        'should be a useful error message'
      )
      done()
    })
  })
})

test('should correctly concat large files', () => {
  const cwd = process.cwd()
  const pattern = join(cwd, 'test-files/large/**/*.txt')

  return new Promise<void>((done) => {
    globcat(pattern, (err, content) => {
      assert.notExists(err, 'no errors')
      assert.match(
        content ?? 'no content',
        /[a\n]{10000}[b\n]{10000}/,
        'should equal file contents'
      )
      done()
    })
  })
})
