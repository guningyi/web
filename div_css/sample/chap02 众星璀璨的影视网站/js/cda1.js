
var CDA='1.0';function ANAXSC()
{var xs=null;var lsa=ANAXLSL.split("|");var asa=ANSL.split("|");for(lsi=0;lsi<lsa.length;lsi++)
{for(asi=0;asi<asa.length;asi++)
{if(lsa[lsi]==asa[asi])
{if(xs==null)
{xs=lsa[lsi];}
else
{xs+='|'+lsa[lsi];}
break;}}}
var cp=(ANAXCP==null)?"/":ANAXCP;xd=(xs==null)?null:'1#'+xs;ANSC('AxData',xd,ANAXCD*3600000,cp);ANSC('Axxd','1',null,cp);if(axOnSet!=null)
{axOnSet();}
return(ANAXQF==1)?xs:null;}
function ANRC(n){var cn=n+"=";var dc=document.cookie;if(dc.length>0){for(var b=dc.indexOf(cn);b!=-1;b=dc.indexOf(cn,b)){if((b!=0)&&(dc.charAt(b-1)!=' ')){b++;continue;}
b+=cn.length;var e=dc.indexOf(";",b);if(e==-1)e=dc.length;return unescape(dc.substring(b,e));}}
return null;}
function ANSC(n,v,ex,p){var e=document.domain.split(".");e.reverse();var m=e[1]+'.'+e[0];var cc=n+"=";if(v!=null)
{cc+=v;}
if(ex){var exp=new Date;exp.setTime(exp.getTime()+ex);cc+=";expires="+exp.toGMTString();}
if(p){cc+=";path="+p;}
if(m){cc+=";domain="+m;}
document.cookie=cc;}
function ANGRD(){if(top!=self||ANRD!=''){return ANRD;}
var rf=top.location.href;var i=j=0;i=rf.indexOf('/');i=rf.indexOf('/',++i);j=rf.indexOf('/',++i);if(j==-1){j=rf.length;}
r=rf.substring(i,j);return r;}
function ANGPU()
{if(top!=self)
{return document.referrer;}
return top.location.href;}
function ANTR(s){if(!s){return'';}
s=s.replace(/^\s*/g,'');s=s.replace(/\s*$/g,'');return s;}
function ANGCC()
{var ccc=ANTCC;if((ccc==null)||!ccc.match(/^\w{3}$/))
{ccc=ANDCC.toUpperCase();}
return ccc;}
function TCDA(tc)
{var kw;var pb;if((tc!=null)&&(tc!=''))
{var pa=tc.split(";");for(var p=0;p<pa.length;p++)
{kv=pa[p].split("=");k=kv[0];v=kv[1];if(k!=null){k=ANTR(k);}
if(v!=null){v=ANTR(v);}
var m=k.toUpperCase();switch(m){case("CC"):v=v.toUpperCase();if(v!=null&&v!='')
{ANTCC=v;}
break;case("SC"):if(v!=null&&v!=''){if(v.length>256){v=v.substring(0,256);}
ANVSC=v;}
break;case("RD"):if(v!=null&&v!=''){if(v.length>128){v=v.substring(0,128);}
ANRD=v.toLowerCase();}
break;case("DT"):ANVDT=1;break;case("ND"):ANVDT=0;break;case("UD"):if(v!=null&&v!='')
{ANTPUD=v;}
break;case("DA"):ANVDA=1;break;default:if(v!=null&&v!=''){ANCV(k,v);}}}}
ANPA();}
function ANPA()
{if(ANDPEFA==null)
{ANDPEFA=[];}
if(((ANP&2)!=0)&&(ANDPEFA[ANDPEFAI]==null)&&(ANVDT==1)&&(ANOO==0))
{ANDPEFA[ANDPEFAI]=1;ANVDT=0;ANGDCC();ANSDR();}
if(ANVDA==1)
{ANDA();ANVDA=0;}}
function ANRTXR()
{var u;var xs;if(ANSL!=null)
{var tsa=ANSL.split("|");if(ANAXLSL!=null)
{xs=ANAXSC(tsa);}}
u=(xs!=null)?(ANTPPU+'?x='+xs):ANTPPU;document.write('<iframe SRC="'+u+'" height="0" width="0" frameborder="0"></iframe>');}
function Tacoda_AMS_DDC_addPair(k,v){ANCV(k,v);}
function ANCV(k,v){AMSK[AMSN]=k;AMSVL[AMSN]=v;AMSN++;}
function ANTCV(){var TVS="";for(var i=0;i<AMSN;i++){if(!AMSK[i]){continue;}
if(!AMSVL[i]){AMSVL[i]='';}
TVS+="&amp;v_"+escape(AMSK[i].toLowerCase())+"="+escape(AMSVL[i].toLowerCase());}
return TVS;}
function Tacoda_AMS_DDC(tiu,tjv)
{ANDDC(tiu,tjv);}
function ANDA(){var t='';var e=ANGRD().split(".");e.reverse();t=e[1]+'.'+e[0];if(typeof(ANDNX[t])!='undefined'){t=ANDNX[t];}
else{t=ANDD;}
var tiu='http://'+AMSTEP+'.'+t+'/'+AMSTES;ANDDC(tiu,"0.0");}
function ANDDC(tiu,tjv){if(((ANP&1)!=0)&&(AMSDPF!=1))
{AMSDPF=1;var ccc=ANGCC();var ta="?"+Math.floor(Math.random()*100000)+"&amp;v="+ANV+"&amp;r="+escape(document.referrer)+"&amp;p="+ccc+":"+escape(ANVSC);if(AMSLGC==1){ta+="&amp;page="+escape(window.location.href);}
ta+="&amp;tz="+(new Date()).getTimezoneOffset()+"&amp;s="+ANSID;if(ANCB3==1)
{ta+="&amp;ckblk3";}
if(ANCB1==1)
{ta+="&amp;ckblk1";}
else
{for(var i=0;i<AMSC.length;i++){var cl=AMSC[i];var clv=ANRC(cl);if(cl!=null){ta+="&amp;c_"+escape(cl)+"="+escape(clv);}}}
ANRID()
ta+=ANTCV();document.write('<IMG'+' SRC="'+tiu+ta+'" STYLE="display: none" height="1" width="1" border="0">');}}
function ANRID(){if(AMSRID!=''&&AMSSID!=''){if(ANRC(AMSRID)!=null){AMSSRID=AMSSID+ANRC(AMSRID);ANCV("regid",AMSSRID);}}}
function ANDP(tc)
{if((ANP&2)!=0)
{ANTCC=tc.toUpperCase();ANVDA=0;ANCCF();}}
function ANV2R(v,rg,psl,ssl,rs,rd)
{var m;var oc;var r;var rl;var ss;var lm="";var rt=null;var ra=rg.split("|");var pi=0;var si=psl;var oi=si+ssl;var miwoo=oi+rs;var miwo=miwoo+1;for(ri=0;(ri<ra.length)&&(rt==null);ri++)
{r=ra[ri];rl=r.length;if(rl>=miwoo)
{oc=r.charCodeAt(oi);if((oc<42)&&(oc>32)&&(rl>=miwo))
{if((psl==0)||(r.charAt(pi)=='A'))
{m=r.substr(miwo,r.length-miwo);}
else
{m=lm.substr(0,r.charCodeAt(pi)-65);m=m.concat(r.substr(miwo,r.length-miwo));}
if((ssl!=0)&&(r.charAt(si)!='A'))
{ss=r.charCodeAt(si)-65;m=m.concat(lm.substr(lm.length-ss,ss));}
switch(r.charAt(oi))
{case"!":if((v.length==m.length)&&(v.indexOf(m)==0))
{rt=r.substr(oi+1,rs);}
break;case")":if(v.lastIndexOf(m)==(v.length-m.length))
{rt=r.substr(oi+1,rs);}
break;case"(":if(v.indexOf(m)==0)
{rt=r.substr(oi+1,rs);}
break;case"#":if(v.search(m)!=-1)
{rt=r.substr(oi+1,rs);}
break;case"&":if(v.indexOf(m)!=-1)
{rt=r.substr(oi+1,rs);}}}
else
{if((psl==0)||(r.charAt(pi)=='A'))
{m=r.substr(miwoo,r.length-miwoo);}
else
{m=lm.substr(0,r.charCodeAt(pi)-65);m=m.concat(r.substr(miwoo,r.length-miwoo));}
if((ssl!=0)&&(r.charAt(si)!='A'))
{ss=r.charCodeAt(si)-65;m=m.concat(lm.substr(lm.length-ss,ss));}
if(v.indexOf(m)!=-1)
{rt=r.substr(oi,rs);}}}
lm=m;}
return(rt==null)?rd:rt.replace(/^\s+|\s+$/g,"");}
function ANGDCC()
{if(ANCC!=1)
{ANTCC=ANV2R(eval(ANSCC),CCLOOKUP22,ANCCPD,ANCCSD,3,ANDCC).toUpperCase();}}
function ANSDR()
{var ccc=ANGCC();if((ccc.indexOf(ANXCC)!=0)||(ccc.length!=ANXCC.length))
{var ANU="";var xs=0;if(ANAXLSL!=null)
{xs+=1;}
if(ANRC('Axxd')==null)
{xs+=2;}
if(xs>0)
{ANU+="&amp;xs="+xs;}
if(ANPUF==1)
{ANU+="&amp;pu="+escape(ANGPU());}
if(ANRDF==1)
{ANU+="&amp;r="+ANGRD();}
if(ANTPUD!=null)
{ANU+="&amp;ud="+escape(ANTPUD);}
document.write('<SCR'+'IPT SRC="'+ANDPU+'cmd='+ccc+'&amp;si='+ANSID+ANU+'&amp;v='+ANV+'&amp;cb='+Math.floor(Math.random()*100000)+'" LANGUAGE="JavaScript"></SCR'+'IPT>');}
ANSME(ccc);}
function ANSME(ccc)
{if(ANME==1)
{ANME=0;document.write('<SCR'+'IPT SRC="'+ANMU+ccc+'&amp;si='+ANSID+'&amp;cb='+Math.floor(Math.random()*100000)+'" LANGUAGE="JavaScript"></SCR'+'IPT>');}}
document.dartTData="";document.dartTDataValue=ANRC("TData");if(document.dartTDataValue!=""&&document.dartTDataValue!=null)
{var f=document.dartTDataValue.split("|");for(var i=0;i<f.length;i++)
{document.dartTData+="kw="+f[i]+";";}}
document.dartTid=ANRC("TID");if(document.dartTid!=""&&document.dartTid!=null)
{document.dartTid="u="+document.dartTid+";";}
try
{var tc;var tcdacmd
if(tcdacmd!=null)
{tc=tcdacmd+TCDACMDADD;}
else
{tc=TCDACMDADD;}
tcdacmd='';TCDA(tc);}
catch(e)
{document.write('<SCR'+'IPT SRC="'+ANEU+'e='+escape(e)+'" LANGUAGE="JavaScript"></SCR'+'IPT>');}