var http_request = false;
var xmldoc = false;

function make_http_request() {
	http_request = false;

	if (window.XMLHttpRequest)  // Mozilla, Safari,...
	{
	    http_request = new XMLHttpRequest();
	    if (http_request.overrideMimeType) 
	        http_request.overrideMimeType('text/xml');
	} 
	else if (window.ActiveXObject)  // IE
	{
	    try {http_request = new ActiveXObject("Msxml2.XMLHTTP");} 
	    catch (e)
	    {
	        try {http_request = new ActiveXObject("Microsoft.XMLHTTP");}
	        catch (e) {}
	    }
	}
	return http_request;
}

function createXMLroot() {

	if (window.ActiveXObject) // code for IE*/
	{
	 	xmldoc = new ActiveXObject("Microsoft.XMLDOM");
		xmldoc.async="false";
		xmldoc.loadXML(xml);
	}
	else if(window.XMLHttpRequest)//for MOZILLA
	{
		xml = xml.replace(/<\?(.*)\?>/,'');//delete the xml header
		var dom  = new DOMParser();
		xmldoc = dom.parseFromString(xml,'text/xml');
	}
}

function show_rating(post_id,img_id){
	for( i=1 ; i<=img_id ; i++) {
		document.getElementById('img_'+post_id+'_'+i).style.display = 'none';
		document.getElementById('img_'+post_id+'_'+i+'_on').style.display = 'inline';
	}
}

function hide_rating(post_id){
	for( i=1 ; i<=5 ; i++) {
		document.getElementById('img_'+post_id+'_'+i).style.display = 'inline';
		document.getElementById('img_'+post_id+'_'+i+'_on').style.display = 'none';
	}
}

// Rate a post
function rate_post(post_id,rating) {

	http_request = make_http_request();
    if (http_request != null) 
    {
    	url = "/blogs/http_request.php?action=rating&post="+post_id+"&rating="+rating;
		http_request.onreadystatechange = finish_rate_post;
		http_request.open('GET', url, true);
		http_request.send(null);
	}
	
}

function finish_rate_post() {
	try
	{
		if (http_request.readyState == 4)
		{
			if (http_request.status == 200)			// only if "OK"
			{
				xml = http_request.responseText;
				createXMLroot();
				var results = xmldoc.getElementsByTagName('results');
				if(results.length > 0)
				{
					// Get the new rating values
					var blog_rating_node = results[0].getElementsByTagName('blog_rating');
					if(blog_rating_node.length > 0)
						blog_rating = blog_rating_node[0].childNodes[0].nodeValue;	
						
					var blog_raters_node = results[0].getElementsByTagName('blog_raters');
					if(blog_raters_node.length > 0)
						blog_raters = blog_raters_node[0].childNodes[0].nodeValue;
					
					var post_rating_node = results[0].getElementsByTagName('post_rating');
					if(post_rating_node.length > 0)
						post_rating = post_rating_node[0].childNodes[0].nodeValue;
					
					var post_raters_node = results[0].getElementsByTagName('post_raters');
					if(post_raters_node.length > 0)
						post_raters = post_raters_node[0].childNodes[0].nodeValue;
					
					var post_id_node = results[0].getElementsByTagName('post_id');
					if(post_id_node.length > 0)
						post_id = post_id_node[0].childNodes[0].nodeValue;
						
					var rating_node = results[0].getElementsByTagName('rating');
					if(rating_node.length > 0)
						rating = rating_node[0].childNodes[0].nodeValue;
					
					var new_text_node = results[0].getElementsByTagName('new_text');
					if(new_text_node.length > 0)
						new_text = new_text_node[0].childNodes[0].nodeValue;

					if(document.getElementById('blog_raters_no')) {
						document.getElementById('blog_raters_no').innerHTML = blog_raters;
						document.getElementById('blog_rating_stars').innerHTML = draw_rating_stars(blog_rating);
					}
					
					document.getElementById('raters_'+post_id).innerHTML = post_raters;
					document.getElementById('rating_stars_'+post_id).innerHTML = draw_rating_stars(post_rating);
					document.getElementById('rating_'+post_id).style.left = 50;
					rating_stars = '';
					for( i=0 ; i<5 ; i++ ) {
						if(i<rating)
							rating_stars +='<img src="http://c.icq.com/blogs/img/big_star_on.gif" border="0" width="17" height="15" alt="" id="img_1_1"> ';
						else
							rating_stars +='<img src="http://c.icq.com/blogs/img/big_star.gif" border="0" width="17" height="15" alt="" id="img_1_1"> ';
					}
					document.getElementById('rating_'+post_id).innerHTML = new_text+': <span class="no-font">'+rating_stars+'</span>';
				}
				else
					alert(get_text('blogs','sorry_problem'));
			}
		}
	}
	catch(e){}
}

function draw_rating_stars(rating) {
	rating = Math.round(rating*10);

	if(rating%5 >=3 )
		rating = rating-rating%5+5;
	else
		rating = rating-rating%5;
	rating = rating/10;

	rating_stars = '';
	for(i = 0 ; i < 5 ; i++) {
		if(rating-i>0.5)
			rating_stars += '<img src="http://c.icq.com/blogs/img/star_on.gif" border="0" width="10" height="9" alt=""> ';
		else
			if(rating-i == '0.5')
				rating_stars += '<img src="http://c.icq.com/blogs/img/star_half.gif" border="0" width="10" height="9" alt=""> ';
			else
				rating_stars += '<img src="http://c.icq.com/blogs/img/star_off.gif" border="0" width="10" height="9" alt=""> ';
	}
	
	return rating_stars;
}
/* End rate a post */

function open_favorite_box() {
	document.getElementById('fav_box').style.display = 'block';
}

function close_favorite_box() {
	document.getElementById('fav_box').style.display = 'none';
}

// Add blog to favorites list
function add_to_favorite(blog_id) {
	if(document.getElementById('fav_show_public').checked)
		show_public = 1;
	else
		show_public = 0;
	
	/*
	if(document.getElementById('fav_alert').checked)
		get_alert = 1;
	else
		get_alert = 0;
	*/
	get_alert = 0;
	http_request = make_http_request();
    if (http_request != null) 
    {
    	url = "/blogs/http_request.php?action=favorite&blog_id="+blog_id+"&alert="+get_alert+"&public="+show_public;
		http_request.onreadystatechange = finish_add_favorite;
		http_request.open('GET', url, true);
		http_request.send(null);
	}
	
}

function finish_add_favorite() {
	try
	{
		if (http_request.readyState == 4)
		{
			if (http_request.status == 200)			// only if "OK"
			{
				xml = http_request.responseText;
				createXMLroot();
				var results = xmldoc.getElementsByTagName('results');
				
				if(results.length > 0) {
					// Get the div id
					var result = results[0].getElementsByTagName('res');
					if(result.length > 0)
						result = result[0].childNodes[0].nodeValue;	
						
					if(result == 1) {
						var new_text1 = results[0].getElementsByTagName('new_text1');
						if(new_text1.length > 0)
							new_text1 = new_text1[0].childNodes[0].nodeValue;
							
						var new_text2 = results[0].getElementsByTagName('new_text2');
						if(new_text2.length > 0)
							new_text2 = new_text2[0].childNodes[0].nodeValue;
						
						document.getElementById('fav_option').innerHTML = '<span><img src="http://c.icq.com/blogs/img/ic_heart.gif"  width="15" height="15" alt="" class="middle">?'+new_text1+' (<a href="/blogs/favorites/">'+new_text2+'</a>)<br></span>';
					} else
						alert(get_text('blogs','sorry_problem'));
						
					document.getElementById('fav_box').style.display = 'none';
				} else
					alert(get_text('blogs','sorry_problem'));
			}
		}
	}
	catch(e){}
}

// Delete post
function delete_post(post_id,type) {

	http_request = make_http_request();
    if (http_request != null) 
    {
    	url = "/blogs/http_request.php?action=delete&post_id="+post_id+'&page_type='+type;
		http_request.onreadystatechange = finish_delete_post;
		http_request.open('GET', url, true);
		http_request.send(null);
	}
	
}

function finish_delete_post() {
	try
	{
		if (http_request.readyState == 4)
		{
			if (http_request.status == 200)			// only if "OK"
			{
				xml = http_request.responseText;
				createXMLroot();
				var results = xmldoc.getElementsByTagName('results');
				if(results.length > 0)
				{
					var result_node = results[0].getElementsByTagName('result');
					if(result_node.length > 0)
						result = result_node[0].childNodes[0].nodeValue;	
						
					var uin_node = results[0].getElementsByTagName('uin');
					if(uin_node.length > 0)
						uin = uin_node[0].childNodes[0].nodeValue;
						
					var page_type_node = results[0].getElementsByTagName('page_type');
					if(page_type_node.length > 0)
						page_type = page_type_node[0].childNodes[0].nodeValue;
						
					var post_id_node = results[0].getElementsByTagName('post_id');
					if(post_id_node.length > 0)
						post_id = post_id_node[0].childNodes[0].nodeValue;
						
					var post_id_node = results[0].getElementsByTagName('post_id');
					if(post_id_node.length > 0)
						post_id = post_id_node[0].childNodes[0].nodeValue;
						
					if(result == 1) {
						var new_text_node = results[0].getElementsByTagName('new_text');
						if(new_text_node.length > 0)
							new_text = new_text_node[0].childNodes[0].nodeValue;
						
						alert(new_text);
						if(page_type == 'blog') {
							document.getElementById('main_post_'+post_id).style.display = 'none';
						} else
							document.location = "/blogs/"+uin;
					} else
						alert(get_text('blogs','sorry_problem'));

				}
				else
					alert(get_text('blogs','sorry_problem'));
			}
		}
	}
	catch(e){}
}

// clear the Recently visited blogs cookie
function clear_recent_blogs() {
	document.cookie = "recent_blogs=; path=/blogs/; expires=Thu, 01-Jan-70 00:00:01 GMT";
	document.getElementById('d3-rec').style.display = 'none';
}

// Selects all favorite blogs on the page
function check_all_fav(name) {
	formblock= document.getElementById('sortForm');
	forminputs = formblock.getElementsByTagName('input');
	
	if(document.getElementById('select_all').checked == true)
		var value = '1';
		
	for (i = 0; i < forminputs.length; i++) {
		// regex here to check name attribute
		var regex = new RegExp(name, "i");
		if (regex.test(forminputs[i].getAttribute('name'))) {
			if (value == '1') {
				forminputs[i].checked = true;
			} else {
				forminputs[i].checked = false;
			}
		}
	}
}

// Check Favorite Blogs form
function check_fav_form() {
	formblock = document.getElementById('sortForm');
	forminputs = formblock.getElementsByTagName('input');
		
	submit_form = false;
	for (i = 0; i < forminputs.length; i++) {
		if(forminputs[i].name == 'fav_blog[]') {
			if(forminputs[i].checked) {
				submit_form = true;
			}
		}
	}
	if(submit_form)
		//sortForm.submit();
		return true;
	else {
		alert(get_text('blogs','no_blog_selected'));
		return false;
	}
}

// Change posts diaply options
function change_post_display(post_id) {
	if(document.getElementById('display'+post_id).checked) 
		display = '1';
	else
		display = '2';
	
	http_request = make_http_request();
    if (http_request != null) 
    {
    	url = "/blogs/http_request.php?action=display&post_id="+post_id+"&display="+display;
		http_request.onreadystatechange = finish_change_display;
		http_request.open('GET', url, true);
		http_request.send(null);
	}
	
}

function finish_change_display() {
	try
	{
		if (http_request.readyState == 4)
		{
			if (http_request.status == 200)			// only if "OK"
			{
				xml = http_request.responseText;
				createXMLroot();
				var results = xmldoc.getElementsByTagName('results');
				
				if(results.length > 0) {
					var post_privacy = results[0].getElementsByTagName('post_privacy');
					if(post_privacy.length > 0)
						post_privacy = post_privacy[0].childNodes[0].nodeValue;	
					
					var post_id = results[0].getElementsByTagName('post_id');
					if(post_id.length > 0)
						post_id = post_id[0].childNodes[0].nodeValue;	
					
					switch(post_privacy) {
						case '1':
							document.getElementById('post_'+post_id).style.background = 'transparent';
							document.getElementById('spn_display'+post_id).style.background = 'transparent';
							document.getElementById('display_msg_'+post_id).className = 'd1-4-dis';
							document.getElementById('display_msg_'+post_id+'_2').className = 'd1-4-dis';
							break;
						case '2':
							document.getElementById('post_'+post_id).style.background = '#EDEDED';
							document.getElementById('spn_display'+post_id).style.background = '#D5D3D3';
							document.getElementById('display_msg_'+post_id).className = 'd1-4-dis-off';
							document.getElementById('display_msg_'+post_id+'_2').className = 'd1-4-dis-off';
							break;
					}
				} else
					alert(get_text('blogs','sorry_problem'));
			}
		}
	}
	catch(e){}
}
// End Change posts diaply options

function save_form(form_id) {
	if(form_id == 'blogSettings') {
		if(blogSettings.blog_title.value != '')
			document.getElementById(form_id).submit();
		else
			alert(get_text('blogs','enter_blog_ttl'));
	} else {
		document.getElementById(form_id).submit();
	}
}

function cancel_form(uin) {
	if(uin == null)
		uin = '';
	document.location = "/blogs/"+uin;
}


function submit_post(form_name,type) {
	var form = document.getElementById(form_name);
	updateICQED('icqed-message_body');
	
	if(type != 'preview') {
		if(form.post_title.value == '') {
			alert(get_text('blogs','enter_post_ttl'));
			return false;
		}
		if(form.message_body.value == '<br />') {
			alert(get_text('blogs','enter_post_cont'));
			return false;
		}
	}
	
	document.getElementById('sub_type').value = type;
	document.getElementById(form_name).submit();
}

function open_mood_box() {
	document.getElementById('mood_box').style.display = 'block';
}

function close_mood_box(img_id,img_path,img_name) {
	document.getElementById('mood_box').style.display = 'none';
	if(img_id != 0 || img_id != '') {
		document.getElementById('mode_value').value = img_id;
		document.getElementById('mood_txt').innerHTML = '??<img src="../ICQ Blogs/blogs.icq.com/blogs/js/'+img_path+'" alt="'+img_name+'" class="middle"> '+img_name;
	} else {
		document.getElementById('mode_value').value = '';
		document.getElementById('mood_txt').innerHTML = '??'+get_text('blogs','choose_mood');
	}
}

function border_color(mood_div,border_type) {
	if(border_type == 'on') {
		mood_div.style.border = '2px solid #E1CEED';
	} else {
		mood_div.style.border = '2px solid #FFFFFF';
	}
}

// Delete Comment
function delete_tb(tb_id,post_id) {

	http_request = make_http_request();
    if (http_request != null) 
    {
    	url = "/blogs/http_request.php?action=delete_tb&tb_id="+tb_id+"&post_id="+post_id;
		http_request.onreadystatechange = finish_delete_tb;
		http_request.open('GET', url, true);
		http_request.send(null);
	}
	
}

function finish_delete_tb() {
	try
	{
		if (http_request.readyState == 4)
		{
			if (http_request.status == 200)			// only if "OK"
			{
				xml = http_request.responseText;
				createXMLroot();
				var results = xmldoc.getElementsByTagName('results');
				if(results.length > 0)
				{
					var tb_id_node = results[0].getElementsByTagName('tb_id');
					if(tb_id_node.length > 0)
						tb_id = tb_id_node[0].childNodes[0].nodeValue;	
						
					var comments_node = results[0].getElementsByTagName('comments');
					if(comments_node.length > 0)
						comments = comments_node[0].childNodes[0].nodeValue;
						
					document.getElementById('tb_'+tb_id).style.display = 'none';
					document.getElementById('comment_num').innerHTML = comments;

				} else
					alert(get_text('blogs','sorry_problem'));
			}
		}
	}
	catch(e){}
}

// Hide Blog Comments
function hide_comments(post_id) {

	if(document.getElementById('tb_hide_chk').checked)
		hide = 2; // Hide comments
	else
		hide = 1; // Show comments
	http_request = make_http_request();
    if (http_request != null) 
    {
    	url = "/blogs/http_request.php?action=hide_comm&post_id="+post_id+"&hide="+hide;
		http_request.onreadystatechange = finish_hide_comments;
		http_request.open('GET', url, true);
		http_request.send(null);
	}
	
}

function finish_hide_comments() {
	try
	{
		if (http_request.readyState == 4)
		{
			if (http_request.status == 200)			// only if "OK"
			{
				xml = http_request.responseText;
				createXMLroot();
				var results = xmldoc.getElementsByTagName('results');
				if(results.length > 0)
				{
					var hide_chk_node = results[0].getElementsByTagName('hide_chk');
					if(hide_chk_node.length > 0)
						hide_chk = hide_chk_node[0].childNodes[0].nodeValue;	
						
					if(hide_chk == 2) {
						//document.getElementById('tb3-txt').className = 'tb3-txt-hide';
						document.getElementById('tb_hide_chk').checked = true;
					} else {
						//document.getElementById('tb3-txt').className = 'tb3-txt';
						document.getElementById('tb_hide_chk').checked = false;
					}
				} else
					alert(get_text('blogs','sorry_problem'));
			}
		}
	}
	catch(e){}
}

function get_text(dep,sub_dep)
{
	try {
		ret = lang_arr[dep][sub_dep];
	} catch(e){
		alert('1');
		ret = '';
	}
	return ret;
}

function change_to_lang(lang)
{
	var gl_expireDate = new Date;
	gl_expireDate.setMonth(gl_expireDate.getMonth()+1);
	SetCookie("icq_lang", lang , gl_expireDate,"/");
	window.location.reload(true);
}

function textLimit(field, maxlen) {
	if (field.value.length > maxlen + 1)
		alert(get_text('blogs','limit_comment_length'));
	if (field.value.length > maxlen)
		field.value = field.value.substring(0, maxlen);
}