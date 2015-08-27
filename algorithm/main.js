(function() {

	var heapSort = function(arr) {

		var _arr = [];

		var _startup = function(arr) {
			_arr[0] = arr[0];
			for (var i = 1, l = arr.length; i < l; i++) {
				_add(arr[i]);
			}
		};

		var _add = function(ele) {
			var l = _arr.length - 1;
			_arr[l] = ele;
			_swapUp(ele);
		};

		heapSort.add = _add;

		var _split = function(num) {
			return Math.floor(num / 2);
		};

		var _swap = function(i, j) {
			var _tmp = _arr[i];
			_arr[i] = _arr[j];
			_arr[j] = _tmp;
		};

		var _swapUp = function(ele) {
			var index = _arr.length,
				parent;
			while (index > 0) {
				parent = _split(index);
				if (ele > _arr[parent]) {
					_swap(index, parent);
					index = parent;
				} else {
					break;
				}
			}
		};

		heapSort.pop = function() {
			// arr[0] = arr.pop();
			// return arr[0];
		};

		_startup(arr);

	};

	heapSort([2, 3, 4, 5, 8, 9]);
	heapSort.add(10);
	console.log(heapSort.pop());

})();