window.onload = function(){
     chrome.runtime.sendMessage({greeting : "giveMeLinks"},
	 function(response){
	     var jsons = response.jsons;
		 var size = jsons.length;
		 //alert("get the message: "+ response.links);
		for(var index in jsons){	
		 var dv = document.createElement('div');
		 dv.setAttribute("class", "dv");
		 var ifr=document.createElement('iframe');
		 
		 var url = jsons[index].url;
		 var top = jsons[index].attr.top;
		 var left = jsons[index].attr.left;
		 var height = jsons[index].attr.height;
		 var width = jsons[index].attr.width;
		 var clWidth = jsons[index].attr.clWidth;
		// //alert(url);
		 dv.setAttribute("style", "overflow:hidden; width:"+width);
		 ifr.setAttribute("src",url);
		 ifr.setAttribute("style", "margin-top:" + (-top) + "; margin-left:" + (-left) + "; width : "+ clWidth+";height:"+(height+top)+";	");
		 
		 //alert(top+" "+left); 
		 document.body.appendChild(dv);
		 dv.appendChild(ifr);
	  };
		
});

//alert("@@!");

}
   