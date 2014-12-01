var divColor;
var ChangeOrNot=false;
var stat = "on";
var ContentID = null;
var lastTar = null;
var count = 0;

$("body").append("<div id='mytooltip'>Summary<input id ='displayBar' value='div id'><button id = 'add'>add</button><button id='delete'>delete</button><div id='select'></div></div>");

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
	    if(this.id != "mytooltip" && this.id != "select"){
	    e.stopPropagation();		
		if(lastTar != null){
			$(lastTar).css({"background-color":divColor});
		}		
	    divColor = $(this).css("background-color");
		$(this).css({"background-color":"yellow"});
		ContentID = this.id.slice() ;
		//$("#displayBar").value = ContentID;
        document.getElementById('displayBar').value = ContentID; 
		 //alert(ContentID);		
		lastTar = this;
	   }	
	   }
	)

 /*chrome.runtime.onMessage.addListener(
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
});	*/

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.greeting == "addUserSelect")
		add();
	else if(request.greeting == "delUserSelect")
		delet();
});  

function add(){
        //e.stopPropagation();        
		//if(ContentID !=null){
		    //var TargetDiv = document.getElementById(ContentID);
			var TargetDiv = lastTar;
		    var top = getTop(TargetDiv);
		    var left = getLeft(TargetDiv);
			var height =  TargetDiv.offsetHeight;
			var width = TargetDiv.offsetWidth;
			var clWidth = document.body.clientWidth;
			var flag = false;
			var r = document.getElementsByName("r");
			for(var i=0;i<r.length;i++){
				if(r[i].value == top+","+left){
					flag = true;
					break;
				}
			}
			if(flag == false){
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
				var fm = document.getElementById('select');
				var dv = document.createElement('div');
				dv.id = top + "," + left;
				var rec = document.createElement('input');
				//rec.setAttribute("style", "height:30px");			
				rec.type = "checkbox";
				rec.name = "r";
				rec.value = top + "," + left;
				fm.appendChild(dv);
				dv.appendChild(rec);
				dv.innerHTML += (++count) +". div is added. [ID: " + ContentID + " Position: (" + top + "," + left + ")]<br>";
			}
		//}
		//else { $("#displayBar").val("pls select a content");}
		//alert("click");
    
}

$("#add").click(add);

function delet(e){
    var r = document.getElementsByName("r");
	var fm = document.getElementById('select');
	var temp = new Array();
	var del = new Array();
	for(var i=0;i<r.length;i++){
        if(r[i].checked){
			temp.push(r[i].value);
			var c = document.getElementById(r[i].value);
			del.push(c);
        }
    }
	for(var j in del){
		fm.removeChild(del[j]);
	}
	chrome.runtime.sendMessage({greeting : "deletePage", pos : temp},function(response){alert(response.lala);});
	
}

$("#delete").click(delet);

function clear(){
    chrome.runtime.sendMessage({greeting:"clearup"},
	function(response){
	});
	var fm = document.getElementById('select');
	while(fm.firstChild){
	    fm.removeChild(fm.firstChild);
	}
}	

$("#mytooltip").append("<button id = 'clean'>clear up</button>");
$("#clean").click(clear);
	

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
