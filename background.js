var cache = new Array();
var cacheFromTabs = new Array();
var ContentJSONs = new Array();

//contextMenu
creatMenu();

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
	    if(request.greeting == "linksToBack") cache = request.links.slice();
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
				   var node = {url:url, attr:request};
				   ContentJSONs.push(node);
				});
			var response = { links : cacheFromTabs};
			sendResponse(response);
		}
        if(request.greeting == "cacheFromTabs"){
		     var response = { links : cacheFromTabs};
			 sendResponse(response);
		}
		//if(request.greeting == "OpenDirectly"){
		    /* var temp = new Array();
			for( var index in ContentJSONs){
			    temp.push(ContentJSONs[index].url);
			}
			cache = temp.slice(); */
			//cache = ContentJSONs;
		//}
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
							}
						}
					}						
				}
				response={lala:"deleted"};
				sendResponse(response);
			});	  	    
		}
		var selectedCount = ContentJSONs.length;
		if(selectedCount > 0){
			chrome.contextMenus.update("delete", {"enabled" : true} );
			chrome.contextMenus.update("result", {"enabled" : true} );
		}
		else{
			chrome.contextMenus.update("delete", {"enabled" : false} );
			chrome.contextMenus.update("result", {"enabled" : false} );
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
		"title" : "Result",
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
		cache = ContentJSONs;		
	}                                   
})