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
  throw new Error('mayBeRejected has not reject any error. the test is failed.');
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

  ///////////////////////// use helper func ////////////////

  var shouldReject = function(promise) {
  	return {
  		'catch': function(fn) {
  			return promise.then(function() {
  				throw new Error('Expected promise to be rejected but it was fufilled.');
  			}, function(reason) {
  				fn.call(fn, reason);
  			});
  		}
  	}
  };

  it('should be rejected. should pass test.', function() {
  	var promise = Promise.reject(new Error('human error.'));
  	return shouldReject(promise).catch(function(err) {
  		expect(err.message).to.equal('human error.');
  	});
  });

  it('should not be the expected error. should not pass test.', function() {
  	var promise = Promise.reject(new Error('a error not expected.'));
  	return shouldReject(promise).catch(function(err) {
  		expect(err.message).to.equal('human error.');
  	});
  });

});