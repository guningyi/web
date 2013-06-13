function nOver(el){el.className+=' over ';}
function nOut(el){el.className=el.className.replace('over','');}
function createValueList(folderID,ref){var list = "";list = findRoot(list,folderID,ref);return list;}
function findRoot(list,folderID,ref){
	var newID = 0;
	var el = getE(folderID);
	for(n=0;n<el.parentNode.parentNode.attributes.length; n++){
		if( el.parentNode.parentNode.attributes[n].nodeName.toLowerCase()=='id'){
			newID= el.parentNode.parentNode.attributes[n].nodeValue;
			if(list==""){
				list = newID;
				}
			else{
				list += "," + newID
				}
			if(ref!='f' && newID!='afolder0'){
				list += "," + findRoot(list,newID);
				}
			}
		}
	if( ref=='f' && newID!=0 && el.parentNode.parentNode.tagName.toLowerCase()=='ul' ){
		list += "," + findRoot(list,newID,ref);
		}
	return list;
	}
function nav_open(folderID,closeall,ref){
	var hasSlide = false;
	var slideSpeed = "normal";
	var el = getE(folderID);
	if(nav_open.arguments.length > 3){
		hasSlide = true;
		slideSpeed = nav_open.arguments[4];
		}
	if(closeall){
		nav_close(folderID,ref, hasSlide);
		}
	if(el.style.display != 'none') {
		el.style.display='none';}
	else {
		if(hasSlide) {
			/*easing-Methoden von jquery-Plugin */
			if(typeof(easing)!="undefined"){
				sDown(el,slideSpeed, easing);
				}
			else{
				sDown(el,slideSpeed)
				}
			}
		el.style.display='';
		}
		
	/*if(nav_open.arguments.length > 3){
		var fList = createValueList(folderID.replace(/afolder/,""),ref);
		setActive(fList,folderID);
		}*/
	}
function sDown(e,sSpeed){
	if(sDown.arguments.length > 2){
		$(e).slideDown(sSpeed, sDown.arguments[2]);
		}
	else{
		$(e).slideDown(sSpeed);
		}
	}
function nav_close(folderID,ref){
	var lstPID = createValueList(folderID,ref);
	var thisNode = "";
	var tmpEl;
	var slide = false;
	if(nav_close.arguments.length > 2){
		slide = nav_close.arguments[2];
		}
	
	for(i=0; i<document.getElementsByTagName('ul').length; i++){
		tmpEl = document.getElementsByTagName('ul')[i];
		for(a=0;a<tmpEl.attributes.length; a++){
			if(tmpEl.style.display!='none' && tmpEl.attributes[a].nodeName.toLowerCase()=='id'){
				thisNode=tmpEl.attributes[a].nodeValue;
				if(thisNode!=folderID && thisNode.substring(0, 8)!='afolder0'  ){
					if( thisNode.substring(1, 7)=='folder' || thisNode.substring(0, 3) == 'fid' ){
						if(lstPID!=""){
							if(lstPID.indexOf(thisNode)=='-1'){
								if(slide){$(tmpEl).slideUp("fast");}
								else{tmpEl.style.display='none';}
								
								}
								}
							else{
								if(slide){$(tmpEl).slideUp("fast");}
								else{tmpEl.style.display='none';}
								}
								}
							}
						}
					}
				}
			}

function setActive(fList,actID){
		var level = 99;
		var prefix = "t";
		if(setActive.arguments.length>2){level = setActive.arguments[2];/*maximum-level fuer anzeige*/}
		if(setActive.arguments.length>3){prefix = setActive.arguments[3];/*prefix fuer ein-ausblenden*/}
		if(fList){
			var cnt = fList.split(',');
			for(f=0;f<cnt.length;f++){
				if( document.getElementById(prefix+cnt[f]) ){
					document.getElementById(prefix+cnt[f]).className+=' active ';
					if(cnt[f]!=actID){
						
						if( document.getElementById('afolder'+cnt[f])){
							dspDiv("afolder"+cnt[f],"block");
							}
						if( document.getElementById('ffolder'+cnt[f]) ){
							dspDiv("ffolder"+cnt[f],"block");
							}
						if( document.getElementById('fid'+cnt[f]) ){
							var newLevel = document.getElementById('fid'+cnt[f]).className.replace(/nlevel/,"");
							newLevel = newLevel.replace(/ active/,"");
							if(newLevel <= level){
								dspDiv("fid"+cnt[f],"block");
								}
							else{
								dspDiv("fid"+cnt[f],"none");
								}
							}
						}
					}
				}
			}
		}