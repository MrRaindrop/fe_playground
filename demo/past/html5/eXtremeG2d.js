// eXtremeG2d.js 0.0.1
// ===================

// > http://mrraindrop.com
// > (c) 2013-2013 Mr.Raindrop.
// > eXtremeG2d.js may be freely distributed under the MIT license.


(function(win, undefined) {

	/**
	 * @class XG2d base class of xG2d lib.
	 */
	function XG2d() {
	};

	var xG2d = null,
		xG = xG2d;

	/**
	 * this function defines class which is of constructor 'construct' and
	 * extends from class 'extends' and has methods and mix the methods of
	 * class in class array mixins.
	 */
	function _define(construct, extends, methods, mixins, config) {

		var super = extends || Object,
			mthds = methods || {},
			conf = config || {},
			mixs,
			proto,
			i, len, p, mix;

		if (!mixins) mixs = [];
		if (mixins instanceof Array) mixs = mixins;
		else mixs = [mixins];

		proto = extends.prototype;

		// borrow from mixins.
		for (i = 0, len = mixs; i < len; i++) {
			mix = mixs[i];
			for (p in mix.prototype) {
				if (typeof mix.prototype[p] === 'function') {
					proto[p] = mixpro[p];
				}
			}
		}

		// copy methods.
		for (p in mthds) {
			proto[p] = mthds[p];
		}

		proto.constructor = construct;
		constructor.prototype = proto;

		// copy config.
		for (p in conf) {
			constructor[p] = conf[p];
		}
	}

	/**
	* this function test if the current browser support canvas api.
	* @return {bool} true to support canvas api, otherwise not support.
	*/
	XG2d.testSupportCanvas = function() {

		if (!!document.createElement('canvas').getContext) {
			return true;
		} else {
			return false;
		}
	}

	function Painter(canvas) {

		if(canvas === null) {
			return null;
		}

		this._canvas = canvas;
		this._context = canvas.getContext();
		this._canvasWidth = canvas.width;
		this._canvasHeight = canvas.height;

	}

	define(Painter, )

	function Point(x, y) {

		this.x = x;
		this.y = y;

	}

	define()

	Draw.prototype.drawLine = function() (start, points, strokeStyle,) {

		if(start instanceof Point) {
			start
		}

		if(point typeof )


		this.context.beginPath();

		context.moveTo(x0, y0);
		context.lineTo(x1, y1);

		context.closePath();

		context.strokeStyle = strokeStyle;
		context.stroke();
	}

	/**
	 * this function draw a straight line on the canvas.
	 * @param {context} context canvas context.
	 * @param {int} x0 x offset of start point.
	 * @param {int} y0 y offset of start point.
	 * @param {int} x1 x offset of end point.
	 * @param {int} y1 y offset of end point.
	 * @param {strokeStyle} strokeStyle strokeStyle of canvas context.
	 */
	Draw.prototype.drawLine = function(x0, y0, x1, y1, strokeStyle) {

		this._context.beginPath();

		context.moveTo(x0, y0);
		context.lineTo(x1, y1);

		context.closePath();

		context.strokeStyle = strokeStyle;
		context.stroke();
	};

	/**
	 * this function draw a normal arrow on the canvas.
	 * @param {context} context canvas context.
	 * @param {object} point object contains properties x and y, which is
	 * the arrow point.
	 * @param {string} direction value of 'up'/'down'/'left'/'rght'.
	 * @param {int} wingDis if the arrow wings' length is len, then this
	 * value is the square root of half the square of len.
	 * @param {strokeStyle} strokeStyle strokeStyle of canvas context.
	 */
	Draw.prototype.drawArrow = (context, point, direction, wingDis, strokeStyle) {

		if(point === null || typeof point != 'object') {
			throw new Error('params type error in _drawArrow.');
		}

		var pt1 = null, pt2 = point, pt3 = null, dis = wingDis;

		switch (direction) {
			case 'up':
				pt1 = {
					x: point.x - dis,
					y: point.y + dis
				};
				pt3 = {
					x: point.x + dis,
					y: point.y + dis
				};
				break;

			case 'down':
				pt1 = {
					x: point.x - dis,
					y: point.y - dis
				};
				pt3 = {
					x: point.x + dis,
					y: point.y - dis
				};
				break;

			case 'left':
				pt1 = {
					x: point.x + dis,
					y: point.y - dis
				};
				pt3 = {
					x: point.x + dis,
					y: point.y + dis
				};
				break;

			case 'right':
				pt1 = {
					x: point.x - dis,
					y: point.y - dis
				};
				pt3 = {
					x: point.x - dis,
					y: point.y + dis
				};
				break;

			default:
				throw new Error('direction value error in function _drawArrow.');
				break;
		}

		context.beginPath();

		context.moveTo(pt1.x, pt1.y);
		context.lineTo(pt2.x, pt2.y);
		context.moveTo(pt2.x, pt2.y);
		context.lineTo(pt3.x, pt3.y);

		context.closePath();

		context.strokeStyle = strokeStyle;
		context.stroke();
	};

	/**
	 * this function draw a text string on the canvas.
	 * @param {context} context canvas context.
	 * @param {string} text the text to be draw.
	 * @param {object} position the point object which contains x and y.
	 * @param {object} config object which contains properties such as:
	 * font which is a string of font style; baseline which is the baseline
	 * of text which can be value of 'top'/'hanging'/'middle'/'alphabetic'/
	 * 'ideographic'/'bottom'; textAlign which can be value of 'start'/
	 * 'end'/'left'/'right'.
	 * @param {fontStyle} fontStyle of text drew on canvas.
	 */
	Draw.prototype.drawText = function(context, text, position, config) {

		var defFont = 'bold 12px sans-serif',
			defBaseline = 'top',
			defAlign = 'left',
			pos = position,
			conf = {};

		if (config === null) {
			conf = {
				font: defFont,
				baseline: defBaseline,
				textAlign: defAlign
			};
		} else {
			conf.font = config.font || defFont;
			conf.baseline = config.baseline || defBaseline;
			conf.textAlign = config.textAlign || defAlign;
		}

		context.font = conf.font;
		context.textBaseline = conf.baseline;
		context.textAlign = conf.textAlign;

		context.fillText(text, pos.x, pos.y);
	};

	(function init(xg, XG) {

		if(!XG.testSupportCanvas()) {
			throw new Error('Browser doesn\'t support canvas.');
		}

		xg = new XG();
		console.log(xg);


	})(xG2d, XG2d);

	// expose xG2d to global object
	window.xG = window.xG2d = xG2d;

})(window);