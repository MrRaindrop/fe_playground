"use strict";

var Promise = require('promise');

function ArrayAsPromise(array) {
  this.array = array;
  this.promise = Promise.resolve();
}

ArrayAsPromise.prototype.then = function(onFufilled, onRejected) {
  this.promise = this.promise.then(onFufilled, onRejected);
  return this;
}

ArrayAsPromise.prototype['catch'] = function(onRejected) {
  this.promise = this.promise.catch(onRejected);
  return this;
}

Object.getOwnPropertyNames(Array.prototype).forEach(function(methodName) {

  var arrayMethod = Array.prototype[methodName];

  if (typeof ArrayAsPromise[methodName] !== 'undefined') {
    return;
  }

  if (typeof arrayMethod !== 'function') {
    return;
  }

  ArrayAsPromise.prototype[methodName] = function() {
    var that = this, args = arguments;
    this.promise = this.promise.then(function() {
      that.array = Array.prototype[methodName].apply(that.array, args);
      return that.array;
    });
    return this;
  };

});

module.exports = ArrayAsPromise;
module.exports.array = function newArrayAsPromise(array) {
  return new ArrayAsPromise(array);
};