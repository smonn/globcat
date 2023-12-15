import { glob, GlobOptions } from 'glob'
import Stream from 'node:stream'
import { distinctValues } from './lib/distinct-values.js'
import filesToStream from './lib/files-to-stream.js'
import { streamToString } from './lib/stream-to-string.js'

export interface GlobcatOptions {
  glob?: GlobOptions
  stream?: boolean
}

export type GlobcatCallback<T extends string | Stream.Readable> = (
  err: Error | null,
  result?: T
) => void

const defaultOptions: GlobcatOptions = {
  glob: {},
  stream: false
}

/**
 * Find files using a glob pattern to get a string or stream of
 * the combined files' content.
 * @see {@link https://www.npmjs.com/package/glob}
 */
function globcat(
  patterns: string | string[],
  options: GlobcatOptions & { stream: false },
  callback: GlobcatCallback<string>
): void
function globcat(
  patterns: string | string[],
  options: GlobcatOptions & { stream: true },
  callback: GlobcatCallback<Stream.Readable>
): void
function globcat(
  patterns: string | string[],
  callback: GlobcatCallback<string>
): void
function globcat(
  patterns: string | string[],
  options?: GlobcatOptions & { stream: false }
): Promise<string>
function globcat(
  patterns: string | string[],
  options: GlobcatOptions & { stream: true }
): Promise<Stream.Readable>
function globcat(
  patterns: string | string[],
  options?:
    | GlobcatOptions
    | GlobcatCallback<string>
    | GlobcatCallback<Stream.Readable>,
  callback?: GlobcatCallback<string> | GlobcatCallback<Stream.Readable>
): Promise<string | Stream.Readable> | undefined {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  const config = Object.assign({}, defaultOptions, options)
  patterns = Array.isArray(patterns) ? patterns : [patterns]

  const promise = glob(patterns, {
    ...(config.glob ?? {}),
    withFileTypes: false
  })
    .then((files) => {
      if (files.length === 0) {
        return Stream.Readable.from([''])
      }

      return filesToStream(distinctValues(files))
    })
    .then((stream) => {
      const result = config.stream ? stream : streamToString(stream)
      return result as Stream.Readable & Promise<string>
    })
    .then((result) => {
      if (callback) {
        return callback(null, result as Stream.Readable & string)
      } else {
        return result
      }
    })
    .catch((err: Error) => {
      if (callback) {
        callback(err)
      } else {
        throw err
      }
    })

  if (!callback) {
    return promise as Promise<string | Stream.Readable>
  }

  return undefined
}

export { globcat }
