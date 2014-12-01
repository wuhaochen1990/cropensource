var divColor;
var ChangeOrNot=false;
var stat = "on";
var ContentID = null;
var lastTar = null;
var count = 0;
var userColor;
var userHelper;

$("body").append("<div id='mytooltip'><div id = 'close' align = right vertical-align = top>[X]</div><h1>Seletion Helper<h1><br>ID of Selected div:  <input id ='displayBar' value='div id'>	<button id = 'add'>add</button>	<button id='delete'>delete</button><div id='select'></div></div>");

$("#mytooltip").click(function(e){
   // $("#mytooltip").hide(); 	
});

chrome.runtime.sendMessage({greeting: "giveMeColor"},
    function(response){
        userColor = response.color;
    }
);

chrome.runtime.sendMessage({greeting: "giveMeHelper"},
    function(response){
        userHelper = response.helper;
		if(userHelper == 'no'){
			document.getElementById("mytooltip").style.display = 'none';
		}
		else{
			document.getElementById("mytooltip").style.display = 'block';
		}
    }
);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
	    if(request.greeting == "colorChanged")
		{
		   userColor = request.color;
		   userHelper = request.helper;
		   console.log("userColor = "+ userColor);	
			if(userHelper == 'no')
				document.getElementById("mytooltip").style.display = 'none';
			else
				document.getElementById("mytooltip").style.display = 'block';
		}
		else if(request.greeting == "addUserSelect")
			add();
		else if(request.greeting == "delUserSelect")
			delet2();
		else if(request.greeting == "clearUp")
			clear();
	}
);

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
		//alert(userColor);
		$(this).css({"background-color": userColor});
		ContentID = this.id.slice() ;
		//$("#displayBar").value = ContentID;
        document.getElementById('displayBar').value = ContentID; 
		 //alert(ContentID);		
		lastTar = this;
	   }	
	   }
	)

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
				dv.innerHTML += (++count) +". div [ID: " + ContentID + " Position: (" + top + "," + left + ")]<br>";
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
	$(lastTar).css({"background-color":divColor});
	chrome.runtime.sendMessage({greeting : "deletePage", pos : temp},function(response){alert(response.lala);});
}

$("#delete").click(delet);

function delet2(e){
    var top = getTop(lastTar);
	var left = getLeft(lastTar);
	var value = top + "," + left;
	var temp = new Array();
	temp.push(value);
	var fm = document.getElementById('select');
	var c = document.getElementById(value);
	fm.removeChild(c);
	$(lastTar).css({"background-color":divColor});
	chrome.runtime.sendMessage({greeting : "deletePage", pos : temp},function(response){alert(response.lala);});
}

function clear(){
	var fm = document.getElementById('select');
	while(fm.firstChild){
	    fm.removeChild(fm.firstChild);
	}
}	

//$("#mytooltip").append("<button id = 'clean'>clear up</button>");
//$("#clean").click(clear);

$("#close").click(function(e){$("#mytooltip").hide();});
