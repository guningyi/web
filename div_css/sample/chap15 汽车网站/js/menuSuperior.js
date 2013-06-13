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

		//BUSCADOR MENU NIVEL 1
		//mostramos el boton buscar
		//document.getElementById("botonbuscarmenusuperior").style.visibility="visible";
		//document.getElementById("botonbuscarmenusuperior").className="botonbuscar";
		//document.getElementById("botonbuscarmenusuperior").value="";
		
		
		document.getElementById("txtbuscador").onclick=function(){ 		
			var loc =new String(window.location);
			var lang =new String(window.location);
			
			if(loc.indexOf('/es/')!=-1){lang='es';}
			if(loc.indexOf('/en/')!=-1){lang='en';}
		
			if(loc.indexOf('=ES')!=-1){lang='es';}
			if(loc.indexOf('=EN')!=-1){lang='en';}
			
			if(loc.indexOf('cambioIdioma=EN')!=-1){lang='es';}
			if(loc.indexOf('cambioIdioma=ES')!=-1){lang='en';}	
			
			if(lang=='en'){
				document.getElementById("inputsbusqueda").innerHTML="<fieldset><legend>Search sections</legend><label id='labelopc1' for='opc1'><input type='checkbox' checked='checked' value='all' name='opc1' id='opc1' /><span id='spanopc1'>The entire website</span></label><br/><label for='opc2' id='labelopc2'><input type='checkbox' value='ibconoce' name='opc2' id='opc2' /><span id='spanopc2'>About us</span></label><br/><label for='opc3' id='labelopc3'><input type='checkbox' value='ibsosten' name='opc3' id='opc3' /><span id='spanopc3'>Reputation and sustainability</span></label><br/><label for='opc4' id='labelopc4'><input type='checkbox' value='ibprensa' name='opc4' id='opc4' /><span id='spanopc4'>Press room</span></label><br/><label for='opc5' id='labelopc5'><input type='checkbox' value='ibinver' name='opc5' id='opc5' /><span id='spanopc5'>Shareholders and investors</span></label><br/><label for='opc6' id='labelopc6'><input type='checkbox' value='ibclien' name='opc6' id='opc6' /><span id='spanopc6'>Customers</span></label><br/><label for='opc7' id='labelopc7'><input type='checkbox' value='ibprovee' name='opc7' id='opc7' /><span id='spanopc7'>Suppliers</span></label><br/><label for='opc8' id='labelopc8'><input type='checkbox' value='ibredes' name='opc8' id='opc8' /><span id='spanopc8'>Networks</span></label></fieldset>" 
			}else{
				document.getElementById("inputsbusqueda").innerHTML="<fieldset><legend>选择搜索</legend><label id='labelopc1' for='opc1'><input type='checkbox' value='all' name='opc1' id='opc1'/><span id='spanopc1'>全部内容</span></span></label><br/><label for='opc2' id='labelopc2'><input type='checkbox' value='ibconoce' name='opc2' id='opc2'/><span id='spanopc2'>关于我们</span></label><br/><label for='opc3' id='labelopc3'><input type='checkbox' value='ibsosten' name='opc3' id='opc3'/><span id='spanopc3'>企业新闻</span></label><br/><label for='opc4' id='labelopc4'><input type='checkbox' value='ibprensa' name='opc4' id='opc4'/><span id='spanopc4'>公司博客</span></label><br/><label for='opc5' id='labelopc5'><input type='checkbox' value='ibinver' name='opc5' id='opc5'/><span id='spanopc5'>新品介绍</span></label><br/><label for='opc6' id='labelopc6'><input type='checkbox' value='ibclien' name='opc6' id='opc6'/><span id='spanopc6'>联系我们</span></label><br/><label for='opc7' id='labelopc7'><input type='checkbox' value='ibprovee' name='opc7' id='opc7'/><span id='spanopc7'>展望未来</span></label><br/><label for='opc8' id='labelopc8'><input type='checkbox' value='ibredes' name='opc8' id='opc8'/><span id='spanopc8'>人才招聘</span></label></fieldset>" 

			}
			
			document.getElementById("opcionesBusqueda").style.display="block";
			//cuando pinchas en algun input de busqueda se deselecciona el primero "toda la web"
			
			/************ eventos de los checkbox *****************/
			for(i=1;i<=8;i++){
				document.getElementById("labelopc"+i).onmouseover=function(){	
					var idobj=this.id.substring(9,5)				
					 document.getElementById("span"+idobj).style.textDecoration="underline";
					 document.getElementById("span"+idobj).style.cursor="pointer";
				}
				document.getElementById("labelopc"+i).onmouseout=function(){
					 var idobj=this.id.substring(9,5)				
					 document.getElementById("span"+idobj).style.textDecoration="none";
				}
				document.getElementById("opc"+i).onfocus=function(){					
					document.getElementById("span"+this.id).style.textDecoration="underline";
				}
				document.getElementById("opc"+i).onblur=function(){
					document.getElementById("span"+this.id).style.textDecoration="none";
				}
			}	
			
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
			document.getElementById("opc1").checked="true";
			
			document.getElementById("cierreBusqueda").innerHTML="<img class='imagenSinBorde' src='../Corporate/www.iberdrola.es/webibd/admin/admin/img/imgBuscador/pieOpcBusq.gif' alt=''/>";			
			//document.getElementById("botoncerraravanzadas").innerHTML="<a id='busqueda_cerrar'>?</a>";
			document.getElementById("busqueda_cerrar").onclick=function(){ 
				document.getElementById("opcionesBusqueda").style.display="none";
				document.getElementById("imagenbuscar").focus();
			}
		}
		//BUSCADOR MENU NIVEL 1 tabulador
		document.getElementById("txtbuscador").onfocus=function(){ 			
			var loc =new String(window.location);
			var lang =new String(window.location);
			
			if(loc.indexOf('/es/')!=-1){lang='es';}
			if(loc.indexOf('/en/')!=-1){lang='en';}
		
			if(loc.indexOf('=ES')!=-1){lang='es';}
			if(loc.indexOf('=EN')!=-1){lang='en';}
			
			if(loc.indexOf('cambioIdioma=EN')!=-1){lang='es';}
			if(loc.indexOf('cambioIdioma=ES')!=-1){lang='en';}	
						
			if(lang=='en'){
				document.getElementById("inputsbusqueda").innerHTML="<fieldset><legend>Search sections</legend><label id='labelopc1' for='opc1'><input type='checkbox' checked='checked' value='all' name='opc1' id='opc1' /><span id='spanopc1'>The entire website</span></label><br/><label for='opc2' id='labelopc2'><input type='checkbox' value='ibconoce' name='opc2' id='opc2' /><span id='spanopc2'>About us</span></label><br/><label for='opc3' id='labelopc3'><input type='checkbox' value='ibsosten' name='opc3' id='opc3' /><span id='spanopc3'>Reputation and sustainability</span></label><br/><label for='opc4' id='labelopc4'><input type='checkbox' value='ibprensa' name='opc4' id='opc4' /><span id='spanopc4'>Press room</span></label><br/><label for='opc5' id='labelopc5'><input type='checkbox' value='ibinver' name='opc5' id='opc5' /><span id='spanopc5'>Shareholders and investors</span></label><br/><label for='opc6' id='labelopc6'><input type='checkbox' value='ibclien' name='opc6' id='opc6' /><span id='spanopc6'>Customers</span></label><br/><label for='opc7' id='labelopc7'><input type='checkbox' value='ibprovee' name='opc7' id='opc7' /><span id='spanopc7'>Suppliers</span></label><br/><label for='opc8' id='labelopc8'><input type='checkbox' value='ibredes' name='opc8' id='opc8' /><span id='spanopc8'>Networks</span></label></fieldset>" 
			}else{

				document.getElementById("inputsbusqueda").innerHTML="<fieldset><legend>Secciones de búsqueda</legend><label id='labelopc1' for='opc1'><input type='checkbox' value='all' name='opc1' id='opc1'/><span id='spanopc1'>Toda la web</span></span></label><br/><label for='opc2' id='labelopc2'><input type='checkbox' value='ibconoce' name='opc2' id='opc2'/><span id='spanopc2'>Conoce IBERDROLA</span></label><br/><label for='opc3' id='labelopc3'><input type='checkbox' value='ibsosten' name='opc3' id='opc3'/><span id='spanopc3'>Reputación y sostenibilidad</span></label><br/><label for='opc4' id='labelopc4'><input type='checkbox' value='ibprensa' name='opc4' id='opc4'/><span id='spanopc4'>Sala de prensa</span></label><br/><label for='opc5' id='labelopc5'><input type='checkbox' value='ibinver' name='opc5' id='opc5'/><span id='spanopc5'>Accionistas e Inversores</span></label><br/><label for='opc6' id='labelopc6'><input type='checkbox' value='ibclien' name='opc6' id='opc6'/><span id='spanopc6'>Clientes</span></label><br/><label for='opc7' id='labelopc7'><input type='checkbox' value='ibprovee' name='opc7' id='opc7'/><span id='spanopc7'>Proveedores</span></label><br/><label for='opc8' id='labelopc8'><input type='checkbox' value='ibredes' name='opc8' id='opc8'/><span id='spanopc8'>Redes</span></label></fieldset>" 				
			}
			
			document.getElementById("opcionesBusqueda").style.display="block";
			//cuando pinchas en algun input de busqueda se deselecciona el primero "toda la web"
			
			/************ eventos de los checkbox *****************/
			for(i=1;i<=8;i++){
				document.getElementById("labelopc"+i).onmouseover=function(){	
					var idobj=this.id.substring(9,5)				
					 document.getElementById("span"+idobj).style.textDecoration="underline";
					 document.getElementById("span"+idobj).style.cursor="pointer";
				}
				document.getElementById("labelopc"+i).onmouseout=function(){
					 var idobj=this.id.substring(9,5)				
					 document.getElementById("span"+idobj).style.textDecoration="none";
				}
				document.getElementById("opc"+i).onfocus=function(){					
					document.getElementById("span"+this.id).style.textDecoration="underline";
				}
				document.getElementById("opc"+i).onblur=function(){
					document.getElementById("span"+this.id).style.textDecoration="none";
				}
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

			document.getElementById("opc1").checked="true";
			
			document.getElementById("cierreBusqueda").innerHTML="<img class='imagenSinBorde' src='../Corporate/www.iberdrola.es/webibd/admin/admin/img/imgBuscador/pieOpcBusq.gif' alt=''/>";			
			//document.getElementById("botoncerraravanzadas").innerHTML="<a id='busqueda_cerrar'><img  class='cerrarBuscador' src='../Corporate/www.iberdrola.es/webibd/admin/admin/img/imgBuscador/bn_cerrar.jpg'/></a>";
			document.getElementById("busqueda_cerrar").onclick=function(){ 
				document.getElementById("opcionesBusqueda").style.display="none";
				document.getElementById("imagenbuscar").focus();
			}
			
		}
		//variable para saber cuando estamos en la home y anular estas funciones, ya que es la funcion del flash la que se encarga de lanzarlas en funcion de si es accesible o no.
		if(!document.getElementById("paginahome") ){
			//alert("entro "+document.getElementById("paginahome"));
			//Cuando paso por el bot髇 buscar (imagen de lupa) cierro las opciones avanzadas del buscador
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
		//cargo el evento de cerrar las opciones avanzadas de busqueda
		
		if (document.getElementById("logotIber")!=null)
		{
		
		    document.getElementById("logotIber").oncontextmenu = function() {
                 return false;
            }
            document.getElementById("logotIber").onselectstart = function() {
                 return false;
            }
            document.getElementById("logotIber").ondragstart = function() {
                  return false;
            }
		   
		}
		
//};
});
	

