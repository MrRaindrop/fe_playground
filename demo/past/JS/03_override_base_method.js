////////// base class

function Rectangle(w, h){
	this.width = w;
	this.height = h;
}

Rectangle.prototype.area = function(){
	return this.width * this.height;
}

Rectangle.prototype.toString = function(){
	return '[' + this.width + ', ' + this.height + ']';
}

////////// child class

function PositionedRectangle(x, y, w, h){
	Rectangle.call(this, w, y);
	// this.super(w, h);
	this.x = x;
	this.y = y;
}

/////// extend from base

PositionedRectangle.prototype = new Rectangle();

PositionedRectangle.prototype.constructor = PositionedRectangle;
PositionedRectangle.prototype.super = Rectangle;

delete PositionedRectangle.prototype.width;
delete PositionedRectangle.prototype.height;

////// define new method

PositionedRectangle.prototype.contains = function(x, y){
	return (x > this.x && x < this.x + this.width &&
		y > this.y && y < this.y + this.height);
}

///// override base method toString

// PositionedRectangle.prototype.toString = function(){
// 	return '(' + this.x + ', ' + this.y + ')' + this.super.prototype.toString.apply(this);
// }

PositionedRectangle.prototype.toString = function(){
	return '(' + this.x + ', ' + this.y + ')' + Rectangle.prototype.toString.apply(this);
}

/////////// extend from child class

function ColoredPositionedRectangle(x, y, w, h, c){
	// PositionedRectangle.call(this, x, y, w, h);
	this.super(x, y, w, h);
	this.color = c;
}

ColoredPositionedRectangle.prototype = new PositionedRectangle();
ColoredPositionedRectangle.prototype.super = PositionedRectangle;
ColoredPositionedRectangle.prototype.constructor = ColoredPositionedRectangle;

delete ColoredPositionedRectangle.prototype.x;
delete ColoredPositionedRectangle.prototype.y;
delete ColoredPositionedRectangle.prototype.width;
delete ColoredPositionedRectangle.prototype.height;

////// override base method toString

//will cause Uncaught RangeError: Maximum call stack size exceed. if base class use 'this.super.prototype.toString' too.
ColoredPositionedRectangle.prototype.toString = function(){
	return this.super.prototype.toString.apply(this) + '{' + 'color: ' + this.color + '}';
}

// ColoredPositionedRectangle.prototype.toString = function(){
// 	return PositionedRectangle.prototype.toString.apply(this) + '{' + 'color: ' + this.color + '}';
// }


// 注意super只能使用一层，如果a extends b extends c 则不能在a 和 b中同时使用super 否则引起无限循环