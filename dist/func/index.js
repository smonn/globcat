'use strict';

var curry = require('./curry');
var once = require('./once');
var defaults = require('./defaults');
var typeOf = require('./typeof');
var flatten = require('./flatten');
var unique = require('./unique');

module.exports = {
  /**
   * Creates a curried function.
   * @function
   * @param {Function} fn - Function to curry.
   * @param {Number} [arity=fn.length] - Number of arguments.
   * @returns {Function} The curried function.
   */
  curry: curry,

  /**
   * Copies all the keys and values from each argument into a new object. It will overwrite values
   * with the same key from separate objects from left to right, meaning the final argument take
   * presedence.
   * @function
   * @param {...Object} [source] - The source(s) to merge into a new object.
   * @return {Object} A new object.
   */
  defaults: defaults,

  /**
   * Flattens nested arrays into a one-level array.
   * @function
   * @param {Array} enumerable - An array with nested arrays.
   * @return {Array} The flattened array.
   */
  flatten: flatten,

  /**
   * Ensures a function is only called once.
   * @function
   * @param {Function} fn - The function to only call once.
   * @return {Function} A wrapper function.
   */
  once: once,

  /**
   * Returns the Object.prototype.toString representation of a value.
   * @function
   * @param {*} x - Any value.
   * @return {String} A string description of the value type.
   */
  typeOf: typeOf,

  /**
   * Filters out duplicate values by basic comparison.
   * @function
   * @param {Array} list - An array to filter.
   * @return {Array} A filtered array.
   */
  unique: unique
};