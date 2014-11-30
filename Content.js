var divColor;
var ChangeOrNot=false;
var stat = "on";
var ContentID = null;

$("body").append("<div id='mytooltip'>Summary<input id ='displayBar' value='div id'><button id = 'add'>add</button><button id='delete'>delete</button> </div>");

$("#mytooltip").click(function(e){
   // $("#mytooltip").hide(); 	
});

//get top by Xi
function getTop(e){
    var offset=e.offsetTop;
    if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
    return offset;
}

//get left by Xi
function getLeft(e){
    var offset=e.offsetLeft;
    if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);
    return offset;
}

$("body").find("div").click(
       function(e){
	    if(this.id != "mytooltip"){
	    e.stopPropagation();
	     divColor = $(this).css("background-color");
		$(this).css({"background-color":"yellow"});
		ContentID = this.id.slice() ;
		//$("#displayBar").value = ContentID;
        document.getElementById('displayBar').value = ContentID; 
		 //alert(ContentID);		
	   }	
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
        e.stopPropagation();        
		if(ContentID !=null){
		    var TargetDiv = document.getElementById(ContentID);
		    var top = getTop(TargetDiv);
		    var left = getLeft(TargetDiv);
			var height =  TargetDiv.offsetHeight;
			var width = TargetDiv.offsetWidth;
			var clWidth = document.body.clientWidth;
            chrome.runtime.sendMessage(
			    { greeting:"addingPage",
                  divID: ContentID, 
				  top:top, 
				  left:left,
				  height: height,
				  width: width,
				  clWidth: clWidth
				},
		        function(response){
		   
		        }
			);
		}
		else { $("#displayBar").val("pls select a content");}
		//alert("click");
    
}

$("#add").click(add);

function delet(e){
    chrome.runtime.sendMessage({greeting : "deletePage"},function(response){alert(response.lala);});
}

$("#delete").click(delet);

	

//save for dessertert
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
