//init variables
var isRichText = false;
var rng;
var currentICQED;
var allICQEDs = "";

var isIE;
var isGecko;
var isSafari;
var isKonqueror;

var imagesPath;
var includesPath;
var cssFile;
var generateXHTML;

var lang = "en";
var encoding = "iso-8859-1";

var init_update = Array();
var icqed_edit_css;

// Initialise the editor object;
//initICQED("/include/icqed/img/", "/include/icqed/", "", true);


function initICQED(imgPath, incPath, css, genXHTML)
{
//	alert("yes");
	//set browser vars
	var ua = navigator.userAgent.toLowerCase();
	isIE = ((ua.indexOf("msie") != -1) && (ua.indexOf("opera") == -1) && (ua.indexOf("webtv") == -1)); 
	isGecko = (ua.indexOf("gecko") != -1);
	isSafari = (ua.indexOf("safari") != -1);
	isKonqueror = (ua.indexOf("konqueror") != -1);
	
	generateXHTML = genXHTML;
	
	//check to see if designMode mode is available
	//Safari/Konqueror think they are designMode capable even though they are not
	if (document.getElementById && document.designMode && !isSafari && !isKonqueror)
		isRichText = true;
	
	if (isIE) 
	{
		document.onmouseover = raiseButton;
		document.onmouseout  = normalButton;
		//document.onmousedown = lowerButton;
		//document.onmouseup   = raiseButton;
	}
	
	//set paths vars
	imagesPath = imgPath;
	includesPath = incPath;
	cssFile = css;
	icqed_edit_css = cssFile + 'icqed.css';
	if(cssFile)
		document.writeln('<style type="text/css">@import "' ../ICQ Blogs/blogs.icq.com/include/icqed/js/+ cssFile + 'icqed.css";</style>');
	else
		document.writeln('<style type="text/css">@import "' ../ICQ Blogs/blogs.icq.com/include/icqed/js/+ includesPath + 'icqed.css";</style>');
		
//	if (isRichText) 
//	document.writeln('<style type="text/css">@import "/groups/css/forums.css";</style>');
}

function create_ICQED(icqed, html, width, height, div_into, fld_id, noquote, no_img)
{
	if (isRichText) 
	{
		if (allICQEDs.length > 0) allICQEDs += ";";
		allICQEDs += icqed;
		
		
		//adjust minimum table widths
//		if (width < 540)
//		{
//			width = 540;
			if (isIE) 
				var tablewidth = width;
			else
				var tablewidth = width + 4;
//		}

		editor = '<table class="icqedBack" cellpadding="2" cellspacing="2" id="Buttons1_' + icqed + '" width="' + tablewidth + '">';
		editor += '	<tr>';
		editor += '		<td><img id="bold" class="icqedImage" src="../ICQ Blogs/blogs.icq.com/include/icqed/js/' + imagesPath + 'bold.gif" width="16" height="16" alt="Bold" title="Bold" onClick="icqedCommand(\'' + icqed + '\', \'bold\', \'\')"></td>';
		editor += '		<td><img class="icqedImage" src="../ICQ Blogs/blogs.icq.com/include/icqed/js/' + imagesPath + 'italic.gif" width="16" height="16" alt="Italic" title="Italic" onClick="icqedCommand(\'' + icqed + '\', \'italic\', \'\')"></td>';
		editor += '		<td><img class="icqedImage" src="../ICQ Blogs/blogs.icq.com/include/icqed/js/' + imagesPath + 'underline.gif" width="16" height="16" alt="Underline" title="Underline" onClick="icqedCommand(\'' + icqed + '\', \'underline\', \'\')"></td>';
		editor += '		<td><img class="icqedImage" src="../ICQ Blogs/blogs.icq.com/include/icqed/js/' + imagesPath + 'bullets.gif" width="16" height="16" alt="Unordered List" title="Unordered List" onClick="icqedCommand(\'' + icqed + '\', \'insertunorderedlist\', \'\')"></td>';
		if(!noquote){
			editor += '		<td><img class="icqedImage" src="../ICQ Blogs/blogs.icq.com/include/icqed/js/' + imagesPath + 'quote.gif" width="16" height="16" alt="Quote" title="Quote" onClick="dlgInsertQt(\'' + icqed + '\', \'indent\')"></td>';
		}
		editor += '		<td><img class="icqedVertSep" src="../ICQ Blogs/blogs.icq.com/include/icqed/js/' + imagesPath + 'brown_dot.gif" width="1" height="20" border="0" alt=""></td>';
		editor += '		<td><img class="icqedImage" src="../ICQ Blogs/blogs.icq.com/include/icqed/js/' + imagesPath + 'alignleft.gif" width="16" height="16" alt="Align Left" title="Align Left" onClick="icqedCommand(\'' + icqed + '\', \'justifyleft\', \'\')"></td>';
		editor += '		<td><img class="icqedImage" src="../ICQ Blogs/blogs.icq.com/include/icqed/js/' + imagesPath + 'aligncenter.gif" width="16" height="16" alt="Center" title="Center" onClick="icqedCommand(\'' + icqed + '\', \'justifycenter\', \'\')"></td>';
		editor += '		<td><img class="icqedImage" src="../ICQ Blogs/blogs.icq.com/include/icqed/js/' + imagesPath + 'alignright.gif" width="16" height="16" alt="Align Right" title="Align Right" onClick="icqedCommand(\'' + icqed + '\', \'justifyright\', \'\')"></td>';
		editor += '		<td><img class="icqedVertSep" src="../ICQ Blogs/blogs.icq.com/include/icqed/js/' + imagesPath + 'brown_dot.gif" width="1" height="20" border="0" alt=""></td>';
		editor += '		<td><div id="forecolor_' + icqed + '"><img class="icqedImage" src="../ICQ Blogs/blogs.icq.com/include/icqed/js/' + imagesPath + 'textcolor.gif" width="16" height="16" alt="Text Color" title="Text Color" onClick="dlgColorPalette(\'' + icqed + '\', \'forecolor\', \'\')"></div></td>';
		editor += '		<td><div id="hilitecolor_' + icqed + '"><img class="icqedImage" src="../ICQ Blogs/blogs.icq.com/include/icqed/js/' + imagesPath + 'highlights.gif" width="16" height="16" alt="Background Color" title="Background Color" onClick="dlgColorPalette(\'' + icqed + '\', \'hilitecolor\', \'\')"></div></td>';
		editor += '		<td><img class="icqedVertSep" src="../ICQ Blogs/blogs.icq.com/include/icqed/js/' + imagesPath + 'brown_dot.gif" width="1" height="20" border="0" alt=""></td>';
		editor += '		<td><img class="icqedImage" src="../ICQ Blogs/blogs.icq.com/include/icqed/js/' + imagesPath + 'addlink.gif" width="16" height="16" alt="Insert Link" title="Insert Link" onClick="dlgInsertLink(\'' + icqed + '\', \'link\')"></td>';
		if(!no_img)
		{
			editor += '		<td><img class="icqedImage" src="../ICQ Blogs/blogs.icq.com/include/icqed/js/' + imagesPath + 'addpicture.gif" width="16" height="16" alt="Insert Picture" title="Insert Picture" onClick="dlgInsertPic(\'' + icqed + '\', \'image\')"></td>';
		}
		editor += '		<td width="100%"></td>';
		editor += '	</tr>';
		editor += '</table>';
//		editor += '<iframe src="' + includesPath + 'blank.html" id="' + icqed + '" name="' + icqed + '" width="' + width + 'px" height="' + height + 'px" ></iframe>';
		editor += '<iframe id="' + icqed + '" name="' + icqed + '" width="' + width + 'px" height="' + height + 'px" frameborder="0" ></iframe>';
		editor += '<iframe width="154" height="104" id="cp' + icqed + '" src="' + includesPath + 'palette.html" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" style="visibility:hidden; position: absolute;border: 0px;"></iframe>';
		editor += '<input type="hidden" id="hdn' + icqed + '" name="' + fld_id + '" value="">';

//		editor += '<Input type="button" onclick="alert(document.getElementById(\''+div_into.id+'\').innerHTML)" value="test">';
//		alert(icqed);
//		div_into = document.createElement("div");

//		div_into.className = "icqedDiv";
		div_into.innerHTML = editor;

		document.getElementById('hdn' + icqed).value = html;
//		alert(document.getElementById('hdn' + icqed).value );
		
//		div_into.appendChild(editor_div);
//		alert('hdn' + icqed);
//		alert(document.getElementById('hdn' + icqed));
//		document.getElementById('hdn' + icqed).value = html;
//		enableDesignMode(icqed);
		setTimeout("enableDesignMode('"+ icqed+"');", 2);
	}
}

function enableDesignMode(icqed) 
{
//	alert(icqed);
	var readOnly = false;
	var html = document.getElementById("hdn" + icqed).value;
	var iframe_html = "<html id=\"" + icqed + "\">\n";
	iframe_html += "<head>\n";
	// to reference your stylesheet, set href property below to your stylesheet path and uncomment
//	iframe_html += "<link type=\"text/css\" href=../ICQ Blogs/blogs.icq.com/include/icqed/js//""+icqed_edit_css+"/" rel=\"stylesheet\" />\n";
	iframe_html += '<meta http-equiv="content-type" content="text/html; charset=UTF-8">';
	iframe_html += '<style type="text/css">@import "'../ICQ Blogs/blogs.icq.com/include/icqed/js/+icqed_edit_css+'";</style>';
	iframe_html += "<style type=\"text/css\">";	
	iframe_html += "body{background:#fff;font-family: verdana, tahoma, sans-serif; font-size: 11px; margin:5px}\n";	
	iframe_html += "p{margin: 0px;}\n";
	iframe_html += "a{color: #449722;}\n";	
	iframe_html += "</style>";
 
 //	iframe_html += "<link media=\"all\" type=\"text/css\" href=../ICQ Blogs/blogs.icq.com/include/icqed/js//"/groups/css/forums.css/" rel=\"stylesheet\">\n";
	
	html_parsed = parse_html_body(html);

	iframe_html += "</head>\n";
	iframe_html += "<body>\n";
	iframe_html += html_parsed + "\n";
	iframe_html += "</body>\n";
	iframe_html += "</html>";

	if (document.all) 
	{

		var oICQED = frames[icqed].document;
		oICQED.open();
		oICQED.write(iframe_html);
		oICQED.close();
		oICQED.designMode = "On";
		frames[icqed].document.attachEvent("onkeyup", function evt_ie_keypress(event) {ieKeyPress(event, icqed);});
//		frames[icqed].document.attachEvent("onkeydown", function evt_ie_keydown(event) {return ieKeyDown(event, icqed);});
//		frames[icqed].attachEvent("onblur", function evt_ie_onblur(event) {updateICQED(icqed);});
		frames[icqed].attachEvent("onload", function evt_ie_onload(event) {ieLoad(event,icqed);});
//		frames[icqed].document.focus();
		
//		frames[icqed].document.onblur = "updateICQED(icqed)";
	} 
	else
	{
		try 
		{	
//			alert(document.getElementById(icqed).contentDocument.designMode);
			document.getElementById(icqed).contentDocument.designMode = "on";
//			alert(document.getElementById(icqed).contentDocument.designMode);
			try 
			{
				var oICQED = document.getElementById(icqed).contentWindow.document;
//				alert(oICQED);
				oICQED.open();
				oICQED.write(iframe_html);
				oICQED.close();
				oICQED.id = icqed;
				if (isGecko)
				{
					oICQED.addEventListener("keypress", geckoKeyPress, true);
//					oICQED.addEventListener("focus", geckoFocus, true);
					
					updateICQED(icqed);
//					oICQED.addEventListener("blur", geckoBlur, false);
				}
			} 
			catch (e) {}
		}
		catch (e)
		{
			//gecko may take some time to enable design mode.
			//Keep looping until able to set.
//			alert(icqed);
			if (isGecko){
				// Hidden because firefox complained that html isn't defined - the orginal call to the function is without html (lee)
				//setTimeout("enableDesignMode('"+ icqed +"' , html );", 2000);
				if (window['wys_disabled_loop']==undefined)
					setTimeout("enableDesignMode('"+ icqed+"');", 200);
			}
			else
				return false;
		}
	}
}

function parse_html_body(html)
//	var ret = html.replace('/[quote 
{
	return html;
}

function updateICQED(icqed)
{
	if (isRichText)
		setHiddenVal(icqed);
}

function setHiddenVal(icqed)
{

	//set hidden form field value for current icqed
	var obj_hdn = document.getElementById('hdn' + icqed);
	var upd_val = false;
	//convert html output to xhtml
//	if (obj_hdn.value == null) 
//		obj_hdn.value = "";
	if (document.all)
	{
		if (generateXHTML)
			upd_val = get_xhtml(frames[icqed].document.body, lang, encoding);
		else
			upd_val = frames[icqed].document.body.innerHTML;
	}
	else
	{
		if (generateXHTML)
			upd_val = get_xhtml(document.getElementById(icqed).contentWindow.document.body, lang, encoding);
		else
			upd_val = document.getElementById(icqed).contentWindow.document.body.innerHTML;
	}
	
	//if there is no content (other than formatting) set value to nothing
//	if (stripHTML(obj_hdn.value.replace(" ", " ")) == "" && obj_hdn.value.toLowerCase().search("<hr") == -1 && obj_hdn.value.toLowerCase().search("<img") == -1)
//		upd_val = "";
//	alert(upd_val);
	if(upd_val)
		obj_hdn.value = upd_val;
}

function updateICQEDs()
{
	var vICQEDs = allICQEDs.split(";");

	for (var i = 0; i < vICQEDs.length; i++)
	{
		updateICQED(vICQEDs[i]);
	}
}

function icqedCommand(icqed, command, option)
{
	//function to perform command
	var oICQED;
	if (document.all)
		oICQED = frames[icqed];
	else
		oICQED = document.getElementById(icqed).contentWindow;
	
	try
	{
		oICQED.focus();
	  	oICQED.document.execCommand(command, false, option);
		oICQED.focus();
	}
	catch (e)
	{
	}
}

function dlgColorPalette(icqed, command) 
{
	//function to display or hide color palettes
	setRange(icqed);
	
	//get dialog position
	var oDialog = document.getElementById('cp' + icqed);
	var buttonElement = document.getElementById(command + '_' + icqed);
	var iLeftPos = getOffsetLeft(buttonElement) - 60;
	var iTopPos = getOffsetTop(buttonElement) + (buttonElement.offsetHeight + 4);
	oDialog.style.left = (iLeftPos) + "px";
	oDialog.style.top = (iTopPos) + "px";
	
	if ((command == parent.command) && (icqed == currentICQED))
	{
		//if current command dialog is currently open, close it
		if (oDialog.style.visibility == "hidden") 
			showHideElement(oDialog, 'show');
		else
			showHideElement(oDialog, 'hide');
	}
	else
	{
		//if opening a new dialog, close all others
		var vICQEDs = allICQEDs.split(";");
		for (var i = 0; i < vICQEDs.length; i++)
		{
			showHideElement('cp' + vICQEDs[i], 'hide');
		}
		showHideElement(oDialog, 'show');
	}
	
	//save current values
	parent.command = command;
	currentICQED = icqed;
}

function dlgInsertPic(icqed, command) 
{
	//function to open/close insert table dialog
	//save current values
	parent.command = command;
	currentICQED = icqed;
	var url = includesPath + 'insert_pic.php?img_prefix='+(window.wys_img_prefix ? wys_img_prefix : 'wyswyg')+'&img_width='+(window.wys_img_width ? wys_img_width : 0)+'&referer='+escape(location.href);
	InsertLink = popUpWin(url, 'InsertPicture', 400, 200, 'resizable=yes,scrollbars=no,');
}

function dlgInsertLink(icqed, command) 
{
	//function to open/close insert table dialog
	//save current values
	parent.command = command;
	currentICQED = icqed;
	InsertLink = popUpWin(includesPath + 'insert_link.php?referer='+escape(location.href), 'InsertLink', 360, 130, '');
	
	//get currently highlighted text and set link text value
	setRange(icqed);
	var linkText = '';
	if (isIE) 
		linkText = stripHTML(rng.htmlText);
	else
		linkText = stripHTML(rng.toString());

	setLinkText(linkText);
}

function setLinkText(linkText)
{
	//set link text value in insert link dialog
	try 
	{
		window.InsertLink.document.linkForm.linkText.value = linkText;
	}
	catch (e)
	{
		//may take some time to create dialog window.
		//Keep looping until able to set.
		setTimeout("setLinkText('" + linkText + "');", 10);
	}
}

function dlgInsertQt(icqed, command) 
{
	//function to open/close insert table dialog
	//save current values
	parent.command = command;
	currentICQED = icqed;
	InsertQt = popUpWin(includesPath + 'insert_qt.php?referer='+escape(location.href), 'InsertQt', 360, 240, '');
	
	//get currently highlighted text and set link text value
	setRange(icqed);
	var qtText = '';
	if (isIE) 
		qtText = stripHTML(rng.htmlText);
	else
		qtText = stripHTML(rng.toString());
	setQtText(qtText);
}

function setQtText(qtText)
{
	//set link text value in insert link dialog
	try 
	{
		window.InsertQt.document.qtForm.qtText.value = qtText;
	}
	catch (e)
	{
		//may take some time to create dialog window.
		//Keep looping until able to set.
		setTimeout("setQtText('" + qtText + "');", 10);
	}
}

function popUpWin (url, win, width, height, options)
{
	var leftPos = (screen.availWidth - width) / 2;
	var topPos = (screen.availHeight - height) / 2;
	options += 'width=' + width + ',height=' + height + ',left=' + leftPos + ',top=' + topPos;
	return window.open(url, win, options);
}

function setColor(color)
{
	//function to set color
	var icqed = currentICQED;
	var parentCommand = parent.command;
	
	if (document.all)
	{
		if (parentCommand == "hilitecolor") parentCommand = "backcolor";
		//retrieve selected range
		rng.select();
	}
	
	icqedCommand(icqed, parentCommand, color);
	showHideElement('cp' + icqed, "hide");
}


function getOffsetTop(elm)
{
	var mOffsetTop = elm.offsetTop;
	var mOffsetParent = elm.offsetParent;
	var parents_up = 2; //the positioning div is 2 elements up the tree
	
	while(parents_up > 0) 
	{
		mOffsetTop += mOffsetParent.offsetTop;
		mOffsetParent = mOffsetParent.offsetParent;
		parents_up--;
	}
	
	return mOffsetTop;
}

function getOffsetLeft(elm)
{
	var mOffsetLeft = elm.offsetLeft;
	var mOffsetParent = elm.offsetParent;
	var parents_up = 2;
	
	while(parents_up > 0)
	{
		mOffsetLeft += mOffsetParent.offsetLeft;
		mOffsetParent = mOffsetParent.offsetParent;
		parents_up--;
	}
	
	return mOffsetLeft;
}

function selectFont(icqed, selectname)
{
	//function to handle font changes
	var idx = document.getElementById(selectname).selectedIndex;
	// First one is always a label
	if (idx != 0) 
	{
		var selected = document.getElementById(selectname).options[idx].value;
		var cmd = selectname.replace('_' + icqed, '');
		icqedCommand(icqed, cmd, selected);
		document.getElementById(selectname).selectedIndex = 0;
	}
}

function insertHTML(html)
{
	//function to add HTML
	var icqed = currentICQED;
	
	var oICQED;
	if (document.all)
		oICQED = frames[icqed];
	else
		oICQED = document.getElementById(icqed).contentWindow;
	
	oICQED.focus();
	if (document.all) 
	{
		var oRng = oICQED.document.selection.createRange();
		oRng.pasteHTML(html);
		oRng.collapse(false);
		oRng.select();
	}
	else
		oICQED.document.execCommand('insertHTML', false, html);
}

function showHideElement(element, showHide)
{
	//function to show or hide elements
	//element variable can be string or object
	if (document.getElementById(element)) 
		element = document.getElementById(element);
	
	if (showHide == "show") 
	{
		element.style.visibility = "visible";
	}
	else if (showHide == "hide") 
	{
		element.style.visibility = "hidden";
	}
}

function setRange(icqed) {
	//function to store range of current selection
	var oICQED;
	if (document.all) {
		oICQED = frames[icqed];
		var selection = oICQED.document.selection; 
		if (selection != null) rng = selection.createRange();
	} else {
		oICQED = document.getElementById(icqed).contentWindow;
		var selection = oICQED.getSelection();
		rng = selection.getRangeAt(selection.rangeCount - 1).cloneRange();
	}
	return rng;
}

function stripHTML(oldString)
{
	//function to strip all html
	var newString = oldString.replace(/(<([^>]+)>)/ig,"");
	
	//replace carriage returns and line feeds
   newString = newString.replace(/\r\n/g," ");
   newString = newString.replace(/\n/g," ");
   newString = newString.replace(/\r/g," ");
	
	//trim string
	newString = trim(newString);
	
	return newString;
}

function trim(inputString)
{
   // Removes leading and trailing spaces from the passed string. Also removes
   // consecutive spaces and replaces it with one space. If something besides
   // a string is passed in (null, custom object, etc.) then return the input.
   if (typeof inputString != "string") return inputString;
   var retValue = inputString;
   var ch = retValue.substring(0, 1);
	
   while (ch == " ")  // Check for spaces at the beginning of the string
   {
      retValue = retValue.substring(1, retValue.length);
      ch = retValue.substring(0, 1);
   }
   ch = retValue.substring(retValue.length - 1, retValue.length);
	
   while (ch == " ")  // Check for spaces at the end of the string
   {
      retValue = retValue.substring(0, retValue.length - 1);
      ch = retValue.substring(retValue.length - 1, retValue.length);
   }
	
	// Note that there are two spaces in the string - look for multiple spaces within the string
   while (retValue.indexOf("  ") != -1) // Again, there are two spaces in each of the strings
   {
      retValue = retValue.substring(0, retValue.indexOf("  ")) + retValue.substring(retValue.indexOf("  ") + 1, retValue.length);
   }

   return retValue; // Return the trimmed string back to the user
}

//********************
//Gecko-Only Functions
//********************
function geckoBlur(evt)
{
	var icqed = evt.target.id;
//	alert(icqed);
	updateICQED(icqed);
}

function geckoFocus(evt)
{
	var icqed = evt.target.id;
	if(!init_update[icqed])
	{
		updateICQED(icqed);
		document.getElementById(icqed).focus();
		init_update[icqed] = 1;
	}
}

function geckoKeyPress(evt) {
	//function to add bold, italic, and underline shortcut commands to gecko ICQEDs
	var icqed = evt.target.id;
//	alert(icqed);
	if (evt.ctrlKey) 
	{
		var key = String.fromCharCode(evt.charCode).toLowerCase();
		var cmd = '';
		switch (key) 
		{
			case 'b':
				cmd = "bold";
			break;
			case 'i':
				cmd = "italic";
			break;
			case 'u':
				cmd = "underline";
			break;
			case 'q':
				cmd = 'quote';
			break;
		};

		if (cmd) 
		{
			icqedCommand(icqed, cmd, null);
			// stop the event bubble
			evt.preventDefault();
			evt.stopPropagation();
		}
 	}
}

//*****************
//IE-Only Functions
//*****************
function ieKeyPress(evt, icqed)
{
	var key = (evt.which || evt.charCode || evt.keyCode);
	var stringKey = String.fromCharCode(key).toLowerCase();
}
function iePaste(evt, icqed)
{
	var key = evt.getData();
	alert(key);
	return;
	var stringKey = String.fromCharCode(key).toLowerCase();
	if(key == 188 || key == 190)
		return false;
	
//	updateICQED(icqed.id);
}

function ieKeyDown(evt, icqed)
{
	var key = (evt.which || evt.charCode || evt.keyCode);
	var stringKey = String.fromCharCode(key).toLowerCase();
	if(key == 188 || key == 190)
		return false;
	
//	updateICQED(icqed.id);
}

function raiseButton(e)
{
	var el = window.event.srcElement;
	
	className = el.className;
	if (className == 'icqedImage' || className == 'icqedImageLowered')
	{
		el.className = 'icqedImageRaised';
	}
}

function normalButton(e)
{
	var el = window.event.srcElement;
	
	className = el.className;
	if (className == 'icqedImageRaised' || className == 'icqedImageLowered')
	{
		el.className = 'icqedImage';
	}
}

function lowerButton(e)
{
	var el = window.event.srcElement;
	
	className = el.className;
	if (className == 'icqedImage' || className == 'icqedImageRaised')
	{
		el.className = 'icqedImageLowered';
	}
}

function ieLoad(evt, icqed)
{
	if(!init_update[icqed])
	{
		
		updateICQED(icqed);
//		document.getElementById(icqed).focus();
		init_update[icqed] = 1;
	}
}
