/////////////////proxy///////////////////

/* interface and implement can vary independently */

// example:

var singleton = function(fn){
	var result;
	return function(){
		return result || (result = fn.apply(this, arguments));
	}
}

var createMask = singleton(function(){
	return document.body.appendChild(document.createElement('div'));
});


// another example:

var createScript = singleton(function(){
	return document.body.appendChild(document.createElement('script'));
});