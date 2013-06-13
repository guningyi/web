
	var key_tab = 9;
	var basic = true;



	function openWindow(theURL,winName,features) {
		if (winName.window) winName.focus;
    	popupWin = window.open(theURL,winName,features)
		popupWin.focus;
		
	}
	function deleteConfirm(what,formName,theURL) {
		if (confirm("Είστε σίγουρος ; Θέλετε να διαγράψετε "+ what +"; ")) {
			if (formName != null) {
				formName.submit()
			} else {
				window.location.href = theURL
			}
		}
	}

	function saveConfirm(what,formName,theURL) {
		if (confirm(what)) {
			if (formName != null) {
				formName.submit()
			} else {
				window.location.href = theURL
			}
		}
	}

	function processTab() {
		if (window.event.keyCode == key_tab) 
		{
		var s = document.selection;
		var tr = s.createRange();
		if ( tr != null ) 
			tr.text = "\t";
			window.event.returnValue=false;
		}
	}

	_editor_url = "htmlarea/";
	var win_ie_ver = parseFloat(navigator.appVersion.split("MSIE")[1]);
	if (navigator.userAgent.indexOf('Mac')        >= 0) { win_ie_ver = 0; }
	if (navigator.userAgent.indexOf('Windows CE') >= 0) { win_ie_ver = 0; }
	if (navigator.userAgent.indexOf('Opera')      >= 0) { win_ie_ver = 0; }
	if (win_ie_ver >= 5.5) {
		document.write('<scr' + 'ipt src="' +_editor_url+ 'editor.js"');
		document.write(' language="Javascript1.2"></scr' + 'ipt>');  
	} else {document.write('<scr'+'ipt>function editor_generate() { return false; }</scr'+'ipt>');}
	



/** ΜΕΝΟΥ ΣΤΗΝ ΑΡΙΣΤΕΡΗ ΣΤΗΛΗ ΤΟΥ ADMIN PANEL **/
var dbMenu = {
    init: function(){
        var uls = document.getElementsByTagName('ul');
        for(var i = 0; i < uls.length; i++){
            if(uls[i].className.search(/\bdbMenu\b/) == -1)
                continue;
            var menu = uls[i];
            
            dbMenu.styleSubMenus(menu);
            
            addEvent(menu, 'mouseover', dbMenu.hover, false);
            addEvent(menu, 'mouseout', dbMenu.hoverOff, false);
            if(menu.className.search(/\bonMouse\b/) == -1){
                addEvent(menu, 'click', dbMenu.click, false);
            }
            addEvent(menu, 'click', dbMenu.nav, false);
        }    
    },
    
    hover: function(e){
        var target = (window.event)? window.event.srcElement : (e)? e.target : null;
        
        if(target){
            target = dbMenu.getTarget(target, 'li');
            if(!target) return;
        }else{
            return;
        }
        
        target.className += ' hover';
        
        var t = (target.className.search(/\bsubMenu\b/) != -1)? target : (target.parentSubMenu)? target.parentSubMenu : null;
        if(!t) return;
        clearTimeout(t.timeout);
        
        if(target.parentMenu.className.search(/\bonMouse\b/) != -1){
            t.className += ' click';
        }
    },
    
    hoverOff: function(e){
        var target = (window.event)? window.event.srcElement : (e)? e.target : null;
        
        if(target){
            target = dbMenu.getTarget(target, 'li');
            if(!target) return;
        }else{
            return;
        }
        
        target.className = target.className.replace(/hover/g, '');
        
        if(target.parentMenu.className.search(/\bonMouse\b/) != -1){
            var t = (target.className.search(/\bsubMenu\b/) != -1)? target : (target.parentSubMenu)? target.parentSubMenu: null;
            if(!t) return; 
            t.timeout = setTimeout(function(){ t.className = t.className.replace(/click/g, ''); }, 30);
        }
    },
    
    click: function(e){
        if(window.event){
            window.event.cancelBubble = true;
        }
        if(e && e.stopPropagation){
            e.stopPropagation();
        }
        var target = (window.event)? window.event.srcElement : (e)? e.target : null;
        
        if(target){
            target = dbMenu.getTarget(target, 'li');
            if(!target) return;
        }else{
            return;
        }
        
        if(target.className.search(/\bclick\b/) == -1){
            target.className += ' click';
        }else{
            target.className = target.className.replace(/click/g, '');
        }
    },
    
    nav: function(e){
        if(window.event){
            window.event.cancelBubble = true;
        }
        if(e && e.stopPropagation){
            e.stopPropagation();
        }
        var target = (window.event)? window.event.srcElement : (e)? e.target : null;
        
        if(target){
            target = dbMenu.getTarget(target, 'li');
            if(!target) return;
        }else{
            return;
        }
        
        for(var i = 0; i < target.childNodes.length; i++){
            var node = target.childNodes[i];
            if(node.nodeName.toLowerCase() == 'a'){
                window.location = node.href;
                break;
            }
        }
    },
    
    getTarget: function(target, elm){
        if(target.nodeName.toLowerCase() != elm && target.nodeName.toLowerCase() != 'body'){
            return dbMenu.getTarget(target.parentNode, elm);
        }else if(target.nodeName.toLowerCase() == 'body'){
            return null;
        }else{
            return target;
        }
    },
    
    styleSubMenus: function(menu){
        lis = menu.getElementsByTagName('li');
        for(var i = 0; i < lis.length; i++){
            node = lis[i];
            node.parentMenu = menu;
            if(node.getElementsByTagName('ul').length != 0){
                node.className += ' subMenu';
                sublis = node.getElementsByTagName('li');
                for(var j = 0; j < sublis.length; j++){
                    sublis[j].parentSubMenu = node;
                }
            }
        }
    }
}
    
function addEvent(elm, evType, fn, useCapture){  //cross-browser event handling for IE5+, NS6+, and Mozilla/Gecko By Scott Andrew
	if(elm.addEventListener){
		elm.addEventListener(evType, fn, useCapture);
		return true;
	}else if(elm.attachEvent){
		var r = elm.attachEvent('on' + evType, fn);
		return r;
	}else{
		elm['on' + evType] = fn;
	}
}

// PHOTO GALLERY FUNCTION
// Set the horizontal and vertical position for the popup

PositionX = 100;
PositionY = 100;

// Set these value approximately 20 pixels greater than the
// size of the largest image to be used (needed for Netscape)

defaultWidth  = 500;
defaultHeight = 500;

// Set autoclose true to have the window close automatically
// Set autoclose false to allow multiple popup windows

var AutoClose = true;

// Do not edit below this line...
// ================================
if (parseInt(navigator.appVersion.charAt(0))>=4){
var isNN=(navigator.appName=="Netscape")?1:0;
var isIE=(navigator.appName.indexOf("Microsoft")!=-1)?1:0;}
var optNN='scrollbars=no,width='+defaultWidth+',height='+defaultHeight+',left='+PositionX+',top='+PositionY;
var optIE='scrollbars=no,width=150,height=100,left='+PositionX+',top='+PositionY;
function popImage(imageURL,imageTitle){
if (isNN){imgWin=window.open('about:blank','',optNN);}
if (isIE){imgWin=window.open('about:blank','',optIE);}
with (imgWin.document){
writeln('<html><head><title>Loading...</title><style>body{margin:0px;}</style>');writeln('<sc'+'ript>');
writeln('var isNN,isIE;');writeln('if (parseInt(navigator.appVersion.charAt(0))>=4){');
writeln('isNN=(navigator.appName=="Netscape")?1:0;');writeln('isIE=(navigator.appName.indexOf("Microsoft")!=-1)?1:0;}');
writeln('function reSizeToImage(){');writeln('if (isIE){');writeln('window.resizeTo(300,300);');
writeln('width=300-(document.body.clientWidth-document.images[0].width);');
writeln('height=300-(document.body.clientHeight-document.images[0].height);');
writeln('window.resizeTo(width,height);}');writeln('if (isNN){');       
writeln('window.innerWidth=document.images["George"].width;');writeln('window.innerHeight=document.images["George"].height;}}');
writeln('function doTitle(){document.title="'+imageTitle+'";}');writeln('</sc'+'ript>');
if (!AutoClose) writeln('</head><body bgcolor=000000 scroll="no" onload="reSizeToImage();doTitle();self.focus()">')
else writeln('</head><body bgcolor=#ffffff scroll="no" onload="reSizeToImage();doTitle();self.focus()" onblur="self.close()">');
writeln('<img name="George" src='+imageURL+' style="display:block"></body></html>');
close();		
}}



	
addEvent(window, 'load', dbMenu.init, false);

function checkrequired(which) {
  var pass=true;
  for (i=0;i<which.length;i++) {
    var tempobj=which.elements[i];
    if (tempobj.name.substring(0,3)=="req") {
      if (((tempobj.type=="text"||tempobj.type=="textarea"||tempobj.type=="password")&&
          tempobj.value=='')||(tempobj.type.toString().charAt(0)=="s"&&
          tempobj.selectedIndex==0)) {
        pass=false;
        break;
      }
    }
  }
  if (!pass) {
    shortFieldName=tempobj.name.substring(3,30).toUpperCase();

  switch(shortFieldName)
   {
	   
	  case "SHIPMETHOD":shortFieldName="Τρόπος αποστολής";break;
  	  case "BILL_FNAME":shortFieldName="Όνομα";break;
	  case "BILL_LNAME":shortFieldName="Επίθετο";break;
	  case "BILL_ADDR1":shortFieldName="Διεύθυνση";break;
  	  case "BILL_PHONE":shortFieldName="Τηλέφωνο";break;
	  case "BILL_CITY":shortFieldName="Πόλη";break;
	  case "USER_NAME":shortFieldName="Username";break;
	  case "EMAIL":shortFieldName="E-mail";break;
  	  case "PASSWORD":shortFieldName="Password";break;
	 }
  

    alert("Please fill "+shortFieldName+" field.");
	which.elements[tempobj.name].focus();return false;


  } else {
  return true;
  }
}

