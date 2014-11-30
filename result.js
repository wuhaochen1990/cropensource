window.onload = function(){
     chrome.runtime.sendMessage({greeting : "giveMeLinks"},
	 function(response){
	     var urlList = response.links;
		 var size = urlList.length;
		 //alert("get the message: "+ response.links);
		for(var index in urlList){	
		 var ifr=document.createElement('iframe');
		 ifr.setAttribute("width", document.body.clientWidth*0.95/size);
		 ifr.setAttribute("height", document.body.clientHeight);
		 //ifr.setAttribute("onload", "Content.js");
		 //ifr.addEventListener("load", "Content.js");
		 var url = urlList[index];
		// //alert(url);
		 ifr.setAttribute("src",url);
		 document.body.appendChild(ifr);
	  };
		
});

alert("@@!");
$("iframe").load(function(){
    
    var divColor;
	var stat = "on";
	$("div").hover(
    	function(){ 
     		if(stat == "on"){
		       divColor = $(this).css("background-color");
		       $(this).css({"background-color":"yellow"});
		       $(this).click(function(){
			     
				});
		    }
	         //if(stat=="not changing"){alert('!!!');}

	    },
		function(){
	        if(stat == "on"){
		        $(this).css({"background-color":divColor});
		    }
	    }
    );
	
});
}
   