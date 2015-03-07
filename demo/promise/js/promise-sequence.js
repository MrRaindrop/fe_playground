(function() {

	var btnSequence = document.getElementById('btn-sequence'),

		getPromisedTimer = function(time) {
			var _t = time * 1000;
			return new Promise(function(resolve, reject) {
				setTimeout(function() {
					resolve('timer ' + time + 's');
				}, _t);
			});
		},

    sequencePromises = function(promises) {

    	var results = [],

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
        },

        startDate = Date.now();

	    /**
	     * 直接使用then来链接所有promise使之序列执行
	     */
			// getPromisedTimer(1).then(handleResult)
			// 	.then(getPromisedTimer.bind(null, 2)).then(handleResult)
			// 	.then(getPromisedTimer.bind(null, 4)).then(handleResult)
			// 	.then(getPromisedTimer.bind(null, 8)).then(handleResult);

	    /**
	     * 使用for循环来处理promise的序列执行
	     */
			// var promise = promises[0]().then(handleResult);
			// for (var i = 1, l = promises.length; i < l; i++) {
			// 	promise = promise.then(promises[i]).then(handleResult);
			// }
	    
	    /**
	     * 使用reduce处理promise的序列执行（比for循环更聪明的用法）
	     */
	    
	    promises.reduce(function(prevPromise, currPromise) {
	      return prevPromise.then(currPromise).then(handleResult);
	    }, promises[0]().then(handleResult));

    };

	btnSequence.addEventListener('click', function(e) {

		var promises = [
			  getPromisedTimer.bind(null, 1),
				getPromisedTimer.bind(null, 2),
				getPromisedTimer.bind(null, 4),
				getPromisedTimer.bind(null, 8)
			];

			sequencePromises(promises);

	}, false);

}());


