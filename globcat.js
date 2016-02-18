
var glob = require("glob");
var async = require("async");
var sh = require("shelljs");
var _ = require("ramda");
var combined = require("combined-stream2");
var fs = require("fs");

var handler = _.curry(function (options, pattern, callback) {
  glob(pattern, options.glob || {}, callback);
});

var globcat = function (patterns, options, callback) {
  var counter = 0,
    paths = [];

  options = options || { glob: {}, stream: false };
  patterns = Array.isArray(patterns) ? patterns : [patterns];

  async.map(patterns, handler(options), function (err, results) {
    var paths = _.uniq(_.flatten(results));
    if (err) {
      callback(err);
    } else {
      if (options.stream) {
        async.map(paths, function (path, callback) {
          callback(null, fs.createReadStream(path));
        }, function (err, streams) {
          var stream = combined.create();
          _.forEach(function (s) {
            stream.append(s);
          }, streams);
          callback(null, stream);
        });
      } else {
        callback(null, sh.cat(paths));
      }
    }
  });
};

module.exports = globcat;
