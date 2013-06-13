// JavaScript Document


//ACCORDION SECTION
var accordionNumber = 1;
var ContentHeight = 216;
var TimeToSlide = 250.0;

var EXPANDED = "ArrowExpanded";
var COLLAPSED = "ArrowCollapsed";

//var openAccordion = 'Accordion1Content';

function runAccordion(index)
{
	//accordionNumber = index;
	if( accordionNumber!=index ){
		 // var nID = "Accordion" + index + "Content";
		 // if(openAccordion == nID)
		//	nID = '';
		   
		  setTimeout("animate("
			  + new Date().getTime() + "," + TimeToSlide + ","
			  + accordionNumber + "," + index + ")", 33);
		 
		  //openAccordion = nID;
		  
		  accordionNumber = index;
	}
}



function animate(lastTick, timeLeft, closingId, openingId)
{ 
  var curTick = new Date().getTime();
  var elapsedTicks = curTick - lastTick;
 
  var openingContent = (openingId == Number.NaN) ?
      null : document.getElementById("Accordion" + openingId + "Content");
  var closingContent = (closingId == Number.NaN) ?
      null : document.getElementById("Accordion" + closingId + "Content");
 
  if(timeLeft <= elapsedTicks)
  {
		var openingTitle = (openingId == Number.NaN) ?
      		null : document.getElementById("AccordionArrow" + openingId);
	  	var closingTitle = (closingId == Number.NaN) ?
      		null : document.getElementById("AccordionArrow" + closingId);
	  
		if(openingContent != null) {
		  openingContent.style.height = ContentHeight + 'px';
		  
		  openingTitle.className = EXPANDED;
		}
	   
		if(closingContent != null)
		{
		  closingContent.style.display = 'none';
		  closingContent.style.height = '0px';
		  
		  closingTitle.className = COLLAPSED;
		}
		return;
  }
 
  timeLeft -= elapsedTicks;
  var newClosedHeight =
      Math.round((timeLeft/TimeToSlide) * ContentHeight);

  if(openingContent != null)
  {
    if(openingContent.style.display != 'block')
      openingContent.style.display = 'block';
    openingContent.style.height =
        (ContentHeight - newClosedHeight) + 'px';
  }
 
  if(closingContent != null)
    closingContent.style.height = newClosedHeight + 'px';

  setTimeout("animate(" + curTick + "," + timeLeft + ","
      + closingId + "," + openingId + ")", 33);
}



// END ACCORDION SECTION
