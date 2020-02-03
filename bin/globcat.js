#! /usr/bin/env node

var commandLineArgs = require("command-line-args");
var sh = require("shelljs");
var glob = require("glob");
var fs = require('fs');
var readline = require("readline");
var globcat = require("../globcat");

var cli = commandLineArgs([
    { name: "src", type: String, multiple: true, defaultOption: true },
    { name: "output", alias: "o", type: String }
]);

var options = cli.parse();

function write(results) {
  if (options.output) {
    fs.writeFile(options.output, results, function (err) {
      if (err) {
        throw err;
      }
    });
  } else {
    process.stdout.write(results);
  }
}

function exec(patterns) {
  globcat(patterns, {}, function (err, results) {
    if (err) {
      throw err;
    } else {
      write(results);
      process.exit(0);
    }
  });
}

if (options.src) {
  exec(options.src);
} else {
  var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    }),
    lines = [];

  rl.on("line", function (line) {
    lines.push(line);
  });

  rl.on("close", function () {
    exec(lines);
  });
}
