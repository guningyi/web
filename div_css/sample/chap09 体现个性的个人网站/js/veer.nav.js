/***************************************************************
 My Location Popup box nav controls (JS Dependancies > JQuery 1.2.6+)
 ***************************************************************/

// set the below on page load
$j(document).ready(function() {
	// close button style toggle
	$j("#POPBOX-closeButton").hover(
      function () {
        $j(this).toggleClass("POPBOX-closeOn");
      }, 
      function () {
        $j(this).toggleClass("POPBOX-closeOn");
      }
    );
});

// function to fade in/out popup nav box
function fadeInOut(ID) {
	if ($j(ID).css("display")!="none") {
		$j(ID).fadeOut("fast");
		} else {
		$j(ID).fadeIn("fast");
	}
}

// function to set locale based on the anonymous customer selection.  this is managed by isapi filter using LocaleRedirector.aspx
function localeRedirect(countrycode, appPath) {
    var currentPath = window.location.href.replace(appPath, '');
    if (currentPath.indexOf("https") != -1 ) {
        appPath = appPath.replace("http", "https");
        currentPath = currentPath.replace(appPath, '');
    }
    var navigationCountry = getCookie('VeerNavigationCountryCookie');
    var found = isRestOfEurope(navigationCountry);
    document.location.href = appPath + countrycode  + '/'  + currentPath;
}

function setLocaleClass() {
	var thisLocaleID = "#" + getCookie('VeerNavigationCountryCookie');
	if (thisLocaleID!='#'){
		$j(thisLocaleID + ">a").addClass("POPBOX-selected");
	}
}
setLocaleClass();

// function to get the value of the cookie from the cookie name. 
function getCookie(cookieName) {
    if (document.cookie.length > 0) {
      cookieStart=document.cookie.indexOf(cookieName + "=");
      if (cookieStart != -1) { 
        cookieStart = cookieStart + cookieName.length+1; 
        cookieEnd = document.cookie.indexOf(";",cookieStart);
        if (cookieEnd == -1) {
            cookieEnd=document.cookie.length;
        }
        return unescape(document.cookie.substring(cookieStart,cookieEnd));
       } 
    }
    return "";
}

// function to determine if the country code passed in is part of rest of europe.  This regular expression excludes australia.
function isRestOfEurope(countrycode) {
    var regex = new RegExp("BE|BA|BG|HR|CY|CZ|DK|EE|FI|FR|GR|GP|HU|IE|IL|IT|LV|LI|LT|MT|MQ|MC|NL|NO|PL|PT|RO|RU|SM|SK|SI|ES|SE|TR|VA", "i");
    var found = regex.exec(countrycode);
    if (found != null && found != '' && found != 'undefined') {
        return true;
    }
    return false;
}

// Generate url for preferences page and encode return url
function getPreferencesUrl(homeUrl)
{
	returnURL = location.href;
	returnURL = returnURL.replace(/\:/g,"%3A");
	returnURL = returnURL.replace(/\//g,"%2F");
	returnURL = returnURL.replace(/\?/g,"%3F");
	returnURL = returnURL.replace(/\=/g,"%3D");
	returnURL = returnURL.replace(/\&/g,"%26");
	returnURL = returnURL.replace(/\,/g,"%2C");
	returnURL = returnURL.replace(/\+/g,"%2B");
	//alert("after: "+returnURL);
	window.location.href = homeUrl + 'account/preferences.aspx?ReturnUrl=' + returnURL;
}