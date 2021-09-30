
var target = require('../app');
var express = require('express');

var server = express();

describe('basic', function(){
	
	var complete = false;
	
	it('init', function(){
		
		target.init({name: 'rem-test'});
		
		server.post('/hook', function(req, res){
			
			console.log('hook time - %s', (new Date()).toISOString());
			console.log('hook - body = %j', req.body);
			complete = true;
			
			return res.json({ok: true});
		});
		
		server.listen(8081, function(){
			console.log('server started...');
		});
		
	});
	
	it('pub', function(){
		
		console.log('push time - %s', (new Date()).toISOString());
		target.push({
			payload: { msg: 'hallou'},
			delay: 1, // seconds
			hook: 'http://localhost:8081/hook'
		});
		
	});
	
	it('wait', function(done){
		
		this.timeout(3000);
		
		var block = setInterval(function(){
			
			if( complete ){
				clearInterval(block);
				return done();
			}
			
		}, 200);
		
	});
	
	
});


