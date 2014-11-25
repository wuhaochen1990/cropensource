var max=0;
var current;
var MainBody;
var divColor;
var ChangeOrNot=false;
var stat = "not changing";

$("body").append("<div id='mytooltip'>Summary</div>");

$("#mytooltip").click(function(e){
    $("#mytooltip").hide(); 	
});
$("div").hover(
	function(){
		divColor = $(this).css("background-color");
		$(this).css({"background-color":"yellow"});
		$(this).click(function(){
			//
		});

	},function(){
		$(this).css({"background-color":divColor});

	}


);


 
 chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse){                             //this is where its not working
   
   var Mcont={ //main: tstJson,
               nod: stat
		     };                                                               
                                                          
   ChangeOrNot = request.greeting;
   sendResponse(Mcont);
    //alert("hello end");
});	




	
	


