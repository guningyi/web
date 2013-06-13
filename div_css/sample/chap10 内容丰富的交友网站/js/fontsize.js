$(document).ready(function() {
  $('#mainnav').append('<div id="fontsize" class="small">Text Size: <span id="fontsmall" title="Medium">A</span><span id="fontbig" title="Large">A</span></div>');
  var curr = $('body').css('font-size');
  var fSmall = $('#fontsmall');
  var fBig = $('#fontbig');
  if (curr === "medium" || curr === "16px") {
    fSmall.addClass("selected");
    fBig.removeClass("selected");
  } else {
    fSmall.removeClass("selected");
    fBig.addClass("selected");
  }

  fSmall.click(function() {
    fSmall.addClass("selected");
    fBig.removeClass("selected");
    $('body').css('font-size', 'medium');
    $.cookie('fontSize', 'medium', { path: '/', number: 365 });
  });

  fBig.click(function() {
    fSmall.removeClass("selected");
    fBig.addClass("selected");
    $('body').css('font-size', 'large');
    $.cookie('fontSize', 'large', { path: '/', number: 365 });
  });
});