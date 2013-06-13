function zebraTable(){
var zeb_tables= getElementsByClassName("data-table", "table", document);

for (i=0;i<zeb_tables.length; i=i+1){
		var zeb_rows = zeb_tables[i].getElementsByTagName("tr");

		for (j=1;j<zeb_rows.length; j=j+2){
			zeb_rows[j].className="odd";
		}}}

function zebraLists(){
var zeb_lists= getElementsByClassName("events-list", "ul", document);

for (k=0;k<zeb_lists.length; k=k+1){
		var zeb_lis = zeb_lists[k].getElementsByTagName("li");

		for (l=1;l<zeb_lis.length; l=l+2){
			zeb_lis[l].className="odd";
		}}}

function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}	
	}
	return returnElements;
}

function addLoadEvent(func)
{	
	var oldonload = window.onload;
	if (typeof window.onload != 'function'){
    	window.onload = func;
	} else {
		window.onload = function(){
		oldonload();
		func();
		}}}
		




addLoadEvent(zebraTable);	
addLoadEvent(zebraLists);	
addLoadEvent(getElementsByClassName);	


function addEventX(element, eventType, lamdaFunction, useCapture) {
 if (element.addEventListener) {
 element.addEventListener(eventType, lamdaFunction, useCapture);
 return true;
 } else if (element.attachEvent) {
 var r = element.attachEvent('on' + eventType, lamdaFunction);
 return r;
 } else {
 return false;
 }
}

addEventX(window, 'load', clearFormFields, false);	
	
function clearFormFields() {
    var formInputs = document.getElementsByTagName('input');
    for (var i = 0; i < formInputs.length; i++) {
        var theInput = formInputs[i];
        
        if (theInput.type == 'text' && theInput.className.match(/\bcleardefault\b/)) {  
            /* Add event handlers */          
            addEventX(theInput, 'focus', clearDefaultText, false);
            addEventX(theInput, 'blur', replaceDefaultText, false);
            /* Save the current value */
            if (theInput.value != '') {
                theInput.defaultText = theInput.value;
            }
        }
    }
}

function clearDefaultText(e) {
    var target = window.event ? window.event.srcElement : e ? e.target : null;
    if (!target) return;
    
    if (target.value == target.defaultText) {
        target.value = '';
    }
}

function replaceDefaultText(e) {
    var target = window.event ? window.event.srcElement : e ? e.target : null;
    if (!target) return;
    
    if (target.value == '' && target.defaultText) {
        target.value = target.defaultText;
    }
}
	
