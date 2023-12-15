import { createReadStream } from 'fs'
import { assert, test } from 'vitest'
import { streamToString } from './stream-to-string.js'

test('converts a stream to a string', async () => {
  const fileStream = createReadStream('test-files/small/foo.txt')

  const content = await streamToString(fileStream)

  assert.equal(content.includes('foo'), true, 'should contain "foo"')
})
