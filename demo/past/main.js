$(document).ready(function() {

	var navConts = {
		blog: {
			name:'BLOG',
			url: '../blog',
			top: 220,
			left: 0,
		},
		toys: {
			name: 'TOYS',
			url: '#',
			top: 260,
			// left: window.innerWidth,
			left: 0,
		},
		home: {
			name: 'HOME',
			url: '#',
			top: 300,
			left: 0,
		},
	};

	$.each(navConts, function(key, value) {
		$('<div></div>')
			.addClass('nav')
			.attr({
				id: 'nav-' + value.name,
			}).data('url', value.url)
			.data('left', value.left)
			.append('<a id="nav-a-' + value.name + '" class="nav-a">' + value.name + '</a>')
			.css({
				'width': 1,
				'height': 1,
				'opacity': 0.1,
				'background-color': '#ccc',
				'color': '#333',
				'position': 'absolute',
				'top': value.top,
				'left': value.left + 'px',
			}).appendTo('#domLayer').hide();
	});

	$('.nav').hover(function() {
		$(this).stop().animate({
			'width': 306,
			'height': 34,
			opacity: 0.9,
			left: window.innerWidth / 2 - 3,
			top: $(this).css('top') - 2,
		}, 'fast');
	}, function() {
		$(this).stop().animate({
			'width': 300,
			'height': 30,
			opacity: 0.5,
			left: window.innerWidth / 2,
			top: $(this).css('top') + 2,
		}, 'fast');
	}).click(function() {
		window.location = $(this).data('url');
		return false;
	});

	function navFadeIn(event) {

		$('.nav').stop().show().each(function(index) {
			var $this = $(this);
			setTimeout(function() {
				$this.stop().animate({
					'width': 300,
					'height': 30,
					opacity: 0.5,
					left: window.innerWidth / 2,
				}, 'fast', function() {
					$('#domLayer').unbind('click', navFadeIn);
					$('#domLayer').bind('click', navFadeOut);
				});
			}, index * 100);
		});
	}

	function navFadeOut(event) {

		$('.nav').stop().each(function(index) {
			var $this = $(this);
			setTimeout(function() {
				$this.stop().animate({
					'width': 1,
					'height': 1,
					'opacity': 0.1,
					'left': $this.data('left'),
				}, 'fast', function() {
					$('#domLayer').unbind('click', navFadeOut);
					$('#domLayer').bind('click', navFadeIn);
				});
			}, index * 100);
		});
	}

	$('#domLayer').bind('click', navFadeIn);


});