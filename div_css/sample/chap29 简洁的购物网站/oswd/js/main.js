function show(elementid) {
	for (i=0;i<document.getElementById(elementid).getElementsByTagName("div").length; i++) {
		if (document.getElementById(elementid).getElementsByTagName("div").item(i).className == "dinfo"){
			document.getElementById(elementid).getElementsByTagName("div").item(i).style.display = "block";
		}
	}
	for (i=0;i<document.getElementById(elementid).getElementsByTagName("div").length; i++) {
		if (document.getElementById(elementid).getElementsByTagName("div").item(i).className == "dimg"){
			document.getElementById(elementid).getElementsByTagName("div").item(i).style.display = "none";
		}
	}
}

function hide(elementid) {
	for (i=0;i<document.getElementById(elementid).getElementsByTagName("div").length; i++) {
		if (document.getElementById(elementid).getElementsByTagName("div").item(i).className == "dinfo"){
			document.getElementById(elementid).getElementsByTagName("div").item(i).style.display = "none";
		}
	}
	for (i=0;i<document.getElementById(elementid).getElementsByTagName("div").length; i++) {
		if (document.getElementById(elementid).getElementsByTagName("div").item(i).className == "dimg"){
			document.getElementById(elementid).getElementsByTagName("div").item(i).style.display = "block";
		}
	}
}

function p(title, summary) {
	document.getElementById('summary').innerHTML = "<h3>" + title + "</h3><p>" + summary + "</p>";
}

/*
	@obj doublecheck
	@desc This provides a JavaScript object that allows form-submission regular expression checking.
	@version 1.0.1
	@author Brian Legrow <brian@legrow.net>
	@legal For information on reproducing this script, please contact the author.  This script may not be used without the author's consent.
*/

function doublecheck()
{
	this.elements = new Array();

	this.validate = 
		function() {
			var rV = true;
			var errorArray = new Array();
			for(i in this.elements)
			{
				var validation = private_validateElement(this.elements[i]);
				if (!(validation[private_getValidationIndex("success")]))
				{
					errorArray.push(validation[private_getValidationIndex("error")]);
					rV = false;
				}
			}
			if (!rV)
				alert(errorArray.join("\n"));
			return rV;
		};

	this.addElement =
		function(id, regex, error) {
			this.elements.push(private_createElement(id, regex, error));
		};

	function private_validateElement(arr)
	{
		if (arr[private_getPropertyIndex("regex")] == "")
			return new Array(true, "");
		var el = document.getElementById(arr[private_getPropertyIndex("id")]);
		var reg = new RegExp(arr[private_getPropertyIndex("regex")]);
		var err = arr[private_getPropertyIndex("error")];
		var val = el.value;
		var rV = val.match(reg);
		return new Array(rV, err);
	}

	function private_createElement(id, regex, error)
	{
		if (!regex) regex = "";
		if (!error) error = "There was some problem with the '" + id + "' field.";
		return new Array(id, regex, error)
	}

	function private_getPropertyIndex(name)
	{
		if (name == "id")
			return 0;
		else if (name == "regex")
			return 1;
		else if (name == "error")
			return 2;
		else
			return -1;
	}

	function private_getValidationIndex(name)
	{
		if (name == "success")
			return 0;
		else if (name == "error")
			return 1;
		else
			return -1;
	}
}


function hasClass(obj) {
	var result = false;
	if (obj.getAttributeNode("class") != null) {
		result = obj.getAttributeNode("class").value;
	}
	return result;
}   

function stripe(id) {

	// the flag we'll use to keep track of 
	// whether the current row is odd or even
    var even = false;
  
    // if arguments are provided to specify the colours
    // of the even & odd rows, then use the them;
    // otherwise use the following defaults:
    var evenColor = arguments[1] ? arguments[1] : "#fff";
    var oddColor = arguments[2] ? arguments[2] : "#f4f4f4";
  
    // obtain a reference to the desired table
    // if no such table exists, abort
    var table = document.getElementById(id);
    if (! table) { return; }
    
    // by definition, tables can have more than one tbody
    // element, so we'll have to get the list of child
    // &lt;tbody&gt;s 
    var tbodies = table.getElementsByTagName("tbody");

    // and iterate through them...
    for (var h = 0; h < tbodies.length; h++) {
    
     // find all the &lt;tr&gt; elements... 
      var trs = tbodies[h].getElementsByTagName("tr");
      
      // ... and iterate through them
      for (var i = 0; i < trs.length; i++) {

        // avoid rows that have a class attribute
        // or backgroundColor style
        if (! hasClass(trs[i]) &&
            ! trs[i].style.backgroundColor) {
 		  
          // get all the cells in this row...
          var tds = trs[i].getElementsByTagName("td");
        
          // and iterate through them...
          for (var j = 0; j < tds.length; j++) {
        
            var mytd = tds[j];

            // avoid cells that have a class attribute
            // or backgroundColor style
            if (! hasClass(mytd) &&
                ! mytd.style.backgroundColor) {
        
              mytd.style.backgroundColor =
                even ? evenColor : oddColor;
            
            }
          }
        }
        // flip from odd to even, or vice-versa
        even =  ! even;
      }
    }
  }

function new_image(arg)
{
	if(document.images)
	{
		rslt = new Image();
		rslt.src = arg;
		return rslt;
	}
}

function preload_rollovers()
{
	$tmp = new_image("/img/icons/bhome.gif");
	$tmp = new_image("/img/icons/bbrowse.gif");
	$tmp = new_image("/img/icons/bsearch.gif");
	$tmp = new_image("/img/icons/bfavorites.gif");
	$tmp = new_image("/img/icons/bstatistics.gif");
	$tmp = new_image("/img/icons/blinks.gif");
	$tmp = new_image("/img/icons/bforum.gif");
	$tmp = new_image("/img/icons/grinformation.gif");
	$tmp = new_image("/img/icons/grsuggestion.gif");
	$tmp = new_image("/img/icons/grsitemap.gif");
	$tmp = new_image("/img/icons/oforum.gif");
	$tmp = new_image("/img/icons/osearch.gif");
	$tmp = new_image("/img/icons/onew.gif");
	$tmp = new_image("/img/icons/bdesigns.gif");
	$tmp = new_image("/img/icons/bprofile.gif");
	$tmp = new_image("/img/icons/bsettings.gif");
	$tmp = new_image("/img/icons/blogout.gif");
}
