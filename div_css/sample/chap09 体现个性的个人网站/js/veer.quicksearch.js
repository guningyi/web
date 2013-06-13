///<reference path="jquery-1.3.2-vsdoc.js"/>
    
//################################################################################
//################################################################################
//
// LIBRARY: Veer.QuickSearch
//
//################################################################################
//################################################################################

if (typeof(Veer) == 'undefined') { Veer = {}; }

// set var to false by default.  True is set when searchfiltersbox is loaded.
var isResults = false;

// set the search category (type of SearchType) from session
var category;
   
// indicates if the search is a new search from the quicksearch control
var isNewQuickSearch=false;

// set the search token GUID after a search
var searchtoken;

//----------------------------------------------------------------------
// Constructor
//----------------------------------------------------------------------

if (typeof(Veer.QuickSearch) == 'undefined') 
{
    Veer.QuickSearch = function() 
    {
        // Makes referencing the objects much simpler.
        this.parameters = Veer.QuickSearch.Parameters;
        this.controls   = Veer.QuickSearch.Controls;
    }; 
};

//----------------------------------------------------------------------
// SearchUri Parameters - also defined in SearchUri.cs
//----------------------------------------------------------------------

Veer.QuickSearch.Parameters = 
{
    SearchToken:    			"searchtoken",
    Keyword:        			"keyword",
    SearchOperator: 			"Search",
    SearchCategory: 			"category",
    Clarify:        			"clarify",
    Vendor:         			"vendor",
    PriceModel:     			"pricemodel",
    ProductType:    			"producttype",
    Orientation:    			"orientation",
    Color:          			"color",
    NumberOfPeople: 			"people",
    SearchTerm:     			"searchTerm",
    SearchWithin:   			"within",
	producttypeDefaultParams:	"producttype=TYP%2CIMG%2CILL",
	isProductTypeDefault:		false
};

//----------------------------------------------------------------------
// SearchUri Categories
// These should be the equivalent lookups for SearchType
//----------------------------------------------------------------------
Veer.QuickSearch.Categories =
{
	Image:			"Image",
	Type:			"Type",		
	Merchandise:	"Merchandise",
	Disc:			"Disc"	
};


//----------------------------------------------------------------------
// Static methods
//----------------------------------------------------------------------

// Web form submission handler. Decides whether to do direct the POST
// back to the current page, or to do a cross-page post to another
// page. This event handler is registered by the QuickSearch control 
// using RegisterOnSubmitStatement.
Veer.QuickSearch.onSubmit = function()
{
    //submit onClick handle in Omniture
     SendEvents("event41");
     
	// If this handler isn't in response to a search click, we'll post back.
    if (!Veer.QuickSearch.Controls.isSearch)
    return true;
   
    var radioButton = Veer.QuickSearch.Controls.searchWithinRadio;

    if (radioButton && radioButton.checked) 
    {
        // A search-within requires a POST-back to function. Search-within will 
        // only happen when the control is hosted on the results page.
        return true;
    } 
    else 
    {
        var quickSearch = new Veer.QuickSearch();
		
		// This method is in place to deal with stink'n IE's http referer issue.
		// We're dynamically creating a form to bypass the .net body form to submit so that IE will send a referer so that we can correctly display the grid on search
		$j("form[0]").submit(function(){
			if ($j.browser.msie) {
				$j("body").append("<form id='quick_search' name='quick_search'  method='post' action="../game01/www.veer.com/includes/20100302/ + quickSearch.BuildSearchUri() + "></form>");
				$j("#quick_search").submit();
				return false;
			} else {
				window.location = quickSearch.BuildSearchUri();
				return false;
			}
		});
    }
};

// Changes the search field into a Spotlight Search field on Safari browsers.
// The proprietary HTML extension provides a history of prior searches on the
// site.
//
// This was to enable search history in Safari and was called right after the 
// info block in quicksearch.ascx. However, it requires a cross-page post back,
// which did work, but caused Safari a lot of grief with AJAX. In Safari 2, a
// POST, followed by a GET request, followed by the browser Back button to the
// original POST page, will cause Safari to lose it's brains. AJAX or any
// communication with the web server will return Resource Unavailable in the
// Activity window. Sucks. I'm keeping the code however, just in case there
// is some work around we never tried.
Veer.QuickSearch.enableSpotlightSearch = function()
{
    var isSafari = (navigator.userAgent.indexOf("Safari") > 0);
    var s = Veer.QuickSearch.Controls.searchText;
    if (s && isSafari) {
        s.setAttribute('type', 'search');
        s.setAttribute('placeholder', s.value);
        s.setAttribute('autosave', 'com.veer.search');
        s.setAttribute('results', 30);
        s.setAttribute('class', '');
    }
}; 

// Clears the search terms box only on the first time it gets focus.
Veer.QuickSearch.clearOnFirstFocus = function(textbox)
{
	if (!textbox.firstFocus)
	{
		if (textbox.value == Veer.QuickSearch.Controls.Localization.enterSearchTermsText)
		{
			textbox.value = "";
		}
		textbox.firstFocus = true;
	}
};


// Sets the state of other controls when the specified list has had a selection made.
Veer.QuickSearch.brandSelected = function(control, parentControl)
{
	for (var i = 0; i < control.length; i++)
	{
		if (control.options[i].selected)
		{
		    if (parentControl) parentControl.checked = true;
			break;
		}
	}
};

// Clears all checkboxes that cannot have extra options selected.
Veer.QuickSearch.clearNonOptionableCategories = function()
{
	Veer.QuickSearch.Controls.ProductType.type.checkBox.checked = false;
	Veer.QuickSearch.Controls.ProductType.merchandise.checkBox.checked = false;
};

//----------------------------------------------------------------------
// Instance methods
//----------------------------------------------------------------------

// Returns a URI to a new search results page.
Veer.QuickSearch.prototype.BuildSearchUri = function() {
    // Locals to help reduce visual clutter
    var p = this.parameters;
    var c = this.controls;
    var pairs;
    var pathname = window.location.pathname.toString();
    var keywords = c.searchText.value

    // check to see if we're on the results page.  if true, then generate filters url
    pairs =
	[
		this.BuildParameter(p.SearchWithin, this.BuildCheckBoxBoolean(c.searchWithinRadio, "True", "")),
		this.BuildCheckboxParameter(p.ProductType, c.ProductType),
		this.BuildParameter(p.SearchCategory, this.GetCategoryValue(this.controls))
	];
    // if product types are default, send a SEO friendly search url by omitting all vars except keyword

    if (pairs[1] == Veer.QuickSearch.Parameters.producttypeDefaultParams) {
        var query = '';
    } else {
        var query = this.BuildQuery(pairs);
    }

    if (/\s|\b%20\b/g.test(keywords)) keywords = keywords.replace(/&/g, "and").replace(/\s|\b%20\b/g, "+");

    if (/^images$|^veer$|^marketplace$|^stylesheets$|^javascripts$|^swf$|^errors$|[^\w\-+\s']/g.test(keywords)) {
		if (query != "") query = "&" + query;
        var uri = c.Page.results + "?keyword=" + keywords + query;
    } else {
		if (query != "") query = "?" + query;
        var uri = c.Page.results + keywords + query;
    }

    return uri;
};


//sets the category value from quicksearch controls
Veer.QuickSearch.prototype.GetCategoryValue = function(controls)
{
    var categoryValue;
	if (category == undefined)
	{
		categoryValue = Veer.QuickSearch.Categories.Image;
		if(controls.ProductType.photography.checkBox.checked || controls.ProductType.illustration.checkBox.checked)
		{
			categoryValue = Veer.QuickSearch.Categories.Image;
		}
		else if (controls.ProductType.type.checkBox.checked)
		{
			categoryValue = Veer.QuickSearch.Categories.Type;
		}
		else if (controls.ProductType.merchandise.checkBox.checked)
		{
			categoryValue = Veer.QuickSearch.Categories.Merchandise;
		}
	}
	else 
	{
		categoryValue = category;
		category = undefined;
	}
	return categoryValue;
};

//encode the keywords for german search - works with utf-8
Veer.QuickSearch.prototype.EncodedKeywords = function(string)
{
	string = string.replace(/\r\n/g,"\n");
	var utftext = "";

	for (var n = 0; n < string.length; n++)
	{
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
};

// Given an array of strings (that happen to be name value pairs), concatentate
// them together into a query string. Elements of the array that are empty
// do not become part of the final string.
Veer.QuickSearch.prototype.BuildQuery = function(nameValuePairs) 
{
    var value = "";
    for (var index = 0; index < nameValuePairs.length; index++) 
    {
        var pair = nameValuePairs[index];
        if (pair && pair.length && pair.length > 0) 
        {
            if (value.length > 0)
            {
                value += "&";
            };
            value += pair;
        };
    };
    return value;
};

// Builds a parameter that consists of the values of checked checkboxes.
//
// name       - the name of this name-value pair.
// checkboxes - an object that has one or more properties that are themselves 
//              objects of the form { checkbox: <control>, code: <string> }
//              the code property will be used as the parameter value.
Veer.QuickSearch.prototype.BuildCheckboxParameter = function(name, checkboxes) 
{
    if (name && checkboxes) 
    {
        var value = "";
        for (var property in checkboxes) 
        {
            var item = checkboxes[property];
            if (item.code && item.checkBox && item.checkBox.checked)
            {
                value += item["code"] + ",";
            };
        };
        return this.BuildParameter(name, this.RemoveTrailingComma(value));
    };
    return "";
};

// Builds a parameter whose value is that of the chosen list index, when the index
// is greater than zero.
//
// name - the name of this name-value pair.
// list - a SELECT control
Veer.QuickSearch.prototype.BuildListParameter = function(name, list)
{
    if (name && list) 
    {
        if (list.selectedIndex && list.selectedIndex > 0)
        {
            return this.BuildParameter(name, list.options[list.selectedIndex].value);
        };
    };
    return "";
};

// Builds a vendor parameter for each listbox of vendors whose corresponding
// checkbox is checked.
//
// name       - the name of this name-value pair.
// checkboxes - an object that has one or more properties that are themselves 
//              objects of the form { checkbox: <control>, code: <string> }
// lists      - an object whose properties have values that are SELECT controls
//
// There is a correlation between the names of the properties in the checkboxes
// object and those of the lists object. If the checkboxes object has a property
// called 'photography', then the lists object is expected to have a property
// called 'photographyList'.
Veer.QuickSearch.prototype.BuildVendorParameter = function(name, checkboxes, lists)
{
    if (name && checkboxes && lists) 
    {
        var value = "";
        
        // enumerate all the properties of the checkboxes object
        for (var property in checkboxes)
        {
            // grab the object of the property
            var item = checkboxes[property];
            // grab a SELECT element from the lists object whose property name has a "List" suffix
            var list = lists[property + "List"];

            // check to make sure the objects have the form we expect and that the checkbox is checked.
            if (list && list.options && item && item.checkBox && item.checkBox.checked)
            {
                // collect all the selected vendors of the listbox
                for (var index = 0; index < list.options.length; index++) 
                {
                    if (list.options[index].selected) 
                    {
                        value += list.options[index].value + ",";
                    };
                };
            };
        };
        return this.BuildParameter(name, this.RemoveTrailingComma(value));
    };
    return "";
};

// Builds a parameter of the form name=value.
// A parameter whose value is a zero length string will be returned as empty string.
Veer.QuickSearch.prototype.BuildParameter = function(name, value) 
{
    if (name && value) 
    {
        if (value.length > 0) 
        {
            return name + "=" + ((escape) ? escape(value) : value).replace("+", "%2B");
        };
    };
    return "";
};

// Returns a boolean value based on the state of a checkbox control
Veer.QuickSearch.prototype.BuildCheckBoxBoolean = function(control, trueValue, falseValue)
{
    if (control && control.checked)
        return trueValue;
    else
        return falseValue;
};

// Given a string, returns a string with the trailing comma removed.
Veer.QuickSearch.prototype.RemoveTrailingComma = function(value) 
{
    if (value && value.charAt(value.length-1) == ",")
         return value.substring(0, value.length-1);
         
    return "";
};