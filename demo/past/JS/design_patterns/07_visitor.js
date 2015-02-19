/////////////////visitor///////////////////


var visitor = {};
visitor.push = function(){
	return Array.prototype.push.apply(this, arguments);
}

var obj = {};
alert(obj.length);
obj.push = visitor.push;
obj.push('first');
alert(obj[0]);
alert(obj.length);