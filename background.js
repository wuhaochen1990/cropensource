var cache = new Array();

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
	    if(request.greeting == "linksToBack") cache = request.links.slice();
		if(request.greeting == "giveMeLinks") {
		   var response = { links: cache };
		   sendResponse(response);
		}
      
})