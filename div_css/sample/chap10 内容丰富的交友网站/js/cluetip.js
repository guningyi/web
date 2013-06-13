$(document).ready(function() {
  $('.cluetip').cluetip({
    arrows: true,
    dropShadow: false,
    sticky: true,
    mouseOutClose: false,
    closePosition: 'title',
    closeText: '<img src="/images/cross.png" alt="close" />',
    local: true,
    cluetipClass: 'vm',
    positionBy: 'mouse',
    activation: 'toggle'
  });
});