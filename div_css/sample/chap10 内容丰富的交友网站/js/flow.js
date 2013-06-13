/*
 global reference to the last flow that was initialized.
 It is recommended to reference the flow object associated with a particular UI element or flow container (e.g. in callbacks, etc)
 because there may be multiple flows in use on one page.
 The current usage of this variable is for the callback from facebook's authorization call - activeFlow references the current flow that the user is authenticating from.
 */
var activeFlow = null;

//global array of flows that are currently initialized
var flows = {};
var facebookApiKey = false;

/** global variable to track whether javascript and css dependencies have been loaded
 * @see initializeDependencies()
 */
var hasInitializedDependencies = false;

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

/** flow*/
flow.prototype = {
  name : null,
  flowContainer : null,
  actionSetupMap : null,
  actionParameter : "actionType",
  loadParameters : null,
  flowContainerCloseCallback : null,
  flowTimeout : null,
  flowPath : null, /** used to track information about the current flow for transmission to analytics service*/
  parentFlow : null,
  controllerURL : "/flowController",
  currentState : null,
  errorContainerId : null,
  message : null,
  messageTimeout : 5000,
  redirectOverride : false
};

/** constructor
 *
 * @param containerId
 * @param options
 * @param name
 */
function flow(containerId, options, flowPath) {
  this.flowContainer = $('#' + containerId);
  this.flowPath = flowPath;

  this._initializeActionSetupMap();
  this._initializeOptions(options);
  
  addFlow(this,true);

};                                                                         

/** method to initialize a flow object's properties with a set of options
 *
 * @param flow
 * @param options
 */
flow.method('_initializeOptions', function(options) {
  //TODO - $.extend or some prototype method should be able to do these overrides/configs for us...
  if (options && options.actionSetupMap) {
    $.extend(this.actionSetupMap, options.actionSetupMap);
  }

  if (options && options.parentFlow) {
    this.parentFlow = options.parentFlow;
  }

  if (options && options.messageTimeout) {
    this.messageTimeout = options.messageTimeout;
  }

  if (options && options.loadParameters) {
    this.loadParameters = options.loadParameters;
  }

  if (options && options.message) {
    this.setMessage(options.message);
  }
});

/** initializes actionSetupMap.  Needs to be called on each instantiation of a flow because
 * it depends on various enclosures to reference the parent flow object
 *
 */
flow.prototype._initializeActionSetupMap = function() {
  var flowReference = this;
  this.actionSetupMap = {
    "default" : {
      load : {
        delegateHandler : function(data) {flowReference.handleGenericLoadResponse(data)}
      },
      submit : {
        delegateHandler : function(data) {flowReference.handleGenericSubmitResponse(data)}
      },
      lightboxError : {
        delegateHandler : function(data) {flowReference.lightboxLoadCallback(data)}
      },
      errorContainerId : "fbLoginError"
    },
    "resendVerification" : {
      load : {
        delegateHandler : function(data) {flowReference.handleResendVerificationResponse(data)}
      }
    },
    "register" : {
      load : {
        flowPath : "registrationPanel"
      },
      errorContainerId : "fbRegisterError"
    },
    "login" : {
      submit : {
        delegateHandler : function(data) {flowReference.handleLoginSubmitResponse(data)}
      }
    },
    "referral" : {
      load : {
        flowPath : "registrationPanel",        
        baseHandler : null,
        delegateHandler : function(data) {
          flowReference.lightboxLoadCallback(data);
          var inReferralRegisterOptions = {
            parentFlow : 'inLightbox'
          };
          var theFlow = getFlow('loginSubContainer2','referral',inReferralRegisterOptions);
          theFlow.afterEvaluateAuthorizationCallback = function(data) {
            if (data.status == 'complete') {
              enableForm('fbreferralForm');
              $('#step1Complete').append("<h3>Complete &nbsp;<img src='/images/iconsets/silk/accept.png'/></h3>");
            }
          }
          theFlow.evaluateAuthorization();
        },
        registerFlow : true
      },
      submit : {
        delegateHandler : function(data) {
          flowReference.handleReferralSubmitResponse(data)
        },
        registerFlow : true
      },
      errorContainerId : "fbReferralError"
    },
    "welcome" : {
      load : {
        delegateHandler : function(data) {
          flowReference.handleTemporaryMessageResponse(data)
        }
      }
    },
    "message" : {
      load : {
        delegateHandler : function(data) {
          flowReference.handleTemporaryMessageResponse(data)
        }
      },
      display : {
        delegateHandler : function(data) {
          flowReference.handleTemporaryMessageResponse(data)
        }
      }
    },
    "interstitialRegistration" : {
      load : {
        flowPath : "interstitialRegistration",
        delegateHandler : function(data) {
          flowReference.lightboxLoadCallback();
          var interstitialRegistrationSubOptions = {
            parentFlow : 'inLightbox'
          };
          var subFlow = getFlow('interstitialRegistrationSubContainer','interstitialRegistration',interstitialRegistrationSubOptions);

          subFlow.evaluateAuthorization();
        },
        registerFlow : true
      }
    },
    "verifyLogin" : {
      submit : {
        delegateHandler : function(data) {
          flowReference.handleVerifyLoginResponse(data)
        }
      }
    },
    'manualVerify' : {
      load : {
        delegateHandler : function(data) {
          flowReference.lightboxLoadCallback(data)
        }
      }
    },
    'completeVerify' : {
      submit : {
        delegateHandler : function(data) {
          if (data.status == 'success') {
            window.location.href = data.nextAction;
          } else {
            flowReference.baseErrorHandler(data);
          }
        }
      },
      errorContainerId : "fbRegisterError"
    }

  };
}

flow.prototype.setFlowContainerCloseCallback = function(callback) {
  this.flowContainerCloseCallback = callback;
};

flow.prototype.setTimeoutCallback = function(callback,time) {
  this.flowTimeout = setTimeout(callback,time);
};

flow.prototype.setMessage = function(message) {
  this.message = message;
}

flow.prototype.setRedirectOverride = function(toggle) {
  this.redirectOverride = toggle;
}

/** handles the response from the evaluateAuthorization call
 * triggers appropriate message display, refreshing of elements, next step in flows, etc
 * @param data
 */
flow.prototype.evaluateAuthorizationCallback = function(data) {
  var flowReference = this;
  updateLoginStatus();
  updateAccountTab();
  if (data.status == 'complete') {
    //TODO - differentiate using classes, or using another callback mechanism

    if (this.flowContainer.attr('id') == 'loginContainer') {
      //if the user is in the loginContainer, check the redirect directive
      if (data.redirect) {
        doRedirect(data.redirect);
      } else {
        //display the welcome message if we aren't redirecting
        this.flowContainer.load('/flowController?actionType=welcome',null,function() {flowReference.setTimeoutCallback(function() {flowReference.flowContainer.slideToggle()},10000)});
      }
    } else if (this.flowPath == 'interstitialRegistration') {

      if (this.flowContainer.attr('id') == 'interstitialRegistrationSubContainer') {
        //certain callback/handlers are attached to the parent container (lightboxContainer)
        //TODO - we should come up with a more generic way to handle this
        flowReference = getFlow('lightboxContainer');  
      }

      if (flowReference.afterEvaluateAuthorizationCallback) {
        flowReference.afterEvaluateAuthorizationCallback(data);
      } else if (data.redirect) {
        doRedirect(data.redirect);
      } else {
        doRedirect('/post');        
      }
    } else {
      //assuming we are in the referral flow; display contact information
      this.flowContainer.load('/flowController?actionType=displayContactInformation',null);
      if (this.afterEvaluateAuthorizationCallback) {
        this.afterEvaluateAuthorizationCallback(data);
      }
    }
  } else {
    if (data.redirect) {
      doRedirect(data.redirect);
    } else {
      this.doAction('load',data.nextAction);
    }
  }
};

/** override this for yet another callback layer! I know, awesome right?  TODO create functionality to allow chaining of callbacks
 *
 * @param data
 */
flow.prototype.afterEvaluateAuthorizationCallback = null;

flow.prototype.setAfterEvaluateAuthorizationCallback = function(callback) {
  this.afterEvaluateAuthorizationCallback = callback;
}

/** Check for the authorization status of the current user.
  * Currently only checks whether the account is
  * complete, incomplete, unverified, not whether the user
  * has access to a particular resource. */
flow.prototype.evaluateAuthorization = function(data) {
  var flowReference = this;
  if (this.parentFlow) {
    $.get( "/flowController?actionType=evaluateAuthorization&parentFlow=" + this.parentFlow, null, function(data) {flowReference.evaluateAuthorizationCallback(data);}, "json");
  } else {
    $.get( "/flowController?actionType=evaluateAuthorization", null, function(data) {flowReference.evaluateAuthorizationCallback(data)}, "json");
  }
};

/** handles the response from the submission of a referral
 *
 * @param data
 */
flow.prototype.handleReferralSubmitResponse = function(data) {
  
  if (data.status == 'success') {
    doRedirect('/refer.jsp?referralId=' + data.referralId);
  } else {
    if (data && data.errors) {
      if (data.errors.pageError) {
        $('#' + this.errorContainerId).html(URLDecode(data.errors.pageError));
      } else {
        $('#' + this.errorContainerId).html("An error occurred while processing your request.");
      }
    }
  }
}

flow.prototype.handleVerifyLoginResponse = function(data) {
  if (data.status == 'success') {
    try {
      FB_RequireFeatures(["Connect"], function(){
        FB.init(facebookApiKey, "/fb/connect/receiver.jsp");
        FB.Connect.requireSession(
            function() {
              getFlow('loginContainer','registrationPanel/facebookConnect').doAction('submit','facebookConnectExisting','fbloginForm');
              return false;
            }
        );
      });
    } catch (err) {
      //ignore facebook api errors.
      //TODO - handle with a modal dialog
    }
  } else {
    this.baseErrorHandler(data);
  }
   
}

/** generic handler for form submission responses.  Should be overidden if any specific behavior is required.
 *
 * @param data
 */
flow.prototype.handleGenericSubmitResponse = function(data) {
  if (data.status == 'success') {
    this.evaluateAuthorization();
  } else {
    this.baseErrorHandler(data);
  }
}

flow.prototype.handleResendVerificationResponse = function(data) {
  if (data.status == 'success') {
    this.evaluateAuthorization();
  } else {
    this.baseErrorHandler(data);
  }
}


/** generic handler for form submission responses.  Should be overidden if any specific behavior is required.
 *
 * @param data
 */
var loginFailureCount = 0;
flow.prototype.handleLoginSubmitResponse = function(data) {
  if (data.status == 'success') {
    this.evaluateAuthorization();
    loginFailureCount = 0;
  } else {
    loginFailureCount++;
    if (loginFailureCount == 1) {
      data.errors.general += " ( 1st attempt )";
    } else if (loginFailureCount == 2) {
      data.errors.general += " ( 2nd attempt )";
    } else if (loginFailureCount == 3) {
      data.errors.general += " ( 3rd attempt )";
    } else {
      data.errors.general += " ( " + loginFailureCount + "th attempt )";
    }

    this.baseErrorHandler(data);
  }
}

/** renders error messages in the error container associated with this flow
 *
 * @param data
 */
flow.prototype.baseErrorHandler = function(data) {
  if (data && data.errors) {
    if (data.errors.general) {
      $('#' + this.errorContainerId).html(URLDecode(data.errors.general));
    } else {
      $('#' + this.errorContainerId).html("An error occurred while processing your request.");
    }
  }

}

flow.prototype.handleGenericLoadResponse = function(data) {
  if (data.status == 'success') {

  } else {
    this.baseErrorHandler(data);
  }
};

/** handles a response for messages that should be displayed temporarily, and then hidden
 *
 * @param data
 */
flow.prototype.handleTemporaryMessageResponse  = function(data) {
  if (data && data.errors) {
    /** if it is an error, then we skip the "temporary part".  Simply display the error message. */
    this.baseErrorHandler(data);
  } else {
    var flowReference = this;                                                     
    this.setTimeoutCallback(function() {flowReference.flowContainer.slideToggle()}, this.messageTimeout);
  }
}
/** sets up display of an ajax-loaded element within a jquery dialog (aka lightbox)
 *
 * @param data
 */
flow.prototype.lightboxLoadCallback = function(data) {
  var height = getViewport().y - 150;

  tb_show(null,window.location.pathname + '#TB_inline?height=' + (height - 50) + '&width=700&inlineId=' + this.flowContainer.attr('id') + 'Container' + '&modal=true',false);

  $('.closeable').each(function() {
    if ($(this).find('.closelink').length == 0) {
      $(this).prepend('<div class="fbcontainerclose"><a class="closelink" href="#" onclick="doContainerClose(this);">close</a></div>');
    }
  });

}

/** "controller" logic for flows.  Sets up action-specific properties for the flow (before/after handlers, error elements, etc),
 * and prepares/submits the request to the servlet controller
 * @param type
 * @param action
 * @param formId
 */
flow.prototype.doAction = function(type, action, formId) {
  //skipRedirectOverride cancels the "redirectOverride" logic for certain actions; any action that will not be loaded into the interstitialRegistration flow should be placed here.
  var skipRedirectOverride = (action == 'facebookConnectExisting' || action == 'verifyLogin');

  if (!skipRedirectOverride && this.redirectOverride && (type == 'submit' || type == 'load')) {
    //overrides all flow behavior and redirects to the post page, which will trigger an interstitialRegistration flow.
    //the reason for this logic is that we can't style the account side to support the new registration/login styling, so we redirect back to the public side.
    window.location.href = '/post';
    return;
  }

  this.flowContainer.show();

  var beforeSubmit = null;
  var baseHandler = null;
  var delegateHandler = null;
  var registerFlow = false;

  var hasOverrides = this.actionSetupMap[action] && this.actionSetupMap[action][type];
  var hasDefaults = this.actionSetupMap['default'] && this.actionSetupMap['default'][type];

  if (hasOverrides && this.actionSetupMap[action][type]['beforeSubmit']) {
    beforeSubmit = this.actionSetupMap[action][type]['beforeSubmit'];
  } else if (hasDefaults && this.actionSetupMap['default'][type]['beforeSubmit']) {
    beforeSubmit = this.actionSetupMap['default'][type]['beforeSubmit'];
  }

  if (hasOverrides && this.actionSetupMap[action][type]['delegateHandler']) {
    delegateHandler = this.actionSetupMap[action][type]['delegateHandler'];
  } else if (hasDefaults && this.actionSetupMap['default'][type]['delegateHandler']) {
    delegateHandler = this.actionSetupMap['default'][type]['delegateHandler'];
  }

  if (hasOverrides && this.actionSetupMap[action]['errorContainerId']) {
    this.errorContainerId = this.actionSetupMap[action]['errorContainerId'];
  } else if (hasDefaults && this.actionSetupMap['default']['errorContainerId']) {
    this.errorContainerId = this.actionSetupMap['default']['errorContainerId'];
  }

  if (hasOverrides && this.actionSetupMap[action][type]['registerFlow']) {
    registerFlow = this.actionSetupMap[action][type]['registerFlow'];
  } else if (hasDefaults && this.actionSetupMap['default'][type]['registerFlow']) {
    registerFlow = this.actionSetupMap['default'][type]['registerFlow'];
  }

  if (beforeSubmit) {
    beforeSubmit();
  }

  var appendParameters = "";

  if (this.parentFlow) {
    appendParameters += "&parentFlow=" + this.parentFlow;
  }

  if (this.guid) {
    appendParameters += "&flowGUID=" + this.guid;
  }

  if (type == 'submit') {
    var serializedForm = doSerialize(formId);

    //check if submitAction is present
    if ($('#' + formId + " input[name=submitAction]").length == 0) {
      //if not, and action parameter is present, append action parameter to serializedForm parameters.
      if (action) {
        appendParameters += "&submitAction=" + action;
      }
    }

    serializedForm += appendParameters;


    var target = $('#' + formId).attr('action') ? $('#' + formId).attr('action') : this.controllerURL;

    $.post(target,
           serializedForm,
           delegateHandler,
           'json');
  } else if (type == 'load') {
    if (this.loadParameters) {
      for (index in this.loadParameters) {
        appendParameters += "&" + index + "=" + this.loadParameters[index];
      }
    }

    var loadURL = this.controllerURL + "?" + this.actionParameter + "=" + action;
    loadURL += appendParameters;

    this.flowContainer.load(loadURL,null,delegateHandler);

    //TODO - $().load()... should be triggering an ajaxComplete event, but it isn't! making a dummy ajax call to trigger the appropriate ajaxComplete handlers
    $.ajax({url:'/api/serviceStatus'});
  } else if (type == 'display') {
    var flowReference = this;
    var displayCallback = function() {
      $('#flow_message').html(flowReference.message);
      if (delegateHandler) {
        delegateHandler();
      }
      flowReference.message = null;
    }
    this.flowContainer.load('/register/message.jspf',null,displayCallback);
  } else if (type == 'lightboxError') {
    var flowReference = this;
    var displayCallback = function() {
     $('#fbErrorMessage').html(flowReference.message);
      //$('#fbGenericErrorContainer').show();

      if (delegateHandler) {
        delegateHandler();
      }
      flowReference.message = null;
    }
    $('#fbGenericErrorContainer').appendTo($(this.flowContainer));
    displayCallback();

  }

  if (registerFlow) {
    doRegisterFlow(this,type,action);
  }

  trackAction(this, type, action, formId);

  if (this.parentFlow) {
    //$.inspect("Parent Flow " + this.parentFlow,'console');
  } else {
    /** set flow path after the current action has been tracked.
     * e.g. for doAction('load','registration'), the flowPath will
     * be set to registrationPanel *after* we track the current load action. */
    if (hasOverrides && this.actionSetupMap[action][type]['flowPath']) {
      this.flowPath = this.actionSetupMap[action][type]['flowPath'];
    } else if (hasDefaults && this.actionSetupMap['default'][type]['flowPath']) {
      this.flowPath = this.actionSetupMap['default'][type]['flowPath'];
    }
  }

};
/** end flow methods */

/** flow/action utility methods */

/** adds this flow to the global flow array, and references it as the "activeFlow"
 *
 * @param flow
 * @param setActive
 */
function addFlow(flow, setActive) {

  if (setActive) {
    activeFlow = flow;
  }

  //hook into global flows array
  flows[flow.flowContainer.attr('id')] = flow;

}

/** handle callback from the flow-tracking call
 *
 * @param data
 */
var handleRegisterFlowCallback = function(data) {
  //TODO implement
  //$.inspect(data);
}

/** submits information about the triggered flow to the flow-tracking servlet
 *
 * @param flow
 */
function doRegisterFlow(flow, type, action) {
  try {
    var loadParameters = JSON.stringify(flow.loadParameters);
    var flowData = {
      flowContainerId : flow.flowContainer.attr('id'),
      flowPath : flow.flowPath,
      type : type,
      action : action,
      currentURI : window.location.href,
      loadParameters :loadParameters,
      submitAction : "registerFlow"
    };


    $.ajax({
      url:"/flowController",
      type:"POST",
      global:false,
      async:false,
      data:flowData,
      dataType:"json",
      complete:handleRegisterFlowCallback
    });
  } catch (err) {
    //$.inspect(err);
  }
}

/** retrieve or create a flow object for the specified "containerReference"
 *
 * @param containerReference either a DOM element ID (flow associated with the referenced DOM element) - or a DOM element (flow associated with the closest parent element that is a flowContainer)
 * @param name
 * @param options
 */
function getFlow(containerReference, flowPath, options) {

  //trigger ajaxBindings (if they haven't already been set
  if (!hasInitializedDependencies) {
    initializeDependencies();
    hasInitializedDependencies = true;
  }

  var theFlowContainer = null;
  var theFlow = null;

  if (containerReference instanceof String || (typeof containerReference == 'string')) {
    theFlowContainer = $('#' + containerReference);
  } else {
    theFlowContainer = $(containerReference).closest('.flowContainer');
  }

  //Clear any existing timeout callbacks.  Otherwise, they may be applied to the current flow container (e.g. a container close callback for temporary messages)
  for (index in flows) {
    if (flows[index] && flows[index].flowTimeout) {
      clearTimeout(flows[index].flowTimeout);
    }
  }

  for (index in flows) {
    if (flows[index] && flows[index].flowContainer && flows[index].flowContainer.attr('id') == theFlowContainer.attr('id')) {
      theFlow = flows[index];
      break;
    }
  }

  //no matching flow was located; instantiate a new one
  if (theFlow == null) {
    if (flowPath) {
      theFlow = new flow(theFlowContainer.attr('id'),options,flowPath);
    } else {
      //do our best to determine flow path based on available information
      if (theFlowContainer.attr('id') == "loginContainer") {
        flowPath = "registrationPanel";
        //$.inspect('defaulting to registrationPanel','console');
      } else if (theFlowContainer.attr('id') == "lightboxContainer") {
        flowPath = "interstitialRegistration";
        //$.inspect('defaulting to interstitialRegistration','console');
      } else if (theFlowContainer.attr('id') == "loginSubContainer2") {
        flowPath = "referral";
        //$.inspect('defaulting to referral','console');
      }
      theFlow = new flow(theFlowContainer.attr('id'),options,flowPath);
    }
  } else if (options) {
    //initialize options if present
    theFlow._initializeOptions(options);
  }


  activeFlow = theFlow;

  return theFlow;

}

/** trigger analytics tracking for this action
 * @param flow
 * @param type
 * @param action
 * @param formId
 */
function trackAction(flow, type, action, formId) {
  var flowPath = flow.flowPath ? flow.flowPath : "";

  //_trackPageview()

  //construct a URI that will be sent to google analytics' _trackPageview() method.

  var trackUrl = "/userTracking/";

  trackUrl += (flowPath ? flowPath + "/" : "") + type + "/" + action;

  //$.inspect("Tracking URL : " + trackUrl,'console');
  
  trackActionUrl(trackUrl);
}

/** trigger analytics tracking for this url
 * @param flow
 * @param type
 * @param action
 * @param formId
 */
function trackActionUrl(trackUrl) {
  //sTracker is our site tracker for google analytics
  //rTracker is our rollup tracker for google analytics
  if (typeof(sTracker) == 'object' && sTracker) {
    //sTracker._trackEvent(flow.flowPath,action,flowPath);
    sTracker._trackPageview(trackUrl);
  }

  if (typeof(rTracker) == 'object' && rTracker) {
    //rTracker._trackEvent(flow.flowPath,action,flowPath);
    rTracker._trackPageview(trackUrl);
  }
}

/** end flow/action utility methods */

/** method called when flow handling is first triggered.
 * Loads necessary javascript & css, and adds jquery ajaxComplete handlers
 *
 */
function initializeDependencies() {
  /* load dependent scripts/css */
  includeJS("/include/js/lib/json2.min.js",true);
  //includeJS("/include/js/lib/jquery.inspect.js",true);
  includeJS("/include/js/lib/jquery.watermark.js");
  includeJS("/include/js/nui/watermark.js");
  includeJS("/include/js/lib/jquery.validate.min.js")
  includeJS("/include/js/reports/util.js");
  includeJS("/include/js/nui/flow_form_utils.js")

  //append validation icons to document.  We use this to "cache" them within the DOM to avoid repetitive loads.
  if ($('#validationIcons').size() == 0) {
    try {
      $(document.body).append('<div id="validationIcons" style="display:none"><div id="validationIconValid"><img class="valid" src="/images/iconsets/silk/accept.png"/></div><div id="validationIconInvalid"><img class="inValid" src="/images/iconsets/silk/exclamation.png"/></div></div>')
    } catch (err) {

    }
  }

  //load Facebook API Key
  initializeFacebookApi();

  /* bind event handlers to the jquery "ajaxComplete" event; event handler execution
     can be disabled for a particular jquery ajax call by specifying "global : false"
     in the ajax request options */
  $(window).bind("ajaxComplete", function() {
    try {
      var watermarked = {};

      //set up form validation for all forms with the "fbValidatableForm" class
      $('.fbValidatableForm').each(function() {
        var formId = $(this).attr('id');
        setupValidation(formId);
        $(this).find('.fbValidate').each(function() {
          $(this).blur(
              function() {
                doValidateElement($(this).attr('id'));
              }
          );
        });
      });

      //TODO hack - for unknown reasons, password validation repeats many times onblur instead of just once.  Toggle password validation onchange
      $('.fbPassword').each(function() {
        $(this).change(function() {
           try {
             passwordCheckToggle = true;
           } catch (err) {

           }
        });
      });

      //TODO hack - for unknown reasons, email validation repeats many times onblur instead of just once.  Toggle email validation onchange
      $('.remoteEmailCheck').each(function() {
        $(this).change(function() {
           try {
             remoteEmailCheckToggle = true;
             validEmailCheckToggle = true;
           } catch (err) {

           }
        });
      });

      $('.remoteEmailCheckWithConnect').each(function() {
        $(this).change(function() {
           try {
             remoteEmailCheckToggle = true;
             validEmailCheckToggle = true;
           } catch (err) {

           }
        });
      });

      //block/disable any form elements with "disabled" class
      $('.fbDisabledForm').each(function() {
        $(this).find('input').each(function() {
            $(this).attr('disabled',true);
          }
        );
        $(this).find('textarea').each(function() {
            $(this).attr('disabled',true);
          }
        );
      }
      );

      initializeWatermarks();

      // for some reason password watermarks don't show up until after you click the element.  This makes it work. Would be nice if we didn't have to reference the ID selector...
      $('#login_password').click();
      $('#login_password').blur();
      //$.watermark._show($('#login_password')); //doesn't work in IE6
      //$("input [type='password']").click(); //doesn't work
      //$("input [type='password']").blur(); //doesn't work


      $('.fbcontainerclose').remove();

      $('.closeable').each(function() {
        $(this).prepend('<div class="fbcontainerclose"><a class="closelink" href="#" onclick="doContainerClose(this);">close</a></div>');
      });

      /* TODO This is a workaround for login/autocomplete problems.  Leaving it out but available for testing :
      //populate any login forms with the values from the static hidden login form.  Note that this form will ONLY be present on the HOMEPAGE
      // the reason is we need to be very careful about XSS vulnerabilities - these could be used to capture the password from this form.
      $('#login_username').val($('#login_username_hidden').val());
      if ($('#login_password_hidden').val() && $('#login_password_hidden').val() != '') {
        //we use "replaceWith" instead of simply copying the value because the watermark code interferes with the password element.  It changes it temporarily into a text field
        $('#login_password').replaceWith($('#login_password_hidden'));
      }
      */

      //we should only have one flow/close link on the page at any given time.  Remove any additional closelink elements after the first is found.
      var closeLinks = $('.closelink');
      if (closeLinks.size() > 1) {
        for (var i=0; i < closeLinks.size(); i++) {
          if (i > 0) {
            $(closeLinks[i]).remove();
          }
        }
      }
    } catch (err) {
      //todo - this can happen during page transitions...
    }
    
  });

  $(window).bind("ajaxError", function(event, request, settings) {

    try {
      /*
        available data :
         request.status = http status code
         request.responseText = html or text of the response.  Since servlet errors are intercepted by the servlet error handler, this will be our error page
         request.statusText = http status message (e.g. "An error has occurred")
       */

      //TODO there is more available information in "request" that we can pass to our handleErr function

      if (hasInitializedDependencies) {
        if (request.status === 0 || request.status == 502) {
          //handleErr("Service unavailable - status code : " + request.status + "; status text : " + request.statusText,window.location.href,0);
          //window.location.href = '/errors/error.jsp';
          //showServiceDown();
        } else if (request.status == 404) {
          //handleErr("Resource not found",window.location.href,0);
          //ignore 404 errors for now
        } else {
          //handleErr("Unknown error - status code : " + request.status + "; status text : " + request.statusText,window.location.href,0);
          //window.location.href = '/errors/error.jsp';
          //trigger "unknown error" message
          //showUnknownError();
        }
      } else {
        //TODO if dependencies haven't been initialized...?
      }
    } catch (err) {
      //TODO
    }

  });
}


function showUnknownError() {
  //TODO close any open containers?
  var errorFlow = getFlow('lightboxContainer','error');

  //TODO handle specific error conditions
  errorFlow.setMessage("Unknown error.");
  errorFlow.doAction('lightboxError','message');
  //there are some transitional errors that only last a moment before a redirect.  Handle these by hiding the error for .5 seconds
  errorFlow.flowContainer.hide();
  setTimeout(function() {errorFlow.flowContainer.show()},500);
}

/** do necessary work to remove the flow and clear out the flowContainer
 *
 * @param element
 */
function doContainerClose(element) {
  var flow = getFlow(element);

  if (flow && flow.flowContainerCloseCallback) {
    flow.flowContainerCloseCallback();
  }

  flow.flowContainer.html('');

  tb_remove();

  //TODO - we need to be able to close this flow, and any subflows.  I haven't a real relationship between parent/child flows yet.  Removing all flows for now.
  /*
  for (var index in flows) {
    if (flows[index] && flows[index].flowContainer && flows[index].flowContainer.attr('id') == flow.flowContainer.attr('id')) {
      flows[index] = null;
      break;
    }
  }
  */
  flows = {};

  return false;
}

/** called after any authentication action to check whether or not the account tab should be activated
 * e.g. if the user has been authenticated, enable the account tab.
 */
function updateAccountTab() {
  if ($('#__login_status').val() == "false") {
    $('#navigation_tab_account').hide();
  } else {
    $('#navigation_tab_account').show();
  }
}

/** refreshes the login panel, e.g. after some authentication action is taken
 *
 */
var updateLoginStatus = function() {
  $('#loginStatus').load('/register/loginStatusPanel',null, function() {try {updateAccountTab(); afterUpdateLoginStatus()} catch (err) { /* do nothing. error can occur if this was triggered during redirect - js has been unloaded */}});
}

var afterUpdateLoginStatus = function() {
  //override this callback as necessary to do handling after the login panel is refreshed
}

/** serializes the form specified by formId.  Also, hides watermarks so they are not serialized as form data
 *
 * @param formId
 */
function doSerialize(formId) {
  $.watermark.hideAll();
  var data = $('#' + formId).serialize();
  $.watermark.showAll();
  return data;
}

/** global method to trigger a logout
 * override as necessary
 * @param logoutUrl
 */
var doLogout = function(logoutUrl) {
  window.location = logoutUrl;
}

/** utility method to dynamically include a javascript file
 * will only load files that are in the current domain/subdomain, and that are within the /include/js directory
 * @param uri
 * @param async
 */
function includeJS(uri,async) {
  if (uri.substring(0,11) == '/include/js') {
    $.ajax({url : uri,
            async : (async ? async : false),
            dataType : 'script',
            success : function(js) {if (jQuery.browser.safari) {eval(js)}}});
  }
}

function enableForm(formId) {
  //enable any form elements with "disabled" class
  $('#' + formId).each(function() {
    $(this).removeClass('fbDisabledForm');
    $(this).find('input').each(function() {
        $(this).attr('disabled',false);
      }
    );
    $(this).find('textarea').each(function() {
        $(this).attr('disabled',false);
      }
    );
  }
  );
}

/** logic to handle service outages.  check service status for 1 minute, and if it comes back up, indicate that to the user. */

function showServiceDown() {
  var errorFlow = getFlow('lightboxContainer','error');
  $('#fbErrorMessageContainer').html($('#serviceStatusCheck').html());
  //$('#serviceStatusCheck').appendTo($('#fbErrorMessageContainer'));
  //$('#serviceDownUntilLater').appendTo($('#fbErrorMessageContainer'));

  serviceStatusCheck();
  serviceCheckTimeout = setTimeout(stopServiceStatusCheck, serviceCheckDuration);
  errorFlow.doAction('lightboxError','message');

  //there are some transitional errors that only last a moment before a redirect.  Handle these by hiding the error for .5 seconds
  errorFlow.flowContainer.hide();
  setTimeout(function() {errorFlow.flowContainer.show()},500);
}

//stop checking for service return after 1 minute
var serviceCheckDuration = 60000;
var serviceCheckTimeout = null;
var currentServiceCheckTimeout = null;
var redirectTimeout = null;

var stopServiceStatusCheck = function() {
  clearTimeout(currentServiceCheckTimeout);
  $('#serviceStatusCheck').hide();
  $('#fbErrorMessageContainer').html($('#serviceDownUntilLater').html());
}

/** call the serviceStatus servlet
 *
 */
var serviceStatusCheckCall = function() {
  $.ajax({url : "/report/serviceStatus",
          data : null,
          type : "GET",
          timeout : 250,
          success : serviceBack,
          error : serviceStatusCheck,    
          global : false});
}

/** starts a process to check the service status every 5 seconds; updates the "serviceCheckEllipsis" text to show ... . . etc.
 *
 */
var serviceStatusCheck = function() {
  //$('#serviceStatusCheck').show();
  if ($('#serviceCheckEllipsis').text().length > 10) {
    $('#serviceCheckEllipsis').text("");
  } else {
    $('#serviceCheckEllipsis').text($('#serviceCheckEllipsis').text() + ".");
  }
  //check service status every 5 seconds
  currentServiceCheckTimeout = setTimeout(serviceStatusCheckCall,5000);
};

/** when the service is back up, show the appropriate messages and trigger a redirect after 10 seconds
 *
 */
var serviceBack = function() {
  var errorFlow = getFlow('lightboxContainer','error');
  clearTimeout(currentServiceCheckTimeout);
  clearTimeout(serviceCheckTimeout);
  //$('#serviceStatusCheck').hide();
  errorFlow.flowContainer.html($('#serviceBack').html());
  errorFlow.doAction('lightboxError','message');
  $('#serviceBack').show();

  redirectTimeout = setTimeout(function() {window.location.href = '/'},10000);
}

/** if user chooses to cancel the redirect, close the lightboxContainer and clear the redirect timeout
 *
 */
function cancelRedirect(){
  clearTimeout(redirectTimeout);
  doContainerClose('lightboxContainer');
}

/** handle cleanup of bound ajax event handlers, then perform redirect
 *
 * @param location
 */
function doRedirect(location) {
  $(window).unbind("ajaxError");
  window.location.href = location;
}

function initializeFacebookApi() {
  if (facebookApiKey) {
    return;
  } else {
    facebookApiKey = $.ajax({
     url: "/flowController?actionType=facebookGetApiKey",
     global: false,
     async: false
    }).responseText;
  }
  /*$.get("/flowController?actionType=facebookGetApiKey",
        null,
        function(data) {
          if (data.status == 'success') {
            facebookApiKey = data.apiKey;
          } else {
            //revert to default
            facebookApiKey = "1701b848c7c2e91b1c031fdf3cf216f1";
          }
        },
        "json");
   */
  
}

