// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
 var stat;
 var urlList = new Array();
  

 
$(document).ready(function(){

var relaUrl=chrome.extension.getURL("result.html");

chrome.runtime.sendMessage({greeting:"giveMeLinks"},
    function(response){
	    var JSONs =  response.jsons;
		for(var index in JSONs){
	    var url = response.jsons[index].url;
		$("#urls").append(url+"<br>");
		}
	}
);
  

function OpenResult(){
    //chrome.runtime.sendMessage({greeting: "OpenDirectly"}, 
	//     function(response){
		    //alert(response.links);
	//	 });
	chrome.tabs.create( {url: relaUrl}, function(){} ); 
}

function Clear(){
    chrome.runtime.sendMessage({greeting:"clearup"},
	function(response){
	});
	var fm = document.getElementById('urls');
	while(fm.firstChild){
	    fm.removeChild(fm.firstChild);
	}
}

$("#OpenDirectly").click(OpenResult);
$("#clear").click(Clear);

});

