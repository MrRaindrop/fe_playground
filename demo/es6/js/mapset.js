'use strict';

var logSet = s => console.log([...s].toString());

var set = new Set([1, 1, 2, 2, 3, 4, 5, +0, -0]);
var set2 = new Set([0,2,4,6,8,10]);

console.log(set);
console.log([...set.entries()].map(x => '[' + x.toString() + ']').toString());

var s = new Set([1,2,3]);
logSet(s);
s = new Set(Array.from(s, x => x * 2));
logSet(s);
s.clear();
logSet(s);

logSet(new Set([...set].map(x => x * 2)));

////////// 求交集并集

var union = new Set([...set, ...set2]);
logSet(union);
var intersect = new Set([...set].filter(x => set2.has(x)));
logSet(intersect);

var ws = new WeakSet();
var intersectArr = [];
intersect.forEach((x, i) => {
	intersectArr[i] = { val: x };
	ws.add(intersectArr[i]);
});
console.log(ws);
intersectArr.forEach(x => console.log('{val:' + x.val + '}', ws.has(x)));
ws.clear();
console.log('after clear...');
intersectArr.forEach(x => console.log('{val:' + x.val + '}', ws.has(x)));

// console.log([...ws]); // Error: WeakSet is not iterable

var map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);
console.log([...map.keys()].toString());
console.log([...map.values()].toString());

var dumpMap = function(map) {
	var str = '';
	str = [...map].reduce(function(s, entry, arr) {
		return s + ',{' + entry[0] + ':' + entry[1] + '}';
	}, str);
	console.log(str.substr(1));
}
dumpMap(map);
map.clear();
dumpMap(map);






