function argumentsTest(){
	console.log('before convert to array, arguments:');
	console.log(arguments);
	console.log('is arguments instanceof Array?');
	console.log(arguments instanceof Array);

	// arguments is not array
	// this statement convert arguments from a object to a array.
	var args = Array.prototype.slice.call(arguments);

	console.log('after convert to array, arguments:');		// this works.
	console.log(args);
	console.log('is converted arguments instanceof Array?');
	console.log(args instanceof Array);

}
