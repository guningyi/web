$(document).ready(function() {
  $('.helplink').bind('click', function() {
    window.open(this.href,'vmhelp','width=800,height=600');
    return false;
  });
});