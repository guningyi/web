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
	
		var loc =new String(window.location);
		var lang =new String(window.location);
		
		if(loc.indexOf('/es/')!=-1){lang='es';}
		if(loc.indexOf('/en/')!=-1){lang='en';}
	
		if(loc.indexOf('=ES')!=-1){lang='es';}
		if(loc.indexOf('=EN')!=-1){lang='en';}
		
		if(loc.indexOf('cambioIdioma=EN')!=-1){lang='es';}
		if(loc.indexOf('cambioIdioma=ES')!=-1){lang='en';}
		//BUSCADOR MENU NIVEL 1
		//mostramos el boton buscar
		//document.getElementById("botonbuscarmenusuperior").style.visibility="visible";
		//document.getElementById("botonbuscarmenusuperior").className="botonbuscar";
		//document.getElementById("botonbuscarmenusuperior").value="";
		
		
		
				
	
		//cargo el flahs de la subhome
			// Major version of Flash required
		var requiredMajorVersion = 9;
		// Minor version of Flash required
		var requiredMinorVersion = 0;
		// Minor version of Flash required
		var requiredRevision = 0;
		
		
		// -----------------------------------------------------------------------------
		
		var hasReqestedVersion = DetectFlashVer(requiredMajorVersion, requiredMinorVersion, requiredRevision);
		
		// Check to see if the version meets the requirements for playback
		if (hasReqestedVersion) {
			// if we've detected an acceptable version
			// embed the Flash Content SWF when all tests are passed
			//document.getElementById("contenidosinflash").style.display='none';
		    // embed the Flash Content SWF when all tests are passed
			//document.getElementById("contentflashsubhome").innerHTML="<OBJECT id=sostenibilidad name=Iberdrola codeBase='https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0' classid=clsid:D27CDB6E-AE6D-11cf-96B8-444553540000 width=993 height=195><PARAM NAME='_cx' VALUE='26273'><PARAM NAME='_cy' VALUE='5159'><PARAM NAME='FlashVars' VALUE='ficheroxml=/webibd/ngc/es/subHome/flash/menu.xml&menu2xml=5es'><PARAM NAME='Movie' VALUE='/webibd/gc/prod/es/admin/video/menunivel2_v3.swf'><PARAM NAME='Src' VALUE='/webibd/gc/prod/es/admin/video/menunivel2_v3.swf'><PARAM NAME='WMode' VALUE='Transparent'><PARAM NAME='Play' VALUE='0'><PARAM NAME='Loop' VALUE='-1'><PARAM NAME='Quality' VALUE='High'><PARAM NAME='SAlign' VALUE=''><PARAM NAME='Menu' VALUE='-1'><PARAM NAME='Base' VALUE=''><PARAM NAME='AllowScriptAccess' VALUE='sameDomain'><PARAM NAME='Scale' VALUE='ShowAll'><PARAM NAME='DeviceFont' VALUE='0'><PARAM NAME='EmbedMovie' VALUE='0'><PARAM NAME='BGColor' VALUE='FFFFFF'><PARAM NAME='SWRemote' VALUE=''><PARAM NAME='MovieData' VALUE=''><PARAM NAME='SeamlessTabbing' VALUE='1'><PARAM NAME='Profile' VALUE='0'><PARAM NAME='ProfileAddress' VALUE=''><PARAM NAME='ProfilePort' VALUE='0'><PARAM NAME='AllowNetworking' VALUE='all'><PARAM NAME='AllowFullScreen' VALUE='false'></OBJECT>";
			var FO = { movie:"/webibd/gc/prod/es/admin/video/menunivel2_v3.swf", width:"993", height:"195", majorversion:"9", build:"0", xi:"true",flashvars: "ficheroxml=/webibd/ngc/es/subHome/flash/menu.xml&menu2xml="+document.getElementById('rutaflashvars').value, id:"sostenibilidad",quality:"high",bgcolor:"#FFFFFF",allowscriptaccess:"sameDomain",name:"Iberdrola",wmode:"transparent" };
			UFO.create(FO, "contentflashsubhome");
			/*Se carga en el onmouseover y onfocus de las opciones de nivel 2 la interactuacion con el flash*/
			for(i=1;i<=document.getElementById("opcionesNivel2").value;i++){
			document.getElementById("opcSubmenu_"+i).onmouseover=function(){ 
				identificador=this.id;
				arrayCadena=identificador.split("_");
				//obtengo el numero de la imagen a mostrar
				idActual=arrayCadena[1]; 
				pushNumber(idActual);				
			}
			document.getElementById("opcSubmenu_"+i).onmouseout=function(){ 
				identificador=this.id;
				arrayCadena=identificador.split("_");
				//obtengo el numero de la imagen a mostrar
				idActual=arrayCadena[1]; 
				outNumber(idActual);				
			}
			document.getElementById("opcSubmenu_"+i).onfocus=function(){ 
				identificador=this.id;
				arrayCadena=identificador.split("_");
				//obtengo el numero de la imagen a mostrar
				idActual=arrayCadena[1]; 
				pushNumber(idActual);				
			}
			document.getElementById("opcSubmenu_"+i).onblur=function(){ 
				identificador=this.id;
				arrayCadena=identificador.split("_");
				//obtengo el numero de la imagen a mostrar
				idActual=arrayCadena[1]; 
				outNumber(idActual);				
			}
		}	
                
		} 
		
//};
});
function pushNumber(idn){
	var flashObject = document.getElementById('sostenibilidad');
	if (flashObject != null) {
		flashObject.getNumMenu(idn);
	}/*        else {
		alert("Error. No se ha podido comunicar con Flash. Verifique");
	}*/
}

function outNumber(idn){
	var flashObject = document.getElementById('sostenibilidad');
	if (flashObject != null) {
		flashObject.getNumMenuOut(idn);
	} /*       else {
		alert("Error. No se ha podido comunicar con Flash. Verifique");
	}*/
}	

