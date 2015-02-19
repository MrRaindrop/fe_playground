$(function() {
	console.log('ajax-post -- start');
	var data = {
		param1: "param1",
		param2: "param2",
		url: "http://xxxx?a=a&b=b&c=c",
		param3: "param3"
	};
	var sd = JSON.stringify(data);
	$.ajax({
		type: 'POST',
		url: '/test',
		dataType: 'application/json',
		data: 'data=' + sd,
		success: function(e) {
			console.log(e);
		},
		error: function(e) {
			console.log(e);
		}
	});
});