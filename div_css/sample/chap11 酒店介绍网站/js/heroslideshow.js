$(document).ready(function(){

	// Hero Slideshow
	//Set some variables
	var slideHeight = 300;
	var numberOfSlides = $('.slide').length;

	//Apply some initial CSS
	$('.heroslideshow').css({'height' : '300px'});
	$('.tabs').find('div:eq(0)').addClass('first');
	$('.tabs').find('div:eq(0)').addClass('selected');	

	//actions that apply on mouseover
	$('.tabs div.label').mouseover( function(event) {
	  	var index = $(".tabs div").index(this);

		//the action on the tabs
		$('.tabs div').removeClass('selected');
		$(this).addClass('selected');

		//the action on the slides
		$('.slides').stop().animate(
				{'marginTop' : slideHeight*(-index)}
		);

	});
	

	var oldSlide = 0, currentSlide = 0;
	var time = 8000;

	var slideInterval = setInterval(slideRotate, time); 

	$('.heroslideshow').hover(function() {
		clearInterval(slideInterval);
	}, function() {
		slideInterval = setInterval(slideRotate, time);
	});

	function slideRotate() {
		currentSlide = (oldSlide + 1) % numberOfSlides; 

		//the action on the tabs
		$('.tabs div').removeClass('selected');
		$('.tabs div:eq(' + currentSlide + ')').addClass('selected');
		
		//the action on the slides
		$("div.slides").stop().animate({'marginTop' : slideHeight*(-currentSlide)} );

		oldSlide = currentSlide;
	}



	// Slider
	// Used on What's On page
	$('.slider .next').addClass('nextactive');
		
	$('.slider .next').click( function(event) {
		event.preventDefault();
	  	$('.slider .wrapper .inside').animate({
	      'marginLeft' : -614
	    });
		$('.slider .next').removeClass('nextactive');
		$('.slider .previous').addClass('previousactive');

		$('.slider .next').removeAttr('title');
		$('.slider .previous').attr('title','Click to slide');

	});
	
	$('.slider .previous').click( function(event) {
		event.preventDefault();

	   $('.slider .wrapper .inside').animate({
	      'marginLeft' : 0
	    });
		$('.slider .previous').removeClass('previousactive');
		$('.slider .next').addClass('nextactive');

		$('.slider .previous').removeAttr('title');
		$('.slider .next').attr('title','Click to slide');

	});





});