// DropDownMenu Exception Reporter

function DropDownMenu_exception(ex, error_method){
	var _errmsg = "";
	for (var xx in ex){
		_errmsg += xx + "=" + ex[xx] + "<br>\n";
	}
	js_error = escape(error_method + " error <br/> error message : " + _errmsg);
	if (document.getElementById("js_sendmail") != null){
		document.getElementById("js_sendmail").src="/inc_mm.cfm?type=119999991166C3FFFFFF666600FF9FFF60000199EE990000RJSS&j=" + js_error;
		alert(_errmsg + "\n" + error_method+"\n您的選單下載不完全，為避免您無法正常操作，建議您按下Ctrl+F5後繼續！");
	}
}

//-----------------------------------------------------------------------------------------------------------------
//2007/11/14  建立
//動態選單
var http_request = false;
var hasRequest=',,,,';
function makeRequest(style,url,a,b,c,d,e,f,g,h,i,j,k,l,m,n,p) {
	if(hasRequest.indexOf(a)>0)return -1;
	hasRequest+=','+a;
	http_request = false;

	if (window.XMLHttpRequest) { // Mozilla, Safari,...
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {
			http_request.overrideMimeType('text/plain');
		}
	} else if (window.ActiveXObject) { // IE
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}

	if (!http_request) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
	http_request.onreadystatechange = retFunction(style,a,b,c,d,e,f,g,h,i,j,k,l,m,n,p);
	http_request.open('GET', url, true);
	http_request.send(null);

}
function retFunction(style,a,b,c,d,o,f,g,h,i,j,k,l,m,n,p)
{
    return function() {
        if (http_request.readyState == 4) {
            if (http_request.status == 200) {
                eval(http_request.responseText);
                if(style==1)
                {
                CreateDropDownMenu(eval(o),f,g,h,i,j,k,l,m,n);
                clearMenu();   
                doMenu(a,b,c,d,1); 
                }                
                else
                {    
                CreateDropDownMenu_CheckBox(eval(o),f,g,h,i,j,k,l,m,n);
                clearMenu();   
                doMenu(a,b,c,d,p);
                }    
            } else {
                alert('目前您的網路連線異常，請確認網際網路為連線狀態後，再重新整理網頁並繼續原先動作。');
            }
        }
    };
}

//--------------------------------------------------------------------------------------------------------------------


// DropDownMenu
function DropDownMenu_create(obj,menu_id,menu_title,include_up_node,up_node_textbe,up_node_textaf,show_node,hide_node,can_choice_level,AppendRootNode){
	try {
		CreateDropDownMenu(obj,menu_id,menu_title,include_up_node,up_node_textbe,up_node_textaf,show_node,hide_node,can_choice_level,AppendRootNode);
	}catch(ex){
		DropDownMenu_exception(ex, "DropDownMenu_create()")
	}
}

function DropDownMenu_init(){
	try {
		iinniitt();
	}catch(ex){
		DropDownMenu_exception(ex, "DropDownMenu_init()")
	}
}
/*
function DropDownMenu(menu_id, field_txt, field_num, tb_id){
	try {
		clearMenu();
		doMenu(menu_id, field_txt, field_num, tb_id);
	}catch(ex){
		DropDownMenu_exception(ex, "DropDownMenu()")
	}
}
*/
function DropDownMenu(var_list, menu_id, field_txt, field_num, tb_id, include_up_node, up_node_textbe, up_node_textaf, show_node, hide_node, can_choice_level, AppendRootNode){
	try {		
		if(arguments.length == 12){
			var vl = var_list.split("@@@");
			if(vl.length == 3){
				if(makeRequest(1,vl[0], menu_id, field_txt, field_num, tb_id, vl[1], menu_id, vl[2], include_up_node, up_node_textbe, up_node_textaf, show_node, hide_node, can_choice_level, AppendRootNode, '')==-1)
				{
					clearMenu();
					doMenu(menu_id, field_txt, field_num, tb_id,1);
				}	
			}else{
				alert("動態選單初始化參數有誤請檢查");
			}			
		}else if(arguments.length == 5){
			var vl = var_list.split("@@@");
			if(vl.length == 3){
				var tmp = '';
				if(makeRequest(1,vl[0], menu_id, field_txt, field_num, tb_id, vl[1], menu_id, vl[2], tmp, tmp, tmp, tmp, tmp, tmp, tmp, tmp)==-1)
				{
					clearMenu();
					doMenu(menu_id, field_txt, field_num, tb_id,1);
				}
			}else{
				alert("動態選單初始化參數有誤請檢查");
			}		
		}else if(arguments.length == 4){
			clearMenu();
			//裡面的參數並非實際對應上述參簇而是為了舊版的參數傳遞所以取前四個參數
			doMenu(arguments[0], arguments[1], arguments[2], arguments[3],1);
		}else{
			alert("傳入參數有誤請檢查");
		}
	}catch(ex){
		DropDownMenu_exception(ex, "DropDownMenu_dyn()")
	}
}

function DropDownMenu_ChkBox(var_list, menu_id, field_txt, field_num, tb_id, include_up_node, up_node_textbe, up_node_textaf, show_node, hide_node, can_choice_level, AppendRootNode,inputlen){

	try {		
		if(arguments.length == 13){
			var vl = var_list.split("@@@");
			if(vl.length == 3){
				if(makeRequest(2,vl[0], menu_id, field_txt, field_num, tb_id, vl[1], menu_id, vl[2], include_up_node, up_node_textbe, up_node_textaf, show_node, hide_node, can_choice_level, AppendRootNode,inputlen)==-1)
				{
					clearMenu();
					doMenu(menu_id, field_txt, field_num, tb_id,inputlen);
				}	
			}else{
				alert("動態選單初始化參數有誤請檢查");
			}			
		}else if(arguments.length == 6){
			var vl = var_list.split("@@@");
			if(vl.length == 3){
				var tmp = '';
				if(makeRequest(2,vl[0], menu_id, field_txt, field_num, tb_id, vl[1], menu_id, vl[2], tmp, tmp, tmp, tmp, tmp, tmp,tmp,arguments[5])==-1)
				{
					clearMenu();//alert(arguments.length);
					doMenu(menu_id, field_txt, field_num, tb_id,arguments[5]);
				}
			}else{
				alert("動態選單初始化參數有誤請檢查");
			}		
		}
		else{
			alert("傳入參數有誤請檢查");
		}
	}catch(ex){
		DropDownMenu_exception(ex, "DropDownMenu_dyn()")
	}
}
function DropDownMenu_clear(field_txt, field_num){
	try {
		if ($("#"+field_txt) != null)
			$("#"+field_txt).val("") ;
	
		if ($("#"+field_num) != null)
			$("#"+field_num).val("0") ;
	}catch(ex){
		DropDownMenu_exception(ex, "DropDownMenu_clear()")
	}
}



// Help Win
function DropDownMenu_Helper_init(category,HiddenValueList){
	try {
		initHelpper();
	}catch(ex){
		DropDownMenu_exception(ex, "DropDownMenu_Helper_init()")
	}
}

function DropDownMenu_OpenHelpWin(category, HiddenValueList, error_method){
	if (error_method == null)
		error_method = "DropDownMenu_OpenHelpWin";

	try {
		OpenHelpWin_v2(category,HiddenValueList);
	}catch(ex){
		DropDownMenu_exception(ex, error_method)
	}
}

function DropDownMenu_OpenHelpWin_postnum(category,HiddenValueList){
	DropDownMenu_OpenHelpWin(category,HiddenValueList, "DropDownMenu_OpenHelpWin_postnum()");
}

function DropDownMenu_OpenHelpWin_job_catno(category,HiddenValueList){
	DropDownMenu_OpenHelpWin(category,HiddenValueList, "DropDownMenu_OpenHelpWin_job_catno()");
}

function DropDownMenu_OpenHelpWin_ind_catno(category,HiddenValueList){
	if (HiddenValueList!=null){
		HiddenValueList = HiddenValueList.split(",");
		if (HiddenValueList.length==11)
			if (HiddenValueList[8]=='')
				HiddenValueList[8] = "@全部";
		HiddenValueList = HiddenValueList.join(",");
	}
	DropDownMenu_OpenHelpWin(category,HiddenValueList, "DropDownMenu_OpenHelpWin_ind_catno()");
}

function DropDownMenu_OpenHelpWin_wcityno(category,HiddenValueList){
	if (HiddenValueList!=null){
		HiddenValueList = HiddenValueList.split(",");
		if (HiddenValueList.length==11)
			if (HiddenValueList[8]=='')
				HiddenValueList[8] = "@全區";
		HiddenValueList = HiddenValueList.join(",");
	}
	DropDownMenu_OpenHelpWin(category,HiddenValueList, "DropDownMenu_OpenHelpWin_wcityno()");
}

function DropDownMenu_OpenHelpWin_exp_ind(category,HiddenValueList){
	DropDownMenu_OpenHelpWin(category,HiddenValueList, "DropDownMenu_OpenHelpWin_exp_ind()");
}

function DropDownMenu_OpenHelpWin_exp_jobcatno(category,HiddenValueList){
	DropDownMenu_OpenHelpWin(category,HiddenValueList, "DropDownMenu_OpenHelpWin_exp_jobcatno()");
}

function DropDownMenu_OpenHelpWin_exp_job(category,HiddenValueList){
	DropDownMenu_OpenHelpWin(category,HiddenValueList, "DropDownMenu_OpenHelpWin_exp_job()");
}

function DropDownMenu_OpenHelpWin_jobclass(category,HiddenValueList){
	DropDownMenu_OpenHelpWin(category,HiddenValueList, "DropDownMenu_OpenHelpWin_jobclass()");
}

function DropDownMenu_OpenHelpWin_majorcat(category,HiddenValueList){
	DropDownMenu_OpenHelpWin(category,HiddenValueList, "DropDownMenu_OpenHelpWin_majorcat()");
}

function DropDownMenu_OpenHelpWin_pcskill(category,HiddenValueList){
	DropDownMenu_OpenHelpWin(category,HiddenValueList, "DropDownMenu_OpenHelpWin_pcskill()");
}

function DropDownMenu_OpenHelpWin_careerskill(category,HiddenValueList){
	DropDownMenu_OpenHelpWin(category,HiddenValueList, "DropDownMenu_OpenHelpWin_jobskill()");
}

function DropDownMenu_OpenHelpWin_cert(category,HiddenValueList){
	DropDownMenu_OpenHelpWin(category,HiddenValueList, "DropDownMenu_OpenHelpWin_cert()");
}



// Other
function DropDownMenu_open_block(block1, block2){
	document.getElementById(block1).style.display='';
	document.getElementById(block2).style.display='none';
}

function $(obj){return typeof(obj)=="object"?obj:document.getElementById(obj);}
