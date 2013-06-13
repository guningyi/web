
    <!--
    //GENERAL METHODS
    
    var preloadFlag = false;
    
    var g_bIsNav4 = false;
    if (window.navigator.appName.toLowerCase().indexOf("netscape") > -1)
    {
    	g_bIsNav4 = true;
    }
    
    function newImage(arg) {
    	if (document.images) {
    		rslt = new Image();
    		rslt.src = arg;
    		return rslt;
    	}
    }
    
    function changeNavImages() {
    	if (document.images) {
    		for (var i=0; i<changeNavImages.arguments.length; i+=2) {
    			document[changeNavImages.arguments[i]].src = changeNavImages.arguments[i+1];
    		}
    	}
    }
    
    function changeImages(imgName,imgSource) {
    	if (document.images) {
    		document.images[imgName].src = imgSource;
    	}
    }	
    
    function preloadImages(root) {
    	if (document.images && (preloadFlag == false)) {
    		preloadFlag = true;
    	}
    }
    
    function openalert(windowname) {
    	msgWindow=window.open (windowname,"alertWindow","toolbar=no,menubar=no,resizable=no,scrollbars=no,width=400,height=300");
    }
    
    function openhelp(windowname) {
    	msgWindow=window.open (windowname,"helpWindow","toolbar=no,menubar=no,resizable=no,scrollbars=yes,width=450,height=550");
    }
    
    function opencontent(windowname) {
    	msgWindow=window.open (windowname,"contentWindow","toolbar=yes,menubar=no,resizable=yes,scrollbars=yes,width=600,height=600");
    }
    
    function CalcPrice(url) {
    	window.open(url,"calcprice","resizable=yes,scrollbars=yes,directories=no,toolbar=no,menubar=no,height=785,width=800,top=10,left=10");
    }
    
    function openDynamicFlashGallery(url) {
    	var aw = screen.AvailWidth;
    	var ah = screen.AvailHeight;
    	var winWidth = 650;
    	var winHeight = 600;
    	thePopped = window.open(url,"Popped","resizable=no,scrollbars=no,width=650,height=600");
    	offsetx = (screen.availWidth - winWidth)/2;
    	offsety = (screen.availHeight - winHeight)/2;
    	thePopped.moveTo(offsetx, offsety);
    	thePopped.focus();
    }
    		
    function emailPage(root) {
    	var t = document.title;
    	t = escape(t);
    	var v = document.location.href;
    	v = escape(v);
    	window.open(root + '/emailpage.aspx?url='+v+'&title='+t,'EmailPageWindow','resizable=yes,toolbar=no,menubar=no,directories=no,height=560,width=450,top=0,left=0');
    }
    
    function toggle(targetId){
    	if (document.getElementById) {
    		target = document.getElementById( targetId );
    		if (target) {
    			if (target.style.display == "none"){
      				target.style.display = "block";
    			} else {
      				target.style.display = "none";
    			}
    		}
    	}
    }
    
    function toggleInline(targetId){
    	if (document.getElementById) {
    		target = document.getElementById( targetId );
    		if (target) {
    			if (target.style.display == "none"){
      				target.style.display = "inline";
    			} else {
      				target.style.display = "none";
    			}
    		}
    	}
    }
    
    // Specific to the products/detail.aspx page. Toggles zoom display when in IE5:mac. Hideous, I know.
    function zoomToggle(targetId){
    	if (document.getElementById){
      		target = document.getElementById( targetId );
      		if (target) {
    			if (isIE5mac()) {
    				// IE5:mac toggles the flash player visible to prevent "peek-through"
      				if (target.style.display == "none"){
      					target.style.display = "block";
      				} else {
      					target.style.display = "none";
      				}
      			} else {
      				// Every other browser just makes the flash player visible.
      				target.style.display = "block";
      			}
      		}
      	}
    }
    
    // A browser sniff for IE5:mac, the Netscape 4 of the new millennium :-)
    // (The sniff stolen from Veer.Browser.js. I just didn't want to make main.js dependent upon that file.)
    function isIE5mac() {
    	return (navigator.platform.substring(0, 3) == "Mac" && navigator.appName == "Microsoft Internet Explorer");
    }
    
    function toggleVisibility(targetId){
    	if (document.getElementById){
    		target = document.getElementById( targetId );
    		if (target) {
    			if (target.style.visibility == "hidden"){
      				target.style.visibility = "visible";
    			} else {
      				target.style.visibility = "hidden";
    			}
    		}
    	}
    }
            
    //toggleCreateLightbox: toggles the visibility of the create lightbox popup and focuses on the lightbox name field
    // as well as hiding the underlaying gallery selector for IE6 to prevent peek-through
    function toggleCreateLightbox(containerId, textFieldId)
    {
        var container = FindElement(containerId);
        var textField = FindElement(textFieldId);
        var gallerySelector = FindElement('gallerySelectorContainer');
    	
    	if (container.style.visibility == 'hidden')
    	{
    		container.style.visibility = 'visible';
    		textField.focus();
    		//toggles visibility of selectors to fix IE6 peek-through
    		if (gallerySelector && navigator.appName == "Microsoft Internet Explorer" && document.getElementById)
    	    {
    	        gallerySelector.style.visibility = 'hidden';
    	    }
    	}
    	else
    	{
    		container.style.visibility = 'hidden';
    		textField.blur();
    		//toggles visibility of selectors to fix IE6 peek-through
    		if (gallerySelector && navigator.appName == "Microsoft Internet Explorer" && document.getElementById)
    	    {
    	        gallerySelector.style.visibility = 'visible';
    	    }
    	}
    	
    	return false;
    }
    
    //togglePopups: manages the swapping of css popups from the save search and related search links
    // as well as the hiding of underlaying pager for IE6 to prevent peek-through
    function toggleSearchPopups(firstControlName, secondControlName, firstControlFocusFieldName)
    {
        if (!firstControlName) return;
        if (!secondControlName) return;
        
        var popupVisible = false;
        
    	var firstControl = FindElement(firstControlName);
    	var secondControl = FindElement(secondControlName);
    	var pagerSelector = FindElement('topPagerContainer');
    
        //toggle visibility of the target popup
    	if (firstControl)
    	{
            if (firstControl.style.visibility == 'hidden')
            {
    		    firstControl.style.visibility = 'visible';
    		    popupVisible = true;
    	    }
    	    else
    	    {
    		    firstControl.style.visibility = 'hidden';
    	    }
    	}
    
        // Set focus to the requested field.
        if (firstControlFocusFieldName) 
        {
            var focusField = FindElement(firstControlFocusFieldName);
            if (focusField) 
            {
                if (popupVisible)
                {
                    focusField.focus();
                }
                else
                {
                    focusField.blur();
                }
            }
        }
        
    	//hide the other popup by default when a hide/show is performed on the target popup
    	if (secondControl)
    	{
    	    secondControl.style.visibility = 'hidden';
    	}
    	
    	return false;
    }
            
    function FindElement(controlId)
    {
    	if (document.getElementById) {
    		var el1 = document.getElementById(controlId);
    		if (el1 != null)
    		{
    			return el1;
    		}
    	}
    		
    	if (document.all)
    	{
    		var el2 = document.all[controlId];
    		if (el2 != null)
    		{
    			return el2;
    		}
    	}
    	
    	var frm = document.forms[0];
    	var el3 = frm.controlId;
    	if (el3 != null) 
    	{
    		return el3;
    	}
    	
    	for (var i = 0; i < frm.elements.length; i++)   {
    		if (frm.elements[i].name.indexOf(el3) != -1) {
    			return frm.elements[i];
    		}
    	}
    	
    	return null;
    }
    
    var g_BlockSubmit = false;
    function checkBlockedSubmit()
    {
    	if (g_BlockSubmit)
    	{
    		g_BlockSubmit = false;
    		return false;
    	}
    	return true;
    }
    
    function trapEnterKey(evt, buttonName)
    {
    	if (!enterKeyPressed(evt))
    	{
    		return true; 
    	}
    	else
    	{
    	    var button = FindElement(buttonName);
    	    if (button) {
    	        if (button.click) {
    	            button.click();
    	        } else if (button.onclick) {
    	            button.onclick();
    	        }
    	    }
    		
    		evt.cancelBubble = true;
    		return false;
    	}
    }
    
    function enterKeyPressed(evt)
    { 
    	if (g_bIsNav4)
    	{
    		if (evt.which != 13 && evt.which != 3)
    		{
    			return false;
    		}
    		else
    		{
    			return true;
    		}
    	}
    	else
    	{
    		if (event.keyCode != 13 && event.keyCode != 3)
    		{
    			event.returnValue = event.keyCode;
    			return false;
    		}
    		
    		event.returnValue = false;
    		return true;
    	} 
    }
    
    function keywordJump(keywordControl, resultsPage)
    {
    	var keyword	= keywordControl.options[keywordControl.selectedIndex].value;
    	
    	if (keyword.length > 0)
    	{
    		var resultsUrl = resultsPage + keyword;
    		window.location = resultsUrl;
    	}
    }
    
    // Used to sync the value of a top selector with a bottom selector when one or the other is changed
    function syncSelector(thisSelector, otherSelector)
    {
        var target = FindElement(otherSelector);
        if (target)
        {
            target.selectedIndex = thisSelector.selectedIndex;
        }
    }
    
    //downloadPDF: Disables and renames the PDF download link, and calls the PDF download
    var PDF_DOWNLOADED = false;
    function downloadPdf(controlId, newControlText, pdfUrl)
    {
        var control = FindElement(controlId);
        control.blur();
    
        if (!PDF_DOWNLOADED)
        {
            PDF_DOWNLOADED = true;
            control.style.color = "#777";
            control.innerHTML = newControlText;
            window.location = pdfUrl;
        }
        
        return false;
    }
    
    //autoDownloadPdf: called by cddetail and lbmail onload after coming back from pdf download login
    function autoDownloadPdf(controlId)
    {
        var control = FindElement(controlId);
        control.onclick();
    }
    
    //################################################################################
    //################################################################################
    //
    // PAGERESULTS.ASCX: "More Results" Thumb-Thingy
    //
    //################################################################################
    //################################################################################
    
    
    // Resize event handler to determine more results thumb thingy visibility.
    // Uses properties on this function that were set in a call to moreResultsThumbStart(),
    // which means there can only ever be one instance of a PageResults on a page.
    function moreResultsThumbVisibilityHandler(indicator) {
    	var columnCount = 1;
    
    	window.clearTimeout(moreResultsThumbVisibilityHandler.timeoutId);
    	
    	// count the number of columns of thumbs - skipping the first thumb
    	for (var index = 1; index < moreResultsThumbVisibilityHandler.resultThumbs.length; index++) {
    		if (moreResultsThumbVisibilityHandler.resultThumbs[index].offsetLeft == moreResultsThumbVisibilityHandler.thumbLeft) {
    			// Stop when we've found a thumb that wraps to a new row
    			break;	
    		} else {
    			columnCount++;
    		}
    	}
    	// turn on the more results thumb when the last row is not entirely full
    	moreResultsThumbVisibilityHandler.moreResultsThumb.style.display = (moreResultsThumbVisibilityHandler.resultsPerPage % columnCount == 0) ? "none" : "block";
    	
    	if (typeof indicator != 'string') {
    		// Some browsers delay firing the onresize event, so we schedule a callback.
    		// The callback event however does not continue to schedule further callbacks.
    		// We perform this magic by checking the argument: the callback always sends
    		// a string for the argument, whereas the event handler either passes nothing
    		// in the case of IE6, or an event in the case of Every Other Modern Browser.
    		moreResultsThumbVisibilityHandler.timeoutId = window.setTimeout("moreResultsThumbVisibilityHandler('nocallback')", 25);
    	}
    }
    
    // Starts the more results thumb placeholder thingy used on PageResults.ascx
    function moreResultsThumbStart(resultsContainerName, thumbClassName, moreResultsThumbName, resultsPerPage) {
    	// save properties needed by the event handler in the event handler function itself - eliminates use of globals
    	moreResultsThumbVisibilityHandler.resultsPerPage   = resultsPerPage;
    	moreResultsThumbVisibilityHandler.moreResultsThumb = FindElement(moreResultsThumbName);
    	// find all thumbnail divs in the results
    	moreResultsThumbVisibilityHandler.resultThumbs     = getElementsByTagNameAndClassName(FindElement(resultsContainerName), 'div', thumbClassName); 
    	
    	if (moreResultsThumbVisibilityHandler.moreResultsThumb &&
    		moreResultsThumbVisibilityHandler.resultThumbs && 
    		moreResultsThumbVisibilityHandler.resultThumbs.length > 0) {
    
    		// capture the left position of the very first thumb
    		moreResultsThumbVisibilityHandler.thumbLeft = moreResultsThumbVisibilityHandler.resultThumbs[0].offsetLeft;
    
    		// wire-up resize event handler only if we have thumbs
    		addEvent(window, 'resize', moreResultsThumbVisibilityHandler, false);
    		
    		// force an initial calculation to be performed
    		moreResultsThumbVisibilityHandler();
    	}
    }
    
    // Returns an array of all child elements of rootElement that match tagName and 
    // have className. Returns null when there are no such matching elements. Also returns
    // null when rootElement is null. 
    //
    // NOTES
    // 1) The returned array has at least 1 element. This method never returns an empty array,
    //    it will return null in that case.
    // 2) This method is identical to Veer.Browser.getElementsByTagNameAndClassName(). This
    //    one is here for simiplicities sake.
    function getElementsByTagNameAndClassName(rootElement, tagName, className) {
    	var results = new Array();
    	var resultCounter = 0;
    	
    	if (rootElement)
    	{
    		var children = rootElement.getElementsByTagName(tagName);
    		
    		if (children)
    		{
    			for (var index = 0; index < children.length; index++)
    			{
    				if (children[index].className == className)
    				{
    					results[resultCounter] = children[index];
    					resultCounter++;
    				}
    			}
    			return results;
    		}
    	}
    	
    	return null;				
    }
    
    
    // A DOM neutral method to add an event handler to an element.
    // Identical to Veer.Browser.addEvent().
    function addEvent(element, eventName, eventHandler, isCapturing) {
    	if (!element) return;
    	if (!eventName) return;
    	if (!eventHandler) return;
    
    	if (document.addEventListener)
    	{
    		// DOM Level 2 event model
    		element.addEventListener(eventName, eventHandler, isCapturing);
    	}
    	else if (document.attachEvent)
    	{
    		// IE 5+ event model - note the prefix "on" is required for eventName
    		element.attachEvent("on" + eventName, eventHandler);
    	} 
    	else
    	{
    		// DOM Level 0 event model
    		element["on" + eventName] = eventHandler;
    	}
    };
    
    
    
    //################################################################################
    //################################################################################
    //
    // LIBRARY: Veer.Cookie
    //
    //################################################################################
    //################################################################################
    
    
    
    // LIBRARY: 
    // Veer.Cookie
    //
    // DESCRIPTION:
    // Provides a public class that allows simple browser interaction with cookies.
    //
    // NOTES:
    // This code is lifted from the O'Reilly book JavaScript the Definitive Guide,
    // by David Flannagan. I don't know how legal this is, but considering there
    // are so few ways of performing this task, I'm going to assume the code snippets
    // can be used as-is. Documentation is by smaloff.
    //
    // USAGE:
    // See the documentation for the store, load and remove methods for examples.
    //
    // DEPENDENCIES:
    // None.
    
    if (typeof(Veer) == 'undefined') {
        Veer = {};
    }
    
    // CONSTRUCTOR:
    // Veer.Cookie(document, name, [options]);
    //
    // DESCRIPTION:
    // The constructor function creates a cookie object for the specified
    // document, with a specified name and optional attributes.
    //
    //
    // ARGUMENTS:
    // document: The Document object that the cookie is stored for. Required.
    // name:     A string that specifies a name for the cookie. Required.
    // hours:    An optional number that specifies the number of hours from now
    //           that the cookie should expire.
    // path:     An optional string that specifies the cookie path attribute.
    // domain:   An optional string that specifies the cookie domain attribute.
    // secure:   An optional Boolean value that, if true, requests a secure cookie.
    //
    // NOTES:
    // Since web browsers are not legally required to store more than 20 cookies for
    // a domain, this class supports property pooling. Each cookie object can store
    // more than one property/value pair. Internally the value of the cookie in the
    // document.cookie property will use an ampersand to separate each property/value 
    // pair, and will use a colon to separate the property from the value.
    
    Veer.Cookie = function(document, name, path, domain, hours, secure)
    {
        // All the predefined properties of this object begin with '$'
        // to distinguish them from other properties which are the values to
        // be stored in the cookie.
        this.$document = document;
        this.$name = name;
        if (hours)
            this.$expiration = new Date((new Date()).getTime() + hours*3600000);
        else this.$expiration = null;
        if (path) this.$path = path; else this.$path = null;
        if (domain) this.$domain = domain; else this.$domain = null;
        if (secure) this.$secure = true; else this.$secure = false;
    };
    
    // METHOD:
    // open()
    //
    // DESCRIPTION:
    // Opens the contents of a cookie object from the document.cookie property.
    //
    // USAGE:
    // var cookie = new Veer.Cookie(document, 'MyCookie');
    // if (cookie.open()) {
    //		alert(cookie.color);
    //		alert(cookie.sku);
    // }
    //
    // Opens a cookie called MyCookie, that was saved earlier using save(), 
    // and displays the color and sku property values within that cookie.
    // See the save() method. The open() method returns false if a cookie
    // by the specified name does not exist.
    Veer.Cookie.prototype.open = function()
    {
        // First, get a list of all cookies that pertain to this document.
        // We do this by reading the magic Document.cookie property.
        var allcookies = this.$document.cookie;
        if (allcookies == "") return false;
    
        // Now extract just the named cookie from that list.
        var start = allcookies.indexOf(this.$name + '=');
        if (start == -1) return false;   // Cookie not defined for this page.
        start += this.$name.length + 1;  // Skip name and equals sign.
        var end = allcookies.indexOf(';', start);
        if (end == -1) end = allcookies.length;
        var cookieval = allcookies.substring(start, end);
    
        // Now that we've extracted the value of the named cookie, we've
        // got to break that value down into individual state variable 
        // names and values. The name/value pairs are separated from each
        // other by ampersands, and the individual names and values are
        // separated from each other by colons. We use the split method
        // to parse everything.
        var a = cookieval.split('&');    // Break it into array of name/value pairs.
        for(var i=0; i < a.length; i++)  // Break each pair into an array.
            a[i] = a[i].split(':');
    
        // Now that we've parsed the cookie value, set all the names and values
        // of the state variables in this Cookie object. Note that we unescape()
        // the property value, because we called escape() when we stored it.
        for(var i = 0; i < a.length; i++) {
            this[a[i][0]] = unescape(a[i][1]);
        }
    
        // We're done, so return the success code.
        return true;
    };
    
    // METHOD:
    // getSimpleCookieValue()
    //
    // DESCRIPTION:
    // Returns the value of a cookie that does not contain key=value pairs.
    //
    // USAGE:
    // var cookie = new Veer.Cookie(document, 'VT');
    // var value = cookie.getSimpleCookieValue();
    //
    // Returns the simple cookie value, or the empty string if the cookie
    // is not defined.
    Veer.Cookie.prototype.getSimpleCookieValue = function()
    {
        // First, get a list of all cookies that pertain to this document.
        // We do this by reading the magic Document.cookie property.
        var allcookies = this.$document.cookie;
        if (allcookies == "") return false;
    
        // Now extract just the named cookie from that list.
        var start = allcookies.indexOf(this.$name + '=');
        if (start == -1) return "";   // Cookie not defined for this page.
        
        start += this.$name.length + 1;  // Skip name and equals sign.
        var end = allcookies.indexOf(';', start);
        if (end == -1) end = allcookies.length;
        var cookieval = allcookies.substring(start, end);
        
        return cookieval;
    };
    
    // METHOD:
    // update()
    //
    // DESCRIPTION:
    // Static. Updates/sets a cookie with the given param/value.
    //
    // USAGE:
    // Veer.Cookie.update(document, "<%=Veer.CustomerWeb.ProcessFlow.CookieController.VeerSessionPrefCookie%>", "<%=Veer.CustomerWeb.ProcessFlow.CookieController.PathCookieParam%>", "<%=Veer.SystemFramework.Web.CommonWebConfig.Domain%>", "<%=Veer.CustomerWeb.ProcessFlow.CookieController.ExpandedClarification%>", expandedQuicksearch);	
    // }
    //
    // Creates or updates a cookie
    Veer.Cookie.update = function(document, cookieName, cookiePath, cookieDomain, cookieParam, cookieValue)
    {
    	var cookie = new Veer.Cookie(document, cookieName, cookiePath, cookieDomain);
    	cookie.open();
    	cookie[cookieParam] = cookieValue;
    	cookie.save();
    };
    
    // METHOD:
    // save()
    //
    // DESCRIPTION:
    // Saves the contents of the cookie object into the document.cookie property.
    // Since web browsers are not legally required to store more than 20 cookies for
    // a domain, this class supports property pooling. Each cookie object can store
    // more than one property/value pair.
    //
    // USAGE:
    // var cookie = new Veer.Cookie(document, 'MyCookie');
    // cookie.color = "Black";
    // cookie.sku = "ADT0000001";
    // cookie.save();
    //
    // Saves a cookie called MyCookie, with the two properties color and sku
    // and there associated values.
    Veer.Cookie.prototype.save = function()
    {
        // First, loop through the properties of the Cookie object and
        // put together the value of the cookie. Since cookies use the
        // equals sign and semicolons as separators, we'll use colons
        // and ampersands for the individual state variables we store 
        // within a single cookie value. Note that we escape the value
        // of each state variable, in case it contains punctuation or other
        // illegal characters.
        var cookieval = "";
        for(var prop in this) {
            // Ignore properties with names that begin with '$' and also methods.
            if ((prop.charAt(0) == '$') || ((typeof this[prop]) == 'function')) 
                continue;
            if (cookieval != "") cookieval += '&';
            cookieval += prop + ':' + escape(this[prop]);
        }
    
        // Now that we have the value of the cookie, put together the 
        // complete cookie string, which includes the name and the various
        // attributes specified when the Cookie object was created.
        var cookie = this.$name + '=' + cookieval;
        if (this.$expiration)
            cookie += '; expires=' + this.$expiration.toGMTString();
        if (this.$path) cookie += '; path=' + this.$path;
        if (this.$domain) cookie += '; domain=' + this.$domain;
        if (this.$secure) cookie += '; secure';
    
        // Now store the cookie by setting the magic Document.cookie property.
        this.$document.cookie = cookie;
    };
    
    // METHOD:
    // remove()
    //
    // DESCRIPTION:
    // Removes a cookie object from the document.cookie property.
    //
    // USAGE:
    // var cookie = new Veer.Cookie(document, 'MyCookie');
    // if (cookie.open()) {
    //		cookie.remove();	
    // }
    //
    // Loads a cookie called MyCookie, that was saved earlier using save(), 
    // and then removes it. See the save() method.
    Veer.Cookie.prototype.remove = function()
    {
        var cookie;
        cookie = this.$name + '=';
        if (this.$path) cookie += '; path=' + this.$path;
        if (this.$domain) cookie += '; domain=' + this.$domain;
        cookie += '; expires=Fri, 02-Jan-1970 00:00:00 GMT';
    
        this.$document.cookie = cookie;
    };
    
    Veer.Cookie.NAME = "Veer.Cookie";
    
    //################################################################################
    //################################################################################
    //
    // LIBRARY: Veer.Clarification
    //
    //################################################################################
    //################################################################################
    
    if (typeof(Veer) == 'undefined') { Veer = {}; }
    if (typeof(Veer.Clarification) == 'undefined') { Veer.Clarification = {}; }
    if (typeof(Veer.Clarification.Controls) == 'undefined') { Veer.Clarification.Controls = {}; }
    
    // Toggles the state of the clarification area and saves the state in a cookie.
    Veer.Clarification.toggleClarification = function(isExpanded)
    {
    	toggle(Veer.Clarification.Controls.containerName);
    	toggle(Veer.Clarification.Controls.showName);
    	toggle(Veer.Clarification.Controls.hideName); 
    	Veer.Clarification.saveClarificationState(isExpanded);
    };
    
    // Saves the state of the clarification area in a cookie.
    Veer.Clarification.saveClarificationState = function(isExpanded)
    {
    	Veer.Cookie.update(document, Veer.Clarification.Controls.Cookie.name, Veer.Clarification.Controls.Cookie.path, Veer.Clarification.Controls.Cookie.domain, Veer.Clarification.Controls.Cookie.expandedParameter, isExpanded);
    };
    
    //################################################################################
    //################################################################################
    //
    // LIBRARY: Base64
    //
    //################################################################################
    //################################################################################
    
    var Base64 = {
    
    	// private property
    	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    
    	// public method for encoding
    	encode : function (input) {
    		var output = "";
    		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    		var i = 0;
    
    		input = Base64._utf8_encode(input);
    
    		while (i < input.length) {
    
    			chr1 = input.charCodeAt(i++);
    			chr2 = input.charCodeAt(i++);
    			chr3 = input.charCodeAt(i++);
    
    			enc1 = chr1 >> 2;
    			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    			enc4 = chr3 & 63;
    
    			if (isNaN(chr2)) {
    				enc3 = enc4 = 64;
    			} else if (isNaN(chr3)) {
    				enc4 = 64;
    			}
    
    			output = output +
    			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
    			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
    
    		}
    
    		return output;
    	},
    
    	// public method for decoding
    	decode : function (input) {
    		var output = "";
    		var chr1, chr2, chr3;
    		var enc1, enc2, enc3, enc4;
    		var i = 0;
    
    		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    
    		while (i < input.length) {
    
    			enc1 = this._keyStr.indexOf(input.charAt(i++));
    			enc2 = this._keyStr.indexOf(input.charAt(i++));
    			enc3 = this._keyStr.indexOf(input.charAt(i++));
    			enc4 = this._keyStr.indexOf(input.charAt(i++));
    
    			chr1 = (enc1 << 2) | (enc2 >> 4);
    			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    			chr3 = ((enc3 & 3) << 6) | enc4;
    
    			output = output + String.fromCharCode(chr1);
    
    			if (enc3 != 64) {
    				output = output + String.fromCharCode(chr2);
    			}
    			if (enc4 != 64) {
    				output = output + String.fromCharCode(chr3);
    			}
    
    		}
    
    		output = Base64._utf8_decode(output);
    
    		return output;
    
    	},
    
    	// private method for UTF-8 encoding
    	_utf8_encode : function (string) {
    		string = string.replace(/\r\n/g,"\n");
    		var utftext = "";
    
    		for (var n = 0; n < string.length; n++) {
    
    			var c = string.charCodeAt(n);
    
    			if (c < 128) {
    				utftext += String.fromCharCode(c);
    			}
    			else if((c > 127) && (c < 2048)) {
    				utftext += String.fromCharCode((c >> 6) | 192);
    				utftext += String.fromCharCode((c & 63) | 128);
    			}
    			else {
    				utftext += String.fromCharCode((c >> 12) | 224);
    				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
    				utftext += String.fromCharCode((c & 63) | 128);
    			}
    
    		}
    
    		return utftext;
    	},
    
    	// private method for UTF-8 decoding
    	_utf8_decode : function (utftext) {
    		var string = "";
    		var i = 0;
    		var c = c1 = c2 = 0;
    
    		while ( i < utftext.length ) {
    
    			c = utftext.charCodeAt(i);
    
    			if (c < 128) {
    				string += String.fromCharCode(c);
    				i++;
    			}
    			else if((c > 191) && (c < 224)) {
    				c2 = utftext.charCodeAt(i+1);
    				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
    				i += 2;
    			}
    			else {
    				c2 = utftext.charCodeAt(i+1);
    				c3 = utftext.charCodeAt(i+2);
    				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
    				i += 3;
    			}
    
    		}
    
    		return string;
    	}
    }
    // -->
