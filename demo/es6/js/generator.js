
function *helloWorldGenerator() {
	yield 'hello';
	yield 'world';
	return 'ending';
}

var hw = helloWorldGenerator();

console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());

////////////////////////////////
/// generator return a iterator
////////////////////////////////

function* gen() {
	yield 1;
}

/**
 * g: // the iterator
 * {
 * 	*[Symbol.iterator]() {
 * 		yield 1;
 * 	}
 * }
 * 	*/
var g = gen();

console.log(g[Symbol.iterator].toString() === gen.toString(),	// false
		g[Symbol.iterator].toString(),
		gen.toString());

// g[Symbol.iterator]() === g -> return the iterator g.
console.log(g[Symbol.iterator]() === g, g[Symbol.iterator](), g);	// true

/////////////// pass argument to next()

function* f() {
	for (var i = 0; true; i++) {
		var reset = yield i;
		if (reset) { i = -1; }
	}
}
var g = f();
console.log(g.next());
console.log(g.next());
console.log(g.next(true));
console.log(g.next());



function* foo(x) {
	console.log(x, y, z);
  var y = 2 * (yield (x + 1));
  console.log(x, y, z);
  var z = yield (y / 3);
  console.log(x, y, z);
  return (x + y + z);
}

var it = foo(5);						// x = 5
console.log('////////////////');
console.log(it.next());
console.log(it.next(100));	// y = 200
console.log(it.next(13));		// z = 13

function* bar(x) {
	var x = yield x;
	console.log(x);
	x = yield (x / 2);
	console.log(x);
	x = yield (x / 3);
	console.log(x);
	return (x / 4);
}
it = bar(5);
console.log('////////////////');
console.log(it.next(1));
console.log(it.next(2));
console.log(it.next(3));
console.log(it.next(4));
console.log(it.next(5));

/////////////// for...of iterate

function *foo() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}
for (var v of foo()) {
	console.log(v);
}

// fibonacci

function* fibonacci() {
  var [prev, curr] = [0, 1];
  for (;;) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

for (var n of fibonacci()) {
  if (n > 100) break;
  console.log(n);
}

///////////////// throw & catch

var g = function* () {
  while (true) {
    try {
      yield;
    } catch (e) {
    	console.log(e);
      if (e != 'a') throw e;
      console.log('内部捕获', e);
    }
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}

///////////////// yield a iterator --> yield* someIterator

var set = new Set([1,2,3,4]);
foo = function* () {
	yield* set;
	// yield* set.values();
	// yield* set[Symbol.iterator]();
	// yield* Array.from(set);
}
for (var v of foo()) {
	console.log('yield ' + v);
}

/// demo 2

function* inner() {
  yield 'hello!';
}

function* outer1() {
  yield 'open';
  yield* inner();
  yield 'close';
}

var gen = outer1();
console.log(gen.next()); // -> 'open'
console.log(gen.next()); // -> a generator
console.log(gen.next()); // -> 'close'

///////////////// inner generator return a value.

function *foo1() {
  yield 2;
  yield 3;
  return "foo";
}

function *bar1() {
  yield 1;
  var v = yield *foo1();
  console.log( "v: " + v );
  yield 4;
}

var it = bar1();

console.log('yield ' + it.next().value); // 1
console.log('yield ' + it.next().value); // 2
console.log('yield ' + it.next().value); // 3
console.log('yield ' + it.next().value);
// v: foo
// 4
console.log('yield ' + it.next().value); // undefined



/// iterate a deep array

function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for(var i=0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}

var tree1 = [ 'a', ['b', 'c'], ['d', 'e'] ];

for(var x of iterTree(tree1)) {
  console.log(x);
}

///////////////// iterate a binaryTree

// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
  if (t) {
    yield* inorder(t.left);
    yield t.label;
    yield* inorder(t.right);
  }
}

// 下面生成二叉树
function make(array) {
  // 判断是否为叶节点
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
}
var tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

// 遍历二叉树
var result = [];
for (var node of inorder(tree)) {
  result.push(node);
}

console.log(result);
// ['a', 'b', 'c', 'd', 'e', 'f', 'g']

///////////////// generator as constructor

var Obj = function* () {
	yield this.x = 'xx';
	yield this.y = 'yy';
}

console.log('new obj:', new Obj());

var obj = {};
var genObj = Obj.bind(obj)();
console.log('yield ', genObj.next().value);
console.log('yield ', genObj.next().value);
console.log('yield ', genObj.next().value);
console.log('obj', obj);

///////////////// generator推导

var generator = function* () {
	for (var i = 0; i < 6; i++) {
		yield i;
	}
}
var squared = (for (n of generator()) n * n);
console.log('squared', [...squared]);

var set = new Set([0, 1, 2, 3, 4, 5]);
cube = (for (n of set) n*n*n);
console.log('cube', [...cube]);

///////////////// flow control

var longRunningTask = function* () {
	try {
		var v1, v2, v3, v4;
		v1 = yield 1;
		console.log('v1', v1);	// 2
		v2 = yield v1;
		console.log('v2', v2);	// 3
		v3 = yield v2;
		console.log('v3', v3);	// 4
		v4 = yield v3;
		console.log('v4', v4);	// 5
	} catch(e) {
		console.error(e);
	}
};

var scheduler = function(task) {
	setTimeout(function() {
		var taskObj = task.next(task.value);
		// console.log('task.value', task.value);
		// console.log('value:', taskObj.value, 'done:', taskObj.done);
		if (!taskObj.done) {
			task.value = taskObj.value + 1;
			scheduler(task);
		}
	}, 0);
};

scheduler(longRunningTask());

///////////////// inject iterator

function* iterEntries(obj) {
  var keys = Object.keys(obj);
  for (var i=0; i < keys.length; i++) {
    var key = keys[i];
    yield [key, obj[key]];
  }
}

var myObj = { foo: 3, bar: 7 };

for (var [key, value] of iterEntries(myObj)) {
  console.log('[', key, ',', value, ']');
}


///////////////// generator yield promise

function getFoo () {
  return new Promise(function (resolve, reject){
    resolve('foo');
  });
}

var g2 = function* () {
  try {
    var foo = yield getFoo();	// yield a promise
    console.log(foo);
  } catch (e) {
    console.log(e);
  }
};

function run (generator) {
  var it = generator();

  function go(result) {
    if (result.done) return result.value;

    return result.value.then(function (value) {
      return go(it.next(value));
    }, function (error) {
      return go(it.throw(value));
    });
  }

  go(it.next());
}

run(g2);

////////////////

var g3 = function* () {
	try {
		var foo = yield new Promise(function(resolve, reject) {
			resolve('foo');
		});
	} catch(e) {
		console.error(e);
	}
};

var it3 = g3();
var res3 = it3.next();
if (!res3.done) {
	res3.value.then(function(value) {
		return it3.next(value);
	}, function(error) {
		return it3.throw(error);
	});
}







