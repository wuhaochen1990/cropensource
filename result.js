window.onload = function(){
	var urlList = ["www.w3schools.com","www.w3school.com.cn/js/js_obj_boolean.asp"];
	for(var index in urlList){
		var ifr=document.createElement('iframe');
		var url = "http://"+urlList[index];
		alert(url);
		ifr.setAttribute("src",url);
		document.body.appendChild(ifr);
	}
}
// // // for ( var url in urllist){
// // // ifr.src=url;
// // // alert("in the middle of loop");
// // // document.body.appendchild(ifr);
// // // alert("finished loop");
// // // };
