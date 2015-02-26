(function() {

  var xhrMap = {};

  var createXhrPromise = function(url) {
      var xhr = new XMLHttpRequest();
      var promise = new Promise(function(resolve, reject) {
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            delete xhrMap[url];
          }
        };
        xhr.onload = function() {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            reject(new Error(xhr.statusText));
          }
        };
        xhr.onerror = function(err) {
          reject(err);
        };
        xhr.onabort = function() {
          reject(new Error('request aborted.'));
        }
      });
      xhrMap[url] = {
        promise: promise,
        xhr: xhr
      };
      return promise;
    },

    abortPromise = function(promise) {
      if (typeof promise === 'undefined') {
        return;
      }
      var xhr = null;
      Object.keys(xhrMap).some(function(url) {
        if (xhrMap[url].promise === promise) {
          xhr = xhrMap[url].xhr;
          return true;
        }
      });
      if (xhr !== null && xhr.readyState !== XMLHttpRequest.UNSENT) {
        xhr.abort();
      }
    };

  var cancelableXhr = {
    createXhrPromise: createXhrPromise,
    abortPromise: abortPromise
  };

  // test
  
  var btn = document.getElementById('btn');

  btn.addEventListener('click', function() {

    var xhrPromise = cancelableXhr.createXhrPromise('http://httpbin.org/get');

    xhrPromise.catch(function(err) {
      console.error(err);
    });

    cancelableXhr.abortPromise(xhrPromise);

  }, false);

}());