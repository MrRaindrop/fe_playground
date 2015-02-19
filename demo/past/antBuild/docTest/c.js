
/** @namespace 加法类 @class 加法类 @static */
var x = {

	/**
	 * 三个数字相加
	 * @param {number} a 数字1
	 * @param {number} b 数字2
	 * @param {number} c 数字3
	 * @returns {number} 3 numbers adds. 3个数字的和
	 * @method add3
	 */
	add3: function(a, b, c) {
		return a + b + c;
	}


	/**
	 * 二个数字相加
	 * @param {number} a 数字1
	 * @param {number} b 数字2
	 * @returns {number} 2 numbers adds. 2个数字的和
	 * @method add2
	 */
	add2: function(a, b) {
		return a + b;
	}
}



/** @namespace 减法类 */
var sub = {

	/**
	 * 第一个数减去第二个数和第三个数
	 * @param {number} a 数字1
	 * @param {number} b 数字2
	 * @param {number} c 数字3
	 * @returns {number} a-b-c
	 * @method sub3
	 */
	sub3: function(a, b, c) {
		return a - b - c;
	}


	/**
	 * 第一个数减去第二个数
	 * @param {number} a 数字1
	 * @param {number} b 数字2
	 * @returns {number} 2个数字的差
	 * @method sub2
	 */
	sub2: function(a, b) {
		return a - b;
	}
}