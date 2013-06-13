function renderFacebookElements() {
  try {
    initializeFacebookApi();
    FB_RequireFeatures(["XFBML"], function() {
      FB.init(facebookApiKey, "/fb/connect/receiver.jsp");
      FB.XFBML.Host.autoParseDomTree = false;
      $(".facebook_tag").each(function() {
        renderFacebookElement($(this).attr("id"), false);
      });
     });
  } catch (err) {
    //ignore facebook api errors.
    //TODO - handle with a modal dialog
  }
}

function renderFacebookElement(id, callInitialization) {
  try {
    initializeFacebookApi();

    if (callInitialization !== true || callInitialization !== false) {
      callInitialization = true;
    }

    var element = $("#" + id);
    if (element) {
      FB_RequireFeatures(["XFBML"], function() {
        if (callInitialization) {
          FB.init(facebookApiKey, "/fb/connect/receiver.jsp");
          FB.XFBML.Host.autoParseDomTree = false;
        }

        if (element.hasClass("fb_login_button")) {
          FB.XFBML.Host.addElement(new FB.XFBML.LoginButton(document.getElementById(element.attr("id"))));
        } else if (element.hasClass("fb_profile_pic")) {
          FB.XFBML.Host.addElement(new FB.XFBML.ProfilePic(document.getElementById(element.attr("id"))));
        } //else ... TODO other fb element types
      });
    }
  } catch (err) {
    //ignore facebook api errors.
    //TODO - handle with a modal dialog
  }
}

function doFacebookLogin(flowPath) {
    //TODO - container parameter? how to determine login vs. register flow?
    if (activeFlow) {
      trackAction(activeFlow,'load','facebookConnect');
    } else {
      trackAction(getFlow('loginContainer',flowPath),'load','facebookConnect');
      //note, activeFlow should now be set.

      try {
        FB_RequireFeatures(["Connect"], function(){
        FB.init(facebookApiKey, "/fb/connect/receiver.jsp");

        //FB.Connect.logout();
        //TODO wrapping in a loggout would ensure that if we are actually logged in, we will log out first.  Otherwise, the "Connect" button does nothing
        //Alternatively, we could automatically log them back into VM with their FB credentials
        //FB.Connect.logout(function() {

          FB.Connect.requireSession(function() {
    //       if (requestExtendedPermissions()) {
    //          FB.Connect.showPermissionDialog("publish_stream", function(data) {
    //            saveExtendedPermissions(data);
    //            activeFlow.evaluateAuthorization();
    //          });
    //        } else {
              trackAction(activeFlow,'submit','facebookConnect');
              activeFlow.evaluateAuthorization();
    //        }
          });
        });
      } catch (err) {
        //ignore facebook api errors.
        //TODO - handle with a modal dialog
      }
    }
}

function saveExtendedPermissions(data) {
  $.ajax({url :"/flowController",
        type : "POST",
        data : {extendedPermissions : data, submitAction : "facebookSaveExtendedPermissions"},
        global : false});
}

function requestExtendedPermissions() {
  var data = $.ajax({url :"/flowController?actionType=facebookCheckExtendedPermissions",
        type : "GET",
        dataType : "json",
        global : false,
        async : false});

  if (data.status == 'success') {
    return true;
  } else {
    return false;
  }
}

function facebookLogout(logoutUrl) {
  try {
    initializeFacebookApi();
    FB_RequireFeatures(["Connect"], function(){
      FB.init(facebookApiKey, "/fb/connect/receiver.jsp");
      FB.ensureInit(function() {
        FB.Connect.ifUserConnected(
            function() {
              FB.Connect.logout(function(data) {
                window.location = logoutUrl;
              });
            },
            logoutUrl);
        });
      });
  } catch (err) {
    //ignore facebook api errors.
    //TODO - handle with a modal dialog
  }
}