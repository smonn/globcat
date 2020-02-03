#! /usr/bin/env node

'use strict';

const commandLineArgs = require('command-line-args');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const globcat = require('../globcat');

const cli = commandLineArgs([
  {
    name: 'src', alias: 's', type: String, multiple: true,
    defaultOption: true, description: 'The source file globs',
  },
  {
    name: 'output', alias: 'o', type: String,
    description: 'The file to write the output to',
  },
  {
    name: 'help', alias: 'h', type: Boolean,
    description: 'Display this help text',
  },
]);

const combine = function(options) {
  const write = function(results) {
    if (options.output) {
      const file = fs.createWriteStream(
        path.join(process.cwd(), options.output));
      results.pipe(file);
    } else {
      results.pipe(process.stdout);
    }
  };

  const exec = function(patterns) {
    globcat(patterns, {stream: true}, function(err, results) {
      if (err) {
        throw err;
      } else {
        write(results);
      }
    });
  };

  if (options.src) {
    exec(options.src);
  } else {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });
    const lines = [];

    rl.on('line', function(line) {
      lines.push(line);
    });

    rl.on('close', function() {
      exec(lines);
    });
  }
};

const options = cli.parse();

if (options.help) {
  console.log(cli.getUsage({
    title: 'globcat',
    description: 'Concatenate files from command line with glob pattern.',
  }));
} else {
  combine(options);
}
