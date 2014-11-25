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
	   if(stat == "on"){
		divColor = $(this).css("background-color");
		$(this).css({"background-color":"yellow"});
		$(this).click(function(){
			//
		});
		}
	   //if(stat=="not changing"){alert('!!!');}

	},function(){
	   if(stat == "on"){
		$(this).css({"background-color":divColor});
		}

	}


);


 
 chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse){                             //this is where its not working
   
   var Mcont={ //main: tstJson,
               nod: stat
		     };                                                               
                                                          
   ChangeOrNot = request.turn;
   if(request.greeting=="hello")stat = "on";
   else stat="off";
   sendResponse(Mcont);
    //alert("hello end");
});	





	
	


