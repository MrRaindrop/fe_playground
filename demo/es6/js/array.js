(function() {

	/////// 数组新增方法
	
	/// of
	var arr = Array.of(1,2,3);
	console.log(arr);

	/// from
	arr = Array.from('abcdef');
	console.log(arr);

	/// find
	var found = [1,4,-5,10].find((n) => n < 0);
	console.log('found n < 0:', found);

	/// findIndex
	console.log([NaN].findIndex((x) => Number.isNaN(x)));
	console.log([NaN].findIndex((x) => Object.is(NaN, x)));

	/// fill
	console.log(new Array(10).fill('t'));

	/// includes
	// console.log([1,2,3,4,NaN].includes(NaN));

	/////// 数组推导
	
	/// for推导，相当于map
	var a1 = [1,2,3,4,5];
	var a2 = [for (i of a1) i * 2];
	console.log(a2);

	/// if推导，相当于filter
	a2 = [for (i of a1) if (i % 2 > 0) i];
	console.log(a2);

	/// 多个for推导，相当于多重循环
	a1 = ["x1", "y1"];
	a2 = ["x2", "y2"];
	var a3 = ["x3", "y3"];
	arr = [for (x of a1) for (y of a2) for (z of a3) x + y + z];
	console.log(arr);

	/////// 监听数组变化
	
	arr = [1,2,3,4,5];
	// Array.observe(arr, function() {
	// 	console.log('array changed:', arguments);
	// });
	// arr[2] = 'c';

}());