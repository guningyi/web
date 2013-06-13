// JavaScript Document
/**
 * We use the initCallback callback
 * to assign functionality to the controls
 */
/*function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	}
	else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}*/


///Funcion que lanza eventos o los carga/////////

//window.onload =function(){
addLoadEvent(function(){  	
	/*
		//BUSCADOR MENU NIVEL 1
		document.getElementById("txtbuscador").onclick=function(){ 			
			document.getElementById("opcionesBusqueda").style.display="block";
		}
		//cargo el evento de cerrar las opciones avanzadas de busqueda
		document.getElementById("busqueda_cerrar").onclick=function(){ 
			document.getElementById("opcionesBusqueda").style.display="none";
		}
		//cuando pinchas en algun input de busqueda se deselecciona el primero "toda la web"
		for(i=2;i<=8;i++){
			document.getElementById("opc"+i).onclick=function(){ 
				document.getElementById("opc1").checked="";
			}
		}	
		//cuando pinchamos en toda la web se deseleccionan los demas input
		document.getElementById("opc1").onclick=function(){ 
			for(i=2;i<=8;i++){
				document.getElementById("opc"+i).checked="";
			}			
		}
		document.getElementById("opc1").checked="true";*/
		
		if (document.getElementById("imagenMenu")!=null)
		{
			
			document.getElementById("imagenMenu").onerror=function(){
				document.getElementById("imagenMenu").src = "/webibd/admin/img/pixel.gif";
			} 
			document.getElementById("imagenMenu").src=document.getElementById("hiddenimagenMenu").value;
		}

//};
});
	

