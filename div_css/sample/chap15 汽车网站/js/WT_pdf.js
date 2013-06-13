addLoadEvent(function(){ /*INSA: insertamos la huella a los enlaces a pdf*/	
	WT_pdf.init();
});

/*Elimino las etiquetas img, br y span (en este ultimo caso dejo el texto que contiene)*/
function DepuroWT(text){
	text=nospaces(text);/*funcion que elimina los espacios en blanco, retornos de carro y linea, esta en onload.js*/
	var caracteres=new Array('<span','</span>','<img','<br/>','<br>','<br />','<SPAN','</SPAN>','<IMG','<BR/>','<BR>','<BR />','<input','<INPUT');	
	var numc= new Array('5','7','4','5','4','6','6','6','6','6','6','6','6','6');
	for(var i=0; i< caracteres.length; i++){
		while(text.indexOf(caracteres[i])!=-1){
			if(text.indexOf(caracteres[i])==0){
				if(i==1 || i==3){text=text.substring(text.indexOf(caracteres[i])+numc[i],text.length);}
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
	return text;
};
/*En el caso del buscador solo cojo la informacion que este dentro del span class='resultadoNegro'*/
function Buscador(nodes){
	var ti;
	for(var i=0; i< nodes.length; i++){
		if(nodes[i].className=='resultadoNegro'){
			ti=nodes[i].innerHTML;
		}
	}
	return ti;
};
/*Esta funcion se llama desde el flash de la home para estadisticas de webtrends al pinchar sobre enlaces a pdfs*/
function pdfWTFlash (url){
	//alert("Entra " + url); 
	var lang = String('es');
	if(url.indexOf('/es/')!=-1){lang='es';}
	if(url.indexOf('/en/')!=-1){lang='en';}
	var ruta= url.substring(url.indexOf("/"+lang+"/"),url.indexOf("?WT.ac="));
	var wtAC = url.substring(url.indexOf("?WT.ac=")+7,url.indexOf("&WT.ti="));
	var wtTI = url.substring(url.indexOf("&WT.ti=")+7,url.length);
	/*alert ("Ruta: " + ruta);
	alert ("wtAC: " + wtAC);
	alert ("wtTI: " + wtTI);*/
	dcsMultiTrack('DCS.dcsuri',ruta,'WT.ti',wtTI,'WT.ac',wtAC);
}; 
var WT_pdf = {
	init: function(){
		//enlaces a pdf
		var Objspdf   = document.getElementsByTagName('a');
		for(var i = 0; i < Objspdf.length; i++){
			var obj = Objspdf[i];
			if(obj.href.indexOf('.pdf')!=-1 ||  obj.href.indexOf('.avi')!=-1 || obj.href.indexOf('.docx')!=-1 || obj.href.indexOf('.doc')!=-1 || obj.href.indexOf('.mp2')!=-1 || obj.href.indexOf('.mp3')!=-1 || obj.href.indexOf('.wav')!=-1 || obj.href.indexOf('.mpeg')!=-1 || obj.href.indexOf('.rar')!=-1 || obj.href.indexOf('.zip')!=-1 || obj.href.indexOf('.xls')!=-1 || obj.href.indexOf('.xlsx')!=-1){//es un enlace a pdf!!!
				//if(parseInt(obj.href.length-4)==obj.href.indexOf('.pdf')){
					if(obj.rel=="external"){
						//alert('nueva ventana');
						obj.onclick = function(){ 
							var lang = String('es');
							var enlace= this.href;
							if(enlace.indexOf('/es/')!=-1){lang='es';}
							if(enlace.indexOf('/en/')!=-1){lang='en';}
							var ruta= enlace.substring(enlace.indexOf("/"+lang+"/"),enlace.length);
							var ti=this.innerHTML;
							if(this.className=='resultadoEnlaces'){ ti=Buscador(this.childNodes);} 
							else if(ti.indexOf('<span')!=-1 || ti.indexOf('<img')!=-1){ti=DepuroWT(ti);}/*alert(ti);*/
							dcsMultiTrack('DCS.dcsuri',ruta,'WT.ti',ti);
							window.open(this.href);
							return false;
						}
						obj.onkeypress = function(e){
							var e = e || window.event;
							var lang = String('es');
							var enlace= this.href;
							if(enlace.indexOf('/es/')!=-1){lang='es';}
							if(enlace.indexOf('/en/')!=-1){lang='en';}
							var ruta= enlace.substring(enlace.indexOf("/"+lang+"/"),enlace.length);
							var ti=this.innerHTML;
							if(this.className=='resultadoEnlaces'){ ti=Buscador(this.childNodes);} 
							else if(ti.indexOf('<span')!=-1 || ti.indexOf('<img')!=-1){ti=DepuroWT(ti);}/*alert(ti);*/
							if(window.event){/*Explorer*/if (window.event.keyCode==13){dcsMultiTrack('DCS.dcsuri',ruta,'WT.ti',ti);window.open(this.href);return false;}}
							else{/*Safari, firefox, Netscape*/if(e.which==13){dcsMultiTrack('DCS.dcsuri',ruta,'WT.ti',ti);window.open(this.href);return false;}}
						}
					}else if(obj.rel=="script"){ 					
						//alert('ventana emergente');
						obj.onclick = function(){
							//this.href="#";
							var lang = String('es');
							if(this.href.indexOf('/es/')!=-1){lang='es';}
							if(this.href.indexOf('/en/')!=-1){lang='en';}
							var ruta= this.href.substring(this.href.indexOf("/"+lang+"/"),this.href.length);
							var ti=this.innerHTML;
							if(this.className=='resultadoEnlaces'){ ti=Buscador(this.childNodes);} 
							else if(ti.indexOf('<span')!=-1 || ti.indexOf('<img')!=-1){ti=DepuroWT(ti);}/*alert(ti);*/
							dcsMultiTrack('DCS.dcsuri',ruta,'WT.ti',ti);
							window.open(this.href, null, 'height='+this.coords+', width='+this.charset+', status=yes, toolbar=no, menubar=no, location=no, locationbar=no, resizable=no, scrollbars=yes');
							return false;
						}
						obj.onkeypress = function(e){
							var e = e || window.event;
							//this.href="#";
							var lang = String('es');
							if(this.href.indexOf('/es/')!=-1){lang='es';}
							if(this.href.indexOf('/en/')!=-1){lang='en';}
							var ruta= this.href.substring(this.href.indexOf("/"+lang+"/"),this.href.length);
							var ti=this.innerHTML;
							if(this.className=='resultadoEnlaces'){ ti=Buscador(this.childNodes);} 
							else if(ti.indexOf('<span')!=-1 || ti.indexOf('<img')!=-1){ti=DepuroWT(ti);}/*alert(ti);*/
							if(window.event){/*Explorer*/
								if (window.event.keyCode==13){
									dcsMultiTrack('DCS.dcsuri',ruta,'WT.ti',ti);
									window.open(this.href, null, 'height='+this.coords+', width='+this.charset+', status=yes, toolbar=no, menubar=no, location=no, locationbar=no, resizable=no, scrollbars=yes');
								}
							}else{/*Safari, firefox, Netscape*/
								if (e.which==13){
									dcsMultiTrack('DCS.dcsuri',ruta,'WT.ti',ti);
									window.open(this.href, null, 'height='+this.coords+', width='+this.charset+', status=yes, toolbar=no, menubar=no, location=no, locationbar=no, resizable=no, scrollbars=yes');									
								}
							}
							return false;
						}
					}else{
						//alert('misma ventana');
						obj.onclick = function(){ 
							var lang = String('es');
							var enlace= this.href;
							if(enlace.indexOf('/es/')!=-1){lang='es';}
							if(enlace.indexOf('/en/')!=-1){lang='en';}
							var ruta= enlace.substring(enlace.indexOf("/"+lang+"/"),enlace.length);
							var ti=this.innerHTML;
							if(this.className=='resultadoEnlaces'){ ti=Buscador(this.childNodes);} 
							else if(ti.indexOf('<span')!=-1 || ti.indexOf('<img')!=-1){ti=DepuroWT(ti);}/*alert(ti);*/
							dcsMultiTrack('DCS.dcsuri',ruta,'WT.ti',ti);
						}
						obj.onkeypress = function(e){
							var e = e || window.event;
							var lang = String('es');
							var enlace= this.href;
							if(enlace.indexOf('/es/')!=-1){lang='es';}
							if(enlace.indexOf('/en/')!=-1){lang='en';}
							var ruta= enlace.substring(enlace.indexOf("/"+lang+"/"),enlace.length);
							var ti=this.innerHTML;
							if(this.className=='resultadoEnlaces'){ ti=Buscador(this.childNodes);} 
							else if(ti.indexOf('<span')!=-1 || ti.indexOf('<img')!=-1){ti=DepuroWT(ti);}/*alert(ti);*/
							if(window.event){/*Explorer*/if(window.event.keyCode==13){dcsMultiTrack('DCS.dcsuri',ruta,'WT.ti',ti);}}
							else{/*Safari, firefox, Netscape*/if(e.which==13){dcsMultiTrack('DCS.dcsuri',ruta,'WT.ti',ti);}}
						}
					}
				//}
			}/*fin if*/
		}/*fin for*/
		return false;
	}
}