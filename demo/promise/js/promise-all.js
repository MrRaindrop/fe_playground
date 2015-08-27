(function() {

	var btnPromise = document.getElementById('btn-promise'),

		getPromisedTimer = function(time) {
			var _t = time * 1000;
			return new Promise(function(resolve, reject) {
				setTimeout(function() {
					// resolve('timer ' + time + 's');
					reject('error! timer ' + time + 's');
				}, _t);
			});
		};

	btnPromise.addEventListener('click', function(e) {

		var startDate = Date.now();

		Promise.all([getPromisedTimer(1), getPromisedTimer(2), getPromisedTimer(4), getPromisedTimer(8)])
			.then(function(vals) {
				console.log(Date.now() - startDate + 'ms');
				console.log(vals);
			}, function(err) {
				console.log(Date.now() - startDate + 'ms');
				console.log(err);
			});

	}, false);

}());


