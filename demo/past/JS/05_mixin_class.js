function GenericToString() {};
GenericToString.prototype.toString = function(){
	var props = [];
	for(var name in this){
		if(!this.hasOwnProperty(name))
			continue;
		var value = this[name];
		var s = name + ': ';
		switch(typeof value){
			case 'function':
				s += 'function';
				break;
			case 'object':
				if(value instanceof Array) s += 'array';
				else s += value.toString();
				break;
			default:
				s += String(value);
				break;
		}
		props.push(s);
	}

	return '{' + props.join(', ') + '}';
}


function GenericEquals() {}
GenericEquals.prototype.equals = function(that){
	if(this == that)
		return true;

	var propsNumInThat = 0;
	for(var name in that){
		propsNumInThat++;
		if(that[name] !== this[name])
			return false;
	}

	var propsNumInThis = 0;
	for(name in this){
		propsNumInThis++;
	}

	if(propsNumInThis == propsNumInThat)
		return true;
	else
		return false;
}


// Rectangle borrow minxins GenericEquals and GenericToString's method

function MixRectangle(x, y, w, h){
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
}

MixRectangle.prototype.area = function(){
	return this.width * this.height;
}

// borrow methods

borrowMethods(GenericEquals, MixRectangle);
borrowMethods(GenericToString, MixRectangle);


// mixin class with borrowed constructor.

function Colored(c){
	this.color = c;
}

function ColoredMixRectangle(x, y, w, h, c){
	this.super(x, y, w, h);
	// a coloredMixRectangle is instancof superclass MixRectangle but not Colored the mixin class.
	Colored.call(this, c);
}

ColoredMixRectangle.prototype = new MixRectangle;
ColoredMixRectangle.prototype.constructor = ColoredMixRectangle;
ColoredMixRectangle.prototype.super = MixRectangle;

borrowMethods(Colored, ColoredMixRectangle);

delete ColoredMixRectangle.prototype.x;
delete ColoredMixRectangle.prototype.y;
delete ColoredMixRectangle.prototype.width;
delete ColoredMixRectangle.prototype.height;