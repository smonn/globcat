'use strict';

var typeOf = require('./typeof');

module.exports = function defaults() {
  var sources = Array.prototype.slice.call(arguments);
  var target = {};

  return sources.reduce(function (dest, source) {
    source = source || {};
    Object.keys(source).forEach(function (key) {
      if (typeOf(source[key]) === 'object') {
        dest[key] = defaults(dest[key] || {}, source[key] || {});
      } else {
        dest[key] = source[key];
      }
    });
    return dest;
  }, target);
};