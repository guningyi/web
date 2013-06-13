LFM.set("Activityfeed",{DeleteListener:Class.create({initialize:function(){
document.observe("click",this.bin.bindAsEventListener(this));
},bin:function(_1){
var _2=_1.findElement("a.removeActivity");
if(!_2){
return;
}
_1.stop();
var _3=_2.up("li");
new Ajax.Request("/ajax/deleteActivity",{parameters:{ajax:1,activities:_3.id,formtoken:LFM.Session.formtoken},onComplete:function(_4){
var _5=new LFM.Ajax.Response(_4);
if(_5.isSuccess()){
_3.remove();
}
}});
}})});
LFM.set("Activity",{buildFeedItem:function(_6){
var _7=new Element("ul",{"class":"minifeedSmall"});
var li=new Element("li",{"class":_6.action});
if(_6.icon){
li.insert(_6.icon);
}
li.insert(_6.message);
_7.update(li);
return _7;
}});
LFM.set("Util",{AdblockDetector:Class.create({initialize:function(){
},isBlocking:function(){
if(LFM.Session.language!="en"){
return false;
}
return this.isABP();
},isABP:function(){
return this.isEasyList();
},isEasyList:function(){
if($("footer_ads")&&$("footer_ads").visible()&&$("footer_ads").getStyle("-moz-binding")){
return $("footer_ads").getStyle("-moz-binding").include("abp-elemhidehit");
}
}})});
LFM.set("Library",{AddListener:Class.create({options:{},initialize:function(_9,_a){
this.bindTo=$(_9);
this.bindTo.observe("click",this._onClick.bindAsEventListener(this));
Object.extend(this.options,_a||{});
},_onClick:function(e){
var _c=e.element();
if(!_c||!_c.hasClassName("lfmAddButton")){
return true;
}
e.stop();
this._showDialog(this.options.resource||{url:_c.getAttribute("href")});
},_showDialog:function(_d){
var _e="/ajax/dialog/add";
var _f={resource:_d,onConfirm:this._onConfirmDialog.bindAsEventListener(this)};
this._dialog=new LFM.Dialog(_f);
this._dialog.show(_e);
},_onConfirmDialog:function(e){
}})});
LFM.set("Adserver",{getSponsoredByBranding:function(_11,_12,_13,_14){
var _15=new Element("div",{"class":"brand"});
if(!_14){
var _16=new Element("img",{"class":"sponsored",src:LFM.Session.staticHost+"/promotions/notifications_presented_grey.gif",width:88,height:5}).setStyle({padding:"2px 0"});
}
var _17=new Element("img",{src:_11,width:1,height:1}).setStyle({position:"absolute",top:0,left:0,visibility:"hidden"});
if(_12){
var _18=new Element("img",{src:_12,width:88,height:31});
if(_13){
_18=_18.wrap(new Element("a",{href:_13,target:"_blank"}));
}
if(_16){
_15.insert(_16);
}
_15.insert(_18);
}
_15.insert(_17);
return _15;
}});
LFM.set("Library",{AlbumStrip:Class.create({initialize:function(_19){
this._albumstrip=$(_19);
this._albumstrip.addClassName("js");
this._wrapper=this._albumstrip.down("div.wrapper");
this._wrapper.setStyle({overflow:"hidden"});
this._list=this._wrapper.down("ul");
if(this._list){
this._listItems=this._list.childElements();
}
this._currentFilterName=false;
this._leftButton=new Element("a",{"class":"leftButton",href:"#"});
this._rightButton=new Element("a",{"class":"rightButton",href:"#"});
this._albumstrip.insert(this._leftButton);
this._albumstrip.insert(this._rightButton);
this._offset=0;
this._itemcount=this._listItems?this._listItems.length:0;
var _1a=Prototype.Browser.WebKit?window:document;
var _1b=Prototype.Browser.WebKit?"load":"dom:loaded";
Event.observe(_1a,_1b,function(){
this._itemwidth=this._list.down("li").getWidth();
this._reflow();
Event.observe(window,"resize",this._reflow.bindAsEventListener(this));
this._leftButton.observe("click",this.scrollLeft.bindAsEventListener(this));
this._rightButton.observe("click",this.scrollRight.bindAsEventListener(this));
}.bind(this));
},setUpFilter:function(_1c){
this._filteredTable=$(_1c);
startTimer("setUpFilter");
this._filterDataTable={};
this._filterDataTable.albums=[];
this._filterDataTable.everything=this._filteredTable.select("tbody tr");
this._filterDataTable.everything.each(function(row){
var _1e=row.className.split(" ");
_1e.each(function(_1f){
if(_1f.substring(0,5)=="album"){
if(!this._filterDataTable.albums[_1f]){
this._filterDataTable.albums[_1f]=[];
}
this._filterDataTable.albums[_1f].push(row);
}
}.bind(this));
}.bind(this));
stopTimer("setUpFilter");
this._albumstrip.observe("click",this._filter.bindAsEventListener(this));
},_filter:function(_20){
if(!this._maxHeight){
this._maxHeight=this._filteredTable.up().getHeight();
this._filteredTable.up().setStyle({height:this._maxHeight+"px"});
var _21=this._filterDataTable.everything.first().select("td");
var _22=this._filteredTable.down("thead tr").select("th");
for(var i=_22.length-1;i>=0;i--){
var _24=_21[i].getWidth();
var _24=_24-20;
_22[i].setStyle({width:_24+"px"});
}
}
var _25=_20.findElement("a");
if(!_25){
return;
}
_20.stop();
if(_25.up("h3")){
_25.up("h3").addClassName("current");
this._listItems.invoke("removeClassName","selected");
if(!this._currentFilterName){
return;
}else{
this._currentFilterName=false;
this._filteredTable.show();
$("noTracksMessage").hide();
this._filterDataTable.everything.invoke("show");
LFM.Display.candyStripe(this._filteredTable);
}
}else{
var _26=_25.up("li").className.split(" ");
var _27="";
_26.each(function(_28){
if(_28.substring(0,5)=="album"){
_27=_28;
}
}.bind(this));
if(_27){
this._albumstrip.down("h3").removeClassName("current");
this._listItems.invoke("removeClassName","selected");
_25.up("li").addClassName("selected");
this._currentFilterName=_27;
this._filterDataTable.everything.invoke("hide");
if(this._filterDataTable.albums[_27]){
this._filterDataTable.albums[_27].invoke("show");
LFM.Display.candyStripe(this._filterDataTable.albums[_27]);
this._filteredTable.show();
$("noTracksMessage").hide();
}else{
this._filteredTable.hide();
$("noTracksMessage").show();
}
}else{
return;
}
}
},scrollRight:function(_29){
if(_29){
_29.stop();
}
var _2a=this._offset-this._itemwidth;
if(_2a*-1>this._list.getWidth()-this._wrapper.getWidth()){
_2a=this._wrapper.getWidth()-this._list.getWidth();
}
this._offset=_2a;
new Effect.Morph(this._list,{style:{left:_2a+"px"},duration:0.3,queue:{position:"end",scope:"scrollscope"}});
},scrollLeft:function(_2b){
if(_2b){
_2b.stop();
}
var _2c=this._offset+this._itemwidth;
if(_2c>0){
_2c=0;
}
this._offset=_2c;
new Effect.Morph(this._list,{style:{left:_2c+"px"},duration:0.3,queue:{position:"end",scope:"scrollscope"}});
},_reflow:function(){
var _2d=true;
var _2e=this._albumstrip.getWidth()-this._leftButton.getWidth()-this._rightButton.getWidth();
log(_2e);
var _2f=Math.floor(_2e/this._itemwidth);
if(_2f>=this._itemcount){
_2d=false;
_2f=this._itemcount;
}
var _30=_2f*this._itemwidth;
this._wrapper.setStyle({width:_30+"px"});
if(_2d){
this._leftButton.show();
this._rightButton.show();
}else{
this._leftButton.hide();
this._rightButton.hide();
}
}})});
LFM.set("Form",{Attachbutton:Class.create({initialize:function(_31,_32){
this.button=$(_31);
if(!_32){
_32={};
}
this.options=_32;
this._bindToButton();
},_bindToButton:function(){
Event.observe(this.button,"click",function(e){
Event.stop(e);
var _34=new LFM.Form.ResourcePicker({onSelect:this._onSelect.bind(this)});
_34.show();
}.bindAsEventListener(this));
},_onSelect:function(res){
if(res){
this._appendAttachment(res.type,res.id);
}
},_appendAttachment:function(_36,id){
if(!this.itemcontainer&&this.options.itemcontainer){
this.itemcontainer=$(this.options.itemcontainer);
}
if(this.itemcontainer){
this.itemcontainer.show();
this.itemcontainer.down("img.progress").show();
new Ajax.Request("/ajax/attachment",{method:"get",parameters:"type="+_36+"&id="+id,onComplete:this._appendAttachmentCallback.bind(this)});
}
var _38=this.button.up("form");
if(_38){
var _39=_38.down("input[name=attachmenttype]");
var _3a=_38.down("input[name=attachmentid]");
if(!_39){
var _39=document.createElement("input");
_39.setAttribute("type","hidden");
_39.setAttribute("name","attachmenttype");
var _3a=document.createElement("input");
_3a.setAttribute("type","hidden");
_3a.setAttribute("name","attachmentid");
_39.setAttribute("value",_36);
_3a.setAttribute("value",id);
_38.appendChild(_39);
_38.appendChild(_3a);
}else{
_39.setAttribute("value",_36);
_3a.setAttribute("value",id);
}
}
},_appendAttachmentCallback:function(req){
var _3c=req.responseText.evalJSON();
if(this.itemcontainer){
this.itemcontainer.insert({top:_3c.attachment});
this.itemcontainer.down("img.progress").hide();
}
}})});
LFM.set("Button",{MultiButton:{setup:function(){
this.activeButton=false;
this.menu=$("multiButtonMenu");
this.loadedInfo=$H();
this.menu.observe("click",this.observeMenu.bindAsEventListener(this));
$("page").observe("click",this.observeDocument.bindAsEventListener(this));
this.clickOffObserver=this.clickOff.bindAsEventListener(this);
this.parentIsUser=LFM.ParentResource&&LFM.ParentResource.type==4;
this.parentIsLoggedInUser=LFM.Session.loggedIn&&this.parentIsUser&&LFM.ParentResource.name==LFM.Session.userName;
},observeDocument:function(e){
var _3e=e.findElement("a.lfmMultiButton");
if(!_3e){
return false;
}
e.stop();
if(this.activeButton&&this.activeButton!=_3e){
this.clickOff();
}else{
if(this.activeButton&&this.activeButton==_3e){
this.clickOff();
return;
}
}
this.activeButton=_3e;
if(this.activeButton.hasClassName("lfmSmallButton")){
this.activeButton.addClassName("lfmSmallActiveMultiButton");
}else{
this.activeButton.addClassName("lfmBigActiveMultiButton");
}
if(this.activeButton.hasClassName("mBuy")){
this.updatePriceFromAjax();
}
if(LFM.Session.loggedIn&&!this.parentIsLoggedInUser&&_3e.hasClassName("lfmButtonFortrack")){
this.updateMenuFromAjax(this.activeButton);
}else{
this.showMenu(this.activeButton);
}
document.observe("click",this.clickOffObserver);
},clickOff:function(){
this.hideMenu(this.activeButton);
this.activeButton.removeClassName("lfmSmallActiveMultiButton");
this.activeButton.removeClassName("lfmBigActiveMultiButton");
this.activeButton=false;
var _3f=this.menu.down("li.mBuy a span");
if(_3f){
_3f.remove();
}
document.stopObserving("click",this.clickOffObserver);
},updatePriceFromAjax:function(){
this.menu.down("li.mBuy a").insert(" <img class=\"loading\" src=../ food-List/cdn.last.fm/javascript/release-i18n/154701/""+LFM.Session.staticHost+"/flatness/spinner_13x13.gif/" height=\"7\" />");
var _40=new Ajax.Request("/ajax/affiliableprice",{parameters:{url:this.activeButton.href,cachebuster:Math.round(Math.random()*100)},method:"get",onComplete:function(_41){
this.menu.down("li.mBuy a img").remove();
if(_41.responseText){
this.menu.down("li.mBuy a").insert(" "+_41.responseText);
}
}.bind(this)});
},updateMenuFromAjax:function(_42){
var _42=_42;
if(this.loadedInfo.get(_42.href)){
_42.className=this.loadedInfo.get(_42.href);
this.sortOutClassNames(_42);
this.showMenu(_42);
}else{
var _43=new Ajax.Request("/ajax/library/gettrackinfo",{parameters:{url:_42.href,cachebuster:Math.round(Math.random()*100)},method:"get",onComplete:function(_44){
var _45=new LFM.Ajax.Response(_44);
if(_45.isSuccess()){
if(_45.get("loved")){
_42.removeClassName("mLove");
_42.addClassName("mUnlove");
}else{
_42.addClassName("mLove");
_42.removeClassName("mUnlove");
}
if(_45.get("banned")){
_42.removeClassName("mBan");
_42.addClassName("mUnban");
}else{
if(_42.hasClassName("lfmMultiButtonAllowBan")){
_42.addClassName("mBan");
}
_42.removeClassName("mUnban");
}
if(_42.hasClassName("lfmMultiButtonFull")){
if(_45.get("playcount")!==null){
_42.addClassName("mRemoveFromLibrary");
_42.removeClassName("mAddToLibrary");
}else{
_42.removeClassName("mRemoveFromLibrary");
_42.addClassName("mAddToLibrary");
}
}
this.loadedInfo.set(_42.href,_42.className);
}
if(_42==this.activeButton&&!_43.shown){
this.sortOutClassNames(_42);
this.showMenu(_42);
}
}.bind(this)});
(function checkTimeout(){
if(!(_43&&_43.getStatus()==200)&&_42==this.activeButton){
_43.shown=true;
this.sortOutClassNames(_42);
this.showMenu(_42);
}
}).bind(this).delay(0.5);
}
},showMenu:function(_46,_47){
var _47=_47||{};
var _48=_46.cumulativeOffset();
var _49=$("page").cumulativeOffset();
_48.left=_48.left-7-_49.left;
_48.top=_48.top+_46.getHeight()-_49.top;
var _4a=this.activeButton.getWidth();
if(Prototype.Browser.IE){
if(window.external&&typeof window.XMLHttpRequest=="undefined"){
_48.left=_48.left-35;
}else{
if(_46.hasClassName("lfmSmallMultiButton")&&_46.up("div.module")){
_48.left=_48.left-15;
}
}
}
this.menu.setStyle({top:_48.top+"px",left:_48.left+"px"});
var _4b=this.menu.down("ul");
_4a=_4a-_4b.getStyle("border-left-width").toPixels()-_4b.getStyle("border-right-width").toPixels()-_4b.getStyle("padding-left").toPixels()-_4b.getStyle("padding-right").toPixels();
_4b.setStyle({minWidth:_4a+"px"});
$w("tr li").each(function(_4c){
var _4d=_46.up(_4c);
if(_4d){
_4d.addClassName("open");
}
});
var _4e=_47.showLoadingState?"mLoading":false;
this.sortOutClassNames(_46,_4e);
this.menu.show();
},hideMenu:function(_4f){
$w("tr li").each(function(_50){
var _51=_4f.up(_50);
if(_51){
_51.removeClassName("open");
}
});
this.menu.down("ul").setStyle({minWidth:"0px"});
this.menu.hide();
},sortOutClassNames:function(_52,_53){
if(_53){
this.menu.className=_53;
this.menu.down("div").className=_53;
}else{
var _54=_52.className.match(/\blfmButtonFor([a-z]*)\b/)[1];
_54+="MultiMenu";
this.menu.className=_54;
var _55=_52.className;
this.menu.down("div").className=_55;
}
},observeMenu:function(e){
e.stop();
var _57=this.activeButton.hasClassName("lfmBigMultiButton")?"moreBtn":"multiBtn";
LFM.Omniture.prepareEvar("ClickSource",_57);
var _58=e.findElement("li").className;
if(Prototype.Browser.IE){
_58=_58.replace(/\b\w*hover_/gi,"").strip();
}
switch(_58){
case "mSave":
LFM.Save({url:this.activeButton.href});
break;
case "mObsess":
LFM.Obsess({url:this.activeButton.href});
break;
case "mAddToPlaylist":
LFM.Playlist({url:this.activeButton.href});
break;
case "mAddTags":
LFM.Tag({url:this.activeButton.href});
break;
case "mAddToFriends":
case "mAddToLibrary":
LFM.Add({url:this.activeButton.href});
break;
case "mRemoveFromLibrary":
LFM.RemoveFromLibrary({url:this.activeButton.href},{onDone:function(_59){
var _5a=LFM.get("Page","LibraryDeleteListener");
var _5b=LFM.get("Page","LibraryRemoveTagFromItemListener");
if(_5a){
_5a.onDone(_59);
}
if(_5b){
_5b.onSuccess(_59);
}
}});
break;
case "mSend":
LFM.Send({url:this.activeButton.href});
break;
case "mEditDetails":
location.href=LFM.ParentResource.url+"/settings";
break;
case "mMessageAll":
location.href=LFM.ParentResource.url+"/messageall";
break;
case "mEditPermissions":
location.href=LFM.ParentResource.url+"/permissions";
break;
case "mAbdicate":
location.href=LFM.ParentResource.url+"/abdicate";
break;
case "mLeave":
LFM.Leave({url:this.activeButton.href},{parameters:{leave:1}});
break;
case "mLove":
this.love.bind(this)(this.activeButton,true);
break;
case "mUnlove":
this.love.bind(this)(this.activeButton,false);
break;
case "mBan":
this.ban.bind(this)(this.activeButton,true);
break;
case "mUnban":
this.ban.bind(this)(this.activeButton,false);
break;
case "mBuy":
LFM.BuyDialog({url:this.activeButton.href});
break;
default:
LFM.Omniture.setEvar("ClickSource","");
break;
}
this.clickOff();
},love:function(_5c,_5d){
var _5e=this.activeButton;
new Ajax.Request("/ajax/library/love",{parameters:{ajax:true,url:_5e.href,loved:_5d,formtoken:LFM.Session.formtoken},onSuccess:function(_5f){
var _60=new LFM.Ajax.Response(_5f);
if(_60.isSuccess()){
var _61=_5e.up("tr");
var _62=_5e.up("li");
if(_61){
if(_61.hasClassName("odd")&&_61.up("table").hasClassName("chart")){
var _63="#f4f4f4";
}else{
var _63="#ffffff";
}
}
if((!this.parentIsUser||this.parentIsLoggedInUser)&&_61){
var _64=_61.down("td.lovedCell");
}else{
if(LFM.ParentResource&&LFM.ParentResource.type==9&&$("lovedIndicator")){
if(_5d){
if(LFM.Page.onAddToLibrary){
LFM.Page.onAddToLibrary(_60);
}
$("lovedIndicator").show();
}else{
$("lovedIndicator").hide();
}
}
}
this.loadedInfo.unset(_5e.href);
if(_5d){
LFM.Omniture.trackEvents("LoveTrack");
_5e.removeClassName("mLove");
_5e.addClassName("mUnlove");
if(_64){
_64.insert({top:LFM.Element.icon_loved_indicator});
}
if(_62){
_62.addClassName("loved");
}
var _65=_60.get("activity");
if(_65){
var _66=LFM.Activity.buildFeedItem(_65);
if(LFM.Adserver.showAds&&LFM.Session.location=="us"){
var _67=LFM.Adserver.getATTNotificationBranding();
}
var _68=new Element("div");
_68.insert(_67);
_68.insert(_66);
LFM.Notification.send(_68);
}
}else{
_5e.addClassName("mLove");
_5e.removeClassName("mUnlove");
if(_64){
var _69=_64.down("img.loved_indicator_icon");
if(_69){
_69.remove();
}
}
if(_62){
_62.removeClassName("loved");
}
}
if(_64){
new Effect.Highlight(_61,{endcolor:_63,afterFinish:function(_6a){
_6a.element.removeAttribute("style");
}});
}
}
}.bind(this)});
},ban:function(_6b,_6c){
var _6d=this.activeButton;
new Ajax.Request("/ajax/library/ban",{parameters:{ajax:true,url:_6d.href,banned:_6c,formtoken:LFM.Session.formtoken},onSuccess:function(_6e){
var _6f=new LFM.Ajax.Response(_6e);
if(_6f.isSuccess()){
var _70=_6d.up("tr");
if(_70){
if(_70.hasClassName("odd")&&_70.up("table").hasClassName("chart")){
var _71="#f4f4f4";
}else{
var _71="#ffffff";
}
}
if(LFM.ParentResource){
if(this.parentIsLoggedInUser&&_70){
var _72=_70.down("td.bannedCell");
}else{
if(LFM.ParentResource.type==9&&$("bannedIndicator")){
if(_6c){
$("bannedIndicator").show();
}else{
$("bannedIndicator").hide();
}
}
}
}
this.loadedInfo.unset(_6d.href);
if(_6c){
if(_72){
_72.insert({top:LFM.Element.icon_banned_indicator});
}
}else{
if(_72){
var _73=_72.down("img.banned_indicator_icon");
if(_73){
_73.remove();
}
}
}
if(_70){
new Effect.Fade(_70,{duration:0.5});
}
}
}.bind(this)});
}},affiliations:{"suppliers[]":[],"restypes[]":[],"resids[]":[]},pushAffiliation:function(_74,_75,_76){
LFM.Button.affiliations["suppliers[]"].push(_74);
LFM.Button.affiliations["restypes[]"].push(_75);
LFM.Button.affiliations["resids[]"].push(_76);
}});
LFM.set("Charts",{Switch:Class.create({initialize:function(_77,_78){
this.container=$(_77);
this.parameters=_78;
this.morelink=this.container.select("span.moduleOptions a")[0]||false;
this.cachedcharts=new Hash();
this.container.down("div.horizontalOptions").observe("click",this.switchChartEvent.bindAsEventListener(this));
this.container.select("div.chart").each(function(_79){
var _7a=this.getRangeTypeFromClassName(_79.className);
if(_7a){
this.cachedcharts.set(_7a,_79);
}
}.bind(this));
},switchChartEvent:function(_7b){
var _7c=_7b.element();
if(!_7c.match("a")){
return;
}
_7b.stop();
var _7d=_7c.up("li");
if(_7d.hasClassName("current")){
return;
}
this.container.down("div.horizontalOptions ul").childElements().invoke("removeClassName","current");
_7d.addClassName("current");
var _7e=this.getRangeTypeFromClassName(_7d.className);
this.switchChart(_7e);
},refresh:function(){
this.cachedcharts=new Hash();
this.switchChart();
},switchChart:function(_7f){
if(_7f&&this.cachedcharts.get(_7f)){
this.cachedcharts.each(function(_80){
_80.value.hide();
});
this.cachedcharts.get(_7f).show();
if(this.morelink){
this.morelink.href=this.container.down("ul li.chart"+_7f+" a").href;
}
}else{
var _81=Object.extend(this.parameters,{rangetype:_7f,ajax:1,cachebuster:Math.round(Math.random()*100)});
new Ajax.Request("/module",{method:"get",parameters:_81,onComplete:function(t){
var _83=new LFM.Ajax.Response(t);
if(_83.isSuccess()){
this.container.insert({bottom:_83.get("content").strip()});
var _84=!_7f;
var _85=this.container.childElements().last();
ieHover.add(_85);
if(!_7f){
_7f=this.getRangeTypeFromClassName(_85.className);
this.container.down("div.horizontalOptions ul").childElements().invoke("removeClassName","current");
this.container.down("div.horizontalOptions ul li.chart"+_7f).addClassName("current");
}
this.cachedcharts.set(_7f,_85);
if(this.morelink){
this.morelink.up().insert({before:this.cachedcharts.get(_7f)});
}
if(_84){
this.container.select("div.chart").each(function(_86){
if(_86!=_85){
_86.remove();
}
}.bind(this));
}
this.cachedcharts.each(function(_87){
if(_87.key!=_7f){
_87.value.hide();
}
});
this.cachedcharts.get(_7f).show();
if(this.morelink){
this.morelink.href=this.container.down("ul li.chart"+_7f+" a").href;
}
this.container.removeClassName("loading");
}
}.bind(this),onCreate:function(){
this.container.addClassName("loading");
}.bind(this),onFailure:function(){
this.container.removeClassName("loading");
}.bind(this)});
}
},getRangeTypeFromClassName:function(_88){
var _89=_88.match(/chart[^ ]+/)[0];
return _89.substr(5);
}})});
CopyProtection=Class.create({initialize:function(){
document.observe("keydown",this.cancelKeyDown);
document.observe("contextmenu",this.cancelContextMenu);
document.observe("mousedown",this.disableSelect);
document.observe("mouseup",this.enableSelect);
},cancelKeyDown:function(key){
var _8b=new Array("a","u","c","x","v","j");
if(key.ctrlKey||key.metaKey){
for(i=0;i<_8b.length;i++){
var _8c=key.keyCode;
if(_8b[i].toLowerCase()==String.fromCharCode(_8c).toLowerCase()){
key.stop();
return false;
}
}
}
},cancelContextMenu:function(e){
e.stop();
return false;
},disableSelect:function(e){
var _8f=new Array("input","select","textarea","radio","checkbox");
var _90=false;
for(var i=0;i<_8f.length;i++){
if(e.target.tagName.toLowerCase()==_8f[i]){
_90=true;
}
}
if(!_90){
e.stop();
return false;
}
},enableSelect:function(e){
return true;
}});
LFM.set("Display",{candyStripe:function(_93,_94){
var _94=_94||false;
if(is_array(_93)){
var _95=_93;
}else{
_93=$(_93);
if(_94.selector){
var _95=_93.select(_94.selector);
}else{
if(_93.tagName=="TABLE"){
_93=_93.down("tbody");
}
var _95=_93.childElements();
}
}
if(_95.length>0){
_95[0].up("table").addClassName("candyStriped");
_95.each(function(row,i){
if(i%2){
row.removeClassName("odd");
}else{
row.addClassName("odd");
}
row.removeClassName("first");
row.removeClassName("last");
if(_94.renumber){
var _98=row.down("td.position");
if(_98){
_98.update(i+1);
}
}
});
_95.first().addClassName("first");
_95.last().addClassName("last");
}
},toggleSelector:function(_99){
var els=$$(_99);
if(els){
els.each(function(e){
e.toggle();
});
}
}});
document.observe("dom:loaded",function(_9c){
$$(".downloadDriver").each(function(_9d){
_9d.observe("click",function(e){
var el=e.findElement("a");
if(el&&el.match("a")){
var _a0=LFM.get("Page","hasManualAdded");
var _a1="New user download CTA ("+(_a0?"after":"before")+" library add)";
LFM.Omniture.setLink(el,_a1);
LFM.Omniture.prepareEvar("ClickSource",_a0?"downloadAfterManualAdd":"downloadBeforeManualAdd");
LFM.Omniture.trackEvents();
}
});
});
});
LFM.set("Display",{DropDown:Class.create({initialize:function(_a2,_a3,_a4,_a5){
this.container=$(_a2);
this.toggler=$(_a3);
this.ddbody=$(_a4);
this.ddbody.hide();
this.ddbody.setStyle({position:"absolute",zIndex:999999});
this.use_iframe=/Linux/.test(navigator.platform);
if(this.use_iframe){
this.iframe=new Element("iframe",{"src":"javascript: false","frameborder":0,"scrolling":"no","allowtransparency":"true"}).setStyle({position:"absolute",zIndex:999998,border:0});
}
this.shownOnce=false;
this.options=_a5||{};
this.container.addClassName("toggle");
this.offBinding=this.clickOff.bindAsEventListener(this);
this.toggler.observe("click",this.toggle.bindAsEventListener(this));
if(this.options.trackItemClick){
this.ddbody.observe("click",this.trackItemClick.bindAsEventListener(this));
}
},hide:function(){
if(this.options.onHide){
this.options.onHide(this);
}
if(this.use_iframe){
this.iframe.setStyle({"display":"none"});
}
this.ddbody.hide();
this.container.removeClassName("expanded");
Event.stopObserving(document,"click",this.offBinding,true);
if(LFM.Display.openDropDown&&LFM.Display.openDropDown==this){
LFM.Display.openDropDown=false;
}
},show:function(){
if(LFM.Display.openDropDown){
LFM.Display.openDropDown.hide(this);
}
if(!this.shownOnce){
if(this.use_iframe){
$("page").insert(this.iframe);
}
$("page").insert(this.ddbody);
this.shownOnce=true;
}
var _a6=this.container.cumulativeOffset();
var _a7=$("page").cumulativeOffset();
_a6.left=_a6.left-_a7.left;
_a6.top=_a6.top+this.container.getHeight()-_a7.top;
if(Prototype.Browser.IE&&this.container.getStyle("display")=="inline-block"){
var _a8=this.toggler.getWidth();
}else{
var _a8=this.container.getWidth();
}
var _a9=$("page").getWidth();
if((this.options.align&&this.options.align=="right")||((_a6.left+this.ddbody.getWidth())>_a9)){
var _aa=(_a9-_a8-_a6.left)+"px";
var _ab="auto";
}else{
var _ab=_a6.left+"px";
var _aa="auto";
if(Prototype.Browser.IE){
if(window.external&&typeof window.XMLHttpRequest=="undefined"){
_ab=(_a6.left-35)+"px";
}
}
}
if(!this.options.autoWidth){
_a8=_a8-this.ddbody.getStyle("border-left-width").toPixels()-this.ddbody.getStyle("border-right-width").toPixels()-this.ddbody.getStyle("padding-left").toPixels()-this.ddbody.getStyle("padding-right").toPixels();
this.ddbody.setStyle({minWidth:_a8+"px"});
if(this.use_iframe){
this.iframe.setStyle({minWidth:_a8+"px"});
}
}
this.ddbody.setStyle({top:_a6.top+"px",left:_ab,right:_aa}).show();
var _ac=this.ddbody.cumulativeOffset();
if(this.use_iframe){
this.iframe.clonePosition(this.ddbody);
this.iframe.show();
}
if(this.options.onShow){
this.options.onShow(this);
}
var tr=this.container.up("tr");
if(tr){
tr.addClassName("open");
}
LFM.Display.openDropDown=this;
this.container.addClassName("expanded");
Event.observe(document,"click",this.offBinding,true);
},toggle:function(_ae){
if(this.ddbody.visible()){
this.hide();
}else{
if(this.options.trackToggle){
LFM.Omniture.prepareEvar("ClickSource",this.options.clickSource||this.container.identify());
LFM.Omniture.trackEvents("DropDown");
}
this.show();
}
if(_ae.findElement("A")){
_ae.findElement("A").blur();
}
_ae.stop();
},clickOff:function(_af){
var _b0=Event.element(_af);
var _b1=false;
while(_b0.parentNode){
if(_b0==this.ddbody){
return true;
}else{
if(_b0==this.toggler){
_b1=true;
}
}
_b0=_b0.parentNode;
}
this.hide();
if(_b1){
_af.stop();
}
},trackItemClick:function(e){
var _b3=e.findElement("a");
if(_b3){
var _b4=_b3.className;
var _b5=this.container.identify();
var _b6=_b3.up("li");
if(_b6){
_b4=_b6.className;
}
LFM.Omniture.setLink(_b3,_b5+":"+_b4);
LFM.Omniture.prepareEvar("ClickSource",_b5);
LFM.Omniture.trackEvents("Click");
}
}})});
var EventCalendar={calendars:null,currentMonth:null,lastRequested:null,next:function(url,_b8,_b9){
_b8.blur();
Element.addClassName(_b8,"busy");
var c=EventCalendar.getCurrentMonth();
var _bb=_b9?EventCalendar.getPrevMonthAfterTable(c):EventCalendar.getNextMonthAfterTable(c);
var _bc=null;
var _bd=null;
if(!_b9){
_bd=document.getElementsByClassName("month-"+_bb,$("calendar"));
_bc=_bd.length>0?_bd[0]:false;
}else{
var m=EventCalendar.getPrevMonthAfterTable(c);
_bd=document.getElementsByClassName("month-"+m,$("calendar"));
_bc=_bd.length>0?_bd[0]:false;
}
if(_bc){
c.style.display="none";
_bc.style.display="table";
EventCalendar.currentMonth=_bc;
Element.removeClassName(_b8,"busy");
}else{
if(_bc==-1){
Element.removeClassName(_b8,"busy");
}else{
url=EventCalendar.convertURL(url);
EventCalendar.lastRequested=_bb;
var _bf=new Ajax.Request(url+"&startdate="+_bb+"-01",{onSuccess:EventCalendar.receiveMonth.bind(_b8),onFailure:EventCalendar.receiveMonthFailed.bind(_b8)});
}
}
},prev:function(url,_c1){
EventCalendar.next(url,_c1,true);
},convertURL:function(url){
url=url.replace(/^\/events/,"");
return "/events/calendar"+url;
},receiveMonth:function(_c3){
if(_c3.responseText.indexOf("calendar")==-1){
var _c4=EventCalendar.receiveMonthFailed.bind(this);
_c4();
return;
}
Element.removeClassName(this,"busy");
new Insertion.Bottom("calendar",_c3.responseText);
var _c5=document.getElementsByClassName("calendar",$("calendar"));
if(_c5.length>0){
EventCalendar.currentMonth.style.display="none";
_c5[_c5.length-1].style.display="table";
EventCalendar.currentMonth=_c5[_c5.length-1];
}
},receiveMonthFailed:function(){
Element.removeClassName(this,"busy");
},getNextMonthAfterTable:function(_c6){
var _c7=EventCalendar.getMonthForTable(_c6);
var _c8=_c7.split("-");
var _c9=_c8[0];
var _ca=_c8[1];
if(_ca==12){
_ca=1;
_c9++;
}else{
_ca++;
}
if(_ca<10){
_ca="0"+_ca;
}
return _c9+"-"+_ca;
},getPrevMonthAfterTable:function(_cb){
var _cc=EventCalendar.getMonthForTable(_cb);
var _cd=_cc.split("-");
var _ce=_cd[0];
var _cf=_cd[1];
if(_cf=="01"){
_cf=12;
_ce--;
}else{
_cf--;
}
if(_cf<10){
_cf="0"+_cf;
}
return _ce+"-"+_cf;
},getMonthForTable:function(_d0){
if(_d0.month){
return _d0.month;
}
var _d1=$A(_d0.className.split(/\s+/));
var c=_d1.find(function(c){
return c.substring(0,5)=="month";
});
_d0.month=c.substring(6);
return _d0.month;
},getCurrentMonth:function(){
if(EventCalendar.currentMonth){
return EventCalendar.currentMonth;
}
EventCalendar.calendars=$A(document.getElementsByClassName("calendar",$("calendar")));
EventCalendar.currentMonth=EventCalendar.calendars.find(function(c){
return Element.hasClassName(c,"first");
});
EventCalendar.lastRequested=EventCalendar.getMonthForTable(EventCalendar.currentMonth);
return EventCalendar.currentMonth;
}};
LFM.set("Adserver",{"ExpandingAd":Class.create({inner_id:"",outer_id:"",embed_id:"",adExpandedHeight:0,adExpandedWidth:0,adCollapsedHeight:0,adCollapsedWidth:0,isCollapsing:false,toggleState:false,initialize:function(_d5,_d6,_d7){
this.inner_id=_d6;
this.outer_id=_d5;
this.embed_id=_d7;
this.getDimensions();
this.setStyles();
this.bindEventListeners();
},getDimensions:function(){
this.adExpandedHeight=$(this.embed_id).getHeight();
this.adExpandedWidth=$(this.embed_id).getWidth();
this.adCollapsedHeight=$(this.outer_id).getHeight();
this.adCollapsedWidth=$(this.outer_id).getWidth();
},setStyles:function(){
$(this.outer_id).setStyle({"zIndex":0,"overflow":"visible","position":"relative"});
$(this.inner_id).setStyle({"zIndex":0,"position":"relative","top":0,"text-align":"center"});
},bindEventListeners:function(){
var _d8=this;
$(document).observe("click",function(e){
_d8.collapse();
});
$(this.inner_id).observe("click",function(e){
e.stop();
});
$(this.inner_id).observe("mouseover",function(e){
_d8.isCollapsing=false;
if(_d8.toggleState){
_d8.expand();
}
});
$(this.inner_id).observe("mouseout",function(e){
if(!_d8.isCollapsing){
_d8.isCollapsing=true;
setTimeout(function(){
if(_d8.isCollapsing){
_d8.collapse();
_d8.isCollapsing=false;
}
},2000);
}
});
$(this.embed_id).observe("focus",function(e){
_d8.expand();
_d8.toggleState=true;
});
$(this.embed_id).observe("blur",function(e){
_d8.toggleState=false;
});
},collapse:function(){
$(this.outer_id).setStyle({"zIndex":0});
$(this.inner_id).setStyle({"zIndex":0,"width":this.adCollapsedWidth+"px","height":this.adCollapsedHeight+"px"});
this.isCollapsing=false;
},expand:function(){
$(this.outer_id).setStyle({"zIndex":99999});
$(this.inner_id).setStyle({"zIndex":99999,"width":this.adExpandedWidth+"px","height":this.adExpandedHeight+"px"});
}})});
LFM.set("Form",{Placeholder:Class.create({nativeSupport:Prototype.Browser.WebKit?true:false,required:true,initialize:function(_df,_e0){
if(typeof _e0!="undefined"){
this.required=_e0;
}
if(_df){
this.element=$(_df);
}
if(this.element){
if(this.element.match("input")||this.element.match("textarea")){
this.setUp(this.element);
}else{
this.element.select("input[placeholder]").each(function(_e1){
this.setUp(_e1);
}.bind(this));
}
}else{
if(!this.element){
$$("input[placeholder]").each(function(_e2){
this.setUp(_e2);
}.bind(this));
}
}
},setText:function(_e3,_e4){
_e3.setAttribute("placeholder",_e4);
if(!this.nativeSupport||_e3.match("textarea")){
if($F(_e3)==""||_e3.hasClassName("hint")){
_e3.addClassName("hint");
_e3.value=_e4;
}
}
},clearPlaceholder:function(_e5,_e6){
if($F(_e5)==_e5.getAttribute("placeholder")){
_e5.removeClassName("hint");
_e5.value="";
}
_e6.disabled=true;
},resetPlaceholder:function(_e7,_e8){
if(!$F(_e7).strip()){
_e7.addClassName("hint");
_e7.value=_e7.getAttribute("placeholder");
_e8.disabled=false;
}
},setUp:function(_e9){
this.setText(_e9,_e9.getAttribute("placeholder"));
if(!this.nativeSupport||_e9.match("textarea")){
var _ea=new Element("input",{"type":"hidden","name":"placeholder","value":1});
_e9.insert({after:_ea});
_e9.observe("focus",function(e){
this.clearPlaceholder(_e9,_ea);
}.bind(this));
_e9.observe("blur",function(e){
this.resetPlaceholder(_e9,_ea);
}.bind(this));
if(this.required){
var _ed=_e9.up("form");
_ed.observe("submit",function(e){
this.clearPlaceholder(_e9,_ea);
}.bind(this));
}
}
}})});
LFM.set("Form",{focusToRange:0,focusTo:function(_ef,_f0){
if(typeof _f0=="undefined"){
_f0=_ef.value.length;
}
if(_ef.createTextRange){
if(LFM.Form.focusToRange==0){
LFM.Form.focusToRange=_ef.createTextRange();
}
LFM.Form.focusToRange.moveEnd("character",_ef.value.length);
LFM.Form.focusToRange.moveStart("character",_f0);
setTimeout("LFM.Form.focusToRange.select()",10);
}else{
if(_ef.setSelectionRange){
_ef.focus();
_ef.select();
_ef.setSelectionRange(_f0,_ef.value.length);
}else{
_ef.focus();
}
}
}});
LFM.set("Display",{setupHeader:function(){
if(LFM.Session.loggedIn){
$("idBadger").addClassName("withDropDown");
LFM.set("Page",{navDropDown:new LFM.Display.DropDown("idBadger","idBadgerDropper","idBadgerDropDown",{align:"right",trackToggle:true,trackItemClick:true})});
}
new LFM.Form.Placeholder("siteSearchBox");
},colourToggle:function(_f1){
_f1=$(_f1);
$(document.body).toggleClassName("lfmBlack");
_f1.blur();
var _f2,_f3;
if($(document.body).hasClassName("lfmBlack")){
_f2="red";
_f3="black";
_f1.update(LFM.String.toRedStr);
}else{
_f2="black";
_f3="red";
_f1.update(LFM.String.toBlackStr);
}
LFM.setCookie("LFM_Colour",_f3);
LFM.Omniture.prepareEvar("ClickSource","colorToggle:"+_f3);
LFM.Omniture.trackEvents("Click");
return false;
}});
if((Math.round(Math.random()*100)>98)&&(LFM.get("Button","affiliations"))&&(LFM.Button.affiliations["suppliers[]"].length)){
document.observe("dom:loaded",function(_f4){
var url="/ajax/affiliableLookup?";
new Ajax.Request(url,{method:"post",parameters:LFM.Button.affiliations});
});
}
function log(){
if(typeof console!=="undefined"&&LFM&&LFM.get("config","DEVELOPMENT_SERVER")){
if(console.log.apply){
console.log.apply(console,arguments);
}else{
console.log(arguments[0]);
}
}
}
LFM.set("Display",{setMinHeight:function(){
document.observe("dom:loaded",function(){
var _f6=$("secondaryNavigation");
if(_f6){
var _f7=_f6.getHeight()-2;
var _f8=$("content");
if(_f8&&_f8.getHeight()<_f7){
var _f9=$$("#content > .rightCol");
_f9=_f9[0]||_f8;
if(_f9.match(".rightCol")){
_f8.setStyle("min-height: 0");
}
_f7-=_f9.getStyle("padding-top").toPixels(_f9);
_f7-=_f9.getStyle("padding-bottom").toPixels(_f9);
_f9.setStyle({minHeight:(_f7>300?_f7:300)+"px"});
}
}
});
}});
if(LFM&&LFM.get("config","DEVELOPMENT_SERVER")){
LFM.set("Timers",{});
}
function startTimer(_fa){
if(LFM&&LFM.get("config","DEVELOPMENT_SERVER")){
LFM.Timers[_fa]={};
LFM.Timers[_fa].startTime=new Date();
LFM.Timers[_fa].startTime=LFM.Timers[_fa].startTime.getTime();
}
}
function stopTimer(_fb){
if(LFM&&LFM.get("config","DEVELOPMENT_SERVER")){
if(LFM.Timers[_fb]){
LFM.Timers[_fb].endTime=new Date();
LFM.Timers[_fb].endTime=LFM.Timers[_fb].endTime.getTime();
log(LFM.Timers[_fb].endTime-LFM.Timers[_fb].startTime);
}else{
log("Timer "+_fb+" doesn\u2019t exist.");
}
}
}
function loadStyleSheet(_fc){
if(isset(document.createStyleSheet)){
document.createStyleSheet(_fc);
}else{
var _fd=document.createElement("link");
_fd.setAttribute("rel","stylesheet");
_fd.setAttribute("type","text/css");
_fd.setAttribute("href",_fc);
document.getElementsByTagName("head")[0].appendChild(_fd);
}
}
function is_array(obj){
return obj.constructor==Array;
}
function isset(obj){
return typeof obj!=="undefined";
}
String.prototype.pad=function(_100,_101,_102){
if(_100){
_100=_100-this.length;
}else{
return this;
}
var _103=this;
if(_101){
_101=_101+"";
}else{
_101=" ";
}
if(!isset(_102)){
_102="STR_PAD_LEFT";
}
if(_102=="STR_PAD_BOTH"){
var odd=_100%2;
var side=_100/2;
side=Math.round(side);
var left=_101.times(side);
var _107=_101.times(side-odd);
_103=left+_103+_107;
}else{
var _101=_101.times(_100);
if(_102=="PAD_STR_RIGHT"){
_103=_103+_101;
}else{
_103=_101+_103;
}
}
return _103;
};
Number.prototype.toPixels=function(){
return this;
};
String.prototype.toPixels=function(_108){
var size=this.match(/^(-?)(\d+(?:.\d+)?)(px|pt|em|)$/i);
var _10a=size[1]?-1:1;
var _10b=size[2];
var unit=size[3].toLowerCase();
function rule(_10d,unit){
var _10f=document.getElementById(unit+"Ruler");
if(!_10f){
_10f=document.createElement("div");
document.getElementsByTagName("BODY")[0].appendChild(_10f);
_10f.id=unit+"Ruler";
}
_10f.style.width=_10d+unit;
return _10f.clientWidth*_10a;
}
switch(unit){
case "px":
return _10b*_10a;
case "pt":
return rule(_10b,unit);
case "em":
if(!_108){
log("It\u2019s better to give a reference element when calculating pixels from ems");
return rule(_10b,unit);
}else{
var _110=document.createElement(_108.tagName);
_110.style.display="block";
_110.style.position="absolute";
_110.style.left="-9999px";
_110.style.top="-9999px";
_110.style.height="0";
_110.style.padding="0";
_110.style.border="0";
_110.style.width=_10b+unit;
_108.parentNode.appendChild(_110);
returnValue=_110.clientWidth;
_108.parentNode.removeChild(_110);
return returnValue*_10a;
}
default:
return _10b*_10a;
}
};
var CSSUtils={getCSSRule:function(_111,_112){
_111=_111.toLowerCase();
if(document.styleSheets){
for(var i=0;i<document.styleSheets.length;i++){
var _114=document.styleSheets[i];
var ii=0;
var _116=false;
do{
if(_114.cssRules){
_116=_114.cssRules[ii];
}else{
_116=_114.rules[ii];
}
if(_116){
if(_116.selectorText.toLowerCase()==_111){
if(_112=="delete"){
if(_114.cssRules){
_114.deleteRule(ii);
}else{
_114.removeRule(ii);
}
return true;
}else{
return _116;
}
}
}
ii++;
}while(_116);
}
}
return false;
},killCSSRule:function(_117){
return CSSUtils.getCSSRule(_117,"delete");
},addCSSRule:function(_118){
if(document.styleSheets){
if(!CSSUtils.getCSSRule(_118)){
if(document.styleSheets[0].addRule){
document.styleSheets[0].addRule(_118,null,0);
}else{
document.styleSheets[0].insertRule(_118+" { }",0);
}
}
}
return CSSUtils.getCSSRule(_118);
}};
function actsAsAspect(_119){
_119.yield=null;
_119.rv={};
_119.before=function(_11a,f){
var _11c=eval("this."+_11a);
this[_11a]=function(){
f.apply(this,arguments);
return _11c.apply(this,arguments);
};
};
_119.after=function(_11d,f){
var _11f=eval("this."+_11d);
this[_11d]=function(){
this.rv[_11d]=_11f.apply(this,arguments);
return f.apply(this,arguments);
};
};
_119.around=function(_120,f){
var _122=eval("this."+_120);
this[_120]=function(){
this.yield=_122;
return f.apply(this,arguments);
};
};
}
var ieHover={selector:"tr, li",add:function(_123){
if(!(/MSIE (5|6|8)/).test(navigator.userAgent)){
return;
}
var _123=_123||false;
if(Object.isString(_123)&&$(_123)){
$(_123).select(ieHover.selector).each(function(item){
ieHover.prepareItem(item);
});
}else{
if(Object.isElement(_123)){
_123=$(_123);
if(_123.match("tr, li")){
ieHover.prepareItem(_123);
}else{
_123.select(ieHover.selector).each(function(item){
ieHover.prepareItem(item);
});
}
}else{
if(Object.isArray(_123)){
_123.each(function(item){
ieHover.prepareItem(item);
});
}
}
}
},prepareItem:function(item){
item.observe("mouseenter",ieHover.mouseOver);
item.observe("mouseleave",ieHover.mouseOut);
},mouseOver:function(_128){
this.className=this.className.replace(/(\w+[^_\s]{2})\b/ig,"$1 $1hover_")+" hover_";
},mouseOut:function(_129){
this.className=this.className.replace(/\w+_\b/ig,"").replace(/\s+/ig," ");
},setUp:function(){
if(!(/MSIE (5|6|8)/).test(navigator.userAgent)){
return;
}
var _12a=document.createStyleSheet();
var _12b=[];
var _12c;
var _12d=document.styleSheets,l=_12d.length;
for(var i=0;i<l;i++){
parseStylesheet(_12d[i]);
}
function parseStylesheet(_130){
if(_130.imports){
try{
var _131=_130.imports,l=_131.length;
for(var i=0;i<l;i++){
parseStylesheet(_130.imports[i]);
}
}
catch(securityException){
}
}
try{
var _133=(_12c=_130).rules;
var l=_133.length;
var _135=false;
var _136=false;
for(var j=0;j<l;j++){
_135=_133[j].selectorText;
_136=_133[j].style.cssText;
if(_135.match(/(tr|li)(\.(\w*))*:hover/ig)&&_136){
_12b.push([_135.replace(/(tr|li)(\.(\w*))*:hover/ig,"$1.$3hover_"),_136]);
}
}
}
catch(securityException){
}
}
var _138="";
for(var i=_12b.length-1;i>=0;i--){
_138+=_12b[i][0]+"\n{ "+_12b[i][1]+"}\n";
}
_12a.cssText=_138;
var _139=[];
var page=$("page");
ieHover.selector.split(",").each(function(weee){
_139.push($A(page.getElementsByTagName(weee.strip())));
});
_139=_139.flatten();
var i=_139.length-1;
for(i;i>=0;i--){
Event.observe(_139[i],"mouseenter",ieHover.mouseOver);
Event.observe(_139[i],"mouseleave",ieHover.mouseOut);
}
}};
LFM.set("Help",{popup:function(id){
var url="/popups/faq/?id="+id;
faq=window.open(url,"faq","toolbar=no, location=no, directories=no, status=no,menubar=no, scrollbars=yes, resizable=yes, width=350, height=400");
return false;
}});
HighlightEachOther=Class.create({initialize:function(el1,tag1,el2,tag2){
this.els=[$(el1).select(tag1),$(el2).select(tag2)].flatten();
this.els.each(function(el){
el.observe("mouseover",function(e){
this.highlight(el);
}.bindAsEventListener(this));
el.observe("mouseout",function(e){
this.highlight(el);
}.bindAsEventListener(this));
}.bind(this));
},highlight:function(el){
var el=el;
if(!el.relatives){
this.getRelatives(el);
}
el.relatives.each(function(_1b4){
Element.toggleClassName(_1b4,"highlight");
});
},getRelatives:function(el){
el.relatives=new Array();
var rel=el.readAttribute("class");
this.els.each(function(item){
if(item.readAttribute("class")==rel){
el.relatives.push(item);
}
});
}});
LFM.set("LiveSwitch",Class.create({initialize:function(_14a,_14b){
this.element=$(_14a);
this.options={selectedClass:"selected"};
Object.extend(this.options,_14b);
this.items=this.element.select("li");
this.items.each(function(li){
var a=li.down("a");
a.observe("click",this.dispatchOnChange.bindAsEventListener(this));
}.bind(this));
},dispatchOnChange:function(_14e){
_14e.stop();
_14e.element().blur();
var li=_14e.findElement("li");
this.items.invoke("removeClassName",this.options.selectedClass);
li.addClassName(this.options.selectedClass);
this.options.onChange(li);
}}));
LFM.set("Module",{Buttons:Class.create({initialize:function(_150,_151){
this.container=$(_150);
if(_151){
Object.extend(this,_151);
}
if(!this.onComplete){
this.onComplete=this._defaultOnComplete;
}
if(!this.resource){
this.resource=LFM.ParentResource;
}
this.container.observe("click",this.observeMenu.bindAsEventListener(this));
},observeMenu:function(_152){
var link=_152.findElement("a");
if(!link){
return;
}
if(link.hasClassName("mEdit")){
_152.stop();
var url="/ajax/dialog/moduleedit?module="+this.moduleName;
this._dialog=new LFM.Dialog({action:url,classname:"modulePreferences",onConfirm:this._onConfirmDialog.bindAsEventListener(this)});
this._dialog.show(url);
}else{
if(link.hasClassName("mFeeds")){
_152.stop();
var _155={module:this.moduleName,type:this.resource.type,id:this.resource.id};
var url="/ajax/dialog/feeds?"+Object.toQueryString(_155);
this._dialog=new LFM.Dialog({classname:"feedDialog",onConfirm:function(_156){
_156.stop();
this.hide();
}});
this._dialog.show(url);
}else{
if(link.hasClassName("mPaste")){
_152.stop();
var _157=$$(".modulechartsartists li.current a")[0].getAttribute("href");
var _158=/rangetype=([^&]*)/;
var _159=_157.match(_158)[1];
var _155={module:this.moduleName,type:this.resource.type,id:this.resource.id,period:_159};
var url="/ajax/dialog/pasteyourtaste?"+Object.toQueryString(_155);
this._dialog=new LFM.Dialog({classname:"pasteDialog",onConfirm:function(_15a){
_15a.stop();
this.hide();
}});
this._dialog.show(url);
}
}
}
},_defaultOnComplete:function(){
if(this.container.down(".module-body")){
var url="/module";
var _15c={method:"get",parameters:{name:this.moduleName,ajax:1},onComplete:this._defaultRefreshCallback.bind(this),onCreate:function(){
this.container.addClassName("loading");
}.bind(this),onFailure:function(){
this.container.removeClassName("loading");
}.bind(this)};
new Ajax.Request(url,_15c);
}
},_onConfirmDialog:function(_15d,form){
_15d.stop();
if(form){
form.action="/ajax/dialog/moduleedit?module="+this.moduleName;
form.request({onComplete:this.onComplete.bind(this)});
}else{
this._dialog.hide();
this._dialog.overlayForm.request({onComplete:this.onComplete.bind(this)});
}
},_defaultRefreshCallback:function(_15f){
var _160=new LFM.Ajax.Response(_15f);
if(_160.isSuccess()){
this.container.down(".module-body").replace(_160.get("content"));
}else{
this.container.removeClassName("loading");
}
}}),onRefresh:function(_161,_162){
if(!LFM.Module.refreshers){
LFM.Module.refreshers={};
}
LFM.Module.refreshers[_161]=_162;
}});
LFM.set("Display",{MultiTuner:Class.create({initialize:function(form,_164){
this.uuid=Math.round(Math.random()*100000);
this.form=$(form);
this.restype=_164.restype;
this.sampleContent=$(_164.sampleContent);
this.slotID=_164.slotID||"slot"+this.uuid;
this.slotClass=_164.slotClass||"";
this.choices=$(_164.choices);
this.autocomplete=$(_164.autocomplete);
this.length=_164.length||3;
this.itemClass=_164.itemClass||"";
this.onSelect=_164.onSelect;
this.onDeselect=_164.onDeselect;
this.onResourceJSON=_164.onResourceJSON;
this.slots=this.setupSlots(this.length);
this.selections=$H();
this.matching_choices=$H();
this.filled=0;
this.setupListeners();
},setupListeners:function(){
if(!LFM.get("Session","prefersClient")&&!this.form.down("input[name=ajax]")){
this.form.insert(new Element("input",{"type":"hidden","name":"ajax","value":1}));
}
if(this.choices){
this.choices.observe("click",function(e){
e.stop();
var item=e.findElement("li");
this.select(item.down("a").innerHTML.unescapeHTML());
}.bind(this));
}
if(this.autocomplete){
this.autocomplete.observe("submit",function(e){
e.stop();
var _168=this.autocomplete.serialize(true);
if(!_168.placeholder&&_168.name){
this.select(_168.name.unescapeHTML());
this.autocomplete.down("input[name=name]").value="";
}
}.bind(this));
}
},setupSlots:function(_169){
var that=this;
var _16b=$A($R(1,_169));
_16b.reverse(false).each(function(i){
if(!$(that.slotID+i)){
var slot=new Element("div",{"id":that.slotID+i,"class":that.slotClass});
that.form.insert({top:slot});
}
});
return _16b.inject($H(),function(hash,i){
hash.set(i,false);
return hash;
});
},generate_item_id:function(_170){
return "item"+this.uuid+"_"+_170.toLowerCase().replace(/_/g,"__").replace(/ /g,"_");
},updateSampleContent:function(){
if(this.sampleContent&&this.restype){
var _171=this.sampleContent.up("p");
if(!this.filled){
_171.hide();
_171.next("p.noSampleContent").hide();
this.sampleContent.update();
}else{
var that=this;
new Ajax.Request("/listen/tune",{parameters:Object.extend({"ajax":1},this.form.serialize(true)),onComplete:function(_173){
var _174=new LFM.Ajax.Response(_173);
if(_174.isError()){
var _175=that.sampleContent.up("p");
that.sampleContent.update();
_175.hide();
_175.next("p.noSampleContent").hide();
_175.next("p.sampleContentError").show();
}else{
var _176=_174.get("sampleContent");
var _175=that.sampleContent.up("p");
if(_176&&_176.items&&_176.items.length){
var _177=_176.items.inGroupsOf(3)[0].collect(function(item){
if(!item){
throw $break;
}
return item.res.name;
}).join(", ");
that.sampleContent.update(_177);
_175.next("p.noSampleContent").hide();
_175.next("p.sampleContentError").hide();
_175.show();
}else{
that.sampleContent.update();
_175.hide();
_175.next("p.sampleContentError").hide();
_175.next("p.noSampleContent").show();
}
}
}});
}
}
},fetchResourceJSON:function(_179,_17a){
var that=this;
new Ajax.Request("/ajax/getResource",{method:"get",parameters:{"type":this.restype,"name":_179},onComplete:function(_17c){
var _17d=new LFM.Ajax.Response(_17c);
that.onResourceJSON(_17d,_17a);
}});
},deselect:function(_17e){
var slot=this.selections.unset(_17e);
this.slots.set(slot,false);
var _180=$(_17e);
_180.remove();
$(_17e+"_input").remove();
this.filled--;
var _181=this.matching_choices.get(_17e);
if(_181){
_181.removeClassName("disabled");
}
this.updateSampleContent();
if(this.onDeselect){
this.onDeselect(_180);
}
},select:function(_182){
var _183=this.generate_item_id(_182);
if(this.selections.get(_183)){
this.deselect(_183);
return false;
}
if(this.filled>=this.length){
return false;
}
if(this.choices){
var _184=this.choices.select("li").find(function(item){
return (item.down("a").innerHTML==_182);
});
this.matching_choices.set(_183,_184);
}
this.form.insert(new Element("input",{"type":"hidden","name":"names[]","value":_182,"id":_183+"_input"}));
var _186=new Element("a",{"href":"#","class":this.itemClass,"id":_183}).observe("click",function(e){
e.stop();
this.deselect(_183);
}.bind(this));
_186.insert(new Element("span").update(_182));
var _188=this.slots.find(function(item){
return (item.value===false);
}).key;
var _18a=$(this.slotID+_188);
_18a.insert(_186);
this.selections.set(_183,_188);
this.slots.set(_188,true);
this.filled++;
if(_184){
_184.addClassName("disabled");
}
this.updateSampleContent();
if(this.onResourceJSON){
this.fetchResourceJSON(_182,_186);
}
if(this.onSelect){
this.onSelect(_182,_186);
}
}})});
document.observe("dom:loaded",function(_18b){
if($("noobStrapSubmit")){
new LFM.Form.Placeholder("noobStrapTextarea");
$("noobStrapSubmit").observe("click",function(e){
if($F("noobStrapTextarea")&&$F("noobStrapTextarea")!=$F("noobStrapPlaceholder")){
LFM.Omniture.setLink(e.element(),"Textarea add to Library");
LFM.Omniture.prepareEvar("ClickSource",LFM.get("Page","manualAddLocation"));
LFM.Omniture.trackEvents("AddtoLibrary");
}else{
e.stop();
}
});
}
});
var s,s_gi;
if(LFM.get("config","DEVELOPMENT_SERVER")){
LFM.OmnitureAccount="cbslastfmtest";
}else{
LFM.OmnitureAccount="cbslastfm";
}
(function(){
var _18d=Class.create({blocked:false,initialize:function(){
this.resetTracker();
},resetTracker:function(){
if(s_gi){
this.tracker=s_gi(LFM.OmnitureAccount);
return this.tracker;
}
this.blocked=true;
return false;
},isBlocked:function(){
return this.blocked;
},event:function(name){
return _18f.events[name];
},prop:function(name){
return _18f.props[name];
},evar:function(name){
return _18f.evars[name];
},setProp:function(name,_193){
if(this.isBlocked()){
return false;
}
this.tracker[this.prop(name)]=_193;
},getProp:function(name){
if(this.isBlocked()){
return false;
}
return this.tracker[this.prop(name)];
},setEvar:function(name,_196){
if(this.isBlocked()){
return false;
}
this.tracker[this.evar(name)]=_196;
},getEvar:function(name){
if(this.isBlocked()){
return false;
}
return this.tracker[this.evar(name)];
},currentEvars:[],prepareEvar:function(name,_199){
if(this.isBlocked()){
return false;
}
this.setEvar(name,_199);
this.currentEvars.push(name);
},clearEvars:function(){
if(this.isBlocked()){
return false;
}
this.currentEvars.each(function(name){
this.setEvar(name,"");
}.bind(this));
this.currentEvars.clear();
},linkElement:null,linkTitle:null,setLink:function(_19b,_19c){
if(this.isBlocked()){
return false;
}
this.linkElement=_19b;
this.linkTitle=_19c;
},clearLink:function(){
if(this.isBlocked()){
return false;
}
this.linkElement=null;
this.linkTitle=null;
},setLinkTrackEvars:function(){
if(this.isBlocked()){
return false;
}
var _19d=["events"];
var _19e={};
this.currentEvars.each(function(name){
var _1a0=this.evar(name);
_19d.push(_1a0);
_19e[name+"/"+_1a0]=this.getEvar(name);
}.bind(this));
this.tracker.linkTrackVars=_19d.join(",");
return _19e;
},setLinkTrackEvents:function(){
if(this.isBlocked()){
return false;
}
var _1a1=[];
var _1a2=Array.prototype.join.call(arguments,",");
for(var i=0;i<arguments.length;i++){
_1a1.push(this.event(arguments[i]));
}
var _1a4=_1a1.join(",");
this.tracker.events=_1a4;
this.tracker.linkTrackEvents=_1a4;
return _1a2;
},track:function(_1a5){
if(this.isBlocked()){
return false;
}
this.tracker.tl(this.linkElement||true,"o",this.linkTitle||_1a5);
},trackEvents:function(){
if(this.isBlocked()){
return false;
}
this.resetTracker();
var _1a6=this.setLinkTrackEvents.apply(this,arguments);
var _1a7=this.setLinkTrackEvars();
var _1a8="TRACK: "+_1a6;
if(this.linkTitle){
_1a8+=" ("+this.linkTitle+") ";
}
LFM.log(_1a8);
LFM.info(this.linkElement);
LFM.dir(_1a7);
this.track(_1a6);
this.clearEvars();
this.clearLink();
}});
var _18f={events:{Registration:"event1",ClientDownload:"event2",EventAttendance:"event3",RadioPaneSwitch:"event4",ContentStart:"event5",StopPlayer:"event6",MusicPlay:"event7",Share:"event8",AddtoLibrary:"event9",BanTrack:"event10",LoveTrack:"event11",PageView:"event12",SkipTrack:"event13",ShoutPost:"event14",JoinGroup:"event15",CommentPost:"event16",AddFriend:"event17",SendMessage:"event18",Buy:"event19",AddTags:"event20",AddToPlaylist:"event21",DeleteFriend:"event22",LeaveGroup:"event23",DeletePlaylist:"event24",ArtistDisambiguation:"event25",RadioLaunch:"event26",Click:"event27",PageScroll:"event28",WindowFocus:"event29",RadioError:"event30",Dialog:"event31",DropDown:"event32",HeaderSearch:"event33",HeaderSearchFocus:"event34"},props:{SiteSectionLevel1:"prop1",SiteSectionLevel2:"prop2",SiteSectionLevel3:"prop3",ArtistNameAH:"prop4",ArtistNameIP:"prop5",ArtistNameQZ:"prop6",GroupNameAH:"prop7",GroupNameIP:"prop8",GroupNameQZ:"prop9",LoggedIn:"prop10",AlbumName:"prop11",URLExtension:"prop12",ChartSubtype:"prop17",Hour:"prop18",Day:"prop19",TagNameAM:"prop20",TagNameNZ:"prop21",ArtistID:"prop22",GroupID:"prop23",TagID:"prop24",DiscussionTitle:"prop25",DiscussionID:"prop26",ChartTypeYear:"prop27",ChartTypeMonth:"prop28",ChartTypeTimeFrame:"prop29",StationName:"prop30",StationID:"prop31",UserLanguage:"prop33",EventNameAM:"prop36",EventNameNZ:"prop37",EventID:"prop38",CorrectArtistName:"prop47",TestGroupID:"prop49"},evars:{Country:"eVar1",PageName:"eVar2",Channel:"eVar3",ArtistNameAH:"eVar4",ArtistNameIP:"eVar5",ArtistNameQZ:"eVar6",GroupNameAH:"eVar7",GroupNameIP:"eVar8",GroupNameQZ:"eVar9",LoggedIn:"eVar10",AlbumNameAH:"eVar11",AlbumNameIP:"eVar12",AlbumNameQZ:"eVar13",TitleAH:"eVar14",TitleIP:"eVar15",TitleQZ:"eVar16",StationNameAH:"eVar17",StationNameIP:"eVar18",StationNameQZ:"eVar19",ArtistID:"eVar20",GroupID:"eVar21",TagID:"eVar22",StationID:"eVar23",TagNameAM:"eVar24",TagNameNZ:"eVar25",ClickSource:"eVar26",DownloadPlatform:"eVar27",BuyDestination:"eVar28",FirstVisit:"eVar29",URLExtension:"eVar30",NewOrRepeatVisitors:"eVar31",DaysSinceLastVisit:"eVar32",AdSource:"eVar33",AdID:"eVar34",AdSize:"eVar35",MemberUserID:"eVar36",UserLanguage:"eVar37",UserScrobbles:"eVar38",LFMIABBrand:"eVar39",EventNameAM:"eVar40",EventNameNZ:"eVar41",EventID:"eVar42",ErrorCode:"eVar43",DialogType:"eVar44",HeaderSearchAction:"eVar45",SearchLength:"eVar46",SearchType:"eVar47",HeaderSearchRestype:"eVar48",TestGroupID:"eVar49"}};
document.observe("omniture:load",function(e){
LFM.set("Omniture",new _18d());
});
})();
LFM.set("PreviewButtonManager",Class.create({buttonSelector:"a.previewbutton",activeClass:"previewbutton-active",trackIdAttribute:"data-track-id",soundManager:null,playingSound:null,loadingAnimation:null,loadingAnimationParams:{startFrame:2,length:5,loop:true,fps:10,play:true},playbackAnimation:null,playbackAnimationParams:{startFrame:7,length:33},initialize:function(_1aa,_1ab,_1ac,_1ad,_1ae){
this.soundManager=_1aa;
this.webServiceHost=_1ac;
this.webServiceKey=_1ad;
this.soundManager.url=_1ab+"/flatness/soundmanager/";
this.soundManager.onload=this.apply.bind(this);
this.spriteClass=_1ae;
},apply:function(){
if(this.soundManager.supported()){
document.observe("click",this.onClick.bind(this));
}
},getAudioURL:function(_1af){
var _1b0=_1af.getAttribute("href");
if(!_1b0.endsWith(".mp3")){
var _1b1=this.getTrackId(_1af);
_1b0=_1b1?this.generatePreviewURL(_1b1):false;
}
return _1b0;
},getTrackId:function(_1b2){
var _1b3=_1b2.down().up("["+this.trackIdAttribute+"]");
if(_1b3){
return _1b3.readAttribute(this.trackIdAttribute);
}
return false;
},generatePreviewURL:function(_1b4){
var _1b5={method:"track.previewmp3",trackid:_1b4,api_key:this.webServiceKey};
return "http://"+this.webServiceHost+"/2.0/?"+Object.toQueryString(_1b5);
},play:function(_1b6,_1b7,_1b8){
this.loadingAnimation=new LFM.Util.SpriteAnimation(_1b7,this.loadingAnimationParams);
this.playbackAnimation=new LFM.Util.SpriteAnimation(_1b7,this.playbackAnimationParams);
_1b6.addClassName(this.activeClass);
this.playAudio(_1b8);
},playAudio:function(_1b9){
var id="sound_"+_1b9;
if(this.playingSound=this.soundManager.getSoundById(id)){
this.playingSound.play();
}else{
this.playingSound=this.soundManager.createSound({id:id,url:_1b9,onfinish:this.onStop.bind(this),ondataerror:this.onError.bind(this),whileplaying:this.onPlayback.bind(this),autoPlay:true});
}
},stop:function(){
this.soundManager.stopAll();
this.cleanupAnimation();
var _1bb=this.buttonSelector+"."+this.activeClass;
$$(_1bb).invoke("removeClassName",this.activeClass);
},cleanupAnimation:function(){
if(this.loadingAnimation){
this.loadingAnimation.stop();
this.loadingAnimation.cleanup();
delete this.loadingAnimation;
}
if(this.playbackAnimation){
this.playbackAnimation.cleanup();
delete this.playbackAnimation;
}
},onClick:function(_1bc){
var _1bd=_1bc.element();
var _1be=_1bd.match(this.buttonSelector)?_1bd:_1bd.up(this.buttonSelector);
var _1bf=_1be?_1be.down("img",0):null;
if(!_1bf||!_1be){
return;
}
var _1c0=_1be.hasClassName(this.activeClass);
var _1c1=this.getAudioURL(_1be);
this.stop();
if(_1c1){
_1bc.preventDefault();
_1be.blur();
if(!_1c0){
this.play(_1be,_1bf,_1c1);
}
}
},onPlayback:function(){
if(this.loadingAnimation.isPlaying()){
this.loadingAnimation.stop();
this.playbackAnimation.reset();
}
var _1c2=this.playingSound.duration;
if(_1c2<this.playingSound.durationEstimate){
_1c2=this.playingSound.durationEstimate;
}
var _1c3=this.playingSound.position/_1c2*100;
var _1c4=(this.playbackAnimation.getFramePosition()+1)/this.playbackAnimation.getLength()*100;
if(_1c3>_1c4){
this.playbackAnimation.next();
}
},onStop:function(){
this.stop();
},onError:function(){
this.stop();
}}));
(function(){
new LFM.PreviewButtonManager(soundManager,LFM.Session.staticHost,LFM.Session.wsHost,LFM.Session.wsKey);
})();
LFM.set("Page",{Extract:{trackIds:function(_1c5){
_1c5=$(_1c5)||document.body;
return _1c5.select("*[data-track-id]").collect(function(elem){
return elem.getAttribute("data-track-id");
});
}}});
LFM.set("Input",{RichText:Class.create({hasFocus:false,busy:false,wordSeparators:" \t\n,.()!?|=-\\",initialize:function(div,_1c8){
this.div=$(div);
this.options=_1c8?_1c8:{};
this.caret=this.div.down("span.caret");
this.caret.style.color="white";
this.caret.style.borderLeft="1px solid white";
this.textarea=this.div.next("textarea");
Event.observe(this.textarea,"keypress",this.keyPress.bindAsEventListener(this));
Event.observe(this.textarea,"keydown",this.keyDown.bindAsEventListener(this));
Event.observe(window,"keydown",this.keyDown.bindAsEventListener(this));
Event.observe(this.div,"click",this.focus.bindAsEventListener(this));
Event.observe(window,"blur",this.blur.bindAsEventListener(this));
new Ajax.Request("/ajax/getArtists",{onComplete:function(resp){
var out=resp.responseText.evalJSON();
this.artists=out.items;
}.bind(this)});
},keyDown:function(e){
e=window.event||e;
var _1cc=e.charCode||e.keyCode||e.which;
var s=String.fromCharCode(_1cc);
this.cancelOnDown=false;
if(this.specialKeyDown(_1cc,e)){
Event.stop(e);
this.cancelOnDown=true;
return false;
}
if(e.ctrlKey){
s=s.toLowerCase();
if(s=="a"||s=="m"){
Event.stop(e);
var sel=this.getSelection();
var name=this.getSelectedText(sel);
var _1d0;
if(s=="a"){
_1d0="<lfm:artist>"+name.strip().escapeHTML()+"</lfm:artist>";
}else{
if(s=="m"){
_1d0="<lfm:artist name=\""+name.strip().escapeHTML()+"\"><lfm:image size=\"small\" /></lfm:artist>";
}
}
this.replaceSelection(_1d0,sel);
}
}
},getSelection:function(){
var sel;
if(window.getSelection){
sel=window.getSelection();
}else{
if(document.selection){
sel=document.selection.createRange();
}
}
return sel;
},getSelectedText:function(sel){
var name="";
var next=sel.anchorNode;
while(next){
if(next.nodeValue){
name+=next.nodeValue;
}
if(next==sel.focusNode){
break;
}
next=next.nextSibling;
}
return name;
},replaceSelection:function(_1d5,sel){
new Ajax.Request("/ajax/richtextrenderer",{method:"post",parameters:{richtext:_1d5},onComplete:function(resp){
var out=resp.responseText.evalJSON();
var _1d9=sel.getRangeAt(0);
$(document.body).insert({bottom:out.rendered});
var node=$(document.body).lastChild;
node.remove();
_1d9.deleteContents();
_1d9.insertNode(node);
this.textarea.value+=out.richtext;
}});
},keyPress:function(e){
e=window.event||e;
var _1dc=e.charCode||e.keyCode||e.which;
var s=String.fromCharCode(_1dc);
if(this.specialKeyPress(_1dc,e)){
Event.stop(e);
return false;
}
if(e.altKey){
Event.stop(e);
return false;
}
if(!this.hasFocus||e.element()==window){
return;
}
var prev=this.caret.previousSibling;
if(prev&&prev.nodeType==3&&prev.nodeValue.strip().empty()&&prev.nodeValue!="\n"){
var _1df=prev.parentNode;
var _1e0=prev.ownerDocument.createRange();
_1e0.setStartBefore(prev);
var _1e1=_1e0.createContextualFragment(s);
var n=_1df.replaceChild(_1e1,prev);
var _1e0=this.caret.ownerDocument.createRange();
_1e0.setStartBefore(this.caret.previousSibling);
var _1e3=_1e0.createContextualFragment(" ");
_1df.insertBefore(_1e3,this.caret.previousSibling);
}else{
this.caret.insert({before:s});
}
},_delete:function(prev){
var _1e5=false;
var _1e6=prev.previousSibling;
if(prev.nodeType==1){
if(prev.nodeName=="A"){
var _1e7=prev.firstChild;
prev.parentNode.replaceChild(_1e7,prev);
_1e7.unlinked=true;
var _1e8=this.textarea.selectionStart;
var tag="";
var i=_1e8-2;
while(i>=0&&(this.textarea.value.charAt(i)!="/")){
tag=this.textarea.value.charAt(i)+tag;
i--;
}
var _1eb=i;
var _1ec="<"+tag+">";
var _1ed=_1ec.length;
while(i>=0&&(this.textarea.value.substr(i,_1ed)!=_1ec)){
i--;
}
var _1ee=this.textarea.value.substr(0,i);
var _1ef=i+_1ed;
_1ee+=this.textarea.value.substr(_1ef,_1eb-_1ef-1);
_1ee+=this.textarea.value.substr(_1e8);
this.textarea.value=_1ee;
return;
}
}
if(prev.nodeValue=="\n"){
_1e5=true;
}
var _1f0=prev.parentNode;
if(prev.nodeType==3){
var _1e8=this.textarea.selectionStart;
var _1ee=this.textarea.value.substr(0,_1e8-1);
if(_1e8<this.textarea.value.length){
_1ee+=""+this.textarea.value.substr(_1e8);
}
this.textarea.value=_1ee;
if(this.textarea.createTextRange){
var _1f1=this.textarea.createTextRange();
_1f1.moveStart("character",_1e8-1);
_1f1.moveEnd("character",_1e8-1);
_1f1.select();
}else{
if(this.textarea.setSelectionRange){
this.textarea.setSelectionRange(_1e8-1,_1e8-1);
}
}
if(prev.nodeValue.length>1){
prev.nodeValue=prev.nodeValue.substr(0,prev.nodeValue.length-1);
return;
}
}else{
if(prev.nodeName=="BR"){
this.textarea.value=this.textarea.value.substr(0,this.textarea.value.length-6);
}
}
_1f0.removeChild(prev);
if(_1e6&&_1e6.nodeType==3&&_1e6.nodeValue.strip().empty()&&_1e6.nodeValue!="\n"){
var _1f2=_1e6.ownerDocument.createRange();
_1f2.setStartAfter(_1e6);
var nbsp=_1f2.createContextualFragment("?");
_1f0.replaceChild(nbsp,_1e6);
_1e6=nbsp;
}
if(_1e5){
var _1e6=prev.previousSibling;
_1f0.removeChild(prev);
this.caret.previousSibling=_1e6;
this.caret.remove();
}
if(_1e6){
_1f0.insertBefore(this.caret,_1e6.nextSibling);
}
},specialKeyDown:function(_1f4,e){
if(_1f4>=37&&_1f4<=40&&!(e.ctrlKey||e.altKey||e.shiftKey||e.metaKey)){
var prev=this.caret.previousSibling;
var next=this.caret.nextSibling;
var _1f8=this.caret.parentNode;
if(_1f4==37&&prev){
this.caret.remove();
_1f8.insertBefore(this.caret,prev);
var _1f9=this.textarea.selectionStart;
if(this.textarea.createTextRange){
var _1fa=this.textarea.createTextRange();
_1fa.moveStart("character",_1f9-1);
_1fa.moveEnd("character",_1f9-1);
_1fa.select();
}else{
if(this.textarea.setSelectionRange){
this.textarea.setSelectionRange(_1f9-1,_1f9-1);
}
}
}else{
if(_1f4==39&&next){
this.caret.remove();
_1f8.insertBefore(this.caret,next.nextSibling);
var _1f9=this.textarea.selectionStart;
if(this.textarea.createTextRange){
var _1fa=this.textarea.createTextRange();
_1fa.moveStart("character",_1f9+1);
_1fa.moveEnd("character",_1f9+1);
_1fa.select();
}else{
if(this.textarea.setSelectionRange){
this.textarea.setSelectionRange(_1f9+1,_1f9+1);
}
}
}
}
this.textarea.focus();
return true;
}else{
if(_1f4==46){
if(this.caret.nextSibling){
this.moveTextAreaCursorBy(1);
var next=this.caret.nextSibling;
this.caret.remove();
next.parentNode.insertBefore(this.caret,next.nextSibling);
this._delete(next);
}
return true;
}else{
if(_1f4==8){
if(this.caret.previousSibling){
this._delete(this.caret.previousSibling);
}
return true;
}else{
if(_1f4==13){
this.caret.insert({before:"<br />"});
this.textarea.value+="<br />";
return true;
}
}
}
}
},specialKeyPress:function(_1fb,e){
var s=String.fromCharCode(_1fb);
if(this.cancelOnDown){
return true;
}
if(this.wordSeparators.indexOf(s)>=0){
var _1fe=this.caret;
if(_1fe.previousSibling&&_1fe.previousSibling.nodeType==3&&!_1fe.previousSibling.unlinked){
var back=0;
var name="";
var _201;
while((_1fe=_1fe.previousSibling)&&_1fe.nodeType==3&&_1fe.nodeValue.unescapeHTML().strip()!=""){
name=_1fe.nodeValue+name;
back++;
}
_201=_1fe;
var _202=false;
name=name.strip();
if(s!="."&&name.match(/^((ht|f)tp(s?)\:\/\/|~\/|\/)?([\w]+:\w+@)?([a-zA-Z]{1}([\w\-]+\.)+([\w]{2,5}))(:[\d]{1,5})?((\/?\w+\/)+|\/?)(\w+\.[\w]{3,4})?((\?\w+=\w+)?(&\w+=\w+)*)?/)){
_202="<a href=../ food-List/cdn.last.fm/javascript/release-i18n/154701/""+name.escapeHTML()+"/">"+name.escapeHTML()+"</a>";
}else{
var _203=name.toUpperCase();
var _204=this.artists.find(function(a){
return a.toUpperCase()==_203;
});
if(_204){
_202="<lfm:artist>"+name.escapeHTML()+"</lfm:artist>";
}
}
if(_202){
var _206=this.textarea.selectionStart;
new Ajax.Request("/ajax/richtextrenderer",{method:"post",parameters:{richtext:_202},onComplete:function(resp){
var out=resp.responseText.evalJSON();
var _209=_201.nextSibling;
for(;back>0;back--){
var tmp=_209.nextSibling;
_209.parentNode.removeChild(_209);
_209=tmp;
}
if(_201){
var _20b=_201.ownerDocument.createRange();
_20b.setStartAfter(_201);
var _20c=_20b.createContextualFragment(out.rendered);
_201.parentNode.insertBefore(_20c,_201.nextSibling);
}else{
this.div.insert({top:out.rendered});
}
var _20d=this.textarea.value.substr(0,_206-name.length);
_20d+=out.richtext;
_20d+=""+this.textarea.value.substr(_206);
this.textarea.value=_20d;
}.bind(this)});
}
}
}else{
if(s=="/"){
var _1fe=this.caret.previousSibling;
if(!_1fe||_1fe.nodeValue!="["){
return false;
}
var _20e=_1fe;
var _20f="";
var tag="";
var back=2;
while((_1fe=_1fe.previousSibling)&&_1fe.nodeType==3&&_1fe.nodeValue!="]"){
_20f=_1fe.nodeValue+_20f;
back++;
}
while((_1fe=_1fe.previousSibling)&&_1fe.nodeType==3&&_1fe.nodeValue!="["){
tag=_1fe.nodeValue+tag;
back++;
}
if(tag=="artist"){
_20f=_20f.strip();
var _206=this.textarea.selectionStart;
var _202="<lfm:artist>"+_20f.escapeHTML()+"</lfm:artist>";
new Ajax.Request("/ajax/richtextrenderer",{method:"post",parameters:{richtext:_202},onComplete:function(resp){
var out=resp.responseText.evalJSON();
_1fe=_20e;
for(var i=back;i>0;i--){
var tmp=_1fe.previousSibling;
_1fe.parentNode.removeChild(_1fe);
_1fe=tmp;
}
if(this.caret.previousSibling){
var rm=this.caret.previousSibling;
rm.parentNode.removeChild(rm);
}
this.caret.insert({before:out.rendered});
var _216=this.textarea.value.substr(0,_206-back-1);
_216+=""+out.richtext;
_216+=""+this.textarea.value.substr(_206);
this.textarea.value=_216;
}.bind(this)});
return true;
}
}
}
if(s==" "){
this.caret.insert({before:"?"});
this.textarea.value+=" ";
return true;
}
},moveTextAreaCursorBy:function(n){
var _218=this.textarea.selectionStart;
if(this.textarea.createTextRange){
var _219=this.textarea.createTextRange();
_219.moveStart("character",_218+n);
_219.moveEnd("character",_218+n);
_219.select();
}else{
if(this.textarea.setSelectionRange){
this.textarea.setSelectionRange(_218+n,_218+n);
}
}
},focus:function(e){
Event.stop(e);
var _21b=e.rangeParent;
if(this.caret.parentNode){
this.caret.remove();
}
if(_21b!=this.caret&&_21b!=this.div){
_21b.parentNode.insertBefore(this.caret,_21b.nextSibling);
}else{
this.div.appendChild(this.caret);
}
this.hasFocus=true;
this.textarea.focus();
this.startBlinkingCaret();
},blur:function(){
this.hasFocus=false;
this.stopBlinkingCaret();
},startBlinkingCaret:function(){
this.caret.style.borderLeft="1px solid black";
},stopBlinkingCaret:function(){
this.blinkCaret();
},blinkCaret:function(){
this.caret.style.borderLeft=this.caret.style.borderLeft=="1px solid black"?"1px solid white":"1px solid black";
}})});
var Scroller=Class.create({initialize:function(_21c){
this.scroller=$(_21c);
this.imageTrackContainer=$(document).getElementsByClassName("imageTrackContainer",this.scroller)[0];
this.imageTrack=this.imageTrackContainer.getElementsByTagName("UL")[0];
this.isScrolling=false;
this.makeScrollingWork();
this.centerSelectedImage();
},makeScrollingWork:function(){
Element.addClassName(this.scroller,"scrollerJS");
if(this.getWidth()<=this.getVisibleWidth()){
if(window.attachEvent&&!window.opera){
Element.setStyle(this.scroller,{width:this.getWidth()+"px"});
}
}else{
Element.setStyle(this.scroller,{padding:"0 10px",marginLeft:0,marginRight:0,overflow:"hidden"});
this.leftScrollButton=document.createElement("a");
this.leftScrollButton.innerHTML="scroll left";
this.leftScrollButton.href="#";
Element.addClassName(this.leftScrollButton,"scrollLeft");
this.scroller.insertBefore(this.leftScrollButton,this.imageTrackContainer);
Event.observe(this.leftScrollButton,"click",this.scrollLeft.bindAsEventListener(this));
this.rightScrollButton=document.createElement("a");
this.rightScrollButton.innerHTML="scroll right";
this.rightScrollButton.href="#";
Element.addClassName(this.rightScrollButton,"scrollRight");
this.scroller.insertBefore(this.rightScrollButton,this.imageTrackContainer);
Event.observe(this.rightScrollButton,"click",this.scrollRight.bindAsEventListener(this));
Event.observe(window,"resize",this.onResize.bindAsEventListener(this));
this.setWidth();
}
},setWidth:function(){
if(!this.imageWidth){
this.imageWidth=this.getImageWidth();
}
Element.setStyle(this.scroller,{maxWidth:this.getWidth()+"px"});
var _21d=this.getVisibleWidth();
modulo=_21d%this.imageWidth;
_21d=_21d-modulo;
if(_21d>this.getWidth()){
_21d=this.getWidth();
}
Element.setStyle(this.scroller,{maxWidth:_21d+"px"});
var _21e=this.getWidth()*-1+Math.abs(this.getOffset())+this.getVisibleWidth();
var _21f=(this.getWidth()-this.getVisibleWidth())*-1;
this.setOffset(_21f);
this.refreshButtonStates();
},onResize:function(_220){
this.setWidth();
},getImageWidth:function(){
if(this.imageWidth){
return this.imageWidth;
}else{
sampleImage=this.imageTrack.getElementsByTagName("LI")[0];
if(sampleImage){
this.imageWidth=sampleImage.offsetWidth;
this.imageWidth=this.imageWidth+Element.getStyle(sampleImage,"padding-left").replace("px","")*1;
this.imageWidth=this.imageWidth+Element.getStyle(sampleImage,"padding-right").replace("px","")*1;
this.imageWidth=this.imageWidth+Element.getStyle(sampleImage,"margin-left").replace("px","")*1;
this.imageWidth=this.imageWidth+Element.getStyle(sampleImage,"margin-right").replace("px","")*1;
var _221=Element.getStyle(sampleImage,"border-left-width").replace("px","")*1;
if(!isNaN(_221)){
this.imageWidth=this.imageWidth+_221;
}
var _222=Element.getStyle(sampleImage,"border-right-width").replace("px","")*1;
if(!isNaN(_222)){
this.imageWidth=this.imageWidth+_222;
}
return this.imageWidth;
}else{
return false;
}
}
},getMiddle:function(){
return Math.ceil(this.imageTrackContainer.offsetWidth/2);
},getWidth:function(){
return this.imageTrack.offsetWidth;
},getVisibleWidth:function(){
return this.imageTrackContainer.offsetWidth;
},getNumberOfVisibleImages:function(){
return Math.floor(this.getVisibleWidth()/this.getImageWidth());
},getNumberOfImages:function(){
return Math.floor(this.imageTrack.getElementsByTagName("LI").length);
},getOffset:function(){
offset=Element.getStyle(this.imageTrack,"left");
if(offset){
offset=offset.replace("px","")*1;
if(!isNaN(offset)){
return offset;
}else{
return 0;
}
}else{
return 0;
}
},setOffset:function(_223){
var blah=this.getWidth()-this.getVisibleWidth();
this.imageTrack.setStyle({left:_223+"px"});
},scrollLeft:function(_225){
if(!this.isScrolling&&this.getOffset()<0){
var _226=Math.abs(this.getOffset());
var _227=this.getVisibleWidth();
if(_227>_226){
_227=_226;
}
this.scroll(_227);
}
this.refreshButtonStates();
this.leftScrollButton.blur();
Event.stop(_225);
},scrollRight:function(_228){
if(!this.isScrolling&&(Math.abs(this.getOffset())+this.getVisibleWidth())<this.getWidth()){
var _229=this.getWidth()-(Math.abs(this.getOffset())+this.getVisibleWidth());
var _22a=this.getVisibleWidth();
if(_22a>_229){
_22a=_229;
}
_22a=_22a*-1;
this.scroll(_22a);
}
this.refreshButtonStates();
this.rightScrollButton.blur();
Event.stop(_228);
},scroll:function(_22b,_22c){
if(!this.isScrolling||_22c){
new Effect.Move(this.imageTrack,{x:_22b,y:0,mode:"relative",duration:0.5,afterFinish:this.afterScrolling.bind(this),beforeStart:this.beforeScrolling.bind(this),queue:{position:"end",scope:"scroller"}});
}
},beforeScrolling:function(_22d){
this.isScrolling=true;
this.totalDelta=this.totalDelta+_22d.options.x;
},afterScrolling:function(_22e){
this.isScrolling=false;
this.totalDelta=this.totalDelta-_22e.options.x;
this.refreshButtonStates();
},refreshButtonStates:function(){
if(this.rightScrollButton&&this.leftScrollButton){
if((Math.abs(this.getOffset())+this.getVisibleWidth())<this.getWidth()){
this.rightScrollButton.className="scrollRight";
}else{
this.rightScrollButton.className="scrollRight disabled";
}
if(this.getOffset()<0){
this.leftScrollButton.className="scrollLeft";
}else{
this.leftScrollButton.className="scrollLeft disabled";
}
}
},getSelectedImage:function(){
selectedImage=$(document).getElementsByClassName("selected",this.imageTrack)[0];
if(selectedImage){
return $(selectedImage);
}else{
return false;
}
},centerSelectedImage:function(){
if(this.getVisibleWidth()!=this.getWidth()){
var _22f=this.getSelectedImage().id;
if(_22f&&this.getImageWidth()){
_22f=(_22f.substring(5)*1)-1;
var _230=_22f*this.getImageWidth();
_230=_230-this.getMiddle()+this.getImageWidth()/2;
if(_230>(this.getWidth()-this.getVisibleWidth())){
_230=this.getWidth()-this.getVisibleWidth();
}
_230=_230*-1;
if(_230>0){
_230=0;
}
Element.setStyle(this.imageTrack,{left:_230+"px"});
this.refreshButtonStates();
}
}
}});
LFM.set("Resource",{Shoutbox:Class.create({initialize:function(_231){
this.shoutbox=_231;
this.shoutbox.container=$(this.shoutbox.container);
this.textarea=$("shoutmsg");
this.overCharLimit=false;
if($("shoutPost")){
$("shoutPost").observe("submit",this.submit.bindAsEventListener(this));
this.textarea.observe("keyup",this.calculateCharCount.bindAsEventListener(this));
}
this.deleteButtons=this.shoutbox.container.select(".delete");
this.deleteButtons.each(function(_232){
_232.observe("click",this.bin.bindAsEventListener(this));
}.bind(this));
if($("shoutboxPopup")){
$("shoutboxPopup").observe("click",this.popup.bindAsEventListener(this));
}
if($("shoutPostToggler")&&$("shoutPostToggler").down("a")){
$("shoutPostToggler").down("a").observe("click",this.toggleInput.bindAsEventListener(this));
}
if($("shoutPostAgain")){
$("shoutPostAgain").observe("click",this.toggleInput.bindAsEventListener(this));
}
},submit:function(e){
e.stop();
if($F(this.textarea)==""){
return;
}
this.toggleInput(e);
$("shoutPostWait").show();
var url=this.shoutbox.destination;
if(url.substr(-1)!="/"){
url+="/";
}
url+="add";
var pars=$("shoutPost").serialize()+"&restype="+this.shoutbox.restype+"&resid="+this.shoutbox.resid+"&lang="+this.shoutbox.lang+"&ajax=1";
var _236=new Ajax.Request(url,{method:"post",parameters:pars,onSuccess:this.addShout.bind(this)});
},addShout:function(_237){
if(this.shoutbox.restype==20){
LFM.Omniture.trackEvents("CommentPost");
}else{
LFM.Omniture.trackEvents("ShoutPost");
}
var _238=$("shoutList");
$("shoutList").insert({before:_237.responseText});
if(this.shoutbox.order=="asc"){
_238.innerHTML=_238.innerHTML+$("newShoutList").innerHTML;
}else{
_238.innerHTML=$("newShoutList").innerHTML+_238.innerHTML;
}
$("newShoutList").remove();
$("shoutList").select("li").each(function(li){
var _23a=li.down(".delete");
if(_23a){
_23a.observe("click",this.bin.bindAsEventListener(this));
}
}.bind(this));
this.textarea.value="";
$("shoutPostWait").hide();
if($("noShouts")){
$("noShouts").remove();
}
if($("shoutPostToggler")){
$("shoutPostToggler").hide();
}
$("shoutPostAgain").show();
this.updateCharCountDisplay(0);
},bin:function(_23b){
_23b.stop();
var _23c=_23b.findElement("li");
var form=_23c.down("form");
var _23e=this.shoutbox.destination;
if(_23e.substr(-1)!="/"){
_23e+="/";
}
_23e+="delete";
form.action=_23e;
var _23f=this.shoutbox.restype;
var _240=this.shoutbox.resid;
var _241=new LFM.Dialog({content:LFM.String.deleteMessagePrompt,confirmText:LFM.String.deleteButtonText,action:_23e,onConfirm:function(e){
e.stop();
this.hide();
form.request({parameters:{restype:_23f,resid:_240,ajax:1},onSuccess:function(req){
if(req.responseText=="OK"){
new Effect.Fade(_23c,{duration:0.2});
}
}});
}});
_241.show();
},toggleInput:function(e){
if($("shoutPost").visible()){
$("shoutPost").hide();
}else{
$("shoutPostAgain").hide();
$("shoutPost").show();
this.textarea.focus();
}
e.stop();
},calculateCharCount:function(){
var _245=this.textarea.value.length;
this.updateCharLimit(_245);
this.updateCharCountDisplay(_245);
},updateCharCountDisplay:function(_246){
charCounter=$("sbCharCount");
var _247=this.shoutbox.charlimitMessage;
if(charCounter){
_247=_247.replace(/CURRENTCHARS/,_246);
_247=_247.replace(/MAXCHARS/,this.shoutbox.charlimit);
charCounter.innerHTML=_247;
}
},updateCharLimit:function(_248){
var _249=(_248>this.shoutbox.charlimit);
if(!this.overCharLimit&&_249){
$("sbCharCount").up().addClassName("overCharLimit");
$("sbPost").disable();
this.textarea.focus();
}
if(this.overCharLimit&&!_249){
$("sbCharCount").up().removeClassName("overCharLimit");
$("sbPost").enable();
}
this.overCharLimit=_249;
}})});
LFM.set("Util",{SpriteAnimation:Class.create({initialize:function(_24a,_24b){
this.element=_24a;
this.frameSize=_24b.frameSize||this.element.getHeight();
this.startFrame=_24b.startFrame||0;
this.endFrame=this.startFrame+_24b.length-1;
this.loop=_24b.loop||false;
this.positionX=_24b.positionX||0;
this.positionY=_24b.positionY||0;
this.axis=(_24b.axis||"y").toUpperCase();
this.fps=_24b.fps||1;
this.currentFrame=this.startFrame;
this.timer=null;
if(_24b.play){
this.play();
}
},reset:function(){
this.setFrame(this.startFrame);
},getLength:function(){
return this.endFrame-this.startFrame+1;
},next:function(){
if(this.currentFrame!=this.endFrame){
this.setFrame(1+this.currentFrame);
}else{
if(this.loop){
this.reset();
}else{
this.stop();
}
}
},setFrame:function(_24c){
this.currentFrame=_24c;
this["position"+this.axis]=this.currentFrame*(this.frameSize*-1);
var pos=this.positionX+"px "+this.positionY+"px";
this.element.setStyle({backgroundPosition:pos});
},play:function(_24e,end,loop){
this.stop();
this.reset();
this.timer=setInterval(this.next.bind(this),1000/this.fps);
},getFramePosition:function(){
return this.currentFrame-this.startFrame;
},stop:function(){
clearTimeout(this.timer);
this.timer=null;
},isPlaying:function(){
return !!this.timer;
},cleanup:function(){
this.element.setStyle({"backgroundPosition":""});
}})});
LFM.set("Display",{TableDragDrop:Class.create({initialize:function(_251,_252){
this.draggedRow=null;
this.rowWithBorderAndShit=null;
this.mouseOffset=null;
this.oldY=0;
this.dragged=false;
if(_252&&_252.dragHandle){
this.dragHandle=_252.dragHandle;
}else{
this.dragHandle=false;
}
this.table=$(_251);
this.table.addClassName("draggable");
this.table.observe("mousedown",this.onMouseDown.bindAsEventListener(this));
if(this.dragHandle){
this.table.addClassName("withDragHandles");
}else{
this.table.addClassName("allDraggable");
}
this.table.down("tbody").observe("click",this.onClick.bindAsEventListener(this));
},onClick:function(_253){
if(this.dragged){
_253.stop();
this.dragged=false;
}
},getMouseOffset:function(_254,_255){
var _256=_254.cumulativeOffset();
return {x:_255.pointerX()-_256.left,y:_255.pointerY()-_256.top};
},onMouseDown:function(_257){
if(!_257.isLeftClick()){
return;
}
if(this.dragHandle&&!_257.element().hasClassName(this.dragHandle)){
return;
}
if((tag_name=_257.element().tagName.toUpperCase())&&(tag_name=="INPUT"||tag_name=="SELECT"||tag_name=="OPTION"||tag_name=="BUTTON"||tag_name=="TEXTAREA")){
return;
}
this.draggedRow=_257.findElement("tr");
if(this.draggedRow.previous("tr")){
this.rowWithBorderAndShit=this.draggedRow.previous("tr");
this.rowWithBorderAndShit.addClassName("beforeDraggedRow");
}else{
if(this.draggedRow.next("tr")){
this.rowWithBorderAndShit=this.draggedRow.next("tr");
this.rowWithBorderAndShit.addClassName("afterDraggedRow");
}
}
this.mouseOffset=this.getMouseOffset(this.draggedRow,_257);
_257.stop();
this.draggedRow.addClassName("dragging");
this.documentOnMouseMove=this.onMouseMove.bindAsEventListener(this);
this.documentOnMouseUp=this.onMouseUp.bindAsEventListener(this);
document.observe("mousemove",this.documentOnMouseMove);
document.observe("mouseup",this.documentOnMouseUp);
this.rows=this.table.down("tbody").select("tr");
},onMouseMove:function(_258){
var y=_258.pointerY()-this.mouseOffset.y;
_258.stop();
if(y!=this.oldY){
var _25a=y>this.oldY;
this.oldY=y;
var _25b=this.findDropTargetRow(y);
if(_25b){
this.dragged=true;
if(_25a&&this.draggedRow!=_25b){
this.draggedRow.parentNode.insertBefore(this.draggedRow,_25b.nextSibling);
}else{
if(!_25a&&this.draggedRow!=_25b){
this.draggedRow.parentNode.insertBefore(this.draggedRow,_25b);
}
}
}
}
},onMouseUp:function(_25c){
_25c.stop();
this.draggedRow.removeClassName("dragging");
this.rowWithBorderAndShit.removeClassName("beforeDraggedRow");
this.rowWithBorderAndShit.removeClassName("afterDraggedRow");
if(this.onDrop){
this.onDrop(this.table,this.draggedRow);
}
this.draggedRow=null;
document.stopObserving("mousemove",this.documentOnMouseMove);
document.stopObserving("mouseup",this.documentOnMouseUp);
},findDropTargetRow:function(y){
return this.rows.find(function(row){
var rowY=row.cumulativeOffset().top;
var _260=row.getHeight()/2;
if((y>rowY-_260)&&(y<(rowY+_260))){
return true;
}else{
return false;
}
});
return null;
}})});
LFM.set("Resource",{Users:Class.create({initialize:function(_261){
this.container=$("users");
this.container.observe("click",function(_262){
log("clicked container");
var _263=_262.element();
if(_263.match("a.delete img")){
_262.stop();
var _264=_263.up("li");
if(_264){
this.bin(_264);
}
}
}.bind(this));
},bin:function(_265){
var _266=new LFM.Dialog({resource:_265.getResource(),content:LFM.String.deleteFriendPrompt,confirmText:LFM.String.deleteButtonText,action:"friends/delete",onDone:function(_267){
var _268=_267.getResourceElement();
new Effect.Fade(_268,{duration:0.5});
},showDone:false});
_266.show();
}})});
LFM.set("Video",{FullWidth:Class.create({initialize:function(id){
this.container=$(id);
this.wrapper=this.container.down("div.wrapper");
this.originalDimensions=this.wrapper.getDimensions();
this.aspectRatio=this.originalDimensions.height/this.originalDimensions.width;
this.resize();
Event.observe(document.onresize?document:window,"resize",function(_26a){
this.resize();
}.bind(this));
},resize:function(){
this.wrapper.setStyle({width:this.container.getWidth()+"px",height:Math.round(this.container.getWidth()*this.aspectRatio)+"px"});
}})});
LFM.set("Ajax",{Autocompleter:Class.create(Ajax.Autocompleter,{setOptions:function(_26b){
this.options=Object.extend({method:"get"},_26b||{});
},buildItem:function(name){
return new Element("a",{href:"#"}).update(name).wrap(new Element("li"));
},onComplete:function(_26d){
try{
var _26e=_26d.responseText.evalJSON();
}
catch(err){
return false;
}
if(_26e&&_26e.response.docs){
var list=new Element("ul");
var _270=this.getToken();
list.insert(this.buildItem(_270));
_26e.response.docs.each(function(_271){
if(_271.name.toLowerCase()!=_270.toLowerCase()){
list.insert(this.buildItem(_271.name));
}
}.bind(this));
this.updateChoices(new Element("div").update(list).innerHTML);
}
}})});
LFM.set("Ajax",{Multicompleter:Class.create(LFM.Ajax.Autocompleter,{initialize:function(_272,_273,url,_275){
this.baseInitialize(_272,_273,_275);
this.url=url;
this.options.asynchronous=true;
this.options.onComplete=this.onComplete.bind(this);
this.options.onHide=function(_276,_277){
window.status="";
new Effect.Fade(_277,{duration:0.15});
};
this.form=this.element.up("form");
this.submit=this.form.down("input[type=submit]");
var _278={};
if(this.options.enabled){
_278["force"]=1;
}else{
this.show=function(){
return false;
};
this.startIndicator=function(){
return false;
};
}
if(LFM.Session.userName){
_278["username"]=LFM.Session.userName;
}
if(this.options.parameters){
_278=Object.extend(_278,this.options.parameters);
}
this.options.defaultParams=_278;
this.element.observe("keyup",this.onKeyUp.bindAsEventListener(this));
this.form.observe("submit",this.onSubmit.bindAsEventListener(this));
this.update.observe("mouseup",this.onClick.bindAsEventListener(this));
this.update.observe("mouseover",this.onHover.bindAsEventListener(this));
this.element.observe("focus",this.onFocus.bindAsEventListener(this));
this.init();
},init:function(){
},getUpdatedChoices:function(){
this.startIndicator();
var _279=encodeURIComponent(this.options.paramName)+"="+encodeURIComponent(this.getToken());
this.options.parameters={};
this.options.parameters[this.options.paramName]=this.getToken();
if(this.options.defaultParams){
Object.extend(this.options.parameters,this.options.defaultParams);
}
this.search();
},search:function(){
new Ajax.Request(this.url,this.options);
this.personalMatches=this.matchPersonalData(this.getToken());
},matchPersonalData:function(_27a){
if(!_27a.length||!this.personalData){
return false;
}
var _27b=new RegExp(_27a.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\$1"),"i");
var _27c=[];
var _27d=this.personalData.get("friends");
if(_27d){
_27d.each(function(_27e,i){
var _280=_27e.name.match(_27b)||(_27e.realname&&_27e.realname.match(_27b));
if(_280){
_27c.push(_27e);
}
});
}
var _281=this.personalData.get("groups");
if(_281){
_281.each(function(_282,i){
var _284=_282.name.match(_27b);
if(_284){
_27c.push(_282);
}
});
}
var _285=this.personalData.get("labels");
if(_285){
_285.each(function(_286,i){
var _288=_286.name.match(_27b)&&_286.single_artist!="t";
if(_288){
_27c.push(_286);
}
});
}
return _27c;
},buildEvent:function(_289){
var _28a=_289.date.split("T");
var _28b=_28a[0].split("-");
var _28c=_289.event||_289.artist;
var _28d="<span class=\"calSheet calSheetSmall\">"+"<span title=\""+_289.date+"\">"+"<span class=\"month\">"+LFM.String.shortMonths[_28b[1]-0]+"</span>"+"<span class=\"day\">"+(_28b[2]-0)+"</span>"+"</span>"+"</span>";
var _28e=_289["country_"+LFM.Session.language]||_289["country_en"];
return _28d+"<strong>"+_28c.truncate(25)+"</strong><br>"+_289.city.truncate(25)+", "+_28e.truncate(25);
},buildEventTitle:function(_28f){
var _290=_28f.event||_28f.artist;
var _291=_28f["country_"+LFM.Session.language]||_28f["country_en"];
return _290+", "+_28f.venue+", "+_28f.city+", "+_291;
},buildEventURL:function(_292){
return "/event/"+encodeURIComponent(encodeURIComponent(_292.resid));
},buildArtist:function(_293){
var _294=this.buildArtistImageURL(_293);
var _295="<img src=../ food-List/cdn.last.fm/javascript/release-i18n/154701/""+_294+"/" width=\"34\" height=\"34\">";
return _295+this.buildName(_293.artist);
},buildArtistTitle:function(_296){
return _296.artist;
},buildArtistURL:function(_297){
return "/music/"+encodeURIComponent(encodeURIComponent(_297.artist));
},buildArtistImageURL:function(_298){
if(_298.image){
return LFM.Session.userserveHost+"/serve/34s/"+_298.image;
}else{
var _299={api_key:LFM.Session.wsKey,artist:_298.artist,method:"artist.getImageRedirect",size:"smallsquare"};
return "http://"+LFM.Session.wsHost+"/2.0/?"+Object.toQueryString(_299);
}
},buildAlbum:function(_29a){
var _29b=this.buildAlbumImageURL(_29a);
var _29c="<span class=\"albumCover coverSmall\" />"+"<span class=\"art\"><img src=../ food-List/cdn.last.fm/javascript/release-i18n/154701/""+_29b+"/" width=\"34\" height=\"34\"></span>"+"<span class=\"jewelcase\"></span>"+"</span>";
return _29c+this.buildName(_29a.album)+"<br>"+_29a.artist.truncate(25);
},buildAlbumTitle:function(_29d){
return _29d.album+" - "+_29d.artist;
},buildAlbumURL:function(_29e){
return "/music/"+encodeURIComponent(encodeURIComponent(_29e.artist))+"/"+encodeURIComponent(encodeURIComponent(_29e.album));
},buildAlbumImageURL:function(_29f){
if(_29f.image){
return LFM.Session.userserveHost+"/serve/34s/"+_29f.image;
}else{
var _2a0={api_key:LFM.Session.wsKey,artist:_29f.artist,album:_29f.album,method:"album.getImageRedirect",size:"smallsquare"};
return "http://"+LFM.Session.wsHost+"/2.0/?"+Object.toQueryString(_2a0);
}
},buildTrack:function(_2a1){
var _2a2=this.buildArtistImageURL(_2a1);
var _2a3="<img src=../ food-List/cdn.last.fm/javascript/release-i18n/154701/""+_2a2+"/" width=\"34\" height=\"34\">";
var _2a4=_2a1.duration?" <small> ("+LFM.timeFormat(_2a1.duration)+")</small>":"";
return _2a3+this.buildName(_2a1.track)+_2a4+"<br>"+_2a1.artist.truncate(25);
},buildTrackTitle:function(_2a5){
return _2a5.track+" - "+_2a5.artist;
},buildTrackURL:function(_2a6){
return "/music/"+encodeURIComponent(encodeURIComponent(_2a6.artist))+"/_/"+encodeURIComponent(encodeURIComponent(_2a6.track));
},buildTag:function(_2a7){
var icon="<img width=\"30\" height=\"30\" src=../ food-List/cdn.last.fm/javascript/release-i18n/154701/""+LFM.Session.staticHost+"/flatness/icons/tag/1/tag_30.png/">";
return icon+this.buildName(_2a7.tag);
},buildTagTitle:function(_2a9){
return _2a9.tag;
},buildTagURL:function(_2aa){
return "/tag/"+encodeURIComponent(encodeURIComponent(_2aa.tag));
},buildUser:function(_2ab){
var _2ac=this.buildResImage(_2ab,"/flatness/catalogue/noimage/2/default_user_small.png");
var user=_2ac+this.buildName(_2ab.name);
if(_2ab.realname){
user+="<br>"+_2ab.realname.truncate(25);
}
return user;
},buildUserTitle:function(_2ae){
var _2af=_2ae.name;
if(_2ae.realname){
_2af+=" - "+_2ae.realname;
}
return _2af;
},buildUserURL:function(_2b0){
return "/user/"+encodeURIComponent(encodeURIComponent(_2b0.name));
},buildGroup:function(_2b1){
var _2b2=this.buildResImage(_2b1,"/flatness/catalogue/noimage/2/default_group_small.png");
var name;
if(_2b1.group){
name=this.buildName(_2b1.group);
}else{
name=this.buildName(_2b1.name);
}
return _2b2+name;
},buildGroupTitle:function(_2b4){
return _2b4.name||_2b4.group;
},buildGroupURL:function(_2b5){
var name=_2b5.name||_2b5.group;
return "/group/"+encodeURIComponent(encodeURIComponent(name));
},buildLabel:function(_2b7){
var _2b8=this.buildResImage(_2b7,"/flatness/catalogue/noimage/2/default_label_small.png");
var name;
if(_2b7.label){
name=this.buildName(_2b7.label);
}else{
name=this.buildName(_2b7.name);
}
return _2b8+name;
},buildLabelTitle:function(_2ba){
return _2ba.name||_2ba.label;
},buildLabelURL:function(_2bb){
var root;
var name=_2bb.name||_2bb.label;
if(_2bb.single_artist=="t"){
root="/artist/";
}else{
root="/label/";
}
return root+encodeURIComponent(encodeURIComponent(name));
},buildName:function(name){
return "<strong>"+name.truncate(25)+"</strong>";
},buildResTitle:function(_2bf){
return _2bf.name;
},buildResImage:function(_2c0,_2c1){
var _2c2=LFM.Session.staticHost+_2c1;
if(_2c0.image_id){
_2c2=LFM.Session.userserveHost+"/serve/34s/"+_2c0.image_id+".jpg";
}else{
if(_2c0.image){
_2c2=LFM.Session.userserveHost+"/serve/34s/"+_2c0.image;
}
}
var _2c3="<img src=../ food-List/cdn.last.fm/javascript/release-i18n/154701/""+_2c2+"/" width=\"34\" height=\"34\">";
return _2c3;
},buildItemLink:function(_2c4){
var _2c5=_2c4.res?_2c4.res.type:_2c4.restype;
var _2c6=LFM.resTypeLookup[_2c5];
if(!_2c6){
LFM.warn("no restype found: "+_2c5);
}else{
try{
var url=this["build"+_2c6+"URL"](_2c4);
if(!this.urls[url]){
this.urls[url]=_2c6;
var item=this["build"+_2c6](_2c4);
var _2c9=this["build"+_2c6+"Title"](_2c4);
var link=new Element("a",{href:url+"?ac="+encodeURIComponent(this.getToken()),title:_2c9}).addClassName(_2c6.toLowerCase()+"Item").update(item);
return link;
}
}
catch(e){
LFM.warn(_2c6,e);
}
}
},buildSearchLink:function(_2cb){
var _2cc=this.form.action+"?"+this.form.serialize();
var link=new Element("a",{href:_2cc}).addClassName("viewAll");
return new Element("span").addClassName("moduleOptions").update(_2cb).wrap(link);
},setOptions:function(_2ce){
_2ce=_2ce||{};
this.options=Object.extend({method:"get",onShow:function(_2cf,_2d0){
if(!_2d0.style.position||_2d0.style.position=="absolute"){
_2d0.style.position="absolute";
Position.clone(_2cf,_2d0,{setHeight:false,setWidth:false,offsetTop:_2cf.offsetHeight});
}
Effect.Appear(_2d0,{duration:0.15});
}},_2ce);
},markNext:function(){
if(this.index===null){
this.index=0;
}else{
if(this.index<this.entryCount-1){
this.index++;
}
}
var _2d1=this.getCurrentEntry();
if(_2d1){
window.status=_2d1.down("a").href;
}else{
window.status="";
}
},markPrevious:function(){
if(this.index>0){
this.index--;
}else{
this.index=null;
}
var _2d2=this.getCurrentEntry();
if(_2d2){
window.status=_2d2.down("a").href;
}else{
window.status="";
}
},getEntry:function(_2d3){
if(_2d3!==null){
return this.update.down("li.item",_2d3);
}
},updateElement:function(item){
if(item){
var link=item.down("a");
if(link){
if(link.hasClassName("viewAll")){
LFM.Omniture.prepareEvar("HeaderSearchAction","ViewAllReturn");
}else{
LFM.Omniture.prepareEvar("HeaderSearchAction","Return");
if(this.urls[link.pathname]){
LFM.Omniture.prepareEvar("HeaderSearchRestype",this.urls[link.pathname]);
}
}
LFM.Omniture.setLink(link);
LFM.Omniture.trackEvents("HeaderSearch");
LFM.redirect(link.href);
return true;
}
}
},addLinkedItem:function(_2d6,list){
var link;
var _2d9=_2d6.res?_2d6.res.type:_2d6.restype;
if(_2d9){
link=this.buildItemLink(_2d6);
}else{
link=this.buildSearchLink(_2d6);
}
if(link){
var item=link.wrap(new Element("li").addClassName("item"));
list.insert(item);
return item;
}
return false;
},onBlur:function(e){
this.blurTimeout=setTimeout(function(){
this.hide();
this.hasFocus=false;
this.active=false;
}.bind(this),250);
},onFocus:function(e){
LFM.Omniture.trackEvents("HeaderSearchFocus");
if(this.options.enabled){
this.loadPersonalData();
}
},loadPersonalData:function(){
if(this.personalData||!LFM.Session.loggedIn||!LFM.Session.userURL||this.unauthorised){
return false;
}
LFM.info("AC: Load personal data");
new Ajax.Request(LFM.Session.userURL+"/acdata",{method:"get",parameters:{ajax:1},onSuccess:function(_2dd){
response=new LFM.Ajax.Response(_2dd);
if(response.isSuccess()){
LFM.info("AC: Personal data loaded");
this.personalData=response;
}else{
if(response.isUnauthorised()){
this.unauthorised=true;
}
}
}.bind(this)});
},onHover:function(e){
var link=e.findElement("a");
if(link){
if(this.index!=link.autocompleteIndex){
this.index=link.autocompleteIndex;
this.render();
}
}
},onClick:function(e){
this.element.focus();
clearTimeout(this.blurTimeout);
var link=e.findElement("a");
if(link){
if(link.hasClassName("viewAll")){
LFM.Omniture.prepareEvar("HeaderSearchAction","ViewAllClick");
}else{
LFM.Omniture.prepareEvar("HeaderSearchAction","Click");
if(this.urls[link.pathname]){
LFM.Omniture.prepareEvar("HeaderSearchRestype",this.urls[link.pathname]);
}
}
LFM.Omniture.setLink(link);
LFM.Omniture.trackEvents("HeaderSearch");
}
},onKeyPress:function(e){
if(this.active){
switch(e.keyCode){
case Event.KEY_TAB:
case Event.KEY_RETURN:
if(this.options.enabled&&this.getCurrentEntry()){
this.selectEntry();
e.stop();
}
break;
case Event.KEY_ESC:
if(this.options.enabled){
this.hide();
this.active=false;
e.stop();
}
return;
case Event.KEY_LEFT:
case Event.KEY_RIGHT:
return;
case Event.KEY_UP:
if(this.options.enabled){
this.markPrevious();
this.render();
e.stop();
}
return;
case Event.KEY_DOWN:
if(this.options.enabled){
this.markNext();
this.render();
e.stop();
}
return;
}
}else{
if(e.keyCode==Event.KEY_TAB||e.keyCode==Event.KEY_RETURN||(Prototype.Browser.WebKit>0&&e.keyCode==0)){
return;
}
}
this.changed=true;
this.hasFocus=true;
if(this.observer){
clearTimeout(this.observer);
}
this.observer=setTimeout(this.onObserverEvent.bind(this),this.options.frequency*1000);
},onKeyUp:function(e){
this.changed=false;
var _2e4=this.getToken();
if(_2e4.length>=this.options.minChars&&_2e4!=this.lastToken){
this.startIndicator();
}
},onSubmit:function(e){
var _2e6=this.form.serialize().toQueryParams();
var _2e7=this.getToken();
LFM.Omniture.prepareEvar("SearchLength",_2e7.length);
if(this.options.enabled){
LFM.Omniture.prepareEvar("SearchType","multicomplete");
}else{
if(_2e6.m){
LFM.Omniture.prepareEvar("SearchType",_2e6.m);
}
}
LFM.Omniture.prepareEvar("HeaderSearchAction","Search");
LFM.Omniture.trackEvents("HeaderSearch");
},onObserverEvent:function(){
this.changed=false;
var _2e8=this.getToken();
if(_2e8.length>=this.options.minChars){
if(_2e8!=this.lastToken&&_2e8!=this.element.getAttribute("placeholder")){
this.getUpdatedChoices();
}else{
this.render();
}
}else{
this.active=false;
this.hide();
}
this.lastToken=_2e8;
this.oldElementValue=this.element.value;
},getToken:function(){
return $F(this.element);
},processResults:function(_2e9){
var list=new Element("ul");
if(_2e9){
this.urls={};
_2e9.each(function(_2eb,_2ec){
this.addLinkedItem(_2eb,list);
},this);
}
this.addViewAll(list,_2e9.length);
return list;
},addViewAll:function(list,_2ee){
this.addLinkedItem(LFM.String.siteSearchViewAll.replace("QUERY",this.getToken().escapeHTML()),list);
this.entryCount=_2ee+1;
},onComplete:function(_2ef){
if(this.changed||!this.hasFocus){
return false;
}
var _2f0=new Array,_2f1=0;
try{
var _2f2=_2ef.responseText.evalJSON();
_2f0=_2f2.response.docs;
}
catch(err){
LFM.warn("JSON error: "+_2ef.responseText);
}
if(this.personalMatches&&this.personalMatches.length){
var _2f3=Math.min(this.personalMatches.length,3);
_2f0=this.personalMatches.slice(0,_2f3).concat(_2f0.slice(0,10-_2f3));
}
_2f1=_2f0.length;
var list=this.processResults(_2f0);
this.updateChoices(list,_2f1);
},updateChoices:function(list,_2f6){
this.update.update(list);
var _2f7=new Element("p",{"class":"header"});
if(_2f6){
_2f7.update(LFM.String.siteSearchSuggestions);
}else{
_2f7.update(LFM.String.siteSearchNoSuggestions).addClassName("empty");
}
this.update.insert({"top":_2f7});
if(LFM.Session.loggedIn&&!this.personalData){
var _2f8=new Element("div").addClassName("message messageWarn").update(LFM.String.autocompletePersonalDataDown);
this.update.insert({"bottom":_2f8});
}
this.update.select("li.item a").each(function(link,_2fa){
link.autocompleteIndex=_2fa;
},this);
this.stopIndicator();
this.index=null;
this.render();
}})});
LFM.set("Ajax",{GroupedMulticompleter:Class.create(LFM.Ajax.Multicompleter,{resTypeGroups:[LFM.resTypes.ARTIST,LFM.resTypes.ALBUM,LFM.resTypes.TRACK,LFM.resTypes.EVENT,LFM.resTypes.TAG,LFM.resTypes.USER,LFM.resTypes.GROUP,LFM.resTypes.LABEL],init:function(){
this.update.addClassName("grouped");
},buildArtist:function(_2fb){
var _2fc=this.buildArtistImageURL(_2fb);
var _2fd="<span class=\"img\"><span><img src=../ food-List/cdn.last.fm/javascript/release-i18n/154701/""+_2fc+"/" width=\"34\" height=\"34\" /></span></span>";
return _2fd+"<strong class=\"artist\">"+_2fb.artist.truncate(25)+"</strong>";
},buildTrack:function(_2fe){
var _2ff=this.buildArtistImageURL(_2fe);
var _300="<span class=\"img\"><span><img src=../ food-List/cdn.last.fm/javascript/release-i18n/154701/""+_2ff+"/" width=\"34\" height=\"34\" /></span></span>";
var _301=_2fe.duration?" <small class=\"time\"> ("+LFM.timeFormat(_2fe.duration)+")</small>":"";
return _300+"<strong class=\"track\">"+_2fe.track.truncate(20)+"</strong>"+_301+"<br>"+_2fe.artist.truncate(25);
},buildTag:function(_302){
var icon="<img width=\"20\" height=\"20\" src=../ food-List/cdn.last.fm/javascript/release-i18n/154701/""+LFM.Session.staticHost+"/flatness/icons/activity/tagged.png/">";
return icon+"<strong class=\"tag\">"+_302.tag.truncate(25)+"</strong>";
},processResults:function(_304,list){
var list=new Element("ul");
if(_304){
this.urls={};
var _306=this.groupResults(_304);
var _307,_308,_309,_30a;
this.resTypeGroups.each(function(_30b,_30c){
if(_306[_30b]){
_307=new Element("li");
_30a=(_30b==LFM.resTypes.USER)?LFM.String.resTypePlural["friends"]:LFM.String.resTypePlural[_30b];
_308=new Element("h3").update(_30a).addClassName(LFM.resTypeLookup[_30b].toLowerCase());
_309=new Element("ul");
_306[_30b].each(function(_30d,_30e){
this.addLinkedItem(_30d,_309);
},this);
_307.insert(_308);
_307.insert(_309);
list.insert(_307);
}
},this);
}
this.addViewAll(list,_304.length);
return list;
},groupResults:function(_30f){
var _310={},_311;
_30f.each(function(_312,_313){
_311=_312.res?_312.res.type:_312.restype;
if(!_310[_311]){
_310[_311]=[];
}
_310[_311].push(_312);
},this);
return _310;
}})});
LFM.set("Ajax",{SideGroupedMulticompleter:Class.create(LFM.Ajax.GroupedMulticompleter,{init:function(){
this.update.addClassName("grouped sidegrouped");
},processResults:function(_314,list){
var _316=new Element("table",{cellspacing:0,cellpadding:0,border:0});
var _317=new Element("tbody");
var _318=0;
if(_314){
this.urls={};
var _319=this.groupResults(_314);
var _31a,_31b,_31c,_31d;
this.resTypeGroups.each(function(_31e,_31f){
if(_319[_31e]){
_318++;
_31a=new Element("tr");
if(_318%2==0){
_31a.addClassName("alt");
}
_31d=(_31e==LFM.resTypes.USER)?LFM.String.resTypePlural["friends"]:LFM.String.resTypePlural[_31e];
_31b=new Element("h3").update(_31d).addClassName(LFM.resTypeLookup[_31e].toLowerCase());
_31c=new Element("ul");
_319[_31e].each(function(_320,_321){
this.addLinkedItem(_320,_31c);
},this);
_31a.insert(new Element("th").update(_31b));
var _322=new Element("td").update(_31c);
if(_318==1){
_322.addClassName("first");
}
_31a.insert(_322);
_317.insert(_31a);
}
},this);
}
var _323=new Element("tr");
if(_318%2==0){
_323.addClassName("alt");
}
var _324=new Element("ul");
this.addViewAll(_324,_314.length);
_323.insert(new Element("th"));
_323.insert(new Element("td",{"class":"viewAll"}).update(_324));
_317.insert(_323);
_316.update(_317);
return _316;
}})});
LFM.Ajax.LazyRequest=Class.create({options:{laziness:2,beforeSend:false},_defaultAjaxOptions:{method:"post",parameters:{ajax:true,formtoken:LFM.get("Session","formtoken")}},_timeoutId:false,_ajaxUrl:false,_ajaxOptions:{},_lastTime:0,initialize:function(url,_326){
Object.extend(this.options,_326);
this._ajaxUrl=url;
if(this.options.lazyness){
this.options.laziness=this.options.lazyness;
}
},send:function(_327){
if(this._intervalId){
clearTimeout(this._intervalId);
}
var now=new Date();
this._lastTime=now.getTime()/1000;
this._ajaxOptions=this._defaultAjaxOptions;
if(_327){
if(_327.parameters){
Object.extend(this._ajaxOptions.parameters,_327.parameters);
_327.paramaters=this._ajaxOptions.parameters;
}
Object.extend(this._ajaxOptions,_327);
}
this._ajaxOptions.parameters.time=this._lastTime;
this._intervalId=setTimeout(this._performSend.bind(this),this.options.laziness*1000);
},_beforeSend:function(){
if(!this.options.beforeSend){
return;
}
Object.extend(this._ajaxOptions.parameters,this.options.beforeSend());
},_performSend:function(){
this._beforeSend();
new Ajax.Request(this._ajaxUrl,this._ajaxOptions);
}});
LFM.Ajax.Response=Class.create({initialize:function(_329){
try{
if(typeof _329=="string"){
this.ajaxResponse=_329.evalJSON();
}else{
if(_329.responseText){
this.ajaxResponse=_329.responseText.evalJSON();
}else{
this.ajaxResponse=_329;
}
}
}
catch(err){
this.ajaxResponse={errormessage:"Invalid JSON response"};
}
this.data=$H(this.ajaxResponse.data);
if(this.isError()){
this.printError();
}
},get:function(key){
return this.data.get(key);
},set:function(key,_32c){
return this.data.set(key,_32c);
},toObject:function(){
return this.data.toObject();
},isError:function(){
return !this.ajaxResponse.success;
},isSuccess:function(){
return !this.isError();
},getErrorCode:function(){
return this.ajaxResponse.errorcode?this.ajaxResponse.errorcode:null;
},getErrorMessage:function(){
return this.ajaxResponse.errormessage?this.ajaxResponse.errormessage:null;
},errorIs:function(code){
return this.getErrorCode()===code;
},isUnauthorised:function(){
return this.errorIs(LFM.Ajax.Response.Errors.UNAUTHORISED);
},printError:function(){
if(LFM.get("config","DEVELOPMENT_SERVER")){
if(!this.ajaxResponse){
LFM.warn("Error [No response]");
}else{
LFM.warn("Error ["+this.getErrorCode()+"]: "+this.getErrorMessage());
}
}
},getResource:function(){
return this.ajaxResponse.resource?this.ajaxResponse.resource:null;
},getResourceElement:function(){
return LFM.getResourceElement(this.getResource());
},buildResourceLink:function(){
var _32e=this.getResource();
if(_32e){
var link=new Element("a",{"href":_32e.url});
if(_32e.name){
link.update(_32e.name);
}
return link;
}
return false;
},followRedirect:function(){
if(this.ajaxResponse.redirect){
window.location.href=this.ajaxResponse.redirect;
return true;
}else{
return false;
}
}});
LFM.Ajax.Response.Errors={UNAUTHORISED:401};
LFM.Ajax.setUserPref=function(pref,_331,_332){
new Ajax.Request("/ajax/setUserPref",{parameters:{formtoken:LFM.Session.formtoken,pref:pref,value:_331},onComplete:function(_333){
var _334=new LFM.Ajax.Response(_333);
if(_332){
_332(_334);
}
}});
};
LFM.Ajax.StatusHolder=Class.create({initialize:function(_335,_336){
this.status="idle";
this.element=$(_335);
this.options={position:"after"};
Object.extend(this.options,_336);
this.indicator=$(this.element.identify()+"_statusHolder");
if(this.indicator){
if(this.indicator.hasClassName("success")){
this.status="success";
}else{
if(this.indicator.hasClassName("failure")){
this.status="failure";
}else{
if(this.indicator.hasClassName("progress")){
this.status="busy";
}
}
}
}else{
this.indicator=document.createElement("img");
this.indicator=Element.extend(this.indicator);
this.indicator.src=LFM.Session.staticHost+"/tablestyles/pixel.gif";
this.indicator.height=16;
this.indicator.width=16;
if(this.options.position=="after"){
this.element.parentNode.insertBefore(this.indicator,this.element.nextSibling);
}else{
if(this.options.position=="before"){
this.element.parentNode.insertBefore(this.indicator,this.element);
}else{
if(this.options.position=="top"){
this.element.insertBefore(this.indicator,this.element.firstChild);
}else{
if(this.options.position=="bottom"){
this.element.appendChild(this.indicator);
}
}
}
}
this.indicator=this.indicator.wrap("SPAN");
this.indicator.addClassName("statusHolder");
this.indicator.id=this.element.identify()+"_statusHolder";
}
},remove:function(){
this.indicator.remove();
},busy:function(){
this.idle();
this.status="busy";
this.indicator.addClassName("progress");
this.indicator.down("img").src=LFM.Session.staticHost+"/depth/global/progress_new.gif";
},isBusy:function(){
return this.status=="busy";
},success:function(){
this.idle();
this.status="success";
this.indicator.addClassName("success");
this.indicator.down("img").src=LFM.Session.staticHost+"/depth/forms/correct_new.gif";
},isSuccess:function(){
return this.status=="success";
},failure:function(){
this.idle();
this.status="failure";
this.indicator.addClassName("failure");
this.indicator.down("img").src=LFM.Session.staticHost+"/depth/forms/incorrect_new.gif";
},isFailure:function(){
return this.status=="failure";
},idle:function(){
this.status="idle";
this.indicator.removeClassName("progress");
this.indicator.removeClassName("success");
this.indicator.removeClassName("failure");
this.indicator.down("img").src=LFM.Session.staticHost+"/tablestyles/pixel.gif";
},isIdle:function(){
return this.status=="idle";
}});

