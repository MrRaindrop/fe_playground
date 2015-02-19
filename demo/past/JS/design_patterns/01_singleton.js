/////////////////singleton///////////////////

// singleton 1.

var createMask = function(){
	var marsk;
	return function(){
		return marsk || (mask = document.body.appendChild(document.createElement('div')))
	}
}();

// singleton 2. 一个通用的singleton包装器（桥接模式）

var singleton = function(fn){
	var result;
	return function(){
		return result || (result = fn.apply(this, arguments));
	}
}
var createMask = singleton(function(){
	return document.body.appendChild(document.createElement('div'));
})