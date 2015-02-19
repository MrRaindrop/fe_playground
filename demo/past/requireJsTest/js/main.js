console.log('--- main.js ---');

require.config({

	shim: {		// deal with modules not compatible with AMD(' the Asynchronous Module Definition ')

		'underscore': {
			exports: '_',	// outside call name
		},

		'backbone': {
			deps: ['underscore', 'jquery'],		// dependency
			exports: 'Backbone',		// outside call name
		},
	},

	paths: {
		'jquery': 'lib/jquery-1.9.1',
		'underscore': 'lib/underscore',
		'backbone': 'lib/backbone'
	}

	/*baseUrl: 'js/lib',

	paths: {
		'jquery': 'jquery-1.9.1',
		'underscore': 'underscore',
		'backbone': 'backbone'
	},*/
});

require(['jquery', 'underscore', 'backbone'], function($, _, Backbone){
	console.log('jquery, underscore, backbone, loading finished!');

	console.log($);
	console.log(_);
	console.log(Backbone);
});

require(['mod1'/*, 'mod2', 'mod3'*/], function(mod1/*, mod2, mod3*/){
	// console.log('mod1, mod2, mod3, loading finished!');
	console.log('mod1 loading finished!');

	mod1.test1();
	// mod2.test2();
	// mod3.test3();
})