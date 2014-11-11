var max=0;
var current;
var MainBody;
$("div").each(function(index,div){
       current = $(div).find("p").size();
	   if(current>max){
	       max=current;
		   MainBody=div;
		}

});

$(document).html("<html><head><body><p>Its working!!!!</p></body></head></html>");
alert("working")