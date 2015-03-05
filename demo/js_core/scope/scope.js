(function() {
  
  // 1. 预测控制台输出结果是什么？
  
  function a(x, y) {
    y = function() { x = 2; };
    return function() {
      var x = 3;
      y();
      console.log(x);
    }.apply(this, arguments);
  }

  a();

}());