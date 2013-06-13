$(document).ready(function(){createWestpacIDCookie();
$("#utility .wai a").focus(function(){$(this).parent().removeClass("wai")
}).click(function(){$("h2:eq(0)").attr("tabIndex",-1).focus()
});
$("#nav-primary .login a").click(function(){showDropMenu($("#login-menu"),"login",$(this).offset(),"btn-loginmenu");
return false
});
$("#cta .contact").click(function(){showDropMenu($("#contact-menu"),"cta",$(this).offset(),"btn-contactmenu");
return false
});
$("#btn-applyonlinefor").click(function(){showDropMenu($("#menu-applyonline"),"applyonline",$(this).offset(),"btn-applyonlinefor");
return false
});
$("#btn-mediareleases").click(function(){showDropMenu($("#menu-mediareleases"),"mediareleases",$(this).offset(),"btn-mediareleases");
return false
});
$(document).click(function(A){if(document.getElementById("active-menu")){removeDropMenu()
}});
$("#search-site input[type=text]").focus(function(){if(this.value==="I'm searching for..."){this.value=""
}$(this).toggleClass("focus")
}).blur(function(){if(this.value===""){this.value="I'm searching for..."
}$(this).toggleClass("focus")
});
if(navigator.userAgent.match("iPhone")==="iPhone"){$(".tel > a , a.tel").each(function(A){$(this).attr("href","tel:"+$(this).text())
})
}$("#content-index").parent().toggleClass("tabbed");
$(".tabbed #content-primary .section:not(:eq(0))").addClass("hidden-section");
$("#content-index li:eq(0)").addClass("selected");
$("#content-index a").click(function(){var B=$("#content-index li.selected");
var C=B.find("a").attr("href");
var A=$(this).attr("href");
$(this).parent().addClass("selected");
B.removeClass("selected");
$(C).removeClass("display-section").addClass("hidden-section");
$(A).removeClass("hidden-section").addClass("display-section");
if($(this).parent().prev().length>0){$("#content-primary").addClass("expand");
$("#content-secondary").addClass("wai")
}else{$("#content-primary").removeClass("expand");
$("#content-secondary").removeClass("wai")
}return false
});
$("#taskbar .print, a.print").click(function(){window.print();
return false
});
$(window).load(function(){$(".should-popup, .should-popup-modless, .should-popup-help, \n            .should-popup-basic, .should-popup-pdf, .should-popup-600, .should-popup-700").each(function(){var E=$(this);
var B=this.className;
var A=/should-popup\S*\w*/;
var K=B.match(A)[0];
var C=new Date();
var J="Westpac"+C.getTime();
var H="no",F="no",I="no",D="no",L=800;
var G=getScreenDimensions().sHeight-80;
switch(K){case"should-popup":E.attr("target","_blank").append('<i class="wai"> (Opens in new window)</i>');
break;
case"should-popup-modless":L=600;
G=800;
break;
case"should-popup-help":L=600;
G=800;
break;
case"should-popup-basic":L=800;
G=600;
F="yes";
break;
case"should-popup-pdf":L=800;
G=800;
break;
case"should-popup-600":L=600;
G=600;
F="yes";
break;
case"should-popup-700":L=700;
G=600;
F="yes";
break;
default:var M=K.toLowerCase().split("-")[2].split("x");
if(!isNaN(M[0])){if(isNaN(M[1])){L=M[0]
}else{L=M[0];
G=M[1]
}}break
}if(L==600){L=620
}E.click(function(N){openModless(E.attr("href"),J,L,G,H,F,I,D);
N.preventDefault();
return false
}).append('<i class="wai"> (Opens in new window)</i>')
})
});
$("#main a.should-target-parent").click(function(A){A.preventDefault();
var B=$(this).attr("href");
sendURLToParent(B)
});
$("#taskbar .pdf").click(function(){openModless(this.href,"Westpac_pdf",800,800,"no","no","no","no");
return false
});
$("#main a.webcast, a.podcast, #content-primary a.pdf, #main a.flash, #main a.word, #main a.excel").click(function(A){openModless(this.href,"Westpac_recource",800,646,"no","no","no");
return false
}).append('<i class="wai"> (Opens in new window)</i>');
$(".should-init-dbb").click(function(C){var B=$("head meta[name='westpac:pagename']").attr("content");
var A=document.location;
setCookie("ddbT",B,1);
setCookie("ddbL",A,1)
});
$(".closebox").click(function(){window.opener="x";
self.close();
return false
});
$(".backtotop > a").click(function(){window.scroll(0,0)
});
$(".section-landing .features ul:last").addClass("last");
$("h2:first,h3:first,h4:first,h5:first,h6:first",".cms-content").addClass("first");
$("h2:last,h3:last,h4:last,h5:last,h6:last",".cms-content").addClass("last");
$(".cms-content table").each(function(){$(this).find("tr:first > *").each(function(A){$(this).addClass("c"+(A+1))
})
});
$(".cms-content table tr").find(":first").addClass("first").end().find(":last").addClass("last").end().hover(function(){$(this).addClass("over")
},function(){$(this).removeClass("over")
});
$(".cms-content table tbody").find("tr:first").addClass("start").end().find("tr:last").addClass("end").end().find("tr:odd").addClass("odd").end().find("tr:even").addClass("even");
$(".cms-content ul.featured li:first").addClass("first");
if(jQuery.browser.msie&&(jQuery.browser.version<7)){$("#product-navigator .category-name").hover(function(){$(this).addClass("over")
},function(){$(this).removeClass("over")
})
}var c=function(){var A=0;
$(this).find(".compare > input").each(function(){if($(this).attr("checked")){A++
}});
$(this).find(".compare-all").each(function(){if(A>1){$(this).attr({alt:"Compare selected",src:"/furniture/ui_imgs/productnavigator_btn_compareselected.png"});
$(this).removeAttr("disabled")
}else{$(this).attr({disabled:"disabled",alt:"Compare selected: disabled until at least 2 products are selected",src:"/furniture/ui_imgs/productnavigator_btn_compareselected_disabled.png"})
}})
};
var Q=function(B){var A=false;
if($(this).attr("checked")){A=true
}else{A=false
}$(this).parents("form:eq(0)").find("input.select-all").each(function(){if(A){$(this).attr("checked",A)
}else{$(this).removeAttr("checked")
}});
$(this).parents("form:eq(0)").find(".compare > input").each(function(){$(this).attr("checked",A)
});
$(this).parents("form:eq(0)").each(c)
};
var X=function(C){var A=true;
var B=0;
$(this).parents("form:eq(0)").find(".compare > input").each(function(){if(!$(this).attr("checked")){A=false
}else{B++
}});
$(this).parents("form:eq(0)").find("input.select-all").each(function(){if(A){$(this).attr("checked",A)
}else{$(this).removeAttr("checked")
}});
$(this).parents("form:eq(0)").find(".compare-all").each(function(){if(B>1){$(this).attr({alt:"Compare selected",src:"/furniture/ui_imgs/productnavigator_btn_compareselected.png"});
$(this).removeAttr("disabled")
}else{$(this).attr({disabled:"disabled",alt:"Compare selected: disabled until at least 2 products are selected",src:"/furniture/ui_imgs/productnavigator_btn_compareselected_disabled.png"})
}})
};
$("#product-navigator form").each(c);
$("#product-navigator form").each(X);
$("#product-navigator input.select-all").click(Q);
$("#product-navigator .compare > input").click(X);
$(".product-aggregate form.productAggComp").each(c);
$(".product-aggregate form.productAggComp input.select-all").click(Q);
$(".product-aggregate form.productAggComp .compare > input").click(X);
$(".product-aggregate form.productAggCatComp").each(c);
$(".product-aggregate form.productAggCatComp input.select-all").click(Q);
$(".product-aggregate form.productAggCatComp .compare > input").click(X);
$("#product-navigator li.selected").parents(".category-item").addClass("opened");
if($("#product-navigator li.category-item").length==1){$("#product-navigator li.category-item").addClass("opened")
}if(jQuery.browser.safari){$("#product-navigator .product-category .category-item:not(.opened) form").slideUp(0)
}else{$("#product-navigator .product-category .category-item:not(.opened) form").westpacSlideClose(0).parent().removeClass("opened")
}$("#product-navigator .product-category .category-name").click(function(C){C.preventDefault();
if(jQuery.browser.safari){var A=$(this).parents(".category-item");
var B=500;
if(A.hasClass("opened")){A.find("form").slideUp(B,function(){A.removeClass("opened")
});
return false
}if($("#product-navigator .opened").length){$("#product-navigator .opened").find("form").slideUp(B,function(){$("#product-navigator .opened").removeClass("opened");
A.find("form").slideDown(B);
A.addClass("opened");
$.scrollTo(A,B*1.5)
})
}else{A.find("form").slideToggle(B);
A.toggleClass("opened")
}}else{var A=$(this).parents(".category-item");
var B=500;
if(A.hasClass("opened")){A.find("form").westpacSlideClose(B,function(){A.removeClass("opened")
});
return false
}if($("#product-navigator .opened").length){$("#product-navigator .opened").find("form").westpacSlideClose(B,function(){$("#product-navigator .opened").removeClass("opened");
A.find("form").westpacSlideOpen(B);
A.addClass("opened");
$.scrollTo(A,B*1.5)
})
}else{A.find("form").westpacSlideToggle(B);
A.toggleClass("opened")
}}return false
});
var T=100;
$(".should-toggle-table").each(function(){$(this).addClass("should-toggle-table"+(""+T).substring(1,3));
$(this).text("Hide comparison rates");
T++
});
T=100;
$(".collapsibleTable").each(function(){$(this).addClass("collapsibleTable"+(""+T).substring(1,3));
T++
});
if($(".rates-aggregate").length>0){for(xx=100;
xx<=(T);
xx++){var Y=".should-toggle-table"+(""+xx).substring(1,3);
var U=".collapsibleTable"+(""+xx).substring(1,3);
$(Y).text("Show comparison rates");
$(U).each(function(B,A){A.style.display="none"
})
}}for(xx=100;
xx<=(T);
xx++){(function(){var B=".should-toggle-table"+(""+xx).substring(1,3);
var A=".collapsibleTable"+(""+xx).substring(1,3);
$(B).each(function(){$(this).click(function(C){C.preventDefault();
if($(this).text()=="Hide comparison rates"){$(this).text("Show comparison rates");
$(A).each(function(E,D){D.style.display="none"
})
}else{$(this).text("Hide comparison rates");
$(A).each(function(E,D){D.style.display=""
})
}})
})
})()
}if($(".footnotes").length>0&&$(".footnotes li").length>0){var b=$('<a class="should-toggle-footnotes" href="#"></a>').text("Close");
$(b).insertAfter(".footnotes");
$(".should-toggle-footnotes").click(function(){$(this).prev(".footnotes").slideToggle(200);
$(this).toggleClass("closed");
if($(this).text()=="Open"){$(this).text("Close");
$(this).prev(".footnotes").find("li:eq(0)").queue(function(){$(this).attr("tabIndex",-1);
$(this).focus();
$(this).dequeue()
})
}else{$(this).text("Open")
}return false
})
}if($("#cta").length===0){$("#header-sectional h1").addClass("expanded")
}if($("#cta ul").length===0){$("#cta").addClass("no-buttons")
}if(!$("head meta[name='westpac:dbb']").length){deleteCookie("ddbT");
deleteCookie("ddbL")
}else{var Z=getCookie("ddbT");
var S=getCookie("ddbL");
if(Z==null||Z==""){Z="previous page"
}if(S!=null&&S!=""){$("#header-sectional").append('<div id="dbb"><a href="../yi03/www.westpac.com.au/furniture/scripts/'+S+'">Back to '+Z+"</a></div>")
}}if(typeof promosQueue==="object"){try{var d=promosQueue.left.length;
var V=promosQueue.right.length;
var W=$("#content-primary .c1 .promo-primary");
var e=$("#content-primary .c2 .promo-primary");
setPromo(d,W,promosQueue.left[Math.floor(Math.random()*d)]);
setPromo(V,e,promosQueue.right[Math.floor(Math.random()*V)])
}catch(R){}}if(typeof promosQueueSectionLanding==="object"){try{var f=promosQueueSectionLanding.promo.length;
var a=$("#content-primary .r2 .promo-primary");
setPromo(f,a,promosQueueSectionLanding.promo[Math.floor(Math.random()*f)])
}catch(R){}}$("#error-heading").focus();
if(jQuery.browser.msie&&(jQuery.browser.version<8)){$("input").each(function(){var A=$(this).attr("type");
$(this).addClass(A)
})
}window.onbeforeprint=replaceLogosBeforePrint;
window.onafterprint=replaceLogosAferPrint
});
function openModless(V,U,M,P,R,Q,T,N){var P=P||"800",M=M||"800",U=U||"NewWindow";
var S=S||"no",Q=Q||"no",T=T||"no";
var L=getScreenDimensions();
sFeatures="height="+P+"px,width="+M+"px";
sFeatures+=",left="+(L.sX-(M/2))+"px";
sFeatures+=",top="+(L.sY-(P/2))+"px";
sFeatures+=",toolbar="+R;
sFeatures+=",location="+Q;
sFeatures+=",menubar="+T;
sFeatures+=",status="+N;
sFeatures+=",resizable=yes,scrollbars=yes,copyhistory=no";
var O=window.open(V,U,sFeatures,true);
O.focus()
}function getScreenDimensions(){var F=screen.availHeight;
var G=screen.availWidth;
var H=G/2;
var E=F/2;
return{sWidth:G,sHeight:F,sX:H,sY:E}
}function showDropMenu(J,F,I,G){$("#psearchSuggest").slideUp(30);
if(document.getElementById("active-menu")){removeDropMenu()
}if(!document.getElementById("active-menu")){var H=J.clone().attr("id","active-menu").addClass(F).css({top:I.top,left:I.left+1});
$(document.body).append(H);
H.slideDown(100).queue(function(){var A=$("#active-menu a");
A.each(function(B){$(this).keydown(function(C){traverseActiveMenu(C,B,G)
})
});
$("#active-menu a:first").append('<i class="wai">. or make another choice with arrow key or return to page with Tab.</i>').focus().addClass("focused hasFocus");
$(this).dequeue()
})
}$("#active-menu").find("ul").mousemove(function(){$("#active-menu a.focused").removeClass("focused")
}).end().mouseout(function(A){if(!$("#active-menu a.focused").length){$("#active-menu a.hasFocus").addClass("focused")
}});
if(jQuery.browser.msie&&(jQuery.browser.version<8)){$("#active-menu a").attr("hideFocus","true")
}}function traverseActiveMenu(H,F,G){var E=$("#active-menu a").length;
switch(H.which){case 9:removeDropMenu();
document.getElementById(G).focus();
H.preventDefault();
return false;
break;
case 40:if(F===(E-1)){}else{$("#active-menu a.focused").removeClass("focused hasFocus");
$("#active-menu a:eq("+(F+1)+")").focus().addClass("focused hasFocus")
}H.preventDefault();
return false;
break;
case 38:if(F===0){removeDropMenu();
document.getElementById(G).focus()
}else{$("#active-menu a.focused").removeClass("focused hasFocus");
$("#active-menu a:eq("+(F-1)+")").focus().addClass("focused hasFocus")
}return false;
break;
case 27:removeDropMenu();
document.getElementById(G).focus();
break;
default:break
}}function removeDropMenu(){$("#active-menu:visible").slideUp(30).queue(function(){$(this).remove()
})
}$(window).unload(function(){});
function createWestpacIDCookie(){var G=new Date();
var E=new Date(G.getTime()+365*24*60*60*1000*3);
var F=getCookie("WestpacID");
if(F==null||F==""){var H=(Math.random()*1000000);
CurrentYear=G.getYear();
if(CurrentYear<1000){CurrentYear=CurrentYear+1900
}F="d"+CurrentYear+(G.getMonth()+1)+G.getDate()+"t"+G.getHours()+G.getMinutes()+G.getSeconds()+G.getTime()+"r"+Math.floor(H);
document.cookie="WestpacID="+escape(F)+"; expires="+E.toGMTString()+"; domain=.westpac.com.au;path=/"
}}function setCookie(P,N,L,O){if(L){var I=new Date();
var M=L*24*60*60;
var J=M>0?M:0;
I.setTime(I.getTime()+M*1000);
var K="; expires="+I.toGMTString()+";Max-Age="+J
}else{var K=""
}if(O){document.cookie=P+"="+N+K+";domain="+O+"; path=/"
}else{document.cookie=P+"="+N+K+"; path=/"
}}function getCookie(G){var J=G+"=";
var H=document.cookie.split(";");
for(var F=0;
F<H.length;
F++){var I=H[F];
while(I.charAt(0)==" "){I=I.substring(1,I.length)
}if(I.indexOf(J)==0){return I.substring(J.length,I.length)
}}return null
}function deleteCookie(F){var H=document.domain;
var E=H.split(".");
var G=jQuery.grep(E,function(A){return jQuery.inArray(A,["co","nz","com","au"])==-1
});
jQuery.each(G,function(B){var A=E.slice(B).join(".");
setCookie(F,"",-3,A);
setCookie(F,"",-3,"."+A)
});
setCookie(F,"",-3)
}function setPromo(F,E,D){if(D){$("h2",E).html(D.title);
$("p",E).html(D.tagline);
$("a",E).attr({href:D.link});
$("a",E).addClass(D.linkclass);
$("img",E).attr({src:D.image,alt:D.alt})
}}function newEl(G,I,H){var J=document.createElement(G);
if(I!==null&&I!==undefined){for(var F in I){switch(F.toLowerCase()){case"classname"||"class":J.className=I[F];
break;
case"colspan":J.colSpan=I[F];
break;
case"rowspan":J.rowSpan=I[F];
break;
case"htmlfor"||"for":J.htmlFor=I[F];
break;
default:J.setAttribute(F,I[F])
}}}if(typeof H==="string"||typeof H==="object"){$(J).append(H)
}return J
}function sendURLToParent(B){if(window.opener&&!window.opener.closed){window.opener.location=B;
self.close()
}else{window.open(B);
self.close()
}}function applyBTNow(){var B="https://online.westpac.com.au/sso/sps/btsfl/saml11/login?SP_PROVIDER_ID=bt.sv.pvd&TARGET=https%3A%2F%2Fbti.ddmz.btal.com.au%2F[application link]%3Baccountid%3D%3Bbanner%3Dpwt%3Blastsignin%3B&PROTOCOL=POST";
document.cookie="boundary="+B+";domain=.westpac.com.au;path=/";
window.location=B
}function getBTReferrer(){refText="&referrer=";
curURL=document.location.href;
refStart=curURL.indexOf(refText);
if(refStart!=-1){return document.referrer
}else{return refText+curURL
}}jQuery.fn.westpacSlideClose=function(F,D){var E=(F)?F:450;
this.css("overflow","hidden").animate({height:0},E,"swing",D);
return this
};
jQuery.fn.westpacSlideOpen=function(F,H){var E=(F)?F:350;
var G=0;
this.children().each(function(){$(this).css("display","block");
G+=$(this).outerHeight(true)
});
this.animate({height:G},E,"swing",H);
return this
};
jQuery.fn.westpacSlideToggle=function(F,H){var E=(F)?F:null;
var G=this;
if($(G).height()>0){$(G).westpacSlideClose(E,H)
}else{$(G).westpacSlideOpen(E,H)
}return this
};
function replaceLogosBeforePrint(){if(jQuery.browser.msie){$("#logo-w").each(function(){$(this).attr("src","/furniture/ui_imgs/logo_W_plain_redonwhite.png")
});
$("#logo-westpac").each(function(){$(this).attr("src","/furniture/ui_imgs/logo-westpac-white.png")
})
}}function replaceLogosAferPrint(){if(jQuery.browser.msie){$("#logo-w").each(function(){$(this).attr("src","/furniture/ui_imgs/logo_W_8b_a.png")
});
$("#logo-westpac").each(function(){$(this).attr("src","/furniture/ui_imgs/logo-westpac.png")
})
}};