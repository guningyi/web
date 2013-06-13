// JavaScript Document
/**
 * We use the initCallback callback
 * to assign functionality to the controls
 */
//function addLoadEvent(func) { 
	//var oldonload = window.onload; 
	//if (typeof window.onload != 'function') { 
	//	window.onload = func; 
	//} else { 
		//window.onload = function() { 
		//	if (oldonload) { 
			//	oldonload(); 
			//} 
			//func(); 
		//} 
	//} 
//} 

function mycarousel_initCallback(carousel) {
    jQuery('.jcarousel-control a').bind('click', function() {
		//cambio la clase del enlace seleccionado por la clase visitado
		jQuery('#imgcarrousel'+jQuery('#numcarrusel').val()).addClass("visitado").removeClass("seleccionado");
		//cambio la clase del enlace seleccionado por la clase seleccionado y elimino la que tenia antes
		jQuery('#imgcarrousel'+jQuery(this).text()).addClass("seleccionado").removeClass("enlacecarrusel").removeClass("visitado");
		//guardo en el input hiden una variable para saber por que elemento voy
		jQuery('#numcarrusel').attr('value', jQuery(this).text());
		//muevo el escroll de imagenes a la seleccionada
        carousel.scroll(jQuery.jcarousel.intval(jQuery(this).text()));
        return false;
    });
	
    jQuery('#carrusel-next').bind('click', function() {
    	if(jQuery('#numimgtab').val()!=0){
			//alert(jQuery('#numimgtab').val());
			document.getElementById("numimgtab").value="0";
			document.getElementById("uldestacadoscarrusel").style.left="0px";
			document.getElementById("numcarrusel").value="0";
			setTimeout("document.getElementById('carrusel-prev').style.display='none'", 100);
			document.getElementById("carrusel-next").style.display='block';
		}else{
			//muevo el carrusel de imagenes una posicion
       		 carousel.next();
       	}
		//compruebo si estoy al final del carrusel
		if(parseInt(jQuery('#numcarrusel').val())<parseInt(jQuery('#numimgcarrusel').val())){
			//cambio el estilo del elemento anteriormente seleccionado por visitado
			jQuery('#imgcarrousel'+jQuery('#numcarrusel').val()).addClass("visitado").removeClass("seleccionado");
			//añado al input hiden el valor actual del scroll, la posicion
			jQuery('#numcarrusel').attr('value', (parseInt(jQuery('#numcarrusel').val())+1));
			//cambio el estado del elemento con la clase seleccionado y elimino las clases anteriores
			jQuery('#imgcarrousel'+jQuery('#numcarrusel').val()).addClass("seleccionado").removeClass("enlacecarrusel").removeClass("visitado");
			if(parseInt(jQuery('#numcarrusel').val())+1>=parseInt(jQuery('#numimgcarrusel').val()))
				setTimeout("document.getElementById('carrusel-next').style.display='none'", 100);
			else
				document.getElementById("carrusel-next").style.display='block';
			//muestro la flecha contraria
			document.getElementById("carrusel-prev").style.display='block';
		}
        return false;
    });

    jQuery('#carrusel-prev').bind('click', function() {
		//muevo el carrusel de imagenes una posicion
		if(jQuery('#numimgtab').val()!=0){
			//alert(jQuery('#numimgtab').val());
			document.getElementById("numimgtab").value="0";
			document.getElementById("uldestacadoscarrusel").style.left="0px";
			document.getElementById("numcarrusel").value="1";
			setTimeout("document.getElementById('carrusel-prev').style.display='none'", 100);
			document.getElementById("carrusel-next").style.display='block';
		}else{
	        carousel.prev();
	      }
		//compruebo si estoy al principio del carrusel
		if(jQuery('#numcarrusel').val()>1){
			//cambio el estilo del elemento anteriormente seleccionado por visitado
			jQuery('#imgcarrousel'+jQuery('#numcarrusel').val()).addClass("visitado").removeClass("seleccionado");
			//añado al input hiden el valor actual del scroll, la posicion
			jQuery('#numcarrusel').attr('value', (parseInt(jQuery('#numcarrusel').val())-1));
			//cambio el estado del elemento con la clase seleccionado y elimino las clases anteriores
			jQuery('#imgcarrousel'+jQuery('#numcarrusel').val()).addClass("seleccionado").removeClass("enlacecarrusel").removeClass("visitado");
			if(parseInt(jQuery('#numcarrusel').val())<=1)
				setTimeout("document.getElementById('carrusel-prev').style.display='none'", 100);
			else
				document.getElementById("carrusel-prev").style.display='block';
			//muestro la flecha contraria
			document.getElementById("carrusel-next").style.display='block';
		}
        return false;
    });
};

///Funcion que lanza eventos o los carga/////////

//window.onload =function(){
addLoadEvent(function(){  	
	/*mostramos las flechas del carrusel*/
	document.getElementById("flechaspaginarcarrusel").innerHTML="<a id='carrusel-prev'  title='mover a imagen anterior'></a><a id='carrusel-next'  title='mover a imagen siguiente'></a>";
	/*ajustamos el alto del modulo acordeon para eliminar el efecto de bajar el pie*/
	/*document.getElementById("moduloacordeon").style.height="12.8em"; */

	// Setup HoverAccordion for Example 2 with some custom options
	jQuery('#menuacordeon').hoverAccordion({
		activateitem: '1',
		speed: 'fast'
	});
	jQuery('#menuacordeon').children('li:first').addClass('firstitem');
	jQuery('#menuacordeon').children('li:last').addClass('lastitem');
	///////////////////////////////////								
    jQuery("#carrusel").jcarousel({
        scroll: 1,
        initCallback: mycarousel_initCallback,
        // This tells jCarousel NOT to autobuild prev/next buttons
        buttonNextHTML: null,
        buttonPrevHTML: null
    });
	//asigno la imagen seleccionada por defecto
	jQuery('#numcarrusel').attr('value', 1);
	//desactivo el primer boton porque empieza por el primero
	setTimeout("document.getElementById('carrusel-prev').style.display='none'", 100);
	//para que no se vea el efecto de imagenes fuera del acordeon y se vea al tener desactivado el javascript
	document.getElementById("moduloacordeon").style.overflow='hidden';
	
	
		//compruebo que existen los objetos
		if((document.getElementById("capacarruselinferior1"))!=null && (document.getElementById("capacarruselsuperior1"))!=null){
			//asigno el contenido del evento mouseover
			document.getElementById("capacarruselinferior1").onmouseover=function(){
			if(jQuery('#numimgtab').val()==0){
				document.getElementById("srcimg").value=document.getElementById("imgcapacarruselinferior1").src;
				document.getElementById("imgcapacarruselinferior1").src='img/pixel237.gif';
			}
			};
			//asigno el contenido del evento mouseout
			document.getElementById("capacarruselinferior1").onmouseout=function(){
				if(jQuery('#numimgtab').val()==0){
					document.getElementById("imgcapacarruselinferior1").src=document.getElementById("srcimg").value;
				}
				};
			//onfocus
			document.getElementById("enlacecarruselsuperior1").onfocus=function(){
				//document.getElementById("capacarruselinferior1").style.display='none';
				document.getElementById("srcimg").value=document.getElementById("imgcapacarruselinferior1").src;
				document.getElementById("imgcapacarruselinferior1").src='img/pixel237.gif';
				document.getElementById("carrusel-next").style.display='block';
				setTimeout("document.getElementById('carrusel-prev').style.display='none'", 100);
				document.getElementById("numcarrusel").value=1;
				//document.getElementById("uldestacadoscarrusel").style.left="0px";
				document.getElementById("numimgtab").value="1";
			};
			document.getElementById("enlacecarruselsuperior1").onblur=function(){document.getElementById("imgcapacarruselinferior1").src=document.getElementById("srcimg").value;};
			
		}
		if((document.getElementById("capacarruselinferior2"))!=null && (document.getElementById("capacarruselsuperior2"))!=null){
			//asigno el contenido del evento mouseover
			document.getElementById("capacarruselinferior2").onmouseover=function(){
				if(jQuery('#numimgtab').val()==0){
					document.getElementById("srcimg").value=document.getElementById("imgcapacarruselinferior2").src;
					document.getElementById("imgcapacarruselinferior2").src='img/pixel237.gif';};
				}
			//asigno el contenido del evento mouseout
			document.getElementById("capacarruselinferior2").onmouseout=function(){
				if(jQuery('#numimgtab').val()==0){
					document.getElementById("imgcapacarruselinferior2").src=document.getElementById("srcimg").value;
				}
			};
			//onfocus
			document.getElementById("enlacecarruselsuperior2").onfocus=function(){
				document.getElementById("srcimg").value=document.getElementById("imgcapacarruselinferior2").src;
				document.getElementById("imgcapacarruselinferior2").src='img/pixel237.gif';
				document.getElementById("carrusel-next").style.display='block';
				document.getElementById("carrusel-prev").style.display='block';
				document.getElementById("numcarrusel").value=2;
				//document.getElementById("uldestacadoscarrusel").style.left="-247px";
				document.getElementById("numimgtab").value="2";
			};
			document.getElementById("enlacecarruselsuperior2").onblur=function(){document.getElementById("imgcapacarruselinferior2").src=document.getElementById("srcimg").value;};
		}
		if((document.getElementById("capacarruselinferior3"))!=null && (document.getElementById("capacarruselsuperior3"))!=null){
			//asigno el contenido del evento mouseover
			document.getElementById("capacarruselinferior3").onmouseover=function(){
				if(jQuery('#numimgtab').val()==0){
					document.getElementById("srcimg").value=document.getElementById("imgcapacarruselinferior3").src;
					document.getElementById("imgcapacarruselinferior3").src='img/pixel237.gif';
				}
			};
			//asigno el contenido del evento mouseout
			document.getElementById("capacarruselinferior3").onmouseout=function(){
				if(jQuery('#numimgtab').val()==0){
					document.getElementById("imgcapacarruselinferior3").src=document.getElementById("srcimg").value;
				}
			};
			//onfocus
			document.getElementById("enlacecarruselsuperior3").onfocus=function(){
				document.getElementById("srcimg").value=document.getElementById("imgcapacarruselinferior3").src;
				document.getElementById("imgcapacarruselinferior3").src='img/pixel237.gif';
				if(document.getElementById("numimgcarrusel").value=="3")
					setTimeout("document.getElementById('carrusel-next').style.display='none'", 100);
				else
					document.getElementById("carrusel-next").style.display='block';
				document.getElementById("carrusel-prev").style.display='block';
				document.getElementById("numcarrusel").value=3;
				//document.getElementById("uldestacadoscarrusel").style.left="-494px";
				document.getElementById("numimgtab").value="3";
			};
			document.getElementById("enlacecarruselsuperior3").onblur=function(){document.getElementById("imgcapacarruselinferior3").src=document.getElementById("srcimg").value;};
		}
		if((document.getElementById("capacarruselinferior4"))!=null && (document.getElementById("capacarruselsuperior4"))!=null){
			//asigno el contenido del evento mouseover
			document.getElementById("capacarruselinferior4").onmouseover=function(){
				if(jQuery('#numimgtab').val()==0){
					document.getElementById("srcimg").value=document.getElementById("imgcapacarruselinferior4").src;
					document.getElementById("imgcapacarruselinferior4").src='img/pixel237.gif';
				}
			};
			//asigno el contenido del evento mouseout
			document.getElementById("capacarruselinferior4").onmouseout=function(){
				if(jQuery('#numimgtab').val()==0){
					document.getElementById("imgcapacarruselinferior4").src=document.getElementById("srcimg").value;
				}
			};
			//onfocus
			document.getElementById("enlacecarruselsuperior4").onfocus=function(){
				document.getElementById("srcimg").value=document.getElementById("imgcapacarruselinferior4").src;
				document.getElementById("imgcapacarruselinferior4").src='img/pixel237.gif';
				document.getElementById("carrusel-prev").style.display='block';
				if(document.getElementById("numimgcarrusel").value=="4")
					setTimeout("document.getElementById('carrusel-next').style.display='none'", 100);
				else
					document.getElementById("carrusel-next").style.display='block';
				document.getElementById("numcarrusel").value=4;
				//document.getElementById("uldestacadoscarrusel").style.left="-741px";
				document.getElementById("numimgtab").value="4";
			};
			document.getElementById("enlacecarruselsuperior4").onblur=function(){document.getElementById("imgcapacarruselinferior4").src=document.getElementById("srcimg").value;};
		}
		if((document.getElementById("capacarruselinferior5"))!=null && (document.getElementById("capacarruselsuperior5"))!=null){
			//asigno el contenido del evento mouseover
			document.getElementById("capacarruselinferior5").onmouseover=function(){
				if(jQuery('#numimgtab').val()==0){
					document.getElementById("srcimg").value=document.getElementById("imgcapacarruselinferior5").src;
					document.getElementById("imgcapacarruselinferior5").src='img/pixel237.gif';
				}
			};
			//asigno el contenido del evento mouseout
			document.getElementById("capacarruselinferior5").onmouseout=function(){
				if(jQuery('#numimgtab').val()==0){
					document.getElementById("imgcapacarruselinferior5").src=document.getElementById("srcimg").value;
				}
			};
			//onfocus
			document.getElementById("enlacecarruselsuperior5").onfocus=function(){
				document.getElementById("srcimg").value=document.getElementById("imgcapacarruselinferior5").src;
				document.getElementById("imgcapacarruselinferior5").src='img/pixel237.gif';
				setTimeout("document.getElementById('carrusel-next').style.display='none'", 100);
				document.getElementById("carrusel-prev").style.display='block';
				document.getElementById("numcarrusel").value=5;
				//document.getElementById("uldestacadoscarrusel").style.left="-741px";
				document.getElementById("numimgtab").value="5";
			};
			document.getElementById("enlacecarruselsuperior5").onblur=function(){document.getElementById("imgcapacarruselinferior5").src=document.getElementById("srcimg").value;};
		}	
		/*cambio el ancho del ul de imagenes*/
		document.getElementById("uldestacadoscarrusel").style.width="3000px";
		/*compruebo si solo hay dos imagenes*/
		if(document.getElementById("numimgcarrusel").value<="2"){
			setTimeout("document.getElementById('carrusel-next').style.display='none'", 100);
			setTimeout("document.getElementById('carrusel-prev').style.display='none'", 100);
		}
		
		/*foco en el acordeon*/
		document.getElementById("enlaceacordeon3").onfocus=function(){
			//alert("entro3");			
			document.getElementById("acordeon1").className="cerrado";
			document.getElementById("acordeon2").className="cerrado";
			document.getElementById("ulacordeon3").style.display='block';						
			document.getElementById("ulacordeon2").style.display='none';
			document.getElementById("ulacordeon1").style.display='none';
			document.getElementById("liacordeon3").style.display='block';
			document.getElementById("liacordeon2").style.display='none';
			document.getElementById("liacordeon1").style.display='none';
			document.getElementById("enlaceimagenacordeon3").focus();
			document.getElementById("acordeon3").className="abierto";
				
		};
		document.getElementById("enlaceacordeon2").onfocus=function(){
			//alert("entro2");			
			document.getElementById("acordeon1").className="cerrado";
			document.getElementById("acordeon3").className="cerrado";
			document.getElementById("ulacordeon2").style.display='block';			
			document.getElementById("ulacordeon1").style.display='none';
			document.getElementById("ulacordeon3").style.display='none';
			document.getElementById("liacordeon2").style.display='block';
			document.getElementById("liacordeon1").style.display='none';
			document.getElementById("liacordeon3").style.display='none';
			document.getElementById("enlaceimagenacordeon2").focus();
			document.getElementById("acordeon2").className="abierto";
			
		};
		document.getElementById("enlaceacordeon1").onfocus=function(){
			//alert("entro1");
			
			document.getElementById("acordeon2").className="cerrado";
			document.getElementById("acordeon3").className="cerrado";
			document.getElementById("ulacordeon1").style.display='block';
			document.getElementById("liacordeon1").style.display='block';			
			document.getElementById("ulacordeon2").style.display='none';
			document.getElementById("ulacordeon3").style.display='none';			
			document.getElementById("liacordeon2").style.display='none';
			document.getElementById("liacordeon3").style.display='none';
			document.getElementById("enlaceimagenacordeon1").focus();						
			document.getElementById("acordeon1").className="abierto";
			
		};
		/*Fin foco en el acordeon*/
//};
});
	

