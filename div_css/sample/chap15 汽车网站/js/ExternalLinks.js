addLoadEvent(function(){ 	//funcion que se lanza al cargar la pagina
	ExternalLinks.init();
});
/*----------------------------------------------FUNCIONES AUXILIARES-----------------------------------*/
var num_subir=-1;
function sumar_subir(){ num_subir--;}
function volver_anterior(){ history.go(num_subir);}
function imprimirURL(){//funcion para poder imprimir los contenidos
	var rutaURL = String();
	if(document.getElementById('urlImprimir')){rutaURL = document.getElementById('urlImprimir').value;}
	if (rutaURL){
		ventimp = window.open(rutaURL, null, 'height=600, width=800, status=yes, toolbar=no, menubar=no, location=no, locationbar=no, resizable=no, scrollbars=yes');
		//ventimp.print();
	}else{
		window.print();
	}
}  
/*---------------------------------------------------FUNCIONALIDADES VARIADAS----------------------------------------------*/
function volverbutton(objd,lang,esportal){//boton volver html notas de prensa
	if(objd.id=='volverAudiovisuales'){
		objd.innerHTML+="";
		var altVolv = objd.getElementsByTagName('input')[0].value;
		if(lang=='es'){objd.innerHTML +="<a id='btnvolver' tabindex='3' href="../Corporate/www.iberdrola.es/webibd/gc/prod/en/admin/js/+volver+"><img id='bvolver' alt='"+altVolv+"' src='/webibd/gc/prod/es/admin/img/btn_volver.png'/></a>";}
			else{objd.innerHTML +="<a id='btnvolver' tabindex='3' href="../Corporate/www.iberdrola.es/webibd/gc/prod/en/admin/js/+volver+"><img id='bvolver' alt='"+altVolv+"' src='/webibd/gc/prod/es/admin/img/btn_volver.png'/></a>";}
	}
	if(objd.id=='volver'){
		objd.innerHTML+="";
		if(esportal=='si'){/*Los enlaces del boton volver son distintos, dependiendo si la nota de prensa se ve desde el portal o la web*/
			if(lang=='es'){objd.innerHTML +="<a id='btnvolver' tabindex='3' onclick='volver_anterior();return false;'><img id='bvolver' alt='IR AL LISTADO GENERAL DE NOTAS DE PRENSA.' src='/webibd/gc/prod/es/admin/img/btn_volver.png'/></a>";}
			else{objd.innerHTML +="<a id='btnvolver' tabindex='3' onclick='volver_anterior();return false;'><img id='bvolver' alt='GO TO GENERAL LIST OF PRESS RELEASES.' src='/webibd/gc/prod/es/admin/img/btn_volver.png'/></a>";}
		}else{
			if(lang=='es'){objd.innerHTML +="<a id='btnvolver' tabindex='3' href="../Corporate/www.iberdrola.es/webibd/gc/prod/en/admin/js/+volver+"><img id='bvolver' alt='IR AL LISTADO GENERAL DE NOTAS DE PRENSA.' src='/webibd/gc/prod/es/admin/img/btn_volver.png'/></a>";}
			else{objd.innerHTML +="<a id='btnvolver' tabindex='3' href="../Corporate/www.iberdrola.es/webibd/gc/prod/en/admin/js/+volver+"><img id='bvolver' alt='GO TO GENERAL LIST OF PRESS RELEASES.' src='/webibd/gc/prod/es/admin/img/btn_volver.png'/></a>";}
		}
	}
	if(objd.id=='volver_small'){
		objd.innerHTML+="";
		if(esportal=='si'){/*Los enlaces del boton volver son distintos, dependiendo si la nota de prensa se ve desde el portal o la web*/
			if(lang=='es'){objd.innerHTML +="<a id='btnvolver_small' href='#' onclick='volver_anterior();return false;'><span class='imgvolver'></span><span class='textovolver'>IR AL LISTADO GENERAL DE NOTAS DE PRENSA </span></a>";}
			else{objd.innerHTML +="<a id='btnvolver_small' href='#' onclick='volver_anterior();return false;'><span class='imgvolver'></span><span class='textovolver'>GO TO GENERAL LIST OF PRESS RELEASES</span></a>";}
		}else{
			if(objd.getElementsByTagName('input')[0]){
				objd.innerHTML +="<a id='btnvolver_small' href='../Corporate/www.iberdrola.es/webibd/gc/prod/en/admin/js/"+volver+"'><span class='imgvolver'></span><span class='textovolver'>"+objd.getElementsByTagName('input')[0].value+"</span></a>";
			}else{
				if(lang=='es'){objd.innerHTML +="<a id='btnvolver_small' href='../Corporate/www.iberdrola.es/webibd/gc/prod/en/admin/js/"+volver+"'><span class='imgvolver'></span><span class='textovolver'>IR AL LISTADO GENERAL DE NOTAS DE PRENSA </span></a>";}
				else{objd.innerHTML +="<a id='btnvolver_small' href="../Corporate/www.iberdrola.es/webibd/gc/prod/en/admin/js/+volver+"><span class='imgvolver'></span><span class='textovolver'>GO TO GENERAL LIST OF PRESS RELEASES</span></a>";}	
			}
		}
	}
}

function anclasubir345(objd,lang){
	if(objd.className=='subir345'){
		var donde= '';
		if(objd.getElementsByTagName('input')[0]){	donde = objd.getElementsByTagName('input')[0].value;}
		else{donde = '#menu';}
		var ancla= document.createElement('input');
		ancla.className='subirb';
		ancla.type='button';
		ancla.onkeypress = function(e){
			var donde = '#menu';
			var e = e || window.event;
			if(window.event){/*Explorer*/if(window.event.keyCode == 13){subir_ancla(donde);}}
			else{ /*Safari, firefox, Netscape*/if(e.which == 13){subir_ancla(donde);}}
		}
		ancla.onclick = function(){subir_ancla(donde);}
		if(lang=='es'){	ancla.value="SUBIR";}else{ancla.value="UP";}
		objd.appendChild(ancla);
	}
}
function faldon(objd){
	if(objd.className=='columnaIzquierdaNotFaldon'){
		if(objd.getElementsByTagName('input')[0]){
			var HcapaIzq = objd.getElementsByTagName('input')[0].value;
			objd.style.height=HcapaIzq + 'px';
		}
	}
	if(objd.className=='columnaDerechaFaldon'){
		if(objd.getElementsByTagName('input')[0]){
			var HcapaDer = objd.getElementsByTagName('input')[0].value;
			objd.style.height=HcapaDer + 'px';
		}
	} 
}
function botonesAdd(objd,lang){//annado los botones imprimir y cerrar
	if(objd.id=='cierre'){
		objd.innerHTML+="";
		if(lang=='es'){
			objd.innerHTML += "<a id='btonCierre' onclick='window.close();return false;'><img src='/webibd/gc/prod/es/admin/img/bn_cerrar.jpg' alt='' class='btonCierre'/></a>";
		}else{
			objd.innerHTML += "<a id='btonCierre' onclick='window.close();return false;'><img src='/webibd/gc/prod/en/admin/img/bn_cerrar.jpg' alt='' class='btonCierre'/></a>";
		}
	}
	if(objd.id=='imp'){
		objd.innerHTML+="";
		if(lang=='es'){
			objd.innerHTML += "<a id='btnimprimir' title='Imprimir, abre en nueva ventana' href='#' onclick='imprimirURL();return false;' tabindex='2'><img id='imprimir' alt='Imprimir' src='/webibd/gc/prod/es/admin/img/btn_imprimir.png'/></a>";
		}else{
			objd.innerHTML += "<a id='btnimprimir' title='Print, opens in new window' href='#' onclick='imprimirURL();return false;' tabindex='2'><img id='imprimir' alt='Print' src='/webibd/gc/prod/en/admin/img/btn_imprimir.png'/></a>";
		}
	}
}
function funcionalidades(lang, esportal){
	var ObjsDer   = document.getElementsByTagName('div');
		for(var i = 0; i < ObjsDer.length; i++){
			var objd = ObjsDer[i];
			if(objd.id=='rss'){		if(esportal=='si'){	objd.style.visibility='hidden';	}		}
			if(objd.className=='colderContenido'){
				if(objd.getElementsByTagName('input')[0]){
					var WcapaDerecha = objd.getElementsByTagName('input')[0].value;
					objd.style.width=WcapaDerecha + '%';
				}
			}
			if(objd.className=='colizqContenido'){
				if(objd.getElementsByTagName('input')[0]){
					var WcapaIzquierda=objd.getElementsByTagName('input')[0].value;
					objd.style.width=WcapaIzquierda + '%';
				}
			}
			botonesAdd(objd,lang);
			faldon(objd);
			volverbutton(objd,lang,esportal);//notas de prensa
			anclasubir345(objd,lang);
		}
}
function rollover(){//Listado imagenes puede tener imágenes con rollover con lo que hay que añadir los eventos onmouseover y onmouseout para ello
	var Objsover   = document.getElementsByTagName('a');
	for(var i = 0; i < Objsover.length; i++){
		var obj = Objsover[i];
		if(obj.className=='bloqueimgenlover'){
			obj.onmouseover = function(){
				var img=this.getElementsByTagName('img')[0];
				img.src=this.coords;
				return false;
			}
			obj.onmouseout = function(){
				var img=this.getElementsByTagName('img')[0];
				img.src=this.charset;
				return false;
			}
		}
		if(obj.className=='bloqueimgenloverNew'){
			obj.onmouseover = function(){
				var img=this.getElementsByTagName('img')[0];
				var over=this.getElementsByTagName('input')[1].value;
				var n=this.getElementsByTagName('input')[0].value;
				img.src=over;
				return false;
			}
			obj.onmouseout = function(){
				var img=this.getElementsByTagName('img')[0];
				var over=this.getElementsByTagName('input')[1].value;
				var n=this.getElementsByTagName('input')[0].value;
				img.src=n;
				return false;
			}
		}
	}	
}
function rollpie(){//icono rollover pie
	var Objsroll   = document.getElementsByTagName('a');
	for(var i = 0; i < Objsroll.length; i++){
		var icono = Objsroll[i];
		if(icono.className.indexOf('iconoencpieinferior')!=-1 && icono.getElementsByTagName('input')[0]){
			icono.onmouseover = function(){
				var img=this.getElementsByTagName('img')[0].src;
				var roll=this.getElementsByTagName('input')[0].value;
				this.getElementsByTagName('input')[0].value= img;
				this.getElementsByTagName('img')[0].src=roll;
				return false;
			}
			icono.onmouseout = function(){
				var roll=this.getElementsByTagName('img')[0].src;
				var img=this.getElementsByTagName('input')[0].value;
				this.getElementsByTagName('input')[0].value= roll;
				this.getElementsByTagName('img')[0].src=img;
				return false;
			}
		}			
	}	
}
/*------------------------------------------------FIN FUNCIONALIDADES VARIADAS----------------------------------------------*/

/*---------------------------FUNCIONALIDADES ENLACES------------------------------------------------------------------------*/
function multimedia_pdf(obj,lang){//enlaces multimedia o pdf
	if(obj.name=='multimedia'){
		if(lang=='es'){obj.title='Enlace multimedia, se abre en nueva ventana.';}
		else{obj.title='Multimedia link, opens in new window.';}
		var ico = document.createElement('img');
		ico.src ='/webibd/gc/prod/'+lang+'/admin/img/icono_ventana_azul.png';
		ico.className ='iconoventana';
		obj.appendChild(ico);
	}
	//***************** title enlaces pdf
	if(obj.href.indexOf('.pdf')!=-1 && obj.getAttribute('rel') != 'external'){
		var title=obj.title;
		if(title.length!=0){	if(title.lastIndexOf('.',title.length)==-1){title+='.';}		}
		//if(lang=='es'){	obj.title += ' Documento PDF.';}
		//else{obj.title += ' Document PDF.';}
	}
}
function botones_funcionalidades(obj, lang){//FUNCIONALIDAD imprimir, volver TITLE cerrar BOTONES 
	if(obj.id=='btnimprimir'){
		obj.onkeypress = function(e){
			var e = e || window.event;
			if(window.event){/*Explorer*/if (window.event.keyCode==13){imprimirURL();return false;}}
			else{/*Safari, firefox, Netscape*/if (e.which==13){imprimirURL();return false;}}
		}
	}
	if(obj.id=='btnCerrar'){
		if(lang=='es'){obj.title='Cerrar, volver al contenido principal.';}
		else{obj.title='Close, return to main content.';}
	} 
	if(obj.id=='btnvolver' || obj.id=='btnvolver_small'){
		if(esportal='si'){
			obj.onkeypress = function(e){
				var e = e || window.event;
				if(window.event){/*Explorer*/if(window.event.keyCode == 13){volver_anterior();return false;}}
				else{ /*Safari, firefox, Netscape*/if(e.which == 13){volver_anterior();return false;}}
			}
		}
	} 	
} 
//Se añaden los eventos onclick, onkeypress a los enlaces que abren en nueva ventana (rel=external, rel=script)
function eventos(obj){
	if(obj.getAttribute('rel') == 'external'){//REL='EXTERNAL' 
		//abre en nueva ventana el enlace
		obj.onclick = function(){window.open(this.href); return false;}
		obj.onkeypress = function(e){
			var e = e || window.event;
			if(window.event){/*Explorer*/if (window.event.keyCode==13){window.open(this.href);return false;}}
			else{/*Safari, firefox, Netscape*/if(e.which==13){window.open(this.href);return false;}}
		}
	}else{//REL='SCRIPT'  VENTANA EMERGENTE
		if(obj.getAttribute('rel') == 'script'){//VENTANAS EMERGENTES sabiendo que los atributos charset=ancho y coords=alto :
			obj.onclick = function(){
				window.open(this.href, null, 'height='+this.coords+', width='+this.charset+', status=yes, toolbar=no, menubar=no, location=no, locationbar=no, resizable=no, scrollbars=yes');
				//this.href="#";
				return false;
			}
			obj.onkeypress = function(e){
				var e = e || window.event;
				if(window.event){
					if (window.event.keyCode==13){/*Explorer*/
						window.open(this.href, null, 'height='+this.coords+', width='+this.charset+', status=yes, toolbar=no, menubar=no, location=no, locationbar=no, resizable=no, scrollbars=yes');
					}
				}else{
					if (e.which==13){/*Safari, firefox, Netscape*/
						window.open(this.href, null, 'height='+this.coords+', width='+this.charset+', status=yes, toolbar=no, menubar=no, location=no, locationbar=no, resizable=no, scrollbars=yes');
					}
				}
				//this.href="#";
				return false;
			}
		}
	}
}
/*---------------------------FIN FUNCIONALIDADES ENLACES-------------------------------------------------------------------*/
/*---------------------------FUNCIONES DE INSERCION DE ICONOS DE ENLACES EN NUEVA VENTANA----------------------------------*/
function iconoimagen(obj,ico,lang){
	if(obj.className=='iconoencpieinferior' || obj.className=='iconoencpie'){//Enlaces elementos del pie
		var span = obj.getElementsByTagName('span')[0];
		if(obj.className=='iconoencpieinferior'){
			ico.src ='/webibd/gc/prod/'+lang+'/admin/img/icono_ventana_small.png';
			ico.className ='iconoventanasmall';
			span.appendChild(ico);
		}else{
			if(obj.className=='iconoencpie' ){
				ico.src ='/webibd/gc/prod/'+lang+'/admin/img/icono_ventana_gris.png';
				ico.className ='iconoventana';
				//este iconogen es el correspondiente al icono reuters del jsp info_bursatil 
				if(obj.getElementsByTagName('img')[0].className=='iconogen'){obj.appendChild(ico);}
				else{/*icono pie normal*/span.appendChild(ico);}
			}
		}							
	}else{//else si no es icono pie y el enlace tiene dentro una imagen
		var img = obj.getElementsByTagName('img')[0];
		var alt=img.alt;
		if(alt.length!=0){	if(alt.lastIndexOf('.',alt.length)==-1){alt+='.';}		}
		ico.src ='/webibd/gc/prod/'+lang+'/admin/img/icono_ventana_foto.png';
		if(img.alt.indexOf('abre')==-1){
			if(lang=='es'){alt += ' Abre en ventana nueva.';}
			else{alt += ' Open in new window.';	}
		}
		img.alt=alt;
		ico.alt=alt;
		//ico.style='border:none;';
		if(img.className=='imgDerContenidoAbrazado'){
			ico.className='iconoventanafotoDerAbra';obj.appendChild(ico);
		}else{
			if(obj.className!='descFaldon'){
				var span = obj.getElementsByTagName('span')[0]; 
				span.getElementsByTagName('img')[0].src=ico.src;
			}
		}
	}/*fin if else icono pie*/
}
function icononormal(obj,ico,lang,sh){
		//ICONO BANNER SUBHOMES
		if(sh.indexOf('bannersubhome')!=-1){//para la subhome
			ico.src ='/webibd/gc/prod/'+lang+'/admin/img/icono_ventana_foto.png';
			var lineas = obj.getElementsByTagName('span');
			ico.className='iconobannersubhome'+lineas.length+'linea';
			obj.appendChild(ico);
		}
		if(obj.className=='menuaso' || obj.className=='enlace_texto' || obj.className=='menuvisi'){
			ico.src ='/webibd/gc/prod/'+lang+'/admin/img/icono_ventana_azul.png';
			ico.className ='iconoventana';
			obj.appendChild(ico);
		}
		if(obj.className=='verde' || obj.className=='verdetabla' || obj.className=='mas' || obj.className=='maslis' || obj.className=='mashome' || obj.className=='bloqueimgenl' || obj.className=='bloqueimgenldef' || obj.className=='bloqueimgenlover' || obj.className=='bloqueimgenloverNew' || obj.className=='dec_tickbolsa' || obj.className=='dec_tick7' || obj.className=='bolsa2'){//obj.className=='dec_tickbolsa' enlace home ibex35
			ico.src ='/webibd/gc/prod/'+lang+'/admin/img/icono_ventana_verde.png';
			ico.className ='iconoventana';
			obj.appendChild(ico);
		}
		if(obj.className=='destacado' || obj.className=='bannersubhome' || obj.className=='banner1' || obj.className=='banner2' || obj.className=='bannernoticias1'){
			ico.src ='/webibd/gc/prod/'+lang+'/admin/img/icono_ventana_small.png';
			ico.className ='iconoventanasmall';
			if(obj.getElementsByTagName('span')[0]){
				var span = obj.getElementsByTagName('span')[0];
				span.appendChild(ico);
			}
		}
		if(obj.className=='menubasico' || obj.className=='nivel5'){
			ico.src ='/webibd/gc/prod/'+lang+'/admin/img/icono_ventana_gris.png';
			ico.className ='iconoventana';
			obj.appendChild(ico);
		}
		if(obj.className=='frametickersubhomeEn' || obj.className=='frametickersubhome'){
			ico.src ='/webibd/gc/prod/'+lang+'/admin/img/icono_ventana_emergente_tiker.png';
			ico.className='iconotickersubhome';
			obj.appendChild(ico);
		}
}
function iconospdf(obj,ico,lang,sh){
	//es un enlace a un pdf con imagen alert('entro');
	var title=obj.title;
	//ICONOS PDF BENNER SUBHOME 
	if(sh.indexOf('bannersubhome')!=-1){
		ico.src ='/webibd/gc/prod/'+lang+'/admin/img/icono_pdf_foto.png';
		var lineas = obj.getElementsByTagName('span');
		ico.className='iconobannersubhome'+lineas.length+'linea';
		obj.appendChild(ico);
	}else{
		if(obj.getElementsByTagName('img')[0]){
			ico.src ='/webibd/gc/prod/'+lang+'/admin/img/icono_pdf_foto.png';
			if(obj.getElementsByTagName('span')[0] && obj.getElementsByTagName('span')[0].getElementsByTagName('img')[0]){
				var span = obj.getElementsByTagName('span')[0];
				span.getElementsByTagName('img')[0].src=ico.src;
			}
		}
	}
}
function iconojavascript(obj,ico,lang){/*el enlace ya posse los atributos onclick y onkeypress en el html(documentum)*/
	var enlace=String(obj.getAttribute('onclick'));
	if(enlace.indexOf('#target=_blank')!=-1){
		ico.src ='/webibd/gc/prod/'+lang+'/admin/img/icono_ventana_azul.png';
		ico.className ='iconoventana';
		obj.appendChild(ico);
	}
}
function iconos(obj,lang){
	var ico = document.createElement('img');
	if(lang=='es'){	ico.alt = ' Abre en ventana nueva.';}else{ico.alt = ' Open in new window.';}
	var inner=new String(obj.innerHTML);
	if(inner.indexOf('[PDF]')!=-1){inner='si';}
	if(inner.indexOf('PDF')!=-1){inner='si';}
	if(obj.href.indexOf('.pdf')!=-1){inner='si';}
	var sh=String(obj.className);//para saber si es un banner de la subhome, annadirle un icono en caso de que abra en nueva ventana
	if(obj.getAttribute('rel') == 'javascript'){/*el enlace ya posse los atributos onclick y onkeypress en el html(documentum)*/
		iconojavascript(obj,ico,lang);
	}else if(inner!='si'){//si no es un enlace a pdf ni el anterior
		//si tiene una imagen y no es de la clase: 'banner1','banner2', 'bloqueimgenl', 'bloqueimgenldef', 'menuacordeon', 'bannercarrusel', 'bloqueimgenlover', 'destacado','bannernoticias1', 'bloqueimgenloverNew'
		if(obj.getElementsByTagName('img')[0] && obj.className!='banner1' && obj.className!='banner2' && obj.className!='bloqueimgenl' && obj.className!='bloqueimgenldef' &&  obj.className!='menuacordeon' && obj.className!='bannercarrusel' && obj.className!='bloqueimgenlover' && obj.className!='bloqueimgenloverNew' && obj.className!='destacado' && obj.className!='bannernoticias1'){//este iconogen es el correspondiente al icono reuters del jsp info_bursatil 
			iconoimagen(obj,ico,lang);//listado imágenes con rollover
		}else{//else si no tiene una imagen y tampoco es un enlace 
			icononormal(obj,ico,lang,sh);
		}
		
	}else if(inner=='si'){//el enlace es un pdf
		//if(lang=='es'){	obj.title += ' Documento PDF.';}else{obj.title += ' Document PDF.';}
		iconospdf(obj,ico,lang,sh);
	}
}
/*Funcion para generar el title del enlace*/
function Depuro(text){
	var caracteres=new Array('<span','</span>','<img','<br/>','<br>','<br />','<SPAN','</SPAN>','<IMG','<BR/>','<BR>','<BR />','<input','<INPUT');	
	var numc= new Array('5','7','4','5','4','6','6','6','6','6','6','6','6','6');
	for(var i=0; i< caracteres.length; i++){
	//alert('['+caracteres[i]+']'+text.indexOf(caracteres[i]));
		while(text.indexOf(caracteres[i])!=-1){
			if(text.indexOf(caracteres[i])==0){
				if(i==1 || i==3){text= text.substring(text.indexOf(caracteres[i])+numc[i],text.length);}
				else{text=text.substr(text.indexOf('>')+1,text.length);}
			}else{
				if(i==1 || i==3){
					var num=parseInt(text.indexOf(caracteres[i]))+ parseInt(numc[i]);
					text=text.substr(0,text.indexOf(caracteres[i]))+' '+text.substring(num,text.length);
				}else{
					var num=parseInt(text.indexOf(caracteres[i]));
					var ocu=text.substr(num,text.length);
					var num2=parseInt(ocu.indexOf('>')+1)+ parseInt(num);
					text=text.substr(0,num)+' '+text.substr(num2,text.length);
				}			
			}
		}
	}
	text=nospaces(text);/*funcion que elimina los espacios en blanco, retornos de carro y linea, esta en onload.js*/
	return text;
};
/*---------------------------FIN FUNCIONES DE INSERCION DE ICONOS DE ENLACES EN NUEVA VENTANA----------------------------------*/

var ExternalLinks = {
	init: function(){
		var ticker=new String();
		var portal=new String();
		var esportal=new String();/*Los enlaces del boton volver son distintos, dependiendo si la nota de prensa se ve desde el portal o la web*/
		if(window.parent[0]!=null){
			portal=new String(window.parent[0].location);
			esportal=new String('no');
			if(portal.indexOf('/wps/portal/')!=-1){esportal='si';}
			if(portal.length){esportal='si';}	
		}
		//variables para saber el idioma 
		var loc =new String(window.location);
		var lang =new String('es');
		if(loc.indexOf('tickerDoble.do')!=-1){loc=new String(window.parent.location);}
		if(loc.indexOf('tickerSubHome.do')!=-1){loc=new String(window.parent.location);}
		if(loc.indexOf('/es/')!=-1){lang='es';}
		if(loc.indexOf('/en/')!=-1){lang='en';}
		if(loc.indexOf('=ES')!=-1){lang='es';}
		if(loc.indexOf('=EN')!=-1){lang='en';}
		if(loc.indexOf('cambioIdioma=EN')!=-1){lang='es';}
		if(loc.indexOf('cambioIdioma=ES')!=-1){lang='en';}
		
		rollover();//listado imagenes
		rollpie();//rolloverpie
		funcionalidades(lang, esportal);
		
		//Enlaces!!!
		var linksObj = document.getElementsByTagName('A');
		for(var i = 0; i < linksObj.length; i++){
			var obj = linksObj[i];			
			botones_funcionalidades(obj,lang);//FUNCIONALIDADES BOTONES
			multimedia_pdf(obj,lang);//ENLACES MULTIMEDIA(mms://) y PDF 
			eventos(obj);//ANNADO LOS EVENTOS ONCLICK ONKEYPRESS
			//annado al title el alt de la imagen y tb lo que contiene dentro el enlace, sino solo annado el alt de la imagen 
			var img;
			//Si somos agregadores no annadimos icono
			if(obj.id != 'idTwitter' && obj.id != 'idDelicious' && obj.id != 'idMeneame' && obj.id != 'idFacebook' && obj.id != 'idYahoo' && obj.id != 'idMail'){
				if(obj.title.length!=0 && obj.title.lastIndexOf('.',obj.title.length)==-1)obj.title+='.';
				if(obj.className=='destacado' || obj.className=='bannersubhome' || obj.className=='banner1' || obj.className=='banner2' ||  obj.className=='bannernoticias1' || obj.className=='bannernoticias11' || obj.className=='bannernoticias12' && obj.getElementsByTagName('img')[0]){
					img=obj.getElementsByTagName('img')[0];
					if(obj.getElementsByTagName('span')[0]){
						var span=obj.getElementsByTagName('span')[0];
						obj.title=img.alt+': '+span.innerHTML;
					}else{
						obj.title+=img.alt;
					}
				}else if(obj.getElementsByTagName('img')[0] || obj.getElementsByTagName('img')[1]){
					if(obj.getElementsByTagName('img')[0])
					{img=obj.getElementsByTagName('img')[0];}
					if(obj.getElementsByTagName('img')[1])
					{img=obj.getElementsByTagName('img')[1];}
					if(obj.id!='btnimprimir'){obj.title+=img.alt;}
				}
			}
			//ENLACES EN NUEVA VENTANA rel='external', rel='script' ventana emergente 
			//Annadimos icono y title para informar al usuario
			if(obj.getAttribute('rel') == 'external' || obj.getAttribute('rel') == 'script' || obj.getAttribute('rel') == 'javascript'){
				var title= ' ';
				if(obj.title.length==0 && (!obj.getElementsByTagName('img')[0] || !obj.getElementsByTagName('img')[1]))	obj.title+=Depuro(obj.innerHTML);			
				if(title.lastIndexOf('.',title.length)==-1) obj.title+='.';
				if(lang=='es'){title+=' Enlace externo, se abre en ventana nueva.';}else{title+=' External link, opens in new window.';}
				obj.title+=title;
				
				//Si somos agregadores no annadimos icono
				if(obj.id != 'idTwitter' && obj.id != 'idDelicious' && obj.id != 'idMeneame' && obj.id != 'idFacebook' && obj.id != 'idYahoo' && obj.id != 'idMail'){
					iconos(obj,lang);//ANNADIMOS TITLE E ICONO
				}
			
			}
		}/*fin for*/
		return false;
	}
}	