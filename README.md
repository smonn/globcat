# globcat

Concatenate files from command line with glob pattern.

# Install

```sh
npm install [-g] globcat
```

# Usage

```javascript
var globcat = require("globcat");

// just the one...
globcat("**/*.txt", options, function (err, contents) {
  // contents contains the file contents of the matched files
  // err is an error object or null
});

// ... or with array
globcat(["path/to/file.txt", "other/path/*.txt"], options, function (err, contents) {
  // contents contains the file contents of the matched files
  // err is an error object or null
});
```

## Options

- `stream` Set to `true` to get a readable stream instead of string in the
  callback. Defaults to `false`.
- `glob` Is passed through to [glob][glob]. For option details please
  view the glob package. Thanks glob and minimatch for your excellence! :)

[glob]: https://www.npmjs.com/package/glob

## Command Line

Using CLI arguments:

```sh
globcat path/*.txt other/**/*.txt --output combined.txt
```

Using pipes:

```sh
cat file-with-paths.txt | globcat > combined.txt
```

# Changelog

## 0.2.3

- Added error handling when trying to stream directory.

## 0.2.2

- Applied JSCS and JSHint through Gulp.

## 0.2.1

- Removed dependency on shelljs for string results.

## 0.2.0

- Added support to return readable streams instead of string.
- CLI now uses streams to write output.
- Fixed missing feature to forward glob options.

## 0.1.6

- Updated dependencies.
