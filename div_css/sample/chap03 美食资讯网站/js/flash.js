FOD={logPlay:function(_1){
new Ajax.Request("/webclient/logPlay",{method:"post",parameters:{id:_1.track,sk:_1.sk},onSuccess:FOD.onLogSuccess});
},onLogSuccess:function(_2){
},createLimitDialog:function(_3,_4){
var _5="FODDialogSuppress"+(_4?"FairUse":"");
log("createLimitDialog");
if(LFM.getCookie(_5)==1){
return;
}
function setSuppressCookie(){
var _6=$F("fodSuppressCheck")?1:0;
LFM.setCookie(_5,_6);
}
var _7=new LFM.Dialog({resource:{type:9,id:_3.id},type:LFM.Dialog.CUSTOM,classname:"fodDialog",onCancel:function(){
setSuppressCookie();
this.hide();
},onConfirm:setSuppressCookie});
_7.show("/ajax/dialog/fodlimit"+(_4?"?fairuse=1":""));
}};
LFM.set("Flash",{Player:{currentTrack:null,currentTrackNum:null,newTrack:null,previewRequest:false,is_ie:null,context:false,watchedVideo:false,stationURL:null,autostart:true,readyToTune:false,isReadyToTune:function(){
return LFM.Flash.Player.readyToTune;
},logVideoStart:function(){
LFM.Flash.Player.watchedVideo=true;
},logVideoEnd:function(){
if(LFM.Flash.Player.watchedVideo){
LFM.Flash.Player.watchedVideo=false;
}
},save:function(_8){
LFM.Omniture.prepareEvar("ClickSource","FlashPlayerBtn");
LFM.Add(_8);
},onFreeTrialExpiry:function(){
LFM.Flash.Player.context.onFreeTrialExpiry();
},send:function(_9){
LFM.Omniture.prepareEvar("ClickSource","FlashPlayerBtn");
LFM.Send(_9);
},logLove:function(){
LFM.Omniture.prepareEvar("ClickSource","FlashPlayerBtn");
LFM.Omniture.trackEvents("LoveTrack");
},add:function(_a){
LFM.Omniture.prepareEvar("ClickSource","FlashPlayerBtn");
LFM.Add(_a);
},tag:function(_b){
LFM.Omniture.prepareEvar("ClickSource","FlashPlayerBtn");
LFM.Tag(_b);
},buy:function(_c){
LFM.Omniture.prepareEvar("ClickSource","FlashPlayerBtn");
LFM.Omniture.trackEvents("Buy");
window.open(_c);
},login:function(_d){
LFM.set("LoginDialog",LFM.AJAXDialogWrapper("/ajax/dialog/add",{title:"Log in to Last.fm",classname:"add"}));
LFM.LoginDialog(_d);
},getEmbed:function(){
return $("lfmPlayer");
},flashExternalAPICall:function(_e,_f){
LFM.info("Flash player call: "+_e);
if(_f){
LFM.dir(_f);
}
var _10=LFM.Flash.Player.getEmbed();
if(_10){
for(var i in _f){
_10.SetVariable(i,_f[i]);
}
try{
_10.TCallLabel("/",_e);
}
catch(e){
LFM.error("Error calling external interface");
LFM.log(e);
}
}else{
LFM.error("No player embed");
}
},stopRadio:function(){
LFM.Flash.Player.flashExternalAPICall("handleJSStopPlayback");
},skip:function(){
LFM.Flash.Player.flashExternalAPICall("handleJSSkip");
},play:function(){
LFM.Flash.Player.flashExternalAPICall("handleJSSkip");
},love:function(){
LFM.Flash.Player.flashExternalAPICall("handleJSLove");
},ban:function(){
LFM.Flash.Player.flashExternalAPICall("handleJSBan");
},resume:function(){
LFM.Flash.Player.flashExternalAPICall("handleResume");
},stopOnNextTrack:function(){
LFM.Flash.Player.flashExternalAPICall("handleJSStopOnNextTrack");
},stop:function(){
LFM.Flash.Player.stopRadio();
},tune:function(_12){
LFM.Flash.Player.flashExternalAPICall("handleJSTuning",{radioURL:_12});
LFM.log("tuning to "+_12);
},setVolume:function(vol){
LFM.Flash.Player.flashExternalAPICall("handleJSVolume",{jsVolume:vol-0});
LFM.log("set volume to "+vol);
},scrobble:function(_14){
if(_14||_14==undefined){
LFM.Flash.Player.switchOnScrobbling();
}else{
LFM.Flash.Player.switchOffScrobbling();
}
},switchOnScrobbling:function(){
LFM.Flash.Player.flashExternalAPICall("handleJSScrobbleOn");
},switchOffScrobbling:function(){
LFM.Flash.Player.flashExternalAPICall("handleJSScrobbleOff");
},addEventListener:function(_15,_16){
callbackName="on"+_15.capitalize();
LFM.log("adding event listener for Flash Player event: "+_15);
LFM.Flash.Player[callbackName]=_16;
var _17=$("lfmPlayer");
_17.SetVariable("externalEvent",_15);
_17.TCallLabel("/","handleJSEventObserve");
},setContext:function(_18){
LFM.Flash.Player.context=_18;
},playPreview:function(_19){
LFM.Flash.Player.context.playPreview(_19);
},getCurrentTrack:function(){
return Lastfm.resources[currentTrackNum-1];
},saveVolume:function(vol){
var _1b=new Date();
_1b.setFullYear(2010,1,1);
LFM.deleteCookie("lfmVol");
LFM.setCookie("lfmVol",vol,_1b);
},initVolume:function(){
var vol=LFM.getCookie("lfmVol");
if(vol){
LFM.Flash.Player.setVolume(vol-0);
}
},highlightTrack:function(id){
LFM.Flash.Player.context.scrollToCurrentTrack(currentTrack);
},scrollToCurrentTrack:function(_1e){
LFM.Flash.Player.context.scrollToCurrentTrack(_1e);
},onNextTrackHighlight:function(){
LFM.Flash.Player.context.scrollToCurrentTrack(currentTrack);
},onLoad:function(){
LFM.Flash.Player.initVolume();
if(LFM.Flash.Player.context.onLoad){
LFM.Flash.Player.context.onLoad();
}
if(LFM.Page.lazyPlayer){
LFM.Page.lazyPlayer.onFlashPlayerLoad();
}
}}});
LFM.set("Flash",{LazyPlayer:Class.create({clickHandler:null,params:null,initialize:function(_1f){
this.params=Object.clone(_1f);
this.clickHandler=this.loadFlashPlayer.bindAsEventListener(this);
$("player").observe("click",this.clickHandler);
},loadFlashPlayer:function(e){
$("player").stopObserving("click",this.clickHandler);
UFO.create(this.params,this.params.id+"_container");
$("player").removeClassName("lazy");
},onFlashPlayerLoad:function(){
}})});
Event.observe(window,"beforeunload",function(_21){
if(Prototype.Browser.WebKit){
LFM.log("stopping radio");
LFM.Flash.Player.stopRadio();
}
});
LFM.set("Flash",{Playlist:Class.create({initialize:function(id){
this.tracks=[];
this.trackTable=$(id);
this.currentTrack=null;
this.currentTrackNum=null;
this.newTrack=null;
this.previewRequest=false;
this.trackTable.observe("click",function(_23){
if(!_23.element().match("td")){
return;
}
var row=_23.findElement("tr.streamable:not(.highlight)");
if(!row){
return;
}
_23.stop();
this.playPreview(row);
}.bind(this));
},playPreview:function(_25){
var res=_25.getResource();
var _27=$("lfmPlayer");
_27.SetVariable("previewTrackId",parseInt(res.id));
_27.TCallLabel("/","HandleJSPreview");
if(this.currentTrack){
this.clearHighlight(this.currentTrack);
}
},highlightTrack:function(id){
if(this.currentTrack){
this.clearHighlight(this.currentTrack);
}
var _29=this.getTrackRow(id);
if(_29){
_29.addClassName("highlight");
}
this.scrollToTrack(_29);
},getTracks:function(){
return this.trackTable.select("tr");
},getTrackRow:function(id){
return this.getTracks().find(function(_2b){
return _2b.id.include(id);
});
},onNextTrack:function(_2c){
if(this.currentTrack){
this.clearHighlight(this.currentTrack);
}
this.currentTrack=_2c;
this.highlightTrack(this.getResourceId(_2c));
},clearHighlight:function(_2d){
var _2e=this.getTrackRow(this.getResourceId(_2d));
if(_2e){
_2e.removeClassName("highlight");
}
},getResourceId:function(res){
return "r"+res.type+"_"+res.id;
},onLoad:function(){
},onStopTrack:function(){
if(this.currentTrack){
this.clearHighlight(this.currentTrack);
}
this.currentTrack=null;
},scrollToTrack:function(_30){
var _31=document.viewport.getHeight();
var _32=document.viewport.getScrollOffsets().top;
var _33=_30.cumulativeOffset().top;
if(_33>_31+_32){
new Effect.ScrollTo(_30);
}
}})});
LFM.set("Flash",{PreRoll:{watching:false,stationTitle:null,swfID:"lastPreRollAd_swf",_videoHeight:null,_servedBlank:false,_frameID:"LastAd_PreRoll",smartclip:false,dart:false,_loaded:false,onStart:function(_34){
LFM.info("PreRoll onStart");
if(LFM.Page.RadioState.hasStation()&&LFM.Flash.Player.isReadyToTune()){
LFM.Flash.PreRoll.tunePlayer();
}
},hideControls:function(){
LFM.Flash.PreRoll.stationTitle=$("webRadioPlayer-title").innerHTML;
$("webRadioPlayer-controls").fade({duration:0.5});
$("webRadioPlayer-title").fade({duration:0.5,afterFinish:LFM.Flash.PreRoll.onFadeStationTitle});
$("sampleContent").fade({duration:0.5});
$("webRadioPlayer-switchPane").fade({duration:0.5});
if($("lfmSlideShowWrapper")){
$("lfmSlideShowWrapper").hide();
LFM.info("hide slideshow");
}else{
LFM.warn("!no slideshow");
}
LFM.info("hide controls");
},onLoadVideo:function(_35){
if(_35.height==null){
return;
}
LFM.Flash.PreRoll.hideControls();
LFM.Flash.PreRoll._videoHeight=_35.height;
LFM.info("loaded preroll of height "+_35.height);
if(!LFM.Page.RadioState.hasStation()){
return;
}
if(_35.height>LFM.Radio.MixedContentPane.getHeight()){
LFM.Radio.MixedContentPane.expand(_35.height,{afterFinish:LFM.Flash.PreRoll.onContainerExpand,target:LFM.Flash.PreRoll});
}else{
setTimeout(function(){
LFM.Flash.PreRoll.play();
},500);
}
},onLoad:function(){
LFM.info("PreRoll.onLoad");
LFM.Flash.PreRoll._loaded=true;
if(LFM.Flash.PreRoll._impressionTrackingURL){
LFM.info("Cached PreRoll._impressionTrackingURL");
LFM.Flash.PreRoll.setImpressionTrackingURL(LFM.Flash.PreRoll._impressionTrackingURL);
}
if(LFM.Flash.PreRoll._postImpressionTrackingURL){
LFM.info("Cached PreRoll._postImpressionTrackingURL");
LFM.Flash.PreRoll.setPostImpressionTrackingURL(LFM.Flash.PreRoll._postImpressionTrackingURL);
}
if(LFM.Flash.PreRoll._clickURL){
LFM.info("Cached PreRoll._clickURL");
LFM.Flash.PreRoll.setClickURL(LFM.Flash.PreRoll._clickURL);
}
if(LFM.Flash.PreRoll._videoURL){
LFM.info("Cached PreRoll._videoURL");
LFM.Flash.PreRoll.setFLVLocation(LFM.Flash.PreRoll._videoURL);
}
},isLoaded:function(){
return LFM.Flash.PreRoll._loaded;
},serve:function(){
LFM.info("PreRoll serve");
if(LFM.Flash.PreRoll.isDART()){
LFM.info("Hide DART and show slideshow");
LFM.Flash.PreRoll.hide();
if(LFM.Page.RadioState.hasStation()&&LFM.Flash.Player.isReadyToTune()){
LFM.Flash.PreRoll.tunePlayer();
}
}else{
LFM.info("Serving preroll with height "+LFM.Flash.PreRoll._videoHeight);
LFM.Flash.PreRoll.onLoadVideo({height:LFM.Flash.PreRoll._videoHeight});
}
},serveSmartClip:function(){
LFM.info("serving smartclip preroll");
LFM.Adserver.setSmartClipPreRoll(true);
if(LFM.Adserver.firstPreRollLoad){
LFM.Adserver.setPreRollFrame();
}
LFM.Adserver.refreshPreRoll();
},onContainerExpand:function(_36){
LFM.Flash.PreRoll.resizeContainer(LFM.Radio.MixedContentPane.getHeight());
$("mixedContentPaneExpander").hide();
setTimeout(function(){
LFM.Flash.PreRoll.play();
},500);
},resizeContainer:function(_37){
LFM.info("resizing pre-roll container to "+_37);
if(LFM.Flash.PreRoll.isFramed()){
LFM.Flash.PreRoll.getFrame().height=_37;
LFM.Flash.PreRoll.getFrame().style.position="";
LFM.Flash.PreRoll.getFrame().style.left="";
}
LFM.Flash.PreRoll.getSWF().height=_37;
LFM.Flash.PreRoll.getSWFObject().height=_37;
},repositionVideo:function(){
try{
LFM.Flash.PreRoll.getSWF().repositionVideo();
}
catch(e){
LFM.error(e);
}
},getSWFObject:function(){
if(LFM.Flash.PreRoll.isFramed()){
return LFM.Flash.PreRoll.getFrameWindow().document.getElementById(LFM.Flash.PreRoll.swfID);
}
return $(LFM.Flash.PreRoll.swfID);
},getSWF:function(){
if(Prototype.Browser.IE){
var _38=LFM.Flash.PreRoll.swfID;
}else{
var _38="lastPreRollAd";
}
if(LFM.Flash.PreRoll.isFramed()){
return LFM.Flash.PreRoll.getFrameWindow().document.getElementById(_38);
}else{
return $(_38);
}
},play:function(){
LFM.info("playing preroll");
LFM.Flash.PreRoll.repositionVideo();
try{
LFM.Flash.PreRoll.getSWF().playPreRoll();
}
catch(e){
LFM.error(e);
}
},getFrameID:function(){
return LFM.Flash.PreRoll._frameID;
},getFrame:function(){
return $(LFM.Flash.PreRoll.getFrameID());
},getFrameWindow:function(){
return frames[LFM.Flash.PreRoll.getFrameID()];
},videoNeedsForceRepositioning:function(){
return ((!LFM.Radio.MixedContentPane.isExpanded()&&LFM.Page.RadioState.hasStation())||Prototype.Browser.IE);
},onFadeStationTitle:function(_39){
$("webRadioPlayer-title").addClassName("preroll");
$("webRadioPlayer-title").update(LFM.Flash.PreRoll.pleaseWaitMsg);
$("webRadioPlayer-title").appear({duration:1,from:0,to:1});
$("playerStationMeta").hide();
$("playerTrackMeta").hide();
LFM.info("onFadeStationTitle");
},onFadePleaseWaitMessage:function(_3a){
$("webRadioPlayer-title").removeClassName("preroll");
$("webRadioPlayer-title").update(LFM.Flash.PreRoll.stationTitle);
$("webRadioPlayer-title").appear({duration:0.5});
$("playerStationMeta").appear({duration:0.5});
$("playerTrackMeta").appear({duration:0.5});
$("webRadioPlayer-controls").appear({duration:0.5});
$("webRadioPlayer-switchPane").appear({duration:0.5});
LFM.info("onFadePleaseWaitMessage");
},onEnd:function(_3b){
LFM.info("PreRoll onEnd");
LFM.Flash.PreRoll._watching=false;
LFM.Flash.PreRoll.resizeContainer(320);
LFM.Radio.MixedContentPane.collapse({afterFinish:LFM.Flash.PreRoll.onContainerCollapse,target:LFM.Flash.PreRoll});
},isSmartClip:function(){
return LFM.Adserver.hasSmartClipPreRoll();
},isDART:function(){
return LFM.Flash.PreRoll.dart;
},isFramed:function(){
return LFM.Flash.PreRoll.getFrame()&&(LFM.Flash.PreRoll.isDART()||LFM.Flash.PreRoll.isSmartClip());
},setDARTPreRoll:function(_3c){
LFM.info("DART preroll set to true");
LFM.Flash.PreRoll.dart=true;
},onBeforeDARTPreRollLoad:function(){
LFM.info("onBeforeDARTPreRollLoad");
LFM.Flash.PreRoll.setDARTBlank(true);
},onBeforeSmartClipPreRollLoad:function(){
LFM.info("onBeforeSmartClipPreRollLoad");
LFM.Flash.PreRoll.hideControls();
LFM.Flash.PreRoll.smartclip_blank=true;
},onStartSmartclip:function(){
LFM.info("onStartSmartclip");
LFM.Flash.PreRoll.smartclip_blank=false;
LFM.Flash.Player.logVideoStart();
LFM.Flash.PreRoll.onStart();
},onEndSmartclip:function(){
LFM.info("onEndSmartclip");
if(LFM.Flash.PreRoll.smartclip_blank){
LFM.info("smartclip_blank");
LFM.Flash.PreRoll.onStart();
}
LFM.Flash.PreRoll.smartclip_blank=false;
LFM.Flash.Player.logVideoEnd();
if($("LastAd_PreRoll")){
$("LastAd_PreRoll").hide();
}
if($("lfmSlideShowWrapper")){
$("lfmSlideShowWrapper").show();
LFM.info("show slideshow");
}else{
LFM.warn("!no slideshow");
}
$("webRadioPlayer-title").fade({duration:0.5,afterFinish:LFM.Flash.PreRoll.onFadePleaseWaitMessage});
LFM.Adserver.setPreRoll(false);
LFM.Adserver.setSmartClipPreRoll(false);
try{
LFM.Flash.Player.resume();
}
catch(e){
LFM.error(e);
}
LFM.info("smartclip preroll onEnd");
LFM.Adserver.refreshAds();
},hide:function(){
LFM.info("PreRoll hide");
if(LFM.Flash.PreRoll.getSWFObject()){
LFM.info("Removing preroll container");
Element.remove(LFM.Flash.PreRoll.getSWFObject());
}
if(LFM.Flash.PreRoll.isFramed()){
LFM.info("Hiding moving preroll frame off screen");
LFM.Flash.PreRoll.getFrame().style.position="absolute";
LFM.Flash.PreRoll.getFrame().style.left="-600px";
LFM.Flash.PreRoll.getFrame().style.top="-600px";
}
if($("lfmSlideShowWrapper")){
$("lfmSlideShowWrapper").show();
LFM.info("show slideshow");
}else{
LFM.warn("!no slideshow");
}
},onContainerCollapse:function(_3d){
LFM.info("PreRoll onContainerCollapse");
$("webRadioPlayer-title").fade({duration:0.5,afterFinish:LFM.Flash.PreRoll.onFadePleaseWaitMessage});
LFM.Adserver.setPreRoll(false);
LFM.Flash.PreRoll.hide();
LFM.Flash.PreRoll.removePreRollTandemID();
if(LFM.Page.RadioState.hasStation()&&LFM.Flash.Player.isReadyToTune()){
LFM.Flash.Player.resume();
}
LFM.info("preroll onEnd");
},setDARTBlank:function(_3e){
LFM.Flash.PreRoll._servedBlank=_3e;
LFM.Adserver.setPreRoll(!_3e);
},onDARTBlank:function(){
LFM.info("PreRoll onDARTBlank");
LFM.Flash.PreRoll.setDARTBlank(true);
LFM.Flash.PreRoll.hide();
LFM.Flash.PreRoll.removePreRollTandemID();
LFM.log("stationURL: "+LFM.Page.RadioState.getStationURL());
LFM.log("isReadyToTune: "+LFM.Flash.Player.isReadyToTune());
if(LFM.Page.RadioState.hasStation()&&LFM.Flash.Player.isReadyToTune()){
LFM.Flash.PreRoll.tunePlayer();
}
},tunePlayer:function(){
LFM.info("PreRoll tunePlayer");
LFM.Flash.Player.tune(LFM.Page.RadioState.getStationURL());
},onGetSession:function(){
LFM.info("Preroll onGetSession");
LFM.log("isDART: "+LFM.Flash.PreRoll.isDART());
LFM.log("servedBlank: "+LFM.Flash.PreRoll.servedBlank());
LFM.log("stationURL: "+LFM.Page.RadioState.getStationURL());
if(LFM.Page.RadioState.hasStation()){
if(LFM.Flash.PreRoll.isDART()&&!LFM.Flash.PreRoll.servedBlank()){
return;
}
LFM.Flash.PreRoll.tunePlayer();
}
},setImpressionTrackingURL:function(url){
LFM.info("PreRoll.setImpressionTrackingURL("+url+")");
if(LFM.Flash.PreRoll.getSWF()&&LFM.Flash.PreRoll.isLoaded()){
try{
LFM.Flash.PreRoll.getSWF().setImpressionTrackingURL(url);
}
catch(e){
LFM.error(e);
}
}else{
LFM.Flash.PreRoll._impressionTrackingURL=url;
}
},setPostImpressionTrackingURL:function(url){
LFM.info("PreRoll.setPostImpressionTrackingURL("+url+")");
if(LFM.Flash.PreRoll.getSWF()&&LFM.Flash.PreRoll.isLoaded()){
try{
LFM.Flash.PreRoll.getSWF().setPostImpressionTrackingURL(url);
}
catch(e){
LFM.error(e);
}
}else{
LFM.Flash.PreRoll._postImpressionTrackingURL=url;
}
},setClickURL:function(url){
LFM.info("PreRoll.setClickURL("+url+")");
if(LFM.Flash.PreRoll.getSWF()&&LFM.Flash.PreRoll.isLoaded()){
try{
LFM.Flash.PreRoll.getSWF().setClickURL(url);
}
catch(e){
LFM.error(e);
}
}else{
LFM.Flash.PreRoll._clickURL=url;
}
},setFLVLocation:function(url){
LFM.info("PreRoll.setFLVLocation("+url+")");
if(LFM.Flash.PreRoll.getSWF()&&LFM.Flash.PreRoll.isLoaded()){
try{
LFM.Flash.PreRoll.getSWF().setFLVLocation(url);
}
catch(e){
LFM.error(e);
}
}else{
LFM.Flash.PreRoll._videoURL=url;
}
},servedBlank:function(){
return LFM.Flash.PreRoll._servedBlank;
},onTune:function(){
LFM.info("PreRoll onTune");
if(LFM.Flash.PreRoll.servedBlank()){
LFM.Flash.Player.resume();
}
},isPlaying:function(){
return LFM.Flash.PreRoll._watching;
},removePreRollTandemID:function(){
if(LFM.Page.takeoverTandemID){
var _43=LFM.Page.takeoverTandemID;
}else{
var _43=1;
}
LFM.Adserver.setTandemID(_43);
},onBeforeUnload:function(_44){
}}});
var mouseOverFlash=false;
function SWFMacMouseWheel(id){
this.id=id;
this.mouseOverFlash=false;
var _46=navigator.appVersion.toLowerCase().indexOf("mac")!=-1;
if(_46){
this.init();
}
}
SWFMacMouseWheel.prototype={init:function(){
SWFMacMouseWheel.instance=this;
Event.observe(window,"onmousewheel",SWFMacMouseWheel.instance.wheel);
Event.observe(window,"DOMMouseScroll",SWFMacMouseWheel.instance.wheel);
Event.observe($("player"),"mouseover",SWFMacMouseWheel.instance.onHoverOverFlash);
Event.observe($("player"),"mouseout",SWFMacMouseWheel.instance.onHoverOutFlash);
},onHoverOverFlash:function(_47){
mouseOverFlash=true;
},onHoverOutFlash:function(_48){
mouseOverFlash=false;
},handle:function(_49){
$(this.id).externalMouseEvent(_49);
},wheel:function(_4a){
var _4b=0;
if(_4a.wheelDelta){
_4b=_4a.wheelDelta/120;
if(window.opera){
_4b=-_4b;
}
}else{
if(_4a.detail){
_4b=-_4a.detail/3;
}
}
if(/AppleWebKit/.test(navigator.userAgent)){
_4b/=3;
}
if(mouseOverFlash){
}
}};
LFM.set("Flash",{VideoPlayer:{logDWInterval:function(_4c,id){
if(!DW){
return false;
}
if(isNaN(_4c)||isNaN(id)){
log("[Flash.VideoPlayer.logDWInterval - invalid params] Video: "+id+" ("+_4c+"%)");
}else{
log("[Flash.VideoPlayer.logDWInterval] Video: "+id+" ("+_4c+"%)");
DW.redir({ctype:"porder;event;vid",cval:"1;"+_4c+";"+id,mtype:"2",mapp:"lfmvideoplayer",srchost:window.location.hostname});
}
}}});

