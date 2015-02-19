// test if x is an array-like object
function isArrayLike(x){
	if(x instanceof Array)
		return true;
	if(!('length' in x)) return false;
	if(typeof x.length != 'number') return false;
	if(!((x.length - 1) in x)) return false;
	return true;
}