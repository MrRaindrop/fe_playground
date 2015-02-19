(function(win, $) {

	// create canvas element
	var screen = window.screen,
		body = document.body,
		canvas,
		cont,
		canW = screen.width - 100,
		canH = screen.height - 200,
		x, y;

	function _initCanvas(width, height) {

		canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		cont = canvas.getContext('2d');
		body.appendChild(canvas);
	}

	function _drawBackgroundMesh(canvas, context, color) {

		var arr_pt1, arr_pt2;

		if(context === null)
			return;

		context.beginPath();

		for (x = 0.5; x < canW; x += 10) {
			context.moveTo(x, 0);
			context.lineTo(x, canH);
		}

		for (y = 0.5; y < canH; y += 10) {
			context.moveTo(0, y);
			context.lineTo(canW, y);
		}

		context.closePath();

		context.strokeStyle = color;
		context.stroke();

		pt_arr_down = {
			x: 50,
			y: canvas.height
		};
		pt_arr_right = {
			x: canvas.width,
			y: 30
		};

		drawLine(context, 50, 0, 50, canvas.height, '#333');
		drawLine(context, 0, 30, canvas.width, 30, '#333');

		drawArrow(context, pt_arr_down, 'down', 10, '#000');
		drawArrow(context, pt_arr_right, 'right', 10, '#000');

		drawText(context, '(0, 0)', { x: 0, y: 0 }, {
			baseline: 'top',
		});

		drawText(context, '(' + canvas.width + ', ' + canvas.height + ')',
				{ x: canvas.width, y: canvas.height }, {
					baseline: 'bottom',
					textAlign: 'right',
				});
	}

	/**
	* this function test if the current browser support canvas api.
	* @return {bool} true to support canvas api, otherwise not support.
	*/
	function testSupport() {
		
		if (!!document.createElement('canvas').getContext) {
			return true;
		} else {
			return false;
		}
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
	function drawLine(context, x0, y0, x1, y1, strokeStyle) {

		context.beginPath();

		context.moveTo(x0, y0);
		context.lineTo(x1, y1);

		context.closePath();

		context.strokeStyle = strokeStyle;
		context.stroke();
	}

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
	function drawArrow(context, point, direction, wingDis, strokeStyle) {

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
	}

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
	function drawText(context, text, position, config) {

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
	}

	function _main() {

		if (!testSupport()) {
			return;
		}

		_initCanvas(canW, canH);
		_drawBackgroundMesh(canvas, cont, '#eee');
	}

	_main();

})(window, jQuery);