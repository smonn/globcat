'use strict';

module.exports = function (x) {
  var firstMatch = 1;
  var regexp = /^\[object (.*)\]$/;
  return Object.prototype.toString.call(x).match(regexp)[firstMatch].toLowerCase();
};