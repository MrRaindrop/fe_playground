// data provides name, extend, construct, methods(not 'classname', 'superclass', 'constructor'), statics, borrows, provides

function define(data){

	var classname = data.name;
	var superclass = data.extend || Object;
	var constructor = data.construct || function() {};
	var methods = data.methods || {};
	var statics = data.statics || {};
	var mixins;
	var provides;

	// mixins may be a single constructor or an array of them
	if(!data.mixins) mixins = [];
	else if(data.mixins instanceof Array) mixins = data.mixins;
	else mixins = [data.mixins];

	// ditto for provides
	if(!data.provides) provides = [];
	else if(data.provides instanceof Array) provides = data.provides;
	else provides = [data.provides];

	// create prototype
	var proto = new superclass;

	for(var p in proto){
		if(proto.hasOwnProperty(p))
			delete proto[p];
	}

	// borrow from mixins
	for(var i = 0; i < mixins.length; i++){
		var c = mixins[i];
		for(var p in c.prototype){
			if(typeof c.prototype[p] != 'function')
				continue;
			proto[p] = c.prototype[p];
		}
	}

	// copy methods
	for(var p in methods)
		proto[p] = methods[p];

	proto.constructor = constructor;
	proto.superclass = superclass;
	if(classname) proto.classname = classname;

	// verify provides

	for(var i = 0; i < provides.length; i++){
		var c = provides[i];
		if(typeof c == 'function') c = c.prototype;
		for(var p in c){
			if(typeof c[p] != 'function')
				continue;
			if(p == 'constructor' || p == 'superclass')
				continue;
			if(p in proto && typeof proto[p] == 'function' &&
				proto[p].length == c[p].length)
				continue;
			// otherwise throw an exception
			throw new Error('Class ' + classname + ' does not provide method ' +
				c.classname + '.' + p);
		}
	}

	constructor.prototype = proto;

	// copy static properties
	for(var p in statics){
		constructor[p] = statics[p];
	}

	return constructor;
}