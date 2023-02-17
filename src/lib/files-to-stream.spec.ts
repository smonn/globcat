import { assert, test } from 'vitest'
import filesToStream from './files-to-stream'
import { streamToString } from './stream-to-string'

test('makes single stream from multiple files', async () => {
  const files = [
    'src/lib/files-to-stream.ts',
    'src/lib/files-to-stream.spec.ts'
  ]
  const stream = await filesToStream(files)

  const content = await streamToString(stream)

  assert.equal(
    content.includes('filesToStream'),
    true,
    'should contain filesToStream'
  )
})
