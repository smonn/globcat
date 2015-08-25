
var assert = require("chai").assert;
var path = require("path");
var _ = require("ramda");
var globcat = require("../globcat");

function contains(array, rgx) {
  assert.ok(_.all(function (x) { return rgx.test(x); }, array), "should match the pattern " + rgx);
}

describe("globcat", function () {
  it("should include each file only once", function (done) {
    var cwd = process.cwd(),
      pattern = path.join(cwd, "test/**/*.txt"),
      duplicate = path.join(cwd, "test/sample/foo.txt");

    globcat([pattern, duplicate], {}, function (err, results) {
      assert.match(results, /^bar\s+baz\s+foo\s*$/g, "only once of each file content");
      done();
    });
  });
});
