/////////////////factory///////////////////

// perfectly simulate operator new

function A(name){
	this.name = name;
}

function ObjectFactory(){
	var obj = {},
	Constructor = Array.prototype.shift.call(arguments);
	obj.__proto__ = typeof Constructor.prototype === 'number' ? Object.prototype : Constructor.prototype;
	var ret = Constructor.apply(obj, arguments);
	return typeof ret === 'object' ? ret : obj;
}

var a = ObjectFactory(A, 'Foo');
alert(a.name);