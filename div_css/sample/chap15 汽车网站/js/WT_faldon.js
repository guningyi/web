/*INSA: insertamos meta de los faldones y a los enlaces de los destacados annadimos el tile de la pagina*/
addLoadEvent(function(){ 	
	WT_faldon.init();
});

function metaKeywords() {
	
}

var WT_faldon = {
	init: function(){
		//annado el meta del faldon a la pagina
		//var meta= String(document.getElementById('metafaldon').value);
		//metaCollection = document.getElementsByTagName('meta');
		//for (i=0;i<metaCollection.length;i++) {
		//	nameAttribute = metaCollection[i].name.search(/Keywords/);
		//	if (nameAttribute!= -1) {
		//		metaCollection[i].content+=meta;
		//		alert(metaCollection[i].content);
		//	}
		//}/*fin for*/	
		//annado al href el valor del título de la pagina
		var title= document.title;
		var caracteres= new Array('Á','É','Í','Ó','Ú','á','é','í','ó','ú','ñ','&','#','-','+','?',' ','	','"','\\');
		var caracteresB=new Array('A','E','I','O','U','a','e','i','o','u','n','_','_','_','_','_','_','_','_','_');
		for(var i = 0; i < caracteres.length; i++){
			while(title.indexOf(caracteres[i])!=-1){
				title=title.replace(caracteres[i],caracteresB[i]);
			}
		}
		title=nospaces(title);/*funcion que elimina los espacios en blanco, retornos de carro y linea, esta en onload.js*/
		//alert(title);
		var linksObj = document.getElementsByTagName('A');
		for(var i = 0; i < linksObj.length; i++){
			var obj = linksObj[i];
			if (obj.className=='descFaldon'){
				obj.href+='&DCSext.pagFaldon='+title;
			}
		}//fin for
	}
}
