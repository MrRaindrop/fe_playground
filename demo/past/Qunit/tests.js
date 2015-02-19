module('Test QUnit Features', {
	setup: function() {
		this.xx = true;
	},
});

asyncTest( "asynchronous test: 3 second later!", function() {
	expect( 1 );
	setTimeout(function() {
		ok( true, "Passed and ready to resume!" );
		start();	// !!important
	}, 3000);
});

test("ok module setup", function() {
	ok( this.xx == true, "Passed!" );
});

test("equal test", function() {
	var obj1 = { foo: 'bar' };
	var obj2 = { foo1: 'bar' };
	deepEqual(obj1, obj2, 'Two objects can be the same in value.');
});

test("ok test", function() {
	ok( 1 == "1", "Passed!" );
});

test("equal test of null and undefined", function() {
	equal( null, undefined, "equaL of null and undefined." );
});

test("strict equal test of null and undefined", function() {
	strictEqual(null, undefined, 'strict equaL of null and undefined.');
});

test("another ok test", function() {
	expect(8);
	ok( true, "true succeeds" );
	ok( "non-empty", "non-empty string succeeds" );
	ok( false, "false fails" );
	ok( 0, "0 fails" );
	ok( NaN, "NaN fails" );
	ok( "", "empty string fails" );
	ok( null, "null fails" );
	ok( undefined, "undefined fails" );
});

test("global pollution", function() {
	window.pollute = true;
	ok(pollute, "nasty pollution" );
});