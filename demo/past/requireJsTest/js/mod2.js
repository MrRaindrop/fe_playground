/*
var mod2 = (function(){
	var test2 = function(){
		console.log('--- mod2.js ---');
	}

	return {
		test2: test2,
	}
})();
*/


define(['mod3'], function(mod3){
	var test2 = function(){

		mod3.test3();
		console.log('--- mod2.js ---');
	}

	return {
		test2: test2,
	}
});