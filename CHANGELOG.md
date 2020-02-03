# Changelog

## 1.2.0

- Updated package dependencies.
- No requires Node.js 8+.

## 1.1.2

- Updated package dependencies.
- Now using Babel 7.

## 1.1.1

- Switched from standard to prettier.

## 1.0.5

- Updated build setup.

## 1.0.4

- Updated package dependencies.

## 1.0.3

- Updated package dependencies.

## 1.0.1

- Updated package dependencies.
- Code fixes in tests to ensure they run under Windows.

## 1.0.0

- Updated package dependencies.
- Adapted to work with breaking changes in [command-line-args][cla] v3.0.0
  and the release of [command-line-usage][clu].
- Improved test code coverage using [istanbul][istanbul] and removed unused
  code.
- Added [Travis CI build][travis].
- Removed `dist` folder from source control.

## 0.7.0

- Making it work in Node.js pre-v6.0.0 using babel to build code.

## 0.6.0

- Fix missing folder in package.json.

## 0.5.1

- Allow second argument to be callback.
- Adding basic integration test for command line code.
- Various comments and code cleanup.

## 0.5.0

- Node v6.0.0.
- Switched to [http://standardjs.com/][standard] for
  code style and linting.
- Switched to [tape][tape] for tests.
- Code refactoring and cleanup.

## 0.4.1

- Removed dependency on lodash.
- Simplified testing and linting to npm scripts (i.e. no longer using
  Gulp).

## 0.4.0

- Updated package dependencies.
- Switched from JSHint to ESLint.
- Introduced promise support.

## 0.3.1

- Minor refactoring of command line code.
- Updated async dependency.

## 0.3.0

- Switched to ES6 code style.
- Updated package dependencies.

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

- Updated package dependencies.

[istanbul]: https://www.npmjs.com/package/istanbul
[standard]: http://standardjs.com/
[tape]: https://www.npmjs.com/package/tape
[cla]: https://www.npmjs.com/package/command-line-args
[clu]: https://www.npmjs.com/package/command-line-usage
[travis]: https://travis-ci.org/smonn/globcat
