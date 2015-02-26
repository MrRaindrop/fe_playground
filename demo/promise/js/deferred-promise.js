(function() {

	var btnDeferred = document.getElementById('btn-deferred');

	// Deferred类的实现

	function Deferred() {
		this.promise = new Promise(function(resolve, reject) {
			this._resolve = resolve;
			this._reject = reject;
		}.bind(this));
	}

	Deferred.prototype.resolve = function(val) {
		this._resolve.call(this.promise, val);
	};

	Deferred.prototype.reject = function(err) {
		this._reject.call(this.promise, err);
	};

	// end

	function getUrl(url) {
		var deferred = new Deferred();
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.onload = function() {
			if (xhr.status === 200) {
				deferred.resolve(xhr.responseText);
			} else {
				deferred.reject(new Error(xhr.statusText));
			}
		};
		xhr.onerror = function() {
			deferred.reject(new Error(xhr.statusText));
		};
		xhr.send();
		return deferred.promise;
	}

	// test
	
	var btn = document.getElementById('btn-deferred'),
		url1 = 'http://httpbin.org/get',
		url2 = 'http://www.baidu.com/';
	
	btn.addEventListener('click', function() {
		getUrl(url1).then(function (val) {
			console.log(val);
		}).catch(console.error.bind(console));
	}, false);


}());
