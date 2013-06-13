var open_cat_flag;

// create by chico
function ltrim( s ){return s.replace( /^\s*/, "" )}
function rtrim( s ){return s.replace( /\s*$/, "" );}
function trim ( s ){return rtrim(ltrim(s));}

// the function has been changed, it's not depenent on titles now
function open_sub_cat(cat_id)
{
	var ul = document.getElementById('left_menu');
	if(!open_cat_flag) 
	{
		var selected_cat = document.getElementById('sel_cat');
		if(ul.childNodes[0].id != 'sel_cat') // the selected category is not main
		{
			selected_cat.id = 'top_'+selected_cat.getAttribute("name");
			open_cat_flag = selected_cat.getAttribute("name");
		}
	}
	var category = document.getElementById(cat_id);
	var top_cat = document.getElementById('top_'+cat_id);
	var cat_img = document.getElementById(cat_id+'_img');
	var cat_link = document.getElementById('lnk_'+cat_id);
	if(category.style.display == 'block' || category.style.display == '') 
	{
		cat_img.style.display = 'inline';
		category.style.display = 'none';
		top_cat.className = 'cat-nav-2-1';
		cat_link.className = '';
	} 
	else 
	{
		if(open_cat_flag && document.getElementById(open_cat_flag+'_img')) 
		{
			document.getElementById(open_cat_flag+'_img').style.display = 'inline';
			document.getElementById(open_cat_flag).style.display = 'none';
			document.getElementById('top_'+open_cat_flag).className = 'cat-nav-2-1';
			document.getElementById('lnk_'+open_cat_flag).className = '';
		}
		else if (open_cat_flag && !document.getElementById(open_cat_flag+'_img'))
		{
			document.getElementById('top_'+open_cat_flag).className = 'cat-nav-2-1';
		}
		open_cat_flag = cat_id;
		cat_img.style.display = 'none';
		category.style.display = 'block';
		top_cat.className = 'cat-nav-2-1-on';
		cat_link.className = 'on';
	}
}

function set_cards_order(order_id, cat_id)
{
	var url = document.location.href;
	url = url.replace(/\d\.htm/, '');
	url = url.replace(/order_\d/,'');
	url = url.replace(/\/\/$/,'\/');
	if (document.getElementById('search_word').value == '')
	{
		document.location=url+'order_'+order_id+'/';
	}
	else
	{
		document.all.search.action =url+'order_'+order_id+'/';
		document.all.search.submit();
	}
}

function get_page_url(page)
{
	var url = document.location.href;
	url = url.replace(/\d\.htm/, '');
	document.all.search.action = url+page+'.htm';
	document.all.search.submit();
}

function launch_cards_search()
{
	var word = document.getElementById("card_search").value.replace(/^\s+|\s+$/g, '');
	if (word.length)
	{
			document.getElementById('search_word').value = word;
			document.all.search.action = '/greetings/';
			document.all.search.submit();
	}
	return false;
}

function show_rating(card_id,img_id)
{
	for( i=1; i<=img_id; i++) 
	{
		document.getElementById('img_'+card_id+'_'+i).style.display = 'none';
		document.getElementById('img_'+card_id+'_'+i+'_on').style.display = 'inline';
	}
}

function hide_rating(card_id)
{
	for( i=1; i<=5; i++) 
	{
		document.getElementById('img_'+card_id+'_'+i).style.display = 'inline';
		document.getElementById('img_'+card_id+'_'+i+'_on').style.display = 'none';
	}
}

function rate_card(card_id, rating)
{
	var rating_html = new String();
	var raters = $('#card_raters_num').html();
	var rating_old = $('#card_raters_num').attr('rtng');
	//send new rating in ajax
	$.post('/greetings/cards/'+card_id,
	{card_rating: rating, card_raters:raters, rating_old:rating_old},
	function(xml)
	{
		if (xml!='')
		{
			var tmp = new Array();
			tmp = xml.split('@@');
			$('#rate_text').html(tmp[0]);
			for( i=1; i<=rating; i++) 
			{
				$('#img_'+card_id+'_'+i+'_on').css('display', 'inline');
				rating_html += $('#img_'+card_id+'_'+i+'_on').html();
				$('#img_'+card_id+'_'+i).css('display', 'none');
			}
			for (i=rating+1;i<=5;i++)
			{
				rating_html += $('#img_'+card_id+'_'+i).html();
			}
			$('#new_rating_stars').html(rating_html);
			$('#card_raters_num').html(parseInt(raters)+1);
			var rating_stars = draw_rating_stars(tmp[1]);
			$('#card_rating_stars').html(rating_stars);
		}
	;}
	);
}

function draw_rating_stars(rating) 
{
	rating = Math.round(rating*10);

	if(rating%5 >=3 )
		rating = rating-rating%5+5;
	else
		rating = rating-rating%5;
	rating = rating/10;

	rating_stars = '';
	for(i = 0 ; i < 5 ; i++) 
	{
		if(rating-i>0.5)
			rating_stars += '<img src="http://c.icq.com/greetings/img/star_full.gif" border="0" width="10" height="9" alt=""> ';
		else
			if(rating-i == '0.5')
				rating_stars += '<img src="http://c.icq.com/greetings/img/star_half.gif" border="0" width="10" height="9" alt=""> ';
			else
				rating_stars += '<img src="http://c.icq.com/greetings/img/star_empty.gif" border="0" width="10" height="9" alt=""> ';
	}
	
	return rating_stars;
}

function text_limit(field, maxlen) 
{
	if (field.value.length > maxlen)
		field.value = field.value.substring(0, maxlen);
}

function comment_focus()
{
	$('#comment_body').focus();
	$('#comments_login').focus();
}

function change_offers(num)
{
	$('div[@id*="offers"]').each(function()
	{
		$(this).css('display', 'none');
	});
	$('div[@id*="offer-img"]').each(function()
	{
		$(this).css('background-color', '#F7ACAC');	
	});
	$('#offers-'+num).css('display', 'block');
	$('#offer-img-'+num).css('background-color', '#F8D8D3');
	
}

// for the old Flash cards
function logo()
{
	window.location.href = "http://www.icq.com/greetings/";
}