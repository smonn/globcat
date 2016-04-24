'use strict';

module.exports = function(x) {
  let firstMatch = 1;
  let regexp = /^\[object (.*)\]$/;
  return Object.prototype.toString.call(x)
    .match(regexp)[firstMatch]
    .toLowerCase();
};
