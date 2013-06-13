$(document).ready(function() {

	//Set the initial state: first button selected, and all but first slides hidden
	$('#slidecontrols').find('li:eq(0)').addClass('selected');	
	$('#slides').find('> div:eq(0)').nextAll().hide();	

	//actions that apply on click to all buttons
	$('#slidecontrols li').click( function(event) {
		event.preventDefault();
		$('#slidecontrols li').removeClass('selected');
		$('#slides > div').hide();
		$(this).addClass('selected');

  		var index = $("#slidecontrols li").index(this);
		$('#slides > div:eq('+index+')').show();

	});

});
