(function() {

	// test promise.
	console.log('---- test promise ----');

	console.dir(Promise);

	var btn = document.getElementById('btn'),

		myVar = 0,

		getPromisedVal = function(val) {

			var _val = val || 'a promised value.';

			// create a promise
			return new Promise(function(resolve, reject) {

				// simulate 3s async fetching
				setTimeout(function() {
					resolve(_val);
				}, 2000);

			});
		},

		getPromisedError = function(msg) {

			var _msg = msg || 'a 3s error.';

			// create a unresolved promise
			return new Promise(function(resolve, reject) {

				// simulate a async error.
				setTimeout(function() {
					reject(_msg);
				}, 4000);

			});

		},

		getPromisedAjaxJSON = function(url) {

			return new Promise(function(resolve, reject) {

				var xhr = new XMLHttpRequest();
				xhr.open('GET', url, true);
				xhr.onload = function() {
					var resObj, resTxt;
					if (xhr.status === 200) {
						resTxt = xhr.responseText;
						try {
							resObj = JSON.parse(resTxt);
							resolve(resObj);
						} catch (e) {
							reject(e);
						}
					} else {
						reject(new Error(xhr.statusText));
					}
				};
				xhr.onerror = function(e) {
					console.log('xhr on error.');
					reject(e);
				};
				xhr.send();

			});

		},

		btnClick = function(e) {

			var promise1 = getPromisedVal('this is my promised value.');	// resolved 2s later.
			var promise2 = getPromisedError('this is a promised error.');	// resolved 4s later.
			var promise3 = getPromisedAjaxJSON('./data.json');
			
			// the url is not exist.
			var promise4 = getPromisedAjaxJSON('./e.json');
			// the json file is not a valid json file.
			var promise5 = getPromisedAjaxJSON('./notValidData.json');

			promise1.then(function(val) {
				console.log('after 2 the value returned by promise is : ' + val);
			}).catch(function(err) {
				console.error(err);
			});

			promise2.then(function onFulfilled(val) {
				console.log('this is not gonna print.');
			}, function onRejected(err) {
				console.error(err);
			});

			promise3.then(function(obj) {
				console.log(obj);
			}).catch(function(err) {
				console.error(err);
			});

			promise4.catch(function(err) {
				console.log('---- error of invalid url ----');
				console.error(err);
			});

			promise5.catch(function(err) {
				console.log('---- error of invalid json string ----');
				console.error(err);
			});

			///////////////////////////////////////////////////////////

			Promise.resolve('a instantly resolved promise.').then(function(val) {
				console.log(val);
			});

			Promise.reject('a instantly rejcted promise.').catch(function(err) {
				console.error(err);
			});

			///////////////////////////////////////////////////////////

			Promise.resolve('a promise chain.').then(function(val) {
				console.log(val + ' task A.');
				return val;
			}).then(function(val) {
				console.log(val + ' task B.');
				return val;
			}).catch(function(err) {
				console.error(err);
			}).then(function(val) {
				console.log(val  + ' task C.');
			});

			Promise.resolve('a error chain.').then(function(val) {
				console.log('error chain -  task A.');
				return val;
			}).then(function(val) {
				console.log('error chain - task B.');
				throw new Error('error chain - rejected error.');
			}).catch(function(err) {
				console.error(err);
			}).then(function(val) {
				console.log('error chain - task C.');
			});

			////////////////////////////////////////////////////////////////

		};

	btn.addEventListener('click', btnClick, false);

}());