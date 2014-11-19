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

chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse){                             //this is where its not working
   
   var Videolink={ //Main: MainBody,
                   nod: "get it!!",
				   //videoQ: videos
				  };                                                                //working
     
   var test = { nod: "get it !!"};                                                              //working
  
   sendResponse(Videolink);
   
});	

/* $("body").mouseMove(function(e){ */

$("body").append("<div id='mytooltip'>Summary</div>");
//alert('!!!');

$("#mytooltip").show("fast");

$("#mytooltip").click(function(e){
    $("#mytooltip").hide(); 	
});

//function that find the main content
/* $(MainBody).find("p").each(function(index,pasg){
   $("#mytooltip").append("<p>"+$(pasg).text()+"</p>");
   //tst=pasg.text();
}); */
//reserved

var content = $("div[id*='content']"); 
var contentA = $("div[id*='content']");
var main = $("div[id*='main']");

//$("#mytooltip").append(content);






	
	


