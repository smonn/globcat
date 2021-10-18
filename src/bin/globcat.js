#! /usr/bin/env node

import commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage'
import { createWriteStream } from 'node:fs'
import { join } from 'node:path'
import { createInterface } from 'node:readline'
import globcat from '../globcat.js'

const optionList = [
  {
    name: 'src',
    alias: 's',
    type: String,
    multiple: true,
    defaultOption: true,
    description: 'The source file globs'
  },
  {
    name: 'output',
    alias: 'o',
    type: String,
    description: 'The file to write the output to'
  },
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'Display this help text'
  }
]

const usage = [
  {
    header: 'globcat',
    content: 'Concatenate files from command line with glob pattern.'
  },
  {
    header: 'Options',
    optionList: optionList
  }
]

const options = commandLineArgs(optionList)

if (options.help) {
  process.stdout.write(commandLineUsage(usage) + '\n')
} else {
  _combine(options)
}

// <editor-fold>

function _makeWriteFunction(options) {
  return function (results) {
    if (options.output) {
      const file = createWriteStream(join(process.cwd(), options.output))
      results.pipe(file)
    } else {
      results.pipe(process.stdout)
    }
  }
}

function _makeCallbackFunction(options) {
  const write = _makeWriteFunction(options)
  return function (err, results) {
    if (err) {
      throw err
    } else {
      write(results)
    }
  }
}

function _makeExecFunction(options) {
  const callback = _makeCallbackFunction(options)
  return function (patterns) {
    globcat(patterns, { stream: true }, callback)
  }
}

function _combine(options) {
  const exec = _makeExecFunction(options)

  if (options.src) {
    exec(options.src)
  } else {
    const lines = []
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    })

    rl.on('line', (line) => lines.push(line))
    rl.on('close', () => exec(lines))
  }
}

// </editor-fold>
