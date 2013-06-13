/* className IE対策
------------------------------------------------------------*/
var attName;
if(document.documentElement.getAttribute("style") == document.documentElement.style){
	attName='className';
}else{
	attName='class';
}

/* サブウィンドウオープン
------------------------------------------------------------*/
function openSWin(uri,name,w,h) {
	sub=window.open(uri,name,"location=no,directories=no,scrollbars=1,resizable=0,width="+w+",height="+h+",left=5,top=5");
	sub.focus();
}

/* 親ウィンドウオープン
-----------------------------------------------------------------------------------------------------------------*/
function openWin(strUrl,winName) {
  winName = window.open(strUrl,winName);
  winName.focus();
}

/* 画像マウスオーバー
------------------------------------------------------------*/
function imgRoll(obj,flag) {
	var pathsrc = obj.getAttribute("src");
	var path = pathsrc.slice(0,pathsrc.lastIndexOf("/")+1);
	var imgname = pathsrc.slice(pathsrc.lastIndexOf("/")+1,pathsrc.length);
	if(flag) {
		var imgname = imgname.replace(/_def/i,"_ovr");
	} else {
		var imgname = imgname.replace(/_ovr/i,"_def");
	}
	obj.setAttribute("src",path + imgname);
}

/* 右ナビ現在地表示
------------------------------------------------------------*/

/*
操作開始クローズ
--------------------------------------------------*/
var closeDigit=6;
var closeRightNav=function(){
	if(document.getElementById("rnav")){
		var idLn=document.getElementById("rnav");
		tNUl=idLn.getElementsByTagName("ul");
		for(var i=0;i<tNUl.length;i++){
			var idUl=tNUl[i].getAttribute("id");
			if(idUl&&idUl.length>=closeDigit){
				document.getElementById(idUl).style.display="none";
			}
		}
	}
};

/*
ライトナビ操作
--------------------------------------------------*/
function loadRightNavi(){
	closeRightNav();
	var locPath=location.pathname;
	var locHost=location.host;
	var locDomain="http://"+locHost;
	if(document.getElementById("rnav")){
		var idLn=document.getElementById("rnav");
		tNA=idLn.getElementsByTagName("a");
	}
	for(var i=0;i<tNA.length;i++){
		var atHref=tNA[i].getAttribute("href");
		var qStr=atHref.indexOf('?');
		if(qStr>-1){
			atHref=atHref.substring(0,qStr);
		}
		if(atHref.indexOf(locHost)==-1){
			atHref=locHost+atHref;
		}
		if((locDomain+locPath).indexOf(atHref)!=-1){
			var idLi=tNA[i].parentNode.getAttribute("id");
		}
	}
	if(idLi) var lenIdLi=idLi.length;
	else return;
	if(document.getElementById(idLi)) document.getElementById(idLi).className="current";
	if(idLi){
		var idGGParentUl=idLi.slice(0,lenIdLi-6)+"00";
		var idGParentUl=idLi.slice(0,lenIdLi-4)+"00";
		var idParentUl=idLi.slice(0,lenIdLi-2)+"00";
		var idChildtUl=idLi+"00";
	}
	if(idLi.length==6){
		var idParentLi=idLi.slice(0,4);
		if(document.getElementById(idParentLi)) document.getElementById(idParentLi).className="current";
	}
//alert(idLi+" "+idGGParentUl+" "+idGParentUl+" "+idParentUl+" "+idChildtUl);
	if(document.getElementById(idGGParentUl)) document.getElementById(idGGParentUl).style.display="block";
	if(document.getElementById(idGParentUl)) document.getElementById(idGParentUl).style.display="block";
	if(document.getElementById(idParentUl)) document.getElementById(idParentUl).style.display="block";
	if(document.getElementById(idChildtUl)) document.getElementById(idChildtUl).style.display="block";
}


/* 右クリック禁止 IE対策
------------------------------------------------------------*/
function notes(eve){
	if(document.all){
		if(event.button == 2){
			alert("右クリック禁止になっています。画像のコピーはしないでね！");
			return false;
		}
	}else if(document.layers){
		if(eve.which == 3){
			alert("右クリック禁止になっています。画像のコピーはしないでね！");
			return false;
		}
	}
}

if(document.layers)document.captureEvents(Event.MOUSEDOWN);
document.onmousedown=notes;


