// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
 
$(document).ready(function(){
//$("body").append("<p>working!!</p>");
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {  
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
   
    console.log(response.nod);
	$("body").append("<p>"+ response.nod + "</p>");
	$(response.url).each(function(index,link){
     	$("body").append("<p>"+ link + "</p>");
	});
	
	
  });
});

function click(e) {
  chrome.tabs.create( {url:"about:blank"}, test );      
    //chrome.tabs.executeScript(null,{file: "Filter.js"},function(){});
 
}

function  test(tab){
    chrome.tabs.executeScript(
	tab.id,
    {code:"alert('!!!');"},
    function(){} 
	)
};

$("#OpenTab").click(click);
});