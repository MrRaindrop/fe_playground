/**
 * using mocha and chai for testing
 * 
 */

var assert = require("assert");
describe('Array', function(){

  before(function() {
    console.log('---- before all tests ----');
  });

	beforeEach(function() {
		console.log('---- before every function ----');
	});

	afterEach(function() {
		console.log('---- after every function ----');
	});

  describe('#indexOf()', function(){

  	beforeEach(function() {
			console.log('---- before every #indexOf() function ----');
		});

		afterEach(function() {
			console.log('---- after every #indexOf() function ----');
		});

    it('should return -1 when the value is not present.', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });

  it('should compare 0 and false', function() {
		assert.equal(0, false);
	});

  describe('1equalTrue()', function(){
    it('1 should be equal to true.', function(){
      assert.equal(1, true);
    });
  });

  after(function() {
  	console.log('---- after all tests ----');
  });

});