/**
 * using mocha and chai for testing
 * 
 */

var expect = require('chai').expect,
  assert = require('assert'),
  Promise = require('promise');

var getPromisedAssertError = function() {
  return new Promise(function() {
    return 'assertion error promise.';
  });
};

var mayBeRejectedA = function() {
    return Promise.reject(new Error('a expected error.'));
  },

  mayBeRejectedB = function() {
    return Promise.resolve();
  };

var failTest = function() {
  throw new Error('mayBeRejected has not reject any error.');
};

describe('test suite 0', function() {

	it('a error happened in onfufilled handler.', function() {
    return getPromisedAssertError().then(function(val) {
      throw new Error('a error in onfufilled handler.');
    });
  });

  // the same as ...
  it('a error happened in onfufilled handler.', function(done) {
    return getPromisedAssertError().then(function(val) {
      throw new Error('a error in onfufilled handler.');
      done();
    });
  });

  /////////////////////// wrong pattern //////////////////////////

  it('expect a rejected error. and there it is.', function () {
    return mayBeRejectedA().catch(function (error) {
      expect(error.message).to.equal('a expected error.');
    });
  });

  it('expect a rejected error. but the test still passed without it.', function() {
    return mayBeRejectedB().catch(function(error) {
      expect(error.message).to.equal('a expected error.');
    });
  });

  //////////////////////// right pattern ////////////////

  it('expect a rejected error. and there is one.', function() {
    return mayBeRejectedA().then(failTest).catch(function(error) {
      expect(error.message).to.equal('a expected error.');
    });
  });

  it('expect a rejected error. but it does not present. so this is a error.', function() {
    return mayBeRejectedB().then(failTest).catch(function(error) {
      expect(error.message).to.equal('a expected error.');
    });
  });

  ///////////////////////// good pattern ////////////////

  it('expect a rejected error. and there is one.', function() {
    return mayBeRejectedA().then(failTest, function(error) {
      expect(error.message).to.equal('a expected error.');
    });
  });

  it('expect a rejected error. but it does not present. so this is a error.', function() {
    return mayBeRejectedB().then(failTest, function(error) {
      expect(error.message).to.equal('a expected error.');
    });
  });

});