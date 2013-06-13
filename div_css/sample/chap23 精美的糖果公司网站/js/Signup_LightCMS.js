window.$su = jQuery;
var SignUpForm = {
    label: null,
    container: null,
    signupUrl: "/Products/SignUp.ashx",

    LoadHTML: function(container, label) {
        if (!container)
            container = $su("#signUpForm");
        this.container = container;
        this.label = label;

        $su.get("/Styles/ThemeBase/Signup_LightCMS.html", function(data) {
            if (data) {
                //Add which site we are on.
                if (SignUpForm.label)
                    data = data.replace(/\{1\}/g, SignUpForm.label);
                SignUpForm.container.append(data);
                SignUpForm.BuildForm();
            }
        });
    },

    BuildForm: function() {
        // Sign-up slider
        $su('#signUp').toggle(function() {
            $su('#signUpForm:hidden').slideDown();
            $su('#signUp')[0].blur();
            $su(this).addClass('on');
            $su('.home #promo .contents').show();
            return false;
        },
		    function() {
		        $su('#signUpForm:visible').slideUp();
		        $su('#signUp')[0].blur();
		        $su(this).removeClass('on');
		        $su('.home #promo .contents').hide();
		        return false;
		    });

        $su("#btnClose").click(function() {
            $su('#signUp').click();
            return false;
        });
        $su("#inlineSignUp").click(function() {
            $su('#signUp').click();
            return false;
        });

        // Sign-up process
        $su("#btn1").click(function() {
            $su('p.message.fail').hide();
            var websiteID = $su('#address')[0].value.replace(/[^A-Za-z0-9]/g, "");
            $su('#address')[0].value = websiteID;
            if (websiteID != "") {
                $su.get(SignUpForm.signupUrl, { Action: "CheckWebsite", WebsiteID: websiteID }, function(data) {
                    if (data == "True") {
                        $su('p.message.fail').hide();
                        $su('#step1').hide();
                        $su('#step2').fadeIn("500");
                    } else {
                        $su('p.message.fail').fadeIn("500");
                    }
                });
            }
            return false;
        });

        $su("#step1 input").keypress(function(e) {
            if (e.keyCode == 13) {
                $su("#btn1").click();
                return false;
            }
        });
        $su("#btn2").click(function() {
            var passed = true;
            $su('p.message.fail').hide();
            var name = $su('#txtName')[0].value;
            var email = $su('#txtEmail')[0].value;
            var phone = $su('#txtTelephone')[0].value;
            if (email.match(/[\w\.-]+(\+[\w-]*)?@([\w-]+\.)+[\w-]+/) == null) {
                passed = false;
                $su('#errEmail').show();
            }
            // 2008-09-02 MSG: Removed this to allow phone numbers from around the world.
            //	        if(phone != "" && phone.match(/((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/) == null) {
            //	            passed = false;
            //	            $su('#errPhone').show();
            //	        }

            if (passed) {
                $su.get(SignUpForm.signupUrl, { Action: "CheckEmail", Email: email }, function(data) {
                    if (data == "True") {
                        $su('#step2').hide();
                        $su('#step3').fadeIn("500");
                    } else {
                        $su('#errEmailDup').fadeIn("500");
                    }
                });
            }
            return false;
        });

        $su("#step2 input").keypress(function(e) {
            if (e.keyCode == 13) {
                $su("#btn2").click();
                return false;
            }
        });
        $su("#btn3").click(function() {
            $su('p.message.fail').hide();
            if ($su('#password1')[0].value != $su('#password2')[0].value)
                $su('#pMatch').fadeIn("500");
            else if ($su('#password1')[0].value == "" && $su('#password2')[0].value == "")
                $su('#pPassword').fadeIn("500");
            else {
                $su('#pMatch').hide();
                $su('#step3').hide();
                $su('#step4').fadeIn("500");
            }
            return false;
        });

        $su("#step3 input").keypress(function(e) {
            if (e.keyCode == 13) {
                $su("#btn3").click();
                return false;
            }
        });
        $su("#btn4").click(function() {
            if (!$su('#chkTerms')[0].checked)
                $su('#pTerms').fadeIn("500");
            else {
                if (!window.makingWebsite) {
                    window.makingWebsite = true;
                    $su('#pWebsiteCreating').show();
                    $su('#pTerms').hide();
                    $su('#pBlankError').hide();
                    $su.get(SignUpForm.signupUrl, { Action: "Signup", WebsiteID: $su('#address')[0].value.replace(/[^A-Za-z0-9]/g, ""), Name: $su('#txtName')[0].value, Email: $su('#txtEmail')[0].value, Phone: $su('#txtTelephone')[0].value, Password: $su('#password1')[0].value, SalesPerson: $su('#salesPerson')[0].value, PromoCode: $su('#PromoCode')[0].value, ProductID: window.productID, Origin: window.origin }, function(data) {
                        $su('#pWebsiteCreating').hide();
                        if (data == "True") {
                            var websiteID = $su('#address')[0].value;
                            $su('#step5 a').each(function(i) {
                                this.href = decodeURIComponent(this.href).replace(/\{0\}/, websiteID);
                                $su(this).html($su(this).html().replace(/\{0\}/, websiteID));
                            });

                            var tCode = ["UA-370355-2", "UA-370355-5", "UA-370355-1"];

                            var pageTracker = _gat._getTracker(tCode[(window.origin == "water" ? 2 : (window.origin == "light" ? 1 : 0))]);
                            pageTracker._trackPageview("/Created-Site");

                            $su('#step4').hide();
                            $su('#step5').fadeIn("500");
                        } else {
                            var message = $su('#pBlankError');
                            message.html(data);
                            message.fadeIn("500");
                        }
                        //Allow the sign-up form to be used again.
                        window.makingWebsite = false;
                    });
                }
            }
            return false;
        });

        $su("#step4 input").keypress(function(e) {
            if (e.keyCode == 13) {
                $su("#btn4").click();
                return false;
            }
        });
        $su("#prev1").click(function() {
            $su('#step2').hide();
            $su('#step1').fadeIn("500");
            return false;
        });
        $su("#prev2").click(function() {
            $su('#step3').hide();
            $su('#step2').fadeIn("500");
            return false;
        });
        $su("#prev3").click(function() {
            $su('#step4').hide();
            $su('#step3').fadeIn("500");
            return false;
        });

        //Password strength detection.
        $su('#password1').keyup(function() {
            if (passwordStrength($su('#password1')[0].value, $su('#txtEmail')[0].value)) {
                $su('#pWeak').hide();
                $su('#step3 p.message.success').fadeIn("500");
            } else {
                $su('#step3 p.message.success').hide();
                $su('#pWeak').fadeIn("500");
            }
        });

        $su("#termsService")[0].href = "http://" + location.host + "/terms-of-service";
        $su("#privacyPolicy")[0].href = "http://" + location.host + "/privacy-policy";
    }
};

var shortPass = false;
var badPass = false;
var goodPass = true;
var strongPass = true;
function passwordStrength(password, username) {
    score = 0
    if (password.length < 4) { return shortPass }
    if (password.toLowerCase() == username.toLowerCase()) return badPass
    score += password.length * 4
    score += (checkRepetition(1, password).length - password.length) * 1
    score += (checkRepetition(2, password).length - password.length) * 1
    score += (checkRepetition(3, password).length - password.length) * 1
    score += (checkRepetition(4, password).length - password.length) * 1
    if (password.match(/(.*[0-9].*[0-9].*[0-9])/)) score += 5
    if (password.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)) score += 5
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) score += 10
    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) score += 15
    if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([0-9])/)) score += 15
    if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([a-zA-Z])/)) score += 15
    if (password.match(/^\w+$/) || password.match(/^\d+$/)) score -= 10
    if (score < 0) score = 0
    if (score > 100) score = 100
    if (score < 34) return badPass
    if (score < 68) return goodPass
    return strongPass
}
function checkRepetition(pLen, str) {
    var res = "";
    for (i = 0; i < str.length; i++) {
        repeated = true;
        for (j = 0; j < pLen && (j + i + pLen) < str.length; j++)
            repeated = repeated && (str.charAt(j + i) == str.charAt(j + i + pLen));
        if (j < pLen) repeated = false;
        if (repeated) {
            i += pLen - 1;
            repeated = false;
        }
        else {
            res += str.charAt(i);
        }
    }
    return res;
}