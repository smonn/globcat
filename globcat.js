
var glob = require("glob");
var async = require("async");
var sh = require("shelljs");
var _ = require("ramda");

var handler = _.curry(function (options, pattern, callback) {
  glob(pattern, {}, callback);
});

var globcat = function (patterns, options, callback) {
  var counter = 0,
    paths = [];

  patterns = Array.isArray(patterns) ? patterns : [patterns];

  async.map(patterns, handler(options), function (err, results) {
    var paths = _.uniq(_.flatten(results));
    if (err) {
      callback(err);
    } else {
      callback(null, sh.cat(paths));
    }
  });
};

module.exports = globcat;
