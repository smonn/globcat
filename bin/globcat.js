#! /usr/bin/env node

var commandLineArgs = require("command-line-args");
var fs = require('fs');
var path = require("path");
var readline = require("readline");
var globcat = require("../globcat");

var cli = commandLineArgs([
    { name: "src", alias: "s", type: String, multiple: true, defaultOption: true, description: "The source file globs" },
    { name: "output", alias: "o", type: String, description: "The file to write the output to" },
    { name: "help", alias: "h", type: Boolean, description: "Display this help text" }
]);

var combine = function (options) {
  var write = function (results) {
    if (options.output) {
      var file = fs.createWriteStream(path.join(process.cwd(), options.output));
      results.pipe(file);
    } else {
      results.pipe(process.stdout);
    }
  };

  var exec = function (patterns) {
    globcat(patterns, { stream: true }, function (err, results) {
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
};

var options = cli.parse();

if (options.help) {
  console.log(cli.getUsage({
    title: "globcat",
    description: "Concatenate files from command line with glob pattern."
  }));
} else {
  combine(options);
}
