
function togglethingstodo()
{
	$('select#thingstolist').change( function(){
		$('#thingstodoform').submit();
	});
}

function initCallback(carousel)
{
	
	$("#thumbnav li a").click( function()
	{
		gotoRot = $(this).parent().attr("class").replace(/third/, "").replace(/next/, "").replace(/ir/, "").replace(/ /, "").replace(/goto/, "");
		carousel.scroll(jQuery.jcarousel.intval(gotoRot));
		
		return false;
	});
	
}

function hideCaption(carousel, item, idx, state) 
{
	$("p.caption span").fadeOut(300, function()
	{
	//	alert("ul.main-spinner li.jcarousel-item-" + idx + " img");
		caption = $("ul.main-spinner li.jcarousel-item-" + idx + " img").attr('title');
	//	alert(caption);
		$(this).text(caption);
	});
}
function showCaption(carousel, item, idx, state)
{
	$("p.caption span").fadeIn(300);
}

function mainrotational()
{
	jQuery('ul.main-spinner').jcarousel({
		scroll: 1,
		auto: 6,
		easing: 'easeInOutCirc',
		animation: 2000,
		wrap: 'both',
		initCallback: initCallback,
		itemVisibleInCallback: {onBeforeAnimation: hideCaption, onAfterAnimation: showCaption},
		buttonNextHTML: false,
		buttonPrevHTML: false
	});
	
}
function ro()
{
	$('.ro').mouseover( function()
	{
		rep = ".";
		ext = $(this).attr('src').substr(-4, 4);
		src = $(this).attr('src').replace(rep, "-on.");
		$(this).attr('src', src);
		
	});
	$('.ro').mouseout( function()
	{
		rep = "-on.";
		ext = $(this).attr('src').substr(-4, 4);
		src = $(this).attr('src').replace(rep, ".");
		$(this).attr('src', src);
		
	});
}
function navigation()
{
	$('ul#nav-main div > li').mouseover( function()
	{
		$('a', this).addClass('selected');
		$('ul', this).css('left', '0em');
	});
	$('ul#nav-main div > li').mouseout( function()
	{
		$('a', this).removeClass('selected');
		$('ul', this).css('left', '-999em');
	});
}
function auxnav()
{
	$('.aux-nav > li').mouseover( function()
	{
		$('a', this).addClass('selected');
		$('ul', this).css('left', '0');
	});
	$('.aux-nav > li').mouseout( function()
	{
		$('a', this).removeClass('selected');
		$('ul', this).css('left', '-9999px');
	});
}

function desktopfun()
{
	$('#desktopfun li a img').mouseover( function()
	{
		title = $(this).attr('title');
		clas = $(this).attr('class');
		$('#desktopfun .wp-title').text(title);
		$(this).parent().parent().siblings().children().removeClass('selected');
		$(this).parent().addClass('selected');
		
		$('#desktopfun p a').attr('href', '/multimedia/#' + clas);
	});
}

function determinefooterlogo()
{
	bodybg = $('body').css('background-image');
	if( bodybg == 'url(http://summer.tnvacation.com/images/bg/bg-body-4.jpg)' )
	{
		footerbg = 'url(http://summer.tnvacation.com/images/bg/bg-logo-footer2.gif)';
		$('.credits h1 a').css('background-image', footerbg);
	}
}

function toggleThumbs()
{
	
	$("#thumbnav li.next a").click( function()
	{
		togclass = $(this).attr("class");
		$("#thumbnav div").hide();
		$("#thumbnav div#" + togclass).show();
		
		return false;
	});
}
	

$(document).ready(function(){
	togglethingstodo();
//	mainrotational();
	navigation();
	auxnav();
	ro();
	desktopfun();
	determinefooterlogo();
	toggleThumbs();
	
	$('.main-spinner').cycle({
		fx: 'scrollHorz',
		speed: 1250,
		timeout: 4000,
		pause: 1,
		random: 1,
		easing: 'easeOutExpo',
		next: '.rotational-wrap .next',
		prev: '.rotational-wrap .prev'
	});
	
	
});