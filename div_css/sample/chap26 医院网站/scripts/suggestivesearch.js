$(window).load(function(){$(document).click(function(A){var B=$(A.target);
if(typeof B==="object"){if(B.className!=="searchSuggestDiv"&&B.className!=="psearchList"&&B.id!=="query"){$("#psearchSuggest").slideUp(90,function(){$(this).remove()
})
}}});
$("#search-site-form .btn").focus(function(){$("#psearchSuggest").slideUp(90,function(){$(this).remove()
})
});
$("#query").attr({autocomplete:"off",autofill:"off"});
var D=undefined;
$("#query").bind("keyup",function(J){var I=this.value;
if(J.which===8||J.which===32||(48<=J.which&&J.which<=57)||(65<=J.which&&J.which<=90)||(97<=J.which&&J.which<=122)){if(this.value.length>=3){var H=$("#query").offset().left-20;
var B=$("#search-site-form").offset().top+$("#search-site-form").height();
if(!document.getElementById("psearchSuggest")){div=newEl("div",{className:"searchSuggestDiv",id:"psearchSuggest"});
document.body.appendChild(div)
}var A=(this.value.length===3)?0:175;
if(D!==undefined){clearTimeout(D)
}D=setTimeout(function(){D=undefined;
$.getJSON("/suggest/search/"+jQuery.trim(I),"",function(E){if(E==null){$("#psearchSuggest").slideUp(90,function(){$(this).remove()
})
}else{$("#psearchSuggest").css({top:B,left:H});
C(E)
}})
},A)
}else{$("#psearchSuggest").slideUp(90,function(){$(this).remove()
})
}}});
$("#query").keydown(function(A){if(A.which==40){$("#psearchSuggest a:first").focus().addClass("focused");
displaySuggestion($("a.psearchSuggestions.focused").text());
A.preventDefault();
return false
}});
function C(O){$("#psearchSuggest").html("");
if(!document.getElementById("psearchSuggest")){div=newEl("div",{className:"searchSuggestDiv",id:"psearchSuggest"});
document.body.appendChild(div)
}var N=0;
var L,P="";
var K,A,M;
for(j=0;
j<O.length;
++j){M=newEl("h2",{},O[j].heading);
K=newEl("ul",{className:"psearchList"});
for(k=0;
k<O[j].values.length;
++k){if(O[j].values[k].url!==null){L="psearchOffers";
P=O[j].values[k].url
}else{L="psearchSuggestions";
P="#"
}A=newEl("li",{className:L});
a=newEl("a",{href:P,className:L},O[j].values[k].term);
a.tabIndex=0;
A.appendChild(a);
K.appendChild(A);
$(a).data("currentPos",N);
$(a).keydown(function(E){traversePSearch(E,$(this).data("currentPos"))
});
a.onclick=(function(E){document.getElementById("query").value=this.innerHTML;
$("#psearchSuggest").slideUp(50);
$("#search-site-form").submit()
});
N++
}var B=document.getElementById("psearchSuggest");
B.appendChild(M);
B.appendChild(K);
$("#psearchSuggest").find("li").mousemove(function(){resetSuggestion();
$("#psearchSuggest a.focused").removeClass("focused")
}).end().mouseleave(function(E){if(!$("#psearchSuggest a.focused").length){$("#psearchSuggest a.hasFocus").addClass("focused")
}resetSuggestion()
});
if(jQuery.browser.msie&&(jQuery.browser.version<8)){$("#psearchSuggest a").attr("hideFocus","true")
}}$("#psearchSuggest").slideDown(50)
}});
function displaySuggestion(E){if($("a.psearchSuggestions.focused").length){var F=$("#query").val();
var D=E;
if(!$("#query").data("typedQuery")){$("#query").data("typedQuery",F)
}$("#query").val(D);
return true
}else{resetSuggestion()
}}function resetSuggestion(D){var C=$("#query").data("typedQuery");
$("#query").val(C);
$("#query").removeData("typedQuery");
return true
}function traversePSearch(D,F){var E=$("#psearchSuggest a").length;
switch(D.which){case 9:resetSuggestion();
$("#search-site-form .btn").focus();
D.preventDefault();
return false;
break;
case 40:if(F==(E-1)){}else{$(".searchSuggestDiv a.focused").removeClass("focused hasFocus");
$("#psearchSuggest a:eq("+(F+1)+")").focus().addClass("focused hasFocus");
displaySuggestion($("a.psearchSuggestions.focused").text())
}D.preventDefault();
return false;
break;
case 38:$(".searchSuggestDiv a.focused").removeClass("focused hasFocus");
if(F==0){resetSuggestion();
document.getElementById("query").focus()
}else{$("#psearchSuggest a:eq("+(F-1)+")").focus().addClass("focused hasFocus");
displaySuggestion($("a.psearchSuggestions.focused").text())
}D.preventDefault();
return false;
break;
case 13:break;
case 27:resetSuggestion();
$("#psearchSuggest").slideUp(90);
break;
default:$(".searchSuggestDiv a.focused").removeClass("focused hasFocus");
document.getElementById("query").focus();
break
}};