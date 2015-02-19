////////// base class

function Rectangle(w, h){
	this.width = w;
	this.height = h;
}

Rectangle.prototype.area = function(){
	return this.width * this.height;
}

////////// child class

function PositionedRectangle(x, y, w, h){
	// Rectangle.call(this, w, y);
	this.super(w, h);
	this.x = x;
	this.y = y;
}

PositionedRectangle.prototype = new Rectangle();

PositionedRectangle.prototype.constructor = PositionedRectangle;
PositionedRectangle.prototype.super = Rectangle;

delete PositionedRectangle.prototype.width;
delete PositionedRectangle.prototype.height;

PositionedRectangle.prototype.contains = function(x, y){
	return (x > this.x && x < this.x + this.width &&
		y > this.y && y < this.y + this.height);
}







// another way to extend:

var Life = function(){};

Life.prototype.init = function(){
	this.DNAcopy();
	this.born();
	this.grow();
	this.getOld();
	this.die();
}

Life.prototype.DNAcopy = function(){
	console.log('Life DNAcopy.');
};
Life.prototype.born = function(){};
Life.prototype.grow = function(){};
Life.prototype.getOld = function(){};
Life.prototype.die = function(){};

var Mammal = function(){};

Mammal.prototype = Life.prototype;	// Mammal extends from Life

Mammal.prototype.born = function(){
	console.log('mammal born.');
}
Mammal.prototype.grow = function(){
	console.log('mammal grow.');
}
Mammal.prototype.getOld = function(){
	console.log('mammal getOld.');
}

var Dog = function(){};
Dog.prototype = Mammal.prototype;	// Dog extends from Mammal



// extends based on object

var person = {
	name: 'Nicholas',
	sayName: function() {
		console.log(this.name);
	}
};

var myPerson = Object.create(person, {
	name: {
		value: 'Greg'
	}
});

myPerson.sayName();		// Greg