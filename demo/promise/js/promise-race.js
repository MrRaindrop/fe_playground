(function() {

	var btnRace = document.getElementById('btn-race'),

		getPromisedTimer = function(time) {
			var _t = time * 1000;
			return new Promise(function(resolve, reject) {
				setTimeout(function() {
					resolve('timer ' + time + 's');
				}, _t);
			});
		};

	btnRace.addEventListener('click', function(e) {

		var startDate = Date.now();

		Promise.race([getPromisedTimer(1), getPromisedTimer(2), getPromisedTimer(4), getPromisedTimer(8)])
			.then(function(val) {
				console.log(Date.now() - startDate + 'ms');
				console.log(val);
			});

	}, false);

}());


