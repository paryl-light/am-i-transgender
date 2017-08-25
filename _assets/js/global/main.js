// MOBILE MENU TRIGGER
$(window).on('load', function() {
	$('#answer').on('click', function () {
		console.log('click');
		$('.hidden-header-home').toggleClass('show-nav');
	});
	$('.overlay').on('click', function () {
		console.log('click');
		$('.hidden-header-home').toggleClass('show-nav');
	});
})