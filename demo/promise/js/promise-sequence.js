(function() {

	var btnSequence = document.getElementById('btn-sequence'),

		getPromisedTimer = function(time) {
			var _t = time * 1000;
			return new Promise(function(resolve, reject) {
				setTimeout(function() {
					resolve('timer ' + time + 's');
				}, _t);
			});
		};

	btnSequence.addEventListener('click', function(e) {

		var startDate,
			results = [],
			promises = [
				getPromisedTimer.bind(null, 1),
				getPromisedTimer.bind(null, 2),
				getPromisedTimer.bind(null, 4),
				getPromisedTimer.bind(null, 8)
			],

			handleResult = function(val) {
				if (promises.length === 0) {
					console.log(Date.now() - startDate + 'ms');
					console.log(results);
				} else {
					results.push(val);
					promises.shift();
					console.log(Date.now() - startDate + 'ms');
					console.log(results);
				}
			};

		startDate = Date.now();

		// getPromisedTimer(1).then(handleResult)
		// 	.then(getPromisedTimer.bind(null, 2)).then(handleResult)
		// 	.then(getPromisedTimer.bind(null, 4)).then(handleResult)
		// 	.then(getPromisedTimer.bind(null, 8)).then(handleResult);

		var promise = promises[0]().then(handleResult);
		for (var i = 1, l = promises.length; i < l; i++) {
			promise = promise.then(promises[i]).then(handleResult);
		}

	}, false);

}());


