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

// as promise
globcat(["path/to/file.txt", "other/path/*.txt"], options)
  .then(function(contents) {
    // use contents
  })
  .catch(function(err) {
    // handle error
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
