[![Travis](https://img.shields.io/travis/smonn/globcat.svg)](https://travis-ci.org/smonn/globcat)
[![Dependency Status](https://david-dm.org/smonn/globcat.svg)](https://david-dm.org/smonn/globcat)
[![codecov](https://codecov.io/gh/smonn/globcat/branch/master/graph/badge.svg)](https://codecov.io/gh/smonn/globcat)
[![npm module downloads](http://img.shields.io/npm/dt/globcat.svg)](https://www.npmjs.org/package/globcat)
[![npm version](https://img.shields.io/npm/v/globcat.svg)](https://www.npmjs.org/package/globcat)
[![node version](https://img.shields.io/node/v/globcat.svg)](https://www.npmjs.org/package/globcat)
[![npm license](https://img.shields.io/npm/l/globcat.svg)](https://raw.githubusercontent.com/smonn/globcat/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/smonn/globcat.svg)](https://github.com/smonn/globcat/issues)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# globcat

Concatenate files from command line with glob pattern.

## Install

```sh
npm install [-g] globcat
```

## Usage

```javascript
const globcat = require('globcat')
const options = { /*...*/ }

// just the one...
globcat('**/*.txt', (err, contents) => {
  // contents contains the file contents of the matched files
  // err is an error object or null
})

// ... or with array
globcat(['path/to/file.txt', 'other/path/*.txt'], options, (err, contents) => {
  // contents contains the file contents of the matched files
  // err is an error object or null
})

// as promise
globcat(['path/to/file.txt', 'other/path/*.txt'], options)
  .then(function(contents) {
    // use contents
  })
  .catch(function(err) {
    // handle error
  })
```

### Options

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

To see available options run `globcat --help`.
