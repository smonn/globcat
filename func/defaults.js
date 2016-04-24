'use strict';

const typeOf = require('./typeof');

const defaults = function() {
  let sources = Array.prototype.slice.call(arguments);
  let target = {};

  return sources.reduce(function(dest, source) {
    source = source || {};
    Object.keys(source).forEach(function(key) {
      if (typeOf(source[key]) === 'object') {
        dest[key] = defaults(dest[key] || {}, source[key] || {});
      } else {
        dest[key] = source[key];
      }
    });
    return dest;
  }, target);
};

module.exports = defaults;
