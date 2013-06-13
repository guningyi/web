function requestObject()
{
  var xmlhttp, bComplete = false;
  try { xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); }
  catch (e) { try { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); }
  catch (e) { try { xmlhttp = new XMLHttpRequest(); }
  catch (e) { xmlhttp = false; }}}
  if (!xmlhttp) return null;
  this.connect = function(sURL, sMethod, sVars, fnDone)
  {
    if (!xmlhttp) return false;
    bComplete = false;
    sMethod = sMethod.toUpperCase();

    try {
      if (sMethod == "GET")
      {
        xmlhttp.open(sMethod, sURL+"?"+sVars, true);
        sVars = "";
      }
      else
      {
        xmlhttp.open(sMethod, sURL, true);
        xmlhttp.setRequestHeader("Method", "POST "+sURL+" HTTP/1.1");
        xmlhttp.setRequestHeader("Content-Type",
          "application/x-www-form-urlencoded");
      }
      xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && !bComplete)
        {
          bComplete = true;
          fnDone(xmlhttp);
        }};
      xmlhttp.send(sVars);
    }
    catch(z) { return false; }
    return true;
  };
  return this;
}

document.getElementsByClassName = function(searchClass, node, tag)
{  
	if(node == null) node = document;
	var ce = new Array();
	
	if(tag == null || tag == '*') tag = '*';
	var els = new Array();
	
	if (tag == '*' && document.evaluate)
	{
		var xpr = document.evaluate("//*", document, null, 0, null);
		var t = true;
		while (t=xpr.iterateNext())
		{
			if(els.push)
			els.push(t);
		else
			els[els.length]=t;
		}; 
	}
	else
	{
		els = node.getElementsByTagName(tag);
	}
	
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	var i; var j;
	
	for (i = 0, j = 0; i < elsLen; i++)
	{
		if ( pattern.test(els[i].className) )
		if (ce.push)
			ce.push(els[i]);
		else
			ce[j++] = els[i];
	}
	
	return ce;
}

function getNodeValue(tree, el)
{
	return tree.getElementsByTagName(el)[0].firstChild.nodeValue;
}

var myRequestObject = new requestObject();

if(!myRequestObject)
{
	// browser can't handle AJAX
	showMessage("Your browser cannot handle AJAX.  Please upgrade.");
}

function rate(rating, designID)
{

	rating = parseInt(rating);
	if(rating != 1 && rating != 2 && rating != 3 && rating != 4 && rating != 5)
	{
		return false;
	}
	
	designID = parseInt(designID);
	if(!isFinite(designID))
	{
		return false;
	}
	
	myRequestObject.connect("/ajax/rate/index.php", "POST", "rating=" + rating + "&" + "designID=" + designID,
		function(xml)
		{

			status = getNodeValue(xml.responseXML, "status");

			if(status == "ok")
			{
			
				var designBlock = document.getElementById("id" + designID);
				var widthOfStar = 16;
				var paddingBetweenStars = 4;
				
				// updating the rating sample by incrementing the current one shown on the page
				var ratingSampleElements = document.getElementsByClassName("rsample", designBlock, "div");
				if(ratingSampleElements[0].innerHTML == "Not Yet Rated")
				{
					var currentRatingSample = 0;
				}
				else
				{
					var currentRatingSample = parseInt( (ratingSampleElements[0].innerHTML).match(/\b\d+\b/) );
				}
				var newRatingSample = currentRatingSample + 1;
				var tmp = "from " + newRatingSample;
				if(newRatingSample == 1)
				{
					tmp = tmp + " Rating";
				}
				else
				{
					tmp = tmp + " Ratings";
				}
				ratingSampleElements[0].innerHTML = tmp;

				// grabbing the current rating shown on the page
				var ratingElements = document.getElementsByClassName("rcurrent", designBlock, "li");
				var currentRating = parseFloat( (ratingElements[0].innerHTML).match(/(\d\.\d+)|(\d)/) );

				// calculating new rating
				var newRating = ( (currentRating * currentRatingSample) + rating) / newRatingSample;
				newRating = newRating.toFixed(2);
				
				// updating pixel width of stars
				var ratingWidth = parseInt( (parseInt(newRating) * paddingBetweenStars) + (newRating * widthOfStar) );
				ratingElements[0].style.width = ratingWidth + "px";

				// hiding stars so user is unable to vote again
				var tmpArray = new Array();
				tmpArray.push(designID);
				disableRatings(tmpArray);
				
			}
			
			if(status == "unauthorized")
			{
				showMessage("You must have an account to rate designs.  <a href=\"http://www.oswd.org/user/registration/\">Sign-Up</a> or <a href=\"http://www.oswd.org/\">Login</a>.");
			}
		}
	);
	
	return false;
	
}

function favorite(designID)
{

	designID = parseInt(designID);
	if(!isFinite(designID))
	{
		return false;
	}
	
	myRequestObject.connect("/ajax/favorite/index.php", "POST", "designID=" + designID,
		function(xml)
		{
			status = getNodeValue(xml.responseXML, "status");

			if(status == "added")
			{
				var designBlock = document.getElementById("id" + designID);
				var favoriteLinkElements = document.getElementsByClassName("dpfavorite", designBlock, "a");
				var favoriteElements = document.getElementsByClassName("add", designBlock, "span");
				favoriteElements[0].className = "remove";
				favoriteElements[0].innerHTML = "Remove from Favorites";
				favoriteLinkElements[0].title = "Remove from Favorites";
			}
			else if(status == "removed")
			{
				var designBlock = document.getElementById("id" + designID);
				var favoriteLinkElements = document.getElementsByClassName("dpfavorite", designBlock, "a");
				var favoriteElements = document.getElementsByClassName("remove", designBlock, "span");
				favoriteElements[0].className = "add";
				favoriteElements[0].innerHTML = "Add to Favorites";
				favoriteLinkElements[0].title = "Add to Favorites";
			}
		}
	);

	return false;

}


/*
function addLoadEvent(func)
{	
	var oldonload = window.onload;
	if (typeof window.onload != 'function')
	{
		alert("yes");
		window.onload = func;
	} 
	else
	{
		window.onload = function()
		{
			oldonload();
			func();
		}
	}
}
*/

function disableRatings(designArray)
{
	
	if(designArray.length == 0) { return false; }
	
	var designBlock;
	var ratingBlocks;
	var ratingStars;

	for(i = 0; i < designArray.length; i++)
	{
		designBlock = document.getElementById("id" + designArray[i]);	
		ratingBlocks = document.getElementsByClassName("rating", designBlock, "div");
		ratingStars = ratingBlocks[0].getElementsByTagName("li");
		for(p = 0; p < ratingStars.length; p++)
		{
			if(ratingStars.item(p).className != "rcurrent")
			{
				ratingStars[p].style.display = "none";
			}
		}
	}

}

function toggleDesignFavorites(designArray)
{
	if(designArray.length == 0) { return false; }
	
	var designBlock;
	var favoriteLinkElements;
	var favoriteElements;

	for(i = 0; i < designArray.length; i++)
	{
		designBlock = document.getElementById("id" + designArray[i]);
		favoriteLinkElements = document.getElementsByClassName("dpfavorite", designBlock, "a");
		favoriteElements = document.getElementsByClassName("add", designBlock, "span");
		favoriteElements[0].className = "remove";
		favoriteElements[0].innerHTML = "Remove from Favorites";
		favoriteLinkElements[0].title = "Remove from Favorites";
	}
}
