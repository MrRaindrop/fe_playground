var btn = document.getElementById('btn'),
  
  copyOwnFrom = function(target, source) {
    Object.getOwnPropertyNames(source).forEach(function(name) {
      Object.defineProperty(target, name, Object.getOwnPropertyDescriptor(source, name));
    });
    return target;
  };

function MyError() {
	var _err = Error.apply(null, arguments);
  copyOwnFrom(this, _err);
}

MyError.prototype = Object.create(Error.prototype);
MyError.prototype.constructor = MyError;

// test
// 由于stack trace，自定义的MyError并不能完美继承Error，只能是用来与Error作个区别

btn.addEventListener('click', function() {
  console.error(new MyError('a MyError msg.'));
  // console.error(new Error('a MyError msg.'));
},false);