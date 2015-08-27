(function() {

	///////// 属性简写
	
	var obj = {
		method() {
			return "hello";
		}
	};

	console.log(obj);
	console.log(obj.method());
	/// 方法的name属性
	console.log(obj.method.name);

	function rObj(x, y) {
		return {
			x, y,
			z() {
				return this;
			}
		};
	}
	obj = rObj(2,3);
	console.log(obj);
	console.log(obj.z());

	///////// 属性名表达式

	{
		obj = {
			['he' + 'llo']: 'hi'
		};
		console.log(obj);
	}

	///////// 新增方法
	
	console.log(Object.is(NaN, NaN));
	console.log(Object.is(+0, 0));
	console.log(Object.is(-0, 0));
	console.log(Object.is(+0, -0));

	console.log(Object.assign(obj, { 'ttt': 'test'}));
	console.log(obj);

	/// __proto__属性
	obj = {
		__proto__: {
			'xx': 'xxx'
		},
		method() {
			console.log('test');
		}
	};
	/// getPrototypeOf方法
	console.log(Object.getPrototypeOf(obj));

	/// setPrototypeOf方法
	Object.setPrototypeOf(obj, {
		'yy': 'yyy'
	});
	console.log(Object.getPrototypeOf(obj));

	/// observe方法
	// Object.observe(obj, function(changes) {
	// 	changes.forEach(function(change) {
	// 		console.log('change:-->',
	// 				change.name,
	// 				change.oldValue,
	// 				change.object[change.name],
	// 				change.type);
	// 	});
	// });
	// obj.xxx = 'xxx';
	// obj.xxx = 'test';
	// obj.yyy = 'yyy';

	///////// Symbol：独一无二的标识符

	var s1 = Symbol('foo');
	var s2 = Symbol();
	var s3 = Symbol();
	console.log(s1, s2, s3);
	console.log(s2 === s3, Object.is(s2, s3));

	console.log(Symbol('bar') === Symbol('bar'),
			Symbol.for('bar') === Symbol.for('bar'));

	console.log(Symbol.keyFor(s1), Symbol.keyFor(Symbol.for('bar')));

	obj[s1] = 'hello';
	obj[s2] = 'world';
	obj[Symbol('test')] = 'ttt';
	Object.defineProperty(obj, 'ttt', {
		enumerable: false,
		writable: false,
		configurable: false,
		value: 'test'
	});

	/// getOwnPropertySymbols
	console.log(Object.getOwnPropertySymbols(obj));
	/// getOwnPropertyNames
	console.log(Object.getOwnPropertyNames(obj));
	console.log(Object.keys(obj));

	/// Reflect.ownKeys
	// console.log(Reflect.ownKeys(obj));

	///////// Proxy
	
	var o = {};
	obj = new Proxy(o, {
		get(target, key, receiver) {
			console.log(`getting ${key}!`, target, key, receiver);
			return target[key];
			// return Reflect.get(target, key, receiver);
		},
		set(target, key, value, receiver) {
			console.log(`setting ${key}!`, target, key, value, receiver);
			target[key] = value;
			return target[key];
			// return Reflect.get(target, key, value, receiver);
		}
	});
	obj.count = 0;
	++obj.count;
	console.log(obj.test);

	myFunc = new Proxy(function(x, y) {
		return x + y;
	}, {
		get: function(target, key) {
			if (key === 'prototype') return Object.getPrototypeOf(target);
			return 'Hello ' + key;
		},
		apply: function(target, thisBinding, args) {
			return args[0];
		},
		has: function(target, key) {
			console.log('target has ' + key + '? ' + (key in target));
			return key in target;
		},
		construct: function(target, args) {
			return { 'ttt': args[1] };
		}
	});
	console.log(myFunc);
	console.log(myFunc(1, 2));
	console.log(new myFunc(1, 2));
	console.log('ttt' in myFunc);

	///////// revocable
	
	var {proxy, revoke} = Proxy.revocable({}, {});
	console.log(proxy, proxy.name, revoke, revoke.name);
	proxy.foo = 123;
	console.log(proxy.foo);
	revoke();
	// console.log(proxy.foo);
	
	///////// Reflect
	/**
	 * Proxy每个方法都有对应的Reflect方法
	 * 可以用于在Proxy中通过Reflect调用默认行为
	 */


}());