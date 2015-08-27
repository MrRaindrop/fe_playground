// class Point {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//   }
// }

// class ColorPoint extends Point {
//   constructor(x, y, color) {
//     this.color = color; // ReferenceError
//     super(x, y);
//     this.color = color; // 正确
//   }
// }

// var cp = new ColorPoint(25, 8, 'green');

// console.log(cp instanceof ColorPoint);
// console.log(cp instanceof Point);

console.log(Object.getOwnPropertyDescriptor(Array.prototype, 'concat'));
