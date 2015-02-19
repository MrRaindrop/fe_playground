/////////////////proxy///////////////////

//from

var keyMgr = keyManage(); 
keyMgr.listen('change', function(keyCode){ 
   console.log(keyCode);
});

// to

var keyMgr = KeyManager();
keyMgr.listen('change', proxy(function(keyCode){
	console.log(keyCode);
}));