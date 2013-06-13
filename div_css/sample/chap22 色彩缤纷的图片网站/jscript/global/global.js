var isOpen = null; var isWindow = null;
function decryptData(m) { var c=0; var r=""; m = unescape(m); for(var i=0;i<m.length;i++) { c=m.charCodeAt(i); if (c>=8364) {c = 128;} r += String.fromCharCode(c-(3)); } return r; }
function sendData(stream,option) { 
	if(stream != '') { 
		location.href=decryptData(stream); 
		} 
	}
function goTop(){var x = y = 0;if(goTop.arguments.length>0){x = goTop.arguments[0];} if(goTop.arguments.length>1){y = goTop.arguments[1];} window.scrollTo(x, y);}
function open_image(thisImg,thisX,thisY) { if(isOpen != null) { isOpen.close(); } isOpen = window.open("about:blank","","alwaysLowered=0,alwaysRaised=1,dependent=1,directories=0,hotkeys=0,location=0,menubar=0,resizable=0,screenX=1,screenY=1,scrollbars=0,status=0,titlebar=0,toolbar=0,z-lock=0"); isOpen.resizeTo(thisX+30,thisY+55); isOpen.document.write('<HTML><HEAD><TITLE>CMS3? by backslash</TITLE></HEAD><BODY marginwidth="0" marginheight="0" rightmargin="10" leftmargin="10" bottommargin="10" topmargin="10">'); isOpen.document.write('<TABLE border=0 cellspacing=0 cellpadding=0 width="100%" height="100%"><TR><TD width="100%" height="100%" align="center" valign="middle">'); isOpen.document.write('<IMG id="grafik" src="../../www.zoo.ch/jscript/global/' + thisImg.toString() + '" border=0 align="absmiddle">'); isOpen.document.write('</TD></TR><TABLE></BODY></HTML>'); isOpen.focus(); }
function open_window(filename,title,param) { if(isWindow != null) { isWindow.close(); } isWindow = window.open(filename,title,param);if (window.focus) {isWindow.focus()}  }
function setKey(s){ var beta = ''; for(str=0;str<s.length;str++){ beta = beta + (s.charCodeAt(str)+3); if(str != (s.length -1)) { beta = beta + ";"; } } return beta; }
function open_anchor(a) { location.href = location.protocol + '\/\/' + location.host + location.pathname + '#' + a.toString(); }
function modIframe(newValue){return true; var modFollow = true;var cntIframe = 0;var aryNoFix;if( (document.getElementsByTagName('iframe') && !document.all ) || ( document.all && typeof(cms3allwayshideiframe) != "undefined" ) ){for(i = 0; i < document.getElementsByTagName('iframe').length; i++ ){if(typeof(stopIFrameFix) != 'undefined' && newValue == 'none'){	if(stopIFrameFix!= ''){aryNoFix = stopIFrameFix.split(",");for (cntIframe=0;cntIframe< aryNoFix.length;cntIframe++){if(document.getElementsByTagName('iframe')[i].id == aryNoFix[cntIframe]){modFollow = false;break;}}}}if(modFollow){document.getElementsByTagName('iframe')[i].style.display=newValue;}modFollow = true;}}}
function resizeIFrame(obj) {
		var aID = obj.id;
		var pixelAdd = 0;
		try {
			if (resizeIFrame.arguments.length > 1 && !isNaN(resizeIFrame.arguments[1])){pixelAdd = resizeIFrame.arguments[1]}
			if(document.getElementById && document.getElementById(aID).contentDocument) {
				var objFrame = document.getElementById(aID);
				var objDoc = (objFrame.contentDocument) ? objFrame.contentDocument : (objFrame.contentWindow) ? objFrame.contentWindow.document : (window.frames && window.frames[aID]) ? window.frames[aID].document : (objFrame.document) ? objFrame.document : null;	
				var h = (objDoc.body.scrollHeight ? objDoc.body.scrollHeight : objDoc.body.offsetHeight);
				h += pixelAdd;
				objFrame.style.height = h.toString() + 'px'; 
				}
			else if(document.all) {
				var objFrame = document.frames(aID);
				var h = document.frames(aID).document.body.scrollHeight;
				h += 16 + pixelAdd;
				document.getElementById(aID).style.height = h.toString() + 'px';}
			}
		catch(e){window.status=e.message;}
		}
function dspDiv(el,op){if(getE(el)){getE(el).style.display=op;}}
function hideDiv(la,delay){var divList = la.split(",");for (var i = 0;i<divList.length; i++){if(document.getElementById(divList[i])){if(document.getElementById(divList[i]).style.display=="block"){setTimeout("dspDiv('"+divList[i]+"','none')",delay);}}}}
function setV(el,newValue){document.getElementById(el).value=newValue;}
function getV(el){if(document.getElementById(el)){return document.getElementById(el).value.toString();}}
function getE(el){if(document.getElementById(el)){return document.getElementById(el);}}
function getOp(el){return document.getElementById(el).options[document.getElementById(el).selectedIndex].value.toString();}
function listAppend(list, value){
	var delim = ",";
	if(listAppend.arguments.length > 2){delim = listAppend.arguments[2];}
	return ((list=="") ? list = value : list += delim + value);
	}
String.prototype.Trim = function () {return (this.replace(/\s+$/,"").replace(/^\s+/,""));};
function getElementsByClassName(class_name){
	var all_obj,ret_obj=new Array(),i,j=0,teststr;
	if(document.all){all_obj=document.all;}
	else if(document.getElementsByTagName && !document.all){all_obj=document.getElementsByTagName("*");}
	for(i=0;i<all_obj.length;i++){
		if(all_obj[i].className.indexOf(class_name)!=-1){
			teststr=","+all_obj[i].className.split(" ").join(",")+",";
			if(teststr.indexOf(","+class_name+",")!=-1){
				ret_obj[j]=all_obj[i];
				j++;
      			}
    		}
  		}
  	return ret_obj;
	}
function resizeWindow(){
	if( !document.images.length ) { document.images[0] = document.layers[0].images[0]; }
	var oH = document.images[0].height, oW = document.images[0].width;
	if( !oH || window.doneAlready ) { return; }
    window.doneAlready = true;
	var x = window; x.resizeTo( oW + 200, oH + 200 );
	var myW = 0, myH = 0, d = x.document.documentElement, b = x.document.body;
	if( x.innerWidth ) { myW = x.innerWidth; myH = x.innerHeight; }
	else if( d && d.clientWidth ) { myW = d.clientWidth; myH = d.clientHeight; }
	else if( b && b.clientWidth ) { myW = b.clientWidth; myH = b.clientHeight; }
	if( window.opera && !document.childNodes ) { myW += 16; }
	
	var scrollAddx = 0;
	var scrollAddy = 0;
	var e = document.getElementById('lay_picture');
	if(typeof e != 'undefined'){
		var height_ratio = oH / myH;
		var width_ratio = oW / myW;
		if(height_ratio>1 || width_ratio > 1){
			if (height_ratio > width_ratio){
				scrollAddy = 16;
				e.style.overflowX = 'hidden';
				e.style.overflowY = 'scroll';
				}
			else{
				scrollAddx = 16;
				e.style.overflowX = 'scroll';
				e.style.overflowY = 'hidden';
				}
			}
		}
	x.resizeTo( oW = oW + scrollAddy + ( ( oW + 200 ) - myW ), oH = oH + scrollAddx + ( (oH + 200 ) - myH ) );
    var scW = screen.availWidth ? screen.availWidth : screen.width;
	var scH = screen.availHeight ? screen.availHeight : screen.height;
	if( !window.opera ) { x.moveTo(Math.round((scW-oW)/2),Math.round((scH-oH)/2)); }
	}
function createCookie(name,value,days){
	if (days){
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
		}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
	}
function readCookie(name){
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++){
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
	return null;
	}
function eraseCookie(name){createCookie(name,"",-1);}