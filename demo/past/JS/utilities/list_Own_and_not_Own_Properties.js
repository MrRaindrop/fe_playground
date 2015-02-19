function listOwnProperties(c){
	if(c instanceof Function)
		c = c.prototype;
	console.log('own properties of :');
	console.log(c);
	console.log('>>>-------');
	for(var p in c){
		if(c.hasOwnProperty(p))
			console.log(p);
	}
	console.log('<<<-------');
}

function listNotOwnProperties(c){
	if(c instanceof Function)
		c = c.prototype;
	console.log('inherited properties of :');
	console.log(c);
	console.log('>>>-------');
	for(var p in c){
		if(c.hasOwnProperty(p))
			continue;
		console.log(p);
	}
	console.log('<<<-------');
}