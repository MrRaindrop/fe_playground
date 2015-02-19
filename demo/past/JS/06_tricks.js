// set array empty

var arr = [1, 2, 3];
arr.length = 0;

// pop the first argument of a function

var key = Array.prototype.shift.call(arguments);

// return nothing ---- return void 0

return void 0;
// example:
var x = 1;
return x > 1 ? x : void 0;

// if(xx exist && xx.do exist ) do somthing:

xx && xx.do && xx.do();

// test if prop is a property of obj

if(test in obj)
	alert('yes');

// pass the num the number of arguments of func

function func(a, b, c, d){}
var num = func.length;

// typeof null = object, typeof undefined = undefined.

console.log(typeof null);
console.log(typeof undefined);

// 2.toString() is error, but...

console.log(2..toString());
console.log(2 .toString());
console.log((2).toString());


// turn arguments object into args[] array

Function.prototype.call.apply(Foo.prototype.method, arguments);

// or ...

var args = Array.prototype.slice.call(arguments);

///////////////////////////////////////////////////


/* 
* hoisting:
* var declaration move to top.
* assignment doesn't move.
* code bellew is exactly like fregment 01.
*/

//////////////fregment 01 begin//////////////
/*var myvar;
console.log(myvar);		// undefined
myvar = 'my value';

(function() {
	var myvar;
    console.log(myvar); // undefined
    myvar = 'local value';
})();*/
//////////////fregment 01 end//////////////


console.log(myvar);		// undefined
var myvar = 'my value';

(function() {  
    console.log(myvar); // undefined
    var myvar = 'local value';
})();


// anonymous function execute immediatly:

+function(){}();
(function(){}());


///////////////////////////////////////////////////

// a little trick to repeat string.

var r_count = 10;
var r_str = 'Javascript';
new Array(r_count + 1).join(r_str);

///////////////////////////////////////////////////

// inspect type:

function is(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
}

is('String', 'test'); // true
is('String', new String('test')); // true



///////////////////////////////////////////////////

console.log(10 == 010); // false  latter is 8.