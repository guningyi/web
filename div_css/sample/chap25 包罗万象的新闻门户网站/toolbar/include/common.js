//==================================================
// 共用的 JavaScript 函數:
//  * 另開視窗的相關函數
//  * 控制顯示或隱藏的相關函數
//  * Button的連結
//  * 分頁下拉式選單的連結
//  * 檢驗字元數, 去掉前後空白
//  * 檢驗URL
//  * 檢驗日期
//  * 檢驗統一編號
//  * 檢驗是否為半形數字
//  * 檢驗是否為半形英文或數字
//  * 檢驗身分證字號(登入時)
//==================================================

//另開視窗的相關函數 START
  function popUpCenteredWindow(urlName)
  {
	var iMyWidth;
    var iMyHeight;
    iMyWidth = (window.screen.width/2) - (366 + 10); 
    iMyHeight = (window.screen.height/2) - (169 + 50);
	var Win2 = window.open(urlName,"","toolbar=no,height=480,width=660,left=" + iMyWidth + ",top=" + iMyHeight + ",screenX=" + iMyWidth + ",screenY=" + iMyHeight + ",directories=no,status=no,scrollbars=yes,resize=yes,menubar=no");
  }
  
  function popUpCenteredWindow2(urlName)
  {
	var iMyWidth;
    var iMyHeight;
    iMyWidth = (window.screen.width/2) - (366 + 10); 
    iMyHeight = (window.screen.height/2) - (169 + 50);
	var Win2 = window.open(urlName,"","toolbar=no,height=600,width=1000,left=" + iMyWidth + ",top=" + iMyHeight + ",screenX=" + iMyWidth + ",screenY=" + iMyHeight + ",directories=no,status=no,scrollbars=yes,resize=yes,menubar=no");
  }  
  
  function MM_openBrWindow(theURL,winName,features)
  { //v2.0
    window.open(theURL,winName,features);
  }

  function MM_goToURL()
  { //v3.0
    var i, args=MM_goToURL.arguments; document.MM_returnValue = false;
    for (i=0; i<(args.length-1); i+=2) eval(args[i]+".location='"+args[i+1]+"'");
  }
//另開視窗的相關函數 END



//控制顯示或隱藏的相關函數 START
  function View_resume(x,img_open,img_close)
  {
    if (eval("d0"+x).style.display == "")
    {
      eval("d0"+x).style.display = "none";
      eval("document.img_"+x).src = "img/"+img_open;
    }
    else
    {
      eval("d0"+x).style.display = "";
      eval("document.img_"+x).src = "img/"+img_close;
    }
  }
  
  function div_display(x)
  {
    eval("d0"+x).style.display="";
  }
  
  function div_hidden(x)
  {
    eval("d0"+x).style.display="none";
  }
//控制顯示或隱藏的相關函數 END



//Button的連結 START
  function MM_goToURL()
  { //v3.0
    var i, args=MM_goToURL.arguments;
	document.MM_returnValue = false;
    for (i=0; i<(args.length-1); i+=2)
	  eval(args[i]+".location='"+args[i+1]+"'");
  }
//Button的連結 START



//分頁下拉式選單的連結 START
  //location.href
  function jumplist(it)
  {
    if(it.options[it.selectedIndex])
    {
      var dest=it.options[it.selectedIndex].value;
      location.href=dest;
    }
    else
      it.selectedIndex=0;
  }

  //form.submit
  function jump_page(PAGE_SELECT,FORM)
  {
    if (PAGE_SELECT.options[PAGE_SELECT.selectedIndex])
    {
      FORM.action=PAGE_SELECT.options[PAGE_SELECT.selectedIndex].value;
      FORM.submit();
    }
    else
      PAGE_SELECT.selectedIndex=0;
  }
//分頁下拉式選單的連結 START



//檢驗字元數 START
  //檢驗字元數   obj=物件 ; maxlen=字元數限制 ; subject=欄位標題
  function charlen(obj,maxlen,subject)
  {
	var cnt=0;
	var str=trim(obj.value);
	
	for(var i=0;i<str.length;i++)
	{
		if (escape(str.charAt(i)).length>=4)
		  cnt+=2;
		else
		  cnt+=1;
	}
	
	if (cnt>maxlen)
	{
		alert(subject+" : 請勿超過"+parseInt(maxlen/2)+"個中文或"+maxlen+"個英數字！");
		obj.focus();
		return false;
	}
	
	return true;
  }
  

  //檢驗字元數   obj=物件 ; maxlen=字元數限制 ;
  function charlenCheck(obj,maxlen)
  {
	var cnt=0;
	var str=trim(obj.value);
	
	for(var i=0;i<str.length;i++)
	{
		if (escape(str.charAt(i)).length>=4)
		  cnt+=2;
		else
		  cnt+=1;
	}
	
	if (cnt>maxlen)
	{
		return false;
	}	
	return true;
  }

  //去掉前後空白
  function trim(str)
  {
	var len=str.length;
	var lpos=0,rpos=len-1;
	var newstr;
	
	if (len > 0)
	{
		while (str.charAt(lpos) == " ")
			lpos++;
	
		while (str.charAt(rpos) == " ")
			rpos--;

		if (rpos >= lpos)
			newstr = str.substring(lpos,rpos+1);
		else
			newstr = "";
	}
	else
		newstr = "";

	return newstr;
  }
//檢驗字元數 END



//檢驗URL START
  function checkURL(str)
  {
    var data = str.match(/(http|ftp|https):\/\/.+/);
	if(!data || !str) return false;
    return true;
  }
//檢驗URL END



//檢驗日期 START
  function daynumber(whichyear,whichmonth)
  {
    montht = parseInt(whichmonth);
    yeart = parseInt(whichyear);
    switch(montht)
    {
      case 1:
	        return 31;
      case 2:
            if((yeart % 4) == 0)
            {
              if(((yeart % 100) == 0) && !((yeart % 400 == 0)))
              { 
                return 28;
              }
              else
              {
                return 29;
              }         
            }
            else
            {
              return 28;
            }  
      case 3:
            return 31;
      case 4:
            return 30;
      case 5:
            return 31;
      case 6:
	        return 30;
	  case 7:
            return 31;
      case 8:
            return 31;
      case 9:
            return 30;
      case 10:
	        return 31;
	  case 11:
            return 30;
      case 12:
            return 31;
      default:
	        return 0;
    }        
  }
//檢驗日期 END



//檢驗統一編號 START
  function check_invoice(form)
  {
    if(form.invoice.value.length<8)
      return false;

    var logic=new Array(8);//邏輯乘數
    logic[0]=1;
    logic[1]=2;
    logic[2]=1;
    logic[3]=2;
    logic[4]=1;
    logic[5]=2;
    logic[6]=4;
    logic[7]=1;
	
    var invoice=new Array(8); //表單的統一編號
    var temp1=new Array(8);//乘積1
    var temp2=new Array(8);//乘積2
    for(i=0;i<8;i++)
    {
      temp1[i]=0;
      temp2[i]=0;
    }
	
    for(i=0;i<8;i++)
    {
      var logic_sum=0;//統一編號與邏輯乘數相乘之和
      logic_sum=logic[i]*parseInt(form.invoice.value.substr(i,1));
      if(logic_sum>=10)
      {
	    var tempstr=''+logic_sum;
	    temp1[i]=parseInt(tempstr.substr(0,1));
	    temp2[i]=parseInt(tempstr.substr(1,1));
      }
      else
        temp1[i]=logic_sum;
    }

    var sum1=new Array(8);
    var sum2=new Array(8);
    for(i=0;i<8;i++)
    {
      sum1[i]=0;
      sum2[i]=0;
    }
    var j;
    for(i=0;i<8;i++)
    {
      var sum_temp=0;
      sum_temp=temp1[i]+temp2[i];
      if(sum_temp>=10)
      {
 	    var tempstr=''+sum_temp;
	    sum1[i]=parseInt(tempstr.substr(0,1));
	    sum2[i]=parseInt(tempstr.substr(1,1));
	    j=i;
      }
      else
        sum1[i]=sum_temp;
    }

    var total1=0;
    var total2=0;
    for(i=0;i<8;i++)
    {
      total1=total1+sum1[i];
      if(i != j)
 	    total2=total2+sum1[i];
      else
        total2=total2+sum2[i];
    }

    if((total1 % 10 ==0 && total1 != 0) || (total2 % 10 ==0 &&total2 != 0) )//是否能被10整除
      return true;
    else
      return false;
  }
//檢驗統一編號 END



//檢驗是否為半形數字 START
  function isNum(str1)
  {
    var str2="1234567890";
    for (i=0 ; i< str1.length ; i++ )
    {
      if (str2.indexOf(str1.substring(i,i+1))==-1)
      {
        return false;   //只要有一個字元不是半形數字就傳回false                     
      }   
    }
    return true;
  }  
//檢驗是否為半形數字 END


//檢驗是否為半形英文或數字 START
  function isNumEng(str1)
  {
    var str2="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (i=0 ; i< str1.length ; i++ )
    {
      if (str2.indexOf(str1.substring(i,i+1))==-1)
      {
	    return false;   //只要有一個字元不是半形英文或數字就傳回false                     
      }   
    }
    return true;
  }  
//檢驗是否為半形英文或數字 END



//檢驗身分證字號(登入時) START
  function iseng(a)
  {
    var big = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var x="abcdefghijklmnopqrstuvwxyz";
    if ((a.length == 1) && ((big.indexOf(a) != -1) || (x.indexOf(a) != -1)))
      return true;
    else
      return false;
  }

  function isnum(d)
  {
    var digit = "0123456789"
    if ((d.length == 1) && (digit.indexOf(d) != -1))
      return true;
    else
      return false;
  }

  function id_check(id)
  {
    if (id.length == 10)
    {
      if ((iseng(id.charAt(0))) && ((id.charAt(1) == "1") || (id.charAt(1) == "2")) &&
		  (isnum(id.charAt(2))) && (isnum(id.charAt(3))) && (isnum(id.charAt(4))) && (isnum(id.charAt(5))) &&
	 	  (isnum(id.charAt(6))) && (isnum(id.charAt(7))) && (isnum(id.charAt(8))) && (isnum(id.charAt(9))))
        return true;
      else
        return false;
    }
    else
      return false;
  }
//檢驗身分證字號(登入時) END