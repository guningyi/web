/* ======================================================================

Our Dynamic Earth	::	Javascript Sweetness

=======================================================================*/
/*      root variables      */
var togg;	var isrc;	var ititle;	var idesc;	var bglinks;	var bglinksCopy;	var lpos;
var lbuttons = new Array();	var lmenus = new Array();
var setBG;	var box;
var nnul = new Array();	var nnli = new Array();
var goTog;

/* ======================================================================

domReady :)

=======================================================================*/
window.addEvent('domready', function(){
	
	//z-index IE bug fix
	/*if(Browser.Engine.trident){
		var zIndexNumber = 1000;
		$$('div').each(function(el,i){
			if(el.hasClass('mb') == false && el.hasClass('gmnoprint') == false){
				el.setStyle('z-index',zIndexNumber);
				zIndexNumber -= 10;
			};
		});
	};*/
	
	//call mooSIFR
	/*if($$('table.supportmaterials_imagebank div div').length > 0){
		$$('table.supportmaterials_imagebank div div').each(function(el,i){
			el.set('opacity',.8);
			
			if(el.getElement('a') ==  true){
				el.getElement('a').set('opacity',1);
			};
		});
	};*/
	
	//call mooSIFR
	if($$('h1,h2,h3,h4,h5,h6').length > 0){//only triggered if 'h tags' are found on page
		$$('h1,h2,h3,h4,h5,h6').each(function(el,i){//loop through each h tag
			var font = '';//declare variable to store font in
			if(el.className.contains('mooSIFR')){//only grab h tags with mooSIFR class
				el.className.split(' ').each(function(myClass,i){//incase h tag has more than 1 class
					if(myClass.contains('mooSIFR')){//grab the class we need
						font = myClass.split('_')[1];//only take the font part and store it
					};
				});
				var initSIFR = new sIFR({//create a swf to replace text
					elements: el,
					swfPath: 'Portals/ODE/script/',
					font: font
				});
			};
		});
	};
	
	//reduce images if the are overflowing
	/*$$('#mainContent .col.right img').each(function(el,i){
		if(el.getSize().x > $('mainContent .col.right')){
			el.setStyle('width','100%');
		};
	});*/
	
	/* if($$('#wrapper .mb')){	setupMultiBox();	} */
	
	if($$('.mb').length > 0)//only triggered if 'mb' class found on page
	{
	  var initMultiBox = new multiBox('mb', {
		  descClassName: '',//the class name of the description divs
		  path: 'Portals/ODE/flash/',//path to mp3 and flv players
		  useOverlay: false,//use a semi-transparent background. default: false;
		  maxWidth: 600,//max width (set to false to disable)
		  maxHeight: 400,//max height (set to false to disable)
		  addDownload: false,//do you want the files to be downloadable?
		  pathToDownloadScript: './Scripts/forceDownload.asp',//if above is true, specify download script
		  addRollover: false,//add rollover fade to each multibox link
		  addOverlayIcon: false,//adds overlay icons to images within multibox links
		  addChain: false,//cycle through all images fading them out then in
		  recalcTop: true//subtract the height of controls panel from top position
	  });
	};
	
	if($$('.mBox').length > 0)//only triggered if 'mBox' class found on page
	{
	  var initMultiBox = new multiBox('mBox', {
		  descClassName: 'multiBoxDesc',//the class name of the description divs
		  path: 'Portals/ODE/flash/',//path to mp3 and flv players
		  useOverlay: false,//use a semi-transparent background. default: false;
		  maxWidth: 600,//max width (set to false to disable)
		  maxHeight: 400,//max height (set to false to disable)
		  addDownload: false,//do you want the files to be downloadable?
		  pathToDownloadScript: './Scripts/forceDownload.asp',//if above is true, specify download script
		  addRollover: true,//add rollover fade to each multibox link
		  addOverlayIcon: true,//adds overlay icons to images within multibox links
		  addChain: false,//cycle through all images fading them out then in
		  recalcTop: true//subtract the height of controls panel from top position
	  });
	};
	
	//call SlideItMoo
	if($$('#SlideItMoo').length > 0)//only triggered if 'SlideItMoo' id is found on page
	{
		var initSlideItMoo = new SlideItMoo({
			itemsVisible:4,//the number of thumbnails that are visible
			currentElement: 0,//the current element. starts from 0. If you want to start the display with a specific thumbnail, change this
			overallContainer: 'SlideItMoo',
			elementScrolled: 'Mask',
			thumbsContainer: 'thumbs',
			width: '313px',
			transition: Fx.Transitions.Cubic.easeIn
		});
	};
	
	if($$('.SideButton span span').length > 0){
		$$('.SideButton').getElement('span').set('opacity',.9);
		$$('.SideButton').getElement('span').getElement('span').set('opacity',1);
		
		$$('.SideButton a').each(function(el,i){
			el.addEvents({
				'mouseenter': function(){
					el.getElement('span').set('tween',{duration:200,transition:Fx.Transitions.linear}).tween('opacity',1);
				},
				'mouseleave': function(){
					el.getElement('span').set('tween',{duration:400,transition:Fx.Transitions.linear}).tween('opacity',.9);
					el.getElement('span').getElement('span').set('opacity',1);
				}
			});
		});
	};
	
	if($('bgSelect')){	setupMagicBackgrounds();	}
	
	if($('colourNav'))	{	setupGroovyNavThing();	}
	
	//if(Cookie.read("hasbackground")){	loadBackground();	}
	
	if(Browser.Engine.trident && Browser.Engine.version<5){
		$('background').setStyle('height',$(document.body).getScrollSize().y);
	};
	
	if($$('#searchbox fieldset').length>0){ setupSearch(); }
	
	if($('EventsFlash')) {
		jiggyTheNav('EventsFlash');
		var flashObj = new Swiff('./Portals/ODE/flash/events.swf', {
			id: 'swiff_test',
			width: 640,
			height: 200,
			container: $('EventsFlash'), 
			params: {},
			events: {
				onLoad: function() {}				
			}
		});
	}
	if($('tabs')){
		$$('#tabs li').each(function(el, i) { setupTab(el, i) } );
	
		myTabs = new SlidingTabs('tabs', 'panes');
		/* fixNav.delay(2000); */		
		window.addEvent('resize', myTabs.recalcWidths.bind(myTabs));
	}
	if($('flashholder')) {
		if(Browser.Plugins.Flash.version>7){
			var flashObj = new Swiff('/Userfiles/flash/teaser.swf', {
				id: 'swiff_test',
				width: 478,
				height: 243,
				container: $('flashholder'), 
				params: {},
				events: {
					onLoad: function() {}				
				}
			});
		}
	}
	if($('xmas_2009')) {
		var flashObj = new Swiff('/Userfiles/flash/christmas-2009-banner.swf', {
			id: 'Christmas 2009 banner',
			width: 653,
			height: 247,
			container: $('xmas_2009')
		});
	}
	if($('previous-party-nights')) {
		var flashObj = new Swiff('/UserFiles/flash/default_banner_630.swf', {
			id: 'Previous Party Nights',
			width: 630,
			height: 174,
			container: $('previous-party-nights'),
			vars: {
				xmlfile: '/galleryXml.ashx?galleryId=10'
			}
		});
	}
});

function jiggyTheNav(ids){
	var tlist = $('tabs').get('html');
	var txt = '<ul id="addedNav">'+tlist+'</ul>';
/* 	alert(tlist); */
	$$('#leftMenu .active').each(function(el, i) {
		if(i==0){
			el.set('html', el.get('html')+txt);
			reworkList.delay(500);
		}
	});
	
}
function reworkList(){
	$$('#addedNav a').each(function(el, i) {
		el.num = i;
		if(i==0){el.addClass('active');el.setStyle('color', '#F5B01F');}
		el.addEvents({
			'click': function(e){
				e.stop();
				setActive(this.num);
			}
		});
	});
}

var active = 0;
function setupTab(el, i) {
	el.setStyles({ opacity: .75, padding: 18, float: 'left' });
	el.i = i;
	el.addEvents({
		'mouseenter': function(){
		this.hovering = true;
			this.set('tween', { duration: 400, transition: Fx.Transitions.linear }).tween('opacity', '1');
		},
		'mouseleave': function(){
		this.hovering = false;
			if(!this.active){
				this.set('tween', { duration: 400, transition: Fx.Transitions.linear }).tween('opacity', .75);
			}
		},
		'click': function(){
			active = this.i;
		}
	});
}

function checkActive(){
	//alert('checkActive '+active);
	$$('#tabs li').each(function(el, i) { 
		if(active == i) { 
			el.active = true; 
			el.set('tween', { duration: 400, transition: Fx.Transitions.linear }).tween('opacity', '1');
		}
		else{
			el.active = false;
			if(!el.hovering){el.set('tween', { duration: 400, transition: Fx.Transitions.linear }).tween('opacity', .75);}
		}
	
	});
	return active
}
function setActive(id) {
	active = id;
	
	$$('#addedNav a').each(function(el, i) {
		if(i==active){
			el.addClass('active');
			el.setStyle('color', '#F5B01F');
		}
		
		else{
			el.removeClass('active');
			el.setStyle('color', '#AAAAAA');
		}
		
	});
	myTabs.changeTo(active+1);
}

/* ======================================================================

Main Setup Functions

=======================================================================*/
/*		setup searchbox		*/
function setupSearch(){
	$$("#searchbox fieldset").each(function(el,i){
		var sb = el.getFirst('.searchInput');
		sb.hasFocus = false;
		sb.sub = el.getFirst('.subbut');
		sb.initval = sb.value;
		$('searchbox').addEvents({
			'mouseenter': function(){ sb.setStyle('background', '#fff'); sb.sub.setStyle('background', '#fff'); },
			'mouseleave': function(){ if(sb.hasFocus == false){ sb.setStyle('background', '#ddd'); sb.sub.setStyle('background', '#ddd'); } }
		});
		sb.addEvents({
			'focus': function(){
				if(this.value==this.initval){ this.value = ""; }
				this.hasFocus = true; this.setStyle('background', '#fff'); this.sub.setStyle('background', '#fff');
			},
			'blur': function(){
				if(this.value==""){ this.value = this.initval; }
				this.hasFocus = false; this.setStyle('background', '#ddd'); this.sub.setStyle('background', '#ddd');
			}
		});
	});
}

/*      setup MultiBox      */
function setupMultiBox(){

	/*
box = new MultiBox('mb');
	$$('.mb').each(function(el, i) { 
		if(el.hasClass('autopop')){
			if(Cookie.read("popSession") != 'set'){
				Cookie.write('popSession', 'set');
				box.open(el);
			}				
		} 
	});
*/
}
/*      Background Toggler Setup      */
function setupMagicBackgrounds(){
	//	setup toggle thing
	var innerH = $('inner').getHeight();
	$('inner').setStyle('height',innerH);
	
	togg = new Fx.Slide($('inner'),{duration: 1250});
	bglinks = $$("#bgSelect li");
	$$("#bgSelect a").each(function(el, i){
		el.addEvent('click', function(event) {
			event.stop();
			sc = this.href.split('/');
			isrc=sc[sc.length-1];
			ititle = el.title;
			idesc = el.getFirst('img').alt;
			$('background').fade('0');
			slider();
			$$("#bgSelect li").each(function(el2, i2){el2.removeClass('selected')});
			bglinks[i].toggleClass('selected');
			loadNew.delay(500);
			
		});
	});
}
/*       Overlay navigation sections     */
function setupGroovyNavThing(){
	if($('wrapper').hasClass('inner') == false){
		// div for backgrounds
		var clone = new Element('div', {'id': 'hp_adboxinner'}).injectInside($('hp_adbox'));
		clone.setStyle('opacity', '0');
		//	show menus on button click
		$$('#colourNav a').each(function(ca, ida){
			lbuttons.push(ca);
			ca.addEvent('click', function(event) {
				event.stop();
				toggleMenus(ida);
			});
		});
		$$('#colourNav li').each(function(cn, id){
			//	set icon on each button
			var cnSrc;
			
			if(id==0){ cnSrc="graphics/highlight_orange.png" }
			if(id==1){ cnSrc="graphics/highlight_red.png" }
			if(id==2){ cnSrc="graphics/highlight_blu.png" }
			if(id==3){ cnSrc="graphics/highlight_gold.png"; cn.addClass('last');}
			if(Browser.Engine.trident4){
				if(id==0){ cnSrc="graphics/highlight_orange8.png" }
				if(id==1){ cnSrc="graphics/highlight_red8.png" }
				if(id==2){ cnSrc="graphics/highlight_blu8.png" }
				if(id==3){ cnSrc="graphics/highlight_gold8.png"; cn.addClass('last'); }
			}
			cn.cni = new Element('img', {'class': 'icons', 'width': '49px', 'height': '49px','src': cnSrc}).injectInside(cn);
			//	getOverlay
			getOverlay(cn, id);
		});
	}
	else{
	$('colourNav').addClass('innerCN');
		$$('#colourNav li').each(function(cn, id){
			//	set icon on each button
			var cnSrc;
			if(id==0){ cnSrc="graphics/highlight_orange.png" }
			if(id==1){ cnSrc="graphics/highlight_red.png" }
			if(id==2){ cnSrc="graphics/highlight_blu.png" }
			if(id==3){ cnSrc="graphics/highlight_gold.png"; cn.addClass('last'); }
			if(Browser.Engine.trident4){
				if(id==0){ cnSrc="graphics/highlight_orange8.png" }
				if(id==1){ cnSrc="graphics/highlight_red8.png" }
				if(id==2){ cnSrc="graphics/highlight_blu8.png" }
				if(id==3){ cnSrc="graphics/highlight_gold8.png"; cn.addClass('last'); }
			}
			cn.cni = new Element('img', {'class': 'icons', 'width': '49px', 'height': '49px', 'src': cnSrc}).injectInside(cn);
			
			if(cn.hasClass('active') && $$('#hp_adbox').length == 0 || cn.hasClass('selected') && $$('#hp_adbox').length == 0){
				cn.lhs= new Element('img', {'class': 'wrap_icons', 'width': '49px', 'height': '49px', 'src': cnSrc}).injectBefore($('wrapper').getFirst('div'));
				cn.lhs.mph = new Fx.Morph(cn.lhs, {duration: 'normal', transition: Fx.Transitions.linear, link: 'cancel'});
				cn.lhs.toggPos = 1
				cn.lhs.fade('hide')
				flyout.delay(200, cn.lhs)
			}
			else{
				cn.cni.fade('hide');
				cn.addEvents({
					'mouseenter': function(){
						this.cni.fade('1');
					},
					'mouseleave': function(){
						this.cni.fade('0');
					}
				});

			}
		});
	}
}
/*      load background from cookie      */
function loadBackground(){
	isrc = Cookie.read("hasbackground");
	$('background').setStyle('background', 'url(./Portals/ODE/images/backgrounds/'+isrc+') no-repeat center top' );


			
	$$("#bgSelect li").each(function(el,i){
		var sc = el.getFirst('a').href.split('/');
		
		if(sc[sc.length-1]==isrc){el.addClass('selected');}
		else{el.removeClass('selected');}
	});
	
}

/* ======================================================================

Functions for show hide content

=======================================================================*/

function loadNew(){
	eraseCookie('hasbackground')
	/* Cookie.write('hasbackground', isrc); */
	createCookie('hasbackground', isrc, 365);
	$('background').setStyle('background', 'url(./Portals/ODE/images/backgrounds/'+isrc+') no-repeat center top' );
	$('background').fade('1');
	showBar.delay(1000);
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}


function slider(){
	togg.toggle();
	if($$('#wrapper .wrap_icons').length>0){
		$$('#wrapper .wrap_icons').each(function(el,i){
			if(el.toggPos==0){flyout.delay(200, el)}
			else{flyout.delay(1000, el)}
		});
	}
}
function flyout(){
	if(this.toggPos==0){
		this.mph.start({'left': -200})
		this.toggPos = 1
	}
	else{
		this.mph.start({'left': -26})
		this.toggPos = 0
	}
	this.fade('toggle')
}
function showBar(){
	var barwidth = 560;
	lpos=0;
	lpos = (($('background').getCoordinates().width -barwidth)/ 2).round();
	

	var bar = new Element('div', {
		'id': 'backBar',
		'class': 'myClass',
		'html': '<div id="iinfo"><h2>'+ititle+'</h2><p>'+idesc+'</p></div><a href="#" id="closeBar">use this background</a>',
		'styles': {
			'display': 'block',
			'border': '2px solid #ffffff',
			'width': barwidth,
			'background': '#101010',
			'position': 'absolute',
			'bottom': '10px',
			'left': lpos,
			'padding': '10px',
			'opacity': '0'
		}

	}).injectAfter($('background'));
	
	
	bar.addEvents({
		'mouseenter': function(){
			this.fade('1');
		},
		'mouseleave': function(){
			this.fade('.35');			
		}
	});

	bar.fade('.35');
	$('closeBar').addEvent('click', function(event) {
		event.stop();
		$('backBar').removeEvents();
		$('backBar').fade('0');	
		clearOut.delay(1000);
		slider();	
	});
	var copy = $('bgSelect').clone().injectBefore($('closeBar'));
	copy.set('html', $('bgSelect').get('html'));
	
	copy.id='bgBarSelect';
	
	bglinksCopy = $$("#bgBarSelect li");
	
	$$("#bgBarSelect a").each(function(el, i){
		el.addEvent('click', function(event) {
			event.stop();
			sc = this.href.split('/');
			isrc=sc[sc.length-1];
			ititle = el.title;
			idesc = el.getFirst('img').alt;
			$('background').fade('0');
			$$("#bgBarSelect li").each(function(el2, i2){el2.removeClass('selected')});
			bglinksCopy[i].toggleClass('selected');
			$$("#bgSelect li").each(function(el3, i3){el3.removeClass('selected')});
			bglinks[i].toggleClass('selected');
			loadNewFromBar.delay(500);
			
		});
	});
}
function clearOut(){
	$('backBar').dispose();
}
function loadNewFromBar(){
	Cookie.write('hasbackground', isrc);
	$('background').setStyle('background', 'url(./Portals/ODE/images/backgrounds/'+isrc+') no-repeat center top' );
	$('background').fade('1');
	$('iinfo').set('html', '<h2>'+ititle+'</h2><p>'+idesc+'</p>');
}

/* ======================================================================

Functions for loading overlay navigation

=======================================================================*/

function getOverlay(el, i){
	var newnavholder = new Element('div', {'class': 'newnavholder'}).injectInside($('hp_adbox'));
	var newnav = new Element('div', {'class': 'newnav', 'html': '<a href="#" class="closenav"></a><h2><a href="../dynamicearth/www.dynamicearth.co.uk/Portals/ODE/script/'+lbuttons[i].get('href')+'">'+lbuttons[i].get('text')+'</a></h2>' }).injectInside(newnavholder);
	var newnavinner = new Element('div', {'class': 'newnavinner'}).injectInside(newnav);
	newnav.slides = new Fx.Slide(newnav,{from:'bottom', wait: '1500', mode: 'vertical',duration: 1000});
	newnav.slides.hide();
	newnav.closed = true;
	newnav.fade('0');
	
	
	$$('.newnav a').each(function(link){
		if(link.hasClass('closenav')){
			link.addEvent('click', function(event) {
				event.stop();
				toggleMenus('all');
			});
		}
	});
	if(i == 0)
	{
	    newnavinner.set('html', $$('.visitorMenus').get('html'));
	}
	else if(i == 1)
	{
	    newnavinner.set('html', $$('.teacherMenus').get('html'));
	}
	else if(i == 2)
	{
	    newnavinner.set('html', $$('.eventMenus').get('html'));
	}
	else if(i == 3)
	{
	    newnavinner.set('html', $$('.kidMenus').get('html'));
	}
	lmenus.push(newnav);
}
function toggleMenus(i){
	lmenus.each(function(el, id){
		if(id!=i && !el.closed){
			el.slides.toggle();
			el.closed=true;
			el.fade('0');
			fadeBoxout();
		}
	});
	if(i!='all'){
		if(lmenus[i].closed){
			lmenus[i].fade('1');
			/* lmenus[i].slides.toggle(); */
			goTog = lmenus[i];
			godoTog.delay(1000);
			lmenus[i].closed=false;
			if(i==0){
				setBG = 'url(./Portals/ODE/graphics/hiddennav-visitors.jpg)';
				fadeBoxin.delay(500);
			}
			else if(i==1){
				setBG = 'url(./Portals/ODE/graphics/hiddennav-teachers.jpg)';
				fadeBoxin.delay(500);
			}
			else if(i==2){
				setBG = 'url(./Portals/ODE/graphics/hiddennav-events.jpg)';
				fadeBoxin.delay(500);
			}
			else if(i==3){
				setBG = 'url(./Portals/ODE/graphics/hiddennav-kids.jpg)';
				fadeBoxin.delay(500);
			}
			else{
				$('hp_adboxinner').fade('0');
				$('default_content').fade('1');
			}
		}
	}
	else{$('hp_adboxinner').fade('0');$('default_content').fade('1');}
}
function godoTog(){
	goTog.slides.toggle();
}
function fadeBoxin(){
	$('hp_adboxinner').setStyle('background', setBG);
	$('hp_adboxinner').fade('1');
	$('default_content').fade('0');
}
function fadeBoxout(){
	$('hp_adboxinner').fade('0');
}

