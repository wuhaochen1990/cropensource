// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
 
$(document).ready(function(){

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { 
 
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    
     stat = response.nod;
	// alert("hello front");
	if(stat == "not changing")
	{
     	$("#customize").text('customize off');
    }
    else if(stat == "changing"){
        $("#customize").text('customize on');
    }

	$("body").append("<p>"+ stat + "</p>");
	$("body").append("<p>working!!</p>");
	//$("body").append(response.main);	
	
  });
});

var relaUrl=chrome.extension.getURL("result.html");

function click(e) {
  chrome.tabs.create( {url: relaUrl}, test );      
}

function  test(tab){
    chrome.tabs.executeScript(
	tab.id,
    {code:"alert('!!!');"},
    function(){} 
	)
};

function Hide(e){
  chrome.tabs.executeScript({code:"$('#mytooltip').css('display','none');"});
  
}

function Show(e){
  chrome.tabs.executeScript({code:"$('#mytooltip').css('display','incline');"});
 
}

$("#OpenTab").click(click);

$("#HideFloatDiv").click(Hide);

$("#ShowFloatDiv").click(Show);

chrome.tabs.query({},function(tabs){
    tabs.forEach(function(tab){
	    var url = tab.url;
      var title = tab.title;
		$("#urls").append("<input type='checkbox' >"+title+"<br>");
	});

});



});

