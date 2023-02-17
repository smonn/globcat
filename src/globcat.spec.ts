import { assert, expect, test } from 'vitest'
import { isReadableStream } from 'is-stream'
import { join } from 'node:path'
import { globcat } from './globcat'

test('should include each file only once', async () => {
  const cwd = process.cwd()
  const pattern = join(cwd, 'test-files/**/*.txt')

  const content = await globcat(pattern)

  assert.match(content, /bar\s+baz\s+foo\s+/, 'should equal file contents')
})

test('should return empty string if nothing matches', async () => {
  const cwd = process.cwd()
  const pattern = join(cwd, 'does-not-exist/**/*.txt')

  const content = await globcat(pattern)

  assert.equal(content, '', 'should equal empty string')
})

test('should stream file content', async () => {
  const cwd = process.cwd()
  const pattern = join(cwd, 'test-files/**/*.txt')

  const stream = await globcat(pattern, { stream: true })
  assert.equal(isReadableStream(stream), true, 'should be a readable stream')
})

test('should fail when matching directory', async () => {
  const cwd = process.cwd()
  const directory = join(cwd, 'test-files')
  await expect(
    globcat(directory),
    'should be a useful error message'
  ).rejects.toThrowError(/^Not a file:/)
})

test('should support callback function', () => {
  const cwd = process.cwd()
  const pattern = join(cwd, 'test-files/**/*.txt')

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
  const pattern = join(cwd, 'test-files/**/*.txt')

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
  const directory = join(cwd, 'test-files')
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
