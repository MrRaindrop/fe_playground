(function() {

  var jsonStr = 'invalid json string.',
    jsonStr2 = '{"a":"b"}',

    btnDone = document.getElementById('btn-done'),
    btnNoDone = document.getElementById('btn-no-done'),

    JSONPromise = function(val) {
      return new Promise(function(resolve) {
      	// unhandled error.
        resolve(JSON.parse(val));
      });
    };

  btnNoDone.addEventListener('click', function() {

    JSONPromise(jsonStr).then(function(val) {
      console.log(val);
    });

  }, false);

  ////////////////////////////////////////////
  
  /**
   * 用done处理unhandled error.
   */

  if (typeof Promise.prototype.done === 'undefined') {
    Promise.prototype.done = function(onFufilled, onRejected) {
      this.then(onFufilled, onRejected).catch(function(error) {
        setTimeout(function() {
          console.error(error);
        }, 0);
      });
    };
  }

  btnDone.addEventListener('click', function() {

    JSONPromise(jsonStr).done(function(val) {
      console.log(val);
    });

  }, false);

}());