/*
@description IE6 js hacks

@author	Bryan Gullan
@created 2007-10-02
*/

$(document).ready(function() {

	//IE hack to position drop-downs correctly
	$('ul#nav li[@id] ul').each(function(){
		var anchorOffset = $(this).siblings().offset().left;
		var thisOffset = $(this).offset().left;
		$(this).css({left: anchorOffset - thisOffset - 1});
	});

});