
window.addEvent('domready', function() {
	
	var accordion = new Accordion('span.atStart', 'div.atStart', {
		opacity: false,
		
		onActive: function(toggler, element){
			toggler.addClass('current');
		},
	 
		onBackground: function(toggler, element){
			if(toggler.hasClass('current')) {
				toggler.removeClass('current');
			}
		}
	}, $('accordion'));
 
});

/*
window.addEvent('domready', function() {
	
	loadAccordion();
	
	$$('ul.productInfo').addEvent('mouseEnter', productInfoEnter = function() {																	
		this.setStyle('background-position','0 -40px');
	});
	$$('ul.productInfo').addEvent('mouseLeave', productInfoLeave = function() {
		this.setStyle('background-position','0 0');
	});
	$$('ul.productInfo').addEvent('mouseDown', productInfoDown = function() {
		this.setStyle('background-position','0 -80px');
	});
	
});

function loadAccordion() {
	
	var XTAccordionCookie = Accordion.extend({
		
		initialize: function(togglers, elements, options) {
			this.options.cookieName = 'XTAccordion';
			this.options.cookieOptions = {path: '/', duration:30};
			this.setOptions(options);
			this.options.opacity = false;
			this.options.openAll = false;
			this.options.wait = false;
			
			var cookieValue = Cookie.get(this.options.cookieName);
			
			if (cookieValue != false) {
				this.options.show = cookieValue.toInt();
				this.addEvent('onActive', function(toggler, element) {
							toggler.addClass('current');
				});
			} else {
				this.addEvent('onActive', function(toggler, element) {
							toggler.addClass('current');
				});
			}
			
			this.parent.apply(this, arguments);
			
			this.addEvent('onActive', function(toggler, element) {
						Cookie.set(this.options.cookieName, this.togglers.indexOf(toggler), this.options.cookieOptions);
						toggler.addClass('current');
			});
			
			this.addEvent('onBackground', function(toggler, element) {
						if(toggler.hasClass('current')) {
							toggler.removeClass('current');
						}
			});
		} // ende initialize:
	}); // ende var XTAccordionCookie
	var accordion = new XTAccordionCookie($$('ul.productInfo'));
} // ende function loadAccordion
*/	

/*

window.addEvent('domready', function() {

var accordion;
var accordionTogglers;
var accordionContents;

accordionTogglers = document.getElementsByClassName('accToggler');
  
  accordionTogglers.each(function(toggler){
    //remember the original color
    toggler.origColor = toggler.getStyle('background-color');
    //set the effect
    toggler.fx = new Fx.Style(toggler, 'background-color');
  });
  
  accordionContents = document.getElementsByClassName('accContent');
  
  accordion = new Fx.Accordion(accordionTogglers, accordionContents,{
    //when an element is opened change the background color to blue
    onActive: function(toggler){
      toggler.fx.start('#6899CE');
    },
    onBackground: function(toggler){
      //change the background color to the original (green)
      //color when another toggler is pressed
      toggler.setStyle('background-color', toggler.origColor);
    }
  });
});

*/