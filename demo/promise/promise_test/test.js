/**
 * using mocha and chai for testing
 * 
 */

var expect = require('chai').expect,
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

  it('should resolve a promise in 3 seconds.', function(done) {
    getPromisedTimer(3).then(function(val) {
      expect(val).to.equal('timer 3s');
      done();
    }).catch(function(err) {
      console.error(err);
    });
  });

});
