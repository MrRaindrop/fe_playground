/**
 * using mocha and chai for testing
 * 
 */

var expect = require('chai').expect,
  assert = require('assert'),
  Promise = require('promise');

var getPromisedTimer = function(time) {
  var _t = time * 1000;
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve('timer ' + time + 's');
    }, _t);
  });
};

describe('test suite 0', function(){

  // using done() for async promise.
  it('should resolve a promise in 1.5 seconds.', function(done) {
    return getPromisedTimer(1.5).then(function(val) {
      expect(val).to.equal('timer 1.5s');
      done();
    }).catch(function(err) {
      console.error(err);
    });
  });

  // not using done() for async promise.
  it('should resolve a promise in 1.5 seconds.', function() {
    return getPromisedTimer(1.5).then(function(val) {
      expect(val).to.equal('timer 1.5s');
    }).catch(function(err) {
      console.error(err);
    });
  });

});
