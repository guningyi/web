//onerror=handleErr;

var errorHandlingMethod = "form";

function handleErr(msg,url,l,test)
{                                 
 var txt="There was an error on this page.\n\n";
 txt+="Error: " + msg + "\n";
 txt+="URL: " + url + "\n";
 txt+="Line: " + l + "\n\n";

 if (errorHandlingMethod == "form") {
   var existingErrorForm = document.getElementById("errorForm");
   var existingErrorElement = document.getElementById("js_error_message");

   if (existingErrorForm && existingErrorElement) {
     existingErrorElement.setAttribute("value",escape(txt));
     existingErrorForm.submit();
   } else {

     var body = document.getElementsByTagName("body")[0];

     if (body) {
       var errorForm = document.createElement("form");
       errorForm.setAttribute("action","/errors/error.jsp");
       errorForm.setAttribute("method","post");
       errorForm.setAttribute("id","errorForm");

       var errorElement = document.createElement("input");
       errorElement.setAttribute("id","js_error_message");
       errorElement.setAttribute("type","hidden");
       errorElement.setAttribute("name","js_error_message");
       errorElement.setAttribute("value",escape(txt));
       errorForm.appendChild(errorElement);

       body.appendChild(errorForm);
       document.getElementById("errorForm").submit();
     }
   }
 } else if (errorHandlingMethod == "iframe") {
   var existingErrorFrame = document.getElementById("errorFrame");

   if (existingErrorFrame) {
     existingErrorFrame.setAttribute("src","/errors/error.jsp?js_error_message=" + escape(txt));
   } else {
     var errorFrame = document.createElement("iframe");
     errorFrame.setAttribute("src","/errors/error.jsp?js_error_message=" + escape(txt));
     errorFrame.setAttribute("id","errorFrame");
     errorFrame.setAttribute("style","display:none");

     var body = document.getElementsByTagName("body")[0];
     body.appendChild(errorFrame);
   }
 } else if (errorHandlingMethod == "lightbox") {
   //TODO implement
 }

 return false;
}

function triggerError() {
  nonexistentFunction();
}