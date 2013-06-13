var xmlHttp

function getcitiesv(CategoryID) {
    xmlHttp = GetXmlHttpObject();
    document.getElementById("loaderv").style.display = 'block';
    if (xmlHttp == null) {
        alert("Your browser does not support AJAX!");
        return;
    }
    var url = "ajax.asp?ajaxaction=getcities";
    url = url + "&CategoryID=" + CategoryID;
    url = url + "&sid=" + Math.random();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") {
            document.getElementById("loaderv").style.display = 'none';
            document.getElementById("cityv").innerHTML = xmlHttp.responseText;
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

function getcitiesh(CategoryID) {
    xmlHttp = GetXmlHttpObject();
    document.getElementById("loaderh").style.display = 'block';
    if (xmlHttp == null) {
        alert("Your browser does not support AJAX!");
        return;
    }
    var url = "ajax.asp?ajaxaction=getcities";
    url = url + "&CategoryID=" + CategoryID;
    url = url + "&sid=" + Math.random();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") {
            document.getElementById("loaderh").style.display = 'none';
            document.getElementById("cityh").innerHTML = xmlHttp.responseText;
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}
function subscribe(email,mailing_list)
{ 
xmlHttp=GetXmlHttpObject();
if (xmlHttp==null)
  {
  alert ("Your browser does not support AJAX!");
  return;
  } 
var url="ajax.asp?ajaxaction=subscribe";
url=url+"&email="+email;
url=url+"&mailing_list="+mailing_list;
url=url+"&sid="+Math.random();
xmlHttp.onreadystatechange=function(){
     if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete"){ 
            document.getElementById("subscribe_result").innerHTML=xmlHttp.responseText;}
            };
xmlHttp.open("GET",url,true);
xmlHttp.send(null);
}

function sendform(email,fname,fromcity, tocity, outmonth, outday, retmonth, retday, numptc1) {
    xmlHttp = GetXmlHttpObject();
    document.getElementById("loaderv").style.display = 'block';
    if (xmlHttp == null) {
        alert("Your browser does not support AJAX!");
        return;
    }
    var url = "ajax.asp?ajaxaction=sendform";
    url = url + "&email=" + email;
    url = url + "&fname=" + fname;
    url = url + "&fromcity=" + fromcity;
    url = url + "&tocity=" + tocity;
    url = url + "&outmonth=" + outmonth;
    url = url + "&outday=" + outday;
    url = url + "&retmonth=" + retmonth;
    url = url + "&retday=" + retday;
    url = url + "&numptc1=" + numptc1;
    url = url + "&sid=" + Math.random();
    xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") {
            document.getElementById("loaderv").style.display = 'none';
            document.getElementById("results").innerHTML = xmlHttp.responseText;
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}


function stateChanged() 
{ 
if (xmlHttp.readyState==4)
{ 
document.getElementById("comments").style.display = 'none';
document.getElementById("quote_on").style.display = 'none';
document.getElementById("quote_off").style.display = 'block';
document.getElementById("comments_return").style.display = 'block';
document.getElementById("comments_return").innerHTML=xmlHttp.responseText;
}
}


function GetXmlHttpObject()
{
var xmlHttp=null;
try
  {
  // Firefox, Opera 8.0+, Safari
  xmlHttp=new XMLHttpRequest();
  }
catch (e)
  {
  // Internet Explorer
  try
    {
    xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
    }
  catch (e)
    {
    xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
return xmlHttp;
}


