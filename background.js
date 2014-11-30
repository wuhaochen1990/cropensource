var cache = new Array();
var cacheFromTabs = new Array();
var ContentJSONs = new Array();

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
	    if(request.greeting == "linksToBack") cache = request.links.slice();
		if(request.greeting == "giveMeLinks") {
		   var response = { jsons: cache };
		   sendResponse(response);
		}
		if(request.greeting =="addingPage"){
		    var url ;
		    chrome.tabs.query({active:true},
			    function(tabs){
				   url = tabs[0].url.slice();
				   var node = {url:url, attr:request};
				   ContentJSONs.push(node);
				});
			var response = { links : cacheFromTabs};
			sendResponse(response);
		};
        if(request.greeting == "cacheFromTabs"){
		     var response = { links : cacheFromTabs};
			 sendResponse(response);
		}
		if(request.greeting == "OpenDirectly"){
		    /* var temp = new Array();
			for( var index in ContentJSONs){
			    temp.push(ContentJSONs[index].url);
			}
			cache = temp.slice(); */
			cache = ContentJSONs;
		}
		if(request.greeting == "deletePage"){
		    
		    var url ;
		    chrome.tabs.query({active:true},
			    function(tabs){
				   url = tabs[0].url.slice();
				     for(var index in ContentJSONs){
			            if(ContentJSONs[index].url == url){
						    ContentJSONs.splice(index,1);
							response={lala:"deleted"};
							sendResponse(response);
						}
						
			        }
				  
				
				});
			 
		    
		};
})