import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import packageJSON from './package.json'

const separators = new RegExp(/[-_/]+/, 'g')
const nonWord = new RegExp(/[^\w\s]/, 'g')
const firstLetterAfterSpace = new RegExp(/\s+(.)(\w*)/, 'g')
const word = new RegExp(/\w/)

// From https://stackoverflow.com/questions/4068573/convert-string-to-pascal-case-aka-uppercamelcase-in-javascript
function toPascalCase(text: string) {
  return text
    .toLowerCase()
    .replace(separators, ' ')
    .replace(nonWord, '')
    .replace(
      firstLetterAfterSpace,
      (_, $2: string, $3: string) => `${$2.toUpperCase() + $3}`
    )
    .replace(word, (s) => s.toUpperCase())
}

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: ['src/globcat.ts', 'src/globcat-bin.ts'],
      name: toPascalCase(packageJSON.name)
    },
    rollupOptions: {
      external: [/^node:/, ...Object.keys(packageJSON.dependencies)],
      plugins: [nodeResolve()],
      output: {
        banner(chunkInfo) {
          if (chunkInfo.name === 'globcat-bin') {
            return '#! /usr/bin/env node\n'
          }

          return ''
        }
      }
    }
  },
  plugins: [
    dts({
      rollupTypes: true,
      exclude: ['**/vite-env.d.ts']
    })
  ]
})
