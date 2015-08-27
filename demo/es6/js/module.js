var foo = 'foo',
	bar = 'bar';

export { foo, bar };

// import
import { firstName, lastName } from './profile';
import { lastName as surname } from './profile';

// import all
import * as circle from 'circle';
// import all with module
module circle from 'circle';
// use module circle.
console.log("圆面积：" + circle.area(4));
console.log("圆周长：" + circle.circumference(14));

// export default
export default foo;
// import default
import circle from 'circle';