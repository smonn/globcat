
var glob = require("glob");
var async = require("async");
var _ = require("ramda");
var combined = require("combined-stream2");
var fs = require("fs");

var handler = _.curry(function (options, pattern, callback) {
  glob(pattern, options.glob || {}, callback);
});

var createStream = function (path, callback) {
  callback(null, fs.createReadStream(path));
};

var combineStreams = function (callback) {
  return function (err, streams) {
    var stream;
    if (err) {
      callback(err);
    } else {
      stream = combined.create();
      _.forEach(stream.append.bind(stream), streams);
      callback(null, stream);
    }
  };
};

var combineToString = function (callback) {
  return combineStreams(function (err, stream) {
    var str = "";
    if (err) {
      callback(err);
      return;
    }
    stream.on("data", function (buffer) {
      str += buffer.toString();
    });
    stream.on("error", function (err) {
      callback(err);
    });
    stream.on("end", function () {
      callback(null, str);
    });
  });
};

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
      async.map(paths, createStream, options.stream
          ? combineStreams(callback)
          : combineToString(callback));
    }
  });
};

module.exports = globcat;
