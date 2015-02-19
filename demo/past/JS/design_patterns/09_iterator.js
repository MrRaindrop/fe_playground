/////////////////iterator///////////////////

var forEach_ary = function(ary, fn){
	for(var i = 0, l = ary.length; i < l; i++){
		var c = ary[i];
		if (fn.call(c, i, c) === false){
			return false;
		}
	}
};

/*forEach_ary( [1, 2, 3], function(i, n){ 
	console.log(i + ':' + n);
})*/


var forEach_obj = function(obj, fn){
	for(var i in obj){
		var c = obj[i];
		if(fn.call(c, i, c) === false)
			return false;
	}
};

/*forEach_obj({'a': 1, 'b': 2, 'c': 3}, function(i, n){
	console.log(i + ':' + n);
});*/