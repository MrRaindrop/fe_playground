(function() {

	var btnRejectThen = document.getElementById('btn-reject-then'),
		btnRejectCatch = document.getElementById('btn-reject-catch');

	btnRejectThen.addEventListener('click', function(e) {

		Promise.resolve().then(function onFufiled(v) {
			throw new Error('this is a error inside onFufiled.');
		}, function onRejected(e) {
			console.error(e);
		});

	}, false);

	btnRejectCatch.addEventListener('click', function(e) {

		Promise.resolve().then(function onFuflied(v) {
			throw new Error('this is a error inside on Fufiled.');
		}).catch(function onRejected(e) {
			console.error(e);
		});

	}, false);

}());


