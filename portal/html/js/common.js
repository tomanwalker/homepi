
var SVC = {
	hub: '192.168.1.2:1880'
};

var restPromise = function(method, url, body){
	//console.log('DEBUG 1');
	return new Promise(function(resolve, reject){
		//console.log('DEBUG 2');
		
		var opts = {
			type: method,
			url: 'http://' + url,
			success: function(data){
				//console.log('DEBUG 3 = %j', data);
				return resolve(data);
			},
			error: function(err) {
				console.log(`${url} - err: + JSON.stringify(err)`);
			}
		};
		
		if( body ){
			opts.data = JSON.stringify(body);
			opts.contentType = "application/json; charset=utf-8";
		}
		
		$.ajax(opts);
	});
};
var getPromise = function(url){
	return restPromise('GET', url);
};
var postPromise = function(url, body){
	return restPromise('POST', url, body);
};

var run_loop = function(func, time){
	func();
	return setInterval(func, time);
};

var tcell = function(val){
	return (`<td>${val}</td>`);
};
var trow = function(...vals){
	return '<tr>' + vals.map(x => tcell(x)).join('') + '</tr>';
};


