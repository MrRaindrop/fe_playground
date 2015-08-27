var fs = {
	readFile: function(f, cb) {
		return cb(f);
	}
}

// normal version
fs.readFile(fileName, callback);

// thunk version
var readFileThunk = Thunk(fileName);
readFileThunk(callback);

var Thunk = function(fileName) {
	return function(callback) {
		return fs.readFile(fileName, callback);
	}
};

//////////////////////// Thunk

Thunk = function(fn) {
	return function() {
		var args = Array.prototype.slice.call(arguments);
		return function(callback) {
			args.push(callback);
			return fn.apply(this, args);
		}
	}
};

// usage
var readFileThunk = Thunk(fs.readFile);
readFileThunk(file)(callback);

//////////////////////// 基于Thunk的自动流程管理（自动执行generator）
/// 实际是基于回调函数将执行权交还给generator
/// 另一种方式是通过promise将执行权交还给generator

function run(fn) {
	var gen = fn();

	var next = function(err, data) {
		var result = gen.next(data);
		if (result.done) return;
		result.value(next);	// thunk callback: next
	};

	next();
}

var gen = function* {
	var f1 = yield readFileThunk('fileA');
	var f2 = yield readFileThunk('fileB');
	// .....
	var fn = yield readFileThunk('fileN');
}

run(gen);



//////////////////////// async/await

var asyncReadFile = async function() {
  var f1 = await readFile('/etc/fstab');
  var f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

//////////////////////// async的模拟实现

async function fn(args){
  // ...
}

// 等同于

function fn(args){
  return spawn(function*() {
    // ...
  });
}

///// spawn函数的实现
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    var gen = genF();
    function step(nextF) {
      try {
        var next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}







