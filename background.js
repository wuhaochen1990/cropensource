var cache = new Array();
var cacheFromTabs = new Array();
var ContentJSONs = new Array();
var userColor;
var userHelper;

//contextMenu
creatMenu();

chrome.storage.sync.get({
    favoriteColor: 'red',
    enableHelper: 'yes'
  }, function(items) {
    userColor = items.favoriteColor;
	userHelper = items.enableHelper;
});
  
chrome.storage.onChanged.addListener(function(changes, namespace){
     for (key in changes) {
	    if(key == "favoriteColor"){
		    var storageChange = changes[key];
            console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      key,
                      namespace,
                      storageChange.oldValue,
                      storageChange.newValue);
			userColor = storageChange.newValue;
		}
		else if(key == "enableHelper"){
		    var storageChange = changes[key];
			userHelper = storageChange.newValue;
		}
    }

	chrome.tabs.query({currentWindow: true}, function(tabs) {
	    var message = {greeting: "colorChanged", color : userColor, helper: userHelper};
		for(var i =0; i<tabs.length; ++i){ 
    	    chrome.tabs.sendMessage(tabs[i].id, message);
		}	
    });	
});
  
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
	    //if(request.greeting == "linksToBack") cache = request.links.slice();
		if(request.greeting == "giveMeLinks") {
		   cache = ContentJSONs;
		   var response = { jsons: cache };
		   sendResponse(response);
		}
		if(request.greeting =="addingPage"){
		    var url ;
		    chrome.tabs.query({active:true},
			    function(tabs){
				   url = tabs[0].url.slice();
				   
				   chrome.tabs.captureVisibleTab(null, {}, function (image) 
					{					
					var node = {url:url, screen:image, attr:request};
				    ContentJSONs.push(node);
					
					var selectedCount = ContentJSONs.length;
					chrome.contextMenus.update("delete", {"enabled" : true} );
					chrome.contextMenus.update("result", {"enabled" : true} );								
					});
				   
				   
				   //var node = {url:url, attr:request};
				   //ContentJSONs.push(node);
				});
			var response = { links : cacheFromTabs};
			sendResponse(response);
			
			
		}
        if(request.greeting == "cacheFromTabs"){
		     var response = { links : cacheFromTabs};
			 sendResponse(response);
		}
		
		if(request.greeting == "deletePage"){		    
		    var url;
			var delIndex = new Array();
			chrome.tabs.query({active:true},
			function(tabs){
			   url = tabs[0].url.slice();
				 for(var p in request.pos){
					var ps = request.pos[p].split(",");
					for(var index in ContentJSONs){											
						if(ContentJSONs[index].url == url){
							if(ps[0] == ContentJSONs[index].attr.top && ps[1] == ContentJSONs[index].attr.left){
								ContentJSONs.splice(index,1);
								if(selectedCount < 1){
									chrome.contextMenus.update("delete", {"enabled" : false} );
									chrome.contextMenus.update("result", {"enabled" : false} );
								}
							}
						}
					}						
				}
				response={lala:"deleted"};
				sendResponse(response);
			});	  	    
		}
		
		
		if(request.greeting == "clearup"){
		    ContentJSONs=[];			
			chrome.tabs.query({currentWindow: true}, function(tabs) {
			var message = {greeting: "clearUp"};
				for(var i =0; i<tabs.length; ++i){ 
					chrome.tabs.sendMessage(tabs[i].id, message);
				}	
			});
		}
		if(request.greeting == "giveMeColor"){
		    var response = {color: userColor};
			sendResponse(response);
		}
		if(request.greeting == "giveMeHelper"){
		    var response = {helper: userHelper};
			sendResponse(response);
		}
})

//here are contextMenu options
function creatMenu()
{
	chrome.contextMenus.create(
	{
		"id" : "main",
		"title" :  "PageMerger",
		"contexts" : ["all"],
		"enabled" : true
	});

	chrome.contextMenus.create(
	{
		"id" : "add",
		"title" : "Add",
		"contexts" : ["all"],
		"parentId" : "main",	
		"enabled" : true
	});

	chrome.contextMenus.create(
	{
		"id" : "delete",
		"title" : "Delete",
		"contexts" : ["all"],
		"parentId" : "main",	
		"enabled" : false
	});	
	
	chrome.contextMenus.create(
	{
		"id" : "result",
		"title" : "Merge",
		"contexts" : ["all"],
		"parentId" : "main",	
		"enabled" : false		
	});
}

//function when an option is clicked
chrome.contextMenus.onClicked.addListener(function(info, tab){
	if(info.menuItemId == 'add'){
		chrome.tabs.sendMessage(tab.id, { greeting:"addUserSelect"});
	}
	else if(info.menuItemId == 'delete'){
		chrome.tabs.sendMessage(tab.id, { greeting:"delUserSelect"});		
	}
	else if(info.menuItemId == 'result'){
		var relaUrl=chrome.extension.getURL("result.html");
		chrome.tabs.create( {url: relaUrl}, function(){} );
		//cache = ContentJSONs;		
	}                                   
});

