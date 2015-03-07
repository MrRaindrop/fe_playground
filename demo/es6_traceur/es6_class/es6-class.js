class Greeter {
  
  constructor(msg) {
    this.msg = msg;
  }

  greet() {
    console.log(this.msg);
  }

};

var greeter = new Greeter('Hello, ES6!');
greeter.greet();
console.log(greeter);