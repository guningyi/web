function Validation(FormCount) { 
	var isValid = true; 
	var breakField = 0; /*erstes Feld, bei dem ein Fehler aufgetreten ist */
	var breakText = "";
	var breakFocus = false;
	var actForm = eval('document.thisForm_'+FormCount.toString());
	var formalias = actForm.elements; 
	 
	if(formalias.length){
		for(i=0;i<formalias.length;i++){ 
			/* error-klassen entfernen */
			if( formalias[i].className.indexOf("formerror") != -1 ){
				formalias[i].className = formalias[i].className.replace("formerror","");
				}
			}
		for(i=0;i<formalias.length;i++){ 
			if(formalias[i].CHECK == '1' || formalias[i].className.indexOf("required") != -1 || formalias[i].className.indexOf("validate") != -1){ 
				if(formalias[i].value.Trim() == ''){
					if( isValid && formalias[i].className.indexOf("required") != -1){
						/*erste feld merken*/
						breakField = i;
						breakFocus = true;
						if( formalias[i].alt != "" && typeof(formalias[i].alt) != 'undefined'){
							breakText = formalias[i].alt;
						}
						else{
							breakText = "Eingabe erwartet";
						}
						/*fehlerhafter eintrag - klasse setzen */
						formalias[i].className += " formerror";
						isValid = false;
					}
				} 
				else if( formalias[i].className.indexOf("isemail") != -1 ){
					/*email-uerberpruefung*/
					if( !isEmail( formalias[i].value ) ){
						if( isValid ){
							/*erste feld merken*/
							breakField = i;
							breakFocus = true;
							if( formalias[i].alt != ""){
								breakText = formalias[i].alt;
								}
							else{
								breakText = "E-Mail-Adresse ist nicht korrekt.";
								}
							}
						/*fehlerhafter eintrag - klasse setzen */
						formalias[i].className += " formerror";
						isValid = false; 
						}
					}
				else if( formalias[i].className.indexOf("isplz4") != -1 ){
					/*email-uerberpruefung*/
					if( !isPLZ4( formalias[i].value ) ){
						if( isValid ){
							/*erste feld merken*/
							breakField = i;
							breakFocus = true;
							if( formalias[i].alt != ""){
								breakText = formalias[i].alt;
								}
							else{
								breakText = "4stellige PLZ erwartet.";
								}
							}
						/*fehlerhafter eintrag - klasse setzen */
						formalias[i].className += " formerror";
						isValid = false; 
						}
					}
				else if( formalias[i].className.indexOf("isplz5") != -1 ){
					/*email-uerberpruefung*/
					if( !isPLZ5( formalias[i].value ) ){
						if( isValid ){
							/*erste feld merken*/
							breakField = i;
							breakFocus = true;
							if( formalias[i].alt != ""){
								breakText = formalias[i].alt;
								}
							else{
								breakText = "5stellige PLZ erwartet.";
								}
							}
						/*fehlerhafter eintrag - klasse setzen */
						formalias[i].className += " formerror";
						isValid = false; 
						}
					}
				else if( formalias[i].className.indexOf("isnumber") != -1 ){
					/*email-uerberpruefung*/
					if( !isNumber( formalias[i].value ) ){
						if( isValid ){
							/*erste feld merken*/
							breakField = i;
							breakFocus = true;
							if( formalias[i].alt != ""){
								breakText = formalias[i].alt;
								}
							else{
								breakText = "Es sind nur numerische Werte erlaubt.";
								}
							}
						/*fehlerhafter eintrag - klasse setzen */
						formalias[i].className += " formerror";
						isValid = false; 
						}
					}
				else if( formalias[i].className.indexOf("iseurodatetime") != -1 ){
					/*datum-zeit-uerberpruefung*/
					if( !isEuroDateTime( formalias[i].value ) ){
						if( isValid ){
							/*erste feld merken*/
							breakField = i;
							breakFocus = true;
							if( formalias[i].alt != ""){
								breakText = formalias[i].alt;
								}
							else{
								breakText = "Die Datums und Zeitangabe ist nicht korrekt (Format: dd.mm.yyyy HH:mm)";
								}
							}
						/*fehlerhafter eintrag - klasse setzen */
						formalias[i].className += " formerror";
						isValid = false; 
						}
					}
				else if( formalias[i].className.indexOf("iseurodate") != -1 ){
					/*replace separator char*/
					formalias[i].value = formalias[i].value.replace(/[\s\/\-]/g,".");
					
					/*datum-uerberpruefung*/
					if( !isEuroDate( formalias[i].value ) ){
						if( isValid ){
							/*erste feld merken*/
							breakField = i;
							breakFocus = true;
							if( formalias[i].alt != ""){
								breakText = formalias[i].alt;
								}
							else{
								breakText = "Das Datum ist nicht korrekt (Format: dd.mm.yyyy)";
								}
							}
						/*fehlerhafter eintrag - klasse setzen */
						formalias[i].className += " formerror";
						isValid = false; 
						}
					}
				else if( formalias[i].className.indexOf("iseurotime") != -1 ){
					/*replace separator char*/
					formalias[i].value = formalias[i].value.replace(/[\s\.]/g,":");
					
					/*zeit-uerberpruefung*/
					if( !isEuroTime( formalias[i].value ) ){
						if( isValid ){
							/*erste feld merken*/
							breakField = i;
							breakFocus = true;
							if( formalias[i].alt != ""){
								breakText = formalias[i].alt;
								}
							else{
								breakText = "Die Zeit ist nicht korrekt (Format: HH:mm)";
								}
							}
						/*fehlerhafter eintrag - klasse setzen */
						formalias[i].className += " formerror";
						isValid = false; 
						}
					}
				else if( formalias[i].className.indexOf("isahv") != -1 ){
					/*replace separator char*/
					formalias[i].value = formalias[i].value.replace(/[\s\/\-]/g,".");
					
					/*ahv-uerberpruefung*/
					if( !isAHV( formalias[i].value ) ){
						if( isValid ){
							/*erste feld merken*/
							breakField = i;
							breakFocus = true;
							if( formalias[i].alt != ""){
								breakText = formalias[i].alt;
								}
							else{
								breakText = "Die AHV Nummer ist nicht korrekt (Format: XXX.XX.XXX.XXX)";
								}
							}
						/*fehlerhafter eintrag - klasse setzen */
						formalias[i].className += " formerror";
						isValid = false; 
						}
					}
				else if (formalias[i].type == 'checkbox'){ 
					var b = 0; 
					var objName = document.getElementsByName(formalias[i].name)
					for(j=0;j<objName.length;j++){ 
						if(objName[j].checked){ 
							b++; 
							} 
						} 
					if(!b){ 
						if(isValid ){
							/*erste feld merken*/
							breakField = i;
							if( formalias[i].alt != ""){
								breakText = formalias[i].alt;
								}
							else{
								breakText = "Auswahl erwartet";
								}
							}
						/*fehlerhafter eintrag - klasse setzen */
						formalias[i].className += " formerror";
						isValid = false; 
						} 
					} 
				else if (formalias[i].type == 'radio'){ 
					var b = 0; 
					var objName = document.getElementsByName(formalias[i].name)
					for(j=0;j<objName.length;j++){ 
						if(objName[j].checked){ 
							b++; 
							} 
						} 
					if(!b){ 
						if(isValid ){
							/*erste feld merken*/
							breakField = i;
							if( formalias[i].alt != ""){
								breakText = formalias[i].alt;
								}
							else{
								breakText = "Auswahl erwartet";
								}
							}
						/*fehlerhafter eintrag - klasse setzen */
						formalias[i].className += " formerror";
						isValid = false; 
						} 
					} 
				} 
				
			if(formalias[i].type == 'hidden' && formalias[i].name !='rows' && formalias[i].name !='security'){ 
				formalias[i].disabled = false; 
				} 
			} 
		/* file-upload beruecksichtigen */
		if(document.getElementById('filefields')){
			var aryFF = getV('filefields').split(',');
			for(var i=0; i<aryFF.length; i++){
				var el = getE(aryFF[i]);
				if(!isAllowedAttachment(aryFF[i])){
					isValid = false;
					el.className += " formerror";
					if( el.alt != ""){
						breakText = el.alt;
						}
					else{
						breakText = "Nicht zugelassenes Dateiformat";
						}
					}
				}
			}
		} 
	if(isValid){
		if(actForm.action.indexOf("cfmail") != -1){
			/*werte verschluesseln fuer den versand*/
			for(i=0;i<actForm.length;i++){ 
				if(formalias[i].type != 'hidden' && formalias[i].value != '' && formalias[i].type != 'submit') { 
					if(formalias[i].selectedIndex){
						formalias[i][formalias[i].selectedIndex].value = setKey(formalias[i].value);
						} 
					else {
						formalias[i].value = setKey(formalias[i].value);
						} 
					} 
				}
			}
			return true;
		}
	else {
		/* Formular nicht in Ordnung */
		alert(breakText);
		if(breakFocus){
			formalias[breakField].focus();
			}
		return false;
		}
	} 

function isEmail(s){
	var usr = "(['_a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+(\.['_a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+)*|[^\\\\\x80-\xff\015\012\"]|\\\\[^\x80-\xff])";
	var domain = "([a-zA-Z0-9][a-zA-Z0-9\._-]*\.)*[a-zA-Z0-9][a-zA-Z0-9\._-]*\.[a-zA-Z]{2,5}";
	var regex = "^"+usr+"\@"+domain+"$";
	var myrxp = new RegExp(regex);
	var isValid = (myrxp.test(s));
 	return(isValid);
	}
function isNumber(s){
	var isValid = true;
	var num = s.match(/[^0-9,\.]/gi)
	var dot = s.match(/\./g);
	var com = s.match(/,/g);
	if (num!=null) {
		isValid = false;
		}
	else if ((dot!=null)&&(dot.length>1)) {
		isValid = false;
		}
	else if ((com!=null)) {
		isValid = false;
		}
	else if ((com!=null)&&(dot!=null)) {
		isValid = false;
		}
	return isValid;
	}

function isEuroDate(s)
{
	var isValid = false;
	var arrMDays = new Array(0,31,28,31,30,31,30,31,31,30,31,30,31);
	var arrDate = new Array();
	
	if(s.match(/^\d{2}\.\d{2}\.\d{4}$/))
	{
		arrDate = s.split(".");
		
		//check if it's a leap year
		if(isLeapYear(arrDate[2]))
			arrMDays[2] = 29;
		
		//remove '0' from month if necessary
		if(arrDate[1].indexOf("0") == 0)
			arrDate[1] = arrDate[1].substr(1,1);
		
		//check if date is possible
		if
		(
			arrDate[1] > 0 && arrDate[1] < 13
			&& arrDate[0] > 0 && arrDate[0] <= arrMDays[arrDate[1]]
		)
		{isValid = true;}
	}
	
	return isValid;
}

function isEuroTime(s)
{
	var isValid = false;
	var arrTime = new Array();
	
	if(s.match(/^\d{2}\:\d{2}$/))
	{
		arrTime = s.split(":");
		//remove first '0'
		if(arrTime[0].indexOf("0") == 0)
			arrTime[0] = arrTime[0].substr(1,1);
		if(arrTime[1].indexOf("0") == 0)
			arrTime[1] = arrTime[1].substr(1,1);
		
		if
		(
		   	arrTime[0] >= 0 && arrTime[0] < 24
			&& arrTime[1] >= 0 && arrTime[1] < 60
		)
		{isValid = true;}
	}
	
	return isValid;
}

function isEuroDateTime(s)
{
	var isValid = false;
	var arrDateTime = new Array();
	
	if(s.indexOf(" ") != -1)
	{
		arrDateTime = s.split(" ");
		if(arrDateTime.length == 2)
		{
			isValid = (isEuroDate(arrDateTime[0]) && isEuroTime(arrDateTime[1]));
		}
	}
	
	return isValid;
}
function isAllowedAttachment(filename){
	var lstDenied = 'exe,pif,bat,scr,lnk,com,hta,cpl,cab,msi,chm,cmd,hlp,inf,inf,vbs,vbe,vb,wsh,wsf,wsf,wsc,js,ani,ico,wmf,dll';
	var lstAllowed = '';
	var i = 0;
	var aryDenied;
	var aryAllowed;
	var restrict=true;
	if(getE('deniedattachements')){
		lstDenied = getV('deniedattachements');
		}
	aryDenied = lstDenied.split(',');
	if(getE('allowedattachements')){
		lstAllowed = getV('allowedattachements');
		aryAllowed = lstAllowed.split(',');
		restrict=false;
		}
	if(restrict){
		for(var f=0; f<aryDenied.length; f++){
			if(getV(filename).toLowerCase().indexOf('.'+aryDenied[f].toString()) != -1){
				return false;
				}
			}
		}
	else{
		for(var f=0; f<lstAllowed.length; f++){
			if(getV(aryFields[i])!='' || getV(aryFields[i]).toLowerCase().indexOf('.'+lstAllowed[f].toString()) != -1){
				return true;
				}
			}
		return false;
		}
	return true;
	}

function isLeapYear(j) {return ((j % 4 == 0) && ((j % 100 != 0) || (j % 400 == 0)));}
function isPLZ4(s){if(isNaN(s) == true || s.length != 4){return false;} return true}
function isPLZ5(s){if(isNaN(s) == true || s.length != 5){return false;} return true}
function isAHV(s)
{
	/* prueft AHV Nummer (bis Juli 2008: isAHVOld, ab Juli 2008: isAHVNew) */
	if(isAHVOld(s) || isAHVNew(s))
		return true;
	else
		return false;
}
function isAHVOld(s)
{
	/* prueft auf alte AHV Nummer, bis Juli 2008 */
	var arrWeight = new Array(5,4,3,2,7,6,5,4,3,2);
	var i = 0;
	var intAHVLength = 10;
	var isValid = false;
	var intPZ = -1;
	var intSum = 0;
	
	if(s.match(/^\d{3}\.\d{2}.\d{3}\.\d{3}$/))
	{
		s = s.replace(/\./g,"");
		for(i = 0; i < intAHVLength; i++)
		{
			intSum = intSum + s.substr(i,1) * arrWeight[i];
		}
		//berechne pruefzahl
		intPZ = 11 - (intSum % 11);
		if(intPZ == 11)intPZ = 0;
		
		if(intPZ == s.substr(intAHVLength,1))
		{isValid = true;}
	}
	
	return isValid;
}
function isAHVNew(s)
{
	/* prueft auf neue AHV Nummer, ab Juli 2008 */
	return false;
}