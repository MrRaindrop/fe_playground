// var sort = function(arr) {
// 	var _max = arr[0];
// 	var arr = [];
// 	while (arr.length !== 0) {
// 		for (var i = 0, l = arr.length; i < l; i++) {
// 			if (_max < arr[i]) {
// 				_max = arr[i];
// 				_arr.push(_max);
// 				arr.splice(i);
// 			}
// 		}
// 	}
// 	return _arr;
// }

// console.log(sort([1, 4, 3]));

var random = function(arr) {

	var _swap = function(i, j) {
		var _tmp = arr[i];
		arr[i] = arr[j];
		arr[j] = _tmp;
	};

	for (var i = 0, l = arr.length; i < l; i++) {
		_swap(i, ~~(Math.random() * (l + 1)));
	}

	return arr;
};

// random([1, 2, 3, 4, 5]);

// var data = [];

// function BinaryTree(arr) {
// 	this.data = arr.slice();
// 	this.root = new Node(0, data[0], this.data);
// }

// function Node(index, val, data) {
// 	this.index = index;
// 	this.value = val;
// 	this.data = data;
// }

// Node.prototype.getLeftChild = function() {
// 	var index = this.index * 2 + 1;
// 	if (index < this.data.length) {
// 		return new Node(index, this.data[index], this.data);
// 	} else {
// 		return null;
// 	}
// }

// Node.prototype.getRightChild = function() {
// 	var index = this.index * 2 + 2;	
// 	if (index < this.data.length) {
// 		return new Node(index, this.data[index], this.data);
// 	} else {
// 		return null;
// 	}
// }

// var selectMax = function(arr) {
// 	return Object.keys(arr.reduce(function(p, c, i, arr) {
// 		p[arr[i]] = true;
// 		return p;
// 	}, [])).pop();
// }

// console.log(selectMax([7, 8, 2, 5, 10, 2, 5]));

var index = {0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0};
for(var i = 0; i < 10000000; i++) {
    // var a = [9,8,7,6,5,4,3,2,1].sort(function(){ return Math.random()-0.5; });
    var a = random([9,8,7,6,5,4,3,2,1]);
    index[a.indexOf(1)]++;
}
console.log(index);




