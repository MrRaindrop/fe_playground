(function() {

  var btnTimeout = document.getElementById('btn-timeout'),
    btnNotTimeout = document.getElementById('btn-not-timeout'),

    getPromisedTimer = function(time) {
      var _t = time * 1000;
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve('timer ' + time + 's');
        }, _t);
      });
    },

    getPromisedTimeout = function(time) {
      var _t = time * 1000;
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          reject(new Error('Operation timeout after ' + time + 's.'));
        }, _t);
      });
    },

    // 设置promise的超时时间
    setPromiseTimeout = function(promise, time) {
      // 用race方法模拟超时
      return Promise.race([promise, getPromisedTimeout(time)]);
    };


  // test
	
  btnTimeout.addEventListener('click', function(e) {

    // 4秒的promise，设置2秒超时
    setPromiseTimeout(getPromisedTimer(4), 2).then(function(val) {
      console.log(val);
    }).catch(function(err) {
      console.error(err);
    });

  }, false);

  btnNotTimeout.addEventListener('click', function(e) {

    // 4秒的promise，设置6秒超时
    setPromiseTimeout(getPromisedTimer(4), 6).then(function(val) {
      console.log(val);
    }).catch(function(err) {
      console.error(err);
    });

  }, false);

}());


