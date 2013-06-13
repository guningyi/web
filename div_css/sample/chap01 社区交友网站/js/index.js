var gl_nav_button_array = new Array;

function change_show_mode()
{
	advanced_status = document.getElementById('advanced').style.display
	if(advanced_status == 'block')
	{
		advanced_status = 'none';
		basic_status = 'block';
	}
	else
	{
		advanced_status = 'block';
		basic_status = 'none';
	}

	document.getElementById('advanced').style.display = advanced_status;
	document.getElementById('advanced_txt').style.display = basic_status;
	document.getElementById('basic_txt').style.display = advanced_status;
}

function make_combo_sync(from_id,to_id)
{
	document.getElementById(to_id).selectedIndex = document.getElementById(from_id).selectedIndex;
}

function submit_search(type_of_search)
{
	if(type_of_search == 'date')
	{
		if(document.getElementById('my_gender').value == 0) // select your gender
		{
			alert(get_text('people_main','must_select_gender'));
			document.getElementById('my_gender').focus();
			return false;
		}
		if(document.getElementById('match').value == 0) // select match gender
		{
			alert(get_text('people_main','must_select_match')); 
			document.getElementById('match').focus();
			return false;
		}
		//empty unnedded fileds
		document.getElementById('keyword').value = '';
		document.getElementById('uin').value = '';
	}
	else if(type_of_search == 'friend')
	{
		document.getElementById('keyword').value = '';
		document.getElementById('my_gender').value = 0;
		document.getElementById('m_status').value = '';
	}
	document.getElementById('user_search').submit();
}

function openmenu ( but_id ) 
{

	try
	{
		if (document.getElementById(but_id).style.display == "block") //close the button
		{
			document.getElementById(but_id).style.display = "none";
			document.getElementById(but_id+'-ar').style.display = "block";
		}
		else  //open the button and close all the other buttons
		{
			for(var j in gl_nav_button_array)
			{
				if (j != but_id && document.getElementById(j).style.display == "block")
				{ //close the button
					document.getElementById(j).style.display = "none";
					document.getElementById(j+'-ar').style.display = "block";
				}
			}
			document.getElementById(but_id).style.display = "block";
			document.getElementById(but_id+'-ar').style.display = "none";
		}
	}
	catch(e){}
}