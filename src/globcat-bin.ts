#! /usr/bin/env node

import commandLineArgs, { CommandLineOptions } from 'command-line-args'
import commandLineUsage from 'command-line-usage'
import FS from 'node:fs'
import Path from 'node:path'
import Readline from 'node:readline'
import type Stream from 'node:stream'
import { globcat } from './globcat'
import process from 'node:process'

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

if (options['help']) {
  process.stdout.write(commandLineUsage(usage) + '\n')
} else {
  _combine(options).catch((error) => {
    throw error
  })
}

// <editor-fold>

function _makeWriteFunction(options: CommandLineOptions) {
  return function (results: Stream.Readable) {
    if (options['output']) {
      const file = FS.createWriteStream(
        Path.join(process.cwd(), options['output'] as string)
      )
      results.pipe(file)
    } else {
      results.pipe(process.stdout)
    }
  }
}

function _makeExecFunction(options: CommandLineOptions) {
  const write = _makeWriteFunction(options)
  return async (pattern: string) => {
    const content = await globcat(pattern, { stream: true })
    write(content)
  }
}

async function _combine(options: CommandLineOptions) {
  const exec = _makeExecFunction(options)

  const patterns = options['src'] as string[] | undefined

  if (patterns) {
    for (const pattern of patterns) {
      await exec(pattern)
    }
  } else {
    const lines: string[] = []
    const rl = Readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    })

    rl.on('line', (line) => lines.push(line))
    rl.on('close', () => {
      Promise.all(lines.map((line) => exec(line))).catch((error) => {
        throw error
      })
    })
  }
}

// </editor-fold>
