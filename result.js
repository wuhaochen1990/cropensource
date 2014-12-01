var jsons
var canvas  = document.getElementById('canvas');
var left_panel  = document.getElementById('leftPanel');
var right_panel  = document.getElementById('rightPanel');

window.onload = function(){
     chrome.runtime.sendMessage({greeting : "giveMeLinks"},
	 function(response){		 
		 
		 jsons = response.jsons;
		 var size = jsons.length;
		if(size == 0)
		{
			document.getElementById('noInfo').style.display = 'block';
			document.getElementById('noInfo').innerHTML = 'Nothing to Compare<br>Please Select Some Content on Any Website';
			document.getElementById('midlePanel').style.display = 'none';
			return;
		}
		else{
			document.getElementById('midlePanel').style.display = 'block';
		}
		
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
		 
		 var imgConteiner = document.createElement('div');
		 imgConteiner.setAttribute("class", "screen");
		 canvas.appendChild(imgConteiner);	 
		 
		 var img = document.createElement('img');
		 img.id = index + "P";
		 img.setAttribute("name", "screenshot"); 
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
		btnLeft.innerHTML = 'Left';
		
		var btnRight = document.createElement('div');
		btnRight.id = index + "R";
		btnRight.className = 'bntRightClass'; 
		btnRight.setAttribute("name", "btnRight");
		btnRight.innerHTML = 'Right';
		
		btnConteiner.appendChild(btnLeft);
		btnConteiner.appendChild(btnRight);
		imgConteiner.appendChild(btnConteiner);
	    }
		
		func_init(size);
		
		var lefts = document.getElementsByName('btnLeft');
		for(var i=0; i<lefts.length; i++){
			lefts[i].addEventListener('click',func_left);
		}

		var rights = document.getElementsByName('btnRight');
		for(var i=0; i<rights.length; i++){
			rights[i].addEventListener('click',func_right);
		}
		
		var sss = document.getElementsByName('screenshot');
		for(var i=0; i<sss.length; i++){
			sss[i].addEventListener('click',func_left);
		}
		
	});
}

function func_init(count){
	if(count > 1){	
		var dv = document.createElement('div');
		 //dv.setAttribute("class", "dv");
		 var ifr=document.createElement('iframe');		 
		 var url = jsons[0].url;
		 var top = jsons[0].attr.top;
		 var left = jsons[0].attr.left;
		 var height = jsons[0].attr.height;
		 var width = jsons[0].attr.width;
		 var clWidth = jsons[0].attr.clWidth;
		 //alert(url);
		 dv.setAttribute("style", "overflow:hidden; width:"+width);
		 ifr.setAttribute("src",url);
		 ifr.setAttribute("style", "margin-top:" + (-top) + "; margin-left:" + (-left) + "; width : "+ clWidth+";height:"+(height+top)+";	");
		 left_panel.appendChild(dv);
		 dv.appendChild(ifr);
		 
		 var dv = document.createElement('div');
		 //dv.setAttribute("class", "dv");
		 var ifr=document.createElement('iframe');		 
		 var url = jsons[1].url;
		 var top = jsons[1].attr.top;
		 var left = jsons[1].attr.left;
		 var height = jsons[1].attr.height;
		 var width = jsons[1].attr.width;
		 var clWidth = jsons[1].attr.clWidth;
		 //alert(url);
		 dv.setAttribute("style", "overflow:hidden; width:"+width);
		 ifr.setAttribute("src",url);
		 ifr.setAttribute("style", "margin-top:" + (-top) + "; margin-left:" + (-left) + "; width : "+ clWidth+";height:"+(height+top)+";	");
		 right_panel.appendChild(dv);
		 dv.appendChild(ifr);
	}
	else{
		var dv = document.createElement('div');
		 //dv.setAttribute("class", "dv");
		 var ifr=document.createElement('iframe');		 
		 var url = jsons[0].url;
		 var top = jsons[0].attr.top;
		 var left = jsons[0].attr.left;
		 var height = jsons[0].attr.height;
		 var width = jsons[0].attr.width;
		 var clWidth = jsons[0].attr.clWidth;
		 //alert(url);
		 dv.setAttribute("style", "overflow:hidden; width:"+width);
		 ifr.setAttribute("src",url);
		 ifr.setAttribute("style", "margin-top:" + (-top) + "; margin-left:" + (-left) + "; width : "+ clWidth+";height:"+(height+top)+";	");
		 left_panel.appendChild(dv);
		 dv.appendChild(ifr);
		 
		 var dv = document.createElement('div');
		 //dv.setAttribute("class", "dv");
		 var ifr=document.createElement('iframe');		 
		 var url = jsons[0].url;
		 var top = jsons[0].attr.top;
		 var left = jsons[0].attr.left;
		 var height = jsons[0].attr.height;
		 var width = jsons[0].attr.width;
		 var clWidth = jsons[0].attr.clWidth;
		 //alert(url);
		 dv.setAttribute("style", "overflow:hidden; width:"+width);
		 ifr.setAttribute("src",url);
		 ifr.setAttribute("style", "margin-top:" + (-top) + "; margin-left:" + (-left) + "; width : "+ clWidth+";height:"+(height+top)+";	");
		 right_panel.appendChild(dv);
		 dv.appendChild(ifr);
	}
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

document.getElementById('btnLeft').addEventListener('click',func_toLeft,false);
document.getElementById('btnRight').addEventListener('click',func_toRight,false);
document.getElementById('btnTwo').addEventListener('click',func_two,false);
document.getElementById('btnHelp').addEventListener('click',func_help,false);
document.getElementById('helpClose').addEventListener('click',func_helpClose,false);
document.getElementById('btnSHowHide').addEventListener('click',func_Dock,false);

function func_toLeft()
{
	//document.getElementById('leftPanel').style.display = 'none';
	//document.getElementById('rightPanel').style.display = 'block';
	document.getElementById('rightPanel').style.width = '56%';
	document.getElementById('leftPanel').style.width = '40%';
}
function func_toRight()
{
	//document.getElementById('leftPanel').style.display = 'block';
	//document.getElementById('rightPanel').style.display = 'none';
	document.getElementById('leftPanel').style.width = '56%';
	document.getElementById('rightPanel').style.width = '40%';
}
function func_two()
{
	//document.getElementById('leftPanel').style.display = 'block';
	//document.getElementById('rightPanel').style.display = 'block';
	document.getElementById('leftPanel').style.width = '48%';
	document.getElementById('rightPanel').style.width = '48%';
}
function func_help()
{
	document.getElementById('help').style.display = 'block';
}
function func_helpClose()
{
	document.getElementById('help').style.display = 'none';
}
function func_Dock()
{
	if(document.getElementById('canvas').style.display == 'none')
		document.getElementById('canvas').style.display = 'block';
	else
		document.getElementById('canvas').style.display = 'none';
}
   