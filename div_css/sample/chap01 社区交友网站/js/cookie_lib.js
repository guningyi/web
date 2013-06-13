//Java script cookie lib

function getCookieVal ( offset ) {
  var endstr = document.cookie.indexOf (";", offset);
  if ( endstr == -1 )
    endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}

function SetCookie ( name, value, expires, path, domain, secure ) {
  if ( name.length == 0 ) return;

  document.cookie = name + "=" + escape (value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "Never") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
}

function GetCookie ( name ) {
  if ( name.length == 0 ) return null;
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while ( i < clen ) {
    var j = i + alen;
    if ( document.cookie.substring(i, j) == arg ) {
      return getCookieVal (j);
	}
    i = document.cookie.indexOf(" ", i) + 1;
    if ( i == 0 ) break;
  }
 
 	 return null;
}

function DeleteCookie ( name,path,domain ) {
  if (GetCookie(name)) {
    document.cookie = name + "=" +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

function FixCookieDate ( date ) {
  var base = new Date(0);
  var skew = base.getTime(); // dawn of (Unix) time - should be 0
  if (skew > 0)  // Except on the Mac - ahead of its time
    date.setTime (date.getTime() - skew);
}