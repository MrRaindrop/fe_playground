'use strict';

var expect = require('chai').expect,
  ArrayAsPromise = require('./array-promise-chain');

describe('array-promise-chain', function() {

  function isEven(val) {
    return val % 2 === 0;
  }

  function double(val) {
    return val * 2;
  }

  beforeEach(function() {
    this.array = [1, 2, 3, 4, 5];
  });

  describe('Native Array', function() {
    it('can method chain', function() {
      var res = this.array.filter(isEven).map(double);
      expect(res).to.eql([4, 8]);
    });
  });

  describe('Array As Promise', function() {
    it('can promise chain', function(done) {
      var arr = new ArrayAsPromise(this.array);
      arr.filter(isEven).map(double).then(function(val) {
        expect(val).to.eql([4, 8]);
      }).then(done, done);
    });
  });

});