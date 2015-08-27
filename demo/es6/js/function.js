(function() {

	////////////// arrow functions
	/**
	 * - 数体内的this对象，绑定定义时所在的对象，而不是使用时所在的对象;
	 * - 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误;
	 * - 不可以使用arguments对象，该对象在函数体内不存在。
	 */

	////////////// default parameter

	var errorIfMissing = () => {
		console.log('Missing parameter');
	}

	var func = (x = 'xxx', y = 'yyy', z = errorIfMissing()) => {
		console.log(x, y, z);
	};
	func();
	console.log(func.length);

	////////////// rest parameter & spread operator

	const sortNumbers = (...numbers) => numbers.sort();

	console.log(sortNumbers(3,2,1,5,4,6).toString());
	
	var push = (array, ...items) => {
	  items.forEach(function(item) {
	    array.push(item);
	    console.log('push:' + item);
	  });
	}
	push([], 1, 2, 3)

	console.log(...[1,2,3]);

	var map = new Map([
			['one', 1],
			['two', 2],
  		['three', 3]
		]);
	console.log(...map.keys());

	var go = function* () {
		yield 'yield1';
		yield 'yield2';
		yield 'yield3';
	};
	console.log(...go());

	////////////// function binding

	var x = {
		ttt: function() {
			return this.tt();
		},
		tt: function() {
			console.log('tt');
		}
	};
	var t = x.ttt;
	// t(this); // throw TypeError
	// x::t();	// ES7 bind
	
	////////////// 尾调用优化
	
	var factorial = (n) => {
		if (n === 1) return n;
		return n * factorial(n - 1);
	};

	var tail_factorial = (n, total) => {
	  if (n === 1) return total;
	  return tail_factorial(n - 1, n * total);
	};

	console.log(factorial(5), tail_factorial(5, 1));


}());










