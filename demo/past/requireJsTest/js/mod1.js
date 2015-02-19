
/*var mod1 = (function(){
	var test1 = function(){
		console.log('--- mod1.js ---');
	}

	return {
		test1: test1,
	}
})();*/


define(['mod2'], function(mod2){
	var test1 = function(){
		
		mod2.test2();
		console.log('--- mod1.js ---');
	}

	return {
		test1: test1,
	}
});