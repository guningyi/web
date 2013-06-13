/* JavaScript-Loader fuer cms3-Scripte */
cms3Loader = new Array();
function firecms3Loader(){for(var i=0; i<cms3Loader.length; i++){cms3Loader[i]();}}		
function addLoadEvent(newEvent){window.onload=firecms3Loader;var isExisting = false;for(var i =0; i<cms3Loader.length; i++){if(cms3Loader[i]==newEvent){isExisting = true;break;}}if(!isExisting){if(addLoadEvent.arguments.length>1&&addLoadEvent.arguments[1]=='top'){if(navigator.appVersion.indexOf("MSIE 5.0")!=-1){var tArray = new Array(newEvent);cms3Loader = tArray.concat(cms3Loader);}else{cms3Loader.unshift(newEvent);}}else{cms3Loader[cms3Loader.length] = newEvent;}}}
document.write('<script type="text/javascript" src="/jscript/global/global.js"></script>');
document.write('<script type="text/javascript" src="/jscript/global/navigation/default.js"></script>');
document.write('<script type="text/javascript" src="/jscript/global/form/default.js"></script>');
document.write('<script type="text/javascript" src="/jscript/custom/include.js"></script>');