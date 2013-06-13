try{
	var best_ad = new Array();
	var mcidB = new Array();
	var qazplmx = (new Date()).getTime() + '_' + Math.floor(Math.random()*999999) + '_' + Math.floor(Math.random()*999999) + Math.floor(Math.random()*999999);

	if (getCookie("R_PR")!= undefined && getCookie("R_PR") != ""){
		$.getJSON("/upload1/104main/bestad/file/bestad.data?isnt=yes",{"qazplmx":qazplmx},
		function(data){
			var BAroot = data;
			var out_mcidB = 0;
				for(var i=0;i<BAroot.info.length;i++){
					if (SearchBA(BAroot.info[i].adid)){
						switch(ba_block){
							case 'bank_ad' :
								out_mcidB = BAroot.info[i].mcid.split(",")[0];
								break;
							case 'log_ad' :
								out_mcidB = BAroot.info[i].mcid.split(",")[1];
								break;
							case 'my_ad' :
								out_mcidB = BAroot.info[i].mcid.split(",")[2];
								break;
							case 'sj_ad' :
								out_mcidB = BAroot.info[i].mcid.split(",")[3];
								break;
						}						
						best_ad.push({
							'adid':BAroot.info[i].adid,
							'image':BAroot.info[i].image,
							'url':BAroot.info[i].url,
							'alt':BAroot.info[i].alt,
							'mcid':out_mcidB,
							'start':BAroot.info[i].start,
							'end':BAroot.info[i].end
							});
						mcidB.push(out_mcidB);
					}
				}				
				if (best_ad != ""){
					adc2(mcidB,2);
					$(document).ready(function(){
						bestad_request_done(best_ad);
					});
				}
		});
	}else if (getCookie("R_PR") == undefined || getCookie("R_PR") == ""){
		if (ba_block == 'bank_ad' || ba_block == 'sj_ad'){
			if (getCookie("R_PF") != undefined && getCookie("R_PF") != ""){
				(new Image).src = "/jobbank/bestad.cfm";
			}
		}
	}
}catch(e){}

var ad_flag = "";
function SearchBA(no){
	ad_flag = getCookie("R_PR");
	var ary_ad = ad_flag.split(",");
	if (ary_ad[2] != "_"){
		ad_no = ary_ad[2].split("_");
		for(var x=0;x<ad_no.length;x++){
			if (ad_no[x] == no){
				return true;
			}
		}
	}
	return false;
}

function adc2(x,y){
	if (top.location.href.indexOf("https://")>=0)
		return;

	var path_link = "http://screw.104.com.tw/analytics/app/app.CacheData.php?utmad=1&utmac=UA-2795003-2&prj=bestad";
	if (x){
		y = (y)?y:1;
		path_link += "&adlist=" + x + "&cat=" + y + "&qazplmx=" + qazplmx;
		(new Image).src = path_link;
	}
}