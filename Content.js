var max=0;
var current;
var MainBody;
var divColor;

$("body").append("<div id='mytooltip'>Summary</div>");

$("#mytooltip").click(function(e){
    $("#mytooltip").hide(); 	
});
$("div").hover(
	function(){
		divColor = $(this).css("background-color");
		$(this).css({"background-color":"yellow"});
		$(this).click(function(){
			alert("hello");
		});

	},function(){
		$(this).css({"background-color":divColor});

	}


);

var content = $("div[id*='content']"); 
var contentA = $("div[id*='content']");
var main = $("div[id*='main']");

//$("#mytooltip").append(content);
 //$("#ThyResult").append(content);
 //alert("!!!");
 //var tstJson = $.toJSON(content);
 
 chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse){                             //this is where its not working
   
   var Mcont={ //main: tstJson,
               nod: "get it!!"
		     };                                                                //working
      
   //var test = { nod: "get it !!"};                                                              //working
  
   sendResponse(Mcont);
   
});	




	
	


