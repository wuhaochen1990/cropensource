Contents

# Chrome API used #
  * chrome.tab
  * chrome.runtime
  * chrome.extension
  * chrome.contextMenus
  * chrome.storage

# Techniques used #
  * Content Script
  * JQuery and JavaScript
  * HTML iframe tag
  * JSON

# Implementation #
## Click and detect the div area ##
We are using JQuery to listen to the click event.
```
$("body").find("div").click(
....
)
```
## set the background color ##
We are using css function in JQuery to change the background color. As we can customize the color of the background, we should make the color as a variable. Also we should record its original color, because when we click another area, the old area is going to restore its original background color.
```
//record background color
divColor = $(this).css("background-color");
//set background color
$(this).css({"background-color":userColor});
```
## prevent div overlapped ##
If div 'a' has a parent div 'b' and we click in the child div 'a', div 'b' is not supposed to be selected. This can be done by a function provided by JQuery as following code shows.
```
e.stopPropagation();
```
## clear messages ##
We have created a button for wiping out all previous selected divs. We find the div list and clear everything out of there.
```
chrome.runtime.sendMessage({greeting:"clearup"},
    function(response){
});
var fm = document.getElementById('select');
while(fm.firstChild){
    fm.removeChild(fm.firstChild);
}
```
At the same time, background.js can receive the message to make the list empty.
```
if(request.greeting == "clearup"){
    ContentJSONs=[];
}
```
## send message when clicking 'add' and 'delete' ##
We are using chrome.runtime API to send selected area's information to another Javascript file that is responsible for merging. The code is following.
```
chrome.runtime.sendMessage(
    { greeting:"addingPage",
      divID: ContentID, 
      top:top, 
      left:left,
      height: height,
      width: width,
      clWidth: clWidth
    },
    function(response){
    }
);
```
The message of clicking 'delete' is following.
```
chrome.runtime.sendMessage({greeting : "deletePage", pos : temp},function(response){);});
```
## receive messages ##
After clicking area and 'add' button, the information of the area is transmitted by chrome api runtime.sendMessage. We are receiving it as a JSON format and proceed it to next step for merging.
```
chrome.runtime.sendMessage(
    {greeting:"giveMeLinks"},
    function(response){
        jsons = response.jsons;
        for(var index in jsons){
           var url = jsons[index].url;
           var top = jsons[index].top;
           ... 
       }
    }
)
```
## merge ##
### thumbnails of selected area ###
After clicking 'merge' button, all selected divs will be changed to thumbnails in one page. This was done by iframe.
```
var  ifr = document.createElement('iframe');
ifr.setAttribute("src",url);
ifr.setAttribute("style","margin-top:" + (-top) + "; margin-left:" + (-left) + "; width : "+ clWidth+";height:"+(height+top)+";	");
```
### layout buttons ###
Every thumbnail has a 'left' button and a 'right' button. After clicking either button, that div would be shown in the corresponding location. This was done by two functions named 'func\_left' and 'func\_right'. They are also using iframe to contain the div content, but they show the original size of the div instead of a thumbnail. We have two panels containing left and right iframe, which means at the same time there can be only two divs being displayed completely. If there has been already something in each panel, the new one can replace the old one in the panel.
```
function func_left(){
    while(left_panel.firstChild){
        left_panel.removeChild(left_panel.firstChild);
    }
    var dv = document.createElement('div');
    var ifr = document.createElement('iframe');
    ...
    left_panel.appendChild(dv);
    dv.appendChild(ifr);
}
```
### adjust panels' location ###
We also add some buttons that users can adjust the location of the iframe. We change the left and right panel's width as following code shows.
```
function func_toLeft(){
    document.getElementById('rightPanel').style.width = '56%';
    document.getElementById('leftPanel').style.width = '48%';
}
```
## options ##
We are using chrome.storage to store preference of the settings. We store two value of preference, color and helper. Following is what we set in the storage.
```
chrome.storage.sync.set(
    {
        favoriteColor: color,
        enableHepler:helper
    }, function(){
        var status = document.getElementById('status');
        status.textContent = 'Options saved';
        setTimeout(function(){
            status.textContent = '';
        }, 750);
    }
);
```
Following is what we restore as a default options.
```
function restore_options() {
  chrome.storage.sync.get({
    favoriteColor: 'yellow', 
	enableHelper: 'yes'	
  }, function(items) {
    document.getElementById('color').value = items.favoriteColor;
	document.getElementById('helper').value = items.enableHelper;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
```
If the user changes its preference in the options, we are listening to it in the background.js. After changing, background.js should send messages to every tab to inform them of the new preference. This is done in the following code.
```
chrome.storage.onChanged.addListener(function(changes, namespace){
   //check if changed color or helper
    for(key in changes){
        ...
    }
    //inform every tab of the change
    chrome.tabs.query({currentWindow: true}, function(tabs) {
        var message = {greeting: "colorChanged", color : userColor, helper: userHelper};
        for(var i =0; i<tabs.length; ++i){ 
        chrome.tabs.sendMessage(tabs[i].id, message);
    }	
    });
}
```
## Message transmitted by background ##
We are using background.js as a center for messages. Content script is communicating with background.js. Popup.js the same. Result.js is still 'talking' to background.js. And all messages are differentiated by greeting value shown below.
```
//talking to result.js which needs links
if(request.greeting == "giveMeLink"){
...
}
//talking to content.js that adds divs 
if(request.greeting == "addingPage"){
...
}
//talking to content.js that deletes divs
if(request.greeting == "deletePage"){
...
}
//talking to popup.js that clears divs
if(request.greeting == "clearup"){
...
}
//talking to result which needs links
if(request.greeting == "giveMeLink"){
...
}
//talking to options.js about color
if(request.greeting == "giveMeColor"){
...
}
//talking to options.js about helper
if(request.greeting == "giveMeHelper"){
...
}

```
## context menu of PageMerger ##
We add a feature to the context menus. That is done by that API. It is defined as following.
```
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
```
It has a listening event like below.
```
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
```