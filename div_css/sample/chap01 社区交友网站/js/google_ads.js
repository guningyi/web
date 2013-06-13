google_ad_client = 'icq_js';
google_kw_type = 'broad';
google_ad_output = 'js';
//google_max_num_ads = 16;
google_page_url = '';
google_hints     = '';
google_safe      = 'high';
//google_encoding  = 'utf8';
//google_ad_channel = 'main1';
google_ad_width = 0;
google_ad_height = 0;
gl_google_ads_loaded = false;
gl_wait_for_ads = true;
//google_adtest = 'on'; // remove when going live *********************************************************************************************

setTimeout('check_google_loaded()', 8000);


function substitude_google_ads()
{
		document.getElementById('add-0-1').innerHTML = "The ICQ Survey Center";
		document.getElementById('add-0-2').innerHTML = "What do you like most<br>about ICQ 5?";
		document.getElementById('add-0-3').innerHTML = "<a href='http://www.icq.com/survey/' class='underline' target='icq'><b>Tell Us!</b></a>";
		for(i = 1; i < google_max_num_ads; i++)
		{
			document.getElementById('add-'+i+'-1').innerHTML = "";
			document.getElementById('add-'+i+'-2').innerHTML = "";
			document.getElementById('add-'+i+'-3').innerHTML = "";
		}
}

function google_ad_request_done(google_ads) 
{
	try
	{
		if (google_ads.length > 0 && gl_wait_for_ads)
		{
			ads_num = google_ads.length;
			for(i = 0; i < ads_num; i++)
			{
				document.getElementById('add-'+i+'-1').innerHTML = "<a target='google' href='../tings/greetings.icq.com/js/"+ google_ads[i].url + "' class='ad3-1-lnk'>" + google_ads[i].line1+ "</a>";
				document.getElementById('add-'+i+'-2').innerHTML = "<a target='google' href='../tings/greetings.icq.com/js/"+ google_ads[i].url + "' class='ad3-2-lnk'>" + google_ads[i].line2 + " " + google_ads[i].line3 + "</a>";
				document.getElementById('add-'+i+'-3').innerHTML = "<a target='google' href='../tings/greetings.icq.com/js/"+ google_ads[i].url + "' class='ad3-3-lnk'>" + google_ads[i].visible_url+ "</a>";
				try{
				document.getElementById('add-'+i).style.display = "block";
				}catch(e){}
			}
		}
		else
		{
			substitude_google_ads();
		}
		gl_google_ads_loaded = true
	}
	catch(e){}
	gl_google_ads_loaded = true;
}

function check_google_loaded()
{
	try
	{
		if(!gl_google_ads_loaded)
		{
			gl_wait_for_ads = false;
			substitude_google_ads();
		}
	}
	catch(e){}	
}