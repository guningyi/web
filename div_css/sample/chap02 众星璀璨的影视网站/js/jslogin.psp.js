







var _sns_sd_rev="$Revision: 1.56 $";
var snshosturl="",wscinstalled=0,i=0,_sns_var_="",lu="",la="",loginId="",nmvalpos=0,_sns_width_=174,_sns_height_=198,frameAlreadyInserted=false,snsdata="",loginLayer="",b64loginId="",displayName="",b64displayName="";

if(typeof _sns_use_ssl_=='undefined')var _sns_use_ssl_=0;
if(_sns_use_ssl_==1)snshosturl="https://my.screenname.aol.com"; else snshosturl="http://my.screenname.aol.com";
var stdloginurl=snshosturl+"/_cqr/login/login.psp",logouturl=snshosturl+"/_cqr/logout/mcLogout.psp",anchorimgurl=snshosturl+"/images/dot.gif";
var currDate=new Date;
var randNum=''+currDate.getYear() +''+currDate.getMonth()+''+currDate.getDate()+''+currDate.getTime();
var snstouchpointimgurl=snshosturl+"/_cqr/login/touchPointImg.psp?rN="+randNum;
var snscloseimgurl=snshosturl+"/images/10x10_x.gif",loginform="";
if(typeof _sns_enable_aim_=='undefined')var _sns_enable_aim_=0;
_sns_enable_aim_?lu="http://my.screenname.aol.com/_cqr/login/login.psp?noAAM=1&uitype=mini":lu="https://my.screenname.aol.com/_cqr/login/login.psp?mcState=initialized&uitype=mini";

if(typeof _sns_showSignInOutLinks_=='undefined')var _sns_showSignInOutLinks_=1;
if(typeof _sns_disable_styles_=='undefined')var _sns_disable_styles_=0;
if(typeof _sns_LoginLayer_Position_=='undefined')var _sns_LoginLayer_Position_="absolute";
if(typeof sitedomain=='undefined')var sitedomain="startpage.aol.com";
la+="sitedomain="+sitedomain;
if(typeof authLev=='undefined')var authLev=1;
la+="&authLev="+authLev;
if(typeof seamless=='undefined')var seamless="y";
la+="&seamless="+seamless;
if(typeof lang=='undefined')var lang="en";
la+="&lang="+lang;
if(typeof locale=='undefined')var locale="us";
la+="&locale="+locale;
if(typeof siteState=='undefined')var siteState="OrigUrl%3dhttp%3a%2f%2fwww%2eaol%2ecom%2fmain%2eadp";
la += "&siteState="+siteState;
if(typeof _sns_loginId_=='undefined')var _sns_loginId_="";
if(typeof _sns_disLoginId_=='undefined')var _sns_disLoginId_="";
var rsp_cookie=getCk("RSP_COOKIE");
if(rsp_cookie && _sns_loginId_==""){
	b64loginId=getValue(rsp_cookie, "name");
	if(b64loginId)loginId=base64Decode(b64loginId);
}
if(loginId=="")loginId=_sns_loginId_;
if(rsp_cookie && _sns_disLoginId_==""){
	b64displayName=getValue(rsp_cookie, "disName");
	if(b64displayName)displayName=base64Decode(b64displayName);
}
if(_sns_disLoginId_=="")_sns_disLoginId_=displayName;

lu+="&"+la;
stdloginurl+="?"+la;
logouturl+="?uitype=mini&"+la;
lu+="&_sns_width_="+_sns_width_+"&_sns_height_="+_sns_height_;
if(typeof _sns_header_text_color_=='undefined')var _sns_header_text_color_="133453";
if(typeof _sns_fg_color_=='undefined')var _sns_fg_color_="333333";
lu+="&_sns_fg_color_="+_sns_fg_color_;logouturl+="&_sns_fg_color_="+_sns_fg_color_;
if(typeof _sns_err_color_=='undefined')var _sns_err_color_="C81A1A";
lu+="&_sns_err_color_="+_sns_err_color_;
if(typeof _sns_link_color_=='undefined')var _sns_link_color_="2864B4";
lu+="&_sns_link_color_="+_sns_link_color_;
if(typeof _sns_bg_color_=='undefined')var _sns_bg_color_="FFFFFF";
lu+="&_sns_bg_color_="+_sns_bg_color_;logouturl+="&_sns_bg_color_="+_sns_bg_color_;
if(typeof _sns_x_=='undefined')var _sns_x_=-82;
if(typeof _sns_x_offset_=='undefined')var _sns_x_offset_=-82;
if(typeof _sns_y_=='undefined')var _sns_y_=42;
if(typeof _sns_y_offset_=='undefined')var _sns_y_offset_=42;
if(typeof _sns_showByDef_=='undefined')var _sns_showByDef_=0;
if(typeof _sns_set_var_=='undefined')var _sns_set_var_=0;

if(typeof _sns_closeDIVTags_=='undefined')var _sns_closeDIVTags_=0;
var agt=navigator.userAgent.toLowerCase();
var is_aol=(agt.indexOf("aol")!=-1);
var is_ie     = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
var is_safari = (agt.indexOf("safari") != -1);
var linkstyle="color: #"+_sns_header_text_color_+";margin:0px 0px 0px 0px;text-decoration:none;text-align:right;display:inline;";
if(lang=="zh")linkstyle+="font:normal 12px 'ËÌ',Arial;";
else{linkstyle+="font:normal 12px Arial;";}
var layerheight=_sns_height_ + 15;
var gethelptxt="Help";
var fetchHelpFromSNS = "0";
var helpUrl="";
if(fetchHelpFromSNS == "1"){ helpUrl += snshosturl;}
helpUrl +=  "http://help.channels.aol.com/topic.adp?topicId=SG_SignIn";
var closetxt="Close";
var hdrtxt="Sign In";




loginform+='<div style="width:'+_sns_width_+'px;height:14px;line-height:14px;text-align:right;background-color:#'+_sns_bg_color_+';margin:0px;padding:0px;">';
loginform+='<span style="padding-left:9px;font:bold 11px Arial;float:left;color:'+_sns_fg_color_+'"></span><span style="float:right">';
loginform+='<a onMouseOver="javascript:underlinelink(this);" onMouseOut="javascript:removeUnderline(this);" href="'+helpUrl+'" target="authHelp" style="margin:0px 5px 0px 0px;padding:0px 0px 0px 0px;color:#'+_sns_link_color_+';text-decoration:none;';
if(lang=="zh")loginform+='font:normal 12px Ã,Arial;';
else{loginform+='font:normal 11px Arial;';}
loginform+='" alt="'+gethelptxt+'" title="'+gethelptxt+'" >'+gethelptxt+'</a>';
if(!_sns_showByDef_)loginform+='<a onMouseOver="javascript:underlinelink(this);" onMouseOut="javascript:removeUnderline(this);" href="javascript:hideLayer(\'loginLayer\')" style="margin:0px 5px 0px 0px;padding:0px 0px 0px 0px;font:bold 10px verdana;color:#'+_sns_link_color_+';text-decoration:none;" alt="'+closetxt+'"><img src="../Movies-list/my.screenname.aol.com/_cqr/login/'+snscloseimgurl+'" width="8" height="8" border="0" style="margin:0px 4px 0px 0px;padding:0px 0px 0px 0px;" alt="'+closetxt+'" title="'+closetxt+'"></a>';



loginform+='</span></div><iframe frameborder="0" hspace="0" marginheight="0" marginwidth="0" vspace="0" height="'+_sns_height_+'" width="'+_sns_width_+'" scrolling="no" id="loginframe" name="loginframe" src="';
if(_sns_showByDef_)loginform+=lu;
else{ _sns_use_ssl_?loginform+=anchorimgurl:loginform+="about:blank"; }
loginform+='"><a href="'+stdloginurl+'" target="_top">Sign In</a></iframe>';
function underlinelink(link){
link.style.textDecoration="underline";
}
function removeUnderline(link){
link.style.textDecoration="none";
}
function snsHelpPopUp(pathOrTitleString){
	var pattern=/\?/;
	var adjustedPathOrTitleString=pathOrTitleString.replace(pattern,"&");
	var newUrl=pathOrTitleString;
	window.onerror=null;
	var x=0,y=0;
	if(document.all){
		x=window.screenLeft+30;
		y=window.screenTop-50;
	}else if(document.layers){
		x=window.screenX+30;
		y=window.screenY+75;
	}
	if(y<=0)y=10;
	var propString="scrollbars=yes,width=565,height=275, top=" + y + ",screenY=" + y + ",left=" + x + ",screenX=" + x;
	newwin=window.open("","popup",propString);
	newwin=window.open(newUrl,"popup",propString);
	if(window.focus)newwin.focus();
}
function getObject(objname){
	return document.getElementById(objname);        
}
function toggleLayer(objname,layer_n,left_o,top_o, url){
	var obj=getObject(objname);
	var newX=0;
	if(obj!=null)newX=findPosX(obj);
	var newY=0;
	if(obj!=null)newY=findPosY(obj);
	var new_left=newX+left_o;
	var new_top=newY+top_o;
	if(layer_n!=""){
		if(getObject(layer_n).style.visibility=="visible")hideLayer(layer_n); 
		else showLayer(layer_n,new_left,new_top, url); 
	}
}
function showLayer(layer_n,left_o,top_o, url){
	insertIFrame(layer_n, url);
	if(top_o==null)top_o=0;
	if(left_o==null)left_o=0;
	if(layer_n!=""){
		var p=getObject(layer_n);
		p.style.left=left_o+"px";
		p.style.top=top_o+"px";
		p.style.visibility="visible";
		p.style.display="";
	}
}
function hideLayer(hs_layer){
	if(_sns_showByDef_!=1&&hs_layer!=""){
		var p=getObject(hs_layer);
		p.style.visibility="hidden";
		p.style.display="none";
	}
}
function insertIFrame(layer_n, url){
	var _layer;
	if(!frameAlreadyInserted&&layer_n!=""){
		_layer=getObject(layer_n);
		loadIframe('loginframe',url);
		frameAlreadyInserted=true;
	} 
}
function loadIframe(frameid,url){
	if(document.layers&&document.layers[frameid].load)document.layers[frameid].load(url,0);
	else
		if(window.frames && window.frames.length)window.frames[frameid].location.href = url;
}

function findPosX(obj){
	var curleft=0;
	while (obj.offsetParent){
		curleft+=obj.offsetLeft;
		obj=obj.offsetParent;
	}
	curleft+=obj.offsetLeft;
	return curleft;
}
function findPosY(obj){
	var curtop = 0;
	while(obj.offsetParent){
		curtop += obj.offsetTop;
		obj=obj.offsetParent;
	}
	curtop+=obj.offsetTop;
	return curtop;
}
function getCk(name){
	var index=document.cookie.indexOf(name+"=");
	if(index==-1)return null;
	index=document.cookie.indexOf("=",index)+1;
	var endstr=document.cookie.indexOf(";", index);
	if(endstr==-1)endstr=document.cookie.length;
	return unescape(document.cookie.substring(index,endstr));
}
function getValue(nmvalstr,name){
	var cookie_array=nmvalstr.split("&");nmvalpos=0;
	while(nmvalpos<cookie_array.length){
                if(cookie_array[nmvalpos].indexOf(name+"=")>=0){
                        var sns_name_pos=cookie_array[nmvalpos].indexOf("=")+1;
                        var nmval=cookie_array[nmvalpos].substring(sns_name_pos,cookie_array[nmvalpos].length);
			return nmval;
                }
                nmvalpos++;
        } return null;
}
function base64Decode(str){
	var result=new Array();
	var i=0,j=0,x,shiftreg=0,charCount=-1,asciiNum=0;
	var _hexChars=['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
	var c;
	for(i=0;i<str.length;i++){
		c=str.charAt(i);
		if('A'<=c&&c<='Z')x=str.charCodeAt(i)-65;
		else if('a'<=c&&c<='z')x=str.charCodeAt(i)-97+26;
		else if('0'<=c&&c<='9')x=str.charCodeAt(i)-48+52;
		else if(c=='+')x=62;
		else if(c=='/')x=63;
		else continue;
		charCount++;
		switch(charCount%4){
		case 0:
			shiftreg=x;
			continue;
		case 1:
			asciiNum=(shiftreg<<2)|(x>>4);
			shiftreg=x&0x0F;
			break;
		case 2:
			asciiNum=(shiftreg<<4)|(x>>2);
			shiftreg=x&0x03;
			break;
		case 3:
			asciiNum=(shiftreg<<6)|(x>>0);
			shiftreg=x&0x00;
			break;
		}
		var num=asciiNum;
		if((num<32||num>126)&&(num!=0x0d)&&(num!=0x0a)){
			result[j++]="<";
			result[j++]=_hexChars[((num/16)&0x0F)];
			result[j++]=_hexChars[((num/1)&0x0F)];
			result[j++]=">";
		}else result[j++]=String.fromCharCode(num);
	}
	return result.join('');
}
var aaCookie = getCk("SNS_AA");
var sns_sst = -1, aanmvalpos=0;
if(aaCookie){
	if( aaCookie == "1" || aaCookie == "2" ) { sns_sst = currDate.getTime()/1000;} else { sns_sst=getValue(aaCookie, "sst"); }
}
if(((sns_sst != -1 && (currDate.getTime()/1000) - sns_sst < 86400 )||is_aol)&&_sns_showByDef_!=1){
	if(_sns_showSignInOutLinks_){
		if(!is_aol||(is_aol&&seamless!="y")){
			var signofftxt="Sign Out";
			var signoffTitle=signofftxt;
                        if(displayName != ""){ signofftxt+=' '+_sns_disLoginId_;signoffTitle+=' '+displayName;}
                        snsdata+='<div ';
			if(_sns_disable_styles_!=1)snsdata+=' style="width:'+_sns_width_+'px;overflow:hidden;z-index:999;white-space: nowrap;"';
			snsdata += '><img src="'+anchorimgurl+'" border="0" width="0" height="0" alt="dot" title="Anchor Image" id="anchorImg" /><a onMouseOver="javascript:underlinelink(this);" onMouseOut="javascript:removeUnderline(this);" href="javascript:toggleLayer(\'anchorImg\',\'loginLayer\','+_sns_x_offset_+','+_sns_y_offset_+',logouturl)"';
			if(_sns_disable_styles_!=1)snsdata+=' style="'+linkstyle+'"';
			snsdata += ' ><img src="'+snstouchpointimgurl+'" border="0" width="9" height="9" title="'+signoffTitle+'" alt="'+signofftxt+'"  />';
			snsdata += '</a> <a onMouseOver="javascript:underlinelink(this);" onMouseOut="javascript:removeUnderline(this);" href="javascript:toggleLayer(\'anchorImg\',\'loginLayer\','+_sns_x_offset_+','+_sns_y_offset_+',logouturl)"';
			if(_sns_disable_styles_!=1)snsdata+=' style="'+linkstyle+'" ';
			snsdata+='title="'+signoffTitle+'">'+signofftxt+'</a></div>';			
		}
	}
}else{	
	if(_sns_showSignInOutLinks_){
		var signontxt="Sign In";
		var signonTitle=signontxt;
                if(displayName != ""){ signontxt+=' '+_sns_disLoginId_;signonTitle+=' '+displayName;}				else if(lang=="en" && locale =="us"){ signontxt="AOL & AIM Sign In";signonTitle=signontxt;}
		snsdata+='<div ';
		if(_sns_disable_styles_!=1)snsdata+='style="width:'+_sns_width_+'px;overflow:hidden;z-index:999;white-space: nowrap;"';
		snsdata+='><img src="'+anchorimgurl+'" border="0" width="0" height="0" alt="dot" title="Anchor Image" id="anchorImg" />';
		snsdata+='<a onMouseOver="javascript:underlinelink(this);" onMouseOut="javascript:removeUnderline(this);" href="javascript:toggleLayer(\'anchorImg\',\'loginLayer\','+_sns_x_offset_+','+_sns_y_offset_+',lu)" ';
		if(_sns_disable_styles_!=1)snsdata+='style="'+linkstyle+'"';
		snsdata+='><img src="'+snstouchpointimgurl+'" border="0" width="9" height="9" title="'+signonTitle+'" alt="'+signontxt+'" id="touchpointimg" /></a> <a onMouseOver="javascript:underlinelink(this);" onMouseOut="javascript:removeUnderline(this);" href="javascript:toggleLayer(\'anchorImg\',\'loginLayer\','+_sns_x_offset_+','+_sns_y_offset_+',lu)" ';
		if(_sns_disable_styles_!=1)snsdata+='style="'+linkstyle+'" ';
		snsdata+='title="'+signonTitle+'">';
		if(loginId=="" && lang!="zh")snsdata+='<b>';
		snsdata+=signontxt;
		if(loginId=="" && lang!="zh")snsdata+='</b>';
		snsdata+='</a></div>';
	}
}
loginLayer+='<div ID="loginLayer" STYLE="position:';
loginLayer+=_sns_LoginLayer_Position_;
loginLayer+=';z-index:999;height:'+layerheight+'px;width:'+_sns_width_+'px;overflow:visible;left:'+_sns_x_+'px;top:'+_sns_y_+'px;border:solid 1px #a9c1d4;margin:0px;padding:0px 0px;visibility:';
if(_sns_showByDef_)loginLayer+='visible;';
else {loginLayer+='hidden;';if(!is_safari && !is_ie)loginLayer+='display:none;';}
loginLayer+='"><iframe style="display:block; width:'+(_sns_width_-5)+'px; height:'+layerheight+'px; z-index:-1; position:absolute; top:0px; filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);border:none;"';
if(_sns_use_ssl_)loginLayer+=' src="'+snshosturl+'/images/dot.gif"';
loginLayer+='></iframe>';
loginLayer+=loginform;
if(_sns_showByDef_)frameAlreadyInserted=true;
loginLayer+='</div>';
snsdata+=loginLayer;
_sns_var_+=snsdata;

if(_sns_closeDIVTags_>0)for(i=0;i<_sns_closeDIVTags_;i++)_sns_var_+='</div></div>';
if( _sns_set_var_ != 1 )document.write(_sns_var_);


