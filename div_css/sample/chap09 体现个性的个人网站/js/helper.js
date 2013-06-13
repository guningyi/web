/*************************************************
	Web Production Helper Javascript Files
	Veer Inc.
	CREATED: Friday; April 4, 2008, [10:41 AM]
	MODIFIED: Tuesday; October 21, 2008, [2:13:52 PM]
	COPYRIGHT 2008
*************************************************/

function loadImage(arg) {
	if (document.images) {
		rslt = new Image();
		rslt.src = arg;
		return rslt;
	}
}

// PSEUDO CHECKING OF ANSWERS FOR VERY SECRET
// ----------------------------------------------------------------------------

// Oh, look who's snooping around the source code.

// Your curiosity is rewarded with the answers to the riddles.

// But don't you feel just a little bit guilty?

// ----------------------------------------------------------------------------

function checkAnswer (i,a) {

	if (a=="inspiration"&&i=="riddle3answer"){

		var target = document.getElementById( "riddleone" );

		if (target) {

			if (target.style.display == "block"){target.style.display = "none";}

			else {target.style.display = "block";}

		}

		toggle("answerone");

		setCookie('answered3','answered',365);

		return

	}else if (a=="perfection"&&i=="riddle7answer"){

		target = document.getElementById( "riddletwo" );

		if (target) {

			if (target.style.display == "block"){target.style.display = "none";}

			else {target.style.display = "block";}

		}

		toggle("answertwo");

		setCookie('answered7','answered',365);

		return

	}else{

		if (i=="riddle3answer") {target = document.getElementById( "error1" );target.style.visibility = "visible";}

		if (i=="riddle7answer") {target = document.getElementById( "error2" );target.style.visibility = "visible";}

	}

}

function checkValue (id){

	var myA = document.getElementById(id).value;

	var lowercase = myA.toLowerCase();

	checkAnswer(id,lowercase);

}

// ----------------------------------------------------------------------------		

function enterSubmit(riddle,evt) {

	evt = (evt) ? evt : ((event) ? event : null);

	var evver = (evt.target) ? evt.target : ((evt.srcElement)

	?evt.srcElement : null );

	

	var keynumber = evt.keyCode;

	if(keynumber==13){

	checkValue(riddle);

	}

}

// ----------------------------------------------------------------------------	
function getCookie(c_name){

if (document.cookie.length>0){

  c_start=document.cookie.indexOf(c_name + "=");

  if (c_start!=-1){ 

    c_start=c_start + c_name.length+1 ;

    c_end=document.cookie.indexOf(";",c_start);

    if (c_end==-1) c_end=document.cookie.length

    return unescape(document.cookie.substring(c_start,c_end));

    } 

  }

return ""

}



function setCookie(c_name,value,expiredays){

var exdate=new Date();

exdate.setDate(exdate.getDate()+expiredays);

document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : "; expires="+exdate.toGMTString());

}



function checkCookie(){

    answered3=getCookie('answered3');

    answered7=getCookie('answered7');

    //show wallpapers

    if (answered3!=null && answered3!=""){

        document.getElementById('riddleone').style.display = "none";

        document.getElementById('answerone').style.display = "block";

    }

    if (answered7!=null && answered7!=""){

        document.getElementById('riddletwo').style.display = "none";

        document.getElementById('answertwo').style.display = "block";

    }

}

// - used on the Email optout page to grab the name/value pairs out of the queryString -----------------


function PageQuery(q) {
	if(q.length > 1) this.q = q.substring(1, q.length);
	else this.q = null;
	this.keyValuePairs = new Array();
	if(q) {
	for(var i=0; i < this.q.split("&").length; i++) {
		this.keyValuePairs[i] = this.q.split("&")[i];
		}
	}
	this.getKeyValuePairs = function() { return this.keyValuePairs; }
	this.getValue = function(s) {
		for(var j=0; j < this.keyValuePairs.length; j++) {
		if(this.keyValuePairs[j].split("=")[0] == s) return this.keyValuePairs[j].split("=")[1];
		}
	return false;
	}
	this.getParameters = function() {
		var a = new Array(this.getLength());
		for(var j=0; j < this.keyValuePairs.length; j++) { a[j] = this.keyValuePairs[j].split("=")[0];}
		return a;
	}
	
}

function queryString(key){
	var page = new PageQuery(window.location.search); 
	return unescape(page.getValue(key)); 
}

function displayItem(key){ 
	if(queryString(key)=='false') {
		if (document.getElementById){
			target = document.getElementById ('emailAddress')
			target.value="Enter e-mail here"
			}
		}
	else{
		if (document.getElementById){
			target = document.getElementById ('emailAddress')
			target.value=queryString(key)
		}
	}
}

function displaySpid(key){ 
	if(queryString(key)=='false') {
		if (document.getElementById){
			target = document.getElementById ('spid')
			target.value="undefined"
			}
		}
	else{
		if (document.getElementById){
			target = document.getElementById ('spid')
			target.value=queryString(key)
		}
	}
}


// ----------------------------------------------------------------------------	
// POPUP windows that degrade gracefully. 
// To customize a window size add below like this "WIDTH_HEIGHT_popup"
// Javascript dependency jQuery 1.2.6+

$j(document).ready( function() {
	$j('a[rel="496_549_popup"],a[rel="525_745_popup"],a[rel="600_745_popup"],a[rel="600_760_popup"],a[rel="600_845_popup"],a[rel="630_895_popup"],a[rel="640_360_popup"],a[rel="800_630_popup"],a[rel="800_650_popup"],a[rel="900_675_popup"],a[rel="900_720_popup"],a[rel="980_750_popup"],a[rel="1040_800_popup"]').click( function() {
		var theRel = $j(this).attr('rel');
		var theArray = theRel.split('_');
		var theWidth = theArray[0];
		var theHeight = theArray[1];
		window.open( $j(this).attr('href'),$j(this).attr('href')+'_win','resizable=yes,scrollbars=no,width='+theWidth+',height='+theHeight);
		return false;
	 });
	 $j('a[rel="1000_750_popup"]').click( function() { //specific to /green microsite
		var theRel = $j(this).attr('rel');
		var theArray = theRel.split('_');
		var theWidth = screen.availWidth - 100; //rejigged width
		var theHeight = theWidth / 1.78; //rejigged height		
		var posY = (screen.availHeight/2) - (theHeight/2);
		var posX = (screen.availWidth/2) - (theWidth/2);
		window.open( $j(this).attr('href'),$j(this).attr('href')+'_win','resizable=yes,scrollbars=no,width='+theWidth+',height='+theHeight+',left='+posX+',top='+posY);
		return false;
	 });
	 $j('a[rel="fullscreen_popup"]').click( function() {
		var theRel = $j(this).attr('rel');
		var theWidth = screen.availWidth;
		var theHeight = screen.availHeight;
		window.open( $j(this).attr('href'),$j(this).attr('href')+'_win','resizable=yes,scrollbars=no,width='+theWidth+',height='+theHeight);
		return false;
	 });
	 
	 //Popup and Redirect
	 //Use the name attribute to specify the foldername for the popup content
	$j('a[rel="1000_750_autopop"],div[rel="1000_750_autopop"]').click( function() {
		var theRel = $j(this).attr('rel');
		var theArray = theRel.split('_');
		var theLanding = $j(this).attr('href');
		var theURLarray = theLanding.split('?');
		var theName = $j(this).attr('name');
		var thePop = theURLarray[0]+'/'+theName;
		var theWidth = screen.availWidth - 100; //rejigged width
		var theHeight = theWidth / 1.78; //rejigged height
		var posY = (screen.availHeight/2) - (theHeight/2);
		var posX = (screen.availWidth/2) - (theWidth/2);
		window.open( thePop,$j(this).attr('href')+'_win','resizable=yes,scrollbars=no,width='+theWidth+',height='+theHeight+',left='+posX+',top='+posY);
		return true;
	 });
	
});

