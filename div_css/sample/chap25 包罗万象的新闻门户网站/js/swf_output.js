function fun_flash_output(url,w,h,st,mc,wm){
var out;
var _ssl = 'http';
if (!location.href.indexOf('https:')){_ssl = 'https';}
if (!st) {st='';}
if (mc || mc > 0){out="onmousedown='adc(" + mc + ");'";}
wm = (!wm)?'transparent':'opaque';
document.write("<OBJECT  width='"+w+"' height='"+h+"' class='"+st+"' " + out + " id=crazd classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='" + _ssl + "://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0'>\n");
document.write("  <PARAM NAME=movie VALUE='"+url+"'>\n");
document.write("  <PARAM NAME=quality VALUE=high>\n");
document.write("  <PARAM NAME=wmode VALUE='"+wm+"'>\n");
document.write("  <PARAM NAME=bgcolor VALUE=#FFFFFF>\n");
document.write("  <EMBED quality=high width="+w+" height="+h+" NAME=crazd src='"+url+"' quality=high wmode='"+wm+"' bgcolor=FFFFFF TYPE='application/x-shockwave-flash' PLUGINSPAGE='" + _ssl + "://www.macromedia.com/go/getflashplayer'></EMBED>\n");
document.write("</OBJECT>\n");
}