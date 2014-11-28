window.onload = function(){
     chrome.runtime.sendMessage({greeting : "giveMeLinks"},
	 function(response){
	    alert("get the message: "+ response.links);
	     var urlList = response.links;
		for(var index in urlList){
		 var ifr=document.createElement('iframe');
		 var url = urlList[index];
		// //alert(url);
		 ifr.setAttribute("src",url);
		 document.body.appendChild(ifr);
	  };
	
	

	
	
});
}
   