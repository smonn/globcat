#! /usr/bin/env node


'use strict';

var commandLineArgs = require('command-line-args');
var fs = require('fs');
var path = require('path');
var readline = require('readline');
var globcat = require('../globcat');

var cli = commandLineArgs([{
  name: 'src', alias: 's', type: String, multiple: true,
  defaultOption: true, description: 'The source file globs'
}, {
  name: 'output', alias: 'o', type: String,
  description: 'The file to write the output to'
}, {
  name: 'help', alias: 'h', type: Boolean,
  description: 'Display this help text'
}]);

function _makeWriteFunction(options) {
  return function (results) {
    if (options.output) {
      var file = fs.createWriteStream(path.join(process.cwd(), options.output));
      results.pipe(file);
    } else {
      results.pipe(process.stdout);
    }
  };
}

function _makeCallbackFunction(options) {
  var write = _makeWriteFunction(options);
  return function (err, results) {
    if (err) {
      throw err;
    } else {
      write(results);
    }
  };
}

function _makeExecFunction(options) {
  var callback = _makeCallbackFunction(options);
  return function (patterns) {
    globcat(patterns, { stream: true }, callback);
  };
}

function _combine(options) {
  var exec = _makeExecFunction(options);

  if (options.src) {
    exec(options.src);
  } else {
    (function () {
      var lines = [];
      var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
      });

      rl.on('line', function (line) {
        return lines.push(line);
      });
      rl.on('close', function () {
        return exec(lines);
      });
    })();
  }
}

var options = cli.parse();
var usage = {
  title: 'globcat',
  description: 'Concatenate files from command line with glob pattern.'
};

if (options.help) {
  process.stdout.write(cli.getUsage(usage) + '\n');
} else {
  _combine(options);
}