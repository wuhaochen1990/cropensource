var divColor;
var ChangeOrNot=false;
var stat = "on";
var ContentID = null;

$("body").append("<div id='mytooltip'>Summary<input id ='displayBar' value='div id'><button id = 'add'>add</button> </div>");

$("#mytooltip").click(function(e){
   // $("#mytooltip").hide(); 	
});
/* $("body").find("div").hover(
	function(e){
	    e.stopPropagation();
	   if(stat == "on"){
		divColor = $(this).css("background-color");
		$(this).css({"background-color":"yellow"});
		$(this).click(function(){
			//
		});
		}
	   //if(stat=="not changing"){alert('!!!');}

	},function(e){
	   // if(stat == "on"){
	    //e.stopPropagation();
		$(this).css({"background-color":divColor});
		//}

	}
); */

$("body").find("div").click(
       function(e){
	     e.stopPropagation();
	     divColor = $(this).css("background-color");
		$(this).css({"background-color":"yellow"});
		ContentID = this.id.slice() ;
		//$("#displayBar").value = ContentID;
        document.getElementById('displayBar').value = ContentID; 
		 //alert(ContentID);		
	   }	
	)

 chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse){                             //this is where its not working
                                            
   ChangeOrNot = request.turn;
   if(request.greeting=="hello")stat = "on";
   else stat="off";
    
   var Mcont={ //main: tstJson,
               nod: stat
		     };                                                               
   //if(request.greeting == "array")alert(request.array);             
   sendResponse(Mcont);
    //alert("hello end");
});	

function add(e){
   
   if(ContentID != null){
        chrome.runtime.sendMessage({ greeting:"giveMeUrl", divID: ContentID},
		function(response){
		
		});
		
    }
}

$("#add").click(add);


	
	


