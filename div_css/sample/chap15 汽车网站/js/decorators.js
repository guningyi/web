// JavaScript Document
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}
addLoadEvent(function(){ 

	var loc =new String(window.location);
	var lang =new String('es');
	if(loc.indexOf('/es/')!=-1){lang='es';}
	if(loc.indexOf('/en/')!=-1){lang='en';}
		
	if(loc.indexOf('=ES')!=-1){lang='es';}
	if(loc.indexOf('=EN')!=-1){lang='en';}
		
	if(loc.indexOf('cambioIdioma=EN')!=-1){lang='es';}
	if(loc.indexOf('cambioIdioma=ES')!=-1){lang='en';}
	
	if(lang=='en'){
		MM_preloadImages (
		"/webibd/admin/img/imgMenuSupEn/menu_enopcion1.gif"
		,"/webibd/admin/img/imgMenuSupEn/menu_enopcion1_over.gif"
		,"/webibd/admin/img/imgMenuSupEn/menu_enopcion2.gif"
		,"/webibd/admin/img/imgMenuSupEn/menu_enopcion2_over.gif"
		,"/webibd/admin/img/imgMenuSupEn/menu_enopcion3.gif"
		,"/webibd/admin/img/imgMenuSupEn/menu_enopcion3_over.gif"
		,"/webibd/admin/img/imgMenuSupEn/menu_enopcion4.gif"
		,"/webibd/admin/img/imgMenuSupEn/menu_enopcion4_over.gif"
		,"/webibd/admin/img/imgMenuSupEn/menu_enopcion5.gif"
		,"/webibd/admin/img/imgMenuSupEn/menu_enopcion5_over.gif"
		,"/webibd/admin/img/imgMenuSupEn/menu_enopcion6.gif"
		,"/webibd/admin/img/imgMenuSupEn/menu_enopcion6_over.gif"
		,"/webibd/admin/img/imgMenuSupEn/menu_enopcion7.gif"
		,"/webibd/admin/img/imgMenuSupEn/menu_enopcion7_over.gif"
		,"/webibd/gc/prod/en/admin/img/btn_rss_small_rollover.png"
		,"/webibd/gc/prod/en/admin/img/btn_rss_small.png"
		,"/webibd/gc/prod/en/admin/img/btn_imprimir.png"
		,"/webibd/gc/prod/en/admin/img/btn_imprimir_roll_over.png"
		,"/webibd/gc/prod/es/admin/img/fnd_home_ultnot.gif"			//Home- Barra Ultimas Noticias
		,"/webibd/gc/prod/en/admin/img/mas_cuadrado.jpg"		 	//Home- Barra Ultimas Noticias
		,"/webibd/gc/prod/en/admin/img/mas_cuadrado_rollover.jpg"	//Home- Barra Ultimas Noticias	 		
		,"/webibd/admin/img/imgMenuSup/fondoOpcBusq.gif"
		,"/webibd/gc/prod/en/admin/img/flecha_Der_rollover.gif"
		,"/webibd/gc/prod/en/admin/img/flecha_Iz_roll_over.gif"
		,"/webibd/gc/prod/en/admin/img/bn_cerrar.jpg"
		,"/webibd/gc/prod/en/admin/img/bn_cerrar_rollover.jpg"
		,"/webibd/admin/img/imgBuscador/pieOpcBusq.gif"
		);		

	}else{
		MM_preloadImages (
		"/webibd/admin/img/imgMenuSup/menu_opcion1.gif"
		,"/webibd/admin/img/imgMenuSup/menu_opcion2.gif"
		,"/webibd/admin/img/imgMenuSup/menu_opcion3.gif"
		,"/webibd/admin/img/imgMenuSup/menu_opcion4.gif"
		,"/webibd/admin/img/imgMenuSup/menu_opcion5.gif"
		,"/webibd/admin/img/imgMenuSup/menu_opcion6.gif"
		,"/webibd/admin/img/imgMenuSup/menu_opcion7.gif"
		,"/webibd/admin/img/imgMenuSup/menu_opcion1_over.gif"
		,"/webibd/admin/img/imgMenuSup/menu_opcion2_over.gif"
		,"/webibd/admin/img/imgMenuSup/menu_opcion3_over.gif"
		,"/webibd/admin/img/imgMenuSup/menu_opcion4_over.gif"
		,"/webibd/admin/img/imgMenuSup/menu_opcion5_over.gif"
		,"/webibd/admin/img/imgMenuSup/menu_opcion6_over.gif"
		,"/webibd/admin/img/imgMenuSup/menu_opcion7_over.gif"
		,"/webibd/gc/prod/es/admin/img/btn_rss_small_rollover.png"
		,"/webibd/gc/prod/es/admin/img/btn_rss_small.png"	
		,"/webibd/gc/prod/es/admin/img/btn_imprimir.png"
		,"/webibd/gc/prod/es/admin/img/btn_imprimir_roll_over.png"	
		,"/webibd/gc/prod/es/admin/img/fnd_home_ultnot.gif"			//Home- Barra Ultimas Noticias
		,"/webibd/gc/prod/en/admin/img/mas_cuadrado.jpg"		 	//Home- Barra Ultimas Noticias
		,"/webibd/gc/prod/en/admin/img/mas_cuadrado_rollover.jpg"	//Home- Barra Ultimas Noticias
		,"/webibd/admin/img/imgMenuSup/fondoOpcBusq.gif"
		,"/webibd/gc/prod/es/admin/img/flecha_Der_rollover.gif"		
		,"/webibd/gc/prod/es/admin/img/flecha_Iz_roll_over.gif"
		,"/webibd/gc/prod/es/admin/img/bn_cerrar.jpg"
		,"/webibd/gc/prod/es/admin/img/bn_cerrar_rollover.jpg"
		,"/webibd/admin/img/imgBuscador/pieOpcBusq.gif"
		);	

	}
});










	

