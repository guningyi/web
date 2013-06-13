$(document).ready(function() {
    $("ul.stars li").each(function(i) {

        $(this).hover(
          function() {
              var ul = $(this).parent();
              var li = ul.children();
              var rating = (li.index(this) + 1) / 2;          
              var span = ul.prev();
              span.html(rating);
          },
          function() {
             var ul = $(this).parent();
             var span = ul.prev();
             span.html("");            
           }
        );

        $(this).click(function() {
            var ul = $(this).parent();
            var li = ul.children();

            var rating = (li.index(this) + 1);
            var wid = ul.next("input[type='hidden']").val();

            jQuery.ajax({
                type: "POST",
                data: null,
                url: "/rating/" + wid + "/" + rating,
                success: function(result) {
                    result = parseInt(result);
                    //console.log(result);

                    if (result == -1) {
                        jQuery.facebox(_ratingDuplicateVote);
                        return;
                    }

                    li.removeClass();
                    li.slice(0, result).filter(":even").addClass("left");
                    li.slice(0, result).filter(":odd").addClass("right");

                    if (result < 10) {
                        class1 = "left-gray";
                        class2 = "right-gray";

                        if (result % 2 != 0) {
                            class1 = "right-gray";
                            class2 = "left-gray"
                        }

                        li.slice(result, 10).filter(":even").addClass(class1);
                        li.slice(result, 10).filter(":odd").addClass(class2);
                    }
                },
                error: function(msg) {
                    jQuery.facebox(_ajaxError);
                }
            });
        });
    });
});

