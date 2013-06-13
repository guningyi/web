LFM.Dialog=Class.create({});
LFM.Dialog.FORM="DIALOG_FORM";
LFM.Dialog.STUB="DIALOG_STUB";
LFM.Dialog.CUSTOM="DIALOG_CUSTOM";
LFM.Dialog._stack=[];
LFM.Dialog.hideStack=function(){
LFM.Dialog._stack.invoke("hide",true);
};
LFM.Dialog.getFromStack=function(_1){
return LFM.Dialog._stack[_1];
};
LFM.Dialog._onDrag=[];
LFM.Dialog.registerDragCallback=function(_2){
LFM.Dialog._onDrag.push(_2);
};
LFM.Dialog.DefaultOptions={resource:{type:"",id:"",url:""},type:LFM.Dialog.FORM,classname:"",title:"",content:LFM.String.loadingText,footerContent:"",action:"",confirmText:LFM.String.okText,cancelText:LFM.String.cancelText,showStatus:true,beforeConfirm:null,onConfirm:null,onCancel:null,confirmButton:null,cancelButton:null,overlayForm:null,showDone:true,fadeDone:false,onDone:null,onError:this.failure,width:"400px",maxHeight:"",zIndex:999999,position:"fixed",offset_top:100,modal:false,dismissable:true,showEffect:"Appear",onUpdate:null,contentMethod:"get",formMethod:"post",linkButtonForm:false};
LFM.Dialog.prototype={initialize:function(_3){
Object.extend(this,LFM.Dialog.DefaultOptions);
if(_3){
Object.extend(this,_3);
}
for(k in this.resource){
if(!this.resource[k]){
delete this.resource[k];
}
}
if(this.content==LFM.String.loadingText){
this.type=LFM.Dialog.CUSTOM;
}
var _4=navigator.platform.toLowerCase();
var _5=navigator.userAgent.toLowerCase();
this._use_iframe=_4.indexOf("linux")>-1&&_5.indexOf("firefox/2")<0;
if(_5.indexOf("msie 6")>-1){
if(this.position=="fixed"){
this.ie6_fixed_hack=true;
}
this.position="absolute";
}
},hover:false,_watchHoverState:function(){
this.overlay.observe("mouseover",function(e){
this.hover=true;
}.bindAsEventListener(this));
this.overlay.observe("mouseout",function(e){
this.hover=false;
}.bindAsEventListener(this));
},_watch_esc:function(e){
if(this.dismissable&&e.keyCode==Event.KEY_ESC){
if(this.cancelButton){
this.cancelButton.addClassName("activeButton");
}
this.hide();
}
},_invoke_drag_callbacks:function(_9){
LFM.Dialog._onDrag.each(function(_a){
if(Object.isFunction(_a)){
_a();
}
});
this.overlay.setStyle({"zIndex":this.zIndex});
if(this._use_iframe){
this.iframe.setStyle({"zIndex":this.zIndex});
}
},_reposition_iframe:function(){
if(!this._use_iframe){
return false;
}
var _b=document.viewport.getScrollOffsets();
this.iframe.setStyle({"top":_b.top+"px"});
},_bindConfirm:function(){
this.confirmButton=$(this.confirmButton);
if(this.confirmButton){
this.confirmButton.addClassName("dialogButton");
this.confirmButton.addClassName("dialogConfirm");
if(this.beforeConfirm){
this.confirmButton.observe("click",this.beforeConfirm.bindAsEventListener(this));
}else{
this.confirmButton.observe("click",this.busy.bind(this));
}
if(this.onConfirm){
this.confirmButton.observe("click",this.onConfirm.bindAsEventListener(this,this.resource));
}else{
if(this.overlayForm&&!this.linkButtonForm){
this.confirmButton.observe("click",function(e){
e.stop();
if(this.overlayForm.action){
this.overlayForm.request({onComplete:this.finalHandler.bind(this)});
}else{
this.hide();
}
}.bindAsEventListener(this));
}
}
}
},_bindCancel:function(){
this.cancelButton=$(this.cancelButton);
if(this.cancelButton){
this.cancelButton.addClassName("dialogButton").addClassName("dialogCancel");
this.cancelButton.observe("click",function(e){
e.stop();
if(this.onCancel){
this.onCancel.bind(this)();
}else{
if(this.parent){
this.showParent();
}else{
this.hide();
}
}
}.bindAsEventListener(this));
}
},_restack:function(){
LFM.Dialog._stack.push(this);
},_addClickSource:function(){
var _e=LFM.Omniture.getEvar("ClickSource");
if(this.overlayForm&&_e){
this.overlayForm.insert(new Element("input",{"type":"hidden","name":"clickSource","value":_e}));
}
},busy:function(){
if(this.status){
this.status.className="dialogStatus dialogBusy";
}
},idle:function(){
if(this.status){
this.status.className="dialogStatus dialogClose";
}
},failure:function(){
if(this.status){
this.status.className="dialogStatus dialogFailure";
}
},_showOverlay:function(_f){
var _10=false;
if(!this.overlay){
LFM.Dialog.hideStack();
this.overlay=new Element("div",{"class":"dialogBox"});
this._watchHoverState();
this._restack();
this.overlay.hide();
_10=true;
}
if(_f||_10){
this.overlay.update();
this._setupStatus();
if(this.title){
this.overlayTitle=new Element("h3");
this.overlay.insert(this.overlayTitle);
this.overlayTitle.update(this.title);
}else{
this.overlayTitle=null;
}
this.overlayError=new Element("div");
this.overlayError.hide();
this.overlay.insert(this.overlayError);
this.updateContent(this.content);
if(this.type===LFM.Dialog.FORM||this.type===LFM.Dialog.STUB){
this.overlayForm=$(this.overlayForm);
if(!this.overlayForm){
this.overlayForm=new Element("form",{"class":"dialogForm",action:this.action,method:this.formMethod||"post"});
}
this.overlayForm.update();
if(this.resource&&this.resource.type&&this.resource.id){
if(!this.res_type_input){
this.res_type_input=new Element("input",{"type":"hidden","name":"type"});
this.overlayForm.insert(this.res_type_input);
}
if(!this.res_id_input){
this.res_id_input=new Element("input",{"type":"hidden","name":"id"});
this.overlayForm.insert(this.res_id_input);
}
this.res_type_input.writeAttribute("value",this.resource.type);
this.res_id_input.writeAttribute("value",this.resource.id);
}
this.overlayButtons=new Element("div",{"class":"dialogButtons"});
if(this.footerContent){
this.overlayButtons.insert(this.footerContent);
}
if(this.action&&this.dismissable){
this.formToken=new Element("input",{type:"hidden",name:"formtoken",value:LFM.Session.formtoken});
this.overlayForm.insert(this.formToken);
if(!this.cancelButton){
this.cancelButton=new Element("input",{type:"button","class":"button",value:this.cancelText});
this.overlayButtons.insert(this.cancelButton);
}
}
if(!this.confirmButton&&this.dismissable){
this.confirmButton=new Element("input",{type:"submit","class":"confirmButton",value:this.confirmText});
this.overlayButtons.insert(this.confirmButton);
}
if(this.type===LFM.Dialog.STUB){
if(this.confirmButton){
this.overlayForm.insert(this.overlayButtons);
}
this.overlay.insert(this.overlayContent).insert(this.overlayForm);
}else{
if(this.type===LFM.Dialog.FORM){
this.overlayForm.insert(this.overlayContent);
if(this.confirmButton){
this.overlayForm.insert(this.overlayButtons);
}
this.overlay.insert(this.overlayForm);
}
}
}else{
if(this.type===LFM.Dialog.CUSTOM){
this.overlay.insert(this.overlayContent);
this.overlayForm=$(this.overlayForm);
}
}
this._bindConfirm();
this._bindCancel();
this._bound_watch_esc=this._watch_esc.bindAsEventListener(this);
document.observe("keypress",this._bound_watch_esc);
if(this.classname){
this.overlay.addClassName(this.classname);
}
this._setupModalBlock();
this._setupIframe();
$("page").insert(this.overlay);
this.overlay.setStyle({"zIndex":this.zIndex,"width":this.width,"position":this.position});
this._setupPositioning();
this._setupDragging();
}
if(!_f){
LFM.Dialog.hideStack();
}
if(this._use_iframe){
this.iframe.show();
this._iframe_repositioning=setInterval(this._reposition_iframe.bind(this),200);
}
var _11=function(){
if(this.confirmButton&&this.confirmButton.visible()){
this.confirmButton.focus();
}
};
var _12={duration:0.3,afterFinish:function(){
setTimeout(_11.bind(this),20);
}.bind(this)};
if(Object.isFunction(this.showEffect)){
new Effect.Parallel(this.showEffect.bind(this)(),_12);
}else{
if(this.showEffect){
new Effect[this.showEffect](this.overlay,_12);
}else{
this.overlay.show();
_11(this.overlay);
}
}
},_setupPositioning:function(){
var _13=document.viewport.getScrollOffsets();
var _14=(this.position=="absolute"?_13.top:0)+this.offset_top+"px";
this.overlay.setStyle({"top":_14});
var _15=(this.position=="absolute")?$("page"):document.viewport;
var _16=(_15.getWidth()-this.overlay.getWidth())/2+"px";
LFM.info("Dialog positioning ["+this.position+"]: Viewport: "+_15.getWidth()+" Overlay width: "+this.overlay.getWidth()+" offset_left: "+_16);
this.overlay.setStyle({"left":_16});
if(this.ie6_fixed_hack){
var _17=this.offset_top+" + document.viewport.getScrollOffsets()['top'] + 'px'";
this.overlay.style.setExpression("top",_17);
}
},_setupStatus:function(){
if(this.showStatus&&this.dismissable){
this.status=new Element("a",{"href":"#"}).observe("click",function(e){
e.stop();
this.hide();
}.bindAsEventListener(this));
this.idle();
this.overlay.insert(this.status);
}
},_setupDragging:function(){
if(this.draggable){
this.draggable.destroy();
}
if(this.overlayTitle){
this.draggable=new Draggable(this.overlay,{handle:this.overlayTitle,starteffect:null,endeffect:null,change:this._invoke_drag_callbacks.bind(this),onEnd:this._invoke_drag_callbacks.bind(this)});
}
},_setupIframe:function(){
if(this._use_iframe&&!this.iframe){
this.iframe=new Element("iframe",{frameBorder:"0"}).setStyle({"zIndex":this.zIndex,"position":"absolute","top":0,"left":0,"width":"100%","height":"100%"}).hide();
$("page").insert(this.iframe);
}
},_setupModalBlock:function(){
if(this.modal&&!this.modal_block){
this.modal_block=new Element("div").setStyle({"position":this.position,"top":0,"left":0,"width":"100%","height":"100%","background":"#333","opacity":"0.5"});
$("page").insert(this.modal_block);
}
},updateContent:function(_19){
this.content=_19;
if(this.overlay){
if(!this.overlayContent){
this.overlayContent=new Element("div",{"class":"dialogContent"});
}
var _1a={"maxHeight":this.maxHeight};
if(this.ie6_fixed_hack){
_1a["height"]=this.maxHeight;
}
this.overlayContent.setStyle(_1a);
this.overlayContent.update(_19);
}
if(this.overlay&&this.overlay.visible()&&this.onUpdate){
this.onUpdate.bind(this)();
}
},show:function(){
var _1b;
var url;
$A(arguments).each(function(arg){
if(typeof arg=="function"){
_1b=arg;
}else{
if(typeof arg=="string"){
url=arg;
}
}
});
this._showOverlay();
var _1e=Object.extend({_dialog:LFM.Dialog._stack.indexOf(this)},this.resource);
if(this.parameters){
Object.extend(_1e,this.parameters);
}
if(url){
new Ajax.Request(url,{method:this.contentMethod,parameters:_1e,onSuccess:function(_1f){
var _20=new LFM.Ajax.Response(_1f);
if(_20.isError()){
this.failure();
this.content.update(LFM.String.dialogLoadError);
}else{
this.type=LFM.Dialog.FORM;
Object.extend(this,_20.toObject());
this.resource=_20.getResource();
this.showEffect=null;
this._showOverlay(true);
this._addClickSource.bind(this).defer();
if(_1b){
_1b.defer(this,_20);
}
}
}.bind(this)});
}else{
if(_1b){
_1b.defer(this);
}
}
},hide:function(_21){
this.idle();
if(this._use_iframe){
clearInterval(this._iframe_repositioning);
this.iframe.hide();
}
$(document).stopObserving("keypress",this._bound_watch_esc);
if(this.overlay){
if(_21){
if(this.modal){
this.modal_block.hide();
}
this.overlay.hide();
}else{
if(this.modal){
new Effect.Fade(this.modal_block,{duration:0.1});
}
new Effect.Fade(this.overlay,{duration:0.3,afterFinish:function(_22){
if(this.cancelButton){
this.cancelButton.removeClassName("activeButton");
}
}.bind(this)});
}
}
},spawnChild:function(_23){
var _24=new LFM.Dialog(_23);
_24.parent=this;
return _24;
},showParent:function(){
this.hide();
if(this.parent){
this.parent.show();
}
},finalHandler:function(_25){
doneResponse=new LFM.Ajax.Response(_25);
if(doneResponse.isError()){
if(this.onError){
this.onError(doneResponse);
this.idle();
}else{
this.failure();
}
}else{
if(this.showDone){
var _26=new LFM.Dialog({resource:doneResponse.getResource(),title:LFM.String.done,content:doneResponse.get("content"),footerContent:doneResponse.get("footerContent"),onConfirm:function(e,_28){
e.stop();
this.hide();
}});
_26.show(function(_29){
if(this.onDone){
this.onDone(doneResponse);
}
if(this.fadeDone){
_26.hide.bind(_26).delay(2);
}
}.bind(this));
}else{
this.hide();
if(this.onDone){
this.onDone(doneResponse);
}
}
}
}};
LFM.Dialog.runtests=function(){
LFM.Dialog.tests.simple();
};
LFM.Dialog.tests={simple:function(){
var _2a=new LFM.Dialog({resource:{id:2128518,type:4},type:LFM.Dialog.STUB,classname:"fiddlr",title:"Fiddle",content:"Are you sure you'd like to fiddle with this resource?",footerContent:"Extra content",action:"/users/fiddle",confirmText:"Fiddle",onConfirm:function(e,_2c){
log(e);
log(_2c);
e.stop();
alert("Confirmed dialog of class: "+this.classname);
alert("You fiddled with a resource of id: "+_2c.id+" and type: "+_2c.type);
this.hide();
},cancelText:"Do NOT fiddle",onCancel:function(){
alert("Dismissed dialog of class: "+this.classname);
this.hide();
}});
_2a.show();
}};
LFM.set("AJAXDialog",Class.create({initialize:function(_2d,url,_2f){
this.resource=_2d;
this.url=url;
this.options={title:"",classname:"",parameters:null,beforeConfirm:null,showDone:true,onDone:null,onError:null,action:url,fadeDone:false,callback:null};
this.position="absolute";
if(_2f){
Object.extend(this.options,_2f);
}
this.options.resource=this.resource;
this.callback=this.options.callback;
delete this.options.callback;
this.show();
},show:function(){
this.dialog=new LFM.Dialog(this.options);
this.dialog.show(this.url,this.callback);
}}));
LFM.set("AJAXDialogWrapper",function(url,_31){
return function(_32,_33){
if(!_33){
_33=_31;
}else{
_33=Object.extend(_33,_31);
}
return new LFM.AJAXDialog(_32,url,_33);
};
});
LFM.set("Add",LFM.AJAXDialogWrapper("/ajax/dialog/add",{title:LFM.String.addTitle,classname:"add",fadeDone:true,callback:function(_34,_35){
if($("tagDialog"+_34.random)){
_34.addDialogShowTags=$("tagDialog"+_34.random).visible()?1:0;
}
},beforeConfirm:function(e){
if($("tagDialog"+this.random)){
var _37=$("tagDialog"+this.random).visible()?1:0;
if(_37!=this.addDialogShowTags){
LFM.Ajax.setUserPref("addDialogShowTags",_37);
}
}
}}));
LFM.set("RemoveFromLibrary",LFM.AJAXDialogWrapper("/ajax/dialog/removefromlibrary",{title:LFM.String.RemoveFromLibraryTitle,classname:"remove"}));
LFM.set("Send",LFM.AJAXDialogWrapper("/ajax/dialog/send",{title:LFM.String.sendTitle,classname:"send",position:"absolute",onError:function(_38){
this.overlayError.update(_38.getErrorMessage());
Effect.Appear(this.overlayError);
}}));
LFM.set("Tag",LFM.AJAXDialogWrapper("/ajax/dialog/tag",{title:LFM.String.tagTitle,classname:"add",fadeDone:true,position:"absolute",callback:function(_39,_3a){
if($("tagInput"+_39.random)){
$("tagInput"+_39.random).focus();
}
}}));
LFM.set("Befriend",LFM.AJAXDialogWrapper("/ajax/dialog/befriend",{title:LFM.String.befriendTitle,classname:"befriend",fadeDone:true}));
LFM.set("Playlist",LFM.AJAXDialogWrapper("/ajax/dialog/playlist",{title:LFM.String.playlistTitle,classname:"playlist",fadeDone:true}));
LFM.set("Join",LFM.AJAXDialogWrapper("/ajax/dialog/join",{title:LFM.String.joinTitle,fadeDone:true}));
LFM.set("Leave",LFM.AJAXDialogWrapper("/ajax/dialog/join",{title:LFM.String.leaveTitle,fadeDone:true}));
LFM.set("Membership",LFM.AJAXDialogWrapper("/ajax/dialog/membership",{fadeDone:true}));
LFM.set("ImageUpload",LFM.AJAXDialogWrapper("/ajax/dialog/imageupload",{title:LFM.String.uploadImageTitle,classname:"upload",type:LFM.Dialog.CUSTOM}));
LFM.set("VideoUpload",LFM.AJAXDialogWrapper("/ajax/dialog/videoupload",{title:LFM.String.uploadVideoTitle,classname:"upload",type:LFM.Dialog.CUSTOM}));
LFM.set("Usernote",LFM.AJAXDialogWrapper("/ajax/dialog/usernote",{title:LFM.String.usernoteTitle,classname:"usernote"}));
LFM.set("SetLocation",LFM.AJAXDialogWrapper("/ajax/dialog/setlocation",{title:LFM.String.setLocationTitle,classname:"setlocation",type:LFM.Dialog.STUB,callback:function(_3b,_3c){
if(_3b.overlay.down("input.text")){
_3b.overlay.down("input.text").focus();
_3b.overlay.down("input.text").select();
}
},beforeConfirm:function(e){
if(LFM.get("Page","allowReloads")&&LFM.get("Page","reloadLocation")){
var _3e=LFM.get("Page","newLocation");
var _3f=LFM.get("Page","reloadURL");
if(_3e&&_3f){
reloadURL=_3f+Object.toQueryString({place_id:_3e.id,place_type:_3e.type});
window.location.href=reloadURL;
}else{
window.location.reload();
}
}
}}));
LFM.set("Flag",LFM.AJAXDialogWrapper("/ajax/dialog/flag",{title:LFM.String.flageventTitle,classname:"flag",fadeDone:true}));
LFM.set("ModerationVote",LFM.AJAXDialogWrapper("/ajax/dialog/moderationvote",{classname:"moderationvote",fadeDone:true,onError:function(_40){
var _41=_40.getErrorCode();
switch(_41){
case 1:
this.overlay.down(".errorChoice").show();
break;
case 2:
var _42=this.overlay.down(".customArtistName").down("input");
var _43=_42.getAttribute("placeholder");
if(_43==$F(_42)){
this.overlay.down(".errorArtistA").show();
}else{
this.overlay.down(".errorArtistB").show();
}
break;
case 3:
var _42=this.overlay.down(".customTrackName").down("input");
var _43=_42.getAttribute("placeholder");
if(_43==$F(_42)){
this.overlay.down(".errorTrackA").show();
}else{
this.overlay.down(".errorTrackB").show();
}
break;
}
},beforeConfirm:function(_44){
this.overlay.select(".errorMessage").invoke("hide");
var _45=this.overlay.down("input[value=notcorrect]");
if(_45&&_45.checked){
$w("Artist Track").each(function(_46){
var _47=this.overlay.down(".custom"+_46+"Name");
if(_47&&_47.visible()){
_47=_47.down("input");
if(_47){
var _48=_47.getAttribute("placeholder");
if(_48==$F(_47)){
this.overlay.down(".error"+_46+"A").show();
}
}
}
}.bind(this));
}
this.busy.bind(this);
}}));
LFM.set("BuyDialog",LFM.AJAXDialogWrapper("/ajax/dialog/buy",{action:null,classname:"buyDialog"}));
LFM.set("MultiBuyDialog",function(_49,_4a,_4b,_4c){
var _4d=Class.create(LFM.AJAXDialog,{url:"/ajax/dialog/multibuy",initialize:function(_4e,_4f,_50,_51){
var _52=this._getTracks(_50);
this.options={classname:"multiBuyDialog",width:"500px",maxHeight:"350px",parameters:{"limit":_51?_51:15}};
if(_4f){
_4f.parameters=_4f.parameters||{};
Object.extend(this.options,_4f);
}
this.options.parameters["trackId[]"]=_52;
this.options.parameters["limit"]=_51||-1;
LFM.AJAXDialog.prototype.initialize.apply(this,[_4e,this.url,this.options]);
},_getTracks:function(_53){
var _54;
if(!_53){
_54=LFM.Page.Extract.trackIds();
}else{
if(typeof _53=="string"){
_54=LFM.Page.Extract.trackIds(_53);
}
}
return _54;
}});
return new _4d(_49,_4a,_4b,_4c);
});
LFM.set("Form",{ResourcePicker:Class.create({initialize:function(_55){
this.resource={};
this.onSelect=null;
this.currentTab="music";
if(_55){
Object.extend(this,_55);
}
this.status={};
this.focusser=null;
this.results={};
this.selected={};
},selectResource:function(e){
e.stop();
if(this.resource.id){
if(this.onSelect){
this.onSelect(this.resource);
}else{
this.dialog.hide();
}
}
},_createFocusser:function(){
if(this.dialog&&!this.focusser){
this.focusser=$(document.createElement("textarea"));
this.focusser.setStyle({"z-index":0,"position":"absolute","top":0,"left":0,"width":0,"height":0});
this.dialog.overlay.insert({before:this.focusser});
Event.observe(this.focusser,"keypress",this._watchKeys.bindAsEventListener(this));
Event.observe(this.focusser,"blur",function(e){
$$("#respickerTypes div.results").invoke("removeClassName","active");
}.bindAsEventListener(this));
Event.observe(this.focusser,"focus",this._focusKeys.bind(this));
}
},_watchKeys:function(e){
if(this.resultType&&this.selected[this.resultType]){
switch(e.keyCode){
case Event.KEY_UP:
case 63232:
e.stop();
var _59=this.selected[this.resultType].previous("li");
if(_59){
this.selectResult(this.resultType,_59);
}
break;
case Event.KEY_DOWN:
case 63233:
e.stop();
var _5a=this.selected[this.resultType].next("li");
if(_5a){
this.selectResult(this.resultType,_5a);
}
break;
case Event.KEY_RETURN:
e.stop();
this.selectResource(e);
break;
default:
break;
}
}
},_focusKeys:function(){
if(this.focusser&&this.resultType&&this.results[this.resultType]){
this.focusser.focus();
this.results[this.resultType].addClassName("active");
}
},show:function(e,_5c){
if(!this.dialog||_5c){
this.dialog=new LFM.Dialog({action:true,resource:this.resource,type:LFM.Dialog.STUB,onConfirm:this.selectResource.bindAsEventListener(this)});
this.dialog.show("/ajax/dialog/respicker?"+$H({start:this.currentTab}).toQueryString(),function(_5d,_5e){
_5d.confirmButton.disabled=true;
$$("#respickerTabs li").each(function(tab){
var _60=tab.id.replace("Tab","");
tab.observe("click",this.toggleType.bindAsEventListener(this,_60));
var _61=$(_60+"Form").down("input[type=submit]");
if(_61){
_61.observe("click",this.search.bindAsEventListener(this,_60,true));
this.status[_60]=new LFM.Ajax.StatusHolder(_61);
}
}.bind(this));
if($("otherTypes")){
$("otherTypes").observe("click",this.toggleOther.bindAsEventListener(this));
}
this._createFocusser();
}.bind(this));
}else{
this.dialog.show();
}
},_setResultType:function(_62){
this.resultType=_62;
return this.resultType;
},toggleType:function(e,tab){
$(this.currentTab+"Form").hide();
$(tab+"Form").show();
$$("#respickerTabs li").invoke("removeClassName","selected");
$(tab+"Tab").addClassName("selected");
this.currentTab=tab;
var _65=$(tab+"Form").serialize(true);
var _66=this._setResultType(_65.type);
this.selectResult(_66,this.selected[_66]);
},toggleOther:function(e){
var _68=e.element();
if(!_68.match("input[type=radio]")||_68.up("li").hasClassName("selected")){
return;
}
$$("#otherTypes li.radioOption").each(function(_69){
_69.removeClassName("selected");
var _6a=_69.down("div.results");
if(_6a.visible()){
_6a.hide();
}
});
_68.up("li").addClassName("selected");
this.search(e,"other");
},_processResults:function(tab,_6c,_6d){
this.results[_6c].update(_6d);
this.selectResult(_6c,this.results[_6c].down("li"));
this.results[_6c].select("li").each(function(_6e){
_6e.observe("click",function(e){
this._focusKeys();
if(_6e!=this.selected[_6c]){
this.selectResult(_6c,_6e);
}
}.bindAsEventListener(this));
_6e.observe("dblclick",this.selectResource.bindAsEventListener(this));
}.bind(this));
if(tab==this.currentTab){
this._focusKeys();
}
new Effect.Appear(this.results[_6c],{duration:0.4,queue:"end"});
this.results[_6c].addClassName("loaded");
if(this.status[_6c]){
this.status[_6c].idle();
}
},search:function(e,tab,_72,_73){
if(tab!="other"){
e.stop();
}
var _74=$(tab+"Form").serialize(true);
var _75=this._setResultType(_74.type);
this.results[_75]=e.element().next("div.results");
this.selectResult(_75,this.selected[_75]);
if(!_72&&this.results[_75].hasClassName("loaded")){
this._focusKeys();
new Effect.Appear(this.results[_75],{duration:0.4,queue:"end"});
}else{
if(this.status[_75]){
this.status[_75].busy();
}
new Ajax.Request("/ajax/search",{parameters:_74,method:"get",onComplete:function(_76){
var _77=_76.responseText;
if(_77=="EMPTY"||_77=="ERROR"){
if(this.status[_75]){
this.status[_75].idle();
}
return;
}
this._processResults(tab,_75,_77);
if(_73){
_73();
}
}.bind(this)});
}
},selectResult:function(_78,_79){
if(this.results[_78]){
this.results[_78].select("li").invoke("removeClassName","selected");
this.selected[_78]=_79;
if(_79){
this.resource=_79.getResource();
_79.addClassName("selected");
this.dialog.confirmButton.disabled=false;
}
}
}})});
(function(){
var _7a=Class.create({initialize:function(){
this.dialog=new LFM.Dialog({type:LFM.Dialog.STUB,conent:"",classname:"notificationDialog",offset_top:0,showEffect:function(){
return [new Effect.BlindDown(this.overlay,{sync:true}),new Effect.Appear(this.overlay,{sync:true})];
},onUpdate:function(){
new Effect.Highlight(this.overlay,{startcolor:"#333333",endcolor:"#050505",restorecolor:"#050505"});
}});
},startTimeout:function(){
if(this.timeout){
window.clearTimeout(this.timeout);
}
this.timeout=this.hide.bind(this).delay(10);
},hide:function(){
if(this.dialog.hover){
this.startTimeout();
}else{
this.dialog.hide();
}
},send:function(_7b){
this.dialog.updateContent(_7b);
if(!this.dialog.overlay||!this.dialog.overlay.visible()){
this.dialog.show();
}
this.startTimeout();
}});
LFM.set("Notification",new _7a());
})();

