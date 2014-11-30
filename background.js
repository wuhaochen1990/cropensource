var cache = new Array();
var cacheFromTabs = new Array();

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
	    if(request.greeting == "linksToBack") cache = request.links.slice();
		if(request.greeting == "giveMeLinks") {
		   var response = { links: cache };
		   sendResponse(response);
		}
		if(request.greeting =="SendingDiv"){
		    var url ;
		    chrome.tabs.query({active:true},
			    function(tabs){
				   url = tabs[0].url.slice();
				   cacheFromTabs.push(url);
				}
			
			)
		};
        
})