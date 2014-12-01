var jsons
var canvas  = document.getElementById('canvas');
var left_panel  = document.getElementById('leftPanel');
var right_panel  = document.getElementById('rightPanel');

window.onload = function(){
     chrome.runtime.sendMessage({greeting : "giveMeLinks"},
	 function(response){		 
		 
		 jsons = response.jsons;
		 var size = jsons.length;
		 //alert("get the message: "+ response.links);
		 //alert(size);
		
		for(var index in jsons){	
		 var dv = document.createElement('div');
		 //dv.setAttribute("class", "dv");
		 var ifr=document.createElement('iframe');
		 
		 var url = jsons[index].url;
		 var top = jsons[index].attr.top;
		 var left = jsons[index].attr.left;
		 var height = jsons[index].attr.height;
		 var width = jsons[index].attr.width;
		 var clWidth = jsons[index].attr.clWidth;
		 //alert(url);
		 dv.setAttribute("style", "overflow:hidden; width:"+width);
		 ifr.setAttribute("src",url);
		 ifr.setAttribute("style", "margin-top:" + (-top) + "; margin-left:" + (-left) + "; width : "+ clWidth+";height:"+(height+top)+";	");
		 
		 //alert(top+" "+left); 
		 //document.body.appendChild(dv);
		 
		 
		 
		 var imgConteiner = document.createElement('div');
		 imgConteiner.setAttribute("class", "screen");
		 canvas.appendChild(imgConteiner);
		 
		 //var label = document.createElement('div');
		 //label.className = 'labelClass'; 
		 //label.style.width = newWidth; 
		 //label.innerHTML = index;
		 //imgConteiner.appendChild(label);		 
		 
		 var img = document.createElement('img');
		 img.onload = imgConteiner.appendChild(img);
		 img.src = jsons[index].screen;
		 var newWidth = 200;
		 var orgWidth = img.width;
		 var orgHeight = img.height;
		 var newHeight = img.height - ((img.height * (100 - ((newWidth * 100)/img.width)))/100);
		 img.width = newWidth;
		 img.height = newHeight;
		 
		 var label2 = document.createElement('div');
		 label2.className = 'labelClass'; 
		 label2.style.width = newWidth; 
		 label2.innerHTML = jsons[index].url.split(/\//)[2];
		 imgConteiner.appendChild(label2);
		 
		 var btnConteiner = document.createElement('div');
				
		var btnLeft = document.createElement('div');
		btnLeft.id = index + "L"; 
		btnLeft.className = 'bntLeftClass'; 
		btnLeft.setAttribute("name", "btnLeft"); 
		//var panel = 'left_panel';
		//btnLeft.onclick = func_insertContent('left_panel');
		btnLeft.innerHTML = 'Left';
		
		var btnRight = document.createElement('div');
		btnRight.id = index + "R";
		btnRight.className = 'bntRightClass'; 
		btnRight.setAttribute("name", "btnRight");
		//var panel = 'right_panel';
		//btnRight.onclick = function(tabId, tabUrl, panel) { return function() {func_insertContent(tabId, tabUrl, panel); }; }(i, aUrls[i].url, panel);
		btnRight.innerHTML = 'Right';
		
		btnConteiner.appendChild(btnLeft);
		btnConteiner.appendChild(btnRight);
		imgConteiner.appendChild(btnConteiner);
	    };
		
		var lefts = document.getElementsByName('btnLeft');
		for(var i=0; i<lefts.length; i++){
			lefts[i].addEventListener('click',func_left);
		}

		var rights = document.getElementsByName('btnRight');
		for(var i=0; i<rights.length; i++){
			rights[i].addEventListener('click',func_right);
		}
		
	});
}


function func_left(){
	while(left_panel.firstChild){
	    left_panel.removeChild(left_panel.firstChild);
	}
	var index = parseInt(this.id);	
	var dv = document.createElement('div');
	 //dv.setAttribute("class", "dv");
	 var ifr=document.createElement('iframe');		 
	 var url = jsons[index].url;
	 var top = jsons[index].attr.top;
	 var left = jsons[index].attr.left;
	 var height = jsons[index].attr.height;
	 var width = jsons[index].attr.width;
	 var clWidth = jsons[index].attr.clWidth;
	 //alert(url);
	 dv.setAttribute("style", "overflow:hidden; width:"+width);
	 ifr.setAttribute("src",url);
	 ifr.setAttribute("style", "margin-top:" + (-top) + "; margin-left:" + (-left) + "; width : "+ clWidth+";height:"+(height+top)+";	");
	left_panel.appendChild(dv);
	 dv.appendChild(ifr);
}	

function func_right(){
	while(right_panel.firstChild){
	    right_panel.removeChild(right_panel.firstChild);
	}
	var index = parseInt(this.id);
	var dv = document.createElement('div');
	 //dv.setAttribute("class", "dv");
	 var ifr=document.createElement('iframe');		 
	 var url = jsons[index].url;
	 var top = jsons[index].attr.top;
	 var left = jsons[index].attr.left;
	 var height = jsons[index].attr.height;
	 var width = jsons[index].attr.width;
	 var clWidth = jsons[index].attr.clWidth;
	 //alert(url);
	 dv.setAttribute("style", "overflow:hidden; width:"+width);
	 ifr.setAttribute("src",url);
	 ifr.setAttribute("style", "margin-top:" + (-top) + "; margin-left:" + (-left) + "; width : "+ clWidth+";height:"+(height+top)+";	");
	right_panel.appendChild(dv);
	 dv.appendChild(ifr);
}
   