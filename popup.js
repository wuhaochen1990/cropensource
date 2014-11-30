// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
 var stat;
 var urlList = new Array();
  
chrome.tabs.query({},function(tabs){
    tabs.forEach(function(tab){
	    var url = tab.url;
      var title = tab.title;
		$("#urls").append("<input type='checkbox' value = "+ url + " >"+title+"<br>");
	});

});
 
$(document).ready(function(){

var relaUrl=chrome.extension.getURL("result.html");

function click(e) {
  $('input:checkbox:checked').each(function(){
	urlList.push($(this).val());
  });
  //alert(urlList);
  chrome.runtime.sendMessage({greeting: "linksToBack", links: urlList}, function(r){});
  chrome.tabs.create( {url: relaUrl}, function(){} );      
}



function ON(e){
   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { 
 
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    
     stat = response.nod;
	// alert("hello front");
	
	$("body").append("<p>"+ stat + "</p>");
	$("body").append("<p>working!!</p>");
	//$("body").append(response.main);	
	
  });
});
  
}

function OFF(e){
     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { 
 
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "Don't"}, function(response) {
    
     stat = response.nod;
	// alert("hello front");
	
	$("body").append("<p>"+ stat + "</p>");
	$("body").append("<p>working!!</p>");
	//$("body").append(response.main);	
	
  });
});
  
}

var tstA=new Array("aaaa","bbbb");

//this is a test, can be deleted in release.
function testButton(e){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { 
       chrome.tabs.sendMessage(tabs[0].id, {greeting: "array", array: tstA}, function(response) {
	      
    
        });
    });
}


$("#OpenTab").click(click);

$("#ON").click(ON);

$("#OFF").click(OFF);

//elements with test in their name can be deleted
$("body").append("<button id='testB'>sendArray</button>");

$("#testB").click(testButton);

function SeeSelected(){
    chrome.runtime.sendMessage({greeting: "OpenDirectly"}, 
	     function(response){
		    alert(response.links);
		 });
	chrome.tabs.create( {url: relaUrl}, function(){} ); 
}

$("#OpenDirectly").click(SeeSelected);

});

