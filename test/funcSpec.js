/*globals describe, it */
'use strict';

const assert = require('chai').assert;
const func = require('../func');

describe('func', function() {
  describe('#defaults', function() {
    it('makes a shallow copy', function() {
      let result = func.defaults({foo: 'baz'}, {foo: 'bar'});
      assert.equal(result.foo, 'bar');
    });

    it('makes a deep copy', function() {
      let result = func.defaults({foo: {bar: 1, baz: 2}}, {foo: {bar: 3}});
      let expectedBar = 3;
      let expectedBaz = 2;
      assert.equal(result.foo.bar, expectedBar, 'value should be overridden');
      assert.equal(result.foo.baz, expectedBaz, 'value should be kept');
    });
  });

  describe('#once', function() {
    it('calls function only once', function() {
      let value = 1;
      let expectedValue = 2;
      let inc = func.once(() => {
        value += value;
      });
      inc();
      inc();
      assert.equal(value, expectedValue);
    });
  });

  describe('#flatten', function() {
    it('flattens nested arrays', function() {
      let numbers = {one: 1, two: 2, three: 3};
      let array = [numbers.one, [numbers.two, [numbers.three]]];
      let expected = [numbers.one, numbers.two, numbers.three];
      assert.sameMembers(func.flatten(array), expected);
    });
  });

  describe('#uniq', function() {
    it('filters out duplicate values', function() {
      let list = ['foo', 'bar', 'baz', 'foo'];
      let expected = ['foo', 'bar', 'baz'];
      assert.sameMembers(func.uniq(list), expected);
    });
  });
});
