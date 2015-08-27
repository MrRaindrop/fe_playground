'use strict';

/**
 * iterator的三个方法：next, return, throw
 */

function makeIterator(array){
  var nextIndex = 0;
  return {
    next: function(){
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  }
}

var it = makeIterator(['a', 'b']);

console.log(it.next()); // { value: "a", done: false }
console.log(it.next()); // { value: "b", done: false }
console.log(it.next()); // { value: undefined, done: true }

///////////// Symbol.iterator ////////////

/// create a iterable
var obj = {
	arr: [1,2,3,4],
	[Symbol.iterator]() {
		var index = 0, _this = this;
		return {
			next() {
				if (index !== _this.arr.length) {
					return { value: _this.arr[index++], done: false };
				} else {
					return { value: undefined, done: true };
				}
			}
		};
	},
};

console.log('iterator: ');
for (var v of obj) {
	console.log(v);
}

var spread = [...obj];
console.log('spread', spread.toString());
var from = Array.from(obj);
console.log('from', from.toString());


/// get iterator of array

var arr = [1,2,3,4],
	$iterator = arr[Symbol.iterator]();

var $result = $iterator.next();
while (!$result.done) {
	console.log('{value:', $result.value, ',done:', $result.done, '}');
	// if ($result.value === 2) break;
	$result = $iterator.next();
}

console.log(Object.getOwnPropertySymbols(arr));

var entries = arr.entries();
console.log(entries.toString());
console.log(entries.next());
console.log([...entries]);
console.log(entries.next());

/// use generator to implement iterator

obj = {
	*[Symbol.iterator]() {
		yield 'hello';
		yield 'world';
	}
};
console.log(obj[Symbol.iterator].toString());
console.log([...obj].toString());






