function isUrl(s) {
    var regexp = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/
    return regexp.test(s);
}

function share(nod) {

 var title = encodeURI($('[id$=hdnPageTitle]').val());   
 var url = escape($('[id$=hdnPageUrl]').val());   
 var options = "height=700,width=800,titlebar=no,status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=1";
 var mURL=''; 
  if(nod==1)     
	 mURL="http://www.facebook.com/sharer.php?title=" + title + "&amp;u=" + url;    
  
  if(nod==2)      
    mURL="http://www.google.com/bookmarks/mark?op=edit&amp;bkmk=" + url + "&amp;title=" + title;     
  
  if(nod==3)    
    mURL="http://myweb2.search.yahoo.com/myresults/bookmarklet?&amp;u=" +url+ "&amp;t=" + title;      
  
  if(nod==4)    
    mURL="http://www.mixx.com/submit/story?title="+title+"&amp;page_url="+url+"&amp;description=";      
  
  if(nod==5)      
    mURL="http://digg.com/submit?url="+url+"&amp;title=" + title;    
  
  if(nod==6)    
    mURL="http://www.stumbleupon.com/submit?url="+url+"&amp;title=" + title;     
  
  if(nod==7)     
    mURL="http://del.icio.us/post?url="+url+"&amp;title=" + title;     
  
  if(nod==8)     
	  mURL="http://reddit.com/submit?url="+url+"&amp;title=" + title;  
	     
   if(nod==9)      
	 mURL="http://twitter.com/home?status=" + title + "+" + url;
	 
   if(nod==10)      
	mURL="http://www.myspace.com/Modules/PostTo/Pages/?l=2&amp;u=" +url+ "&amp;t="+title+"&amp;c="+title;   
	   
   if(nod==11)     
        mURL="http://friendfeed.com/share/bookmarklet/frame#title=" + title + "&amp;url="+url;
	
	window.open(mURL.replace(/amp;/gi,''),null,options);
}

function blogshare(nod, title, url) {
    var title = encodeURI(title);  
    var url = escape(url);   
    var options = "height=700,width=800,titlebar=no,status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=1";
    
    var mURL=''; 
  if(nod==1)     
	 mURL="http://www.facebook.com/sharer.php?title=" + title + "&amp;u=" + url;    
  
  if(nod==2)      
    mURL="http://www.google.com/bookmarks/mark?op=edit&amp;bkmk=" + url + "&amp;title=" + title;     
  
  if(nod==3)    
    mURL="http://myweb2.search.yahoo.com/myresults/bookmarklet?&amp;u=" +url+ "&amp;t=" + title;      
  
  if(nod==4)    
    mURL="http://www.mixx.com/submit/story?title="+title+"&amp;page_url="+url+"&amp;description=";      
  
  if(nod==5)      
    mURL="http://digg.com/submit?url="+url+"&amp;title=" + title;    
  
  if(nod==6)    
    mURL="http://www.stumbleupon.com/submit?url="+url+"&amp;title=" + title;     
  
  if(nod==7)     
    mURL="http://del.icio.us/post?url="+url+"&amp;title=" + title;     
  
  if(nod==8)     
    mURL="http://reddit.com/submit?url="+url+"&amp;title=" + title;  
	     
  if(nod==9)      
    mURL="http://twitter.com/home?status=" + title + "+" + url; 
	 
  if(nod==10)      
	mURL="http://www.myspace.com/Modules/PostTo/Pages/?l=2&amp;u=" +url+ "&amp;t="+title+"&amp;c="+title;   
	   
  if(nod==11)     
    mURL="http://friendfeed.com/share/bookmarklet/frame#title=" + title + "&amp;url="+url;
	
	window.open(mURL.replace(/amp;/gi,''),null,options);
}