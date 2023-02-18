import { isStream } from 'is-stream'
import { assert, test } from 'vitest'
import filesToStream from './files-to-stream.js'

test('makes single stream from multiple files', async () => {
  const files = [
    'src/lib/files-to-stream.ts',
    'src/lib/files-to-stream.spec.ts'
  ]
  const stream = await filesToStream(files)

  assert.isTrue(isStream(stream), 'must be a stream')
})
