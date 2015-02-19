
///// anonymous closures

var module1 = (function(){
	var _count = 0;
	var m1 = function(){
		console.log('m1');
	};
	var m2 = function(){
		console.log('m2');
	};

	return {
		m1: m1;
		m2: m2;
	}
})();


///// augmentation

var module1 = (function(mod){
	mod.m3 = function(){
		console.log('m3');
	};

	return mod;
})(module1);


///// loose augmentation
// mod can be undefined or null

var module1 = (function(mod){
	mod.m4 = function(){
		console.log('m4');
	};

	return mod;
})(window.module1 || {});


///// absorb global variables

var module1 = (function($, YAHOO){
	// now have access to globals jQuery (as $) and YAHOO in this code
})(jQuery, YAHOO);