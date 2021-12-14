
// ## dependencies
var express = require('express');

// ## config
var config = {
	PORT: Number(process.env.PORT || 9000)
};

var server = express();
server.use(express.json());

// ## functions


// ## routes
var filesPath = __dirname + '/html';
console.log('filesPath = %s', filesPath);
server.use('/', express.static(filesPath));

// ## flow
console.log('main - server start - port = %s', config.PORT);
server.listen(config.PORT, function(){
	console.log('main - server started...');
});


