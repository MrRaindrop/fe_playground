/////////////////observer(publisher-subscriber)///////////////////

Events = function(){
	var listen, log, obj, one, remove, trigger, __this;
	obj = {};
	__this = this;

	listen = function(key, eventfn){
		var stack, _ref;
		stack = (_ref = obj[key]) != null ? _ref : obj[key] = [];
		return stack.push(eventfn);
	};

	one = function(key, eventfn){
		remove(key);
		listen(key, eventfn);
	};

	remove = function(key){
		var _ref;
		return (_ref = obj[key]) != null ? _ref.length = 0 : void 0;
	};

	trigger = function(){
		var fn, stack, _i, _len, _ref, key;
		key = Array.prototype.shift.call(arguments);
		stack = (_ref = obj[key]) != null ? _ref : obj[key] = [];
		for(_i = 0, _len = stack.length; _i < _len; _i++){
			fn = stack[_i];
			if(fn.apply(__this, arguments) === false){
				return false;
			}
		}
		return true;
	};

	return {
		listen: listen,
		one: one,
		remove: remove,
		trigger: trigger
	};
}

// use case:

// subscriber:
var adultTv = Events();

adultTv.listen('play', function(data){
	alert('today\'s movie: ' + data.name);
});

// publisher:
adultTv.trigger('play', {'name': 'MaShengXi'});