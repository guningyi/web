
//IE fix to combat the fact there is no support for the :hover psuedo class
sfHover = function() {
	var sfEls = document.getElementById("navMain").getElementsByTagName("LI");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseover=function() {
			this.className+=" sfhover";
		}
		sfEls[i].onmouseout=function() {
			this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
		}
	}
}
if (window.attachEvent) window.attachEvent("onload", sfHover);

function openWindow( tURL, tWidth, tHeight )
{
	var tName = Math.ceil(Math.random()*100);
	window.open(tURL, tName, "width=" + tWidth + ",height=" + tHeight + ",scrollbars=yes" );
}

//stylesheet switcher - used for font size increase
function setActiveStyleSheet(title) {
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }
}

function getActiveStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
  }
  return null;
}

function getPreferredStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1
       && a.getAttribute("rel").indexOf("alt") == -1
       && a.getAttribute("title")
       ) return a.getAttribute("title");
  }
  return null;
}

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

window.onload = function(e) {
  var cookie = readCookie("style");
  var title = cookie ? cookie : getPreferredStyleSheet();
  setActiveStyleSheet(title);
}

window.onunload = function(e) {
  var title = getActiveStyleSheet();
  createCookie("style", title, 365);
}

var cookie = readCookie("style");
var title = cookie ? cookie : getPreferredStyleSheet();
setActiveStyleSheet(title);

//social media network + bookmarking tools
(function($){
	var window = this,
		windowName = Math.random(1000).toString().slice(3),
		doc = document,
		loc = location,
		enc = encodeURIComponent,
		now = new Date().getTime(),
		social;

	// Default settings
	var socialOps = {
		// URL to add: can be empty (uses current URL), a string (hardcoded URL) or a callback function that returns a URL
		url: '',
		// Title of page: can be empty (uses current page title), a string (hardcoded title) or a callback function that returns a title
		title: '',
		// Description of page: can be a string (hardcoded description) or a callback function that returns a description
		description: '',
		// Default message for Twitter, can be a string or a callback function that returns a message
		twitterMessage: ''
	};

	function isUndefined(variable) {
		return typeof variable === 'undefined';
	}

	function isFunction(variable) {
		return typeof variable === 'function';
	}

	function getUrl(extra) {
		var u = '';
		if (isFunction(socialOps.url)) {
			u = socialOps.url.apply(this, extra);
		} else if ('' !== socialOps.url) {
			u = socialOps.url;
		} else {
			u = loc.href;
		}
		return enc(u);
	}

	function getTitle(extra) {
		var t = '';
		if (isFunction(socialOps.title)) {
			t = socialOps.title.apply(this, extra);
		} else if ('' !== socialOps.title) {
			t = socialOps.title;
		} else {
			t = doc.title;
		}
		return enc(t);
	}

	function getDescription(extra) {
		var desc = '';
		if (isFunction(socialOps.description)) {
			desc = socialOps.description.apply(this, extra);
		} else if ('' !== socialOps.description) {
			desc = socialOps.description;
		}
		return enc(desc);
	}

	function getMessage(extra) {
		var msg = '';
		if (isFunction(socialOps.twitterMessage)) {
			msg = socialOps.twitterMessage.apply(this, extra);
		} else if ('' !== socialOps.twitterMessage) {
			msg = socialOps.twitterMessage;
		}
		return enc(msg);
	}

	function openWindow(url, name, width, height) {
		name += '_' + windowName;
		var w = window.open(url, name, 'toolbar=0,status=0,resizable=1,scrollbars=1,location=0,width=' + width + ',height=' + height);
		if (!w) {
			alert('Sorry, could not open a popup to add this page to your profile.');
			return;
		}
		try {
			var wx = screen.width / 2 - width / 2,
				wy = screen.height / 2 - height / 2;
			w.moveTo(wx, wy);
		} catch (e) {}
	}

	window.social = social = {
		setOptions: function(options) {
			for (var i in options) {
				if (options.hasOwnProperty(i)) {
					socialOps[i] = options[i];
				}
			}
		},
		facebook: function() {
			openWindow(
				'http://www.new.facebook.com/sharer.php?src=bm&v=4&i='+now+'&u='+getUrl()+'&t='+getTitle(),
				'facebook', 626, 436
			);
		},
		twitter: function() {
			openWindow(
				'http://twitter.com/home?status='+getUrl(),
				'twitter', 800, 600
			);
		},
		delicious: function() {
			openWindow(
				'http://delicious.com/save?url='+getUrl()+'&title='+getTitle(),
				'delicious', 842, 630
			);
		},
		digg: function() {
			openWindow(
				'http://digg.com/submit?phase=2&url='+getUrl()+'&title='+getTitle(),
				'digg', 945, 665
			);
		},
		stumbleupon: function() {
			openWindow(
				'http://www.stumbleupon.com/submit?url='+getUrl()+'&title='+getTitle(),
				'digg', 800, 600
			);
		}
	};

	// Setup event handlers
	$(function () {
		$.each('facebook twitter delicious digg'.split(' '), function (i, network) {
			$('.social-tools li.' + network + ' a').click(function (e) {
				e.preventDefault();
				social[network]();
			})
		});
	});
})(jQuery);


// "In season" form functions - replace month selector with tabs
jQuery(function ($) {
	$('form.in-season-form').each(function () {
		var selector = $(this).find('.inSeason-month-selector'),
			fieldset = selector.parents('fieldset').eq(0),
			list = $('<ul/>').addClass('inSeason-month-tabs'),
			activeTab;
		// Create a list item for each select option
		selector.find('option').each(function () {
			var val = $(this).val(),
				li = $('<li/>').appendTo(list),
				a = $('<a href="#' + val + '">' + '<span>' + val + '</span>' + '</a>').appendTo(li);
			if ($(this).attr('selected')) {
				activeTab = li;
				li.addClass('active');
			}
			// Make sure links switch tabs
			a.click(function (e) {
				e.preventDefault();
				activeTab.removeClass('active');
				activeTab = $(this).parent().addClass('active');
				selector.val(this.hash.substr(1));
			});
		});
		// Hide select and show tab list
		selector.hide();
		list.appendTo(fieldset);
	});
});