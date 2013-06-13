function getPageSize(){
	
	var xScroll, yScroll;
	
	if (window.innerHeight && window.scrollMaxY)
	{	
		xScroll = document.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	}
	else if (document.body.scrollHeight > document.body.offsetHeight)
	{
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	}
	else
	{
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	
	var windowWidth, windowHeight;
	if (self.innerHeight)
	{
		windowWidth = self.innerWidth;
		windowHeight = self.innerHeight;
	}
	else if (document.documentElement && document.documentElement.clientHeight)
	{
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	}
	else if (document.body)
	{
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}	
	
	if(yScroll < windowHeight)
	{
		pageHeight = windowHeight;
	}
	else
	{ 
		pageHeight = yScroll;
	}

	if(xScroll < windowWidth)
	{	
		pageWidth = windowWidth;
	}
	else
	{
		pageWidth = xScroll;
	}


	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight) 
	return arrayPageSize;
}

function selectBoxVisibility(visibility)
{
    selects = document.getElementsByTagName('select');
    for(i = 0; i < selects.length; i++)
	{
        selects[i].style.visibility = visibility;
    }
}

function browserIsIE()
{
	var agent = navigator.userAgent.toLowerCase();
	if(agent.indexOf("msie") < 0)
	{
		return false;
	}
	else
	{
		return true;
	}
}

function prepareIE(height, overflow)
{
	bod = document.getElementsByTagName('body')[0];
	bod.style.height = height;
	bod.style.overflow = overflow;
 
	htm = document.getElementsByTagName('html')[0];
	htm.style.height = height;
	htm.style.overflow = overflow; 
}

function getPageScroll()
{

	var yScroll;

	if (self.pageYOffset)
	{
		yScroll = self.pageYOffset;
	}
	else if (document.documentElement && document.documentElement.scrollTop)
	{
		yScroll = document.documentElement.scrollTop;
	}
	else if (document.body)
	{
		yScroll = document.body.scrollTop;
	}

	arrayPageScroll = new Array('',yScroll) 
	return arrayPageScroll;
}

function position()
{

	var objMessage = document.getElementById("message");
	var arrayPageScroll = getPageScroll();
	var arrayPageSize = getPageSize();
	var messageTop = arrayPageScroll[1] + ( (arrayPageSize[3] - objMessage.offsetHeight) / 2 );
	var messageLeft = (arrayPageSize[0] - 20 - objMessage.offsetWidth) / 2;
	

	
	objMessage.style.top = (messageTop < 0) ? "0px" : messageTop + "px";
	objMessage.style.left = (messageLeft < 0) ? "0px" : messageLeft + "px";
	
};

function showMessage(message)
{
	var objBody = document.getElementsByTagName("body").item(0);
	
	var objOverlay = document.createElement("div");
	objOverlay.setAttribute('id','overlay');
	objOverlay.onclick = function () { hideMessage(); return false; }
	objOverlay.setAttribute("title", "Click anywhere to close this message.");
	objBody.insertBefore(objOverlay, objBody.firstChild);
	
	var arrayPageSize = getPageSize();
	
	if(browserIsIE())
	{
		selectBoxVisibility("hidden");
	}
	
	objOverlay.style.height = (arrayPageSize[1] + 'px');
	objOverlay.style.display = 'block';

	var objMessage = document.createElement("div");
	objMessage.setAttribute('id','message');
	objMessage.style.display = "block";
	objMessage.style.visibility = "hidden";
	objMessage.style.position = 'absolute';
	objMessage.style.zIndex = '5001';
	objBody.insertBefore(objMessage, objOverlay.nextSibling);
	
	var objContent = document.createElement("div");
	objContent.setAttribute("id", "messagecontent");
	objContent.innerHTML = message;
	for (i=0;i<objContent.getElementsByTagName("a").length; i++)
	{
		objContent.getElementsByTagName("a").item(i).onclick = function () { hideMessage(); }
	}
	objMessage.appendChild(objContent);

	var objLink = document.createElement("a");
	objLink.setAttribute('id','close');
	objLink.setAttribute('href','#');
	objLink.setAttribute('title','Click to close this message.');
	objLink.onclick = function () {hideMessage(); return false;}
	objMessage.appendChild(objLink);
	
	var objImage = document.createElement("img");
	objImage.setAttribute('src', '/img/close_message.gif');
	objLink.appendChild(objImage);
	
	var arrayPageScroll = getPageScroll();
	
	var messageTop = arrayPageScroll[1] + ((arrayPageSize[3] - objMessage.offsetHeight) / 2);
	var messageLeft = (arrayPageSize[0] - 20 - objMessage.offsetWidth) / 2;

	objMessage.style.top = (messageTop < 0) ? "0px" : messageTop + "px";
	objMessage.style.left = (messageLeft < 0) ? "0px" : messageLeft + "px";
	
	objMessage.style.visibility = "visible";
	
	window.onresize = function() { position(); };
	window.onscroll = function() { position(); };
	
}

function hideMessage()
{
	objOverlay = document.getElementById('overlay');
	objMessage = document.getElementById('message');

	objOverlay.style.display = "none";
	objMessage.style.display = "none";
	objMessage.style.visibility = "hidden";

	if(browserIsIE())
	{
		selectBoxVisibility("visible");
	}
}
