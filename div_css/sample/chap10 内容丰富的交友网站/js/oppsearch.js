function chooseGeocodeOption(el) {
  updateInput('location', $(el).text());
  $("#oppsearchform").get(0).submit();
}

function sendLocationInfo(loc, marks) {
  $.ajax({url:"/search/marks.jsp",type:"post",async:false,data:{location: loc, gmarks: marks}});
}

function updateInput(id, val) {
  if (val != null) {
    var el = $('#oppsearchform #' + id);
    if (el.length == 0) {
      $('#oppsearchform').prepend('<input type="hidden" name="' + id + '" id="' + id + '" value="">');
    }
    $('#oppsearchform #' + id).val(val);
  }
}

$(document).ready(function() {
  function hideLabel(tgt, hide) {
    var lbl = tgt.vmLabelledBy;
    $(lbl).css('textIndent', hide ? '-1000px' : '0px');
  }

  // fix up search labels
  $('label.overlabel').each(function() {
    var lbl = $(this);
    var tgt = $('#' + lbl.attr('for'));

    if (tgt !== undefined) {
      var el = tgt.get(0);

      el.vmLabelledBy = this;
      this.vmLabels = el;
      lbl.addClass('overlabelapply');

      if (tgt.val() !== '') {
        hideLabel(el, true);
      }

      tgt.focus(function(evt) {
        hideLabel(evt.target, true);
      });

      tgt.blur(function(evt) {
        if ($(evt.target).val() === '') {
          hideLabel(evt.target, false);
        }
      });

      lbl.click(function(evt) {
        evt.target.vmLabels.focus();
      });
    }
  });

  function disableLocation(status) {
    if (status) {
      $("#location").val("").attr("disabled","disabled").blur();
    } else {
      $("#location").removeAttr("disabled").blur();
    }
  }

  $('#virtualopps').click(function() {
    disableLocation(this.checked);
  });

  disableLocation($('#virtualopps:checked').length == 1);

  var geocoder = null;
  if (typeof(GBrowserIsCompatible) != "undefined" && GBrowserIsCompatible()) {
    geocoder = new GClientGeocoder();
  }

  $('#oppsearchform').submit(function() {
    var virtual = $("#virtualopps:checked").val() != null;

    if (virtual) {
      return true;
    }

    var location = $("#location").val();

    $("#geocodelocations").hide();

    if (location === "") {
      $("#innererror").text("Please enter a location, or choose to search for Virtual opportunities.");
      $("#searcherror").show();

      return false;
    }

    if (geocoder === null) {
      return true;
    }

    // clear any errors
    $("#searcherror").hide();
    geocoder.getLocations(location, handleGC);
    return false;
  });

  function handleGC(response) {
    var code = !response ? -1 : response.Status.code;

    if (code == 500 || code == 603 || code == 620) {
      // failure that could be browser related; pass off to server
      $("#oppsearchform").get(0).submit();
    } else if (code == -1 || code != 200) {
      // no result, or any other error
      $("#innererror").text("Your location couldn't be found; please try again.");
      $("#searcherror").show();
    } else {
      // geocoding success

      //we are no longer posting client-side geocoding data.  Google's js geocoder has proven unreliable
      //sendLocationInfo($("#location").val(), $.toJSON(response.Placemark));
      
      if (response.Placemark.length == 1) {
        $("#oppsearchform").get(0).submit();
      } else {
        var usMarks = new Array();
        var html = "<p>Did you mean:</p><ul>";
        for (var index in response.Placemark) {
          var mark = response.Placemark[index];

          var country = mark.AddressDetails;
          if (country) {
            country = country.Country;

            if (country) {
              country = country.CountryNameCode;
            }
          }

          if (country == "US" || country == "USA") {
            usMarks.push(mark);
            html += "<li><a href=\"javascript:void(null);\" onclick=\"chooseGeocodeOption(this);\">";
            html += response.Placemark[index].address;
            html += "</a></li>";
          }
        }
        html += "</p>";

        if (usMarks.length == 0) {
          $("#innererror").text("Your location couldn't be found; please try again.");
          $("#searcherror").show();
        } else {
          $('#geocodelocations').html(html).show();
        }
      }
    }
  };

});