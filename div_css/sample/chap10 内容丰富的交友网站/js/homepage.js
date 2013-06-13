$(document).ready(function() {
  var animate = true;
  var speed = 5000;

  function changeTab(target, animate) {
    var parent = target.parentNode;

    if (parent.vmCurrentTab !== target) {
      if (animate) {
        $(parent.vmCurrentTab).removeClass('tabup');
        $(parent.vmCurrentTab.vmStory).fadeOut(1000);

        parent.vmCurrentTab = target;
        $(parent.vmCurrentTab).addClass('tabup');
        $(parent.vmCurrentTab.vmStory).fadeIn(1000);
      } else {
        $(parent.vmCurrentTab).removeClass('tabup');
        $(parent.vmCurrentTab.vmStory).hide();

        parent.vmCurrentTab = target;
        $(parent.vmCurrentTab).addClass('tabup');
        $(parent.vmCurrentTab.vmStory).show();
      }
    }
  }

  function animateFeatures() {
    if (animate && $('#ft li.tabup').length > 0) {
      // todo: make this smarter

      var currId = $('#ft li.tabup').get(0).id;
      var numberOfFeatures = $('#ft li.tab').length;
      
      if (currId === "ft1" && (numberOfFeatures > 1)) {
        currId = "ft2";
      } else if (currId === "ft2" && (numberOfFeatures > 2)) {
        currId = "ft3";
      } else if (currId === "ft3" && (numberOfFeatures > 3)) {
        currId = "ft4";
      } else {
        currId = "ft1";
      }

      changeTab(document.getElementById(currId), true);
      setTimeout(animateFeatures, speed);
    }
  }

  // hook up the tabs and the stories
  $('li.tab').each(function() {
    this.vmStory = document.getElementById(this.id + "_s");
  });

  // hook up the tabsets and the current tab
  $('li.tabup').each(function() {
    this.parentNode.vmCurrentTab = this;
  });

  // introduce the logic for changing tabs and turning off animations
  // if the tab is clicked
  $('li.tab').click(function(evt) {
    animate = false;
    changeTab(evt.target);
  });

  // same as above, for the links.  return false so browser doesn't jump.
  $('li.tab a').click(function(evt) {
    animate = false;
    changeTab(evt.target.parentNode);
    return false;
  });

  setTimeout(animateFeatures, speed);
});