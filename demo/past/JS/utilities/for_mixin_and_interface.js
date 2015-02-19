// test if o has all the exact methods of c
function borrows(o, c){
	if(o instanceof c)
		return true;

	// impossible to test built-in type because its mehods are not enumerable.
	if(c == Array || c == Date || c == Number || c == String ||
		c == Boolean || c == Function || c == RegExp || c == Error)
		return undefined;

	if(typeof o == 'function') o = o.prototype;
	var proto = c.prototype;

	for(var p in proto){
		if(typeof proto[p] != 'function')
			continue;
		if(proto[p] != o[p])
			return false;
	}
	return true;
}

// test if o is a implementation of c the interface
// or test if o has the same name of functions of c
function provides(o, c){
	if(o instanceof c)
		return true;

	// impossible to test built-in type because its mehods are not enumerable.
	if(c == Array || c == Date || c == Number || c == String ||
		c == Boolean || c == Function || c == RegExp || c == Error)
		return undefined;

	if(typeof o == 'function') o = o.prototype;
	var proto = c.prototype;

	for(var p in proto){
		if(typeof proto[p] != 'function')
			continue;

		if(!(p in o)) return false;
		if(typeof o[p] != 'function') return false;
		if(o[p].length != proto[p].length) return false;
	}
	return true;
}

// a example of interface:
function Comparable(){};
Comparable.prototype.compareTo = function(that){
	throw 'Comparable.compareTo() is abstract. Don\'t invoke it!';
}
