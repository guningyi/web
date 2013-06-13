/*************
Jquery Plugins 
**************/

/*
 jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 Copyright © 2008 George McGinley Smith  All rights reserved.
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/**
 * jCarouselLite - jQuery plugin to navigate images/any content in a carousel style widget.
 * @requires jQuery v1.2 or above
 * http://gmarwaha.com/jquery/jcarousellite/
 * Copyright (c) 2007 Ganeshji Marwaha (gmarwaha.com)
 * Dual licensed under the MIT and GPL licenses:
 *
 * Version: 1.0.1
 * Note: Requires jquery 1.2 or above from version 1.0.1
 */
(function($) {                                          // Compliant with jquery.noConflict()
$.fn.jCarouselLite = function(o) {
    o = $.extend({
        btnPrev: null,
        btnNext: null,
        btnGo: null,
        mouseWheel: false,
        auto: null,

        speed: 200,
        easing: null,

        vertical: false,
        circular: true,
        visible: 3,
        start: 0,
        scroll: 1,

        beforeStart: null,
        afterEnd: null
    }, o || {});

    return this.each(function() {                           // Returns the element collection. Chainable.

        var running = false, animCss=o.vertical?"top":"left", sizeCss=o.vertical?"height":"width";
        var div = $(this), ul = $("ul", div), tLi = $("li", ul), tl = tLi.size(), v = o.visible;

        if(o.circular) {
            ul.prepend(tLi.slice(tl-v-1+1).clone())
              .append(tLi.slice(0,v).clone());
            o.start += v;
        }

        var li = $("li", ul), itemLength = li.size(), curr = o.start;
        div.css("visibility", "visible");

        li.css({overflow: "hidden", float: o.vertical ? "none" : "left"});
        ul.css({margin: "0", padding: "0", position: "relative", "list-style-type": "none", "z-index": "1"});
        div.css({overflow: "hidden", position: "relative", "z-index": "2", left: "0px"});

        var liSize = o.vertical ? height(li) : width(li);   // Full li size(incl margin)-Used for animation
        var ulSize = liSize * itemLength;                   // size of full ul(total length, not just for the visible items)
        var divSize = liSize * v;                           // size of entire div(total length for just the visible items)

        li.css({width: li.width(), height: li.height()});
        ul.css(sizeCss, ulSize+"px").css(animCss, -(curr*liSize));

        div.css(sizeCss, divSize+"px");                     // Width of the DIV. length of visible images

        if(o.btnPrev)
            $(o.btnPrev).click(function() {
                return go(curr-o.scroll);
            });

        if(o.btnNext)
            $(o.btnNext).click(function() {
                return go(curr+o.scroll);
            });

        if(o.btnGo)
            $.each(o.btnGo, function(i, val) {
                $(val).click(function() {
                    return go(o.circular ? o.visible+i : i);
                });
            });

        if(o.mouseWheel && div.mousewheel)
            div.mousewheel(function(e, d) {
                return d>0 ? go(curr-o.scroll) : go(curr+o.scroll);
            });

        if(o.auto)
            setInterval(function() {
                go(curr+o.scroll);
            }, o.auto+o.speed);

        function vis() {
            return li.slice(curr).slice(0,v);
        };

        function go(to) {
            if(!running) {

                if(o.beforeStart)
                    o.beforeStart.call(this, vis());

                if(o.circular) {            // If circular we are in first or last, then goto the other end
                    if(to<=o.start-v-1) {           // If first, then goto last
                        ul.css(animCss, -((itemLength-(v*2))*liSize)+"px");
                        // If "scroll" > 1, then the "to" might not be equal to the condition; it can be lesser depending on the number of elements.
                        curr = to==o.start-v-1 ? itemLength-(v*2)-1 : itemLength-(v*2)-o.scroll;
                    } else if(to>=itemLength-v+1) { // If last, then goto first
                        ul.css(animCss, -( (v) * liSize ) + "px" );
                        // If "scroll" > 1, then the "to" might not be equal to the condition; it can be greater depending on the number of elements.
                        curr = to==itemLength-v+1 ? v+1 : v+o.scroll;
                    } else curr = to;
                } else {                    // If non-circular and to points to first or last, we just return.
                    if(to<0 || to>itemLength-v) return;
                    else curr = to;
                }                           // If neither overrides it, the curr will still be "to" and we can proceed.

                running = true;

                ul.animate(
                    animCss == "left" ? { left: -(curr*liSize) } : { top: -(curr*liSize) } , o.speed, o.easing,
                    function() {
                        if(o.afterEnd)
                            o.afterEnd.call(this, vis());
                        running = false;
                    }
                );
                // Disable buttons when the carousel reaches the last/first, and enable when not
                if(!o.circular) {
                    $(o.btnPrev + "," + o.btnNext).removeClass("disabled");
                    $( (curr-o.scroll<0 && o.btnPrev)
                        ||
                       (curr+o.scroll > itemLength-v && o.btnNext)
                        ||
                       []
                     ).addClass("disabled");
                }

            }
            return false;
        };
    });
};

function css(el, prop) {
    return parseInt($.css(el[0], prop)) || 0;
};
function width(el) {
    return  el[0].offsetWidth + css(el, 'marginLeft') + css(el, 'marginRight');
};
function height(el) {
    return el[0].offsetHeight + css(el, 'marginTop') + css(el, 'marginBottom');
};

})(jQuery);


/* 
Auto-growing  textareas.  using this for "refine your search" textarea.
*/
(function($) {
    $.fn.autogrow = function(options) {
        this.filter('textarea').each(function() {
			var $this = $(this),
                minHeight = $this.height(),
                lineHeight = $this.css('lineHeight');
            var shadow = $('<div></div>').css({
                position: 'absolute',
                top: -10000,
                left: -10000,
                width: $(this).width(),
                fontSize: $this.css('fontSize'),
                fontFamily: $this.css('fontFamily'),
                lineHeight: $this.css('lineHeight'),
                resize: 'none'
            }).appendTo(document.body);
            var currentHeight = 0;
			var update = function() {
					var val = this.value.replace(/</g, '&lt;').replace(/>/g, '>').replace(/&/g, '&').replace(/\n/g, '<br/>');
	                shadow.html(val);
	                if ((Math.max(shadow.height() + 12, minHeight)) != currentHeight ) {
						$(this).animate({'height': Math.max(shadow.height() + 12, minHeight)}, 500);
					}
					currentHeight = Math.max(shadow.height() + 12, minHeight);
            }
            $(this).keydown(update).change(update);
            update.apply(this);
        });
        return this;
    }
})(jQuery);

/*
 * jQuery clueTip plugin
 * Version 0.9.8  (05/22/2008)
 * @requires jQuery v1.1.4+
 * @requires Dimensions plugin (for jQuery versions < 1.2.5)
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
;(function($) { 
/*
 * @name clueTip
 * @type jQuery
 * @cat Plugins/tooltip
 * @return jQuery
 * @author Karl Swedberg
 *
 * @credit Inspired by Cody Lindley's jTip (http://www.codylindley.com)
 * @credit Thanks to the following people for their many and varied contributions:
      Shelane Enos, Glen Lipka, Hector Santos, Torben Schreiter, Dan G. Switzer, Jörn Zaefferer 
 * @credit Thanks to Jonathan Chaffer, as always, for help with the hard parts. :-)
 */

 /**
 * 
 * Displays a highly customizable tooltip when the user hovers (default) or clicks (optional) the matched element. 
 * By default, the clueTip plugin loads a page indicated by the "rel" attribute via ajax and displays its contents.
 * If a "title" attribute is specified, its value is used as the clueTip's heading.
 * The attribute to be used for both the body and the heading of the clueTip is user-configurable. 
 * Optionally, the clueTip's body can display content from an element on the same page.
 * * Just indicate the element's id (e.g. "#some-id") in the rel attribute.
 * Optionally, the clueTip's body can display content from the title attribute, when a delimiter is indicated. 
 * * The string before the first instance of the delimiter is set as the clueTip's heading.
 * * All subsequent strings are wrapped in separate DIVs and placed in the clueTip's body.
 * The clueTip plugin allows for many, many more options. Pleasee see the examples and the option descriptions below...
 * 
 * 
 * @example $j('#tip).cluetip();
 * @desc This is the most basic clueTip. It displays a 275px-wide clueTip on mouseover of the element with an ID of "tip." On mouseout of the element, the clueTip is hidden.
 *
 *
 * @example $j('a.clue').cluetip({
 *  hoverClass: 'highlight',
 *  sticky: true,
 *  closePosition: 'bottom',
 *  closeText: '<img src="../game01/www.veer.com/includes/20100302/external/cross.png" alt="close" />',
 *  truncate: 60,
 *  ajaxSettings: {
 *    type: 'POST'
 *  }
 * });
 * @desc Displays a clueTip on mouseover of all <a> elements with class="clue". The hovered element gets a class of "highlight" added to it (so that it can be styled appropriately. This is esp. useful for non-anchor elements.). The clueTip is "sticky," which means that it will not be hidden until the user either clicks on its "close" text/graphic or displays another clueTip. The "close" text/graphic is set to diplay at the bottom of the clueTip (default is top) and display an image rather than the default "Close" text. Moreover, the body of the clueTip is truncated to the first 60 characters, which are followed by an ellipsis (...). Finally, the clueTip retrieves the content using POST rather than the $.ajax method's default "GET."
 * 
 * More examples can be found at http://plugins.learningjquery.com/cluetip/demo/
 * 
 * Full list of options/settings can be found at the bottom of this file and at http://plugins.learningjquery.com/cluetip/
 */

  var $cluetip, $cluetipInner, $cluetipOuter, $cluetipTitle, $cluetipArrows, $dropShadow, imgCount;
  $.fn.cluetip = function(js, options) {
    if (typeof js == 'object') {
      options = js;
      js = null;
    }
    return this.each(function(index) {
      var $this = $(this);      
      
      // support metadata plugin (v1.0 and 2.0)
      var opts = $.extend(false, {}, $.fn.cluetip.defaults, options || {}, $.metadata ? $this.metadata() : $.meta ? $this.data() : {});

      // start out with no contents (for ajax activation)
      var cluetipContents = false;
      var cluezIndex = parseInt(opts.cluezIndex, 10)-1;
      var isActive = false, closeOnDelay = 0;

      // create the cluetip divs
      if (!$('#cluetip').length) {
        $cluetipInner = $('<div id="cluetip-inner"></div>');
        $cluetipTitle = $('<h3 id="cluetip-title"></h3>');        
        $cluetipOuter = $('<div id="cluetip-outer"></div>').append($cluetipInner).prepend($cluetipTitle);
        $cluetip = $('<div id="cluetip"></div>').css({zIndex: opts.cluezIndex})
        .append($cluetipOuter).append('<div id="cluetip-extra"></div>')[insertionType](insertionElement).hide();
        $('<div id="cluetip-waitimage"></div>').css({position: 'absolute', zIndex: cluezIndex-1})
        .insertBefore('#cluetip').hide();
        $cluetip.css({position: 'absolute', zIndex: cluezIndex});
        $cluetipOuter.css({position: 'relative', zIndex: cluezIndex+1});
        $cluetipArrows = $('<div id="cluetip-arrows" class="cluetip-arrows"></div>').css({zIndex: cluezIndex+1}).appendTo('#cluetip');
      }
      var dropShadowSteps = (opts.dropShadow) ? +opts.dropShadowSteps : 0;
      if (!$dropShadow) {
        $dropShadow = $([]);
        for (var i=0; i < dropShadowSteps; i++) {
          $dropShadow = $dropShadow.add($('<div></div>').css({zIndex: cluezIndex-i-1, opacity:.1, top: 1+i, left: 1+i}));
        };
        $dropShadow.css({position: 'absolute', backgroundColor: '#000'})
        .prependTo($cluetip);
      }
      var tipAttribute = $this.attr(opts.attribute), ctClass = opts.cluetipClass;
      if (!tipAttribute && !opts.splitTitle && !js) return true;
      // if hideLocal is set to true, on DOM ready hide the local content that will be displayed in the clueTip      
      if (opts.local && opts.hideLocal) { $(tipAttribute + ':first').hide(); }
      var tOffset = parseInt(opts.topOffset, 10), lOffset = parseInt(opts.leftOffset, 10);
      // vertical measurement variables
      var tipHeight, wHeight;
      var defHeight = isNaN(parseInt(opts.height, 10)) ? 'auto' : (/\D/g).test(opts.height) ? opts.height : opts.height + 'px';
      var sTop, linkTop, posY, tipY, mouseY, baseline;
      // horizontal measurement variables
      var tipInnerWidth = isNaN(parseInt(opts.width, 10)) ? 275 : parseInt(opts.width, 10);
      var tipWidth = tipInnerWidth + (parseInt($cluetip.css('paddingLeft'))||0) + (parseInt($cluetip.css('paddingRight'))||0) + dropShadowSteps;
      var linkWidth = this.offsetWidth;
      var linkLeft, posX, tipX, mouseX, winWidth;
            
      // parse the title
      var tipParts;
      var tipTitle = (opts.attribute != 'title') ? $this.attr(opts.titleAttribute) : '';
      if (opts.splitTitle) {
        if(tipTitle == undefined) {tipTitle = '';}
        tipParts = tipTitle.split(opts.splitTitle);
        tipTitle = tipParts.shift();
      }
      var localContent;

/***************************************      
* ACTIVATION
****************************************/
    
//activate clueTip
    var activate = function(event) {
      if (!opts.onActivate($this)) {
        return false;
      }
      isActive = true;
      $cluetip.removeClass().css({width: tipInnerWidth});
      if (tipAttribute == $this.attr('href')) {
        $this.css('cursor', opts.cursor);
      }
      $this.attr('title','');
      if (opts.hoverClass) {
        $this.addClass(opts.hoverClass);
      }
      linkTop = posY = $this.offset().top;
      linkLeft = $this.offset().left;
      mouseX = event.pageX;
      mouseY = event.pageY;
      if ($this[0].tagName.toLowerCase() != 'area') {
        sTop = $(document).scrollTop();
        winWidth = $(window).width();
      }
// position clueTip horizontally
      if (opts.positionBy == 'fixed') {
        posX = linkWidth + linkLeft + lOffset;
        $cluetip.css({left: posX});
      } else {
        posX = (linkWidth > linkLeft && linkLeft > tipWidth)
          || linkLeft + linkWidth + tipWidth + lOffset > winWidth 
          ? linkLeft - tipWidth - lOffset 
          : linkWidth + linkLeft + lOffset;
        if ($this[0].tagName.toLowerCase() == 'area' || opts.positionBy == 'mouse' || linkWidth + tipWidth > winWidth) { // position by mouse
          if (mouseX + 20 + tipWidth > winWidth) {  
            $cluetip.addClass(' cluetip-' + ctClass);
            posX = (mouseX - tipWidth - lOffset) >= 0 ? mouseX - tipWidth - lOffset - parseInt($cluetip.css('marginLeft'),10) + parseInt($cluetipInner.css('marginRight'),10) :  mouseX - (tipWidth/2);
          } else {
            posX = mouseX + lOffset;
          }
        }
        var pY = posX < 0 ? event.pageY + tOffset : event.pageY;
        $cluetip.css({left: (posX > 0 && opts.positionBy != 'bottomTop') ? posX : (mouseX + (tipWidth/2) > winWidth) ? winWidth/2 - tipWidth/2 : Math.max(mouseX - (tipWidth/2),0)});
      }
        wHeight = $(window).height();

/***************************************
* load a string from cluetip method's first argument
***************************************/
      if (js) {
        $cluetipInner.html(js);
        cluetipShow(pY);
      }
/***************************************
* load the title attribute only (or user-selected attribute). 
* clueTip title is the string before the first delimiter
* subsequent delimiters place clueTip body text on separate lines
***************************************/

      else if (tipParts) {
        var tpl = tipParts.length;
        for (var i=0; i < tpl; i++){
          if (i == 0) {
            $cluetipInner.html(tipParts[i]);
          } else { 
            $cluetipInner.append('<div class="split-body">' + tipParts[i] + '</div>');
          }            
        };
        cluetipShow(pY);
      }
/***************************************
* load external file via ajax          
***************************************/

      else if (!opts.local && tipAttribute.indexOf('#') != 0) {
        if (cluetipContents && opts.ajaxCache) {
          $cluetipInner.html(cluetipContents);
          cluetipShow(pY);
        }
        else {
          var ajaxSettings = opts.ajaxSettings;
          ajaxSettings.url = tipAttribute;
          ajaxSettings.beforeSend = function() {
            $cluetipOuter.children().empty();
            if (opts.waitImage) {
              $('#cluetip-waitimage')
              .css({top: mouseY+20, left: mouseX+20})
              .show();
            }
          };
         ajaxSettings.error = function() {
            if (isActive) {
              $cluetipInner.html('<i>sorry, the contents could not be loaded</i>');
            }
          };
          ajaxSettings.success = function(data) {
            cluetipContents = opts.ajaxProcess(data);
            if (isActive) {
              $cluetipInner.html(cluetipContents);
            }
          };
          ajaxSettings.complete = function() {
          	imgCount = $('#cluetip-inner img').length;
        		if (imgCount && !$.browser.opera) {
        		  $('#cluetip-inner img').load(function() {
          			imgCount--;
          			if (imgCount<1) {
          				$('#cluetip-waitimage').hide();
          			  if (isActive) cluetipShow(pY);
          			}
        		  }); 
        		} else {
      				$('#cluetip-waitimage').hide();
        		  if (isActive) cluetipShow(pY);    
        		} 
          };
          $.ajax(ajaxSettings);
        }

/***************************************
* load an element from the same page
***************************************/
      } else if (opts.local){
        var $localContent = $(tipAttribute + ':first');
        var localCluetip = $.fn.wrapInner ? $localContent.wrapInner('<div></div>').children().clone(true) : $localContent.html();
        $.fn.wrapInner ? $cluetipInner.empty().append(localCluetip) : $cluetipInner.html(localCluetip);
        cluetipShow(pY);
      }
    };

// get dimensions and options for cluetip and prepare it to be shown
    var cluetipShow = function(bpY) {
      $cluetip.addClass('cluetip-' + ctClass);
      
      if (opts.truncate) { 
        var $truncloaded = $cluetipInner.text().slice(0,opts.truncate) + '...';
        $cluetipInner.html($truncloaded);
      }
      function doNothing() {}; //empty function
      tipTitle ? $cluetipTitle.show().html(tipTitle) : (opts.showTitle) ? $cluetipTitle.show().html(' ') : $cluetipTitle.hide();
      if (opts.sticky) {
        var $closeLink = $('<div id="cluetip-close"><a href="#">' + opts.closeText + '</a></div>');
        (opts.closePosition == 'bottom') ? $closeLink.appendTo($cluetipOuter) : (opts.closePosition == 'title') ? $closeLink.prependTo($cluetipTitle) : $closeLink.prependTo($cluetipOuter);
        $closeLink.click(function() {
          cluetipClose();
          return false;
        });
        if (opts.mouseOutClose) {
          if ($.fn.hoverIntent && opts.hoverIntent) { 
            $cluetip.hoverIntent({
              over: doNothing, 
              timeout: opts.hoverIntent.timeout,  
              out: function() { $closeLink.trigger('click'); }
            });
          } else {
            $cluetip.hover(doNothing, 
            function() {$closeLink.trigger('click'); });
          }
        } else {
          $cluetip.unbind('mouseout');
        }
      }
// now that content is loaded, finish the positioning 
      var direction = '';
      $cluetipOuter.css({overflow: defHeight == 'auto' ? 'visible' : 'auto', height: defHeight});
      tipHeight = defHeight == 'auto' ? Math.max($cluetip.outerHeight(),$cluetip.height()) : parseInt(defHeight,10);   
      tipY = posY;
      baseline = sTop + wHeight;
      if (opts.positionBy == 'fixed') {
        tipY = posY - opts.dropShadowSteps + tOffset;
      } else if ( (posX < mouseX && Math.max(posX, 0) + tipWidth > mouseX) || opts.positionBy == 'bottomTop') {
        if (posY + tipHeight + tOffset > baseline && mouseY - sTop > tipHeight + tOffset) { 
          tipY = mouseY - tipHeight - tOffset;
          direction = 'top';
        } else { 
          tipY = mouseY + tOffset;
          direction = 'bottom';
        }
      } else if ( posY + tipHeight + tOffset > baseline ) {
        tipY = (tipHeight >= wHeight) ? sTop : baseline - tipHeight - tOffset;
      } else if ($this.css('display') == 'block' || $this[0].tagName.toLowerCase() == 'area' || opts.positionBy == "mouse") {
        tipY = bpY - tOffset;
      } else {
        tipY = posY - opts.dropShadowSteps;
      }
      if (direction == '') {
        posX < linkLeft ? direction = 'left' : direction = 'right';
      }
      $cluetip.css({top: tipY + 'px'}).removeClass().addClass('clue-' + direction + '-' + ctClass).addClass(' cluetip-' + ctClass);
      if (opts.arrows) { // set up arrow positioning to align with element
        var bgY = (posY - tipY - opts.dropShadowSteps);
        $cluetipArrows.css({top: (/(left|right)/.test(direction) && posX >=0 && bgY > 0) ? bgY + 'px' : /(left|right)/.test(direction) ? 0 : ''}).show();
      } else {
        $cluetipArrows.hide();
      }

// (first hide, then) ***SHOW THE CLUETIP***
      $dropShadow.hide();
      $cluetip.hide()[opts.fx.open](opts.fx.open != 'show' && opts.fx.openSpeed);
      if (opts.dropShadow) $dropShadow.css({height: tipHeight, width: tipInnerWidth}).show();
      if ($.fn.bgiframe) { $cluetip.bgiframe(); }
      // trigger the optional onShow function
      if (opts.delayedClose > 0) {
        closeOnDelay = setTimeout(cluetipClose, opts.delayedClose);
      }
      opts.onShow($cluetip, $cluetipInner);
      
    };

/***************************************
   =INACTIVATION
-------------------------------------- */
    var inactivate = function() {
      isActive = false;
      $('#cluetip-waitimage').hide();
      if (!opts.sticky || (/click|toggle/).test(opts.activation) ) {
        cluetipClose();
clearTimeout(closeOnDelay);        
      };
      if (opts.hoverClass) {
        $this.removeClass(opts.hoverClass);
      }
      $('.cluetip-clicked').removeClass('cluetip-clicked');
    };
// close cluetip and reset some things
    var cluetipClose = function() {
      $cluetipOuter 
      .parent().hide().removeClass().end()
      .children().empty();
      if (tipTitle) {
        $this.attr(opts.titleAttribute, tipTitle);
      }
      $this.css('cursor','');
      if (opts.arrows) $cluetipArrows.css({top: ''});
    };

/***************************************
   =BIND EVENTS
-------------------------------------- */
  // activate by click
      if ( (/click|toggle/).test(opts.activation) ) {
        $this.click(function(event) {
          if ($cluetip.is(':hidden') || !$this.is('.cluetip-clicked')) {
            activate(event);
            $('.cluetip-clicked').removeClass('cluetip-clicked');
            $this.addClass('cluetip-clicked');

          } else {
            inactivate(event);

          }
          this.blur();
          return false;
        });
  // activate by focus; inactivate by blur    
      } else if (opts.activation == 'focus') {
        $this.focus(function(event) {
          activate(event);
        });
        $this.blur(function(event) {
          inactivate(event);
        });
  // activate by hover
    // clicking is returned false if cluetip url is same as href url
      } else {
        $this.click(function() {
          if ($this.attr('href') && $this.attr('href') == tipAttribute && !opts.clickThrough) {
            return false;
          }
        });
        //set up mouse tracking
        var mouseTracks = function(evt) {
          if (opts.tracking == true) {
            var trackX = posX - evt.pageX;
            var trackY = tipY ? tipY - evt.pageY : posY - evt.pageY;
            $this.mousemove(function(evt) {
              $cluetip.css({left: evt.pageX + trackX, top: evt.pageY + trackY });
            });
          }
        };
        if ($.fn.hoverIntent && opts.hoverIntent) {
          $this.mouseover(function() {$this.attr('title',''); })
          .hoverIntent({
            sensitivity: opts.hoverIntent.sensitivity,
            interval: opts.hoverIntent.interval,  
            over: function(event) {
              activate(event);
              mouseTracks(event);
            }, 
            timeout: opts.hoverIntent.timeout,  
            out: function(event) {inactivate(event); $this.unbind('mousemove');}
          });           
        } else {
          $this.hover(function(event) {
            activate(event);
            mouseTracks(event);
          }, function(event) {
            inactivate(event);
            $this.unbind('mousemove');
          });
        }
      }
    });
  };
  
/*
 * options for clueTip
 *
 * each one can be explicitly overridden by changing its value. 
 * for example: $.fn.cluetip.defaults.width = 200; 
 * would change the default width for all clueTips to 200. 
 *
 * each one can also be overridden by passing an options map to the cluetip method.
 * for example: $('a.example').cluetip({width: 200}); 
 * would change the default width to 200 for clueTips invoked by a link with class of "example"
 *
 */
  
  $.fn.cluetip.defaults = {  // set up default options
    width:            275,      // The width of the clueTip
    height:           'auto',   // The height of the clueTip
    cluezIndex:       97,       // Sets the z-index style property of the clueTip
    positionBy:       'auto',   // Sets the type of positioning: 'auto', 'mouse','bottomTop', 'fixed'
    topOffset:        15,       // Number of px to offset clueTip from top of invoking element
    leftOffset:       15,       // Number of px to offset clueTip from left of invoking element
    local:            false,    // Whether to use content from the same page for the clueTip's body
    hideLocal:        true,     // If local option is set to true, this determines whether local content
                                // to be shown in clueTip should be hidden at its original location
    attribute:        'rel',    // the attribute to be used for fetching the clueTip's body content
    titleAttribute:   'title',  // the attribute to be used for fetching the clueTip's title
    splitTitle:       '',       // A character used to split the title attribute into the clueTip title and divs
                                // within the clueTip body. more info below [6]
    showTitle:        true,     // show title bar of the clueTip, even if title attribute not set
    cluetipClass:     'default',// class added to outermost clueTip div in the form of 'cluetip-' + clueTipClass.
    hoverClass:       '',       // class applied to the invoking element onmouseover and removed onmouseout
    waitImage:        true,     // whether to show a "loading" img, which is set in jquery.cluetip.css
    cursor:           'help',
    arrows:           false,    // if true, displays arrow on appropriate side of clueTip
    dropShadow:       true,     // set to false if you don't want the drop-shadow effect on the clueTip
    dropShadowSteps:  6,        // adjusts the size of the drop shadow
    sticky:           false,    // keep visible until manually closed
    mouseOutClose:    false,    // close when clueTip is moused out
    activation:       'hover',  // set to 'click' to force user to click to show clueTip
                                // set to 'focus' to show on focus of a form element and hide on blur
    clickThrough:     false,    // if true, and activation is not 'click', then clicking on link will take user to the link's href,
                                // even if href and tipAttribute are equal
    tracking:         false,    // if true, clueTip will track mouse movement (experimental)
    delayedClose:     0,        // close clueTip on a timed delay (experimental)
    closePosition:    'top',    // location of close text for sticky cluetips; can be 'top' or 'bottom' or 'title'
    closeText:        'Close',  // text (or HTML) to to be clicked to close sticky clueTips
    truncate:         0,        // number of characters to truncate clueTip's contents. if 0, no truncation occurs

    // effect and speed for opening clueTips
    fx: {             
                      open:       'show', // can be 'show' or 'slideDown' or 'fadeIn'
                      openSpeed:  ''
    },     

    // settings for when hoverIntent plugin is used             
    hoverIntent: {    
                      sensitivity:  3,
              			  interval:     50,
              			  timeout:      0
    },

    // function to run just before clueTip is shown.           
    onActivate:       function(e) {return true;},

    // function to run just after clueTip is shown.
    onShow:           function(ct, c){},
    
    // whether to cache results of ajax request to avoid unnecessary hits to server    
    ajaxCache:        true,  

    // process data retrieved via xhr before it's displayed
    ajaxProcess:      function(data) {
                        data = data.replace(/<s(cript|tyle)(.|\s)*?\/s(cript|tyle)>/g, '').replace(/<(link|title)(.|\s)*?\/(link|title)>/g,'');
                        return data;
    },                

    // can pass in standard $.ajax() parameters, not including error, complete, success, and url
    ajaxSettings: {   
                      dataType: 'html'
    },
    debug: false
  };


/*
 * Global defaults for clueTips. Apply to all calls to the clueTip plugin.
 *
 * @example $.cluetip.setup({
 *   insertionType: 'prependTo',
 *   insertionElement: '#container'
 * });
 * 
 * @property
 * @name $.cluetip.setup
 * @type Map
 * @cat Plugins/tooltip
 * @option String insertionType: Default is 'appendTo'. Determines the method to be used for inserting the clueTip into the DOM. Permitted values are 'appendTo', 'prependTo', 'insertBefore', and 'insertAfter'
 * @option String insertionElement: Default is 'body'. Determines which element in the DOM the plugin will reference when inserting the clueTip.
 *
 */
   
  var insertionType = 'appendTo', insertionElement = 'body';
  $.cluetip = {};
  $.cluetip.setup = function(options) {
    if (options && options.insertionType && (options.insertionType).match(/appendTo|prependTo|insertBefore|insertAfter/)) {
      insertionType = options.insertionType;
    }
    if (options && options.insertionElement) {
      insertionElement = options.insertionElement;
    }
  };
  
})(jQuery);

/**
 * jQuery.Preload - Multifunctional preloader
 * Copyright (c) 2008 Ariel Flesler - aflesler(at)gmail(dot)com
 * Dual licensed under MIT and GPL.
 * Date: 3/12/2008
 * @author Ariel Flesler
 * @version 1.0.7
 */
; (function($) { var n = $.preload = function(c, d) { if (c.split) c = $(c); d = $.extend({}, n.defaults, d); var f = $.map(c, function(a) { if (!a) return; if (a.split) return d.base + a + d.ext; var b = a.src || a.href; if (typeof d.placeholder == 'string' && a.src) a.src = d.placeholder; if (b && d.find) b = b.replace(d.find, d.replace); return b || null }), g = { loaded: 0, failed: 0, next: 0, done: 0, total: f.length }; if (!g.total) return m(); var h = '<img/>', j = d.threshold; while (--j > 0) h += '<img/>'; h = $(h).load(k).error(k).bind('abort', k).each(l); function k(e) { g.found = e.type == 'load'; g.image = this.src; var a = g.original = c[this.index]; g[g.found ? 'loaded' : 'failed']++; g.done++; if (d.placeholder && a.src) a.src = g.found ? g.image : d.notFound || a.src; if (d.onComplete) d.onComplete(g); if (g.done < g.total) l(0, this); else { if (h.unbind) h.unbind('load').unbind('error').unbind('abort'); h = null; m() } }; function l(i, a, b) { if ($.browser.msie && g.next && g.next % n.gap == 0 && !b) { setTimeout(function() { l(i, a, 1) }, 0); return !1 } if (g.next == g.total) return !1; a.index = g.next; a.src = f[g.next++]; if (d.onRequest) { g.image = a.src; g.original = c[g.next - 1]; d.onRequest(g) } }; function m() { if (d.onFinish) d.onFinish(g) } }; n.gap = 14; n.defaults = { threshold: 2, base: '', ext: '', replace: '' }; $.fn.preload = function(a) { n(this, a); return this } })(jQuery);