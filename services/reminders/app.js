
// ## dep
var bull = require('bull');
var got = require('got');
var express = require('express');

var server = express();

// ## config
var config = {
	PORT: Number(process.env.PORT || 9017),
	REDIS_HOST: process.env.REDIS_HOST || '192.168.1.2'
};

var def_name = 'reminders';
var def_delay = 1;

// ## export
var ns = {};
module.exports = ns;

// ## fund
var log = {
	debug: function(...msg){
		var date = new Date();
		msg[0] = date.toISOString() + ' - rem >> ' + msg[0];
		return console.log(...msg);
	}
};

ns.init = function(opts){
	
	log.debug('init - start - opts = %j', opts);
	if( !opts ){
		opts = {};
	}
	if( !opts.name ){
		opts.name = def_name;
	}
	
	var bullOpts = {
		redis: {
			host: config.REDIS_HOST
		},
		removeOnComplete: true,
		removeOnFail: true
	};
	ns.queue = new bull(opts.name, bullOpts);
	
	ns.queue.process(function(job){
		log.debug('process - job = %j', job);
		
		var obj = job.data;
		if( obj.hook ){
			return got.post(obj.hook, obj.payload);
		}
		
		return Promise.resolve();
	});
	
	ns.queue.getJobCounts().then(function(result){
		log.debug('init - getJobCounts - stats = %j', result);
		if( result.active > 20 ){
			log.debug('init - getJobCounts.done - queue is behind = %j', result);
		}
	}).catch(function(err){
		log.debug('init - getJobCounts.catch - err = %j | debug = %j / %j', 
			Object.keys(err), typeof(err.command), typeof(err.previousErrors) );
	});
	
	return ns.queue;
	
};
ns.push = function(obj){
	
	log.debug('push - start - obj = %j', obj);
	
	ns.queue.add(obj, {
		delay: (obj.delay || def_delay) * 1000
	});
	
};

// ## flow
if( require.main === module ){
	ns.init();
	
	// webserver
	server.post('/reminders', function(req, res){
		
		log.debug('post.rem - start - body = %j', req.body);
		
		ns.push(req.body);
		return res.json({ok: true});
	});
	
	log.debug('main - server start - port = %s', config.PORT);
	server.listen(config.PORT, function(){
		log.debug('main - server started...');
	});
}


