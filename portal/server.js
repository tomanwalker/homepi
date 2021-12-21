
// ## dependencies
var express = require('express');
var fs = require('fs');

// ## config
var config = {
	PORT: Number(process.env.PORT || 9000)
};

var server = express();
server.use(express.json());

// ## functions
//var render = function(page, bag, template){ };

// ## routes
server.get('*', function(req, res, next){
	
	var nonRelevant = (
		req.originalUrl.includes('.js')
		|| req.originalUrl.includes('.css')
		|| req.originalUrl.includes('.ico')
	);
	if( nonRelevant ){
		return next();
	}
	
	console.log('router.base - start - req.originalUrl = %s', req.originalUrl);
	var VIEW_EXT = 'html';
	
	/*
		if( url === '/' ){
			return res.redirect('/home');
		}
	*/
	var mapper = {
		
	};
	var page = req.originalUrl.substring(1);
	page = page.replace( '.' + VIEW_EXT, '');
	if( mapper[page] ){
		page = mapper[page];
	}
	console.log('router.base - mapper - page = <%s>', page);
	
	var template = 'template';
	var mainContent = fs.readFileSync('views/' + template + '.' + VIEW_EXT, 'utf8');
	var pageContent = null;
	try{
		pageContent = fs.readFileSync('views/' + page + '.' + VIEW_EXT, 'utf8');
	}
	catch(err){
		console.log('router.base - page.catch - err = %j', err);
		return next();
	}
	
	var merged = mainContent.replace('{{body}}', pageContent);
	return res.send(merged);
	
});

var filesPath = __dirname + '/html';
console.log('filesPath = %s', filesPath);
server.use('/', express.static(filesPath));

// ## flow
console.log('main - server start - port = %s', config.PORT);
server.listen(config.PORT, function(){
	console.log('main - server started...');
});


