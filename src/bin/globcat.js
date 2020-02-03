#! /usr/bin/env node

'use strict'

const commandLineArgs = require('command-line-args')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const globcat = require('../globcat')

const cli = commandLineArgs([
  {
    name: 'src', alias: 's', type: String, multiple: true,
    defaultOption: true, description: 'The source file globs'
  },
  {
    name: 'output', alias: 'o', type: String,
    description: 'The file to write the output to'
  },
  {
    name: 'help', alias: 'h', type: Boolean,
    description: 'Display this help text'
  }
])

function _makeWriteFunction (options) {
  return function (results) {
    if (options.output) {
      const file = fs.createWriteStream(
        path.join(process.cwd(), options.output))
      results.pipe(file)
    } else {
      results.pipe(process.stdout)
    }
  }
}

function _makeCallbackFunction (options) {
  const write = _makeWriteFunction(options)
  return function (err, results) {
    if (err) {
      throw err
    } else {
      write(results)
    }
  }
}

function _makeExecFunction (options) {
  const callback = _makeCallbackFunction(options)
  return function (patterns) {
    globcat(patterns, { stream: true }, callback)
  }
}

function _combine (options) {
  const exec = _makeExecFunction(options)

  if (options.src) {
    exec(options.src)
  } else {
    const lines = []
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    })

    rl.on('line', (line) => lines.push(line))
    rl.on('close', () => exec(lines))
  }
}

const options = cli.parse()
const usage = {
  title: 'globcat',
  description: 'Concatenate files from command line with glob pattern.'
}

if (options.help) {
  process.stdout.write(cli.getUsage(usage) + '\n')
} else {
  _combine(options)
}
