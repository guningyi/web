function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	}else{
		window.onload = function() {
			oldonload();
			func();
 		}
 	}
}
/*Para eliminar los espacios en blanco*/
function nospaces(t) {
	//t = t.replace(/ /,"\r\n");
	while (t.search(/(\r\n\r\n)|(\n\n)|(\n)|(\r)|(\s\s)/) != -1) {
		t = t.replace(/\r\n\r\n/g, "");
		t = t.replace(/\n\n/g, "");
		t = t.replace(/\n/g,"");
		t = t.replace(/\r/g,"");
		t = t.replace(/\s\s/g,"");
	
	}
	//alert(t);
	return t;
}