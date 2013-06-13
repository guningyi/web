// JavaScript Document
/* <![CDATA[ */
var http = getHTTPObject();
var http2 = getHTTPObject();
var default_url = "/js/callBack.php";
var xmlDoc;

var curDate = new Date();
var curDay = curDate.getDate();
var curMonth = (curDate.getMonth() + 1);
var curYear = curDate.getFullYear();

function getHTTPObject() {
	var xmlhttp;
	try {
		xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
	} catch (e) {
		try {
			xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
		} catch (E) {
			xmlhttp = false;
		}
	}
	if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
		try {
			xmlhttp = new XMLHttpRequest();
		} catch (e) {
			xmlhttp = false;
		}
	}
	return xmlhttp;
}
function calendarRotate(direction){
	curMonth += parseInt(direction);
	if(curMonth > 12){
		curMonth = 1;
		curYear++;
	} else if(curMonth == 0){
		curMonth = 12;
		curYear--;
	}	
	var url = default_url + "?page=calendarRotate&month=" + curMonth + "&year=" + curYear;
	url = url + "&sid=" + Math.random();	
	if((http.readyState == 0) || (http.readyState == 4)){			
		http.open("GET", url, true); 
		http.onreadystatechange = handleHttpCalendarRotate;
		http.send(null);
	}
}
 
function inviteButton(eventNum, divID){
	var divList = document.getElementById(divID).getElementsByTagName('DIV');
	var totalDivs = divList.length;
	for( var i=0; i<totalDivs; i++){
		if(divList[i].className.search('event' + eventNum) >= 0){
			var targetDivs = divList[i].getElementsByTagName('DIV');
			var totalTargets = targetDivs.length;
			for( var c=0; c<totalTargets; c++){				
				if(targetDivs[c].className.search('inviteForm') >= 0){
					if(targetDivs[c].className.search('hidden') >= 0){
						document.getElementById('sendInvite'+eventNum).style.display = "none";
						targetDivs[c].className = targetDivs[c].className.replace(new RegExp(" hidden\\b"), "");	
					} else {
						document.getElementById('sendInvite'+eventNum).style.display = "block";
						targetDivs[c].className += ' hidden';
					}
				}
			}
		}
	}
}

function inviteSend(eventNum, divID){
	inviteButton(eventNum, divID);
	var yName = document.getElementById('yName'+eventNum).value;
	var yAddress = document.getElementById('yAddress'+eventNum).value;
	var fAddress = document.getElementById('fAddress'+eventNum).value;	
	var url = default_url + "?page=eventInvite&yName=" + yName + "&yAddress=" + yAddress + "&fAddress=" + fAddress + "&eventNum=" + eventNum;
	url = url + "&sid=" + Math.random();	
	document.getElementById('yName'+eventNum).value = '';
	document.getElementById('yAddress'+eventNum).value = '';
	document.getElementById('fAddress'+eventNum).value = '';	
	if((http.readyState == 0) || (http.readyState == 4)){		
		http.open("GET", url, true); 
		http.onreadystatechange = handleHttpInviteSend;
		http.send(null);
	}	
}

function vendorInviteButton(objectNum, divID){
	var divList = document.getElementById(divID).getElementsByTagName('DIV');
	var totalDivs = divList.length;
	for( var i=0; i<totalDivs; i++){
		if(divList[i].className.search('vendor' + objectNum) >= 0){
			var targetDivs = divList[i].getElementsByTagName('DIV');
			var totalTargets = targetDivs.length;
			for( var c=0; c<totalTargets; c++){				
				if(targetDivs[c].className.search('inviteForm') >= 0){
					if(targetDivs[c].className.search('hidden') >= 0){
						document.getElementById('sendInvite'+objectNum).style.display = "none";
						targetDivs[c].className = targetDivs[c].className.replace(new RegExp(" hidden\\b"), "");	
					} else {
						document.getElementById('sendInvite'+objectNum).style.display = "block";
						targetDivs[c].className += ' hidden';
					}
				}
			}
		}
	}
}

function vendorInviteSend(objectNum, divID){
	vendorInviteButton(objectNum, divID);
	var yName = document.getElementById('yName'+objectNum).value;
	var yAddress = document.getElementById('yAddress'+objectNum).value;
	var fAddress = document.getElementById('fAddress'+objectNum).value;	
	var url = default_url + "?page=vendorInvite&yName=" + yName + "&yAddress=" + yAddress + "&fAddress=" + fAddress + "&vendorNum=" + objectNum;
	url = url + "&sid=" + Math.random();	
	document.getElementById('yName'+objectNum).value = '';
	document.getElementById('yAddress'+objectNum).value = '';
	document.getElementById('fAddress'+objectNum).value = '';	
	if((http.readyState == 0) || (http.readyState == 4)){		
		http.open("GET", url, true); 
		http.onreadystatechange = handleHttpInviteSend;
		http.send(null);
	}	
}

function handleHttpCalendarRotate(){
	if (http.readyState == 4) {		
		if ((http.status == 200)||(http.status == 0)) { 
			var response = http.responseText;
			var wrapper = document.getElementById('calWrapper');
			wrapper.innerHTML = response;			
		}
	}
}
function handleHttpInviteSend(){
	if (http.readyState == 4) {		
		if ((http.status == 200)||(http.status == 0)) { 
			var response = eval('('+ http.responseText +')');
			alert(response.error);
		}
	}
}
/* ]]> */// JavaScript Document