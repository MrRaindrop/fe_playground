(function(win, $) {

	var _url = {
		collection: 'https://api.douban.com/v2/book/user/SinkingBoat/collections?status=read&start=0' +
			'&count=50&from=2009-01-01T10:00:01&to=2010-01-01T01:00:01',
		login: 'https://www.douban.com/service/auth2/auth?client_id=023ec4bb46c62b1d06bc4e31d4528157' +
			'&redirect_uri=https://www.mrraindrop.com/path&response_type=token',
	};

	$(document).ready(function() {

		$('#btn-login').click(function() {
			$.getJSON(_url.login, function(data) {
				console.log('login back data:');
				console.log(data);
			});
		});

		$('#btn-show').on('click', function() {
			/*$.getJSON(_url.collection + '?callback=?', function(data) {
				// console.log('show data:');
				// console.log(data);
				alert('success!');
			});*/
		});

	});

})(window, $);