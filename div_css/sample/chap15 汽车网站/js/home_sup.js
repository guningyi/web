// JavaScript Document
// Globals

// Major version of Flash required
addLoadEvent(function(){ 
	document.getElementById("homeflash").style.height = "276px";
	insertarFlash(true);
});


function insertarFlash(accesible){
	var loc =new String(window.location);
	var lang =new String(window.location);
		
	if(loc.indexOf('/es/')!=-1){lang='es';}
	if(loc.indexOf('/en/')!=-1){lang='en';}
		
	if(loc.indexOf('=ES')!=-1){lang='es';}
	if(loc.indexOf('=EN')!=-1){lang='en';}
		
	if(loc.indexOf('cambioIdioma=EN')!=-1){lang='es';}
	if(loc.indexOf('cambioIdioma=ES')!=-1){lang='en';}
	
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
	    //alternativa a la accesibilidad del flash
		//document.getElementById("homeflash").innerHTML="<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0' name='ejemplo' width='996' height='267' align='middle' id='ejemplo'><param name='allowScriptAccess' value='sameDomain' /><param name='movie' value='/webibd/gc/prod/es/home/home.swf' /><param name='quality' value='high' /><param name='bgcolor' value='#ffffff' /><param name='FlashVars' value='ficheroxml=/webibd/gc/prod/es/home/homeSup.xml' /><embed src='/webibd/gc/prod/es/home/home.swf' quality='high' bgcolor='#ffffff' width='996' height='267' name='ejemplo' align='middle' allowScriptAccess='sameDomain' FlashVars='ficheroxml=/webibd/gc/prod/es/home/homeSup.xml' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' /></object>";
		if(accesible){			
			//alert("accesible sin recarga");
			if(lang=='es'){
				var FO = { movie:"/webibd/gc/prod/es/home/home.swf", width:"996", height:"267", majorversion:"9", build:"0", xi:"true",flashvars:"ficheroxml=/webibd/gc/prod/es/home/homeSup.xml&recarga=0",id:"Iberdrola",quality:"high",bgcolor:"#FFFFFF",allowscriptaccess:"sameDomain",name:"Iberdrola"};
			}else{
				var FO = { movie:"/webibd/gc/prod/en/home/home.swf", width:"996", height:"267", majorversion:"9", build:"0", xi:"true",flashvars:"ficheroxml=/webibd/gc/prod/en/home/homeSup.xml&recarga=0",id:"Iberdrola",quality:"high",bgcolor:"#FFFFFF",allowscriptaccess:"sameDomain",name:"Iberdrola"};
			}
		}
		else{						
			//alert("Noooooooo accesible recargado");
			if(lang=='es'){
				var FO = { movie:"/webibd/gc/prod/es/home/home.swf", width:"996", height:"267", majorversion:"9", build:"0", xi:"true",flashvars:"ficheroxml=/webibd/gc/prod/es/home/homeSup.xml&recarga=1",id:"Iberdrola",quality:"high",bgcolor:"#FFFFFF",allowscriptaccess:"sameDomain",name:"Iberdrola",wmode:"transparent"};
			}else{
				var FO = { movie:"/webibd/gc/prod/en/home/home.swf", width:"996", height:"267", majorversion:"9", build:"0", xi:"true",flashvars:"ficheroxml=/webibd/gc/prod/en/home/homeSup.xml&recarga=1",id:"Iberdrola",quality:"high",bgcolor:"#FFFFFF",allowscriptaccess:"sameDomain",name:"Iberdrola",wmode:"transparent"};
			}		
			//alert("entro "+document.getElementById("paginahome"));
			//Cuando paso por el botón buscar (imagen de lupa) cierro las opciones avanzadas del buscador
			document.getElementById("imagenbuscar").onfocus=function(){ 		
				document.getElementById("opcionesBusqueda").style.display="none";
			}
			
			//Cuando paso por "Redes" (opcion7) cierro las opciones avanzadas del buscador
			if (document.getElementById("aOpcion7")!=null) //En redes es otro id
			{
				document.getElementById("aOpcion7").onfocus=function(){
					document.getElementById("opcionesBusqueda").style.display="none";
				}
			}
			if (document.getElementById("aOpcion7on")!=null) // Si estamos en "Redes"
			{
				document.getElementById("aOpcion7on").onfocus=function(){
					document.getElementById("opcionesBusqueda").style.display="none";
				}
			}	
		}			
		UFO.create(FO, "homeflash");
	                
	}else {  // flash is too old or we can't detect the plugin
	
	    /*var alternateContent = 'Alternate HTML content should be placed here. '
	
	                + 'This content requires the Adobe Flash Player. '
	
	                + '<a href=http://www.adobe.com/go/getflash/>Get Flash</a>';*/

		document.getElementById("contenidosinflash").style.display="block";		
		document.getElementById("contenidosinflash").innerHTML= document.getElementById("hiddencontenidosinflash").value;
	    //document.write();  // insert non-flash content
	}
	/*tabindex del flash*/
	if(document.getElementById("homeflash")!=null){
		//alert("entro");
		document.getElementById("homeflash").tabIndex="20";
		/*document.getElementById("homeflash").onfocus=function(){		
			document.getElementById("Iberdrola").focus();
		}*/
	}
}







	

