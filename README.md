# globcat

Concatenate files from command line with glob pattern.

# Install

```
#! sh
npm install [-g] globcat
```

# Usage

```
#! javascript
var globcat = require("globcat");

globcat("**/*.txt", options, function (err, contents) {
  // contents contains the file contents of the matched files
  // err is an error object or null
});
```

## Options

Options are passed through to [glob][glob]. For option details please
view the glob package.

[glob]: https://www.npmjs.com/package/glob
