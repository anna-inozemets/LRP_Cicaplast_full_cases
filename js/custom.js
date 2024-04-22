function vh(percent) {
	var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	return (percent * h) / 100;
}

function vw(percent) {
	var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	return (percent * w) / 100;
}

$(window).resize(function () {
	$('#pinContainer ').css({ 'font-size': `clamp(1px, ${vh(0.925925)}px,${vw(0.521)}px)` });
});

$(document).ready(function () {
	$('#pinContainer ').css({ 'font-size': `clamp(1px, ${vh(0.925925)}px,${vw(0.521)}px)` });

	var mob = 0;
	function gup(name, url) {
		if (!url) url = location.href;
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		var regexS = '[\\?&]' + name + '=([^&#]*)';
		var regex = new RegExp(regexS);
		var results = regex.exec(url);

		return results == null ? null : results[1];
	}

	var currenSlide = 1;

	var url = 'slides/slide' + currenSlide + '.html';
	if (gup('slide')) {
		url = 'slides/slide' + gup('slide') + '.html';
	}

	$.get(url, function (html) {
		$('.next').hide('fast');
		$('#slideContainer').html(html);
	});
	$('body').on('click', 'div.prev', function (e) {
		e.stopPropagation();
		e.preventDefault();
		$('.next').hide('fast');
		TweenMax.to('section', 0.5, { opacity: 0, ease: Linear.easeNone });
		setTimeout(function () {
			prevSlide();
		}, 500);
	});
	$('body').on('click', 'div.next', function (e) {
		e.stopPropagation();
		e.preventDefault();
		TweenMax.to('section', 0.5, { opacity: 0, ease: Linear.easeNone });
		$('.next').hide('fast');
		setTimeout(function () {
			nextSlide();
		}, 500);
	});
});
function prevSlide() {
	if (typeof tl !== 'undefined') {
		tl.kill();
	}

	var page = $('body').find('section').data('prev');
	if (page != 'start') {
		var url = 'slides/' + page + '.html';
		max_id = setTimeout(function () {});

		while (max_id--) {
			clearTimeout(max_id);
		}

		$.get(url, function (html) {
			$('#slideContainer').html(html);
		});
	}
}
function nextSlide() {
	if (typeof tl !== 'undefined') {
		tl.kill();
	}

	var page = $('body').find('section').data('next');
	var url = 'slides/' + page + '.html';
	max_id = setTimeout(function () {});

	while (max_id--) {
		clearTimeout(max_id);
	}
	$.get(url, function (html) {
		$('#slideContainer').html(html);
	});
}

var mql = window.matchMedia('(orientation: portrait)');

if (mql.matches) {
	$('.rotateBlock').addClass('show');
} else {
	$('.rotateBlock').removeClass('show');
}

// Прослушка события изменения ориентации
mql.addListener(function (m) {
	if (m.matches) {
		$('.rotateBlock').addClass('show');
	} else {
		$('.rotateBlock').removeClass('show');
	}
});
