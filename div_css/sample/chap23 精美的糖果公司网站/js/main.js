$ef(function(){
	
	/////////////////////////////////////////////////////////////////////////////////////////
	// Adding buttons corners to the blue and orrange buttons
	/////////////////////////////////////////////////////////////////////////////////////////
	
	$ef(".button_blue_left").before("<span class='button_blue_left_pre'></span>");
	$ef(".button_blue_left").after("<span class='button_blue_left_pos'></span>");
	$ef(".button_blue_left_pre").before("<span class='button_blue_left_wraper'>");
	$ef(".button_blue_left_pos").before("</span>");
	
	$ef(".button_blue_right").before("<span class='button_blue_right_pre'></span>");
	$ef(".button_blue_right").after("<span class='button_blue_right_pos'></span>");
	$ef(".button_blue_right_pre").before("<span class='button_blue_right_wraper'>");
	$ef(".button_blue_right_pos").before("</span>");

	$ef(".button_orange_left").before("<span class='button_orange_left_pre'></span>");
	$ef(".button_orange_left").after("<span class='button_orange_left_pos'></span>");
	$ef(".button_orange_left_pre").before("<span class='button_orange_left_wraper'>");
	$ef(".button_orange_left_pos").before("</span>");
	
	$ef(".button_orange_right").before("<span class='button_orange_right_pre'></span>");
	$ef(".button_orange_right").after("<span class='button_orange_right_pos'></span>");
	$ef(".button_orange_right_pre").before("<span class='button_orange_right_wraper'>");
	$ef(".button_orange_right_pos").before("</span>");
	
	/////////////////////////////////////////////////////////////////////////////////////////
	// Adding blog post corners
	/////////////////////////////////////////////////////////////////////////////////////////
	
	$ef(".blog #main_col .blogList > ul > li").wrap("<div class='post_tile'><div class='post_top'><div class='post_bottom'></div></div></div>");
	$ef(".blog #main_col .comments dl").wrap("<div class='comment_tile'><div class='comment_top'><div class='comment_bottom'></div></div></div>");
	$ef(".blog #main_col .comments .commentsForm").wrap("<div class='comment_tile'><div class='comment_top'><div class='comment_bottom'></div></div></div>");

	
	/////////////////////////////////////////////////////////////////////////////////////////
	// Make the page scroll up when you click on a sign up button within the page
	/////////////////////////////////////////////////////////////////////////////////////////
	
	$ef(document).ready(function()	
		{	
		$ef("#inlineSignUp").click(function()
			{	
				$ef('html, body').animate({scrollTop:0}, 'slow', function () {
					$ef('#signUpForm:hidden').slideDown();
					$ef('#inlineSignUp')[0].blur();
				});			
				return false;			 		
			}
		);
	});
	
	$ef(document).ready(function()	
		{	
		$ef("#contentSignUp").click(function()
			{	
				$ef('html, body').animate({scrollTop:0}, 'slow', function () {
					$ef('#signUpForm:hidden').slideDown();
					$ef('#inlineSignUp')[0].blur();
				});			
				return false;			 		
			}
		);
	});


})